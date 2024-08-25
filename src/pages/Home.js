// src/pages/Home.js
import React from 'react';
import MotionWrapper from '../components/MotionWrapper';
import LandingScene from '../components/LandingScene';

const Home = () => {
  return (
    <MotionWrapper>
      <main>
        <section className="relative h-screen overflow-hidden">
          <LandingScene />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-blue-700">
              Welcome to The Adventure Club NITC
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-800 max-w-2xl mx-auto">
              Discover and enjoy thrilling outdoor adventures with our vibrant community. Explore events, join activities, and connect with fellow enthusiasts.
            </p>
            <button className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-800 transition">
              Join Us
            </button>
          </div>
        </section>
      </main>
    </MotionWrapper>
  );
};

export default Home;
