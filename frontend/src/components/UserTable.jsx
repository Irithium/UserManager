import React, { useState } from "react";
import UserRow from "./UserRow";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { columns } from "../utils/columns";
import { handleArrow } from "../utils/handleArrow";
import useUserService from "../services/useUserService";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const UsersTable = ({ users, sortUsers, blockCheck }) => {
  const navigate = useNavigate;
  const logout = useAuthStore((state) => state.clearUser);
  const { blockUsers, unblockUsers, deleteUsers } = useUserService();
  const [order, setOrder] = useState("desc");
  const [column, setColumn] = useState("createdAt");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSort = (column) => {
    blockCheck();
    setColumn(column);
    order === "asc" ? setOrder("desc") : setOrder("asc");

    sortUsers(column, order);
  };

  const handleSelectUser = (userId) => {
    blockCheck();
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSelectAll = () => {
    blockCheck();
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleBlock = () => {
    blockCheck();
    blockUsers(selectedUsers);
    setSelectedUsers([]);
  };

  const handleUnblock = () => {
    blockCheck();
    unblockUsers(selectedUsers);
    setSelectedUsers([]);
  };

  const handleDelete = () => {
    deleteUsers(selectedUsers);
    if (selectedUsers.length === users.length) {
      logout();
      navigate("/login");
    }
    setSelectedUsers([]);
  };

  return (
    <div className="user-table ">
      <div className="flex flex-row justify-between items-center max-md:px-2 my-4 md:my-2">
        <h2 className="text-french_gray-100 text-sm md:text-lg lg:text-xl font-semibold ">
          All Users ({users.length})
        </h2>
        <div className="flex flex-row items-center gap-3">
          <button
            onClick={handleBlock}
            className="flex flex-row items-center px-2 py-1 h-8 lg:h-9 text-xs md:text-sm lg:text-base max-lg:bg-vermilion hover:scale-110 active:scale-100 transition-all border-2 border-vermilion-500 rounded-md text-white lg:text-vermilion-500 font-semibold"
          >
            <FaLock className="fill-white lg:fill-vermilion size-3 md:size-5 mr-1" />{" "}
            Block
          </button>
          <div
            onClick={handleUnblock}
            className="px-2 py-1 h-8 lg:h-9 border-2 border-sky-600 max-lg:bg-sky-600  rounded-md content-center hover:scale-105 active:scale-100 transition-all"
          >
            <FaLockOpen className="fill-white lg:fill-sky-500 size-4 md:size-5" />
          </div>
          <div
            onClick={handleDelete}
            className="px-2 py-1 h-8 lg:h-9 border-2 border-vermilion max-lg:bg-vermilion rounded-md content-center hover:scale-105 active:scale-100 transition-all"
          >
            <MdDelete className="fill-white lg:fill-vermilion size-4 md:size-5" />
          </div>
        </div>
      </div>
      <table className="container md:rounded-lg overflow-hidden max-w-full p-4">
        <thead>
          <tr className="text-french_gray-100 font-semibold bg-peach-600 rounded-lg overflow-hidden">
            <th className="px-2 lg:px-2 md:py-2">
              <input
                className=" transition-all duration-500 ease-in-out hover:scale-110 checked:scale-100 w-5"
                value="selectAll"
                checked={
                  users.length !== 0
                    ? selectedUsers.length === users.length
                    : false
                }
                onChange={handleSelectAll}
                type="checkbox"
              />
            </th>
            {columns.map((header, index) => {
              return (
                <th
                  className={`mx-2 md:px-0 md:py-2 text-xs lg:text-base ${
                    header.value === "createdAt" ? "hidden md:table-cell" : ""
                  } ${header.value === "name" ? "hidden md:table-cell" : ""}`}
                  onClick={() => handleSort(header.value)}
                  key={index}
                >
                  <p className="flex flex-row justify-center items-center ">
                    {header.name} {handleArrow(header.value, column, order)}
                  </p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onSelect={() => handleSelectUser(user.id)}
              isSelected={selectedUsers.includes(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
