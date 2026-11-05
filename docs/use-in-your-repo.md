# Use kane-cli in your own repo

By the end of this guide, a comment on any pull request in your repo runs the tests that change affects, against that PR's build, and posts the result with evidence and a policy check.

You need:

- A TestMu AI (formerly LambdaTest) account with credits. Designing tests and recording them spends credits, and so do PR checks.
- A web app you can build and start on a GitHub-hosted runner.
- Node 20 or newer.

## 1. Install and sign in

```bash
npm install -g @testmuai/kane-cli
kane-cli login
```

## 2. Create a shared project

Your PMs, SDETs and developers all work from one project in Test Manager.

```bash
kane-cli projects create "my-app"
```

Note the project id it prints.

## 3. Add what your app should do

Run this from your repo's root. `--project` links the folder to the project and writes `.testmuai/assurance.json`.

```bash
kane-cli context ingest docs/requirements.md --project <project-id>
```

kane-cli reads the document and proposes use cases in a chat, and may ask about anything the document leaves open. Review them there and save the session when it finishes: nothing reaches the project until it's saved. To check, list them:

```bash
kane-cli context list
```

**No requirements written down?** Point the explorer at your running app instead. It maps your screens, flows and findings, and the design step turns that map into tests in the same project. Give it full access, including a sign-in through `--deps`: holding access back gets you a smaller map, not tougher tests. By default it may submit forms and change data, so pass `--policy read_only` if it must not.

```bash
kane-cli explore run --project <project-id> --url https://staging.example.com \
  --prompt "Checkout and account settings" --policy read_only
```

## 4. Design and record the tests

Design tests for each use case, then save that session too. Each use case gets criteria, scenarios and one test per scenario.

```bash
kane-cli design tests --use-case uc-1
```

Tell the tests where your app is. Saving the design creates `.testmuai/variables/assurance.json`: set `start_url` there to your app's local address, and fill in any other values it lists. Use test accounts, never real passwords, because this file gets committed. On a PR, kane-cli replaces `start_url` with the PR's build.

The first run of a test records its steps in a real browser. Start your app and run them:

```bash
kane-cli testrun run .testmuai/tests/*_test.md --headless
```

This is the step that costs the most. In our test on a tiny app, requirements, design and recording 3 tests came to about 350 credits, including one re-run. If a test fails here, read why before committing: it may be a real bug or a test that doesn't fit your app.

## 5. Commit the tests and their recordings

CI replays the recorded steps, so commit each `output-<name>/` folder next to its test. Ignore the local evidence packs first: they record who ran them, including your email.

```bash
printf '.testmuai/evidence/\n.context/\n' >> .gitignore
git add .gitignore .testmuai
git commit -m "test: add kane-cli tests"
```

## 6. Add the workflow

Copy these three files from this repo to the same paths on your default branch:

| File | What to change |
|---|---|
| [`.github/workflows/kane.yml`](../.github/workflows/kane.yml) | Nothing |
| [`.github/kane-cli.yml`](../.github/kane-cli.yml) | `app.start` and `app.url`: how your app builds and serves on the runner. `access`: who may ask and run |
| [`.github/kane/checkout-policy.yaml`](../.github/kane/checkout-policy.yaml) | The gates a run must pass |

Then add your credentials as repository secrets. Your username and access key are in the TestMu AI dashboard under Settings > Keys. Run these in your own terminal, and paste each value when it asks.

```bash
gh secret set LT_USERNAME
gh secret set LT_ACCESS_KEY
```

## 7. Ask about a pull request

Open a PR and comment:

```text
@kane-cli does this break checkout?
```

kane-cli reacts with 👀, finds the affected tests, runs them against the PR's build and replies. It also sets the `kane-cli / tests` and `kane-cli / policy` checks. Make those checks required in your branch protection if you want them to block merges.

## Before you turn it on

- **A PR's code runs on the runner.** The check builds and serves the pull request's own code. Keep `access.run` to people you trust, and keep workflows for fork PRs disabled in your repo's Actions settings.
- **Test Manager holds your project.** The tests and their cases live there, and your repo holds the runnable files.

The [action's README](https://github.com/LambdaTest/kane-cli/tree/main/integrations/github-action/kane-cli-pr) lists every input, command and configuration key.
