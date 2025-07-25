// User Profile
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  // Get current user
  const { currentUser } = useAuth();

  // Set page tab title
  useEffect(() => {
    document.title = 'Profile | TrashQuest';
  }, []);

  return (
    <>
      <h1>Profile</h1>

      {!currentUser ? (
        <p>You must be logged in to view your profile.</p>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {currentUser.displayName || 'Not set'}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
