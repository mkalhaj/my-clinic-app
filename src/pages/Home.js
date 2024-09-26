import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to My Clinic App</h1>
      <p>Select an option below:</p>
      <ul>
        <li><Link to="/PatientForm">Add Patient Information</Link></li>
        <li><Link to="/AppointmentForm">Schedule Appointment</Link></li>
      </ul>
    </div>
  );
}

export default Home;
