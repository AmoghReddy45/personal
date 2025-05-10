import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import InvestmentApproach from "../components/InvestmentApproach";
import Manifesto from "../components/Manifesto";
import Community from "../components/Community";
import Connecting from "../components/Connecting";
import Footer from "../components/Footer";
import { preloadTopBlogPosts } from "../hooks/useSupabaseBlogPosts";

const Index = () => {
  // Preload top blog posts when the home page loads
  useEffect(() => {
    // Use a small timeout to not block the initial render
    const timer = setTimeout(() => {
      preloadTopBlogPosts();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Manifesto />
      <InvestmentApproach />
      <Community />
      <Connecting />
      <Footer />
    </div>
  );
};

export default Index;
