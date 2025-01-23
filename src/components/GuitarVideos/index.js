import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const DEFAULT_VIDEOS = [
  {
    id: 1,
    title: '《晴天》翻唱',
    description: '周杰伦《晴天》吉他弹唱版本',
    videoUrl: '',
    coverImage: '',
    recordDate: '2024-03-15',
    difficulty: '中等',
    tags: ['流行', '周杰伦']
  },
  // ... 其他默认视频
];

// 文件大小限制（20MB）
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
// 图片大小限制（2MB）
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const DIFFICULTY_OPTIONS = ['全部', '入门', '简单', '中等', '困难'];

export default function GuitarVideos() {
  const [videos, setVideos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部');
  const [videoPreview, setVideoPreview] = useState('');
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoFile: null,
    coverFile: null,
    difficulty: '入门',
    tags: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  // 过滤视频列表
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === '全部' || video.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setError('');
    
    // 验证视频格式
    if (newVideo.videoFile && !ALLOWED_VIDEO_TYPES.includes(newVideo.videoFile.type)) {
      setError('只支持 MP4、WebM 和 OGG 格式的视频');
      return;
    }

    // 验证文件大小
    if (newVideo.videoFile && newVideo.videoFile.size > MAX_VIDEO_SIZE) {
      setError('视频文件不能超过20MB');
      return;
    }
    if (newVideo.coverFile && newVideo.coverFile.size > MAX_IMAGE_SIZE) {
      setError('封面图片不能超过2MB');
      return;
    }
    
    setLoading(true);
    if (newVideo.title && newVideo.videoFile) {
      const videoReader = new FileReader();
      const coverReader = new FileReader();
      
      videoReader.onload = () => {
        const videoBlob = new Blob([videoReader.result], { type: newVideo.videoFile.type });
        const videoUrl = URL.createObjectURL(videoBlob);
        
        if (newVideo.coverFile) {
          coverReader.onload = () => {
            const coverBlob = new Blob([coverReader.result], { type: newVideo.coverFile.type });
            const coverImage = URL.createObjectURL(coverBlob);
            
            addNewVideo(videoUrl, videoReader.result, coverImage, coverReader.result);
            setLoading(false);
          };
          coverReader.readAsArrayBuffer(newVideo.coverFile);
        } else {
          addNewVideo(videoUrl, videoReader.result);
          setLoading(false);
        }
      };
      
      videoReader.onerror = () => {
        setError('视频文件读取失败');
        setLoading(false);
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
    
    setVideos(prevVideos => {
      const newVideos = [newVideoData, ...prevVideos];
      localStorage.setItem('guitar-videos', JSON.stringify(newVideos));
      return newVideos;
    });
    
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

  const handleEdit = (e) => {
    e.preventDefault();
    if (!selectedVideo) return;
    
    setVideos(prevVideos => {
      const newVideos = prevVideos.map(v => 
        v.id === selectedVideo.id ? selectedVideo : v
      );
      localStorage.setItem('guitar-videos', JSON.stringify(newVideos));
      return newVideos;
    });
    
    setIsEditing(false);
  };

  const handleVideoFileChange = (e, setVideoFunc) => {
    const file = e.target.files[0];
    if (file) {
      if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        setError('只支持 MP4、WebM 和 OGG 格式的视频');
        return;
      }
      if (file.size > MAX_VIDEO_SIZE) {
        setError('视频文件不能超过20MB');
        return;
      }
      setVideoFunc(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.guitarContainer}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="搜索视频..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className={styles.difficultyFilter}
          >
            {DIFFICULTY_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{videos.length}</span>
            <span className={styles.statLabel}>视频数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {videos.filter(v => {
                const recordYear = new Date(v.recordDate).getFullYear();
                const currentYear = new Date().getFullYear();
                return recordYear === currentYear;
              }).length}
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
        {filteredVideos.map(video => (
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
            {isEditing ? (
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label>标题：</label>
                  <input
                    type="text"
                    value={selectedVideo.title}
                    onChange={e => setSelectedVideo({
                      ...selectedVideo,
                      title: e.target.value
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>描述：</label>
                  <textarea
                    value={selectedVideo.description}
                    onChange={e => setSelectedVideo({
                      ...selectedVideo,
                      description: e.target.value
                    })}
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>难度：</label>
                  <select
                    value={selectedVideo.difficulty}
                    onChange={e => setSelectedVideo({
                      ...selectedVideo,
                      difficulty: e.target.value
                    })}
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
                    value={selectedVideo.tags.join(', ')}
                    onChange={e => setSelectedVideo({
                      ...selectedVideo,
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    })}
                    placeholder="用逗号分隔多个标签"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit">保存</button>
                  <button type="button" onClick={() => setIsEditing(false)}>
                    取消
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className={styles.videoPlayer}>
                  <video
                    controls
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.coverImage}
                    controlsList="nodownload"
                    onContextMenu={e => e.preventDefault()}
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
                  <button
                    onClick={() => setIsEditing(true)}
                    className={styles.editButton}
                  >
                    编辑
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={() => {
                setShowAddForm(false);
                setError('');
              }}
              type="button"
            >
              ×
            </button>
            <h3>添加新视频</h3>
            {error && <div className={styles.error}>{error}</div>}
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
                  onChange={e => handleVideoFileChange(e, file => 
                    setNewVideo({...newVideo, videoFile: file})
                  )}
                  required
                />
                {videoPreview && (
                  <div className={styles.videoPreview}>
                    <video
                      src={videoPreview}
                      controls
                      width="100%"
                      height="200"
                    />
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
                <button 
                  type="submit" 
                  disabled={loading}
                  className={loading ? styles.loadingButton : ''}
                >
                  {loading ? '保存中...' : '保存'}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 