<template>
  <section id="tecnologia" class="section section--dark" aria-label="Tecnologia">
    <!-- Scan beam overlay -->
    <div class="scan-beam" aria-hidden="true" />
    <div class="mesh-dots" aria-hidden="true" />

    <div class="site-max">
      <div class="section-header">
        <span class="tag tag--purple mono rv">Por trás do sistema</span>
        <h2 class="section-h2 rv" data-d="1">Infraestrutura do Segundo Cérebro</h2>
        <p class="section-sub rv" data-d="2">
          Organização inteligente que conecta você à IA de forma permanente.
        </p>
      </div>

      <!-- 3-stage diagram -->
      <div class="tech-diagram">

        <!-- Stage 1: Input -->
        <div :class="['stage', { 'stage--active': active >= 1 }]">
          <div class="stage__orbit" aria-hidden="true" />
          <div class="stage__core">
            <span class="mono stage__label">INPUT</span>
            <img src="/logo-mark.svg" width="32" alt="" />
          </div>
          <div
            v-for="i in 6"
            :key="i"
            class="orbit-icon"
            :style="{ animationDelay: `-${(i - 1) * 3.33}s` }"
            aria-hidden="true"
          />
        </div>

        <!-- Connector -->
        <div class="tech-connector" aria-hidden="true">
          <div class="connector-line" />
          <span class="connector-arrow">→</span>
        </div>

        <!-- Stage 2: Core engine -->
        <div :class="['stage-card', { 'stage-card--active': active >= 2 }]">
          <div class="stage-card__scan" aria-hidden="true" />
          <div class="stage-card__header">
            <div class="status-dot" :class="active === 2 ? 'status-dot--on' : ''" />
            <span class="mono status-label">{{ active === 2 ? 'SYNC_ACTIVE' : 'IDLE' }}</span>
            <span class="version-badge mono">CORE_v4.2</span>
          </div>
          <div
            v-for="row in progressRows"
            :key="row.label"
            class="progress-row"
          >
            <div class="progress-row__meta">
              <span>{{ row.label }}</span>
              <span class="mono progress-pct">{{ active === 2 ? `${row.pct}%` : '' }}</span>
            </div>
            <div class="progress-track">
              <div
                class="progress-fill"
                :style="{ width: active === 2 ? `${row.pct}%` : '0%' }"
              />
            </div>
          </div>
          <div class="active-badge">
            <span class="active-badge__dot">✓</span>
            <span class="mono">Seu Segundo Cérebro Ativo</span>
          </div>
        </div>

        <!-- Connector -->
        <div class="tech-connector" aria-hidden="true">
          <div class="connector-line" />
          <span class="connector-arrow">→</span>
        </div>

        <!-- Stage 3: Output -->
        <div :class="['stage stage--output', { 'stage--active': active === 3 }]">
          <div class="mono stage__label stage__label--sm">LIVE_OUTPUT</div>
          <div class="output-grid">
            <div v-for="out in outputs" :key="out.label" class="output-item">
              <span class="mono output-label">{{ out.label }}</span>
              <span class="output-val">{{ out.val }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGSAP } from '~/composables/useGSAP'

const active = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const progressRows = [
  { label: 'Organização de Contexto', pct: 100 },
  { label: 'Mapeamento de Projetos',   pct: 85  },
  { label: 'Conexão com IA',           pct: 60  },
  { label: 'Ativação do Cérebro',      pct: 20  },
]

const outputs = [
  { label: 'PROMPT',   val: 'Contextualizado' },
  { label: 'RESPOSTA', val: 'Personalizada'   },
  { label: 'MEMÓRIA',  val: 'Atualizada'      },
  { label: 'SCORE',    val: '9.8 / 10'        },
]

onMounted(() => {
  const section = document.getElementById('tecnologia')
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && active.value === 0) {
        startSequence()
      }
    },
    { threshold: 0.3 }
  )
  if (section) observer.observe(section)
  onUnmounted(() => observer.disconnect())
})

