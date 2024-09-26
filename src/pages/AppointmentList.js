import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function AppointmentCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // States for editing an appointment
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(appointmentList); // Check appointment data
      setAppointments(appointmentList);
    };

    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setEditDate(appointment.date);
    setEditTime(appointment.time);
  };

  const handleSaveEdit = async (id) => {
    const appointmentDoc = doc(db, 'appointments', id);

    // Validate: Prevent saving appointments in the past
    const newDateTime = new Date(`${editDate}T${editTime}`);
    if (newDateTime < new Date()) {
      alert('Cannot schedule an appointment in the past.');
      return;
    }

    // Update the appointment in Firestore
    try {
      await updateDoc(appointmentDoc, {
        date: editDate,
        time: editTime,
      });

      // Refresh appointment list after update
      const updatedAppointments = appointments.map(app =>
        app.id === id ? { ...app, date: editDate, time: editTime } : app
      );
      setAppointments(updatedAppointments);
      setEditingAppointment(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const getAppointmentsForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    return appointments.filter(appointment => appointment.date === formattedDate);
  };

  const appointmentsForSelectedDate = getAppointmentsForDate(selectedDate);

  return (
    <div>
      <h2>Appointments</h2>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>
                {editingAppointment?.id === appointment.id ? (
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Disable past dates
                  />
                ) : (
                  appointment.date
                )}
              </td>
              <td>
                {editingAppointment?.id === appointment.id ? (
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                  />
                ) : (
                  appointment.time
                )}
              </td>
              <td>
                {editingAppointment?.id === appointment.id ? (
                  <button onClick={() => handleSaveEdit(appointment.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(appointment)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentCalendar;
