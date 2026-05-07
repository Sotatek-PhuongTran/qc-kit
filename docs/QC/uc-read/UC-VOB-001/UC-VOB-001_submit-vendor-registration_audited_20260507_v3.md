---
title: UC Readiness Review — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-uc-read (chris.le3@basao.com)
version: v3
source-uc: docs/BA/UC-VOB-001/UC-VOB-001.md (revision 2026-04-13)
source-design: docs/BA/UC-VOB-001/image copy.png
common-context: docs/BA/common/project-context_20260505_v1.md
backlog-resolved: UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v2.md (Q13–Q16 all answered)
backlog-current: UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v3.md (all 16 questions resolved; no open)
supersedes: UC-VOB-001_submit-vendor-registration_audited_20260507_v2.md
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
- **[RULE-070]** "Registration wizard session must time out after inactivity; recommended inactivity window is 30–60 minutes; vendor must be notified before/at timeout" — *cross-step; UC-VOB-001 overrides the "notify before/at timeout" sub-clause per Q7*.
- **[RULE-071]** "Frontend validates registration step-by-step; the final backend submission must validate all steps simultaneously and aggregate all errors across all steps in a single response."

**v3 deltas (BA answers integrated for Q13–Q16):**
- **Q13 — Vendor Type design:** Design will be updated to render actual **radio circles** (consistent with `role=radio` semantics). Resolves the v2 design-spec rendering inconsistency. Keyboard interaction = arrow keys (radio standard).
- **Q14 — NFR:** BA + PM **approved** the NFR baseline proposed in v2 §9 (perf SLAs, browser matrix, mobile breakpoints, security policies). NFR test design unblocked.
- **Q15 — Logo / Page Title / Char Counter design:** Test scope = **basic visibility-only checks** (no full state coverage; no design forthcoming). Tester writes simple "element exists, label correct, counter updates with input length" tests; deeper visual / behavioral states are out of scope until design is provided.
- **Q16 — Login no-warning override:** **UC-specific decision.** Follow BA's Q8 answer for UC-VOB-001 only — Login click discards draft without confirmation dialog. COMMON-014 is NOT overridden globally; the rule's "destructive/decisive action" scope (delete/archive/suspend/approve/reject) does not extend to navigation-induced data loss in this UC.

**v1 → v2 → v3 progression summary:**
- v1: 70.0/100 (CONDITIONALLY READY) — initial first-audit, 12 open questions raised.
- v2: 87.7/100 (CONDITIONALLY READY) — Q1–Q12 resolved; 4 new questions Q13–Q16.
- **v3: 92.3/100 (READY)** — Q13–Q16 resolved; **no open questions**; QA can proceed to test design + execution.

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `92.3 / 100` | ✅ READY |

> All 16 questions resolved. No open blockers. QA team is cleared to begin test design and downstream test execution immediately.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC-VOB-001 | Submit Vendor Registration | UC source v1 (revision 2026-04-13); audit v3 | Finalized for QA |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| BA team (Multivendor project) | BA + Design + PM (per v2 backlog Q3, Q14) | 2026-04-13 (UC); 2026-05-07 (audit v3) | 2026-04-13 |

---

## 1. Objective & Scope

### 1.1 Objective ✅

Allow a **prospective vendor** (Individual or Business) to submit basic identity information and select a vendor type to begin the onboarding flow, enabling subsequent KYC document upload (UC-VOB-002) and vendor agreement acceptance (UC-VOB-003). This UC is the single entry point for BP-001 Vendor Onboarding.

### 1.2 In Scope ✅

- Render Step 1 "Basic Details" form with the 3-step progress wizard (Step 1 active, Steps 2/3 disabled).
- Vendor Type selection — **radio button** (default Individual / Business) — Q13 confirmed; design will be updated to render proper radio circles.
- Collect 7 fields: First Name, Last Name, Company Name (Business only), Email Address, Phone Number, Store Name, Store Description.
- Inline client-side validation of all required fields on "Proceed to Next Step" click.
- Server-side duplicate check for Email Address and Store Name (error: `"{Field Name} already exists"` — COMMON-029); scope **excludes Rejected vendors** (Q5).
- Anti-double-submit (COMMON-015); loading spinner for async > 300ms (COMMON-012).
- Persist Step 1 data to session/draft → advance wizard to Step 2 (UC-VOB-002).
- Vendor Type switch retains First/Last Name and Company Name (Q2); shows/hides Company Name; updates required document set for Step 2.

### 1.3 Out of Scope ⚡

> BA chose not to add an explicit Out-of-Scope section to source UC (Q12). Inferred list below — for tester reference only:
- Email OTP / link verification (UC-VOB-004 — QA-021).
- Vendor agreement acceptance (UC-VOB-003).
- Password / account credentials creation (PCTX-2: project-level gap).
- Document upload (UC-VOB-002).
- Vendor record creation in `Pending` state (UC-VOB-004).
- Backend aggregated validation (RULE-071, owned by UC-VOB-004).
- Phone Number uniqueness check (Q6 — explicitly NOT enforced).

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| **Prospective Vendor (Individual)** | Primary (anonymous, public) | Access `/register/vendor` without login; fill Step 1 form; choose Vendor Type = Individual; submit to advance to Step 2. |
| **Prospective Vendor (Business)** | Primary (anonymous, public) | Same as Individual but additionally fills Company Name (required). Vendor Type = Business activates expanded KYC document set on Step 2 (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). |
| **System** | System actor | Performs client-side validation, server-side duplicate check (Email, Store Name) excluding Rejected vendors, persists session/draft, advances wizard, enforces RULE-070 session timeout (30 min). |
| **Admin** | Downstream (out of scope at this UC) | Reviews/approves/rejects vendor after vendor completes all three steps (UC-VOB-006, BR-026). |

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions ✅

