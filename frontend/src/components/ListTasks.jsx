import { useState, useEffect } from 'react';
import axios from 'axios';

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('secretToken');
        const response = await axios.get('https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('There was an error fetching the tasks!', error);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('secretToken');
      const updatedDate = new Date();
      const response = await axios.put(`https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/update/${taskId}`, 
        { status: newStatus, updated_date: updatedDate }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus, updated_date: updatedDate } : task));
      console.log(response.data);
    } catch (error) {
      console.error('There was an error updating the task status!', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('secretToken');
      await axios.delete(`https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  };

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
            <p>Created on: {new Date(task.creation_date).toLocaleString()}</p>
            <p>Updated on: {new Date(task.updated_date).toLocaleString()}</p>
            {task.status === false && (
              <button onClick={() => handleStatusChange(task._id, true)}>
                Mark as Completed
              </button>
            )}
            <button onClick={() => handleDelete(task._id)}>
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTasks;