-- Create blog post types enum
CREATE TYPE post_type AS ENUM ('Insight', 'Research', 'Build Log', 'Reflection', 'Essay');

-- Create topic category enum
CREATE TYPE topic_category AS ENUM ('Culture', 'History', 'Tech', 'Design', 'Health', 'Psychology', 'Personal', 'Philosophy');

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post types junction table
CREATE TABLE IF NOT EXISTS blog_post_types (
  post_id TEXT REFERENCES blog_posts(id) ON DELETE CASCADE,
  post_type post_type NOT NULL,
  PRIMARY KEY (post_id, post_type)
);

-- Create topic categories junction table
CREATE TABLE IF NOT EXISTS blog_post_topics (
  post_id TEXT REFERENCES blog_posts(id) ON DELETE CASCADE,
  topic_category topic_category NOT NULL,
  PRIMARY KEY (post_id, topic_category)
);

-- Enable row level security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_topics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY blog_posts_select_policy ON blog_posts FOR SELECT USING (true);
CREATE POLICY blog_post_types_select_policy ON blog_post_types FOR SELECT USING (true);
CREATE POLICY blog_post_topics_select_policy ON blog_post_topics FOR SELECT USING (true);

-- Enable realtime for all tables
alter publication supabase_realtime add table blog_posts;
alter publication supabase_realtime add table blog_post_types;
alter publication supabase_realtime add table blog_post_topics;

