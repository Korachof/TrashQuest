// Contact Page -> Lives on Footer
import React, { useEffect } from 'react';
import {
  headingTextStyle,
  subHeadingTextStyle,
  centerBodyTextStyle,
  bodyTextStyle,
} from '../styles/typography';
import { contactContent } from '../content/contact';
export default function ContactPage() {
  // Set page tab title
  useEffect(() => {
    document.title = contactContent.docTitle;
  }, []);
  return (
    <>
      <h1 id="contact-us-heading" style={headingTextStyle}>
        {contactContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{contactContent.subTitle}</h3>

      {/* TODO: create ContactForm and remove this comment except: <ContactForm /> */}

      <div style={centerBodyTextStyle}>
        <h3 style={subHeadingTextStyle}>Other Ways to Reach Us</h3>
        <p>You can also reach us through:</p>
        <p>Email: support@ecoquest.com</p>
        <p>Follow us on social media: </p>
      </div>
    </>
  );
}
