import React from "react";

export default function PostImageUploader({ image, setImage }) {
  return (
    <div className="mt-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
        className="block"
      />
      {image && (
        <div className="mt-2 flex flex-col items-start">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="max-w-xs max-h-40 rounded"
          />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="text-red-600 underline mt-1"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
