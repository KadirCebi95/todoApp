function TodoItem({ todo, onDelete , onToggle }) {
  return (
    <li className="todo-item">
      <span className={todo.completed ? 'done' : ''} onClick={() => onToggle(todo.id)}>{todo.text}</span>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>Sil</button>
    </li>
  );
}

export default TodoItem;