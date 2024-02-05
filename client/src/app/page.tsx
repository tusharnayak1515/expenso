"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <div
      className={`min-h-[calc(100vh-80px)] w-full flex flex-col justify-start items-center bg-slate-600`}
    >
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
