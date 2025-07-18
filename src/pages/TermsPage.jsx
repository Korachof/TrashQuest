// Terms of Use page
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function TermsPage() {
  const effectiveDate = new Date('07/10/2025');
  return (
    <div>
      <h1 style={headingTextStyle}>Terms of Use</h1>
      <p>Effective {effectiveDate.toLocaleDateString()} </p>
    </div>
  );
}

export default TermsPage;
