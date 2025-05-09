export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          cover_image: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time?: string;
          cover_image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          date?: string;
          read_time?: string;
          cover_image?: string | null;
          created_at?: string;
        };
      };
      blog_post_types: {
        Row: {
          post_id: string;
          post_type: PostType;
        };
        Insert: {
          post_id: string;
          post_type: PostType;
        };
        Update: {
          post_id?: string;
          post_type?: PostType;
        };
      };
      blog_post_topics: {
        Row: {
          post_id: string;
          topic_category: TopicCategory;
        };
        Insert: {
          post_id: string;
          topic_category: TopicCategory;
        };
        Update: {
          post_id?: string;
          topic_category?: TopicCategory;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      post_type: PostType;
      topic_category: TopicCategory;
    };
  };
};

export type PostType =
  | "Insight"
  | "Research"
  | "Build Log"
  | "Reflection"
  | "Essay";
export type TopicCategory =
  | "Culture"
  | "History"
  | "Tech"
  | "Design"
  | "Health"
  | "Psychology"
  | "Personal"
  | "Philosophy";
