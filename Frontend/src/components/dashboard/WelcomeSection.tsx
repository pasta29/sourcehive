import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../../api/dashboard";

const WelcomeSection: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const getDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated. Token is missing.");
        return;
      }

      try {
        const data = await fetchDashboardData(token);
        setWelcomeMessage(data.message);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred while fetching dashboard.");
        }
      }
    };

    getDashboardData();
  }, []);

  return (
    <header className="text-center mt-16">
      <h1 className="text-5xl font-extrabold drop-shadow-lg">
        {welcomeMessage}
      </h1>
      <p className="mt-4 text-lg text-white/90">Manage your personal vault securely and beautifully.</p>
    </header>
  );
};

export default WelcomeSection;
