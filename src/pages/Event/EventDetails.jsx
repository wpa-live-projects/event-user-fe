import React, { useState } from 'react';
import axios from 'axios';

const EventDetails = () => {
  const [eventName, setEventName] = useState('');
  const [event, setEvent] = useState(null);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`https://event-mng-user-be.onrender.com/api/events/details/${eventName}`);
      setEvent(res.data);
    } catch (err) {
      alert('Event not found');
      setEvent(null);
    }
  };

  return (
    <div>
      <h2>Check Event Details</h2>
      <input
        type="text"
        placeholder="Enter Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button onClick={fetchDetails}>Fetch Details</button>

      {event && (
        <div>
          <h3>{event.name}</h3>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Rules:</strong> {event.rules}</p>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
