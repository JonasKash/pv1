<template>
  <section id="diferenciais" class="section" style="padding-top: 20px" aria-label="Diferenciais">
    <div class="site-max">
      <div class="section-header">
        <span class="tag tag--teal mono rv">Diferenciais</span>
        <h2 class="section-h2 rv" data-d="1">
          O que muda quando a IA<br />finalmente te conhece
        </h2>
      </div>

      <div class="diff-grid">
        <!-- Diferencial 1 — Contexto permanente -->
        <div class="diff-row rv">
          <div class="diff-text">
            <span class="mono diff-label" style="color:var(--accent-l)">DIFERENCIAL_01 / CONTEXTO PERMANENTE</span>
            <h3 class="diff-h3">A IA finalmente<br />sabe quem você é</h3>
            <p class="diff-desc">
              Imagina abrir o Claude e ele já saber seus projetos, seu tom de voz, suas
              referências e seus objetivos? É isso que o Segundo Cérebro faz.
            </p>
            <ul class="diff-list">
              <li v-for="f in features1" :key="f">
                <span class="check">✓</span>{{ f }}
              </li>
            </ul>
          </div>
          <div class="diff-visual diff-visual--flow">
            <div v-for="(row, i) in flowRows" :key="row.label" class="flow-row">
              <div :class="['flow-item', { 'flow-item--active': row.active }]">
                <span :style="{ color: row.color }" class="mono">{{ row.label }}</span>
              </div>
              <div v-if="i < flowRows.length - 1" class="flow-connector" />
            </div>
          </div>
        </div>

        <div class="diff-divider" aria-hidden="true" />

        <!-- Diferencial 2 — Memória infinita -->
        <div class="diff-row diff-row--reverse rv">
          <div class="diff-visual diff-visual--steps">
            <div v-for="(s, i) in memorySteps" :key="s" class="mem-step">
              <div :class="['mem-num', { 'mem-num--final': i === memorySteps.length - 1 }]">
                {{ i === memorySteps.length - 1 ? '↺' : i + 1 }}
              </div>
              <span :class="{ 'mem-highlight': i === memorySteps.length - 1 }">{{ s }}</span>
            </div>
          </div>
          <div class="diff-text">
            <span class="mono diff-label" style="color:var(--mint)">DIFERENCIAL_02 / MEMÓRIA INFINITA</span>
            <h3 class="diff-h3">Nunca mais comece<br />do zero</h3>
            <p class="diff-desc">
              Tudo que você pesquisou, escreveu, decidiu — fica salvo e acessível.
              Na próxima vez que precisar, a IA já sabe.
            </p>
            <blockquote class="diff-quote">
              "É como ter um assistente que trabalhou com você por 10 anos.
              Ele conhece cada detalhe."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGSAP } from '~/composables/useGSAP'

const features1 = [
  'Seus projetos sempre acessíveis',
  'Seu tom de voz embarcado',
  'Suas referências organizadas',
  'Respostas que parecem suas',
]

const flowRows = [
  { label: 'Você pergunta',            color: 'var(--fg3)',     active: false },
  { label: 'Cérebro injeta contexto',  color: 'var(--accent-l)', active: true  },
  { label: 'IA responde personalizado',color: 'var(--fg2)',     active: false },
  { label: 'Aprendizado registrado',   color: 'var(--mint)',    active: true  },
]

const memorySteps = [
  'Tarefa chega',
  'Gerente designa agente',
  'Agente executa',
  'Relatório gerado',
  'Injetado no Cérebro',
  'Próxima tarefa: mais inteligente',
]

const { revealOnScroll } = useGSAP()
revealOnScroll('#diferenciais .rv', { stagger: 0.12 })
</script>

<style scoped>
.diff-grid {
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.diff-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  padding: 56px 0;
  border-top: 1px solid var(--border);
}

@media (min-width: 768px) {
  .diff-row { grid-template-columns: 1fr 1fr; gap: 80px; }
  .diff-row--reverse .diff-text { order: 2; }
  .diff-row--reverse .diff-visual { order: 1; }
}

.diff-divider { display: none; }

.diff-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
}

.diff-h3 {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--fg);
  line-height: 1.15;
  margin-bottom: 16px;
}

.diff-desc {
  font-size: 15px;
  color: var(--fg2);
  line-height: 1.75;
  margin-bottom: 24px;
}

.diff-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.diff-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--fg2);
}

.check {
  color: var(--mint);
  font-size: 12px;
  font-weight: 700;
}

/* Flow visual */
.diff-visual--flow {
  padding: 32px;
  border-radius: 20px;
  background: rgba(108, 92, 231, 0.06);
  border: 1px solid rgba(108, 92, 231, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.flow-row {
  display: flex;
  flex-direction: column;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 10px;
  background: var(--elevated);
  border: 1px solid var(--border);
  font-size: 13px;
}

.flow-item--active {
  background: rgba(108, 92, 231, 0.12);
  border-color: var(--accent);
}

.flow-connector {
  width: 1px;
  height: 10px;
  background: var(--border);
  margin: 0 0 0 28px;
}

/* Memory steps */
.diff-visual--steps {
  padding: 32px;
  border-radius: 20px;
  background: rgba(0, 212, 170, 0.04);
  border: 1px solid rgba(0, 212, 170, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mem-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 13px;
  color: var(--fg2);
}

.mem-step:last-child { border-bottom: none; }

.mem-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  color: var(--fg3);
}

.mem-num--final {
  background: rgba(0, 212, 170, 0.15);
  border-color: rgba(0, 212, 170, 0.4);
  color: var(--mint);
}

.mem-highlight { color: var(--mint); font-weight: 600; }

.diff-quote {
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(0, 212, 170, 0.06);
  border: 1px solid rgba(0, 212, 170, 0.15);
  font-size: 14px;
  font-style: italic;
  color: var(--fg2);
  line-height: 1.6;
}
</style>
