---
assurance:
  id: t-9
  base: sha256:f3bfa43bbdba477c33b80ddde94c7a5a31175beca503fd17180c85c7d9ed324d
---
# Expired card shows expiry error

> Supply an expiry in the past and show the specified expiry validation error.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 @verifies ac-20

At checkout choose a saved shipping address and submit test-mode payment with 4242 4242 4242 4242, past MM/YY expiry {{expired_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert "This card has expired" appears for expiry.
