import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="header fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Adventure Club</Link>
        <button onClick={toggleMenu} className="text-white text-2xl md:hidden">
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent`}>
          <Link to="/" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">Home</Link>
          <Link to="/calendar" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</Link>
          <Link to="/events" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">Events</Link>
          <Link to="/gallery" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">Gallery</Link>
          <Link to="/people" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">People</Link>
          <Link to="/contact" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
