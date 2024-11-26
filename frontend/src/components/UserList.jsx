import React, { useEffect, useState } from "react";
import useUser from "../store/useUsers";
import logoIcon from "../assets/image/userManager.png";
import UserTable from "./UserTable";

const UserList = () => {
  const { users, fetchUsers, isLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen text-center text-black-500 font-bold text-2xl">
        Loading...
      </div>
    );
  }

  console.log(localStorage);

  return (
    <div className="user-panel">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <img src={logoIcon} alt={logoIcon} className="w-1/6" />
        <div className="user-info flex items-center">
          <span className="username mr-4">{}</span>
          <button className="logout-button bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="p-4">
        <div className="documentation mb-4">
          <h2 className="text-2xl font-bold">Documentation</h2>
          <p>Here you can find some information about how to use this app</p>
        </div>

        <div>
          <input
            type="text"
            name="search"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded mb-4 w-full"
          />
        </div>

        <UserTable users={filteredUsers} />
      </main>
    </div>
  );
};

export default UserList;
