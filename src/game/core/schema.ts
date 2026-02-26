export type FlagValue = boolean | number | string

export type Action =
  | { type: 'showText'; text: string }
  | { type: 'addItem'; itemId: string; name?: string; description?: string }
  | { type: 'removeItem'; itemId: string }
  | { type: 'setFlag'; flag: string; value: FlagValue }
  | { type: 'gotoScene'; sceneId: string }
  | { type: 'changeBackground'; background: string }
  | { type: 'end'; text: string }

export interface RectConfig {
  x: number
  y: number
  w: number
  h: number
}

export interface UseRule {
  accepts: string[]
  success: Action[]
  fail: Action[]
}

export interface HotspotConfig {
  id: string
  rect: RectConfig
  label?: string
  /** 'button' 渲染为可见的 UI 按钮，默认为不可见热区 */
  style?: 'button'
  requireFlag?: string
  onClick?: Action[]
  onUse?: UseRule
}

export interface SceneConfig {
  id: string
  title?: string
  background?: string
  /** 该场景的背景音乐文件路径（相对于 public 目录） */
  bgm?: string
  hotspots: HotspotConfig[]
  startActions?: Action[]
  flagsInitial?: Record<string, FlagValue>
}
