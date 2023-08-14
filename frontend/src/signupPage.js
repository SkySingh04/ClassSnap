import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [name, setname] = useState('');
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
      navigate(`/user/${usn}`); // Change '/dashboard' to the desired route

    } catch (error) {
      console.error('Sign-Up error:', error);

      // Show error alert
      setSignUpError(true);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} />
      <input type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
      <input type="text" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Semester" value={sem} onChange={(e) => setSem(e.target.value)} />

      {signUpError && <p style={{ color: 'red' }}>Sign-up failed. Please check your input and try again.</p>}
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;
