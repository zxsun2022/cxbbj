# 禅修班笔记文档站

基于 Astro + Starlight 搭建的静态文档站点，用于整理慧灯禅修班的课程笔记和参考资料。

## 快速开始

- `npm install`
- `npm run dev` 启动开发服务器（默认端口 4321）。
- `npm run build` 构建静态产物到 `dist/`。
- `npm run preview` 在本地预览构建结果。

## 目录结构

- `src/content/docs/`：全部课程与参考资料的 Markdown/MDX 文档，按原栏目层级组织。
- `src/components/MarkdownImage.astro`：Markdown 图片的统一渲染组件，接入 `astro:assets` 生成多规格图片。
- `public/`：对外暴露的静态资源（PDF、HTML 思维导图等）。
- `astro.config.mjs`：Starlight 站点配置、Cloudflare 图像白名单与自定义 Markdown 插件。

## Markdown 图片优化

仓库内的 Markdown 图片语法自动替换为 `<MarkdownImage />` 组件，调用 `astro:assets` 在构建期生成多规格图片（AVIF/WebP/PNG，多段宽度）并开启懒加载。现已允许以下远程域名：

- `raw.githubusercontent.com`
- `gblobscdn.gitbook.com`
- `mingguang.im`

如果需要额外域名，请在 `astro.config.mjs` 的 `REMOTE_IMAGE_PATTERNS` 中追加。

## 部署到 Cloudflare Pages

1. 在 Cloudflare Pages 创建项目并连接当前仓库。
2. 构建命令：`npm install && npm run build`
3. 产物目录：`dist`
4. 可选环境变量：
   - `NODE_VERSION=20`（或与本地一致的版本）
   - 若使用私人 npm registry，可在此处配置认证信息。
5. 保存后触发首次构建，成功后即可访问。

**手动上传**：

```
npm run build
npx wrangler pages deploy dist --project-name <your-project>
```

## 其他说明

- Starlight 已默认为标题生成 `id` 和锚点链接，便于外部引用。
- 搜索功能由 Pagefind 自动生成，无需额外配置。
- 项目中保留大量中文内容，编辑前请确认文件编码为 UTF-8。
- Cloudflare Pages 上线后，在 astro.config.mjs 的 site 字段写入最终域名，可消除 sitemap 警告并生成正确的绝对链接。
