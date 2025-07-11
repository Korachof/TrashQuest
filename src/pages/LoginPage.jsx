// Page for user to login to their profile.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import FormGroup from '../components/shared/FormGroup';
import FormButton from '../components/shared/FormButton';
import { formContainer } from '../styles/forms';
import { linkNavigationText } from '../styles/typography';
import { headingTextStyle } from '../styles/typography';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // prevent reloading of page, and instead handle submission manually with firebase.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', { displayName, email, password });
    // TODO: Hook into Firebase/AWS logic
  };
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <PageLayout>
      <h1 style={headingTextStyle}>Login to Your Quest 🔐</h1>
      <p>Access your dashboard, earn ecoPoints, and track your progress.</p>
      <form onSubmit={handleSubmit} style={{ formContainer }}>
        {/*Use FormGroup to set styling for all display fields*/}
        <FormGroup
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Log in button; lives in src/components/shared, but the styling may be reused later. If so, I'll globalize that.*/}
        <FormButton>🌿 Log in</FormButton>
      </form>
      <p style={linkNavigationText}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </PageLayout>
  );
}

export default LoginPage;
