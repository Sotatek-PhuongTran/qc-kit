# qc-auto-run — Run workflow

> Title: qc-auto-run Run Workflow | Created: 2026-07-17 (tách từ SKILL.md — đợt tái cấu trúc A1, nội dung giữ nguyên) | Author: QC Kit | Version: v1
>
> The FULL run procedure: Phase 0 decision tree → steps 1–11 → failure guidance. `SKILL.md` holds the contract, Phase 0 summary and boundaries; this file is read on every run. Run ALL npm/npx commands from the runner root `docs/qc/automation/runner/`.

## Phase 0 — Scope & branch check (cheap checks ONLY: one project-context-master section + file globs — never open spec/TC contents)

```
0.1  Đọc project-context-master §3.0 Phạm vi test (file thiếu / field trống → DỪNG, yêu cầu chạy /qc-context-master trước):
     ├─ Black-box only  → nhánh chạy = UI. Sang Steps.
     ├─ API only        → nhánh chạy = API. Kiểm tra 0.2 cho riêng nhánh API rồi sang Steps.
     └─ Black-box + API → 0.2
0.2  UC có test case API chưa? (glob `api-test-cases-md` của UC — `*_api-testcases_*_v*.md`, lấy version cao nhất)
     ├─ CHƯA → nhánh chạy = UI; báo (Vietnamese): "UC chưa thiết kế TC API — nhánh API bỏ qua." Sang Steps.
     └─ RỒI  → 0.3
0.3  Script 2 nhánh: tests/<portal>/<UC-ID>/ (UI) và tests/api/<UC-ID>/ (+ tests/mix/<UC-ID>/):
     ├─ THIẾU CẢ 2 → DỪNG: chưa có script nào để chạy — yêu cầu user chạy
     │   /qc-func-auto-generate <UC-ID> và /qc-api-auto-generate <UC-ID> trước, rồi quay lại 0.3.
     ├─ THIẾU 1 trong 2 → DỪNG, confirm user:
     │     (a) chạy nhánh đã có script trước, hay
     │     (b) generate nhánh thiếu (/qc-func-auto-generate hoặc /qc-api-auto-generate) rồi chạy cả 2?
     │   (Chọn (b) → invoke skill generate tương ứng, đợi xong, quay lại 0.3.)
     └─ ĐỦ cả 2 → 0.4
0.4  Lịch sử chạy của UC (reports/summary-latest.md + history/ + cột run trong test-results — chỉ đọc header):
     ├─ ĐÃ có kết quả của 1 trong 2 nhánh / cả 2 → DỪNG, confirm user:
     │     chạy lại cả 2 / chỉ nhánh chưa chạy / chỉ nhánh chỉ định?
     └─ CHƯA từng chạy → nhánh chạy = cả 2.
```

The user's own command always wins: an explicit scope in the invocation ("chạy API của UC-101", one TC ID, one screen, `@P1`) skips the corresponding confirm stops — Phase 0 then only validates that the requested branch has scripts.

## Steps

1. **Go to the runner root:** `cd docs/qc/automation/runner`.

2. **Node check:** `node -v`. Missing → tell the user (Vietnamese) to install Node.js ≥ 18, then stop.

3. **Playwright check + AUTO-INSTALL:**
   - `node_modules/@playwright/test` missing OR `npx playwright --version` fails → `npm install`.
   - Browsers (needed for UI/MIX specs; pure-API runs skip) → `npx playwright install`. On Linux missing system libs → `npx playwright install-deps` (needs sudo — if it fails, tell the user to run it manually).
   - API branch also needs `ajv` → included in package.json; `npm install` covers it.
   - Tell the user what is being installed before doing it.

