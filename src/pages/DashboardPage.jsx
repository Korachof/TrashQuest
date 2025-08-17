// Landing Page for post-logged in users
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { headingTextStyle } from '../styles/typography';
import { useAuth } from '../context/AuthContext';
import PointsDisplay from '../components/shared/PointsDisplay';
import LogCleanupButton from '../components/navigation/LogCleanupButton';

export default function DashboardPage() {
  // Grab the current user
  const { currentUser } = useAuth();
  const displayName =
    currentUser?.displayName || currentUser?.email || 'Explorer';

  // Points states
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

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
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <LogCleanupButton size="large" />
      </div>

      <p>You're successfully signed in and redirected.</p>
      {/* Future: profile preview, eco stats, navigation */}
    </>
  );
}
