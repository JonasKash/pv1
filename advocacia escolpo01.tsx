import { useState } from "react";

// ═══════════════════════════════════════════════
// CONSTANTES GLOBAIS
// ═══════════════════════════════════════════════

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
};

// ═══════════════════════════════════════════════
// 12 AGENTES
// ═══════════════════════════════════════════════
const AGENTES = [
  {
    id:"sdr", tag:"01", icon:"🤝", nome:"SDR & Atendimento",
    sub:"Venom Bot · GPT-4o · Score 0–150",
    cor:"#C8A050", motor:"GPT-4o + Venom Bot",
    custo:"Gratuito (self-hosted)",
    apis:["Venom Bot (WhatsApp Web — open-source)","Meta Graph API (Instagram DM — gratuito)","Cal.com self-hosted (agendamento)","SMTP próprio via Nodemailer"],
    grupos:[
      { g:"Recepção & Intenção", items:["Atendimento 24/7 WhatsApp/Instagram/site","Primeira pergunta: contratar × consulta × urgência","Urgência detectada → escalar ao advogado em <2 min","Delay humanizado 2–5s entre mensagens (anti-ban)","Sessão de conversa salva no Redis por 24h"] },
      { g:"Qualificação Inteligente (6 etapas)", items:["E1 Intenção: contratar / consulta / urgência","E2 Perfil: PF ou PJ + cidade + CNPJ (consulta Receita)","E3 Área: trabalhista / cível / família / criminal / empresarial / previdenciário","E4 Processo: número CNJ? sem advogado? prazo correndo?","E5 Financeiro: orçamento + disposição de contratar","E6 Encaminhamento automático por score final"] },
      { g:"Score 0–150 & Classificação", items:["🏆 Ouro 90+ → WhatsApp direto do advogado agora","⭐ Prata 70–89 → agendar consulta em 24h","✅ Bronze 40–69 → consulta paga R$150–300","⏳ Morno 20–39 → nutrir conteúdo 7 dias","❄️ Frio <20 → sequência educativa 30 dias","Briefing completo gerado pelo GPT-4o para o advogado"] },
      { g:"Follow-up & CRM", items:["Régua automática: 2h, 24h, 72h, 7d, 15d, 30d (BullMQ)","Pipeline: Novo→Qualificado→Agendado→Proposta→Fechado","NPS automático pós-consulta","Reativação de leads frios trimestralmente","Dashboard de conversão por canal e área"] },
    ],
    tabelas:["leads","qualificacoes_sdr","seguimentos","comunicacoes"],
    redis:["fila:seguimentos","session:conversa_{tel}","rate:whatsapp_{tel}","score:lead_{id}"],
  },
  {
    id:"casos", tag:"02", icon:"🧠", nome:"Agente de Casos",
    sub:"Análise de Vitórias · Padrões · Estratégia com IA",
    cor:"#7060C8", motor:"GPT-4o + pgvector RAG",
    custo:"Gratuito (pgvector open-source)",
    apis:["pgvector (busca semântica — open-source)","OpenAI Embeddings text-embedding-3-small","LexML Brasil (legislação — gratuito)","STF/STJ APIs públicas (acórdãos)"],
    grupos:[
      { g:"Indexação de Casos Ganhos", items:["Ao encerrar caso como 'ganho': extração automática de padrões","GPT-4o extrai: teses utilizadas, jurisprudências citadas, argumentos centrais","Identificação dos fatores que levaram à vitória","Geração de embedding vetorial do caso (pgvector)","Armazenamento em casos_analises com metadados completos","Enriquecimento incremental: mais vitórias = estratégias melhores"] },
      { g:"Análise de Similaridade", items:["Novo caso cadastrado → busca vetorial em casos_analises","Top 5 casos mais similares por área + fatos + resultado","Score de similaridade 0–100 por caso encontrado","Destaque dos fatores que fizeram casos similares vencerem","Alerta quando novo caso tem < 3 precedentes de vitória","Comparação: casos ganhos × perdidos para identificar riscos"] },
      { g:"Geração de Estratégia", items:["Relatório automático: pontos fortes do novo caso","Teses recomendadas baseadas nas vitórias do escritório","Jurisprudências que funcionaram em casos análogos","Pontos de atenção: o que diferencia este caso dos ganhos","Score de viabilidade 0–100 com justificativa","Estimativa de valor mínimo e máximo de condenação"] },
      { g:"Inteligência Contínua", items:["Base cresce a cada caso encerrado (ganho ou perdido)","Análise de casos perdidos: o que poderia ter sido diferente","Ranking de teses mais eficazes por tribunal e vara","Relatório mensal: taxa de sucesso por área e advogado","Padrões de decisão por juiz (quando identificável)","Exportação de estratégias para biblioteca de modelos"] },
    ],
    tabelas:["casos_analises","estrategias","jurisprudencias_base","modelos_estrategia"],
    redis:["cache:analise_{caso_id}","fila:indexar_caso","cache:embedding_{hash}"],
  },
  {
    id:"contratos", tag:"03", icon:"📝", nome:"Contratos",
    sub:"Geração · Assinatura Digital · Gestão",
    cor:"#50A87C", motor:"GPT-4o",
    custo:"Autentique (5 docs/mês grátis)",
    apis:["Autentique (assinatura digital — plano gratuito)","PDFLib (geração PDF — open-source)","Handlebars.js (templates — gratuito)","Nodemailer (envio — gratuito)"],
    grupos:[
      { g:"Geração Automática", items:["Templates por área: trabalhista, cível, família, criminal, empresarial, previdenciário","Tipos: honorário fixo, êxito, misto, mensalidade, hora","Preenchimento automático com dados do lead/cliente","Cláusulas específicas geradas por GPT-4o conforme o caso","Tabela de parcelas, vencimentos e multas","Compliance OAB: art. 49 CED verificado automaticamente"] },
      { g:"Assinatura & Controle", items:["Envio via WhatsApp + email simultaneamente","Assinatura digital com validade jurídica (Autentique)","Tracking: enviado → visualizado → assinado","Reenvio automático após 24h sem assinatura","Versionamento completo com diff visual","Alertas de vencimento: 30, 15, 7 dias antes"] },
      { g:"Gestão Pós-assinatura", items:["Status: Rascunho→Enviado→Assinado→Ativo→Encerrado","Aditivos com controle de versão","Rescisão com cálculo automático de honorários devidos","Renovação automática com aprovação do advogado","Relatório mensal por status e valor total","Armazenamento criptografado no MinIO"] },
    ],
    tabelas:["contratos","contratos_versoes","contratos_modelos","assinaturas"],
    redis:["fila:reenvio_contrato","event:assinatura_webhook","cache:modelo_{tipo}"],
  },
  {
    id:"processos", tag:"04", icon:"⚖️", nome:"Processos Judiciais",
    sub:"CNJ · Tribunais · Monitoramento Real-time",
    cor:"#C05050", motor:"Playwright + GPT-4o",
    custo:"100% gratuito (APIs públicas)",
    apis:["DataJud CNJ (API pública — gratuita)","PJe API pública","Playwright (scraping tribunais sem API — open-source)","BrasilAPI (dados complementares — gratuito)"],
    grupos:[
      { g:"Consulta Automatizada", items:["Cobertura: STF, STJ, TST, TRFs, TJs (todos estados), TRTs, JEFs","Busca: número CNJ, CPF/CNPJ, nome da parte","Polling automático a cada 4h por processo ativo","Cache Redis com TTL por tribunal (evita rate limit)","Fallback Playwright quando API indisponível","Schema normalizado: dados de todos os tribunais em formato único"] },
      { g:"Monitoramento & Alertas", items:["Classificação de movimentação: decisão / despacho / sentença / acórdão / intimação","Alertas críticos: sentença condenatória, liminar, penhora, bloqueio BACENJUD","Notificação imediata: WhatsApp do advogado + portal do cliente","Extração de prazos implícitos nas intimações (GPT-4o)","Criação automática de prazo no Agente 06 ao detectar intimação","Linha do tempo visual completa do processo"] },
      { g:"Análise & Relatórios", items:["Resumo executivo de movimentação em linguagem simples para cliente","Extração estruturada: datas, valores, partes, decisão (GPT-4o)","Sugestão automática de próxima ação ao advogado","Relatório de andamento mensal por processo","Estatísticas: processos ativos, por fase, por tribunal","Detecção: arquivamento, extinção, trânsito em julgado"] },
    ],
    tabelas:["processos_judiciais","movimentacoes_processuais","partes_processo","monitoramento_config"],
    redis:["cache:tribunal:{sigla}_{numero}","fila:polling_processos","lock:processo_{numero}"],
  },
  {
    id:"peticoes", tag:"05", icon:"📄", nome:"Petições & Protocolos",
    sub:"Geração IA · Revisão · Protocolo Eletrônico",
    cor:"#C87840", motor:"GPT-4o",
    custo:"100% gratuito (PJe público)",
    apis:["PJe (protocolo eletrônico — público)","Playwright (automação protocolo — open-source)","PDFLib (montagem PDF — open-source)","Tesseract OCR (leitura de peças digitalizadas — gratuito)"],
    grupos:[
      { g:"Biblioteca & Geração", items:["Petição inicial por área e tipo de ação","Contestação, réplica, tréplica, impugnação","Recursos: apelação, agravo, embargos, REsp, RE","Tutela antecipada, liminar, arresto, sequestro","Peças de execução: cumprimento, penhora SISBAJUD","Geração completa via GPT-4o com fatos + teses + pedidos"] },
      { g:"Fluxo de Aprovação", items:["Rascunho → Revisão → Aprovada → Protocolada","Editor inline com sugestões do GPT-4o","Histórico de versões com diff visual","Assinatura digital do advogado (certificado A1/A3)","Aprovação com 1 clique para protocolo","Notificação WhatsApp de aprovação pendente"] },
      { g:"Protocolo & Controle", items:["Protocolo automático via Playwright: PJe, e-SAJ, PROJUDI, eProc","Verificação pré-protocolo: prazo, formato, tamanho","Comprovante com número de protocolo em PDF","Retry automático em falha do sistema do tribunal","Log completo com timestamp de cada protocolo","Alerta se protocolo não confirmado em 30 min"] },
    ],
    tabelas:["peticoes","peticoes_versoes","protocolos","peticoes_modelos"],
    redis:["fila:protocolo","lock:protocolo_{processo}","cache:status_tribunal"],
  },
  {
    id:"prazos", tag:"06", icon:"⏰", nome:"Prazos & Agenda",
    sub:"Cálculo Automático · Alertas · Google Calendar",
    cor:"#C8B840", motor:"Determinístico + GPT-4o",
    custo:"100% gratuito",
    apis:["Google Calendar API (gratuito)","BrasilAPI feriados (gratuito)","node-schedule (open-source)","BullMQ (open-source)"],
    grupos:[
      { g:"Cadastro & Cálculo", items:["Cadastro manual + extração automática de intimações (GPT-4o)","Importação automática via Agente de Processos","Tipos: processual, administrativo, contratual, interno","Cálculo: dias úteis ou corridos excluindo feriados estaduais e forenses","Feriados por comarca e estado (BrasilAPI)","Criação automática ao detectar intimação/decisão"] },
      { g:"Alertas Escalonados", items:["10d → 5d → 2d → 1d → no dia → vencido","Alerta crítico imediato se prazo < 24h","Notificação: WhatsApp + email do advogado","Escalação para sócio se prazo crítico sem resposta em 2h","Confirmação de ciência obrigatória pelo advogado","Relatório semanal de prazos da próxima semana"] },
      { g:"Agenda & Controle", items:["Calendário unificado do escritório","Sincronização bidirecional com Google Calendar","Detecção de conflito de agenda","Bloqueio de recesso forense automático","Visualização: dia / semana / mês / por advogado / por área","Dashboard: hoje / esta semana / vencidos / cumpridos"] },
    ],
    tabelas:["prazos","prazos_alertas","eventos_agenda","feriados_forenses"],
    redis:["scheduler:alertas","fila:notificacoes_prazo","cache:feriados_{uf}"],
  },
  {
    id:"financeiro", tag:"07", icon:"💰", nome:"Financeiro",
    sub:"Honorários · Cobrança · NFS-e · Conciliação",
    cor:"#4898C8", motor:"Determinístico",
    custo:"OpenPix (PIX grátis), Asaas (sem mensalidade)",
    apis:["OpenPix (PIX — sem mensalidade)","Asaas (boleto/cartão — taxa por uso)","NFSe.io (nota fiscal — plano gratuito limitado)","Open Finance (conciliação — gratuito)"],
    grupos:[
      { g:"Honorários & Faturamento", items:["Tipos: fixo, êxito, misto, mensalidade, hora","Geração automática de fatura no vencimento","Parcelamento com juros configurável","Honorários de êxito: cálculo sobre condenação com alerta","Desconto por pontualidade ou indicação","Relatório: receita realizada × prevista × inadimplente"] },
      { g:"Cobrança & Pagamento", items:["PIX com QR Code automático (OpenPix)","Boleto com multa/juros automáticos (Asaas)","Link de pagamento via WhatsApp + email","Confirmação em tempo real (webhook)","Recibo automático em PDF após pagamento","Régua de inadimplência: D+1 / D+3 / D+7 / D+15 / D+30"] },
      { g:"Fiscal & Contábil", items:["NFS-e automática após confirmação de pagamento","Múltiplos municípios e alíquotas ISS","Fluxo de caixa: entradas previstas × realizadas","DRE simplificado do escritório","Conciliação bancária via OFX/CSV","Exportação contábil mensal para contador"] },
    ],
    tabelas:["faturas","pagamentos","notas_fiscais","fluxo_caixa","conciliacao_bancaria"],
    redis:["webhook:pagamento_{gateway}","fila:cobranca_automatica","cache:inadimplencia"],
  },
  {
    id:"documentos", tag:"08", icon:"🗂️", nome:"Documentos & GED",
    sub:"OCR · Classificação · Busca Semântica · MinIO",
    cor:"#60A840", motor:"GPT-4o Vision + Tesseract",
    custo:"100% gratuito (self-hosted)",
    apis:["Tesseract OCR (open-source self-hosted)","MinIO (storage S3-compatible self-hosted)","pgvector (busca semântica — open-source)","Sharp (processamento de imagem — open-source)"],
    grupos:[
      { g:"Recebimento & OCR", items:["Upload web / WhatsApp (foto) / email anexo / scanner","OCR Tesseract para documentos digitalizados","GPT-4o Vision para manuscritos e documentos complexos","Extração: nome, CPF, CNPJ, datas, valores, vigências","Detecção automática do tipo de documento","Verificação de qualidade e autenticidade da imagem"] },
      { g:"Classificação & Organização", items:["Auto-classificação: RG, CPF, CNH, procuração, certidão, contrato, decisão judicial","Vinculação automática ao caso/cliente correto","Detecção de documentos duplicados (hash SHA-256)","Controle de vigência: alertas de documentos vencendo","Organização em pastas virtuais por caso","Checklist de documentos necessários por área (due diligence)"] },
      { g:"Armazenamento & Busca", items:["MinIO self-hosted: custo zero de storage","Criptografia AES-256 em todos os arquivos","Controle de acesso por papel (advogado / assistente / cliente)","Log de acesso: quem baixou, quando, qual IP","Busca semântica por conteúdo com pgvector","Exportação compactada de toda documentação do caso"] },
    ],
    tabelas:["documentos","documentos_extraidos","documentos_acessos","documentos_embeddings"],
    redis:["fila:ocr_processing","lock:upload_{hash}","cache:tipos_documento"],
  },
  {
    id:"audiencias", tag:"09", icon:"🎙️", nome:"Audiências",
    sub:"Pauta · Transcrição Whisper · Ata Automática",
    cor:"#9060C8", motor:"Whisper + GPT-4o",
    custo:"100% gratuito (Whisper self-hosted)",
    apis:["Whisper self-hosted (faster-whisper — gratuito)","Google Meet API (gratuito)","Zoom API (plano básico gratuito)","Whereby Embedded (sala virtual — plano gratuito)"],
    grupos:[
      { g:"Preparação", items:["Audiências extraídas automaticamente do Agente de Processos","Pauta: partes, testemunhas, peritos, objeto","Preparatório: resumo do processo + pontos-chave + estratégia","Briefing do adversário: peças anteriores, posicionamento","Lista de documentos a levar","Lembretes D-2 e H-2 para advogado e cliente"] },
      { g:"Transcrição & Ata", items:["Gravação com consentimento via link seguro","Transcrição em tempo real com Whisper self-hosted","Identificação de falantes automática","Geração de ata estruturada via GPT-4o","Resumo executivo em linguagem simples para o cliente","Extração de decisões, determinações e prazos da ata"] },
      { g:"Pós-audiência", items:["Criação automática de prazos no Agente 06 (determinações da ata)","Sugestão de próximas peças a protocolar","Envio da ata ao cliente via portal e WhatsApp","Arquivamento da gravação e transcrição no GED (Agente 08)","Atualização do status do processo","Integração automática com Agente de Casos para análise"] },
    ],
    tabelas:["audiencias","audiencias_transcricoes","audiencias_participantes","audiencias_gravacoes"],
    redis:["fila:transcricao_audio","stream:live_transcription","cache:audiencia_prep_{id}"],
  },
  {
    id:"juridico_ia", tag:"10", icon:"📚", nome:"Inteligência Jurídica",
    sub:"Jurisprudência · RAG · Legislação · Pesquisa",
    cor:"#C05080", motor:"GPT-4o + RAG pgvector",
    custo:"STJ/STF APIs gratuitas",
    apis:["LexML Brasil (legislação — API pública gratuita)","STF e-doc API (acórdãos — gratuito)","STJ API pública (gratuito)","pgvector (busca semântica — open-source)"],
    grupos:[
      { g:"Base de Conhecimento", items:["Indexação de acórdãos: STF, STJ, TST, TJs, TRTs","Legislação atualizada via LexML Brasil","Súmulas Vinculantes e Teses de Repercussão Geral","Atualização automática diária da base","Embeddings pgvector para busca semântica","Filtros: tribunal, período, relator, resultado, área"] },
      { g:"Pesquisa & Suporte", items:["Busca semântica: encontra casos por similaridade de fatos","Resumo de acórdãos em 3 parágrafos via GPT-4o","Citação formatada para uso direto na peça","Artigos de lei relacionados com explicação prática","Verificação: existe precedente favorável para esta tese?","Análise de contradição de teses no processo"] },
      { g:"Monitoramento Legislativo", items:["Alertas de novas leis por área de atuação do escritório","Resumo de reforma legislativa com impacto prático","Monitoramento de PLs relevantes no Congresso","Boletim jurídico semanal por área (WhatsApp/email)","Atualização automática de modelos de petições","Integração com Agente 02 (Casos) para enriquecer estratégias"] },
    ],
    tabelas:["jurisprudencias_base","jurisprudencias_embeddings","legislacao","sumulas","boletins_juridicos"],
    redis:["cache:pesquisa_juri_{hash}","fila:indexacao_acordaos","cache:lexmlbr_feed"],
  },
  {
    id:"compliance", tag:"11", icon:"🛡️", nome:"Compliance & LGPD",
    sub:"OAB · PLD/FT · LGPD · Auditoria Completa",
    cor:"#60A860", motor:"Determinístico + GPT-4o",
    custo:"COAF SISCOAF gratuito/obrigatório",
    apis:["COAF SISCOAF (comunicações — gratuito/obrigatório)","ReceitaFederal API (CPF/CNPJ — gratuita)","OpenSanctions (listas PEP/sanções — open-source)","Winston Logger (auditoria estruturada — gratuito)"],
    grupos:[
      { g:"Conflito de Interesses", items:["Verificação automática antes de aceitar novo caso","Base histórica de partes: clientes, adversários, testemunhas, peritos","Detecção de relação societária via CNPJ (Receita Federal)","Alerta para advogado responsável ao detectar conflito","Registro de impedimentos com motivação","Relatório de conflitos para sócios"] },
      { g:"PLD/FT & KYC", items:["Identificação de PEPs (Pessoas Expostas Politicamente)","Consulta: listas OFAC, ONU, OpenSanctions","KYC aprofundado para transações > R$50.000","Monitoramento de padrões suspeitos de pagamento","Geração automática de ROS para o COAF (SISCOAF)","Treinamento periódico da equipe com registro de conclusão"] },
      { g:"LGPD & Auditoria", items:["Registro de consentimentos por finalidade e data","Portal de direitos: acesso, correção, exclusão, portabilidade","Anonimização automática após prazo de retenção","Notificação de incidente de segurança (72h para ANPD)","Log imutável de toda ação no sistema (quem/o quê/quando/IP)","Relatório de auditoria mensal para sócios"] },
    ],
    tabelas:["compliance_verificacoes","lgpd_consentimentos","pld_relatorios","auditoria_logs","incidentes_seguranca"],
    redis:["cache:sancoes_list","fila:coaf_reports","stream:audit_events"],
  },
  {
    id:"portal", tag:"12", icon:"📱", nome:"Portal do Cliente",
    sub:"PWA · Autoatendimento · NPS · Transparência",
    cor:"#4880C8", motor:"GPT-4o (chatbot explicativo)",
    custo:"100% gratuito (Next.js PWA)",
    apis:["Next.js PWA (mobile-first sem app store — open-source)","Socket.io (notificações real-time — open-source)","Typebot self-hosted (chatbot — open-source)","Chart.js (dashboards — gratuito)"],
    grupos:[
      { g:"Acesso & Autenticação", items:["Login via email + código SMS (sem senha)","PWA instalável no celular sem app store","Recuperação de acesso via WhatsApp","Multi-caso: cliente com vários processos ativos","Biometria para desbloqueio rápido","QR Code na primeira entrada"] },
      { g:"Visibilidade & Comunicação", items:["Dashboard: todos os processos em tempo real","Timeline em linguagem simples (sem juridiquês)","Notificação push a cada nova movimentação","Próximas audiências e prazos relevantes","Download de documentos do processo","Chat com escritório + chatbot GPT-4o para dúvidas"] },
      { g:"Financeiro & Satisfação", items:["Histórico de pagamentos e próximas parcelas","PIX/boleto com 1 clique","Recibos e contrato para download","NPS automático: pós-consulta, pós-audiência, pós-encerramento","Avaliação do atendimento em 1 clique","Estimativa de duração restante do caso"] },
    ],
    tabelas:["sessoes_portal","notificacoes_cliente","avaliacoes_nps","mensagens_portal"],
    redis:["session:portal_{usuario_id}","pub:notif_{usuario_id}","cache:dashboard_{usuario_id}"],
  },
];

