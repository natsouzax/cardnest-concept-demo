# Arquitetura

## Componentes

Next.js App Router apresenta `/`, `/shop`, `/product/[slug]` e `/cart`. Server Components consultam produtos publicados no Supabase; componentes cliente tratam filtros, carrinho e geração da ligação WhatsApp. Os produtos também podem ser lidos do JSON seed em desenvolvimento sem credenciais, mantendo uma interface `ProductRepository` substituível.

Postgres guarda produtos e categorias; Storage guarda apenas imagens com direitos confirmados. Para a primeira iteração, placeholders locais são suficientes. O carrinho reside em `localStorage`, versionado e validado ao ler. Não há tabela de encomendas.

## Fluxo de dados

`Supabase products (read-only)` → `Next.js pages` → `local cart` → `WhatsApp URL` → `user chooses whether to send`.

O site não recebe confirmação de envio, resposta ou compra. O preço na mensagem é indicativo e não vincula a Cardnest.

## Configuração

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` e `NEXT_PUBLIC_SALES_WHATSAPP`. `.env.local` ignorado pelo Git. Exemplo sem valores reais em `.env.example`.

## Publicação

Primeiro desenvolvimento local. Preview privado e identificado como conceito. Só associar domínio, branding definitivo, imagens e número comercial após acordo com a empresa. Não ligar o domínio da Cardnest ao protótipo.

## Verificação

Testar transformação de mensagem (codificação, quantidades e valores), permissões de leitura pública, recusa de escrita anónima, páginas em móvel e desktop e ausência de checkout. Comparar URLs e dados públicos novamente antes da apresentação.
