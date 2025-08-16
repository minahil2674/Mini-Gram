import React from 'react';
import EditProfileModal from '../components/profile/EditProfileModal';
import { useUserStore } from '../store/userStore';

export default function EditProfilePage() {
  const { currentUser } = useUserStore();

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <EditProfileModal user={currentUser} isOpen={true} onClose={() => window.history.back()} />
    </div>
  );
}
