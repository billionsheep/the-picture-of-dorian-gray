import type { SceneConfig } from '../../game/core/schema'

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
  ],
}
