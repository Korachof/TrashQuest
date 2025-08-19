// Dedicated page for all logged cleanup entries for a user
import React, { useEffect } from 'react';
import { headingTextStyle } from '../styles/typography';
import CleanupEntriesList from '../components/eco/CleanupEntriesList';

export default function CleanupEntriesListPage() {
  // Set page tab title
  useEffect(() => {
    document.title = 'Cleanup List | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="cleanup-entries-list-heading" style={headingTextStyle}>
        Cleanup Activities List
      </h1>
      <CleanupEntriesList />
    </>
  );
}
