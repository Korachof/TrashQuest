// Contact Page -> Lives on Footer
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';

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
      <h3 style={subHeadingTextStyle}>
        Use the form below (coming soon!) to contact us. We'd love to hear from
        you!
      </h3>
    </>
  );
}
