# 格雷画像：绣湖风格点击解谜（Projektseminar）

## 这是什么
一个可在浏览器运行的短篇点击解谜游戏原型，灵感来自 Rusty Lake，主题改编自《道林·格雷的画像》。

## 当前状态
- 目标：完成 MVP（第一关画室闭环）+ 文档站点
- 素材：全部占位（纯色/矩形/文字）

## 运行
```bash
npm i
npm run dev
```

## 部署（GitHub Pages + Actions）

### 1) 已配置内容
- 工作流：`.github/workflows/deploy.yml`
  - 触发条件：`main` 分支 push（以及手动 `workflow_dispatch`）
  - 流程：`npm ci` -> `npm run build` -> 上传 `dist` -> 部署到 Pages
- Vite base：`vite.config.ts`
  - 构建时使用 `base: '/the-picture-of-dorian-gray/'`
  - 本地开发保持 `base: '/'`，不影响 `npm run dev`

### 2) 首次启用 Pages（GitHub 网页操作）
1. 打开仓库页面：`Settings` -> `Pages`
2. 在 **Build and deployment** 中选择：
   - **Source**: `GitHub Actions`
3. 返回仓库 `Actions` 页，确认 `Deploy to GitHub Pages` 工作流成功

### 3) 访问地址
- 站点 URL：`https://billionsheep.github.io/the-picture-of-dorian-gray/`

### 4) 常见 404 排查
- **资源 404（js/css 路径错）**：确认 `vite.config.ts` 的 `base` 与仓库名一致（必须是 `/the-picture-of-dorian-gray/`）。
- **首页 404**：确认 `Settings` -> `Pages` 的 Source 是 `GitHub Actions`，且最新 workflow 为绿色成功。
- **更新未生效**：检查是否 push 到 `main` 分支；必要时在 `Actions` 页手动重跑部署任务。
- **仓库改名后异常**：同步修改 `vite.config.ts` 的 `repoBase`，再重新部署。

## 手动测试
见：/docs/TEST_PLAN.md

## 项目说明（写给课程）
见：/docs/REQUIREMENTS.md 和 /docs/GAME_DESIGN.md
