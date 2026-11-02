# 龙武瑞 · 个人简历站

参考 yunmiaotec.com 的版式语言（纸感底色 + 深绿主色 + 编号章节 + 深色能力带 + 薄荷色联系块）重做的单页简历站，内容来自 `简历/Java后端开发.docx`。

## 本地预览

双击 `index.html` 即可（纯静态、零依赖、不联网也能跑）。若想用本地服务器：

```bash
cd resume-site
python -m http.server 5173
# 打开 http://127.0.0.1:5173
```

## 结构

```
resume-site/
├─ index.html            页面内容（所有文案都在这里）
├─ styles.css            设计变量与版式（--green / --ink / --line 等）
├─ script.js             移动菜单、项目切换、滚动进场
└─ assets/resume.pdf     由 Word 导出的 PDF，供「下载简历 PDF」按钮使用
```

## 改内容

- **改文字**：只在 `index.html` 里改；章节编号写在 `<p class="section-index">01 / 个人概述</p>`。
- **改配色**：`styles.css` 顶部 `:root` 的变量，改 `--green` 即可换整站主色。
- **加项目**：复制一个 `<div class="project-panel" id="panel-xxx">`，再在 `.project-tabs` 里加一个对应按钮（`aria-controls` 指向新 panel 的 id）。
- **换 PDF**：用同名文件覆盖 `assets/resume.pdf` 即可，按钮的下载文件名在 `<a download="...">` 上。

## 部署

纯静态，直接拖到 GitHub Pages / Vercel / Cloudflare Pages 即可；也可整站打包上传任意静态托管。