4. **Environment resolve + CONFIRM (every run):** URLs and accounts are NEVER read from `.env` — the single source is `project-config` (`.env` holds only external-service secrets + optional `API_TOKEN_<ROLEKEY>`, user-filled; ROLEKEY = Key trong bảng `## Accounts` của data md).
   - **Target env**: from the user's command ("chạy trên QA/DEV/STG" — must match an env name in `project-config §3`); not stated → default to the `Environment` in the UC's data md, and say so.
   - **Resolve**: from §3 collect the `<ENV> - <portal>` rows → one URL per portal; **when the API branch runs**: also the `<ENV> - API` row → `API_BASE_URL`. From §4 the accounts for the roles the UC's specs use. **§7 Auth API = env-token** → verify `.env` has the needed `API_TOKEN_<ROLEKEY>` keys (existence only). Missing row/key → ask the user to fill `project-config`/`.env`, then stop. REFUSE production (env name or any URL matching prod).
   - **Confirm before running (Vietnamese)**: print target env, URL per portal + API base URL, branches to run, account usernames per role — NEVER print passwords/tokens — and wait for the user's OK. Skip the prompt only if the user already named the env AND asked to run without confirmation in the same message.

5. **Build test data:** UI branch runs → `npm run build:testdata -- <UC-ID>`; API branch runs → `npm run build:testdata -- <UC-ID> --api`. Validation failure → show the exact error and stop.

6. **Precondition pre-flight (MANDATORY before running):** read `preconditions` from EVERY data json built in step 5 (`../data/<UC-ID>_testdata.json` and/or `../data/<UC-ID>_api_testdata.json`; schema: `qc-func-auto-generate` `references/data-and-secrets.md` + `api-shared/api-testdata-contract.md`). For each row:
   - **Has a `check`** (`api:` / `db:` / `ui:`) → execute it read-only against the configured environment. Check passes → satisfied. Check fails → precondition MISSING.
   - **`manual` with `check = none`** → `Confirmed` filled (`yes — <date> — <name>`) → satisfied; empty → ASK the user (Vietnamese): "Precondition `<key>` — `<required state>` — đã được tạo trên môi trường `<env>` chưa?". Yes → proceed and remind the QC to write `Confirmed` into the data md (this skill NEVER edits data files); No / unattended → MISSING.
   - **MISSING** → the row's dependent TCs are **Blocked**: exclude from scope (`--grep-invert`), record `Blocked — thiếu precondition <key>`. The REST of the suite still runs — never abort the whole run.
   - Automated seed channels are executed by the suite's own setup fixtures during the run — the pre-flight only verifies declared checks, it never seeds.

