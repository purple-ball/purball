---
sidebar_position: 2
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# 吉他 🎸

记录我的吉他学习之路...

## 我的弹唱视频 🎥

<BrowserOnly>
{() => {
  const GuitarVideos = require('@site/src/components/GuitarVideos').default;
  return <GuitarVideos />;
}}
</BrowserOnly> 