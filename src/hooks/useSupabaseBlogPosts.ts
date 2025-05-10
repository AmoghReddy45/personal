import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { PostType, TopicCategory } from "@/lib/database.types";

export interface BlogPost {
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

// Cache for preloaded blog posts
let cachedPosts: BlogPost[] | null = null;
let cachedAllPosts: BlogPost[] | null = null;
let isFetchingCache = false;
let isFetchingAllPosts = false;

// Fallback data in case Supabase connection fails
let fallbackPostsLoaded = false;
async function loadFallbackPosts(): Promise<BlogPost[]> {
  if (fallbackPostsLoaded && cachedAllPosts) return cachedAllPosts;

  try {
    const response = await fetch("/sample-blog-posts.json");
    if (!response.ok) throw new Error("Failed to load fallback posts");
    const data = await response.json();
    fallbackPostsLoaded = true;
    return data;
  } catch (err) {
    console.error("Error loading fallback posts:", err);
    return [];
  }
}

// Function to process blog posts data
const processBlogPostsData = (
  blogPosts: any[],
  postTypes: any[],
  topicCategories: any[],
) => {
  return blogPosts.map((post) => {
    // Get post types for this post
    const types = postTypes
      .filter((type) => type.post_id === post.id)
      .map((type) => type.post_type);

    // Get topic categories for this post
    const topics = topicCategories
      .filter((topic) => topic.post_id === post.id)
      .map((topic) => topic.topic_category);

    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      readTime: post.read_time,
      postTypes: types,
      topicCategories: topics,
      coverImage: post.cover_image,
    };
  });
};

