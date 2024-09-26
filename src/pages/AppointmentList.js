import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function AppointmentCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(appointmentList); // Log to check the appointment data
      setAppointments(appointmentList);
    };

    fetchAppointments();
  }, []);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAppointmentsForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    return appointments.filter(appointment => appointment.date === formattedDate);
  };

  const appointmentsForSelectedDate = getAppointmentsForDate(selectedDate);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Appointment Calendar</h2>
      <Calendar onChange={onDateChange} value={selectedDate} />
      <div style={{ marginTop: '20px' }}>
        <h3>Appointments on {selectedDate.toDateString()}:</h3>
        {appointmentsForSelectedDate.length > 0 ? (
          <ul>
            {appointmentsForSelectedDate.map((appointment) => (
              <li key={appointment.id}>
                {appointment.patientName} at {appointment.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments for this date.</p>
        )}
      </div>
    </div>
  );
}

export default AppointmentCalendar;
