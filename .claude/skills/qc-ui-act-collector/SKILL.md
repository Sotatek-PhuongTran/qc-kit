---
name: qc-ui-act-collector
description: Collects and standardizes the system's UI ACTION vocabulary (atomic + composite) AND the lean per-page UI element list from the highest-version audited UC review report. Maintains a global, append-only action library that AI Agents reference when writing test scenarios / test cases, plus one ui-elements file per page that `page-inspection` later resolves to real Playwright locators. Supersedes `qc-ui-extract` (this skill now owns UI element extraction). Trigger when the user says `collect actions`, `thu thập hành động`, `cập nhật thư viện hành động`, `extract ui`, `trích xuất ui`, `/qc-ui-act-collector <UC-ID>`, or is auto-suggested by `qc-uc-read` when verdict = Ready. Does NOT generate Playwright scripts (needs test cases + test data) and does NOT copy behavior / interaction matrix (that lives in audited §5 + test cases).
---

# Skill: qc-ui-act-collector

Bridges finalized (Ready) audited UC review reports and the automation pipeline by maintaining three artifacts from a single audited source:

1. **Atomic action library** — UI-independent action verbs (`Nhập`, `Nhấn`, `Chọn`…), one canonical term per concept per language. Global, append-only.
2. **Composite action library** — business actions (`Đăng nhập`, `Tạo đơn hàng`…) assembled from atomic actions + UI element references. Global, append-only.
3. **UI element list** — one lean file per page (= one `### <SCR-ID>` block of audited §4) so `page-inspection` can later attach real Playwright locators. The file flattens Bảng A (Group 1 — Control) and Bảng B (Groups 2/3/4 — Data display / Notification / Static) into a single element list, with a `Nhóm` column to keep the audited classification.

The action library is the canonical "language" every AI Agent uses when writing test scenarios / test cases; the ui-elements files are the canonical input for `page-inspection`.

**Element name vs Label (verbatim)** — ui-elements has two distinct columns: `Element name` is a SHORT human-readable identifier (4–8 words, e.g. "Primary button — Xác nhận gán"); `Label / Nội dung (verbatim)` is the literal display text copied character-by-character from audited. Never conflate them.

## Input Contract

Read `path-registry.md` to resolve every logical name below:

- `uc-review-report` — **highest `v<N>` of the audited file** for the target UC-ID. HARD REQUIREMENT. If verdict = `Not Ready` the skill still runs but emits a warning that the output will be drafty (may change after BA answers).
- `action-conventions` — `references/conventions.yaml` (skill, read-only). Closed category catalog + naming rules. HARD REQUIREMENT; categories MUST be chosen from here.
- `ac-library-template` — `templates/ac-library/{atomic_actions,composite_actions}.yaml` (skill, read-only). Cloned into the runtime library on first run.
- `ui-elements-template` — `templates/ui-elements/_ui-elements.template.md` (skill, read-only). Shape for each generated ui-elements file.
- `ac-library-atomic` — `qc/ui-act-library/ac-library/atomic_actions.yaml` (runtime). Existing atomic library to dedup against. **Bootstrapped from template if absent.**
- `ac-library-composite` — `qc/ui-act-library/ac-library/composite_actions.yaml` (runtime). Existing composite library to dedup against. **Bootstrapped from template if absent.**
- `project-context-master` — optional. Used only when audited §4 references a page name that needs cross-check with the site map.
- `.claude/rules/global-rules.md`, `.claude/rules/naming-convention.md` — language, naming, header rules.

Important: always pick the highest `v<N>` audited file by scanning the UC folder, NOT by date.

### Source map inside the audited report (v4 template)

Audited §4 v4 structure: each screen / popup / email is its own `### <SCR-ID>` block, which contains **Bảng A** (Group 1 — Control, 11 columns) and **Bảng B** (Groups 2/3/4 — Data display / Notification / Static / Auxiliary, 9 columns). Static behavior (Esc, backdrop click, hover…) and pure server states are NOT in §4 — they live in §5 or §6.

| Artifact | Audited section read | Notes |
|----------|----------------------|-------|
| Atomic actions | §5 (Group 1 interaction matrix) + §6 (workflow steps) | Harvest verb + abstract object. **Do NOT harvest from §4 Bảng B** — Groups 2/3/4 are display/notification/static, not user verbs. Ignore element-specific locators. |
| UI elements | §4 — one `### <SCR-ID>` block → one page; both Bảng A and Bảng B rows extracted into a single element list, tagged by `Nhóm` (1/2/3/4). | Bảng A row → `Nhóm 1`; Bảng B row → `Nhóm` 2/3/4 per its column. |
| Composite actions | §6 (flow / steps) | Each end-to-end flow → one composite, decomposed into atomic steps. Each step's `target` MUST reference a `Nhóm 1` (Bảng A) row — composites never target Bảng B. |

