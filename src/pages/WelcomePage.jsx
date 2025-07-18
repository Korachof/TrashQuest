// Landing page for pre-logged in users.
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLayout from '../components/layout/PageLayout';
import StartQuestButton from '../components/navigation/StartQuestButton';
import { headingTextStyle } from '../styles/typography';
import React from 'react';

function WelcomePage() {
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
