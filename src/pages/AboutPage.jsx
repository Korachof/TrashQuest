// About Us Page
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

function AboutPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'About | TrashQuest';
  }, []);

  return (
    <div>
      <h1 style={headingTextStyle}>About Us</h1>
      <p>Learn more about us at Trash Quest!</p>
    </div>
  );
}

export default AboutPage;
