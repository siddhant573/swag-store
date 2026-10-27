# Universe Swag Store: product requirements

The Universe Swag Store sells a small, fixed range of GitHub Universe merchandise to signed-in shoppers.
This document describes what the store must do: browsing and searching the catalog, choosing sizes, saving a
wishlist, reading and writing reviews, managing the cart, checking out with a shipping address, reviewing,
cancelling and repeating past orders, managing saved addresses, signing in, and getting help. Payments run in test mode: no card is ever charged.

## 1. Home and catalog

- The home page shows the collection, the three categories with their product counts, the bestsellers and
  what's new this season.
- The header has the categories, a search box, and links to the account (or sign-in), the wishlist and the cart
  with its item count. Every page says that shipping is free on orders of $50 or more.

- The catalog lists every product with its name, picture, price, category and average rating:
  Octocat tee $25.00, Sticker pack $20.00, Mona hoodie $60.00, Universe mug $15.00, Copilot cap $22.00,
  Pixel socks $12.00, Dependabot plush $30.00, Laptop sleeve $35.00, Holographic stickers $9.00.
- Categories are Apparel, Accessories and Stickers. A shopper can filter by one category, or see all.
- The shop page lists products. A shopper can search by name or description from any page. The page says how many products match, and
  "No products match" when none do.
- A shopper can sort by Featured, Price: low to high, Price: high to low, or Name.
- Prices are fixed. There is no stock count, and a product never sells out.

## 1a. Product page, sizes and reviews

- The product page shows the product's name, price, description, reviews and up to three related products from
  the same category.
- Apparel comes in sizes. The shopper must choose a size before adding it; otherwise the page says "Choose a size".
  Each size is its own line in the cart.
- The shopper picks a quantity from 1 to 10 when adding from the product page.
- Products without sizes can be added straight from the catalog. Apparel cards say "Choose size" instead.
- Reviews show a star rating, a title, the text, the date, the reviewer's name and whether they're a verified buyer,
  with the average and the count at the top.
- Apparel product pages have a size guide.
- A shopper can write a review: a rating of 1 to 5 stars, a title and at least 10 characters of text are all required.

## 1b. Wishlist

- A shopper can save any product to their wishlist from the catalog or the product page, and unsave it again.
- The wishlist page lists saved products. A product without sizes can be moved straight to the cart; apparel
  links to its product page to choose a size. A shopper can remove a product from the wishlist.

## 2. Cart

- The cart lists each product with its quantity, its unit price and its line price (unit price × quantity).
- A shopper can change a quantity or remove a product. The cart updates at once.
- The cart shows the merchandise subtotal: the sum of the line prices.
- The cart says how much more merchandise the shopper needs for free shipping, or that they've unlocked it.
- An empty cart says so and links back to the shop.

## 3. Checkout and pricing

Checkout shows the full price breakdown before the shopper places the order: subtotal, discount, shipping and total.

**Promo codes**
- A shopper can enter one promo code at checkout. `UNIVERSE20` takes 20% off.
- Promo codes apply to merchandise only, never to gift wrap or shipping.
- The discount is rounded to the nearest cent and shown as its own line.
- An unknown code shows "This code isn't valid" and leaves the total unchanged.

**Shipping**
- Shipping is $5, free when the merchandise subtotal is $50 or more.
- The free-shipping threshold is checked against the merchandise subtotal before any discount.

**Total**
- The order total is the merchandise subtotal, minus the discount, plus shipping.
- The total shown at checkout is the amount the shopper pays.

**Shipping address**
- Every order needs a shipping address: full name, street address, city, state and a 5-digit ZIP code.
  A missing or invalid field shows its own message, for example "ZIP code must be 5 digits".
- A shopper with saved addresses picks one, or enters a new one. A new address can be saved to their account.

**Payment**
- Payment is in test mode, and the form says so. It takes a card number, an expiry date (MM/YY), a security code
  and the name on the card.
- A card number that fails the card checksum shows "Card number is invalid". An expiry date in the past shows
  "This card has expired". A missing security code or name shows its own message.
- The test card 4242 4242 4242 4242 is accepted. The test card 4000 0000 0000 0002 is always declined, with
  "Your card was declined. Try a different card.", and no order is placed.
- "Place order" places the order and opens its confirmation, which thanks the shopper.

## 4. Order confirmation and order history

- The order confirmation shows the order number, each product and quantity, and the price breakdown.
- The order confirmation shows the same total that the shopper paid at checkout.
- The order confirmation also shows the order's status and its shipping address.
- The order page shows its progress: placed, processing, shipped and delivered.
- Order history lists the shopper's past orders, newest first, each with its date, item count, status, total and
  a link to its confirmation.
- A new order's status is Processing. While it's Processing, the shopper can cancel it; its status becomes
  Cancelled and the confirmation says "Order cancelled".
- "Buy again" on an order puts the same products and quantities back in the cart.

## 4b. Returns

- A delivered order can be returned. The shopper chooses one or more items, a reason (Doesn't fit, Changed my mind,
  Arrived damaged, Not as described, Wrong item sent) and a refund to the original card or to store credit.
  Returns are free.
- Without an item or a reason, the return isn't sent and the page says what's missing.
- A requested return gets a return number (RMA), the order's status becomes "Return requested", and the order page
  shows the returned items, the reason and the refund method.
- An order that isn't delivered can't be returned.

## 4a. Account and saved addresses

- The account page shows who is signed in, links to order history and the wishlist, and the saved addresses.
- A shopper can add, edit and delete saved addresses, with the same field rules as checkout.

## 5. Sign-in

- A shopper signs in with a username and password. The demo account is `octo-demo` / `universe-2026`.
- A wrong password shows "Username or password is incorrect" and doesn't sign the shopper in.
- The cart, checkout, order history, account and wishlist pages need a signed-in shopper. Browsing the catalog,
  product pages, help and contact don't. A signed-out shopper is sent to sign in and then returned to the page they wanted.
- "Forgot your password?" asks for a username and confirms that a reset link was sent if the account exists.
- The demo account already has two delivered orders in its history.
- Signing out returns the shopper to the home page.

## 6. Help and contact

- The help page answers common questions (shipping, promo codes, cancelling, sizes) in expandable entries,
  and links to the contact form.
- The contact form needs a name, a topic and a message of at least 20 characters. An order number is optional,
  and when given it must look like UV-1001. A sent message shows a ticket number.
