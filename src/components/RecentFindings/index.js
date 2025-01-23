import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const DEFAULT_FINDINGS = [
  {
    id: 1,
    title: '有趣的AI工具',
    content: '最近发现了一些很酷的AI工具，比如Midjourney和Claude...',
    lastModified: '2024-03-20T10:30:00.000Z'
  },
  {
    id: 2,
    title: '推荐一个学习网站',
    content: '发现了一个很好的编程学习平台，上面的课程质量都很高...',
    lastModified: '2024-03-19T15:45:00.000Z'
  }
];

export default function RecentFindings() {
  const [findings, setFindings] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFinding, setNewFinding] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('recent-findings');
    setFindings(saved ? JSON.parse(saved) : DEFAULT_FINDINGS);
  }, []);

  useEffect(() => {
    if (findings.length > 0) {
      localStorage.setItem('recent-findings', JSON.stringify(findings));
    }
  }, [findings]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newFinding.title && newFinding.content) {
      const now = new Date().toISOString();
      setFindings([
        {
          ...newFinding,
          id: Date.now(),
          lastModified: now
        },
        ...findings
      ]);
      setNewFinding({ title: '', content: '' });
      setShowAddForm(false);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (selectedFinding && selectedFinding.title && selectedFinding.content) {
      const now = new Date().toISOString();
      setFindings(findings.map(f => 
        f.id === selectedFinding.id 
          ? { ...selectedFinding, lastModified: now }
          : f
      ));
      setSelectedFinding(null);
      setIsEditing(false);
      setShowViewModal(false);
    }
  };

  const handleDelete = (id) => {
    setFindings(findings.filter(f => f.id !== id));
    setSelectedFinding(null);
    setShowViewModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.findingsContainer}>
      <div className={styles.findingsHeader}>
        <h2>最近发现</h2>
        <button
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            style={{ marginRight: '8px' }}
          >
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
          </svg>
          记录发现
        </button>
      </div>

      <div className={styles.findingsGrid}>
        {findings.map(finding => (
          <div
            key={finding.id}
            className={styles.findingCard}
            onClick={() => {
              setSelectedFinding(finding);
              setShowViewModal(true);
              setIsEditing(false);
            }}
          >
            <h3>{finding.title}</h3>
            <time>{formatDate(finding.lastModified)}</time>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>记录新发现</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>标题：</label>
                <input
                  type="text"
                  value={newFinding.title}
                  onChange={e => setNewFinding({...newFinding, title: e.target.value})}
                  placeholder="给这个发现起个标题"
                  required
                />
              </div>
              <div className="form-group">
                <label>内容：</label>
                <textarea
                  value={newFinding.content}
                  onChange={e => setNewFinding({...newFinding, content: e.target.value})}
                  placeholder="详细描述一下..."
                  required
                  rows={6}
                />
              </div>
              <div className="form-buttons">
                <button type="submit">保存</button>
                <button type="button" onClick={() => setShowAddForm(false)}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedFinding && (
        <div className="modal-overlay" onClick={() => {
          if (!isEditing) {
            setShowViewModal(false);
            setSelectedFinding(null);
          }
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {isEditing ? (
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label>标题：</label>
                  <input
                    type="text"
                    value={selectedFinding.title}
                    onChange={e => setSelectedFinding({
                      ...selectedFinding,
                      title: e.target.value
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>内容：</label>
                  <textarea
                    value={selectedFinding.content}
                    onChange={e => setSelectedFinding({
                      ...selectedFinding,
                      content: e.target.value
                    })}
                    required
                    rows={6}
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit">保存</button>
                  <button type="button" onClick={() => setIsEditing(false)}>取消</button>
                </div>
              </form>
            ) : (
              <>
                <div className={styles.findingHeader}>
                  <h3>{selectedFinding.title}</h3>
                  <time>最后编辑：{formatDate(selectedFinding.lastModified)}</time>
                </div>
                <div className={styles.findingContent}>
                  {selectedFinding.content}
                </div>
                <div className={styles.findingActions}>
                  <button onClick={() => setIsEditing(true)}>编辑</button>
                  <button onClick={() => handleDelete(selectedFinding.id)}>
                    -
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 