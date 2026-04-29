import { onMounted, onUnmounted, type Ref } from 'vue'

let _gsap: any = null
let _ScrollTrigger: any = null
let _SplitText: any = null
let _initPromise: Promise<void> | null = null

export function useGSAP() {
  async function init() {
    if (_initPromise) return _initPromise
    
    _initPromise = (async () => {
      if (typeof window === 'undefined') return
      
      const gsapModule = await import('gsap')
      _gsap = gsapModule.gsap ?? gsapModule.default

      const stModule = await import('gsap/ScrollTrigger')
      _ScrollTrigger = stModule.ScrollTrigger

      if (_gsap && _ScrollTrigger) {
        _gsap.registerPlugin(_ScrollTrigger)
      }
    })()

    return _initPromise
  }

  // Reveal elements on scroll with a simple batch
  function revealOnScroll(selector: string, options?: { y?: number; stagger?: number; delay?: number }) {
    onMounted(async () => {
      await init()
      const { y = 40, stagger = 0.08, delay = 0 } = options ?? {}

      _gsap.fromTo(
        selector,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: selector,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }

  // Horizontal text marquee
  function marquee(el: Ref<HTMLElement | null>, speed = 30) {
    onMounted(async () => {
      await init()
      if (!el.value) return
      _gsap.to(el.value, {
        xPercent: -50,
        ease: 'none',
        duration: speed,
        repeat: -1,
      })
    })
  }

  // Split-text word reveal (uses IntersectionObserver for performance)
  function wordReveal(el: Ref<HTMLElement | null>, baseDelay = 0) {
    onMounted(async () => {
      await init()
      if (!el.value) return

      const words = el.value.querySelectorAll<HTMLElement>('.word-in span')
      _gsap.fromTo(
        words,
        { opacity: 0, yPercent: 60, skewY: 4 },
        {
          opacity: 1,
          yPercent: 0,
          skewY: 0,
          duration: 0.85,
          ease: 'power4.out',
          stagger: 0.06,
          delay: baseDelay,
          scrollTrigger: {
            trigger: el.value,
            start: 'top 80%',
          },
        }
      )
    })
  }

  // Pin a section while animating child timeline
  function pinSection(trigger: string, animation: () => gsap.core.Timeline) {
    onMounted(async () => {
      await init()
      const tl = animation()
      _ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        animation: tl,
      })
    })
  }

  function setupCursor() {
    onMounted(async () => {
      await init()

      const dot = document.getElementById('cursor-dot')
      const ring = document.getElementById('cursor-ring')
      if (!dot || !ring) return

      let mouseX = 0, mouseY = 0
      let ringX = 0, ringY = 0

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
        _gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' })
      })

      _gsap.ticker.add(() => {
        ringX += (mouseX - ringX) * 0.12
        ringY += (mouseY - ringY) * 0.12
        _gsap.set(ring, { x: ringX, y: ringY })
      })
    })
  }

  return {
    get gsap() { return _gsap },
    get ScrollTrigger() { return _ScrollTrigger },
    init,
    revealOnScroll,
    marquee,
    wordReveal,
    pinSection,
    setupCursor,
  }
}
