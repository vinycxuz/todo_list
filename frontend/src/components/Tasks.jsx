import { useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('secretToken');
      const response = await axios.post('https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/tasks/create', 
        { title, description, status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error('There was an error creating the task!', error);
    }
  };

  return (
    <div>
      <h1>Tasks Component</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <label>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div>
          <label>Status</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={status} 
              onChange={() => setStatus(!status)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default Tasks;