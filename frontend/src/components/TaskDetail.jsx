import React from 'react';

const TaskDetail = ({ task }) => {
  if (!task) return <div className="p-8 text-center">No task selected.</div>;
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <p className="mb-4"><span className="font-semibold">Description:</span> {task.description}</p>
      <p className="mb-2"><span className="font-semibold">Status:</span> {task.status}</p>
      <p className="mb-2"><span className="font-semibold">Due Date:</span> {new Date(task.due_date).toLocaleString()}</p>
    </div>
  );
};

export default TaskDetail;
