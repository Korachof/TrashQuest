// Page for Privacy Policy
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

export default function PrivacyPage() {
  const lastModifiedDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = 'Privacy | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="privacy-heading" style={headingTextStyle}>
        Privacy Policy
      </h1>
      <p>Last Modified: {lastModifiedDate.toLocaleDateString()}</p>
    </>
  );
}
