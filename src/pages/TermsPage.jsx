// Terms of Use page
import React, { useEffect } from 'react';
import { headingTextStyle, centerBodyTextStyle } from '../styles/typography';
import { termsContent } from '../content/terms';

export default function TermsPage() {
  const effectiveDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = 'Terms | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="terms-heading" style={headingTextStyle}>
        {termsContent.title}
      </h1>
      <p style={centerBodyTextStyle}>
        {termsContent.effectiveDate} {effectiveDate.toLocaleDateString()}
      </p>
    </>
  );
}
