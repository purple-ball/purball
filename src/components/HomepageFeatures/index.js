import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'AboutMe!',
    url: '/docs/aboutme',
    description: (
      <>
        了解更多关于我
      </>
    ),
  },
  {
    title: '爱好',
    url: '/docs/hobby/surfing',
    description: (
      <>
        分享我的兴趣爱好
      </>
    ),
  },
  {
    title: '读书笔记',
    url: '/docs/reading',
    description: (
      <>
        记录阅读心得
      </>
    ),
  },
  {
    title: '影视笔记',
    url: '/docs/movies',
    description: (
      <>
        分享观影感受
      </>
    ),
  },
  {
    title: '小狗草坪',
    url: '/docs/dogs',
    description: (
      <>
        我的好朋友们都在这里留言呢
      </>
    ),
  },
];

function Feature({title, url, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        {url ? (
          <Link to={url} className={styles.featureLink}>
            <h3>{title}</h3>
          </Link>
        ) : (
          <h3>{title}</h3>
        )}
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
