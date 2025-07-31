// Landing page for pre-logged in users.
import React, { useEffect } from 'react';
import StartQuestButton from '../components/navigation/StartQuestButton';
import { headingTextStyle } from '../styles/typography';

export default function WelcomePage() {
  useEffect(() => {
    document.title = 'Welcome | TrashQuest';
  }, []);
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <>
      <h1 id="welcome-heading" style={headingTextStyle}>
        Welcome to TrashQuest ♻️
      </h1>
      <p>Clean the planet, one collectible at a time.</p>
      <StartQuestButton />
    </>
  );
}
