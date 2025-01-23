---
sidebar_position: 1
---

import React, { useState } from 'react';
import styles from '@site/src/css/custom.css';
import Link from '@docusaurus/Link';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="resume-content">
          <h1>叶静妍</h1>
          
          <div className="resume-basic-info">
            <p><strong>Age：</strong>20岁（大三在读）&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>Base：</strong>福建省福州市&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>Tel：</strong>15859693180&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>Email：</strong>yjyyjyyjy2333@163.com</p>
          </div>

          <h2>教育背景</h2>
          <p><strong>2022.9-至今</strong>&nbsp;&nbsp;&nbsp;&nbsp;福州大学（211）&nbsp;&nbsp;&nbsp;&nbsp;计算机科学与技术</p>

          <h2>校园经历</h2>
          <h3>班级 | 文体委员</h3>
          <p><strong>2022.10—至今</strong></p>
          <ul>
            <li>组织班级团建活动、志愿活动<strong>10＋</strong>次</li>
            <li>对接学校、学院大小活动</li>
          </ul>

          <h3>学校广播台专题采访部 | 部员</h3>
          <p><strong>2022.10—2024.4</strong></p>
          <ul>
            <li><strong>采访发起：</strong>及时把握各类时事热点，平均每月撰写契合热点的采访文案10篇以上；快速锁定目标采访对象并积极发起采访，每周可锁定并筛选出15 - 20位目标采访对象</li>
            <li><strong>采访上线：</strong>使用Au对采访音视频进行专业、高效的剪辑处理。剪辑音频上传在<strong>喜马拉雅App《福大新鲜事》</strong>栏目，累计完播量达<strong>2w</strong></li>
          </ul>

          <h2>项目经历</h2>
          <h3>健康饮食管理系统（智膳优选）| 组员</h3>
          <p><strong>2024.10-2024.11</strong></p>
          <p><strong>项目描述：</strong>智膳优选是一个综合性智能饮食管理平台，提供食材热量查询、饮食记录、个性化饮食计划、运动指导和社区交流等功能，旨在帮助用户实现健康饮食和生活方式。</p>
          <p><strong>个人贡献：</strong></p>
          <ul>
            <li><strong>需求调研和规划：</strong>深度调研了<strong>500余名</strong>用户，覆盖不同年龄、性别、职业群体，精准定位用户核心需求。据此规划产品功能架构，使产品功能契合度提升至90%以上，确保产品贴合市场与用户实际。</li>
            <li><strong>竞品分析：</strong>分析了市场上排名前10的竞品，从功能、用户体验、市场占有率等<strong>20余</strong>个维度进行对比，梳理出竞品优势50余项、不足30余处。并将其图表化，整理出相关图表<strong>20余</strong>张。</li>
            <li><strong>报表制作：</strong>制作了<strong>30余份</strong>项目进度报表、10余份数据分析报表，报表中详细呈现了项目各阶段完成度、数据库变化等信息。为团队决策提供了有力依据，助力项目按计划推进。</li>
          </ul>

          <h3>个人小红书账号内容运营 | 账号名：一只小蚂蚁</h3>
          <p><strong>2024.7-至今</strong></p>
          <p><strong>项目描述：</strong>分享小众、独特、符合年轻人文字审美的旅游文案。文案形式为半摘录半原创。</p>
          <p><strong>个人贡献：</strong>搜索并分析相似账号的内容及内容展示形式，总结提炼爆款笔记的文案套路，并融合自己的创新点（小众、不烂大街、有文学性）来迎合目标人群（年轻人），产出笔记<strong>8篇5000+字。</strong></p>
          <p><strong>项目成果：</strong>半年累计观看达<strong>20w</strong>，点赞收藏量达<strong>3900+</strong>。小红书数据中心真实数据：互动、观看、涨粉、主页访问超过99%同类，发文活跃度超过95%同类。</p>

          <h2>个人技能</h2>
          <ul>
            <li>CET-6证书（口试等级：良好）</li>
            <li>熟练使用chatGPT、cursor、Kimi等AI</li>
            <li>原型图绘画：墨刀、Axure</li>
            <li>计算机语言：C、C++、Java</li>
            <li>数据分析工具：Excel、SPSS</li>
            <li>数据库：MySQL，会使用Navicat、DBeaver等数据库管理工具</li>
          </ul>

          <h2>自我评价</h2>
          <ul>
            <li>对AI技术热情，目前正在用cursor开发个人网站</li>
            <li>对热点敏感，高强度网络冲浪，熟悉新媒体平台规则和玩法，了解前沿互联网资讯</li>
            <li>熟悉软件开发流程，具备扎实的计算机基础知识</li>
            <li>具有强烈的责任心和和良好的团队合作意识</li>
            <li>沟通能力强，具备熟练的英文读、写能力</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const AboutMePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewWorkModalOpen, setIsNewWorkModalOpen] = useState(false);
  
  const handleAddNewWork = (title) => {
    // 处理新作品集的创建逻辑
    console.log('Creating new work:', title);
  };
  
  return (
    <div className="about-me-page">
      <h2>你好，世界！</h2>
      欢迎来到我的个人空间！这里是我记录生活、分享想法的地方。
      
      <h2>关于我 🌟</h2>
      e\infp 射手座 福州大学计科大三在读
      
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

      <h2>我的作品集 🎨</h2>
      <div className="works-buttons">
        <Link
          to="/docs/works/ai-writing"
          className="work-button"
        >
          AI生文
        </Link>
        <Link
          to="/docs/works/ai-drawing"
          className="work-button"
        >
          AI生图
        </Link>
        <button 
          className="work-button add-button"
          onClick={() => setIsNewWorkModalOpen(true)}
        >
          +
        </button>
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
        <li>💌 Email: yjyyjyyjy2333@163.com</li>
        <li>💻 GitHub: purple-ball</li>
      </ul>

      <h2>✨</h2>
      <blockquote>
        <p>我愿是雨而不是灰烬</p>
      </blockquote>

      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <NewWorkModal
        isOpen={isNewWorkModalOpen}
        onClose={() => setIsNewWorkModalOpen(false)}
        onAdd={handleAddNewWork}
      />
    </div>
  );
};

<AboutMePage /> 