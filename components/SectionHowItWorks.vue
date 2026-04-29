<template>
  <section id="como-funciona" class="section" style="padding-bottom: 20px" aria-label="Como funciona">
    <div class="site-max">
      <!-- Header -->
      <div class="section-header rv">
        <span class="tag tag--purple mono">Como funciona</span>
        <h2 class="section-h2 rv" data-d="1">
          Da bagunça ao<br />Segundo Cérebro em 1 hora
        </h2>
        <p class="section-sub rv" data-d="2">
          Implementação remota, guiada e sem complicação.
        </p>
      </div>

      <!-- Steps -->
      <div class="steps">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="step rv"
          :data-d="String(i + 1)"
        >
          <div class="step__number mono">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="step__line" aria-hidden="true" />
          <div class="step__card">
            <div class="step__icon">{{ step.icon }}</div>
            <h3 class="step__title">{{ step.title }}</h3>
            <p class="step__desc">{{ step.desc }}</p>
            <span class="mono step__tag">{{ step.tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGSAP } from '~/composables/useGSAP'

const steps = [
  {
    icon: '🧩',
    title: 'Diagnóstico rápido',
    desc: 'Você responde 5 perguntas sobre seus projetos, tom de voz e objetivos. Leva menos de 10 minutos.',
    tag: '// ETAPA_01',
  },
  {
    icon: '🧠',
    title: 'Montagem do Cérebro',
    desc: 'Estruturamos e injetamos o contexto nos prompts do sistema. A IA passa a te conhecer de verdade.',
    tag: '// ETAPA_02',
  },
  {
    icon: '🤖',
    title: 'Agentes no ar',
    desc: 'Configuramos os agentes autônomos que executam tarefas enquanto você faz o que importa.',
    tag: '// ETAPA_03',
  },
  {
    icon: '🚀',
    title: 'Entrega e suporte',
    desc: 'Você recebe o Segundo Cérebro pronto e nosso suporte incluso para ajustar o que precisar.',
    tag: '// ETAPA_04',
  },
]

const { revealOnScroll } = useGSAP()
revealOnScroll('#como-funciona .rv')
</script>

<style scoped>
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin-top: 64px;
  position: relative;
}

@media (min-width: 768px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
    gap: 0 24px;
  }
  .step { padding-bottom: 0; }
}

.step {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-bottom: 40px;
}

.step__number {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.12em;
  margin-bottom: 12px;
}

.step__line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--accent), var(--border));
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .step__line {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, var(--accent), var(--border));
    margin-bottom: 0;
    position: absolute;
    top: 22px;
    left: 0;
    right: -24px;
  }
  .step:last-child .step__line { display: none; }
}

.step__card {
  padding: 24px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 300ms, background 300ms;
}

.step__card:hover {
  border-color: var(--border-a);
  background: var(--elevated);
}

.step__icon {
  font-size: 28px;
}

.step__title {
  font-size: 17px;
  font-weight: 800;
  color: var(--fg);
  letter-spacing: -0.02em;
}

.step__desc {
  font-size: 14px;
  color: var(--fg2);
  line-height: 1.7;
  flex: 1;
}

.step__tag {
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.1em;
}
</style>
