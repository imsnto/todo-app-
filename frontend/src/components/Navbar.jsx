import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');


  if (!token) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>
            <Link to="/" className="text-xl font-bold text-gray-800">
              Task Manager
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link 
              to="/tasks" 
              className="text-gray-600 hover:text-gray-900"
            >
              Tasks
            </Link>
            <Link 
              to="/create" 
              className="text-gray-600 hover:text-gray-900"
            >
              Create Task
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

