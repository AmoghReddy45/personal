
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface CommunityProps {
  className?: string;
}

const Community: React.FC<CommunityProps> = ({
  className
}) => {
  const pillars = [{
    title: "Community",
    description: "Community before investing - connecting promising entrepreneurs with dedicated events"
  }, {
    title: "Media",
    description: "Media + content to build the narrative around technology and diverse teams - and help them build momentum"
  }];
  
  return (
    <div className={className}>
      {/* Empty component */}
    </div>
  );
};

export default Community;
