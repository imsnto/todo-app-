import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

