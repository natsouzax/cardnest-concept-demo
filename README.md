# Cardnest TCG — conceito de loja (MVP)

Protótipo independente e não afiliado, para demonstrar uma experiência de compra melhor para três produtos do catálogo público da Cardnest TCG. Não aceita pagamentos nem cria encomendas. O botão final abre um rascunho de WhatsApp de demonstração. O código pode ser público; esta apresentação não é uma loja oficial.

## Objetivo

Demonstrar um catálogo mais claro, imagens consistentes, fichas concisas e um percurso móvel de descoberta até ao contacto. A publicação com marca, textos e imagens definitivos depende de autorização da empresa e validação dos dados.

## Stack proposta

- Next.js App Router + React + TypeScript; alojamento posterior na Vercel.
- Supabase Postgres para os três produtos e Supabase Storage para imagens autorizadas. Sem autenticação ou encomendas nesta fase.
- Carrinho no navegador; mensagem WhatsApp gerada no cliente, com preços novamente apresentados como indicativos.
- Conteúdo inglês britânico e moeda GBP. Documentação interna em português.

## Começar a implementar

Leia `AGENTS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DATA.md`, `docs/DECISIONS.md` e `docs/PLAN.md` antes de escrever código. A fase 1 está implementada: home, catálogo, pesquisa/filtro, três fichas, carrinho persistente e rascunho WhatsApp. A fase 2 está preparada separadamente, com migração e testes locais; nenhum projeto remoto foi criado ou alterado.

## Correr a demo local

Requer Node.js 24 ou superior e npm. Verificado com Node 24.19.0 e npm 11.17.0 no Windows. As dependências diretas têm versões exatas; `package-lock.json` fixa a instalação. TypeScript 5.9.3 e ESLint 9.39.5 foram mantidos por compatibilidade com o tooling React/Next instalado. A atualização do ESLint fica dependente da compatibilidade do plugin React.

Em PowerShell, a partir desta pasta:

```powershell
cd caminho\para\cardnest-concept-demo
npm ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm run dev
```

Abrir **http://127.0.0.1:3000**. Não substituir `.env.local` se já existir. O servidor fica limitado à máquina local. Não são necessárias credenciais Supabase. O modo `PRODUCT_SOURCE=local` apresenta exatamente os três produtos de `data/products.seed.json`, incluindo os rascunhos de referência. O inventário anterior foi substituído por pedido do utilizador.

Para testar o build de produção, parar o servidor de desenvolvimento e executar:

```powershell
npm run build
npm start
```

Rotas principais: `/`, `/shop`, `/product/[slug]` e `/cart`. Interface em inglês britânico, preços em GBP e cálculo em pence. A paleta foi redesenhada em vermelho, branco, tinta escura e amarelo, com elementos gráficos inspirados em painéis de anime. Os três produtos mostram agora as imagens enviadas pelo utilizador, na ordem 151, Black Bolt e Binder Collection, guardadas localmente em `public/products/`. As ilustrações originais geradas por `npm run art:generate` permanecem apenas como fallback. Condição e disponibilidade são indicadas como não confirmadas. Não se apresentam descontos calculados a partir de preços históricos não validados.

A home inclui agora o percurso da demo, contexto do conceito e entrada para as perguntas frequentes. O footer liga todas as rotas informativas: `/about`, `/how-it-works`, `/faq`, `/contact` e `/data-and-privacy`. Estas páginas descrevem apenas o comportamento desta demonstração; não apresentam políticas comerciais da loja original, serviços de apoio reais ou contacto inventado.

O cabeçalho fixo transforma-se numa barra compacta após o scroll (ativação acima de 36px; retorno abaixo de 10px). Em telemóvel, o menu abre dentro do próprio cabeçalho. A ação “Account” explica que esta demo não inclui autenticação; não existe página de login.

## Configuração

| Variável | Valor na demo | Finalidade |
| --- | --- | --- |
| `PRODUCT_SOURCE` | `local` | `supabase` ativa explicitamente o adaptador separado. |
| `NEXT_PUBLIC_SALES_WHATSAPP` | vazio | Destino autorizado, em dígitos internacionais sem `+`, espaços ou pontuação. |
| `NEXT_PUBLIC_SUPABASE_URL` | vazio | URL do projeto correto, apenas no modo Supabase. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | vazio | Chave `sb_publishable_...`; nunca usar secret/service role. |

Sem número válido, “Enquire on WhatsApp” fica desativado. Não existe número de destino por defeito. Quando configurado, o clique abre `wa.me` com nomes, quantidades, preços indicativos, total e a origem da demo. O texto começa exatamente por:

> Demo enquiry — no order has been placed. Please confirm availability and final pricing.

O rascunho diz que o visitante tem interesse em comprar os produtos do carrinho e pede confirmação da disponibilidade, preço final e próximos passos. Nesta instalação, o número fornecido pelo utilizador está configurado apenas em `.env.local`, ficheiro ignorado pelo Git; ao clonar o repositório é necessário definir o destino autorizado. Como a variável começa por `NEXT_PUBLIC_`, o número de destino fica visível a quem usar a demo.

O visitante decide se envia a mensagem dentro do WhatsApp. A aplicação não envia mensagens, não recebe confirmação e não cria encomendas. Reiniciar o servidor de desenvolvimento após alterar variáveis. Em produção, voltar a executar `npm run build` e reiniciar também ao alterar `PRODUCT_SOURCE` ou variáveis `NEXT_PUBLIC_`: o build local pré-renderiza páginas com o seed.

