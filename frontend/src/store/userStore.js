// src/store/userStore.js
import { create } from "zustand";
import {
  fetchUserProfileAPI,
  updateProfileAPI,
  uploadProfileImageAPI,
} from "../services/userService";

export const useUserStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await fetchUserProfileAPI();
      set({ profile, loading: false, error: null });
      return profile;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to fetch profile";
      set({ loading: false, error: errMsg });
      throw new Error(errMsg);
    }
  },

  updateProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const updatedProfile = await updateProfileAPI(profileData);
      set({ profile: updatedProfile, loading: false, error: null });
      return updatedProfile;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to update profile";
      set({ loading: false, error: errMsg });
      throw new Error(errMsg);
    }
  },

  uploadProfileImage: async (file) => {
    if (!file) {
      const msg = "No file selected";
      set({ error: msg });
      throw new Error(msg);
    }
    set({ loading: true, error: null });
    try {
      const updated = await uploadProfileImageAPI(file);
      const updatedProfile = updated.user || updated.profile || updated;
      set({ profile: updatedProfile, loading: false, error: null });
      return updatedProfile;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to upload image";
      set({ loading: false, error: errMsg });
      throw new Error(errMsg);
    }
  },
}));
