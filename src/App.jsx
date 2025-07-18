// Root app component
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import PageLayout from './components/layout/PageLayout';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ResourcesPage from './pages/ResourcesPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  /* Listen for changes to the user's authentication state (login/logout).
     When the auth state changes, update the currentUser state accordingly.
     This ensures the app always knows if a user is signed in or not. */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // cleanup when App unmounts
  }, []);

  return (
    <BrowserRouter>
      <PageLayout currentUser={currentUser}>
        <Routes>
          {/* Landing page routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <DashboardPage currentUser={currentUser} />
              </ProtectedRoute>
            }
          />

          {/* User Login/Authentication routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Header routes */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/resources" element={<ResourcesPage />} />

          {/* Signed in Header routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <ProfilePage currentUser={currentUser} />
              </ProtectedRoute>
            }
          />

          {/* Footer routes */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
