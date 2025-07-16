import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const baseUrl = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
      const baseUrl = process.env.REACT_APP_BASE_URL;

    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`${baseUrl}/api/v1/tasks/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      } catch (err) {
        setError('Failed to load task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
        console.log("Updating task status to:", newStatus); // Debugging line
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${baseUrl}/api/v1/tasks/${id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data);
    } catch (err) {
      setError('Failed to update task status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!task) return <div className="text-center mt-10">Task not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Tasks
        </button>

        <h1 className="text-3xl font-bold mb-6">{task.title}</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{task.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Status</h2>
            <div className="flex items-center space-x-4">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              {updating && (
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Due Date</h2>
            <p className="text-gray-700">
              {new Date(task.due_date).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
