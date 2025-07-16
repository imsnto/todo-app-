import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import TaskDetailPage from './components/TaskDetailPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    console.log("User logged out");
  };

  const handleLogin = (token, user) => {
    setIsAuthenticated(true);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              {isAuthenticated ? (
                <h1 className="text-3xl font-bold">Welcome, {user?.username}!</h1>
              ) : (
                <h1 className="text-3xl font-bold">Welcome!</h1>
              )}
            </div>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Logout
              </button>
            )}
          </div>

          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginForm onLogin={handleLogin} />
                ) : (
                  <Navigate to="/tasks" replace />
                )
              }
            />
            <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/tasks/:id" element={isAuthenticated ? <TaskDetailPage /> : <Navigate to="/login" />} />
            <Route path="/create" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
