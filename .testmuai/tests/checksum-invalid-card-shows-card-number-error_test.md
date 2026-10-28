---
assurance:
  id: t-8
  base: sha256:1a9d4cef463c00cb7e46e53c96835b2308b2927584e41d50a0164573480b1817
---
# Checksum-invalid card shows card-number error

> Supply a checksum-invalid card number and show its specified validation error.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 @verifies ac-19

At checkout choose a saved shipping address and submit test-mode payment with checksum-invalid card {{checksum_invalid_card}}, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert "Card number is invalid" is shown for the card number.
