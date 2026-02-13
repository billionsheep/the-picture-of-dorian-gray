《The Picture of Dorian Gray》Web 解谜小游戏

需求说明（PRD-lite / v1.0）

1. 项目概述

本项目为期末作业作品：一个可在浏览器运行的短篇解谜游戏，灵感来自绣湖式点击解谜体验，改编自《道林·格雷的画像》的核心主题（美与腐坏的交换、隐藏的画像、最终的自我审判）。
作品目标是在无需读过原著的前提下，通过清晰的开场设定、可理解的关卡目标与反馈，让玩家获得 10–15 分钟的完整叙事体验。

2. 交付物（Definition of Done）
2.1 必须交付

可公开访问的 Web 游戏链接（GitHub Pages）

可通关的完整体验：三段场景链路 Studio → Dressing Room → Attic，含至少 2 个结局

文档说明（README 或 docs 页面）包含：

玩法说明 / 操作方式

设计意图与叙事结构（为什么这样设计）

运行/部署步骤

素材来源与 AI 使用声明

2.2 可视化验收标准

新玩家打开链接后 1 分钟内明白：背景设定、当前目标、如何推进

任意关键失败不会“无反馈卡死”，失败提示包含方向

结局后可重玩（Restart）或返回标题

3. 目标用户与体验目标
3.1 目标用户

课程老师/助教（审阅者）

未读过原著的普通玩家（主要体验对象）

3.2 体验目标

清晰性：开场 30–45 秒完成设定解释；右上角目标持续引导

沉浸感：全局 BGM + 统一 UI 语言风格（短句+留白，但关键节点明确）

完整性：至少 10–15 分钟可玩时长；双结局带来回味与选择感

4. 玩家流程（User Journey）
4.1 流程结构

Title（标题页）

Prologue（序章/背景说明，清晰解释设定）

Gameplay（三场景）

Studio（发现秘密）

Dressing Room（代价与线索回收）

Attic（选择与终局）

Ending（结局页：knife / leave）

Replay / Back to Title（可重玩）

5. 核心玩法与系统约束
5.1 核心玩法

点击热区触发文本、获得物品、设置状态、解锁下一步

背包：物品获得/选择/使用（对热区触发 onUse 成功/失败分支）

状态（flags）驱动：控制热点可见、内容变化、关卡推进、结局分支

5.2 设计约束（范围控制）

不引入复杂存档、多语言、角色对话树等高风险系统

重点在“叙事包装 + 引导 + 可交付完整体验”

6. 功能需求（MoSCoW）
6.1 Must（必须）

M1. Title 标题页

Start / Settings（进入设置页）

M2. Prologue 序章（清晰解释设定）

4–6 段短文本，点击继续

目标：让非读者理解世界观与动机（画像替你腐坏、第三夜、12:30、有人隐藏）

M3. Objective 目标提示（右上角）

每场景至少 1 条“当前目标”

随关键 flag 变化（例如拿到 ticket 后目标更新为“离开工作室去剧院后台”）

M4. Ending 结局页 + Replay

knifeEnding / leaveEnding

提供 Restart / Back to Title

M5. 关键失败反馈全覆盖

每个关键门槛：未满足条件、选错物品等均必须 showText

失败文本必须包含“方向提示”（不只是“打不开”）

6.2 Should（应该）

S1. 全局 BGM（循环）

默认开启

受浏览器限制：首次用户交互后才播放

Settings 可开/关

S2. Settings 菜单（右上角按钮）
菜单包含 4 项：

Story / Background（随时查看背景说明）

Music On/Off（全局音乐开关）

Restart（清空进度并重开）

Back（返回游戏）

6.3 Could（可选）

C1. 轻量入场动效

仅淡入淡出/文字轻微移动

不做复杂动画 cutscene

C2. 简单 SFX

点击、获得物品、开锁成功/失败、掀布

时间充裕再做

6.4 Won’t（本次不做）

存档系统（Continue）

多语言切换

大量新机制/复杂 UI 动画

7. 内容与叙事设计原则
7.1 文本风格

绣湖感：短句、留白、压迫氛围

关键节点更清晰：涉及目标/条件/推进时必须直白可懂

禁止大量原著长句引用：以“改编表达”为主

7.2 “每个热区都要有意义”

每次交互至少满足以下之一：

推进：给新道具/解锁新热区/改变 requireFlag

提示：失败反馈包含方向

回报：加深理解（动机、恐惧、代价），并可回收前文线索

8. 三场景内容框架（v1.0）
8.1 Scene 1：Studio（发现秘密）

明确目标：找到他为何隐藏画像

主线回路：
Letter → code_1230 → Drawer(code) 得到 hook+ticket → Curtain(hook) 看到画像回看 → Exit(ticket) 前往 DressingRoom

不在此关结束（避免“太短”）

8.2 Scene 2：Dressing Room（代价与线索回收）

明确目标：确认“代价”，拿到通往阁楼的钥匙

主线回路：
Playbill/剪报（线索回收） → Lockbox(code) 得 attic_key → CostumeTrunk(hook) 得 yellow_page → Exit(attic_key) → Attic

8.3 Scene 3：Attic（选择与终局）

明确目标：面对画像做选择

主线回路：
Trunk(attic_key) 得 knife → Portrait → 分支：Use knife → knifeEnding / Leave door → leaveEnding

9. UI 规范（最小可用）
9.1 常驻 UI

背包（底部）

右上角按钮：Settings

右上角一行 Objective（可在 Settings 下方或左上角显示，保持一致）

9.2 弹窗规则

showText 弹窗为阻塞式（你当前已实现）

关闭方式：点击遮罩关闭

结局弹窗：锁输入，并提供“按钮区域”（Restart/Back）

10. 验收测试清单（人工）

打开 Pages 链接可加载，无 404

Start → Prologue 正常可点击推进

Studio 可按主线通关至 DressingRoom

DressingRoom 可按主线通关至 Attic

Attic 可触发两个结局

Settings：背景说明可查看，音乐开关有效，Restart 有效

任一关键失败点都有提示且可继续推进

11. 实施顺序（建议）

Title + Prologue（先解决“进入感/清晰设定”）

Objective（解决“苍蝇乱点”）

Settings（音乐开关/背景说明/重玩）

文本打磨（关键失败提示、线索回收点）

可选：轻量动效与 SFX