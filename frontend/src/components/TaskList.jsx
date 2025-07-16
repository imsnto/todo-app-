import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }
        const response = await axios.get(`${baseUrl}/api/v1/tasks/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setDeletingId(taskId);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/api/v1/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTasks = statusFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === statusFilter);

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">All Tasks</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="status-filter" className="text-gray-700">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          {statusFilter === 'all' 
            ? 'No tasks available.' 
            : `No ${statusOptions.find(opt => opt.value === statusFilter)?.label.toLowerCase()} tasks found.`}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:border-blue-500 transition duration-200 ease-in-out cursor-pointer"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              {/* Status Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold
                ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'}`}
              >
                {task.status === 'in_progress' ? 'In Progress' : 
                 task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </div>

              {/* Delete Icon */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl z-10 bg-white rounded-full p-1 shadow"
                title="Delete Task"
                onClick={e => { e.stopPropagation(); handleDelete(task.id); }}
                disabled={deletingId === task.id}
              >
                {deletingId === task.id ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>

              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold">Due Date:</span> {new Date(task.due_date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
