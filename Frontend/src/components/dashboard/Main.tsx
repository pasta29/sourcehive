import React, { useState, useEffect } from "react";
import { User, Mail, Phone } from "lucide-react";
import { fetchVaultCredentials, addVaultCredential, deleteVaultCredential } from "../../api/dashboard";
import { checkDataLeak } from "../../api/dataLeak"; // Import the API
import { AxiosError } from "axios";

interface LeakDetails {
  email: string;
  password: string;
  sha1: string;
  sources: string[];
}

const Main: React.FC = () => {
  const [formData, setFormData] = useState({ platform: '', username: '', password: '' });
  const [cards, setCards] = useState<typeof formData[]>([]);
  const [leakResults, setLeakResults] = useState<Record<number, string>>({});
  const [leakDetails, setLeakDetails] = useState<LeakDetails | null>(null); // State to store detailed leak information
  const token = localStorage.getItem("token") || ""; // Retrieve token from local storage

  useEffect(() => {
    const loadVaultCredentials = async () => {
      if (!token) {
        console.error("User is not authenticated. Token is missing.");
        return;
      }

      try {
        const credentials = await fetchVaultCredentials(token);
        setCards(credentials);
      } catch (error) {
        console.error("Error fetching vault credentials:", error);
      }
    };

    loadVaultCredentials();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.platform || formData.username || formData.password) {
      try {
        if (!token) {
          console.error("User is not authenticated. Token is missing.");
          return;
        }

        await addVaultCredential(token, formData);
        setCards(prev => [...prev, {platform: formData.platform, username: formData.username, password: formData.password}]);
        setFormData({ platform: '', username: '', password: '' });
      } catch (error) {
        if ((error as AxiosError).message === "The platform already exists for this user. Please use a different platform.") {
          alert("This platform already exists. Please use a different platform.");
        } else {
          console.error("Error adding vault credential:", error);
          alert("An error occurred while adding the credential. Please try again.");
        }
      }
    }
  };

  const handleCheckDataLeak = async (index: number, username: string) => {
    try {
      const response = await checkDataLeak(username); // Use the imported API
      if (response.success && response.found) {
        const leakInfo = response.result[0];
        setLeakResults(prev => ({ ...prev, [index]: "Data leak found!" }));
        setLeakDetails({ ...leakInfo, sources: [leakInfo.sources] }); // Convert sources to an array
      } else {
        setLeakResults(prev => ({ ...prev, [index]: "No data leak found." }));
        setLeakDetails(null);
      }
    } catch (error) {
      console.error("Error checking data leak:", error);
      setLeakResults(prev => ({ ...prev, [index]: "Error occurred" }));
      setLeakDetails(null);
    }
  };

  const handleDelete = async (platform: string) => {
    if (!token) {
      console.error("User is not authenticated. Token is missing.");
      return;
    }
  
    try {
      await deleteVaultCredential(token, platform);
      setCards(prev => prev.filter(card => card.platform !== platform)); // Remove the deleted card from the state
      alert("Credential deleted successfully.");
    } catch (error) {
      console.error("Error deleting vault credential:", error);
      alert("An error occurred while deleting the credential. Please try again.");
    }
  };

  return (
    <main className="mt-16 px-4">
      {/* Leak Details Section */}
      {leakDetails && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Data Leak Details</h3>
          <p><strong>Email:</strong> {leakDetails.email}</p>
          <p><strong>Password:</strong> {leakDetails.password}</p>
          <p><strong>SHA1:</strong> {leakDetails.sha1}</p>
          <p><strong>Sources:</strong> {leakDetails.sources}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form Section - 4 Columns */}
        <div className="md:col-span-4">
          <div className="w-full bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-2xl shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Add Personal Information</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-white mb-1">Platform</label>
                  <input
                    id="platform"
                    placeholder="John Doe"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white mb-1">Username</label>
                  <input
                    id="username"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition duration-300"
                >
                  Save Info
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Display Section - 8 Columns */}
        <div className="md:col-span-8">
          <div className="w-full h-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Your Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-1 shadow-lg">
                  <div className="bg-indigo-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm font-medium">Full Name</p>
                          <p className="text-lg font-semibold">{card.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm font-medium">Username</p>
                          <p className="text-lg font-semibold">{card.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm font-medium">Password</p>
                          <p className="text-lg font-semibold">{card.password}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCheckDataLeak(index, card.username)}
                      className="w-full px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-300"
                    >
                      Check leak
                    </button>
                    {leakResults[index] && (
                      <p className="text-sm text-white/80 mt-2 text-center">{leakResults[index]}</p>
                    )}
                    <button
                      onClick={() => handleDelete(card.platform)}
                      className="w-full px-4 py-2 rounded-lg bg-red-400 text-white font-semibold hover:bg-red-600 transition duration-300 mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
