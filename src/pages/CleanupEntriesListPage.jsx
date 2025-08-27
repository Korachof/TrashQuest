// Dedicated page for all logged cleanup entries for a user
import React, { useEffect, useState } from 'react';
import { headingTextStyle } from '../styles/typography';
import CleanupEntriesList from '../components/eco/CleanupEntriesList';
import { getButtonStyle } from '../styles/buttonStyles';
import { cleanupListContent } from '../content/cleanupEntriesListPage';

export default function CleanupEntriesListPage() {
  // set default entries quantity
  const [limitEntries, setLimitEntries] = useState(10);

  // Set page tab title
  useEffect(() => {
    document.title = 'Cleanup List | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="cleanup-entries-list-heading" style={headingTextStyle}>
        {cleanupListContent.title}
      </h1>
      <CleanupEntriesList limitEntries={limitEntries} />

      {/* Show All Button - only show if we're currently limiting */}
      {limitEntries !== null && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => setLimitEntries(null)}
            style={getButtonStyle('medium', 'primary')}
          >
            {cleanupListContent.viewAllButton}
          </button>
        </div>
      )}
    </>
  );
}
