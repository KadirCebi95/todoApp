import { motion } from 'framer-motion';

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <motion.li
      className="todo-item d-flex justify-content-between align-items-center p-3 border mb-3 rounded shadow-sm bg-white"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <span
        className={`flex-grow-1 me-3 ${todo.completed ? 'text-decoration-line-through text-muted' : 'fw-semibold text-dark'}`}
      >
        {todo.text}
      </span>

      <div className="d-flex gap-2">
        <button
          className={`btn btn-sm ${todo.completed ? 'btn-secondary' : 'btn-success'}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? 'Geri Al' : 'Tamamlandı'}
        </button>

        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onEdit(todo)}
        >
          Düzenle
        </button>

        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(todo.id)}
        >
          Sil
        </button>
      </div>
    </motion.li>
  );
}

export default TodoItem;
