// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage.js';
import Users from './components/Users'; // Import Users component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;