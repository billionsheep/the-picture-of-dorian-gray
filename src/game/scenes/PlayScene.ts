import Phaser from 'phaser'
import { SceneLoader } from '../core/SceneLoader'
import type { Action, FlagValue, HotspotConfig } from '../core/schema'
import { TEXT_ASSETS } from '../../content/textAssets'

const GAME_WIDTH = 960
const GAME_HEIGHT = 540
const TOP_HUD_HEIGHT = 90
const BOTTOM_HUD_HEIGHT = 150

interface InventoryItem {
  itemId: string
  name: string
  description?: string
}

interface HotspotVisual {
  hotspot: HotspotConfig
  area: Phaser.GameObjects.Rectangle
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
  private settingsMenu?: Phaser.GameObjects.Container
  private hasBgmResource = false
  private musicEnabled = true
  private flags: Record<string, FlagValue> = {}
  private inventory: InventoryItem[] = []
  private selectedItemId?: string
  private inventoryUi: Phaser.GameObjects.GameObject[] = []

  constructor() {
    super('PlayScene')
  }

  create(): void {
    this.hasBgmResource = this.cache.audio.exists('bgm_main')
    this.scale.on('resize', this.handleResize, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this)
    })
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
    this.settingsMenu = undefined
    this.settingsButton = undefined
    this.objectiveLabelText = undefined
    this.objectiveText = undefined
    this.worldContainer = undefined
    this.hudContainer = undefined
    this.hotspotVisuals = []
    this.children.removeAll(true)

    this.worldContainer = this.add.container(0, 0)
    this.hudContainer = this.add.container(0, 0).setDepth(50)

    const initialFlags = sceneConfig.flagsInitial ?? {}
    Object.entries(initialFlags).forEach(([flag, value]) => {
      if (this.flags[flag] === undefined) {
        this.flags[flag] = value
      }
    })

    this.drawBackground(sceneConfig.title ?? sceneConfig.id)
    this.drawTopUi()

    sceneConfig.hotspots.forEach((hotspot) => {
      this.hotspotVisuals.push(this.drawHotspot(hotspot))
    })

    this.renderInventory()
    this.refreshHotspots()
    this.refreshObjective()
    this.layoutWorldAndHud()
    this.layoutTopUi()
    void this.runActions(sceneConfig.startActions)
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

  private drawBackground(title: string): void {
    const background = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x111111).setOrigin(0)
    const sceneTitle = this.add
      .text(24, 24, `Scene: ${title}`, {
        color: '#f5f5f5',
        fontFamily: 'Georgia, serif',
        fontSize: '24px',
      })
      .setDepth(2)

    this.worldContainer?.add([background, sceneTitle])
  }

  private drawTopUi(): void {
    this.objectiveLabelText = this.add
      .text(0, 0, 'Objective', {
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

    if (this.objectiveLabelText) {
      this.objectiveLabelText.setPosition(width - rightPadding, 12)
    }

    if (this.objectiveText) {
      this.objectiveText.setPosition(width - rightPadding, 34)
    }

    if (this.settingsButton) {
      this.settingsButton.setPosition(width - 102, 74)
    }
  }

  private refreshObjective(): void {
    if (!this.objectiveText) {
      return
    }

    const objective = this.getObjective(this.currentSceneId, this.flags, this.inventory)
    this.objectiveText.setText(objective)
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
    if (this.settingsMenu) {
      return
    }

    this.isSettingsOpen = true
    const { width, height } = this.getViewportSize()
    const menuX = width - 190

    const overlay = this.add
      .rectangle(0, 0, width, height, 0x000000, 0.45)
      .setOrigin(0)
      .setDepth(90)

    const panel = this.add
      .rectangle(menuX, 188, 300, 240, 0x1c1c1c, 0.96)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xcdb58f)
      .setDepth(91)

    const title = this.add
      .text(menuX - 110, 88, 'Settings', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(92)

    const storyButton = this.createMenuButton(menuX, 132, 'Story / Background', () => {
      this.closeSettingsMenu()
      void this.showDialogue(TEXT_ASSETS.system.storyBackground)
    })

    const musicButton = this.createMenuButton(menuX, 178, this.musicEnabled ? 'Music: On' : 'Music: Off', () => {
      const message = this.toggleMusic()
      this.closeSettingsMenu()
      if (message) {
        void this.showDialogue(message)
      }
    })

    const restartButton = this.createMenuButton(menuX, 224, 'Restart', () => {
      this.restartGame()
    })

    const backButton = this.createMenuButton(menuX, 270, 'Back', () => {
      this.closeSettingsMenu()
    })

    this.settingsMenu = this.add
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
    this.settingsMenu?.destroy(true)
    this.settingsMenu = undefined
    this.isSettingsOpen = false
  }

  private toggleMusic(): string | undefined {
    this.musicEnabled = !this.musicEnabled
    this.sound.mute = !this.musicEnabled

    if (!this.hasBgmResource) {
      return TEXT_ASSETS.system.musicMissing
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

    const area = this.add
      .rectangle(x, y, w, h, 0x5f6f7d, 0.55)
      .setOrigin(0)
      .setStrokeStyle(2, 0xe9d8a6)
      .setDepth(10)

    const label = hotspot.label ?? hotspot.id
    const labelText = this.add
      .text(x + 8, y + 8, label, {
        color: '#ffffff',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(11)

    area.on('pointerdown', () => {
      void this.handleHotspotClick(hotspot)
    })

    this.worldContainer?.add([area, labelText])

    return { hotspot, area }
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
      entry.area.setAlpha(enabled ? 0.55 : 0.18)

      if (enabled && !entry.area.input?.enabled) {
        entry.area.setInteractive({ useHandCursor: true })
      }

      if (!enabled && entry.area.input?.enabled) {
        entry.area.disableInteractive()
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
      case 'end':
        this.showEnding(action.text)
        return true
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
      .text(16, height - BOTTOM_HUD_HEIGHT + 12, 'Inventory', {
        color: '#d9c7a8',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(31)

    this.inventoryUi.push(bar, title)

    this.inventory.forEach((item, index) => {
      const x = 20 + index * 200
      const y = height - 58
      const isSelected = this.selectedItemId === item.itemId

      const card = this.add
        .rectangle(x, y, 182, 44, isSelected ? 0x6c4f1d : 0x303030, 0.96)
        .setOrigin(0)
        .setStrokeStyle(2, isSelected ? 0xe7bf7a : 0x636363)
        .setDepth(31)
        .setInteractive({ useHandCursor: true })

      const label = this.add
        .text(x + 10, y + 10, item.name, {
          color: '#f4f0e6',
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
        })
        .setDepth(32)

      card.on('pointerdown', () => {
        if (this.isInputBlocked()) {
          return
        }
        this.toggleSelectItem(item.itemId)
      })

      this.inventoryUi.push(card, label)
    })

    this.hudContainer?.add(this.inventoryUi)
  }

  private showDialogue(text: string): Promise<void> {
    this.isDialogueOpen = true
    const { width, height } = this.getViewportSize()

    const overlay = this.add
      .rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0)
      .setDepth(100)
      .setInteractive({ useHandCursor: true })

    const panel = this.add
      .rectangle(width / 2, height / 2, 720, 260, 0x1e1e1e, 0.95)
      .setStrokeStyle(2, 0xd6c2a1)
      .setDepth(101)

    const textObject = this.add
      .text(width / 2 - 320, height / 2 - 90, text, {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        wordWrap: { width: 640 },
      })
      .setDepth(102)

    const hint = this.add
      .text(width / 2 - 320, height / 2 + 86, 'Click anywhere to close', {
        color: '#baa58a',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(102)

    this.activeDialog = this.add.container(0, 0, [overlay, panel, textObject, hint]).setDepth(100)

    return new Promise((resolve) => {
      overlay.once('pointerdown', () => {
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

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.82).setOrigin(0).setDepth(140)
    const panel = this.add
      .rectangle(width / 2, height / 2, 760, 300, 0x161616, 0.95)
      .setStrokeStyle(2, 0xd6c2a1)
      .setDepth(141)

    const content = this.add
      .text(width / 2 - 320, height / 2 - 70, text, {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '30px',
        wordWrap: { width: 640 },
      })
      .setDepth(142)

    const footer = this.add
      .text(width / 2 - 320, height / 2 + 104, 'Ending reached', {
        color: '#baa58a',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(142)

    const restartButton = this.add
      .rectangle(width / 2 - 130, height / 2 + 148, 220, 42, 0x3a3a3a, 0.98)
      .setStrokeStyle(1, 0xcdb58f)
      .setDepth(142)
      .setInteractive({ useHandCursor: true })

    const restartLabel = this.add
      .text(width / 2 - 130, height / 2 + 148, 'Restart', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
      })
      .setOrigin(0.5)
      .setDepth(143)

    const titleButton = this.add
      .rectangle(width / 2 + 130, height / 2 + 148, 220, 42, 0x3a3a3a, 0.98)
      .setStrokeStyle(1, 0xcdb58f)
      .setDepth(142)
      .setInteractive({ useHandCursor: true })

    const titleLabel = this.add
      .text(width / 2 + 130, height / 2 + 148, 'Back to Title', {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
      })
      .setOrigin(0.5)
      .setDepth(143)

    restartButton.on('pointerdown', () => {
      this.restartGame()
    })

    titleButton.on('pointerdown', () => {
      this.restartGame()
    })

    this.add
      .container(0, 0, [overlay, panel, content, footer, restartButton, restartLabel, titleButton, titleLabel])
      .setDepth(140)
  }
}
