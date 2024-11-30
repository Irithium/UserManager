import React, { useEffect, useState } from "react";
import useUser from "../../store/useUsers";
import logoIcon from "../../assets/image/userManager.png";
import UserTable from "./UserTable";
import useUserService from "../../hooks/useUserService";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import LogoutButton from "../Layout/LogoutButton";
import api from "../../services/api";

const UserList = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [searchTerm, setSearchTerm] = useState("");
  const { users, fetchUsers } = useUser();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { sortUsers } = useUserService();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const blockCheck = async () => {
    const response = await api.get(`/users/current/${user.id}`);

    updateUser(response.data);
    let isBlocked = JSON.parse(localStorage.getItem("user")).isBlocked;

    if (isBlocked) {
      toast.error("You have been banned.");
      logout();
      navigate("/login");
      return;
    }
  };

  const handleSearch = (event) => {
    blockCheck();
    setSearchTerm(event.target.value);
  };

  const filteredUsers =
    users.length !== 0
      ? users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="user-panel overflow-x-auto lg:overflow-auto h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white w-fit mx-auto">
        <img src={logoIcon} alt={logoIcon} className="w-1/4 md:w-1/5" />
        <div className="user-info flex items-center bg-dim_gray-800 text-dim_gray-100 p-2 md:px-4 md:py-2 rounded-lg">
          <span className="md:text-lg font-semibold mr-4">
            {JSON.parse(localStorage.getItem("user")).name}
          </span>
          <LogoutButton />
        </div>
      </header>

      <main className="p-0 md:px-4 py-6 ">
        <form className="form relative mb-3 mx-auto lg:mx-0 w-fit">
          <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
            <IoIosSearch size={20} />
          </button>
          <input
            className="input rounded-full px-8 py-3 border-2 border-dim_gray-800 focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
            placeholder="Search by name or email...."
            onChange={handleSearch}
            value={searchTerm}
            type="text"
          />
        </form>

        <UserTable
          users={filteredUsers}
          sortUsers={sortUsers}
          blockCheck={blockCheck}
        />
      </main>
    </div>
  );
};

export default UserList;