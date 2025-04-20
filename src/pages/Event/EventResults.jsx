import { useEffect, useState } from 'react';
import axios from 'axios';

function EventResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('https://event-mng-user-be.onrender.com//api/events/results').then(res => {
      setResults(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Event Results</h2>
      <ul>
  {results.map(result => (
    <li key={result._id}>
      {result.event ? result.event.name : "Unnamed Event"}<br />
      Winners:
      <ul>
        {result.winners.map((winner, index) => (
          <li key={index}>
            {winner.position}: {winner.name}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

    </div>
  );
}

export default EventResults;
