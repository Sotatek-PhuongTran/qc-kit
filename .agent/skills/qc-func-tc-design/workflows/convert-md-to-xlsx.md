## Convert Test Cases MD → XLSX (Auto-triggered Workflow)

> **Trigger:** This workflow is auto-triggered by `SKILL.md` → "Skill Execution Steps" → Step B, after the test case `.md` file(s) have been finalized by `generate-test-cases.md` or `update-test-cases.md`. Do NOT invoke this workflow directly outside that orchestration.

### Purpose

Convert the finalized test case markdown into the project's standard `.xlsx` artifact, using the shared converter script. This workflow performs format translation only — no test case content is added, removed, or rewritten here. Encoding and layout requirements are governed by `qc-func-tc-design/rules/testcase-instruction-rules.md` (Rules 0a–0d, "Sheet Layout & Section Headers").

### Step 1: Locate the MD Input

- Identify the finalized `.md` file(s) just produced for the current `[UC-ID]`:
  - Single-file output: one `.md` at the test case folder for the UC.
  - Multi-part output: multiple `[UC-ID]_*_part*.md` files for the same UC.
- Read `path-registry.md` to confirm the test case folder for the UC.
- DO NOT modify, re-sort, or rewrite the md content.

### Step 2: Verify Conversion Prerequisites

Before invoking the converter, confirm:
- The md file(s) follow the encoding rules in `qc-func-tc-design/rules/testcase-instruction-rules.md` (Rules 0a–0d): UTF-8, preserved Vietnamese diacritics for VI projects, no transliteration applied.
- The md file(s) follow the layout rules ("Sheet Layout & Section Headers"): correct `## <Roman>. …` screen headers and `### <Roman>.1. … / <Roman>.2. …` GUI / FUNC section headers; column hierarchy intact.
- The in-md prelude (summary header + RTM at the top of the md) uses only `#` (h1) and `####` (h4) headings — the converter skips these, so they will NOT leak into the xlsx. If a prelude heading uses `##` or `###`, FIX the md before running the script.
- The template at `qc-func-tc-design/templates/Testcase_template.xlsx` has not changed since the script was last updated. If it has changed, update the script before running.

If any prerequisite fails, STOP and report on chat — do NOT silently fix the md.

### Step 3: Run the Converter

```bash
python .claude/skills/qc-func-tc-design/scripts/md_to_xlsx.py \
  --input-glob "<test-case-folder>/[UC-ID]_*_part*.md" \
  --uc-id [UC-ID]
```

If the md is a single file (not multi-part), point `--input-glob` at that single file's path.

First-time setup (run once per machine):
```bash
pip install -r .claude/skills/qc-func-tc-design/scripts/requirements.txt
```

The script handles the following automatically — do NOT re-implement in your own openpyxl code:
- Reads `qc-func-tc-design/templates/Testcase_template.xlsx` and writes into the **single** `Test cases` sheet (column headers in row 1 are kept; do NOT rename the sheet, do NOT add columns).
- Auto-versioning: scans the test case folder for any existing `*_v{N}.xlsx` whose name contains the UC id, picks the next version. Refuses to overwrite.
- Merges multi-part draft files in `partN` order.
- Skips `#` (h1) and `####+` (h4+) headings — the in-md prelude (summary header + RTM) does NOT leak into the xlsx.
- Inserts header rows (text in column B only, other columns blank, NOT counted as test cases) for `## <Roman>. <screen-line>` and `### <Roman>.1. … / <Roman>.2. …`. The script keys off the `##` / `###` prefix only, so any language wording is accepted.
- Strips inline annotations like `[NEW]`, `[UPDATED — …]` from titles before writing — the draft md keeps them, the xlsx does not.
- Re-opens the saved file and verifies Vietnamese diacritics on sample cells; exits non-zero on mojibake (VI projects only — for EN projects this emits a harmless `WARN: No Vietnamese-diacritic sample found` and proceeds).

### Step 4: Self-Verification (MANDATORY)

After the script exits, open the produced `.xlsx` and spot-check at least 3 rows containing non-ASCII text. If any cell shows: ASCII-only Vietnamese (no dấu, VI projects only), `?` boxes, mojibake (e.g., `Ä\x90`, `Ã©`), or any character that doesn't match the source — STOP, debug the script, regenerate. Do NOT deliver a partially-stripped output. (See Rule 0d in `testcase-instruction-rules.md`.)

### Step 5: Hand Back

Return control to `SKILL.md` → "Skill Execution Steps" → Step C, which will report the produced artifact and any noteworthy items on chat. This workflow does NOT write a summary file.
