import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State to track sign-in error

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { usn, password });
      console.log(response.data);
      navigate(`/user/${response.data.usn}`);
       // Response from the backend
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(true);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={usn} onChange={(e) => setUsn(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {loginError && <p>Invalid username or password</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
