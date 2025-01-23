import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function WorksLayout({ type }) {
  const [works, setWorks] = useState(() => {
    const savedWorks = localStorage.getItem(`works-${type}`);
    return savedWorks ? JSON.parse(savedWorks) : [];
  });
  
  useEffect(() => {
    localStorage.setItem(`works-${type}`, JSON.stringify(works));
  }, [works]);

  const addWork = () => {
    const newWork = {
      id: Date.now(),
      title: `新作品 ${works.length + 1}`,
      content: '',
    };
    setWorks([...works, newWork]);
  };

  const deleteWork = (id) => {
    setWorks(works.filter(work => work.id !== id));
  };

  const renameWork = (id, newTitle) => {
    setWorks(works.map(work => 
      work.id === id ? { ...work, title: newTitle } : work
    ));
  };

  return (
    <div className={styles.worksContainer}>
      <div className={styles.worksHeader}>
        <h1>{type === 'writing' ? 'AI生文' : 'AI生图'}</h1>
        <button 
          className={styles.addButton}
          onClick={addWork}
        >
          +
        </button>
      </div>
      <div className={styles.worksList}>
        {works.map(work => (
          <div key={work.id} className={styles.workCard}>
            <input
              type="text"
              value={work.title}
              onChange={(e) => renameWork(work.id, e.target.value)}
              className={styles.workTitle}
            />
            <button
              className={styles.deleteButton}
              onClick={() => deleteWork(work.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 