"use client"
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">My Calculator</div>
        <ul className="flex space-x-4">
          <li className="hover:text-gray-300">Home</li>
          <li className="hover:text-gray-300">About</li>
          <li className="hover:text-gray-300">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
