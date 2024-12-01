import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
