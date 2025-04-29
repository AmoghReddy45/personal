
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface FoundersInSearchProps {
  className?: string;
}

const FoundersInSearch: React.FC<FoundersInSearchProps> = ({
  className
}) => {
  const founderTypes = [{
    title: "Illegible Founders",
    description: "Those who reject easy categorization, whether due to unconventional backgrounds, markets, or business models. We specialize in funding what others overlook."
  }, {
    title: "First-Time Founders with Significant Non-Tech Experience",
    description: "Corporate leaders, operators, and business owners making the leap into startups, bringing unique domain expertise and execution ability."
  }, {
    title: "Academic Innovators & Researchers",
    description: "Scientists and academics with deep technical knowledge and IP-driven innovations seeking to commercialize their research through entrepreneurship."
  }, {
    title: "Gender-Diverse Teams",
    description: "Backing women leaders and mixed-gender founding teams who bring fresh perspectives and collaborative approaches to building transformative companies."
  }];
  
  return (
    <div className={cn("py-20 md:py-32", className)}>
      {/* Component content would go here */}
    </div>
  );
};

export default FoundersInSearch;
