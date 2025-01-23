---
sidebar_position: 1
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# 网上冲浪 🏄‍♂️

<BrowserOnly>
{() => {
  const WebsiteManager = require('@site/src/components/WebsiteManager').default;
  return <WebsiteManager />;
}}
</BrowserOnly>

<BrowserOnly>
{() => {
  const RecentFindings = require('@site/src/components/RecentFindings').default;
  return <RecentFindings />;
}}
</BrowserOnly> 