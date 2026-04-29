<template>
  <section class="section final-cta" aria-label="Call to action final">
    <div class="cta-orb cta-orb--a" aria-hidden="true" />
    <div class="cta-orb cta-orb--b" aria-hidden="true" />
    <div class="cta-orb cta-orb--c" aria-hidden="true" />

    <!-- Pulse rings -->
    <div class="pulse-wrap" aria-hidden="true">
      <span v-for="i in 3" :key="i" class="pulse-ring" :style="{ animationDelay: `${(i - 1) * 0.8}s` }" />
    </div>

    <div class="site-max cta-content">
      <div class="cta-badge rv">
        <span class="dot" aria-hidden="true" />
        <span class="mono">Sistema ao vivo</span>
      </div>

      <h2 class="cta-h2 rv" data-d="1">
        Pronto para ter uma IA<br />que realmente te conhece?
      </h2>

      <p class="cta-sub rv" data-d="2">
        Implementação remota. Sem enrolação. Pronto em 1 hora.
      </p>

      <div class="cta-actions rv" data-d="3">
        <a
          href="https://hub.la/r/bio-nova"
          target="_blank"
          rel="noopener"
          class="btn btn--xl btn--primary pulse-btn"
        >
          Ativar meu Segundo Cérebro · R$37 →
        </a>
      </div>

      <div class="cta-trust rv" data-d="4">
        <span>✓ Implementação remota</span>
        <span>✓ Suporte incluso</span>
        <span>✓ Funciona no plano gratuito do Claude</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGSAP } from '~/composables/useGSAP'

const { revealOnScroll } = useGSAP()
revealOnScroll('.final-cta .rv', { stagger: 0.1 })
</script>

<style scoped>
.final-cta {
  position: relative;
  overflow: hidden;
  text-align: center;
  border-top: 1px solid var(--border);
}

/* Gradient orbs */
.cta-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(150px);
}

.cta-orb--a {
  width: 700px; height: 700px;
  background: rgba(108, 92, 231, 0.22);
  top: -40%; left: 5%;
  animation: orbFloat 22s ease-in-out infinite;
}

.cta-orb--b {
  width: 560px; height: 560px;
  background: rgba(0, 212, 170, 0.16);
  top: 10%; left: 50%;
  animation: orbFloat2 19s ease-in-out infinite 4s;
}

.cta-orb--c {
  width: 360px; height: 360px;
  background: rgba(139, 127, 240, 0.18);
  top: 45%; left: 35%;
  animation: orbFloat 17s ease-in-out infinite 2s;
}

/* Pulse rings */
.pulse-wrap {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.pulse-ring {
  position: absolute;
  width: 380px;
  height: 380px;
  border: 1px solid rgba(108, 92, 231, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulseExpand 3s ease-out infinite;
}

@keyframes pulseExpand {
  0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(0, 212, 170, 0.08);
  border: 1px solid rgba(0, 212, 170, 0.2);
  font-size: 11px;
  color: var(--mint);
  letter-spacing: 0.08em;
  margin-bottom: 32px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  animation: pulseGlow 1.5s ease-in-out infinite;
}

.cta-h2 {
  font-size: clamp(32px, 5vw, 60px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--fg);
  margin-bottom: 20px;
}

.cta-sub {
  font-size: clamp(15px, 2vw, 18px);
  color: var(--fg2);
  margin-bottom: 40px;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
}

.pulse-btn {
  animation: subtlePulse 3s ease-in-out infinite;
}

@keyframes subtlePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.4); }
  50%       { box-shadow: 0 0 0 12px rgba(108, 92, 231, 0); }
}

.cta-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  font-size: 13px;
  color: var(--fg3);
}

@keyframes orbFloat  { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes orbFloat2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(14px); } }
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(0, 212, 170, 0); }
}
</style>
