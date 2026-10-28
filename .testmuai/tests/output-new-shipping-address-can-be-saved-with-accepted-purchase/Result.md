---
test: ../new-shipping-address-can-be-saved-with-accepted-purchase_test.md
status: passed
started: 2026-10-28T05:44:22.176Z
duration_s: 192
session_id: d5116f93-92b1-41dd-b52e-cf1c2f930aa6
---

# New shipping address can be saved with accepted purchase — Result

## Step 1 ✓ passed (49.7s)
md5: 24979c87f389b16a02bfd293cf55eab0
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack ($20) and one Dependabot plush ($30) to the cart.

## Step 2 ✓ passed (70.7s)
md5: 425c8642cbe48ff10c5474e94b429456
At checkout enter new shipping address {{new_address_full_name}}, {{new_address_street}}, {{new_address_city}}, {{new_address_state}}, {{new_address_zip}} and opt to save it to the account, then assert the new address is selected for checkout.

## Step 3 ✓ passed (44.6s)
md5: 497d3ff11f05d0406a4130412b1626f7
Place the order with test card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert the accepted-card confirmation displays the new shipping address entered for this order.

## Step 4 ✓ passed (23s)
md5: 15d0c87293811b819458b6a1d57df3f1
From the signed-in shopper's account, open saved addresses after this checkout, then assert the newly entered address is present.
