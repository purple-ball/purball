---
sidebar_position: 1
---

import React, { useState } from 'react';
import styles from '@site/src/css/custom.css';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="resume-content">
          <h1>个人简历</h1>
          
          <h2>教育背景</h2>
          <p><strong>福州大学</strong> - 计算机科学与技术 | 2021-2025</p>
          
          <h2>专业技能</h2>
          <ul>
            <li><strong>编程语言：</strong>Java, Python, JavaScript</li>
            <li><strong>前端开发：</strong>React, HTML5, CSS3</li>
            <li><strong>其他技能：</strong>Git, Linux</li>
          </ul>
          
          <h2>项目经历</h2>
          <h3>项目名称一</h3>
          <ul>
            <li>项目描述...</li>
            <li>技术栈...</li>
          </ul>
          
          <h3>项目名称二</h3>
          <ul>
            <li>项目描述...</li>
            <li>技术栈...</li>
          </ul>
          
          <h2>获奖经历</h2>
          <ul>
            <li><strong>2023年</strong> - 奖项名称</li>
            <li><strong>2022年</strong> - 奖项名称</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const AboutMePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="about-me-page">
      <h1>About Me! 👋</h1>
      
      <h2>你好，世界！</h2>
      欢迎来到我的个人空间！这里是我记录生活、分享想法的地方。
      
      <h2>关于我 🌟</h2>
      e\infp 射手座![alt text](08B4CCB1.png) 福州大学计科大三在读
      
      <div className="resume-links">
        <button 
          className="resume-link"
          onClick={() => setIsModalOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
            <path d="M4 3h8v1H4V3zm0 2h8v1H4V5zm0 2h8v1H4V7zm0 2h4v1H4V9z"/>
          </svg>
          查看简历
        </button>
        <a 
          href="/resume.pdf" 
          className="resume-link" 
          target="_blank"
          download
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8zm0 11.5L3.5 7h9L8 11.5z"/>
          </svg>
          下载简历
        </a>
      </div>

      <h2>我的日常 🎯</h2>
      <ul>
        <li>📚 阅读：探索不同的世界</li>
        <li>🎸 弹吉他：感受音乐的魅力</li>
        <li>🧋 喝奶茶：享受生活的小确幸</li>
        <li>🍜 美食：发现味蕾的惊喜</li>
        <li>🌐 网上冲浪：发现有趣的内容</li>
      </ul>

      <h2>联系我 📫</h2>
      <ul>
        <li>💌 Email: [your.email@example.com]</li>
        <li>💻 GitHub: [your-github-username]</li>
      </ul>

      <h2>✨</h2>
      <blockquote>
        <p>我愿是雨而不是灰烬</p>
      </blockquote>

      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

<AboutMePage /> 