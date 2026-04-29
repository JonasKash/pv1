<template>
  <section class="hero" aria-label="Hero">
    <!-- Soft vignette so brain doesn't compete with copy -->
    <div class="hero__vignette" aria-hidden="true" />

    <!-- Ambient colour orbs (add atmosphere on top of the brain) -->
    <div class="orb orb--purple" aria-hidden="true" />
    <div class="orb orb--teal" aria-hidden="true" />

    <div class="site-max hero__content">
      <!-- Eyebrow -->
      <div ref="eyebrowRef" class="hero__eyebrow rv">
        <span class="mono tag tag--purple">Segundo Cérebro com IA</span>
      </div>

      <!-- Headline — each word wrapped for Theatre.js / GSAP reveal -->
      <h1 ref="headlineRef" class="hero__h1">
        <span
          v-for="(word, i) in headline"
          :key="i"
          class="word-in"
          :style="{ marginRight: '0.28em' }"
        >
          <span :data-word-index="i">{{ word }}</span>
        </span>
      </h1>

      <!-- Sub -->
      <p ref="subRef" class="hero__sub rv" data-d="2">
        Imagina a IA que já sabe quem você é — seus projetos, tom de voz e objetivos —
        antes de você digitar a primeira palavra.
      </p>

      <!-- Stats ticker -->
      <div ref="statsRef" class="hero__stats rv" data-d="3">
        <div class="stat">
          <span class="stat__val">3×</span>
          <span class="stat__label mono">Recall de marca</span>
        </div>
        <div class="stat__divider" aria-hidden="true" />
        <div class="stat">
          <span class="stat__val">+20%</span>
          <span class="stat__label mono">Top-of-mind</span>
        </div>
        <div class="stat__divider" aria-hidden="true" />
        <div class="stat">
          <span class="stat__val">1h</span>
          <span class="stat__label mono">Para ativar</span>
        </div>
      </div>

      <!-- CTAs -->
      <div ref="ctaRef" class="hero__ctas rv" data-d="4">
        <a
          href="https://hub.la/r/bio-nova"
          target="_blank"
          rel="noopener"
          class="btn btn--lg btn--primary"
        >
          Ativar meu Segundo Cérebro · R$37 →
        </a>
        <a href="#como-funciona" class="btn btn--ghost" @click.prevent="scrollDown">
          Ver como funciona
        </a>
      </div>

      <!-- Social proof -->
      <p ref="proofRef" class="hero__proof mono rv" data-d="5">
        // + 140 profissionais já ativaram · R$37 · entrega em 1 hora
      </p>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll-hint" aria-hidden="true">
      <span class="mono" style="font-size:10px;color:var(--fg4)">SCROLL</span>
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGSAP } from '~/composables/useGSAP'
import { useTheatre } from '~/composables/useTheatre'
import { useAppStore } from '~/stores/app'

const emit = defineEmits<{ (e: 'cta'): void }>()
const store = useAppStore()

const eyebrowRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const proofRef = ref<HTMLElement | null>(null)

const headline = 'Sua IA finalmente sabe quem você é'.split(' ')

function scrollDown() {
  document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
}

// ── GSAP entrance animations ──────────────────────────────────────
const { init, gsap } = useGSAP()

onMounted(async () => {
  await init()
  if (!gsap) return

  const tl = gsap.timeline({ delay: 0.2 })

  tl.from(eyebrowRef.value, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
    .from(
      headlineRef.value?.querySelectorAll('.word-in span') ?? [],
      { opacity: 0, yPercent: 60, skewY: 4, duration: 0.8, ease: 'power4.out', stagger: 0.07 },
      '-=0.3'
    )
    .from(subRef.value, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from(statsRef.value, { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .from(ctaRef.value, { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    .from(proofRef.value, { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')
})

// ── Theatre.js for orb choreography ──────────────────────────────
const { onReady } = useTheatre('Hero')

onReady((sheet) => {
  const orbObj = sheet.object('Orbs', {
    purpleX: 0,
    purpleY: 0,
    tealX: 0,
    tealY: 0,
    opacity: 1,
  })

  orbObj.onValuesChange(({ purpleX, purpleY, tealX, tealY, opacity }: any) => {
    const p = document.querySelector<HTMLElement>('.orb--purple')
    const t = document.querySelector<HTMLElement>('.orb--teal')
    if (p) { p.style.transform = `translate(${purpleX}px, ${purpleY}px)`; p.style.opacity = String(opacity) }
    if (t) { t.style.transform = `translate(${tealX}px, ${tealY}px)` }
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: transparent; /* cérebro aparece por baixo */
}

/* Dark radial vignette keeps text legible over the brain */
.hero__vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8,7,15,0) 20%, rgba(8,7,15,0.7) 100%),
    linear-gradient(to bottom, rgba(8,7,15,0.3) 0%, rgba(8,7,15,0) 30%, rgba(8,7,15,0) 70%, rgba(8,7,15,0.8) 100%);
  pointer-events: none;
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  padding-top: 100px;
  padding-bottom: 80px;
  max-width: 800px;
}

.hero__eyebrow {
  margin-bottom: 24px;
}

.hero__h1 {
  font-size: clamp(40px, 7vw, 88px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--fg);
  margin-bottom: 28px;
}

.hero__sub {
  font-size: clamp(16px, 2vw, 20px);
  color: var(--fg2);
  line-height: 1.7;
  max-width: 560px;
  margin-bottom: 40px;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat__val {
  font-size: 28px;
  font-weight: 900;
  color: var(--accent-l);
  letter-spacing: -0.03em;
}

.stat__label {
  font-size: 10px;
  color: var(--fg3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stat__divider {
  width: 1px;
  height: 36px;
  background: var(--border);
}

.hero__ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.hero__proof {
  font-size: 11px;
  color: var(--fg4);
  letter-spacing: 0.04em;
}

/* Gradient orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
  will-change: transform;
}

.orb--purple {
  width: 700px;
  height: 700px;
  background: radial-gradient(ellipse at center, rgba(108, 92, 231, 0.22) 0%, transparent 70%);
  top: -20%;
  left: -15%;
  animation: orbFloat 12s ease-in-out infinite;
}

.orb--teal {
  width: 500px;
  height: 500px;
  background: radial-gradient(ellipse at center, rgba(0, 212, 170, 0.14) 0%, transparent 70%);
  bottom: -10%;
  right: -5%;
  animation: orbFloat2 9s ease-in-out infinite;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-20px) scale(1.03); }
}

@keyframes orbFloat2 {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(14px) scale(0.97); }
}

/* Scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: fadeInUp 1s 1.8s both;
}

.hero__scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--fg4), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%   { opacity: 0.3; transform: scaleY(0.6) translateY(-8px); }
  50%  { opacity: 1;   transform: scaleY(1) translateY(0); }
  100% { opacity: 0.3; transform: scaleY(0.6) translateY(8px); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateX(-50%) translateY(16px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
</style>
