<template>
  <span :class="['tag', `tag--${color}`, { 'mono': mono }]">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  color?: 'default' | 'purple' | 'teal'
  mono?: boolean
}>()
</script>
