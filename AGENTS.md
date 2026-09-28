# Instruções para o Codex

1. Este projeto é uma demonstração independente para apresentação à Cardnest TCG. Não insinuar afiliação, não publicar como loja oficial e não aceitar pedidos reais antes de autorização.
2. Preservar o escopo dos três SKUs selecionados em `data/products.seed.json`. Não copiar em massa textos ou imagens de terceiros. Usar imagens próprias/autorizadas ou placeholders claramente rotulados até haver licença.
3. Não reutilizar descrições longas do site original. Reescrever conteúdo curto, factual, validando especificações e identificando dados não confirmados.
4. O destino WhatsApp vem de `NEXT_PUBLIC_SALES_WHATSAPP` (dígitos internacionais, sem `+`); nunca colocar um número presumido no código. Desativar a ação se estiver ausente. Texto obrigatório: “Demo enquiry — no order has been placed”.
5. Nenhum endpoint de encomenda, recolha de dados pessoais, pagamento, reserva de stock ou mensagem enviada automaticamente. WhatsApp só abre após clique explícito; utilizador confirma o envio na aplicação.
6. Em Supabase, usar chave publicável no cliente, RLS nas tabelas expostas e apenas leitura anónima de produtos publicados. Nunca expor `service_role`/secret keys. Aplicar migrações locais antes de ligação remota.
7. Antes de implementar dependências e Supabase, verificar versões e documentação atual; fixar versões e incluir lockfile. Usar `next/image`, páginas de produto com metadados e componentes cliente só para interação.
8. Critérios de aceitação e ordem de execução em `docs/PLAN.md`. Não aumentar escopo sem registar decisão em `docs/DECISIONS.md`.
