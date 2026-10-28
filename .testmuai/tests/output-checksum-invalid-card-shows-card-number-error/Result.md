---
test: ../checksum-invalid-card-shows-card-number-error_test.md
status: passed
started: 2026-10-28T05:33:55.007Z
duration_s: 123
session_id: 65436308-215f-4e27-9962-450387955235
---

# Checksum-invalid card shows card-number error — Result

## Step 1 ✓ passed (62.1s)
md5: 1525a197e103d2f4c1ca3db140a3b0e7
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 ✓ passed (52.5s)
md5: 53d7a7be2fe3943a25b27a4e5ae99620
At checkout choose a saved shipping address and submit test-mode payment with checksum-invalid card {{checksum_invalid_card}}, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert "Card number is invalid" is shown for the card number.
