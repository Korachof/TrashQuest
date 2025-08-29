import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import FormGroup from '../components/shared/FormGroup';
import FormButton from '../components/shared/FormButton';
import { formContainer } from '../styles/forms';
import {
  linkNavigationText,
  headingTextStyle,
  subHeadingTextStyle,
} from '../styles/typography';
import { isStrongPassword, clearMessages } from '../utils/validation';
import { redirectAfterSuccess } from '../utils/navigation';
import ErrorMessage from '../components/shared/ErrorMessage';
import SuccessMessage from '../components/shared/SuccessMessage';
import { signupContent } from '../content/signup';

export default function SignupPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    document.title = signupContent.docTitle;
  }, []);

  return (
    <>
      <h1 id="signup-heading" style={headingTextStyle}>
        {signupContent.title}
      </h1>
      <h3 style={subHeadingTextStyle}>{signupContent.subTitle}</h3>
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
        <FormButton
          isLoading={isLoading}
          loadingText={signupContent.loadingText}
        >
          {signupContent.createAccount}
        </FormButton>
      </form>

      {/* Display Success Message */}
      <SuccessMessage message={successMsg} />

      {/* Display Error Message */}
      <ErrorMessage message={errorMsg} />

      <p style={linkNavigationText}>
        {signupContent.accountChk}
        <Link to="/login">{signupContent.login}</Link>
      </p>
    </>
  );
}
