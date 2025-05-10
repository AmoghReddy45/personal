import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SupabaseImage from "../components/SupabaseImage";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import FadeIn from "../components/animations/FadeIn";
import anime from "animejs"; // Standard import
import { useSupabaseBlogPost } from "../hooks/useSupabaseBlogPosts";
import type { PostType, TopicCategory } from "../lib/database.types";

// Tag colors mapping for visual distinction
const postTypeColors: Record<PostType, string> = {
  Insight: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  Research: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  "Build Log": "bg-green-100 text-green-800 hover:bg-green-200",
  Reflection: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  Essay: "bg-rose-100 text-rose-800 hover:bg-rose-200",
};

const topicCategoryColors: Record<TopicCategory, string> = {
  Culture: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  History: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  Tech: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  Design: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  Health: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
  Psychology: "bg-violet-100 text-violet-800 hover:bg-violet-200",
  Personal: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  Philosophy: "bg-slate-100 text-slate-800 hover:bg-slate-200",
};

// Our own random function since anime.random might not be available
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// CSS for glitch effect.
// IMPORTANT: It's highly recommended to move this to a global CSS file
// (e.g., src/index.css or src/App.css) and import it there,
// instead of using a <style> tag directly in the component.
const glitchCSS = `
.glitch-text {
  position: relative;
  /* Base text styling will be provided by Tailwind classes below */
  /* (e.g., text-4xl, font-serif, text-gray-800) */
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text); /* Takes the text from data-text attribute */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* Adjust background-color if your page background is different from white */
  background-color: #fff; 
}

.glitch-text::before {
  left: 2px; /* Slight offset for the first glitch layer */
  color: #ff00c1; /* Magentaish color for the text of this layer */
  /* Defines how this layer is clipped. Animated by JS. */
  clip-path: polygon(
    0% var(--glitch-before-slice-YStart, 0%),
    100% var(--glitch-before-slice-YStart, 0%),
    100% var(--glitch-before-slice-YEnd, 0%),
    0% var(--glitch-before-slice-YEnd, 0%)
  );
  /* Allows horizontal shifting. Animated by JS. */
  transform: translateX(var(--glitch-before-translateX, 0px));
  /* Controls visibility. Animated by JS. */
  opacity: var(--glitch-before-opacity, 0); /* Initially hidden */
}

.glitch-text::after {
  left: -2px; /* Slight offset for the second glitch layer */
  color: #00fff9; /* Cyanish color for the text of this layer */
  /* Defines how this layer is clipped. Animated by JS. */
  clip-path: polygon(
    0% var(--glitch-after-slice-YStart, 0%),
    100% var(--glitch-after-slice-YStart, 0%),
    100% var(--glitch-after-slice-YEnd, 0%),
    0% var(--glitch-after-slice-YEnd, 0%)
  );
  /* Allows horizontal shifting. Animated by JS. */
  transform: translateX(var(--glitch-after-translateX, 0px));
  /* Controls visibility. Animated by JS. */
  opacity: var(--glitch-after-opacity, 0); /* Initially hidden */
}
`;

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post, loading, error } = useSupabaseBlogPost(postId);
  const glitchRef = useRef<HTMLHeadingElement>(null); // Ref for the H1 element

  useEffect(() => {
    // Only start the glitch effect after we've confirmed the post doesn't exist
    // and the loading state is complete
    if (!loading && (!post || error || !post.content) && glitchRef.current) {
      const el = glitchRef.current;
      let glitchInterval: number | undefined;

      // Add a longer delay before starting the glitch effect to prevent flash
      const startDelay = setTimeout(() => {
        // Simple manual glitch effect without using anime.js
        const createGlitchEffect = () => {
          // How many glitch cycles to perform
          const cyclesToPerform = 10;
          let currentCycle = 0;

          const runGlitchCycle = () => {
            if (currentCycle >= cyclesToPerform) {
              // Reset and pause between sequences
              clearAllGlitchEffects();
              setTimeout(createGlitchEffect, random(1000, 3000));
              return;
            }

            // Apply glitch
            applyGlitchEffect();

            // Clear after a short time
            setTimeout(clearAllGlitchEffects, random(50, 150));

            // Schedule next cycle
            setTimeout(runGlitchCycle, random(100, 300));

            currentCycle++;
          };

          // Start the cycle
          runGlitchCycle();
        };

        const applyGlitchEffect = () => {
          if (!el) return;

          const style = el.style;

          // First overlay (magenta-ish)
          let yStartBefore = random(0, 90);
          let yEndBefore = random(yStartBefore + 5, 100);
          style.setProperty("--glitch-before-slice-YStart", `${yStartBefore}%`);
          style.setProperty("--glitch-before-slice-YEnd", `${yEndBefore}%`);
          style.setProperty("--glitch-before-translateX", `${random(-8, 8)}px`);
          style.setProperty("--glitch-before-opacity", "1");

          // Second overlay (cyan-ish)
          let yStartAfter = random(0, 90);
          let yEndAfter = random(yStartAfter + 5, 100);
          style.setProperty("--glitch-after-slice-YStart", `${yStartAfter}%`);
          style.setProperty("--glitch-after-slice-YEnd", `${yEndAfter}%`);
          style.setProperty("--glitch-after-translateX", `${random(-8, 8)}px`);
          style.setProperty("--glitch-after-opacity", "1");
        };

        const clearAllGlitchEffects = () => {
          if (!el) return;

          const style = el.style;
          style.setProperty("--glitch-before-opacity", "0");
          style.setProperty("--glitch-after-opacity", "0");
        };

        // Initialize with all effects cleared
        clearAllGlitchEffects();

        // Start the effect
        createGlitchEffect();
      }, 500); // Longer delay to ensure smooth transition

      // Clean up
      return () => {
        clearTimeout(startDelay);
        if (glitchInterval) clearInterval(glitchInterval);
      };
    }
  }, [post, loading, error]);

  // For debugging purposes
  useEffect(() => {
    if (error) {
      console.error("Error loading blog post:", error);
    }
    if (post && !post.content) {
      console.error("Blog post found but content is empty:", post);
    }
    if (post) {
      console.log("Loaded blog post:", post);
      console.log("Post types:", post.postTypes);
      console.log("Topic categories:", post.topicCategories);
    }
  }, [post, error]);

  // Prepare the glitch effect reference even during loading
  // to prevent any flash when transitioning from loading to error state
  if (loading || !post || error || !post.content) {
    // Use the same structure for both loading and error states to prevent layout shift
    return (
      <>
        <style>{glitchCSS}</style>
        <div className="w-full overflow-x-hidden min-h-screen flex flex-col">
          <Header />
          <main className="pt-32 pb-20 flex-grow flex items-start justify-center">
            <div className="container mx-auto px-4 md:px-6 text-center">
              {loading ? (
                <p className="text-xl text-gray-600 mb-8">Loading post...</p>
              ) : (
                <>
                  <h1
                    ref={glitchRef}
                    className="glitch-text text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6 text-gray-800"
                    data-text="Coming Soon"
                  >
                    Coming Soon
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Patience. It will be done.
                  </p>
                  <Link to="/blog">
                    <Button>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Blog
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="pt-20 pb-20">
        {/* Cover image */}
        <div className="w-full h-[400px] relative mb-8">
          <div className="absolute inset-0 bg-black/30"></div>
          <SupabaseImage
            src={post.coverImage || "/villa-florist.png"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog
            </Link>
          </FadeIn>

          <article className="max-w-3xl mx-auto">
            <FadeIn>
              {/* Post types tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.postTypes.map((type) => (
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

              <div
                className="prose prose-slate max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Topic categories tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-500">Topics:</span>
                {post.topicCategories.map((category) => (
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
