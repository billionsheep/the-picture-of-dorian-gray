import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const studioScene: SceneConfig = {
  id: 'studio',
  title: 'Basil Studio',
  background: 'backgrounds/studio.png',
  bgm: 'audio/backgroundmusic.ogg',
  bgmOffset: 20,
  startActions: [{ type: 'showText', text: TEXT_ASSETS.studio.intro }],
  flagsInitial: {
    drawer_open: false,
    has_ticket: false,
    curtain_lifted: false,

    letter_first_active: true,
    letter_repeat_active: false,

    drawer_locked_active: true,
    drawer_opened_active: false,

    portrait_locked_active: true,
    portrait_seen_active: false,

    exit_locked_active: true,
    exit_ready_active: false,

    mirror_first_active: true,
    mirror_repeat_active: false,

    clock_first_active: true,
    clock_repeat_active: false,

    paintbox_first_active: true,
    paintbox_repeat_active: false,

    ring_first_active: true,
    ring_repeat_active: false,

    window_first_active: true,
    window_repeat_active: false,
  },
  hotspots: [
    {
      id: 'letter_first',
      label: 'Letter',
      rect: { x: 290, y: 356, w: 188, h: 73 },
      requireFlag: 'letter_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.letterFirst },
        { type: 'addItem', itemId: 'code_1230', name: 'Time: 12:30' },
        { type: 'setFlag', flag: 'letter_first_active', value: false },
        { type: 'setFlag', flag: 'letter_repeat_active', value: true },
      ],
    },
    {
      id: 'letter_repeat',
      label: 'Letter',
      rect: { x: 290, y: 356, w: 188, h: 73 },
      requireFlag: 'letter_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.letterRepeat }],
    },
    {
      id: 'drawer_locked',
      label: 'Drawer',
      rect: { x: 309, y: 264, w: 316, h: 58 },
      requireFlag: 'drawer_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.drawerLocked }],
      onUse: {
        accepts: ['code_1230'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.studio.drawerUnlocked },
          { type: 'showText', text: TEXT_ASSETS.studio.drawerUnlockedGuide },
          { type: 'addItem', itemId: 'hook', name: 'Hook' },
          { type: 'addItem', itemId: 'theatre_ticket', name: 'Backstage Pass' },
          { type: 'setFlag', flag: 'has_ticket', value: true },
          { type: 'setFlag', flag: 'drawer_open', value: true },
          { type: 'setFlag', flag: 'drawer_locked_active', value: false },
          { type: 'setFlag', flag: 'drawer_opened_active', value: true },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.studio.drawerUseFail },
          { type: 'showText', text: TEXT_ASSETS.studio.drawerUseFailGuide },
        ],
      },
    },
    {
      id: 'drawer_opened',
      label: 'Drawer',
      rect: { x: 309, y: 264, w: 316, h: 58 },
      requireFlag: 'drawer_opened_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.drawerRepeatOpen }],
      onUse: {
        accepts: ['hook'],
        success: [{ type: 'showText', text: TEXT_ASSETS.studio.drawerOpenedUseHook }],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.studio.drawerOpenedUseOtherFail },
          { type: 'showText', text: TEXT_ASSETS.studio.drawerOpenedUseOtherGuide },
        ],
      },
    },
    {
      id: 'curtain_locked',
      label: 'Curtain',
      rect: { x: 708, y: 149, w: 181, h: 243 },
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.curtainLocked }],
      onUse: {
        accepts: ['hook'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.studio.curtainUseHookSuccess },
          { type: 'showText', text: TEXT_ASSETS.studio.curtainUseHookSuccessGuide },
          { type: 'setFlag', flag: 'curtain_lifted', value: true },
          { type: 'setFlag', flag: 'portrait_locked_active', value: false },
          { type: 'setFlag', flag: 'portrait_seen_active', value: true },
          { type: 'setFlag', flag: 'exit_locked_active', value: false },
          { type: 'setFlag', flag: 'exit_ready_active', value: true },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.studio.curtainUseHookFail },
          { type: 'showText', text: TEXT_ASSETS.studio.curtainUseHookFailGuide },
        ],
      },
    },
    {
      id: 'portrait_locked',
      label: 'Portrait',
      rect: { x: 766, y: 156, w: 176, h: 236 },
      requireFlag: 'portrait_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.portraitLocked }],
    },
    {
      id: 'portrait_seen',
      label: 'Portrait',
      rect: { x: 766, y: 156, w: 176, h: 236 },
      requireFlag: 'portrait_seen_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.portraitSeen }],
    },
    {
      id: 'exit_locked',
      label: 'Exit',
      rect: { x: 19, y: 92, w: 124, h: 384 },
      requireFlag: 'exit_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.exitLocked }],
    },
    {
      id: 'exit_to_theatre',
      label: 'Exit',
      rect: { x: 19, y: 92, w: 124, h: 384 },
      requireFlag: 'exit_ready_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.exitLocked }],
      onUse: {
        accepts: ['theatre_ticket'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.studio.exitToTheatre },
          { type: 'removeItem', itemId: 'theatre_ticket' },
          { type: 'gotoScene', sceneId: 'dressingRoom' },
        ],
        fail: [{ type: 'showText', text: TEXT_ASSETS.studio.exitLocked }],
      },
    },
    {
      id: 'mirror_first',
      label: 'Mirror',
      rect: { x: 221, y: 166, w: 46, h: 54 },
      requireFlag: 'mirror_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.mirrorFirst },
        { type: 'setFlag', flag: 'mirror_first_active', value: false },
        { type: 'setFlag', flag: 'mirror_repeat_active', value: true },
      ],
    },
    {
      id: 'mirror_repeat',
      label: 'Mirror',
      rect: { x: 221, y: 166, w: 46, h: 54 },
      requireFlag: 'mirror_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.mirrorRepeat }],
    },
    {
      id: 'clock_first',
      label: 'Clock',
      rect: { x: 448, y: 113, w: 64, h: 43 },
      requireFlag: 'clock_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.clockFirst },
        { type: 'setFlag', flag: 'clock_first_active', value: false },
        { type: 'setFlag', flag: 'clock_repeat_active', value: true },
      ],
    },
    {
      id: 'clock_repeat',
      label: 'Clock',
      rect: { x: 448, y: 113, w: 64, h: 43 },
      requireFlag: 'clock_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.clockRepeat }],
    },
    {
      id: 'paintbox_first',
      label: 'Paintbox',
      rect: { x: 517, y: 365, w: 143, h: 34 },
      requireFlag: 'paintbox_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.paintboxFirst },
        { type: 'setFlag', flag: 'paintbox_first_active', value: false },
        { type: 'setFlag', flag: 'paintbox_repeat_active', value: true },
      ],
    },
    {
      id: 'paintbox_repeat',
      label: 'Paintbox',
      rect: { x: 517, y: 365, w: 143, h: 34 },
      requireFlag: 'paintbox_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.paintboxRepeat }],
    },
    {
      id: 'ring_first',
      label: 'Ring',
      rect: { x: 534, y: 414, w: 20, h: 6 },
      requireFlag: 'ring_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.ringFirst },
        { type: 'setFlag', flag: 'ring_first_active', value: false },
        { type: 'setFlag', flag: 'ring_repeat_active', value: true },
      ],
    },
    {
      id: 'ring_repeat',
      label: 'Ring',
      rect: { x: 534, y: 414, w: 20, h: 6 },
      requireFlag: 'ring_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.ringRepeat }],
    },
    {
      id: 'window_first',
      label: 'Window',
      rect: { x: 772, y: 42, w: 116, h: 70 },
      requireFlag: 'window_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.studio.windowFirst },
        { type: 'setFlag', flag: 'window_first_active', value: false },
        { type: 'setFlag', flag: 'window_repeat_active', value: true },
      ],
    },
    {
      id: 'window_repeat',
      label: 'Window',
      rect: { x: 772, y: 42, w: 116, h: 70 },
      requireFlag: 'window_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.studio.windowRepeat }],
    },
  ],
}
