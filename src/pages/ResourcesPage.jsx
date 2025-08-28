// Resources page to house external resources for user education
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { resourcesContent } from '../content/resources';

export default function ResourcesPage() {
  // Set page tab title
  useEffect(() => {
    document.title = resourcesContent.docTitle;
  }, []);

  return (
    <>
      <h1 id="resources-heading" style={headingTextStyle}>
        {resourcesContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{resourcesContent.subTitle}</h3>
    </>
  );
}