// ═══════════════════════════════════════════════
// BANCO DE DADOS COMPLETO
// ═══════════════════════════════════════════════
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
        indices: ["idx_escritorios_cnpj (UNIQUE)","idx_escritorios_plano"],
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
        indices: ["idx_advogados_escritorio","idx_advogados_email (UNIQUE)","idx_advogados_oab"],
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
        indices: ["idx_usuarios_escritorio","idx_usuarios_cpf","idx_usuarios_cnpj","idx_usuarios_telefone"],
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
          "id UUID PK — identificador único do lead",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "advogado_responsavel_id UUID FK → advogados.id",
          "nome VARCHAR(200)",
          "telefone VARCHAR(20) NOT NULL",
          "email VARCHAR(200)",
          "tipo_pessoa VARCHAR(2) — pf|pj",
          "nome_empresa VARCHAR(200)",
          "cnpj VARCHAR(18)",
          "cidade VARCHAR(100)",
          "estado CHAR(2)",
          "canal_origem VARCHAR(30) NOT NULL — whatsapp|instagram|site|indicacao|google",
          "intencao VARCHAR(20) — contratar|consulta|urgencia",
          "area_direito VARCHAR(30) — trabalhista|civil|familia|criminal|empresarial|previdenciario",
          "descricao_caso TEXT",
          "numero_processo VARCHAR(30)",
          "tem_advogado BOOLEAN",
          "tem_processo BOOLEAN",
          "prazo_urgente BOOLEAN DEFAULT false",
          "score INTEGER DEFAULT 0",
          "classificacao VARCHAR(10) — ouro|prata|bronze|morno|frio",
          "status VARCHAR(20) DEFAULT 'novo' — novo|qualificado|agendado|consulta|proposta|fechado|perdido",
          "motivo_perda VARCHAR(200)",
          "convertido_usuario_id UUID FK → usuarios.id",
          "briefing_advogado TEXT",
          "dados_enriquecidos JSONB — {receita_federal, dataJud}",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_leads_escritorio","idx_leads_score","idx_leads_status","idx_leads_telefone","idx_leads_classificacao"],
      },
      {
        nome: "qualificacoes_sdr",
        desc: "Estado da conversa de qualificação do SDR por lead",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "lead_id UUID FK → leads.id NOT NULL",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "estagio_atual VARCHAR(20) — recepcao|perfil|area|processo|financeiro|encaminhamento",
          "historico_conversa JSONB[] — [{role, content, timestamp}]",
          "dados_coletados JSONB — todos os campos extraídos",
          "score_parcial INTEGER DEFAULT 0",
          "score_final INTEGER",
          "flags_criticas TEXT[] — urgencia_criminal, sem_advogado, prazo_imediato",
          "analise_ia JSONB — extração GPT-4o dos dados",
          "encaminhado_advogado_id UUID FK → advogados.id",
          "encaminhado_em TIMESTAMPTZ",
          "canal VARCHAR(20) — whatsapp|instagram|site",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_qualif_lead","idx_qualif_escritorio","idx_qualif_estagio"],
      },
      {
        nome: "seguimentos",
        desc: "Fila de follow-ups automáticos do SDR",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "lead_id UUID FK → leads.id",
          "usuario_id UUID FK → usuarios.id",
          "tipo VARCHAR(20) — follow_up|lembrete|nutricao|cobranca|reativacao",
          "canal VARCHAR(20) — whatsapp|email|sms",
          "mensagem TEXT NOT NULL",
          "agendado_para TIMESTAMPTZ NOT NULL",
          "status VARCHAR(15) DEFAULT 'pendente' — pendente|enviado|falhou|cancelado",
          "tentativas INTEGER DEFAULT 0",
          "max_tentativas INTEGER DEFAULT 3",
          "erro_ultimo TEXT",
          "enviado_em TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_seguimentos_agendado","idx_seguimentos_status","idx_seguimentos_lead"],
      },
    ],
  },
  {
    categoria: "⚖️ Casos & Processos",
    cor: "#7060C8",
    tabelas: [
      {
        nome: "casos",
        desc: "Núcleo central — cada caso vincula cliente, advogado e processo",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK — identificador único do caso",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "usuario_id UUID FK → usuarios.id NOT NULL",
          "advogado_responsavel_id UUID FK → advogados.id NOT NULL",
          "advogados_auxiliares UUID[] — array de advogados.id",
          "lead_id UUID FK → leads.id",
          "titulo VARCHAR(300) NOT NULL",
          "descricao TEXT",
          "area_direito VARCHAR(30) NOT NULL",
          "tipo_acao VARCHAR(100)",
          "status VARCHAR(20) DEFAULT 'em_andamento' — pre_judicial|em_andamento|aguardando|encerrado|ganho|perdido|acordo",
          "resultado VARCHAR(20) — ganho|perdido|acordo|extinto|desistencia",
          "valor_causa DECIMAL(15,2)",
          "valor_obtido DECIMAL(15,2)",
          "probabilidade_exito INTEGER — 0 a 100 (gerado pelo Agente 02)",
          "data_abertura DATE NOT NULL DEFAULT CURRENT_DATE",
          "data_encerramento DATE",
          "observacoes TEXT",
          "tags TEXT[]",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_casos_escritorio","idx_casos_usuario","idx_casos_advogado","idx_casos_status","idx_casos_area"],
      },
      {
        nome: "processos_judiciais",
        desc: "Processos vinculados aos casos — monitorados nos tribunais",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "caso_id UUID FK → casos.id NOT NULL",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "numero_processo VARCHAR(25) UNIQUE NOT NULL — formato CNJ",
          "tribunal VARCHAR(10) NOT NULL — STF|STJ|TJ|TRT|TRF|TST|JEF",
          "sigla_tribunal VARCHAR(10)",
          "vara VARCHAR(200)",
          "comarca VARCHAR(200)",
          "estado CHAR(2)",
          "classe_processual VARCHAR(200)",
          "assunto VARCHAR(300)",
          "polo_ativo JSONB[] — [{nome, cpf_cnpj, tipo}]",
          "polo_passivo JSONB[] — [{nome, cpf_cnpj, tipo}]",
          "fase_atual VARCHAR(100)",
          "valor_causa DECIMAL(15,2)",
          "data_distribuicao DATE",
          "data_ultima_movimentacao TIMESTAMPTZ",
          "status_monitoramento VARCHAR(10) DEFAULT 'ativo' — ativo|pausado|encerrado",
          "ultima_consulta_tribunal TIMESTAMPTZ",
          "dados_tribunal_raw JSONB — resposta bruta da API",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_proc_numero (UNIQUE)","idx_proc_caso","idx_proc_tribunal","idx_proc_status_monit"],
      },
      {
        nome: "movimentacoes_processuais",
        desc: "Histórico de todas as movimentações de cada processo",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "processo_id UUID FK → processos_judiciais.id NOT NULL",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "data_movimentacao TIMESTAMPTZ NOT NULL",
          "tipo VARCHAR(20) — decisao|despacho|sentenca|acordao|intimacao|audiencia|outros",
          "descricao TEXT NOT NULL",
          "conteudo_completo TEXT",
          "resumo_ia TEXT — resumo em linguagem simples gerado pelo GPT-4o",
          "flags TEXT[] — urgente|prazo|penhora|sentenca_condenatoria|liminar",
          "prazos_extraidos JSONB[] — [{descricao, data_limite, dias}]",
          "notificado_advogado BOOLEAN DEFAULT false",
          "notificado_cliente BOOLEAN DEFAULT false",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_movim_processo","idx_movim_data","idx_movim_tipo","idx_movim_flags USING GIN"],
      },
    ],
  },
  {
    categoria: "🧠 Agente de Casos — Inteligência",
    cor: "#7060C8",
    tabelas: [
      {
        nome: "casos_analises",
        desc: "Base de conhecimento — casos encerrados analisados pela IA para gerar estratégias futuras",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "area_direito VARCHAR(30) NOT NULL",
          "tipo_acao VARCHAR(100)",
          "tribunal VARCHAR(10)",
          "resultado VARCHAR(20) NOT NULL — ganho|perdido|acordo",
          "valor_causa DECIMAL(15,2)",
          "valor_obtido DECIMAL(15,2)",
          "duracao_dias INTEGER",
          "fatores_vitoria JSONB — {teses, argumentos, jurisprudencias, pontos_decisivos}",
          "fatores_derrota JSONB — preenchido se perdido",
          "teses_utilizadas TEXT[] NOT NULL",
          "jurisprudencias_citadas JSONB[] — [{tribunal, numero, ementa_resumo}]",
          "sumulas_aplicadas TEXT[]",
          "resumo_estrategia TEXT NOT NULL",
          "pontos_fortes TEXT[]",
          "pontos_fracos TEXT[]",
          "embedding VECTOR(1536) — pgvector para busca semântica",
          "gerado_por_ia BOOLEAN DEFAULT true",
          "revisado_por_advogado_id UUID FK → advogados.id",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_analise_escritorio","idx_analise_area","idx_analise_resultado","idx_analise_embedding USING ivfflat (embedding vector_cosine_ops)"],
      },
      {
        nome: "estrategias",
        desc: "Estratégias geradas pelo Agente 02 para novos casos",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "gerado_por_advogado_id UUID FK → advogados.id",
          "casos_referencia UUID[] — array de casos_analises.id usados como base",
          "area_direito VARCHAR(30)",
          "tipo_acao VARCHAR(100)",
          "score_viabilidade INTEGER NOT NULL — 0 a 100",
          "pontos_fortes TEXT[] NOT NULL",
          "pontos_fracos TEXT[]",
          "teses_recomendadas JSONB[] — [{tese, fundamentacao, jurisprudencias}]",
          "jurisprudencias_sugeridas JSONB[] — [{tribunal, numero, relevancia}]",
          "estimativa_duracao VARCHAR(50)",
          "estimativa_valor_minimo DECIMAL(15,2)",
          "estimativa_valor_maximo DECIMAL(15,2)",
          "justificativa_score TEXT",
          "observacoes TEXT",
          "aprovada_pelo_advogado BOOLEAN DEFAULT false",
          "aprovada_em TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_estrategia_caso","idx_estrategia_score","idx_estrategia_area"],
      },
      {
        nome: "jurisprudencias_base",
        desc: "Base indexada de jurisprudência para pesquisa semântica",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "tribunal VARCHAR(10) NOT NULL",
          "numero_processo VARCHAR(30)",
          "tipo VARCHAR(20) — acordao|sumula|tese_repercussao|enunciado",
          "area_direito TEXT[]",
          "ementa TEXT NOT NULL",
          "ementa_resumo TEXT — resumo em 3 parágrafos (GPT-4o)",
          "resultado VARCHAR(20) — provido|improvido|parcialmente_provido",
          "relator VARCHAR(200)",
          "data_julgamento DATE",
          "url_inteiro_teor VARCHAR(500)",
          "embedding VECTOR(1536)",
          "importado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_juris_tribunal","idx_juris_area USING GIN","idx_juris_embedding USING ivfflat (embedding vector_cosine_ops)"],
      },
    ],
  },
  {
    categoria: "📝 Contratos & Petições",
    cor: "#50A87C",
    tabelas: [
      {
        nome: "contratos",
        desc: "Contratos de honorários entre advogado e cliente",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "usuario_id UUID FK → usuarios.id NOT NULL",
          "advogado_id UUID FK → advogados.id NOT NULL",
          "tipo_honorario VARCHAR(15) NOT NULL — fixo|exito|misto|mensalidade|hora",
          "valor_fixo DECIMAL(12,2)",
          "percentual_exito DECIMAL(5,2)",
          "valor_mensalidade DECIMAL(12,2)",
          "valor_hora DECIMAL(10,2)",
          "total_estimado DECIMAL(12,2)",
          "status VARCHAR(15) DEFAULT 'rascunho' — rascunho|enviado|visualizado|assinado|ativo|encerrado|rescindido",
          "conteudo_html TEXT",
          "hash_conteudo VARCHAR(64) — SHA-256 do conteúdo",
          "assinado_advogado_em TIMESTAMPTZ",
          "assinado_cliente_em TIMESTAMPTZ",
          "url_documento_assinado VARCHAR(500)",
          "provider_assinatura VARCHAR(30) — autentique|docusign",
          "provider_id_externo VARCHAR(200)",
          "validade_ate DATE",
          "versao_atual INTEGER DEFAULT 1",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_contratos_caso","idx_contratos_usuario","idx_contratos_status"],
      },
      {
        nome: "peticoes",
        desc: "Peças processuais elaboradas pelos advogados",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "processo_id UUID FK → processos_judiciais.id",
          "advogado_id UUID FK → advogados.id NOT NULL",
          "tipo VARCHAR(30) — inicial|contestacao|replica|recurso|manifestacao|execucao|outros",
          "titulo VARCHAR(300) NOT NULL",
          "conteudo_html TEXT NOT NULL",
          "gerado_por_ia BOOLEAN DEFAULT false",
          "status VARCHAR(15) DEFAULT 'rascunho' — rascunho|revisao|aprovada|protocolada|rejeitada",
          "aprovada_por_id UUID FK → advogados.id",
          "aprovada_em TIMESTAMPTZ",
          "versao_atual INTEGER DEFAULT 1",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_peticoes_caso","idx_peticoes_status","idx_peticoes_advogado"],
      },
      {
        nome: "protocolos",
        desc: "Registro de protocolos eletrônicos de petições",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "peticao_id UUID FK → peticoes.id NOT NULL",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "sistema VARCHAR(20) NOT NULL — pje|esaj|projudi|eproc|seeu",
          "numero_protocolo VARCHAR(50)",
          "data_protocolo TIMESTAMPTZ",
          "status VARCHAR(15) — pendente|confirmado|rejeitado|erro",
          "comprovante_url VARCHAR(500)",
          "erro_descricao TEXT",
          "tentativas INTEGER DEFAULT 0",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_prot_peticao","idx_prot_numero","idx_prot_status"],
      },
    ],
  },
  {
    categoria: "⏰ Prazos, Audiências & Docs",
    cor: "#C8B840",
    tabelas: [
      {
        nome: "prazos",
        desc: "Prazos processuais e administrativos do escritório",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id",
          "processo_id UUID FK → processos_judiciais.id",
          "advogado_responsavel_id UUID FK → advogados.id NOT NULL",
          "movimentacao_id UUID FK → movimentacoes_processuais.id",
          "titulo VARCHAR(300) NOT NULL",
          "descricao TEXT",
          "tipo VARCHAR(20) — processual|administrativo|contratual|interno",
          "data_base DATE",
          "quantidade_dias INTEGER",
          "dias_uteis BOOLEAN DEFAULT true",
          "data_prazo TIMESTAMPTZ NOT NULL",
          "status VARCHAR(15) DEFAULT 'pendente' — pendente|cumprido|perdido|cancelado",
          "cumprido_por_id UUID FK → advogados.id",
          "cumprido_em TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_prazos_escritorio","idx_prazos_data","idx_prazos_status","idx_prazos_advogado"],
      },
      {
        nome: "prazos_alertas",
        desc: "Histórico de alertas enviados para cada prazo",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "prazo_id UUID FK → prazos.id NOT NULL",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "tipo VARCHAR(20) — 10d|5d|2d|1d|hoje|vencido|critico",
          "canal VARCHAR(20) — whatsapp|email",
          "destinatario_id UUID NOT NULL",
          "destinatario_tipo VARCHAR(10) — advogado|socio",
          "enviado_em TIMESTAMPTZ DEFAULT NOW()",
          "confirmado_ciencia BOOLEAN DEFAULT false",
          "confirmado_em TIMESTAMPTZ",
        ],
        indices: ["idx_prazos_alertas_prazo","idx_prazos_alertas_tipo"],
      },
      {
        nome: "audiencias",
        desc: "Audiências judiciais e reuniões do escritório",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "caso_id UUID FK → casos.id NOT NULL",
          "processo_id UUID FK → processos_judiciais.id",
          "advogado_id UUID FK → advogados.id NOT NULL",
          "titulo VARCHAR(300) NOT NULL",
          "tipo VARCHAR(30) — instrucao|conciliacao|julgamento|pericia|depoimento|reuniao",
          "data_hora TIMESTAMPTZ NOT NULL",
          "duracao_minutos INTEGER DEFAULT 60",
          "local VARCHAR(300)",
          "modalidade VARCHAR(15) — presencial|virtual|hibrida",
          "link_sala VARCHAR(500)",
          "status VARCHAR(15) DEFAULT 'agendada' — agendada|realizada|cancelada|redesignada",
          "gravacao_url VARCHAR(500)",
          "gravacao_duracao_seg INTEGER",
          "transcricao TEXT",
          "ata_html TEXT",
          "resumo_ia TEXT",
          "prazos_extraidos JSONB[]",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_audiencias_caso","idx_audiencias_data","idx_audiencias_status","idx_audiencias_advogado"],
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
          "peticao_id UUID FK → peticoes.id",
          "advogado_upload_id UUID FK → advogados.id",
          "nome_original VARCHAR(300) NOT NULL",
          "nome_armazenado VARCHAR(300) NOT NULL",
          "tipo_documento VARCHAR(30) — rg|cpf|cnh|comprovante|contrato|procuracao|certidao|decisao|peticao|outros",
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
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_docs_escritorio","idx_docs_caso","idx_docs_usuario","idx_docs_tipo","idx_docs_hash (UNIQUE)","idx_docs_embedding USING ivfflat"],
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
          "advogado_id UUID FK → advogados.id NOT NULL",
          "descricao VARCHAR(300) NOT NULL",
          "valor DECIMAL(12,2) NOT NULL",
          "tipo VARCHAR(20) — honorario_fixo|parcela|exito|mensalidade|consulta|reembolso",
          "numero_parcela INTEGER",
          "total_parcelas INTEGER",
          "status VARCHAR(15) DEFAULT 'pendente' — pendente|enviada|vencida|paga|cancelada|estornada",
          "vencimento DATE NOT NULL",
          "pago_em TIMESTAMPTZ",
          "metodo_pagamento VARCHAR(15) — pix|boleto|cartao|transferencia",
          "gateway_id VARCHAR(200)",
          "gateway VARCHAR(15) — asaas|openpix",
          "link_pagamento VARCHAR(500)",
          "qrcode_pix TEXT",
          "multa_juros DECIMAL(10,2) DEFAULT 0",
          "desconto DECIMAL(10,2) DEFAULT 0",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "atualizado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_faturas_escritorio","idx_faturas_usuario","idx_faturas_status","idx_faturas_vencimento"],
      },
      {
        nome: "notas_fiscais",
        desc: "NFS-e emitidas pelo escritório",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "fatura_id UUID FK → faturas.id NOT NULL",
          "usuario_id UUID FK → usuarios.id NOT NULL",
          "numero_nfse VARCHAR(50)",
          "codigo_verificacao VARCHAR(50)",
          "municipio VARCHAR(100)",
          "aliquota_iss DECIMAL(5,2)",
          "valor_servico DECIMAL(12,2)",
          "valor_iss DECIMAL(12,2)",
          "status VARCHAR(15) — emitida|cancelada|erro",
          "url_pdf VARCHAR(500)",
          "xml_nfse TEXT",
          "emitida_em TIMESTAMPTZ",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_nfse_escritorio","idx_nfse_fatura"],
      },
    ],
  },
  {
    categoria: "🛡️ Compliance & Auditoria",
    cor: "#60A860",
    tabelas: [
      {
        nome: "compliance_verificacoes",
        desc: "Verificações de conflito, PLD/FT e KYC",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "usuario_id UUID FK → usuarios.id",
          "lead_id UUID FK → leads.id",
          "caso_id UUID FK → casos.id",
          "tipo VARCHAR(20) — conflito_interesses|pld_ft|kyc|lgpd",
          "resultado VARCHAR(20) — aprovado|reprovado|pendente|revisao_manual",
          "detalhes JSONB NOT NULL",
          "fontes_consultadas TEXT[] — {receita,opensanctions,base_interna}",
          "advogado_revisor_id UUID FK → advogados.id",
          "revisado_em TIMESTAMPTZ",
          "observacoes TEXT",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
        ],
        indices: ["idx_compliance_escritorio","idx_compliance_tipo","idx_compliance_resultado"],
      },
      {
        nome: "lgpd_consentimentos",
        desc: "Consentimentos LGPD por titular e finalidade",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "usuario_id UUID FK → usuarios.id",
          "lead_id UUID FK → leads.id",
          "finalidade VARCHAR(100) NOT NULL",
          "base_legal VARCHAR(50) — consentimento|contrato|obrigacao_legal|interesse_legitimo",
          "concedido BOOLEAN NOT NULL",
          "ip_consentimento VARCHAR(45)",
          "user_agent TEXT",
          "concedido_em TIMESTAMPTZ DEFAULT NOW()",
          "revogado_em TIMESTAMPTZ",
          "retencao_ate DATE",
        ],
        indices: ["idx_lgpd_usuario","idx_lgpd_finalidade"],
      },
      {
        nome: "auditoria_logs",
        desc: "Log imutável de todas as ações no sistema",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id",
          "ator_tipo VARCHAR(10) NOT NULL — advogado|cliente|sistema|agente",
          "ator_id UUID NOT NULL",
          "acao VARCHAR(100) NOT NULL — criar|atualizar|deletar|visualizar|exportar|login|logout",
          "tabela_afetada VARCHAR(50)",
          "registro_id UUID",
          "dados_anteriores JSONB",
          "dados_novos JSONB",
          "ip VARCHAR(45)",
          "user_agent TEXT",
          "sessao_id UUID",
          "criado_em TIMESTAMPTZ DEFAULT NOW() — NUNCA atualizar este registro",
        ],
        indices: ["idx_audit_escritorio","idx_audit_ator","idx_audit_tabela","idx_audit_criado_em"],
      },
      {
        nome: "sessoes_portal",
        desc: "Sessões ativas dos clientes no portal",
        pk: "id UUID DEFAULT gen_random_uuid()",
        colunas: [
          "id UUID PK",
          "escritorio_id UUID FK → escritorios.id NOT NULL",
          "usuario_id UUID FK → usuarios.id NOT NULL",
          "token_hash VARCHAR(64) NOT NULL UNIQUE",
          "ip VARCHAR(45)",
          "user_agent TEXT",
          "dispositivo JSONB — {tipo, so, browser}",
          "criado_em TIMESTAMPTZ DEFAULT NOW()",
          "expira_em TIMESTAMPTZ NOT NULL",
          "ultimo_acesso TIMESTAMPTZ DEFAULT NOW()",
          "revogada BOOLEAN DEFAULT false",
        ],
        indices: ["idx_sessoes_usuario","idx_sessoes_token (UNIQUE)","idx_sessoes_expira"],
      },
    ],
  },
];

