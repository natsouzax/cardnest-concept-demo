# Requisitos do MVP

## Público e hipótese

Colecionadores de Pokémon TCG no Reino Unido. Hipótese: fotografias melhores, navegação por tipo e informação curta e clara tornam mais fácil selecionar produtos e pedir esclarecimentos.

## Percurso

Home → catálogo de três produtos → filtros simples por tipo → ficha → adicionar ao carrinho → rever quantidades e total indicativo → “Enquire on WhatsApp” → WhatsApp abre com mensagem pré-preenchida. Não ocorre venda no site.

## Funcionalidades incluídas

- Home com proposta clara e entrada para o catálogo.
- Lista responsiva dos três produtos, pesquisa por nome e filtro por categoria; ordenação por preço opcional se simples.
- Ficha com galeria autorizada ou placeholder, nome, expansão, formato, quantidade de packs quando conhecida, condição declarada, preço indicativo e ligação à fonte pública.
- Carrinho local com adicionar, remover, alterar quantidade e subtotal/total em GBP. Persistência local apenas do carrinho.
- CTA do WhatsApp com `wa.me/<número>?text=<mensagem codificada>`, gerado por `URLSearchParams`/`encodeURIComponent`; nome, quantidades, preços indicativos, total e URL da demo. Sem nome, morada ou email do visitante.
- Estado sem número configurado: CTA desativado e aviso de demonstração. Estado com número: texto inicial “Demo enquiry — no order has been placed. Please confirm availability and final pricing.”
- Aviso visível “Independent concept demo — not the official Cardnest TCG store”.

## Fora do escopo

Pagamentos, checkout real, encomendas, autenticação, painel administrativo, stock em tempo real, pré-encomendas, entregas, cupons, analytics com identificação pessoal e importação integral do catálogo.

## Critérios de aceitação

1. Três fichas e nenhuma ficha inventada; categoria e preço condizem com o inventário de demonstração.
2. Pesquisa e filtro devolvem resultados corretos e estados vazios claros.
3. Carrinho atualiza quantidades e totais sem valores negativos; recarregar preserva os itens.
4. WhatsApp só abre após clique; mensagem reflete o carrinho e diz explicitamente que nenhuma encomenda foi feita.
5. Layout utilizável em telemóvel e desktop, teclado, foco visível, texto alternativo e imagens sem distorção.
6. Sem número configurado, não existe ligação inválida nem número pessoal por defeito.
7. Página de produto tem título, descrição e URL estável; nenhum produto marcado como disponível em stock sem validação.

## Métrica da demo

Validação qualitativa com o potencial cliente: consegue encontrar um produto, comparar fotografia/dados e chegar à mensagem em menos passos? Sem alegar aumento de conversão sem dados reais.
