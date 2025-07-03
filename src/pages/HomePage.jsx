// Landing page/screen for users
import Header from '../components/layout/Header';
import React from 'react';

function HomePage() {
  return (
    <>
        <Header />
        <main style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1>Welcome to TrashQuest ♻️</h1>
            <p>Clean the planet, one collectible at a time.</p>
        </main>
    </>
  );
}

export default HomePage;
