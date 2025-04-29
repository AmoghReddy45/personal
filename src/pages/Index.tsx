
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import InvestmentApproach from '../components/InvestmentApproach';
import Manifesto from '../components/Manifesto';
import Community from '../components/Community';
import Connecting from '../components/Connecting';
import Footer from '../components/Footer';

const Index = () => {
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
