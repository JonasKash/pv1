/**
 * Theatre.js integration for cinematic animation sequencing.
 * In development: @theatre/studio UI is injected for visual editing.
 * In production: only @theatre/core is bundled.
 *
 * Usage:
 *   const { sheet, onReady } = useTheatre('Hero')
 *   onReady((sheet) => {
 *     const obj = sheet.object('Orb', { opacity: 0, scale: 1 })
 *     obj.onValuesChange(({ opacity, scale }) => {
 *       myEl.style.opacity = String(opacity)
 *     })
 *     sheet.sequence.play({ iterationCount: 1 })
 *   })
 */
import { ref, onMounted, onUnmounted } from 'vue'

type TheatreSheet = any
type ReadyCallback = (sheet: TheatreSheet) => void

let projectCache: any = null

export function useTheatre(sheetName: string) {
  const sheet = ref<TheatreSheet | null>(null)
  const callbacks: ReadyCallback[] = []
  let destroyed = false

  onMounted(async () => {
    if (destroyed) return

    try {
      const { getProject } = await import('@theatre/core')

      if (!projectCache) {
        projectCache = getProject('Avestra Landing', {
          experiments: { pointer: true },
        })

      }

      const s = projectCache.sheet(sheetName)
      sheet.value = s

      callbacks.forEach(cb => cb(s))
    } catch (e) {
      console.warn('[Theatre.js] Failed to initialize:', e)
    }
  })

  onUnmounted(() => {
    destroyed = true
  })

  function onReady(cb: ReadyCallback) {
    if (sheet.value) {
      cb(sheet.value)
    } else {
      callbacks.push(cb)
    }
  }

  return { sheet, onReady }
}
