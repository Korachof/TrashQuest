// styling for various forms throughout the project.

// Container for wrapping form elements with consistent padding and width
const formContainer = {
  margin: '2rem auto',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
};

// Styling for input fields within form groups (text, email, password, etc.)
const inputField = {
  width: '18.75rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0.5rem',
  marginTop: '0.5rem',
  boxSizing: 'border-box',
  border: '1px solid',
};

// Wrapper that aligns label + input in a vertical stack
const formGroupWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};

// Styling for form labels (above each input)
const formGroupLabel = {
  marginTop: '1rem',
  textAlign: 'center',
  width: '100%', // full-width labels
};
// Shared styling for form submission buttons (Signup/Login flows)
// Simple styling for now, will update later.

export { formContainer, inputField, formGroupWrapper, formGroupLabel };
