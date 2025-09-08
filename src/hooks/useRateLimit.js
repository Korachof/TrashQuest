// rate limit hook to be reused throughout relevant pages

import { useState, useEffect } from 'react';

// Default to 60 seconds rate limit
const useRateLimit = (key, limitInSeconds = 60) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Check if user is currently rate limited
    const checkRateLimit = () => {
      const lastSubmitTime = localStorage.getItem(key);

      if (lastSubmitTime) {
        const timePassed = (Date.now() - parseInt(lastSubmitTime)) / 1000;
        const timeLeft = limitInSeconds - timePassed;

        if (timeLeft > 0) {
          setIsRateLimited(true);
          setTimeRemaining(Math.ceil(timeLeft));
        } else {
          setIsRateLimited(false);
          setTimeRemaining(0);
        }
      }
    };

    // Check immediately
    checkRateLimit();

    // Update every second if rate limited
    const interval = setInterval(() => {
      if (isRateLimited) {
        checkRateLimit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [key, limitInSeconds, isRateLimited]);

  const recordSubmission = () => {
    localStorage.setItem(key, Date.now().toString());
    setIsRateLimited(true);
    setTimeRemaining(limitInSeconds);
  };

  const clearRateLimit = () => {
    localStorage.removeItem(key);
    setIsRateLimited(false);
    setTimeRemaining(0);
  };

  return {
    isRateLimited,
    timeRemaining,
    recordSubmission,
    clearRateLimit,
  };
};

export default useRateLimit;