-- Insert sample data
INSERT INTO blog_posts (id, title, excerpt, content, date, read_time, cover_image)
VALUES
  ('the-rise-of-illegible-founders', 'The Rise of Illegible Founders', 'How unconventional thinkers are reshaping the startup landscape and creating new categories of value.', 
  '<p>In the past few years, we''ve witnessed a fascinating shift in the startup ecosystem—the emergence of what I call "illegible founders." These are entrepreneurs who don''t fit the conventional Silicon Valley pattern recognition mold. They come from unexpected backgrounds, follow non-linear career paths, and often build businesses that established investors struggle to categorize.</p><p>What makes these founders particularly interesting is not just their unconventional backgrounds, but their ability to see opportunities in spaces that more traditional entrepreneurs might overlook. Their perspectives are informed by diverse experiences that give them unique insights into problems worth solving.</p><h2>Breaking the Pattern Recognition Trap</h2><p>Traditional venture capital has long relied on pattern recognition—looking for founders and business models that resemble previously successful companies. While this approach has its merits, it also creates blind spots. Illegible founders exist in these blind spots.</p><p>They often lack the prestigious degrees, the "right" work experience, or the standard Silicon Valley network. But what they do have is a deep understanding of markets that are overlooked and underserved—markets they often have personal connections to.</p><h2>Creating New Categories</h2><p>Perhaps the most valuable contribution of illegible founders is their tendency to create entirely new categories rather than competing in established ones. Because they don''t come from traditional backgrounds, they''re less likely to iterate on existing solutions and more likely to reimagine problems from first principles.</p><p>This leads to businesses that don''t fit neatly into existing investment theses but have the potential to define entirely new markets. Think of companies like Airbnb or Uber when they first launched—they didn''t fit cleanly into existing categories, which made them harder to evaluate but ultimately more valuable.</p><h2>The Value of Diverse Perspectives</h2><p>The rise of illegible founders is a reminder of the enormous value of diverse perspectives in innovation. When we limit our definition of who can be a successful entrepreneur, we limit the range of problems that get solved and the ways we solve them.</p><p>As we move forward, the most forward-thinking investors and ecosystems will be those that develop new frameworks for identifying and supporting these non-traditional founders—looking beyond the usual signals to find the unique insights that come from lived experiences different from the status quo.</p><p>The future of innovation doesn''t just belong to those who fit the established mold, but to those who break it entirely—creating new possibilities along the way.</p>', 
  'April 15, 2025', '5 min read', '/lovable-uploads/449967cf-c208-4653-90e7-94469537ef12.png'),
  
  ('bridging-academia-and-entrepreneurship', 'Bridging Academia and Entrepreneurship', 'The growing ecosystem of academic entrepreneurs and how they are commercializing breakthrough research.', 
  '<p>For decades, there''s been a perceived gulf between academic research and commercial entrepreneurship. Academics were seen as pursuing knowledge for its own sake, while entrepreneurs focused on market applications. But this division is increasingly becoming obsolete as more researchers recognize the potential to translate their discoveries into real-world impact through startups.</p><h2>The New Academic Entrepreneur</h2><p>Today''s academic entrepreneurs represent a new breed of innovator—deeply knowledgeable in their fields but also motivated to see their research make a tangible difference outside the laboratory. They''re publishing papers and filing patents, mentoring students and pitching investors.</p><p>Universities have evolved to support this shift. Technology transfer offices have transformed from administrative bureaucracies into sophisticated commercialization engines. Entrepreneurship programs specifically designed for researchers are proliferating, teaching scientists and engineers how to identify commercial applications for their work and navigate the startup ecosystem.</p><h2>Deep Tech''s Golden Age</h2><p>This convergence between academia and entrepreneurship is fueling what many consider a golden age for deep tech—companies built on substantial scientific or engineering innovations. From CRISPR gene editing to quantum computing, many of today''s most promising technologies began in university labs before spinning out into venture-backed startups.</p><p>The timeline from discovery to commercialization is also accelerating. What might have taken decades in the past can now happen in years or even months, partly due to improved infrastructure for academic entrepreneurship.</p><h2>Challenges and Opportunities</h2><p>Despite this progress, academic entrepreneurs still face unique challenges. They must balance research responsibilities with company-building, navigate intellectual property agreements with their institutions, and often transition from being respected authorities in their fields to novices in business strategy and management.</p><p>However, the potential rewards—both financial and in terms of real-world impact—have never been greater. Venture capital has developed increasingly sophisticated approaches to evaluating and supporting deep tech startups, and large companies are more willing than ever to partner with or acquire academic spinouts.</p><h2>The Future of Innovation</h2><p>As the bridges between academia and entrepreneurship strengthen, we can expect an acceleration in the commercialization of breakthrough research. This convergence represents one of our best hopes for addressing major global challenges—from climate change to healthcare accessibility—by bringing the depth of academic knowledge together with the speed and scale of the startup ecosystem.</p><p>The most successful innovation ecosystems of the future will be those that fully embrace this integration, creating seamless pathways for knowledge to flow from laboratory discovery to market impact.</p>', 
  'March 28, 2025', '6 min read', '/lovable-uploads/a37abb8b-ec16-4a70-b5b1-b696a8c8cdd8.png'),
  
  ('gender-diversity-in-startup-funding', 'Gender Diversity in Startup Funding', 'Why diverse founding teams consistently outperform and how investors can tap into this undervalued opportunity.', 
  '<p>Despite mounting evidence that diverse founding teams deliver superior returns, the venture capital industry continues to show significant gender disparities in funding allocation. This research explores the data behind this phenomenon and offers actionable insights for investors looking to capitalize on this market inefficiency.</p>', 
  'February 12, 2025', '7 min read', NULL),
  
  ('the-cultural-impact-of-sherlock-holmes', 'The Cultural Impact of Sherlock Holmes', 'Exploring how Arthur Conan Doyle''s detective continues to influence modern storytelling and investigation methods.', 
  '<p>Few literary characters have had the lasting cultural impact of Sherlock Holmes. From forensic science to modern detective fiction, Holmes''s influence extends far beyond the pages of Arthur Conan Doyle''s stories.</p>', 
  'January 30, 2025', '8 min read', NULL),
  
  ('origin-of-biryani', 'Origin of Biryani', 'Tracing the historical journey of one of the most beloved rice dishes across continents and cultures.', 
  '<p>Few dishes in the world inspire the kind of devotion and debate that biryani does. This aromatic layered rice dish, fragrant with spices and featuring meat, vegetables, or both, has countless regional variations, each with passionate defenders of their authenticity. But where did biryani actually come from? The answer is as complex and layered as the dish itself.</p><h2>Persian Beginnings</h2><p>Most food historians trace biryani''s origins to Persia (modern-day Iran). The word itself appears to derive from the Persian "birian" (fried before cooking) or "biryan" (to roast). The earliest forms were likely simple rice dishes made with meat, with the sophisticated layering technique developing over time.</p><p>Persian influences entered the Indian subcontinent through various routes, but the Mughal Empire (1526-1857) is most often credited with establishing biryani as a South Asian culinary mainstay. The Mughal emperors, descended from Central Asian Turco-Mongol stock, brought with them Persian cultural influences, including sophisticated court cuisine.</p><h2>The Mughal Influence</h2><p>Legend suggests that Mumtaz Mahal (for whom the Taj Mahal was built) played a role in biryani''s development. Upon visiting army barracks and finding soldiers undernourished, she reportedly asked the chef to prepare a balanced meal combining meat and rice—resulting in what would become biryani.</p><p>Another story credits Emperor Aurangzeb''s military campaigns in the Deccan region, where cooks would prepare a one-pot meal of rice and whatever meat was available, cooked in pits dug into the ground, to feed the army efficiently during long campaigns.</p><h2>Regional Variations</h2><p>As biryani spread throughout the subcontinent, it evolved to incorporate local ingredients, techniques, and preferences—giving rise to dozens of distinct varieties:</p><p><strong>Lucknowi/Awadhi Biryani:</strong> Developed in the kitchens of Nawabs of Awadh, characterized by a more delicate flavor profile and the dum pukht method (slow cooking in a sealed container).</p><p><strong>Hyderabadi Biryani:</strong> Perhaps the most famous variety, featuring strong spices and sometimes sour elements like yogurt or lemon.</p><p><strong>Kolkata Biryani:</strong> Evolved from the Lucknow style but adapted to Bengali tastes with the distinctive addition of potatoes.</p><p><strong>Malabar/Thalassery Biryani:</strong> From Kerala, characterized by the use of small-grained Kaima rice and an emphasis on spices like star anise and cardamom.</p><p><strong>Sindhi Biryani:</strong> Notable for its sour elements, including generous use of yogurt and sometimes dried plums.</p><h2>Beyond South Asia</h2><p>Biryani''s journey didn''t stop at the borders of South Asia. It traveled with South Asian diaspora communities across the world, adapting further in places like Singapore, Malaysia, and the Middle East. In the Gulf countries, versions like Al Mandhy and Kabsa show clear biryani influence while maintaining their own distinctive character.</p><h2>A Dish of Cultural Synthesis</h2><p>Perhaps what makes biryani so special is that it''s a living example of cultural synthesis—a dish born of Persian roots, developed in Mughal courts, adapted by regional South Asian cultures, and continuing to evolve in homes and restaurants worldwide.</p><p>The debate over "authentic" biryani is, in many ways, missing the point. The dish has always been about adaptation and evolution, about taking the best of different culinary traditions and creating something that''s more than the sum of its parts. In that sense, every regional variation tells its own story of cultural exchange and adaptation—making biryani not just delicious food, but living history on a plate.</p>', 
  'January 15, 2025', '8 min read', '/lovable-uploads/dabbf929-5dd0-4794-a011-fe43bf4b3418.png'),
  
  ('what-is-silent-wealth', 'What Is Silent Wealth?', 'Exploring the psychology behind understated affluence and why some choose to hide their financial status.', 
  '<p>Silent wealth is a fascinating psychological and social phenomenon where individuals with significant financial resources deliberately choose to minimize or conceal outward displays of their affluence.</p>', 
  'December 10, 2024', '4 min read', NULL),
  
  ('fitness-the-discipline-arc', 'Fitness: The Discipline Arc', 'My personal journey through fitness and how the discipline transfers to other areas of life.', 
  '<p>My journey with fitness began not as a pursuit of physical perfection, but as an experiment in discipline and habit formation that ultimately transformed multiple areas of my life.</p>', 
  'November 25, 2024', '6 min read', NULL),
  
  ('why-is-new-york-so-desirable', 'Why Is New York So Desirable?', 'Analyzing the continued appeal of New York City through various cultural, architectural, and social lenses.', 
  '<p>Despite high costs of living, crowding, and numerous practical challenges, New York City continues to exert an almost magnetic pull on people from around the world. This essay explores the multifaceted reasons behind the city''s enduring appeal.</p>', 
  'November 8, 2024', '7 min read', NULL),
  
  ('building-my-first-ai-assistant', 'Building My First AI Assistant', 'A technical walkthrough of creating a personalized AI assistant using modern NLP techniques.', 
  '<p>This build log documents my process of creating a personalized AI assistant using transformer models, fine-tuning techniques, and a custom retrieval system to enhance contextual understanding.</p>', 
  'October 20, 2024', '10 min read', NULL);

