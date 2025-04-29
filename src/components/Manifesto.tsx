
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface ManifestoProps {
  className?: string;
}

const Manifesto: React.FC<ManifestoProps> = ({
  className
}) => {
  return <section id="thesis" className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-10 text-center">Thesis</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="text-lg md:text-xl leading-relaxed mb-12 font-serif text-left">
              <p>There's no grand plan here.</p>
              
              <div className="h-2"></div>
              
              <p>I like making things and writing down whatever makes me stop and think for half a second.</p>
              
              <div className="h-2"></div>
              
              <p>Sometimes it turns into a cool project.</p>
              <p>Sometimes it ends up as a half-baked idea sitting in my notes app.</p>
              
              <div className="h-2"></div>
              
              <p>My goal now is to let go of trying to have the "perfect process" for everything.</p>
              <p>I'm just gonna try to make stuff and worry about naming it later.</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-xs text-muted-foreground text-center italic mt-6">
              I don't really know what I'm doing
            </p>
          </FadeIn>
        </div>
      </div>
    </section>;
};

export default Manifesto;