7. **Run** (scope per Phase 0 + the user's ask; default = the named UC on the resolved branches, minus Blocked TCs). Inject the resolved URLs as process env vars — `playwright.config.ts` maps portals onto `projects`; API/MIX code reads `API_BASE_URL` / `BASE_URL_<PORTAL>` via `helpers/api/auth.ts`:
   `BASE_URL_ORG=<url> BASE_URL_ADMIN=<url> API_BASE_URL=<api url> npx playwright test ...`
   - Both branches of one UC: `npx playwright test tests/org/<UC-ID> tests/api/<UC-ID> tests/mix/<UC-ID>` (only existing dirs)
   - UI only: `npx playwright test tests/<portal>/<UC-ID>/` · API only: `npx playwright test tests/api/<UC-ID>/ tests/mix/<UC-ID>/`
   - One screen/resource: `npx playwright test <spec path>` · By priority: `--grep "@P1"` · One TC: `--grep "<TC-ID>"` (Blocked → report the missing precondition instead)
   - Watch: `--headed`; interactive: `--ui` (UI/MIX specs only).

8. **Write the run summary** — `../reports/summary-latest.md` (overwrite in-place; history copied to `../reports/history/summary_<YYYYMMDD-HHmm>.md` first). Build from `test-results/results.json` (titles carry TC IDs) using `templates/run-summary.template.md`:
   - **`## Per-UC results` keeps its EXACT columns** (dashboard parser contract — `Execute stt`). Pass/Total count ALL branches together; Blocked counts in Total, not Pass, not Failed.
   - **`## Per-branch breakdown`** (additive section): per UC × branch (UI / API / MIX — by TC-ID prefix) pass/fail/blocked.
   - Failed/Blocked detail tables list TCs of every branch (prefix shows the branch). Trace links use the `runner/test-results/...` prefix.
   - **`## Baseline mới ghi / lệch chưa confirm`** (API/MIX runs): scan the run's console output for `[api-baseline] RECORDED <TC>: <status> "<message>"` lines (type "recorded") and the assertion failures whose message says "lệch baseline" with "(chưa confirm ...)" (type "mismatch chưa confirm") → one row each per the template (TC | UC | loại | status/message ghi nhận | hành động chờ: QC/BE confirm `confirmed=true` hoặc xoá entry để re-record). Mismatches against a CONFIRMED entry stay in the Failed detail (bug candidates), not here.

9. **Report on chat (Vietnamese):** pass/fail/blocked per UC AND per branch; failed TC IDs with one-line reasons; baseline entries mới ghi / lệch chưa confirm (nếu có — kèm đề nghị QC/BE confirm hoặc re-record); Blocked TC IDs with the exact missing precondition and how to create it; point to `runner/test-results/results.json` / `npx playwright show-trace <trace.zip>`.

10. **Gate check + AUTO-TRIGGER (đã chốt M4 — chạy thẳng, không hỏi):**
    - **Exception — verify-scoped run:** when this run was invoked by `qc-bug-verify` with a verify-plan scope (`--grep` over the approved TC list), the auto-trigger of execute-report does NOT apply — `qc-bug-verify` writes the results itself (its verify.md §4). Skip this step entirely for such runs.
    - Otherwise, for EACH UC that has results in this run:
      - Gate = every row of the UC's `crawl-findings` files (pages of the UC) AND `api-findings` files (resources of the UC) is `Đã giải quyết`.
      - **Gate sạch** → invoke `/qc-execute-test-report <UC-ID>` via the Skill tool immediately (that skill re-verifies its own gate — double-checking is fine and cheap).
      - **Gate bẩn** → list the offending rows verbatim (file + # + trạng thái), do NOT trigger, and tell the user what to answer + that the next run will re-check.
    - This skill NEVER invokes `qc-bug-report` directly — that hand-off belongs to `qc-execute-test-report`.

11. **Worklog** per `docs/qc-lead/agent-work-log.local/README.md` (single-phase run: start entry → terminal `Done`/`Stopped`).

## Failure guidance

- **UI locator failures** → page-object locators are ONLY generated from a live crawl (getter stamp `// verified: <date> <env>`), so a locator failure means UI drift or a real defect — if the UI changed, suggest `/qc-func-auto-generate <UC-ID>` (Update re-crawls), then re-run.
- **Message/notification lookup failures** → check `portals/<portal>/notification-channels.ts` idiom first — one line fixes every spec using that channel.
- **API `401` on all requests** → token hết hạn / `API_TOKEN_<ROLEKEY>` sai trong `.env`, hoặc `helpers/api/api-conventions.ts` lệch (tokenPath/header) — sửa conventions hoặc refresh token, KHÔNG sửa spec.
- **API `404`/`405` on an endpoint** → binding drift: suggest `/qc-api-auto-generate <UC-ID>` (Update trigger B — re-parse doc, findings row nếu lệch TC md); not an app defect until confirmed.
- **API status/message lệch baseline CHƯA confirm** (assert message có "lệch baseline (chưa confirm ...)") → KHÔNG phải bug: đưa vào section `## Baseline mới ghi / lệch chưa confirm` của run summary + đề nghị QC/BE confirm giá trị đúng (`confirmed=true` trong `api-baselines/<UC-ID>_api-baseline.json`) hoặc xoá entry để re-record, rồi chạy lại. Lệch với entry ĐÃ confirm → ứng viên regression thật (để `qc-bug-report` phân loại).
- **Schema assertion failures hàng loạt** → doc drift: regenerate schemas via `parse-api-doc-script --schemas`, rồi `/qc-api-auto-generate <UC-ID>` update; đơn lẻ → ứng viên bug thật.
- **Data validation failures** → the QC edits `data/<UC-ID>_testdata.md` / `data/<UC-ID>_api_testdata.md`, then re-run.
- **Blocked — thiếu precondition** → the QC creates the state described in the data md `Required state` cell (and writes `Confirmed` for manual rows without a check), then re-runs; only the Blocked TCs need re-running.
