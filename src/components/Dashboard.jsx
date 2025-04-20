import { useState } from 'react';
import '../pages/css/style.css';

import UpcomingEvents from '../pages/Event/UpcomingEvents';
import RegisterEvent from '../pages/Event/EventRegistration';
import RegisteredEvents from '../pages/Event/RegisteredEvents';
import EventDetails from '../pages/Event/EventDetails';
import EventResults from '../pages/Event/EventResults';
import logo from '../assets/download (1).png';

function Dashboard({userEmail = '' }) {
  const [activePage, setActivePage] = useState('welcome');
  const [refreshRegistered, setRefreshRegistered] = useState(false);

  const handleRegisterSuccess = () => {
    setRefreshRegistered(prev => !prev);
    setActivePage('registered');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'upcoming':
        return <UpcomingEvents />;
      case 'register':
        return <RegisterEvent userEmail={userEmail} onRegisterSuccess={handleRegisterSuccess} />;
      case 'registered':
        return <RegisteredEvents userEmail={userEmail} refresh={refreshRegistered} />;
      case 'details':
        return <EventDetails />;
      case 'results':
        return <EventResults />;
      case 'welcome':
      default:
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🎉 Welcome to the College Event Dashboard</h2>
            <p>Select an option from the Left to begin exploring events.</p>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Floating Bubbles */}
      <div className="bubble" style={{ width: '40px', height: '40px', left: '10%', animationDelay: '0s', animationDuration: '12s', backgroundColor: '#D1E8E2' }}></div>
      <div className="bubble" style={{ width: '50px', height: '50px', left: '25%', animationDelay: '2s', animationDuration: '19s', backgroundColor: '#F3E4B9' }}></div>
      <div className="bubble" style={{ width: '30px', height: '30px', left: '40%', animationDelay: '1s', animationDuration: '18s', backgroundColor: '#F9D7D7' }}></div>
      <div className="bubble" style={{ width: '45px', height: '45px', left: '60%', animationDelay: '3s', animationDuration: '14s', backgroundColor: '#E0F7FA' }}></div>
      <div className="bubble" style={{ width: '35px', height: '35px', left: '75%', animationDelay: '0.5s', animationDuration: '11s', backgroundColor: '#E1F5C4' }}></div>
      <div className="bubble" style={{ width: '50px', height: '50px', left: '90%', animationDelay: '2.5s', animationDuration: '13s', backgroundColor: '#FFEBB7' }}></div>
      <div className="bubble" style={{ width: '50px', height: '50px', left: '80%', animationDelay: '2s', animationDuration: '15s', backgroundColor: '#F3D1F4' }}></div>
      <div className="bubble" style={{ width: '30px', height: '30px', left: '30%', animationDelay: '3s', animationDuration: '17s', backgroundColor: '#C1E1D0' }}></div>
      <div className="bubble" style={{ width: '40px', height: '40px', left: '15%', animationDelay: '4s', animationDuration: '20s', backgroundColor: '#FFD3D3' }}></div>
      <div className="bubble" style={{ width: '30px', height: '30px', left: '50%', animationDelay: '1s', animationDuration: '16s', backgroundColor: '#E0B0FF' }}></div>

      {/* Header */}
      <div className="dashboard-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="CEMS Logo"
            style={{
              width: '50px',
              height: '50px',
              marginRight: '10px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #fff',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
            }}
          />
          <h2>College Event Management System (CEMS)</h2>
        </div>
        <div style={{ fontWeight: 'bold' }}>
          👤 {userEmail || 'User'}
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-buttons" style={{ margin: '20px 0' }}>
        <button onClick={() => setActivePage('upcoming')}>Upcoming Events</button>
        <button onClick={() => setActivePage('register')}>Register for Event</button>
        <button onClick={() => setActivePage('registered')}>My Registered Events</button>
        <button onClick={() => setActivePage('details')}>Event Details</button>
        <button onClick={() => setActivePage('results')}>Event Results</button>
      </div>

      {/* Content */}
      <div className="content-area">
        {renderPage()}
      </div>

      {/* Animated Bubbles Background */}
      <div className="bubble-background">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 40 + 20;
          const left = Math.random() * 100;
          const delay = Math.random() * 15;
          const duration = 15 + Math.random() * 10;
          return (
            <div
              key={i}
              className="bubble"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
