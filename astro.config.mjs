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
						
						// ========== 1. 暇满难得 ==========
						{
							label: '暇满难得',
							collapsed: true,
							items: [
								// 八闲暇 (基础条件)
								{
									label: '八闲暇(基础条件)',
									collapsed: true,
									items: [
										{ label: '1地狱', link: '/1xm/1-ba-wu-xia/11-di-yu/' },
										{ label: '2饿鬼', link: '/1xm/1-ba-wu-xia/12-e-gui/' },
										{ label: '3旁生', link: '/1xm/1-ba-wu-xia/13-pang-sheng/' },
										{ label: '4边地', link: '/1xm/1-ba-wu-xia/14-bian-di/' },
										{ label: '5长寿天', link: '/1xm/1-ba-wu-xia/15-chang-shou-tian/' },
										{ label: '6邪见', link: '/1xm/1-ba-wu-xia/16-xie-jian/' },
										{ label: '7暗劫', link: '/1xm/1-ba-wu-xia/17-fo-bu-chu-shi/' },
										{ label: '8喑哑', link: '/1xm/1-ba-wu-xia/18-yin-ya/' },
									]
								},
								// 十圆满 (特别条件)
								{
									label: '十圆满(特别条件)',
									collapsed: true,
									items: [
										{ label: '09得人身', link: '/1xm/2-shi-yuan-man/109-de-ren-shen/' },
										{ label: '10生中土', link: '/1xm/2-shi-yuan-man/110-sheng-zhong-tu/' },
										{ label: '11五根具足', link: '/1xm/2-shi-yuan-man/111-wu-gen-ju-zu/' },
										{ label: '12业际不颠倒', link: '/1xm/2-shi-yuan-man/112-ye-ji-bu-dian-dao/' },
										{ label: '13信佛法', link: '/1xm/2-shi-yuan-man/113-xin-fo-fa/' },
										{ label: '14佛陀出世', link: '/1xm/2-shi-yuan-man/114-fo-tuo-chu-shi/' },
										{ label: '15佛已说法', link: '/1xm/2-shi-yuan-man/115-fo-yi-shuo-fa/' },
										{ label: '16佛法住世', link: '/1xm/2-shi-yuan-man/116-fo-fa-zhu-shi/' },
										{ label: '17皈依三宝', link: '/1xm/2-shi-yuan-man/117-gui-yi-san-bao/' },
										{ label: '18上师摄受', link: '/1xm/2-shi-yuan-man/118-shang-shi-she-shou/' },
									]
								},
								// 暂生缘八无暇
								{
									label: '暂生缘八无暇',
									collapsed: true,
									items: [
										{ label: '19五毒', link: '/1xm/3-zan-sheng-yuan/119-wu-du/' },
										{ label: '20愚痴', link: '/1xm/3-zan-sheng-yuan/120-yu-chi/' },
										{ label: '21魔所持', link: '/1xm/3-zan-sheng-yuan/121-mo-suo-chi/' },
										{ label: '22懈怠', link: '/1xm/3-zan-sheng-yuan/122-xie-dai/' },
										{ label: '23恶业涌现', link: '/1xm/3-zan-sheng-yuan/123-e-ye-yong-xian/' },
										{ label: '24为他所转', link: '/1xm/3-zan-sheng-yuan/124-sui-ta-suo-zhuan/' },
										{ label: '25求乐救怖', link: '/1xm/3-zan-sheng-yuan/125-qiu-le-jiu-bu/' },
										{ label: '26伪装修法', link: '/1xm/3-zan-sheng-yuan/126-wei-zhuang-xiu-fa/' },
									]
								},
								// 断缘心八无暇
								{
									label: '断缘心八无暇',
									collapsed: true,
									items: [
										{ label: '27紧缚现行', link: '/1xm/4-duan-yuan-xin/127-jin-fu-xian-xing/' },
										{ label: '28人格下劣', link: '/1xm/4-duan-yuan-xin/128-ren-ge-xia-lie/' },
										{ label: '29不厌轮回', link: '/1xm/4-duan-yuan-xin/129-bu-yan-lun-hui/' },
										{ label: '30无有正信', link: '/1xm/4-duan-yuan-xin/130-wu-you-zheng-xin/' },
										{ label: '31行持恶业', link: '/1xm/4-duan-yuan-xin/131-xing-chi-e-ye/' },
										{ label: '32心离法', link: '/1xm/4-duan-yuan-xin/132-xin-li-fa/' },
										{ label: '33失坏律仪', link: '/1xm/4-duan-yuan-xin/133-shi-huai-lv-yi/' },
										{ label: '34破三昧耶', link: '/1xm/4-duan-yuan-xin/134-po-san-mei-ye/' },
									]
								},
								// 暇满之相
								{
									label: '暇满之相',
									collapsed: true,
									items: [
										{ label: '35暇满之因缘', link: '/1xm/5-xia-man-zhi-xiang/135-yin-yuan/' },
										{ label: '36暇满之比喻', link: '/1xm/5-xia-man-zhi-xiang/136-bi-yu/' },
										{ label: '37暇满之数量', link: '/1xm/5-xia-man-zhi-xiang/137-shu-liang/' },
									]
								},
							]
						},

						// ========== 2. 无常 ==========
						{
							label: '无常',
							collapsed: true,
							items: [
								{ label: '1器世间无常', link: '/2wc/01/' },
								{ label: '2有情众生无常', link: '/2wc/02/' },
								{ label: '3圣者无常', link: '/2wc/03/' },
								{ label: '4世间尊主无常', link: '/2wc/04/' },
								{ label: '5思维各种喻义无常', link: '/2wc/05/' },
								{ label: '6死缘不定', link: '/2wc/06/' },
								{ label: '7思维猛厉希求而修无常', link: '/2wc/07/' },
							]
						},

						// ========== 3. 轮回痛苦 ==========
						{
							label: '轮回痛苦',
							collapsed: true,
							items: [
								{ label: '01总体思维', link: '/3lh/01/' },
								{ label: '02三根本苦', link: '/3lh/02/' },
								// 人苦
								{
									label: '人苦',
									collapsed: true,
									items: [
										{ label: '03生苦', link: '/3lh/03-10/03/' },
										{ label: '04老苦', link: '/3lh/03-10/04/' },
										{ label: '05病苦', link: '/3lh/03-10/05/' },
										{ label: '06死苦', link: '/3lh/03-10/06/' },
										{ label: '07怨憎会苦', link: '/3lh/03-10/07/' },
										{ label: '08爱别离苦', link: '/3lh/03-10/08/' },
										{ label: '09求不得苦', link: '/3lh/03-10/09/' },
										{ label: '10五蕴炽盛苦', link: '/3lh/03-10/10/' },
									]
								},
								{ label: '11旁生苦', link: '/3lh/11/' },
								// 饿鬼与地狱
								{
									label: '饿鬼与地狱',
									collapsed: true,
									items: [
										{ label: '12饿鬼苦', link: '/3lh/12-13/12/' },
										{ label: '13地狱苦', link: '/3lh/12-13/13/' },
									]
								},
								// 天人与阿修罗
								{
									label: '天人与阿修罗',
									collapsed: true,
									items: [
										{ label: '14天人苦', link: '/3lh/14-17/14/' },
										{ label: '15非天苦', link: '/3lh/14-17/15/' },
										{ label: '16总结轮回痛苦', link: '/3lh/14-17/16/' },
										{ label: '17思维比喻', link: '/3lh/14-17/17/' },
									]
								},
								{ label: '18总说六道痛苦', link: '/3lh/18/' },
								{ label: '19变苦', link: '/3lh/19/' },
								{ label: '20思维六道人数', link: '/3lh/20/' },
							]
						},

						// ========== 4. 因果不虚 ==========
						{
							label: '因果不虚',
							collapsed: true,
							items: [
								{ label: '00总说', link: '/4yg/00/' },
								{ label: '01所断之不善业', link: '/4yg/01/' },
								{ label: '02所行之善业', link: '/4yg/02/' },
								{ label: '03思维特点', link: '/4yg/03/' },
								{ label: '04四谛', link: '/4yg/04/' },
								{ label: '05十二缘起', link: '/4yg/05/' },
								{ label: '06三世因果', link: '/4yg/06/' },
								{ label: '07三乘', link: '/4yg/07/' },
								{ label: '08故事', link: '/4yg/08/' },
								{ label: '09业因果总说', link: '/4yg/09/' },
								{ label: '10公案', link: '/4yg/10/' },
								{ label: '11思维方式', link: '/4yg/11/' },
								{ label: '12因果正见', link: '/4yg/12/' },
								{ label: '13断十不善', link: '/4yg/13/' },
								{ label: '14杀生', link: '/4yg/14/' },
								{ label: '15不与取', link: '/4yg/15/' },
								{ label: '16邪淫', link: '/4yg/16/' },
								{ label: '17妄语', link: '/4yg/17/' },
								{ label: '18离间语', link: '/4yg/18/' },
								{ label: '19粗语', link: '/4yg/19/' },
								{ label: '20绮语', link: '/4yg/20/' },
								{ label: '21贪心', link: '/4yg/21/' },
								{ label: '22害心', link: '/4yg/22/' },
								{ label: '23邪见', link: '/4yg/23/' },
							]
						},
					],
				},
				{
					label: '参考资料',
					collapsed: true,
					items: [
						{ label: '白莲花论', autogenerate: { directory: 'ref/blhl' } },
						{ label: '大圆满前行引导文', autogenerate: { directory: 'ref/dymqx' } },
						{ label: '大圆满心性休息', autogenerate: { directory: 'ref/dymxxxx' } },
						{ label: '禅修班笔记', autogenerate: { directory: 'ref/hdcxb' } },
						{ label: '慧灯之光', autogenerate: { directory: 'ref/hdzg' } },
						{ label: '俱舍论', autogenerate: { directory: 'ref/jsl' } },
						{ label: '菩提道次第广论', autogenerate: { directory: 'ref/ptdcdgl' } },
						{ label: '前世今生论', autogenerate: { directory: 'ref/qsjsl' } },
						{ label: '前行备忘录', autogenerate: { directory: 'ref/qxbwl' } },
						{ label: '前行广释', autogenerate: { directory: 'ref/qxgs' } },
						{ label: '入菩萨行论', autogenerate: { directory: 'ref/rxl' } },
						{ label: '释量论·成量品广释', autogenerate: { directory: 'ref/sllclp' } },
						{ label: '显密佛网', autogenerate: { directory: 'ref/xmfw' } },
						{ label: '藏传净土法', autogenerate: { directory: 'ref/zcjtf' } },
						{ label: '中观庄严论释', autogenerate: { directory: 'ref/zgzyls' } },
						{ label: '其他', autogenerate: { directory: 'ref/other' } },
					],
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
