// Page for Privacy Policy
import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function PrivacyPage() {
  const lastModifiedDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = 'Privacy | TrashQuest';
  }, []);

  return (
    <div>
      <h1 style={headingTextStyle}>Privacy Policy</h1>
      <p>Last Modified: {lastModifiedDate.toLocaleDateString()}</p>
    </div>
  );
}

export default PrivacyPage;
