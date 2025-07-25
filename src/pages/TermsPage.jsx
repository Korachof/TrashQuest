// Terms of Use page
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';

function TermsPage() {
  const effectiveDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = 'Terms | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="terms-heading" style={headingTextStyle}>
        Terms of Use
      </h1>
      <p>Effective {effectiveDate.toLocaleDateString()} </p>
    </>
  );
}

export default TermsPage;
