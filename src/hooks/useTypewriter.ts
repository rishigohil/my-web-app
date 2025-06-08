import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  speed?: number;
  delay?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  isHtml?: boolean;
}

export const useTypewriter = ({
  words,
  speed = 100,
  delay = 1000,
  deleteSpeed = 50,
  pauseTime = 2000,
  loop = true,
  isHtml = false
}: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (words.length === 0 || !hasStarted) return;

    const currentWord = words[wordIndex];
    if (!currentWord) return;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (isHtml) {
          // For HTML content, extract text content for length comparison
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = currentWord;
          const textContent = tempDiv.textContent || tempDiv.innerText || '';
          const currentTextDiv = document.createElement('div');
          currentTextDiv.innerHTML = displayText;
          const currentTextContent = currentTextDiv.textContent || currentTextDiv.innerText || '';
          
          if (currentTextContent.length < textContent.length) {
            // Find the next character position in the original HTML
            let targetLength = currentTextContent.length + 1;
            let tempHtml = '';
            
            for (let i = 0; i < currentWord.length; i++) {
              tempHtml += currentWord[i];
              const testDiv = document.createElement('div');
              testDiv.innerHTML = tempHtml;
              const testTextContent = testDiv.textContent || testDiv.innerText || '';
              if (testTextContent.length >= targetLength) {
                setDisplayText(tempHtml);
                break;
              }
            }
          } else {
            // Word complete, pause before deleting (if looping) or moving to next
            if (wordIndex === words.length - 1 && !loop) {
              setIsComplete(true);
              return;
            }
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Regular text handling
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            // Word complete, pause before deleting (if looping) or moving to next
            if (wordIndex === words.length - 1 && !loop) {
              setIsComplete(true);
              return;
            }
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, words, speed, deleteSpeed, pauseTime, loop, isComplete, isHtml, hasStarted]);

  // Initial delay before starting
  useEffect(() => {
    if (words.length > 0) {
      const initialTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(initialTimeout);
    }
    return undefined;
  }, [delay, words.length]);

  return { displayText, isComplete };
};