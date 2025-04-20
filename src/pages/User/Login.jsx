import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request
     // ✅ Corrected Login.jsx
const res = await axios.post('https://event-mng-user-be.onrender.com/api/users/login', form);

      alert('Login successful!');
      
      // Log redirection to dashboard
      console.log('Redirecting to dashboard...');
      
      // ✅ Redirect to dashboard after login success
      navigate('/dashboard');
    } catch (err) {
      // Improved error handling
      if (err.response) {
        // If there's a response from the server, handle accordingly
        alert(err.response.data.message || 'Login failed. Please check your credentials.');
        console.error('Error response:', err.response);
      } else if (err.request) {
        // If the request was made but no response was received
        alert('No response from the server. Please try again later.');
        console.error('Error request:', err.request);
      } else {
        // If the error happened during setting up the request
        alert('An error occurred. Please try again.');
        console.error('Error message:', err.message);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
