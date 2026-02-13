import type { SceneConfig } from './schema'
import { titleScene } from '../../content/scenes/title'
import { prologueScene } from '../../content/scenes/prologue'
import { studioScene } from '../../content/scenes/studio'
import { dressingRoomScene } from '../../content/scenes/dressingRoom'
import { atticScene } from '../../content/scenes/attic'

const sceneRegistry: Record<string, SceneConfig> = {
  title: titleScene,
  prologue: prologueScene,
  studio: studioScene,
  dressingRoom: dressingRoomScene,
  attic: atticScene,
}

export class SceneLoader {
  load(sceneId: string): SceneConfig {
    const config = sceneRegistry[sceneId]

    if (!config) {
      throw new Error(`Scene not found: ${sceneId}`)
    }

    return config
  }
}
