# Test Case style reference (English) — "gold example"

> Style standard for English test cases. Match the title format, Pre-condition, Step, Expected Result, and object-naming shown below.
> Shared writing rules (no bare codes, terminology, self-check gate) live in `.claude/rules/qc-writting-rules.md`. This file only illustrates.

## Quick principles (read before writing)

1. **Title = `Verification verb + subject/function/flow + STATE + context (if any)`.** The **state** part is almost always mandatory — dropping it is the most common defect.
2. **Object name = the element name from the audited report's §4 inventory** (reader-friendly, in double quotes, labels verbatim). Do NOT use screen codes (`SCR-...`) or a bare zone label (`Zone A`); if a zone matters, pair it with plain words: `default state (Zone A)`.
3. **Step verb = canonical EN** from the kit table `.claude/config/action-verbs.md` (Enter, Click, Select, Verify visible, Blur...). Aliases (type, tap, press) are recognition-only — never written.
4. **Expected Result** starts with the **step number**, describes the **observable changed state**, and quotes the **exact message text** when any. Self-contained: never reference another TC (`same as TC_033`); never embed codes (`CRULE-/AC-/BR-/SCR-`) in TC content. Pre-conditions: one condition per line (`<br>`). Priority P1–P5 by business impact × frequency (keyboard/zoom/refresh/static-UI cases → P4–P5).

## Examples (forgot-password flow)

| TC ID | Title | Pre-conditions | Test Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC_001 | Verify the forgot-password page initial state on first open | The Org Portal login page is open<br>Browser storage has no saved language | 1. Click `"Forgot password?"` on the login page.<br>2. Verify the forgot-password page in its default state (Zone A). | 2. The forgot-password page shows its default state:<br>- `"Email input field"` is empty, editable, with a red required asterisk after the label.<br>- `"Primary button — Send reset link"` is shown and **disabled**.<br>- No inline error is shown.<br>- `"Language switcher — VN/EN"` defaults to `"VN"`. | P1 |
| TC_073 | Verify successful password reset via a valid link | The set-new-password page is open from a still-valid link<br>The new password meets all rules | 1. Enter a valid password into `"New password field"`.<br>2. Enter the same value into `"Confirm new password field"`.<br>3. Click `"Primary button — Save password"`. | 3. The system saves the new password, invalidates the used link, writes the audit log, then redirects to the login page with the toast `"Your password has been updated."` | P1 |
