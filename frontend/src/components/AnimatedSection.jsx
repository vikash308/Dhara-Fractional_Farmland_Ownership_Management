import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedSection({ 
  children, 
  className = "", 
  animation = "up", // up, down, left, right, scale, fade
  delay = 0,
  duration = 500
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  const getInitialState = () => {
    switch (animation) {
      case "up": return "opacity-0 translate-y-4";
      case "down": return "opacity-0 -translate-y-4";
      case "left": return "opacity-0 -translate-x-4";
      case "right": return "opacity-0 translate-x-4";
      case "scale": return "opacity-0 scale-95";
      case "fade": return "opacity-0";
      default: return "opacity-0";
    }
  };

  const getFinalState = () => {
    switch (animation) {
      case "up": 
      case "down": return "opacity-100 translate-y-0";
      case "left": 
      case "right": return "opacity-100 translate-x-0";
      case "scale": return "opacity-100 scale-100";
      case "fade": return "opacity-100";
      default: return "opacity-100";
    }
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-all ease-out ${isVisible ? getFinalState() : getInitialState()} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
}
