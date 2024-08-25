// src/pages/Calendar.js
import React from 'react';
import MotionWrapper from '../components/MotionWrapper';

const Calendar = () => {
  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">Event Calendar</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Calendar component or widget can be integrated here */}
          <p className="text-center text-gray-600">Calendar content goes here...</p>
        </div>
      </main>
    </MotionWrapper>
  );
};

export default Calendar;
