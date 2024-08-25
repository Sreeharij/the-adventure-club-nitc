// src/pages/Gallery.js
import React from 'react';
import MotionWrapper from '../components/MotionWrapper';

const Gallery = () => {
  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample gallery item */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://via.placeholder.com/400" alt="Adventure" className="w-full h-64 object-cover" />
          </div>
          {/* Add more gallery items as needed */}
        </div>
      </main>
    </MotionWrapper>
  );
};

export default Gallery;
