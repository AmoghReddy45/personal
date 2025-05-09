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

export const useSupabaseBlogPosts = (
  searchQuery?: string,
  selectedPostTypes?: PostType[],
  selectedTopicCategories?: TopicCategory[],
) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blog posts
        const { data: blogPosts, error: postsError } = await supabase
          .from("blog_posts")
          .select("*");

        if (postsError) throw postsError;

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
        const processedPosts = blogPosts.map((post) => {
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

        setPosts(filteredPosts);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, selectedPostTypes, selectedTopicCategories]);

  return { posts, loading, error };
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
          topicCategories: topicCategories.map((topic) => topic.topic_category),
          coverImage: blogPost.cover_image,
        };

        setPost(processedPost);
      } catch (err) {
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
