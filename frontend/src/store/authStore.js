import { create } from "zustand";
import {
  login as loginAPI,
  logout as logoutAPI,
  verifyOtp as verifyOtpAPI,
  register as registerAPI,
} from "../services/authService";
import { setAuthToken } from "../services/api";
import { useUserStore } from "./userStore";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  registeredEmail: null,
  loading: false,

  setUser: (user) => set({ user }),

  setRegisteredEmail: (email) => set({ registeredEmail: email }),

  register: async ({ name, email, password }) => {
    set({ loading: true });
    try {
      const res = await registerAPI({ name, email, password });
      if (res.success) {
        set({ registeredEmail: email, loading: false });
        return res;
      } else {
        set({ loading: false });
        throw new Error(res.message || "Registration failed");
      }
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await loginAPI({ email, password });
      if (res.success && res.token) {
        localStorage.setItem("token", res.token);
        setAuthToken(res.token);

        // fetch profile
        await useUserStore.getState().fetchProfile();
        const profile = useUserStore.getState().profile || res.user;

        set({ user: profile, token: res.token, loading: false });
        return true;
      } else {
        set({ loading: false });
        return false;
      }
    } catch (error) {
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    logoutAPI();
    localStorage.removeItem("token");
    setAuthToken(null);
    set({ user: null, token: null, registeredEmail: null });
    useUserStore.setState({ profile: null });
  },

  fetchCurrentUser: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);

      const user = await useUserStore.getState().fetchProfile();

      // update authStore user too
      set({ user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  verifyOtp: async ({ email, otp }) => {
    set({ loading: true });
    try {
      const res = await verifyOtpAPI({ email, otp });
      if (res.success && res.token) {
        localStorage.setItem("token", res.token);
        setAuthToken(res.token);

        await useUserStore.getState().fetchProfile();
        const profile = useUserStore.getState().profile || res.user;

        set({ user: profile, token: res.token, loading: false, registeredEmail: null });
        return true;
      } else {
        set({ loading: false });
        throw new Error(res.message || "OTP verification failed");
      }
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
