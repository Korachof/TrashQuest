// Landing page for pre-logged in users.
import React, { useEffect } from 'react';
import StartQuestButton from '../components/navigation/StartQuestButton';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { centerButtonLayout } from '../styles/layout';

export default function WelcomePage() {
  useEffect(() => {
    document.title = 'Welcome | TrashQuest';
  }, []);
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <>
      <h1 id="welcome-heading" style={headingTextStyle}>
        Welcome to TrashQuest
      </h1>
      <p style={subHeadingTextStyle}>
        Clean the planet, one collectible at a time.
      </p>
      <div style={centerButtonLayout}>
        <StartQuestButton />
      </div>
    </>
  );
}
