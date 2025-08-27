// Landing Page for post-logged in users
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';
import { useAuth } from '../context/AuthContext';
import PointsDisplay from '../components/shared/PointsDisplay';
import LogCleanupButton from '../components/navigation/LogCleanupButton';
import CleanupEntriesList from '../components/eco/CleanupEntriesList';
import { centerButtonLayout } from '../styles/layout';
import { getDashboardContent } from '../content/dashboard';

export default function DashboardPage() {
  // Grab the current user
  const { currentUser } = useAuth();
  const displayName =
    currentUser?.displayName || currentUser?.email || 'Explorer';
  const dashboardContent = getDashboardContent(displayName);

  // Set page tab title
  useEffect(() => {
    document.title = 'Dashboard | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="dashboard-heading" style={headingTextStyle}>
        {dashboardContent.title}
      </h1>

      {/* Points Display */}
      <PointsDisplay
        size="large"
        style={{ maxWidth: '300px', margin: '0 auto 2rem auto' }}
      />
      <div style={centerButtonLayout}>
        {/* Log Cleanup Button */}
        <LogCleanupButton />
      </div>
      {/* Recent Cleanup Entries */}
      <CleanupEntriesList limitEntries={3} showViewAll={true} />

      {/* Future: profile preview, eco stats, navigation */}
    </>
  );
}
