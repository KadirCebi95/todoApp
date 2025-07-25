import { useState } from 'react';
import { motion } from 'framer-motion';

function AddTodoModal({ onAdd, onClose }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAdd(text);
    setText('');
    onClose();
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
      <motion.div
        className="bg-white p-4 rounded shadow-lg w-100"
        style={{ maxWidth: '500px' }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="mb-3 text-center"> Yeni Görev Ekle</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Görev gir..."
            />
            <button className="btn btn-success" type="submit">Ekle</button>
          </div>
        </form>
        <button className="btn btn-secondary mt-3 w-100" onClick={onClose}>
          Kapat
        </button>
      </motion.div>
    </div>
  );
}

export default AddTodoModal;
