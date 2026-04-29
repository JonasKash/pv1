import { watch } from 'vue'
import { useAppStore } from '~/stores/app'

let ambientSound: any = null
let clickSound: any = null
let hoverSound: any = null
let howlerLoaded = false

async function loadHowler() {
  if (howlerLoaded) return
  await import('howler')
  howlerLoaded = true
}

export function useAudio() {
  const store = useAppStore()

  async function init() {
    await loadHowler()
    const { Howl } = (window as any).Howler ? (window as any) : await import('howler')

    if (!ambientSound) {
      // Ambient drone — replace /audio/ambient.mp3 with your file
      ambientSound = new Howl({
        src: ['/audio/ambient.mp3'],
        loop: true,
        volume: 0.08,
        html5: true,
        preload: false,
      })
    }

    if (!clickSound) {
      clickSound = new Howl({
        src: ['/audio/click.mp3'],
        volume: 0.35,
        preload: false,
      })
    }

    if (!hoverSound) {
      hoverSound = new Howl({
        src: ['/audio/hover.mp3'],
        volume: 0.15,
        preload: false,
      })
    }

    // React to store.soundEnabled
    watch(
      () => store.soundEnabled,
      (enabled) => {
        if (enabled) {
          ambientSound.load()
          ambientSound.play()
        } else {
          ambientSound.fade(0.08, 0, 800)
          setTimeout(() => ambientSound.pause(), 850)
        }
      },
      { immediate: true }
    )
  }

  function playClick() {
    if (!store.soundEnabled || !clickSound) return
    clickSound.play()
  }

  function playHover() {
    if (!store.soundEnabled || !hoverSound) return
    hoverSound.play()
  }

  return { init, playClick, playHover }
}
