---
assurance:
  id: t-10
  base: sha256:70e304e01f0802c04aee6d0ccfd0c82a23bd96316d18c3c72ae60774a870589a
---
# Opting out removes the $5 gift-wrap fee before checkout

> With merchandise in the cart, uncheck default-selected gift wrap, establish that the $5 charge is not included in the cart subtotal, and carry the unselected choice to checkout.

## Step 1

At {{start_url}}, establish a signed-in Universe Swag Store session as the demo shopper octo-demo using password universe-2026.

## Step 2

From the Universe Swag Store catalog, add one Sticker pack priced $20.00 and open the cart.

## Step 3 @verifies ac-63, ac-64

On the cart page for one Sticker pack, inspect the gift-wrap choice, then assert the checkbox labeled "Gift wrap (+$5)" starts checked.

## Step 4 @verifies ac-61

On the cart page with one $20.00 Sticker pack and default-selected gift wrapping, review the subtotal before changing the checkbox, then assert it is $25.00 including the $5 gift-wrap fee.

## Step 5 @verifies ac-65

On the cart page, turn off the "Gift wrap (+$5)" checkbox and review the updated subtotal, then assert it equals the $20.00 Sticker pack merchandise price without a gift-wrap fee.

## Step 6 @verifies ac-62

From the cart with gift wrapping turned off, proceed to checkout, then assert checkout reflects that gift wrapping is not selected.
