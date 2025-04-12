import { useState } from 'react';
import { login } from '../../api/auth';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [userID, setUserID] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await login(userID, masterPassword);
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
    } catch (error) {
        if (error instanceof AxiosError) {
          setMessage(error.response?.data?.message || 'Login failed');
        } else {
          setMessage('Login failed');
        }
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700">User ID</label>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Login
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
};

export default LoginForm;