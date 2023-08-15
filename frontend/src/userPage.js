import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function UserPage() {
  const [userData, setUserData] = useState(null);
  const { usn } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user details based on the username from the backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/user/${usn}`, {
          headers: {
            Authorization: token, // Include the JWT token in the request headers
          },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [usn]);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // After logging out, navigate to the login page or any other page
    navigate('/login');
  };

  if (!userData) {
    return <div>Invalid user....</div>;
  }
  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      <p>Username: {userData.usn}</p>
      <p>Email: {userData.email}</p>
      <p>Section: {userData.section}</p>
      <p>Branch: {userData.branch}</p>
      <p>Phone: {userData.phone}</p>
      <p>Semester: {userData.sem}</p>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserPage;
