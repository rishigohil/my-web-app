import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { getAppData } from './services/dataService';
import { UserData } from './types';

// The main app component - like the conductor of a very small, very specific orchestra
const App: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Loading data faster than you can say "why is my build failing?"
    try {
      const userData = getAppData();
      setData(userData);
    } catch (err) {
      // Catching errors like a developer catches caffeine addiction
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Show loading state - because users love waiting as much as devs love debugging
  if (isLoading) {
    return (
      <div className="container center">
        <h3>Loading... (Probably faster than your last deployment)</h3>
      </div>
    );
  }

  // Show error state - when things go wrong, at least make it look intentional
  if (error || !data) {
    return (
      <div className="container center">
        <h3>Oops! Something went wrong</h3>
        <p>{error || 'Data not found - it might be on vacation'}</p>
        <button onClick={() => window.location.reload()}>
          Try Again (Third time's the charm, right?)
        </button>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <div id="main">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <div className="footer">
        <label>&copy; {new Date().getFullYear()} Rishi Gohil</label>
      </div>
    </Router>
  );
};

export default App;