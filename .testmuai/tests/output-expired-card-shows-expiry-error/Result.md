---
test: ../expired-card-shows-expiry-error_test.md
status: passed
started: 2026-10-28T05:41:04.334Z
duration_s: 112
session_id: cc5c30a6-d0ca-4d1f-b7f3-de8ae850d28c
---

# Expired card shows expiry error — Result

## Step 1 ✓ passed (51.7s)
md5: 1525a197e103d2f4c1ca3db140a3b0e7
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 ✓ passed (53.8s)
md5: f10b6fd233c8c75f75aaaa2a590d30e1
At checkout choose a saved shipping address and submit test-mode payment with 4242 4242 4242 4242, past MM/YY expiry {{expired_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert "This card has expired" appears for expiry.
