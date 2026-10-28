---
assurance:
  id: t-2
  base: sha256:7ce5c4f141e548a77e37ceb74f66a2df052ec7b0ecda4b6ab9881850a58ccf48
---
# Threshold promo preserves free shipping and confirms paid total

> At $50 merchandise subtotal, apply promo to merchandise and keep shipping free based on the pre-discount subtotal, then place the order.

## Step 1

At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and put one Sticker pack ($20) and one Dependabot plush ($30) in the cart.

## Step 2 @verifies ac-5, ac-6

At checkout apply UNIVERSE20 to the $50 pre-discount merchandise subtotal, then assert the displayed discount equals $10.00 calculated from merchandise alone, without shipping.

## Step 3 @verifies ac-9

At the checkout price breakdown for that $50 merchandise subtotal, review shipping and capture the displayed checkout total for comparison, then assert shipping is $0.00 before and after the promotion.

## Step 4 @verifies ac-23, ac-30, ac-31

Choose a saved shipping address; place the order with accepted test card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert a confirmation opens for the accepted card, its total matches the checkout total captured for this order, and its new-order status is Processing.