function startSequence() {
  active.value = 1
  timer = setInterval(() => {
    active.value = active.value < 3 ? active.value + 1 : 1
  }, 2800)
}

onUnmounted(() => { if (timer) clearInterval(timer) })

const { revealOnScroll } = useGSAP()
revealOnScroll('#tecnologia .rv', { stagger: 0.1 })
</script>

<style scoped>
.section--dark {
  background: rgba(8, 7, 15, 0.82);
  border-top: 1px solid var(--border);
}

/* Scan beam */
.scan-beam {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(108, 92, 231, 0.4), transparent);
  animation: scanMove 4s ease-in-out infinite;
}

@keyframes scanMove {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.mesh-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(108, 92, 231, 0.12) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.3;
  pointer-events: none;
}

/* Tech diagram layout */
.tech-diagram {
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: relative;
}

@media (min-width: 900px) {
  .tech-diagram {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
    min-height: 460px;
  }
}

/* Stage bubbles */
.stage {
  width: 220px;
  height: 220px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.35;
  transition: opacity 0.5s;
}

.stage--active { opacity: 1; }

.stage__orbit {
  position: absolute;
  inset: 0;
  border: 2px dashed var(--border-a);
  border-radius: 50%;
  animation: spinCW 30s linear infinite;
}

.stage__core {
  width: 90px;
  height: 90px;
  background: var(--surface);
  border: 2px solid var(--accent);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 0 40px rgba(108, 92, 231, 0.3);
  z-index: 2;
}

.stage__label {
  font-size: 10px;
  font-weight: 800;
  color: var(--accent-l);
  letter-spacing: 0.1em;
}

.orbit-icon {
  position: absolute;
  width: 36px;
  height: 36px;
  background: var(--elevated);
  border: 1px solid var(--border);
  border-radius: 10px;
  animation: iconOrbit 20s linear infinite;
}

/* Stage card (middle) */
.stage-card {
  width: 100%;
  max-width: 400px;
  background: rgba(15, 14, 28, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  position: relative;
  overflow: hidden;
  opacity: 0.4;
  transition: opacity 0.5s, border-color 0.5s, box-shadow 0.5s;
}

.stage-card--active {
  border-color: var(--accent);
  opacity: 1;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
}

.stage-card__scan {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: scanMove 3s infinite;
}

.stage-card__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #555;
}

.status-dot--on {
  background: var(--mint);
  animation: pulseGlow 1.5s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(0, 212, 170, 0); }
}

.status-label {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  flex: 1;
}

.version-badge {
  padding: 4px 10px;
  background: var(--accent-dim);
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  color: var(--accent-l);
}

.progress-row {
  margin-bottom: 16px;
}

.progress-row__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--fg2);
}

.progress-pct { color: var(--accent-l); }

.progress-track {
  height: 4px;
  background: var(--elevated);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  border-radius: 2px;
  transition: width 2s ease-out;
}

.active-badge {
  margin-top: 20px;
  padding: 14px 16px;
  background: rgba(0, 212, 170, 0.06);
  border: 1px solid rgba(0, 212, 170, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--mint);
}

.active-badge__dot {
  width: 20px;
  height: 20px;
  background: var(--mint);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 11px;
}

/* Output stage */
.stage--output {
  width: 220px;
  height: auto;
  flex-direction: column;
  gap: 16px;
}

.stage__label--sm { font-size: 10px; letter-spacing: 0.15em; color: var(--fg3); }

.output-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.output-item {
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.output-label { font-size: 9px; color: var(--fg3); letter-spacing: 0.1em; }
.output-val   { font-size: 12px; font-weight: 700; color: var(--mint); }

/* Tech connector */
.tech-connector {
  display: none;
}

@media (min-width: 900px) {
  .tech-connector {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
}

.connector-line {
  width: 40px;
  height: 1px;
  background: var(--border-a);
}

.connector-arrow {
  color: var(--accent);
  font-size: 16px;
}

@keyframes spinCW {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes iconOrbit {
  from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
}
</style>
