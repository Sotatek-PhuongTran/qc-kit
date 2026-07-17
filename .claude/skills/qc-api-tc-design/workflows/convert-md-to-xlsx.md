# Convert API TC md → xlsx (Phase 2)

> Title: API TC Convert Workflow | Created: 2026-07-10 | Author: QC Kit (API extension — step 4) | Version: v1
>
> Uses the SHARED converter `qc-func-tc-design/scripts/md_to_xlsx.py` (same 6-column layout, same `Testcase_template.xlsx`, TC-row regex covers `TC_API_*`/`TC_MIX_*`). Do NOT write a new script (testcase-instruction-rules A2 applies to this skill too).

## Step 0 — Verification gate (per variant, BEFORE `last_phase_done: 1`)

For each variant V: compare TC count + section headers of the deliverable md against the scratch `02_designed_api_tcs_<V>.md`. Mismatch → the deliverable write was interrupted: re-materialize the deliverable FROM the scratch (atomic Write), re-compare. Match → write `last_phase_done: 1` to `progress.md`; worklog `status = "Running (Phase 2)"`.

## Step 1 — Run the converter (per variant)

```bash
python .claude/skills/qc-func-tc-design/scripts/md_to_xlsx.py \
  --input-glob "<api-testcases dir>/<UC-ID>_*api-testcases_<V>_<YYYYMMDD>_v<N>*.md" \
  --uc-id <UC-ID> \
  --output-dir "<api-testcases dir>"
```

- Point the glob at the md version Phase 1 just wrote (single file or its `_partN` parts). The script derives the xlsx name from the md base name (strips `_partN`): SAME base name, SAME `_v<N>` — per `naming-convention.md` the md and xlsx differ only by extension, versions always match. `--output-name` remains available as an explicit override for exceptional cases — never use it to diverge from the md base name.
- Dependencies: `pip install -r .claude/skills/qc-func-tc-design/scripts/requirements.txt` (openpyxl) if missing.

## Step 2 — Verify output

1. Script self-verifies diacritics/mojibake (its exit code ≠ 0 → STOP, report, do not deliver).
2. Check: xlsx TC-row count == md TC count; section header rows == md `##`/`###` count. Mismatch → STOP and report (do not hand-edit the xlsx).
3. Spot-check 3 rows: endpoint backticks intact, `<br>` split into lines, no stripped Vietnamese.

## Step 3 — Checkpoint + hand back

Worklog `status = "Phase 2 done"` + append xlsx path to `output`. Control returns to SKILL.md Step C (chat report) → Step D (cleanup).
