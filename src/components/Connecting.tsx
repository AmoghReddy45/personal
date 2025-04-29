
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface ConnectingProps {
  className?: string;
}

const Connecting: React.FC<ConnectingProps> = ({
  className
}) => {
  const founderTypes = [
    "Hire Me (i can build things) -> reddy.amogh2004@gmail.com", 
    "my instagram's cool too -> @am.reddywbsgdhbe"
  ];
  
  return <section id="connecting" className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Connect with me</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            {/* Empty FadeIn - Adding an empty div as children to fix the error */}
            <div></div>
          </FadeIn>
          
          <div className="space-y-4 mb-16">
            {founderTypes.map((type, index) => <FadeIn key={index} delay={150 + index * 50}>
                <div className="flex items-start">
                  <span className="text-orangery-500 mr-3 mt-1">—</span>
                  <p className="text-muted-foreground text-base">{type}</p>
                </div>
              </FadeIn>)}
          </div>
        </div>
      </div>
    </section>;
};

export default Connecting;
