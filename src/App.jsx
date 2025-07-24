import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
  setTodos(todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

useEffect(() => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    setTodos(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

  return (
    <div className="container mt-5">
      <div className="todo-wrapper">
        <h2 className="text-center mb-4">📝 To-Do App</h2>

        <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
          <input
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Yeni görev yaz..."
          />
          <button type="submit" className="btn btn-primary">Ekle</button>
        </form>

        <ul className="list-unstyled">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onToggle={handleToggleComplete} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
