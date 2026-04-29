<template>
  <nav :class="['nav', { 'nav--scrolled': scrolled }]" role="navigation" aria-label="Principal">
    <div class="nav__inner site-max">
      <!-- Logo -->
      <button class="nav__logo" type="button" @click="toTop" aria-label="Ir ao topo">
        <img src="/logo.svg" :height="isMobile ? 20 : 24" alt="Avestra" />
      </button>

      <!-- Single CTA -->
      <a
        href="https://hub.la/r/bio-nova"
        target="_blank"
        rel="noopener"
        class="btn btn--sm btn--primary nav__cta"
      >
        Ativar por R$37
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const isMobile = ref(false)

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() { scrolled.value = window.scrollY > 30 }
function onResize()  { isMobile.value = window.innerWidth < 768 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  onResize()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  transition: background 400ms var(--ease), border-color 400ms;
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(8, 7, 15, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-color: var(--border);
}

.nav__inner {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.nav__cta {
  font-size: 13px;
}
</style>
