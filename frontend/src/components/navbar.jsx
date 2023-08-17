import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  

  return (
    <nav className="bg-primary text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-semibold">
          ClassSnap
        </Link>
      </div>
      <div className="md:hidden">
        <Link to="/login" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">
          Login
        </Link>
        <Link to="/signup" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">
          Signup
        </Link>
      </div>
      <div className="hidden md:flex space-x-4">
            <a href="/#problem" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">Problem</a>
            <a href="/#solution" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">Solution</a>
            <a href="/#features" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">Features</a>
            <a href="/#instructions" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">Instructions</a>
            <a href="/#team" className="text-white  px-4 py-2 rounded-full hover:bg-opacity-80">Team</a>
            
        <a href="https://github.com/Akash-Singh04/ClassSnap" className="text-white text-primary px-4 py-2 rounded-full hover:bg-opacity-80">
          Source Code
        </a>
        <Link to="/login" className=" text-white px-4 py-2 rounded-full hover:bg-opacity-80">
          Login
        </Link>
        <Link to="/signup" className=" text-white px-4 py-2 rounded-full hover:bg-opacity-80">
          Signup
        </Link>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;