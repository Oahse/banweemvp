const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all .tsx files under frontend/src
const files = glob.sync('frontend/src/**/*.tsx', { nodir: true });

function hasTextImport(content) {
  return /from '\/\@\/components\/ui\/Text'/.test(content) || /from "\/@\/components\/ui\/Text"/.test(content) || /\{\s*Text(,|\s*\})/.test(content);
}

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Skip already processed marker
  if (content.indexOf("/*__TEXT_WRAPPED__*/") !== -1) {
    return;
  }

  // Regex: match literal text between tags that does not contain '{' or '}' or '<' and is not only whitespace
  // This will not match expressions like {error} or components.
  const re = />([^<{\n][^<{]*?)</g;
  let changed = false;
  content = content.replace(re, (match, p1) => {
    // ignore cases where p1 is only whitespace
    if (!p1 || !p1.trim()) return match;
    // ignore if contains JSX expression markers
    if (p1.indexOf('{') !== -1 || p1.indexOf('}') !== -1) return match;
    // avoid wrapping html-like strings with entities only
    // safe wrap
    changed = true;
    return '><Text>' + p1.trim() + '</Text><';
  });

  if (changed) {
    // add import if missing
    if (!hasTextImport(content)) {
      // insert after the last import
      const lines = content.split('\n');
      let lastImportIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^import\s+/.test(lines[i])) lastImportIdx = i;
      }
      const importLine = "import { Text } from '@/components/ui/Text';";
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, importLine);
        content = lines.join('\n');
      } else {
        content = importLine + '\n' + content;
      }
    }

    // add marker to avoid reprocessing
    content = '/*__TEXT_WRAPPED__*/\n' + content;
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});

console.log('Done.');
