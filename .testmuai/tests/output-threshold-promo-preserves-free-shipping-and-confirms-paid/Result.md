---
test: ../threshold-promo-preserves-free-shipping-and-confirms-paid_test.md
status: passed
started: 2026-10-28T05:47:57.557Z
duration_s: 209
session_id: a4525812-353d-4141-ad4e-d381efd9892e
---

# Threshold promo preserves free shipping and confirms paid total — Result

## Step 1 ✓ passed (47s)
md5: 356855b816a897bcae8cf7cd85642ca8
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and put one Sticker pack ($20) and one Dependabot plush ($30) in the cart.

## Step 2 ✓ passed (64.3s)
md5: f891494be88fa021b1fe21274a21bdbb
At checkout apply UNIVERSE20 to the $50 pre-discount merchandise subtotal, then assert the displayed discount equals $10.00 calculated from merchandise alone, without shipping.

## Step 3 ✓ passed (32.4s)
md5: 95bb066f338d9f8011606c2edf6dfb54
At the checkout price breakdown for that $50 merchandise subtotal, review shipping and capture the displayed checkout total for comparison, then assert shipping is $0.00 before and after the promotion.

## Step 4 ✓ passed (60.2s)
md5: 0d3fdc5c08c43b1f2ebdaa2652b9443f
Choose a saved shipping address; place the order with accepted test card 4242 4242 4242 4242, expiry {{valid_future_expiry}}, security code {{CVV}}, and name {{valid_card_name}}, then assert a confirmation opens for the accepted card, its total matches the checkout total captured for this order, and its new-order status is Processing.
