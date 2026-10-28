---
assurance:
  id: t-14
  base: sha256:09c172fc8f28d402e20fad6c9042a50516fb3ab0ecbb84e14d51b3c3c4f11b7c
---
# Checkout never holds two entered promo codes

> After entering a promo, check that the checkout does not hold more than one entered promo code.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 @verifies ac-7

At checkout enter UNIVERSE20 and try entering a second different promo code {{unknown_promo_code}}, then assert the checkout holds at most one entered promo code, whether the second attempt was blocked or replaced the first.
