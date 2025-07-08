import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import FormGroup from '../components/shared/FormGroup';
import FormButton from '../components/shared/FormButton';
import {formContainer} from '../styles/forms';


function SignupPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // prevent reloading of page, and instead handle submission manually with firebase.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', { displayName, email, password });
    // TODO: Hook into Firebase/AWS logic
  };
  return (
    <PageLayout>
        <h1>Sign Up for TrashQuest 🌱</h1>
        <p>Create your eco profile and start cleaning the planet one quest at a time.</p>
        <form onSubmit={handleSubmit}
          style={
            {formContainer}}
        >
        {/*Use FormGroup to set styling for all display fields*/}
        <FormGroup
          label="Display Name:"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <FormGroup
          label="Email:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Submission button; lives in src/components/shared, but the styling may be reused later. If so, I'll globalize that.*/}
        <FormButton>
          🌿 Create Account
        </FormButton>
      </form>
        <p style={{ marginTop: '2rem' }}>
        Already have an account? <Link to="/login">Log in here</Link>
        </p>
    </PageLayout>
  );
}

export default SignupPage;                 
