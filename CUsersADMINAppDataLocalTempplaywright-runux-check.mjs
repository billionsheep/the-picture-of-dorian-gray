const PLAYWRIGHT_PATH = 'file:///D:/vscode/project/the-picture-of-dorian-gray/node_modules/playwright/index.mjs'

const { chromium } = await import(PLAYWRIGHT_PATH)
const { writeFile } = await import('fs/promises')

const PAGE_URL = 'http://127.0.0.1:4174'
const VIEWPORT = { width: 1280, height: 720 }
const GAME_WIDTH = 960
const GAME_HEIGHT = 540
const TOP_HUD = 90
const BOTTOM_HUD = 150

const playableHeight = VIEWPORT.height - TOP_HUD - BOTTOM_HUD
const scale = Math.min(VIEWPORT.width / GAME_WIDTH, playableHeight / GAME_HEIGHT)
const worldDisplayWidth = GAME_WIDTH * scale
const worldDisplayHeight = GAME_HEIGHT * scale
const worldX = (VIEWPORT.width - worldDisplayWidth) / 2
const worldY = TOP_HUD + (playableHeight - worldDisplayHeight) / 2

const centerPoint = (rect) => ({
  x: rect.x + rect.w / 2,
  y: rect.y + rect.h / 2,
})

const toViewportPoint = ({ x, y }) => ({
  px: worldX + x * scale,
  py: worldY + y * scale,
})

const buildNote = ({ px, py }) => {
  const edges = []
  if (px <= 80) edges.push('very near left edge')
  if (px >= VIEWPORT.width - 80) edges.push('near right edge')
  if (py <= TOP_HUD + 5) edges.push('touching top HUD zone')
  if (py >= VIEWPORT.height - BOTTOM_HUD - 5) edges.push('close to bottom HUD')
  return edges.length ? `Edge check: ${edges.join('; ')}` : 'No HUD obstruction detected'
}

const hotspots = {
  titleStart: { label: 'Title Start', rect: { x: 300, y: 200, w: 360, h: 90 } },
  letterFirst: { label: 'Studio Letter', rect: { x: 84, y: 350, w: 180, h: 120 } },
  drawer: { label: 'Studio Drawer', rect: { x: 374, y: 328, w: 210, h: 150 } },
  curtain: { label: 'Studio Curtain', rect: { x: 640, y: 100, w: 250, h: 340 } },
  studioExit: { label: 'Studio Exit', rect: { x: 18, y: 210, w: 70, h: 170 } },
  lockbox: { label: 'Lockbox', rect: { x: 380, y: 290, w: 180, h: 120 } },
  dressingTrunk: { label: 'Dressing Trunk', rect: { x: 620, y: 300, w: 220, h: 140 } },
  dressingExit: { label: 'Dressing Exit', rect: { x: 18, y: 210, w: 70, h: 170 } },
  atticTrunk: { label: 'Attic Trunk', rect: { x: 120, y: 300, w: 240, h: 150 } },
  atticPortraitKnife: { label: 'Attic Portrait Knife', rect: { x: 610, y: 430, w: 250, h: 70 } },
}

const result = {
  viewport: VIEWPORT,
  actionLog: [],
  inventorySnapshots: [],
  settingsCount: null,
  selectedItemBeforePortrait: null,
  endingTriggered: false,
  scenesVisited: [],
}

const logAction = (step, detail) => {
  result.actionLog.push({ step, detail, timestamp: new Date().toISOString() })
}

const recordInventorySnapshot = async (page, label) => {
  const snapshot = await page.evaluate(() => {
    const scene = window.__playSceneInstance
    if (!scene) return null
    return {
      inventory: scene.inventory.map((item) => item.itemId),
      selectedItemId: scene.selectedItemId ?? null,
      currentSceneId: scene.currentSceneId,
    }
  })
  result.inventorySnapshots.push({ label, snapshot })
  logAction('Inventory snapshot', { label, inventory: snapshot?.inventory ?? [], selected: snapshot?.selectedItemId })
  return snapshot
}

const closeDialogues = async (page) => {
  const centerClick = { x: VIEWPORT.width / 2, y: VIEWPORT.height / 2 }
  while (true) {
    const open = await page.evaluate(() => {
      const scene = window.__playSceneInstance
      return !!scene?.isDialogueOpen
    })
    if (!open) break
    await page.mouse.click(centerClick.x, centerClick.y)
    logAction('Dialog closed', { detail: 'Clicked overlay at center' })
    await page.waitForFunction(() => {
      const scene = window.__playSceneInstance
      return !!scene && !scene.isDialogueOpen
    }, { timeout: 4000 })
    await page.waitForTimeout(120)
  }
}

