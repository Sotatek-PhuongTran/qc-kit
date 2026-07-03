# qc-dashboard-sync — Bottom-up workflow

> **Mode: bottom-up.** Invoked by manual `/qc-dashboard-sync <UC-ID>` (caller passes `uc_id`). Mode routing is decided in `../SKILL.md` § "Two modes".
>
> **Shared contracts live in `../references/contracts.md`** — read it first: "Schema" → §2, "Files stt cell format" → §3, "Process-log parse contract" → §4, "Done-state derivation" → §5, "Bottom-up output handoff" → §6b, "Sort order directive" → §7. References to "top-down Phase 0 step 5 / Phase 1 step 2a / Phase 3b / Phase 5" point to `top-down.md`.

## Bottom-up workflow

Triggered ONLY by the user running `/qc-dashboard-sync <UC-ID>` manually. Per-UC skills do not auto-invoke this skill anymore — they only maintain their existing per-UC subfolder progress.md for resume; the user runs `/qc-dashboard-sync <UC-ID>` to refresh the dashboard row.

### Bottom-up steps

1. Generate `run_id` and append worklog row `Status = Running (bottom-up, uc_id=<ID>)`.
2. Resolve `qc-dashboard` path. If the file does not exist → create it from `templates/qc-dashboard-template.md` with `<ID label> = Use Case ID` (default). Do NOT prompt for the label here (top-down handles the prompt; in bottom-up the default is safe).
3. Parse the existing dashboard (header + `featureIndex` keyed by column 2 + `folderIDIndex` keyed by column 3). Schema validation + auto-migration: same as top-down Phase 0 step 5. If mismatch and not auto-migratable → STOP and report.
4. **Single-UC scope check (matches by Folder ID, not canonical ID):**
   - If `<ID>` matches an existing `Folder ID` (column 3 of any row) → SKIP "add new row" step but PROCEED with stt + Files stt refresh for that matched row. Print `<ID> da co trong dashboard (Folder ID khop), se refresh Files stt va stt columns`.
   - Else if `<ID>` matches an existing `<ID label>` (column 2) but the row's `Folder ID` (column 3) is different → same as above (the row exists; refresh only).
   - Otherwise → mark `addNewRow = true` and continue.
5. Run the 6-artifact disk sub-scans for `<ID>` only. Build a single-entry `regexList` from `<ID>` itself using the same shape-signature algorithm as top-down Phase 1 step 2a (so compound disk names like `<ID>_SomeSuffix` will match back to `<ID>`). Resolve folder paths inside `requirement-files/<...>`, `uc-review-report/<...>`, etc., scanning sub-folders and extracting Folder IDs via the regex; if no folder matches, fall back to a literal-name match `<ID>` exactly. Compose `Files stt` per "Files stt cell format" section.
6. **stt computation for `<ID>` only.** Apply the exact same algorithm as top-down Phase 3b, scoped to this single UC:
   - **In-progress check:** for each per-UC skill (contracts §4), check whether `.claude/skills/<skill>/process-logging/<ID>/progress.md` exists. If yes → cell = `status:` line read verbatim.
   - **Done-state derivation** (only when in-progress file is absent): per contracts §5 — sparse-parse audited file for `UC review stt` (only when `Audited: V<N>` from step 5 is greater than the cached cell version of the existing row, if any); derive from Files stt for `Scenario design stt` and `TC design stt`; when the automation project exists, count specs for `Automation stt` and parse the run summary for `Execute stt`.
   - If the automation project folder exists AND the dashboard lacks `Automation stt`/`Execute stt` column(s) → mark `injectAutomationColumns = true`.
7. **If `addNewRow == true`:** add a new row to `featureIndex`:
   - Column 2 `<ID label>` → `<ID>` (folder-derived; will be replaced with canonical ID once `qc-site-map` Mode 3 reconciles).
   - Column 3 `Folder ID` → `<ID>` (same as column 2 until reconciliation).
   - `Site / Module / Feature/Use case name` → BLANK (no upstream context to fill them).
   - `In scope?` → `Need confirm`.
   - `Files stt` → from step 5.
   - Columns 8, 9, 10, 11 → from step 6 (may be blank).

   **Otherwise (row exists):** update only `Files stt` (col 7) + stt cells (cols 8, 9, 10, 11) on the matched row. Do NOT touch `Site / Module / Feature/Use case name / In scope?` — those are owned by top-down and should not be overwritten by a bottom-up refresh.

8. **Optional upstream alignment check:**
   - If `project-context-master.md` exists, read its feature list. If `<ID>` is NOT present → set `outOfContext = true`.
   - If `site-map-handoff.md` exists in dashboard inbox, read it. If `<ID>` is NOT present (neither as Feature ID nor as a Folder alias) → set `outOfHandoff = true`.
9. **Sort + write dashboard.** Apply the same Phase 5 sort logic as top-down (Step 2 + Step 3 + Step 5). For a single-UC bottom-up that adds a row, the sort level may have changed (e.g., the new row introduces a new Site/Module) — re-evaluate and update the `Sorting:` line if needed. Then write the dashboard back (in-place).
10. **Write to site-map orphan inbox** (only if `addNewRow == true`). Resolve `.claude/skills/qc-site-map/inbox/dashboard-orphans.md`. Apply append+dedupe semantics (same as top-down Phase 4):
    - File missing → create from schema in "Bottom-up output handoff".
    - File present + entry for `<ID>` already there → update only `Detected at` to current ISO timestamp.
    - File present + entry for `<ID>` missing → append a new row with `<ID>` + its `Folder paths (per source)` + the just-computed `Files stt` + current timestamp.

    If `addNewRow == false` → SKIP this step. The row already exists; no need to orphan-track again.

11. Emit the user message:

    ```text
    ✅ <message tuy theo trang thai>:
       - <addNewRow==true>:   Da them row moi cho <ID> vao qc-dashboard.md (In scope? = Need confirm, Folder ID = <ID>).
       - <addNewRow==false>:  Da refresh Files stt + stt columns cho row <ID> trong qc-dashboard.md.

    📊 stt columns sau scan process-log:
       - UC review stt:       <value | (blank — chua co progress.md entry)>
       - Scenario design stt: <value | (blank)>
       - TC design stt:       <value | (blank)>
       - Automation stt:      <value | (blank | column chua duoc inject)>
       - Execute stt:         <value | (blank | column chua duoc inject)>

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
- Bottom-up DOES re-evaluate + rewrite the `Sorting:` line if the row added changed the sort level (e.g., introduces a new portal in a previously single-portal dashboard).