## Output Contract

All output goes to the **runtime library** (resolve its root via `path-registry.md`; conventionally `qc/ui-act-library/`). The skill writes ONLY here, never into `templates/`.

- `ac-library-atomic` - **Global singleton, append-only.** Never versioned per-run; never renumbered.
- `ac-library-composite` — **Global singleton, append-only.**
- `ui-elements` — one file per page, lean fields only.

**Bootstrap rule:** before any write, if `docs/qc/ui-act-library/ac-library/` is absent, clone `templates/ac-library/*` into it. The `templates/` files are never modified.

Versioning rules:

- **Action libraries are living singletons.** A run ADDS new entries or MERGES new aliases into existing entries. It never forks a new version of the whole file and never edits a published `id`/`canonical`.
- **UI element files are versioned per page** (same as the superseded `qc-ui-extract`):
  - No prior `ui-elements` file for this page → `v1`.
  - Prior file maps to the same audited `v<M>` → no-op unless the user requested re-extract; if re-extract, bump to `v<N+1>`.
  - Prior file exists AND audited bumped (`v<M+1>`+) → bump to `v<N+1>`, update mapping.
  - NEVER overwrite. NEVER edit a prior version in place.

## Checkpoint & Resume

Writes checkpoints to `.claude/skills/qc-ui-act-collector/process-logging/<UC-ID>/progress.md` so a context-limit / interruption mid-run does NOT force redoing completed phases or pages.

`progress.md` schema:

```yaml
uc_id: UC-VOB-001
audited_source: UC-VOB-001_submit-vendor-registration_audited_20260507_v3.md
audited_version: v3
run_id: 2026-05-22T10:15:33Z
phases:
  atomic:    { status: done }          # pending | in-progress | done
  ui:        { status: in-progress }
  composite: { status: pending }
atomic:
  added: 4
  aliases_merged: 6
ui:
  total_pages: 2
  pages:
    - name: step1-basic
      status: done                     # pending | in-progress | done
      output: UC-VOB-001_step1-basic_ui-elements_20260522_v1.md
      elements_done: 19
      elements_total: 19
      last_row_idx: 19                  # audited §4 row index of last extracted element
    - name: step2-upload
      status: in-progress
      output: null
      elements_done: 7
      elements_total: 14
      last_row_idx: 26
      partial_path: .claude/skills/qc-ui-act-collector/process-logging/UC-VOB-001/step2-upload.partial.md
composite:
  added: 2
```

Within a page, batch when `elements_total > 30`: process in chunks of 20, append to `<page>.partial.md`, update `elements_done` + `last_row_idx` after each chunk. On resume, read `progress.md`, continue from the first non-`done` phase, and within `ui` from `last_row_idx + 1` of the in-progress page.

## Workflow

### Phase 0 — Routing + Resume

1. **Identify UC-ID** from the user's prompt or filename.
2. **Locate the highest-version audited file** for the UC-ID via `uc-review-report`. If none → STOP with `❌ Không tìm thấy audited file cho <UC-ID>. Hãy chạy /qc-uc-read trước.`.
3. **Read audited verdict.**
   - `Ready` → proceed normally.
   - `Not Ready` → emit `⚠️ Audited verdict = Not Ready. Output có thể thay đổi sau khi BA trả lời open questions. Tiếp tục? (y/n)`; only proceed on `y`.
4. **Resume detection** — check `process-logging/<UC-ID>/progress.md`.
   - Found AND `audited_version` matches current highest → ask `Continue from phase <next>?` or `Restart fresh?`.
   - Found AND `audited_version` is stale → warn `Audited has bumped <old> → <new>. Restart recommended.`; default = Restart.
   - Not found → fresh run.
5. **Bootstrap runtime library** — if `ui-act-library/ac-library/` does not exist, create it and clone `templates/ac-library/atomic_actions.yaml` + `composite_actions.yaml` into it. Never touch `templates/` afterwards.
6. **Generate `run_id`** and append a worklog entry (`status = "Running (Phase 1 — atomic)"`) per `docs/qc-lead/agent-work-log.local/README.md`.

### Phase 1 — Atomic Action Harvest (UI-independent)

