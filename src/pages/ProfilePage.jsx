// User Profile
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  headingTextStyle,
  bodyTextStyle,
  centerBodyTextStyle,
} from '../styles/typography';

export default function ProfilePage() {
  // Get current user
  const { currentUser } = useAuth();

  // Set page tab title
  useEffect(() => {
    document.title = 'Profile | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="profile-heading" style={headingTextStyle}>
        Profile
      </h1>

      {!currentUser ? (
        <p style={bodyTextStyle}>You must be logged in to view your profile.</p>
      ) : (
        <div>
          <p style={centerBodyTextStyle}>
            <strong>Name:</strong> {currentUser.displayName || 'Not set'}
          </p>
          <p style={centerBodyTextStyle}>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>
      )}
    </>
  );
}
