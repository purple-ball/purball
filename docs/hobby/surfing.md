---
sidebar_position: 1
---

import React, { useState, useEffect } from 'react';

export const WebsiteManager = () => {
  const [websites, setWebsites] = useState(() => {
    const savedWebsites = localStorage.getItem('interesting-websites');
    return savedWebsites ? JSON.parse(savedWebsites) : [
      {
        id: 1,
        name: '🎨 设计灵感',
        url: 'https://dribbble.com',
        description: '获取设计灵感的优质平台'
      },
      {
        id: 2,
        name: '📚 在线图书馆',
        url: 'https://www.gutenberg.org',
        description: '免费电子书资源'
      },
      {
        id: 3,
        name: '🎵 音乐分享',
        url: 'https://music.163.com',
        description: '发现新音乐'
      }
    ];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('interesting-websites', JSON.stringify(websites));
  }, [websites]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newWebsite.name && newWebsite.url) {
      setWebsites([...websites, { ...newWebsite, id: Date.now() }]);
      setNewWebsite({ name: '', url: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    setWebsites(websites.filter(site => site.id !== id));
  };

  return (
    <div className="website-manager">
      <div className="website-list">
        {websites.map(site => (
          <div key={site.id} className="website-card">
            <h3>
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.name}
              </a>
              <button
                onClick={() => handleDelete(site.id)}
                className="delete-button"
                title="删除网站"
              >
                ×
              </button>
            </h3>
            <p>{site.description}</p>
          </div>
        ))}
      </div>

      <button
        className="add-website-button"
        onClick={() => setShowAddForm(true)}
      >
        添加网站
      </button>

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form">
            <h3>添加新网站</h3>
            <form onSubmit={handleAdd}>
              <div>
                <label>网站名称：</label>
                <input
                  type="text"
                  value={newWebsite.name}
                  onChange={e => setNewWebsite({...newWebsite, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label>网址：</label>
                <input
                  type="url"
                  value={newWebsite.url}
                  onChange={e => setNewWebsite({...newWebsite, url: e.target.value})}
                  required
                />
              </div>
              <div>
                <label>描述：</label>
                <textarea
                  value={newWebsite.description}
                  onChange={e => setNewWebsite({...newWebsite, description: e.target.value})}
                />
              </div>
              <div className="form-buttons">
                <button type="submit">添加</button>
                <button type="button" onClick={() => setShowAddForm(false)}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

# 网上冲浪 🏄‍♂️

## 我的收藏夹 🔖
### 有趣的网站
<WebsiteManager />

### 推荐的博客
- 科技前沿
- 生活方式
- 艺术创作

## 最近发现 ��
分享一些最近发现的有趣内容... 