> Atomic actions can be collected the moment a doc describes a thing being done — no UI data required.

1. **Scan audited §5 (Group 1 interaction matrix) + §6 (workflow steps)** and extract **verb + abstract object** pairs (e.g. "enter customer code", "click Save"). Ignore which concrete element it targets. **Do NOT scan §4 Bảng B** — Groups 2/3/4 describe display/notification/static objects, not user verbs; harvesting from there would invent verbs that the UC never asked for.
2. For each verb, look it up in `ac-library-atomic`:
   - Matches an existing `canonical`/`aliases` (vi or en) → already exists; add the new wording as an alias if not present.
   - No match → create a new entry: choose `id`, `canonical {vi,en}`, `category` (from `action-conventions` → `atomic_categories`, CLOSED), `description {vi,en}`, `params`, `playwright` (see Output Template).
3. **Never invent a category** for atomic — if none fits, STOP that entry and flag for review.
4. Record an added/merged report for the run summary; update `progress.phases.atomic = done`.

### Phase 2 — UI Element Extraction (from §4)

> One file per page. A UC = 1 page in most cases (single URL/route). Wizard UCs may span ≥ 2 pages.

#### Phase 2a — Page Boundary Detection
1. **Parse audited §4** as a sequence of `### <SCR-ID> — <Tên màn hình>` blocks. v4 audited makes page boundaries explicit — **each block is exactly one page**. Do NOT infer boundaries from URL, wizard step, or column prefixes any more.
2. For each block, capture:
   - `scr_id` — the literal `<SCR-ID>` (e.g. `SCR-DEVICE-002`).
   - `scr_title` — the human title after the em-dash.
   - `trigger` — the `Điều kiện trigger màn` line right under the heading (used for cross-checks only; not copied into ui-elements).
   - The full Bảng A row list and Bảng B row list.
3. **Derive a page-name** for the ui-elements filename: lowercase-kebab-case, ≤4 words, from `scr_title` (strip the SCR-ID prefix if it appears in the title). Examples: `SCR-DEVICE-002 — Gán thiết bị cho bệnh nhân` → `gan-thiet-bi-modal` or `assign-device-modal`. The `scr_id` itself goes into the file's front matter as the stable handle.
4. **Propose the page list to the user** with element counts split by table:

   ```
   Audited <UC-ID> v<M> §4 có <N> SCR block, đề xuất:
     1. SCR-DEVICE-002 → assign-device-modal — Bảng A: 10 · Bảng B: 18 (tổng 28)

   Xác nhận / đổi page-name? (mặc định: chấp nhận)
   ```

5. **Keep declared-out-of-scope rows.** If a §4 row is marked `test scope = visibility-only per Q…` or similar, KEEP it (page-inspection still needs the locator) but record `Out of scope? = visibility-only`.
6. **Write `progress.md`** with the confirmed page list (one entry per SCR block), `status = pending` for all pages, `scr_id` recorded for each; set `progress.phases.ui = in-progress`.

#### Phase 2b — Per-Page Element Extraction

For each page (SCR block) in `progress.md`, in order:

1. **Mark page `status = in-progress`.**
2. **Extract Bảng A rows first, then Bảng B rows**, into a single flat element list (see Output Template). The ui-elements file's `#` column is **renumbered continuously across A → B** (A rows take the low end, B rows continue) so the file has a unique integer per row even if audited used per-table numbering. The original audited id is preserved in the `Audited §4 ref` column.
3. **Field-by-field rules** — most columns come from a specific table; mark which:

   | Output column | Bảng A source | Bảng B source | Notes |
   |---|---|---|---|
   | `Element name` | derived | derived | SHORT identifier (4–8 words). Compose from `Loại component`/`Loại đối tượng` + a short label slug or role/position. Examples: `Primary button — Xác nhận gán`, `Inline banner danger — Archived patient`, `Modal title — Header`, `Icon button — Đóng (X)`. Never copy the full verbatim label here. For icon-only or label-less elements, use role/position. |
   | `Nhóm` | always `1` | copy the `Nhóm` cell (`2` / `3` / `4`) | Single source of truth for downstream skills. |
   | `Loại đối tượng` | copy `Loại component` | copy `Loại đối tượng` | Strip audit-clarification suffixes like `(Q13 — same control type as #9)`; keep the bare type. |
   | `Label / Nội dung (verbatim)` | copy `Label gốc trên UI` | copy `Label gốc / Nội dung` | Verbatim copy. Preserve quotes, bilingual (VN/EN) text, line breaks. Multi-language labels MUST stay in the original; append `(English: …)` only if the audited file does so. Empty → `—` (icon-only or label-less). |
   | `Required` | copy `Bắt buộc?` | always `—` | Bảng B has no Required column. |
   | `Default` | copy `Giá trị mặc định` (empty → `(empty)`) | always `—` | |
   | `Placeholder` | copy `Placeholder` (empty → `—`) | always `—` | |
   | `Enum` | copy `Enum / giá trị` (`N/A` → `—`) | always `—` | |
   | `Visible when` | copy `Trạng thái khởi tạo & điều kiện hiển thị` | copy `Điều kiện hiển thị / trigger` | Copy verbatim from the dedicated column. No condition / "Always visible" → `always`. Do NOT derive from `Mô tả`/`Mô tả / ràng buộc` — that's for human reference only. |
   | `Audited §4 ref` | `§4 <SCR-ID> Bảng A #<audited-id>` | `§4 <SCR-ID> Bảng B #<audited-id>` | Preserve the audited id exactly so re-audit can re-link rows. |
   | `Out of scope?` | mark `visibility-only` if audit row marks design-pending / Q-style scope cap | same | Otherwise blank. |
   | `Locator` | always `TBD` | always `TBD` | `page-inspection` is the only skill that fills this column. |

