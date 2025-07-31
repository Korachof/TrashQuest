// Landing Page for post-logged in users
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  // Grab the current user
  const { currentUser } = useAuth();
  const displayName =
    currentUser?.displayName || currentUser?.email || 'Explorer';

  // Set page tab title
  useEffect(() => {
    document.title = 'Dashboard | TrashQuest';
  }, []);
  return (
    <>
      <h1 id="dashboard-heading" style={headingTextStyle}>
        🚀 Welcome to your Dashboard, {displayName}
      </h1>
      <p>You're successfully signed in and redirected.</p>
      {/* Future: profile preview, eco stats, navigation */}
    </>
  );
}
