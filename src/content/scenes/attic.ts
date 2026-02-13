import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const atticScene: SceneConfig = {
  id: 'attic',
  title: 'Locked Attic',
  startActions: [{ type: 'showText', text: TEXT_ASSETS.attic.intro }],
  flagsInitial: {
    attic_trunk_locked_active: true,
    attic_trunk_opened_active: false,

    portrait_hotspot_active: true,
    portrait_knife_active: true,
  },
  hotspots: [
    {
      id: 'attic_trunk_locked',
      label: 'Trunk',
      rect: { x: 120, y: 300, w: 240, h: 150 },
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
      rect: { x: 120, y: 300, w: 240, h: 150 },
      requireFlag: 'attic_trunk_opened_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.attic.trunkOpened }],
    },
    {
      id: 'attic_portrait',
      label: 'Portrait',
      rect: { x: 610, y: 120, w: 250, h: 300 },
      requireFlag: 'portrait_hotspot_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.attic.portraitPressure }],
    },
    {
      id: 'attic_portrait_knife_unburned',
      label: 'Portrait Knife',
      rect: { x: 610, y: 430, w: 250, h: 70 },
      requireFlag: 'page_unburned',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.attic.portraitKnifePrompt }],
      onUse: {
        accepts: ['knife'],
        success: [{ type: 'end', text: TEXT_ASSETS.attic.endingConfession }],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFail },
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFailGuide },
        ],
      },
    },
    {
      id: 'attic_portrait_knife_burned',
      label: 'Portrait Knife',
      rect: { x: 610, y: 430, w: 250, h: 70 },
      requireFlag: 'page_burned',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.attic.portraitKnifePrompt }],
      onUse: {
        accepts: ['knife'],
        success: [{ type: 'end', text: TEXT_ASSETS.attic.endingHypocrisy }],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFail },
          { type: 'showText', text: TEXT_ASSETS.attic.portraitKnifeFailGuide },
        ],
      },
    },
    {
      id: 'attic_exit_leave',
      label: 'Exit Leave',
      rect: { x: 18, y: 210, w: 70, h: 170 },
      onClick: [{ type: 'end', text: TEXT_ASSETS.attic.leaveEnding }],
    },
  ],
}
