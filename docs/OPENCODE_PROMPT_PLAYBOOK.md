# OpenCode 提示词脚本（按里程碑逐条执行）

> 用法：你把这一页复制到 OpenCode 里，逐条执行。每条只做一件事，做完运行并自检。

## 0) 初始化项目（M0）
- “请在当前仓库初始化 Vite vanilla-ts 项目，并安装 phaser。创建最小可运行的 Phaser 画面（黑底即可）。不要实现玩法。完成后给出运行命令，并确保 npm run dev 可用。”

## 1) SceneLoader（M1）
- “实现一个 SceneLoader，能读取 /src/content/scenes/studio（你先创建一个最小配置），在 PlayScene 中渲染背景占位，并按 rect 画出 3 个 hotspots（letter/drawer/portrait）。点击时 console.log hotspot id。运行通过。”

## 2) Dialogue（M2）
- “实现 UI_Dialogue：显示文本弹窗、点击关闭。把 letter 的 onClick 改为 showText，内容从 /content/TEXT_ASSETS.md 引用（可先硬编码 key→text 映射，后续再配置化）。运行通过。”

## 3) Inventory（M3）
- “实现 Inventory：addItem/removeItem/selectItem。底部显示物品名列表。让 letter 的 onClick 在 showText 后 addItem(code_1230)。运行通过并可选中物品。”

## 4) Use Item（M4）
- “实现 onUse 规则：选中物品后点击 drawer 会检查 accepts；成功则 setFlag(drawer_open=true) 并 addItem(hook)，失败则 showText。运行通过。”

## 5) MVP 闭环（M5）
- “让 portrait requireFlag=drawer_open；点击 portrait 触发 showText 后 end。end 显示结尾字幕并锁定输入（或提供返回按钮）。运行通过。”

## 6) 部署（M6）
- “添加 GitHub Pages 部署方案（推荐 GitHub Actions）。确保 build 后静态文件可部署。给出部署步骤说明写进 README。”

> 每一步完成都必须跑 `npm run dev`，并按 /docs/TEST_PLAN.md 自检。
