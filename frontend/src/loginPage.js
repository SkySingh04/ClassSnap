import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

function LoginPage() {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State to track sign-in error

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { usn, password });
      console.log(response.data);
     
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      navigate(`/user/${response.data.usn}`);
       // Response from the backend
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(true);
    }
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center flex flex-col"
    style={{  backgroundColor: '#DAFFFB', }}
  >
    <Navbar />

    <div className="flex-grow flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded-md shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-4">Welcome to ClassSnap</h1>
        <h2 className="text-xl font-medium mb-6">Login to your account</h2>
        <form className="space-y-4">
          <input 
            type="text"
            placeholder="Username/USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          </form>
          {loginError && <p className="text-red-500 text-sm">Invalid username or password</p>}
          <br />
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Sign in
          </button>
      </div>
    </div>

    <Footer />
  </div>
  );
}

export default LoginPage;
