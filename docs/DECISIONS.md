# Decisões e questões abertas

## Decidido

- 27-09-2026: conceito privado independente, cinco produtos, sem pagamentos ou encomendas.
- Next.js/TypeScript para páginas indexáveis e UI; Supabase para catálogo; Vercel para eventual preview.
- WhatsApp como pedido de informação iniciado pelo visitante, nunca como encomenda concluída.
- Moeda GBP, inglês britânico na interface.

## Por confirmar antes de avançar

- O destino WhatsApp foi fornecido expressamente pelo utilizador e está configurado apenas em `.env.local`; confirmar separadamente o destino de qualquer deploy público.
- Seleção final dos cinco produtos e preços atuais; os cinco do seed são uma amostra.
- Direito de uso da marca, fotografias e conteúdos. Não usar fotografias de terceiros só por estarem acessíveis no site.
- Acesso ao projeto Supabase. Não criar recursos numa conta errada.
- A exposição pública foi pedida pelo utilizador; os direitos de marca e imagens continuam por confirmar para uso comercial.

## Implementação local — 27-09-2026

- Os cinco rascunhos do seed são visíveis apenas no modo de demonstração local; Supabase lê exclusivamente publicados e limita-se aos mesmos cinco slugs.
- `PRODUCT_SOURCE=local` é o padrão explícito. O modo Supabase falha de forma visível se faltar configuração; não mascara falhas com o seed.
- Placeholders SVG próprios e rotulados. Sem preços riscados ou percentagens de desconto baseados em comparativos não validados.
- Carrinho versionado, validado e sincronizado entre abas. Limite de 99 unidades por item é uma regra de interface, não stock.
- Migração/RLS testados com PGlite por ausência de Docker; gateway/Data API Supabase continuam por validar. Nenhuma ligação remota.
- Next.js 16.3.6 e React 19.3.0. TypeScript 5.9.3 e ESLint 9.39.5 fixados por incompatibilidades verificadas das versões principais mais recentes com o tooling instalado.
- Nenhuma publicação automática de produtos, envio de mensagem ou associação de domínio. A pasta fornecida não contém metadados Git.

## Redesenho visual — 28-09-2026

- Paleta vermelha/branca, contornos escuros, amarelo de acento e grafismos inspirados em painéis de anime. Não reproduzir personagens, cenas ou embalagens Pokémon.
- Cinco ilustrações originais, específicas para os formatos do seed, substituem o placeholder genérico. O seed e os preços permanecem intactos.
- A ficha antiga da Journey Together Elite Trainer Box usa uma imagem identificada como variante Pokémon Center, sem correspondência confirmada no seed. A demo não deve apresentá-la como fotografia fiel do item.
- As fotografias do domínio original não foram copiadas: a revisão automática rejeitou essa operação por falta de autorização documentada, conforme `AGENTS.md`. A autorização para uso e a correspondência exata de cada imagem continuam pendentes.

## Seleção atual — 28-09-2026

- A pedido do utilizador, o catálogo local passa a ter apenas 151 Booster Bundle, Black Bolt Booster Bundle e 30th Celebration Binder Collection. Esta decisão substitui o escopo anterior de cinco itens, mantido acima como histórico.
- Preços indicativos observados nas três fichas públicas: £45, £50 e £55. Descrições curtas reescritas; os cinco packs da coleção binder seguem a galeria oficial Pokémon, pendentes de confirmação da variante específica da loja.
- O utilizador enviou posteriormente as imagens; consultar a decisão abaixo.

## Imagens recebidas — 28-09-2026

- O utilizador enviou três imagens nesta conversa e indicou a ordem 151, Black Bolt e Binder Collection. Foram guardadas localmente como PNG e associadas aos três `image_path` do seed.
- A demo privada passa a mostrar estas imagens. As ilustrações SVG originais continuam disponíveis como fallback; a publicação externa continua dependente de confirmação dos direitos e das variantes.

## Páginas informativas — 28-09-2026

- A home e o footer foram expandidos; páginas `about`, `how-it-works`, `faq`, `contact` e `data-and-privacy` explicam exclusivamente esta demonstração independente.
- O domínio antigo não estava acessível durante a revisão; não foram copiadas nem inventadas políticas comerciais, contactos, prazos de entrega ou devoluções. As páginas informativas são conteúdo original da demo.

## Riscos de apresentação

- Fichas podem mostrar produtos indisponíveis ou preços desatualizados; rotular valores como indicativos.
- Abrir WhatsApp não significa mensagem enviada nem conversão medida.
- Sem acordo com a empresa, qualquer entrega à Cardnest é proposta e não loja operacional.

## Publicação da demo — 28-09-2026

- O utilizador pediu um repositório GitHub público e, se possível, um deploy Vercel. Isto substitui a intenção inicial de manter a demo apenas privada.
- O repositório deve excluir `.env.local`, outros ficheiros de ambiente, builds e dependências. O número WhatsApp fornecido pelo utilizador permanece apenas na configuração local; uma publicação web requer configurar explicitamente o destino na plataforma.
- A demo pública mantém os avisos de independência, ausência de encomendas e preços indicativos. Confirmar direitos de marca e imagens antes de qualquer uso comercial ou apresentação como loja oficial.
