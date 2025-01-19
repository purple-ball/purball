import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '文档教程',
    url: '/docs/intro',
    description: (
      <>
        查看详细教程文档
      </>
    ),
  },
  {
    title: '博客',
    url: '/blog',
    description: (
      <>
        阅读最新博客文章
      </>
    ),
  },
  {
    title: '关于',
    description: (
      <>
        一个分享技术与思考的空间
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
