---
test: ../missing-payment-security-code-receives-field-error_test.md
status: passed
started: 2026-10-28T05:43:18.094Z
duration_s: 112
session_id: 0f0a5df6-9446-45a5-a238-2df7bc227d82
---

# Missing payment security code receives field error — Result

## Step 1 ✓ passed (52.8s)
md5: 1525a197e103d2f4c1ca3db140a3b0e7
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 ✓ passed (53s)
md5: d1675899c678a47bbccff0393c96aa3d
At checkout choose a saved shipping address and submit test-mode payment with card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, no security code, and name {{valid_card_name}}, then assert a message specifically identifies the missing security code.
