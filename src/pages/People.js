// src/pages/People.js
import React from 'react';
import MotionWrapper from '../components/MotionWrapper';

const People = () => {
  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample team member */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-gray-700">President</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </main>
    </MotionWrapper>
  );
};

export default People;
