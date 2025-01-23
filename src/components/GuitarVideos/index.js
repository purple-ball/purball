import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const DEFAULT_VIDEOS = [
  {
    id: 1,
    title: '《晴天》吉他弹唱',
    url: 'https://www.example.com/video1',
    date: '2024-03-20',
    description: '周杰伦《晴天》吉他弹唱练习',
    coverImage: '/img/guitar/cover1.jpg'  // 可以添加视频封面图片
  }
];

export default function GuitarVideos() {
  const [videos, setVideos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: '',
    description: '',
    coverImage: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('guitar-videos');
    setVideos(saved ? JSON.parse(saved) : DEFAULT_VIDEOS);
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('guitar-videos', JSON.stringify(videos));
    }
  }, [videos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newVideo.title && newVideo.url) {
      setVideos([
        {
          ...newVideo,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0]
        },
        ...videos
      ]);
      setNewVideo({ title: '', url: '', description: '', coverImage: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <div className={styles.videosContainer}>
      <div className={styles.videosHeader}>
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
          添加视频
        </button>
      </div>

      <div className={styles.videosGrid}>
        {videos.map(video => (
          <div key={video.id} className={styles.videoCard}>
            <div className={styles.videoThumbnail}>
              {video.coverImage ? (
                <img src={video.coverImage} alt={video.title} />
              ) : (
                <div className={styles.placeholderThumbnail}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className={styles.videoInfo}>
              <h3>{video.title}</h3>
              <time>{video.date}</time>
              <p>{video.description}</p>
              <div className={styles.videoActions}>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.watchButton}
                >
                  观看视频
                </a>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(video.id);
                  }}
                >
                  ★
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>添加新视频</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>标题：</label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                  placeholder="视频标题"
                  required
                />
              </div>
              <div className="form-group">
                <label>视频链接：</label>
                <input
                  type="url"
                  value={newVideo.url}
                  onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                  placeholder="https://example.com/video"
                  required
                />
              </div>
              <div className="form-group">
                <label>封面图片链接：</label>
                <input
                  type="url"
                  value={newVideo.coverImage}
                  onChange={e => setNewVideo({...newVideo, coverImage: e.target.value})}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
              <div className="form-group">
                <label>描述：</label>
                <textarea
                  value={newVideo.description}
                  onChange={e => setNewVideo({...newVideo, description: e.target.value})}
                  placeholder="视频描述"
                  rows={3}
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