import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { MdOutlineLogin } from "react-icons/md";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="group flex items-center justify-start w-8 md:w-8 lg:w-10 h-8 md:h-9 lg:h-10  bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
    >
      <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
        <MdOutlineLogin className="size-5 md:size-6" />
      </div>
      <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Logout
      </div>
    </button>
  );
};

export default LogoutButton;
