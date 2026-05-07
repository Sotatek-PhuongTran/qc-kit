---
title: Question Backlog — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-uc-read (chris.le3@basao.com)
version: v2
linked-audit: UC-VOB-001_submit-vendor-registration_audited_20260507_v2.md
supersedes: UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v1.md
total-questions: 16 (12 resolved + 4 open)
priority-breakdown-open: Medium=2, Low=2
---

# Question Backlog — UC-VOB-001 Submit Vendor Registration (v2)

> **Purpose:** Tracks all clarification questions raised by qc-uc-read against UC-VOB-001. v2 captures BA's resolutions of Q1–Q12 (from v1) and adds 4 new questions Q13–Q16 that arose from those answers.
> **Workflow:** When BA answers a new question → fill `Answer` + `Source` + `Resolved Date`, set `Status = Resolved`, move row to "Resolved Questions" section. When all open questions are resolved → re-trigger `/qc-uc-read` for re-audit (will produce `_v3.md`).

---

## Question Index

### Open Questions (4)

| ID | Priority | Topic | Owner | Status |
|----|----------|-------|-------|--------|
| Q13 | Medium | Vendor Type design rendering: radio circles vs. tab/text-link style | Design + BA | Open |
| Q14 | Medium | NFR formal approval (perf, browser matrix, mobile, security) | BA + PM | Open |
| Q15 | Low | Design pending for Logo, Page Title, Character Counter | Design | Open |
| Q16 | Low | Login discards draft with no warning — confirm override of COMMON-014 scope | BA | Open |

### Resolved Questions (12)

