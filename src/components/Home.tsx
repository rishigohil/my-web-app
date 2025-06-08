import React from 'react';
import { UserData } from '../types';
import SocialLinks from './SocialLinks';
import { useTypewriter } from '../hooks/useTypewriter';

interface HomeProps {
  data: UserData;
}

// Home sweet home - where the magic happens and bugs go to hide
const Home: React.FC<HomeProps> = ({ data }) => {
  // Extract text content from HTML for typewriter animation
  const getTextContent = (html: string): string => {
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    }
    // Fallback for SSR - simple regex to strip HTML tags
    return html.replace(/<[^>]*>/g, '');
  };

  // Sequential typewriter animation for currentDesignation and bio
  const { displayText: currentDesignationText, isComplete: currentDesignationComplete } = useTypewriter({
    words: [getTextContent(data.currentDesignation || 'Current designation not available')],
    speed: 55,
    delay: 500,
    loop: false
  });

  // State to control when bio animation should start
  const [shouldStartBio, setShouldStartBio] = React.useState(false);

  // State for link flash effect
  const [showLinkFlash, setShowLinkFlash] = React.useState(false);

  // Trigger bio animation when currentDesignation completes
  React.useEffect(() => {
    if (currentDesignationComplete && !shouldStartBio) {
      // Flash effect when link appears
      setShowLinkFlash(true);
      setTimeout(() => setShowLinkFlash(false), 1000);
      
      setTimeout(() => {
        setShouldStartBio(true);
      }, 500);
    }
  }, [currentDesignationComplete, shouldStartBio]);

  // Bio animation - only starts when shouldStartBio is true
  const { displayText: bioText, isComplete: bioComplete } = useTypewriter({
    words: shouldStartBio ? [data.bio || 'Bio coming soon...'] : [''],
    speed: 44,
    delay: shouldStartBio ? 0 : 999999,
    loop: false
  });

  // Sanitize HTML content - because we trust user input as much as we trust "it works on my machine"
  const sanitizeHtml = (html: string): string => {
    // Basic HTML sanitization - removes script tags but allows anchor tags
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  // Check if we have valid resume URL - because broken links are more embarrassing than typos in comments
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="profile-card">
      <div className="container top-padding">
        <div className="two column center">
          <div className="card card">
            <header className="summary">
              <div className="dp-container" title={data.name || 'User Profile'}>
                <a 
                  className="image-link" 
                  href="http://rishigohil.com/" 
                  title={data.name || 'Visit website'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${data.name || 'user'}'s website`}
                ></a>
              </div>

              <h5>{data.name || 'Name not available'}</h5>
              <h6 className="heading">{data.designation || 'Designation not specified'}</h6>
            </header>

            <section className="profile-bio">
              {currentDesignationText && (
                <p>
                  {currentDesignationComplete ? (
                    <span 
                      className={showLinkFlash ? 'flash-link' : ''}
                      style={{ cursor: showLinkFlash ? 'pointer' : 'default' }}
                      dangerouslySetInnerHTML={{ 
                        __html: sanitizeHtml(data.currentDesignation || '') 
                      }}
                    ></span>
                  ) : (
                    <>
                      {currentDesignationText}
                      <span className="cursor">|</span>
                    </>
                  )}
                </p>
              )}
              {shouldStartBio && bioText && (
                <p>
                  {bioText}
                  <span className={`cursor ${bioComplete ? 'heartbeat' : ''}`}>|</span>
                </p>
              )}
            </section>

            {/* Only show social links if we have them - otherwise it's just awkward empty space */}
            {data.socialLinks && data.socialLinks.length > 0 && (
              <section>
                <SocialLinks socialData={data.socialLinks} />
              </section>
            )}

            {/* Resume section - because everyone needs to show off their achievements */}
            {data.resumeUrl && isValidUrl(data.resumeUrl) ? (
              <section>
                <a 
                  href={data.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button"
                  aria-label="Download resume"
                >
                  <i className="fa fa-cloud-download" aria-hidden="true"></i> Resume
                </a>
              </section>
            ) : (
              <section>
                <div className="button disabled" title="Resume not available">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Resume Unavailable
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;