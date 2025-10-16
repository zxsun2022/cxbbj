// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'node:url';
import remarkImageToAstro from './src/markdown/remark-image-to-astro.mjs';

const SITE_TITLE = '禅修班笔记';
const SITE_DESCRIPTION = '慧灯禅修班笔记的在线整理与参考。';
const COMPONENTS_DIR = fileURLToPath(new URL('./src/components', import.meta.url));
const REMOTE_IMAGE_PATTERNS = [
	{ hostname: 'raw.githubusercontent.com', protocol: 'https' },
	{ hostname: 'gblobscdn.gitbook.com', protocol: 'https' },
	{ hostname: 'mingguang.im', protocol: 'https' },
];

// https://astro.build/config
export default defineConfig({
	image: {
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
		remotePatterns: REMOTE_IMAGE_PATTERNS,
	},
	markdown: {
		remarkPlugins: [remarkImageToAstro],
	},
	integrations: [
		starlight({
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			social: [],
			sidebar: [
				{
					label: '课程笔记',
					items: [
						{ label: '总览', link: '/' },
						{ label: '暇满难得', autogenerate: { directory: '1xm' } },
						{ label: '无常', autogenerate: { directory: '2wc' } },
						{ label: '轮回', autogenerate: { directory: '3lh' } },
						{ label: '因果不虚', autogenerate: { directory: '4yg' } },
					],
				},
				{
					label: '参考资料',
					autogenerate: { directory: 'ref' },
				},
			],
		}),
	],
	vite: {
		resolve: {
			alias: {
				'@components': COMPONENTS_DIR,
			},
		},
	},
});
