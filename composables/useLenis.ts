import { onMounted, onUnmounted } from 'vue'

let lenisInstance: any = null
let rafId: number | null = null
let started = false

export function useLenis() {
  onMounted(async () => {
    if (started) return
    started = true

    const { default: Lenis } = await import('lenis')

    // Lenis v1.x API — usa lerp em vez de duration/easing
    lenisInstance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // RAF loop simples — sem dependência do GSAP aqui
    function raf(time: number) {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    lenisInstance?.destroy()
    lenisInstance = null
    started = false
  })

  return {
    getInstance: () => lenisInstance,
  }
}
