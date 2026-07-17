# qc-dashboard-sync — Bottom-up workflow

> **Mode: bottom-up.** Invoked by manual `/qc-dashboard-sync <UC-ID>` (caller passes `uc_id`). Mode routing is decided in `../SKILL.md` § "Two modes".
>
> **Shared contracts live in `../references/contracts.md`** — read it first: "Schema" → §2, "Scan result / Tài liệu nguồn format" → §3, "Process-log parse contract" → §4, "Done-state derivation" → §5, "Bottom-up output handoff" → §6b, "Sort order directive" → §7. References to "top-down Phase 0 step 5 / Phase 1 step 2a / Phase 3b / Phase 5" point to `top-down.md`.

## Bottom-up workflow

Triggered ONLY by the user running `/qc-dashboard-sync <UC-ID>` manually. Per-UC skills do not auto-invoke this skill anymore — they only maintain their existing per-UC subfolder progress.md for resume; the user runs `/qc-dashboard-sync <UC-ID>` to refresh the dashboard row.

### Bottom-up steps

1. Generate `run_id` and append worklog row `Status = Running (bottom-up, uc_id=<ID>)`.
2. Resolve `qc-dashboard` path. If the file does not exist → create it from `templates/qc-dashboard-template.md` with `<ID label> = Use Case ID` (default). Do NOT prompt for the label here (top-down handles the prompt; in bottom-up the default is safe).
3. Parse the existing dashboard (header + `featureIndex` keyed by the `<ID label>` column + `folderIDIndex` keyed by effective Folder ID per contracts §2). Schema validation: same rule as top-down Phase 0 step 5 — baseline 8 columns + any subset of optional columns in their defined positions; ANY other header → STOP and report (no auto-fix, no legacy migration).
4. **Single-UC scope check (matches by effective Folder ID):**
   - If `<ID>` matches an existing row's effective Folder ID → SKIP "add new row" step but PROCEED with the refresh for that matched row. Print `<ID> da co trong dashboard (Folder ID khop), se refresh Tài liệu nguồn va cac cot trang thai`.
   - Otherwise → mark `addNewRow = true` and continue.
