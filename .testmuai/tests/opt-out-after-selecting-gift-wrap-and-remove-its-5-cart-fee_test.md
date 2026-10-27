---
assurance:
  id: t-12
  base: sha256:1403995a5e115b8bcd456bf6fc8e76f358f91339112834919c29d57350112421
---
# Opt out after selecting gift wrap and remove its $5 cart fee

> From an unchecked cart gift-wrap choice, opt in and then opt out, showing that the cart no longer includes the $5 gift-wrap fee and that the off choice carries to checkout.

## Step 1

At {{start_url}}, establish a signed-in Universe Swag Store session as demo shopper octo-demo with password universe-2026.

## Step 2

In the Universe Swag Store catalog, establish a cart with one Sticker pack priced $20.00 and no other merchandise, then open the cart page.

## Step 3 @verifies ac-66, ac-64, ac-68

On the cart page for one Sticker pack, inspect the gift-wrap area just above Checkout, then assert the "Gift wrap (+$5)" checkbox is present, positioned just above Checkout, and unchecked.

## Step 4 @verifies ac-61, ac-67

On that cart page, select "Gift wrap (+$5)" and review the subtotal, then assert it equals $25.00 including the $5 fee on top of $20.00 merchandise.

## Step 5 @verifies ac-65

On the same cart page, uncheck "Gift wrap (+$5)" and review the updated subtotal, then assert it equals the $20.00 merchandise line price without the $5 gift-wrap fee.