- **No authentication required.** Page `/register/vendor` is publicly accessible.
- No dependency on any other UC (entry point of BP-001).

### 3.2 Postconditions ✅

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| **Step 1 validation succeeds** | (1) All 7 (or 8 if Business) field values persisted to session/draft. (2) Wizard advances active step to Step 2 (UC-VOB-002). (3) Step 1 indicator transitions to **green checkmark / completed** (cross-ref UC-VOB-002 SC-02A #1, Q10). (4) Submit button disabled after first click (COMMON-015). |
| **Step 1 validation fails** | (1) Inline error messages directly below each offending field (COMMON-032). (2) Submit button reverts to enabled. (3) Vendor corrects fields and re-submits. |
| **Vendor Type switch Individual ↔ Business** | (1) First Name and Last Name retain values. (2) **Company Name retains its value** even when switching Business → Individual (Q2). (3) Company Name field shown when Business, hidden when Individual. (4) Required KYC document set on Step 2 updates to match new Vendor Type. |
| **Wizard session times out** (30 min inactivity per RULE-070, overridden per Q7) | (1) **No countdown notification.** (2) Vendor **redirected to landing page**. (3) **All draft data cleared.** Vendor must restart the wizard. |

---

## 4. UI Object Inventory & Mapping

> **Note:** Section 4 expands UC §2 element table (12 rows) to 19 rows. Row 1 (Logo), Row 4 (Page Title), Row 18 (Character Counter) lack design — test scope = **visibility-only** per Q15.

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Header / Top bar | "MultiVendor Platform" | Brand / Logo (icon + wordmark) | N/A | — | — | N/A | Always visible top-left. **Design pending — test = visibility-only (Q15).** | `image copy.png` |
| 2 | Header / Top bar | "Help" | Navigation Link (with `?` icon) | N/A | — | — | N/A | Always visible top-right. Opens help/support page in **new tab**; draft preserved on original tab (Q8). | `image copy.png`; UC §2 #11 |
| 3 | Header / Top bar | "Login" | Navigation Link | N/A | — | — | N/A | Always visible top-right. Navigates **same tab** to vendor login page. **Discards draft data with no confirmation dialog** (Q8); UC-specific decision per Q16. | `image copy.png`; UC §2 #12 |
| 4 | Body / Page heading | "Register as a Vendor" | Static Text / Heading (H1) | N/A | — | — | N/A | Page title above wizard. **Design pending — test = visibility-only (Q15).** | `image copy.png` |
| 5 | Body / Step indicator | "1 Basic Details" | Wizard / Stepper item (active) | N/A | active | — | N/A | Filled black circle with `1`. State transitions: **active** → **completed (green checkmark)** after Step 1 validation passes (Q10, cross-ref UC-VOB-002 SC-02A #1). | `image copy.png` |
| 6 | Body / Step indicator | "2 Upload Documents" | Wizard / Stepper item (disabled) | N/A | disabled | — | N/A | Grey circle with `2`. **Not clickable** until Step 1 success. | `image copy.png` |
| 7 | Body / Step indicator | "3 Agreement" | Wizard / Stepper item (disabled) | N/A | disabled | — | N/A | Grey circle with `3`. **Not clickable** until Step 2 success. | `image copy.png` |
| 8 | Body / Form group | "Vendor Type" | Group label (for radio group) | N/A *(no asterisk)* | — | — | — | Section header. Selection inherently mandatory because default always set. | `image copy.png`; UC §2 #2 |
| 9 | Body / Form group | "Individual" | Radio option (Q13: design will render proper radio circle; `role=radio`; arrow-key navigation) | Yes (1 of 2 mandatory) | **selected** (default) | — | — | Default on page load. Selecting Individual hides Company Name. | `image copy.png`; UC §2 #2 |
| 10 | Body / Form group | "Business" | Radio option (Q13 — same control type as #9) | Yes (1 of 2 mandatory) | unselected | — | — | Reveals Company Name (#13); updates required KYC document set on Step 2. | `image copy.png`; UC §2 #2 |
| 11 | Body / Form > Row 1 col 1 | "First Name *" | Text Input (single-line) | Yes | (empty) | `Enter first name` | N/A | Max 100 chars [COMMON-007]; input blocked at limit [COMMON-009]. Required: error `"First Name is required"` [COMMON-025]. Allows hyphens/apostrophes. aria-labelledby [COMMON-048]. | `image copy.png`; UC §2 #3 |
| 12 | Body / Form > Row 1 col 2 | "Last Name *" | Text Input (single-line) | Yes | (empty) | `Enter last name` | N/A | Max 100 chars [COMMON-007]. Error: `"Last Name is required"` [COMMON-025]. | `image copy.png`; UC §2 #4 |
| 13 | Body / Form > Conditional row (Business only) | "Company Name *" | Text Input (single-line) | Yes (when Vendor Type = Business) | (empty) | `Enter company name` | N/A | **Visible only when Business**, hidden when Individual. Full-width. Max 255 chars [COMMON-001]. Error: `"Company Name is required"` [COMMON-025]. **Value retained when switching Business → Individual** (Q2). | UC §2 #5 |
| 14 | Body / Form > Row 2 col 1 | "Email Address *" | Text Input (email) | Yes | (empty) | `Enter email address` | N/A | RFC 5322 [COMMON-019], max 255 [COMMON-001]. Errors (Q11 short-circuit order): (1) `"Email Address is required"` [COMMON-025]; (2) `"Please enter a valid email"` [COMMON-026]; (3) `"Email Address already exists"` [COMMON-029, server, scope = all states except `Rejected` — Q5]. Email verification deferred to UC-VOB-004 (QA-021). | `image copy.png`; UC §2 #6 |
| 15 | Body / Form > Row 2 col 2 | "Phone Number *" | Text Input (tel) | Yes | (empty) | `Enter phone number` | N/A | E.164 [COMMON-020], numeric-only on keypress [COMMON-004], max 255 [COMMON-001]. Errors: `"Phone Number is required"` [COMMON-025] / `"Please enter a valid phone number"` [COMMON-026]. **No uniqueness check** (Q6). | `image copy.png`; UC §2 #7 |
| 16 | Body / Form > Row 3 (full-width) | "Store Name *" | Text Input (single-line) | Yes | (empty) | `Enter store name` | N/A | Max 255 chars [COMMON-001]. Errors: `"Store Name is required"` [COMMON-025] / `"Store Name already exists"` [COMMON-029, scope = all except `Rejected` — Q5]. Full-width. | `image copy.png`; UC §2 #8 |
| 17 | Body / Form > Row 4 (full-width) | "Store Description" | Text Area (multi-line) | **No** | (empty) | `Describe your store (Max 500 chars)` | N/A | Max 500 chars [COMMON-008]; input blocked at limit [COMMON-009]. Optional. aria-label [COMMON-048]. | `image copy.png`; UC §2 #9 |
| 18 | Body / Form > Row 4 corner | "0/500" | Static Text / Character counter | N/A | "0/500" | — | N/A | Bottom-right of Store Description. Real-time update with input length. **Design pending — test = visibility + counter increments (Q15).** Color-state near limit unspecified (out of scope until design provided). | `image copy.png` |
| 19 | Body / Form > CTA | "Proceed to Next Step >" | Button (Primary CTA) | N/A | enabled | — | N/A | Right-aligned. On click → client-side validation; pass → save session, navigate Step 2; fail → inline errors + button stays enabled. **Disabled after first successful click** [COMMON-015]. **Loading spinner** if async > 300ms [COMMON-012]. | `image copy.png`; UC §2 #10 |

---

## 5. Object Attributes & Behavior Definition

> 1-to-1 mapping with Section 4 — 19 rows.

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| #1 Logo "MultiVendor Platform" | Always Enabled | Click *(behavior unspecified — visibility-only test per Q15)* | Static. |
| #2 "Help" link | Always Enabled | Click → opens help page **in new tab** | Form draft preserved on original tab (Q8). |
| #3 "Login" link | Always Enabled | Click → navigates **same tab** to vendor login page | **Draft data cleared, no confirmation dialog** (Q8 + Q16). |
| #4 Page title "Register as a Vendor" | Always Enabled (static) | N/A | Static heading. Visibility-only test per Q15. |
| #5 Step "1 Basic Details" | **Active** on load → **Completed (green checkmark)** after pass | Not clickable on itself. | Transitions to green checkmark when wizard advances to Step 2 (Q10 cross-ref UC-VOB-002 SC-02A #1). |
| #6 Step "2 Upload Documents" | **Disabled / Greyed** initially | **Not clickable** until Step 1 success. | After Step 1 success → transitions to **Active** (filled black). |
| #7 Step "3 Agreement" | **Disabled / Greyed** | **Not clickable** until Step 2 success. | Same pattern as #6, downstream of Step 2. |
| #8 "Vendor Type" group label | Always Enabled (static) | N/A | Static label. |
| #9 "Individual" radio option | **Selected** (default) | Click → set Vendor Type = Individual. **Arrow keys** cycle to "Business" (radio standard, Q13). | Selection retained when navigating back from Step 2. Hides Company Name. Updates Step 2 KYC required to (NIC/Passport, Bank Proof). |
| #10 "Business" radio option | Unselected (default) | Click → set Vendor Type = Business. Arrow keys cycle to "Individual" (Q13). | Reveals Company Name (#13); updates Step 2 KYC required to (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). First/Last/Company Name all retained on switch (Q2). |
| #11 First Name input | Enabled, empty default | Type → input accepted; > 100 chars → blocked. Click "Proceed" with empty → error. | Real-time char limit; error only after "Proceed" click. |
| #12 Last Name input | Enabled, empty default | Same as #11; max 100 chars; error `"Last Name is required"`. | Same as #11. |
| #13 Company Name input | **Hidden** when Individual; **Visible + Enabled + Required** when Business. | Type → input accepted; max 255; > 255 → blocked. Click "Proceed" with Business + empty → error. | **Value persists across Vendor Type switches** (Q2). |
| #14 Email Address input | Enabled, empty default | Type → input accepted; max 255; > 255 → blocked. Click "Proceed" → 3-tier validation (Q11 short-circuit). | Validation precedence: required → format → uniqueness; **server NOT called if format invalid** (Q11). Server scope excludes `Rejected` (Q5). |
| #15 Phone Number input | Enabled, empty default | Type → numeric-only on keypress [COMMON-004], non-numeric rejected. Max 255 chars. Click "Proceed" → required + E.164 format check. | **No server-side uniqueness** (Q6). |
| #16 Store Name input | Enabled, empty default | Type → input accepted; max 255. Click "Proceed" → required + async duplicate check. | Same 3-tier pattern as Email; server scope excludes `Rejected` (Q5). |
| #17 Store Description textarea | Enabled, empty default | Type → input accepted; max 500; > 500 → blocked. Optional. | Character counter (#18) updates real-time. |
| #18 Character counter "0/500" | Enabled, default "0/500" | N/A (read-only) | Real-time update tied to #17 length. Visibility + increment test only per Q15. |
| #19 "Proceed to Next Step >" button | Enabled (default) | Hover *(unspecified)*. Click → trigger client-side validation. | Pass → save session, navigate, button disabled; Fail → inline errors, button reverts enabled; Async > 300ms → spinner [COMMON-012]. |

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Submit Step 1 Basic Details

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | Vendor | Open `/register/vendor` | Step 1 wizard active; default Vendor Type = Individual; Steps 2/3 disabled. | N/A | N/A |
| 2 | Vendor | (Optional) Click "Business" radio | Reveal Company Name; update KYC required set on Step 2 (downstream). | Vendor keeps Individual → flow continues without Company Name. | N/A |
| 3 | Vendor | Fill required fields + Store Description (optional) | Each char accepted; max-length blocked at limit [COMMON-009]; numeric-only Phone [COMMON-004]; counter realtime. | N/A | Paste/type past max-length → input rejected. |
| 4 | Vendor | Click **"Proceed to Next Step >"** | (1) Client-side validate. (2) Async duplicate check Email + Store Name (scope = all except `Rejected`, Q5; spinner > 300ms). (3) Save Step 1 data. (4) Step 1 → green checkmark. (5) Wizard navigates Step 2. (6) Button disabled [COMMON-015]. | N/A | **[Empty required]** Inline error `"{Field Name} is required"` [COMMON-025, COMMON-032]. **[Invalid format — Q11 short-circuit]** Email: `"Please enter a valid email"`. Phone: `"Please enter a valid phone number"`. **[Duplicate after format passes]** `"Email Address already exists"` / `"Store Name already exists"` [COMMON-029]. **[Server error]** Fallback `"Something went wrong. Please try again later."` [COMMON-030]. |
| 5 | Vendor | (Optional) Switch Vendor Type mid-flow | First/Last Name **and Company Name** all retained (Q2). | N/A | N/A |
| 6 | Vendor | (Optional) Inactive 30 minutes | **[Session timeout — Q7]** No countdown. Redirect to landing page. All draft data cleared. | N/A | N/A |

**B. Business Rules & Validations**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(verbatim)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Vendor Type | Yes (default selected) | Radio (Individual / Business) | — | N/A |
| First Name | Yes | Free text (allows hyphens, apostrophes) | — / 100 (COMMON-007) | `"First Name is required"` (COMMON-025) |
| Last Name | Yes | Free text | — / 100 (COMMON-007) | `"Last Name is required"` (COMMON-025) |
| Company Name | Yes (Business only); hidden when Individual; **value retained on switch** | Free text | — / 255 (COMMON-001) | `"Company Name is required"` (COMMON-025) |
| Email Address | Yes | RFC 5322 (COMMON-019); short-circuit FE-then-server (Q11); server scope all except `Rejected` (Q5) | — / 255 (COMMON-001) | `"Email Address is required"` (COMMON-025) / `"Please enter a valid email"` (COMMON-026) / `"Email Address already exists"` (COMMON-029) |
| Phone Number | Yes | E.164 (COMMON-020); numeric-only on keypress (COMMON-004); **no uniqueness** (Q6) | — / 255 (COMMON-001) | `"Phone Number is required"` (COMMON-025) / `"Please enter a valid phone number"` (COMMON-026) |
| Store Name | Yes | Free text; server uniqueness scope all except `Rejected` (Q5) | — / 255 (COMMON-001) | `"Store Name is required"` (COMMON-025) / `"Store Name already exists"` (COMMON-029) |
| Store Description | **No** | Free text | — / 500 (COMMON-008) | — |

**C. UI/UX Feedback**

- **Loading States:** spinner on "Proceed" button if async duplicate check > 300ms [COMMON-012]; button disabled after first click [COMMON-015].
- **Toast Messages:** None at Step 1 (final submission toast lives in UC-VOB-004).
- **Error Codes:** `"{Field Name} is required"` (COMMON-025); `"Please enter a valid {field type}"` (COMMON-026); `"{Field Name} already exists"` (COMMON-029); `"Something went wrong. Please try again later."` (COMMON-030, implicit fallback). All shown inline below field [COMMON-032].

### 6.2 Function: Vendor Type Switch

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Notes |
|------|-------|--------|------------------------------|-------|
| 1 | Vendor | Click "Business" (currently Individual) | Reveal Company Name; First/Last Name retained; KYC required set updated. | Use arrow keys per radio standard (Q13). |
| 2 | Vendor | Click "Individual" (currently Business with Company Name filled) | Hide Company Name field; **value retained in state** (Q2); KYC required reverts to (NIC/Passport, Bank Proof). | — |
| 3 | Vendor | Switch back to Business | Re-display Company Name with previously entered value (still in state). | — |

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis | Data Consistency Verification |
|---------------------------|--------------------------------------------|-------------------------------|
| **"Proceed to Next Step" success** | Advances to UC-VOB-002. Step 1 data persists. Step 1 → green checkmark. | Verify all 7 (or 8 if Business) fields retained when navigating Back from Step 2; Vendor Type retained on back. |
| **Vendor Type = Business** | Step 2 requires expanded KYC: BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof. Step 1 displays Company Name. | Verify Vendor Type switch updates Step 2 document slots immediately (no stale cache). |
| **Vendor Type = Individual** | Step 2 requires: NIC/Passport, Bank Proof. | Verify Step 2 slots narrow accordingly. |
| **Email/Store Name duplicate (server)** | Blocks advancement. Scope = all except `Rejected` (Q5). | Verify previously-rejected vendor data does NOT block re-registration; verify Pending/Approved/Suspended/Draft state correctly blocks. |
| **Wizard session timeout (Q7)** | After 30 min inactivity → redirect to landing page; clear draft. Cross-step (Step 1 + Step 2 data lost). | Verify timer resets on any user activity; verify cross-step impact. ⚠️ Conflict-of-record with UC-VOB-002 alt-flow `[Session Timeout]` ("system notifies vendor before session expiry") — Q7 BA answer overrides locally. |
| **FE step-by-step vs backend aggregated (RULE-071)** | UC-VOB-001 only does FE client-side + server duplicate check; backend aggregated runs in UC-VOB-004. | Verify Step 1 server errors shown inline at Step 1, NOT aggregated. |
| **Phone — no uniqueness (Q6)** | Same Phone may appear on multiple accounts. | Verify duplicate Phone vendor accepts and advances. |
| **Help link (new tab) — Q8** | No effect on draft state. | Verify form data preserved on original tab. |
| **Login link (same tab) — Q8 + Q16** | Discards draft, no confirmation dialog. UC-specific decision per Q16; COMMON-014 not overridden globally. | Verify return to `/register/vendor` after Login click → empty form. |

---

## 8. Acceptance Criteria

> **24 BA-approved AC** from v2 (Q3) — unchanged in v3. AC-23 (FE/server short-circuit, Q11) and AC-24 (session timeout, Q7) included.

| AC # | Scenario | Given *(precondition)* | When *(user action)* | Then *(expected result)* |
|------|----------|------------------------|----------------------|--------------------------|
| **AC-01** | Happy Path Individual | Vendor opens `/register/vendor` for first time. | Vendor keeps Vendor Type = Individual (default), enters First Name "John", Last Name "Doe", Email "john@example.com" (unique), Phone "+94771234567", Store Name "Tech Hub" (unique), leaves Store Description empty, clicks "Proceed". | Wizard advances to Step 2. Step 1 data persisted. **Step 1 → green checkmark; Step 2 → active.** Button "Proceed" disabled during navigation. |
| **AC-02** | Happy Path Business | Same as AC-01 but Vendor Type = Business. | Switch to Business → Company Name field appears. Fill Company Name "Tech Hub Ltd" + remaining valid. Click "Proceed". | Same as AC-01 + Company Name persisted. KYC required set on Step 2 = expanded (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). |
| **AC-03** | Required field empty — First Name | Vendor opens page for first time. | Vendor leaves First Name empty, fills remaining valid, clicks "Proceed". | Inline error `"First Name is required"` below First Name [COMMON-025, COMMON-032]. Wizard does NOT advance. Button reverts enabled. |
| **AC-04** | Multiple required fields empty | Vendor opens page for first time. | Vendor leaves First Name, Last Name, Email, Phone, Store Name empty, clicks "Proceed". | Inline errors for all 5 missing fields appear simultaneously, each below its field. Wizard does NOT advance. |
| **AC-05** | Email format invalid | Vendor opens page for first time. | Vendor enters Email = "abc@" (invalid RFC 5322), other fields valid, clicks "Proceed". | Inline error `"Please enter a valid email"` [COMMON-026]. **Server NOT called** (Q11). Wizard does NOT advance. |
| **AC-06** | Phone format invalid | Vendor opens page for first time. | Vendor enters Phone = "12345" (no country code, not E.164), other valid, clicks "Proceed". | Inline error `"Please enter a valid phone number"` [COMMON-026]. |
| **AC-07** | Phone numeric-only | Vendor focuses on Phone Number field. | Vendor types alphabet "abc" or special "@#". | Characters rejected **at keypress** [COMMON-004]; field accepts only digits / leading `+`. |
| **AC-08** | Email duplicate — non-Rejected (Q5) | DB has vendor with Email "existing@example.com" in Pending/Approved/Suspended/Draft state. | Vendor enters Email = "existing@example.com" + valid remaining, clicks "Proceed". | Loading spinner if check > 300ms [COMMON-012]. Inline error `"Email Address already exists"` [COMMON-029]. Wizard does NOT advance. |
| **AC-08b** | Email re-use — Rejected (Q5) | DB has vendor with Email "rejected@example.com" in `Rejected` state. | Vendor enters Email = "rejected@example.com" + valid remaining, clicks "Proceed". | **No duplicate error.** Wizard advances to Step 2. |
| **AC-09** | Store Name duplicate — non-Rejected (Q5) | DB has vendor with Store Name "Tech Hub" in any non-Rejected state. | Vendor enters Store Name = "Tech Hub" + valid remaining, clicks "Proceed". | Inline error `"Store Name already exists"` [COMMON-029]. |
| **AC-09b** | Store Name re-use — Rejected (Q5) | DB has vendor with Store Name "Tech Hub" in `Rejected`. | Vendor enters Store Name = "Tech Hub" + valid remaining, clicks "Proceed". | **No duplicate error.** Wizard advances. |
| **AC-09c** | Phone non-uniqueness (Q6) | DB has vendor with Phone "+94771234567" in any state. | Vendor enters Phone = "+94771234567" + valid remaining, clicks "Proceed". | **No duplicate error.** Wizard advances. |
| **AC-10** | Business + Company Name empty | Vendor selects Business; First/Last Name, Email, Phone, Store Name valid; Company Name empty. | Click "Proceed". | Inline error `"Company Name is required"` [COMMON-025]. |
| **AC-11** | Vendor Type Switch retains Company Name (Q2) | Vendor selects Business, fills First "John", Last "Doe", Company "Tech Hub Ltd". | Vendor switches to Individual then back to Business. | First/Last Name retained. **Company Name "Tech Hub Ltd" still pre-filled** (Q2). |
| **AC-12** | Max-length blocked — First Name | Vendor focuses on First Name. | Vendor pastes 150 chars. | Field accepts only first 100; remaining 50 rejected [COMMON-007, COMMON-009]. |
| **AC-13** | Max-length blocked — Email | Vendor focuses on Email. | Vendor pastes 300 chars. | Field accepts only first 255 [COMMON-001, COMMON-009]. |
| **AC-14** | Store Description optional | Vendor leaves Store Description empty + valid required. | Click "Proceed". | Wizard advances. No error below Store Description. |
| **AC-15** | Char counter realtime | Vendor focuses on Store Description. | Vendor types 50 chars. | Counter "50/500"; deleting 1 → "49/500"; at 500 → "500/500" + input blocked [COMMON-008, COMMON-009]. |
| **AC-16** | Double-submit prevention | Vendor has filled valid form. | Vendor clicks "Proceed" twice rapidly during async. | Second click ignored — button disabled after first [COMMON-015]. One async request. |
| **AC-17** | Loading spinner > 300ms | Server duplicate check takes > 300ms. | Vendor clicks "Proceed" with valid data. | Loading spinner on/near button "Proceed" [COMMON-012]. |
| **AC-18** | Step indicator clickability | Vendor on Step 1, not validated. | Vendor attempts to click Step 2 or Step 3. | Click ignored — Steps 2/3 disabled. |
| **AC-19** | Help → new tab → draft preserved (Q8) | Vendor on Step 1, has filled some fields. | Vendor clicks "Help". | Help opens in **new tab**. Form draft on original tab **fully preserved**. |
| **AC-20** | Login → same tab → discards draft (Q8 + Q16) | Vendor on Step 1, has filled some fields. | Vendor clicks "Login". | Login opens **same tab**. **No confirmation dialog.** Returning to `/register/vendor` → empty form. |
| **AC-21** | Wireframe label compliance | Vendor opens page for first time. | Render check. | All labels **verbatim**: "Register as a Vendor", "Vendor Type", "Individual", "Business", "First Name *", "Last Name *", "Email Address *", "Phone Number *", "Store Name *", "Store Description", "Proceed to Next Step >". Asterisk red on required [COMMON-003]. |
| **AC-22** | Accessibility — labels associated | Vendor uses screen reader. | Screen reader navigates each field. | Each input reads its label [COMMON-048]; each inline error linked via `aria-describedby` [COMMON-051]. **Vendor Type radio group: arrow keys cycle Individual ↔ Business** (Q13 confirmed). |
| **AC-23** | FE-then-server short-circuit (Q11) | DB has vendor with Email "duplicate@example.com" in non-Rejected state. | Vendor enters Email = "duplicate@" (format invalid), clicks "Proceed". | **Only `"Please enter a valid email"`** [COMMON-026]. Server NOT called (Q11). |
| **AC-24** | Session timeout (Q7) | Vendor has filled some fields and is idle for 30 min. | Vendor returns / clicks any control after 30 min. | **No countdown.** **Redirected to landing page.** Draft cleared. Restart wizard. |

---

## 9. Non-functional Requirements

> **BA + PM approved (Q14, 2026-05-07).** All values authoritative for NFR test design.

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance — Page load | Initial load `/register/vendor` ≤ 3 seconds (P95) on 3G connection. | Approved Q14 |
| Performance — Async validation | Duplicate check (Email / Store Name) response time ≤ 2 seconds (P95) on broadband; spinner shown when > 300ms [COMMON-012]. | Approved Q14 + [COMMON-012] |
| Performance — Step navigation | Step 1 → Step 2 navigation ≤ 1 second after validation success. | Approved Q14 |
| Browser compatibility | Latest 2 versions: Chrome, Edge, Safari, Firefox. Mobile Safari iOS 14+; Chrome Android (latest). **IE11 NOT supported.** | Approved Q14 |
| Mobile responsive | Breakpoints: ≥ 1024px desktop two-column; 768–1023px tablet single-column; < 768px mobile single-column. Touch targets ≥ 44 × 44 px. | Approved Q14 (WCAG 2.1) |
| Security — CSRF | All form POST requests include CSRF token. | Approved Q14 |
| Security — Rate limiting | Max 5 "Proceed to Next Step" attempts per IP per minute. Beyond limit: HTTP 429 + retry-after; UI shows `"Too many attempts. Please try again in {N} seconds."` | Approved Q14 |
| Security — CAPTCHA | reCAPTCHA v3 (or equivalent) on public registration form. | Approved Q14 |
| Security — Input sanitization | Server-side sanitize all free-text fields to prevent stored XSS / SQL injection. | Approved Q14 |
| Security — Transport | HTTPS only; HTTP requests redirected to HTTPS. | Approved Q14 |
| Accessibility | (1) aria-label on form fields [COMMON-048]. (2) Color contrast WCAG AA ≥ 4.5:1 [COMMON-046]. (3) Tab/Shift+Tab nav [COMMON-047]. (4) Focus indicator visible [COMMON-050]. (5) Inline errors via `aria-describedby` [COMMON-051]. (6) Vendor Type radio arrow-key navigation (Q13 + Q22). | [COMMON-046 → 051] + Q13 |
| Session | Wizard session timeout 30 min inactivity; **no countdown notification** (Q7); on timeout → redirect to landing + clear draft. | [RULE-070] (overridden per Q7) |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions

> **All 16 questions resolved.** No open blockers. See `..._question-backlog_..._v3.md`.

| # | Question / Issue | Status |
|---|-----------------|--------|
| Q1–Q12 | (See v1 backlog) | All Resolved (2026-05-07) |
| Q13–Q16 | (See v2 backlog) | All Resolved (2026-05-07) |

### 10.2 Dependencies

- **UC-VOB-002 (Upload Documents)** — next step; Vendor Type at Step 1 determines required KYC document set; cross-references green checkmark completed-state pattern (UC-VOB-002 SC-02A #1).
- **UC-VOB-003 (Accept Vendor Agreement)** — downstream RULE-002.
- **UC-VOB-004 (Validate Registration Submission)** — downstream; email OTP (QA-021), backend aggregated validation (RULE-071), vendor record creation in `Pending` state.
- **`docs/BA/common/common-rules.md`** — verbatim text for COMMON rules referenced.
- **`docs/BA/common/requirement-traceability.md`** — verbatim text for BR-023, RULE-002, RULE-070, RULE-071.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-07 | qc-uc-read | Initial first audit. Score 70.0/100 → CONDITIONALLY READY. 12 open questions. *(Vietnamese-narrative draft — superseded by v2 English version per project language rule.)* |
| v2 | 2026-05-07 | qc-uc-read | Re-audit after BA answered Q1–Q12. Score 87.7/100 → CONDITIONALLY READY. 4 new questions Q13–Q16. English version. |
| v3 | 2026-05-07 | qc-uc-read | **Re-audit after BA answered Q13–Q16.** Integrated: Vendor Type design will render proper radio circles (Q13), NFR formally approved (Q14), Logo/Title/Counter test scope = visibility-only (Q15), Login no-warning is UC-specific decision (Q16). Score 87.7 → **92.3/100 → READY**. **No open questions.** |

---

## Audit Summary

| #   | Knowledge Area                           | Max Pts | v1 | v2 | v3 | v3 Status |
| --- | ---------------------------------------- | ------- | -- | -- | -- | --------- |
| 1   | Feature Identity                         | 5       | 5  | 5  | 5/5     | ✅ Complete |
| 2   | Objective & Scope                        | 5       | 4  | 4  | 4/5     | ⚡ Partial *(BA chose to skip explicit Out-of-Scope — Q12)* |
| 3   | Actors & User Roles                      | 10      | 8  | 8  | 8/10    | ⚡ Partial *(no explicit RBAC for anonymous user)* |
| 4   | Preconditions & Postconditions           | 10      | 10 | 10 | 10/10   | ✅ Complete |
| 5   | UI Object Inventory & Mapping            | 15      | 9  | 10 | 12/15   | ⚡ Partial *(Q13 resolves rendering; Logo/Title/Counter design pending — Q15 visibility-only scope)* |
| 6   | Object Attributes & Behavior Definition  | 20      | 17 | 19 | 20/20   | ✅ Complete *(Q13 clarifies radio interaction matrix)* |
| 7   | Functional Logic & Workflow Decomposition | 20      | 17 | 19 | 19/20   | ✅ Mostly Complete *(server error fallback still implicit)* |
| 8   | Functional Integration Analysis          | 20      | 13 | 17 | 18/20   | ✅ Mostly Complete *(Q16 documents COMMON-014 scope)* |
| 9   | Acceptance Criteria                      | 20      | 6  | 18 | 19/20   | ✅ Mostly Complete *(24 BA-approved AC stable baseline)* |
| 10  | Non-functional Requirements              | 5       | 2  | 4  | 5/5     | ✅ Complete *(Q14 BA + PM approved)* |
| **Total** |                                    | **130** | 91 | 114 | **120/130** | **92.3 / 100 → ✅ READY** |

**Normalization:** `round((120 / 130) × 100, 1) = 92.3`

**Auto-fail check:** No Critical area (#1–#9) scored 0 → no auto-fail.

---

## Unified Gap & Question Report

| ID | Priority | Status | Resolution Summary |
|----|----------|--------|--------------------|
| Q1–Q12 | Various | **All Resolved** (2026-05-07) | See v1 backlog answered table. |
| Q13 | Medium | **Resolved** (2026-05-07) | Design will be updated to render actual radio circles. Vendor Type interaction = arrow-key navigation per radio standard. |
| Q14 | Medium | **Resolved** (2026-05-07) | BA + PM approved NFR baseline (perf SLAs, browser matrix, mobile, security). NFR test design unblocked. |
| Q15 | Low | **Resolved** (2026-05-07) | Test scope for Logo / Page Title / Char Counter = visibility-only checks. Deeper visual states out of scope until design provided. |
| Q16 | Low | **Resolved** (2026-05-07) | UC-specific decision: follow BA Q8 answer for UC-VOB-001 only. Login navigates same-tab and discards draft without dialog. COMMON-014 NOT overridden globally. |

---

## 🟢 What's Good

- **All 16 questions resolved across 3 audit cycles** in a single day (2026-05-07) — exceptional BA + Design + PM responsiveness.
- **24 stable AC** approved as baseline, covering all 5 happy paths + 19 alternative / error / edge / accessibility scenarios.
- **NFR formally signed off** — perf SLA, browser matrix, mobile breakpoints, security policies all approved values.
- **Cross-step traceability solid** — Vendor Type → KYC document set on Step 2; Step 1 completed-state cross-referenced from UC-VOB-002 SC-02A #1.
- **Decisive BA decisions** rather than deferral: Phone non-uniqueness, no session-timeout countdown, Login no-warning, Out-of-Scope skipped — all clear, all testable.
- **Common Rule expansion** done — no bare COMMON codes in audit; all error messages verbatim available for tester's Expected Result column.

---

## 🧪 Testability Outlook

**Full coverage achievable now:**

- All field-level validation: required, format (RFC 5322 / E.164), max-length, numeric-only Phone.
- Required-field-empty errors verbatim from COMMON-025.
- Email/Store Name duplicate WITH scope rule (excluding Rejected vendors) — AC-08, AC-08b, AC-09, AC-09b.
- Phone Number non-uniqueness — AC-09c.
- Vendor Type switch retain INCLUDING Company Name — AC-11.
- Happy paths Individual + Business — AC-01, AC-02.
- Anti-double-submit — AC-16.
- Loading spinner > 300ms — AC-17.
- Char counter realtime — AC-15.
- Step indicator transitions (active → green checkmark) — AC-01, AC-18.
- Max-length input blocked — AC-12, AC-13.
- Email FE/server short-circuit — AC-23.
- Session timeout no-countdown + redirect + clear draft — AC-24.
- Help new-tab preserves draft — AC-19.
- Login same-tab discards draft (no warning) — AC-20.
- Wireframe label compliance — AC-21.
- Accessibility (aria, arrow keys for Vendor Type radio) — AC-22.
- NFR (perf, browser matrix, mobile, security) — full NFR test plan can be designed and executed.

**Partial coverage (visibility-only per Q15):**

- Logo "MultiVendor Platform" — exists, top-left.
- Page title "Register as a Vendor" — exists, H1.
- Character Counter near-limit color states — out of scope until design provided.

**Suggested test focus areas:**

- **Happy path:** AC-01 (Individual), AC-02 (Business), AC-14 (optional Store Description).
- **Vendor Type interactions:** AC-11 (switch retain), AC-22 (radio arrow-key navigation).
- **Validation negative tests:** AC-03/04 (empty), AC-05/06 (format), AC-08/09 (duplicate scope), AC-10 (Business empty), AC-23 (short-circuit edge case).
- **State persistence:** AC-19 (Help preserves), AC-20 (Login discards), AC-24 (timeout clears).
- **Boundary:** AC-12/13 (max-length), AC-15 (char counter realtime).
- **Concurrency / UX:** AC-16 (double-submit), AC-17 (loading spinner).
- **Cross-step integration:** Vendor Type → KYC document set on Step 2 (mock UC-VOB-002 boundary), Back-from-Step-2 retains data, session timeout cross-step impact.
- **NFR plan:** load test 5 attempts/IP/min throttle + 429 response, browser matrix execution, mobile breakpoint visual checks, reCAPTCHA, HTTPS-only, CSRF token, XSS payload sanitization.

---

## 📌 Summary & Recommendation

UC-VOB-001 reaches **READY (92.3 / 100)** in v3 audit. All 16 questions raised across the v1 → v2 → v3 cycle are resolved. 24 BA-approved AC + a fully signed-off NFR baseline make the UC fully test-designable end-to-end. Remaining minor caps in Section 5 (Logo / Page Title / Character Counter design pending) are explicitly accepted with visibility-only test scope per Q15 — no further BA action required to proceed with test design.

**Recommendation:** **Proceed immediately to test scenario / test case design** (qc-func-scenario-design and/or qc-func-tc-design downstream skills). No further BA clarification required for QA to author the full functional + NFR test plan.

---

*UC Readiness Review — qc-uc-read v3 audit of UC-VOB-001 (UC source revision 2026-04-13). Generated 2026-05-07. Supersedes v1 and v2.*
