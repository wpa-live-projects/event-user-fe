import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: ''
  });

  const [allEvents, setAllEvents] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.eventName) {
      alert('Please select an event.');
      return;
    }

    console.log('Registering with the following data:', formData); // Log the form data to check

    try {
      const res = await axios.post('https://event-mng-user-be.onrender.com/api/events/register', formData);
      alert(res.data.message);
      localStorage.setItem('registeredUser', formData.name); // Store user name in localStorage
    } catch (err) {
      console.error('Registration Error:', err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get('https://event-mng-user-be.onrender.com/api/events/events');
      setAllEvents(res.data);
    } catch (err) {
      console.error('Error fetching all events:', err);
    }
  };

  useEffect(() => {
    fetchAllEvents();

    const storedName = localStorage.getItem('registeredUser');
    if (storedName) {
      setFormData((prev) => ({ ...prev, name: storedName }));
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Register for an Event</h2>

      <form onSubmit={handleRegister} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br />

        <select
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
          defaultValue=""
        >
          <option value="" disabled>Select Event</option>
          {allEvents.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select><br />

        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default EventRegistration;
