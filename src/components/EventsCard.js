import React, { useState } from "react";
import { motion } from "framer-motion";

const EventsCard = ({ event, isAdmin, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    Math.max(event.images.findIndex((img) => img === event.thumbnail), 0)
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % event.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
  };

  return (
    <>
      {/* Event Card Preview */}
      <div
        className="bg-gray-900 p-4 rounded-lg shadow-lg text-white cursor-pointer transition hover:scale-105 max-w-lg mx-auto"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={event.thumbnail}
          alt="Thumbnail"
          className="w-full h-64 object-cover rounded-lg"
        />
        <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
        <p className="text-sm text-gray-400">{new Date(event.date).toDateString()}</p>
        <p className="mt-1 text-gray-300">
          {event.description.length > 100
            ? event.description.substring(0, 100) + "..."
            : event.description}
        </p>

        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id, event.images);
            }}
            className="text-red-500 mt-2 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>

      {/* Event Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 text-white p-6 rounded-lg max-w-2xl w-full relative flex flex-col items-center max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400"
            >
              &times;
            </button>

            {/* Image Carousel */}
            <div className="relative w-full mt-4">
              {event.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-600"
                  >
                    ❮
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-600"
                  >
                    ❯
                  </button>
                </>
              )}
              <img
                src={event.images[currentIndex]}
                alt="Event Slide"
                className="w-full rounded-lg"
              />
            </div>

            {/* Event Description */}
            <p className="mt-4 text-gray-300 px-4 pb-4 overflow-y-auto max-h-40">
              {event.description}
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EventsCard;
