import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { usePostStore } from "../store/postStore";
import EditProfileModal from "../components/profile/EditProfileModal";
import ProfilePosts from "../components/profile/ProfilePosts";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function ProfilePage() {
  const { userId } = useParams();

  const {
    profile,
    fetchProfile,
    loading: profileLoading,
    error: profileError,
  } = useUserStore();

  const {
    userPosts,
    fetchUserPosts,
    loading: postsLoading,
    error: postsError,
  } = usePostStore();

  const [isEditing, setIsEditing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [postsVisible, setPostsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          console.log("Fetching profile and posts for userId:", userId);
          await fetchProfile(userId);
          await fetchUserPosts(userId);
        } else {
          const ownProfile = await fetchProfile();
          console.log("Fetched own profile:", ownProfile);
          if (ownProfile?._id) {
            await fetchUserPosts(ownProfile._id);
          } else {
            console.warn("Own profile does not have _id, skipping posts fetch");
          }
        }
        // Smooth staggered animations
        setTimeout(() => setFadeIn(true), 150);
        setTimeout(() => setPostsVisible(true), 400);
      } catch (error) {
        console.error("Error fetching profile or posts:", error);
      }
    };

    fetchData();
  }, [userId, fetchProfile, fetchUserPosts]);

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center animate-pulse-smooth">
          <div className="inline-block animate-spin-smooth rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6 shadow-lg"></div>
          <p className="text-lg text-gray-700 font-medium animate-fade-in-up">Loading profile...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-delay-0"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-delay-1"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-delay-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-red-600 text-lg font-semibold">{profileError}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-semibold">User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className={`max-w-4xl mx-auto px-4 py-6 pt-24 transition-all duration-1000 ease-out transform ${
        fadeIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}>
        {/* Profile Header with enhanced styling */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 ease-out animate-slide-up">
          <ProfileHeader
            profile={profile}
            onEditClick={() => setIsEditing(true)}
            isCurrentUser={!userId || userId === profile?._id}
          />
        </div>

        {/* Posts Section */}
        <div className={`transition-all duration-1200 ease-out transform delay-300 ${
          postsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
        }`}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-700 ease-out animate-slide-up-delay">
            <div className="flex items-center mb-6 animate-fade-in-right">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4 animate-height-grow"></div>
              <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text animate-text-shimmer">
                Posts
              </h3>
            </div>
            
            {postsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin-smooth rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium animate-pulse-text">Loading posts...</p>
              </div>
            ) : postsError ? (
              <div className="text-center py-12 animate-shake">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-red-600 font-semibold">{postsError}</p>
              </div>
            ) : userPosts.length > 0 ? (
              <div className="transform transition-all duration-800 ease-out hover:scale-[1.005] animate-fade-in-up">
                <ProfilePosts posts={userPosts} />
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">No posts found.</p>
                <p className="text-gray-400 text-sm mt-2">Posts will appear here once they're created.</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Modal with enhanced backdrop */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in-smooth">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
              onClick={() => setIsEditing(false)}
            ></div>
            <div className="relative z-10 max-h-screen overflow-y-auto animate-modal-enter">
              <EditProfileModal 
                profile={profile} 
                onClose={() => setIsEditing(false)} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for ultra-smooth animations */}
      <style jsx>{`
        @keyframes fade-in-smooth {
          from { 
            opacity: 0;
          }
          to { 
            opacity: 1;
          }
        }
        
        @keyframes modal-enter {
          0% { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up-delay {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes height-grow {
          from {
            height: 0;
          }
          to {
            height: 2rem;
          }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes spin-smooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-smooth {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-delay-0 {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounce-delay-1 {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounce-delay-2 {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Animation classes */
        .animate-fade-in-smooth {
          animation: fade-in-smooth 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-modal-enter {
          animation: modal-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-up-delay {
          animation: slide-up-delay 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }
        
        .animate-height-grow {
          animation: height-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }
        
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        .animate-spin-smooth {
          animation: spin-smooth 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-smooth {
          animation: pulse-smooth 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-text {
          animation: pulse-text 1.5s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-delay-0 {
          animation: bounce-delay-0 1.4s ease-in-out infinite;
        }
        
        .animate-bounce-delay-1 {
          animation: bounce-delay-1 1.4s ease-in-out infinite 0.2s;
        }
        
        .animate-bounce-delay-2 {
          animation: bounce-delay-2 1.4s ease-in-out infinite 0.4s;
        }
        
        /* Enhanced background gradients */
        .bg-gradient-to-br {
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced shadow classes */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Improved transitions */
        * {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}