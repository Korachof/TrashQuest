import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';


function SignupPage() {
  return (
    <PageLayout>
        <h1>Sign Up for TrashQuest 🌱</h1>
        <p>Create your eco profile and start cleaning the planet one quest at a time.</p>
        {/* Future: Add signup form fields here */}
        <p style={{ marginTop: '2rem' }}>
        Already have an account? <Link to="/login">Log in here</Link>
        </p>
    </PageLayout>
  );
}

export default SignupPage;
