---
title: UC Readiness Review — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-uc-read (chris.le3@basao.com)
version: v2
source-uc: docs/BA/UC-VOB-001/UC-VOB-001.md (revision 2026-04-13)
source-design: docs/BA/UC-VOB-001/image copy.png
common-context: docs/BA/common/project-context_20260505_v1.md
backlog-resolved: UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v1.md (Q1–Q12 all answered)
backlog-current: UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v2.md
supersedes: UC-VOB-001_submit-vendor-registration_audited_20260507_v1.md
---

# UC Readiness Review
**Functional / Black-box Test Readiness Template**

---

## Feature Brief

**UC-VOB-001 "Submit Vendor Registration"** is Step 1 of a 3-step vendor registration wizard for the Multivendor eCommerce platform (BP-001 Vendor Onboarding & Verification). The page `/register/vendor` is **publicly accessible** (no authentication required) and lets a Prospective Vendor (Individual or Business) enter basic identity information: Vendor Type, First Name, Last Name, Email Address, Phone Number, Store Name, Store Description (optional), and Company Name (Business only).

When the vendor clicks **"Proceed to Next Step >"**, the system performs inline client-side validation on every required field. If validation passes, Step 1 data is persisted to the session/draft and the wizard advances to Step 2 (UC-VOB-002 Upload Documents). The vendor's choice of `Individual` / `Business` drives the mandatory KYC document set used downstream. Email verification is deferred to UC-VOB-004 (final submit) — resolved in QA-021. The actual `Vendor` record in `Pending` state is created at UC-VOB-004 after the vendor completes all three steps.

**Verbatim business rules (from `requirement-traceability.md`):**
- **[BR-023]** "Submit vendor registration form with personal or business details" (§3.1).
- **[RULE-002]** "Vendor must accept the latest vendor agreement before registration is complete" (§3.1) — *enforced at Step 3, not Step 1*.
- **[RULE-070]** "Registration wizard session must time out after inactivity; recommended inactivity window is 30–60 minutes; vendor must be notified before/at timeout" — *cross-step; applies across the wizard*.
- **[RULE-071]** "Frontend validates registration step-by-step; the final backend submission must validate all steps simultaneously and aggregate all errors across all steps in a single response to prevent multiple round-trips."

