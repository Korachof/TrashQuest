// How it Works page
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';

export default function HowItWorksPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'How It Works | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="how-it-works-heading" style={headingTextStyle}>
        How It Works
      </h1>
      <h3 style={subHeadingTextStyle}>Learn how Trash Quest Works here!</h3>
    </>
  );
}
