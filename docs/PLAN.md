# Plano de execução

## Fase 0 — engenharia (este pacote)

- [x] Escopo, fluxos, critérios, arquitetura, dados, riscos e instruções do agente.
- [x] Seed local dos três produtos selecionados.
- [ ] Confirmar número destino, direitos de imagem, preços e conteúdos finais dos três produtos.

## Fase 1 — aplicação local

- [x] Inicializar Next.js + TypeScript e dependências com lockfile.
- [x] Criar design system leve: tipografia, espaçamento, cartões e estados responsivos.
- [x] Implementar home, catálogo, pesquisa/filtro, fichas e carrinho com seed local.
- [x] Completar a home, footer e páginas informativas próprias da demo (conceito, percurso, FAQ, contacto e dados locais).
- [x] Implementar link WhatsApp configurável e mensagem de demonstração.
- [x] Verificar acessibilidade básica e testar fluxo em telemóvel e desktop (Chromium; emulação móvel).

## Fase 2 — dados e imagens

- [ ] Rever documentação/changelog Supabase e criar projeto sob a conta correta.
- [ ] Criar migração `products`, RLS de leitura pública e seed; verificar SELECT público e escrita recusada.
- [ ] Trocar repositório local por consulta Supabase com fallback de desenvolvimento documentado.
- [x] Associar as três imagens enviadas pelo utilizador às fichas locais, pela ordem indicada.
- [ ] Confirmar direitos de uso público, variantes e créditos antes da apresentação externa.

Estado da fase 2 em 27-09-2026: documentação/changelog revistos; configuração local, migração, seed draft e adaptador preparados. SQL/RLS verificados em Postgres embutido. Docker indisponível: stack local Supabase, Data API e advisors pendentes. Projeto remoto não criado nem alterado. O modo local continua ativo; `PRODUCT_SOURCE=supabase` é opt-in, sem fallback silencioso.

## Fase 3 — apresentação

- [ ] Validar preços e produtos com a empresa; rever marca e disclaimers.
- [ ] Publicar preview privado na Vercel, testar fluxo final e custos.
- [ ] Preparar proposta: problema, demo, escopo de produção, migração e manutenção.

## Definition of done do MVP

Os três produtos aparecem corretamente, o percurso até WhatsApp funciona sem concluir vendas, o site é responsivo e a demo deixa clara a sua natureza independente. Segurança de leitura Supabase verificada se a fase 2 estiver incluída na entrega.
