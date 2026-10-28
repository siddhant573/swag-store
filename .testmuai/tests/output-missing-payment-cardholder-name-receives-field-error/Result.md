---
test: ../missing-payment-cardholder-name-receives-field-error_test.md
status: passed
started: 2026-10-28T05:41:59.383Z
duration_s: 122
session_id: b7869b28-592f-4cb7-bf78-d7f8137c0a57
---

# Missing payment cardholder name receives field error — Result

## Step 1 ✓ passed (55.1s)
md5: 1525a197e103d2f4c1ca3db140a3b0e7
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 ✓ passed (58.6s)
md5: fa02819948ed4cba70eb6455a8e9a628
At checkout choose a saved shipping address and submit test-mode payment with card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and no cardholder name, then assert a message specifically identifies the missing cardholder name.
