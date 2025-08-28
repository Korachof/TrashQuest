// How it Works page
import React, { useEffect } from 'react';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { howItWorksContent } from '../content/howItWorks';

export default function HowItWorksPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'How It Works | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="how-it-works-heading" style={headingTextStyle}>
        {howItWorksContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{howItWorksContent.subTitle}</h3>
    </>
  );
}
