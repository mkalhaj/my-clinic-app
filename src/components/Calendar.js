import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // This imports the necessary styles
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function AppointmentCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
        try{
      const appointmentsCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentList);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
  };
    

    fetchAppointments();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // Filter appointments based on the selected date
  const appointmentsForDate = appointments.filter(
    (appointment) => new Date(appointment.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Appointment Calendar</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      
      <h3>Appointments on {selectedDate.toDateString()}:</h3>
      {appointmentsForDate.length > 0 ? (
        <ul>
          {appointmentsForDate.map((appointment) => (
            <li key={appointment.id}>
                 {/* Ensure patientName and time exist */}
                 {appointment.patientName || 'Unknown Patient'} - {appointment.time || 'Unknown Time'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments for this date.</p>
      )}
    </div>
  );
}

export default AppointmentCalendar;
