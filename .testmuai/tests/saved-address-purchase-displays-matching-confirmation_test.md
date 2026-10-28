---
assurance:
  id: t-4
  base: sha256:ccf3eb5793dc819739c7fb605f2042e33dca99de32da71c2ea1ab8e4f771428e
---
# Saved-address purchase displays matching confirmation

> Use saved address and accepted test card for an ordinary $5-shipping checkout and matching confirmation.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack ($20) to the cart.

## Step 2 @verifies ac-14, ac-8, ac-4

On checkout select a saved shipping address and review the price breakdown for the $20 merchandise subtotal, then assert the selected saved address is shown, shipping is $5.00, and the total equals $20.00 minus the displayed discount plus $5.00.

## Step 3 @verifies ac-23, ac-26, ac-27, ac-28, ac-29, ac-30, ac-31, ac-32

Record the checkout total and selected saved shipping address for this specific order, then place it with 4242 4242 4242 4242, {{valid_future_expiry}}, {{CVV}}, and {{valid_card_name}}, then assert the accepted-card confirmation thanks the shopper, gives an order number, lists one Sticker pack and quantity 1, shows the price breakdown, repeats the recorded checkout total and selected shipping address, and shows Processing status.
