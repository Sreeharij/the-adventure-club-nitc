// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg rounded-b-lg relative">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition-colors">
          Adventure Club NITC
        </Link>
        
        {/* Hamburger Button */}
        <button
          className="block lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/calendar" className="text-white hover:text-gray-200 transition-colors">Calendar</Link>
          </li>
          <li>
            <Link to="/events" className="text-white hover:text-gray-200 transition-colors">Events</Link>
          </li>
          <li>
            <Link to="/gallery" className="text-white hover:text-gray-200 transition-colors">Gallery</Link>
          </li>
          <li>
            <Link to="/people" className="text-white hover:text-gray-200 transition-colors">People</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-200 transition-colors">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-16 right-0 bg-white shadow-lg rounded-lg p-4 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="text-blue-700 hover:text-blue-800 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/calendar"
                className="text-blue-700 hover:text-blue-800 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Calendar
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="text-blue-700 hover:text-blue-800 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="text-blue-700 hover:text-blue-800 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/people"
                className="text-blue-700 hover:text-blue-800 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                People
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-blue-700 hover:text-blue-800 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
