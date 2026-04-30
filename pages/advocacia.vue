<template>
  <div :style="{ background: COR.fundo, minHeight: '100vh', color: COR.texto, fontFamily: 'Palatino Linotype, Palatino, Georgia, serif' }">

    <!-- HEADER -->
    <div :style="{ padding: '28px 16px 20px', textAlign: 'center', background: `linear-gradient(180deg,#0C0C16 0%,${COR.fundo} 100%)`, borderBottom: `1px solid ${COR.borda}` }">
      <div :style="{ fontSize: '8px', letterSpacing: '8px', color: '#4A4870', textTransform: 'uppercase', marginBottom: '8px' }">
        Sistema Jurídico Inteligente · Documento Mestre
      </div>
      <h1 :style="{ fontSize: '30px', fontWeight: 400, color: COR.ouroClaro, margin: 0, letterSpacing: '4px' }">LexAgent</h1>
      <p :style="{ fontSize: '10px', color: '#3A3860', margin: '8px 0 0', letterSpacing: '2px' }">
        12 Agentes · Postgres + Redis · VPS Self-hosted · GPT-4o · Venom Bot
      </p>
      <div :style="{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }">
        <div v-for="([v, l]) in [['12','Agentes IA'],['30','Tabelas DB'],['GPT-4o','Motor'],['R$380','Custo MVP/mês']]" :key="l" :style="{ textAlign: 'center' }">
          <div :style="{ fontSize: '18px', color: COR.ouro, fontWeight: 700 }">{{ v }}</div>
          <div :style="{ fontSize: '8px', color: '#3A3860', letterSpacing: '2px', textTransform: 'uppercase' }">{{ l }}</div>
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div :style="{ display: 'flex', background: '#09090E', borderBottom: `1px solid ${COR.borda}`, overflowX: 'auto' }">
      <button v-for="t in TABS" :key="t.id" @click="tab = t.id; agenteAtivo = null" :style="{
        flex: 1, padding: '13px 4px', background: 'transparent', border: 'none',
        borderBottom: tab === t.id ? `2px solid ${COR.ouro}` : '2px solid transparent',
        color: tab === t.id ? COR.ouro : '#3A3860',
        fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
        textTransform: 'uppercase', cursor: 'pointer',
        fontFamily: 'inherit', whiteSpace: 'nowrap'
      }">{{ t.label }}</button>
    </div>

    <div :style="{ padding: '16px 14px', maxWidth: '880px', margin: '0 auto' }">

      <!-- ══ AGENTES LISTA ══ -->
      <div v-if="tab === 'agentes' && !agenteAtivo">
        <p :style="{ fontSize: '10px', color: COR.textoFraco, textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }">
          Selecione um agente para ver os processos e integrações completas
        </p>
        <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }">
          <div v-for="a in AGENTES" :key="a.id" @click="agenteAtivo = a; grupoAberto = null"
            :style="{ background: COR.fundoCard, border: `1px solid ${a.cor}20`, borderRadius: '10px', padding: '14px 12px', cursor: 'pointer' }">
            <div :style="{ fontSize: '22px', marginBottom: '6px' }">{{ a.icon }}</div>
            <div :style="{ fontSize: '8px', color: a.cor, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }">{{ a.tag }}</div>
            <div :style="{ fontSize: '13px', color: COR.texto, lineHeight: 1.3, marginBottom: '4px' }">{{ a.nome }}</div>
            <div :style="{ fontSize: '10px', color: COR.textoFraco, lineHeight: 1.5 }">{{ a.sub }}</div>
            <div :style="{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }">
              <div :style="{ width: '5px', height: '5px', borderRadius: '50%', background: '#405A40' }"/>
              <span :style="{ fontSize: '9px', color: '#405A40' }">{{ a.motor }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ AGENTE DETALHE ══ -->
      <div v-if="tab === 'agentes' && agenteAtivo">
        <button @click="agenteAtivo = null" :style="{
          background: 'transparent', border: 'none', color: COR.textoMedio,
          fontSize: '11px', cursor: 'pointer', marginBottom: '14px',
          padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }">
          ← Todos os agentes
        </button>

        <!-- Header do agente -->
        <div :style="{ background: COR.fundoCard, border: `1px solid ${agenteAtivo.cor}30`, borderRadius: '12px', padding: '18px', marginBottom: '12px' }">
          <div :style="{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }">
            <span :style="{ fontSize: '32px' }">{{ agenteAtivo.icon }}</span>
            <div :style="{ flex: 1 }">
              <div :style="{ fontSize: '8px', color: agenteAtivo.cor, letterSpacing: '3px', textTransform: 'uppercase' }">{{ agenteAtivo.tag }}</div>
              <div :style="{ fontSize: '20px', color: COR.ouroClaro, margin: '4px 0' }">{{ agenteAtivo.nome }}</div>
              <div :style="{ fontSize: '11px', color: COR.textoFraco }">{{ agenteAtivo.sub }}</div>
            </div>
          </div>

          <!-- Motor & Custo -->
          <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }">
            <div v-for="([label, val, bg]) in [['Motor IA', agenteAtivo.motor, '#405A40'], ['Custo', agenteAtivo.custo, '#5A4020']]" :key="label"
              :style="{ background: bg + '40', borderRadius: '8px', padding: '10px 12px', border: `1px solid ${bg}` }">
              <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }">{{ label }}</div>
              <div :style="{ fontSize: '11px', color: COR.textoMedio }">{{ val }}</div>
            </div>
          </div>

          <!-- APIs -->
          <div :style="{ marginBottom: '14px' }">
            <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }">Integrações Gratuitas</div>
            <div v-for="(api, i) in agenteAtivo.apis" :key="i" :style="{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }">
              <span :style="{ fontSize: '10px', color: '#405A40', marginTop: '1px', flexShrink: 0 }">✓</span>
              <span :style="{ fontSize: '11px', color: '#7A9070' }">{{ api }}</span>
            </div>
          </div>

          <!-- DB -->
          <div :style="{ background: '#060610', borderRadius: '8px', padding: '10px 12px' }">
            <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }">Tabelas Postgres</div>
            <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }">
              <span v-for="(t, i) in agenteAtivo.tabelas" :key="i"
                :style="{ fontSize: '9px', color: '#607A60', background: '#0E1A0E', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }">{{ t }}</span>
            </div>
            <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }">Redis Keys</div>
            <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '5px' }">
              <span v-for="(r, i) in agenteAtivo.redis" :key="i"
                :style="{ fontSize: '9px', color: '#7A5050', background: '#1A0E0E', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }">{{ r }}</span>
            </div>
          </div>
        </div>

        <!-- Grupos de processos -->
        <div v-for="(grupo, gi) in agenteAtivo.grupos" :key="gi"
          :style="{ background: COR.fundoCard, border: `1px solid ${COR.borda}`, borderRadius: '10px', marginBottom: '8px', overflow: 'hidden' }">
          <div @click="grupoAberto = grupoAberto === gi ? null : gi"
            :style="{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
              borderBottom: grupoAberto === gi ? `1px solid ${agenteAtivo.cor}20` : 'none' }">
            <div>
              <div :style="{ fontSize: '8px', color: agenteAtivo.cor, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }">Grupo {{ gi + 1 }}</div>
              <div :style="{ fontSize: '13px', color: COR.texto }">{{ grupo.g }}</div>
            </div>
            <div :style="{ color: COR.textoFraco, fontSize: '18px' }">{{ grupoAberto === gi ? '−' : '+' }}</div>
          </div>
          <div v-if="grupoAberto === gi" :style="{ padding: '12px 16px' }">
            <div v-for="(item, ii) in grupo.items" :key="ii" :style="{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }">
              <span :style="{ color: agenteAtivo.cor, fontSize: '8px', marginTop: '5px', flexShrink: 0 }">◆</span>
              <span :style="{ fontSize: '12px', color: COR.textoMedio, lineHeight: 1.7 }">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ BANCO DE DADOS ══ -->
      <div v-if="tab === 'banco'">
        <div :style="{ background: '#0A0A18', border: '1px solid #1E1E40', borderRadius: '10px', padding: '14px', marginBottom: '16px' }">
          <div :style="{ fontSize: '10px', color: COR.ouro, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }">
            Princípios de Engenharia
          </div>
          <div v-for="(p, i) in PRINCIPIOS" :key="i" :style="{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'flex-start' }">
            <span :style="{ color: COR.ouro, fontSize: '8px', marginTop: '4px', flexShrink: 0 }">◆</span>
            <span :style="{ fontSize: '11px', color: '#7870A0', lineHeight: 1.6 }">{{ p }}</span>
          </div>
        </div>

        <!-- Categorias -->
        <div v-for="(cat, ci) in SCHEMA" :key="ci" :style="{ marginBottom: '10px' }">
          <button @click="catAberta = catAberta === ci ? -1 : ci"
            :style="{ width: '100%', background: `${cat.cor}15`, border: `1px solid ${cat.cor}40`, borderRadius: '10px',
              padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }">
            <div :style="{ textAlign: 'left' }">
              <div :style="{ fontSize: '14px', color: cat.cor, fontWeight: 700 }">{{ cat.categoria }}</div>
              <div :style="{ fontSize: '10px', color: COR.textoFraco, marginTop: '2px' }">{{ cat.tabelas.length }} tabelas</div>
            </div>
            <span :style="{ color: COR.textoFraco, fontSize: '18px' }">{{ catAberta === ci ? '−' : '+' }}</span>
          </button>

          <div v-if="catAberta === ci" :style="{ marginTop: '6px' }">
            <div v-for="(tabela, ti) in cat.tabelas" :key="ti"
              :style="{ background: COR.fundoCard, border: `1px solid ${COR.bordaFina}`, borderRadius: '10px', marginBottom: '6px', overflow: 'hidden' }">
              <div @click="tabelaAberta = tabelaAberta === `${ci}-${ti}` ? null : `${ci}-${ti}`"
                :style="{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }">
                <div>
                  <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
                    <code :style="{ fontSize: '13px', color: cat.cor, fontFamily: 'Courier New, monospace', fontWeight: 700 }">{{ tabela.nome }}</code>
                  </div>
                  <div :style="{ fontSize: '10px', color: COR.textoFraco, marginTop: '3px' }">{{ tabela.desc }}</div>
                </div>
                <div :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
                  <span :style="{ fontSize: '9px', color: COR.textoFraco, background: '#141428', padding: '2px 8px', borderRadius: '4px' }">
                    {{ tabela.colunas.length }} colunas
                  </span>
                  <span :style="{ color: COR.textoFraco, fontSize: '16px' }">{{ tabelaAberta === `${ci}-${ti}` ? '−' : '+' }}</span>
                </div>
              </div>

              <div v-if="tabelaAberta === `${ci}-${ti}`" :style="{ padding: '0 14px 14px' }">
                <div :style="{ background: '#06060E', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', border: `1px solid ${COR.bordaFina}` }">
                  <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }">PRIMARY KEY</div>
                  <code :style="{ fontSize: '11px', color: COR.ouro, fontFamily: 'Courier New, monospace' }">{{ tabela.pk }}</code>
                </div>

                <div :style="{ marginBottom: '10px' }">
                  <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }">COLUNAS</div>
                  <div v-for="(col, ci2) in tabela.colunas" :key="ci2"
                    :style="{ display: 'flex', gap: '8px', padding: '5px 0', borderBottom: `1px solid ${COR.fundo}`, alignItems: 'flex-start' }">
                    <span :style="{ fontSize: '8px', color: getColColor(col), marginTop: '4px', flexShrink: 0 }">▸</span>
                    <code :style="{ fontSize: '11px', fontFamily: 'Courier New, monospace', color: getColColor(col), lineHeight: 1.6 }">{{ col }}</code>
                  </div>
                </div>

                <div>
                  <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }">ÍNDICES</div>
                  <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '5px' }">
                    <code v-for="(idx, ii) in tabela.indices" :key="ii"
                      :style="{ fontSize: '9px', color: '#5060A0', background: '#0E0E20', padding: '2px 8px', borderRadius: '4px', fontFamily: 'Courier New, monospace', border: '1px solid #1E1E40' }">{{ idx }}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Legenda -->
        <div :style="{ background: COR.fundoCard, border: `1px solid ${COR.borda}`, borderRadius: '10px', padding: '14px', marginTop: '8px' }">
          <div :style="{ fontSize: '10px', color: COR.ouro, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }">Legenda de Cores</div>
          <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }">
            <div v-for="([cor, label]) in legendaCores" :key="label" :style="{ display: 'flex', gap: '8px', alignItems: 'center' }">
              <div :style="{ width: '10px', height: '10px', borderRadius: '2px', background: cor, flexShrink: 0 }"/>
              <span :style="{ fontSize: '10px', color: COR.textoFraco }">{{ label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ INFRAESTRUTURA ══ -->
      <div v-if="tab === 'infra'">
        <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }">
          <div v-for="(item, i) in INFRA_ITEMS" :key="i"
            :style="{ background: COR.fundoCard, border: `1px solid ${COR.borda}`, borderRadius: '10px', padding: '12px' }">
            <div :style="{ fontSize: '20px', marginBottom: '6px' }">{{ item.icon }}</div>
            <div :style="{ fontSize: '12px', color: COR.ouro, fontWeight: 700, marginBottom: '4px' }">{{ item.label }}</div>
            <div :style="{ fontSize: '10px', color: COR.textoFraco, lineHeight: 1.6 }">{{ item.desc }}</div>
          </div>
        </div>

        <!-- Custo -->
        <div :style="{ background: '#09100A', border: '1px solid #1E301E', borderRadius: '10px', padding: '16px', marginBottom: '14px' }">
          <div :style="{ fontSize: '12px', color: '#50A860', fontWeight: 700, marginBottom: '12px' }">💡 Custo Total Estimado</div>
          <div v-for="([item, val], i) in CUSTO_TOTAL" :key="i"
            :style="{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < CUSTO_TOTAL.length - 1 ? '1px solid #141E14' : 'none' }">
            <span :style="{ fontSize: '11px', color: COR.textoFraco }">{{ item }}</span>
            <span :style="{ fontSize: '12px', color: '#50A860', fontWeight: i === CUSTO_TOTAL.length - 1 ? 700 : 400 }">{{ val }}</span>
          </div>
        </div>

        <!-- Comunicação entre agentes -->
        <div :style="{ background: COR.fundoCard, border: `1px solid ${COR.borda}`, borderRadius: '10px', padding: '16px' }">
          <div :style="{ fontSize: '12px', color: COR.ouro, fontWeight: 700, marginBottom: '12px' }">🔄 Comunicação Entre Agentes via Redis Pub/Sub</div>
          <div v-for="([canal, desc], i) in COMUNICACOES" :key="i"
            :style="{ padding: '8px 0', borderBottom: i < COMUNICACOES.length - 1 ? `1px solid ${COR.bordaFina}` : 'none' }">
            <code :style="{ fontSize: '11px', color: '#6070B0', fontFamily: 'Courier New, monospace' }">{{ canal }}</code>
            <div :style="{ fontSize: '11px', color: COR.textoFraco, marginTop: '2px' }">{{ desc }}</div>
          </div>
        </div>
      </div>

      <!-- ══ ROADMAP ══ -->
      <div v-if="tab === 'mvp'">
        <div v-for="(fase, i) in MVP_FASES" :key="i"
          :style="{ background: COR.fundoCard, border: `1px solid ${fase.cor}30`, borderRadius: '12px', padding: '18px', marginBottom: '12px' }">
          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }">
            <div :style="{ fontSize: '14px', color: fase.cor, fontWeight: 700 }">{{ fase.label }}</div>
            <div :style="{ fontSize: '10px', color: COR.textoFraco, background: '#141428', padding: '3px 10px', borderRadius: '4px' }">{{ fase.meses }}</div>
          </div>
          <div :style="{ fontSize: '12px', color: '#506050', fontStyle: 'italic', marginBottom: '14px' }">🎯 {{ fase.entrega }}</div>

          <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }">
            <span v-for="(a, j) in fase.agentes" :key="j"
              :style="{ fontSize: '10px', color: fase.cor, background: `${fase.cor}10`, border: `1px solid ${fase.cor}30`, padding: '3px 10px', borderRadius: '4px' }">{{ a }}</span>
          </div>

          <div :style="{ fontSize: '8px', color: COR.textoFraco, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }">Dev Focus</div>
          <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }">
            <div v-for="(d, j) in fase.dev" :key="j" :style="{ display: 'flex', gap: '6px', alignItems: 'flex-start' }">
              <span :style="{ color: fase.cor, fontSize: '8px', marginTop: '3px', flexShrink: 0 }">◆</span>
              <span :style="{ fontSize: '11px', color: COR.textoFraco, lineHeight: 1.5 }">{{ d }}</span>
            </div>
          </div>
        </div>

        <!-- SaaS Pricing -->
        <div :style="{ background: '#09100A', border: '1px solid #1E301E', borderRadius: '12px', padding: '18px' }">
          <div :style="{ fontSize: '13px', color: '#50A860', fontWeight: 700, marginBottom: '14px' }">💎 Modelo SaaS — Retorno do Investimento</div>
          <div v-for="(p, i) in PRECOS" :key="i"
            :style="{ padding: '12px 0', borderBottom: i < PRECOS.length - 1 ? '1px solid #141E14' : 'none', display: 'flex', gap: '12px' }">
            <div :style="{ width: '80px', flexShrink: 0 }">
              <div :style="{ fontSize: '13px', color: '#50A860', fontWeight: 700 }">{{ p.plano }}</div>
            </div>
            <div>
              <div :style="{ fontSize: '16px', color: COR.ouro }">{{ p.preco }}</div>
              <div :style="{ fontSize: '11px', color: COR.textoFraco, marginTop: '2px' }">{{ p.desc }}</div>
            </div>
          </div>
          <div :style="{ marginTop: '14px', padding: '12px', background: '#06080A', borderRadius: '8px', border: '1px solid #1E301E' }">
            <div :style="{ fontSize: '11px', color: COR.textoFraco, lineHeight: 1.8 }">
              <strong :style="{ color: '#50A860' }">Break-even:</strong> 2 escritórios Solo ou 1 Escritório cobre o custo da VPS + GPT-4o.<br/>
              <strong :style="{ color: '#50A860' }">20 clientes Solo:</strong> R$7.940/mês de receita × custo de R$580/mês = margem de 93%.
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const COR = {
  fundo: "#06060A",
  fundoCard: "#0D0D14",
  fundoBorda: "#16162A",
  borda: "#1E1E30",
  bordaFina: "#141428",
  texto: "#D8D0C8",
  textoFraco: "#4A4860",
  textoMedio: "#7A7890",
  ouro: "#C8A050",
  ouroClaro: "#E8C070",
}

