import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import SupabaseImage from "./SupabaseImage";
interface AboutProps {
  className?: string;
}
const About = () => {
  return (
    <section className={cn("py-20 md:py-32 bg-white", "text-orangery-900")}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <FadeIn delay={100}>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">
                About Me
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-l mb-6 font-medium">
                I like to think I'm a mix of decent literacy, a vivid
                imagination, and an almost spiteful need to be good at
                everything I try.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-md md:text-lg text-gray-600">
                Trying to dip my toes into whatever I can, sometimes that looks
                like frontend design, backend systems, AI applications, or
                popsicle stick bridges.
                <br />
                <span className="block h-2"></span>
                Other times it's writing about G-Wagons, Sherlock Holmes, or the
                sacred art of tea.
                <br />
                <span className="block h-2"></span>I also recently committed to
                the 365 day program by Jeff Nippard so I'm gonna document that
                here to keep me accountable.
              </p>
            </FadeIn>
          </div>

          {/* Image */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
            <SupabaseImage
              src="/italian-villa.png"
              alt="Historical painting of Italian villa with cypress trees"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
