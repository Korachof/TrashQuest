// Contact Page -> Lives on Footer
import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function ContactPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'Contact Us | TrashQuest';
  }, []);
  return (
    <div>
      <h1 style={headingTextStyle}>Contact Us</h1>
      <p>
        Use the form below (coming soon!) to contact us. We'd love to hear from
        you!
      </p>
    </div>
  );
}

export default ContactPage;
