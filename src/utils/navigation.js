// Global navigation utilities

export const redirectAfterSuccess = (
  navigate,
  path = '/dashboard',
  delay = 2000
) => {
  setTimeout(() => {
    navigate(path);
  }, delay);
};
