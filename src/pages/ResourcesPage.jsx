// Resources page to house external resources for user education
import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function ResourcesPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'Resources | TrashQuest';
  }, []);

  return (
    <div>
      <h1 style={headingTextStyle}>Resources</h1>
      <p>
        Want to learn more about the planet and what else you can do to help?
        Check out the links below!
      </p>
    </div>
  );
}

export default ResourcesPage;