const TABS = [
  { id: "agentes", label: "12 Agentes" },
  { id: "banco",   label: "Banco de Dados" },
  { id: "infra",   label: "Infraestrutura" },
  { id: "mvp",     label: "Roadmap" },
]

const tab = ref("agentes")
const agenteAtivo = ref(null)
const grupoAberto = ref(null)
const catAberta = ref(0)
const tabelaAberta = ref(null)

function getColColor(col) {
  if (col.includes("PK")) return COR.ouro
  if (col.includes("FK")) return "#6080C8"
  if (col.includes("VECTOR")) return "#8060C8"
  if (col.includes("JSONB")) return "#5080A8"
  return COR.textoMedio
}

const PRINCIPIOS = [
  "Multi-tenant via escritorio_id em todas as tabelas — Row-Level Security (RLS) nativo",
  "UUIDs em todas as PKs — gerados com gen_random_uuid() — globalmente únicos",
  "Advogados e Usuários têm IDs próprios — nunca compartilham namespace",
  "Soft delete via campo ativo/cancelado — nunca DROP de dados reais",
  "JSONB para dados semi-estruturados variáveis por área do direito",
  "VECTOR(1536) com pgvector nos 4 pontos de busca semântica (documentos, jurisprudência, casos, estratégias)",
  "TIMESTAMPTZ em todos os campos de tempo — fuso horário sempre preservado",
  "Índices compostos otimizados para os queries mais frequentes por módulo",
]

