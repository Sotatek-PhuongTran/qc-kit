# Mapping Rules — Test case (md) → POM code

> Title: Auto-generate Mapping Rules | Created: 2026-07-02 | Updated: 2026-07-03 (feasibility ladder, triage) | Author: Claude (QC Kit v3 rebuild) | Version: v2

Input test cases use canonical action verbs (per the kit-level table `.claude/config/action-verbs.md`) + element names quoted from the audited report §4. Code is organised as a Page Object Model: locators live in page objects, reusable flows in flow helpers, specs orchestrate. No intermediate representation (IR) — specs are generated directly from the TC md.

## 0. Page object (FULL-page crawl from audited §4) — ONE crawl per page, cached

One page object per page: `portals/<portal>/pages/<page>.page.ts`. The page object represents the **whole page**, not one test's subset.

- Class extends `BasePage` (holds `page`, `goto(route)`).
- **Element inventory = ALL elements of the page listed in audited §4** — not just the ones the current TCs touch. One live-crawl session resolves the full inventory (driving the UI to each reachable state per `locator-strategy.md` §5), so later UCs touching the same page REUSE the page object with no re-crawl. Each element → a **locator getter** named from the element name (lowerCamelCase, deburred): `"Trường nhập email"` → `emailInput()`.
- The actual locator is resolved by **live crawl** of the page (`references/dom-channels.md` for channel choice, `references/locator-strategy.md` for preference order + stability tiers). Keep one alternative locator as a `//` comment; low-stability locators get `// TODO: low-stability — consider data-testid`.
- Add a few **action methods** for the page's common interactions (from recurring step patterns): `async requestReset(email) { await this.emailInput().fill(email); await this.submitButton().click(); }`.
- **Header stamp:** `// source: audited <filename v<N>> §4 | crawled: <date> <env URL>` — used for staleness.
- **Re-crawl only if**: the audited §4 changed for that page (newer audited version), a run reports locator failures, or a crawl-findings row was answered (below). Otherwise reuse — a page is crawled ONCE per audited version.

### Crawl-findings loop (element not found — never stop the session, never invent)

An element from §4 that cannot be resolved even after driving its reachable states does NOT stop the crawl: record it and continue with the rest. At the end of the session, write/update the page's findings file — logical name `crawl-findings` (resolve via `path-registry.md`): `crawl-findings/<portal>_<page>_crawl-findings.md`, a **LIVING doc** (no date, no version, edited in place — same pattern as `question-backlog`):

| # | Phần tử (audited §4) | UC | Trạng thái đã lái (bước cụ thể) | Đã tìm bằng | Trả lời của QC/dev | Trạng thái |

- `Trạng thái đã lái` must be concrete and self-contained (exact steps performed, which state the page was in) so the reader can reproduce without asking.
- The user replies **inline** in `Trả lời của QC/dev` (e.g. "phần tử nằm sau khi bấm X", "nhãn đã đổi thành Y", "tính năng chưa deploy — sprint 12", "bug — đã log <ref>") and sets `Trạng thái = Đã trả lời`.
- The **next run reads this file FIRST**: rows `Đã trả lời` → re-crawl guided by the answer → resolved: set `Đã giải quyết`, regenerate the page object, generate the deferred specs; answer = bug / not deployed: keep the TC's triage verdict `Cần điều kiện` with that exact reason.
- TCs referencing a still-pending element: their spec is **DEFERRED** (triage verdict `Cần điều kiện — chờ xác nhận phần tử "<tên>", xem file crawl-findings`); the UC's other specs are generated normally.

## 1. Verb mapping (canonical verb → Playwright primitive)

The verb → Playwright mapping is defined ONCE in the kit-level table `.claude/config/action-verbs.md` (columns: Canonical VI | Canonical EN | Alias | Playwright). Read that table at generation start. Test cases produced by `qc-func-tc-design` v3 already use canonical verbs, so the mapping is deterministic. Aliases found in OLDER TC files (bấm, gõ, điền / type, tap, press) resolve to the same canonical row. A verb not in the table → map by meaning, note it in the run report, and propose adding a row to `action-verbs.md`.

In a spec, a test step maps to a **page-object method** when one fits (`await forgot.requestReset(d.validEmail)`), else to a primitive on a getter (`await forgot.emailInput().fill(d.validEmail)`). Values always come from data variables — never hardcode.

## 2. Recurring step sequences → flow helpers

When the same multi-step sequence appears across TCs/screens (login as role X, request reset link, create record...), generate ONE flow function in `portals/<portal>/flows/<area>.flows.ts` and call it from specs. Stamp the source (UC + date); regenerate only stale/missing functions.

## 3. Expected Result → assertions (anchor on POSITIVE observable state)

Every assertion checks a **positive observable outcome**, never mere absence. Messages stay **verbatim**. By case type:

### 3.1 Validation / negative case — assert BOTH sides
1. **Error shown:** `await expect(p.emailInvalidError()).toHaveText('Email không hợp lệ.')`.
2. **Function NOT performed (guard the side-effect):** still on the same page (`toHaveURL(/forgot-password/)`), **no** success toast (`toHaveCount(0)`), field value preserved, no error/exception page. Catches "hiện msg nhưng vẫn submit / API lỗi mà function vẫn chạy".

