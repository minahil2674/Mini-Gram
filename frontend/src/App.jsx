import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/userStore";
import { useAuthStore } from "./store/authStore";
import { setAuthToken } from "./services/api";

function App() {
  const fetchProfile = useUserStore((state) => state.fetchProfile);
  const user = useUserStore((state) => state.profile);
  const setAuthUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        await fetchProfile();
        setAuthUser(useUserStore.getState().profile); // sync user to authStore
      }
    };
    initAuth();
  }, [fetchProfile, setAuthUser]);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/:mode" element={<AuthPage />} />

            <Route
              path="/"
              element={
                user ? <Navigate to="/feed" replace /> : <Navigate to="/auth/login" replace />
              }
            />

            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <FeedPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect /profile to current user's profile page */}
            <Route
              path="/profile"
              element={
                user ? (
                  <Navigate to={`/profile/${user._id}`} replace />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              }
            />

            {/* Dynamic route to view any user's profile */}
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/post/:postId"
              element={
                <ProtectedRoute>
                  <PostDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
