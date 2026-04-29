<template>
  <section id="pricing" class="section pricing" aria-label="Investimento">
    <!-- Ambient glow -->
    <div class="pricing__glow" aria-hidden="true" />

    <div class="site-max pricing__inner">
      <div class="section-header rv">
        <span class="tag tag--teal mono">Investimento único</span>
        <h2 class="section-h2 rv" data-d="1">
          Ative seu Segundo Cérebro<br />agora mesmo
        </h2>
        <p class="section-sub rv" data-d="2">
          Implementação remota. Sem assinatura. Pronto em 1 hora.
        </p>
      </div>

      <!-- Price card -->
      <div class="price-card rv-scale">
        <!-- Top accent line -->
        <div class="price-card__accent" aria-hidden="true" />

        <!-- What's included -->
        <ul class="price-card__features">
          <li v-for="f in features" :key="f.text">
            <span class="feat-dot" :style="{ background: f.color }" aria-hidden="true" />
            <span>{{ f.text }}</span>
          </li>
        </ul>

        <div class="price-card__divider" aria-hidden="true" />

        <!-- Price display -->
        <div class="price-card__price">
          <span class="price-card__from mono">de <s>R$197</s> por apenas</span>
          <div class="price-card__value">
            <span class="price-card__currency">R$</span>
            <span class="price-card__number">37</span>
          </div>
          <span class="price-card__note mono">// pagamento único · acesso vitalício</span>
        </div>

        <!-- CTA -->
        <a
          href="https://hub.la/r/bio-nova"
          target="_blank"
          rel="noopener"
          class="btn btn--xl btn--primary price-card__cta"
        >
          Quero meu Segundo Cérebro →
        </a>

        <!-- Trust line -->
        <p class="price-card__trust mono">
          // IMPLEMENTAÇÃO REMOTA · SUPORTE INCLUSO · SEM ASSINATURA
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGSAP } from '~/composables/useGSAP'

const features = [
  { text: 'Contexto permanente injetado no Claude / ChatGPT', color: 'var(--accent-l)' },
  { text: 'Tom de voz, projetos e objetivos configurados',      color: 'var(--accent-l)' },
  { text: 'Agentes autônomos prontos para operar',              color: 'var(--mint)' },
  { text: 'Memória infinita — nunca comece do zero',            color: 'var(--mint)' },
  { text: 'Guia de uso + suporte pós-entrega',                  color: 'var(--fg3)' },
]

const { revealOnScroll } = useGSAP()
revealOnScroll('#pricing .rv', { stagger: 0.1 })
</script>

<style scoped>
.pricing {
  border-top: 1px solid var(--border);
}

.pricing__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(108, 92, 231, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.pricing__inner {
  max-width: 600px;
}

/* Card */
.price-card {
  position: relative;
  margin-top: 56px;
  padding: 48px 40px;
  border-radius: 24px;
  background: var(--elevated);
  border: 1px solid rgba(108, 92, 231, 0.2);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(108, 92, 231, 0.1) inset;
  overflow: hidden;
}

@media (max-width: 480px) {
  .price-card { padding: 32px 20px; }
}

.price-card__accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), var(--mint), transparent);
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}

/* Features */
.price-card__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}

.price-card__features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--fg2);
}

.feat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px currentColor;
}

.price-card__divider {
  height: 1px;
  background: var(--border);
  margin-bottom: 32px;
}

/* Price */
.price-card__price {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  text-align: center;
}

.price-card__from {
  font-size: 13px;
  color: var(--fg3);
  letter-spacing: 0.04em;
}

.price-card__from s {
  color: var(--fg4);
  text-decoration: line-through;
}

.price-card__value {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  line-height: 1;
}

.price-card__currency {
  font-size: 28px;
  font-weight: 700;
  color: var(--fg2);
  margin-top: 10px;
}

.price-card__number {
  font-size: 96px;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: var(--fg);
  line-height: 1;
}

.price-card__note {
  font-size: 11px;
  color: var(--fg4);
  letter-spacing: 0.08em;
}

/* CTA */
.price-card__cta {
  width: 100%;
  justify-content: center;
  font-size: 16px;
  padding: 18px 32px;
  border-radius: 12px;
  margin-bottom: 16px;
  transition: box-shadow 300ms, transform 200ms var(--ease);
}

.price-card__cta:hover {
  box-shadow: 0 12px 40px rgba(108, 92, 231, 0.55);
  transform: translateY(-2px);
}

.price-card__trust {
  text-align: center;
  font-size: 10px;
  color: var(--fg4);
  letter-spacing: 0.06em;
}
</style>
