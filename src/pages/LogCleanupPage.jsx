// Navigation page for user to log their cleanup info and gain points
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

export default function LogCleanupPage() {
  const lastModifiedDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = 'Log Cleanup | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="log-cleanup-heading" style={headingTextStyle}>
        Log Your Cleanup 🌱
      </h1>
      <p>
        This is where you'll log your cleanup activities and earn Eco Points!
      </p>
      <p>
        <em>Form coming soon...</em>
      </p>
    </>
  );
}
