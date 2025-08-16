// Landing Page for post-logged in users
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { headingTextStyle } from '../styles/typography';
import { useAuth } from '../context/AuthContext';

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

  // Fetch user's points
  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setTotalPoints(userDoc.data().totalEcoPoints || 0);
          }
        } catch (error) {
          console.error('Error fetching user points:', error);
        }
      }
      setLoading(false);
    };

    fetchUserPoints();
  }, [currentUser]);

  return (
    <>
      <h1 id="dashboard-heading" style={headingTextStyle}>
        🚀 Welcome to your Dashboard, {displayName}
      </h1>

      {/* Points Display */}
      <div
        style={{
          background: '#d4edda',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          textAlign: 'center',
          maxWidth: '300px',
          margin: '0 auto 2rem auto',
        }}
      >
        <h2 style={{ margin: 0, color: '#155724' }}>
          🌱 {loading ? 'Loading...' : `${totalPoints} Eco Points`}
        </h2>
      </div>

      <p>You're successfully signed in and redirected.</p>
      {/* Future: profile preview, eco stats, navigation */}
    </>
  );
}