### 3.2 Function-success case — assert BOTH
1. **Success UI signals:** message and/or screen transition.
2. **Post-condition:** verify the real effect — prefer a black-box UI re-check (đăng nhập bằng mật khẩu mới; bản ghi xuất hiện ở màn danh sách); when UI cannot show it, declare an explicit API-based verification step.

### 3.3 Display / init case
Assert each expected element is visible **with its content** (`toHaveText`/`toContainText`), plus an aria snapshot (§3.4).

### 3.4 Catch the "unexpected extra" (aria snapshot) — MANDATORY per important result state
`await expect(p.formRegion()).toMatchAriaSnapshot({ name: '<TC-ID>-<state>.aria.yml' });` — scoped to the affected region, not the whole page. Baselines created on first run (`--update-snapshots`) and reviewed by QC before commit. Mask volatile content.

### Assertion primitives
visible → `toBeVisible()`; exact message → `toHaveText('<verbatim>')`; substring (justified only) → `toContainText(...)`; state → `toBeDisabled()`/`toBeEnabled()`; count → `toHaveCount(n)`; navigation → `toHaveURL(<route>)`; structure → `toMatchAriaSnapshot(...)`. `not.*` allowed ONLY as a supplementary guard.

## 4. Precondition → setup (via the feasibility ladder)

UI-actionable on the screen under test ("trang X mở", "đăng nhập vai trò Y") → setup steps (`beforeEach`: `await forgot.open()`; `await login(page, account('<key>'))`).

Data-state preconditions ("tài khoản bị ngưng", "tổ chức tạm ngưng", "liên kết đã hết hạn") are **NOT automatically manual** — resolve them through the setup ladder in `references/automation-feasibility.md` §1, using only the channels the project actually has (detected from `project-config`):

- **L2 — UI of another feature/portal**: the state is creatable through any UI of the system (e.g. suspend the account via the Admin Portal) → generate a setup flow in `portals/<portal>/flows/setup.flows.ts`, call it from `beforeAll`/setup project; restore state in teardown.
- **L3 — API**: no UI path exists AND `project-config §2` documents the API with usable auth → seed via a `request`-context fixture.
- **L4 — DB**: no UI and no API endpoint, but DB access is configured → reviewed seed script under `scripts/db-seed/` (connection from `.env`).
- **L5 — manual**: no configured channel covers it → STILL generate the spec (only the precondition is manual); add a `manual` row to the data md `## Preconditions` (schema: `data-and-secrets.md` — key, required state, dependent TCs, pre-flight check); WARN the user in the run report. `qc-auto-run` gates the dependent tests on this declaration and reports them Blocked (not Failed) when the state is missing.

Every precondition — automated or manual — gets a `## Preconditions` row so the seed path stays traceable.

App-persisted browser state (e.g. remembered language) is reproduced via UI + same-context reopen / `storageState` — never classify it as "browser-specific" (see feasibility §1–§2).

## 5. Data variables

Every input value → `{variableName}` (lowerCamelCase, intent-based: `validEmail`, `blankEmail`). The example value in the test case becomes the **seed** in the data md. Variables are per-TC.

## 6. Spec structure (ONE spec per screen)

`tests/<portal>/<UC-ID>/<screen>.spec.ts`:
- `import` the screen's page object + needed flows + `loadTestData`.
- `test.describe('<screen name>')`; `test.beforeEach` for screen-common preconditions.
- One `test('<TC-ID> — <title>', { tag: '@P<priority>' }, ...)` per TC. **Title MUST start with the TC ID** — the key that maps run results back to test cases.
- Body: page-object methods + `expect` + `vars('<TC-ID>')`. Keep specs short — push locators/flows into the common layer.

## 7. Visual / design fidelity — separate concern
Pixel/design comparison is visual regression (`toHaveScreenshot()`), a separate spec type with its own baseline-approval workflow — NOT these functional specs.

## 8. URL handling
Set `use.baseURL` in `playwright.config.ts` (from `project-config §3`, non-prod, or `process.env.BASE_URL`). Multi-portal → Playwright `projects`, one `use.baseURL` each. Specs/page-objects use **relative routes only** (`goto('/forgot-password')`). Never concat baseURL manually. Absolute URLs only when they come from runtime data (e.g. a reset link from email).

## 9. Dynamic data (token, OTP, email link) — via FIXTURE, never a literal
System-generated values are obtained at runtime: `helpers/email.ts` (email-testing API) or a test/seed API. Shared non-secret values go in the data md `## Config`; secrets in `.env`. **NEVER emit a `<...>` placeholder in generated code** — unknown-at-generate-time = dynamic = fixture/config key.

## 10. Self-check before finishing
- [ ] No `goto` relies on a missing `use.baseURL`; no manual baseURL concat.
- [ ] No `<...>` placeholder in generated `.ts` (grep `<[a-zA-Z]`).
- [ ] Each assertion positive; validation cases also assert "func không chạy"; aria snapshot per result state.
- [ ] Test titles start with the TC ID.
- [ ] Triage report written (`references/automation-feasibility.md` §6): one row per TC, no grouped reasons; every non-automated TC names a covering TC or an explicit unblock condition.
