import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const titleScene: SceneConfig = {
  id: 'title',
  title: 'The Picture of Dorian Gray',
  hotspots: [
    {
      id: 'title_start',
      label: 'Start',
      rect: { x: 300, y: 200, w: 360, h: 90 },
      onClick: [{ type: 'gotoScene', sceneId: 'prologue' }],
    },
    {
      id: 'title_settings',
      label: 'Settings',
      rect: { x: 300, y: 320, w: 360, h: 90 },
      onClick: [{ type: 'showText', text: TEXT_ASSETS.title.settingsPlaceholder }],
    },
  ],
}
