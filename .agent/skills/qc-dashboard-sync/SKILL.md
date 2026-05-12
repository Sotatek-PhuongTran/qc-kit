---
name: qc-dashboard-sync
description: Scans project documentation folders and updates document-status columns (Specs stt, WF stt, Test scenario stt, Test cases stt) in qc-dashboard.md. Reads path-registry.md for folder locations; uses each row's ID (column 2) as the folder/file matcher. Stops with a warning if it finds documentation for an ID not yet listed in the dashboard (signal to run qc-context-master first). Confirms with user when a previously-existed status downgrades to Missing. Trigger on /qc-dashboard-sync, "sync dashboard", "update dashboard status", "đồng bộ dashboard".
---

# QC Dashboard Sync Skill

## Trigger Conditions

- Manual: `/qc-dashboard-sync`, "sync dashboard", "đồng bộ dashboard", "update dashboard status".

## Inputs

Read `path-registry.md` to resolve:
- `qc-dashboard` — the dashboard markdown file. Required; stop if missing.
- `requirement-files` — parent folder containing per-ID sub-folders with specs + wireframes.
- `func-test-scenarios` — parent folder containing per-ID sub-folders with test scenario files.
- `func-test-cases` — parent folder containing per-ID sub-folders with test case `.xlsx` files.
- `func-test-cases-draft` — parent folder containing per-ID sub-folders with test case draft `.md` files (may be the same folder as `func-test-cases`).

## Outputs

- `qc-dashboard` — update ONLY the four status columns. All other columns untouched.
- Console report (orphan IDs, downgrade confirmations, summary).

## Workflow

### Phase 0 — Pre-flight

1. Resolve `qc-dashboard`. If file does not exist, STOP:
   > "Chưa có dashboard tại `<path>`. Vui lòng chạy `/qc-context-master` để khởi tạo feature list trước."

2. Parse the markdown table. Determine the ID column label by reading the header (column 2) verbatim — preserve as-is when writing back.

3. Validate schema: header must have exactly 10 columns in this order:
   `Site | <ID label> | Module | Feature/Use case name | In scope? | Specs stt | WF stt | Test scenario stt | Test cases stt | Execute stt`

   If schema mismatch, STOP and report the offending header.

4. Build `featureIndex` = set of IDs from column 2 across all data rows.

### Phase 1 — Detect Orphan Documents

For each of these path-registry artifacts, resolve the parent folder (the portion before the `<UC-ID>` placeholder) and list immediate sub-folder names:
- `requirement-files`
- `func-test-scenarios`
- `func-test-cases`
- `func-test-cases-draft` (skip if same as `func-test-cases`)

Each sub-folder name = one observed ID. Any observed ID not in `featureIndex` is an orphan.

If orphans found, STOP and output:
```
⚠️ **Dừng — phát hiện tài liệu chưa có trong dashboard.**

| ID phát hiện | Folder |
|---|---|
| <ID> | <relative folder path> |

Vui lòng chạy `/qc-context-master` để bổ sung các ID này vào feature list, rồi chạy lại `/qc-dashboard-sync`.
```

> The skill does NOT auto-add orphans. ID management belongs to `qc-context-master`.

### Phase 2 — Status Detection

For each data row in the dashboard, with `<ID>` = column 2 value, compute each status column:

#### 2.1 Specs stt
- Folder: `requirement-files` resolved with `<ID>`.
- Match files with text-like extensions: `.md`, `.docx`, `.pdf`. EXCLUDE image/wireframe extensions.
- Version detection: extract `_v<N>` (case-insensitive) from filename. If no version tag, treat as `v1`.
- Result:
  - No matching file → `Missing`
  - Else → `V<max-N> existed`

#### 2.2 WF stt
- Same folder as 2.1.
- Match wireframe/image extensions: `.png`, `.jpg`, `.jpeg`, `.fig`, `.figma`, `.svg`.
- Same version logic and result format.

#### 2.3 Test scenario stt
- Folder: `func-test-scenarios` resolved with `<ID>`.
- Match files containing `_scenarios_` in filename (per naming-convention.md).
- Same version logic and result format.

#### 2.4 Test cases stt
- Folders: both `func-test-cases` and `func-test-cases-draft` resolved with `<ID>` (may overlap).
- Determine max version N considering BOTH `_testcases_*_v<N>.xlsx` and `_testcases_draft.md`.
- Lookup the highest version N:
  - Has any `_testcases_*_v<N>.xlsx` → `V<N> existed`.
  - Has `_testcases_draft.md` but NO `.xlsx` for V<N> → `V<N> missing .xlsx file`.
  - Neither → `Missing`.

### Phase 3 — Downgrade Confirmation

For each row, compare detected status vs the value currently in the dashboard.

A **downgrade** = current is `V<N> existed` or `V<N> missing .xlsx file`, AND detected is `Missing`.

Collect all downgrades. If non-empty, STOP for user confirmation:
```
⚠️ **Phát hiện tài liệu biến mất** — file trước đây có nay không tìm thấy:

| ID | Cột | Trước | Sau |
|---|---|---|---|
| <ID> | Specs stt | V2 existed | Missing |
| <ID> | Test cases stt | V1 existed | Missing |

👉 Trả lời:
- `yes` — cập nhật tất cả về Missing (file đã bị xóa cố ý).
- `skip <ID> <col>` — giữ status cũ cho dòng đó (lặp lại được nhiều dòng).
- `cancel` — dừng skill, không update gì.
```

Apply user's response. `skip`-ed downgrades keep the old value.

> Upgrades (Missing → V<N> existed) and version bumps (V1 → V2) are applied automatically without confirmation.

### Phase 4 — Write Dashboard

1. Re-write the markdown table with detected statuses written into 4 status columns (Specs stt, WF stt, Test scenario stt, Test cases stt).
2. Preserve verbatim: column 1 (Site), column 2 (`<ID label>`), column 3 (Module), column 4 (Feature/Use case name), column 5 (In scope?), column 10 (Execute stt).
3. Preserve header row exactly as read (including the `<ID label>` text).
4. Preserve the ghi-chú/notes section below the table verbatim.

### Phase 5 — Handover

```
✅ **Dashboard sync hoàn tất.**

**Tóm tắt update:**
- Specs stt:        <N> dòng thay đổi
- WF stt:           <N> dòng thay đổi
- Test scenario:    <N> dòng thay đổi
- Test cases:       <N> dòng thay đổi

**Downgrades:** <N> user-confirmed | <N> user-skipped

Dashboard tại: `<resolved path>`
```

## Boundaries

- This skill ONLY writes columns 6, 7, 8, 9 (the four status columns). NEVER touches Site, ID, Module, Feature/Use case name, In scope?, Execute stt.
- This skill NEVER adds, removes, reorders, or renames rows/columns.
- Orphan handling: report and stop. Do NOT auto-create rows.
- Schema mismatch: report and stop. Do NOT auto-fix.
- If a folder for `<ID>` does not exist at all (no spec, no test artifacts), all four status columns become `Missing` — that is the expected result, not an error.
