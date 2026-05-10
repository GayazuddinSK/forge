const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/text-gray-100/g, 'text-textMain');
  content = content.replace(/text-gray-200/g, 'text-textMain');
  content = content.replace(/text-gray-300/g, 'text-textMain');
  content = content.replace(/text-gray-400/g, 'text-textMuted');
  content = content.replace(/text-gray-500/g, 'text-textMuted');
  content = content.replace(/text-gray-600/g, 'text-textMuted');
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
