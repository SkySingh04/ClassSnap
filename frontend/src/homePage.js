import React from 'react';
import { Book, Edit, Sync } from '@mui/icons-material';



import AkashSingh from './images/AkashSingh.jpeg';
import ShivanshKaran from "./images/ShivanshKaran.jpeg"
import Gautam from "./images/GautamShorewala.png"
import Shashwat from "./images/Shashwat.png"

import backgroundImage from './images/onlineclass.png'
import Problem from "./images/Problem.png"
import Solution from "./images/Solution.png"
import  Github  from './images/Github.png';


import './index.css';

import Navbar from './components/navbar';
import Footer from './components/footer';

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

    const teamMembers = [
      {
        name: 'Akash Singh',
        github: 'https://github.com/Akash-Singh04/ClassSnap',
        profilePic: AkashSingh,
      },
      {
        name: 'Gautam Shorewala',
        github: 'https://github.com/GautamCoder4019k',
        profilePic: Gautam,
      },
      {
        name: 'Shashwat Kumar',
        github: 'https://github.com/shashwat6204',
        profilePic: Shashwat,
      },
      {
        name: 'Shivansh Karan',
        github: 'https://github.com/SpaceTesla',
        profilePic: ShivanshKaran,
      },
    ];

    const usageInstructions = [
      "Write instructions after project finish",
      "Sign up for an account on ClassSnap.",
      "Link your online learning platforms for synchronization.",
      "Access your class presentations through ClassSnap.",
      "Browse the generated notes and summaries for each presentation.",
    ];


    const problemStatement = "Traditional student information management systems often struggle to keep up with the increasing demand for streamlined administrative processes and personalized learning experiences. In parallel, online learning platforms have become prevalent, offering extensive course materials and digital notes. However, students often face challenges in efficiently processing and assimilating this much of information, leading to reduced learning effectiveness and academic performance.";

    const proposedSolution = "ClassSnap is an advanced web application designed to enhance student's learning experience by providing personalized access to academic details and automatically generating comprehensive notes through intelligent presentation summarization. Leveraging cutting-edge technologies, the platform employs Machine Learning algorithms to perform intelligent summarization of presentations from online class sessions. Through the use of Selenium Web Driver, ClassSnap automatically extracts relevant information from the meeting presentations and processes it with the Machine Learning algorithm to generate organized and concise notes, reducing manual effort for students. The application seamlessly integrates with popular online learning platforms, ensuring effortless synchronization of academic data.";

    
    
  return (
    <div className="bg-background text-primary min-h-screen flex flex-col relative">

      <Navbar />
      {/* Hero Section */}
      <section 
        className="flex-1 h-full container mx-auto py-32 text-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute  inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to ClassSnap</h1>
          <p className="text-lg text-white">
            Enhance your learning experience today!
          </p>
        </div>
      </section>
        
        {/* Problem and Solution Section */}
      <section  className="bg-primary py-16 px-8">
        <div className="container mx-auto text-center">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Side: Problem Statement with Image */}
            <div id="problem" className="flex flex-col justify-center items-start">
              <h1 className="text-4xl font-bold mb-8 text-white">The Problem?</h1>
              <p className="text-lg text-left text-white">{problemStatement}</p>
            </div>
            <div className="md:flex md:justify-end md:items-center">
              <img src={Problem} alt="Solution" className="max-w-base md:w-3/4" />
            </div>
            
            
            {/* Right Side: Proposed Solution with Image */}
            
            <div id="solution" className="md:flex md:items-center">
              <img src={Solution} alt="Solution" className="max-w-base md:w-3/4" />
            </div>

            <div className="flex flex-col justify-center items-end">
            
              <h2 className="text-4xl font-bold mb-8 text-right text-white">The Solution!</h2>
              <p className="text-lg text-right text-white">{proposedSolution}</p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Features Section */}
      <section id="features" className="bg-secondary py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-primary shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="text-3xl mb-4 text-accent">{feature.icon}</div>
                <h3 className="text-xl text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Instructions Section */}
      <section id="instructions" className="bg-primary py-16 px-8">
        <div className="container mx-auto text-center">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Side: Usage Instructions */}
            <div className="md:flex md:flex-col md:justify-center">
              <h2 className="text-4xl text-white font-bold mb-4 text-left">How to Use?</h2>
              <ul className="list-disc list-inside text-white text-left">
                {usageInstructions.map((instruction, index) => (
                  <li key={index} className="mb-2">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
            <a href="https://github.com/Akash-Singh04/ClassSnap">
            <img src={Github} alt="Arrow" className=" h-1/4 " />/
            <h1 className="text-xl font-semibold text-accent">View Source Code</h1>
            </a>
          </div>
            
          </div>
        </div>
      </section>
      {/* Meet the Team Section */}
      <section id="team" className="bg-secondary py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 bg-primary shadow-lg rounded-lg">
                <img
                  src={member.profilePic}
                  alt={`${member.name} Profile`}
                  className="w-20 h-20 mx-auto mb-2 rounded-full"
                />
                <h3 className="text-lg text-accent font-semibold mb-2">{member.name}</h3>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      
      
    </div>
      
  );
}

export default HomePage;
