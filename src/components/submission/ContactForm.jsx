// Contact Form component that lives on ContactPage

import React, { useState } from 'react';
import FormGroup from '../shared/FormGroup';
import FormButton from '../shared/FormButton';
import SuccessMessage from '../shared/SuccessMessage';
import ErrorMessage from '../shared/ErrorMessage';
import { contactFormContent as content } from '../../content/contact';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission logic
      // This could be a Firebase function, API endpoint, etc.

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success handling
      setSuccessMessage(
        "Thank you for your message! We'll get back to you soon."
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
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
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your name"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Message"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Enter your message"
        rows={5}
        disabled={isSubmitting}
      />

      <FormButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </FormButton>
    </form>
  );
};

export default ContactForm;
