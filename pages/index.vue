<template>
  <main>
    <!-- Cérebro neural persistente — fixed, z-index 0, atrás de tudo -->
    <ClientOnly>
      <BrainBackground />
    </ClientOnly>

    <!-- Film-grain -->
    <div class="grain" aria-hidden="true" />

    <!-- Cursor customizado (desktop) -->
    <div id="cursor-dot" aria-hidden="true" />
    <div id="cursor-ring" aria-hidden="true" />

    <!-- Nav -->
    <AppNav />

    <!-- Seções -->
    <SectionHero />
    <SectionHowItWorks />
    <SectionDiferenciais />
    <SectionTechnology />
    <SectionPricing />
    <SectionFinalCTA />

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useGSAP } from '~/composables/useGSAP'

useGSAP().setupCursor()
</script>
