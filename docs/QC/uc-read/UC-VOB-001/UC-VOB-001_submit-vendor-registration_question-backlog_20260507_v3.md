---
title: Question Backlog — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-uc-read (chris.le3@basao.com)
version: v3
linked-audit: UC-VOB-001_submit-vendor-registration_audited_20260507_v3.md
supersedes: UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v2.md
total-questions: 16 (all resolved)
priority-breakdown-open: NONE — all closed
---

# Question Backlog — UC-VOB-001 Submit Vendor Registration (v3 — FINAL)

> **Status:** ✅ All 16 questions resolved across 3 audit cycles. No open items. Backlog closed for UC-VOB-001 v1 source.
> **History:** v1 → 12 questions (Q1–Q12) → BA answered all on 2026-05-07. v2 → 4 new questions (Q13–Q16) → BA + Design + PM answered all on 2026-05-07. v3 → no new questions; backlog closed.

---

## Question Index

### Open Questions

**(none — all 16 resolved)**

### Resolved Questions (16)

| ID | Priority | Topic | Resolved Date | Source | Audit version that integrated answer |
|----|----------|-------|---------------|--------|--------------------------------------|
| Q1 | High | Vendor Type render: Radio vs Tab (control type) | 2026-05-07 | BA | v2 |
| Q2 | High | Company Name retain on Business → Individual switch | 2026-05-07 | BA | v2 |
| Q3 | High | Acceptance Criteria approval | 2026-05-07 | BA | v2 |
| Q4 | High | NFR section delegation | 2026-05-07 | BA | v2 (proposal); v3 (formal approval via Q14) |
| Q5 | Medium | Server-side uniqueness scope | 2026-05-07 | BA | v2 |
| Q6 | Medium | Phone Number uniqueness | 2026-05-07 | BA | v2 |
| Q7 | Medium | Wizard session timeout behavior | 2026-05-07 | BA | v2 |
| Q8 | Medium | Help/Login link unsaved-changes behavior | 2026-05-07 | BA | v2 |
| Q9 | Low | Logo/Page Title/Char counter UI element rows | 2026-05-07 | BA | v2 (deferred); v3 (test scope finalized via Q15) |
| Q10 | Low | Step 1 indicator completed visual state | 2026-05-07 | BA + cross-ref UC-VOB-002 | v2 |
| Q11 | Low | Email format invalid + duplicate error precedence | 2026-05-07 | BA | v2 |
| Q12 | Low | Out-of-Scope section in UC source | 2026-05-07 | BA | v2 |
| Q13 | Medium | Vendor Type design rendering: radio circles vs. tab/text-link | 2026-05-07 | Design | v3 |
| Q14 | Medium | NFR formal approval | 2026-05-07 | BA | v3 |
| Q15 | Low | Design pending for Logo, Page Title, Character Counter | 2026-05-07 | Design | v3 |
| Q16 | Low | Login discards draft no warning — COMMON-014 scope | 2026-05-07 | BA | v3 |

---

# Resolved Questions (Detail) — v2 batch (Q13–Q16)

## Q13 — Vendor Type design rendering: radio circles vs. tab/text-link

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #2 *"Vendor Type — Type: Radio Button Group"*; design `image copy.png` shows tab/text-link styling. Q1 BA-confirmed control type = radio button. |
| **Question** | Will design be updated to render actual radio circles, or keep tab/text-link visual with `role=radio` underneath? |
| **Owner** | Design + BA |
| **Status** | **Resolved** |
| **Answer** | Design will be updated to render actual radio circles. |
| **Source** | Design |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v3 audit** | Section 4 #9/#10 (control type clarified), Section 5 #9/#10 (arrow-key navigation per radio standard), AC-22 (accessibility — arrow-key cycle Individual ↔ Business). Removes the v2 design-spec rendering inconsistency. |

---

## Q14 — NFR formal approval

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | Q4 BA answer "Hãy đề xuất nhé"; v2 audit §9 contains qc-uc-read's proposed NFR baseline (perf SLAs, browser matrix, mobile breakpoints, security policies). |
| **Question** | BA + PM approve the NFR proposal in v2 audit §9, or revise? |
| **Owner** | BA + PM |
| **Status** | **Resolved** |
| **Answer** | Approved. |
| **Source** | BA |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v3 audit** | Section 9 — all NFR values marked as **BA + PM approved**. NFR test design (perf, cross-browser, mobile, rate-limit/CAPTCHA, CSRF, sanitization, HTTPS) fully unblocked. |

---

## Q15 — Design pending for Logo, Page Title, Character Counter

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | Q9 BA answer: "Hiện chưa có design cho phần này." Affected: Logo "MultiVendor Platform", Page Title "Register as a Vendor", Character Counter "0/500". |
| **Question** | When is design ready? Until then, defer related test scenarios or write basic visibility-only checks? |
| **Owner** | Design |
| **Status** | **Resolved** |
| **Answer** | written as basic visibility-only checks |
| **Source** | Design |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v3 audit** | Section 4 #1/#4/#18 marked "Design pending — visibility-only test per Q15". Section 5 #1/#4/#18 same. Counter color-state near limit explicitly out of scope until design provided. AC list does not require boundary-color tests for the counter. |

