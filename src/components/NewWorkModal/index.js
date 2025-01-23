import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function NewWorkModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>新建作品集</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入作品集名称"
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              取消
            </button>
            <button type="submit" className={styles.submitButton}>
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 