const legendaCores = [
  [COR.ouro, "PK — Chave Primária UUID"],
  ["#6080C8", "FK — Chave Estrangeira"],
  ["#8060C8", "VECTOR — Embedding pgvector"],
  ["#5080A8", "JSONB — Dado semi-estruturado"],
  [COR.textoMedio, "Campo padrão"],
]

const COMUNICACOES = [
  ["SDR → Agente de Casos", "Lead qualificado → envia briefing completo para análise de viabilidade"],
  ["Agente de Processos → Prazos", "Nova movimentação detectada → cria prazo automaticamente"],
  ["Prazos → Advogado", "Alerta crítico D-1 → notificação imediata WhatsApp"],
  ["Financeiro → Portal", "Pagamento confirmado → atualiza dashboard do cliente em tempo real"],
  ["Petições → Processos", "Protocolo confirmado → registra na linha do tempo do processo"],
  ["Audiências → Casos", "Ata gerada → envia para indexação de padrões de vitória"],
  ["Compliance → SDR", "Lead reprovado PLD/FT → bloqueia e notifica sócio"],
  ["Agente de Casos → Advogado", "Caso novo similar a vitórias → alerta de alta viabilidade"],
]

const AGENTES = [
  {
    id: "sdr", tag: "01", icon: "🤝", nome: "SDR & Atendimento",
    sub: "Venom Bot · GPT-4o · Score 0–150",
    cor: "#C8A050", motor: "GPT-4o + Venom Bot",
    custo: "Gratuito (self-hosted)",
    apis: ["Venom Bot (WhatsApp Web — open-source)", "Meta Graph API (Instagram DM — gratuito)", "Cal.com self-hosted (agendamento)", "SMTP próprio via Nodemailer"],
    grupos: [
      { g: "Recepção & Intenção", items: ["Atendimento 24/7 WhatsApp/Instagram/site", "Primeira pergunta: contratar × consulta × urgência", "Urgência detectada → escalar ao advogado em <2 min", "Delay humanizado 2–5s entre mensagens (anti-ban)", "Sessão de conversa salva no Redis por 24h"] },
      { g: "Qualificação Inteligente (6 etapas)", items: ["E1 Intenção: contratar / consulta / urgência", "E2 Perfil: PF ou PJ + cidade + CNPJ (consulta Receita)", "E3 Área: trabalhista / cível / família / criminal / empresarial / previdenciário", "E4 Processo: número CNJ? sem advogado? prazo correndo?", "E5 Financeiro: orçamento + disposição de contratar", "E6 Encaminhamento automático por score final"] },
      { g: "Score 0–150 & Classificação", items: ["🏆 Ouro 90+ → WhatsApp direto do advogado agora", "⭐ Prata 70–89 → agendar consulta em 24h", "✅ Bronze 40–69 → consulta paga R$150–300", "⏳ Morno 20–39 → nutrir conteúdo 7 dias", "❄️ Frio <20 → sequência educativa 30 dias", "Briefing completo gerado pelo GPT-4o para o advogado"] },
      { g: "Follow-up & CRM", items: ["Régua automática: 2h, 24h, 72h, 7d, 15d, 30d (BullMQ)", "Pipeline: Novo→Qualificado→Agendado→Proposta→Fechado", "NPS automático pós-consulta", "Reativação de leads frios trimestralmente", "Dashboard de conversão por canal e área"] },
    ],
    tabelas: ["leads", "qualificacoes_sdr", "seguimentos", "comunicacoes"],
    redis: ["fila:seguimentos", "session:conversa_{tel}", "rate:whatsapp_{tel}", "score:lead_{id}"],
  },
  {
    id: "casos", tag: "02", icon: "🧠", nome: "Agente de Casos",
    sub: "Análise de Vitórias · Padrões · Estratégia com IA",
    cor: "#7060C8", motor: "GPT-4o + pgvector RAG",
    custo: "Gratuito (pgvector open-source)",
    apis: ["pgvector (busca semântica — open-source)", "OpenAI Embeddings text-embedding-3-small", "LexML Brasil (legislação — gratuito)", "STF/STJ APIs públicas (acórdãos)"],
    grupos: [
      { g: "Indexação de Casos Ganhos", items: ["Ao encerrar caso como 'ganho': extração automática de padrões", "GPT-4o extrai: teses utilizadas, jurisprudências citadas, argumentos centrais", "Identificação dos fatores que levaram à vitória", "Geração de embedding vetorial do caso (pgvector)", "Armazenamento em casos_analises com metadados completos", "Enriquecimento incremental: mais vitórias = estratégias melhores"] },
      { g: "Análise de Similaridade", items: ["Novo caso cadastrado → busca vetorial em casos_analises", "Top 5 casos mais similares por área + fatos + resultado", "Score de similaridade 0–100 por caso encontrado", "Destaque dos fatores que fizeram casos similares vencerem", "Alerta quando novo caso tem < 3 precedentes de vitória", "Comparação: casos ganhos × perdidos para identificar riscos"] },
      { g: "Geração de Estratégia", items: ["Relatório automático: pontos fortes do novo caso", "Teses recomendadas baseadas nas vitórias do escritório", "Jurisprudências que funcionaram em casos análogos", "Pontos de atenção: o que diferencia este caso dos ganhos", "Score de viabilidade 0–100 com justificativa", "Estimativa de valor mínimo e máximo de condenação"] },
      { g: "Inteligência Contínua", items: ["Base cresce a cada caso encerrado (ganho ou perdido)", "Análise de casos perdidos: o que poderia ter sido diferente", "Ranking de teses mais eficazes por tribunal e vara", "Relatório mensal: taxa de sucesso por área e advogado", "Padrões de decisão por juiz (quando identificável)", "Exportação de estratégias para biblioteca de modelos"] },
    ],
    tabelas: ["casos_analises", "estrategias", "jurisprudencias_base", "modelos_estrategia"],
    redis: ["cache:analise_{caso_id}", "fila:indexar_caso", "cache:embedding_{hash}"],
  },
  {
    id: "contratos", tag: "03", icon: "📝", nome: "Contratos",
    sub: "Geração · Assinatura Digital · Gestão",
    cor: "#50A87C", motor: "GPT-4o",
    custo: "Autentique (5 docs/mês grátis)",
    apis: ["Autentique (assinatura digital — plano gratuito)", "PDFLib (geração PDF — open-source)", "Handlebars.js (templates — gratuito)", "Nodemailer (envio — gratuito)"],
    grupos: [
      { g: "Geração Automática", items: ["Templates por área: trabalhista, cível, família, criminal, empresarial, previdenciário", "Tipos: honorário fixo, êxito, misto, mensalidade, hora", "Preenchimento automático com dados do lead/cliente", "Cláusulas específicas geradas por GPT-4o conforme o caso", "Tabela de parcelas, vencimentos e multas", "Compliance OAB: art. 49 CED verificado automaticamente"] },
      { g: "Assinatura & Controle", items: ["Envio via WhatsApp + email simultaneamente", "Assinatura digital com validade jurídica (Autentique)", "Tracking: enviado → visualizado → assinado", "Reenvio automático após 24h sem assinatura", "Versionamento completo com diff visual", "Alertas de vencimento: 30, 15, 7 dias antes"] },
      { g: "Gestão Pós-assinatura", items: ["Status: Rascunho→Enviado→Assinado→Ativo→Encerrado", "Aditivos com controle de versão", "Rescisão com cálculo automático de honorários devidos", "Renovação automática com aprovação do advogado", "Relatório mensal por status e valor total", "Armazenamento criptografado no MinIO"] },
    ],
    tabelas: ["contratos", "contratos_versoes", "contratos_modelos", "assinaturas"],
    redis: ["fila:reenvio_contrato", "event:assinatura_webhook", "cache:modelo_{tipo}"],
  },
  {
    id: "processos", tag: "04", icon: "⚖️", nome: "Processos Judiciais",
    sub: "CNJ · Tribunais · Monitoramento Real-time",
    cor: "#C05050", motor: "Playwright + GPT-4o",
    custo: "100% gratuito (APIs públicas)",
    apis: ["DataJud CNJ (API pública — gratuita)", "PJe API pública", "Playwright (scraping tribunais sem API — open-source)", "BrasilAPI (dados complementares — gratuito)"],
    grupos: [
      { g: "Consulta Automatizada", items: ["Cobertura: STF, STJ, TST, TRFs, TJs (todos estados), TRTs, JEFs", "Busca: número CNJ, CPF/CNPJ, nome da parte", "Polling automático a cada 4h por processo ativo", "Cache Redis com TTL por tribunal (evita rate limit)", "Fallback Playwright quando API indisponível", "Schema normalizado: dados de todos os tribunais em formato único"] },
      { g: "Monitoramento & Alertas", items: ["Classificação de movimentação: decisão / despacho / sentença / acórdão / intimação", "Alertas críticos: sentença condenatória, liminar, penhora, bloqueio BACENJUD", "Notificação imediata: WhatsApp do advogado + portal do cliente", "Extração de prazos implícitos nas intimações (GPT-4o)", "Criação automática de prazo no Agente 06 ao detectar intimação", "Linha do tempo visual completa do processo"] },
      { g: "Análise & Relatórios", items: ["Resumo executivo de movimentação em linguagem simples para cliente", "Extração estruturada: datas, valores, partes, decisão (GPT-4o)", "Sugestão automática de próxima ação ao advogado", "Relatório de andamento mensal por processo", "Estatísticas: processos ativos, por fase, por tribunal", "Detecção: arquivamento, extinção, trânsito em julgado"] },
    ],
    tabelas: ["processos_judiciais", "movimentacoes_processuais", "partes_processo", "monitoramento_config"],
    redis: ["cache:tribunal:{sigla}_{numero}", "fila:polling_processos", "lock:processo_{numero}"],
  },
  {
    id: "peticoes", tag: "05", icon: "📄", nome: "Petições & Protocolos",
    sub: "Geração IA · Revisão · Protocolo Eletrônico",
    cor: "#C87840", motor: "GPT-4o",
    custo: "100% gratuito (PJe público)",
    apis: ["PJe (protocolo eletrônico — público)", "Playwright (automação protocolo — open-source)", "PDFLib (montagem PDF — open-source)", "Tesseract OCR (leitura de peças digitalizadas — gratuito)"],
    grupos: [
      { g: "Biblioteca & Geração", items: ["Petição inicial por área e tipo de ação", "Contestação, réplica, tréplica, impugnação", "Recursos: apelação, agravo, embargos, REsp, RE", "Tutela antecipada, liminar, arresto, sequestro", "Peças de execução: cumprimento, penhora SISBAJUD", "Geração completa via GPT-4o com fatos + teses + pedidos"] },
      { g: "Fluxo de Aprovação", items: ["Rascunho → Revisão → Aprovada → Protocolada", "Editor inline com sugestões do GPT-4o", "Histórico de versões com diff visual", "Assinatura digital do advogado (certificado A1/A3)", "Aprovação com 1 clique para protocolo", "Notificação WhatsApp de aprovação pendente"] },
      { g: "Protocolo & Controle", items: ["Protocolo automático via Playwright: PJe, e-SAJ, PROJUDI, eProc", "Verificação pré-protocolo: prazo, formato, tamanho", "Comprovante com número de protocolo em PDF", "Retry automático em falha do sistema do tribunal", "Log completo com timestamp de cada protocolo", "Alerta se protocolo não confirmado em 30 min"] },
    ],
    tabelas: ["peticoes", "peticoes_versoes", "protocolos", "peticoes_modelos"],
    redis: ["fila:protocolo", "lock:protocolo_{processo}", "cache:status_tribunal"],
  },
  {
    id: "prazos", tag: "06", icon: "⏰", nome: "Prazos & Agenda",
    sub: "Cálculo Automático · Alertas · Google Calendar",
    cor: "#C8B840", motor: "Determinístico + GPT-4o",
    custo: "100% gratuito",
    apis: ["Google Calendar API (gratuito)", "BrasilAPI feriados (gratuito)", "node-schedule (open-source)", "BullMQ (open-source)"],
    grupos: [
      { g: "Cadastro & Cálculo", items: ["Cadastro manual + extração automática de intimações (GPT-4o)", "Importação automática via Agente de Processos", "Tipos: processual, administrativo, contratual, interno", "Cálculo: dias úteis ou corridos excluindo feriados estaduais e forenses", "Feriados por comarca e estado (BrasilAPI)", "Criação automática ao detectar intimação/decisão"] },
      { g: "Alertas Escalonados", items: ["10d → 5d → 2d → 1d → no dia → vencido", "Alerta crítico imediato se prazo < 24h", "Notificação: WhatsApp + email do advogado", "Escalação para sócio se prazo crítico sem resposta em 2h", "Confirmação de ciência obrigatória pelo advogado", "Relatório semanal de prazos da próxima semana"] },
      { g: "Agenda & Controle", items: ["Calendário unificado do escritório", "Sincronização bidirecional com Google Calendar", "Detecção de conflito de agenda", "Bloqueio de recesso forense automático", "Visualização: dia / semana / mês / por advogado / por área", "Dashboard: hoje / esta semana / vencidos / cumpridos"] },
    ],
    tabelas: ["prazos", "prazos_alertas", "eventos_agenda", "feriados_forenses"],
    redis: ["scheduler:alertas", "fila:notificacoes_prazo", "cache:feriados_{uf}"],
  },
  {
    id: "financeiro", tag: "07", icon: "💰", nome: "Financeiro",
    sub: "Honorários · Cobrança · NFS-e · Conciliação",
    cor: "#4898C8", motor: "Determinístico",
    custo: "OpenPix (PIX grátis), Asaas (sem mensalidade)",
    apis: ["OpenPix (PIX — sem mensalidade)", "Asaas (boleto/cartão — taxa por uso)", "NFSe.io (nota fiscal — plano gratuito limitado)", "Open Finance (conciliação — gratuito)"],
    grupos: [
      { g: "Honorários & Faturamento", items: ["Tipos: fixo, êxito, misto, mensalidade, hora", "Geração automática de fatura no vencimento", "Parcelamento com juros configurável", "Honorários de êxito: cálculo sobre condenação com alerta", "Desconto por pontualidade ou indicação", "Relatório: receita realizada × prevista × inadimplente"] },
      { g: "Cobrança & Pagamento", items: ["PIX com QR Code automático (OpenPix)", "Boleto com multa/juros automáticos (Asaas)", "Link de pagamento via WhatsApp + email", "Confirmação em tempo real (webhook)", "Recibo automático em PDF após pagamento", "Régua de inadimplência: D+1 / D+3 / D+7 / D+15 / D+30"] },
      { g: "Fiscal & Contábil", items: ["NFS-e automática após confirmação de pagamento", "Múltiplos municípios e alíquotas ISS", "Fluxo de caixa: entradas previstas × realizadas", "DRE simplificado do escritório", "Conciliação bancária via OFX/CSV", "Exportação contábil mensal para contador"] },
    ],
    tabelas: ["faturas", "pagamentos", "notas_fiscais", "fluxo_caixa", "conciliacao_bancaria"],
    redis: ["webhook:pagamento_{gateway}", "fila:cobranca_automatica", "cache:inadimplencia"],
  },
  {
    id: "documentos", tag: "08", icon: "🗂️", nome: "Documentos & GED",
    sub: "OCR · Classificação · Busca Semântica · MinIO",
    cor: "#60A840", motor: "GPT-4o Vision + Tesseract",
    custo: "100% gratuito (self-hosted)",
    apis: ["Tesseract OCR (open-source self-hosted)", "MinIO (storage S3-compatible self-hosted)", "pgvector (busca semântica — open-source)", "Sharp (processamento de imagem — open-source)"],
    grupos: [
      { g: "Recebimento & OCR", items: ["Upload web / WhatsApp (foto) / email anexo / scanner", "OCR Tesseract para documentos digitalizados", "GPT-4o Vision para manuscritos e documentos complexos", "Extração: nome, CPF, CNPJ, datas, valores, vigências", "Detecção automática do tipo de documento", "Verificação de qualidade e autenticidade da imagem"] },
      { g: "Classificação & Organização", items: ["Auto-classificação: RG, CPF, CNH, procuração, certidão, contrato, decisão judicial", "Vinculação automática ao caso/cliente correto", "Detecção de documentos duplicados (hash SHA-256)", "Controle de vigência: alertas de documentos vencendo", "Organização em pastas virtuais por caso", "Checklist de documentos necessários por área (due diligence)"] },
      { g: "Armazenamento & Busca", items: ["MinIO self-hosted: custo zero de storage", "Criptografia AES-256 em todos os arquivos", "Controle de acesso por papel (advogado / assistente / cliente)", "Log de acesso: quem baixou, quando, qual IP", "Busca semântica por conteúdo com pgvector", "Exportação compactada de toda documentação do caso"] },
    ],
    tabelas: ["documentos", "documentos_extraidos", "documentos_acessos", "documentos_embeddings"],
    redis: ["fila:ocr_processing", "lock:upload_{hash}", "cache:tipos_documento"],
  },
  {
    id: "audiencias", tag: "09", icon: "🎙️", nome: "Audiências",
    sub: "Pauta · Transcrição Whisper · Ata Automática",
    cor: "#9060C8", motor: "Whisper + GPT-4o",
    custo: "100% gratuito (Whisper self-hosted)",
    apis: ["Whisper self-hosted (faster-whisper — gratuito)", "Google Meet API (gratuito)", "Zoom API (plano básico gratuito)", "Whereby Embedded (sala virtual — plano gratuito)"],
    grupos: [
      { g: "Preparação", items: ["Audiências extraídas automaticamente do Agente de Processos", "Pauta: partes, testemunhas, peritos, objeto", "Preparatório: resumo do processo + pontos-chave + estratégia", "Briefing do adversário: peças anteriores, posicionamento", "Lista de documentos a levar", "Lembretes D-2 e H-2 para advogado e cliente"] },
      { g: "Transcrição & Ata", items: ["Gravação com consentimento via link seguro", "Transcrição em tempo real com Whisper self-hosted", "Identificação de falantes automática", "Geração de ata estruturada via GPT-4o", "Resumo executivo em linguagem simples para o cliente", "Extração de decisões, determinações e prazos da ata"] },
      { g: "Pós-audiência", items: ["Criação automática de prazos no Agente 06 (determinações da ata)", "Sugestão de próximas peças a protocolar", "Envio da ata ao cliente via portal e WhatsApp", "Arquivamento da gravação e transcrição no GED (Agente 08)", "Atualização do status do processo", "Integração automática com Agente de Casos para análise"] },
    ],
    tabelas: ["audiencias", "audiencias_transcricoes", "audiencias_participantes", "audiencias_gravacoes"],
    redis: ["fila:transcricao_audio", "stream:live_transcription", "cache:audiencia_prep_{id}"],
  },
  {
    id: "juridico_ia", tag: "10", icon: "📚", nome: "Inteligência Jurídica",
    sub: "Jurisprudência · RAG · Legislação · Pesquisa",
    cor: "#C05080", motor: "GPT-4o + RAG pgvector",
    custo: "STJ/STF APIs gratuitas",
    apis: ["LexML Brasil (legislação — API pública gratuita)", "STF e-doc API (acórdãos — gratuito)", "STJ API pública (gratuito)", "pgvector (busca semântica — open-source)"],
    grupos: [
      { g: "Base de Conhecimento", items: ["Indexação de acórdãos: STF, STJ, TST, TJs, TRTs", "Legislação atualizada via LexML Brasil", "Súmulas Vinculantes e Teses de Repercussão Geral", "Atualização automática diária da base", "Embeddings pgvector para busca semântica", "Filtros: tribunal, período, relator, resultado, área"] },
      { g: "Pesquisa & Suporte", items: ["Busca semântica: encontra casos por similaridade de fatos", "Resumo de acórdãos em 3 parágrafos via GPT-4o", "Citação formatada para uso direto na peça", "Artigos de lei relacionados com explicação prática", "Verificação: existe precedente favorável para esta tese?", "Análise de contradição de teses no processo"] },
      { g: "Monitoramento Legislativo", items: ["Alertas de novas leis por área de atuação do escritório", "Resumo de reforma legislativa com impacto prático", "Monitoramento de PLs relevantes no Congresso", "Boletim jurídico semanal por área (WhatsApp/email)", "Atualização automática de modelos de petições", "Integração com Agente 02 (Casos) para enriquecer estratégias"] },
    ],
    tabelas: ["jurisprudencias_base", "jurisprudencias_embeddings", "legislacao", "sumulas", "boletins_juridicos"],
    redis: ["cache:pesquisa_juri_{hash}", "fila:indexacao_acordaos", "cache:lexmlbr_feed"],
  },
  {
    id: "compliance", tag: "11", icon: "🛡️", nome: "Compliance & LGPD",
    sub: "OAB · PLD/FT · LGPD · Auditoria Completa",
    cor: "#60A860", motor: "Determinístico + GPT-4o",
    custo: "COAF SISCOAF gratuito/obrigatório",
    apis: ["COAF SISCOAF (comunicações — gratuito/obrigatório)", "ReceitaFederal API (CPF/CNPJ — gratuita)", "OpenSanctions (listas PEP/sanções — open-source)", "Winston Logger (auditoria estruturada — gratuito)"],
    grupos: [
      { g: "Conflito de Interesses", items: ["Verificação automática antes de aceitar novo caso", "Base histórica de partes: clientes, adversários, testemunhas, peritos", "Detecção de relação societária via CNPJ (Receita Federal)", "Alerta para advogado responsável ao detectar conflito", "Registro de impedimentos com motivação", "Relatório de conflitos para sócios"] },
      { g: "PLD/FT & KYC", items: ["Identificação de PEPs (Pessoas Expostas Politicamente)", "Consulta: listas OFAC, ONU, OpenSanctions", "KYC aprofundado para transações > R$50.000", "Monitoramento de padrões suspeitos de pagamento", "Geração automática de ROS para o COAF (SISCOAF)", "Treinamento periódico da equipe com registro de conclusão"] },
      { g: "LGPD & Auditoria", items: ["Registro de consentimentos por finalidade e data", "Portal de direitos: acesso, correção, exclusão, portabilidade", "Anonimização automática após prazo de retenção", "Notificação de incidente de segurança (72h para ANPD)", "Log imutável de toda ação no sistema (quem/o quê/quando/IP)", "Relatório de auditoria mensal para sócios"] },
    ],
    tabelas: ["compliance_verificacoes", "lgpd_consentimentos", "pld_relatorios", "auditoria_logs", "incidentes_seguranca"],
    redis: ["cache:sancoes_list", "fila:coaf_reports", "stream:audit_events"],
  },
  {
    id: "portal", tag: "12", icon: "📱", nome: "Portal do Cliente",
    sub: "PWA · Autoatendimento · NPS · Transparência",
    cor: "#4880C8", motor: "GPT-4o (chatbot explicativo)",
    custo: "100% gratuito (Next.js PWA)",
    apis: ["Next.js PWA (mobile-first sem app store — open-source)", "Socket.io (notificações real-time — open-source)", "Typebot self-hosted (chatbot — open-source)", "Chart.js (dashboards — gratuito)"],
    grupos: [
      { g: "Acesso & Autenticação", items: ["Login via email + código SMS (sem senha)", "PWA instalável no celular sem app store", "Recuperação de acesso via WhatsApp", "Multi-caso: cliente com vários processos ativos", "Biometria para desbloqueio rápido", "QR Code na primeira entrada"] },
      { g: "Visibilidade & Comunicação", items: ["Dashboard: todos os processos em tempo real", "Timeline em linguagem simples (sem juridiquês)", "Notificação push a cada nova movimentação", "Próximas audiências e prazos relevantes", "Download de documentos do processo", "Chat com escritório + chatbot GPT-4o para dúvidas"] },
      { g: "Financeiro & Satisfação", items: ["Histórico de pagamentos e próximas parcelas", "PIX/boleto com 1 clique", "Recibos e contrato para download", "NPS automático: pós-consulta, pós-audiência, pós-encerramento", "Avaliação do atendimento em 1 clique", "Estimativa de duração restante do caso"] },
    ],
    tabelas: ["sessoes_portal", "notificacoes_cliente", "avaliacoes_nps", "mensagens_portal"],
    redis: ["session:portal_{usuario_id}", "pub:notif_{usuario_id}", "cache:dashboard_{usuario_id}"],
  },
]

