import { useState } from "react";
import { addComment, deleteComment } from "../../services/postService";
import { useAuthStore } from "../../store/authStore";

export default function CommentSection({ postId, comments, onUpdate }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthStore();

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    const result = await addComment(postId, newComment);
    if (result) {
      onUpdate(result.comments);
      setNewComment("");
    }
  };

  const handleDelete = async (commentId) => {
    const result = await deleteComment(postId, commentId);
    if (result) {
      onUpdate(result.comments);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Comments</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="flex justify-between items-center mt-2">
          <p className="text-sm">{comment.text}</p>
          {user && comment.user === user._id && (
            <button onClick={() => handleDelete(comment._id)} className="text-xs text-red-500">
              Delete
            </button>
          )}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-1 rounded flex-1"
          placeholder="Add a comment..."
        />
        <button onClick={handleAdd} className="text-blue-500 text-sm">Post</button>
      </div>
    </div>
  );
}
