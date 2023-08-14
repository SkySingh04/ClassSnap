import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserPage() {
  const [userData, setUserData] = useState(null);
  const { usn } = useParams();
  useEffect(() => {
    // Fetch user details based on the username from the backend
    const fetchUserData = async () => {
      try {
        console.log(usn);
        const response = await axios.get(`http://localhost:5000/user/${usn}`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [usn]);

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
      
    </div>
  );
}

export default UserPage;
