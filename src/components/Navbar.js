import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { auth, signInWithGoogle, logout, checkIfAdmin } from "../firebaseConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const adminStatus = await checkIfAdmin(currentUser);
        setUser(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-bold">Adventure Club</Link>
        
        {/* Hamburger Menu for Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl md:hidden focus:outline-none">
          ☰
        </button>

        {/* Menu Items */}
        <div className={`absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"} md:flex md:items-center`}>
          {routes.map(({ path, name }) => (
            <Link 
              key={path} 
              to={path} 
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsOpen(false)} // Close menu on selection
            >
              {name}
            </Link>
          ))}

          {/* Admin Login/Logout Button */}
          <button
            onClick={() => {
              if (user) {
                logout(setUser, setIsAdmin);
              } else {
                signInWithGoogle(setUser, setIsAdmin);
              }
              setIsOpen(false); // Close menu after clicking login/logout
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-700 transition"
          >
            {user ? "Logout" : "Admin Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
