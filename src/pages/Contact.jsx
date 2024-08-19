// src/components/Contact.js

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import '../style/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);

      // Clear the form after submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Set submission status to success
      setSubmissionStatus('success');
    } catch (e) {
      console.error("Error adding document: ", e);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="contact-container">
      <h1>Байланыш</h1>
      <p>Биз менен байланышыңыз</p>
      {submissionStatus === 'success' && (
        <p className="success-message">Сиздин кабарыңыз ийгиликтүү жөнөтүлдү!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="error-message">Ката кетти, кайра аракет кылыңыз!</p>
      )}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Атыңыз</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Кабар</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Тапшыруу</button>
      </form>
    </div>
  );
}

export default Contact;