const clickHotspot = async (page, hotspotKey) => {
  const info = hotspots[hotspotKey]
  const worldCenter = centerPoint(info.rect)
  const { px, py } = toViewportPoint(worldCenter)
  const note = buildNote({ px, py })
  await page.mouse.click(px, py)
  logAction('Hotspot click', { label: info.label, coords: [Number(px.toFixed(1)), Number(py.toFixed(1))], note })
  await page.waitForTimeout(120)
  await closeDialogues(page)
}

const ensureSelectItem = async (page, itemId, label) => {
  await page.evaluate((id) => {
    const scene = window.__playSceneInstance
    if (!scene) return
    if (scene.selectedItemId && scene.selectedItemId !== id) {
      scene.toggleSelectItem(scene.selectedItemId)
    }
    if (scene.selectedItemId !== id) {
      scene.toggleSelectItem(id)
    }
  }, itemId)
  logAction('Item selected', { itemId, label })
}

const waitForScene = async (page, sceneId) => {
  await page.waitForFunction((id) => {
    const scene = window.__playSceneInstance
    return !!scene && scene.currentSceneId === id
  }, { timeout: 15000 }, sceneId)
  result.scenesVisited.push(sceneId)
  logAction('Scene reached', { sceneId })
}

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: VIEWPORT })
  await page.addInitScript(() => {
    const patchScene = () => {
      const phaser = window.Phaser
      if (!phaser?.Scene || phaser.Scene.__opatched) {
        if (!phaser?.Scene?.__opatched) requestAnimationFrame(patchScene)
        return
      }
      const originalScene = phaser.Scene
      const proxyScene = new Proxy(originalScene, {
        construct(target, args, newTarget) {
          const scene = Reflect.construct(target, args, newTarget)
          if (scene.scene?.key === 'PlayScene') {
            window.__playSceneInstance = scene
          }
          return scene
        },
      })
      proxyScene.__opatched = true
      phaser.Scene = proxyScene
    }
    patchScene()
  })
  await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => !!window.__playSceneInstance, { timeout: 15000 })

  const titleSettingsCount = await page.evaluate(() => {
    const scene = window.__playSceneInstance
    if (!scene?.hudContainer?.list) return 0
    return scene.hudContainer.list.filter((child) => child?.text?.includes?.('Settings')).length
  })
  result.settingsCount = titleSettingsCount
  logAction('HUD check', { detail: `Found ${titleSettingsCount} HUD entries that include Settings` })

  await clickHotspot(page, 'titleStart')
  await closeDialogues(page)
  await waitForScene(page, 'studio')

  await clickHotspot(page, 'letterFirst')
  await recordInventorySnapshot(page, 'After letter (code acquired)')

  await ensureSelectItem(page, 'code_1230', 'Studio code card')
  await clickHotspot(page, 'drawer')
  await recordInventorySnapshot(page, 'After drawer (hook + ticket added)')

  await ensureSelectItem(page, 'hook', 'Hook for curtain')
  await clickHotspot(page, 'curtain')

  await recordInventorySnapshot(page, 'Before Studio Exit (ticket still held)')
  await ensureSelectItem(page, 'theatre_ticket', 'Ticket to use on exit')
  await clickHotspot(page, 'studioExit')
  await waitForScene(page, 'dressingRoom')
  await recordInventorySnapshot(page, 'After Studio Exit (ticket consumed)')

  await ensureSelectItem(page, 'code_1230', 'Code for lockbox')
  await clickHotspot(page, 'lockbox')
  await recordInventorySnapshot(page, 'After Lockbox (code consumed, key added)')

  await ensureSelectItem(page, 'hook', 'Hook for dressing trunk')
  await clickHotspot(page, 'dressingTrunk')
  await recordInventorySnapshot(page, 'After Dressing Trunk (yellow page added)')

  await clickHotspot(page, 'dressingExit')
  await waitForScene(page, 'attic')
  await recordInventorySnapshot(page, 'Before Attic Trunk (key still held)')

  await ensureSelectItem(page, 'attic_key', 'Key for attic trunk')
  await clickHotspot(page, 'atticTrunk')
  await recordInventorySnapshot(page, 'After Attic Trunk (key removed, knife added)')

  await ensureSelectItem(page, 'knife', 'Knife for portrait')
  const selectedKnife = await page.evaluate(() => {
    const scene = window.__playSceneInstance
    return scene?.selectedItemId ?? null
  })
  result.selectedItemBeforePortrait = selectedKnife
  logAction('Selection readback', { selectedItemId: selectedKnife })

  await clickHotspot(page, 'atticPortrait
