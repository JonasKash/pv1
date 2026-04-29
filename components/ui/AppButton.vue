<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :class="['btn', `btn--${variant}`, { 'btn--lg': size === 'lg', 'btn--xl': size === 'xl' }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg' | 'xl'
  href?: string
  to?: string
}>()

const variant = props.variant || 'primary'
const size = props.size || 'md'

const tag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return defineNuxtLink({})
  return 'button'
})

defineEmits(['click'])
</script>
