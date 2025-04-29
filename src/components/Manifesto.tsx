import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
interface ManifestoProps {
  className?: string;
}
const Manifesto: React.FC<ManifestoProps> = ({
  className
}) => {
  return <section id="thesis" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-10 text-center">Thesis</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 font-serif text-left">There’s no grand plan here.
I like making things and writing down whatever makes me stop and think for half a second.

Sometimes it turns into a cool project.
Sometimes it ends up as a half-baked idea sitting in my notes app.

My goal now is to let go of trying to have the "perfect process" for everything.
I'm just gonna try to make stuff and worry about naming it later.</p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg leading-relaxed text-muted-foreground text-center">
              Directing investment towards diverse teams is a strategic move that not only promotes equity but also leverages untapped potential for economic growth — and higher returns
            </p>
          </FadeIn>
        </div>
      </div>
    </section>;
};
export default Manifesto;