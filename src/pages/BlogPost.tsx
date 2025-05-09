import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, CalendarIcon, Clock } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

// Define tag types
type PostType = 'Insight' | 'Research' | 'Build Log' | 'Reflection' | 'Essay';
type TopicCategory = 'Culture' | 'History' | 'Tech' | 'Design' | 'Health' | 'Psychology' | 'Personal' | 'Philosophy';

// Post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  postTypes: PostType[];
  topicCategories: TopicCategory[];
  coverImage?: string;
}

// Tag colors mapping for visual distinction
const postTypeColors: Record<PostType, string> = {
  'Insight': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'Research': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'Build Log': 'bg-green-100 text-green-800 hover:bg-green-200',
  'Reflection': 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  'Essay': 'bg-rose-100 text-rose-800 hover:bg-rose-200'
};

const topicCategoryColors: Record<TopicCategory, string> = {
  'Culture': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  'History': 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  'Tech': 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
  'Design': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  'Health': 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  'Psychology': 'bg-violet-100 text-violet-800 hover:bg-violet-200',
  'Personal': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  'Philosophy': 'bg-slate-100 text-slate-800 hover:bg-slate-200'
};

// Sample blog posts data - in a real app, you'd fetch this from an API or database
const blogPostsData: Record<string, BlogPost> = {
  "the-rise-of-illegible-founders": {
    id: "the-rise-of-illegible-founders",
    title: "The Rise of Illegible Founders",
    excerpt: "How unconventional thinkers are reshaping the startup landscape and creating new categories of value.",
    content: `
      <p>In the past few years, we've witnessed a fascinating shift in the startup ecosystem—the emergence of what I call "illegible founders." These are entrepreneurs who don't fit the conventional Silicon Valley pattern recognition mold. They come from unexpected backgrounds, follow non-linear career paths, and often build businesses that established investors struggle to categorize.</p>
      
      <p>What makes these founders particularly interesting is not just their unconventional backgrounds, but their ability to see opportunities in spaces that more traditional entrepreneurs might overlook. Their perspectives are informed by diverse experiences that give them unique insights into problems worth solving.</p>
      
      <h2>Breaking the Pattern Recognition Trap</h2>
      
      <p>Traditional venture capital has long relied on pattern recognition—looking for founders and business models that resemble previously successful companies. While this approach has its merits, it also creates blind spots. Illegible founders exist in these blind spots.</p>
      
      <p>They often lack the prestigious degrees, the "right" work experience, or the standard Silicon Valley network. But what they do have is a deep understanding of markets that are overlooked and underserved—markets they often have personal connections to.</p>
      
      <h2>Creating New Categories</h2>
      
      <p>Perhaps the most valuable contribution of illegible founders is their tendency to create entirely new categories rather than competing in established ones. Because they don't come from traditional backgrounds, they're less likely to iterate on existing solutions and more likely to reimagine problems from first principles.</p>
      
      <p>This leads to businesses that don't fit neatly into existing investment theses but have the potential to define entirely new markets. Think of companies like Airbnb or Uber when they first launched—they didn't fit cleanly into existing categories, which made them harder to evaluate but ultimately more valuable.</p>
      
      <h2>The Value of Diverse Perspectives</h2>
      
      <p>The rise of illegible founders is a reminder of the enormous value of diverse perspectives in innovation. When we limit our definition of who can be a successful entrepreneur, we limit the range of problems that get solved and the ways we solve them.</p>
      
      <p>As we move forward, the most forward-thinking investors and ecosystems will be those that develop new frameworks for identifying and supporting these non-traditional founders—looking beyond the usual signals to find the unique insights that come from lived experiences different from the status quo.</p>
      
      <p>The future of innovation doesn't just belong to those who fit the established mold, but to those who break it entirely—creating new possibilities along the way.</p>
    `,
    date: "April 15, 2025",
    readTime: "5 min read",
    postTypes: ["Insight"],
    topicCategories: ["Culture", "Tech"],
    coverImage: "/lovable-uploads/449967cf-c208-4653-90e7-94469537ef12.png"
  },
  "bridging-academia-and-entrepreneurship": {
    id: "bridging-academia-and-entrepreneurship",
    title: "Bridging Academia and Entrepreneurship",
    excerpt: "The growing ecosystem of academic entrepreneurs and how they're commercializing breakthrough research.",
    content: `
      <p>For decades, there's been a perceived gulf between academic research and commercial entrepreneurship. Academics were seen as pursuing knowledge for its own sake, while entrepreneurs focused on market applications. But this division is increasingly becoming obsolete as more researchers recognize the potential to translate their discoveries into real-world impact through startups.</p>
      
      <h2>The New Academic Entrepreneur</h2>
      
      <p>Today's academic entrepreneurs represent a new breed of innovator—deeply knowledgeable in their fields but also motivated to see their research make a tangible difference outside the laboratory. They're publishing papers and filing patents, mentoring students and pitching investors.</p>
      
      <p>Universities have evolved to support this shift. Technology transfer offices have transformed from administrative bureaucracies into sophisticated commercialization engines. Entrepreneurship programs specifically designed for researchers are proliferating, teaching scientists and engineers how to identify commercial applications for their work and navigate the startup ecosystem.</p>
      
      <h2>Deep Tech's Golden Age</h2>
      
      <p>This convergence between academia and entrepreneurship is fueling what many consider a golden age for deep tech—companies built on substantial scientific or engineering innovations. From CRISPR gene editing to quantum computing, many of today's most promising technologies began in university labs before spinning out into venture-backed startups.</p>
      
      <p>The timeline from discovery to commercialization is also accelerating. What might have taken decades in the past can now happen in years or even months, partly due to improved infrastructure for academic entrepreneurship.</p>
      
      <h2>Challenges and Opportunities</h2>
      
      <p>Despite this progress, academic entrepreneurs still face unique challenges. They must balance research responsibilities with company-building, navigate intellectual property agreements with their institutions, and often transition from being respected authorities in their fields to novices in business strategy and management.</p>
      
      <p>However, the potential rewards—both financial and in terms of real-world impact—have never been greater. Venture capital has developed increasingly sophisticated approaches to evaluating and supporting deep tech startups, and large companies are more willing than ever to partner with or acquire academic spinouts.</p>
      
      <h2>The Future of Innovation</h2>
      
      <p>As the bridges between academia and entrepreneurship strengthen, we can expect an acceleration in the commercialization of breakthrough research. This convergence represents one of our best hopes for addressing major global challenges—from climate change to healthcare accessibility—by bringing the depth of academic knowledge together with the speed and scale of the startup ecosystem.</p>
      
      <p>The most successful innovation ecosystems of the future will be those that fully embrace this integration, creating seamless pathways for knowledge to flow from laboratory discovery to market impact.</p>
    `,
    date: "March 28, 2025",
    readTime: "6 min read",
    postTypes: ["Research"],
    topicCategories: ["Tech", "Culture"],
    coverImage: "/lovable-uploads/a37abb8b-ec16-4a70-b5b1-b696a8c8cdd8.png"
  },
  "origin-of-biryani": {
    id: "origin-of-biryani",
    title: "Origin of Biryani",
    excerpt: "Tracing the historical journey of one of the most beloved rice dishes across continents and cultures.",
    content: `
      <p>Few dishes in the world inspire the kind of devotion and debate that biryani does. This aromatic layered rice dish, fragrant with spices and featuring meat, vegetables, or both, has countless regional variations, each with passionate defenders of their authenticity. But where did biryani actually come from? The answer is as complex and layered as the dish itself.</p>
      
      <h2>Persian Beginnings</h2>
      
      <p>Most food historians trace biryani's origins to Persia (modern-day Iran). The word itself appears to derive from the Persian "birian" (fried before cooking) or "biryan" (to roast). The earliest forms were likely simple rice dishes made with meat, with the sophisticated layering technique developing over time.</p>
      
      <p>Persian influences entered the Indian subcontinent through various routes, but the Mughal Empire (1526-1857) is most often credited with establishing biryani as a South Asian culinary mainstay. The Mughal emperors, descended from Central Asian Turco-Mongol stock, brought with them Persian cultural influences, including sophisticated court cuisine.</p>
      
      <h2>The Mughal Influence</h2>
      
      <p>Legend suggests that Mumtaz Mahal (for whom the Taj Mahal was built) played a role in biryani's development. Upon visiting army barracks and finding soldiers undernourished, she reportedly asked the chef to prepare a balanced meal combining meat and rice—resulting in what would become biryani.</p>
      
      <p>Another story credits Emperor Aurangzeb's military campaigns in the Deccan region, where cooks would prepare a one-pot meal of rice and whatever meat was available, cooked in pits dug into the ground, to feed the army efficiently during long campaigns.</p>
      
      <h2>Regional Variations</h2>
      
      <p>As biryani spread throughout the subcontinent, it evolved to incorporate local ingredients, techniques, and preferences—giving rise to dozens of distinct varieties:</p>
      
      <p><strong>Lucknowi/Awadhi Biryani:</strong> Developed in the kitchens of Nawabs of Awadh, characterized by a more delicate flavor profile and the dum pukht method (slow cooking in a sealed container).</p>
      
      <p><strong>Hyderabadi Biryani:</strong> Perhaps the most famous variety, featuring strong spices and sometimes sour elements like yogurt or lemon.</p>
      
      <p><strong>Kolkata Biryani:</strong> Evolved from the Lucknow style but adapted to Bengali tastes with the distinctive addition of potatoes.</p>
      
      <p><strong>Malabar/Thalassery Biryani:</strong> From Kerala, characterized by the use of small-grained Kaima rice and an emphasis on spices like star anise and cardamom.</p>
      
      <p><strong>Sindhi Biryani:</strong> Notable for its sour elements, including generous use of yogurt and sometimes dried plums.</p>
      
      <h2>Beyond South Asia</h2>
      
      <p>Biryani's journey didn't stop at the borders of South Asia. It traveled with South Asian diaspora communities across the world, adapting further in places like Singapore, Malaysia, and the Middle East. In the Gulf countries, versions like Al Mandhy and Kabsa show clear biryani influence while maintaining their own distinctive character.</p>
      
      <h2>A Dish of Cultural Synthesis</h2>
      
      <p>Perhaps what makes biryani so special is that it's a living example of cultural synthesis—a dish born of Persian roots, developed in Mughal courts, adapted by regional South Asian cultures, and continuing to evolve in homes and restaurants worldwide.</p>
      
      <p>The debate over "authentic" biryani is, in many ways, missing the point. The dish has always been about adaptation and evolution, about taking the best of different culinary traditions and creating something that's more than the sum of its parts. In that sense, every regional variation tells its own story of cultural exchange and adaptation—making biryani not just delicious food, but living history on a plate.</p>
    `,
    date: "January 15, 2025",
    readTime: "8 min read",
    postTypes: ["Research"],
    topicCategories: ["History", "Culture"],
    coverImage: "/lovable-uploads/dabbf929-5dd0-4794-a011-fe43bf4b3418.png"
  }
};

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? blogPostsData[postId] : null;

  if (!post) {
    return (
      <div className="w-full overflow-x-hidden">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="pt-20 pb-20">
        {/* Cover image */}
        {post.coverImage && (
          <div className="w-full h-[400px] relative mb-8">
            <div className="absolute inset-0 bg-black/30"></div>
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog
            </Link>
          </FadeIn>
          
          <article className="max-w-3xl mx-auto">
            <FadeIn>
              {/* Post types tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.postTypes.map(type => (
                  <Badge 
                    key={type} 
                    variant="outline" 
                    className={`text-xs ${postTypeColors[type]}`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
              
              {/* Topic categories tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-500">Topics:</span>
                {post.topicCategories.map(category => (
                  <Link 
                    key={category}
                    to={`/blog?topic=${category}`}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${topicCategoryColors[category]}`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              
              {/* Related posts section could be added here */}
            </FadeIn>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;