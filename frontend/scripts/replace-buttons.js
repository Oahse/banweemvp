const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.resolve(__dirname, '../src');
const pattern = `${root}/**/*.tsx`;

const files = glob.sync(pattern, { nodir: true });

console.log(`Found ${files.length} files`);

files.forEach((file) => {
  let src = fs.readFileSync(file, 'utf8');
  const original = src;

  // Skip binary-ish or very large files
  if (src.length > 200000) return;

  // Only operate on files that contain a <button tag
  if (!src.includes('<button')) return;

  // Replace opening tags
  src = src.replace(/<button(\s|>)/g, '<Button$1');
  // Replace closing tags
  src = src.replace(/<\/button>/g, '</Button>');

  // Ensure import exists
  if (!/import\s+\{\s*Button\s*\}\s+from\s+['\"]@\/components\/ui\/Button['\"]/.test(src)) {
    // Find last import and insert after
    const importRegex = /^(import[\s\S]*?;\n)/gm;
    let lastImportIndex = -1;
    let match;
    while ((match = importRegex.exec(src)) !== null) {
      lastImportIndex = match.index + match[0].length;
    }

    const importStatement = "import { Button } from '@/components/ui/Button';\n";
    if (lastImportIndex >= 0) {
      src = src.slice(0, lastImportIndex) + importStatement + src.slice(lastImportIndex);
    } else {
      // Fallback: prepend
      src = importStatement + src;
    }
  }

  if (src !== original) {
    fs.writeFileSync(file, src, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done');