// Function to preload top 6 blog posts
export const preloadTopBlogPosts = async (): Promise<void> => {
  if (cachedPosts || isFetchingCache) return;

  isFetchingCache = true;
  console.log("Preloading top blog posts...");

  try {
    // Fetch top 6 blog posts
    console.log("Fetching top blog posts from Supabase...");
    console.log(
      "Supabase URL:",
      import.meta.env.VITE_SUPABASE_URL ? "Set" : "Not set",
    );

    const { data: blogPosts, error: postsError } = await supabase
      .from("blog_posts")
      .select("*")
      .limit(6);

    if (postsError) {
      console.error("Error fetching blog posts:", postsError);
      throw postsError;
    }

    console.log("Blog posts fetched:", blogPosts?.length || 0);

    // Fetch all post types for these posts
    const { data: postTypes, error: typesError } = await supabase
      .from("blog_post_types")
      .select("*");

    if (typesError) throw typesError;

    // Fetch all topic categories for these posts
    const { data: topicCategories, error: topicsError } = await supabase
      .from("blog_post_topics")
      .select("*");

    if (topicsError) throw topicsError;

    // Process and combine the data
    cachedPosts = processBlogPostsData(blogPosts, postTypes, topicCategories);
    // Sort posts by date (most recent first)
    cachedPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (err) {
    console.error("Error preloading blog posts:", err);

    // Load fallback posts if Supabase fails
    console.log("Loading fallback posts...");
    try {
      cachedPosts = await loadFallbackPosts();
      console.log("Fallback posts loaded:", cachedPosts.length);
    } catch (fallbackErr) {
      console.error("Failed to load fallback posts:", fallbackErr);
    }
  } finally {
    isFetchingCache = false;
  }
};

// Function to preload all blog posts
export const preloadAllBlogPosts = async (): Promise<void> => {
  if (cachedAllPosts || isFetchingAllPosts) return;

  isFetchingAllPosts = true;

  try {
    // Fetch all blog posts
    console.log("Fetching all blog posts from Supabase...");
    const { data: blogPosts, error: postsError } = await supabase
      .from("blog_posts")
      .select("*");

    if (postsError) {
      console.error("Error fetching all blog posts:", postsError);
      throw postsError;
    }

    console.log("All blog posts fetched:", blogPosts?.length || 0);

    // Fetch all post types
    const { data: postTypes, error: typesError } = await supabase
      .from("blog_post_types")
      .select("*");

    if (typesError) throw typesError;

    // Fetch all topic categories
    const { data: topicCategories, error: topicsError } = await supabase
      .from("blog_post_topics")
      .select("*");

    if (topicsError) throw topicsError;

    // Process and combine the data
    cachedAllPosts = processBlogPostsData(
      blogPosts,
      postTypes,
      topicCategories,
    );
    // Sort posts by date (most recent first)
    cachedAllPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (err) {
    console.error("Error preloading all blog posts:", err);

    // Load fallback posts if Supabase fails
    try {
      cachedAllPosts = await loadFallbackPosts();
      console.log(
        "Fallback posts loaded for all posts:",
        cachedAllPosts.length,
      );
    } catch (fallbackErr) {
      console.error("Failed to load fallback posts:", fallbackErr);
    }
  } finally {
    isFetchingAllPosts = false;
  }
};

export const useSupabaseBlogPosts = (
  searchQuery?: string,
  selectedPostTypes?: PostType[],
  selectedTopicCategories?: TopicCategory[],
  loadAll: boolean = false,
) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching blog posts with filters:", {
          searchQuery,
          selectedPostTypes,
          selectedTopicCategories,
          loadAll,
        });

        // Check if we have cached posts and no filters are applied
        if (
          !loadAll &&
          cachedPosts &&
          !searchQuery &&
          (!selectedPostTypes || selectedPostTypes.length === 0) &&
          (!selectedTopicCategories || selectedTopicCategories.length === 0)
        ) {
          setPosts(cachedPosts);
          setLoading(false);
          return;
        }

        // Check if we have cached all posts and no filters are applied
        if (
          loadAll &&
          cachedAllPosts &&
          !searchQuery &&
          (!selectedPostTypes || selectedPostTypes.length === 0) &&
          (!selectedTopicCategories || selectedTopicCategories.length === 0)
        ) {
          setPosts(cachedAllPosts);
          setLoading(false);
          return;
        }

        // Try to load from fallback first if we don't have cached data
        let processedPosts: BlogPost[] = [];
        let usedFallback = false;

        try {
          // Fetch all blog posts
          console.log("Fetching all blog posts from Supabase...");
          const { data: blogPosts, error: postsError } = await supabase
            .from("blog_posts")
            .select("*");

          if (postsError) {
            console.error("Error fetching all blog posts:", postsError);
            throw postsError;
          }

          console.log("All blog posts fetched:", blogPosts?.length || 0);

          // Fetch all post types
          const { data: postTypes, error: typesError } = await supabase
            .from("blog_post_types")
            .select("*");

          if (typesError) throw typesError;

          // Fetch all topic categories
          const { data: topicCategories, error: topicsError } = await supabase
            .from("blog_post_topics")
            .select("*");

          if (topicsError) throw topicsError;

          // Process and combine the data
          processedPosts = processBlogPostsData(
            blogPosts,
            postTypes,
            topicCategories,
          );
        } catch (supabaseErr) {
          console.error(
            "Error fetching from Supabase, using fallback:",
            supabaseErr,
          );
          processedPosts = await loadFallbackPosts();
          usedFallback = true;
          console.log("Using fallback posts:", processedPosts.length);
        }

        // Sort posts by date (most recent first)
        processedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        // Apply filters if provided
        let filteredPosts = processedPosts;

        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredPosts = filteredPosts.filter((post) =>
            post.title.toLowerCase().includes(query),
          );
        }

        // Filter by selected post types
        if (selectedPostTypes && selectedPostTypes.length > 0) {
          filteredPosts = filteredPosts.filter((post) =>
            selectedPostTypes.some((type) => post.postTypes.includes(type)),
          );
        }

        // Filter by selected topic categories
        if (selectedTopicCategories && selectedTopicCategories.length > 0) {
          filteredPosts = filteredPosts.filter((post) =>
            selectedTopicCategories.some((category) =>
              post.topicCategories.includes(category),
            ),
          );
        }

        // If no filters are applied and we didn't use fallback, update the appropriate cache
        if (
          !usedFallback &&
          !searchQuery &&
          (!selectedPostTypes || selectedPostTypes.length === 0) &&
          (!selectedTopicCategories || selectedTopicCategories.length === 0)
        ) {
          if (loadAll) {
            cachedAllPosts = processedPosts;
          } else if (!cachedPosts) {
            cachedPosts = processedPosts;
          }
        }

        setPosts(filteredPosts);
      } catch (err) {
        console.error("Error in fetchPosts:", err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );

        // Try to load fallback posts if Supabase fails
        try {
          console.log("Loading fallback posts after error...");
          const fallbackPosts = await loadFallbackPosts();
          setPosts(fallbackPosts);
          console.log(
            "Fallback posts loaded after error:",
            fallbackPosts.length,
          );
        } catch (fallbackErr) {
          console.error(
            "Failed to load fallback posts after error:",
            fallbackErr,
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, selectedPostTypes, selectedTopicCategories, loadAll]);

  return { posts, loading, error };
};

