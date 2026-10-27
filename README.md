# Universe Swag Store

A small web shop for GitHub Universe merchandise: Octocat tees, Mona hoodies, sticker packs, mugs and more.
Shoppers browse and search the catalog, pick sizes, keep a wishlist, check out with a shipping address and a
test-mode card, and track, cancel, return or re-order past orders.

`prd.md` is the product's requirements document. Every test in `.testmuai/tests/` was designed from it.

## Run it

Node 20 or newer.

```bash
npm ci
npm run dev          # http://localhost:3100, live reload
npm run build && npm start          # production build on :3100
npm run build && npm run start:kane # production build on http://127.0.0.1:4046 (what the tests use)
npm run start:kane:v2               # the same build with the v2 checkout ("Complete purchase", promo field moved)
```

Sign in with `octo-demo` / `universe-2026`. It's a fictional account with two delivered orders in its
history. Payments are in test mode: `4242 4242 4242 4242` is accepted, and `4000 0000 0000 0002` is always
declined. No card is ever charged.

## Where things live

| Path | What it does |
|---|---|
| `src/cart/pricing.ts` | Subtotal, promo discount, shipping and total. The cart, checkout and the order API import it. |
| `src/server/orderSummary.ts` | The order confirmation's price breakdown, recomputed from the saved order. |
| `src/app/` | The pages (Next.js App Router) and the API routes (`/api/login`, `/api/orders`, …). |
| `src/data/` | The catalog, reviews, card and address rules. |
| `src/ui/version.ts` | `UI_VERSION=v2` renames "Place order" and moves the promo field. It never touches pricing. |

## Tests: kane-cli guards every pull request

The end-to-end tests are designed by [kane-cli](https://www.npmjs.com/package/@testmuai/kane-cli) from
`prd.md` and live in `.testmuai/tests/*_test.md`, next to their recordings (`output-*/`). Run them all against
a local build:

```bash
kane-cli testrun run .testmuai/tests/*_test.md --headless --parallel 1
```

On a pull request, comment to ask kane-cli about the change:

- `@kane-cli does this break checkout?` finds the tests whose requirements the change touches, runs them
  against the PR's build and replies with the results, the evidence pack and the checkout policy's verdict.
- `@kane-cli run them`, `@kane-cli rerun the failed one`, `@kane-cli why did <test> fail?`
- `@kane-cli help` lists everything it can do.

The workflow is `.github/workflows/kane.yml`, and the action is `.github/actions/kane-cli-github/`.
`.github/kane-cli.yml` sets who may ask and run, how the PR's app is served (`npm run start:kane` on
127.0.0.1:4046), and the policy every run is judged against (`.github/kane/checkout-policy.yaml`: every checkout
test must pass and assert something; a healed test is a warning). PR checks run with heal off, so a check
reports what it saw.

Between demo takes, `./reset-take.sh <owner/repo> [--keep N]` closes the open `feat/*` pull requests and
deletes their branches. Tests designed in a take stay in the linked project (a linked folder can't archive them); a later
PR's impact may still match them, but with no file in the repo they never run, count or show as rows: the
"Why these tests" section ends with one muted line saying how many were left out.

## Agents

- `.github/agents/kaymas.agent.md`: the coding agent's instructions for this repo.
- `.github/skills/kane-cli/`: the kane-cli skill, so an agent can design and run tests with it.
