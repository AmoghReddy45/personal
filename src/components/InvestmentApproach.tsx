import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Link } from "react-router-dom";
import CursorFog from "./effects/CursorFog";

interface InvestmentApproachProps {
  className?: string;
}

const InvestmentApproach: React.FC<InvestmentApproachProps> = ({
  className,
}) => {
  const investmentTiers = [
    {
      title: "Elora AI",
      description:
        "Building a self-healing AI agent platform for end-to-end customer support automation. Combines retrieval-augmented generation, multi-agent orchestration, and secure action execution to autonomously resolve complex queries—at scale.",
      link: "https://www.eloraai.io/",
      external: true,
      fogColor: "rgba(65, 43, 118, 0.6)", // Deep Purple/Blue fog for Elora AI
      blendMode: "screen",
      pixelSize: 2,
      turbulence: 1.5,
      smokeIntensity: 0.7,
      tagline: "Enterprise-grade autonomy. Built for modern support."
    },
    {
      title: "Writing & Creative Work",
      description:
        "From biryani to eyeballs to fitness—I write about whatever's occupying my brain. That includes cultural deep dives, tech thoughts, personal health experiments, my victimization to consumerism (bad spending habits), and just whatever I feel like writing down.",
      link: "/blog",
      external: false,
      fogColor: "rgba(255, 120, 50, 0.6)", // Warm orange/red for creative theme
      blendMode: "color-dodge",
      pixelSize: 3,
      turbulence: 1.8,
      smokeIntensity: 0.6,
      tagline: "I Like to Write"
    },
  ];

  return (
    <section id="investment" className={cn("py-20 bg-white", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">
              What I'm Currently Working On
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-12">
              I spend most of my time building software projects, designing
              websites, writing about the things that catch my attention, and
              studying systems—whether technical, cultural, or personal. Right
              now, I'm focused on refining my backend architecture skills,
              experimenting with AI workflows, and writing more casually -
              without the pressure of perfection.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {investmentTiers.map((tier, index) => (
            <FadeIn key={index} delay={150 + index * 50}>
              <CursorFog 
                color={tier.fogColor}
                density={4} 
                particleSize={18}
                fadeSpeed={0.006}
                blendMode={tier.blendMode}
                pixelSize={tier.pixelSize}
                turbulence={tier.turbulence}
                smokeIntensity={tier.smokeIntensity}
              >
                {tier.external ? (
                  <a
                    href={tier.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full"
                  >
                    <div className="border border-gray-200 rounded-lg p-6 group-hover:border-gray-300 transition-all group-hover:shadow-sm h-full flex flex-col bg-white">
                      <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-primary transition-colors">{tier.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{tier.description}</p>
                      <div className="mt-auto">
                        {index === 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium">{tier.tagline}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    to={tier.link}
                    className="block group h-full"
                  >
                    <div className="border border-gray-200 rounded-lg p-6 group-hover:border-gray-300 transition-all group-hover:shadow-sm h-full flex flex-col bg-white">
                      <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-orangery-500 transition-colors">{tier.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{tier.description}</p>
                      <div className="mt-auto">
                        {index === 1 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium">{tier.tagline}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )}
              </CursorFog>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentApproach;