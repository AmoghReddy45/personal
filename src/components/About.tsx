import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
interface AboutProps {
  className?: string;
}
const About = () => {
  return <section className={cn('py-20 md:py-32 bg-white', 'text-orangery-900')}>
          
          <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <FadeIn delay={100}>
                <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">About Me</h2>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lg md:text-xl mb-6">i like to think im a nice unification of decent literacy, an illustratory imagination, and an uncompromising need to be the best at everything i do.</p>
              </FadeIn>
              <FadeIn delay={300}>
                <p className="text-md md:text-lg text-gray-600">My work spans frontend development, backend architecture, AI systems, and storytelling—with one common thread: intentionality.
                <br />
                <span className="block h-2"></span>
Whether I'm optimizing microservices or writing about the cultural legacy of Sherlock Holmes, my goal is the same—understand the invisible systems and build something meaningful from them.</p>
              </FadeIn>
            </div>
            
            {/* Image */}
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
              <img src="/lovable-uploads/c4fcdd31-cfe6-458c-8e77-fe481577108f.png" alt="Historical painting of Italian villa with cypress trees" className="w-full h-full object-cover" />
            </div>
          </div>
          </div>
    </section>;
};
export default About;