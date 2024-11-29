import React from "react";

const UserRow = ({ user, onSelect, isSelected }) => {
  return (
    <tr className="bg-peach-500 text-xs md:text-sm lg:text-base ">
      <td className="text-center py-2">
        <input
          className="transition-all duration-500 ease-in-out hover:scale-110 checked:scale-100 w-5 rounded-lg"
          id={user.id}
          value={user.id}
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="px-2 md:px-0 py-2 hidden md:table-cell">{user.name}</td>
      <td className="px-2 md:px-0 py-2">{user.email}</td>
      <td className="text-center px-2 md:px-0 py-2">{user.lastActivity}</td>
      <td className="text-center px-2 md:px-0 py-2 hidden md:table-cell">
        {user.createdAt}
      </td>
    </tr>
  );
};

export default UserRow;
