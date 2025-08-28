// About Us Page
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { aboutContent } from '../content/about';

export default function AboutPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'About | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="about-us-heading" style={headingTextStyle}>
        {aboutContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{aboutContent.subTitle}</h3>
    </>
  );
}
