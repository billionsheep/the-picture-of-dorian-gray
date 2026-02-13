import Phaser from 'phaser'
import { SceneLoader } from '../core/SceneLoader'
import type { Action, FlagValue, HotspotConfig } from '../core/schema'

const GAME_WIDTH = 960
const GAME_HEIGHT = 540
const INVENTORY_BAR_HEIGHT = 108

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
  private currentSceneId = 'studio'
  private hotspotVisuals: HotspotVisual[] = []
  private activeDialog?: Phaser.GameObjects.Container
  private isDialogueOpen = false
  private isEnding = false
  private flags: Record<string, FlagValue> = {}
  private inventory: InventoryItem[] = []
  private selectedItemId?: string
  private inventoryUi: Phaser.GameObjects.GameObject[] = []

  constructor() {
    super('PlayScene')
  }

  create(): void {
    this.loadScene(this.currentSceneId)
  }

  private loadScene(sceneId: string): void {
    const sceneConfig = this.sceneLoader.load(sceneId)
    this.currentSceneId = sceneId

    this.isDialogueOpen = false
    this.activeDialog = undefined
    this.hotspotVisuals = []
    this.children.removeAll(true)

    const initialFlags = sceneConfig.flagsInitial ?? {}
    Object.entries(initialFlags).forEach(([flag, value]) => {
      if (this.flags[flag] === undefined) {
        this.flags[flag] = value
      }
    })

    this.drawBackground(sceneConfig.title ?? sceneConfig.id)
    sceneConfig.hotspots.forEach((hotspot) => {
      this.hotspotVisuals.push(this.drawHotspot(hotspot))
    })

    this.renderInventory()
    this.refreshHotspots()
    void this.runActions(sceneConfig.startActions)
  }

  private drawBackground(title: string): void {
    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x111111).setOrigin(0)
    this.add
      .text(24, 24, `Scene: ${title}`, {
        color: '#f5f5f5',
        fontFamily: 'Georgia, serif',
        fontSize: '24px',
      })
      .setDepth(2)
  }

  private drawHotspot(hotspot: HotspotConfig): HotspotVisual {
    const { x, y, w, h } = hotspot.rect

    const area = this.add
      .rectangle(x, y, w, h, 0x5f6f7d, 0.55)
      .setOrigin(0)
      .setStrokeStyle(2, 0xe9d8a6)
      .setDepth(10)

    const label = hotspot.label ?? hotspot.id
    this.add
      .text(x + 8, y + 8, label, {
        color: '#ffffff',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(11)

    area.on('pointerdown', () => {
      void this.handleHotspotClick(hotspot)
    })

    return { hotspot, area }
  }

  private isInputBlocked(): boolean {
    return this.isDialogueOpen || this.isEnding
  }

  private async handleHotspotClick(hotspot: HotspotConfig): Promise<void> {
    if (this.isInputBlocked()) {
      return
    }

    if (!this.isHotspotAvailable(hotspot)) {
      return
    }

    console.log(hotspot.id)

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
  }

  private removeItem(itemId: string): void {
    this.inventory = this.inventory.filter((item) => item.itemId !== itemId)
    if (this.selectedItemId === itemId) {
      this.selectedItemId = undefined
    }
    this.renderInventory()
  }

  private toggleSelectItem(itemId: string): void {
    this.selectedItemId = this.selectedItemId === itemId ? undefined : itemId
    this.renderInventory()
  }

  private renderInventory(): void {
    this.inventoryUi.forEach((node) => node.destroy())
    this.inventoryUi = []

    const bar = this.add
      .rectangle(0, GAME_HEIGHT - INVENTORY_BAR_HEIGHT, GAME_WIDTH, INVENTORY_BAR_HEIGHT, 0x1b1b1b, 0.92)
      .setOrigin(0)
      .setStrokeStyle(1, 0x4a4a4a)
      .setDepth(30)

    const title = this.add
      .text(16, GAME_HEIGHT - INVENTORY_BAR_HEIGHT + 12, 'Inventory', {
        color: '#d9c7a8',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(31)

    this.inventoryUi.push(bar, title)

    this.inventory.forEach((item, index) => {
      const x = 20 + index * 200
      const y = GAME_HEIGHT - 58
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
  }

  private showDialogue(text: string): Promise<void> {
    this.isDialogueOpen = true

    const overlay = this.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7)
      .setOrigin(0)
      .setDepth(100)
      .setInteractive({ useHandCursor: true })

    const panel = this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 720, 260, 0x1e1e1e, 0.95)
      .setStrokeStyle(2, 0xd6c2a1)
      .setDepth(101)

    const textObject = this.add
      .text(GAME_WIDTH / 2 - 320, GAME_HEIGHT / 2 - 90, text, {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        wordWrap: { width: 640 },
      })
      .setDepth(102)

    const hint = this.add
      .text(GAME_WIDTH / 2 - 320, GAME_HEIGHT / 2 + 86, '点击任意位置关闭', {
        color: '#baa58a',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(102)

    this.activeDialog = this.add
      .container(0, 0, [overlay, panel, textObject, hint])
      .setDepth(100)

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
    this.isEnding = true

    const overlay = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.82).setOrigin(0).setDepth(140)
    const panel = this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 760, 300, 0x161616, 0.95)
      .setStrokeStyle(2, 0xd6c2a1)
      .setDepth(141)

    const content = this.add
      .text(GAME_WIDTH / 2 - 320, GAME_HEIGHT / 2 - 70, text, {
        color: '#f4f0e6',
        fontFamily: 'Georgia, serif',
        fontSize: '30px',
        wordWrap: { width: 640 },
      })
      .setDepth(142)

    const footer = this.add
      .text(GAME_WIDTH / 2 - 320, GAME_HEIGHT / 2 + 104, 'MVP 完成：输入已锁定', {
        color: '#baa58a',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
      })
      .setDepth(142)

    this.add.container(0, 0, [overlay, panel, content, footer]).setDepth(140)
  }
}
