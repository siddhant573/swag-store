---
assurance:
  id: t-7
  base: sha256:d7e7b7958f199e1bd7aae8c407df53ac140a19d3c89d9f8630f48f7d68958b20
---
# Cart quantity increase recalculates pricing and unlocks free shipping

> Prove that a signed-in shopper can review a non-empty cart, see quantity, unit price, and line price on each line, observe the remaining free-shipping amount while the merchandise subtotal is below $50, then change quantity so the subtotal reaches the threshold and the cart immediately refreshes the line price, subtotal, and free-shipping message.

## Step 1

Open {{start_url}} in the browser, sign in with username `octo-demo` and password `universe-2026` if authentication is required, and arrive at the store as a signed-in shopper.

## Step 2

From the cart page, remove any existing cart lines so the next setup starts from an empty cart.

## Step 3

From the shop page, add 1 Octocat tee at $25.00, 1 Universe mug at $15.00, and 1 Holographic stickers at $9.00, then open the cart page with those three product lines present.

## Step 4 @verifies ac-35, ac-37, ac-38, ac-39

On the cart page with Octocat tee, Universe mug, and Holographic stickers at quantity 1 each, inspect the listed pricing details, then assert each cart line shows its quantity and unit price, each line shows a line price equal to unit price × quantity, the merchandise subtotal is $49.00, and the cart shows that $1.00 more merchandise is needed for free shipping.

## Step 5 @verifies ac-34, ac-36, ac-40

On the Holographic stickers cart line, change the quantity from 1 to 2, then assert that the line now shows quantity 2 with line price $18.00, the merchandise subtotal is $58.00 which equals the displayed sum of line prices, and the cart shows that free shipping has been unlocked.
