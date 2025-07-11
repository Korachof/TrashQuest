// Page for Privacy Policy
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function PrivacyPage() {
  const lastModifiedDate = new Date('07/10/2025');
  return (
    <PageLayout>
      <h1 style={headingTextStyle}>Privacy Policy</h1>
      <p>Last Modified: {lastModifiedDate.toLocaleDateString()}</p>
    </PageLayout>
  );
}

export default PrivacyPage;
