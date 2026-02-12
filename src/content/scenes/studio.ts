import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const studioScene: SceneConfig = {
  id: 'studio',
  title: 'Basil Studio',
  flagsInitial: {
    drawer_open: false,
  },
  hotspots: [
    {
      id: 'letter',
      label: 'Letter',
      rect: { x: 84, y: 350, w: 180, h: 120 },
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.letter },
        { type: 'addItem', itemId: 'code_1230', name: '密码：12:30' },
      ],
    },
    {
      id: 'drawer',
      label: 'Drawer',
      rect: { x: 374, y: 328, w: 210, h: 150 },
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.drawerLocked }],
      onUse: {
        accepts: ['code_1230'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.studio.drawerUnlocked },
          { type: 'addItem', itemId: 'hook', name: '挂钩' },
          { type: 'setFlag', flag: 'drawer_open', value: true },
        ],
        fail: [{ type: 'showText', text: TEXT_ASSETS.studio.useFail }],
      },
    },
    {
      id: 'portrait',
      label: 'Portrait',
      rect: { x: 656, y: 120, w: 220, h: 300 },
      requireFlag: 'drawer_open',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.portraitOpen },
        { type: 'end', text: TEXT_ASSETS.studio.end },
      ],
    },
  ],
}
