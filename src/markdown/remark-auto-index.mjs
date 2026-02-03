import fs from 'node:fs';
import path from 'node:path';

const DOCS_ROOT = path.resolve(process.cwd(), 'src/content/docs');

const toPosix = (value) => value.split(path.sep).join('/');

const stripQuotes = (value) => value.replace(/^['"]|['"]$/g, '');

const extractTitle = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return null;
    const lines = match[1].split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('title:')) continue;
      const value = trimmed.slice('title:'.length).trim();
      return stripQuotes(value);
    }
    return null;
  } catch {
    return null;
  }
};

const toDocUrl = (filePath) => {
  const rel = toPosix(path.relative(DOCS_ROOT, filePath));
  if (rel.endsWith('/index.md')) {
    return `/${rel.replace(/\/index\.md$/, '/')}`;
  }
  if (rel.endsWith('.md')) {
    return `/${rel.replace(/\.md$/, '/')}`;
  }
  return `/${rel}/`;
};

const humanizeSlug = (slug) => slug.replace(/[-_]+/g, ' ');

const buildIndexItems = (dirPath) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.md');
      if (!fs.existsSync(indexPath)) continue;
      const title = extractTitle(indexPath) ?? entry.name;
      items.push({
        title,
        url: toDocUrl(indexPath),
      });
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.md')) continue;
    if (entry.name === 'index.md') continue;
    const title = extractTitle(fullPath) ?? humanizeSlug(entry.name.replace(/\.md$/, ''));
    items.push({
      title,
      url: toDocUrl(fullPath),
    });
  }

  items.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN', { numeric: true }));
  return items;
};

export default function remarkAutoIndex() {
  return (tree, vfile) => {
    if (!vfile?.path) return;
    const filePath = path.resolve(vfile.path);
    if (path.basename(filePath) !== 'index.md') return;

    const rel = path.relative(DOCS_ROOT, filePath);
    if (rel.startsWith('..')) return;

    const contentNodes = tree.children.filter(
      (node) => node.type !== 'yaml' && node.type !== 'toml'
    );
    if (contentNodes.length > 0) return;

    const items = buildIndexItems(path.dirname(filePath));
    if (items.length === 0) return;

    tree.children.push({
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: '目录' }],
    });
    tree.children.push({
      type: 'list',
      ordered: false,
      spread: false,
      children: items.map((item) => ({
        type: 'listItem',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                url: item.url,
                children: [{ type: 'text', value: item.title }],
              },
            ],
          },
        ],
      })),
    });
  };
}
