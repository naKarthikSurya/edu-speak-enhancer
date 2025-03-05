
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
        "feature-card group",
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
    </div>
  );
};

export default FeatureCard;
