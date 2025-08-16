import React from "react";
import ProfileImageUploader from "./ProfileImageUploader";

export default function ProfileHeader({ profile, onEditClick, isCurrentUser }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        
        <ProfileImageUploader
          currentImage={profile?.profileImage}
          editable={isCurrentUser}
        />

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">
            {profile?.name || "Unnamed User"}
          </h2>
          <p className="text-gray-600 mt-2">{profile?.bio || "No bio yet"}</p>
          <p className="text-gray-500 mt-1">{profile?.email}</p>

          {isCurrentUser && (
            <button
              onClick={onEditClick}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
