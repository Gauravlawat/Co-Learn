import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SessionDetailPage from './pages/SessionDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <div className="container">
          <Routes>
            <Route path="/" element={<RegisterPage />} /> 
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/session/:id" element={<SessionDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;