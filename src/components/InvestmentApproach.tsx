
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface InvestmentApproachProps {
  className?: string;
}

const InvestmentApproach: React.FC<InvestmentApproachProps> = ({
  className
}) => {
  const investmentTiers = [{
    title: "AI Platform",
    description: "Currently exploring early-stage AI systems to help small and medium-sized businesses with security, threat detection, and decision support."
  }, {
    title: "Writing & Creative Work",
    description: "From biryani to eyeballs to fitness—I write whatever comes to mind. This site is going to be a collection of my thoughts and journey."
  }];

  return <section id="investment" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">What I'm Working On</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-center text-muted-foreground mb-12">I spend most of my time building software projects, designing websites, writing about the things that catch my attention, and studying systems—whether technical, cultural, or personal.
Right now, I'm focused on refining my backend architecture skills, experimenting with AI workflows, and writing more casually - without the pressure of perfection.</p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {investmentTiers.map((tier, index) => <FadeIn key={index} delay={150 + index * 50}>
              <Card className="border-2 border-gray-300 shadow-md h-full hover:border-gray-400 transition-colors">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-4 font-serif">{tier.title}</h3>
                  <p className="text-muted-foreground mb-4">{tier.description}</p>
                  {index === 0 && <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium">Applied intelligence Security for SMBs</p>
                    </div>}
                  {index === 1 && <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium">I Like to Write</p>
                    </div>}
                </CardContent>
              </Card>
            </FadeIn>)}
        </div>
      </div>
    </section>;
};

export default InvestmentApproach;
