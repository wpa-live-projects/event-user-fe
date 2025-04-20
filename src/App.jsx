import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../src/pages/User/Signup';
import Login from '../src/pages/User/Login';
import Dashboard from '../src/components/Dashboard';
// 👈 import the CSS file

function App() {
  return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
  );
}

export default App;
