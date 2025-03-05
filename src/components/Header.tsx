
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        scrolled 
          ? "bg-white bg-opacity-70 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-edumate-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">E</span>
            </div>
            <span className={cn(
              "text-xl font-medium transition-opacity duration-300",
              scrolled ? "text-edumate-900" : "text-edumate-800"
            )}>
              Edumate
            </span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Features', 'How It Works', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-edumate-500",
                scrolled ? "text-edumate-800" : "text-edumate-700"
              )}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className={cn(
            "hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
            "border border-edumate-200 hover:border-edumate-300",
            scrolled ? "text-edumate-700 hover:text-edumate-800" : "text-edumate-600 hover:text-edumate-700"
          )}>
            Sign In
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-edumate-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-edumate-600 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
