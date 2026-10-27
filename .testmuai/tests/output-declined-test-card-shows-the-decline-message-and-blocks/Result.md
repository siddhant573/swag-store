---
test: ../declined-test-card-shows-the-decline-message-and-blocks_test.md
status: passed
started: 2026-10-27T04:49:39.950Z
duration_s: 241
session_id: 855f9db0-9d18-46fa-b899-e8374bdf8d82
---

# Declined test card shows the decline message and blocks order placement — Result

## Step 1 ✓ passed (35.2s)
md5: 30464c99bc60b1d719e4001092439a19
On the Universe Swag Store sign-in page at {{start_url}}, sign in as `octo-demo` / `universe-2026`.

## Step 2 ✓ passed (34.8s)
md5: 759beadcc297858a044947267ece3f0a
On the account page, ensure a saved address exists with full name `{{saved_address_full_name}}`, street `{{saved_address_street}}`, city `{{saved_address_city}}`, state `{{saved_address_state}}`, and ZIP `{{saved_address_zip}}`, then open the shop.

## Step 3 ✓ passed (110.6s)
md5: 8ec644fde74335a435113bfc0961d6ef
From the shop, adjust the cart so it contains only 2 `Sticker pack` items and 1 `Holographic stickers`, open checkout, choose the saved address matching `{{saved_address_full_name}}`, `{{saved_address_street}}`, `{{saved_address_city}}`, `{{saved_address_state}}`, and `{{saved_address_zip}}`, apply promo code `UNIVERSE20`, store the displayed subtotal as `checkout_subtotal`, the discount as `checkout_discount`, the shipping charge as `checkout_shipping`, and the total as `checkout_total`, then assert the checkout shows subtotal, discount, shipping, and total, the selected shipping address shows that full name, street, city, state, and ZIP, the shipping line shows `$5.00`, and `checkout_total` equals `checkout_subtotal - checkout_discount + checkout_shipping`.

## Step 4 ✓ passed (57.7s)
md5: ef27b744166f06f86d14a9215e253e29
In the payment section, confirm the form states that payment is in test mode and provides fields for card number, expiry date (MM/YY), security code, and name on the card; enter card number `4000 0000 0000 0002`, expiry `{{valid_future_expiry}}`, security code `{{CVV}}`, and name `{{valid_card_name}}`, place the order, then assert the message `Your card was declined. Try a different card.` is shown and no order confirmation that thanks the shopper is opened.
