
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeIn from '../components/animations/FadeIn';

const Blog = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">Blog</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">
              Insights, thoughts, and reflections on investing, technology, and the future of business.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FadeIn delay={0.1}>
              <BlogCard 
                title="The Rise of Illegible Founders" 
                excerpt="How unconventional thinkers are reshaping the startup landscape and creating new categories of value."
                date="April 15, 2025"
                category="Insights"
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <BlogCard 
                title="Bridging Academia and Entrepreneurship" 
                excerpt="The growing ecosystem of academic entrepreneurs and how they're commercializing breakthrough research."
                date="March 28, 2025"
                category="Research"
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <BlogCard 
                title="Gender Diversity in Startup Funding" 
                excerpt="Why diverse founding teams consistently outperform and how investors can tap into this undervalued opportunity."
                date="February 12, 2025"
                category="Diversity"
              />
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all hover:shadow-sm">
      <div className="text-sm text-orangery-500 font-medium mb-2">{category}</div>
      <h3 className="text-xl font-serif font-medium mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="text-sm text-gray-500">{date}</div>
    </div>
  );
};

export default Blog;
