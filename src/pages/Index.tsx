
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import InvestmentApproach from '../components/InvestmentApproach';
import Manifesto from '../components/Manifesto';
import Community from '../components/Community';
import Connecting from '../components/Connecting';
import FoundersInSearch from '../components/FoundersInSearch';
import Footer from '../components/Footer';
import HeroImage from '../components/HeroImage';

const Index = () => {
  return (
    <div>
      <Header />
      <HeroImage />
      <Hero />
      <About />
      <InvestmentApproach />
      <Manifesto />
      <Community />
      <Connecting />
      <FoundersInSearch />
      <Footer />
    </div>
  );
};

export default Index;
