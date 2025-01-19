import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          {/* 这里需要添加您的照片 */}
          <Image
            src="/your-photo.jpg" // 请将这里替换为您的照片路径
            alt="个人照片"
            width={300}
            height={400}
            className={styles.image}
          />
        </div>
        <div className={styles.profileContent}>
          <h1>您的名字</h1>
          <p className={styles.bio}>
            这里是您的个人简介文字。建议包含您的专业背景、
            兴趣爱好以及个人愿景等内容。
          </p>
        </div>
      </div>
    </main>
  )
} 