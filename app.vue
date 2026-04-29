<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useLenis } from '~/composables/useLenis'

// Boot Lenis smooth scroll globally
useLenis()
</script>
