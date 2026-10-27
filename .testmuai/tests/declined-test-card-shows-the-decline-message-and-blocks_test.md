---
assurance:
  id: t-3
  base: sha256:aa08537d20d7e79c5280895451372f82029acca84de8c0910b5e192b31249cc5
---
# Declined test card shows the decline message and blocks order placement

> Prove test card 4000 0000 0000 0002 is declined with the specified message and no order is placed after the shopper enters otherwise valid checkout information.

## Step 1

On the Universe Swag Store sign-in page at {{start_url}}, sign in as `octo-demo` / `universe-2026`.

## Step 2

On the account page, ensure a saved address exists with full name `{{saved_address_full_name}}`, street `{{saved_address_street}}`, city `{{saved_address_city}}`, state `{{saved_address_state}}`, and ZIP `{{saved_address_zip}}`, then open the shop.

## Step 3 @verifies ac-1, ac-3, ac-4, ac-7

From the shop, adjust the cart so it contains only 2 `Sticker pack` items and 1 `Holographic stickers`, open checkout, choose the saved address matching `{{saved_address_full_name}}`, `{{saved_address_street}}`, `{{saved_address_city}}`, `{{saved_address_state}}`, and `{{saved_address_zip}}`, apply promo code `UNIVERSE20`, store the displayed subtotal as `checkout_subtotal`, the discount as `checkout_discount`, the shipping charge as `checkout_shipping`, and the total as `checkout_total`, then assert the checkout shows subtotal, discount, shipping, and total, the selected shipping address shows that full name, street, city, state, and ZIP, the shipping line shows `$5.00`, and `checkout_total` equals `checkout_subtotal - checkout_discount + checkout_shipping`.

## Step 4 @verifies ac-8, ac-9, ac-10, ac-11

In the payment section, confirm the form states that payment is in test mode and provides fields for card number, expiry date (MM/YY), security code, and name on the card; enter card number `4000 0000 0000 0002`, expiry `{{valid_future_expiry}}`, security code `{{CVV}}`, and name `{{valid_card_name}}`, place the order, then assert the message `Your card was declined. Try a different card.` is shown and no order confirmation that thanks the shopper is opened.
