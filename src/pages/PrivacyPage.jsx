// Page for Privacy Policy
import React, { useEffect } from 'react';
import { headingTextStyle, centerBodyTextStyle } from '../styles/typography';
import { privacyContent } from '../content/privacy';

export default function PrivacyPage() {
  const lastModifiedDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = privacyContent.docTitle;
  }, []);

  return (
    <>
      <h1 id="privacy-heading" style={headingTextStyle}>
        {privacyContent.title}
      </h1>
      <p style={centerBodyTextStyle}>
        {privacyContent.modDate} {lastModifiedDate.toLocaleDateString()}
      </p>
    </>
  );
}
