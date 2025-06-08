import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Error Boundary component - catches errors like a goalkeeper catches balls (hopefully)
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details - because debugging is easier with breadcrumbs
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - better than a blank white screen of death
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          fontFamily: 'Arial, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>🚨 Something went catastrophically wrong!</h1>
          <p>The app crashed harder than my hopes and dreams in debugging sessions.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again (Maybe it'll work this time?)
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Error Details (for the brave souls who debug)</summary>
              <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Get the root container - if it doesn't exist, we're in trouble deeper than nested callbacks
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found! Someone forgot to create the HTML structure.');
}

const root = createRoot(container);

// Render the app with all the safety nets we can muster
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);