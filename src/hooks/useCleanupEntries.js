// Hook for CleanupEntriesList to fetch and update information
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function useCleanupEntries(limitEntries) {
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

  return { entries, loading };
}
