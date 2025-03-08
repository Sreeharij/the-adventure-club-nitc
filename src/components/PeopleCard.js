import React from "react";

const PeopleCard = ({ name, position, imageUrl, isAdmin, onDelete }) => {
  return (
    <div className="relative bg-gray-900 p-4 rounded-lg shadow-lg text-center w-full sm:w-64 flex flex-col items-center transition transform hover:scale-105 duration-300">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <button onClick={onDelete} className="bg-red-600 text-white w-6 h-6 rounded-full text-lg flex justify-center items-center hover:bg-red-800 transition">
            &times;
          </button>
        </div>
      )}

      <div className="w-full h-64 flex justify-center items-center overflow-hidden rounded-lg">
        <img src={imageUrl} alt={name} className="max-h-full max-w-full object-contain rounded-lg" />
      </div>
      <h3 className="text-lg font-semibold mt-4 text-gray-200">{name}</h3>
      <p className="text-blue-400 text-sm font-medium">{position}</p>
    </div>
  );
};

export default PeopleCard;
