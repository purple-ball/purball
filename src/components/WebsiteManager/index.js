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

const DEFAULT_BLOGS = [
  {
    id: 1,
    category: '科技前沿',
    name: 'TechCrunch',
    url: 'https://techcrunch.com',
    description: '全球科技新闻和分析'
  },
  {
    id: 2,
    category: '生活方式',
    name: '理想生活实验室',
    url: 'https://www.toodaylab.com',
    description: '关注创意设计与生活方式'
  },
  {
    id: 3,
    category: '艺术创作',
    name: 'Colossal',
    url: 'https://www.thisiscolossal.com',
    description: '艺术、设计和视觉文化'
  }
];

export default function WebsiteManager() {
  const [websites, setWebsites] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    category: '',
    name: '',
    url: '',
    description: ''
  });
  const [newBlog, setNewBlog] = useState({
    category: '',
    name: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    const savedWebsites = localStorage.getItem('interesting-websites');
    const savedBlogs = localStorage.getItem('recommended-blogs');
    setWebsites(savedWebsites ? JSON.parse(savedWebsites) : DEFAULT_WEBSITES);
    setBlogs(savedBlogs ? JSON.parse(savedBlogs) : DEFAULT_BLOGS);
  }, []);

  useEffect(() => {
    if (websites.length > 0) {
      localStorage.setItem('interesting-websites', JSON.stringify(websites));
    }
  }, [websites]);

  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem('recommended-blogs', JSON.stringify(blogs));
    }
  }, [blogs]);

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

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (newBlog.name && newBlog.url) {
      setBlogs([...blogs, { ...newBlog, id: Date.now() }]);
      setNewBlog({ category: '', name: '', url: '', description: '' });
      setShowAddBlogForm(false);
    }
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
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
               -
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

      <h3 className="section-title">推荐的博客</h3>
      
      <div className="website-list">
        {blogs.map(blog => (
          <div key={blog.id} className="website-card">
            <div className="website-content">
              <span className="website-category">📝 {blog.category}</span>
              <h4>
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                  {blog.name}
                </a>
              </h4>
              <p>{blog.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteBlog(blog.id)}
            >
               -
            </button>
          </div>
        ))}
      </div>

      <button
        className="add-button"
        onClick={() => setShowAddBlogForm(true)}
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
        添加博客
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

      {showAddBlogForm && (
        <div className="modal-overlay" onClick={() => setShowAddBlogForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>添加新博客</h3>
            <form onSubmit={handleAddBlog}>
              <div className="form-group">
                <label>分类：</label>
                <input
                  type="text"
                  value={newBlog.category}
                  onChange={e => setNewBlog({...newBlog, category: e.target.value})}
                  placeholder="例如：科技前沿"
                  required
                />
              </div>
              <div className="form-group">
                <label>博客名称：</label>
                <input
                  type="text"
                  value={newBlog.name}
                  onChange={e => setNewBlog({...newBlog, name: e.target.value})}
                  placeholder="博客名称"
                  required
                />
              </div>
              <div className="form-group">
                <label>网址：</label>
                <input
                  type="url"
                  value={newBlog.url}
                  onChange={e => setNewBlog({...newBlog, url: e.target.value})}
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>描述：</label>
                <textarea
                  value={newBlog.description}
                  onChange={e => setNewBlog({...newBlog, description: e.target.value})}
                  placeholder="简短描述"
                />
              </div>
              <div className="form-buttons">
                <button type="submit">保存</button>
                <button type="button" onClick={() => setShowAddBlogForm(false)}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 