4. **Batch checkpoint** (page > 30 elements): after every 20 elements, append rows to `<page>.partial.md`, update `elements_done` + `last_row_idx` (last_row_idx tracks the file's continuous `#`, not the audited id).
5. **Finalize page**: write `<UC-ID>_<page-name>_ui-elements_<YYYYMMDD>_v<N>.md`, delete the `.partial.md`, set page `status = done`, record `output`.
6. When all pages done → `progress.phases.ui = done`.

### Phase 3 — Composite Action Assembly

> Needs Phase 1 (atomic ids) AND Phase 2 (ui-elements) outputs to exist first.

1. **Identify each end-to-end business flow** in audited §6 (e.g. "Login", "Create order") and its related `page`(s).
2. **Decompose the flow into a sequence of atomic actions.**
3. For each `step`:
   - `action` = an `id` in `ac-library-atomic`.
   - `target` = a UI element reference `<page-name>#<row>` where `<row>` is the **ui-elements file's continuous `#`** (NOT the audited id). The row MUST be a `Nhóm 1` element — composites never target Bảng B (display / notification / static) rows. If a flow step in §6 needs a Group-2/3/4 element (e.g. "show banner"), express it as the response of the Group-1 control that triggered it, not as a composite step.
   - `value` = a parameter, using the `{param}` placeholder.
4. **Look up the flow** in `ac-library-composite`:
   - Matches existing `canonical`/`aliases` → add new alias if needed; do not duplicate.
   - New → create entry with `id`, `canonical {vi,en}`, `aliases`, `category` (from `composite_categories`; a new module category may be added to conventions FIRST, then used), `page`, `description {vi,en}`, `params`, `steps`.
5. Update `progress.phases.composite = done` and record added count.

### Phase 4 — Finalize + Cleanup

1. Verify every phase is `done` and every ui page is `done`.
2. **Validate** — run `python scripts/validate.py` to catch duplicate `canonical`/`id`, invalid category, a `step.action` missing from atomic, a `step.target` missing from the page's ui-elements, and alias collisions. Do not finish on a non-zero exit.
3. **Worklog final entry** — close the run with `status = "Completed"`, `output = <atomic added, composite added, list of ui-elements files>`.
4. **Cleanup checkpoint**: delete `progress.md` (and any leftover `.partial.md`) on success. On failure, leave them intact for next-run resume.
5. **Print summary**:

   ```
   ✅ qc-ui-act-collector done — <UC-ID>
   Audited source: <filename> (v<M>)
   Atomic: +<added> new, <merged> aliases merged
   Composite: +<added> new
   UI pages: <N>
     - <page-name>: v<N> · <count> elements · <output-path>
   Next: chạy /page-inspection <page-name> <URL> để gán locator thật.
   ```

## Output Templates

### Atomic action entry (`qc/ui-act-library/ac-library/atomic_actions.yaml`)

```yaml
- id: ENTER_TEXT
  canonical: { vi: "Nhập", en: "Enter" }
  aliases:
    vi: ["điền", "gõ", "nhập liệu"]
    en: ["input", "type", "fill"]
  category: Input                       # from conventions → atomic_categories
  description:
    vi: "Nhập một giá trị vào trường input/textarea"
    en: "Enter a value into an input/textarea field"
  params:
    - { name: target, type: element, required: true }
    - { name: value,  type: string,  required: true }
  playwright: "await page.fill({target}, {value})"
```

### Composite action entry (`qc/ui-act-library/ac-library/composite_actions.yaml`)

```yaml
- id: LOGIN
  canonical: { vi: "Đăng nhập", en: "Login" }
  aliases:
    vi: ["vào hệ thống"]
    en: ["sign in", "log in"]
  category: Authentication              # from conventions → composite_categories
  page: step1-basic
  description:
    vi: "Đăng nhập hệ thống bằng tài khoản và mật khẩu"
    en: "Log into the system with username and password"
  params:
    - { name: username, type: string, required: true }
    - { name: password, type: string, required: true }
  steps:
    - { action: ENTER_TEXT, target: "step1-basic#1", value: "{username}" }
    - { action: ENTER_TEXT, target: "step1-basic#2", value: "{password}" }
    - { action: CLICK,      target: "step1-basic#3" }
```

### UI element file (`<UC-ID>_<page-name>_ui-elements_<date>_v<N>.md`)

```markdown
---
Page name: <page-name>
SCR-ID: <SCR-ID>
Source UCs: [<UC-ID>, ...]
Source audited:
  - <UC-ID>: <audited filename> (v<M>)
Generated: <YYYY-MM-DD>
Generated by: qc-ui-act-collector
Version: v<N>
Total elements: <count> (Bảng A: <count_A> · Bảng B: <count_B>)
---

# UI Elements — <page-name>

> **Purpose**: canonical input for `/page-inspection`. Identification fields only.
> **What's NOT here**: interaction matrix, state machine, assertion behavior (audited §5 + test cases).
> **Locator column**: filled by `/page-inspection` against a live URL — leave `TBD` here.
> **Element name vs Label / Nội dung**: `Element name` is a SHORT identifier (4–8 words) for human + page-inspection lookup; `Label / Nội dung (verbatim)` carries the literal display text from audited. Both are required.
> **`#` column**: continuous integer (Bảng A rows first, then Bảng B). The original audited id is preserved in `Audited §4 ref`. Composite step `target` always uses this file's `#`.

## Page Context

- **URL / Route**: TBD — set by `/page-inspection` on first scan.
- **SCR-ID**: `<SCR-ID>`
- **Source UCs**: <UC-ID>, ...
- **Audited source**: `<audited filename>` (v<M>)
- **Audited §4 block**: `### <SCR-ID> — <Tên màn hình>` (Bảng A: <count_A> rows · Bảng B: <count_B> rows)

## Element list

| # | Element name | Nhóm | Loại đối tượng | Label / Nội dung (verbatim) | Required | Default | Placeholder | Enum | Visible when | Out of scope? | Audited §4 ref | Locator |
|---|--------------|------|----------------|-----------------------------|----------|---------|-------------|------|--------------|---------------|----------------|---------|
| 1 | Icon button — Đóng (X) | 1 | Icon button | "Đóng" (aria-label) | N/A | (empty) | — | — | always (disabled khi state=submitting) |  | §4 SCR-DEVICE-002 Bảng A #3 | TBD |
| 2 | Searchable select — Thiết bị/Bệnh nhân | 1 | Searchable select | "Thiết bị / Device" hoặc "Bệnh nhân / Patient" (kèm `*`) | Yes | none (reset khi mở) | "Chọn thiết bị Sẵn sàng… / Select an available device…" | Dynamic list từ pool tenant | always | | §4 SCR-DEVICE-002 Bảng A #10 | TBD |
| 3 | Primary button — Xác nhận gán | 1 | Primary button | "Xác nhận gán / Confirm assignment" | N/A | (empty) | — | — | always (enabled khi canConfirm) | | §4 SCR-DEVICE-002 Bảng A #22 | TBD |
| 4 | Modal title — Header | 4 | Section title | "Gán thiết bị cho bệnh nhân / Assign device to patient" | — | — | — | — | always | visibility-only | §4 SCR-DEVICE-002 Bảng B #1 | TBD |
| 5 | Inline banner danger — Archived patient | 3 | Inline banner danger | title "Không thể gán thiết bị cho bệnh nhân đã ngưng theo dõi. / Cannot assign a device to an archived patient." + body "Hãy khôi phục theo dõi trước khi gán lại thiết bị. / Restore monitoring before assigning a device again." | — | — | — | — | khi exception 2x (variant patient-first) | | §4 SCR-DEVICE-002 Bảng B #16 | TBD |
<!-- … repeat per element; Bảng A rows first, then Bảng B rows … -->

## Cross-references

- Atomic / composite actions: see the global action library (`qc/ui-act-library/ac-library/`).
- Audited §5 (behavior / state) — NOT copied. Read directly from audited when writing assertions.
- Test cases — see `func-test-cases` for `<UC-ID>` when interpreting expected behavior.
```

## Decision rules

- **One concept = one canonical** per language. Every other wording → `aliases`. Never spawn a second action (e.g. `nhập`/`điền`/`gõ` = one atomic, two aliases).
- **Category is a closed catalog.** Atomic never invents a category. Composite may add a module category to `conventions.yaml` FIRST, then use it.
- **Never embed locators in atomic/composite.** In ui-elements the `Locator` column is ALWAYS `TBD`; `page-inspection` is the only skill that fills it — even a stable testid in audited §4 Description is NOT promoted here.
- **Never store precondition/postcondition in the library.** They belong to the test case.
- **`id` is the unique reference key** (UPPER_CASE, snake_case). Never change a published `id` or `canonical`.
- **Action libraries are global, append-only singletons.** UI element files are per-UC/page and versioned. Do not version the libraries per run.
- **Never copy behavior / interaction into ui-elements.** That has two authoritative sources (audited §5 + `func-test-cases`); duplicating creates a drift point.
- **Never invent fields not in audited.** Missing `Placeholder` → `—`. Do not guess from screenshots or related UCs.
- **Element name = SHORT identifier; never put the full verbatim label there.** Verbatim text always goes in `Label / Nội dung (verbatim)`. Page-inspection needs a stable, scannable name to look up DOM; verbatim labels (especially bilingual / multi-line banner content) are unfit as identifiers.
- **`Nhóm` is the source of truth for table-of-origin** (1 = from Bảng A; 2/3/4 = from Bảng B). Never invent a `Nhóm 1` row from a Bảng B source, and vice versa.
- **Bảng B has no Required / Default / Placeholder / Enum.** Always output `—` for those columns on `Nhóm 2/3/4` rows. Never fabricate values from `Mô tả`.
- **`Visible when` is copied from a dedicated audited column** — `Trạng thái khởi tạo & điều kiện hiển thị` (Bảng A) or `Điều kiện hiển thị / trigger` (Bảng B). Never derive it from `Mô tả` / `Mô tả / ràng buộc`.
- **Composite step `target` MUST be a `Nhóm 1` row.** Composites encode user-driven flows; a banner / toast / static label is never a step target. If audited §6 says "show banner X", express it as the response of the Group-1 control that triggered the flow, not as its own composite step.
- **Behavior is NOT a §4 row.** Keyboard shortcuts, backdrop clicks, hover behaviors, server-only states — these belong to §5 (interaction matrix) or §6 (workflow), not the ui-elements file. If audited §4 still contains such a row (legacy v3 audited), SKIP it with a warning to re-audit on v4.
- **Multi-language labels**: preserve original; do not translate inside the table.
- **`visibility-only` rows still get a locator request** — keep the row.
- **Stale detection is read-time, not write-time.** Do not modify older ui-elements files when audited bumps.

## Interaction with other skills

- **Input from**: `qc-uc-read` (audited §4/§5/§6) — auto-suggested when audited verdict = `Ready`.
- **Supersedes**: `qc-ui-extract` — this skill now owns UI element extraction (plus the atomic + composite action library).
- **Consumed by**:
  - `page-inspection` — looks up element names → fills the `Locator` column in its own catalog (does NOT modify the ui-elements file).
  - `func-test-scenarios` / `func-test-cases` — reference canonical actions + ui-elements when writing scenarios / cases.
  - `test-script-design` — maps composite `steps` → Playwright using the `playwright` field + resolved locators.
- **Re-trigger**: when audited bumps to a new `v<M+1>`, or when a tester reports a missing element / action name during script writing.
- **Does NOT** consume from: `func-test-scenarios`, `func-test-cases`, `qc-site-map` (they describe behavior / flow, not inventory).

## Boundaries

- Read-only on audited files. Never modify the source UC review report.
- Never call `page-inspection` directly. Suggest it in the final summary; the user invokes it with a real URL.
- Never generate Playwright scripts — that needs test cases + test data and belongs to `test-script-design`.
- If audited §4 is empty or malformed → STOP with a clear error; do not fabricate elements or actions.
