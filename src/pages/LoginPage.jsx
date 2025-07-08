// Page for user to login to their profile.
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import FormGroup from '../components/shared/FormGroup';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', { displayName, email, password });
    // TODO: Hook into Firebase/AWS logic
  };
  return (
    // PageLayout: Page scaffold including header, MainContainer, and footer
    <PageLayout>
      <h1>Login to Your Quest 🔐</h1>
      <p>Access your dashboard, earn ecoPoints, and track your progress.</p>
      <form onSubmit={handleSubmit}
          style={{
            margin: '2rem auto',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'}}>
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
      </form>
      <p style={{ marginTop: '2rem' }}>
      Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </PageLayout>
  );
}

export default LoginPage;