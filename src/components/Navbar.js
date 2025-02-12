// src/components/Navbar.js
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
        if (adminStatus) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          await logout(setUser, setIsAdmin);
          alert("You are Not Admin!");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="header fixed top-0 left-0 w-full z-50 bg-gray-900">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-bold">Adventure Club</Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl md:hidden">☰</button>
        <div className={`md:flex ${isOpen ? "block" : "hidden"} absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent`}>
          {routes.map(({ path, name }) => (
            <Link key={path} to={path} className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              {name}
            </Link>
          ))}
          
          {/* Show Admin Options Only if User is Admin */}
          <button
            onClick={user ? () => logout(setUser, setIsAdmin) : () => signInWithGoogle(setUser, setIsAdmin)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
          >
            {user ? "Logout" : "Admin Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
