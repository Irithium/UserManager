import React, { useEffect, useState } from "react";
import useUser from "../store/useUsers";
import logoIcon from "../../public";

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

  return (
    <div className="user-panel">
      <header className="header">
        <div className="logo">Mi Aplicación</div>
        <div className="user-info">
          <span className="username">Nombre del Usuario</span>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <main className="main-content">
        <div className="documentation">
          <h2>Documentación</h2>
          <p>
            Aquí puedes encontrar información sobre cómo usar la aplicación.
          </p>
        </div>

        <div className="user-table">
          <h2>Lista de Usuarios</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Última Actividad</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Usuario 1</td>
                <td>usuario1@example.com</td>
                <td>2023-10-01</td>
                <td>2023-01-01</td>
                <td>
                  <button className="block-button">Bloquear</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserList;
