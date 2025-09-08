// Contact Form component that lives on ContactPage
import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import FormGroup from '../shared/FormGroup';
import FormButton from '../shared/FormButton';
import SuccessMessage from '../shared/SuccessMessage';
import ErrorMessage from '../shared/ErrorMessage';
import { contactFormContent as content } from '../../content/contact';
import HoneypotField from '../shared/HoneypotField';
import useRateLimit from '../../hooks/useRateLimit';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser } = useAuth();
  const [honeypot, setHoneypot] = useState('');

  // rate limiter for the form
  const { isRateLimited, timeRemaining, recordSubmission } =
    useRateLimit('contactFormSubmit');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage(content.noNameError);
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage(content.noEmailError);
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(content.emailValError);
      return false;
    }

    // Confirm email
    if (formData.emailConfirm.toLowerCase() !== formData.email.toLowerCase()) {
      setErrorMessage('Email addresses do not match');
      return false;
    }

    if (!formData.message.trim()) {
      setErrorMessage(content.noMsgError);
      return false;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage(content.msgValError);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing messages
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Validate that the honeypot field hasn't been typed into, else is a bot
    if (honeypot) {
      // Bot detected, silently return
      setSuccessMessage('Thank you for your message!');
      setFormData({ name: '', email: '', emailConfirm: '', message: '' });
      return; // Don't actually save
    }

    // Check if the rate is limited, and if so, ask user to wait.
    if (isRateLimited) {
      setErrorMessage(
        `Please wait ${timeRemaining} seconds before submitting again`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Firestore
      const contactData = {
        name: formData.name,
        email: formData.email.toLowerCase(),
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'unread', // To track if you've read it
        userId: currentUser?.uid || null, // Link to user if logged in
      };

      await addDoc(collection(db, 'contactMessages'), contactData);

      // Success handling
      setSuccessMessage(
        "Thank you for your message! We'll get back to you soon."
      );

      // Record the submission time for the rate limiter
      await addDoc(collection(db, 'contactMessages'), contactData);
      recordSubmission();

      // Reset form
      setFormData({
        name: '',
        email: '',
        emailConfirm: '',
        message: '',
      });
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again later.');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />

      <FormGroup
        label="Name"
        id="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your name"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Confirm Email"
        id="emailConfirm"
        type="email"
        value={formData.emailConfirm}
        onChange={handleChange}
        required
        placeholder="Re-enter your email"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Message"
        id="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Enter your message"
        rows={5}
        disabled={isSubmitting}
      />

      {/* Honeypot field */}
      <HoneypotField
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <FormButton type="submit" disabled={isSubmitting || isRateLimited}>
        {isSubmitting
          ? 'Sending...'
          : isRateLimited
          ? `Wait ${timeRemaining}s`
          : 'Send Message'}
      </FormButton>
    </form>
  );
};

export default ContactForm;
