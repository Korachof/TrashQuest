// src/components/shared/PointsDisplay.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export default function PointsDisplay({
  size = 'large', // 'large', 'medium', 'small'
  showIcon = true,
  style = {},
}) {
  const { currentUser } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // Size-based styling
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '0.9rem', padding: '0.5rem' };
      case 'medium':
        return { fontSize: '1.1rem', padding: '0.75rem' };
      case 'large':
      default:
        return { fontSize: '1.5rem', padding: '1rem' };
    }
  };

  const baseStyle = {
    background: '#d4edda',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#155724',
    ...getSizeStyles(),
    ...style,
  };

  return (
    <div style={baseStyle}>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {showIcon && '🌱 '}
          {totalPoints} Eco Points
        </>
      )}
    </div>
  );
}
