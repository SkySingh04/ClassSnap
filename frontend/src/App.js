import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './loginPage';
import UserPage from './userPage';

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes >
    </Router>
  );
}

export default App;

