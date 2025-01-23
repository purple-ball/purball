// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */

function getCustomWorks() {
  try {
    if (typeof window !== 'undefined') {
      const worksStr = localStorage.getItem('custom-works');
      const works = JSON.parse(worksStr) || [];
      return works.map(work => ({
        type: 'doc',
        id: work.path,
        label: work.title,
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'aboutme',
      label: 'About Me',
    },
    {
      type: 'category',
      label: '作品集',
      items: [
        'works/ai-writing',
        'works/ai-drawing',
        ...getCustomWorks(),
      ],
    },
    {
      type: 'category',
      label: '爱好',
      items: [
        'hobby/surfing',
        'hobby/guitar',
        'hobby/milk-tea',
        'hobby/food',
      ],
    },
    {
      type: 'doc',
      id: 'reading',
      label: '读书笔记',
    },
    {
      type: 'doc',
      id: 'movies',
      label: '影视笔记',
    },
    {
      type: 'doc',
      id: 'dogs',
      label: '小狗草坪',
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
