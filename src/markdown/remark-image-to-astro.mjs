import { extname } from 'node:path';
import { visit } from 'unist-util-visit';

const IMPORT_SOURCE = '@components/MarkdownImage.astro';
const IMPORT_STATEMENT = `import MarkdownImage from '${IMPORT_SOURCE}';`;
const DEFAULT_WIDTHS = '320,640,960,1280';
const DEFAULT_FORMATS = 'avif,webp,png';
const DEFAULT_SIZES = '(min-width: 960px) 960px, 100vw';

const escapeAttribute = (value) =>
	String(value)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#39;');

/**
 * Transform Markdown image syntax into the shared <MarkdownImage /> component so that
 * all content images use Astro’s optimized asset pipeline.
 */
export default function remarkImageToAstro() {
	return (tree, file) => {
		const history = file?.history;
		const filePath = typeof file?.path === 'string' ? file.path : Array.isArray(history) ? history[history.length - 1] : undefined;
		const isMdx = typeof filePath === 'string' && extname(filePath).toLowerCase() === '.mdx';

		// `.md` documents are rendered to static HTML, so inject plain <img /> tags
		// with sensible defaults instead of MDX components.
		if (!isMdx) {
			visit(tree, 'image', (node, index, parent) => {
				if (!parent || typeof index !== 'number') return;

				const attributes = [
					['src', node.url],
					['alt', node.alt ?? ''],
					['title', node.title ?? ''],
					['loading', 'lazy'],
					['decoding', 'async'],
				]
					.filter(([, value]) => value !== undefined && value !== null && value !== '')
					.map(([key, value]) => `${key}="${escapeAttribute(value)}"`)
					.join(' ');

				parent.children[index] = {
					type: 'html',
					value: `<img ${attributes} />`,
				};
			});

			return;
		}

		let hasImages = false;
		let hasImport = false;

		visit(tree, 'mdxjsEsm', (node) => {
			if (typeof node.value === 'string' && node.value.includes(IMPORT_SOURCE)) {
				hasImport = true;
			}
		});

		visit(tree, 'image', (node, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			hasImages = true;

			const attributes = [
				{ type: 'mdxJsxAttribute', name: 'src', value: node.url },
				...(node.alt ? [{ type: 'mdxJsxAttribute', name: 'alt', value: node.alt }] : []),
				{ type: 'mdxJsxAttribute', name: 'widths', value: DEFAULT_WIDTHS },
				{ type: 'mdxJsxAttribute', name: 'formats', value: DEFAULT_FORMATS },
				{ type: 'mdxJsxAttribute', name: 'sizes', value: DEFAULT_SIZES },
			];

			const isStandalone = parent.type === 'paragraph' && parent.children.length === 1;

			if (isStandalone) {
				parent.type = 'mdxJsxFlowElement';
				parent.name = 'MarkdownImage';
				parent.attributes = attributes;
				parent.children = [];
			} else {
				parent.children[index] = {
					type: 'mdxJsxTextElement',
					name: 'MarkdownImage',
					attributes,
					children: [],
				};
			}
		});

		if (hasImages && !hasImport) {
			tree.children.unshift({
				type: 'mdxjsEsm',
				value: IMPORT_STATEMENT,
			});
		}
	};
}
