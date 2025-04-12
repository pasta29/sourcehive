import LoginForm from "../components/auth/LoginForm";
import { FC } from "react";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-out opacity-0 animate-fade-in">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">Login</h2>
        </div>
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-300 underline hover:text-blue-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
