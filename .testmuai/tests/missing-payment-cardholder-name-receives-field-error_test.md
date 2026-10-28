---
assurance:
  id: t-11
  base: sha256:bc93ee21629534262877c492cfbfc02c65080538ab7c9154ae3ae6800edbd44f
---
# Missing payment cardholder name receives field error

> Omit cardholder name and show its own field message.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack to the cart.

## Step 2 @verifies ac-22

At checkout choose a saved shipping address and submit test-mode payment with card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and no cardholder name, then assert a message specifically identifies the missing cardholder name.
