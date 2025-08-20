// Component to display a list of user's cleanup entries
import React, { useState, useEffect } from 'react';
import { getButtonStyle } from '../../styles/buttonStyles';
import { colors } from '../../styles/colors';
import DeleteCleanupEntryModal from './DeleteCleanupEntryModal';
import useCleanupEntries from '../../hooks/useCleanupEntries';

export default function CleanupEntriesList({
  limitEntries = null, // null = show all, number = limit results
  showViewAll = false, // show "View All" button
}) {
  const { entries, loading, currentPoints } = useCleanupEntries(limitEntries);
  // Handle delete entry modal state variables
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

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

  const handleDelete = (entryId) => {
    const entry = entries.find((e) => e.id === entryId);
    setEntryToDelete(entry);
    setShowDeleteModal(true);
  };

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
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <div
                  style={{
                    background: '#d4edda',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    color: colors.EcoDisplayTextColor,
                    fontWeight: 'bold',
                  }}
                >
                  +{entry.pointsEarned} pts
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '0.25rem',
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteCleanupEntryModal
        isOpen={showDeleteModal}
        entry={entryToDelete}
        currentPoints={currentPoints}
        onDeleteSuccess={(deletedEntryId) => {
          setEntries(entries.filter((entry) => entry.id !== deletedEntryId));
          setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* View All Button */}
      {showViewAll && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => (window.location.href = '/cleanup-entries')}
            style={getButtonStyle('medium', 'secondary')}
          >
            View All Entries
          </button>
        </div>
      )}
    </div>
  );
}
