import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>我的个人网站</title>
        <meta name="description" content="个人作品集与简介" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container">
          <section className={styles.profile}>
            <div className={styles.profileContent}>
              <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                  这里放置您的照片
                </div>
              </div>
              <div className={styles.introText}>
                <h1>您的名字</h1>
                <p>这里是您的个人简介</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
} 