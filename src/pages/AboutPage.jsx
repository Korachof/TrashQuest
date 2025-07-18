// About Us Page
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function AboutPage() {
  return (
    <div>
      <h1 style={headingTextStyle}>About Us</h1>
      <p>Learn more about us at Trash Quest!</p>
    </div>
  );
}

export default AboutPage;
