import { defineConfig } from 'vite'

const repoBase = '/the-picture-of-dorian-gray/'

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      base: repoBase,
    }
  }

  return {
    base: '/',
  }
})
