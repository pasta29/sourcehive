import React from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Sparkles className="w-7 h-7 text-yellow-400" />
        <span>SecureDash</span>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
