import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';


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
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem', maxWidth: '400px' }}>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
          />
        </label>
        <label style={{ marginTop: '1rem' }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
          />
        </label>
        <label style={{ marginTop: '1rem' }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
          />
        </label>
        {/* Submission button; lives here, but the styling may be reused later. If so, I'll globalize that.*/}
        <button type="submit" style={{ marginTop: '2rem', padding: '0.8rem 1.6rem' }}>
          🌿 Create Account
        </button>
      </form>
        <p style={{ marginTop: '2rem' }}>
        Already have an account? <Link to="/login">Log in here</Link>
        </p>
    </PageLayout>
  );
}

export default SignupPage;                 
