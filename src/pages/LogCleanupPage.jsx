// Navigation page for user to log their cleanup info and gain points
import React, { useEffect } from 'react';
import LogCleanupForm from '../components/submission/LogCleanupForm';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { logCleanupContent } from '../content/logCleanup';

export default function LogCleanupPage() {
  const lastModifiedDate = new Date('07/10/2025');

  // Set page tab title
  useEffect(() => {
    document.title = logCleanupContent.docTitle;
  }, []);

  return (
    <>
      <h1 id="log-cleanup-heading" style={headingTextStyle}>
        {logCleanupContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{logCleanupContent.subTitle}</h3>
      <LogCleanupForm />
    </>
  );
}
