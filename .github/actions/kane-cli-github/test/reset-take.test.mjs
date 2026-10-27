import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, chmodSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const script = join(import.meta.dirname, "..", "..", "..", "..", "reset-take.sh");

function fakeGh() {
  const dir = mkdtempSync(join(tmpdir(), "fake-gh-"));
  writeFileSync(join(dir, "gh"), `#!/bin/bash\necho "$*" >> "${dir}/calls"\nif [ "$1 $2" = "pr list" ]; then echo '[{"number":3,"headRefName":"feat/gift-wrap"},{"number":4,"headRefName":"feat/promo"},{"number":5,"headRefName":"docs/typo"},{"number":7,"headRefName":"fix/issue-1-gift-wrap"},{"number":6,"headRefName":"feat/keep-me"}]'; fi\n`);
  chmodSync(join(dir, "gh"), 0o755);
  return dir;
}

test("reset-take.sh closes open feat/* and fix/* PRs (except --keep) with their branches, and says what it did", () => {
  const dir = fakeGh();
  const out = execFileSync("bash", [script, "siddhant573/kane-pr-chat-test", "--keep", "6"], { env: { ...process.env, PATH: `${dir}:${process.env.PATH}` }, encoding: "utf8" });
  const calls = readFileSync(join(dir, "calls"), "utf8").trim().split("\n");
  assert.deepEqual(calls.filter((c) => c.startsWith("pr close")), [
    "pr close 3 -R siddhant573/kane-pr-chat-test --delete-branch",
    "pr close 4 -R siddhant573/kane-pr-chat-test --delete-branch",
    "pr close 7 -R siddhant573/kane-pr-chat-test --delete-branch",
  ]);
  assert.match(out, /closed #3 \(feat\/gift-wrap\) and deleted its branch/);
  assert.match(out, /kept #6 \(feat\/keep-me\)/);
  assert.doesNotMatch(out, /#5/);
  assert.match(out, /Tests designed in this take stay in the project; later PRs don't show them \(no file in the repo\)\./);
  assert.doesNotMatch(out, /TODO/);
});

test("reset-take.sh without a repo prints its usage and exits 2", () => {
  let code = 0;
  try {
    execFileSync("bash", [script], { encoding: "utf8", stdio: "pipe" });
  } catch (e) {
    code = e.status;
    assert.match(e.stderr, /usage: \.\/reset-take\.sh <owner\/repo> \[--keep N\]/);
  }
  assert.equal(code, 2);
});
