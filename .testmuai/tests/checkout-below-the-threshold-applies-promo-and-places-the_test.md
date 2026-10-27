---
assurance:
  id: t-2
  base: sha256:f738ea6ef5580dbc06b8c5ddf72a315d90325371ca345447b51ab0061bcb305c
---
# Checkout below the threshold applies promo and places the order

> Prove checkout shows the full price breakdown, applies UNIVERSE20 to merchandise, keeps $5 shipping on a pre-discount merchandise subtotal below $50, and places the order with an accepted test card using a saved address.

## Step 1

On the Universe Swag Store sign-in page at {{start_url}}, sign in as `octo-demo` / `universe-2026`.

## Step 2

On the account page, ensure a saved address exists with full name `{{saved_address_full_name}}`, street `{{saved_address_street}}`, city `{{saved_address_city}}`, state `{{saved_address_state}}`, and ZIP `{{saved_address_zip}}`, then open the shop.

## Step 3 @verifies ac-3, ac-4, ac-7, ac-15

From the shop, adjust the cart so it contains only 2 `Sticker pack` items and 1 `Holographic stickers`, open checkout, choose the saved address matching `{{saved_address_full_name}}`, `{{saved_address_street}}`, `{{saved_address_city}}`, `{{saved_address_state}}`, and `{{saved_address_zip}}`, apply promo code `UNIVERSE20`, store the displayed subtotal as `checkout_subtotal`, the discount as `checkout_discount`, the shipping charge as `checkout_shipping`, and the total as `checkout_total`, then assert the checkout shows subtotal, discount, shipping, and total, the selected shipping address shows that full name, street, city, state, and ZIP, the discount line shows `$9.80`, and the shipping line shows `$5.00`.

## Step 4 @verifies ac-1, ac-2, ac-8, ac-9, ac-14

In the payment section, confirm the form states that payment is in test mode and provides fields for card number, expiry date (MM/YY), security code, and name on the card; enter card number `4242 4242 4242 4242`, expiry `{{valid_future_expiry}}`, security code `{{CVV}}`, and name `{{valid_card_name}}`, place the order, then assert the confirmation thanks the shopper, the confirmation total matches `checkout_total`, and `checkout_total` equals `checkout_subtotal - checkout_discount + checkout_shipping`.
