// About Us Page
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

function AboutPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'About | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="about-us-heading" style={headingTextStyle}>
        About Us
      </h1>
      <p>Learn more about us at Trash Quest!</p>
    </>
  );
}

export default AboutPage;
