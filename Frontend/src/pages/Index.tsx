import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Navbar from '@/components/Navbar';
import TaglineBadge from '@/components/TaglineBadge';
import CryptoCard from '@/components/CryptoCard';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  // Add fade-in effect for hero content
  useEffect(() => {
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('opacity-100');
        heroContent.classList.remove('opacity-0', 'translate-y-4');
      }, 300);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <style>
        {`
          .hero-text-gradient {
            background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}
      </style>

      <ParticleBackground />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col md:flex-row px-6 md:px-12 lg:px-24 pt-16 pb-20 relative z-10">
        {/* Left Column - Content */}
        <div
          id="hero-content"
          className="w-full md:w-1/3 flex flex-col justify-center transform transition-all duration-1000 ease-out opacity-0 translate-y-4"
        >
          <TaglineBadge text="Empowering Global Startup Growth" />

          <h1 className="hero-text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-8 font-semibold leading-[1.1] tracking-tight">
            Scale Faster with AI-Powered Agents.
          </h1>

          <p className="hero-subtitle text-[#9CACA9] text-lg mt-8 max-w-lg">
            A decentralized protocol for AI agents, freelancers, and builders to collaborate in trustless harmony.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <Button className="gradient-button text-astra-white px-8 py-5 rounded-md font-bold text-base shadow-glow-sm hover:shadow-glow-md transition-all duration-300 transform hover:-translate-y-1">
              Get Started <ArrowRight className="ml-2" size={18} />
            </Button>

            <Button
              variant="outline"
              className="border-astra-green/40 text-astra-white hover:bg-astra-blue hover:bg-opacity-10 hover:text-astra-light-green px-8 py-5 font-medium backdrop-blur-sm"
            >
              See Our Services
            </Button>
          </div>
        </div>

        {/* Right Column - 3D Visual */}
        <div className="w-full md:w-2/3 mt-16 md:mt-0 flex items-center justify-center">
          <CryptoCard />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
