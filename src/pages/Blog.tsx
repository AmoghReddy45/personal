import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/animations/FadeIn";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Search, X, ArrowRight } from "lucide-react";
import {
  useSupabaseBlogPosts,
  BlogPost,
  prefetchBlogPost,
} from "../hooks/useSupabaseBlogPosts";
import type { PostType, TopicCategory } from "../lib/database.types";

// All available tag options
const allPostTypes: PostType[] = [
  "Insight",
  "Research",
  "Build Log",
  "Reflection",
  "Essay",
];
const allTopicCategories: TopicCategory[] = [
  "Culture",
  "History",
  "Tech",
  "Design",
  "Health",
  "Psychology",
  "Personal",
  "Philosophy",
];

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

const Blog: React.FC = () => {
  // Get query parameters from URL
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // States for filtering and search
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || "",
  );
  const [selectedPostTypes, setSelectedPostTypes] = useState<PostType[]>(
    (queryParams
      .get("type")
      ?.split(",")
      .filter((type) =>
        allPostTypes.includes(type as PostType),
      ) as PostType[]) || [],
  );
  const [selectedTopicCategories, setSelectedTopicCategories] = useState<
    TopicCategory[]
  >(
    (queryParams
      .get("topic")
      ?.split(",")
      .filter((topic) =>
        allTopicCategories.includes(topic as TopicCategory),
      ) as TopicCategory[]) || [],
  );
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Refs for intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Update URL with current filters
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    if (selectedPostTypes.length > 0) {
      params.set("type", selectedPostTypes.join(","));
    }

    if (selectedTopicCategories.length > 0) {
      params.set("topic", selectedTopicCategories.join(","));
    }

    const newSearch = params.toString() ? `?${params.toString()}` : "";
    navigate({ search: newSearch }, { replace: true });
  }, [searchQuery, selectedPostTypes, selectedTopicCategories, navigate]);

  // Get posts from Supabase with filters (will use cached posts if available)
  const { posts, loading, error } = useSupabaseBlogPosts(
    searchQuery,
    selectedPostTypes.length > 0 ? selectedPostTypes : undefined,
    selectedTopicCategories.length > 0 ? selectedTopicCategories : undefined,
    true, // Load all posts when on the blog page
  );

  // Log any errors for debugging
  useEffect(() => {
    if (error) {
      console.error("Error in Blog component:", error);
    }
    if (posts) {
      console.log("Posts loaded in Blog component:", posts.length);
    }
  }, [posts, error]);

  // Preload all blog posts when the component mounts
  useEffect(() => {
    import("../hooks/useSupabaseBlogPosts").then(({ preloadAllBlogPosts }) => {
      preloadAllBlogPosts();
    });
  }, []);

  // Setup intersection observer for prefetching
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.getAttribute("data-post-id");
            if (postId) {
              // Prefetch the post content when it comes into view
              prefetchBlogPost(postId);
              // Unobserve after prefetching
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "200px" }, // Start prefetching when post is 200px from viewport
    );

    // Observe all post elements
    postRefs.current.forEach((element, postId) => {
      if (element) {
        observerRef.current?.observe(element);
      }
    });
  }, []);

  // Setup observer when filtered posts change
  useEffect(() => {
    // Allow DOM to update before setting up observer
    const timer = setTimeout(() => {
      setupIntersectionObserver();
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [filteredPosts, setupIntersectionObserver]);

  // Set filtered posts from Supabase response
  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
    }
  }, [posts]);

  // Toggle post type selection
  const togglePostType = (type: PostType) => {
    setSelectedPostTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Toggle topic category selection
  const toggleTopicCategory = (category: TopicCategory) => {
    setSelectedTopicCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPostTypes([]);
    setSelectedTopicCategories([]);
    navigate("/blog", { replace: true });
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                  Blog
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                  Insights, thoughts, and reflections on tech, design, culture,
                  and personal growth.
                </p>
              </FadeIn>

              {/* Search bar */}
              <div className="max-w-2xl">
                <FadeIn delay={150}>
                  <div className="relative w-full md:w-2/3 lg:w-1/2 mb-8">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search blog posts..."
                      className="pl-10 pr-4 py-2 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        className="absolute right-3 top-3"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </FadeIn>

                {/* Tag filters */}
                <FadeIn delay={200}>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Format
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allPostTypes.map((type) => (
                        <Badge
                          key={type}
                          variant="outline"
                          className={`cursor-pointer text-xs ${
                            selectedPostTypes.includes(type)
                              ? postTypeColors[type]
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          onClick={() => togglePostType(type)}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={250}>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Topic
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTopicCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className={`cursor-pointer text-xs ${
                            selectedTopicCategories.includes(category)
                              ? topicCategoryColors[category]
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          onClick={() => toggleTopicCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
            <FadeIn delay={100}>
              <img
                src="/diogenes.jpg"
                alt="Diogenes"
                className="w-72 md:w-88 lg:w-[28rem] h-auto object-cover border-2 border-gray-200 shadow-md rounded-lg hidden md:block"
              />
            </FadeIn>
          </div>

          {/* Active filters display */}
          {(selectedPostTypes.length > 0 ||
            selectedTopicCategories.length > 0 ||
            searchQuery) && (
            <FadeIn delay={300}>
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Showing {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "result" : "results"}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear filters
                </Button>
              </div>
            </FadeIn>
          )}

          {/* Blog posts grid */}
          {loading ? (
            <FadeIn delay={300}>
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">Loading blog posts...</p>
              </div>
            </FadeIn>
          ) : error ? (
            <FadeIn delay={300}>
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                  Error loading blog posts. Please try again later.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Retry
                </Button>
              </div>
            </FadeIn>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredPosts.map((post, index) => {
                const postId = post.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");

                return (
                  <FadeIn key={post.id} delay={350 + index * 50}>
                    <div
                      ref={(el) => {
                        if (el) {
                          el.setAttribute("data-post-id", postId);
                          postRefs.current.set(postId, el);
                        }
                      }}
                    >
                      <BlogCard
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                        postTypes={post.postTypes}
                        topicCategories={post.topicCategories}
                      />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <FadeIn delay={300}>
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                  No posts found matching your criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            </FadeIn>
          )}
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
  postTypes: PostType[];
  topicCategories: TopicCategory[];
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  postTypes,
  topicCategories,
}) => {
  // Convert title to URL-friendly format (this is a simplistic version)
  const postId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Prefetch the blog post content when the user hovers over the card
  const handleMouseEnter = () => {
    prefetchBlogPost(postId);
  };

  // Determine excerpt length class for dynamic spacing
  const getExcerptSpacingClass = () => {
    const wordCount = excerpt.split(" ").length;
    // If excerpt is short (roughly 1-2 lines), add more bottom margin
    return wordCount < 20 ? "mb-8" : "mb-4";
  };

  return (
    <Link
      to={`/blog/${postId}`}
      className="block group h-full"
      onMouseEnter={handleMouseEnter}
    >
      <div className="border border-gray-200 rounded-lg p-6 group-hover:border-gray-300 transition-all group-hover:shadow-sm h-full flex flex-col">
        {/* Post types tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {postTypes.map((type) => (
            <Badge
              key={type}
              variant="outline"
              className={`text-xs ${postTypeColors[type]}`}
            >
              {type}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-orangery-500 transition-colors line-clamp-1 h-[2rem] overflow-hidden">
          {title}
        </h3>
        <p
          className={`text-gray-600 ${getExcerptSpacingClass()} flex-grow line-clamp-3 h-[4.5rem] overflow-hidden`}
        >
          {excerpt}
        </p>

        {/* Topic categories tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {topicCategories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className={`text-xs ${topicCategoryColors[category]}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">{date}</div>
          <div className="text-sm font-medium text-orangery-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition flex items-center">
            Read more <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
