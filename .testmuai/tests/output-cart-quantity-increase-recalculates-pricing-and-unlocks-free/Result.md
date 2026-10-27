---
test: ../cart-quantity-increase-recalculates-pricing-and-unlocks-free_test.md
status: passed
started: 2026-10-27T05:12:44.154Z
duration_s: 235
session_id: 00526d1f-63d3-480a-8d5c-5bc7d6cbe5ec
---

# Cart quantity increase recalculates pricing and unlocks free shipping — Result

## Step 1 ✓ passed (52.2s)
md5: 259030a9fbfd8ca25ba4fe3f3e654dd0
Open {{start_url}} in the browser, sign in with username `octo-demo` and password `universe-2026` if authentication is required, and arrive at the store as a signed-in shopper.

## Step 2 ✓ passed (17.9s)
md5: 1f2cd9a4e3ac6924eb6b320860b57604
From the cart page, remove any existing cart lines so the next setup starts from an empty cart.

## Step 3 ✓ passed (51.4s)
md5: c14dfaa223bf6a45345beba8c1428e6b
From the shop page, add 1 Octocat tee at $25.00, 1 Universe mug at $15.00, and 1 Holographic stickers at $9.00, then open the cart page with those three product lines present.

## Step 4 ✓ passed (66.7s)
md5: 43a4b23781be2f96bb2c1f82c949b1d4
On the cart page with Octocat tee, Universe mug, and Holographic stickers at quantity 1 each, inspect the listed pricing details, then assert each cart line shows its quantity and unit price, each line shows a line price equal to unit price × quantity, the merchandise subtotal is $49.00, and the cart shows that $1.00 more merchandise is needed for free shipping.

## Step 5 ✓ passed (43.4s)
md5: 2143e62671685324993385d4adebb933
On the Holographic stickers cart line, change the quantity from 1 to 2, then assert that the line now shows quantity 2 with line price $18.00, the merchandise subtotal is $58.00 which equals the displayed sum of line prices, and the cart shows that free shipping has been unlocked.
