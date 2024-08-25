// src/pages/Events.js
import React from 'react';
import MotionWrapper from '../components/MotionWrapper';

const Events = () => {
  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">Our Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample event card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Mountain Hike</h3>
            <p className="text-gray-700 mb-4">Experience the thrill of hiking through breathtaking mountain trails. Suitable for all levels.</p>
            <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition">
              Learn More
            </button>
          </div>
          {/* Add more event cards as needed */}
        </div>
      </main>
    </MotionWrapper>
  );
};

export default Events;
