import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import PatientForm from './pages/PatientForm';
import AppointmentForm from './pages/AppointmentForm';
import PatientList from './pages/PatientList';
import AppointmentList from './pages/AppointmentList';
import AppointmentCalendar from './components/Calendar'; // Import the new Calendar component
import GlobalStyles from './styles/globalStyles';


function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
      
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/PatientList">Patient List</Link></li>
              
              <li><Link to="/calendar">Appointment Calendar</Link></li> {/* Add calendar link */}

            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PatientForm" element={<PatientForm />} />
            <Route path="/AppointmentForm" element={<AppointmentForm />} />
            <Route path="/PatientList" element={<PatientList />} />
            <Route path="/AppointmentList" element={<AppointmentList />} />
            <Route path="/calendar" element={<AppointmentCalendar />} /> {/* Add calendar route */}
            
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
