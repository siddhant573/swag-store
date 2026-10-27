import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const repo = join(import.meta.dirname, "..", "..", "..", "..");
const wf = parse(readFileSync(join(repo, ".github/workflows/kane.yml"), "utf8"));

test("fix 4: the first checkout is the default branch, even on pull_request_review_comment (whose default ref is the PR's merge ref)", () => {
  const steps = wf.jobs.kane.steps;
  const first = steps.find((s) => String(s.uses ?? "").startsWith("actions/checkout"));
  assert.equal(first.with.ref, "${{ github.event.repository.default_branch }}");
  assert.equal(first.with.path, undefined, "the action and policy come from the workspace root");
  const pr = steps.filter((s) => String(s.uses ?? "").startsWith("actions/checkout"))[1];
  assert.equal(pr.with.path, "pr");
});
