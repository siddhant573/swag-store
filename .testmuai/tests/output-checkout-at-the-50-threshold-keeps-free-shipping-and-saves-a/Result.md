---
test: ../checkout-at-the-50-threshold-keeps-free-shipping-and-saves-a_test.md
status: passed
started: 2026-10-27T04:45:47.594Z
duration_s: 298
session_id: 6a211d7a-577b-4e6d-901f-ec8c633b0c5d
---

# Checkout at the $50 threshold keeps free shipping and saves a new address — Result

## Step 1 ✓ passed (39.1s)
md5: 30464c99bc60b1d719e4001092439a19
On the Universe Swag Store sign-in page at {{start_url}}, sign in as `octo-demo` / `universe-2026`.

## Step 2 ✓ passed (21.6s)
md5: 5da9fa6efed09d7bd1c0582eb43fc1da
On the account page, remove any saved address that already matches full name `{{new_address_full_name}}`, street `{{new_address_street}}`, city `{{new_address_city}}`, state `{{new_address_state}}`, and ZIP `{{new_address_zip}}`, then open the shop.

## Step 3 ✓ passed (81.2s)
md5: c573cae306718b90fce577f32f2ddb78
From the shop, adjust the cart so it contains only 1 `Laptop sleeve` and 1 `Universe mug`, open checkout, apply promo code `UNIVERSE20`, store the displayed subtotal as `checkout_subtotal`, the discount as `checkout_discount`, the shipping charge as `checkout_shipping`, and the total as `checkout_total`, then assert the checkout shows subtotal, discount, shipping, and total, the discount line shows `$10.00`, the shipping line shows `$0.00`, `checkout_total` equals `checkout_subtotal - checkout_discount + checkout_shipping`, and free shipping remains applied even though the discounted merchandise amount is `$40.00`.

## Step 4 ✓ passed (52.3s)
md5: 4b0bdfe9e7ffc28f717632ac76788f99
In the shipping address section, enter a new address with full name `{{new_address_full_name}}`, street `{{new_address_street}}`, city `{{new_address_city}}`, state `{{new_address_state}}`, and ZIP `{{new_address_zip}}`, choose to save it to the account, then assert the checkout shows that full name, street, city, state, and ZIP as the shipping address.

## Step 5 ✓ passed (71.2s)
md5: ccf4c4311d2636b7ee47e3dbe3d6fcf7
In the payment section, confirm the form states that payment is in test mode and provides fields for card number, expiry date (MM/YY), security code, and name on the card; enter card number `4242 4242 4242 4242`, expiry `{{valid_future_expiry}}`, security code `{{CVV}}`, and name `{{valid_card_name}}`, place the order, then assert the confirmation total matches `checkout_total`.

## Step 6 ✓ passed (29.4s)
md5: ae3754189fde236cf2e1b0bc3ef4e268
Open the account page and review the saved addresses, then assert the address `{{new_address_full_name}}`, `{{new_address_street}}`, `{{new_address_city}}`, `{{new_address_state}}`, and `{{new_address_zip}}` appears in the saved addresses list.
