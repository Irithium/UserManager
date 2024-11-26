import React from "react";
import useUser from "../store/useUsers";

const UserRow = ({ user }) => {
  const { blockUser } = useUser(); // Función para bloquear usuario

  const handleBlock = () => {
    blockUser(user.id); // Lógica para bloquear al usuario
  };

  return (
    <tr>
      <td className="border border-gray-300 p-2">{user.name}</td>
      <td className="border border-gray-300 p-2">{user.email}</td>
      <td className="border border-gray-300 p-2">{user.lastActivity}</td>
      <td className="border border-gray-300 p-2">{user.creationDate}</td>
      <td className="border border-gray-300 p-2">
        <button
          className="block-button bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleBlock}
        >
          {user.isBlocked ? "Desbloquear" : "Bloquear"}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
