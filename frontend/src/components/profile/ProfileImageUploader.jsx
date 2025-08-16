import React, { useRef, useState, useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import toast from "react-hot-toast";

export default function ProfileImageUploader({ currentImage, editable }) {
  const fileRef = useRef();
  const { uploadProfileImage, profile, setProfile } = useUserStore();
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  // Keep preview in sync with currentImage prop updates
  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const updatedUser = await uploadProfileImage(file);
      toast.success("Profile image updated");

      // Update preview locally
      setPreview(updatedUser.profileImage || updatedUser.user?.profileImage || preview);

      // Optionally update global profile state (if you have a setter)
      if (setProfile) {
        setProfile(updatedUser);
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group w-32 h-32 cursor-pointer">
      <img
        src={preview || "/default-avatar.png"}
        alt="Profile"
        className={`w-32 h-32 rounded-full object-cover border-2 border-gray-200 ${uploading ? "opacity-50" : ""}`}
        onClick={() => editable && !uploading && fileRef.current.click()}
      />

      {editable && !uploading && (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </>
      )}

      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-semibold rounded-full">
          Uploading...
        </div>
      )}
    </div>
  );
}
