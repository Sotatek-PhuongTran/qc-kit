# API Findings Contract

> Title: API Findings Contract | Created: 2026-07-10 | Updated: 2026-07-16 (v2 — `TC bị ảnh hưởng` ghi UC-qualified `UC-101/TC_API_001`; routing "doc lỗi thời" → `qc-api-tc-design` update trước, re-audit chỉ khi đổi nghiệp vụ) | Author: QC Kit (API extension — step 1) | Version: v2
>
> Shared contract. Consumers: `qc-api-auto-generate` (writer), `qc-auto-run` (context), `qc-execute-test-report` (GATE), user/dev (answer column). Mirrors the `crawl-findings` pattern so the user learns ONE mechanism for both branches.

## Purpose

Living question log for **mismatches between the designed API tests and the REAL running system**, discovered at probe/generate/run time. One file per resource. This is NOT the place for requirement-level questions to BA/BE at design time — those go to `api-question-backlog` (via `qc-qna` API mode).

| Belongs here (api-findings) | Belongs in api-question-backlog |
|---|---|
| Endpoint in TC returns 404/405 on the test env | API doc missing an operation the UC implies |
| Param accepted by doc is rejected by the real API | Validation rule unclear in the requirement |
| Response shape differs from the generated schema | Expected behavior undefined for an edge case |
| Auth scheme behaves differently than configured | Which roles may call an operation is unspecified |

## File location & naming

- Path: resolve logical name `api-findings` → `docs/qc/automation/api-findings/`
- Name: `<resource>_api-findings.md` — LIVING file: NO date, NO version, edited in-place (same exception class as `crawl-findings`).

## Row schema

| Column | Filled by | Content |
|---|---|---|
| `#` | qc-api-auto-generate | Sequential ID within the file |
| `Ngày phát hiện` | qc-api-auto-generate | YYYY-MM-DD |
| `Operation / Endpoint` | qc-api-auto-generate | Operation ID (api-audited §2) + the concrete request tried (method, path, key params) |
| `TC bị ảnh hưởng` | qc-api-auto-generate | `TC_API_*` / `TC_MIX_*` IDs deferred by this finding — ALWAYS UC-qualified because TC IDs are per-UC file-scoped: `UC-101/TC_API_001` (multiple TCs separated by `, `, e.g. `UC-101/TC_API_001, UC-102/TC_API_003`) |
| `Phát hiện` | qc-api-auto-generate | Self-contained (Vietnamese, per qc-writting-rules R1): what was sent, what came back, what was expected per doc/TC |
| `Trả lời của QC/dev/BE` | **user only** | Inline answer (correct endpoint, param rename, "sẽ deploy ngày X", "doc lỗi thời — dùng Y"...) |
| `Trạng thái` | qc-api-auto-generate | Lifecycle below |
| `Ngày giải quyết` | qc-api-auto-generate | YYYY-MM-DD when set to `Đã giải quyết` |

## Lifecycle (identical wording to crawl-findings)

`Chờ trả lời` → (user answers inline) → `Đã trả lời` → (next `/qc-api-auto-generate <UC-ID>` run re-probes/regenerates guided by the answer) → `Đã giải quyết`.

- A finding NEVER stops the generate session: affected specs are deferred (listed in the triage report with the finding `#` as unlock condition), everything else proceeds.
- If the answer implies the API DOC is outdated → the skill proposes `/qc-api-tc-design <UC-ID>` update (trigger D — re-binding theo doc mới); it proposes `/qc-api-read <UC-ID>` re-audit ONLY when the answer changes the BUSINESS behavior (a new/updated doc is NOT a re-audit trigger).

## GATE rule (consumed by qc-execute-test-report)

Before recording official results for a UC: **every row whose `TC bị ảnh hưởng` intersects the UC's TCs must be `Đã giải quyết` AND a run must have happened after the resolution.** Otherwise the skill lists the offending rows verbatim and STOPS without writing — same behavior and message shape as the crawl-findings gate.

## Writers

- SOLE writer of all columns except `Trả lời của QC/dev/BE`: `qc-api-auto-generate`.
- `Trả lời của QC/dev/BE`: user/dev/BE only. Any other edit by any skill is a contract violation.
