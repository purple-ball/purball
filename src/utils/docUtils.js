import fs from 'fs';
import path from 'path';

export function createNewWorkDoc(workPath, title) {
  const docContent = `---
sidebar_position: 3
---

# ${title}

这里是${title}的内容...
`;

  const fullPath = path.join(process.cwd(), 'docs', workPath + '.md');
  fs.writeFileSync(fullPath, docContent, 'utf8');
} 