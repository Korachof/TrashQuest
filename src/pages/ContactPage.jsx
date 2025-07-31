// Contact Page -> Lives on Footer
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

export default function ContactPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'Contact Us | TrashQuest';
  }, []);
  return (
    <>
      <h1 id="contact-us-heading" style={headingTextStyle}>
        Contact Us
      </h1>
      <p>
        Use the form below (coming soon!) to contact us. We'd love to hear from
        you!
      </p>
    </>
  );
}