// ═══════════════════════════════════════════════
// INFRA + MVP
// ═══════════════════════════════════════════════
const INFRA_ITEMS = [
  { icon:"🖥️", label:"VPS", desc:"Ubuntu 22.04 · 8vCPU · 16GB RAM · 200GB NVMe — Contabo/Hetzner ~R$150/mês" },
  { icon:"🐘", label:"Postgres 16", desc:"pgvector + RLS + multi-schema por escritório" },
  { icon:"⚡", label:"Redis 7", desc:"BullMQ (filas) · Pub/Sub (notificações) · Cache · Sessions" },
  { icon:"🪣", label:"MinIO", desc:"Storage S3-compatible self-hosted — documentos criptografados" },
  { icon:"🐍", label:"Venom Bot", desc:"WhatsApp Web self-hosted — sem custo por mensagem" },
  { icon:"🧠", label:"GPT-4o", desc:"Motor de raciocínio e interação — cache Redis economiza 70% tokens" },
  { icon:"🎙️", label:"Whisper", desc:"faster-whisper self-hosted — transcrição gratuita" },
  { icon:"👁️", label:"Tesseract", desc:"OCR open-source self-hosted — documentos e imagens" },
  { icon:"🔒", label:"Nginx + SSL", desc:"Reverse proxy + Let's Encrypt SSL automático" },
  { icon:"📊", label:"Grafana", desc:"Monitoramento VPS + métricas dos agentes — gratuito" },
];

