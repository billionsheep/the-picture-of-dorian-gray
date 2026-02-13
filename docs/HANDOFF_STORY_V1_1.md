HANDOFF_STORY_V1_1.md

Project: The Picture of Dorian Gray (Rusty-Lake-like Web Puzzle)
Version: V1.1 (Story & Text Upgrade)
Goal: 在不新增机制的前提下，让剧情“有选择、有代价、有崩坏”，让没读过原著的人也能被推动、被刺痛。

0. 本次修改的核心结论（你提出的问题 -> 直接落到可交付改动）
0.1 分支结局“质变”（必须做）

目前刀结局与隐藏分支反馈差异太小，会让玩家觉得“白忙活”。
**V1.1 方案：**把 “是否烧掉 yellow_page（泛黄页）” 设为道德选择：

不烧 = 忏悔/直面（Ending_Confession）：带着证据上楼，死亡是“认罪式的惩罚”。

烧掉 = 掩盖/共犯（Ending_Hypocrisy）：你亲手销毁罪证，但画像并不放过你，死亡更嘲讽、更恐怖。

这是一个“玩家参与犯罪/参与忏悔”的差别，而不是一句话的差别。

0.2 “方向提示”不再出戏（必须做）

所有“先去读信/先选背包”等系统指令，改写为道林的强迫性内心独白：

仍然包含“可执行锚点”（时间/物品/地点），但语气是心理驱动而不是系统教学。

Objective UI 仍可保留（你已实现），但文本不再在剧情句里用“方向：xxx”。

0.3 增加“恐怖谷/崩坏感”（必须做一点）

第三幕（Attic）文本要破碎、错乱、带“自我监视”。
V1.1 只用 flags + 多版本 showText 实现：

画像/阁楼文本出现“断句、重复、轻微乱码、指向玩家鼠标”的感觉。

不需要新引擎能力，不需要计时器，靠“首次/重复/分支状态”的文案变化即可。

1. 约束（严格遵守：不加机制、不改玩法系统）

允许使用的 action 只有：

showText / addItem / removeItem / setFlag / requireFlag / onUse / success / fail / end / gotoScene

**不做：**存档、多语言、新 UI 系统、新依赖。

2. 新增/调整的 flags 与 items（最小集合）
2.1 新增 flags（必须）

page_burned: boolean（默认 false）—— 是否烧掉 yellow_page

page_unburned: boolean（默认 true）—— 与 page_burned 互斥，用来做 requireFlag 分支（避免“条件判断”需求）

ashtray_burned: boolean（默认 false）—— 烟灰缸状态（让热区文本能变化）

说明：之所以用 page_unburned，是因为 requireFlag 目前只支持“某 flag 为 true”，不支持“非”。用互斥 flag 实现分支。

2.2 items（现有即可，不强制新增）

现有：code_1230, hook, theatre_ticket, attic_key, yellow_page, knife

不新增新道具也能实现质变分支（只靠 yellow_page + ashtray）。

3. 场景改动总览（只动 DressingRoom + Attic，Studio 只改文案）
3.1 Studio（只改文案：提示内化 + 情绪推进）

不改主线逻辑：
Letter → code_1230 → Drawer(code) → hook + theatre_ticket → Curtain(hook) → Exit(ticket)

要改的是这些文本的“第二句提示”，全部改成“道林自我驱动”，不出现“方向：xxx”。
（见第 5 节 textAssets）

3.2 DressingRoom（新增 Ashtray 热区：烧纸分支）

你已有主线：
Playbill → Lockbox(code) → attic_key → CostumeTrunk(hook) → yellow_page → Exit(attic_key)

V1.1 新增：

ashtray（烟灰缸）热区：

click：氛围 + 暗示“火能让证据消失”

onUse accepts yellow_page：

success：烧掉纸，设置 page_burned=true, page_unburned=false, ashtray_burned=true, 并 removeItem(yellow_page)

fail：内化提示（“那页纸在戏服箱的缝里…”）

关键：烧纸不是门槛，是“选择”。玩家可不烧直接上楼。

3.3 Attic（终局分支质变：knifeEnding 分裂成两套）

Attic 仍保持：
Trunk(attic_key) → knife → Portrait(knife) or Exit(leave)

V1.1 修改：
把 “Portrait 使用 knife” 拆成两个可触发热点（或两个 onUse 分支热点），用 requireFlag 绑定：

portraitKnife_unburned requireFlag page_unburned → end(TEXT_ASSETS.attic.endingConfession)

portraitKnife_burned requireFlag page_burned → end(TEXT_ASSETS.attic.endingHypocrisy)

并且把“画像压迫/提示”文本也做分支版本：

不烧：口袋里那页纸像在发热（证据/忏悔）

烧了：灰烬味道跟着你（共犯/掩盖）

4. 需要 opencode 落盘修改的文件清单（按顺序）

src/content/textAssets.ts

改：studio/dressingRoom/attic 的若干现有 key 文案（去掉系统口吻、增强情绪递进）

新增：dressingRoom.ashtray*、attic.endingConfession / endingHypocrisy、attic.portraitPressureBurned/Unburned 等

src/content/scenes/dressingRoom.ts

flagsInitial 增加 page_burned/page_unburned/ashtray_burned

hotspots 增加 ashtray

在 ashtray.onUse.success 里 setFlag + removeItem

src/content/scenes/attic.ts

flagsInitial（如该场景也有本地 flagsInitial）确保不覆盖 page_burned/page_unburned（通常这些是全局 flags，视你实现；如果每场景独立，就需要把它们也放进 attic 的 flagsInitial 并在 gotoScene 时继承；以你当前实现为准）

