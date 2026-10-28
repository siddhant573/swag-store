---
test: ../checkout-never-holds-two-entered-promo-codes_test.md
status: passed
started: 2026-10-28T05:36:37.230Z
duration_s: 117
session_id: 2f46f311-b3e1-4b9b-b04d-31ec4357460b
---

# Checkout never holds two entered promo codes — Result

## Step 1 ✓ passed (64.9s)
md5: 1525a197e103d2f4c1ca3db140a3b0e7
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 ✓ passed (44.2s)
md5: 88aa5f3ebe3c46aa8b8cf0d5d12eaa6f
At checkout enter UNIVERSE20 and try entering a second different promo code {{unknown_promo_code}}, then assert the checkout holds at most one entered promo code, whether the second attempt was blocked or replaced the first.
