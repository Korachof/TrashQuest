// Landing page for pre-logged in users.
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLayout from '../components/layout/PageLayout';
import React from 'react';

function WelcomePage() {
  return (
    <PageLayout>
      <h1>Welcome to TrashQuest ♻️</h1>
      <p>Clean the planet, one collectible at a time.</p>
    </PageLayout>
  )
}

export default WelcomePage;
