---
assurance:
  id: t-9
  base: sha256:06c3602d594383f1050f85954f9dad13ce0f5ab3a72395fea1b56dad7783c5e2
---
# Default gift wrap adds $5 to the cart and reaches checkout

> With merchandise in the cart, establish that the checkbox starts checked, its $5 fee is included in the cart subtotal, and the selected choice reaches checkout.

## Step 1

At {{start_url}}, establish a signed-in Universe Swag Store session as the demo shopper octo-demo using password universe-2026.

## Step 2

From the Universe Swag Store catalog, add one Sticker pack priced $20.00 and open the cart.

## Step 3 @verifies ac-63, ac-64

On the cart page for one Sticker pack, inspect the gift-wrap choice, then assert the checkbox labeled "Gift wrap (+$5)" is checked.

## Step 4 @verifies ac-61

On the cart page with one $20.00 Sticker pack and gift wrapping selected, review the cart subtotal, then assert it is $25.00 including the $5 gift-wrap fee.

## Step 5 @verifies ac-62

From that cart, proceed to checkout without changing gift wrapping, then assert checkout reflects the selected gift-wrapping choice.
