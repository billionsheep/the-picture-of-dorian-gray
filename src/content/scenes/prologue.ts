import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const prologueScene: SceneConfig = {
  id: 'prologue',
  title: 'Prologue',
  startActions: [
    { type: 'showText', text: TEXT_ASSETS.prologue.part1 },
    { type: 'showText', text: TEXT_ASSETS.prologue.part2 },
    { type: 'showText', text: TEXT_ASSETS.prologue.part3 },
    { type: 'showText', text: TEXT_ASSETS.prologue.part4 },
    { type: 'showText', text: TEXT_ASSETS.prologue.part5 },
    { type: 'gotoScene', sceneId: 'studio' },
  ],
  hotspots: [],
}
