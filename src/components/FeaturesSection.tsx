
import { useRef, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { Mic, MessageSquare, FileText, BookOpen } from 'lucide-react';

const FeaturesSection = () => {
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

  const features = [
    {
      title: "Chorus",
      description: "Enhance your pronunciation and fluency with real-time analysis and feedback as you speak.",
      icon: <Mic size={24} />,
      iconClassName: "bg-edumate-50 text-edumate-500"
    },
    {
      title: "Speech Error Analysis",
      description: "Detect subtle mispronunciations and receive context-specific corrective suggestions.",
      icon: <MessageSquare size={24} />,
      iconClassName: "bg-blue-50 text-blue-500"
    },
    {
      title: "Grammar Check",
      description: "Convert handwritten notes to text and receive detailed grammatical corrections and improvements.",
      icon: <FileText size={24} />,
      iconClassName: "bg-green-50 text-green-600"
    },
    {
      title: "Concept Summarization",
      description: "Distill lengthy texts into concise, customizable summaries for efficient learning.",
      icon: <BookOpen size={24} />,
      iconClassName: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <section className="py-20 px-6" id="features" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <span className="text-sm font-medium text-edumate-500 uppercase tracking-wider">Features</span>
          <h2 className="mt-2 mb-6 text-balance">Powerful Learning Tools</h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 text-balance">
            Our platform combines cutting-edge AI with intuitive design to enhance your language learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${200 + (index * 100)}ms` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                iconClassName={feature.iconClassName}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-24 glass-panel p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-[700ms]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-medium text-edumate-900 text-balance">Experience the Power of AI in Education</h3>
              <p className="text-slate-600 leading-relaxed text-balance">
                Edumate leverages advanced machine learning algorithms to provide personalized feedback tailored to your unique learning style and progress.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time pronunciation analysis",
                  "Context-aware grammar correction",
                  "Customizable learning paths",
                  "Intelligent concept summarization"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-edumate-500"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-edumate-500 text-white rounded-lg font-medium hover:bg-edumate-600 transition-all shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-edumate-500 focus:ring-offset-2">
                Learn More
              </button>
            </div>
            <div className="rounded-xl overflow-hidden bg-edumate-50 aspect-square lg:aspect-auto lg:h-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-edumate-100 to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-500">
                  <div className="text-edumate-500 font-medium text-5xl">AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