const CUSTO_TOTAL = [
  ["VPS 8vCPU/16GB (Contabo)", "~R$ 150/mês"],
  ["OpenAI GPT-4o (com cache)", "~R$ 200-400/mês"],
  ["OpenAI Embeddings (text-3-small)", "~R$ 10/mês"],
  ["Asaas/OpenPix (por transação)", "1,49% por cobrança"],
  ["Domínio + Let's Encrypt SSL", "~R$ 40/ano"],
  ["Backup externo (Backblaze B2)", "~R$ 15/mês"],
  ["TOTAL MVP (até 20 escritórios)", "~R$ 380–580/mês"],
];

const MVP_FASES = [
  {
    label:"Fase 1 — Core Comercial",
    meses:"Mês 1–3",
    cor:"#C8A050",
    entrega:"Primeiro escritório atendendo e assinando contratos digitalmente",
    agentes:["SDR & Atendimento","Contratos","Portal do Cliente","Compliance & LGPD"],
    dev:["VPS + Docker + Nginx + SSL","Postgres multi-tenant + pgvector + Redis","Venom Bot + GPT-4o","Geração de contratos + Autentique","PWA básico do portal","Schema completo do banco"],
  },
  {
    label:"Fase 2 — Operação Jurídica",
    meses:"Mês 4–6",
    cor:"#7060C8",
    entrega:"Escritório opera sem planilhas: processos, petições e prazos automatizados",
    agentes:["Processos Judiciais","Petições & Protocolos","Prazos & Agenda","Documentos & GED","Agente de Casos (MVP)"],
    dev:["DataJud CNJ + Playwright tribunais","Geração de petições GPT-4o","Protocolo PJe via Playwright","BullMQ alertas de prazos","MinIO + Tesseract OCR","Indexação inicial de casos (pgvector)"],
  },
  {
    label:"Fase 3 — Inteligência Completa",
    meses:"Mês 7–9",
    cor:"#50A87C",
    entrega:"Sistema autônomo com IA estratégica, financeiro e jurisprudência",
    agentes:["Financeiro","Audiências","Inteligência Jurídica","Agente de Casos (completo)"],
    dev:["Asaas/OpenPix cobranças automáticas","NFS-e automática","Whisper self-hosted transcrições","RAG jurisprudência STF/STJ/TST","Dashboard analytics completo","API pública para integrações"],
  },
];

