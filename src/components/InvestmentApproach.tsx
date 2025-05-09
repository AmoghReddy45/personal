import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
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
      fogColor: "rgba(100, 180, 255, 0.6)", // Blueish smoke for AI theme
      blendMode: "screen",
      pixelSize: 2,
      turbulence: 1.5,
      smokeIntensity: 0.7,
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
                    className="block h-full transition-transform hover:scale-[1.02] focus:outline-none"
                  >
                    <Card className="border border-gray-200 shadow-sm h-full hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-medium mb-4 font-serif">
                          {tier.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {tier.description}
                        </p>
                        {index === 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium">
                              Enterprise-grade autonomy. Built for modern support.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Link
                    to={tier.link}
                    className="block h-full transition-transform hover:scale-[1.02] focus:outline-none"
                  >
                    <Card className="border border-gray-200 shadow-sm h-full hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-medium mb-4 font-serif">
                          {tier.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {tier.description}
                        </p>
                        {index === 1 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium">I Like to Write</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
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