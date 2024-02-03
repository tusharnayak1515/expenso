"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <div
      className={`min-h-[calc(100vh-80px)] w-full flex flex-col justify-start items-center bg-slate-600`}
    >
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
