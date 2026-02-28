import Phaser from 'phaser'
import { SceneLoader } from '../core/SceneLoader'
import type { Action, FlagValue, HotspotConfig, SceneConfig } from '../core/schema'
import { TEXT_ASSETS } from '../../content/textAssets'
import { titleScene } from '../../content/scenes/title'
import { prologueScene } from '../../content/scenes/prologue'
import { studioScene } from '../../content/scenes/studio'
import { dressingRoomScene } from '../../content/scenes/dressingRoom'
import { atticScene } from '../../content/scenes/attic'

const GAME_WIDTH = 960
const GAME_HEIGHT = 540
const TOP_HUD_HEIGHT = 90
const BOTTOM_HUD_HEIGHT = 120

interface InventoryItem {
  itemId: string
  name: string
  description?: string
  icon?: string
}

interface HotspotVisual {
  hotspot: HotspotConfig
  area: Phaser.GameObjects.Rectangle
  labelText?: Phaser.GameObjects.Text
}

interface TextLayoutResult {
  pages: string[]
  fontSize: number
}

export class PlayScene extends Phaser.Scene {
  private sceneLoader = new SceneLoader()
  private currentSceneId = 'title'
  private worldContainer?: Phaser.GameObjects.Container
  private hudContainer?: Phaser.GameObjects.Container
  private hotspotVisuals: HotspotVisual[] = []
  private activeDialog?: Phaser.GameObjects.Container
  private isDialogueOpen = false
  private isEnding = false
  private isSettingsOpen = false
  private objectiveLabelText?: Phaser.GameObjects.Text
  private objectiveText?: Phaser.GameObjects.Text
  private settingsButton?: Phaser.GameObjects.Container
  private settingsModalContainer?: Phaser.GameObjects.Container
  private musicEnabled = true
  private currentBgm?: Phaser.Sound.BaseSound
  private currentBgmKey = ''
  private flags: Record<string, FlagValue> = {}
  private inventory: InventoryItem[] = []
  private selectedItemId?: string
  private inventoryUi: Phaser.GameObjects.GameObject[] = []
  // 开发者调试模式：按 D 键切换，显示鼠标在游戏世界坐标中的实时位置
  private debugMode = false

  // 所有场景注册表（用于 preload 扫描背景图）
  private readonly allScenes: SceneConfig[] = [
    titleScene,
    prologueScene,
    studioScene,
    dressingRoomScene,
    atticScene,
  ]

  constructor() {
    super('PlayScene')
  }

  preload(): void {
    // 预加载所有场景背景图
    this.allScenes.forEach((scene) => {
      if (scene.background) {
        if (!this.textures.exists(scene.id)) {
          this.load.image(scene.id, scene.background)
        }
      }
    })

    // 预加载所有场景 BGM（去重：相同路径只加载一次）
    const loadedAudio = new Set<string>()
    this.allScenes.forEach((scene) => {
      if (scene.bgm && !loadedAudio.has(scene.bgm)) {
        this.load.audio(scene.bgm, scene.bgm)
        loadedAudio.add(scene.bgm)
      }
    })

    // 预加载所有道具图标
    const loadedIcons = new Set<string>()
    const scanActions = (actions?: Action[]) => {
      actions?.forEach((a) => {
        if (a.type === 'addItem' && a.icon && !loadedIcons.has(a.icon)) {
          this.load.image(a.icon, a.icon)
          loadedIcons.add(a.icon)
        }
      })
    }
    this.allScenes.forEach((scene) => {
      scene.hotspots.forEach((h) => {
        scanActions(h.onClick)
        scanActions(h.onUse?.success)
        scanActions(h.onUse?.fail)
      })
      scanActions(scene.startActions)
    })
  }

