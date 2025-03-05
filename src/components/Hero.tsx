
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center relative overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
        <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center rounded-full bg-edumate-50 px-4 py-1 text-sm font-medium text-edumate-700 ring-1 ring-inset ring-edumate-100">
              Introducing Edumate
            </span>
          </div>
          <h1 className="font-medium">
            <span className="block text-balance">Revolutionize Learning with</span>
            <span className="text-gradient animate-gradient-x text-balance">AI-Powered Speech & Text Analysis</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 text-balance">
          Master language skills with real-time feedback on pronunciation, grammar, and comprehension through our intelligent learning companion.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
          <button className="px-8 py-3 bg-edumate-500 text-white rounded-lg font-medium hover:bg-edumate-600 transition-all shadow-lg hover:shadow-xl hover:shadow-edumate-200/20 focus:outline-none focus:ring-2 focus:ring-edumate-500 focus:ring-offset-2">
            Try for Free
          </button>
          <button className="px-8 py-3 bg-white text-edumate-700 rounded-lg font-medium border border-edumate-100 hover:border-edumate-300 transition-all">
            Watch Demo
          </button>
        </div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto mt-20 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
        <div className="glass-panel p-4 sm:p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-500">
          <div className="aspect-video rounded-lg bg-edumate-50 overflow-hidden relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-edumate-500"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <p className="text-edumate-700 mt-4 font-medium">See how Edumate works</p>
            </div>
            <div className={cn(
              "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent",
              "pointer-events-none"
            )} />
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-edumate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-edumate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
    </div>
  );
};

export default Hero;
