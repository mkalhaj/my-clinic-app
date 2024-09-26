import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import FileUpload from '../components/FileUpload'; // Import FileUpload

function PatientForm() {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    allergies: '',
    medicalHistory: '',
  });

  const [errors, setErrors] = useState({});
  // Validate form fields
  const validate = () => {
    let formErrors = {};
    if (!patient.name) formErrors.name = 'Name is required';
    if (!patient.age || isNaN(patient.age) || patient.age <= 0) formErrors.age = 'Valid age is required';
    if (!patient.contact) formErrors.contact = 'Contact information is required';
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
        await addDoc(collection(db, 'patients'), patient);
        console.log('Patient details saved successfully!');
        setPatient({
          name: '',
          age: '',
          gender: '',
          contact: '',
          allergies: '',
          medicalHistory: ''
        });

        setErrors({});
      } catch (error) {
        console.error('Error saving patient details: ', error);
      }
    };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient Information Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={patient.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <br />

        <label>Age:</label>
        <input type="number" name="age" value={patient.age} onChange={handleChange} />
        {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
        <br />

        <label>Gender:</label>
        <input type="text" name="gender" value={patient.gender} onChange={handleChange} />
        <br />

        <label>Contact:</label>
        <input type="text" name="contact" value={patient.contact} onChange={handleChange} />
        {errors.contact && <p style={{ color: 'red' }}>{errors.contact}</p>}
        <br />

        <label>Allergies:</label>
        <textarea name="allergies" value={patient.allergies} onChange={handleChange} />
        <br />

        <label>Medical History:</label>
        <textarea name="medicalHistory" value={patient.medicalHistory} onChange={handleChange} />
        <br />
         
         {/* Add the file upload component */}
         <FileUpload />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;
