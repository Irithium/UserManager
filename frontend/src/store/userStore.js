import { create } from "zustand";

const userStore = create((set) => ({
  currentUser: localStorage?.currentUser,

  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default userStore;
