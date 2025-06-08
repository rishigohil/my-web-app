import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 404 Page - where lost users come to find themselves (and hopefully the home button)
const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Track 404s for analytics - because knowing how users get lost is half the battle
  useEffect(() => {
    // Log the 404 for debugging - helps us understand user behavior better than a crystal ball
    console.warn(`404 Page accessed: ${location.pathname}`);
    
    // Set document title for better UX - even lost pages deserve good SEO
    document.title = '404 - Page Not Found | Rishi Gohil';
    
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Rishi Gohil - Personal Website';
    };
  }, [location.pathname]);

  const handleBack = (): void => {
    // Go back in history - like undo, but for navigation
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, go home - there's no place like localhost
      navigate('/');
    }
  };

  const handleHomeClick = (): void => {
    // Programmatically navigate home - because clicking links is so 2010
    navigate('/');
  };

  return (
    <div className="not-found">
      <div className="container center">
        <h2>(╯°□°)╯︵ ┻━┻</h2>
        <h4>
          <strong>Whoops!</strong> You stumbled into the digital void!
        </h4>
        <p>
          The page <code>"{location.pathname}"</code> is more missing than my motivation on Monday mornings.
        </p>
        <h5>Let's get you back to civilization.</h5>
        
        <div className="navigation-buttons">
          <button 
            className="button" 
            onClick={handleBack}
            aria-label="Go back to previous page"
            title="Go back to where you came from"
          >
            <i className="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i>
            <span className="sr-only">Go Back</span>
          </button>
          
          <button 
            className="button" 
            onClick={handleHomeClick}
            aria-label="Go to home page"
            title="Take me home, country roads"
          >
            <i className="fa fa-home fa-lg" aria-hidden="true"></i>
            <span className="sr-only">Go Home</span>
          </button>
        </div>
        
        <p className="error-help">
          <small>
            If you think this page should exist, please check the URL or contact support.
            <br />
            (But let's be honest, it's probably a typo)
          </small>
        </p>
      </div>
    </div>
  );
};

export default NotFound;