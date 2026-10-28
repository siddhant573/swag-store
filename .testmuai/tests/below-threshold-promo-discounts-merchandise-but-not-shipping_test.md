---
assurance:
  id: t-3
  base: sha256:b52700d3ec6818b5e861bdb3f7615e49c3ceb7a2a72cda7ade55a6071f8a0590
---
# Below-threshold promo discounts merchandise but not shipping

> For merchandise below $50, retain $5 shipping outside the merchandise-only discount.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and put one Sticker pack ($20) in the cart.

## Step 2 @verifies ac-5, ac-6

At checkout with $20 merchandise subtotal apply UNIVERSE20, then assert its separately shown discount equals $4.00 calculated only from merchandise and excludes the shipping charge.

## Step 3 @verifies ac-8

Review shipping in the same discounted checkout price breakdown, then assert it remains $5.00 because the pre-discount merchandise subtotal is below $50.