| ID | Priority | Topic | Resolved Date | Status |
|----|----------|-------|---------------|--------|
| Q1 | High | Vendor Type render: Radio vs Tab (control type) | 2026-05-07 | Resolved |
| Q2 | High | Company Name retain on Business → Individual switch | 2026-05-07 | Resolved |
| Q3 | High | Acceptance Criteria approval | 2026-05-07 | Resolved |
| Q4 | High | NFR section delegation | 2026-05-07 | Resolved (delegated to qc-uc-read; formal approval → Q14) |
| Q5 | Medium | Server-side uniqueness scope | 2026-05-07 | Resolved |
| Q6 | Medium | Phone Number uniqueness | 2026-05-07 | Resolved |
| Q7 | Medium | Wizard session timeout behavior | 2026-05-07 | Resolved |
| Q8 | Medium | Help/Login link unsaved-changes behavior | 2026-05-07 | Resolved (Login no-warning → Q16) |
| Q9 | Low | Logo/Page Title/Char counter UI element rows | 2026-05-07 | Resolved (deferred → Q15) |
| Q10 | Low | Step 1 indicator completed visual state | 2026-05-07 | Resolved |
| Q11 | Low | Email format invalid + duplicate error precedence | 2026-05-07 | Resolved |
| Q12 | Low | Out-of-Scope section in UC source | 2026-05-07 | Resolved (won't be added) |

---

# Open Questions (Detail)

## Q13 — Vendor Type design rendering: radio circles vs. tab/text-link style

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #2 *"Vendor Type — Type: Radio Button Group"*; design `image copy.png` (renders Vendor Type as text "Individual" with underline + text "Business" without underline — **no visible radio circle**). Q1 BA confirmation: *"radio button"* (control type). |
| **Question** | BA confirmed the underlying control type = radio button. However, the current design rendering in `image copy.png` shows tab/text-link styling (no radio circles). Will the **design be updated** to render actual radio circles (consistent with `role=radio` semantics), or will the current visual style be kept with a custom radio control underneath? Decision affects: (a) UI test selector pattern (CSS class `.radio` vs. `[role=tab]`), (b) accessibility role assertions (screen reader announces "radio" vs. "tab"), (c) keyboard interaction (radio: arrow keys cycle options; tab: Tab key + Enter). |
| **Why It Matters** | Design rendering and ARIA role MUST agree before tester can finalize UI assertions for AC-02, AC-10, AC-11, AC-22. If the underlying control is radio but the visual is tab-style, tester needs unambiguous spec on which keyboard interaction is supported (otherwise accessibility tests will be ambiguous). |
| **Owner** | Design + BA |
| **Status** | Open |
| **Answer** | Design will be updated to render actual radio circles. |
| **Source** | Design |
| **Resolved Date** | 2026-05-07 |

---

## Q14 — NFR formal approval (perf, browser matrix, mobile, security)

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | Q4 BA answer: *"Hãy đề xuất nhé"* (please propose). Audit v2 §9 contains qc-uc-read's proposed NFR baseline. |
| **Question** | BA review and approve the NFR proposal in audit v2 §9, or provide concrete revisions. Specifically: (a) Performance SLAs — page load ≤ 3s on 3G, duplicate check ≤ 2s P95, navigation ≤ 1s. (b) Browser matrix — Chrome / Edge / Safari / Firefox latest 2 + Mobile Safari iOS 14+ + Chrome Android (latest); IE11 NOT supported. (c) Mobile breakpoints — ≥1024 desktop, 768-1023 tablet, <768 mobile; touch targets ≥ 44×44px. (d) Security — CSRF token, rate-limit 5/IP/min on Proceed click, reCAPTCHA v3 on form, server-side input sanitization, HTTPS-only with HTTP→HTTPS redirect. |
| **Why It Matters** | NFR-specific test cases (perf load tests, cross-browser matrix execution, mobile device labs, rate-limit/CAPTCHA validation) cannot be authored or scoped without formal approval. Risk: if proposed values are too lenient or too strict, tests will either miss real perf regressions or be falsely failing. |
| **Owner** | BA + PM |
| **Status** | Open |
| **Answer** | Approved |
| **Source** | BA |
| **Resolved Date** | 2026-05-07 |

---

## Q15 — Design pending for Logo, Page Title, Character Counter

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | Q9 BA answer: *"Hiện chưa có design cho phần này"* (No design yet for this part). Affected elements: Logo "MultiVendor Platform" (header brand), Page Title "Register as a Vendor" (H1), Character Counter "0/500" (Store Description bottom-right corner). |
| **Question** | (a) When will design specs (mockup + behavior spec) for the three elements be delivered? (b) Until design is provided, should test scenarios for these elements be **deferred** (not written), or written as basic visibility-only checks based on the current `image copy.png` rendering? (c) Specifically for Character Counter: any spec on color-state near the limit (e.g., counter turns red at 480-500), or simply remains black throughout? (d) Logo click behavior — navigate to landing page or no-op? |
| **Why It Matters** | Element coverage incomplete in UC §2 element table. Without design, tester cannot validate intended visual states (counter color, focus indicator on counter, hover behavior on logo) or click outcomes. Risk: post-launch UI bugs that QA could not catch because spec was missing. |
| **Owner** | Design |
| **Status** | Open |
| **Answer** | written as basic visibility-only checks |
| **Source** | Design |
| **Resolved Date** | 2026-05-07 |

---

## Q16 — Login discards draft with no warning — confirm override of COMMON-014 scope

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | Q8 BA answer: *"Click Help mở new tab nên draft còn nguyên. Click Login thì sẽ mất."* COMMON-014 (`common-rules.md`): *"Confirmation dialog required before any destructive or decisive action (delete, archive, suspend, approve, reject)"*. |
| **Question** | Q8 confirmed that clicking "Login" navigates same-tab and discards all draft data without showing any confirmation dialog. To prevent future regressions / spec re-litigation, please clarify: (a) Is this an **explicit override** of COMMON-014 for this UC? (BA decision wins over global rule.) Or (b) is COMMON-014 intentionally scoped narrowly to "delete/archive/suspend/approve/reject" actions and does NOT extend to navigation-induced data loss in general? Recommend documenting the chosen interpretation in either the UC or `common-rules.md` for clarity. |
| **Why It Matters** | (1) Prevents a future code reviewer or QA tester from filing "missing confirmation dialog on Login" as a bug. (2) Sets precedent for similar links in other UCs (e.g., Help links on Step 2/3, navigation-link-then-data-loss in any wizard). (3) UX consideration: the discard-without-warning behavior is opinionated; documenting the rationale prevents "drift" if a future stakeholder pushes back. |
| **Owner** | BA |
| **Status** | Open |
| **Answer** | Follow the BA answered for this UC only |
| **Source** | *(awaiting BA)* |
| **Resolved Date** | *(awaiting BA)* |

---

# Resolved Questions (Detail)

## Q1 — Vendor Type render: Radio vs Tab (control type)

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | UC §2 #2 *"Vendor Type — Type: Radio Button Group"*; design `image copy.png` shows Vendor Type as text "Individual" (underlined) + text "Business" (plain) — no radio circles visible. |
| **Question** | Will Vendor Type's actual UI rendering be a **radio button** (per spec) or a **tab/text-link** (per design)? |
| **Owner** | BA + Design |
| **Status** | **Resolved** |
| **Answer** | radio button |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Follow-up** | Design rendering inconsistency persists → tracked as new **Q13** in this v2 backlog. |

---

## Q2 — Company Name retain on Business → Individual switch

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | UC §1 Alternative Flow `[Vendor Type Switch]` only describes Individual → Business direction. |
| **Question** | When vendor switches Business → Individual after entering Company Name: is the value **cleared**, **retained in state**, or **forced to be re-entered** if vendor switches back to Business? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | "Behavior cho các step đều là nếu trống required fields thì không thể step forward, trong case Company name đã được fill rồi thì không được clear." → **Company Name value is retained** (not cleared) when switching Business → Individual; if vendor switches back to Business, the previously entered Company Name is preserved. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 5 #13 (Object Behavior), Section 6.2 step 2, AC-11. |

---

## Q3 — Acceptance Criteria approval

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | Source UC has no explicit "Acceptance Criteria" section. v1 audit Section 8 derived 22 AC from flow + validation summary. |
| **Question** | (a) Will BA add an explicit AC section (Given/When/Then) to UC v2? (b) Or does BA approve the 22 AC derived by qc-uc-read in audit v1 Section 8 as the baseline for test case design? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | "Approve các AC mà qc-uc-read đã generate." → BA approves the 22 v1 AC as the baseline. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 8 (24 AC total: 22 from v1 + AC-08b/09b/09c/23/24 added in v2 to cover newly resolved scenarios from Q5/Q6/Q11/Q7). |

---

## Q4 — NFR section delegation

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | Source UC has no NFR section; only implicit references via COMMON rules. |
| **Question** | BA + PM provide concrete NFR values: (a) perf SLAs, (b) browser matrix, (c) mobile responsive breakpoints, (d) security policy. |
| **Owner** | BA + PM |
| **Status** | **Resolved (delegated)** |
| **Answer** | "Hãy đề xuất nhé" (please propose). |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Follow-up** | qc-uc-read proposed industry-standard NFR baseline in audit v2 §9. **Formal BA approval still required** → tracked as new **Q14**. |

---

## Q5 — Server-side uniqueness scope

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #6 Email + #8 Store Name mention server-side uniqueness check but do not specify scope. |
| **Question** | Server uniqueness check applies to which vendor states? (a) Approved only? (b) Includes Pending? (c) Includes Rejected (vendors previously rejected re-registering with same Email/Store Name)? (d) Includes Suspended / Draft? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | "Check tất cả ngoại trừ vendor đã bị rejected." → **Check all states except `Rejected`.** Previously-rejected vendors can re-register with the same Email or Store Name. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 5 #14/#16 (Object Behavior), Section 6.1.B Validation rules, Section 7 Integration, AC-08, AC-08b, AC-09, AC-09b. |

---

## Q6 — Phone Number uniqueness

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #7 Phone Number does not mention uniqueness; UC §2 #6 Email + #8 Store Name explicitly do. |
| **Question** | Does Phone Number have a server-side uniqueness check? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | "không check" → **No uniqueness check** on Phone Number. Same Phone Number may appear on multiple vendor accounts. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 5 #15, Section 6.1.B, Section 7 Integration, AC-09c (negative test confirming Phone non-uniqueness). |

---

## Q7 — Wizard session timeout behavior

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | RULE-070: *"Registration wizard session must time out after inactivity; recommended inactivity window is 30–60 minutes; vendor must be notified before/at timeout"*. UC-VOB-001 source does not detail notify behavior. |
| **Question** | (a) Notify behavior pre-timeout — toast, modal countdown, banner? (b) On expiry: redirect, modal, or stay-with-empty-form? (c) Draft data persistence — lost or recoverable (localStorage / recovery email)? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | "Không có behaivior cho việc countdown, vendor sẽ bị redirect về landing page và các draft data sẽ bị xóa." → (a) **No countdown notification.** (b) On timeout: vendor **redirected to landing page**. (c) **All draft data cleared.** Note: this overrides RULE-070's "notify before/at timeout" sub-clause for this UC. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 3.2 Postconditions, Section 6.1.A step 6, Section 7 Integration, AC-24. ⚠️ Potential conflict with UC-VOB-002 alt-flow `[Session Timeout]` ("system notifies vendor before session expiry") — flagged as warning in audit v2 Section 7. |

---

## Q8 — Help/Login link unsaved-changes behavior

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #11 Help Link *"new tab"*; UC §2 #12 Login Link *"vendor login page"* — neither mentions unsaved-changes warning. |
| **Question** | (a) Help opens new tab → verify draft preserved on original tab. (b) Login same-tab → confirmation dialog before discarding draft? |
| **Owner** | BA + UX |
| **Status** | **Resolved** |
| **Answer** | "Click Help mở new tab nên draft còn nguyê. Click Login thì sẽ mất." → (a) **Help: new tab → draft preserved.** (b) **Login: same-tab navigation → draft lost, no confirmation dialog.** |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 5 #2/#3, Section 7 Integration, AC-19 (Help preserves), AC-20 (Login discards). |
| **Follow-up** | Login no-warning behavior potentially conflicts with COMMON-014 scope → tracked as new **Q16**. |

---

## Q9 — Logo/Page Title/Char counter UI element rows

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | `image copy.png` shows Logo "MultiVendor Platform" + Page title "Register as a Vendor" + Character counter "0/500"; UC §2 element table (12 rows) does not have dedicated rows for any of the three. |
| **Question** | Add 3 rows to UC §2 element table in UC v2 (full element coverage), or confirm that prose layout-overview is sufficient for QA? |
| **Owner** | BA |
| **Status** | **Resolved (deferred)** |
| **Answer** | "Hiện chưa có design cho phần này" → No design available yet for these elements. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 4 #1 (Logo), #4 (Page Title), #18 (Char counter) added based on `image copy.png` rendering only; flagged as "design pending". |
| **Follow-up** | When design is ready → tracked as new **Q15**. |

---

## Q10 — Step 1 indicator completed visual state

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | UC §2 #1 only describes Step Progress Indicator in two states: active (filled black) + disabled (grey). Completed state not described. |
| **Question** | After Step 1 passes and wizard advances to Step 2, what is Step 1 indicator's visual state? |
| **Owner** | Design |
| **Status** | **Resolved** |
| **Answer** | "đã được vẽ ở UC-VOB-002" → Cross-reference UC-VOB-002. Confirmed in UC-VOB-002 §2 SC-02A element #1 *"Step 1 'Basic Details' shows a green checkmark indicating completion"*. → Completed state = **green checkmark.** |
| **Source** | BA answer in v1 backlog (2026-05-07); cross-ref UC-VOB-002.md |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 3.2 Postconditions, Section 5 #5, AC-01. |

---

## Q11 — Email format invalid + duplicate error precedence

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | UC §2 #6 Email — 3-tier validation (required → format → uniqueness). UC does not specify precedence when both format and uniqueness would fail. |
| **Question** | When Email format is invalid AND would also be a server-side duplicate: (a) short-circuit (only format error shown, server not called), (b) both errors shown, (c) only duplicate? |
| **Owner** | BA + Dev |
| **Status** | **Resolved** |
| **Answer** | "check FE trước server sau" → **(a) Short-circuit:** client-side format check first; server-side uniqueness check only invoked when format passes. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 5 #14, Section 6.1.A step 4 (Exception flow), Section 6.1.B (Validation precedence note), AC-23 (negative test confirming short-circuit). |

---

## Q12 — Out-of-Scope section in UC source

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | UC §1 has only in-scope user-story; no explicit Out-of-Scope statement. |
| **Question** | Add explicit "Out of Scope" section to UC v2 (recommend listing OTP verification, password creation, vendor record creation, document upload, vendor agreement)? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | "skip" → BA chose **NOT** to add Out-of-Scope section. |
| **Source** | BA answer in v1 backlog (2026-05-07) |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v2 audit** | Section 1.3 marked as ⚡ Partial; out-of-scope items inferred from cross-references and listed for tester reference only (non-authoritative). |

---

## Changelog

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-07 | qc-uc-read (chris.le3@basao.com) | Initial backlog from first audit. 12 questions: 4 High + 4 Medium + 4 Low. All status = Open. |
| v2 | 2026-05-07 | qc-uc-read (chris.le3@basao.com) | All 12 v1 questions answered by BA on 2026-05-07 → moved to "Resolved Questions" section. Re-audit raised 4 new questions Q13–Q16 (2 Medium + 2 Low) covering: design rendering of Vendor Type radio (Q13), NFR formal approval (Q14), pending design for Logo/Title/Counter (Q15), COMMON-014 scope override for Login navigation (Q16). v2 audit score: 87.7/100 → CONDITIONALLY READY. **English-language version per project rule (replaces Vietnamese-narrative v1 which was a language-rule violation).** |

---

> **Next steps:**
> 1. BA / Design / PM open Q13–Q16, fill Answer + Source + Resolved Date, change Status to Resolved.
> 2. When all v2 open questions = Resolved → re-trigger `/qc-uc-read` to run Re-audit workflow → produces `_v3` audit + `_v3` backlog.
> 3. Any new question raised in v3 audit → append to `..._question-backlog_<DATE>_v3.md` (this v2 file remains immutable).
