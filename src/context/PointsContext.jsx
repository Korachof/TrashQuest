import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const { currentUser } = useAuth();
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user points when user changes
  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserPoints(userDoc.data().totalEcoPoints || 0);
          }
        } catch (error) {
          console.error('Error fetching user points:', error);
        }
      } else {
        setUserPoints(0);
      }
      setLoading(false);
    };

    fetchUserPoints();
  }, [currentUser]);

  const updateUserPoints = (pointsChange) => {
    setUserPoints((prev) => prev + pointsChange);
  };

  return (
    <PointsContext.Provider value={{ userPoints, updateUserPoints, loading }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within PointsProvider');
  }
  return context;
}
