---
assurance:
  id: t-5
  base: sha256:52e8b1e4fb1cfbdc694727d3d304eb1dba138010365dfb34f9e0e6da64684a98
---
# New shipping address can be saved with accepted purchase

> Enter a valid new address, opt to save it, and place an accepted order with that address.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack ($20) and one Dependabot plush ($30) to the cart.

## Step 2 @verifies ac-15

At checkout enter new shipping address {{new_address_full_name}}, {{new_address_street}}, {{new_address_city}}, {{new_address_state}}, {{new_address_zip}} and opt to save it to the account, then assert the new address is selected for checkout.

## Step 3 @verifies ac-23, ac-32

Place the order with test card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert the accepted-card confirmation displays the new shipping address entered for this order.

## Step 4 @verifies ac-16

From the signed-in shopper's account, open saved addresses after this checkout, then assert the newly entered address is present.
