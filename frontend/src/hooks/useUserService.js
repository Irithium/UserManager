import useAuthStore from "../store/useAuthStore";
import useUser from "../store/useUsers";
import api from "../services/api";
import toast from "react-hot-toast";

const useUserService = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { fetchUsers } = useUser();
  const { setUsers } = useUser();

  const blockUsers = async (userIds) => {
    try {
      await api.put("/users/block", { userIds });
      const response = await api.get(`/users/current/${user.id}`);

      updateUser(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users." + error);
    }
  };

  const unblockUsers = async (userIds) => {
    try {
      await api.put("/users/unblock", { userIds });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users." + error);
    }
  };

  const deleteUsers = async (userIds) => {
    try {
      await api.put("/users/delete", { userIds });
      const response = await api.get(`/users/current/${user.id}`);

      updateUser(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users." + error);
    }
  };

  const sortUsers = async (sortBy, order = "desc", status) => {
    try {
      const response = await api.get(
        `/users/sort?sortBy=${sortBy}&order=${order}&status=${status}`
      );
      setUsers(response.data);
    } catch (error) {
      toast.error("Error sorting users:" + error);
    }
  };

  const filterUsers = async (status) => {
    try {
      const response = await api.get("/users/filter", {
        params: { status },
      });
      console.log(response);

      setUsers(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return {
    blockUsers,
    unblockUsers,
    deleteUsers,
    sortUsers,
    filterUsers,
  };
};

export default useUserService;
