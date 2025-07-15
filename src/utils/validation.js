// General Purpose Global utilities for validation

const isStrongPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
};

export { isStrongPassword };
