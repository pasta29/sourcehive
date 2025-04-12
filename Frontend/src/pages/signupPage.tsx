import { Link } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import { FC } from "react";

const SignupPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-out opacity-0 animate-fade-in">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">Create Account</h2>
          <p className="text-white/80 text-sm mt-2 drop-shadow-sm">
            Join us and have a secure experience
          </p>
        </div>
        <SignupForm />
        <div className="mt-4 text-center">
          <p className="text-white">
            Already have account?{" "}
            <Link to="/login" className="text-blue-300 underline hover:text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
