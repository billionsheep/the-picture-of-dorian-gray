# 场景配置协议（Scene Schema）

> 目的：让内容（关卡/文本/道具/触发）完全由配置驱动，代码只负责“解释并执行”。

## 1) Scene 基本结构（建议 TypeScript 对象或 JSON）
- id: string
- title?: string
- background?: string（占位路径，可不存在）
- hotspots: Hotspot[]
- startActions?: Action[]（进入场景时触发）
- flagsInitial?: Record<string, boolean|number|string>

## 2) Hotspot
- id: string
- rect: {x,y,w,h}
- label?: string（调试显示用）
- requireFlag?: string（需要某 flag 为 true 才可用/可见）
- onClick?: Action[]（未选中物品时点击）
- onUse?: UseRule（选中物品时点击）

## 3) UseRule
- accepts: string[]（允许的 itemId 列表）
- success: Action[]
- fail: Action[]

## 4) Item（建议单独字典定义，也可直接在 Action 里定义）
- itemId: string
- name: string
- description?: string
- icon?: string（占位路径）

## 5) Action 类型（MVP 必须支持）
- showText: { type:"showText", text:string }
- addItem: { type:"addItem", itemId:string, name?:string, description?:string }
- removeItem: { type:"removeItem", itemId:string }
- setFlag: { type:"setFlag", flag:string, value:boolean|number|string }
- gotoScene: { type:"gotoScene", sceneId:string }
- end: { type:"end", text:string }

## 6) 执行规则
- ActionRunner 顺序执行 Action[]
- showText 默认阻塞：关闭对话框后继续下一 Action（保证叙事节奏）
- end：显示结尾文字并锁定输入（或回到标题）

## 7) 兼容性与扩展（后续再做）
可扩展 Action：
- playSound
- changeBackground
- spawnSprite
- combineItems
- timedEvent

> 只要 schema 固定，内容团队（你自己/AI）就能不断堆关卡而不改核心代码。
