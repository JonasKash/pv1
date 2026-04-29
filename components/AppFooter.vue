<template>
  <footer class="footer">
    <div class="site-max footer__inner">
      <div class="footer__brand">
        <img src="/logo.svg" height="20" alt="Avestra" />
        <p class="footer__tagline mono">// SEGUNDO CÉREBRO COM IA</p>
      </div>

      <nav class="footer__nav" aria-label="Rodapé">
        <a href="#como-funciona">Como funciona</a>
        <a href="#tecnologia">Tecnologia</a>
        <a href="#diferenciais">Diferenciais</a>
        <a href="#pricing">Preços</a>
      </nav>

      <div class="footer__legal">
        <span class="mono">© {{ year }} Avestra. Todos os direitos reservados.</span>
        <a href="https://wa.me/5534997101300" target="_blank" rel="noopener" class="footer__whatsapp">
          💬 WhatsApp
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 48px 0;
  background: rgba(8, 7, 15, 0.92);
  position: relative;
  z-index: 1;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (min-width: 768px) {
  .footer__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer__tagline {
  font-size: 11px;
  color: var(--fg3);
  letter-spacing: 0.08em;
}

.footer__nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.footer__nav a {
  font-size: 13px;
  color: var(--fg3);
  text-decoration: none;
  transition: color 200ms;
}
.footer__nav a:hover { color: var(--fg); }

.footer__legal {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 11px;
  color: var(--fg4);
}

.footer__whatsapp {
  color: #25D366;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
}
</style>
