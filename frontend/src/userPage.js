import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';


import Navbar from './components/navbar';
import Footer from './components/footer';

function UserPage() {
  const [userData, setUserData] = useState(null);
  const { usn } = useParams();
  const navigate = useNavigate();
  const userNotes =[]
  
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
        if(error.response.status===401)
        {
           alert("Not authorized")
           navigate('/login');
        }
        console.error('Error fetching user data:', error);

      }
    };
    fetchUserData();

  }, [usn,navigate]);

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
    <div className="bg-background text-primary min-h-screen flex flex-col relative">
      {/* Navbar (if you want to include it) */}
      <Navbar />
      {/* User Profile Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <img src={"userImage"} alt="User Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h2 className="text-3xl font-semibold">{userData.usn}</h2>
          <p className="text-lg">{userData.Email}</p>
        </div>
      </section>
      
      {/* User Information Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Section</h3>
              <p>{userData.Section}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Branch</h3>
              <p>{userData.Branch}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p>{userData.Phone}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Semester</h3>
              <p>{userData.Semester}</p>
            </div>
          </div>
        </div>
      </section>
      {/* User Notes Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold mb-4">My Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userNotes.map((note, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">{note.title}</h4>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      </div>
      
  );
}

export default UserPage;
