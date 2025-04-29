
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
interface HeroProps {
  className?: string;
}
const Hero: React.FC<HeroProps> = ({
  className
}) => {
  return <section className={cn('relative min-h-screen flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10 w-full">
        <img src="/lovable-uploads/860a48fd-65b5-4fa8-ada8-36f19fc7e9e5.png" alt="Classical Greek architecture landscape painting" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight mb-6">Amogh Reddy</h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-white/90 mb-4">sometimes i do things.</p>
            <p className="text-lg md:text-xl text-white/90 mb-8">
          </p>
          </FadeIn>
        </div>
      </div>
    </section>;
};
export default Hero;