-- Insert post types
INSERT INTO blog_post_types (post_id, post_type)
VALUES
  ('the-rise-of-illegible-founders', 'Insight'),
  ('bridging-academia-and-entrepreneurship', 'Research'),
  ('gender-diversity-in-startup-funding', 'Research'),
  ('gender-diversity-in-startup-funding', 'Insight'),
  ('the-cultural-impact-of-sherlock-holmes', 'Insight'),
  ('origin-of-biryani', 'Research'),
  ('what-is-silent-wealth', 'Insight'),
  ('fitness-the-discipline-arc', 'Reflection'),
  ('why-is-new-york-so-desirable', 'Insight'),
  ('why-is-new-york-so-desirable', 'Essay'),
  ('building-my-first-ai-assistant', 'Build Log');

-- Insert topic categories
INSERT INTO blog_post_topics (post_id, topic_category)
VALUES
  ('the-rise-of-illegible-founders', 'Culture'),
  ('the-rise-of-illegible-founders', 'Tech'),
  ('bridging-academia-and-entrepreneurship', 'Tech'),
  ('bridging-academia-and-entrepreneurship', 'Culture'),
  ('gender-diversity-in-startup-funding', 'Psychology'),
  ('gender-diversity-in-startup-funding', 'Culture'),
  ('the-cultural-impact-of-sherlock-holmes', 'Culture'),
  ('the-cultural-impact-of-sherlock-holmes', 'History'),
  ('origin-of-biryani', 'History'),
  ('origin-of-biryani', 'Culture'),
  ('what-is-silent-wealth', 'Psychology'),
  ('what-is-silent-wealth', 'Culture'),
  ('fitness-the-discipline-arc', 'Health'),
  ('fitness-the-discipline-arc', 'Personal'),
  ('why-is-new-york-so-desirable', 'Culture'),
  ('why-is-new-york-so-desirable', 'Design'),
  ('building-my-first-ai-assistant', 'Tech');