5. Run the disk sub-scans for `<ID>` only — up to 10 artifact types (6 UI + 4 API when their parent folders exist, contracts §3) → `scanResult[<ID>]`. Build a single-entry `regexList` from `<ID>` itself using the same shape-signature algorithm as top-down Phase 1 step 2a (so compound disk names like `<ID>_SomeSuffix` will match back to `<ID>`). For `requirement-files`, apply the top-down Phase 1 Step 2c layout rules: PRIMARY — scan the MODULE folders for FILES whose basename matches `<ID>` (the UC's source folder = its module folder; the Specs/WF sub-scan covers the UC file itself + same-folder assets sharing the `<ID>` prefix, per top-down Phase 3a); SECONDARY (backward compat) — a sub-folder whose name matches `<ID>` is treated as a per-UC folder. For the QC sources (`uc-review-report/<...>`, etc.), scan sub-folders and extract Folder IDs via the regex; if no folder matches, fall back to a literal-name match `<ID>` exactly. Compose the `Tài liệu nguồn` cell — value/format per contracts §3 (Specs/WF only).
6. **Status computation for `<ID>` only.** Apply the exact same algorithm as top-down Phase 3b, scoped to this single UC — recomputed from disk, no caching:
   - **In-progress check:** for each per-UC skill (contracts §4), check whether `.claude/skills/<skill>/process-logging/<ID>/progress.md` exists. If yes → cell = `status:` line read verbatim.
   - **Done-state derivation** (only when in-progress file is absent) — cell value/format for every column: per contracts §5, per column. `Review stt` / `Scenario stt` / `TC stt` from `scanResult` (audited parse contract in §5); `API stt` from the API artifact scan when API design artifacts exist (api-audited parse contract lives ONLY in contracts §5); `Automation stt` / `Execute stt` when the automation project exists (`Execute stt` keeps its cell verbatim when the summary is missing or lacks the UC). Parse failures → the §5 fallback cells + warnings.
   - If the automation project folder exists AND the dashboard lacks `Automation stt`/`Execute stt` column(s) → mark them for injection. If API design artifacts exist AND the dashboard lacks `API stt` → mark it too. Bottom-up NEVER injects `Site`/`Module` (no handoff data to justify or fill them).
7. **If `addNewRow == true`:** add a new row to `featureIndex`:
   - `<ID label>` → `<ID>` (folder-derived; will be replaced with canonical ID once `qc-site-map` Mode 3 reconciles).
   - `Folder ID` → BLANK (equal to `<ID label>` until reconciliation — contracts §2).
   - `Site` / `Module` (when those columns exist) and `Tên feature/UC` → BLANK (no upstream context to fill them).
   - `In scope?` → `Need confirm`.
   - `Tài liệu nguồn` → from step 5.
   - Status columns → from step 6 (may be blank).

   **Otherwise (row exists):** update only `Tài liệu nguồn` + status cells on the matched row. Do NOT touch `Site / Module / Tên feature/UC / In scope? / Folder ID` — those are owned by top-down and should not be overwritten by a bottom-up refresh.

8. **Optional upstream alignment check:**
   - If `project-context-master.md` exists, run a feature presence check against its §3.1 (In scope cấp project/release) and §6.1 (Flow chính cấp project): if `<ID>` / its feature appears in NEITHER the §3.1 in-scope list NOR the §6.1 flows → set `outOfContext = true`.
   - If `site-map-handoff.md` exists in dashboard inbox, read it. If `<ID>` is NOT present (neither as Feature ID nor as a Folder alias) → set `outOfHandoff = true`.
9. **Sort + write dashboard.** Inject any automation columns marked in step 6 (at their contracts §2 positions). Apply the same Phase 5 sort logic as top-down (Step 2 + Step 3 + Step 5). For a single-UC bottom-up that adds a row, the sort level may have changed — re-evaluate and update the `Sorting:` line if needed. Then write the dashboard back (in-place).
10. **Write to site-map orphan inbox** (only if `addNewRow == true`). Resolve `.claude/skills/qc-site-map/inbox/dashboard-orphans.md`. Apply append+dedupe semantics (same as top-down Phase 4):
    - File missing → create from the contracts §6b schema.
    - File present + entry for `<ID>` already there → update only `Detected at` to current ISO timestamp.
    - File present + entry for `<ID>` missing → append a new row with `<ID>` + its `Folder paths (per source)` + the full 6-type `Files stt` summary from `scanResult` (contracts §3, orphan-handoff consumer) + current timestamp.

    If `addNewRow == false` → SKIP this step. The row already exists; no need to orphan-track again.

11. Emit the user message:

    ```text
    ✅ <message tuy theo trang thai>:
       - <addNewRow==true>:   Da them row moi cho <ID> vao qc-dashboard.md (In scope? = Need confirm).
       - <addNewRow==false>:  Da refresh Tài liệu nguồn + cac cot trang thai cho row <ID> trong qc-dashboard.md.

    📊 Trang thai sau khi doc lai tu disk:
       - Tài liệu nguồn:  <value | Chưa có tài liệu>
       - Review stt:      <value | (blank — chua co file audited)>
       - Scenario stt:    <value | (blank)>
       - TC stt:          <value | (blank)>
       - API stt:         <value | (blank | column chua duoc inject)>
       - Automation stt:  <value | (blank | column chua duoc inject)>
       - Execute stt:     <value | (blank | column chua duoc inject)>

    <only when addNewRow==true:>
    ✅ Da ghi <ID> vao .claude/skills/qc-site-map/inbox/dashboard-orphans.md cho qc-site-map Mode 3 reconcile.

    ⚠️ <ID> chua co trong tai lieu upstream:
    - project-context-master.md: <CO | KHONG CO | KHONG TIM THAY FILE>
    - site-map-handoff.md: <CO | KHONG CO | KHONG TIM THAY FILE>

    De reconcile orphan thanh canonical feature, hay chay /qc-site-map va chon Mode 3 (confirm orphans from dashboard).
    ```

    Suppress the upstream-warning paragraph when both `outOfContext` and `outOfHandoff` are false.

12. Worklog: `Status = Done (bottom-up)`. Append `qc-dashboard.md` (always) and `dashboard-orphans.md` (only if appended) as the Output.

### Bottom-up boundaries

- Bottom-up does NOT delete or consume `site-map-handoff.md`.
- Bottom-up does NOT delete `dashboard-orphans.md` — it only appends/dedupes.
- Bottom-up does NOT run the site-map gap review (Phase 0.5 is top-down only).
- Bottom-up does NOT prompt the user during the run — it is a one-shot manual invocation; warnings are emitted as text only.
- Bottom-up may create the dashboard file from template if missing, with the default ID label.
- Bottom-up NEVER injects the `Site` / `Module` columns (top-down only, driven by handoff data). It MAY inject `API stt` (when API design artifacts exist) and `Automation stt` / `Execute stt` (when the automation project exists).
- Bottom-up DOES re-evaluate + rewrite the `Sorting:` line if the row added changed the sort level.
