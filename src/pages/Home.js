import React, { useState, useEffect } from 'react';
import MotionWrapper from '../components/MotionWrapper';
import LandingScene from '../components/LandingScene';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MotionWrapper>
      <main className="bg-gray-900 text-gray-200 pt-20"> {/* Added padding-top to prevent overlap */}
        <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center text-center">
          <LandingScene />
          <div className="z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
              Welcome to The Adventure Club NITC
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Discover and enjoy thrilling outdoor adventures with our vibrant community. Explore events, join activities, and connect with fellow enthusiasts.
            </p>
          </div>
        </section>
      </main>
    </MotionWrapper>
  );
};

export default Home;