O carrinho usa `localStorage` com chave `cardnest-demo-cart-v1`, versão 1, apenas slugs e quantidades. Dados inválidos são descartados; preços vêm sempre do catálogo. Quantidade limitada a 99 por item como limite de interface, sem relação com stock. Sem armazenamento disponível, a seleção funciona durante a visita e apresenta um aviso. Abas abertas sincronizam alterações.

## Verificações

```powershell
npm run lint
npm test
npm run build
npm exec -- playwright install chromium
npm run test:e2e
npm run test:whatsapp
npm run format:check
```

- `npm test`: nove testes de carrinho, mensagem, adaptador e migração/RLS executada em Postgres embutido (PGlite), sem Docker ou credenciais.
- `test:e2e`: oito testes em Chromium, desktop e emulação móvel; inclui pesquisa, filtros, todas as fichas, carrinho completo, 404, header, home, footer, páginas descritivas e FAQ.
- `test:whatsapp`: dois testes com servidor isolado na porta 3001 e destino sintético exclusivo dos testes. `window.open` é intercetado: não há navegação para WhatsApp, contacto nem envio. Não usar este servidor para apresentar a demo.
- O teste principal usa dados locais e verifica o percurso sem abrir o WhatsApp; funciona com ou sem número configurado. Se já houver servidor na porta 3000, deve usar os dados locais. Caso contrário o Playwright inicia-o. A porta 3001 deve estar livre.
- Capturas em `test-results/` e traces quando há falha; ficheiros ignorados pelo Git. A emulação móvel não substitui uma validação futura num telemóvel físico.

## Supabase separado — preparação local

O adaptador em `src/lib/supabase-repository.ts` usa apenas a chave publicável, sem sessão de autenticação. Consulta `status = 'published'` e limita o catálogo aos três slugs. Não guarda em cache a consulta. Uma falha de configuração ou de rede é apresentada como erro; nunca troca silenciosamente para dados locais. Para voltar ao modo independente, usar `PRODUCT_SOURCE=local`.

A migração em `supabase/migrations/20260927171049_create_products.sql` cria `products`, ativa e força RLS, revoga permissões preexistentes e permite apenas SELECT anónimo de produtos publicados. Não há política de escrita, tabela de encomendas, stock ou bucket de imagens. `authenticated` não recebe acesso neste MVP. `updated_at` deve ser atualizado por uma futura rotina administrativa quando editar um produto.

`supabase/seed.sql` é gerado do inventário e mantém os três produtos como `draft`; não publica nada automaticamente. Para regenerar e verificar:

```powershell
npm run seed:generate
npm test
```

Foi aplicada e testada a migração numa base Postgres embutida descartável: rascunhos invisíveis a `anon`, produto publicado legível e INSERT/UPDATE/DELETE/TRUNCATE recusados. Isso não valida o gateway/Data API de um projeto Supabase.

Para verificar a stack Supabase local completa, instalar e iniciar Docker Desktop e depois:

```powershell
npm exec -- supabase start
npm exec -- supabase migration up --local
npm exec -- supabase status
```

O primeiro arranque de uma stack nova aplica migrações e seed. Usar a URL e chave publicável locais em `.env.local`, definir `PRODUCT_SOURCE=supabase` e reiniciar Next.js. O catálogo deve ficar vazio enquanto todos os produtos forem `draft`. A publicação para teste deve ocorrer apenas nessa base local descartável, e exige rever os campos. Antes de ligação remota, repetir os testes via Data API: rascunhos ocultos, publicados legíveis, escrita recusada; verificar também os grants e os advisors.

Docker não estava disponível nesta máquina, pelo que a stack Supabase completa e a Data API não foram executadas. **Não executar `link`, `db push` ou criar projetos antes de identificar a conta, organização e projeto corretos.** Nenhum recurso remoto foi consultado, criado ou alterado nesta implementação.

## Falta antes da apresentação

- Confirmar destino WhatsApp da equipa de demonstração ou número comercial autorizado; nunca assumir o número pessoal do utilizador.
- Validar os três produtos, preços, conteúdo e condição com a empresa; não há garantia de stock.
- Confirmar autorização documentada para uso público da marca e das imagens enviadas pelo utilizador, além da variante exata de cada produto. As fontes e o mapeamento das imagens estão em `docs/IMAGE_SOURCES.md`. A demo privada já usa os ficheiros locais fornecidos.
- Decidir entre demonstração presencial/local e preview privado. Nenhum deploy ou domínio foi configurado. `noindex` não é controlo de acesso; um preview privado precisa de proteção efetiva.
- Identificar projeto/conta Supabase e validar Data API antes de ativar a integração remota.
- Esta pasta recebida não contém `.git`; não foram criados commits nem associado um remoto. O lockfile e os ficheiros estão prontos para versionamento no repositório correto.

## Referências técnicas consultadas

[Next.js — instalação](https://nextjs.org/docs/app/getting-started/installation), [Supabase — changelog](https://supabase.com/changelog), [RLS e grants](https://supabase.com/docs/guides/database/postgres/row-level-security), [chaves publicáveis](https://supabase.com/docs/guides/getting-started/api-keys) e [inicialização do cliente](https://supabase.com/docs/reference/javascript/initializing). Verificação de versões via npm em 27-09-2026.

## Fontes

Inspeção pública em 27-09-2026: https://cardnest-tcg.co.uk/ e https://cardnest-tcg.co.uk/shop/. Os preços e detalhes da amostra são fotografias do estado observado, não uma fonte de stock atual.
