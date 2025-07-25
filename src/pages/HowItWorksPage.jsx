// How it Works page
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

function HowItWorksPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'How It Works | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="how-it-works-heading" style={headingTextStyle}>
        How It Works
      </h1>
      <p>Learn how Trash Quest Works here!</p>
    </>
  );
}

export default HowItWorksPage;
