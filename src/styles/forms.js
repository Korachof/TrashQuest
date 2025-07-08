const formContainer = {
  margin: '2rem auto',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem'
};

const inputField = {
  width: '100%',
  maxWidth: '340px', // field size
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0.5rem',
  marginTop: '0.5rem',
  boxSizing: 'border-box',
  border: '1px solid',
};

const formGroupWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};

const formGroupLabel = {
  marginTop: '1rem',
  textAlign: 'center',
  width: '100%',      // full-width labels
};



export { formContainer, inputField, formGroupWrapper, formGroupLabel };
