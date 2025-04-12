import React from "react";
import { Sparkles } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="w-7 h-7 text-yellow-400" />
          <span>SecureDash</span>
        </div>
    </nav>
  );
};

export default Navbar;
