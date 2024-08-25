import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="card bg-gray-800 text-gray-300 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
