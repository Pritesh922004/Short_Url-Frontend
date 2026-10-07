import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const SmoothScroll = ({ children }) => {
  const location = useLocation();

  // Scroll to top instantly on route change, bypassing CSS smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Restore CSS smooth scroll behavior after jump is completely finished
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
