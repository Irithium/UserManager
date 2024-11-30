import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isBlocked: false,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isBlocked: user.isBlocked });
    localStorage.setItem("user", JSON.stringify(user));
  },

  updateUser: (user) => {
    set({ user, isBlocked: user.isBlocked });
    localStorage.setItem("user", JSON.stringify(user));
  },

  initializeUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      set({ user, isBlocked: user.isBlocked });
    }
  },

  login: (token) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null, isBlocked: false });
  },
}));

export default useAuthStore;
