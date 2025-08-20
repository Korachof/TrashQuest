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

export default function useCleanupEntries(limitEntries) {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPoints, setCurrentPoints] = useState(0);

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
      // Fetch user points
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setCurrentPoints(userDoc.data().totalEcoPoints || 0);
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

      setEntries(entries.filter((e) => e.id !== entryId));
      setCurrentPoints((prev) => prev - entry.pointsEarned);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return { entries, loading, currentPoints, deleteEntry };
}