portrait 相关热点：拆分出 burned/unburned 两个 knife ending 分支（requireFlag 绑定）

如果你当前 flags 是“全局共享并随 SceneLoader 保留”，那只要在 DressingRoom 初始化一次即可。若是“每 scene 自己的 flagsInitial 覆盖”，那就要确保这三个 flag 被保留/传递（让 opencode 以当前 PlayScene 的实际实现为准）。

5. V1.1 最终文案（可直接抄进 TEXT_ASSETS）

原则：短句、留白、压迫；每条至少一个“可执行锚点”（物品/地点/数字），但不出现“方向：”。

5.1 Studio（替换/新增）

studio.drawerUseFail（替换旧的“去看信”系统提示）

锁孔冷得像一颗牙。

我不是缺钥匙。

我缺的是那个时间。那封信里写过。

studio.curtainUseHookFail（替换旧的“先选中挂钩”系统提示）

布料纹丝不动。

我的手太干净了。

让抽屉里那枚金属去做脏活。

studio.drawerOpenedUseOtherFail（替换旧的“去找幕布”直白指令）

空抽屉不会再吐出答案。

房间里还有一块东西在“遮”。

它比锁更怕我看见。

（其他 studio 文案保留你的氛围版本即可，不强制都改。）

5.2 DressingRoom（新增 Ashtray + 强化“代价线索回收”）

新增：dressingRoom.ashtrayHint（点击烟灰缸）

烟灰缸里有新灰。

不是香烟的。像纸。

有人在这里等我把某一页变成空白。

新增：dressingRoom.ashtrayUsePageFail（对烟灰缸用错物）

火在等“纸”。

那页泛黄的东西——

它卡在戏服箱的缝里，像在求救。

新增：dressingRoom.ashtrayUsePageSuccess（用 yellow_page 成功烧纸，触发“共犯”体验）

火苗舔过字迹。

茜比尔的名字先黑掉，像被抹去。

烟很呛，但这很好。

只要没人读过这页纸——她就没有死。

我也就没有罪。

新增：dressingRoom.ashtrayAfterBurned（烧完后的点击）

灰烬趴在缸底。

像一张闭上的嘴。

你以为它不会再说话。

（可选替换：lockboxUseCodeFail，把“回想 12:30”改成更内化：）
dressingRoom.lockboxUseCodeFail（替换建议）

锁芯转了半圈又退回。

不是这串记忆。

12:30。那一刻把我钉死过一次。

5.3 Attic（分支质变：两套完全不同的刀结局）

新增（或替换 knife ending 的 end 文案来源）：
attic.endingConfession（不烧纸 = 忏悔之死）

（闪白。像镜子碎裂。）

刀刃没入画布。

我听见一声叹息——是我的，还是它的？

痛终于来了。干净、准确。

像迟到多年的判决。

他们破门而入。

墙上的画像完美无瑕，仍年轻，仍在笑。

地上躺着一个枯槁的老人，胸口插着刀。

他的手指干瘪，却紧紧箍着一枚戒指。

直到那枚戒指，他们才认出那是谁。

attic.endingHypocrisy（烧纸 = 虚伪之死 / 更恐怖）

（没有闪白。只有黑。像墨水倒进眼睛。）

证据都烧了。

没什么能审判我。

我只要毁掉这幅画——

我就能永远……

永远……永远……

为什么要笑？

别笑。别用我的脸笑。

（字开始断开。）

我没有罪我没有罪我没有——

后来人们发现了一具尸体。

哪怕死了，那张老脸上仍写着贪婪和惊恐。

他至死都以为自己骗过了世界。

但墙上的画像知道：

从未有人真正逃脱。

新增（建议让阁楼“更疯一点”）：
attic.portraitPressureUnburned（不烧纸时，点击画像的压迫）

画像回看我。

口袋里那页纸在发热。

像提醒：我还没把自己说完。

attic.portraitPressureBurned（烧纸时）

画像回看我。

我闻到灰。

灰跟着我上楼。

像一双手，擦不干净。

可选增强（“恐怖谷”小刺）：
attic.portraitKnifePrompt（替换/增强）

刀尖停在画布前。

再近一点，就没有回头路。

你会听见——

你自己在求饶。

6. 场景接线规范（给 opencode 的明确指令）
6.1 DressingRoom：新增 ashtray 热区（必须）

id: ashtray

onClick: showText(TEXT_ASSETS.dressingRoom.ashtrayHint)

onUse:

accepts: ['yellow_page']

success actions（顺序建议）：

showText ashtrayUsePageSuccess

setFlag page_burned=true

setFlag page_unburned=false

setFlag ashtray_burned=true

removeItem yellow_page

fail: showText ashtrayUsePageFail

同一个热区可做“烧后状态文本”：

增加 requireFlag 分裂：

ashtray_unburned requireFlag !ashtray_burned（用互斥 flag 或 active flag 方案实现）

ashtray_burned requireFlag ashtray_burned → showText ashtrayAfterBurned

如果你目前没有“非 flag”的能力，就用你在 studio 用过的 active flag 方案（ashtray_first_active / ashtray_after_active）实现状态切换。

6.2 Attic：刀结局分裂（必须）

把“Portrait + use knife”做成两个热点（或两个 portrait 变体）：

portrait_unburned requireFlag page_unburned

onClick: showText portraitPressureUnburned / portraitKnifePrompt（按你现有结构）

onUse accepts knife success → end(endingConfession)

portrait_burned requireFlag page_burned

onClick: showText portraitPressureBurned / portraitKnifePrompt

onUse accepts knife success → end(endingHypocrisy)

Leave ending 可以不分裂（也可轻微分裂，但不是必须）。