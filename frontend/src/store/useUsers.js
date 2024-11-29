import { create } from "zustand";
import api from "../services/api";

const useUser = create((set) => ({
  users: [],
  isLoading: true,

  fetchUsers: async () => {
    try {
      const response = await api.get(process.env.REACT_APP_USERS_GET_URL);

      const data = response.data;
      set({ users: data, filteredUsers: data, isLoading: false });
    } catch (error) {
      set({ users: [], filteredUsers: [], isLoading: false });
      throw new Error(error);
    }
  },

  setUsers: (users) => set({ users: users }),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));

export default useUser;
