// Landing Page for post-logged in users

import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { headingTextStyle } from '../styles/typography';

function DashboardPage() {
  return (
    <PageLayout>
      <h1 style={headingTextStyle}>🚀 Welcome to your Dashboard</h1>
      <p>You're successfully signed in and redirected.</p>
      {/* Future: profile preview, eco stats, navigation */}
    </PageLayout>
  );
}

export default DashboardPage;
