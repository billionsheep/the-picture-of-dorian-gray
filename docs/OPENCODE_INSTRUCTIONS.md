# OpenCode 工作指令（请严格遵守）

> 目标：在 **Web（Vite + TypeScript + Phaser 3）** 上实现一款「绣湖风格」点击解谜游戏原型，主题围绕《道林·格雷的画像》。  
> 当前阶段：**先搭框架与MVP闭环**，美术全部用占位（纯色/矩形/文字），后期再替换素材。  
> 你（OpenCode）需要把本仓库变成：可运行、可部署、可交付的项目，并持续保持代码可维护。

---

## 0. 交付物（最终要交给老师/评分的东西）
1) **可玩的网页游戏**（可本地运行；并可部署到 GitHub Pages）
2) **项目文档**（5–10页 essay 或网站/其他数字形式皆可）
   - 本项目建议用 **/docs 目录 + 网站形式**：包含设计思路、改编依据、制作过程、反思、参考文献。

---

## 1. 开发原则（必须遵守）
- **数据驱动**：关卡、热区、文本、道具、动作流都放在 `/src/content/**` 配置里；代码不硬编码剧情。
- **小步提交**：每完成一个模块就能运行（`npm run dev`），再进入下一模块。
- **稳定优先**：宁可功能少，也必须可运行、可演示。
- **不依赖外部服务**：不需要后端；不依赖在线资源；无需联网即可跑。
- **占位素材策略**：未提供图片时，用 Phaser 绘制矩形与文本替代；UI 也用基础图形组件。

---

## 2. 技术栈（固定，不要改）
- Vite + TypeScript（vanilla-ts）
- Phaser 3
- 部署：GitHub Pages（静态站）

---

## 3. 里程碑（按顺序完成，禁止跳步）
### M0：跑通空项目
- Vite+TS 初始化完成
- Phaser Canvas 正常显示
- ✅验收：`npm i && npm run dev` 后浏览器能看到画面

### M1：SceneLoader（加载关卡配置）
- 能加载一个 scene 配置（背景占位、热区矩形）
- 点击热区能触发事件（先 log）
- ✅验收：点击不同热区，控制台打印 hotspot id

### M2：Dialogue（文本弹窗）
- 实现对话框：显示文本、点击关闭
- ✅验收：点击“信件”热区弹窗显示内容，关闭后可再次触发

### M3：Inventory（背包）
- 底部物品栏：add/remove/select
- 选中态高亮
- ✅验收：点击信件后获得“密码：12:30”，背包显示，点击可选中

### M4：Use Item（道具对热区使用）
- 选中物品后点击热区 → 走 onUse 分支
- 支持 success / fail 反馈
- ✅验收：对抽屉使用密码成功打开并获得新物品；不选/选错提示失败

### M5：MVP 闭环
- “画室（studio）”一关完成闭环：信件 → 密码 → 抽屉 → 掀开画像 → 结束提示
- ✅验收：玩家能从开始走到结尾字幕

### M6：部署
- GitHub Actions 或手动方式部署到 GitHub Pages
- ✅验收：公开 URL 能访问并可玩

---

## 4. 代码结构约束（建议遵循）
- `/src/game/core`：通用系统（SceneLoader、ActionRunner、Inventory、Flags、UI）
- `/src/game/scenes`：Phaser 场景（BootScene/PlayScene）
- `/src/content`：所有游戏内容（场景配置、文本、物品定义、谜题）

---

## 5. 质量与测试（最低要求）
- 任何 PR/提交前必须确保：
  - `npm run dev` 正常
  - 不出现未捕获异常
  - 控制台无持续报错
- 为核心模块写最少的“自检”：
  - 在 README 写出手动测试步骤（见 /docs/TEST_PLAN.md）

---

## 6. 你要优先读取的文件
- /docs/REQUIREMENTS.md（课程要求与交付）
- /docs/GAME_DESIGN.md（玩法与系统设计）
- /docs/SCENE_SCHEMA.md（关卡配置协议）
- /content/MVP_STUDIO.md（第一关内容与动作流）
- /content/TEXT_ASSETS.md（可直接用于对话框的文本）

> 先理解，再编码；编码严格按里程碑推进。
