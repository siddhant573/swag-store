---
test: ../protected-pages-require-sign-in-demo-login-resumes-order_test.md
status: passed
started: 2026-10-27T05:03:11.477Z
duration_s: 205
session_id: 0708d986-18b3-49fc-8033-43e92d51102c
---

# Protected pages require sign-in, demo login resumes order history, and sign-out returns home — Result

## Step 1 ✓ passed (0.76s)
md5: d38de3029125080b513fd801d5367e3f
Open {{start_url}} in the browser and ensure the shopper session is signed out before starting from the store home page.

## Step 2 ✓ passed (125.6s)
md5: e104326e6f7cdc44384fa00c3ea34c24
From the home page while signed out, request the cart, checkout, account, and wishlist pages in turn, and then request the order history page; after each request, assert the sign-in page is shown.

## Step 3 ✓ passed (32.2s)
md5: efcd292c17e48f32430bfcc5df3e225c
On the sign-in page reached from the order history request, sign in with username `octo-demo` and password `universe-2026`, then assert the browser returns to the order history page instead of staying on sign-in.

## Step 4 ✓ passed (23.3s)
md5: 92533fa3642af55828a1971f08fdc8b1
On the demo account's order history page, inspect the delivered orders list, then assert exactly 2 delivered orders are shown.

## Step 5 ✓ passed (20.1s)
md5: 720a717775ab6fdbe9accccb525f6e21
From the signed-in store header or account controls, sign out, then assert the browser returns to the home page.
