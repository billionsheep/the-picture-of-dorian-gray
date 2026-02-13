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
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#000000',
  scene: [PlayScene],
})
