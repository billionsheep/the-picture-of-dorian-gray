import type { SceneConfig } from './schema'
import { studioScene } from '../../content/scenes/studio'

const sceneRegistry: Record<string, SceneConfig> = {
  studio: studioScene,
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
