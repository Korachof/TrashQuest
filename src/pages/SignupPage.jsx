import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import FormGroup from '../components/shared/FormGroup';
import FormButton from '../components/shared/FormButton';
import { formContainer } from '../styles/forms';
import { linkNavigationText, headingTextStyle } from '../styles/typography';
import { isStrongPassword, clearMessages } from '../utils/validation';
import { redirectAfterSuccess } from '../utils/navigation';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';

export default function SignupPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If user is logged in, redirect to /dashboard
  useRedirectIfAuthenticated();

  // prevent reloading of page, and instead handle submission manually with firebase.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading

    // Password Strength Check
    if (!isStrongPassword(password)) {
      clearMessages(setErrorMsg, setSuccessMsg);
      setErrorMsg(
        'Password must be at least 8 characters and include an uppercase letter, a number, and a symbol.'
      );
      return;
    }

    console.log('Signup submitted:', { displayName, email, password });

    clearMessages(setErrorMsg, setSuccessMsg);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName });

      setCurrentUser({ ...userCredential.user, displayName });

      setSuccessMsg(`Signup successful! Welcome, ${displayName}`);
      setErrorMsg('');
      // redirect to Dashboard (may change to WELCOME/TUTORIAL later)
      redirectAfterSuccess(navigate);
    } catch (error) {
      console.error('Signup error:', error.code, error.message);
      setSuccessMsg(''); // Clear any potential lingering success messages
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false); // Stop loading (runs whether success or error)
    }
  };

  // Set page tab title
  useEffect(() => {
    document.title = 'Signup | TrashQuest';
  }, []);

  return (
    <>
      <h1 id="signup-heading" style={headingTextStyle}>
        Sign Up for TrashQuest 🌱
      </h1>
      <p>
        Create your eco profile and start cleaning the planet one quest at a
        time.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ formContainer }}
        aria-labelledby="signup-heading"
      >
        {/*Use FormGroup to set styling for all display fields*/}
        <FormGroup
          id="display-name"
          label="Display Name:"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <FormGroup
          id="email"
          label="Email:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          id="password"
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Submission button; lives in src/components/shared, but the styling may be reused
        later. If so, I'll globalize that.*/}
        <FormButton isLoading={isLoading} loadingText="🔄 Signing up...">
          🌿 Create Account
        </FormButton>
      </form>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <p style={linkNavigationText}>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </>
  );
}
