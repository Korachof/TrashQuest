// Hook for CleanupEntriesList to fetch and update information
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { usePoints } from '../context/PointsContext';

export default function useCleanupEntries(limitEntries) {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userPoints, updateUserPoints } = usePoints();

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

  // Handle deleting entries
  const deleteEntry = async (entryId) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;

    try {
      await deleteDoc(doc(db, 'cleanupEntries', entryId));
      await updateDoc(doc(db, 'users', currentUser.uid), {
        totalEcoPoints: increment(-entry.pointsEarned),
        updatedAt: new Date(),
      });

      // Update points in context
      updateUserPoints(-entry.pointsEarned);

      setEntries(entries.filter((e) => e.id !== entryId));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // handle updating entries
  const updateEntry = (updatedEntry) => {
    setEntries(
      entries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  return {
    entries,
    loading,
    currentPoints: userPoints,
    deleteEntry,
    updateEntry,
  };
}
