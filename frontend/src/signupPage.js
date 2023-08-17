import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import backgroundImage from './images/loginbg.svg';


function SignUpPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usn, setUsn] = useState('');
  const [section, setSection] = useState('');
  const [branch, setBranch] = useState('');
  const [phone, setPhone] = useState('');
  const [sem, setSem] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false); // State to track sign-in error

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // You can add client-side validation here if needed
      if (password !== confirmPassword) {
        window.alert("Passwords do not match.");
        return;
      }

      const userData = {
        name,
        password,
        email,
        usn,
        section,
        branch,
        phone,
        sem,
      };

      const response = await axios.post('http://localhost:5000/signup', userData);
      console.log(response.data); // Response from the backend

      // Show success alert
      window.alert('Sign-up successful!');

      // Assuming you want to navigate to a dashboard or profile page after successful sign-up
      const tokenResponse = await axios.post('http://localhost:5000/login', { usn, password });
      const token = tokenResponse.data.token;
      localStorage.setItem('token', token);
      navigate(`/user/${usn}`); // Change '/dashboard' to the desired route

    } catch (error) {
      console.error('Sign-Up error:', error);

      // Show error alert
      setSignUpError(true);
    }
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center flex flex-col"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Navbar />

    <div className="flex-grow flex justify-left items-center ml-32">
      <div className="bg-gray-300 p-8 rounded-md shadow-md w-96 mt-12 mb-12">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
        />
        <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                className="flex-grow px-4 w-36 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Semester"
                value={sem}
                onChange={(e) => setSem(e.target.value)}
                className="flex-grow px-4 w-36 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="flex-grow px-4 w-36 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="flex-grow px-4 w-36 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 mb-6"
        />

        {signUpError && <p className="text-red-500">Sign-up failed. Please check your input and try again.</p>}
        <button
          onClick={handleSignUp}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>

    <Footer />
  </div>

  );
}

export default SignUpPage;