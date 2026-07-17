## Generate Test Cases (Design Workflow)

> **Scope:** This workflow produces ONLY the test case `.md` file(s). Do NOT write a separate summary file in this workflow.
>
> **Checkpoint references:** all phase-boundary write/update steps follow `workflows/checkpoint-protocol.md` §4. Do NOT duplicate those rules here.

---

## Phase 1 — Analysis & Design Brief

### Status update — Start of Phase 1

Per `.claude/config/checkpoint-protocol.md` §2 (worklog, write-before-work rule):

1. **Worklog**: rewrite last entry → `status = "Running (Phase 1)"`. Append input file names to `input` (excluding `process-logging/`).

### Step 1: Input Analysis (MANDATORY)

#### 1.1 Read all input files
- `uc-review-report`
- **Verdict gate:** If the audited Verdict is `NOT READY` → STOP and ask whether to proceed (test cases will inherit known gaps). Never silently continue. (Verdict location: the audited report's §10.3 `**Tổng điểm**` row, 3rd column. Comparison is case-insensitive — `NOT READY`, `Not Ready`, `not ready` all trigger the gate.)
- (Optional) `func-test-scenarios`
- Load `.claude/skills/qc-func-tc-design/references/design-technical/common-technical.md`

#### 1.2 Resolve Platform Variants (MANDATORY)

1. Read `project-context-master.md` §3.0 → **Variant kiểm thử** (UI variants) + **Project language**. §3.0 is the SOLE read source for scope/variant/language — never read `project-config` §6 directly.
2. Parse the value(s). One or more of: `web-responsive`, `web-static`, `mobile-native`, `mobile-hybrid`, `desktop-native`.
3. **If §3.0 is missing or the variant field is blank → STOP and ask the user to populate it** (run `/qc-context-master` after `/qc-project-onboarding`; this field is mandatory — the rubric drives TC coverage).
4. For EACH applicable variant, load the mapped design-technical file end-to-end (this table is the authoritative variant → file mapping):

   | Variant (project-context-master §3.0) | File load |
   |---|---|
   | `web-responsive`, `web-static` | `references/design-technical/web-technical.md` |
   | `mobile-native`, `mobile-hybrid` | `references/design-technical/mobile-technical.md` |
   | `desktop-native` | `references/design-technical/desktop-technical.md` |

   (`common-technical.md` is ALWAYS loaded in addition, per Step 1.1.) Hold all loaded rubrics in working memory.
5. Record the resolved variant list + the Project language (drives output language per `rules/testcase-instruction-rules.md` §0) as a working note.

#### 1.3 Load UI Element Vocabulary from the audited report §4 (MANDATORY)

Test steps refer to UI elements by the names inventoried in the audited report's §4 (`### <SCR-ID>` blocks — Bảng A: Control rows / Nhóm 1; Bảng B: Data display / Notification / Static rows / Nhóm 2-3-4). No external action/element library is required.

1. For every in-scope screen (`### <SCR-ID>` block in audited §4), build:
   - `elements_by_screen[screen][#] = { element_name, label_verbatim, nhom }`
   - `element_name` = a short reader-friendly identifier derived from the row (e.g. `nút "Xác nhận"`); `label_verbatim` = the display text copied character-for-character.
2. **If a screen referenced by the audited §6 flows has NO §4 block** → STOP and tell the user (Vietnamese) that the audited report is missing the UI inventory for that screen; suggest re-running `/qc-uc-read` (re-audit) to complete §4. Do NOT invent elements.
3. **Verb rule:** step verbs MUST be the canonical VI verbs from the kit-level table `.claude/config/action-verbs.md` (read it once at this step). Aliases are recognition-only — never written. A verb missing from the table → follow `action-verbs.md` rule 3 (mark in the run report + propose adding a row; no silent free verbs).
4. **Record the element-source snapshot** as a working note: the audited filename + version and the list of in-scope screens. This is printed in the Step 4 prelude (§ `Nguồn phần tử UI`).

---

### Step 2: Detailed Drafting (MANDATORY)

Apply the design technical to design test cases. The result of this step is the test case content that will be persisted in Step 3.5 (scratch) and written to the deliverable `.md` in Step 4.

#### 2.1 — Apply the 6-Phase Drafting Common

Apply ALL 6 phases described in the `common-technical.md` file.

#### 2.2 — Apply the 6-Phase Drafting per variant

For EACH platform variant loaded in §1.2, apply end-to-end of the corresponding technical file.

They all contribute to the same in-memory TC list **per variant** that gets persisted at the end of phase 1.

> **Multi-platform rule:** If multiple variants apply (e.g., a UC ships on BOTH web-responsive and mobile-native), draft a SEPARATE TC list per variant, including both common and per variant — to be persisted in a SEPARATE scratch file (Step 3.5) and written to a SEPARATE deliverable `.md` (Step 4). Do NOT merge variants into one file. Each variant gets its own RTM (Step 3) and its own prelude.

**Test Case Writing rules (MANDATORY):** 
Apply all the rules in `qc-func-tc-design/rules/testcase-instruction-rules.md` and `.claude/rules/qc-writting-rules.md`.

- **Test cases example**: read the language-matched reference — `qc-func-tc-design/references/Testcase-refer-vi.md` for Vietnamese test cases, `qc-func-tc-design/references/Testcase-refer-en.md` for English test cases — and align new TCs to the same structural & writing style (TC ID format, Title phrasing, Pre-condition / Step / Expected Result layout, multi-line bullet style).
- **Cổng tự kiểm (BẮT BUỘC trước khi ghi md):** chạy Cổng tự kiểm §5 của `.claude/rules/qc-writting-rules.md` (BẮT BUỘC — sửa hết trước khi ghi file) + "Cổng tự kiểm test case" trong `rules/testcase-instruction-rules.md`.

### Step 3: Build the Requirement Traceability Matrix + Vocabulary Coverage Audit

#### 3.1 Requirement Traceability Matrix (RTM)

- Build the `Requirement Traceability Matrix` mapping every Acceptance Criterion of the audited UC to the drafted Test Case IDs.
- Verify 100% coverage. If any AC has no linked TCs, fix the drafting in Step 2 before proceeding.
- **When a `func-test-scenarios` file exists:** extend the RTM with a `TS liên quan` column — positioned between `Linked Test Cases` and `Status` — mapping each AC/TC row to its scenario ID(s) (`TS_[UC-ID]_NNN`). An AC that maps to no TS gets `—` in that cell. When NO scenarios file exists, the column is omitted entirely (do not render an empty column). Self-check: EVERY `TS_*` in the scenarios file has ≥ 1 linked TC, or the skip reason is recorded (in a line under the RTM table).
- The RTM will be embedded in the md prelude (Step 4), not in a separate file.
- **Multi-platform:** Build ONE RTM PER variant. Each variant's RTM lives in its own `.md` file's prelude. Each RTM must independently cover 100% of the audited ACs that are in scope for that variant.

#### 3.2 Interaction Coverage Audit (MANDATORY)

For each variant, using the audited §5 interaction matrix + §6 flows of the in-scope screens:

- Build the expected-interactions set = every distinct user interaction listed in §5 (per screen) plus every step of the §6 workflows.
- Every expected interaction MUST be exercised by ≥ 1 drafted test step. If any is missing, fix the drafting in Step 2 (add the missing TC or extend an existing one). Do not proceed until coverage is 100%.

#### 3.3 Element Coverage Audit (MANDATORY)

For each variant, using `elements_by_screen` loaded in Step 1.3:

- **Nhóm 1 (Control) rows** — every row MUST be referenced (by `Element name` inside double-quotes) in ≥ 1 GUI **or** FUNC test step / expected result.
- **Nhóm 2 / 3 (Data display / Notification) rows** — every row MUST appear in ≥ 1 Expected Result (typically a FUNC TC asserting the message/value).
- **Nhóm 4 (Static) rows** — every row MUST appear in ≥ 1 GUI initialization or UI verification TC's expected result.

If any row is uncovered, fix the drafting in Step 2 before proceeding. Record the audit result (pass/fail per audit + uncovered IDs if any) as a working note for the Step 4 prelude.

### Step 3.5: Persist Designed TCs to Scratch (MANDATORY — atomic single Write)

This step is the **safety net for Phase 2 auto-recovery**. It locks down the in-memory design before the final md write begins, so that if the final md write is interrupted (multi-part flow, network blip, context flush, etc.), Phase 2's verification gate can detect the mismatch and auto-recover from this scratch — WITHOUT having to re-run the 6-phase drafting.

1. **Compose the full scratch content** in working memory, using the SAME content format as the final deliverable md described in Step 4:
   - The complete required prelude (`# Test Cases — [UC-ID] …`, totals, source filenames, RTM table, etc.).
   - All screen sections (`## <Roman>. …`) with their GUI (`### <Roman>.1. …`) and FUNC (`### <Roman>.2. …`) subsections and test case tables.
   - The same heading-level rules as Step 4 (only `#` / `####` in the prelude, `##` for screens, `###` for GUI/FUNC).
2. **Write to scratch path(s)** — ALWAYS per-variant (no special case for single-variant projects): for EACH platform variant V resolved in Step 1.2, write that variant's full scratch content to `.claude/skills/qc-func-tc-design/process-logging/<UC-ID>/02_designed_tcs_<V>.md` in **ONE atomic Write call** containing the ENTIRE content for that variant.
   - For a single-variant project, this means writing ONE file with the project's only variant in its name (e.g., `02_designed_tcs_web-responsive.md`). The "bare" name `02_designed_tcs.md` (without variant suffix) is NEVER used — Phase 2 always probes by variant.
   - For a multi-variant project, write N atomic Write calls, one per variant.
   - Do NOT use Edit / multiple appends to build a scratch incrementally — if a scratch's own Write is interrupted, Phase 2 cannot recover that variant. If a single variant's volume exceeds a Write's practical limit, that is the signal to fail loudly and ask the user — multi-part scratch per variant is NOT supported.
3. Do NOT delete or modify any scratch file later in this skill run — they are durable sources of truth for Phase 1 and are only removed in `SKILL.md` → Step D cleanup at end-of-run.

After this step completes, the design work of Phase 1 is **durably persisted for every variant**. Step 4 below is a re-materialization of the same content at the deliverable path; if Step 4 is interrupted for any variant, that variant's scratch is still on disk for Phase 2 auto-recovery.

### Step 4: Write the .md File(s) (MANDATORY)

For EACH platform variant V resolved in Step 1.2, re-materialize that variant's scratch content (`02_designed_tcs_<V>.md` from Step 3.5) to the **deliverable path** defined in `path-registry.md` for `func-test-cases-md`. Each variant produces its own deliverable file(s); within a variant, use a single file or multi-part files (`*_part1.md`, `*_part2.md`, …) depending on volume. Each file (single or per-part) is an atomic single Write.

**Deliverable file naming (per `rules/naming-convention.md`):** `<UC-ID>_<feature>_testcases_<variant>_<YYYYMMDD>_v<N>.md` — this md is the OFFICIAL deliverable (NOT a draft): versioned + immutable, and it shares the SAME base name with the Phase-2 xlsx (they differ only by extension). `<YYYYMMDD>` = the day this version is created; generate mode is normally `v1`. Multi-part files append `_partN` after `_v<N>` (the converter strips it). Example for UC-101 with both web-responsive and mobile-native:
- `UC-101_user-login_testcases_web-responsive_20260716_v1.md`
- `UC-101_user-login_testcases_mobile-native_20260716_v1.md`

For a single-variant project the same naming applies (just one variant in the name). The "no-variant" filename pattern is NOT used — every deliverable carries its variant in the name so Phase 2's per-variant flow can pair scratch ↔ final md unambiguously.

**At the TOP of the md (or top of `part1` if multi-part), include the following required prelude:**

```markdown
# Test Cases — [UC-ID] [feature-name] [— <variant> if multi-platform]

**Total test cases:** X (GUI: Y, FUNC: Z)
**Platform variant:** [web-responsive / web-static / mobile-native / mobile-hybrid / desktop-native]
**Source UC:** [audited filename + version]
**Source scenarios (if any):** [scenarios filename + version]
**Output language:** [VI / EN]

#### Nguồn phần tử UI

**Audited source:** `<UC-ID>_…_audited_…_v<M>.md`
**Màn hình trong phạm vi (§4):**
- `<SCR-ID-1>` — <tên màn hình>
- `<SCR-ID-2>` — <tên màn hình>
- …

#### Requirement Traceability Matrix

| AC ID | Acceptance Criteria | Linked Test Cases | TS liên quan | Status |
|---|---|---|---|---|
| AC-01 | …                   | TC_001, TC_002    | TS_UC-101_001 | Covered |
| …     | …                   | …                 | …             | …       |

(The `TS liên quan` column sits between `Linked Test Cases` and `Status`, and is present ONLY when a scenarios file exists — omit the column entirely otherwise. It maps AC/TC ↔ `TS_[UC-ID]_NNN` per Step 3.1; an AC that maps to no TS gets `—` in that cell. Self-check: every TS has ≥ 1 linked TC, or the skip reason is recorded in a line under the table.)

#### Coverage audit

| Audit | Result | Uncovered items |
|---|---|---|
| Interaction coverage (audited §5/§6) | Pass / Fail | — |
| Element coverage — Nhóm 1 (Control) | Pass / Fail | — |
| Element coverage — Nhóm 2/3 (Display/Notify) | Pass / Fail | — |
| Element coverage — Nhóm 4 (Static) | Pass / Fail | — |

---
```

**Heading-level rules (MANDATORY — they govern what does and does not appear in the xlsx):**
- The prelude MUST use only `#` (h1) and `####` (h4) heading levels — these are skipped by the converter, so the prelude does NOT leak into the xlsx.
- Use `##` (h2) ONLY for screen headers (e.g., `## I. Màn hình: …` / `## I. Screen: …`).
- Use `###` (h3) ONLY for GUI / FUNC section headers (e.g., `### I.1. …` / `### I.2. …`).

After the prelude, write all screen / GUI / FUNC sections with their test case tables, following the layout and sorting rules in `qc-func-tc-design/rules/testcase-instruction-rules.md`.

**Do NOT write a separate summary file.** The md (with its prelude) is the only design artifact this workflow produces. Anything noteworthy beyond the prelude (e.g., out-of-scope items, requirement gaps observed during drafting) will be reported on chat by the orchestrator (`SKILL.md` → Step C).

### Checkpoint write — End of Phase 1

Per `workflows/checkpoint-protocol.md` → "Verified-transition rule" (end-of-phase). At this point, the following artifacts already exist on disk: ONE scratch file per variant (`02_designed_tcs_<V>.md` from Step 3.5) and that variant's final deliverable `.md` file(s) (from Step 4). The remaining work is to publish ONE consolidated `## Phase 1 Summary` block to progress.md covering ALL variants (so Phase 2 can iterate per variant), then update worklog.

1. **Compute the per-variant Phase 1 summary** by counting TCs in EACH variant's final md (which equals that variant's scratch — both should match exactly at this moment). For each variant V:
   - Total TCs + GUI / FUNC split (3 discrete integers).
   - Per-screen breakdown: for each `## <Roman>.` screen in V's final md, count TC rows in its `### <Roman>.1.` (GUI) and `### <Roman>.2.` (FUNC) tables.
   - The output language detected in Phase 1.
   - The scratch path: absolute path to `02_designed_tcs_<V>.md`.
   - The final md path(s) for V written in Step 4 (single file or multi-part list, all absolute paths).
