import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import ClassicalBuilding from "./images/ClassicalBuilding";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const location = useLocation();
  const isBlogPage = location.pathname === "/blog";

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer
      id="contact"
      className="relative mx-0 mt-0 mb-0 px-[10px] bg-transparent py-[100px]"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full relative">
          <ClassicalBuilding />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            {/* Circular element has been removed */}
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0 px-4 py-2 rounded bg-transparent">
            {!isBlogPage && (
              <>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-sm transition-colors text-slate-50"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("resume")}
                  className="text-sm transition-colors text-slate-50"
                >
                  Resume
                </button>
                <button
                  onClick={() => scrollToSection("investment")}
                  className="text-sm transition-colors text-slate-50"
                >
                  Current
                </button>
              </>
            )}
            <Link
              to="/blog"
              className="text-sm text-slate-50 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
