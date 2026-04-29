import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    soundEnabled: false,
    menuOpen: false,
    currentSection: 'hero' as string,
    ctaClicks: 0,
    formSubmitted: false,
    formData: {
      nome: '',
      whatsapp: '',
      cargo: '',
      processo: '',
    },
  }),

  getters: {
    leadScore(state): number {
      let score = 0
      if (state.formData.cargo === 'empreendedor') score += 3
      if (state.formData.cargo === 'profissional_liberal') score += 2
      if (state.formData.cargo === 'freelancer') score += 2
      if (state.formData.processo.length > 100) score += 2
      if (state.ctaClicks > 1) score += 1
      return score
    },

    leadTier(state): 'starter' | 'pro' | 'enterprise' {
      const score = this.leadScore
      if (score >= 5) return 'enterprise'
      if (score >= 3) return 'pro'
      return 'starter'
    },
  },

  actions: {
    toggleSound() {
      this.soundEnabled = !this.soundEnabled
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('avestra-sound', String(this.soundEnabled))
      }
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },

    closeMenu() {
      this.menuOpen = false
    },

    registerCTAClick() {
      this.ctaClicks++
    },

    submitForm(data: typeof this.formData) {
      this.formData = { ...data }
      this.formSubmitted = true
    },

    setSection(section: string) {
      this.currentSection = section
    },
  },
})
