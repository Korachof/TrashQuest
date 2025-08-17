// Component to display a list of user's cleanup entries
import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { getButtonStyle } from '../../styles/buttonStyles';

export default function CleanupEntriesList({
  limitEntries = null, // null = show all, number = limit results
  showViewAll = false, // show "View All" button
}) {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cleanup entries
  useEffect(() => {
    const fetchEntries = async () => {
      if (!currentUser) return;

      try {
        let q = query(
          collection(db, 'cleanupEntries'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc') // Most recent first
        );

        // Add limit if specified
        if (limitEntries) {
          q = query(q, limit(limitEntries));
        }

        const querySnapshot = await getDocs(q);
        const entriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEntries(entriesData);
      } catch (error) {
        console.error('Error fetching cleanup entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [currentUser, limitEntries]);

  if (loading) {
    return <div>Loading cleanup entries...</div>;
  }

  if (entries.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>No cleanup entries yet. Start logging your eco activities!</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Recent Cleanup Activities</h3>

      {/* Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{entry.size}</strong> • {entry.type}
                <br />
                <small style={{ color: '#666' }}>
                  {entry.area} • {entry.date}
                </small>
              </div>
              <div
                style={{
                  background: '#d4edda',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  color: '#155724',
                  fontWeight: 'bold',
                }}
              >
                +{entry.pointsEarned} pts
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {showViewAll && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => (window.location.href = '/cleanup-entries')}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View All Entries
          </button>
        </div>
      )}
    </div>
  );
}
