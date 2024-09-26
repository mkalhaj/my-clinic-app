import React, { useState } from 'react'; //...
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import FileUpload from '../components/FileUpload'; // Import FileUpload

function AppointmentForm() {
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Step 1: Check if the selected date and time are in the past
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < new Date()) {
      setError('Cannot schedule an appointment in the past.');
      return;
    }

    try {
      // Step 2: Check for existing appointments at the same date and time
      const appointmentsCollection = collection(db, 'appointments');
      const q = query(appointmentsCollection, where('date', '==', date), where('time', '==', time));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('An appointment is already booked at this time. Please choose another time.');
        return;
      }

      // Step 3: Add new appointment if no conflicts
      await addDoc(collection(db, 'appointments'), {
        patientName,
        date,
        time,
      });

      setSuccess('Appointment scheduled successfully!');
      setPatientName('');
      setDate('');
      setTime('');

    } catch (error) {
      setError('Error scheduling appointment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        {/* Add the file upload component */}
        <FileUpload />
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
