<template>
  <button
    class="sound-toggle"
    :aria-label="store.soundEnabled ? 'Desativar som' : 'Ativar som'"
    :title="store.soundEnabled ? 'Som ligado' : 'Som desligado'"
    @click="toggle"
  >
    <svg v-if="store.soundEnabled" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <span class="mono">{{ store.soundEnabled ? 'SOM' : 'MUDO' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import { useAudio } from '~/composables/useAudio'
import { onMounted } from 'vue'

const store = useAppStore()
const { init, playClick } = useAudio()

onMounted(() => init())

function toggle() {
  store.toggleSound()
  playClick()
}
</script>

<style scoped>
.sound-toggle {
  position: fixed;
  bottom: 28px;
  right: 24px;
  z-index: 1500;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--fg3);
  font-size: 10px;
  cursor: pointer;
  transition: color 200ms, border-color 200ms, background 200ms;
  letter-spacing: 0.08em;
}

.sound-toggle:hover {
  color: var(--fg);
  border-color: var(--border-a);
  background: var(--elevated);
}
</style>
