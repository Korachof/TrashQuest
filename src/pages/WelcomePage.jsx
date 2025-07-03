// Landing page for pre-logged in users.
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import React from 'react';

function WelcomePage() {
  return (
    <>
        <Header />
        <main style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1>Welcome to TrashQuest ♻️</h1>
            <p>Clean the planet, one collectible at a time.</p>
        </main>
        <Footer />
    </>
  );
}

export default WelcomePage;
