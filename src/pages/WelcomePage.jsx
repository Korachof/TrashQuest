// Landing page for pre-logged in users.
import React, { useEffect } from 'react';
import StartQuestButton from '../components/navigation/StartQuestButton';
import { headingTextStyle, subHeadingTextStyle } from '../styles/typography';
import { centerButtonLayout } from '../styles/layout';
import { welcomeContent } from '../content/welcome';

export default function WelcomePage() {
  useEffect(() => {
    document.title = welcomeContent.docTitle;
  }, []);
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <>
      <h1 id="welcome-heading" style={headingTextStyle}>
        {welcomeContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{welcomeContent.subTitle}</h3>
      <div style={centerButtonLayout}>
        <StartQuestButton />
      </div>
    </>
  );
}
