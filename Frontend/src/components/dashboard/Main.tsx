import React, { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

const Main: React.FC = () => {
  const [formData, setFormData] = useState({ source: '', email: '', password: '' });
  const [cards, setCards] = useState<typeof formData[]>([]);
  const [leakResults, setLeakResults] = useState<Record<number, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.source || formData.email || formData.password) {
      setCards(prev => [...prev, formData]);
      setFormData({ source: '', email: '', password: '' });
    }
  };

  const checkDataLeak = async (index: number, data: typeof formData) => {
    try {
      const response = await fetch("http://localhost:3000/check-leak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLeakResults(prev => ({ ...prev, [index]: result.message }));
    } catch (error) {
      console.error("Error checking leak:", error);
      setLeakResults(prev => ({ ...prev, [index]: "Error occurred" }));
    }
  };

  return (
    <main className="mt-16 px-4">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Form Section - 4 Columns */}
      <div className="md:col-span-4">
        <div className="w-full bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-2xl shadow-xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add Personal Information</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-white mb-1">Source Name</label>
                <input
                  id="source"
                  placeholder="John Doe"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                <input
                  id="password"
                  type="Pass"
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
                        <p className="text-lg font-semibold">{card.source}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-lg font-semibold">{card.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium">password</p>
                        <p className="text-lg font-semibold">{card.password}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => checkDataLeak(index, card)}
                    className="w-full px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-300"
                  >
                    Check leak
                  </button>
                  {leakResults[index] && (
                    <p className="text-sm text-white/80 mt-2 text-center">{leakResults[index]}</p>
                  )}
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
