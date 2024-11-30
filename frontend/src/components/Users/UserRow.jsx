import React from "react";
import { ImBlocked } from "react-icons/im";

const UserRow = ({ user, onSelect, isSelected }) => {
  return (
    <tr className="bg-peach-500 text-xs md:text-sm lg:text-base ">
      <td className="text-center py-2">
        <input
          className="transition-all duration-500 ease-in-out hover:scale-110 checked:scale-100 w-3 lg:w-5 rounded-lg"
          id={user.id}
          value={user.id}
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="px-2 md:px-0 py-2 ">
        <div className="flex flex-row items-center gap-1">
          {user.isBlocked === true ? <ImBlocked className="size-3" /> : ""}
          {user.name}{" "}
        </div>
      </td>
      <td className="px-2 md:px-0 py-2 overflow-auto max-sm:max-w-32 max-sm:overflow-scroll ">
        {user.email}
      </td>
      <td className="text-center px-2 md:px-0 py-2">{user.lastActivity}</td>
      <td className="text-center px-2 md:px-0 py-2 ">{user.createdAt}</td>
    </tr>
  );
};

export default UserRow;
