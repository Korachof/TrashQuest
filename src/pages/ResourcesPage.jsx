// Resources page to house external resources for user education
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';

export default function ResourcesPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'Resources | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="resources-heading" style={headingTextStyle}>
        Resources
      </h1>
      <h3 style={subHeadingTextStyle}>
        Want to learn more about the planet and what else you can do to help?
        Check out the links below!
      </h3>
    </>
  );
}
