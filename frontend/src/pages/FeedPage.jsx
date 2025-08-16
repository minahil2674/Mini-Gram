import React, { useEffect, useState } from "react";
import PostCard from "../components/posts/PostCard";
import { usePostStore } from "../store/postStore";
import CreatePost from "../components/posts/CreatePost";
import ConfirmationModal from "../components/shared/ConfirmationModal";

export default function FeedPage() {
  const { posts, fetchPosts, deletePost, isLoading, error } = usePostStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const confirmDeletePost = (postId) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (selectedPostId) {
      await deletePost(selectedPostId);
      setSelectedPostId(null);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-shine {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          background-size: 200% 100%;
          animation: shine 1.5s infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 px-4">
        <div className="max-w-2xl mx-auto">

          <div className="mb-8 animate-fadeIn">
            <CreatePost />
          </div>

          {isLoading && (
            <p className="text-center text-gray-500 mt-6 animate-fadeIn">Loading posts...</p>
          )}

          {error && (
            <p className="text-center text-red-500 mt-6 animate-fadeIn">
              {error || "Failed to load posts"}
            </p>
          )}

          {!isLoading && posts.length === 0 && (
            <p className="text-center text-gray-500 mt-6 animate-fadeIn">No posts yet.</p>
          )}

          {!isLoading && posts.length > 0 && (
            <div className="space-y-6">
              {[...posts].reverse().map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-3xl shadow-2xl p-5 hover:shadow-4xl transition-shadow duration-500 cursor-pointer animate-fadeIn"
                >
                  <PostCard
                    post={post}
                    onDelete={() => confirmDeletePost(post._id)}
                  />
                </div>
              ))}
            </div>
          )}

          <ConfirmationModal
            isOpen={isModalOpen}
            title="Delete Post"
            message="Are you sure you want to delete this post? This action cannot be undone."
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleDeleteConfirmed}
          />
        </div>
      </div>
    </>
  );
}
