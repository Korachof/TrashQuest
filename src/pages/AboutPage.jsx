// About Us Page
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';

export default function AboutPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'About | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="about-us-heading" style={headingTextStyle}>
        About Us
      </h1>
      <h3 style={subHeadingTextStyle}>Learn more about us at Trash Quest!</h3>
    </>
  );
}