// Cache for prefetched blog post content
const prefetchedPostsCache = new Map<string, BlogPost>();

// Function to prefetch a specific blog post content
export const prefetchBlogPost = async (postId: string): Promise<void> => {
  // Skip if already prefetched
  if (prefetchedPostsCache.has(postId)) return;

  try {
    // Check if the post is in the cache
    if (cachedAllPosts) {
      const cachedPost = cachedAllPosts.find((p) => p.id === postId);
      if (cachedPost) {
        prefetchedPostsCache.set(postId, cachedPost);
        return;
      }
    }

    // Fetch the specific blog post by slug (title converted to slug)
    // First try to find by ID in case it's a UUID
    let { data: blogPost, error: postError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    // If not found by ID, try to find by title converted to slug
    if (postError || !blogPost) {
      const { data: blogPostsByTitle, error: titleError } = await supabase
        .from("blog_posts")
        .select("*");

      if (!titleError && blogPostsByTitle) {
        // Find the post where the title converted to slug matches the requested postId
        blogPost = blogPostsByTitle.find((post) => {
          const slug = post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return slug === postId;
        });

        if (blogPost) {
          postError = null;
        }
      }
    }

    if (postError || !blogPost) throw new Error("Post not found");

    // Fetch post types for this post
    const { data: postTypes, error: typesError } = await supabase
      .from("blog_post_types")
      .select("post_type")
      .eq("post_id", blogPost.id);

    if (typesError) throw typesError;

    // Fetch topic categories for this post
    const { data: topicCategories, error: topicsError } = await supabase
      .from("blog_post_topics")
      .select("topic_category")
      .eq("post_id", blogPost.id);

    if (topicsError) throw topicsError;

    // Combine the data
    const processedPost: BlogPost = {
      id: blogPost.id,
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      date: blogPost.date,
      readTime: blogPost.read_time,
      postTypes: postTypes.map((type) => type.post_type),
      topicCategories: topicCategories.map((topic) => topic.topic_category),
      coverImage: blogPost.cover_image,
    };

    prefetchedPostsCache.set(postId, processedPost);
  } catch (err) {
    console.error(`Error prefetching blog post ${postId}:`, err);
  }
};

export const useSupabaseBlogPost = (postId: string | undefined) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check if the post is in the prefetch cache
        if (prefetchedPostsCache.has(postId)) {
          setPost(prefetchedPostsCache.get(postId) || null);
          setLoading(false);
          return;
        }

        // Check if the post is in the cache
        if (cachedPosts) {
          const cachedPost = cachedPosts.find((p) => p.id === postId);
          if (cachedPost) {
            setPost(cachedPost);
            setLoading(false);
            return;
          }
        }

        // Try to fetch from Supabase first
        try {
          // Fetch the specific blog post
          const { data: blogPost, error: postError } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("id", postId)
            .single();

          if (postError) throw postError;
          if (!blogPost) throw new Error("Post not found");

          // Fetch post types for this post
          const { data: postTypes, error: typesError } = await supabase
            .from("blog_post_types")
            .select("post_type")
            .eq("post_id", postId);

          if (typesError) throw typesError;

          // Fetch topic categories for this post
          const { data: topicCategories, error: topicsError } = await supabase
            .from("blog_post_topics")
            .select("topic_category")
            .eq("post_id", postId);

          if (topicsError) throw topicsError;

          // Combine the data
          const processedPost: BlogPost = {
            id: blogPost.id,
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            content: blogPost.content,
            date: blogPost.date,
            readTime: blogPost.read_time,
            postTypes: postTypes.map((type) => type.post_type),
            topicCategories: topicCategories.map(
              (topic) => topic.topic_category,
            ),
            coverImage: blogPost.cover_image,
          };

          setPost(processedPost);
          // Also cache it for future use
          prefetchedPostsCache.set(postId, processedPost);
        } catch (supabaseErr) {
          console.error(
            `Error fetching blog post ${postId} from Supabase:`,
            supabaseErr,
          );

          // Try to find a matching post in the fallback data
          const fallbackPosts = await loadFallbackPosts();
          const fallbackPost = fallbackPosts.find((p) => {
            // Try to match by ID first
            if (p.id === postId) return true;

            // Then try to match by slug
            const slug = p.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return slug === postId;
          });

          if (fallbackPost) {
            console.log(`Found fallback post for ${postId}`);
            setPost(fallbackPost);
          } else {
            throw new Error("Post not found in fallback data");
          }
        }
      } catch (err) {
        console.error(`Error in useSupabaseBlogPost for ${postId}:`, err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};
