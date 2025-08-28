// Contact Page -> Lives on Footer
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { contactContent } from '../content/contact';

export default function ContactPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'Contact Us | TrashQuest';
  }, []);
  return (
    <>
      <h1 id="contact-us-heading" style={headingTextStyle}>
        {contactContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{contactContent.subTitle}</h3>
    </>
  );
}
