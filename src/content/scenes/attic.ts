import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const atticScene: SceneConfig = {
  id: 'attic',
  title: 'Locked Attic',
  background: 'backgrounds/attic.png',
  startActions: [{ type: 'showText', text: TEXT_ASSETS.attic.intro }],
  flagsInitial: {
    attic_trunk_locked_active: true,
    attic_trunk_opened_active: false,
  },
  hotspots: [
    {
      id: 'attic_trunk_locked',
      label: 'Trunk',
      rect: { x: 140, y: 275, w: 300, h: 135 },
      requireFlag: 'attic_trunk_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.attic.trunkHint }],
      onUse: {
        accepts: ['attic_key'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.attic.trunkUseKeySuccess },
          { type: 'showText', text: TEXT_ASSETS.attic.trunkUseKeySuccessGuide },
          { type: 'addItem', itemId: 'knife', name: 'Knife' },
          { type: 'removeItem', itemId: 'attic_key' },
          { type: 'setFlag', flag: 'attic_trunk_locked_active', value: false },
          { type: 'setFlag', flag: 'attic_trunk_opened_active', value: true },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.attic.trunkUseKeyFail },
          { type: 'showText', text: TEXT_ASSETS.attic.trunkUseKeyFailGuide },
        ],
      },
    },
    {
      id: 'attic_trunk_opened',
      label: 'Trunk',
      rect: { x: 140, y: 275, w: 300, h: 135 },
      requireFlag: 'attic_trunk_opened_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.attic.trunkOpened }],
    },
    {
      id: 'attic_portrait_unburned',
      label: 'Portrait',
      rect: { x: 560, y: 80, w: 320, h: 400 },
      requireFlag: 'page_unburned',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.attic.portraitPressureUnburned },
      ],
      onUse: {
        accepts: ['knife'],
        success: [
          { type: 'changeBackground', background: 'backgrounds/attic_slashed.png' },
          { type: 'showText', text: TEXT_ASSETS.attic.knifeEnding },
          { type: 'end', text: TEXT_ASSETS.attic.endingConfession },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFail },
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFailGuide },
        ],
      },
    },
    {
      id: 'attic_portrait_burned',
      label: 'Portrait',
      rect: { x: 560, y: 80, w: 320, h: 400 },
      requireFlag: 'page_burned',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.attic.portraitPressureBurned },
      ],
      onUse: {
        accepts: ['knife'],
        success: [
          { type: 'changeBackground', background: 'backgrounds/attic_slashed.png' },
          { type: 'showText', text: TEXT_ASSETS.attic.knifeEnding },
          { type: 'end', text: TEXT_ASSETS.attic.endingHypocrisy },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFail },
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFailGuide },
        ],
      },
    },
    {
      id: 'attic_exit_leave',
      label: 'Exit Leave',
      rect: { x: 0, y: 90, w: 80, h: 295 },
      onClick: [{ type: 'end', text: TEXT_ASSETS.attic.leaveEnding }],
    },
  ],
}
