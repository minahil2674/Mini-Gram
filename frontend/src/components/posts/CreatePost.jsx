import { useState } from "react";
import { usePostStore } from "../../store/postStore";
import { useAuthStore } from "../../store/authStore"; // Import your auth store to get current user
import PostImageUploader from "./PostImageUploader";


export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const createPost = usePostStore((state) => state.createPost);
  const fetchUserPosts = usePostStore((state) => state.fetchUserPosts);
  const user = useAuthStore((state) => state.user);
  const userId = user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      alert("Please add some content or select an image.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("text", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      await createPost(formData);

      // Fetch updated posts for this user after creating a post
      if (userId) {
        await fetchUserPosts(userId);
      }

      setContent("");
      setImage(null);
    } catch (error) {
      alert("Failed to post. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shine {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shine 1.5s infinite;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow-2xl hover:shadow-4xl transition-shadow duration-500"
      >
        <textarea
          className="w-full p-4 border-2 rounded-xl resize-none transition-all duration-300 focus:outline-none focus:scale-105 focus:border-blue-500 placeholder-gray-500"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          disabled={submitting}
        />

        <PostImageUploader image={image} setImage={setImage} />

        <button
          type="submit"
          disabled={submitting}
          className={`relative mt-4 w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg transition-transform duration-300 transform ${
            submitting
              ? "bg-gray-400 cursor-not-allowed scale-95"
              : "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 cursor-pointer"
          }`}
        >
          {submitting ? "Posting..." : "Post"}
          {!submitting && (
            <span className="absolute inset-0 animate-shine rounded-xl" />
          )}
        </button>
      </form>
    </>
  );
}
