import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { usePostStore } from "../../store/postStore";
import { useAuthStore } from "../../store/authStore";
import ConfirmationModal from "../shared/ConfirmationModal";

export default function PostCard({ post }) {
  const { user, token } = useAuthStore();
  const { deletePost, likePost, addComment } = usePostStore();

  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [localComments, setLocalComments] = useState(post.comments || []);

  // Identify if the logged-in user owns this post
  const postUserId =
    (post.user && (post.user._id || post.user.id || post.user)) || null;
  const currentUserId = user?._id || user?.id || null;
  const isOwner = postUserId && currentUserId && postUserId === currentUserId;

  // Check if the post is liked by the current user
  const isLiked =
    Array.isArray(post.likes) &&
    currentUserId &&
    post.likes.includes(currentUserId);

  /**
   * Handle like toggle
   */
  const handleLike = async (e) => {
    e?.preventDefault();
    if (!token) {
      alert("Please log in to like posts.");
      return;
    }
    try {
      await likePost(post._id); // This must exist in postStore
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  /**
   * Confirm deletion of post
   */
  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deletePost(post._id); // This must exist in postStore
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting post:", err);
    } finally {
      setDeleting(false);
    }
  };

  /**
   * Handle adding a new comment
   */
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to comment.");
      return;
    }
    if (!commentInput.trim()) return;

    const newComment = {
      _id: `temp-${Date.now()}`,
      text: commentInput.trim(),
      user: { username: user?.username || user?.email || "You" },
    };

    // Optimistic UI update
    setLocalComments((prev) => [...prev, newComment]);
    setCommentInput("");
    setShowComments(true);

    try {
      const savedComment = await addComment(post._id, commentInput.trim()); // Must exist in postStore
      setLocalComments((prev) =>
        prev.map((c) => (c._id === newComment._id ? savedComment : c))
      );
    } catch (err) {
      console.error("Error adding comment:", err);
      setLocalComments((prev) => prev.filter((c) => c._id !== newComment._id));
      alert("Failed to add comment.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            {typeof post.user === "string"
              ? "User"
              : post.user?.username || post.user?.email || "Unknown User"}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete post"
          >
            Delete
          </button>
        )}
      </div>

      {/* Post Text */}
      <p className="mt-3 break-words">{post.text}</p>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-3 rounded-lg max-h-96 w-full object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4">
        <button
          type="button"
          onClick={handleLike}
          className="flex items-center gap-2"
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <span>{post.likes?.length || 0}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center gap-2"
        >
          <FaRegComment />
          <span>{localComments.length}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-3 border-t pt-3">
          {localComments.length ? (
            localComments.map((c) => (
              <div
                key={c._id || c.id || `${c.user}-${c.text}`}
                className="mb-2"
              >
                <span className="font-semibold mr-2">
                  {c.user?.username || c.user?.email || "User"}:
                </span>
                <span>{c.text}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet</p>
          )}

          <form onSubmit={handleAddComment} className="flex gap-2 mt-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            >
              Post
            </button>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete post?"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
        loading={deleting}
      />
    </div>
  );
}
