# Modelo de dados proposto

## `products`

`id uuid primary key`, `slug text unique not null`, `name text not null`, `category text not null`, `set_name text`, `pack_count integer`, `price_pence integer not null check (price_pence >= 0)`, `compare_at_pence integer`, `summary text`, `source_url text`, `image_path text`, `image_credit text`, `status text check (status in ('draft','published'))`, `verified_at timestamptz`, `created_at`, `updated_at`.

Preço em pence para evitar erros de ponto flutuante. `status` indica visibilidade, não disponibilidade. Não incluir `in_stock` até receber inventário fiável. Categoria em texto chega para três itens; normalizar numa tabela quando houver necessidade real.

## Acesso

RLS ativa; `anon` apenas SELECT onde `status = 'published'`. Sem políticas INSERT/UPDATE/DELETE para `anon`. Escrita administrativa apenas por rotina segura fora do cliente, e não necessária no MVP. Bucket público apenas para imagens licenciadas, upload administrativo restrito. Confirmar configuração da Data API e grants ao implementar.

## Seed

`../data/products.seed.json` é inventário de referência recolhido do catálogo público e depois reduzido aos três itens escolhidos pelo utilizador. Nomes/preços não garantem disponibilidade. `image_path` aponta para as três imagens enviadas pelo utilizador e guardadas localmente; rever direitos e variantes antes de publicar.
