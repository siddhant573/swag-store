---
test: ../below-threshold-promo-discounts-merchandise-but-not-shipping_test.md
status: passed
started: 2026-10-28T05:38:57.423Z
duration_s: 159
session_id: 69f1274a-0dd2-4467-af19-a80e8dff146b
---

# Below-threshold promo discounts merchandise but not shipping — Result

## Step 1 ✓ passed (42.1s)
md5: b7bb5a97f7bb7b742d850b6b6a462c2d
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and put one Sticker pack ($20) in the cart.

## Step 2 ✓ passed (73.1s)
md5: 0f167343a3c0e6010f6c4670f6bfb6e5
At checkout with $20 merchandise subtotal apply UNIVERSE20, then assert its separately shown discount equals $4.00 calculated only from merchandise and excludes the shipping charge.

## Step 3 ✓ passed (33.1s)
md5: 80e06abab0eb0ed98d207fe4bf274292
Review shipping in the same discounted checkout price breakdown, then assert it remains $5.00 because the pre-discount merchandise subtotal is below $50.
