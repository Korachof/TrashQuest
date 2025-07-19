// How it Works page
import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function HowItWorksPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'How It Works | TrashQuest';
  }, []);

  return (
    <div>
      <h1 style={headingTextStyle}>How It Works</h1>
      <p>Learn how Trash Quest Works here!</p>
    </div>
  );
}

export default HowItWorksPage;
