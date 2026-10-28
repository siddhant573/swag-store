---
test: ../below-threshold-promo-discounts-merchandise-but-not-shipping_test.md
status: passed
started: 2026-10-28T06:05:02.582Z
duration_s: 169
session_id: eea2b758-726c-473e-8698-e2fbc78e0e9a
---

# Below-threshold promo discounts merchandise but not shipping — Result

## Step 1 ✓ passed (67.9s)
md5: b7bb5a97f7bb7b742d850b6b6a462c2d
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and put one Sticker pack ($20) in the cart.

## Step 2 ✓ passed (54.6s)
md5: 0f167343a3c0e6010f6c4670f6bfb6e5
At checkout with $20 merchandise subtotal apply UNIVERSE20, then assert its separately shown discount equals $4.00 calculated only from merchandise and excludes the shipping charge.

## Step 3 ✓ passed (37.9s)
md5: 80e06abab0eb0ed98d207fe4bf274292
Review shipping in the same discounted checkout price breakdown, then assert it remains $5.00 because the pre-discount merchandise subtotal is below $50.
