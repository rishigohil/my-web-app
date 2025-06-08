import React from 'react';
import { SocialLink } from '../types';

interface SocialLinksProps {
  socialData: SocialLink[];
}

// Social links component - because networking is important, even for introverts
const SocialLinks: React.FC<SocialLinksProps> = ({ socialData }) => {
  // Validate URL - because clicking broken links is like debugging on production: never fun
  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:' || urlObj.protocol === 'mailto:';
    } catch {
      return false;
    }
  };

  // Filter out invalid links - quality control is key, unlike my commit messages
  const validLinks = socialData.filter(item => 
    item && 
    item.name && 
    item.url && 
    isValidUrl(item.url)
  );

  // If no valid links, show a friendly message instead of empty space
  if (validLinks.length === 0) {
    return (
      <div className="footer-social-icons">
        <p>Social links coming soon... (still working on being social)</p>
      </div>
    );
  }

  return (
    <div className="footer-social-icons">
      <ul className="social-icons">
        {validLinks.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            <a 
              href={item.url} 
              title={item.alt || `Connect on ${item.name}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={item.alt || `Connect on ${item.name}`}
              onError={(e) => {
                // Hide broken links gracefully - like sweeping bugs under the rug
                const target = e.target as HTMLElement;
                if (target.parentElement) {
                  target.parentElement.style.display = 'none';
                }
              }}
            >
              <i className={`fa fa-${item.name} icons`} aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;