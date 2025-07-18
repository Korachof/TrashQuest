// Page for user to login to their profile.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import PageLayout from '../components/layout/PageLayout';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FormGroup from '../components/shared/FormGroup';
import FormButton from '../components/shared/FormButton';
import { formContainer } from '../styles/forms';
import { linkNavigationText, headingTextStyle } from '../styles/typography';
import { redirectAfterSuccess } from '../utils/navigation';

function LoginPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  // prevent reloading of page, and instead handle submission manually with firebase.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login submitted:', { displayName, email, password });
    // Firebase logic
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;

      setSuccessMsg(`Welcome back, ${user.displayName || 'Explorer'}!`);
      redirectAfterSuccess(navigate);
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      setSuccessMsg('');
      setErrorMsg(error.message);
    }
  };
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <div>
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
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <p style={linkNavigationText}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
