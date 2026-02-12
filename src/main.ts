import Phaser from 'phaser'
import './style.css'
import { PlayScene } from './game/scenes/PlayScene'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Root container #app not found')
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: app,
  width: 960,
  height: 540,
  backgroundColor: '#000000',
  scene: [PlayScene],
})
