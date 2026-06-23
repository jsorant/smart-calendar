---
name: tdd
description: Implement a feature with the project's e2e-first TDD workflow — one Cypress test at a time, each red for the right reason before implementing, never adding a new test until back to green. Starts from an up-to-date main, works on a feature branch, then conventional-commits, pushes, and opens a PR. Use when the user says "/tdd <feature>", "implement <feature> in TDD", "develop <feature> test-first", or similar.
---

# TDD e2e workflow

Implement the feature the user describes using the project's mandatory e2e-first TDD
loop. The feature description is whatever the user passed after `/tdd` (ask for it if
empty). Follow the steps below **in order** — do not skip the red-test verification.

This skill operationalises the rules in `CLAUDE.md` ("Workflow de développement — TDD
e2e d'abord", "Mobile first", "Conventions de code/test/commit"). When in doubt, defer
to `CLAUDE.md`.

## 1. Start from an up-to-date main on a fresh feature branch

Always branch from the latest `main` so the feature starts clean:

```bash
git checkout main
git pull origin main
git checkout -b <type>/<short-feature-slug>   # e.g. feat/month-navigation
```

- Pick the branch `<type>` to match the eventual commit type (`feat`, `fix`, …) and a
  concise English kebab-case slug.
- If the working tree is dirty, stop and ask the user how to proceed — never branch on
  top of unrelated uncommitted changes.

## 2. Plan the tests, then drive them one at a time

Break the feature into the **smallest meaningful e2e behaviours**. Then run the loop
below **for a single test at a time**. Never add a second test while another is red.

For each behaviour, repeat:

### 2a. Write exactly one new Cypress e2e test

- Specs live in `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`.
- Use a **mobile viewport** (`cy.viewport(390, 844)` or `cy.viewport('iphone-x')`),
  per the mobile-first rule.
- Query elements **by role** with `@testing-library/cypress`
  (`cy.findByRole(...)`), not CSS/`data-*` selectors.
- **Avoid regex** in assertions — prefer exact strings, `contain.text`, `contains`,
  `deep.equal`, etc.
- Describe the test in **English** (`describe`/`it`).
- Add only this one test; leave the rest of the plan for later iterations.

### 2b. Run it and confirm it is RED for the right reason

```bash
npm run test:e2e            # or: npx cypress run --spec <path> with the dev server up
```

- The test **must fail**, and the failure must be about the **missing behaviour**
  (expected element/text not present yet) — **not** an unrelated error (typo, invalid
  selector, app crash, wrong URL, server not running).
- **Read the failure message** to confirm the cause. If it is red for the wrong reason,
  fix the test (or the harness) and re-run until it fails for the right reason.
- ⚠️ If the test passes immediately (green), it is not driving any new behaviour.
  Rework it into a genuinely red test before implementing — e.g. assert on something the
  current code does not yet do. (For example: a static page may already satisfy a naive
  assertion; pick an input/variant that the current code provably gets wrong.)

### 2c. Implement the minimum to make it pass

- Write the smallest change that turns the test green.
- Follow the code conventions: **everything in English** (identifiers, CSS classes,
  user-visible text, `aria-label`s), **self-explanatory code, no comments** unless a
  non-obvious *why* is needed. Style **mobile-first** (small screens first, widen with
  `min-width` media queries).

### 2d. Re-run and confirm GREEN

- Run the whole suite (`npm run test:e2e`), not just the new spec, to catch regressions.
- Only once **all** tests are green may you go back to **2a** for the next behaviour.

Keep looping until every planned behaviour is implemented and the full suite is green.

## 3. Commit, push, and open a PR

Once the feature is complete and the suite is green:

```bash
git add -A
git commit -m "<type>(<scope>): <imperative lowercase description>"
```

- **Conventional Commits**, English, imperative present, lowercase description
  (e.g. `feat(calendar): add previous/next month navigation`).
- End the commit message body with the required trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

Then push and open the PR. This repo needs the personal `jsorant` GitHub account for
push/PR rights; always restore the work account afterwards:

```bash
gh auth switch --user jsorant
git push -u origin <branch>
gh pr create --base main --head <branch> \
  --title "<same as commit subject>" \
  --body "<what / how / tests summary>"
gh auth switch --user jeremysorant-agicap
```

- Create the PR **ready for review** (no `--draft`).
- End the PR body with:
  `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- Report the PR URL back to the user.

## Hard rules (never violate)

1. Never write feature code before a **red** e2e test that justifies it.
2. A red test must fail **for the right reason** — verify by reading the failure.
3. **One test at a time.** Do not add a new test until the suite is **green**.
4. Always branch from an **up-to-date main**.
5. Finish with a conventional commit, a push (via the `jsorant` account), and a PR.
