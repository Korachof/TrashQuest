// Contact Page -> Lives on Footer
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function ContactPage() {
  return (
    <PageLayout>
      <h1 style={headingTextStyle}>Contact Us</h1>
      <p>
        Use the form below (coming soon!) to contact us. We'd love to hear from
        you!
      </p>
    </PageLayout>
  );
}

export default ContactPage;
