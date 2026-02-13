import type { SceneConfig } from './schema'
import { studioScene } from '../../content/scenes/studio'
import { dressingRoomScene } from '../../content/scenes/dressingRoom'
import { atticScene } from '../../content/scenes/attic'

const sceneRegistry: Record<string, SceneConfig> = {
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
