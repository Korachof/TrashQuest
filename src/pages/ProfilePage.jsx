// User Profile
import React from 'react';

function ProfilePage({ currentUser }) {
  return (
    <div>
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
    </div>
  );
}

export default ProfilePage;
