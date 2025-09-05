// Contact Page -> Lives on Footer
import React, { useEffect } from 'react';
import {
  headingTextStyle,
  subHeadingTextStyle,
  centerBodyTextStyle,
} from '../styles/typography';
import { contactContent } from '../content/contact';
import ContactForm from '../components/submission/ContactForm';

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

      <ContactForm />

      <div style={centerBodyTextStyle}>
        <h3 style={subHeadingTextStyle}>
          {contactContent.otherContactSubTitle}
        </h3>
        <p>{contactContent.otherContactText}</p>
        <p>{contactContent.emailTxt}</p>
        <p>{contactContent.socialMediaTxt}</p>
      </div>
    </>
  );
}
