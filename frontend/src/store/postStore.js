import { create } from "zustand";
import {
  fetchPosts as fetchPostsService,
  createPost as createPostService,
  deletePost as deletePostService,
  likePost as likePostService,
  addComment as addCommentService,
  fetchUserPosts as fetchUserPostsService,
} from "../services/postService";

export const usePostStore = create((set, get) => ({
  posts: [],
  userPosts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPostsService();
      const posts = data.posts || data;
      set({ posts, loading: false });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      set({ loading: false, error: error.message || "Failed to fetch posts" });
    }
  },

  fetchUserPosts: async (userId) => {
    if (!userId) {
      set({ userPosts: [] });
      return;
    }
    set({ loading: true, error: null });
    try {
      const posts = await fetchUserPostsService(userId);
      set({ userPosts: posts || [], loading: false });
      return posts;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to fetch user posts";
      set({ loading: false, error: errMsg });
      throw new Error(errMsg);
    }
  },

  createPost: async (postData) => {
    try {
      const data = await createPostService(postData);
      const newPost = data.post || data;
      set({ posts: [newPost, ...get().posts] });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  },

  deletePost: async (postId) => {
    try {
      await deletePostService(postId);
      set({
        posts: get().posts.filter((p) => p._id !== postId),
        userPosts: get().userPosts.filter((p) => p._id !== postId),
      });
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  },

  likePost: async (postId) => {
    try {
      const updatedPost = await likePostService(postId);
      set({
        posts: get().posts.map((post) => (post._id === postId ? updatedPost : post)),
        userPosts: get().userPosts.map((post) => (post._id === postId ? updatedPost : post)),
      });
      return updatedPost;
    } catch (error) {
      console.error("Failed to like post:", error);
      throw error;
    }
  },

  addComment: async (postId, text) => {
    const tempId = `temp-${Date.now()}`;
    set({
      posts: get().posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), { _id: tempId, text, user: { name: "You" } }],
            }
          : post
      ),
      userPosts: get().userPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), { _id: tempId, text, user: { name: "You" } }],
            }
          : post
      ),
    });

    try {
      const data = await addCommentService(postId, text);
      const updatedComments = data.comments;
      set({
        posts: get().posts.map((post) =>
          post._id === postId ? { ...post, comments: updatedComments } : post
        ),
        userPosts: get().userPosts.map((post) =>
          post._id === postId ? { ...post, comments: updatedComments } : post
        ),
      });
      return { postId, comments: updatedComments };
    } catch (error) {
      console.error("Failed to add comment:", error);
      set({
        posts: get().posts.map((post) =>
          post._id === postId
            ? { ...post, comments: post.comments.filter((c) => c._id !== tempId) }
            : post
        ),
        userPosts: get().userPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: post.comments.filter((c) => c._id !== tempId) }
            : post
        ),
      });
      throw error;
    }
  },
}));
