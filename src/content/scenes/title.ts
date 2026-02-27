import type { SceneConfig } from '../../game/core/schema'

export const titleScene: SceneConfig = {
  id: 'title',
  title: 'The Picture of Dorian Gray',
  background: 'backgrounds/title.png',
  bgm: 'audio/backgroundmusic.ogg',
  bgmOffset: 20,
  hotspots: [
    {
      id: 'title_start',
      label: 'Start',
      style: 'button',
      rect: { x: 300, y: 200, w: 360, h: 90 },
      onClick: [{ type: 'gotoScene', sceneId: 'prologue' }],
    },
  ],
}
