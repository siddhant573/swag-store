---
test: ../saved-address-purchase-displays-matching-confirmation_test.md
status: passed
started: 2026-10-28T05:45:33.892Z
duration_s: 212
session_id: 8441539a-4671-4eda-9529-249405d813fc
---

# Saved-address purchase displays matching confirmation — Result

## Step 1 ✓ passed (57.4s)
md5: 27ca858fc5a08a678ff8c9d585264fd0
At {{start_url}}, sign in to the Universe Swag Store as {{testmu_user}} with {{testmu_pass}} and add one Sticker pack ($20) to the cart.

## Step 2 ✓ passed (59.7s)
md5: 529cdf60e50d0590fc603391ab73fe63
On checkout select a saved shipping address and review the price breakdown for the $20 merchandise subtotal, then assert the selected saved address is shown, shipping is $5.00, and the total equals $20.00 minus the displayed discount plus $5.00.

## Step 3 ✓ passed (86.8s)
md5: b64b9fc995aa9143dbe2677fda7ceb56
Record the checkout total and selected saved shipping address for this specific order, then place it with 4242 4242 4242 4242, {{valid_future_expiry}}, {{CVV}}, and {{valid_card_name}}, then assert the accepted-card confirmation thanks the shopper, gives an order number, lists one Sticker pack and quantity 1, shows the price breakdown, repeats the recorded checkout total and selected shipping address, and shows Processing status.