const SCHEMA = [
  {
    categoria: "🏢 Multi-Tenant Core",
    cor: "#C8A050",
    tabelas: [
      {
        nome: "escritorios",
        desc: "Raiz multi-tenant — cada escritório é isolado",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK — identificador único do escritório",
          "nome VARCHAR(200) NOT NULL",
          "cnpj VARCHAR(18) UNIQUE NOT NULL",
          "oab_estado CHAR(2) NOT NULL",
          "oab_numero VARCHAR(20)",
          "email_contato VARCHAR(200)",
          "telefone VARCHAR(20)",
          "endereco JSONB — {rua, numero, cidade, uf, cep}",
          "plano VARCHAR(20) NOT NULL — solo|escritorio|enterprise",
          "plano_ativo_ate DATE",
          "max_advogados INTEGER DEFAULT 1",
          "configuracoes JSONB — {areas_atuacao, notificacoes, integrações}",
          "ativo BOOLEAN DEFAULT true",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_escritorios_cnpj (UNIQUE)", "idx_escritorios_plano"],
      },
      {
        nome: "advogados",
        desc: "Advogados vinculados ao escritório — têm acesso ao sistema",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK — identificador único do advogado",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "nome_completo VARCHAR(200) NOT NULL",
          "email VARCHAR(200) UNIQUE NOT NULL",
          "telefone VARCHAR(20)",
          "cpf VARCHAR(14) UNIQUE",
          "oab_numero VARCHAR(20)",
          "oab_estado CHAR(2)",
          "oab_tipo VARCHAR(20) — advogado|estagiario",
          "senha_hash VARCHAR(255) NOT NULL",
          "papel VARCHAR(20) NOT NULL — socio|associado|estagiario|admin",
          "areas_atuacao TEXT[] — {trabalhista,civil,familia,criminal,empresarial,previdenciario}",
          "avatar_url VARCHAR(500)",
          "configuracoes JSONB — preferências individuais",
          "ativo BOOLEAN DEFAULT true",
          "ultimo_acesso TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_advogados_escritorio", "idx_advogados_email (UNIQUE)", "idx_advogados_oab"],
      },
      {
        nome: "usuarios",
        desc: "Clientes do escritório — PF ou PJ — acesso ao portal",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK — identificador único do cliente",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "advogado_responsavel_id UUID FK → advogados.id",
          "tipo_pessoa VARCHAR(2) NOT NULL — pf|pj",
          "nome_completo VARCHAR(200) NOT NULL",
          "email VARCHAR(200)",
          "telefone VARCHAR(20) NOT NULL",
          "cpf VARCHAR(14)",
          "cnpj VARCHAR(18)",
          "nome_empresa VARCHAR(200)",
          "data_nascimento DATE",
          "endereco JSONB — {rua, numero, bairro, cidade, uf, cep}",
          "documentos_kyc JSONB — {rg_validado, cpf_validado, comprovante_resi}",
          "canal_origem VARCHAR(30) — whatsapp|instagram|site|indicacao|google",
          "ativo BOOLEAN DEFAULT true",
          "portal_ativado BOOLEAN DEFAULT false",
          "portal_senha_hash VARCHAR(255)",
          "ultimo_acesso_portal TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_usuarios_escritorio", "idx_usuarios_cpf", "idx_usuarios_cnpj", "idx_usuarios_telefone"],
      },
    ],
  },
  {
    categoria: "🎯 SDR & Qualificação",
    cor: "#C8A050",
    tabelas: [
      {
        nome: "leads",
        desc: "Todos os contatos recebidos pelo SDR antes de virar cliente",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "advogado_responsavel_id UUID FK → advogados.id",
          "nome VARCHAR(200)",
          "telefone VARCHAR(20) NOT NULL",
          "email VARCHAR(200)",
          "tipo_pessoa VARCHAR(2) — pf|pj",
          "nome_empresa VARCHAR(200)",
          "area_interesse VARCHAR(30) — trabalhista|civil|familia|criminal|empresarial|previdenciario",
          "intencao VARCHAR(20) — contratar|consulta|urgencia",
          "score INTEGER DEFAULT 0",
          "classificacao VARCHAR(10) — ouro|prata|bronze|morno|frio",
          "canal_origem VARCHAR(30)",
          "numero_cnj VARCHAR(25)",
          "tem_advogado BOOLEAN",
          "prazo_correndo BOOLEAN",
          "orcamento_disponivel BOOLEAN",
          "briefing_gpt TEXT",
          "status VARCHAR(20) DEFAULT 'novo'",
          "convertido_usuario_id UUID FK → usuarios.id",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_leads_escritorio", "idx_leads_score", "idx_leads_classificacao", "idx_leads_status"],
      },
    ],
  },
  {
    categoria: "⚖️ Casos & Estratégia",
    cor: "#7060C8",
    tabelas: [
      {
        nome: "casos",
        desc: "Caso jurídico — vínculo central entre cliente, advogado e processo",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "usuario_id UUID FK → usuarios.id NOT NULL",
          "advogado_responsavel_id UUID FK → advogados.id NOT NULL",
          "titulo VARCHAR(200) NOT NULL",
          "descricao TEXT",
          "area VARCHAR(30) NOT NULL",
          "tipo_acao VARCHAR(100)",
          "status VARCHAR(20) DEFAULT 'em_andamento'",
          "resultado VARCHAR(10) — ganho|perdido|acordo|arquivado",
          "valor_causa DECIMAL(15,2)",
          "valor_condenacao DECIMAL(15,2)",
          "score_viabilidade INTEGER",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "encerrado_em TIMESTAMPTZ",
        ],
        indices: ["idx_casos_escritorio", "idx_casos_usuario", "idx_casos_advogado", "idx_casos_status"],
      },
      {
        nome: "casos_analises",
        desc: "Vetores de embedding para busca semântica de casos similares",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "teses_utilizadas TEXT[]",
          "jurisprudencias_citadas TEXT[]",
          "argumentos_centrais TEXT",
          "fatores_vitoria TEXT[]",
          "embedding VECTOR(1536)",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_analises_caso", "idx_analises_embedding USING ivfflat"],
      },
    ],
  },
  {
    categoria: "📄 Petições & Documentos",
    cor: "#C87840",
    tabelas: [
      {
        nome: "peticoes",
        desc: "Peças processuais geradas e protocoladas",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "advogado_id UUID FK → advogados.id NOT NULL",
          "tipo VARCHAR(50) NOT NULL",
          "titulo VARCHAR(200) NOT NULL",
          "conteudo TEXT NOT NULL",
          "status VARCHAR(20) DEFAULT 'rascunho'",
          "numero_protocolo VARCHAR(50)",
          "protocolado_em TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_peticoes_caso", "idx_peticoes_status"],
      },
      {
        nome: "documentos",
        desc: "Todos os documentos do escritório — armazenados no MinIO",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id",
          "usuario_id UUID FK → usuarios.id",
          "nome_original VARCHAR(300) NOT NULL",
          "nome_armazenado VARCHAR(300) NOT NULL",
          "tipo_documento VARCHAR(30)",
          "mime_type VARCHAR(100)",
          "tamanho_bytes BIGINT",
          "caminho_minio VARCHAR(500) NOT NULL",
          "hash_sha256 VARCHAR(64) UNIQUE",
          "ocr_texto TEXT",
          "dados_extraidos JSONB",
          "embedding VECTOR(1536)",
          "tags TEXT[]",
          "vigencia_ate DATE",
          "confidencial BOOLEAN DEFAULT false",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_docs_escritorio", "idx_docs_caso", "idx_docs_hash (UNIQUE)", "idx_docs_embedding USING ivfflat"],
      },
    ],
  },
  {
    categoria: "💰 Financeiro",
    cor: "#4898C8",
    tabelas: [
      {
        nome: "faturas",
        desc: "Cobranças geradas para os clientes",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "contrato_id UUID FK → contratos.id NOT NULL",
          "usuario_id UUID FK → usuarios.id NOT NULL",
          "descricao VARCHAR(300) NOT NULL",
          "valor DECIMAL(12,2) NOT NULL",
          "tipo VARCHAR(20)",
          "status VARCHAR(15) DEFAULT 'pendente'",
          "vencimento DATE NOT NULL",
          "pago_em TIMESTAMPTZ",
          "metodo_pagamento VARCHAR(15)",
          "gateway_id VARCHAR(200)",
          "link_pagamento VARCHAR(500)",
          "qrcode_pix TEXT",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_faturas_escritorio", "idx_faturas_usuario", "idx_faturas_status", "idx_faturas_vencimento"],
      },
    ],
  },
  {
    categoria: "🛡️ Compliance & Auditoria",
    cor: "#60A860",
    tabelas: [
      {
        nome: "auditoria_logs",
        desc: "Log imutável de todas as ações no sistema",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id",
          "ator_tipo VARCHAR(10) NOT NULL — advogado|cliente|sistema|agente",
          "ator_id UUID NOT NULL",
          "acao VARCHAR(100) NOT NULL",
          "tabela_afetada VARCHAR(50)",
          "registro_id UUID",
          "dados_anteriores JSONB",
          "dados_novos JSONB",
          "ip VARCHAR(45)",
          "user_agent TEXT",
          "criado_em TIMESTAMPTZ DEFAULT NOW() — NUNCA atualizar este registro",
        ],
        indices: ["idx_audit_escritorio", "idx_audit_ator", "idx_audit_tabela", "idx_audit_criado_em"],
      },
      {
        nome: "lgpd_consentimentos",
        desc: "Consentimentos LGPD por titular e finalidade",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "usuario_id UUID FK → usuarios.id",
          "finalidade VARCHAR(100) NOT NULL",
          "base_legal VARCHAR(50)",
          "concedido BOOLEAN NOT NULL",
          "ip_consentimento VARCHAR(45)",
          "concedido_em TIMESTAMPTZ DEFAULT NOW()",
          "revogado_em TIMESTAMPTZ",
          "retencao_ate DATE",
        ],
        indices: ["idx_lgpd_usuario", "idx_lgpd_finalidade"],
      },
    ],
  },
]

