---
assurance:
  id: t-11
  base: sha256:1f4140e4036097aaa4559c77495ca29ed1b09151a8c07f3000156020bb83ac9d
---
# Opt in to $5 gift wrap from unchecked cart and carry it to checkout

> Starting with merchandise in the cart and the gift-wrap checkbox unchecked, select gift wrap and check the fee-inclusive cart subtotal and selected checkout choice.

## Step 1

At {{start_url}}, establish a signed-in Universe Swag Store session as demo shopper octo-demo with password universe-2026.

## Step 2

In the Universe Swag Store catalog, establish a cart with one Sticker pack priced $20.00 and no other merchandise, then open the cart page.

## Step 3 @verifies ac-66, ac-64, ac-68

On the cart page for one Sticker pack, inspect the gift-wrap area just above Checkout, then assert the "Gift wrap (+$5)" checkbox is present, positioned just above Checkout, and unchecked.

## Step 4 @verifies ac-61, ac-67

On that cart page, select "Gift wrap (+$5)" and review the subtotal, then assert it equals $25.00: the $20.00 merchandise line plus the $5 gift-wrap fee.

## Step 5 @verifies ac-62

From the cart with gift wrap selected, proceed to checkout, then assert checkout reflects the selected gift-wrapping choice.
