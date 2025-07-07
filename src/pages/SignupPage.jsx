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
        {/* Future: Add signup form fields here */}
        <p style={{ marginTop: '2rem' }}>
        Already have an account? <Link to="/login">Log in here</Link>
        </p>
    </PageLayout>
  );
}

export default SignupPage;
