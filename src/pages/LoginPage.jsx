// Page for user to login to their profile.
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FormGroup from '../components/shared/FormGroup';
import FormButton from '../components/shared/FormButton';
import { formContainer } from '../styles/forms';
import { linkNavigationText, headingTextStyle } from '../styles/typography';
import { redirectAfterSuccess } from '../utils/navigation';
import ForgotPasswordModal from '../components/shared/ForgotPasswordModal';
import { colors } from '../styles/colors';

export default function LoginPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // prevent reloading of page, and instead handle submission manually with firebase.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading

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
    } finally {
      setIsLoading(false); // Stop loading (runs whether success or error)
    }
  };

  // Set page tab title
  useEffect(() => {
    document.title = 'Login | TrashQuest';
  }, []);

  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <>
      <h1 id="login_heading" style={headingTextStyle}>
        Login to Your Quest 🔐
      </h1>
      <p>Access your dashboard, earn ecoPoints, and track your progress.</p>
      <form
        onSubmit={handleSubmit}
        style={{ formContainer }}
        aria-labelledby="login-heading"
      >
        {/*Use FormGroup to set styling for all display fields*/}
        <FormGroup
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Log in button; lives in src/components/shared, but the styling may be reused later. If so, I'll globalize that.*/}
        <FormButton isLoading={isLoading}>🌿 Log in</FormButton>
      </form>
      {successMsg && (
        <p style={{ color: 'green' }} role="status" aria-live="polite">
          {successMsg}
        </p>
      )}
      {errorMsg && (
        <p style={{ color: 'red' }} role="alert" aria-live="assertive">
          {errorMsg}
        </p>
      )}
      <p>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          style={{
            background: 'none',
            border: 'none',
            color: colors.navButtonTextColor,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Forgot password?
        </button>
      </p>
      <p style={linkNavigationText}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>

      {/* Modal logic for forgot Password */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}
