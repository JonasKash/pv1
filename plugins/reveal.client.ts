/**
 * IntersectionObserver plugin — adds .in to .rv / .rv-scale elements
 * as they enter the viewport, triggering CSS transitions.
 * Works alongside GSAP ScrollTrigger for more complex scenes.
 */
export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
  )

  // Observe existing elements and watch for new ones via MutationObserver
  function observe() {
    document.querySelectorAll('.rv, .rv-scale, .rv-left').forEach((el) => {
      if (!el.classList.contains('in')) observer.observe(el)
    })
  }

  observe()

  const mutation = new MutationObserver(observe)
  mutation.observe(document.body, { childList: true, subtree: true })
})
