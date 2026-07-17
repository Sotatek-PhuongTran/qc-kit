# First Audit · Phase 3 — Generate Review Report

> **Friendly name (for worklog):** `Generating Review Report` (EN) / `Tạo báo cáo review` (VI).
>
> **Inputs:** `process-logging/<UC-ID>/01_synthesis.md` + `02_scoring.md` (Phase 1 & 2 outputs) + `UC_readiness_review_template_v4.md`
>
> **Output:** `uc-review-report v[N].md` written to the UC's output folder (resolved via `path-registry.md`). This file IS the final deliverable — no separate `03_*.md` checkpoint.

---

## Status update — Start

Per `.claude/config/checkpoint-protocol.md` §2 (worklog):

1. **Worklog**: rewrite last entry → `status = "Running (Phase 3)"`.

If this run is a **resume from Phase 3**: first load `01_synthesis.md` and `02_scoring.md` into memory per the Resume load table in `workflows/checkpoint-protocol.md` (this skill's delta).

---

## Step 1 — Load checkpoint inputs

Open:

1. `process-logging/<UC-ID>/01_synthesis.md`
2. `process-logging/<UC-ID>/02_scoring.md`
3. `.claude/skills/qc-uc-read/templates/UC_readiness_review_template_v4.md`
4. `.claude/rules/qc-writting-rules.md` — **BẮT BUỘC đọc** (cách viết, bảng quy đổi thuật ngữ EN→VI §3, cổng tự kiểm §5)

Do **not** reload or re-extract raw UC, design, prototype, API, common-rule, or site-map files by default.

Use checkpoint outputs as follows:

| Checkpoint        | Use in Phase 3                                   |
| ----------------- | ------------------------------------------------ |
| `01_synthesis.md` | Fill the business understanding content in `UC_readiness_review_template_v4.md`.                                                   |
| `02_scoring.md`   | Fill readiness conclusion, scoring result, Section 10 issues/questions, Audit Summary, blockers, major issues, and recommendation. |

If any of these files is missing, stop and warn the user.

---

## Step 2: Fill the UC Readiness Review Template

The report is based on the **UC Readiness Review Template** at `.claude/skills/qc-uc-read/templates/UC_readiness_review_template_v4.md`. Open the template file, fill every section based on what was found (or not found) in the provided artefacts.

**Template section mapping** (the 5 scoring areas per `references/scoring-rubric.md` §6 + non-scored sections):

| # | Scoring Area (`scoring-rubric.md`)                              | Template Section |
| - | ---------------------------------------------------------------- | ---------------- |
| 1 | UI Object Inventory & Source Mapping (§F.1)                       | Section 4        |
| 2 | Object Attributes, Behavior, Rules, Validations & Messages (§F.2) | Section 5        |
| 3 | Functional Logic & Workflow Decomposition (§F.3)                  | Section 6        |
| 4 | Functional Integration & Data Consistency (§F.4)                  | Section 7        |
| 5 | UC Documentation Quality Issues                                   | Section 10       |

Non-scored template sections are filled from the Phase 1 synthesis (`01_synthesis.md` §A/§B): Feature Brief (plain-language business summary of the UC), Section 0 (document info), Section 1 (objective & scope), Section 2 (actors & roles), Section 3 (pre/postconditions), Section 8 (AC candidates from §F.5 — not scored, per rubric §2), Section 9 (NFR from source; if absent, state it is missing), Section 11 (Change log — add the `v[N]` entry for this report).

**Section 8 — Acceptance Criteria:** Based on the AC synthesis performed in Phase 1 Step 2 (item 5), populate Section 8 of the template with concrete Given/When/Then acceptance criteria derived from the analyzed workflows, business rules, and UI behaviors. Even if the source document lacks explicit AC, the agent MUST generate them from the synthesized understanding and always provide the generated AC in the output (AC candidates are NOT scored — rubric §2).

**Section 10. Gap, mâu thuẫn và câu hỏi mở:** Use the Issue Register and AC Candidate Review from `02_scoring.md` to fill this section.

Section 10.1 is the canonical gap/question table for the final report.

Do not create another duplicated gap/question table elsewhere.

Rules for Section 10.1:

* Include blocker issues first.
* Include major issues after blockers.
* Include medium/minor issues only when they still require BA/QC Lead/PO/Tech Lead confirmation.
* Merge duplicated or overlapping questions.
* Keep only issues relevant to the reviewed UC.
* Write each row as a clear Vietnamese question or action request.
* If the issue is a conflict, describe exactly which sources conflict.
* If the issue is missing information, describe exactly what is missing and why it affects test design.
* If the issue comes from AC candidates, include it only when the AC requires confirmation, is unsupported, or may exceed the UC scope.
* Default status is `Open`.

Use Section 10.2 for dependencies from Phase 2, including blocked artefacts, unavailable related sources, unresolved upstream decisions, environment dependencies, or integration dependencies.

---

## Step 3: Add the Audit Summary under Section 10

Fill the audit summary **inside Section 10**, after Section 10.1 and Section 10.2, under the template's existing heading (the `### 10.3 Audit Summary` skeleton is already part of `UC_readiness_review_template_v4.md` — fill it, do not add a new heading):

```md
### 10.3 Audit Summary
```

The Audit Summary must be concise. Do not duplicate the full issue register.

Include only the following subsections:

```md
#### Bảng điểm đánh giá

[Render the scoring table from `02_scoring.md` exactly according to Phase 2 result.]
| Nhóm đánh giá | Điểm | Trạng thái | Nhận xét ngắn | 
|---|---:|---|---| 
| <Scoring area from Phase 2> | <X/Y> | <Status from Phase 2> | <Short rationale from Phase 2, rewritten in Vietnamese> | 
| **Tổng điểm** | **<X/100>** | **<Verdict>** | **<One-sentence readiness summary>** |

#### Blocker cần xử lý

[List only blocker issues from `02_scoring.md`. If none, write `Không có blocker được ghi nhận.`]

#### Vấn đề lớn cần xử lý

[List only major issues from `02_scoring.md`. If none, write `Không có major issue được ghi nhận.`]

#### Khuyến nghị

[One short paragraph based on Phase 2 verdict and blocker/major issue status.]
```

Rules:

* Do not restate scoring area definitions from `scoring-rubric.md`.
* Do not restate status marker definitions from `scoring-rubric.md`.
* Do not include all minor issues in Audit Summary.
* Do not duplicate Section 10.1.
* The score and verdict must match `02_scoring.md`.
* If `02_scoring.md` contains a rubric warning, include it in `#### Bảng điểm đánh giá`.

---

## Step 4 — Cổng tự kiểm văn phong (BẮT BUỘC)

Trước khi ghi file, chạy **Cổng tự kiểm §5 của `.claude/rules/qc-writting-rules.md`** trên TOÀN báo cáo và sửa hết trước khi lưu (BẮT BUỘC — checklist đầy đủ nằm ở đó, không chép lại tại đây).

---

## Step 5: Write the Output File

Resolve the output path via `path-registry.md` → `uc-review-report` logical name.

**Versioning rule:** Check the output directory for existing versions. If `v[N]` exists, increment the version to `v[N+1]`. **Never overwrite existing files.**

**Naming convention** (per `.claude/rules/naming-convention.md`):
```
[UC-ID]_[feature-name]_audited_[YYYYMMDD]_v[N].md
```

Write the completed report to the resolved path.

---

## Step 6: Transfer Open Questions to Question Backlog (auto-trigger `qc-qna`)

After the `uc-review-report v[N].md` is written successfully, **invoke the `qc-qna` skill via the Skill tool** to transfer all `Open` rows from the report's `### 10.1 Bảng gap và câu hỏi cần xác nhận` table into the project's `question-backlog` file (so the BA can answer them).

- Pass the just-written report path + `<UC-ID>` as input context.
- Wait for `qc-qna` to return. Capture its summary (new question IDs created, file path of the backlog).
- If `qc-qna` reports no Open questions to transfer, skip silently.
- If `qc-qna` fails, do NOT block this skill — surface a warning in chat (`⚠️ qc-qna failed: <reason> — please run /qc-qna manually for <UC-ID>`) and continue to Final Status Update.

This auto-trigger is the documented kit flow: first-audit always produces fresh Open questions; sending them directly to the BA's backlog removes a manual step.

---

## Final Status Update & Cleanup

Per `.claude/config/checkpoint-protocol.md` §5 (cleanup) and §6 (failure modes):

1. **Worklog**: rewrite last entry → `status = "Done"`, `end = now`, `duration_min = computed`. Add the output file name to `output`. If `qc-qna` wrote to `question-backlog`, also add it to `output`.
2. **Cleanup**: delete the entire `.claude/skills/qc-uc-read/process-logging/<UC-ID>/` folder. Cleanup only happens on successful completion.

---

## Boundaries (reminder)

- You ONLY review and audit, DO NOT edit the input files.
- Every finding MUST cite the specific source section, page, or paragraph.
- Do NOT fabricate or assume requirements that are not in the document.
- When uncertain, explicitly state uncertainty and ask the user — never guess.
- Do NOT opine on implementation approach — leave architecture decisions to the development team.
