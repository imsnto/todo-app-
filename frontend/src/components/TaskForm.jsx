import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  // Initialize state variables for task fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  const baseUrl = process.env.REACT_APP_BASE_URL 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      due_date: dueDate,
    };

    try {
        console.log("token: ", localStorage.getItem('token')); 
      const response = await axios.post(`${baseUrl}/api/v1/tasks/`, taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      });

      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl text-center font-semibold">Create New Task</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