**Resolved gaps from v1 audit (BA answers in `..._question-backlog_..._v1.md`):**
- Vendor Type = Radio Button Group (Q1 confirmed; underlying control = radio even though current design rendering shows tab/text-link style — design update tracked as new Q13).
- Company Name value is **retained**, not cleared, when the vendor switches Business → Individual (Q2).
- BA approved the 22 AC derived in v1 audit Section 8 as baseline (Q3) → integrated into Section 8 below.
- BA delegated NFR specification to qc-uc-read (Q4) → reasonable industry-standard defaults proposed in Section 9 below; BA approval pending (new Q14).
- Server-side uniqueness check (Email + Store Name) applies to all vendor states **except `Rejected`** (Q5).
- **No** server-side uniqueness check on Phone Number (Q6).
- Wizard session timeout: **no countdown notification**; on timeout, vendor is redirected to the landing page and all draft data is cleared (Q7) — overrides the "must be notified before/at timeout" sub-clause of RULE-070 in this implementation.
- Click "Help" opens a new tab → draft data retained on the original tab. Click "Login" navigates away in the same tab → draft data lost; **no confirmation dialog per BA** (Q8) — BA decision confirmed.
- Logo, Page Title, and Character Counter "0/500" have no dedicated design yet (Q9 deferred — new Q15).
- Step 1 indicator "completed" state = **green checkmark** (Q10 cross-referenced from UC-VOB-002 §2 SC-02A element #1: *"Step 1 'Basic Details' shows a green checkmark indicating completion"*).
- Email validation precedence: **client-side format check first; server-side duplicate check only after format passes** (Q11 — short-circuit).
- "Out of Scope" section will not be added to the UC source (Q12 — BA chose to skip).

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `87.7 / 100` | ⚠️ CONDITIONALLY READY |

> Up from `70.0 / 100` in v1 (+17.7 points). QA can begin test design across all clear areas (validation, happy path, error messages verbatim, duplicate checks, Vendor Type switch, session timeout). Three remaining gaps (Q13 design rendering update for Vendor Type radio, Q14 NFR formal approval, Q15 missing design for Logo/Page Title/Char counter) are tracked in question-backlog v2 and can be resolved in parallel with test scenario design.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC-VOB-001 | Submit Vendor Registration | UC source v1 (revision 2026-04-13); audit v2 | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| BA team (Multivendor project) | *(not recorded in source UC)* | 2026-04-13 (UC); 2026-05-07 (audit v2) | 2026-04-13 |

---

## 1. Objective & Scope

### 1.1 Objective ✅

Allow a **prospective vendor** (Individual or Business) to submit basic identity information and select a vendor type to begin the onboarding flow, enabling subsequent KYC document upload (UC-VOB-002) and vendor agreement acceptance (UC-VOB-003). This UC is the single entry point for BP-001 Vendor Onboarding.

> Source: User-story in Section 1 — *"As a prospective vendor (Individual or Business), I want to fill in my basic registration details and select my vendor type, so that I can begin the onboarding process and proceed to document upload."*

### 1.2 In Scope ✅

- Render Step 1 "Basic Details" form with the 3-step progress wizard (Step 1 active, Steps 2/3 disabled).
- Vendor Type selection (default Individual / Business).
- Collect 7 fields: First Name, Last Name, Company Name (Business only), Email Address, Phone Number, Store Name, Store Description.
- Inline client-side validation of all required fields on "Proceed to Next Step" click.
- Server-side duplicate check for Email Address and Store Name (error: `"{Field Name} already exists"` — COMMON-029); scope **excludes Rejected vendors** (Q5).
- Anti-double-submit: button disabled after first click (COMMON-015); loading spinner for async > 300ms (COMMON-012).
- Persist Step 1 data to session/draft → advance wizard to Step 2 (UC-VOB-002).
- Vendor Type switch retains First/Last Name and Company Name (Q2); shows/hides Company Name; updates the required document set for Step 2.

### 1.3 Out of Scope ⚡

> Source UC has no explicit "Out of Scope" section (BA chose to skip — Q12). The list below is inferred from cross-references in UC §4 and `usecase-list.md` BP-001 sequencing — **for tester reference only; not authoritative**.

- Email OTP / link verification (deferred to UC-VOB-004 — QA-021).
- Vendor agreement acceptance (UC-VOB-003).
- Password / account credentials creation (PCTX-2: location in flow still unspecified at project level).
- Document upload (UC-VOB-002).
- Vendor record creation in `Pending` state (UC-VOB-004).
- Backend aggregated validation across all 3 steps (RULE-071, owned by UC-VOB-004).
- Phone Number uniqueness check (Q6 — explicitly NOT enforced).

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| **Prospective Vendor (Individual)** | Primary (anonymous, public) | Can access `/register/vendor` without login; fill the Step 1 form; choose Vendor Type = Individual; submit to advance to Step 2. |
| **Prospective Vendor (Business)** | Primary (anonymous, public) | Same as Individual but must additionally fill the Company Name field (required). Vendor Type = Business activates the expanded KYC document set on Step 2 (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). |
| **System** | System actor | Performs client-side validation, server-side duplicate check (Email, Store Name) excluding Rejected vendors, persists session/draft, advances the wizard. Enforces RULE-070 session timeout (30 min). |
| **Admin** | Downstream (out of scope at this UC) | Reviews/approves/rejects the vendor after the vendor completes all three steps (UC-VOB-006, BR-026). |

**Note:** No RBAC concept applies at this step because the user is anonymous. Behavior when a logged-in user (e.g., an existing vendor or admin) navigates to `/register/vendor` is **not specified by source UC** — testers should confirm with BA before designing test scenarios for that case (open in new Q17 if needed; not raised by current backlog).

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions ✅

- **No authentication required.** The page `/register/vendor` is publicly accessible.
- No dependency on any other UC (this UC is the entry point of BP-001).

### 3.2 Postconditions ✅

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| **Step 1 validation succeeds** (click "Proceed to Next Step" with valid data) | (1) All 7 (or 8 if Business) field values are persisted to session/draft state. (2) Wizard advances active step to Step 2 (UC-VOB-002 Upload Documents). (3) Step 1 indicator transitions to **green checkmark / completed state** (per UC-VOB-002 §2 SC-02A #1). (4) Submit button is disabled after first successful click to prevent double-submission (COMMON-015). |
| **Step 1 validation fails** | (1) Inline error messages appear directly below each offending field (COMMON-032). (2) Submit button reverts to enabled. (3) Vendor can correct fields and re-submit. |
| **Vendor Type switches between Individual ↔ Business** | (1) First Name and Last Name retain their values. (2) **Company Name retains its value** even when switching Business → Individual (Q2). (3) Company Name field is shown when Business, hidden when Individual. (4) The required KYC document set for Step 2 is updated to match the new Vendor Type. |
| **Wizard session times out** (30 minutes inactivity per RULE-070) | (1) **No countdown notification** is shown beforehand (Q7 — overrides RULE-070's "notify before/at timeout" sub-clause for this UC). (2) The vendor is **redirected to the landing page**. (3) All draft data is **cleared**; vendor must restart the wizard from scratch. |

---

## 4. UI Object Inventory & Mapping

> **Source-column legend:** `image copy.png` = primary UC design asset; `wireframes-vendor-onboarding.md §2.1` = wireframe text-art; `UC §2 #N` = row N of the UC spec's Section 2 element table.
> **Note:** This audit's Section 4 expands the UC §2 element table from 12 rows to 19 rows by splitting the wizard into 3 step indicators, splitting the Vendor Type radio group into label + 2 options, and adding rows for elements absent from the UC spec (Logo, Page Title, Character Counter). These three elements have no current design yet (Q9 — tracked as Q15 in v2 backlog) and are documented here based on `image copy.png` rendering only.

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Header / Top bar | *(no text label — icon + wordmark)* "MultiVendor Platform" | Brand / Logo (icon + wordmark) | N/A | — | — | N/A | Always visible top-left. **No dedicated UC §2 row** (Q9 — design pending, tracked as Q15 in v2 backlog). | `image copy.png`; *(missing in UC §2)* |
| 2 | Header / Top bar | "Help" | Navigation Link (with `?` icon) | N/A | — | — | N/A | Always visible top-right. Opens help/support page in **new tab** per UC §2 #11. Click does **not** affect form draft state (Q8 confirmed). | `image copy.png`; UC §2 #11 |
| 3 | Header / Top bar | "Login" | Navigation Link | N/A | — | — | N/A | Always visible top-right. Navigates **same tab** to vendor login page (UC §2 #12). **Click discards draft data with no confirmation dialog** (Q8 BA-confirmed). | `image copy.png`; UC §2 #12 |
| 4 | Body / Page heading | "Register as a Vendor" | Static Text / Heading (H1) | N/A | — | — | N/A | Page title, displayed above the wizard. **No dedicated UC §2 row** (Q9 — design pending). | `image copy.png`; *(missing in UC §2)* |
| 5 | Body / Step indicator | "1 Basic Details" | Wizard / Stepper item (active) | N/A | active | — | N/A | Filled black circle with `1`; label "Basic Details". **State = active** on initial load. After Step 1 validation passes, state transitions to **completed = green checkmark** (Q10, cross-ref UC-VOB-002 SC-02A #1). | `image copy.png`; UC §2 #1 (split) |
| 6 | Body / Step indicator | "2 Upload Documents" | Wizard / Stepper item (disabled) | N/A | disabled | — | N/A | Empty/grey circle with `2`; label "Upload Documents". **Not clickable** until Step 1 validation passes. | `image copy.png`; UC §2 #1 (split) |
| 7 | Body / Step indicator | "3 Agreement" | Wizard / Stepper item (disabled) | N/A | disabled | — | N/A | Empty/grey circle with `3`; label "Agreement". **Not clickable** until Step 2 validation passes. | `image copy.png`; UC §2 #1 (split) |
| 8 | Body / Form group | "Vendor Type" | Group label (for radio group) | N/A *(no asterisk)* | — | — | — | Section header for the radio group. UC notes "selection is inherently mandatory" because a default is always set. | `image copy.png`; UC §2 #2 |
| 9 | Body / Form group | "Individual" | Radio option (Q1 confirmed: control type = radio, even though `image copy.png` currently renders as text/tab style — design update tracked in Q13). | Yes (1 of 2 mandatory) | **selected** (default) | — | — | Default selection on page load. Selecting Individual hides Company Name. ⚠️ **Design rendering inconsistency** (tab-style vs radio circles) — see Q13 in v2 backlog. | `image copy.png`; UC §2 #2 |
| 10 | Body / Form group | "Business" | Radio option (same control type as #9). | Yes (1 of 2 mandatory) | unselected | — | — | Selecting Business reveals Company Name (#13) and updates the required KYC document set on Step 2. | `image copy.png`; UC §2 #2 |
| 11 | Body / Form > Row 1 col 1 | "First Name *" | Text Input (single-line) | Yes | (empty) | `Enter first name` | N/A | Max 100 chars [COMMON-007: *"Name fields must not exceed 100 characters"*]; input blocked at limit [COMMON-009: *"Input fields must prevent further input when maximum character length is reached"*]. Required: error `"First Name is required"` [COMMON-025]. Allows hyphens, apostrophes (no numeric-only restriction). aria-labelledby [COMMON-048]. | `image copy.png`; UC §2 #3 |
| 12 | Body / Form > Row 1 col 2 | "Last Name *" | Text Input (single-line) | Yes | (empty) | `Enter last name` | N/A | Max 100 chars [COMMON-007]. Required: error `"Last Name is required"` [COMMON-025]. Same row as First Name (two-column desktop layout). | `image copy.png`; UC §2 #4 |
| 13 | Body / Form > Conditional row (Business only) | "Company Name *" | Text Input (single-line) | Yes (when Vendor Type = Business) | (empty) | `Enter company name` | N/A | **Visible only when Vendor Type = Business**, hidden when Individual. Full-width. Max 255 chars [COMMON-001]. Required: error `"Company Name is required"` [COMMON-025]. Acts as the primary business identifier (QA-022). **Value retained when switching Business → Individual** (Q2). Not visible in current `image copy.png` because default Vendor Type = Individual. | UC §2 #5; *(conditional — not visible in current image)* |
| 14 | Body / Form > Row 2 col 1 | "Email Address *" | Text Input (email) | Yes | (empty) | `Enter email address` | N/A | RFC 5322 [COMMON-019], max 255 chars [COMMON-001]. Errors (in evaluation order — Q11): (1) `"Email Address is required"` [COMMON-025]; (2) `"Please enter a valid email"` [COMMON-026]; (3) `"Email Address already exists"` [COMMON-029, server-side, scope = all states except Rejected — Q5]. Email verification (OTP/link) is **NOT performed at this step** — deferred to UC-VOB-004 (QA-021). | `image copy.png`; UC §2 #6 |
| 15 | Body / Form > Row 2 col 2 | "Phone Number *" | Text Input (tel) | Yes | (empty) | `Enter phone number` | N/A | E.164 international format with country code [COMMON-020] (e.g., `+94771234567`). Numeric-only enforced on keypress [COMMON-004]. Max 255 chars [COMMON-001]. Errors: `"Phone Number is required"` [COMMON-025] / `"Please enter a valid phone number"` [COMMON-026]. **No uniqueness check** on Phone Number (Q6). | `image copy.png`; UC §2 #7 |
| 16 | Body / Form > Row 3 (full-width) | "Store Name *" | Text Input (single-line) | Yes | (empty) | `Enter store name` | N/A | Max 255 chars [COMMON-001]. Errors: `"Store Name is required"` [COMMON-025] / `"Store Name already exists"` [COMMON-029, server-side, scope = all states except Rejected — Q5]. Full-width spanning both columns. | `image copy.png`; UC §2 #8 |
| 17 | Body / Form > Row 4 (full-width) | "Store Description" | Text Area (multi-line) | **No** *(no asterisk)* | (empty) | `Describe your store (Max 500 chars)` | N/A | Max 500 chars [COMMON-008: *"Description fields must not exceed 500 characters"*], input blocked at limit [COMMON-009]. Optional — no required error. aria-label [COMMON-048]. | `image copy.png`; UC §2 #9 |
| 18 | Body / Form > Row 4 corner | "0/500" | Static Text / Character counter | N/A | "0/500" | — | N/A | Displayed at the bottom-right corner of the Store Description textarea. Updates in real-time as the vendor types. **No dedicated UC §2 row** (Q9 — design pending). Color-state behavior near the limit (e.g., turn red at 480-500) is unspecified. | `image copy.png`; *(folded into UC §2 #9)* |
| 19 | Body / Form > CTA | "Proceed to Next Step >" | Button (Primary CTA) | N/A | enabled | — | N/A | Right-aligned at the bottom. On click: client-side validation → if pass, save session and navigate to Step 2; if fail, inline errors + button stays enabled. **Disabled after first successful click** to prevent double-submission [COMMON-015]. **Loading spinner** if async (duplicate check) > 300 ms [COMMON-012]. | `image copy.png`; UC §2 #10 |

> **Coverage check:** 19 rows in Section 4 vs. ~25 visible atomic elements in `image copy.png` (counting each step indicator separately, each radio option separately, the character counter separately, logo separately, page title separately). Connector lines and the absence-of-asterisk styling on Vendor Type are pure styling and do not need rows. **Coverage ≈ 80%, no granularity-rule violation remaining.**

---

## 5. Object Attributes & Behavior Definition

> **1-to-1 mapping rule:** Every Section 4 row has a corresponding Section 5 row.

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| #1 Logo "MultiVendor Platform" | Always Enabled (no special behavior) | Click *(behavior unspecified — assumption: navigate to landing page; design pending Q9/Q15)* | Static brand identity. No state changes based on form. |
| #2 "Help" link | Always Enabled | Click → opens help page **in a new tab** | Form draft state remains intact on the original tab (Q8). |
| #3 "Login" link | Always Enabled | Click → navigates **same tab** to vendor login page | **Draft data is lost** with no confirmation dialog (Q8 BA-confirmed). Tester must verify the warning is intentionally absent. |
| #4 Page title "Register as a Vendor" | Always Enabled (static) | N/A (static) | Static heading. |
| #5 Step "1 Basic Details" | **Active** on load | Not clickable on itself (current step). | After Step 1 validation passes → state transitions to **Completed (green checkmark)** when wizard advances to Step 2 (cross-ref UC-VOB-002 SC-02A #1). |
| #6 Step "2 Upload Documents" | **Disabled / Greyed** initially | **Not clickable** until Step 1 success. | After Step 1 success → transitions to **Active** (filled black circle); Step 1 simultaneously transitions to Completed. |
| #7 Step "3 Agreement" | **Disabled / Greyed** | **Not clickable** until Step 2 success. | Same pattern as #6, downstream of Step 2. |
| #8 "Vendor Type" group label | Always Enabled (static) | N/A | Static label. |
| #9 "Individual" radio option | **Selected** (default on page load) | Click → set Vendor Type = Individual → hide Company Name (#13) → update Step 2 KYC required set to (NIC/Passport, Bank Proof). | Selection is retained when navigating back from Step 2. ⚠️ Design renders as text/tab style — see Q13. |
| #10 "Business" radio option | Unselected (default) | Click → set Vendor Type = Business → **reveal Company Name** (#13) → update Step 2 KYC required to (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). | First Name, Last Name, **and Company Name** are all retained when switching back and forth between Individual ↔ Business (Q2). |
| #11 First Name input | Enabled, empty default | Type → input accepted; > 100 chars → input blocked [COMMON-009]. Click "Proceed" with empty value → inline error `"First Name is required"`. | Real-time char limit; error shows only after "Proceed" click (no on-blur validation in spec). |
| #12 Last Name input | Enabled, empty default | Same as #11; max 100 chars; error `"Last Name is required"`. | Same as #11. |
| #13 Company Name input | **Hidden** when Vendor Type = Individual; **Visible + Enabled + Required** when Business. | Type → input accepted; max 255 chars [COMMON-001]; > 255 → blocked. Click "Proceed" with Business + empty → error `"Company Name is required"`. | **Value persists across Vendor Type switches** (Q2): switching Business → Individual hides the field but keeps the value in state; switching back to Business re-displays the field with the previous value. |
| #14 Email Address input | Enabled, empty default | Type → input accepted; max 255 chars; > 255 → blocked. Click "Proceed": (1) required check, (2) RFC 5322 format check, (3) async server-side duplicate check (loading spinner > 300ms). | **Validation precedence (Q11):** required → format → uniqueness; **short-circuit** (no server call if format invalid). Server check excludes vendors in `Rejected` state (Q5). |
| #15 Phone Number input | Enabled, empty default | Type → numeric-only enforced on keypress [COMMON-004], non-numeric rejected. Max 255 chars. Click "Proceed": required + E.164 format check. | **No server-side uniqueness check** (Q6). |
| #16 Store Name input | Enabled, empty default | Type → input accepted; max 255 chars. Click "Proceed": required + async duplicate check. | Same 3-tier validation pattern as Email. Server check excludes `Rejected` vendors (Q5). |
| #17 Store Description textarea | Enabled, empty default | Type → input accepted; max 500 chars; > 500 → blocked. Optional — no required error. | Character counter (#18) updates in real-time, synchronized with text length. |
| #18 Character counter "0/500" | Enabled, default "0/500" | N/A (read-only) | Real-time update tied to #17 text length. Color-state near the limit (e.g., red at 480-500) is **unspecified** — pending Q9/Q15 design. |
| #19 "Proceed to Next Step >" button | Enabled (default) | Hover *(behavior unspecified)*. Click → trigger client-side validation across the whole form. | (1) Validation pass → save session, navigate to Step 2, button **disabled** after first click to prevent double-submit. (2) Validation fail → button **reverts to enabled** after inline errors are shown. (3) Async duplicate check > 300ms → spinner shown on/near the button [COMMON-012]. |

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Submit Step 1 Basic Details (Happy Path + Validation Failure)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | Vendor | Open `/register/vendor` | Render Step 1 wizard active; default Vendor Type = Individual; Steps 2/3 disabled. | N/A | N/A |
| 2 | Vendor | (Optional) Click "Business" radio | Reveal Company Name field; update KYC required set on Step 2 (downstream). | Vendor keeps Individual → flow continues without showing Company Name. | N/A |
| 3 | Vendor | Fill First Name, Last Name, Email Address, Phone Number, Store Name (and Company Name if Business) + Store Description (optional). | Each character accepted; max-length blocked at limit [COMMON-009]; numeric-only for Phone [COMMON-004]; character counter updates real-time for Store Description. | N/A | When user pastes/types past max-length → input rejected at keypress. |
| 4 | Vendor | Click **"Proceed to Next Step >"** | (1) Client-side validate required + format. (2) Async duplicate check Email + Store Name, scope = all states except `Rejected` (Q5), spinner if > 300ms. (3) Save Step 1 data to session/draft. (4) Step 1 indicator → Completed (green checkmark). (5) Wizard navigates to Step 2 (UC-VOB-002). (6) Button disabled after first click [COMMON-015]. | N/A | **[Empty required field]** Inline error `"{Field Name} is required"` below the field [COMMON-025, COMMON-032]; button reverts enabled. **[Invalid format — Q11 short-circuit, no server call]** Email: `"Please enter a valid email"`. Phone: `"Please enter a valid phone number"`. **[Duplicate after format passes]** `"Email Address already exists"` / `"Store Name already exists"` [COMMON-029]. **[Server error]** Fallback `"Something went wrong. Please try again later."` [COMMON-030] *(implicit COMMON rule, not explicitly stated in UC)*. |
| 5 | Vendor | (Optional) Switch Vendor Type mid-flow | First/Last Name **and Company Name** all retained (Q2). Company Name shown/hidden. KYC required set updated for Step 2. | N/A | N/A |
| 6 | Vendor | (Optional) Inactive 30 minutes | **[Session timeout — Q7]** No countdown notification. Vendor is redirected to landing page. All draft data is cleared. Vendor must restart the wizard. | N/A | N/A |

**B. Business Rules & Validations** *(verbatim from `common-rules.md` and UC §3 Validation Summary)*

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(verbatim)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Vendor Type | Yes (default selected) | Radio (1 of 2: Individual / Business) | — | N/A — always has a selection. |
| First Name | Yes | Free text (allows hyphens, apostrophes; no numeric-only restriction) | — / 100 chars (COMMON-007) | `"First Name is required"` (COMMON-025) |
| Last Name | Yes | Free text | — / 100 chars (COMMON-007) | `"Last Name is required"` (COMMON-025) |
| Company Name | Yes (Business only); hidden when Individual; **value retained on switch** | Free text | — / 255 chars (COMMON-001) | `"Company Name is required"` (COMMON-025) |
| Email Address | Yes | RFC 5322 (COMMON-019); short-circuit FE-then-server (Q11); server scope = all except `Rejected` (Q5) | — / 255 chars (COMMON-001) | `"Email Address is required"` (COMMON-025) / `"Please enter a valid email"` (COMMON-026) / `"Email Address already exists"` (COMMON-029) |
| Phone Number | Yes | E.164 international with country code (COMMON-020); numeric-only on keypress (COMMON-004); **no uniqueness check** (Q6) | — / 255 chars (COMMON-001) | `"Phone Number is required"` (COMMON-025) / `"Please enter a valid phone number"` (COMMON-026) |
| Store Name | Yes | Free text; server uniqueness scope = all except `Rejected` (Q5) | — / 255 chars (COMMON-001) | `"Store Name is required"` (COMMON-025) / `"Store Name already exists"` (COMMON-029) |
| Store Description | **No** | Free text | — / 500 chars (COMMON-008) | — *(no validation error since optional)* |

**Common Reference Resolution applied:** All error codes referenced in the UC ([COMMON-025], [COMMON-026], [COMMON-029], [COMMON-030], [COMMON-032]) have been expanded with verbatim text from `common-rules.md`. Testers can use the "Error Message" column directly as the Expected Result.

**C. UI/UX Feedback**

- **Loading States:**
  - Async duplicate check (Email Address, Store Name) > 300ms: display **loading spinner** [COMMON-012]. UC does not specify spinner placement (on the button vs. next to the field) — assumption: on the "Proceed" button.
  - "Proceed" button is **disabled after first click** to prevent double-submission [COMMON-015].
- **Toast Messages:**
  - **Source UC does not describe any toast** at Step 1 (since Step 1 only advances to Step 2; final submission toast is in UC-VOB-004).
- **Error Codes / Inline Errors:**
  - All inline errors appear **directly below their associated field** [COMMON-032].
  - `"{Field Name} is required"` (COMMON-025) — required error.
  - `"Please enter a valid {field type}"` (COMMON-026) — format error.
  - `"{Field Name} already exists"` (COMMON-029) — uniqueness error.
  - `"Something went wrong. Please try again later."` (COMMON-030) — server error fallback (implicit; not explicit in UC).

### 6.2 Function: Vendor Type Switch (Sub-Function)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | Vendor | Some fields filled, clicks **"Business"** (currently Individual) | Reveal Company Name field. First/Last Name retained. Required Company Name flagged [COMMON-003]. KYC required set for Step 2 updated (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). | N/A | N/A |
| 2 | Vendor | Clicks **"Individual"** (currently Business, with Company Name filled) | Hide Company Name field. **Company Name value retained in state** (Q2). KYC required set for Step 2 reverts to (NIC/Passport, Bank Proof). | N/A | N/A |
| 3 | Vendor | Switches Individual → Business again | Re-display Company Name field with the previously entered value (still in state). | N/A | N/A |

**B. Business Rules & Validations:** Vendor Type switching does not trigger validation; only changes visibility + required-set. Company Name value persists across switches (Q2).

**C. UI/UX Feedback:** UC does not describe transition animation or timing for Company Name show/hide.

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis (Cross-function influence) | Data Consistency Verification |
|---------------------------|--------------------------------------------|-------------------------------|
| **"Proceed to Next Step" success on Step 1** | Advances to UC-VOB-002 (Upload Documents). All Step 1 data persisted to session/draft. Step 1 indicator transitions to green checkmark (cross-ref UC-VOB-002 SC-02A #1). | Verify: All 7 (or 8 if Business) fields entered on Step 1 are retained when navigating **Back from Step 2**; verify Vendor Type selection is retained on back-navigation (per UC-VOB-002 alt-flow `[Navigate Back to Step 1]`). |
| **Vendor Type = Business** | Step 2 (UC-VOB-002) requires expanded KYC document set: BR Cert, Form 1/20, TIN/VAT, NIC of Director, Bank Proof (per UC-VOB-002 SC-02B). Step 1 displays Company Name as required. | Verify: switching Vendor Type on Step 1 immediately updates the document slots on Step 2 when the wizard navigates there (no stale cache). |
| **Vendor Type = Individual** | Step 2 requires document set: NIC/Passport, Bank Proof (per UC-VOB-002 SC-02A). | Verify: document slots on Step 2 narrow accordingly. |
| **Email Address duplicate (server-side)** | Blocks advancement to Step 2; vendor must change email. **Scope: all vendor states except Rejected** (Q5) — vendors previously rejected can re-register with the same email. | Verify: previously-rejected vendor data does not block re-registration; verify Pending/Approved/Suspended/Draft state data correctly blocks. |
| **Store Name duplicate (server-side)** | Same as Email — blocks advancement. Same scope (all except Rejected — Q5). | Same verification as Email. |
| **Wizard session timeout — Q7** | After 30 minutes of inactivity: redirect to landing page; clear all draft data; no countdown notification. Cross-step impact: all Step 1 + Step 2 (UC-VOB-002) data lost. | Verify: timer resets on any user activity within the wizard (input, click, keypress). Verify cross-step: timeout during Step 2 also clears Step 1 data. ⚠️ Potential conflict with UC-VOB-002 alt-flow `[Session Timeout]` which says *"system notifies vendor before session expiry"* — Q7 BA answer overrides this. |
| **Frontend step-by-step validation vs. backend aggregated (RULE-071)** | UC-VOB-001 is responsible only for **frontend client-side validation** + server-side duplicate check at this step; backend aggregated validation across all 3 steps runs only at UC-VOB-004 (final submit). | Verify: Step 1 server-side errors (duplicate Email/Store Name) are shown inline at Step 1 and **NOT** aggregated until the final submit. |
| **Phone Number — no uniqueness (Q6)** | No cross-step impact; same Phone Number can appear on multiple vendor accounts. | Verify: vendor can register with a phone number already used by another vendor. |
| **Help link (new tab) — Q8** | No effect on draft state. | Verify: form data preserved on the original tab. |
| **Login link (same tab) — Q8** | Discards draft data with no confirmation dialog. | Verify: vendor returning to `/register/vendor` after Login click sees an empty form (no autofill from prior session). |

---

## 8. Acceptance Criteria

> **BA approved (Q3) the 22 AC derived in v1 audit Section 8 as the baseline for test case design.** AC list reproduced and refined below per resolved questions (Q2/Q5/Q6/Q7/Q8/Q11 specifically).

| AC # | Scenario | Given *(precondition)* | When *(user action)* | Then *(expected result)* |
|------|----------|------------------------|----------------------|--------------------------|
| **AC-01** | Happy Path Individual | Vendor opens `/register/vendor` for the first time (no session draft). | Vendor keeps Vendor Type = Individual (default), enters First Name "John", Last Name "Doe", Email "john@example.com" (unique), Phone "+94771234567", Store Name "Tech Hub" (unique), leaves Store Description empty, clicks "Proceed to Next Step". | Wizard advances to Step 2 "Upload Documents". Step 1 data ("John", "Doe", "john@example.com", "+94771234567", "Tech Hub", Vendor Type = Individual) persisted to session/draft. **Step 1 indicator transitions to green checkmark** (Q10); Step 2 indicator transitions to active (filled black). Button "Proceed" disabled during navigation. |
| **AC-02** | Happy Path Business | Same as AC-01 but vendor selects "Business". | Switch to Business → Company Name field appears. Fill Company Name "Tech Hub Ltd" + remaining fields per AC-01. Click "Proceed". | Same as AC-01 + Company Name "Tech Hub Ltd" persisted. KYC required set on Step 2 = expanded (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). |
| **AC-03** | Required field empty — First Name | Vendor opens page for first time. | Vendor leaves First Name empty, fills remaining valid, clicks "Proceed". | Inline error `"First Name is required"` directly below the First Name field [COMMON-025, COMMON-032]. Wizard does NOT advance. Button "Proceed" reverts enabled. |
| **AC-04** | Multiple required fields empty | Vendor opens page for first time. | Vendor leaves First Name, Last Name, Email, Phone, Store Name all empty, clicks "Proceed". | Inline errors for all 5 missing fields appear simultaneously, each below its field. Wizard does NOT advance. |
| **AC-05** | Email format invalid | Vendor opens page for first time. | Vendor enters Email = "abc@" (invalid RFC 5322), other fields valid, clicks "Proceed". | Inline error `"Please enter a valid email"` [COMMON-026] below Email field. **Server is NOT called** (Q11 short-circuit). Wizard does NOT advance. |
| **AC-06** | Phone format invalid | Vendor opens page for first time. | Vendor enters Phone = "12345" (no country code, not E.164), other fields valid, clicks "Proceed". | Inline error `"Please enter a valid phone number"` [COMMON-026] below Phone field. |
| **AC-07** | Phone numeric-only enforcement | Vendor focuses on Phone Number field. | Vendor types alphabet "abc" or special "@#". | Characters rejected **at keypress** [COMMON-004]; field stays empty or accepts only digits / leading `+`. |
| **AC-08** | Email duplicate — non-Rejected vendor (Q5) | Database has a vendor with Email "existing@example.com" in `Pending`, `Approved`, `Suspended`, or `Draft` state. | Vendor enters Email = "existing@example.com" + valid remaining fields, clicks "Proceed". | Loading spinner shown on button "Proceed" if check > 300ms [COMMON-012]. Then inline error `"Email Address already exists"` [COMMON-029] below Email field. Wizard does NOT advance. |
| **AC-08b** | Email re-use — previously Rejected vendor (Q5) | Database has a vendor with Email "rejected@example.com" in `Rejected` state. | Vendor enters Email = "rejected@example.com" + valid remaining fields, clicks "Proceed". | **No duplicate error.** Wizard advances to Step 2 normally (server uniqueness scope excludes `Rejected`). |
| **AC-09** | Store Name duplicate — non-Rejected vendor (Q5) | Database has a vendor with Store Name "Tech Hub" in any state except `Rejected`. | Vendor enters Store Name = "Tech Hub" + valid remaining fields, clicks "Proceed". | Inline error `"Store Name already exists"` [COMMON-029] below Store Name field. |
| **AC-09b** | Store Name re-use — previously Rejected vendor (Q5) | Database has a vendor with Store Name "Tech Hub" in `Rejected` state. | Vendor enters Store Name = "Tech Hub" + valid remaining fields, clicks "Proceed". | **No duplicate error.** Wizard advances. |
| **AC-09c** | Phone Number not unique (Q6) | Database has a vendor with Phone "+94771234567" in any state. | Vendor enters Phone = "+94771234567" + valid remaining fields, clicks "Proceed". | **No duplicate error.** Wizard advances normally (Phone has no uniqueness check). |
| **AC-10** | Business Vendor Type — Company Name empty | Vendor selects Business; First/Last Name, Email, Phone, Store Name valid; Company Name empty. | Click "Proceed". | Inline error `"Company Name is required"` [COMMON-025] below Company Name field. |
| **AC-11** | Vendor Type Switch retains Company Name (Q2) | Vendor selects Business, fills First Name "John", Last Name "Doe", Company Name "Tech Hub Ltd". | Vendor switches to Individual, then switches back to Business. | First Name "John", Last Name "Doe" retained. **Company Name "Tech Hub Ltd" still pre-filled** when re-displayed (Q2 — value persists in state across switches). |
| **AC-12** | Max-length input blocked — First Name | Vendor focuses on First Name. | Vendor pastes 150 characters. | Field accepts only the first 100 characters; the remaining 50 are rejected at input [COMMON-007, COMMON-009]. |
| **AC-13** | Max-length input blocked — Email | Vendor focuses on Email. | Vendor pastes 300 characters. | Field accepts only the first 255 characters [COMMON-001, COMMON-009]. |
| **AC-14** | Store Description optional | Vendor leaves Store Description empty + valid required fields. | Click "Proceed". | Wizard advances to Step 2 normally. No error below Store Description. |
| **AC-15** | Store Description char counter realtime | Vendor focuses on Store Description. | Vendor types 50 characters. | Counter shows "50/500" updating instantly. Deleting 1 character → "49/500". On hitting 500 → "500/500" and input is blocked [COMMON-008, COMMON-009]. |
| **AC-16** | Double-submit prevention | Vendor has filled valid form. | Vendor clicks "Proceed" twice in rapid succession during async duplicate check. | Second click ignored — button disabled after first click [COMMON-015]. Only one async request fires. |
| **AC-17** | Loading spinner for async > 300ms | Server duplicate check (Email/Store Name) takes > 300ms (e.g., slow network). | Vendor clicks "Proceed" with valid data. | Loading spinner shown on/near "Proceed" button while waiting [COMMON-012]. |
| **AC-18** | Step indicator clickability | Vendor on Step 1, has not yet validated. | Vendor attempts to click Step 2 or Step 3 indicator. | Click ignored — Steps 2/3 disabled until Step 1 success. |
| **AC-19** | Help link opens new tab — draft preserved (Q8) | Vendor on Step 1, has filled some fields. | Vendor clicks "Help". | Help page opens in **new tab**. Form draft on the original tab is **fully preserved** (including Vendor Type, all entered field values). |
| **AC-20** | Login link discards draft — no warning (Q8) | Vendor on Step 1, has filled some fields. | Vendor clicks "Login". | Login page opens in the **same tab** (replace navigation). **No confirmation dialog** is shown. If the vendor returns to `/register/vendor`, the form is empty (draft cleared). |
| **AC-21** | Wireframe label compliance | Vendor opens page for first time. | Render check. | All label text is **verbatim**: "Register as a Vendor", "Vendor Type", "Individual", "Business", "First Name *", "Last Name *", "Email Address *", "Phone Number *", "Store Name *", "Store Description", "Proceed to Next Step >". Asterisk in red on required fields [COMMON-003]. |
| **AC-22** | Accessibility — labels associated | Vendor uses screen reader. | Screen reader navigates each field. | Each input field reads its associated label correctly [COMMON-048]. Each inline error is linked to its field via `aria-describedby` [COMMON-051]. |
| **AC-23** | Email format invalid + duplicate combined (Q11) | Database has vendor with Email "duplicate@example.com" in non-Rejected state. | Vendor enters Email = "duplicate@" (format invalid, would also be a duplicate if format were corrected), clicks "Proceed". | **Only the format error** `"Please enter a valid email"` [COMMON-026] is shown — server uniqueness check is short-circuited (Q11 — not called when format invalid). |
| **AC-24** | Wizard session timeout (Q7) | Vendor has filled some fields and is idle for 30 minutes. | Vendor returns / clicks any control after the 30-minute mark. | **No countdown notification was shown beforehand.** Vendor is **redirected to the landing page**. All draft data is cleared. Vendor must restart the wizard from scratch. |

---

## 9. Non-functional Requirements

> **Q4 BA delegated NFR specification to qc-uc-read.** The values below are proposed industry-standard defaults grounded in COMMON rules already referenced in the UC and typical vendor-onboarding benchmarks. **BA approval pending — tracked as Q14 in v2 backlog.** Tester should treat these as draft until approved.

| Category | Requirement (proposed) | Source / Reference |
|----------|-------------|-------------------|
| Performance — Page load | Initial load of `/register/vendor` ≤ 3 seconds (95th percentile) on a 3G connection. | Industry benchmark (Google Web Vitals) |
| Performance — Async validation | Duplicate check (Email / Store Name) response time ≤ 2 seconds (95th percentile) on broadband; spinner displayed when > 300ms (per [COMMON-012]). | [COMMON-012] + proposed SLA |
| Performance — Step navigation | Step 1 → Step 2 navigation completes ≤ 1 second after validation success. | Proposed SLA |
| Browser compatibility | Latest two versions of: Chrome, Edge, Safari, Firefox. Mobile Safari iOS 14+; Chrome Android (latest). **IE11 not supported.** | Proposed |
| Mobile responsive | Breakpoints: ≥ 1024px desktop two-column; 768–1023px tablet single-column; < 768px mobile single-column. Touch targets ≥ 44 × 44 px. | Proposed (WCAG 2.1) |
| Security — CSRF | All form POST requests include a CSRF token. | Proposed |
| Security — Rate limiting | Max 5 "Proceed to Next Step" submission attempts per IP per minute (anti-bot). Beyond limit: HTTP 429 + retry-after header; UI shows `"Too many attempts. Please try again in {N} seconds."` | Proposed |
| Security — CAPTCHA | reCAPTCHA v3 (or equivalent) on the public registration form to mitigate automated abuse. | Proposed |
| Security — Input sanitization | All free-text fields server-side sanitized to prevent stored XSS / SQL injection. | Implicit standard |
| Security — Transport | HTTPS only; HTTP requests redirected to HTTPS. | Implicit standard |
| Accessibility | (1) Form fields have associated label / aria-label [COMMON-048]. (2) Color contrast WCAG AA ≥ 4.5:1 [COMMON-046]. (3) Tab/Shift+Tab navigation [COMMON-047]. (4) Focus indicator visible [COMMON-050]. (5) Inline error linked to field via `aria-describedby` [COMMON-051]. (6) Vendor Type radio group navigable via arrow keys (per Q1 confirmed control type). | [COMMON-046 → 051] |
| Session | Wizard session timeout 30 min inactivity; **no countdown notification** (Q7); on timeout → redirect to landing page + clear draft. | [RULE-070] (overridden per Q7) |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions

> All v1 questions Q1–Q12 are resolved (see `..._question-backlog_..._v1.md`). Four new questions arose from BA's answers — see `..._question-backlog_..._v2.md`. Summary table below.

| # | Question / Issue | Context | Owner | Status |
|---|-----------------|---------|-------|--------|
| Q1–Q12 | (See v1 backlog) | All resolved by BA on 2026-05-07 | BA | **Resolved** |
| Q13 (NEW) | Q1 confirmed control type = radio button. But `image copy.png` currently renders Vendor Type as text/tab style (Individual underlined, no visible radio circle). Will the design be updated to render actual radio circles, or will the text/tab style persist with the underlying control kept as `role=radio`? | Design rendering vs control semantics inconsistency. | Design + BA | Open |
| Q14 (NEW) | Q4 NFR proposed by qc-uc-read in audit v2 Section 9 (perf SLAs, browser matrix, mobile breakpoints, security policies). BA approval required before test cases incorporate these. | NFR formal sign-off. | BA + PM | Open |
| Q15 (NEW) | Q9 — design for Logo, Page Title "Register as a Vendor", and Character Counter "0/500" not yet provided. When will design be ready? Should test scenarios for these elements be deferred until design is provided? | Element coverage gap pending design delivery. | Design | Open |
| Q16 (NEW) | Q8 confirmed Login click discards draft data with no warning. Confirm this overrides COMMON-014 ("Confirmation dialog required before any destructive or decisive action") in this UC, or whether COMMON-014 is intentionally scoped to "delete/archive/suspend/approve/reject" actions and does not extend to navigation-induced data loss. | Override / scope clarification of COMMON-014. | BA | Open |

### 10.2 Dependencies

- **UC-VOB-002 (Upload Documents)** — next step; Vendor Type at Step 1 determines the required KYC document set; cross-references the green checkmark completed-state pattern (UC-VOB-002 SC-02A #1).
- **UC-VOB-003 (Accept Vendor Agreement)** — downstream RULE-002.
- **UC-VOB-004 (Validate Registration Submission)** — downstream; performs email OTP verification (QA-021), backend aggregated validation (RULE-071), vendor record creation in `Pending` state.
- **`docs/BA/common/common-rules.md`** — verbatim text for the 14+ COMMON rules referenced.
- **`docs/BA/common/requirement-traceability.md`** — verbatim text for BR-023, RULE-002, RULE-070, RULE-071.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-07 | qc-uc-read (chris.le3@basao.com) | Initial first audit of UC-VOB-001 (UC source revision 2026-04-13). Score 70.0/100 → CONDITIONALLY READY. 12 open questions delegated to question-backlog v1. **(Note: v1 was authored in Vietnamese narrative by mistake; v2 is the authoritative English version per project language rule.)** |
| v2 | 2026-05-07 | qc-uc-read (chris.le3@basao.com) | **Re-audit after BA answered all 12 v1 questions.** Integrated answers: Vendor Type = radio (Q1), Company Name retained on switch (Q2), 22 AC approved (Q3), NFR proposed (Q4), uniqueness scope excludes Rejected (Q5), no Phone uniqueness (Q6), no countdown + clear draft on timeout (Q7), Login discards draft no warning (Q8), Logo/Title/Counter design deferred (Q9), Step 1 completed = green checkmark (Q10 cross-ref UC-VOB-002), short-circuit FE-then-server (Q11), Out-of-Scope skip (Q12). Added AC-08b/09b/09c/23/24 covering newly resolved scenarios. Score 70.0 → 87.7/100. 4 new questions Q13–Q16 raised in v2 backlog. **Translated full report to English per project language rule.** |

---

## Audit Summary

| #   | Knowledge Area                           | Max Pts | v1 Score | v2 Score | v2 Status |
| --- | ---------------------------------------- | ------- | -------- | -------- | --------- |
| 1   | Feature Identity                         | 5       | 5/5      | 5/5      | ✅ Complete |
| 2   | Objective & Scope                        | 5       | 4/5      | 4/5      | ⚡ Partial *(BA chose to skip explicit Out-of-Scope — Q12 closed by decision)* |
| 3   | Actors & User Roles                      | 10      | 8/10     | 8/10     | ⚡ Partial *(no explicit RBAC for anonymous user; logged-in-user behavior at `/register/vendor` not addressed)* |
| 4   | Preconditions & Postconditions           | 10      | 10/10    | 10/10    | ✅ Complete |
| 5   | UI Object Inventory & Mapping            | 15      | 9/15     | 10/15    | ⚡ Partial *(Q1 control type clarified but design rendering inconsistency persists — Q13; Logo/Title/Char counter design pending — Q15)* |
| 6   | Object Attributes & Behavior Definition  | 20      | 17/20    | 19/20    | ✅ Mostly Complete *(Q2/Q8/Q10 resolved; minor unspecified items remain — counter color near limit, transition animation)* |
| 7   | Functional Logic & Workflow Decomposition | 20      | 17/20    | 19/20    | ✅ Mostly Complete *(Q7/Q11 resolved; server error fallback still implicit not explicit)* |
| 8   | Functional Integration Analysis          | 20      | 13/20    | 17/20    | ✅ Mostly Complete *(Q5/Q6 resolved; ⚠️ Q7 timeout behavior potentially conflicts with UC-VOB-002 alt-flow `[Session Timeout]`)* |
| 9   | Acceptance Criteria                      | 20      | 6/20     | 18/20    | ✅ Mostly Complete *(Q3 BA approved; 24 AC now stable baseline; 2-pt deduction for AC-23/24 newly added in v2 needing tester validation against BA intent)* |
| 10  | Non-functional Requirements              | 5       | 2/5      | 4/5      | ⚡ Partial *(Q4 BA delegated; values proposed; formal approval pending — Q14)* |
| **Total** |                                    | **130** | **91/130** | **114/130** | **87.7 / 100** |

**Normalization:** `round((114 / 130) × 100, 1) = 87.7`

**Auto-fail check:** No Critical area (#1–#9) scored 0 → no auto-fail.

---

## Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1–Q12 | — | (see v1 backlog) | All 12 questions resolved by BA on 2026-05-07. | — | **Resolved** |
| Q13 | Medium | UC §2 #2 + `image copy.png` | Q1 confirmed control type = radio. Will design be updated to render actual radio circles for Individual / Business, or will the text/tab style persist with `role=radio` underneath? | UI test selectors and accessibility role assertions depend on the final rendering. | Open |
| Q14 | Medium | Audit v2 §9 NFR | qc-uc-read proposed industry-standard NFR (perf SLAs, browser matrix, mobile breakpoints, security policies — CSRF, rate-limit 5/IP/min, reCAPTCHA, HTTPS-only). BA formal approval required before NFR test cases reference these values. | NFR test plan blocked until BA approves or revises proposed values. | Open |
| Q15 | Low | `image copy.png` (Logo, Page Title, Char Counter) | Design for Logo, Page Title "Register as a Vendor", Character Counter "0/500" not yet available. When ready? Defer related test scenarios? | Element coverage incomplete; tester cannot verify intended visual / behavioral states (e.g., counter color at boundary, logo click behavior). | Open |
| Q16 | Low | UC §2 #12 + COMMON-014 | Q8 confirmed Login click discards draft with no warning. Does this override COMMON-014 (confirmation dialog before destructive/decisive actions), or is COMMON-014 scoped narrowly to delete/archive/suspend/approve/reject and does not cover navigation-induced data loss? | Documenting the override prevents future regressions where another reviewer "fixes" the missing dialog as a bug. | Open |

---

## 🟢 What's Good

UC-VOB-001 has materially improved between v1 and v2 audits. Credit to the BA team for:

- **Decisive answers** to all 12 v1 questions on 2026-05-07 — high responsiveness shortened the audit cycle by approximately one full revision.
- **Explicit business decisions** rather than deferral: e.g., Phone uniqueness → "no" (Q6), session timeout countdown → "no" (Q7), Login warning → "no" (Q8), Out-of-Scope section → "skip" (Q12). Decisions are testable; deferrals are not.
- **Approved 22 AC baseline** (Q3) — this single decision moved Section 9 from 6/20 to 18/20 (+12 points).
- **Cross-reference to UC-VOB-002** for the completed-step indicator state (Q10) — leveraging existing artefacts instead of re-defining.
- **Clear uniqueness scope** (Q5: all states except Rejected) — tester can build precise test data without ambiguity.
- **User-story style description**, comprehensive Validation Summary table, fully populated Common Rule traceability — all already strong in v1 and remain so in v2.

---

## 🧪 Testability Outlook

**What CAN be tested now (full coverage):**

- Field-level validation: required, format (RFC 5322 / E.164), max-length, numeric-only Phone — Validation Summary fully verbatim.
- Required-field-empty errors — verbatim error message from COMMON-025.
- Email/Store Name duplicate **with scope rule** (excluding Rejected vendors) — AC-08, AC-08b, AC-09, AC-09b.
- Phone Number non-uniqueness — AC-09c.
- Vendor Type switch retain **including Company Name** — AC-11.
- Happy path Individual + Business — flow Step 1 → Step 2.
- Anti-double-submit (button disabled after first click) — AC-16.
- Loading spinner for async > 300ms — AC-17.
- Character counter realtime update — AC-15.
- Step indicator transitions: Step 1 active → green checkmark, Step 2 disabled → active — AC-01, AC-18.
- Max-length input blocked (First Name 100, others 255, Description 500) — AC-12, AC-13.
- Email format-vs-duplicate short-circuit (FE first, server only on format pass) — AC-23.
- Session timeout no-countdown + redirect + clear draft — AC-24.
- Help opens new tab → draft preserved on original tab — AC-19.
- Login same-tab navigation → draft cleared, no warning — AC-20.

**What CANNOT be tested yet (blocked by remaining gaps):**

- Vendor Type final visual rendering (radio circles vs tab/text-link) — Q13.
- NFR formal targets (perf SLA exact numbers, browser matrix, mobile breakpoints, security policy) — Q14.
- Logo, Page Title, Character Counter color-state-near-limit visual behavior — Q15.
- Navigation-vs-COMMON-014 override formality — Q16.

**Suggested test focus areas:**

- **Happy path:** AC-01 (Individual), AC-02 (Business), AC-14 (optional Store Description).
- **Alternative scenarios:** AC-11 (Vendor Type switch with Company Name retain), AC-19 (Help new-tab preserves draft), AC-20 (Login discards draft), AC-24 (session timeout flow).
- **Boundary & validation tests:** AC-12/13 (max-length 100/255), AC-15 (char counter realtime), AC-22 (accessibility / aria).
- **Error & exception scenarios:** AC-03/04 (required empty), AC-05/06 (format invalid Email/Phone), AC-08/08b/09/09b (duplicate scope including Rejected exception), AC-09c (Phone non-uniqueness), AC-10 (Business empty Company Name), AC-23 (format + duplicate short-circuit edge case).
- **UI-specific checks:** AC-21 (label verbatim), AC-18 (step indicator disabled), AC-17 (loading spinner > 300ms), AC-16 (double-submit prevention).
- **Cross-step integration:** Vendor Type Individual/Business → KYC document set on Step 2 (mock UC-VOB-002 boundary), Back-from-Step-2 retains data, session timeout cross-step impact.

---

## 📌 Summary & Recommendation

UC-VOB-001 is now in **CONDITIONALLY READY** state at **87.7 / 100** (up from 70.0 in v1, +17.7 points after integrating BA answers to all 12 v1 questions). All 9 critical knowledge areas (#1–#9) score above 50% and most are complete or mostly complete; the only remaining cap is Section 5 UI Inventory (10/15) where the design rendering of Vendor Type (Q13) and the missing Logo/Title/Counter design (Q15) are open. NFR (Section 10) is tentatively populated with industry-standard proposals pending BA formal approval (Q14).

**Recommendation:** **Proceed to test design** — the QA team can immediately build test scenarios and test cases for all 24 BA-approved acceptance criteria covering validation, happy path, error handling, duplicate scope rules, Vendor Type switch with Company Name retention, session timeout, and navigation behaviors. The 4 remaining open questions (Q13–Q16) do not block the bulk of test design and can be resolved in parallel: Q13 (design rendering) and Q15 (missing design) become relevant during execution / visual validation; Q14 (NFR approval) becomes blocking only when designing NFR-specific test cases; Q16 is a documentation formality. Target full READY (≥ 90/100) once Q13–Q15 close on the design side.

---

*UC Readiness Review — qc-uc-read v2 audit of UC-VOB-001 (UC source revision 2026-04-13). Generated 2026-05-07. Supersedes v1.*