---

## Q16 — Login discards draft no warning — COMMON-014 scope

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | Q8 BA answer: "Click Login thì sẽ mất." COMMON-014: "Confirmation dialog required before any destructive or decisive action (delete, archive, suspend, approve, reject)". |
| **Question** | Is the no-dialog Login behavior an explicit override of COMMON-014, or is COMMON-014 narrowly scoped (does not extend to navigation-induced data loss)? |
| **Owner** | BA |
| **Status** | **Resolved** |
| **Answer** | Follow the BA answered for this UC only. → **UC-specific decision**. UC-VOB-001 follows BA's Q8 answer (Login discards draft, no dialog). COMMON-014 is **NOT overridden globally**; the rule's scope (delete/archive/suspend/approve/reject) is unchanged for other UCs. |
| **Source** | BA |
| **Resolved Date** | 2026-05-07 |
| **Integrated into v3 audit** | Section 4 #3 + Section 5 #3 + Section 7 (Login row) + AC-20 — all annotate "UC-specific decision per Q16". COMMON-014 scope clarification is logged for downstream UC reviewers (e.g., UC-VOB-002, UC-VOB-003 may have similar Help/Login links — each UC must make its own scope call; do NOT assume Q16 generalizes). |

---

# Resolved Questions (Detail) — v1 batch (Q1–Q12)

> Full Q1–Q12 detail preserved in `..._question-backlog_..._v1.md` (immutable). Summary below for v3 reference.

## Q1 — Vendor Type render (control type)

- **Answer:** radio button (BA, 2026-05-07).
- **Follow-up:** Q13 (design rendering) → also resolved.

## Q2 — Company Name retain on switch

- **Answer:** Company Name value is **retained**, not cleared, when switching Business → Individual (BA, 2026-05-07).
- **Integrated into:** AC-11.

## Q3 — Acceptance Criteria approval

- **Answer:** BA approves the 22 AC derived in v1 audit Section 8 as baseline (BA, 2026-05-07).
- **Integrated into:** v2 audit Section 8 (expanded to 24 AC).

## Q4 — NFR section delegation

- **Answer:** "Hãy đề xuất nhé" (delegated to qc-uc-read; BA, 2026-05-07).
- **Follow-up:** Q14 (formal approval) → also resolved.

## Q5 — Server-side uniqueness scope

- **Answer:** Check all states **except `Rejected`** (BA, 2026-05-07).
- **Integrated into:** AC-08, AC-08b, AC-09, AC-09b.

## Q6 — Phone Number uniqueness

- **Answer:** **No** uniqueness check on Phone Number (BA, 2026-05-07).
- **Integrated into:** AC-09c.

## Q7 — Wizard session timeout

- **Answer:** No countdown notification; on timeout → redirect to landing page; clear all draft data (BA, 2026-05-07).
- **Integrated into:** AC-24. Local override of RULE-070 "notify before/at timeout" sub-clause.

## Q8 — Help/Login unsaved-changes

- **Answer:** Help opens new tab → draft preserved on original tab. Login same-tab → draft lost, no confirmation dialog (BA, 2026-05-07).
- **Integrated into:** AC-19, AC-20.
- **Follow-up:** Q16 (COMMON-014 scope) → also resolved.

## Q9 — Logo/Page Title/Char counter element rows

- **Answer:** No design yet for these elements (BA, 2026-05-07).
- **Follow-up:** Q15 (test scope) → also resolved.

## Q10 — Step 1 completed visual state

- **Answer:** Cross-ref UC-VOB-002 §2 SC-02A #1 → completed = green checkmark (BA, 2026-05-07).
- **Integrated into:** AC-01, Section 3.2 Postconditions.

## Q11 — Email format invalid + duplicate precedence

- **Answer:** FE format check first; server uniqueness only when format passes (BA, 2026-05-07).
- **Integrated into:** AC-23.

## Q12 — Out-of-Scope section

- **Answer:** Skip — BA chose NOT to add Out-of-Scope section (BA, 2026-05-07).
- **Integrated into:** Section 1.3 inferred-only with disclaimer.

---

## Changelog

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-07 | qc-uc-read | Initial backlog. 12 open questions (4H/4M/4L). |
| v2 | 2026-05-07 | qc-uc-read | Q1–Q12 resolved. 4 new questions Q13–Q16 (2M/2L). English version. |
| v3 | 2026-05-07 | qc-uc-read | Q13–Q16 resolved. **All 16 questions closed.** Backlog finalized for UC-VOB-001 v1 source. |

---

> **Next steps:** UC-VOB-001 audit reached READY (92.3/100, v3). Backlog closed. Downstream skills (`qc-func-scenario-design`, `qc-func-tc-design`) can proceed without further BA clarification.
