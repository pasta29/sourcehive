import WelcomeSection from "../components/dashboard/WelcomeSection";
import Main from "../components/dashboard/Main";
import Navbar from "../components/dashboard/Navbar";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-purple-950 text-white">
      <Navbar />
      <WelcomeSection />
      <main className="mt-16 flex justify-center px-4">
        <Main />
      </main>
    </div>
  );
};

export default Dashboard;
