import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'AboutMe!',
    url: '/docs/intro',
    description: (
      <>
        了解更多关于我
      </>
    ),
  },
  {
    title: '爱好',
    url: '/blog',
    description: (
      <>
        分享我的兴趣爱好
      </>
    ),
  },
  {
    title: '读书笔记',
    url: '/reading',
    description: (
      <>
        记录阅读心得
      </>
    ),
  },
  {
    title: '影视笔记',
    url: '/movies',
    description: (
      <>
        分享观影感受
      </>
    ),
  },
  {
    title: '小狗草坪',
    url: '/dogs',
    description: (
      <>
        我的宠物生活
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
