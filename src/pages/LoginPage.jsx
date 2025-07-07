// Page for user to login to their profile.
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';


function LoginPage() {
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <PageLayout>
      <h1>Login to Your Quest 🔐</h1>
      <p>Access your dashboard, earn ecoPoints, and track your progress.</p>
      <p style={{ marginTop: '2rem' }}>
      Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </PageLayout>
  );
}

export default LoginPage;