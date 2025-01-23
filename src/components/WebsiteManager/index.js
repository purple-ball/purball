import React, { useState, useEffect } from 'react';

const DEFAULT_WEBSITES = [
  {
    id: 1,
    category: '设计灵感',
    name: 'Dribbble',
    url: 'https://dribbble.com',
    description: '设计师作品分享平台'
  },
  {
    id: 2,
    category: '在线图书馆',
    name: 'Z-Library',
    url: 'https://z-lib.org',
    description: '电子书资源库'
  },
  {
    id: 3,
    category: '音乐分享',
    name: 'SoundCloud',
    url: 'https://soundcloud.com',
    description: '音乐分享平台'
  }
];

export default function WebsiteManager() {
  const [websites, setWebsites] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    category: '',
    name: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    // 在组件挂载后读取localStorage
    const saved = localStorage.getItem('interesting-websites');
    setWebsites(saved ? JSON.parse(saved) : DEFAULT_WEBSITES);
  }, []);

  useEffect(() => {
    // 只在websites改变时保存
    if (websites.length > 0) {
      localStorage.setItem('interesting-websites', JSON.stringify(websites));
    }
  }, [websites]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newWebsite.name && newWebsite.url) {
      setWebsites([...websites, { ...newWebsite, id: Date.now() }]);
      setNewWebsite({ category: '', name: '', url: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    setWebsites(websites.filter(site => site.id !== id));
  };

  return (
    <div className="website-manager">
      <h2>我的收藏夹 🔖</h2>
      <h3>有趣的网站</h3>
      
      <div className="website-list">
        {websites.map(site => (
          <div key={site.id} className="website-card">
            <div className="website-content">
              <span className="website-category">🏷️ {site.category}</span>
              <h4>
                <a href={site.url} target="_blank" rel="noopener noreferrer">
                  {site.name}
                </a>
              </h4>
              <p>{site.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(site.id)}
            >
              删除
            </button>
          </div>
        ))}
      </div>

      <button
        className="add-button"
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
        添加网站
      </button>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>添加新网站</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>分类：</label>
                <input
                  type="text"
                  value={newWebsite.category}
                  onChange={e => setNewWebsite({...newWebsite, category: e.target.value})}
                  placeholder="例如：设计灵感"
                  required
                />
              </div>
              <div className="form-group">
                <label>网站名称：</label>
                <input
                  type="text"
                  value={newWebsite.name}
                  onChange={e => setNewWebsite({...newWebsite, name: e.target.value})}
                  placeholder="网站名称"
                  required
                />
              </div>
              <div className="form-group">
                <label>网址：</label>
                <input
                  type="url"
                  value={newWebsite.url}
                  onChange={e => setNewWebsite({...newWebsite, url: e.target.value})}
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>描述：</label>
                <textarea
                  value={newWebsite.description}
                  onChange={e => setNewWebsite({...newWebsite, description: e.target.value})}
                  placeholder="简短描述"
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
    </div>
  );
} 