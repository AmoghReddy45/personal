
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  className
}) => {
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog';
  
  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative mx-0 my-[70px] px-[10px] py-12 bg-blue-500"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0 bg-white/70 px-4 py-2 rounded">
            {!isBlogPage && <>
                <button onClick={() => scrollToSection('home')} className="text-sm hover:text-orangery-500 transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('thesis')} className="text-sm hover:text-orangery-500 transition-colors">
                  Thesis
                </button>
                <button onClick={() => scrollToSection('investment')} className="text-sm hover:text-orangery-500 transition-colors">
                  Current
                </button>
              </>}
            <Link to="/blog" className="text-sm hover:text-orangery-500 transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
