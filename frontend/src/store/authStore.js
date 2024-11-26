import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  login: (token) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
