// User Profile
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { headingTextStyle, centerBodyTextStyle } from '../styles/typography';
import { profileContent } from '../content/profile';

export default function ProfilePage() {
  // Get current user
  const { currentUser } = useAuth();

  // Set page tab title
  useEffect(() => {
    document.title = profileContent.docTitle;
  }, []);

  return (
    <>
      <h1 id="profile-heading" style={headingTextStyle}>
        {profileContent.title}
      </h1>

      {!currentUser ? (
        <p style={centerBodyTextStyle}>{profileContent.unAuthMess}</p>
      ) : (
        <div>
          <p style={centerBodyTextStyle}>
            <strong>{profileContent.name}</strong>
            {currentUser.displayName || 'Not set'}
          </p>
          <p style={centerBodyTextStyle}>
            <strong>{profileContent.email}</strong>
            {currentUser.email}
          </p>
        </div>
      )}
    </>
  );
}
