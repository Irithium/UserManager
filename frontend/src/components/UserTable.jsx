import React from "react";
import UserRow from "./UserRow";

const UsersTable = ({ users }) => {
  return (
    <div className="user-table">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Última Actividad</th>
            <th className="border border-gray-300 p-2">Fecha de Creación</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
