import useAuthStore from "../store/authStore";
import useUser from "../store/useUsers";
import api from "./api";

const useUserService = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { fetchUsers } = useUser();
  const { setUsers } = useUser();

  const blockUsers = async (userIds) => {
    try {
      await api.put("/users/block", { userIds });
      setUser();
      fetchUsers();
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const unblockUsers = async (userIds) => {
    try {
      await api.put("/users/unblock", { userIds });
      fetchUsers();
    } catch (error) {
      console.error("Error unblocking users:", error);
    }
  };

  const deleteUsers = async (userIds) => {
    try {
      await api.put("/users/delete", { userIds });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const sortUsers = async (sortBy, order = "desc") => {
    try {
      const response = await api.get(
        `/users/sort?sortBy=${sortBy}&order=${order}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error sorting users:", error);
    }
  };

  return {
    blockUsers,
    unblockUsers,
    deleteUsers,
    sortUsers,
  };
};

export default useUserService;
