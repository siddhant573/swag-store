---
assurance:
  id: t-5
  base: sha256:e63877ade7eb666ff6fa863d16cbb49b7c7f5e762d25a8248c4c88ba42f33015
---
# Requesting password reset for an existing username shows the reset confirmation

> Prove that the forgot-password flow accepts a username and shows the reset-link confirmation for an existing account.

## Step 1 @verifies ac-24

Open {{start_url}}, go to the store sign-in page, open the "Forgot your password?" flow, then assert the forgot-password form shows a username input.

## Step 2 @verifies ac-25

On the forgot-password form, submit the username `octo-demo`, then assert the page shows a confirmation that a reset link was sent.
