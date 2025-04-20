import { useEffect, useState } from 'react';
import axios from 'axios';

function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('https://event-mng-user-be.onrender.com/api/events/upcoming');
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.name}</h3>
          <p>{event.date}</p>
          <p>{event.venue}</p>
        </div>
      ))}
    </div>
  );
}

export default UpcomingEvents;
