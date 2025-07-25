import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import TodoItem from './components/TodoItem';
import AddTodoModal from './components/AddTodoModal';
import EditTodoModal from './components/EditTodoModal';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Görev ekleme
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Görev silme
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Görev tamamlandı
  const handleToggleComplete = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);

    const toggled = updated.find(t => t.id === id);
    if (toggled.completed) {
      Swal.fire({
        icon: 'success',
        title: 'Görev Tamamlandı 🎉',
        text: toggled.text,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Görev düzenleme
  const handleEditStart = (todo) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };

  const handleEditSave = (id, newText) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updated);
    setShowEditModal(false);
    setSelectedTodo(null);
  };

  // localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Görevleri ayır
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="container mt-5">
      <div className="todo-wrapper bg-light p-4 rounded shadow mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4 fw-bold">📝 To-Do App</h2>

        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            + Yeni Görev
          </button>
        </div>

        {activeTodos.length === 0 && completedTodos.length === 0 ? (
          <p className="text-center text-muted">Henüz görev eklenmedi.</p>
        ) : (
          <>
            {activeTodos.length > 0 && (
              <>
                <h5 className="mt-4">📌 Aktif Görevler</h5>
                <ul className="list-unstyled">
                  {activeTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onDelete={handleDelete}
                      onToggle={handleToggleComplete}
                      onEdit={handleEditStart}
                    />
                  ))}
                </ul>
              </>
            )}

            {completedTodos.length > 0 && (
              <>
                <h5 className="mt-4 text-muted">✅ Tamamlananlar</h5>
                <ul className="list-unstyled">
                  {completedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onDelete={handleDelete}
                      onToggle={handleToggleComplete}
                      onEdit={handleEditStart}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {/* Modals */}
        {showAddModal && (
          <AddTodoModal onAdd={addTodo} onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedTodo && (
          <EditTodoModal
            todo={selectedTodo}
            onSave={handleEditSave}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
