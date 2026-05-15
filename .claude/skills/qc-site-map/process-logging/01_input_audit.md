# Phase 1 — Preflight Input Audit

- run_id: qc-site-map-001
- phase: Phase 1
- mode: **Initialization** (`docs/qc-lead/qc-site-map.md` does NOT exist)

## Resolved paths (from `path-registry.md`)

| Logical name | Path | Status |
|---|---|---|
| `qc-site-map` | `docs/qc-lead/qc-site-map.md` | Missing → will create |
| `project-context-master` | `docs/qc-lead/project-context-master.md` | Present (Live) |
| `project-config` | `docs/qc-lead/project-config.md` | Present (v2 placeholder) |
| `qc-dashboard` | `docs/qc-lead/qc-dashboard.md` | Present |
| `agent-work-log` | `docs/qc-lead/agent-work-log.md` | Present |
| `High-level-files` | `docs/qc-lead/high-level-files/` | Present (3 files) |
| `requirement-common-files` | `docs/BA/Common rule/` | **Missing** (cleared by commit 45c7d81) |
| `requirement-files` | `docs/BA/<UC-ID>/` | **Missing** (cleared by commit 45c7d81) |

## Source folders / files found

- `docs/qc-lead/high-level-files/UC_LIST_Mobile.md` v1 — Master UC list + **Sidebar navigation derived from wireframe** (best sitemap evidence).
- `docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md` v1 — Role/access (PQ-01..PQ-07) + UI rules (UX-01..UX-14) + integrations (KT-01..KT-18) + scope items (NV-01..NV-10).
- `docs/qc-lead/high-level-files/ACTION_ITEMS_Mobile.md` v1 — Pending design items (Toast/Empty/Error states) + UC41/UC2-detail/UC55-flow chờ BA.
- `docs/qc-lead/project-context-master.md` — Baseline (modules, roles, flows, integrations, dashboard cross-link).
- `docs/qc-lead/qc-dashboard.md` — 33 feature rows (Mobile site) for cross-check.

## Source type detection

| Source type | Available? | Notes |
|---|---|---|
| Official sitemap doc | Partial | `UC_LIST_Mobile.md` chứa "Cấu trúc Sidebar Navigation (Từ wireframe)" — chấp nhận như BA-provided sitemap. |
| Menu / navigation docs | Yes (sidebar) | Trong `UC_LIST_Mobile.md`. |
| Feature / UC list | Yes | `UC_LIST_Mobile.md` + `qc-dashboard.md`. |
| Wireframe index / screen list | **Missing** | Folder `docs/BA/<UC-ID>/` đã bị clear. |
| User flow / journey | Partial | Flow FLOW-001..FLOW-009 trong `project-context-master.md` §6.1. |
| Role / permission matrix | Partial | PQ-01..PQ-07 + §5 project-context-master. |
| SRS / spec fallback | **Missing** | Folder `docs/BA/` không tồn tại. |
| Release notes / change log | None | — |

## Missing source groups

- Wireframe PNG / screen mockup (cleared).
- SRS / spec chi tiết per UC (cleared).
- Common rule book `CMR_Mobile.md` (cleared).
- API spec / Architecture diagram (chưa từng được cung cấp — Q-004).

## Stop blockers

- None. `project-context-master.md` đầy đủ + sidebar có sẵn → có thể tạo skeleton site map ở mức **Derived / Partial confidence**.

## Next phase

Phase 2 — Project Context Baseline extraction.
