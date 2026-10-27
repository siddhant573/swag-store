---
assurance:
  id: t-1
  base: sha256:8829e8e0dac779b045d129056f6743d8a9c60a66c85bc6446c25a5fa236a2777
---
# Checkout at the $50 threshold keeps free shipping and saves a new address

> Prove a pre-discount merchandise subtotal of $50 or more gets free shipping even after discount, and a shopper can enter and save a new shipping address before placing the order with an accepted test card.

## Step 1

On the Universe Swag Store sign-in page at {{start_url}}, sign in as `octo-demo` / `universe-2026`.

## Step 2

On the account page, remove any saved address that already matches full name `{{new_address_full_name}}`, street `{{new_address_street}}`, city `{{new_address_city}}`, state `{{new_address_state}}`, and ZIP `{{new_address_zip}}`, then open the shop.

## Step 3 @verifies ac-1, ac-3, ac-5, ac-6, ac-12

From the shop, adjust the cart so it contains only 1 `Laptop sleeve` and 1 `Universe mug`, open checkout, apply promo code `UNIVERSE20`, store the displayed subtotal as `checkout_subtotal`, the discount as `checkout_discount`, the shipping charge as `checkout_shipping`, and the total as `checkout_total`, then assert the checkout shows subtotal, discount, shipping, and total, the discount line shows `$10.00`, the shipping line shows `$0.00`, `checkout_total` equals `checkout_subtotal - checkout_discount + checkout_shipping`, and free shipping remains applied even though the discounted merchandise amount is `$40.00`.

## Step 4 @verifies ac-7

In the shipping address section, enter a new address with full name `{{new_address_full_name}}`, street `{{new_address_street}}`, city `{{new_address_city}}`, state `{{new_address_state}}`, and ZIP `{{new_address_zip}}`, choose to save it to the account, then assert the checkout shows that full name, street, city, state, and ZIP as the shipping address.

## Step 5 @verifies ac-2, ac-8, ac-9

In the payment section, confirm the form states that payment is in test mode and provides fields for card number, expiry date (MM/YY), security code, and name on the card; enter card number `4242 4242 4242 4242`, expiry `{{valid_future_expiry}}`, security code `{{CVV}}`, and name `{{valid_card_name}}`, place the order, then assert the confirmation total matches `checkout_total`.

## Step 6 @verifies ac-13

Open the account page and review the saved addresses, then assert the address `{{new_address_full_name}}`, `{{new_address_street}}`, `{{new_address_city}}`, `{{new_address_state}}`, and `{{new_address_zip}}` appears in the saved addresses list.
