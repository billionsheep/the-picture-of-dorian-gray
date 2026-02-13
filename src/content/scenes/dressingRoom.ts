import type { SceneConfig } from '../../game/core/schema'
import { TEXT_ASSETS } from '../textAssets'

export const dressingRoomScene: SceneConfig = {
  id: 'dressingRoom',
  title: 'Theatre Dressing Room',
  startActions: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.intro }],
  flagsInitial: {
    attic_key: false,
    page_burned: false,
    page_unburned: true,
    ashtray_burned: false,

    playbill_first_active: true,
    playbill_repeat_active: false,

    lockbox_locked_active: true,
    lockbox_opened_active: false,

    trunk_locked_active: true,
    trunk_opened_active: false,

    dressing_exit_locked_active: true,
  },
  hotspots: [
    {
      id: 'playbill_first',
      label: 'Playbill',
      rect: { x: 130, y: 120, w: 180, h: 130 },
      requireFlag: 'playbill_first_active',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.dressingRoom.playbillFirst },
        { type: 'setFlag', flag: 'playbill_first_active', value: false },
        { type: 'setFlag', flag: 'playbill_repeat_active', value: true },
      ],
    },
    {
      id: 'playbill_repeat',
      label: 'Playbill',
      rect: { x: 130, y: 120, w: 180, h: 130 },
      requireFlag: 'playbill_repeat_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.playbillRepeat }],
    },
    {
      id: 'ashtray_unburned',
      label: 'Ashtray',
      rect: { x: 500, y: 120, w: 140, h: 110 },
      requireFlag: 'page_unburned',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.ashtrayHint }],
      onUse: {
        accepts: ['yellow_page'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.ashtrayUsePageSuccess },
          { type: 'setFlag', flag: 'page_burned', value: true },
          { type: 'setFlag', flag: 'page_unburned', value: false },
          { type: 'setFlag', flag: 'ashtray_burned', value: true },
          { type: 'removeItem', itemId: 'yellow_page' },
        ],
        fail: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.ashtrayUsePageFail }],
      },
    },
    {
      id: 'ashtray_burned',
      label: 'Ashtray',
      rect: { x: 500, y: 120, w: 140, h: 110 },
      requireFlag: 'ashtray_burned',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.ashtrayAfterBurned }],
    },
    {
      id: 'lockbox_locked',
      label: 'Lockbox',
      rect: { x: 380, y: 290, w: 180, h: 120 },
      requireFlag: 'lockbox_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.lockboxHint }],
      onUse: {
        accepts: ['code_1230'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.lockboxUseCodeSuccess },
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.lockboxUseCodeSuccessGuide },
          { type: 'addItem', itemId: 'attic_key', name: '阁楼钥匙' },
          { type: 'setFlag', flag: 'attic_key', value: true },
          { type: 'setFlag', flag: 'lockbox_locked_active', value: false },
          { type: 'setFlag', flag: 'lockbox_opened_active', value: true },
          { type: 'setFlag', flag: 'dressing_exit_locked_active', value: false },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.lockboxUseCodeFail },
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.lockboxUseCodeFailGuide },
        ],
      },
    },
    {
      id: 'lockbox_opened',
      label: 'Lockbox',
      rect: { x: 380, y: 290, w: 180, h: 120 },
      requireFlag: 'lockbox_opened_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.lockboxOpened }],
    },
    {
      id: 'costume_trunk_locked',
      label: 'Costume Trunk',
      rect: { x: 620, y: 300, w: 220, h: 140 },
      requireFlag: 'trunk_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.trunkHint }],
      onUse: {
        accepts: ['hook'],
        success: [
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.trunkUseHookSuccess },
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.trunkUseHookSuccessGuide },
          { type: 'addItem', itemId: 'yellow_page', name: '黄色书页' },
          { type: 'setFlag', flag: 'trunk_locked_active', value: false },
          { type: 'setFlag', flag: 'trunk_opened_active', value: true },
        ],
        fail: [
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.trunkUseHookFail },
          { type: 'showText', text: TEXT_ASSETS.dressingRoom.trunkUseHookFailGuide },
        ],
      },
    },
    {
      id: 'costume_trunk_opened',
      label: 'Costume Trunk',
      rect: { x: 620, y: 300, w: 220, h: 140 },
      requireFlag: 'trunk_opened_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.trunkOpened }],
    },
    {
      id: 'dressing_exit_locked',
      label: 'Exit',
      rect: { x: 18, y: 210, w: 70, h: 170 },
      requireFlag: 'dressing_exit_locked_active',
      onClick: [{ type: 'showText', text: TEXT_ASSETS.dressingRoom.exitLocked }],
    },
    {
      id: 'dressing_exit_attic',
      label: 'Exit',
      rect: { x: 18, y: 210, w: 70, h: 170 },
      requireFlag: 'attic_key',
      onClick: [
        { type: 'showText', text: TEXT_ASSETS.dressingRoom.exitToAttic },
        { type: 'gotoScene', sceneId: 'attic' },
      ],
    },
  ],
}
