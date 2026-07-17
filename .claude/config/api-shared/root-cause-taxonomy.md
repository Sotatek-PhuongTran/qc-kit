# Root Cause Taxonomy — FINAL

> Title: Root Cause Taxonomy | Created: 2026-07-10 | Updated: 2026-07-16 (v2.2 — baseline pre-check: mismatch với entry `confirmed=false` không phải bug, stamp `Chưa chốt — baseline chưa confirm`) | Author: QC Kit (API extension) | Version: v2.2 — FINAL (decisions locked with the kit owner at design step 8; v2.1 cleans the language boundary)
>
> Shared contract. Consumers: `qc-bug-report` (classification + bug writing + cell stamping), `qc-bug-verify` (regression scope by root cause), `qc-execute-test-report` (records plain `Fail` — never classifies).
>
> **Language note:** every Vietnamese string in this file is VERBATIM DATA — a label or sentence written into output files exactly as shown. Never translate or paraphrase them.

## 1. Taxonomy (locked: 7 classes, `Lỗi tích hợp` kept separate)

| Root cause label (verbatim) | Meaning | Writes a bug? | Cell stamp (verbatim) |
|---|---|---|---|
| `Lỗi BE` | Server behavior violates the expected result (status / body / side-effect wrong) | Yes | `Fail — BUG-<...>` |
| `Lỗi FE` | UI behavior violates the expected result while the API behaves correctly (display, FE validation, UX flow) | Yes | `Fail — BUG-<...>` |
| `Lỗi tích hợp` | FE calls the wrong API, passes wrong values, or mis-renders a correct response | Yes | `Fail — BUG-<...>` |
| `Lỗi script` | Test-code defect (bad locator, wrong assertion, race, snapshot baseline) | No | `Chưa chốt — lỗi script` |
| `Lỗi môi trường` | Environment down, token/infra outage, third-party sandbox failure | No | `Chưa chốt — lỗi môi trường` |
| `Lỗi data test` | Test data invalid or stale for this environment | No | `Chưa chốt — lỗi data test` |
| `Tài liệu lỗi thời` | The system is right; the doc/UC/TC is outdated | No | `Chưa chốt — chờ cập nhật UC/TC` |

Rules: the first three classes write bugs — failures sharing ONE root cause merge into ONE bug (its evidence lists every TC ID, both branches). The last four never write bugs — each gets its follow-up instead: script → the branch's generate skill in Update mode; environment → name the concrete outage; data → the QC edits the data md; outdated doc → re-audit (`qc-uc-read` / `qc-api-read`) then tc-design in Update mode.

**Baseline pre-check (BEFORE classifying any API-branch failure — `expected-and-verify-policy.md` §4):** a failure that is a mismatch against an api-baseline entry with `confirmed=false` (recognizable by the expect-api assert message containing `lệch baseline` with a note starting `(chưa confirm` — status mismatches carry the full `(chưa confirm — re-record hoặc hỏi BE)`, message mismatches only `(chưa confirm)`) is NOT a bug and is NOT classified into the 7 classes. Cell stamp (verbatim): `Chưa chốt — baseline chưa confirm`. Follow-up: QC/BE confirm the intended value in `api-baselines/<UC-ID>_api-baseline.json` (edit ONLY `confirmed`, or correct the values per BE — that upgrades the entry to rung 1) or delete the entry to re-record, then re-run. A mismatch against a `confirmed=true` entry (assert message notes `(ĐÃ confirm — ứng viên bug)`) is a real regression signal → classify normally (typically `Lỗi BE`).

## 2. Ownership (locked)

- `qc-execute-test-report` records plain `Fail` cells — it never classifies.
- `qc-bug-report` is the ONLY skill that classifies and stamps the result cells (latest run column only).
- Manual TCs are never analyzed by any skill: the QC hand-writes their bugs into the bug file's own section (`## Bug từ TC thủ công (QC tự ghi)`, same detail format, IDs continuing the sequence) and verifies them by hand; skills only remind in chat.

## 3. Counter-evidence matrix (pairs via the "TC UI liên quan" link table)

| Linked UI TC | Linked API TC (same rule) | Suggested conclusion |
|---|---|---|
| Fail | Pass | `Lỗi FE` or `Lỗi tích hợp` — inspect the trace: was the request sent? payload right? response rendered right? |
| Pass | Fail | `Lỗi BE` — the UI may be masking it via FE validation |
| Fail | Fail | `Lỗi BE` at the root — ONE bug, evidence from both branches |
| Fail | Not run / does not exist | **One-sided rule (locked at M1):** classify from the available evidence; the bug MUST contain the verbatim line `kết luận dựa trên 1 phía đối chứng — TC đối chứng chưa chạy/không tồn tại`. NEVER auto-run extra tests — recommend the counterpart run in chat only |

## 4. Root cause → regression scope (locked; consumed by qc-bug-verify)

| Root cause | Regression set |
|---|---|
| `Lỗi BE` | Automated `TC_API_*` of the same resource + linked `TC_MIX_*` + UI TCs sharing an acceptance criterion |
| `Lỗi FE` | Automated UI TCs of the same screen (same spec file) + linked `TC_MIX_*` + TCs sharing an acceptance criterion |
| `Lỗi tích hợp` | Union of the two rows above for the touched screen/resource |
| Legacy bug without a Root cause | Fallback (old rule): same screen + shared acceptance criteria |

## 5. Evidence requirements per bug

Every bug cites: the failing TC IDs (both branches when available), the run column reference in the test-results file, trace/response paths under `runner/test-results/`, the expected result with its source rung (`expected-and-verify-policy.md`), and the counter-evidence row used (the `Đối chứng` field — or the one-sided verbatim line). The root cause goes in the `Root cause` column; the user still edits ONLY the `Trạng thái` column.
