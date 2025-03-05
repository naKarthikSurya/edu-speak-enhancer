
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  className,
  iconClassName,
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "feature-card group relative",
        className
      )}
    >
      <div className={cn(
        "feature-icon", 
        iconClassName
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2 text-edumate-900 group-hover:text-edumate-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-balance">
        {description}
      </p>
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-edumate-500"
        >
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </div>
  );
};

export default FeatureCard;
