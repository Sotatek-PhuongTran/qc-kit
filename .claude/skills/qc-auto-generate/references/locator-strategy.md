# Locator Strategy

> Title: Auto-generate Locator Strategy | Created: 2026-07-02 | Updated: 2026-07-03 (crawl-findings loop) | Version: v2

Goal: every UI element gets **one stable primary locator** + **at least one alternative of a different type**, written in Playwright syntax so the test-script generator can use them directly.

## 1. Preference order (choosing the primary locator)

Try in order; take the highest-priority type that **resolves to exactly one element**:

| Priority | Type | Playwright syntax | When to use |
|---|---|---|---|
| 1 | role + name (accessibility) | `getByRole('button', { name: 'Gửi liên kết đặt lại' })` | Has an ARIA role + a clear accessible name. Most stable. |
| 1 | label (for input fields) | `getByLabel('Email')` | Input/textarea bound to a `<label>`. |
| 2 | test id | `getByTestId('reset-submit')` | Has `data-testid` (or the project's testid attribute). Very stable. |
| 3 | text | `getByText('Vui lòng nhập email.')` | Static message/label with no role/testid. **Changes with language** — see §4. |
| 4 | stable css | `locator('#email')`, `locator('input[name="email"]')` | Has a stable `id` / `name`. Avoid style-driven classes. |
| 5 | xpath (last resort) | `locator('xpath=...')` | Only when nothing else works; brittle. |

## 2. Multi-locator rule

- **Require ≥2 locators** per element: 1 primary (highest priority that resolves) + ≥1 alternative of a **different type** (e.g. primary = role, alternative = css `#id`).
- The primary **must be unique** (resolves to exactly 1). If it matches several, narrow by a parent scope (`getByRole('dialog').getByRole('button', {...})`) or use `.nth()` only as a last resort (note the risk).
- Never invent a locator. If none can be found after driving the element's reachable states (§5), record the element in the page's **crawl-findings** file (`mapping-rules.md` §0) and CONTINUE the session — a missing element never stops the crawl; the user replies inline and the next run re-crawls guided by the answer.

## 3. Stability tiers

| Tier | Locator type | Meaning |
|---|---|---|
| **Cao** (High) | role + name, label, testid | Resilient to style/layout/language changes (role/testid). |
| **Trung bình** (Medium) | text, css by `id`/`name` | Stable, but text changes with language; id/name may change on refactor. |
| **Thấp** (Low) | css by style class / position, xpath | Brittle. Every `Thấp` row → recommend the dev add a `data-testid` (record in the report). |

## 4. Language & environment (why NOT to fork the catalog per env/browser)

- **Browser:** locators query the DOM → identical across Chrome/Firefox/Edge/Safari. Do not fork per browser.
- **Environment:** the same build produces the same DOM → locators identical across DEV/QA/UAT/PROD. They differ only when the UI language differs, the build version drifts, or a feature flag toggles UI.
- **Language (VN/EN):** `text`/`label` locators change. → **Prefer `role`+name or `testid`** to stay language-stable. If `text` is unavoidable, record the crawl language in the `Ghi chú` column and the `Language` frontmatter field.
- One catalog per page is enough. Build drift across environments is handled by Update mode (open that env's URL and re-verify).

## 5. Technical notes

- Wait for the SPA to finish rendering before resolving; prefer user-facing role/label locators over internal HTML structure.
- For elements hidden behind a state (`Visible when` ≠ always): drive the UI to that state before resolving (do not conclude missing before the state is triggered). States unreachable at crawl time (e.g. require a server fault) → record in crawl-findings with the state named, so the reader knows WHY it could not be verified.
- Do not embed test data / concrete values into a locator (a locator identifies the element, not the data).
