---
test: ../requesting-password-reset-for-an-existing-username-shows-the_test.md
status: passed
started: 2026-10-27T04:55:10.420Z
duration_s: 55
session_id: 3d87b10b-ed44-4cff-ab79-68fbe0318c4b
---

# Requesting password reset for an existing username shows the reset confirmation — Result

## Step 1 ✓ passed (30.2s)
md5: 46f4501f4854f6d107612d6ff450ec52
Open {{start_url}}, go to the store sign-in page, open the "Forgot your password?" flow, then assert the forgot-password form shows a username input.

## Step 2 ✓ passed (22.5s)
md5: a1552c9bc2d9d392fdf095d24f6fa7f9
On the forgot-password form, submit the username `octo-demo`, then assert the page shows a confirmation that a reset link was sent.