2. **Append a SINGLE `## Phase 1 Summary` block to `progress.md`** using the exact schema from `workflows/checkpoint-protocol.md` (`## Phase 1 Summary` block schema). The block contains:
   - A top-level `**Variants in scope:**` line listing all variants comma-separated.
   - ONE `### Variant: <V>` sub-block per variant, in the same order. Each sub-block has the per-variant fields computed above (totals, language, scratch path, final md paths, screen breakdown table).
   - This is an atomic single Write that overwrites `progress.md` while preserving all existing fields (run_id, uc_id, workflow, started_at, last_phase_done, next_phase, updated_at, ## Notes). Do NOT touch `last_phase_done` here — it stays at its current value (set when Phase 1 started). Update `updated_at: <now>`.
3. **Worklog**: rewrite last entry → `status = "Phase 1 done"`. Append ALL variants' final `.md` path(s) to `output` (excluding `process-logging/`).

> **Note:** `last_phase_done: 1` is NOT written here — it gets written at the START of Phase 2, only AFTER Phase 2's Step 0 verification gate passes for ALL variants. This is what guarantees a partial / mismatched md for ANY variant cannot be silently accepted as "Phase 1 done" on resume. See `convert-md-to-xlsx.md` → Step 0.

---

## Hand-off to Phase 2

Next file: `workflows/convert-md-to-xlsx.md`. The orchestrator (`SKILL.md` → Step B) auto-triggers it after Phase 1 finishes successfully.
