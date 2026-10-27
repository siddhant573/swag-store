---
assurance:
  id: t-4
  base: sha256:23897d5259bb3f02b59937388dc8bc636fba2dd6178b287b879888735d046a24
---
# Protected pages require sign-in, demo login resumes order history, and sign-out returns home

> Prove that protected store pages require authentication, that the shopper returns to the requested protected page after successful demo sign-in, that the demo account exposes the seeded order-history data, and that signing out returns the shopper to the home page.

## Step 1

Open {{start_url}} in the browser and ensure the shopper session is signed out before starting from the store home page.

## Step 2 @verifies ac-16

From the home page while signed out, request the cart, checkout, account, and wishlist pages in turn, and then request the order history page; after each request, assert the sign-in page is shown.

## Step 3 @verifies ac-17, ac-18

On the sign-in page reached from the order history request, sign in with username `octo-demo` and password `universe-2026`, then assert the browser returns to the order history page instead of staying on sign-in.

## Step 4 @verifies ac-22

On the demo account's order history page, inspect the delivered orders list, then assert exactly 2 delivered orders are shown.

## Step 5 @verifies ac-23

From the signed-in store header or account controls, sign out, then assert the browser returns to the home page.
