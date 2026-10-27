---
assurance:
  id: t-13
  base: sha256:466f46a08928148861cdee707dce499ab427b75494db2926e08c089b7bb9dd50
---
# Cart initially shows unchecked gift wrap above Checkout

> On a cart with merchandise, establish the unchecked default and checkbox placement before any gift-wrap selection.

## Step 1

At {{start_url}}, establish a signed-in Universe Swag Store session as demo shopper octo-demo with password universe-2026.

## Step 2

In the Universe Swag Store catalog, establish a cart with one Sticker pack priced $20.00 and no other merchandise, then open the cart page.

## Step 3 @verifies ac-66, ac-64, ac-68

On the cart page before selecting gift wrap, inspect the area just above the Checkout button, then assert the "Gift wrap (+$5)" checkbox is present immediately above Checkout and is unchecked by default.