const INFRA_ITEMS = [
  { icon: "🖥️", label: "VPS", desc: "Ubuntu 22.04 · 8vCPU · 16GB RAM · 200GB NVMe — Contabo/Hetzner ~R$150/mês" },
  { icon: "🐘", label: "Postgres 16", desc: "pgvector + RLS + multi-schema por escritório" },
  { icon: "⚡", label: "Redis 7", desc: "BullMQ (filas) · Pub/Sub (notificações) · Cache · Sessions" },
  { icon: "🪣", label: "MinIO", desc: "Storage S3-compatible self-hosted — documentos criptografados" },
  { icon: "🐍", label: "Venom Bot", desc: "WhatsApp Web self-hosted — sem custo por mensagem" },
  { icon: "🧠", label: "GPT-4o", desc: "Motor de raciocínio e interação — cache Redis economiza 70% tokens" },
  { icon: "🎙️", label: "Whisper", desc: "faster-whisper self-hosted — transcrição gratuita" },
  { icon: "👁️", label: "Tesseract", desc: "OCR open-source self-hosted — documentos e imagens" },
  { icon: "🔒", label: "Nginx + SSL", desc: "Reverse proxy + Let's Encrypt SSL automático" },
  { icon: "📊", label: "Grafana", desc: "Monitoramento VPS + métricas dos agentes — gratuito" },
]

