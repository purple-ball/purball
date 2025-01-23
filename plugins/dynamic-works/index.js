const path = require('path');
const fs = require('fs-extra');

module.exports = function dynamicWorksPlugin(context, options) {
  return {
    name: 'dynamic-works-plugin',
    
    async loadContent() {
      // 从 localStorage 获取作品集数据
      let works = [];
      if (typeof window !== 'undefined') {
        const savedWorks = localStorage.getItem('custom-works');
        if (savedWorks) {
          works = JSON.parse(savedWorks);
        }
      }
      return works;
    },

    async contentLoaded({content, actions}) {
      const {createData, addRoute} = actions;
      
      // 为每个作品创建页面
      await Promise.all(content.map(async (work) => {
        const docPath = path.join(context.siteDir, 'docs', work.path + '.md');
        
        // 如果文档不存在，创建它
        if (!fs.existsSync(docPath)) {
          const docContent = `---
sidebar_position: 3
---

# ${work.title}

这里是${work.title}的内容...
`;
          await fs.outputFile(docPath, docContent);
        }
      }));
    },

    // 清理被删除的作品文档
    async postBuild({content}) {
      const docsDir = path.join(context.siteDir, 'docs', 'works');
      const files = await fs.readdir(docsDir);
      
      for (const file of files) {
        if (file === 'ai-writing.md' || file === 'ai-drawing.md') continue;
        
        const filePath = path.join(docsDir, file);
        const workExists = content.some(work => 
          work.path + '.md' === file
        );
        
        if (!workExists) {
          await fs.remove(filePath);
        }
      }
    },
  };
}; 