import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const DEFAULT_VIDEOS = [
  {
    id: 1,
    title: '《晴天》翻唱',
    description: '周杰伦《晴天》吉他弹唱版本',
    videoUrl: 'your-video-url-1',
    coverImage: '/img/guitar/cover1.jpg',
    recordDate: '2024-03-15',
    difficulty: '中等',
    tags: ['流行', '周杰伦']
  },
  // ... 其他默认视频
];

export default function GuitarVideos() {
  const [videos, setVideos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoFile: null,
    coverFile: null,
    difficulty: '入门',
    tags: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('guitar-videos');
    const savedVideos = saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
    // 转换已保存的视频和图片URL为Blob URL
    savedVideos.forEach(video => {
      if (video.videoBlob) {
        video.videoUrl = URL.createObjectURL(new Blob([video.videoBlob]));
      }
      if (video.coverBlob) {
        video.coverImage = URL.createObjectURL(new Blob([video.coverBlob]));
      }
    });
    setVideos(savedVideos);
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('guitar-videos', JSON.stringify(videos));
    }
  }, [videos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newVideo.title && newVideo.videoFile) {
      const videoReader = new FileReader();
      const coverReader = new FileReader();
      
      videoReader.onload = () => {
        const videoBlob = new Blob([reader.result], { type: newVideo.videoFile.type });
        const videoUrl = URL.createObjectURL(videoBlob);
        
        // 如果有封面图片，读取封面图片
        if (newVideo.coverFile) {
          coverReader.onload = () => {
            const coverBlob = new Blob([coverReader.result], { type: newVideo.coverFile.type });
            const coverImage = URL.createObjectURL(coverBlob);
            
            addNewVideo(videoUrl, videoReader.result, coverImage, coverReader.result);
          };
          coverReader.readAsArrayBuffer(newVideo.coverFile);
        } else {
          // 没有封面图片时直接添加视频
          addNewVideo(videoUrl, videoReader.result);
        }
      };
      videoReader.readAsArrayBuffer(newVideo.videoFile);
    }
  };

  const addNewVideo = (videoUrl, videoBlob, coverImage = '', coverBlob = null) => {
    const newVideoData = {
      ...newVideo,
      id: Date.now(),
      videoUrl,
      videoBlob,
      coverImage,
      coverBlob,
      recordDate: new Date().toISOString().split('T')[0]
    };
    
    setVideos(prevVideos => [newVideoData, ...prevVideos]);
    localStorage.setItem('guitar-videos', JSON.stringify([newVideoData, ...videos]));
    
    setNewVideo({
      title: '',
      description: '',
      videoFile: null,
      coverFile: null,
      difficulty: '入门',
      tags: []
    });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setVideos(prevVideos => {
      const newVideos = prevVideos.filter(v => v.id !== id);
      localStorage.setItem('guitar-videos', JSON.stringify(newVideos));
      return newVideos;
    });
    setSelectedVideo(null);
    setShowVideoModal(false);
  };

  return (
    <div className={styles.guitarContainer}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{videos.length}</span>
            <span className={styles.statLabel}>视频数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {videos.filter(v => v.recordDate.startsWith('2024')).length}
            </span>
            <span className={styles.statLabel}>今年新增</span>
          </div>
        </div>
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

      <div className={styles.videoGrid}>
        {videos.map(video => (
          <div
            key={video.id}
            className={styles.videoCard}
            onClick={() => {
              setSelectedVideo(video);
              setShowVideoModal(true);
            }}
          >
            <div className={styles.videoCover}>
              <img src={video.coverImage} alt={video.title} />
              <div className={styles.playButton}>▶</div>
            </div>
            <div className={styles.videoInfo}>
              <h3>{video.title}</h3>
              <div className={styles.videoMeta}>
                <span className={styles.difficulty}>{video.difficulty}</span>
                <time>{video.recordDate}</time>
              </div>
              <div className={styles.tags}>
                {video.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(video.id);
              }}
            >
              ★
            </button>
          </div>
        ))}
      </div>

      {showVideoModal && selectedVideo && (
        <div className="modal-overlay" onClick={() => {
          setShowVideoModal(false);
          setSelectedVideo(null);
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={() => {
                setShowVideoModal(false);
                setSelectedVideo(null);
              }}
              type="button"
            >
              ×
            </button>
            <div className={styles.videoPlayer}>
              <video
                controls
                src={selectedVideo.videoUrl}
                poster={selectedVideo.coverImage}
              />
            </div>
            <div className={styles.videoDetails}>
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
              <div className={styles.videoMeta}>
                <span className={styles.difficulty}>{selectedVideo.difficulty}</span>
                <time>录制于：{selectedVideo.recordDate}</time>
              </div>
              <div className={styles.tags}>
                {selectedVideo.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={() => setShowAddForm(false)}
              type="button"
            >
              ×
            </button>
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
                <label>描述：</label>
                <textarea
                  value={newVideo.description}
                  onChange={e => setNewVideo({...newVideo, description: e.target.value})}
                  placeholder="视频描述"
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>上传视频：</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => setNewVideo({...newVideo, videoFile: e.target.files[0]})}
                  required
                />
                {newVideo.videoFile && (
                  <div className={styles.filePreview}>
                    已选择：{newVideo.videoFile.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>上传封面图片：</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setNewVideo({...newVideo, coverFile: e.target.files[0]})}
                />
                {newVideo.coverFile && (
                  <div className={styles.filePreview}>
                    已选择：{newVideo.coverFile.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>难度：</label>
                <select
                  value={newVideo.difficulty}
                  onChange={e => setNewVideo({...newVideo, difficulty: e.target.value})}
                >
                  <option value="入门">入门</option>
                  <option value="简单">简单</option>
                  <option value="中等">中等</option>
                  <option value="困难">困难</option>
                </select>
              </div>
              <div className="form-group">
                <label>标签：</label>
                <input
                  type="text"
                  value={newVideo.tags.join(', ')}
                  onChange={e => setNewVideo({
                    ...newVideo,
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  })}
                  placeholder="用逗号分隔多个标签"
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