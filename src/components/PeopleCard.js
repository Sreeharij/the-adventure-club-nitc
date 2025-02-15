// src/components/PeopleCard.js
import React from "react";

const PeopleCard = ({ name, position, imageUrl, isAdmin, onMoveUp, onMoveDown, onDelete }) => {
  return (
    <div className="relative bg-gray-900 p-4 rounded-lg shadow-lg text-center w-64 h-auto flex flex-col items-center transition transform hover:scale-105 duration-300">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <button onClick={onMoveUp} className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs">▲</button>
          <button onClick={onMoveDown} className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs">▼</button>
          <button onClick={onDelete} className="bg-red-600 text-white w-6 h-6 rounded-full text-lg flex justify-center items-center hover:bg-red-800 transition">&times;</button>
        </div>
      )}

      <div className="w-full max-h-64 overflow-hidden rounded-lg">
        <img src={imageUrl} alt={name} className="w-full h-auto object-contain rounded-lg" />
      </div>
      <h3 className="text-lg font-semibold mt-4 text-gray-200">{name}</h3>
      <p className="text-blue-400 text-sm font-medium">{position}</p>
    </div>
  );
};

export default PeopleCard;
