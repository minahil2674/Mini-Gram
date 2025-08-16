// src/hooks/useAuth.js
import { useAuthStore } from '../store/authStore';

const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
    verifyOTP,
    loading,
    error,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
    verifyOTP,
    loading,
    error,
  };
};

export default useAuth;