const CUSTO_TOTAL = [
  ["VPS 8vCPU/16GB (Contabo)", "~R$ 150/mês"],
  ["OpenAI GPT-4o (com cache)", "~R$ 200-400/mês"],
  ["OpenAI Embeddings (text-3-small)", "~R$ 10/mês"],
  ["Asaas/OpenPix (por transação)", "1,49% por cobrança"],
  ["Domínio + Let's Encrypt SSL", "~R$ 40/ano"],
  ["Backup externo (Backblaze B2)", "~R$ 15/mês"],
  ["TOTAL MVP (até 20 escritórios)", "~R$ 380–580/mês"],
]

const MVP_FASES = [
  {
    label: "Fase 1 — Core Comercial",
    meses: "Mês 1–3",
    cor: "#C8A050",
    entrega: "Primeiro escritório atendendo e assinando contratos digitalmente",
    agentes: ["SDR & Atendimento", "Contratos", "Portal do Cliente", "Compliance & LGPD"],
    dev: ["VPS + Docker + Nginx + SSL", "Postgres multi-tenant + pgvector + Redis", "Venom Bot + GPT-4o", "Geração de contratos + Autentique", "PWA básico do portal", "Schema completo do banco"],
  },
  {
    label: "Fase 2 — Operação Jurídica",
    meses: "Mês 4–6",
    cor: "#7060C8",
    entrega: "Escritório opera sem planilhas: processos, petições e prazos automatizados",
    agentes: ["Processos Judiciais", "Petições & Protocolos", "Prazos & Agenda", "Documentos & GED", "Agente de Casos (MVP)"],
    dev: ["DataJud CNJ + Playwright tribunais", "Geração de petições GPT-4o", "Protocolo PJe via Playwright", "BullMQ alertas de prazos", "MinIO + Tesseract OCR", "Indexação inicial de casos (pgvector)"],
  },
  {
    label: "Fase 3 — Inteligência Completa",
    meses: "Mês 7–9",
    cor: "#50A87C",
    entrega: "Sistema autônomo com IA estratégica, financeiro e jurisprudência",
    agentes: ["Financeiro", "Audiências", "Inteligência Jurídica", "Agente de Casos (completo)"],
    dev: ["Asaas/OpenPix cobranças automáticas", "NFS-e automática", "Whisper self-hosted transcrições", "RAG jurisprudência STF/STJ/TST", "Dashboard analytics completo", "API pública para integrações"],
  },
]

const PRECOS = [
  { plano: "Solo", preco: "R$ 397/mês", desc: "1 advogado · 3 agentes core · até 50 clientes ativos" },
  { plano: "Escritório", preco: "R$ 897/mês", desc: "Até 5 advogados · 10 agentes · clientes ilimitados" },
  { plano: "Enterprise", preco: "R$ 1.997/mês", desc: "Ilimitado · 12 agentes · API + white label + SLA" },
]
</script>
