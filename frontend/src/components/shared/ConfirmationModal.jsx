import React, { useEffect } from "react";

export default function ConfirmationModal({
  isOpen,
  title = "Delete Post",
  message = "Are you sure you want to delete this post? This action cannot be undone.",
  onConfirm,
  onCancel,
}) {
  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h3 className="text-lg font-semibold text-red-600 mb-3">{title}</h3>

        {/* Message */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