const PRECOS = [
  { plano:"Solo", preco:"R$ 397/mês", desc:"1 advogado · 3 agentes core · até 50 clientes ativos" },
  { plano:"Escritório", preco:"R$ 897/mês", desc:"Até 5 advogados · 10 agentes · clientes ilimitados" },
  { plano:"Enterprise", preco:"R$ 1.997/mês", desc:"Ilimitado · 12 agentes · API + white label + SLA" },
];

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function LexAgentCompleto() {
  const [tab, setTab] = useState("agentes");
  const [agenteAtivo, setAgenteAtivo] = useState(null);
  const [grupoAberto, setGrupoAberto] = useState(null);
  const [catAberta, setCatAberta] = useState(0);
  const [tabelaAberta, setTabelaAberta] = useState(null);

  const TABS = [
    { id:"agentes", label:"12 Agentes" },
    { id:"banco",   label:"Banco de Dados" },
    { id:"infra",   label:"Infraestrutura" },
    { id:"mvp",     label:"Roadmap" },
  ];

  return (
    <div style={{ background: COR.fundo, minHeight:"100vh", color: COR.texto,
      fontFamily:"'Palatino Linotype',Palatino,Georgia,serif" }}>

      {/* ── HEADER ── */}
      <div style={{ padding:"28px 16px 20px", textAlign:"center",
        background:`linear-gradient(180deg,#0C0C16 0%,${COR.fundo} 100%)`,
        borderBottom:`1px solid ${COR.borda}` }}>
        <div style={{ fontSize:8, letterSpacing:8, color:"#4A4870",
          textTransform:"uppercase", marginBottom:8 }}>
          Sistema Jurídico Inteligente · Documento Mestre
        </div>
        <h1 style={{ fontSize:30, fontWeight:400, color:COR.ouroClaro,
          margin:0, letterSpacing:4 }}>LexAgent</h1>
        <p style={{ fontSize:10, color:"#3A3860", margin:"8px 0 0", letterSpacing:2 }}>
          12 Agentes · Postgres + Redis · VPS Self-hosted · GPT-4o · Venom Bot
        </p>
        <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:16,
          flexWrap:"wrap" }}>
          {[["12","Agentes IA"],["30","Tabelas DB"],["GPT-4o","Motor"],["R$380","Custo MVP/mês"]].map(([v,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:18, color: COR.ouro, fontWeight:700 }}>{v}</div>
              <div style={{ fontSize:8, color:"#3A3860", letterSpacing:2, textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", background:"#09090E",
        borderBottom:`1px solid ${COR.borda}`, overflowX:"auto" }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>{ setTab(t.id); setAgenteAtivo(null); }} style={{
            flex:1, padding:"13px 4px", background:"transparent", border:"none",
            borderBottom: tab===t.id ? `2px solid ${COR.ouro}` : "2px solid transparent",
            color: tab===t.id ? COR.ouro : "#3A3860",
            fontSize:10, fontWeight:700, letterSpacing:2,
            textTransform:"uppercase", cursor:"pointer",
            fontFamily:"inherit", whiteSpace:"nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"16px 14px", maxWidth:880, margin:"0 auto" }}>

        {/* ════════════ AGENTES ════════════ */}
        {tab==="agentes" && !agenteAtivo && (
          <div>
            <p style={{ fontSize:10, color:COR.textoFraco, textAlign:"center",
              letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>
              Selecione um agente para ver os processos e integrações completas
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {AGENTES.map(a=>(
                <div key={a.id} onClick={()=>{ setAgenteAtivo(a); setGrupoAberto(null); }}
                  style={{ background: COR.fundoCard, border:`1px solid ${a.cor}20`,
                    borderRadius:10, padding:"14px 12px", cursor:"pointer" }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{a.icon}</div>
                  <div style={{ fontSize:8, color:a.cor, letterSpacing:3,
                    textTransform:"uppercase", marginBottom:4 }}>{a.tag}</div>
                  <div style={{ fontSize:13, color: COR.texto, lineHeight:1.3,
                    marginBottom:4 }}>{a.nome}</div>
                  <div style={{ fontSize:10, color: COR.textoFraco,
                    lineHeight:1.5 }}>{a.sub}</div>
                  <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:5, height:5, borderRadius:"50%",
                      background:"#405A40" }}/>
                    <span style={{ fontSize:9, color:"#405A40" }}>{a.motor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="agentes" && agenteAtivo && (
          <div>
            <button onClick={()=>setAgenteAtivo(null)} style={{
              background:"transparent", border:"none",
              color:COR.textoMedio, fontSize:11, cursor:"pointer",
              marginBottom:14, padding:0, display:"flex", alignItems:"center", gap:6 }}>
              ← Todos os agentes
            </button>

            {/* Header do agente */}
            <div style={{ background: COR.fundoCard,
              border:`1px solid ${agenteAtivo.cor}30`, borderRadius:12,
              padding:18, marginBottom:12 }}>
              <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:14 }}>
                <span style={{ fontSize:32 }}>{agenteAtivo.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:8, color:agenteAtivo.cor, letterSpacing:3,
                    textTransform:"uppercase" }}>{agenteAtivo.tag}</div>
                  <div style={{ fontSize:20, color: COR.ouroClaro,
                    margin:"4px 0" }}>{agenteAtivo.nome}</div>
                  <div style={{ fontSize:11, color: COR.textoFraco }}>{agenteAtivo.sub}</div>
                </div>
              </div>

              {/* Motor & Custo */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                {[["Motor IA", agenteAtivo.motor, "#405A40"],
                  ["Custo", agenteAtivo.custo, "#5A4020"]].map(([label,val,bg])=>(
                  <div key={label} style={{ background:bg+"40",
                    borderRadius:8, padding:"10px 12px",
                    border:`1px solid ${bg}` }}>
                    <div style={{ fontSize:8, color:COR.textoFraco,
                      letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:11, color: COR.textoMedio }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* APIs */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:8, color:COR.textoFraco, letterSpacing:2,
                  textTransform:"uppercase", marginBottom:8 }}>Integrações Gratuitas</div>
                {agenteAtivo.apis.map((api,i)=>(
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"flex-start" }}>
                    <span style={{ fontSize:10, color:"#405A40", marginTop:1, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:11, color:"#7A9070" }}>{api}</span>
                  </div>
                ))}
              </div>

              {/* DB */}
              <div style={{ background:"#060610", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontSize:8, color:COR.textoFraco, letterSpacing:2,
                  textTransform:"uppercase", marginBottom:8 }}>Tabelas Postgres</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
                  {agenteAtivo.tabelas.map((t,i)=>(
                    <span key={i} style={{ fontSize:9, color:"#607A60",
                      background:"#0E1A0E", padding:"2px 8px", borderRadius:4,
                      fontFamily:"monospace" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize:8, color:COR.textoFraco, letterSpacing:2,
                  textTransform:"uppercase", marginBottom:6 }}>Redis Keys</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {agenteAtivo.redis.map((r,i)=>(
                    <span key={i} style={{ fontSize:9, color:"#7A5050",
                      background:"#1A0E0E", padding:"2px 8px", borderRadius:4,
                      fontFamily:"monospace" }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Grupos de processos */}
            {agenteAtivo.grupos.map((grupo,gi)=>(
              <div key={gi} style={{ background: COR.fundoCard,
                border:`1px solid ${COR.borda}`,
                borderRadius:10, marginBottom:8, overflow:"hidden" }}>
                <div onClick={()=>setGrupoAberto(grupoAberto===gi ? null : gi)}
                  style={{ padding:"14px 16px", display:"flex",
                    justifyContent:"space-between", alignItems:"center", cursor:"pointer",
                    borderBottom: grupoAberto===gi ? `1px solid ${agenteAtivo.cor}20` : "none" }}>
                  <div>
                    <div style={{ fontSize:8, color:agenteAtivo.cor,
                      letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>
                      Grupo {gi+1}
                    </div>
                    <div style={{ fontSize:13, color: COR.texto }}>{grupo.g}</div>
                  </div>
                  <div style={{ color: COR.textoFraco, fontSize:18 }}>
                    {grupoAberto===gi ? "−" : "+"}
                  </div>
                </div>
                {grupoAberto===gi && (
                  <div style={{ padding:"12px 16px" }}>
                    {grupo.items.map((item,ii)=>(
                      <div key={ii} style={{ display:"flex", gap:8,
                        marginBottom:8, alignItems:"flex-start" }}>
                        <span style={{ color:agenteAtivo.cor, fontSize:8,
                          marginTop:5, flexShrink:0 }}>◆</span>
                        <span style={{ fontSize:12, color: COR.textoMedio,
                          lineHeight:1.7 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ════════════ BANCO DE DADOS ════════════ */}
        {tab==="banco" && (
          <div>
            <div style={{ background:"#0A0A18", border:"1px solid #1E1E40",
              borderRadius:10, padding:14, marginBottom:16 }}>
              <div style={{ fontSize:10, color: COR.ouro, letterSpacing:2,
                textTransform:"uppercase", marginBottom:10 }}>
                Princípios de Engenharia
              </div>
              {[
                "Multi-tenant via escritorio_id em todas as tabelas — Row-Level Security (RLS) nativo",
                "UUIDs em todas as PKs — gerados com gen_random_uuid() — globalmente únicos",
                "Advogados e Usuários têm IDs próprios — nunca compartilham namespace",
                "Soft delete via campo ativo/cancelado — nunca DROP de dados reais",
                "JSONB para dados semi-estruturados variáveis por área do direito",
                "VECTOR(1536) com pgvector nos 4 pontos de busca semântica (documentos, jurisprudência, casos, estratégias)",
                "TIMESTAMPTZ em todos os campos de tempo — fuso horário sempre preservado",
                "Índices compostos otimizados para os queries mais frequentes por módulo",
              ].map((p,i)=>(
                <div key={i} style={{ display:"flex", gap:8,
                  marginBottom:7, alignItems:"flex-start" }}>
                  <span style={{ color:COR.ouro, fontSize:8,
                    marginTop:4, flexShrink:0 }}>◆</span>
                  <span style={{ fontSize:11, color:"#7870A0",
                    lineHeight:1.6 }}>{p}</span>
                </div>
              ))}
            </div>

            {/* Categorias */}
            {SCHEMA.map((cat,ci)=>(
              <div key={ci} style={{ marginBottom:10 }}>
                <button onClick={()=>setCatAberta(catAberta===ci ? -1 : ci)}
                  style={{ width:"100%", background:`${cat.cor}15`,
                    border:`1px solid ${cat.cor}40`, borderRadius:10,
                    padding:"14px 16px", cursor:"pointer",
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    fontFamily:"inherit" }}>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:14, color:cat.cor, fontWeight:700 }}>{cat.categoria}</div>
                    <div style={{ fontSize:10, color:COR.textoFraco, marginTop:2 }}>
                      {cat.tabelas.length} tabelas
                    </div>
                  </div>
                  <span style={{ color:COR.textoFraco, fontSize:18 }}>
                    {catAberta===ci ? "−" : "+"}
                  </span>
                </button>

                {catAberta===ci && (
                  <div style={{ marginTop:6 }}>
                    {cat.tabelas.map((tabela,ti)=>{
                      const key=`${ci}-${ti}`;
                      return(
                        <div key={ti} style={{ background: COR.fundoCard,
                          border:`1px solid ${COR.bordaFina}`,
                          borderRadius:10, marginBottom:6, overflow:"hidden" }}>
                          <div onClick={()=>setTabelaAberta(tabelaAberta===key?null:key)}
                            style={{ padding:"12px 14px", display:"flex",
                              justifyContent:"space-between", cursor:"pointer",
                              alignItems:"center" }}>
                            <div>
                              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                <code style={{ fontSize:13, color:cat.cor,
                                  fontFamily:"'Courier New',monospace",
                                  fontWeight:700 }}>{tabela.nome}</code>
                              </div>
                              <div style={{ fontSize:10, color:COR.textoFraco,
                                marginTop:3 }}>{tabela.desc}</div>
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <span style={{ fontSize:9, color:COR.textoFraco,
                                background:"#141428", padding:"2px 8px", borderRadius:4 }}>
                                {tabela.colunas.length} colunas
                              </span>
                              <span style={{ color:COR.textoFraco, fontSize:16 }}>
                                {tabelaAberta===key?"−":"+"}
                              </span>
                            </div>
                          </div>

                          {tabelaAberta===key && (
                            <div style={{ padding:"0 14px 14px" }}>
                              <div style={{ background:"#06060E", borderRadius:8,
                                padding:"10px 12px", marginBottom:10,
                                border:`1px solid ${COR.bordaFina}` }}>
                                <div style={{ fontSize:8, color:COR.textoFraco,
                                  letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>
                                  PRIMARY KEY
                                </div>
                                <code style={{ fontSize:11, color: COR.ouro,
                                  fontFamily:"'Courier New',monospace" }}>{tabela.pk}</code>
                              </div>

                              <div style={{ marginBottom:10 }}>
                                <div style={{ fontSize:8, color:COR.textoFraco,
                                  letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>
                                  COLUNAS
                                </div>
                                {tabela.colunas.map((col,ci2)=>{
                                  const isPK = col.includes("PK");
                                  const isFK = col.includes("FK");
                                  const isVec = col.includes("VECTOR");
                                  const isJSON = col.includes("JSONB");
                                  const colColor = isPK ? COR.ouro : isFK ? "#6080C8" : isVec ? "#8060C8" : isJSON ? "#5080A8" : COR.textoMedio;
                                  return(
                                    <div key={ci2} style={{ display:"flex", gap:8,
                                      padding:"5px 0",
                                      borderBottom:`1px solid ${COR.fundo}`,
                                      alignItems:"flex-start" }}>
                                      <span style={{ fontSize:8, color:colColor,
                                        marginTop:4, flexShrink:0 }}>▸</span>
                                      <code style={{ fontSize:11,
                                        fontFamily:"'Courier New',monospace",
                                        color: colColor, lineHeight:1.6 }}>{col}</code>
                                    </div>
                                  );
                                })}
                              </div>

                              <div>
                                <div style={{ fontSize:8, color:COR.textoFraco,
                                  letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>
                                  ÍNDICES
                                </div>
                                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                                  {tabela.indices.map((idx,ii)=>(
                                    <code key={ii} style={{ fontSize:9,
                                      color:"#5060A0", background:"#0E0E20",
                                      padding:"2px 8px", borderRadius:4,
                                      fontFamily:"'Courier New',monospace",
                                      border:`1px solid #1E1E40` }}>{idx}</code>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Legenda */}
            <div style={{ background: COR.fundoCard, border:`1px solid ${COR.borda}`,
              borderRadius:10, padding:14, marginTop:8 }}>
              <div style={{ fontSize:10, color:COR.ouro, letterSpacing:2,
                textTransform:"uppercase", marginBottom:10 }}>Legenda de Cores</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {[[COR.ouro,"PK — Chave Primária UUID"],[" #6080C8","FK — Chave Estrangeira"],
                  ["#8060C8","VECTOR — Embedding pgvector"],["#5080A8","JSONB — Dado semi-estruturado"],
                  [COR.textoMedio,"Campo padrão"],].map(([cor,label])=>(
                  <div key={label} style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ width:10, height:10, borderRadius:2, background:cor, flexShrink:0 }}/>
                    <span style={{ fontSize:10, color:COR.textoFraco }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════ INFRAESTRUTURA ════════════ */}
        {tab==="infra" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
              {INFRA_ITEMS.map((item,i)=>(
                <div key={i} style={{ background: COR.fundoCard,
                  border:`1px solid ${COR.borda}`, borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:20, marginBottom:6 }}>{item.icon}</div>
                  <div style={{ fontSize:12, color: COR.ouro, fontWeight:700,
                    marginBottom:4 }}>{item.label}</div>
                  <div style={{ fontSize:10, color: COR.textoFraco,
                    lineHeight:1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Custo */}
            <div style={{ background:"#09100A", border:"1px solid #1E301E",
              borderRadius:10, padding:16, marginBottom:14 }}>
              <div style={{ fontSize:12, color:"#50A860", fontWeight:700,
                marginBottom:12 }}>💡 Custo Total Estimado</div>
              {CUSTO_TOTAL.map(([item,val],i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between",
                  padding:"8px 0",
                  borderBottom: i<CUSTO_TOTAL.length-1 ? `1px solid #141E14` : "none" }}>
                  <span style={{ fontSize:11, color: COR.textoFraco }}>{item}</span>
                  <span style={{ fontSize:12, color:"#50A860",
                    fontWeight: i===CUSTO_TOTAL.length-1 ? 700 : 400 }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Comunicação entre agentes */}
            <div style={{ background: COR.fundoCard, border:`1px solid ${COR.borda}`,
              borderRadius:10, padding:16 }}>
              <div style={{ fontSize:12, color: COR.ouro, fontWeight:700,
                marginBottom:12 }}>🔄 Comunicação Entre Agentes via Redis Pub/Sub</div>
              {[
                ["SDR → Contratos","Lead fechado → dispara geração de contrato"],
                ["Processos → Prazos","Intimação detectada → extrai e cria prazo automaticamente"],
                ["Processos → Agente de Casos","Nova movimentação → atualiza análise do caso"],
                ["Petições → Prazos","Protocolo confirmado → marca prazo cumprido"],
                ["Audiências → Prazos","Ata gerada → cria prazos das determinações do juiz"],
                ["Casos → IA Jurídica","Caso encerrado como ganho → indexar vitória no pgvector"],
                ["IA Jurídica → Petições","Pesquisa → alimenta argumentos e teses da peça"],
                ["Financeiro → SDR","Inadimplência → notificar cliente + pausar novos serviços"],
                ["Compliance → Todos","Conflito detectado → bloquear criação de novo caso"],
                ["Agente de Casos → Advogado","Caso novo similar a vitórias → alerta de alta viabilidade"],
              ].map(([canal,desc],i,arr)=>(
                <div key={i} style={{ padding:"8px 0",
                  borderBottom: i<arr.length-1 ? `1px solid ${COR.bordaFina}` : "none" }}>
                  <code style={{ fontSize:11, color:"#6070B0",
                    fontFamily:"'Courier New',monospace" }}>{canal}</code>
                  <div style={{ fontSize:11, color: COR.textoFraco, marginTop:2 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ ROADMAP ════════════ */}
        {tab==="mvp" && (
          <div>
            {MVP_FASES.map((fase,i)=>(
              <div key={i} style={{ background: COR.fundoCard,
                border:`1px solid ${fase.cor}30`, borderRadius:12,
                padding:18, marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ fontSize:14, color:fase.cor, fontWeight:700 }}>{fase.label}</div>
                  <div style={{ fontSize:10, color:COR.textoFraco,
                    background:"#141428", padding:"3px 10px", borderRadius:4 }}>
                    {fase.meses}
                  </div>
                </div>
                <div style={{ fontSize:12, color:"#506050", fontStyle:"italic",
                  marginBottom:14 }}>🎯 {fase.entrega}</div>

                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                  {fase.agentes.map((a,j)=>(
                    <span key={j} style={{ fontSize:10, color:fase.cor,
                      background:`${fase.cor}10`,
                      border:`1px solid ${fase.cor}30`,
                      padding:"3px 10px", borderRadius:4 }}>{a}</span>
                  ))}
                </div>

                <div style={{ fontSize:8, color: COR.textoFraco, letterSpacing:2,
                  textTransform:"uppercase", marginBottom:8 }}>Dev Focus</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
                  {fase.dev.map((d,j)=>(
                    <div key={j} style={{ display:"flex", gap:6, alignItems:"flex-start" }}>
                      <span style={{ color:fase.cor, fontSize:8, marginTop:3, flexShrink:0 }}>◆</span>
                      <span style={{ fontSize:11, color: COR.textoFraco, lineHeight:1.5 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* SaaS Pricing */}
            <div style={{ background:"#09100A", border:"1px solid #1E301E",
              borderRadius:12, padding:18 }}>
              <div style={{ fontSize:13, color:"#50A860", fontWeight:700,
                marginBottom:14 }}>💎 Modelo SaaS — Retorno do Investimento</div>
              {PRECOS.map((p,i)=>(
                <div key={i} style={{ padding:"12px 0",
                  borderBottom: i<PRECOS.length-1 ? `1px solid #141E14` : "none",
                  display:"flex", gap:12 }}>
                  <div style={{ width:80, flexShrink:0 }}>
                    <div style={{ fontSize:13, color:"#50A860",
                      fontWeight:700 }}>{p.plano}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:16, color: COR.ouro }}>{p.preco}</div>
                    <div style={{ fontSize:11, color: COR.textoFraco,
                      marginTop:2 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:14, padding:"12px", background:"#06080A",
                borderRadius:8, border:"1px solid #1E301E" }}>
                <div style={{ fontSize:11, color: COR.textoFraco, lineHeight:1.8 }}>
                  <strong style={{ color:"#50A860" }}>Break-even:</strong> 2 escritórios Solo ou 1 Escritório cobre o custo da VPS + GPT-4o.<br/>
                  <strong style={{ color:"#50A860" }}>20 clientes Solo:</strong> R$7.940/mês de receita × custo de R$580/mês = margem de 93%.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
