import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegisteredEvents = async () => {
    try {
      const name = localStorage.getItem('registeredUser');
      if (!name) return;

      const res = await axios.get(`https://event-mng-user-be.onrender.com//api/events/registered/${name}`);
      setEvents(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Unable to load registered events.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (eventName) => {
    const name = localStorage.getItem('registeredUser');
    if (!name) return;

    if (!window.confirm(`Are you sure you want to cancel registration for "${eventName}"?`)) return;

    try {
      const res = await axios.delete('https://event-mng-user-be.onrender.com//api/events/cancel', {
        data: { name, eventName }  // Sending name and event name for cancellation
      });
      alert(res.data.message);
      fetchRegisteredEvents(); // Refresh list
    } catch (error) {
      console.error('Cancellation error:', error);
      alert('Failed to cancel registration.');
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>My Registered Events</h2>
      {loading ? (
        <p>Loading your events...</p>
      ) : events.length === 0 ? (
        <p style={{ color: 'gray' }}>No events to show.</p>
      ) : (
        <ul>
          {events.map((reg) => (
            <li key={reg._id} style={{ marginBottom: '10px' }}>
              <strong>Event:</strong> {reg.event.name} <br />
              <strong>Date:</strong> {new Date(reg.event.date).toLocaleDateString()} <br />
              <strong>Time:</strong> {reg.event.time} <br />
              <button onClick={() => handleCancel(reg.event.name)} style={{ marginTop: '5px' }}>
                Cancel Registration
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegisteredEvents;
