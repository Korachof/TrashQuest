// Landing page for pre-logged in users.
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StartQuestButton from '../components/navigation/StartQuestButton';
import { headingTextStyle } from '../styles/typography';

function WelcomePage() {
  useEffect(() => {
    document.title = 'Welcome | TrashQuest';
  }, []);
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <div>
      <h1 style={headingTextStyle}>Welcome to TrashQuest ♻️</h1>
      <p>Clean the planet, one collectible at a time.</p>
      <StartQuestButton />
    </div>
  );
}

export default WelcomePage;
