# kane-cli catches a checkout bug on a pull request

https://github.com/user-attachments/assets/024c20e6-fcf3-4cae-9035-dcc65b6f9074

This is a small web shop with one job: to show [kane-cli](https://www.npmjs.com/package/@testmuai/kane-cli) working from requirements to a pull request. A PM's requirement becomes an SDET's test, and that test catches a developer's bug before it merges.

**See it happen: [pull request #7](https://github.com/siddhant573/swag-store/pull/7).** The bug is there on purpose. The run, the screenshots and the replies are real.

## What happened on that PR

1. A refactor moved the order total into one function. It looked harmless, but it checked the free-shipping threshold after the discount instead of before it.
2. The reviewer commented `@kane-cli does this break checkout?`.
3. kane-cli traced the diff to the 5 tests it affects and ran them against the PR's build in a real browser. It replied 3 min 41 s later.
4. It found that a `$50` order with a `$10` promo now charged `$5` shipping instead of free shipping, and the `kane-cli / policy` check failed.
5. The one-line fix went in, and `@kane-cli the fix is pushed, check again` came back with 5 of 5 passing.

A second test, `t-4`, also failed on the first run. kane-cli's own triage put it down to the test's recording and not to the app, and it passed on the re-check. You can read both in the evidence pack linked from the PR.

## Start from your role

| You are | Start here | What to look for |
|---|---|---|
| **A developer** | [PR #7](https://github.com/siddhant573/swag-store/pull/7) | You ask in a comment and never name a test. The reply gives the cause, not just a red check |
| **A PM** | [`prd.md`](prd.md), section 3 | "The free-shipping threshold is checked against the merchandise subtotal before any discount." That sentence is why this bug got caught |
| **An SDET** | [`.testmuai/tests/`](.testmuai/tests) | 10 checkout tests in plain English, with each step tagged to the criteria it verifies. Then read the [quality gates](.github/kane/checkout-policy.yaml) a run must pass |

## From requirement to merged PR

| Step | Who | What you see here |
|---|---|---|
| Requirements become shared context | PM | [`prd.md`](prd.md), ingested into one Test Manager project |
| Tests are designed from those requirements | SDET | [`.testmuai/tests/`](.testmuai/tests), such as [the $50 free-shipping test](.testmuai/tests/threshold-promo-preserves-free-shipping-and-confirms-paid_test.md) |
| A PR runs only the tests it affects | Developer | [The workflow](.github/workflows/kane.yml) and [PR #7](https://github.com/siddhant573/swag-store/pull/7) |
| Every run leaves evidence and a verdict | SDET, developer | Screenshots, network and console for each step, judged against [the policy](.github/kane/checkout-policy.yaml) |
| The fix gets checked the same way | Developer | [The second reply on PR #7](https://github.com/siddhant573/swag-store/pull/7) |
| Coverage shows the gaps | PM, SDET | The passing run confirmed 16 of 32 criteria. Only 1 of the 17 use cases has tests designed so far, and `kane-cli cover` says so |

**No requirements written down?** Point `kane-cli explore` at your running app. It maps your screens, flows and findings, and the design step turns that map into tests in the same project.

## Use it in your repo

[**Follow the setup guide**](docs/use-in-your-repo.md). It takes you from installing kane-cli to your first `@kane-cli` comment on your own pull request. You'll need a TestMu AI (formerly LambdaTest) account with credits.

## Run the shop locally

You need Node 20 or newer.

```bash
npm ci
npm run dev   # http://localhost:3100
```

Sign in with `octo-demo` / `universe-2026`, a fictional account. Payments are in test mode: `4242 4242 4242 4242` is accepted and `4000 0000 0000 0002` is always declined. Nothing is ever charged.

The shop was built as the demo for a talk at GitHub Universe 2026, which is where its name and products come from. It's fictional and isn't affiliated with GitHub.

## Where things live

| Path | What it does |
|---|---|
| `prd.md` | The product's requirements |
| `.testmuai/tests/` | The designed tests and their recordings |
| `.github/kane-cli.yml` | Who may ask and run, how the PR's app starts, and which policy applies |
| `.github/kane/checkout-policy.yaml` | The quality gates |
| `.github/workflows/kane.yml` | The workflow, using the [`kane-cli-pr` action](https://github.com/LambdaTest/kane-cli/tree/main/integrations/github-action/kane-cli-pr) |
| `src/cart/pricing.ts` | Subtotal, discount, shipping and total |

Released under the [MIT License](LICENSE).
