// Global navigation utilities

const redirectAfterSuccess = (navigate, path = '/dashboard', delay = 2000) => {
  setTimeout(() => {
    navigate(path);
  }, delay);
};

export { redirectAfterSuccess };
