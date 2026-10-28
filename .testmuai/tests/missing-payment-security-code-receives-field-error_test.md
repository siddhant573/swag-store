---
assurance:
  id: t-10
  base: sha256:8c128f63d2cf867477288112a377ceac239e5e325491ccf2b6d88782467b5641
---
# Missing payment security code receives field error

> Omit security code and show its own field message.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 @verifies ac-21

At checkout choose a saved shipping address and submit test-mode payment with card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, no security code, and name {{valid_card_name}}, then assert a message specifically identifies the missing security code.
