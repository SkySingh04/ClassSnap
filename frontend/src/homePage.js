import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Edit, Sync } from '@mui/icons-material';
import backgroundImage from './onlineclass3.png'
function HomePage() {

    const features = [
        {
          icon: <Book />,
          title: 'Personalized Learning',
          description: 'Access your academic details in a personalized manner to enhance your learning journey.',
        },
        {
          icon: <Edit />,
          title: 'Automated Note Generation',
          description: 'Leverage cutting-edge technology to generate concise notes from class presentations.',
        },
        {
          icon: <Sync />,
          title: 'Integration',
          description: 'Seamlessly sync your academic data with popular online learning platforms.',
        },
      ];


  return (
    <div className="bg-background text-primary min-h-screen flex flex-col relative">

      {/* Navbar */}
      <nav className="bg-secondary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">ClassSnap</div>
          <div>
            <Link to="/login" className="text-white mx-2">Login</Link>
            <Link to="/signup" className="text-white mx-2">Signup</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="flex-1 container mx-auto py-32 text-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to ClassSnap</h1>
          <p className="text-lg text-white">
            Enhance your learning experience with personalized access to academic details and automated note generation.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-4 text-accent">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary py-4 text-center">
        <p>&copy; 2023 ClassSnap. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