  create(): void {
    this.scale.on('resize', this.handleResize, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this)
    })

    // 开发者调试坐标叠加层（纯 HTML DOM，不受 Phaser 场景生命周期影响）
    let debugDiv = document.getElementById('debug-overlay') as HTMLDivElement | null
    if (!debugDiv) {
      debugDiv = document.createElement('div')
      debugDiv.id = 'debug-overlay'
      debugDiv.style.cssText =
        'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;' +
        'color:#00ff00;font:bold 16px monospace;background:rgba(0,0,0,0.8);' +
        'padding:6px 12px;border-radius:4px;display:none;'
      document.body.appendChild(debugDiv)

      // 按 D 键切换调试模式
      window.addEventListener('keydown', (e) => {
        if (e.key === 'd' || e.key === 'D') {
          this.debugMode = !this.debugMode
          debugDiv!.style.display = this.debugMode ? 'block' : 'none'
        }
      })

      // 鼠标移动时更新调试坐标（转换为 960×540 游戏世界坐标）
      const canvas = this.game.canvas
      canvas.addEventListener('mousemove', (e) => {
        if (!this.debugMode || !this.worldContainer) return
        const rect = canvas.getBoundingClientRect()
        const canvasX = e.clientX - rect.left
        const canvasY = e.clientY - rect.top
        const scaleRatioX = canvas.width / rect.width
        const scaleRatioY = canvas.height / rect.height
        const phaserX = canvasX * scaleRatioX
        const phaserY = canvasY * scaleRatioY
        const worldX = Math.round(
          (phaserX - this.worldContainer.x) / this.worldContainer.scaleX
        )
        const worldY = Math.round(
          (phaserY - this.worldContainer.y) / this.worldContainer.scaleY
        )
        debugDiv!.textContent = `Game XY: (${worldX}, ${worldY})`
        debugDiv!.style.left = `${e.clientX + 20}px`
        debugDiv!.style.top = `${e.clientY - 10}px`
      })
    }

    this.loadScene(this.currentSceneId)
  }

  private getViewportSize(): { width: number; height: number } {
    return {
      width: this.scale.width,
      height: this.scale.height,
    }
  }

  private handleResize(): void {
    this.layoutWorldAndHud()
    this.layoutTopUi()
    this.renderInventory()
    this.rebuildSettingsMenuIfOpen()
  }

  private loadScene(sceneId: string): void {
    const sceneConfig = this.sceneLoader.load(sceneId)
    this.currentSceneId = sceneId

    this.isDialogueOpen = false
    this.isSettingsOpen = false
    this.activeDialog = undefined
    this.settingsModalContainer = undefined
    this.settingsButton = undefined
    this.objectiveLabelText = undefined
    this.objectiveText = undefined

    // 显式清理旧热区的 Input 注册和事件监听，防止泄漏到下一个场景
    this.hotspotVisuals.forEach((entry) => {
      entry.area.removeAllListeners()
      if (entry.area.input) {
        entry.area.disableInteractive()
      }
      entry.area.destroy()
      entry.labelText?.destroy()
    })
    this.hotspotVisuals = []

    // 清理 Inventory UI 的事件监听
    this.inventoryUi.forEach((node) => {
      if (node instanceof Phaser.GameObjects.Rectangle) {
        node.removeAllListeners()
        if (node.input) {
          node.disableInteractive()
        }
      }
    })

    this.worldContainer = undefined
    this.hudContainer = undefined
    this.children.removeAll(true)

    this.worldContainer = this.add.container(0, 0)
    this.hudContainer = this.add.container(0, 0).setDepth(50)

    const initialFlags = sceneConfig.flagsInitial ?? {}
    Object.entries(initialFlags).forEach(([flag, value]) => {
      if (this.flags[flag] === undefined) {
        this.flags[flag] = value
      }
    })

    this.drawBackground(sceneConfig)
    this.drawTopUi()

    sceneConfig.hotspots.forEach((hotspot) => {
      this.hotspotVisuals.push(this.drawHotspot(hotspot))
    })

    this.renderInventory()
    this.refreshHotspots()
    this.refreshObjective()
    this.layoutWorldAndHud()
    this.layoutTopUi()

    // BGM 切换：相同曲目则继续播放，不同则切换
    this.switchBgm(sceneConfig.bgm, sceneConfig.bgmOffset)

    void this.runActions(sceneConfig.startActions)
  }

  /** 切换背景音乐，相同曲目不中断 */
  private switchBgm(bgmKey?: string, offset = 0): void {
    // 无 BGM 配置 → 停止当前音乐
    if (!bgmKey) {
      this.currentBgm?.destroy()
      this.currentBgm = undefined
      this.currentBgmKey = ''
      return
    }

    // 与当前相同 → 不中断
    if (bgmKey === this.currentBgmKey && this.currentBgm) {
      return
    }

    // 停止旧 BGM
    this.currentBgm?.destroy()

    // 播放新 BGM（从 offset 秒开始）
    if (this.cache.audio.exists(bgmKey) && this.musicEnabled) {
      this.currentBgm = this.sound.add(bgmKey, {
        loop: true,
        volume: 0.4,
      })
      this.currentBgm.play({ seek: offset })
      this.currentBgmKey = bgmKey
    }
  }

  private layoutWorldAndHud(): void {
    if (!this.worldContainer) {
      return
    }

    const { width, height } = this.getViewportSize()
    const playableHeight = Math.max(1, height - TOP_HUD_HEIGHT - BOTTOM_HUD_HEIGHT)
    const scale = Math.min(width / GAME_WIDTH, playableHeight / GAME_HEIGHT)
    const worldDisplayWidth = GAME_WIDTH * scale
    const worldDisplayHeight = GAME_HEIGHT * scale
    const worldX = (width - worldDisplayWidth) / 2
    const worldY = TOP_HUD_HEIGHT + (playableHeight - worldDisplayHeight) / 2

    this.worldContainer.setPosition(worldX, worldY)
    this.worldContainer.setScale(scale)
  }

  private drawBackground(sceneConfig: SceneConfig): void {
    if (sceneConfig.background && this.textures.exists(sceneConfig.id)) {
      // 有背景图：用图片铺满整个 960×540 世界坐标
      const bgImage = this.add
        .image(0, 0, sceneConfig.id)
        .setOrigin(0)
        .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)
        .setDepth(0)
      this.worldContainer?.add(bgImage)
    } else {
      // 无背景图：保留暗色矩形兜底
      const background = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x111111).setOrigin(0)
      this.worldContainer?.add(background)
    }
  }

  private drawTopUi(): void {
    this.objectiveLabelText = this.add
      .text(0, 0, '...', {
        color: '#d6c2a1',
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
      })
      .setOrigin(1, 0)
      .setDepth(52)

    this.objectiveText = this.add
      .text(0, 0, '', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        align: 'right',
        wordWrap: { width: 320 },
      })
      .setOrigin(1, 0)
      .setDepth(52)

    const buttonBg = this.add
      .rectangle(0, 0, 160, 34, 0x2a2a2a, 0.95)
      .setStrokeStyle(1, 0xcdb58f)
      .setDepth(52)
      .setInteractive({ useHandCursor: true })

    const buttonText = this.add
      .text(0, 0, 'Settings', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
      })
      .setOrigin(0.5)
      .setDepth(53)

    this.settingsButton = this.add.container(0, 0, [buttonBg, buttonText]).setDepth(52)

    buttonBg.on('pointerdown', () => {
      if (this.isDialogueOpen || this.isEnding) {
        return
      }

      if (this.isSettingsOpen) {
        this.closeSettingsMenu()
      } else {
        this.openSettingsMenu()
      }
    })

    this.hudContainer?.add([this.objectiveLabelText, this.objectiveText, this.settingsButton])
    this.layoutTopUi()
  }

  private layoutTopUi(): void {
    const { width } = this.getViewportSize()
    const rightPadding = 18
    const objectiveMaxWidth = Math.min(420, Math.max(260, Math.floor(width * 0.42)))

    if (this.objectiveLabelText) {
      this.objectiveLabelText.setPosition(width - rightPadding, 12)
    }

    if (this.objectiveText) {
      this.objectiveText.setWordWrapWidth(objectiveMaxWidth, true)
      this.objectiveText.setPosition(width - rightPadding, 34)
    }

    if (this.settingsButton) {
      const objectiveBottom = this.objectiveText ? this.objectiveText.getBounds().bottom : 34
      const settingsY = Math.max(74, objectiveBottom + 12 + 17)
      this.settingsButton.setPosition(width - 102, settingsY)
    }
  }

  private refreshObjective(): void {
    if (!this.objectiveText) {
      return
    }

    const objective = this.getObjective(this.currentSceneId, this.flags, this.inventory)
    this.objectiveText.setText(objective)
    this.layoutTopUi()
  }

  private getObjective(sceneId: string, flags: Record<string, FlagValue>, inventory: InventoryItem[]): string {
    const has = (itemId: string) => inventory.some((entry) => entry.itemId === itemId)
    const isTrue = (flag: string) => flags[flag] === true

    if (sceneId === 'title') {
      return TEXT_ASSETS.objective.title
    }

    if (sceneId === 'prologue') {
      return TEXT_ASSETS.objective.prologue
    }

    if (sceneId === 'studio') {
      if (!has('code_1230') && isTrue('letter_first_active')) {
        return TEXT_ASSETS.objective.studioFindCode
      }

      if (isTrue('drawer_locked_active')) {
        return TEXT_ASSETS.objective.studioOpenDrawer
      }

      if (!isTrue('curtain_lifted')) {
        return TEXT_ASSETS.objective.studioUseHook
      }

      return TEXT_ASSETS.objective.studioGoTheatre
    }

    if (sceneId === 'dressingRoom') {
      if (!isTrue('attic_key')) {
        return TEXT_ASSETS.objective.dressingGetAtticKey
      }

      if (!has('yellow_page') && isTrue('trunk_locked_active')) {
        return TEXT_ASSETS.objective.dressingUseHook
      }

      return TEXT_ASSETS.objective.dressingGoAttic
    }

    if (sceneId === 'attic') {
      if (!has('knife')) {
        return TEXT_ASSETS.objective.atticGetKnife
      }

      return TEXT_ASSETS.objective.atticUseKnife
    }

    return ''
  }

  private openSettingsMenu(): void {
    if (this.settingsModalContainer) {
      return
    }

    this.isSettingsOpen = true
    const { width, height } = this.getViewportSize()
    const menuX = width / 2
    const menuY = height / 2

    const overlay = this.add
      .rectangle(0, 0, width, height, 0x000000, 0.35)
      .setOrigin(0)
      .setDepth(90)
      .setInteractive({ useHandCursor: true })

    const panel = this.add
      .rectangle(menuX, menuY, 360, 280, 0x1c1c1c, 0.96)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xcdb58f)
      .setDepth(91)
      .setInteractive({ useHandCursor: true })

    const title = this.add
      .text(menuX, menuY - 104, 'Settings', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setOrigin(0.5)
      .setDepth(92)

    const storyButton = this.createMenuButton(menuX, menuY - 52, 'Story / Background', () => {
      this.closeSettingsMenu()
      void this.showDialogue(TEXT_ASSETS.system.storyBackground)
    })

    const musicButton = this.createMenuButton(menuX, menuY - 8, this.musicEnabled ? 'Music: On' : 'Music: Off', () => {
      const message = this.toggleMusic()
      this.closeSettingsMenu()
      if (message) {
        void this.showDialogue(message)
      }
    })

    const restartButton = this.createMenuButton(menuX, menuY + 36, 'Restart', () => {
      this.restartGame()
    })

    const backButton = this.createMenuButton(menuX, menuY + 80, 'Back', () => {
      this.closeSettingsMenu()
    })

    overlay.on('pointerdown', () => {
      this.closeSettingsMenu()
    })

    panel.on('pointerdown', (_pointer: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData) => {
      event.stopPropagation()
    })

    this.settingsModalContainer = this.add
      .container(0, 0, [overlay, panel, title, ...storyButton, ...musicButton, ...restartButton, ...backButton])
      .setDepth(90)
  }

  private rebuildSettingsMenuIfOpen(): void {
    if (!this.isSettingsOpen) {
      return
    }

    this.closeSettingsMenu()
    this.openSettingsMenu()
  }

  private createMenuButton(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.GameObject[] {
    const bg = this.add
      .rectangle(x, y, 232, 34, 0x2f2f2f, 0.96)
      .setStrokeStyle(1, 0xb69e7a)
      .setDepth(92)
      .setInteractive({ useHandCursor: true })

    const text = this.add
      .text(x, y, label, {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
      })
      .setOrigin(0.5)
      .setDepth(93)

    bg.on('pointerdown', onClick)

    return [bg, text]
  }

  private closeSettingsMenu(): void {
    this.settingsModalContainer?.destroy(true)
    this.settingsModalContainer = undefined
    this.isSettingsOpen = false
  }

  private toggleMusic(): string | undefined {
    this.musicEnabled = !this.musicEnabled

    if (!this.musicEnabled) {
      // 关闭音乐：停止当前 BGM
      if (this.currentBgm) {
        this.currentBgm.destroy()
        this.currentBgm = undefined
        this.currentBgmKey = ''
      }
    } else {
      // 开启音乐：恢复当前场景的 BGM
      const sceneConfig = this.allScenes.find((s) => s.id === this.currentSceneId)
      if (sceneConfig?.bgm) {
        this.switchBgm(sceneConfig.bgm, sceneConfig.bgmOffset)
      }
    }

    return undefined
  }

  private resetProgress(): void {
    this.closeSettingsMenu()
    this.activeDialog?.destroy(true)
    this.activeDialog = undefined
    this.isDialogueOpen = false
    this.isEnding = false
    this.flags = {}
    this.inventory = []
    this.selectedItemId = undefined
  }

  private restartGame(): void {
    this.resetProgress()
    this.loadScene('title')
  }

  private drawHotspot(hotspot: HotspotConfig): HotspotVisual {
    const { x, y, w, h } = hotspot.rect
    const isButton = hotspot.style === 'button'

    // Button 样式显示半透明背板和边框，普通热区完全透明不可见（仅保留手型光标交互）
    const area = this.add
      .rectangle(x, y, w, h, isButton ? 0x3a3a3a : 0x000000, isButton ? 0.45 : 0)
      .setOrigin(0)
      .setStrokeStyle(isButton ? 1 : 0, isButton ? 0xe9d8a6 : 0x000000, isButton ? 0.8 : 0)
      .setDepth(10)

    const label = hotspot.label ?? hotspot.id
    const labelText = this.add
      .text(x + w / 2, y + h / 2, label, {
        color: '#e9d8a6',
        fontFamily: 'Georgia, serif',
        fontSize: isButton ? '20px' : '14px',
      })
      .setOrigin(0.5)
      .setDepth(11)
      .setAlpha(isButton ? 1 : 0) // 普通热区文字标签也永远为透明

    area.on('pointerdown', () => {
      void this.handleHotspotClick(hotspot)
    })

    this.worldContainer?.add([area, labelText])

    return { hotspot, area, labelText }
  }

  private isInputBlocked(): boolean {
    return this.isDialogueOpen || this.isEnding || this.isSettingsOpen
  }

  private async handleHotspotClick(hotspot: HotspotConfig): Promise<void> {
    if (this.isInputBlocked()) {
      return
    }

    if (!this.isHotspotAvailable(hotspot)) {
      return
    }

    if (this.selectedItemId && hotspot.onUse) {
      const selectedItem = this.selectedItemId
      if (hotspot.onUse.accepts.includes(selectedItem)) {
        await this.runActions(hotspot.onUse.success)
        return
      }

      await this.runActions(hotspot.onUse.fail)
      return
    }

    await this.runActions(hotspot.onClick)
  }

  private isHotspotAvailable(hotspot: HotspotConfig): boolean {
    if (!hotspot.requireFlag) {
      return true
    }

    return this.flags[hotspot.requireFlag] === true
  }

  private refreshHotspots(): void {
    this.hotspotVisuals.forEach((entry) => {
      const enabled = this.isHotspotAvailable(entry.hotspot)
      const isButton = entry.hotspot.style === 'button'

      if (enabled && !entry.area.input?.enabled) {
        entry.area.setInteractive({ useHandCursor: true })
        if (isButton) {
          entry.area.setStrokeStyle(1, 0xe9d8a6, 0.8)
          entry.labelText?.setAlpha(1)
        }
      }

      if (!enabled && entry.area.input?.enabled) {
        entry.area.disableInteractive()
        // 禁用时确保边框和标签隐藏
        entry.area.setStrokeStyle(0, 0x000000, 0)
        entry.labelText?.setAlpha(0)
      }
    })
  }

  private async runActions(actions?: Action[]): Promise<void> {
    if (!actions || actions.length === 0) {
      return
    }

    for (const action of actions) {
      const shouldBreak = await this.runAction(action)
      if (this.isEnding || shouldBreak) {
        return
      }
    }
  }

  private async runAction(action: Action): Promise<boolean> {
    switch (action.type) {
      case 'showText':
        await this.showDialogue(action.text)
        return false
      case 'addItem':
        this.addItem({
          itemId: action.itemId,
          name: action.name ?? action.itemId,
          description: action.description,
          icon: action.icon,
        })
        return false
      case 'removeItem':
        this.removeItem(action.itemId)
        return false
      case 'setFlag':
        this.flags[action.flag] = action.value
        this.refreshHotspots()
        this.refreshObjective()
        return false
      case 'playVideo': {
        // 播放前情提要视频，叠加在 Phaser canvas 上方
        const canvas = this.game.canvas
        const parent = canvas.parentElement
        if (!parent) return false

        await new Promise<void>((resolve) => {
          // 创建全屏覆盖容器
          const overlay = document.createElement('div')
          overlay.style.cssText = `
            position: absolute; inset: 0; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            background: #000;
          `
          parent.style.position = 'relative'
          parent.appendChild(overlay)

          // 创建 video 元素
          const video = document.createElement('video')
          video.src = action.src
          video.autoplay = true
          video.playsInline = true
          video.style.cssText = 'width:100%; height:100%; object-fit:contain;'
          overlay.appendChild(video)

          // 清理函数（确保只执行一次）
          let cleaned = false
          const cleanup = () => {
            if (cleaned) return
            cleaned = true
            video.pause()
            video.removeAttribute('src')
            video.load()
            overlay.remove()
            resolve()
          }

          // 视频结束后自动清理
          video.addEventListener('ended', cleanup, { once: true })
          // 加载失败时优雅降级（直接跳过）
          video.addEventListener('error', cleanup, { once: true })

          // 可跳过按钮
          if (action.skippable !== false) {
            const skipBtn = document.createElement('button')
            skipBtn.textContent = 'Skip ▸'
            skipBtn.style.cssText = `
              position: absolute; bottom: 32px; right: 32px;
              padding: 8px 24px; font-size: 16px;
              background: rgba(255,255,255,0.15); color: #fff;
              border: 1px solid rgba(255,255,255,0.3);
              border-radius: 6px; cursor: pointer;
              backdrop-filter: blur(4px);
              transition: background 0.2s;
            `
            skipBtn.addEventListener('mouseenter', () => {
              skipBtn.style.background = 'rgba(255,255,255,0.3)'
            })
            skipBtn.addEventListener('mouseleave', () => {
              skipBtn.style.background = 'rgba(255,255,255,0.15)'
            })
            skipBtn.addEventListener('click', cleanup, { once: true })
            overlay.appendChild(skipBtn)
          }
        })
        return false
      }
      case 'end':
        this.showEnding(action.text)
        return true
      case 'changeBackground': {
        // 动态切换场景背景图（必须等待加载完成后再继续后续 action）
        const bgKey = `bg_dynamic_${action.background}`
        const applyBg = () => {
          const oldBg = this.worldContainer?.list.find(
            (obj) => (obj as Phaser.GameObjects.Image).depth === 0
          ) as Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle | undefined
          if (oldBg) {
            oldBg.destroy()
          }
          const newBg = this.add
            .image(0, 0, bgKey)
            .setOrigin(0)
            .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)
            .setDepth(0)
          this.worldContainer?.addAt(newBg, 0)
        }
        if (this.textures.exists(bgKey)) {
          applyBg()
        } else {
          await new Promise<void>((resolve) => {
            this.load.image(bgKey, action.background)
            this.load.once('complete', () => {
              applyBg()
              resolve()
            })
            this.load.start()
          })
        }
        return false
      }
      case 'gotoScene':
        this.loadScene(action.sceneId)
        return true
      default:
        return false
    }
  }

  private addItem(item: InventoryItem): void {
    const existing = this.inventory.find((entry) => entry.itemId === item.itemId)
    if (existing) {
      return
    }

    this.inventory.push(item)
    this.renderInventory()
    this.refreshObjective()
  }

  private removeItem(itemId: string): void {
    this.inventory = this.inventory.filter((item) => item.itemId !== itemId)
    if (this.selectedItemId === itemId) {
      this.selectedItemId = undefined
    }
    this.renderInventory()
    this.refreshObjective()
  }

  private toggleSelectItem(itemId: string): void {
    this.selectedItemId = this.selectedItemId === itemId ? undefined : itemId
    this.renderInventory()
  }

  private renderInventory(): void {
    this.inventoryUi.forEach((node) => node.destroy())
    this.inventoryUi = []

    const { width, height } = this.getViewportSize()

    const bar = this.add
      .rectangle(0, height - BOTTOM_HUD_HEIGHT, width, BOTTOM_HUD_HEIGHT, 0x1b1b1b, 0.92)
      .setOrigin(0)
      .setStrokeStyle(1, 0x4a4a4a)
      .setDepth(30)

    const title = this.add
      .text(16, height - BOTTOM_HUD_HEIGHT + 8, 'Inventory', {
        color: '#d9c7a8',
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
      })
      .setDepth(31)

    this.inventoryUi.push(bar, title)

    const CARD_SIZE = 60
    const CARD_GAP = 14
    const ICON_SIZE = 40
    const startX = 16
    const cardY = height - BOTTOM_HUD_HEIGHT + 26

    this.inventory.forEach((item, index) => {
      const x = startX + index * (CARD_SIZE + CARD_GAP)
      const isSelected = this.selectedItemId === item.itemId

      // 卡片背景
      const card = this.add
        .rectangle(x, cardY, CARD_SIZE, CARD_SIZE, isSelected ? 0x6c4f1d : 0x2a2a2a, 0.96)
        .setOrigin(0)
        .setStrokeStyle(2, isSelected ? 0xe7bf7a : 0x555555)
        .setDepth(31)
        .setInteractive({ useHandCursor: true })

      this.inventoryUi.push(card)

      // 图标或回退文字
      if (item.icon && this.textures.exists(item.icon)) {
        const icon = this.add
          .image(x + CARD_SIZE / 2, cardY + CARD_SIZE / 2, item.icon)
          .setDisplaySize(ICON_SIZE, ICON_SIZE)
          .setOrigin(0.5)
          .setDepth(32)
        this.inventoryUi.push(icon)
      } else {
        // 无图标时显示首字母
        const fallback = this.add
          .text(x + CARD_SIZE / 2, cardY + CARD_SIZE / 2, item.name.charAt(0).toUpperCase(), {
            color: '#d9c7a8',
            fontFamily: 'Georgia, serif',
            fontSize: '28px',
          })
          .setOrigin(0.5)
          .setDepth(32)
        this.inventoryUi.push(fallback)
      }

      // 道具名字
      const label = this.add
        .text(x + CARD_SIZE / 2, cardY + CARD_SIZE + 2, item.name, {
          color: '#d9c7a8',
          fontFamily: 'Georgia, serif',
          fontSize: '14px',
        })
        .setOrigin(0.5, 0)
        .setDepth(32)

      card.on('pointerdown', () => {
        if (this.isInputBlocked()) {
          return
        }
        this.toggleSelectItem(item.itemId)
      })

      this.inventoryUi.push(label)
    })

    this.hudContainer?.add(this.inventoryUi)
  }

  private buildTextLayoutPages(
    text: string,
    maxWidth: number,
    maxHeight: number,
    startFontSize: number,
    minFontSize: number,
  ): TextLayoutResult {
    const probe = this.add
      .text(-10000, -10000, text, {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: `${startFontSize}px`,
        wordWrap: { width: maxWidth, useAdvancedWrap: true },
      })
      .setVisible(false)

    let fontSize = startFontSize
    while (fontSize > minFontSize) {
      probe.setFontSize(fontSize)
      probe.setText(text)
      if (probe.height <= maxHeight) {
        probe.destroy()
        return { pages: [text], fontSize }
      }
      fontSize -= 2
    }

    fontSize = minFontSize
    probe.setFontSize(fontSize)
    const lines = text.split('\n')
    const pages: string[] = []
    let current: string[] = []

    const pushCurrent = () => {
      if (current.length > 0) {
        pages.push(current.join('\n'))
        current = []
      }
    }

    const splitLongLine = (line: string): string[] => {
      const segments: string[] = []
      const words = line.split(' ')
      let segment = ''

      words.forEach((word) => {
        const next = segment ? `${segment} ${word}` : word
        probe.setText(next)
        if (probe.height <= maxHeight || !segment) {
          segment = next
        } else {
          segments.push(segment)
          segment = word
        }
      })

      if (segment) {
        segments.push(segment)
      }

      return segments.length > 0 ? segments : [line]
    }

    lines.forEach((line) => {
      const candidate = [...current, line]
      probe.setText(candidate.join('\n'))
      if (probe.height <= maxHeight) {
        current = candidate
        return
      }

      if (current.length > 0) {
        pushCurrent()
      }

      probe.setText(line)
      if (probe.height <= maxHeight) {
        current = [line]
        return
      }

      const splitLines = splitLongLine(line)
      splitLines.forEach((piece) => {
        const pieceCandidate = [...current, piece]
        probe.setText(pieceCandidate.join('\n'))
        if (probe.height <= maxHeight) {
          current = pieceCandidate
        } else {
          pushCurrent()
          current = [piece]
        }
      })
    })

    pushCurrent()
    probe.destroy()

    return { pages: pages.length > 0 ? pages : [text], fontSize }
  }

  private showDialogue(text: string): Promise<void> {
    this.isDialogueOpen = true
    const { width, height } = this.getViewportSize()
    const panelWidth = 760
    const panelHeight = 320
    const panelInnerWidth = panelWidth - 80
    const panelInnerHeight = panelHeight - 110
    const layout = this.buildTextLayoutPages(text, panelInnerWidth, panelInnerHeight, 28, 18)
    let pageIndex = 0

    const overlay = this.add
      .rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0)
      .setDepth(100)
      .setInteractive({ useHandCursor: true })

    const panel = this.add
      .rectangle(width / 2, height / 2, panelWidth, panelHeight, 0x1e1e1e, 0.95)
      .setStrokeStyle(2, 0xd6c2a1)
      .setDepth(101)

    const textObject = this.add
      .text(width / 2 - panelWidth / 2 + 40, height / 2 - panelHeight / 2 + 32, layout.pages[0], {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: `${layout.fontSize}px`,
        wordWrap: { width: panelInnerWidth, useAdvancedWrap: true },
      })
      .setOrigin(0, 0)
      .setDepth(102)

    const hint = this.add
      .text(
        width / 2 - panelWidth / 2 + 40,
        height / 2 + panelHeight / 2 - 34,
        layout.pages.length > 1 ? `Click to continue (${pageIndex + 1}/${layout.pages.length})` : 'Click anywhere to close',
        {
          color: '#baa58a',
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
        },
      )
      .setOrigin(0, 0)
      .setDepth(102)

    this.activeDialog = this.add.container(0, 0, [overlay, panel, textObject, hint]).setDepth(100)

    return new Promise((resolve) => {
      overlay.on('pointerdown', () => {
        if (pageIndex < layout.pages.length - 1) {
          pageIndex += 1
          textObject.setText(layout.pages[pageIndex])
          hint.setText(`Click to continue (${pageIndex + 1}/${layout.pages.length})`)
          return
        }

        this.activeDialog?.destroy(true)
        this.activeDialog = undefined
        this.isDialogueOpen = false
        resolve()
      })
    })
  }

  private showEnding(text: string): void {
    this.closeSettingsMenu()
    this.isEnding = true
    const { width, height } = this.getViewportSize()
    const panelWidth = 820
    const panelHeight = 520
    const panelInnerWidth = panelWidth - 88
    const panelInnerHeight = panelHeight - 140
    const layout = this.buildTextLayoutPages(text, panelInnerWidth, panelInnerHeight, 30, 18)
    let pageIndex = 0

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.45).setOrigin(0).setDepth(140)
    const panel = this.add
      .rectangle(width / 2, height / 2, panelWidth, panelHeight, 0x161616, 0.85)
      .setStrokeStyle(2, 0xd6c2a1)
      .setDepth(141)

    const content = this.add
      .text(width / 2 - panelWidth / 2 + 44, height / 2 - panelHeight / 2 + 36, layout.pages[0], {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: `${layout.fontSize}px`,
        wordWrap: { width: panelInnerWidth, useAdvancedWrap: true },
      })
      .setOrigin(0, 0)
      .setDepth(142)

    const footer = this.add
      .text(width / 2 - panelWidth / 2 + 44, height / 2 + panelHeight / 2 - 80, 'Ending reached', {
        color: '#baa58a',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setOrigin(0, 0)
      .setDepth(142)

    const pageHint = this.add
      .text(width / 2 + panelWidth / 2 - 44, height / 2 + panelHeight / 2 - 80, '', {
        color: '#baa58a',
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
      })
      .setOrigin(1, 0)
      .setDepth(142)

    // 只保留一个 Restart 按钮，居中显示
    const restartButton = this.add
      .rectangle(width / 2, height / 2 + panelHeight / 2 - 38, 260, 42, 0x3a3a3a, 0.98)
      .setStrokeStyle(1, 0xcdb58f)
      .setDepth(142)
      .setInteractive({ useHandCursor: true })

    const restartLabel = this.add
      .text(width / 2, height / 2 + panelHeight / 2 - 38, 'Restart', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
      })
      .setOrigin(0.5)
      .setDepth(143)

    const updatePageState = () => {
      content.setText(layout.pages[pageIndex])
      const isLast = pageIndex === layout.pages.length - 1

      if (!isLast) {
        restartLabel.setText('Next')
        pageHint.setText(`${pageIndex + 1} / ${layout.pages.length}`)
      } else {
        restartLabel.setText('Restart')
        pageHint.setText(layout.pages.length > 1 ? `${layout.pages.length} / ${layout.pages.length}` : '')
      }
    }

    updatePageState()

    restartButton.on('pointerdown', () => {
      if (pageIndex < layout.pages.length - 1) {
        pageIndex += 1
        updatePageState()
        return
      }

      this.restartGame()
    })

    this.add
      .container(0, 0, [overlay, panel, content, footer, pageHint, restartButton, restartLabel])
      .setDepth(140)
  }
}
