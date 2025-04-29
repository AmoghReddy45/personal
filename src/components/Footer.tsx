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
  return <footer id="contact" className="relative mx-0 mt-0 mb-[70px] px-[10px] py-[75px]">
      <div className="absolute inset-0 -z-10">
        <img src="/lovable-uploads/6ee93915-9114-49df-859b-27bd734af92c.png" alt="Footer background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
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
    </footer>;
};
export default Footer;