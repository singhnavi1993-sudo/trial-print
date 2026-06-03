import { useEffect } from 'react';

const ScrollObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const attachObserver = () => {
      const elements = document.querySelectorAll('.animate-fade-up:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    attachObserver();
    const timeout = setTimeout(attachObserver, 500);
    
    const mutationObserver = new MutationObserver(() => {
      attachObserver();
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default ScrollObserver;
