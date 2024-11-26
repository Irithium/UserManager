import { create } from "zustand";
import api from "../services/api";

const useUser = create((set) => ({
  users: [],
  filteredUsers: [],
  isLoading: true,

  fetchUsers: async () => {
    try {
      const response = await api.get(process.env.REACT_APP_USERS_GET_URL);
      console.log(response.data);

      const data = response.data;
      set({ users: data, filteredUsers: data, isLoading: false });
    } catch (error) {
      set({ users: [], filteredUsers: [], isLoading: false });
      throw new Error(error);
    }
  },

  setUsers: (users) => set({ users }),

  setFilteredUsers: (filteredUsers) => set({ filteredUsers }),

  blockUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      ),
    })),
}));

export default useUser;
