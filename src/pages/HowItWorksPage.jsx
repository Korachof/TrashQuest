// How it Works page
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function HowItWorksPage() {
  return (
    <PageLayout>
      <h1 style={headingTextStyle}>How It Works</h1>
      <p>Learn how Trash Quest Works here!</p>
    </PageLayout>
  );
}

export default HowItWorksPage;
