---
assurance:
  id: t-6
  base: sha256:eed93979b424b099baab9de3caf549bdb6d7ab9f5db6c73a46136d9982979fc4
---
# New unsaved address is usable for accepted purchase

> Use a newly entered valid shipping address without selecting the save option and place an order.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack ($20) to the cart.

## Step 2 @verifies ac-15

At checkout enter new shipping address {{new_address_full_name}}, {{new_address_street}}, {{new_address_city}}, {{new_address_state}}, {{new_address_zip}} without opting to save it, then assert the entered address is selected for checkout.

## Step 3 @verifies ac-23, ac-32

Place the order with test card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert the accepted-card order confirmation shows that new shipping address.
