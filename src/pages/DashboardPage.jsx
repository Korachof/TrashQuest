// Landing Page for post-logged in users
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';
import { useAuth } from '../context/AuthContext';
import PointsDisplay from '../components/shared/PointsDisplay';
import LogCleanupButton from '../components/navigation/LogCleanupButton';
import CleanupEntriesList from '../components/eco/CleanupEntriesList';

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

      {/* Points Display */}
      <PointsDisplay
        size="large"
        style={{ maxWidth: '300px', margin: '0 auto 2rem auto' }}
      />

      {/* Log Cleanup Button */}
      <LogCleanupButton />

      {/* Recent Cleanup Entries */}
      <CleanupEntriesList limitEntries={3} showViewAll={true} />

      <p>You're successfully signed in and redirected.</p>
      {/* Future: profile preview, eco stats, navigation */}
    </>
  );
}
