---
test: ../checkout-below-the-threshold-applies-promo-and-places-the_test.md
status: passed
started: 2026-10-27T04:45:48.020Z
duration_s: 211
session_id: fd3c589f-153a-4625-9214-a69c66b7a0fc
---

# Checkout below the threshold applies promo and places the order — Result

## Step 1 ✓ passed (27.3s)
md5: 30464c99bc60b1d719e4001092439a19
On the Universe Swag Store sign-in page at {{start_url}}, sign in as `octo-demo` / `universe-2026`.

## Step 2 ✓ passed (33.3s)
md5: 759beadcc297858a044947267ece3f0a
On the account page, ensure a saved address exists with full name `{{saved_address_full_name}}`, street `{{saved_address_street}}`, city `{{saved_address_city}}`, state `{{saved_address_state}}`, and ZIP `{{saved_address_zip}}`, then open the shop.

## Step 3 ✓ passed (81.1s)
md5: cb0d093f0406645d71e2f2a3bd4bdc09
From the shop, adjust the cart so it contains only 2 `Sticker pack` items and 1 `Holographic stickers`, open checkout, choose the saved address matching `{{saved_address_full_name}}`, `{{saved_address_street}}`, `{{saved_address_city}}`, `{{saved_address_state}}`, and `{{saved_address_zip}}`, apply promo code `UNIVERSE20`, store the displayed subtotal as `checkout_subtotal`, the discount as `checkout_discount`, the shipping charge as `checkout_shipping`, and the total as `checkout_total`, then assert the checkout shows subtotal, discount, shipping, and total, the selected shipping address shows that full name, street, city, state, and ZIP, the discount line shows `$9.80`, and the shipping line shows `$5.00`.

## Step 4 ✓ passed (67s)
md5: 864a2ca84b7d768b29dda4b470f62abb
In the payment section, confirm the form states that payment is in test mode and provides fields for card number, expiry date (MM/YY), security code, and name on the card; enter card number `4242 4242 4242 4242`, expiry `{{valid_future_expiry}}`, security code `{{CVV}}`, and name `{{valid_card_name}}`, place the order, then assert the confirmation thanks the shopper, the confirmation total matches `checkout_total`, and `checkout_total` equals `checkout_subtotal - checkout_discount + checkout_shipping`.
