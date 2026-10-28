---
test: ../new-unsaved-address-is-usable-for-accepted-purchase_test.md
status: passed
started: 2026-10-28T05:44:42.619Z
duration_s: 152
session_id: 1e993625-2551-4cbc-8f16-253bf77562de
---

# New unsaved address is usable for accepted purchase — Result

## Step 1 ✓ passed (56.9s)
md5: 27ca858fc5a08a678ff8c9d585264fd0
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack ($20) to the cart.

## Step 2 ✓ passed (47.4s)
md5: 84180e5bdac09297596f1f79845e8d3d
At checkout enter new shipping address {{new_address_full_name}}, {{new_address_street}}, {{new_address_city}}, {{new_address_state}}, {{new_address_zip}} without opting to save it, then assert the entered address is selected for checkout.

## Step 3 ✓ passed (39.2s)
md5: 6a1dbf35910ce7910fce8a286c25fd6e
Place the order with test card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert the accepted-card order confirmation shows that new shipping address.
