---
title: Test Cases Summary — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-func-tc-design (chris.le3@basao.com)
version: v1
linked-uc-audit: docs/QC/uc-read/UC-VOB-001/UC-VOB-001_submit-vendor-registration_audited_20260507_v3.md
linked-backlog: docs/QC/uc-read/UC-VOB-001/UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v3.md
---

## ✅ Test Design Complete

| Artifact | File | Count |
|---|---|---|
| Test Cases (xlsx) | `UC-VOB-001_submit-vendor-registration_testcases_20260507_v1.xlsx` | 56 cases (24 GUI / 32 FUNC) |
| Test Cases (draft md) | `UC-VOB-001_submit-vendor-registration_testcases_draft.md` | Source format for converter |
| Test Cases Summary | `UC-VOB-001_submit-vendor-registration_testcases_summary_20260507_v1.md` | This file |

**Generation source:** UC audit v3 (READY 92.3/100), 24 BA-approved AC.
**Sheet written to:** `GUI` sheet of `Testcase_template.xlsx` (project's only available template; the legacy template separates GUI/FUNC sheets but the qc-func-tc-design rules require a unified sheet — both GUI + FUNC test cases are written to the `GUI` sheet, separated by section header rows per the workflow).
**Output language:** English (per source-input language rule — UC source is English).

---

## Test Case Distribution

### GUI section (24 cases, TC_001–TC_024)

| Bucket | TC range | Count | Coverage |
|---|---|---|---|
| 1. Screen Initialization | TC_001 – TC_005 | 5 | First-load render, Step Progress default state, Vendor Type default, required-field default state, Company Name hidden default. |
| 2. Item Interactions | TC_006 – TC_013 | 8 | Vendor Type click Business/Individual, Help link new tab, Login link same tab, Step 2/3 not clickable, First Name input clickability, Phone numeric-only on keypress, Store Description char counter realtime. |
| 3. Common UI cases | TC_014 – TC_021 | 8 | F5 refresh, browser Back / Forward, Tab/Shift+Tab navigation, Vendor Type radio arrow-key, Enter key, Backspace key, zoom in/out. |
| 4. UI elements verify | TC_022 – TC_024 | 3 | Wireframe label compliance verbatim, responsive at 3 breakpoints, message consistency. |

### FUNC section (32 cases, TC_025–TC_056)

| Bucket | TC range | Count | Coverage |
|---|---|---|---|
| Happy path | TC_025 – TC_027 | 3 | Individual happy path, Business happy path, optional Store Description omitted. |
| Vendor Type Switch | TC_028 | 1 | Switch retains First/Last Name AND Company Name (Q2). |
| Required-field validation | TC_029 – TC_035 | 7 | Each required field empty (5 cases) + multi-empty + Business Company Name empty. |
| Format validation | TC_036 – TC_038 | 3 | Email format invalid (with FE-server short-circuit verify), Email malformed BVA suite, Phone format invalid suite. |
| Boundary value (BVA) | TC_039 – TC_045 | 7 | Max-length BVA for First Name (100), Last Name (100), Email (255), Phone (255), Store Name (255), Company Name (255), Store Description (500). |
| Server-side duplicate check | TC_046 – TC_050 | 5 | Email duplicate non-Rejected, Email re-use Rejected, Store Name duplicate non-Rejected, Store Name re-use Rejected, Phone non-uniqueness. |
| Edge cases | TC_051 | 1 | FE-then-server short-circuit (format invalid + would be duplicate, server NOT called). |
| UX | TC_052 – TC_054 | 3 | Double-submit prevention, loading spinner > 300ms, session timeout 30 min. |
| Accessibility | TC_055 | 1 | Labels associated, ARIA, arrow-key for radio. |
| Cross-step integration | TC_056 | 1 | Vendor Type drives Step 2 KYC document set. |

---

## Requirement Traceability Matrix

> **Coverage rule:** Every BA-approved AC in audit v3 §8 must map to ≥ 1 test case. 100% coverage achieved.

| AC ID | Acceptance Criteria (audit v3 §8) | Linked Test Cases | Status |
|---|---|---|---|
| AC-01 | Happy Path Individual | TC_025 | ✅ Covered |
| AC-02 | Happy Path Business | TC_026, TC_056 | ✅ Covered |
| AC-03 | Required field empty — First Name | TC_029 | ✅ Covered |
| AC-04 | Multiple required fields empty | TC_034 | ✅ Covered |
| AC-05 | Email format invalid | TC_036, TC_037 | ✅ Covered |
| AC-06 | Phone format invalid | TC_038 | ✅ Covered |
| AC-07 | Phone numeric-only enforcement | TC_012 | ✅ Covered |
| AC-08 | Email duplicate — non-Rejected (Q5) | TC_046 | ✅ Covered |
| AC-08b | Email re-use — Rejected (Q5) | TC_047 | ✅ Covered |
| AC-09 | Store Name duplicate — non-Rejected (Q5) | TC_048 | ✅ Covered |
| AC-09b | Store Name re-use — Rejected (Q5) | TC_049 | ✅ Covered |
| AC-09c | Phone non-uniqueness (Q6) | TC_050 | ✅ Covered |
| AC-10 | Business + Company Name empty | TC_035 | ✅ Covered |
| AC-11 | Vendor Type Switch retains Company Name (Q2) | TC_028 | ✅ Covered |
| AC-12 | Max-length blocked — First Name | TC_039 | ✅ Covered |
| AC-13 | Max-length blocked — Email | TC_041 | ✅ Covered |
| AC-14 | Store Description optional | TC_027 | ✅ Covered |
| AC-15 | Char counter realtime | TC_013, TC_045 | ✅ Covered |
| AC-16 | Double-submit prevention | TC_052 | ✅ Covered |
| AC-17 | Loading spinner > 300ms | TC_053 | ✅ Covered |
| AC-18 | Step indicator clickability | TC_010, TC_002 | ✅ Covered |
| AC-19 | Help → new tab → draft preserved (Q8) | TC_008 | ✅ Covered |
| AC-20 | Login → same tab → discards draft (Q8 + Q16) | TC_009 | ✅ Covered |
| AC-21 | Wireframe label compliance | TC_022 | ✅ Covered |
| AC-22 | Accessibility — labels, ARIA, radio arrow-key | TC_018, TC_055 | ✅ Covered |
| AC-23 | FE-then-server short-circuit (Q11) | TC_036, TC_051 | ✅ Covered |
| AC-24 | Session timeout (Q7) | TC_054 | ✅ Covered |

**Coverage summary:** 27 AC → 56 test cases. All AC have at least one direct test case mapping. 100% functional coverage.

### Implicit additional coverage (BVA + edge cases beyond AC)

| Test case | Implicit coverage |
|---|---|
| TC_030, TC_031, TC_032, TC_033 | Required-field-empty AC-03 generalized to each required field (Last Name, Email, Phone, Store Name) for full per-field testability. |
| TC_040, TC_042, TC_043, TC_044 | Max-length AC-12/AC-13 generalized to all max-length fields (Last Name 100, Phone 255, Store Name 255, Company Name 255). |
| TC_001, TC_004, TC_005 | Section 4 UI Object Inventory verification (initial render, default state, conditional Company Name hide). |
| TC_011 | Section 5 Object Behavior — input clickability with focus indicator. |
| TC_014 – TC_017, TC_019 – TC_021 | Common UI cases (F5, browser back/forward, Tab nav, Enter, Backspace, zoom) — standard QC bucket per skill rules, not in AC. |
| TC_023, TC_024 | Responsive layout breakpoints (Q14 NFR Mobile responsive), message consistency. |

---

## Out-of-scope Items (per skill scope)

| Item | Rationale | Owner |
|---|---|---|
| Performance load testing | Skill scope excludes perf. NFR §9 (Q14 approved) defines targets — separate perf test plan needed (page load ≤ 3s on 3G P95, duplicate check ≤ 2s P95, navigation ≤ 1s). | Performance test team |
| Security penetration | Skill scope excludes security. NFR §9 lists security requirements (CSRF, rate-limit 5/IP/min, reCAPTCHA v3, input sanitization, HTTPS). XSS / SQL injection payload testing belongs in security test plan. | Security test team |
| Cross-browser matrix execution | Browser compatibility test belongs in cross-browser test plan; AC-23 references compatibility but execution is matrix-based (Chrome / Edge / Safari / Firefox latest 2 + Mobile Safari iOS 14+ + Chrome Android). | Cross-browser test runner |
| reCAPTCHA real-token verification | Requires Google integration env. Functional UI test (TC level) cannot validate token roundtrip. | Integration / E2E test team |
| Visual states for Logo, Page Title, Char counter color-near-limit | Q15 — design pending. Test scope = visibility-only per BA decision. Defer until design provided. | Design + future TC update |

---

## Self-Review Checklist (peer-review style)

- [x] Every test case has a unique TC ID in `TC_XXX` format (3 digits).
- [x] Every test case is atomic and independently executable (no inter-test dependency).
- [x] Every Test Title begins with a verification verb (Verify / Confirm).
- [x] Every Pre-condition begins with an action verb.
- [x] Every Step uses imperative active voice (Click, Enter, Press, Select, Observe).
- [x] Every Expected Result begins with a step number `1.` / `2.` / `3.`.
- [x] All UI labels and error messages quoted **verbatim** from `common-rules.md` and UC source (no paraphrasing).
- [x] All COMMON-xxx codes referenced inline for traceability.
- [x] Section header rows in column B only; no TC ID consumed by header rows.
- [x] GUI section sorted in 4-bucket order (Screen Init → Item Interactions → Common UI → UI elements).
- [x] FUNC section sorted in logical order (Happy → Vendor Type → Required → Format → Boundary → Server dup → Edge → UX → Accessibility → Integration).
- [x] 100% AC coverage (27/27 AC mapped to ≥ 1 TC).
- [x] xlsx output rendered with all 6 columns populated correctly (TC ID, Title, Pre-conditions, Test Steps, Expected Result, Priority).
- [x] Output language = English (per source-input language rule for UC-VOB-001).

---

## Notes on Skill Infrastructure (one-time fix during this run)

The shared converter script `.claude/skills/qc-func-tc-design/scripts/md_to_xlsx.py` was minimally extended during this run to handle the project's available template:
1. `DEFAULT_TEMPLATE` now falls back to `Testcase_template.xlsx` when the original `[MBFS] Template TestCase - Mobile.xlsx` is absent.
2. `SHEET_NAME_CANDIDATES` introduced — script now picks the first sheet whose row-1 col-A contains the literal `"TC ID"`, ensuring it skips cover-style sheets that happen to share a name.

These changes are sanctioned per `qc-func-tc-design/workflows/generate-test-cases.md` Step 4: *"if the template changed, you need to update the script."* Future test case runs in this project will use the same script without modification.

---

## Next Steps

- **QA team:** Import xlsx into the test management tool (e.g., Jira/Xray, TestRail, Zephyr). Map TC_XXX IDs to UC-VOB-001 epic.
- **Test scenario design (qc-func-scenario-design):** Optional — can run on UC audit v3 to produce structured test scenarios document if helpful for execution planning.
- **NFR test plan:** Performance, browser matrix, mobile, security tests (out-of-scope items above) need separate test plans owned by perf / security / E2E teams. Use NFR §9 of audit v3 as authoritative requirements input.
- **Future re-design:** When design for Logo / Page Title / Char Counter color states is delivered (Q15 follow-up), update this file's draft and regenerate xlsx as `_v2`.
