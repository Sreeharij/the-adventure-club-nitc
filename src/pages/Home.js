import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Ensure this points to your Firebase config
import MotionWrapper from "../components/MotionWrapper";

const Home = () => {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerRef = ref(storage, "banner"); // Path in Firebase Storage
        const url = await getDownloadURL(bannerRef);
        setBannerUrl(url);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <MotionWrapper>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {bannerUrl ? (
          <img 
            src={bannerUrl} 
            alt="Homepage Banner" 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <p className="text-white">Loading banner...</p>
        )}

        <div className="relative z-10 text-center text-white bg-black bg-opacity-50 p-4 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to The Adventure Club NITC</h1>
          <p className="text-lg md:text-xl mt-4">
            Explore, Discover, and Experience Thrilling Outdoor Adventures.
          </p>
        </div>
      </section>
    </MotionWrapper>
  );
};

export default Home;
