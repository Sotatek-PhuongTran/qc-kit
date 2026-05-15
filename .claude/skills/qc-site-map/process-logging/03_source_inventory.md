# Phase 3 — Source Inventory

- run_id: qc-site-map-001
- phase: Phase 3
- mode: Initialization

## Source classification

| Source | Loại | Confidence | Đóng góp cho site map |
|---|---|---|---|
| `docs/qc-lead/high-level-files/UC_LIST_Mobile.md` v1 | **BA-provided** (Sidebar "Từ wireframe") | **High** for sidebar/menu; **Medium** for screen breakdown | Sidebar grouping (GIỚI THIỆU / DỊCH VỤ / KCN-KKT / TIN TỨC & TRA CỨU / CÀI ĐẶT) + ánh xạ menu→UC; danh sách 19 file UC chứa ~95 UC. |
| `docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md` v1 | BA-provided (BA-confirmed ĐỢT 1) | High | Role/access (PQ-01..PQ-07); UI rule per màn (UX-01..UX-14); integration per màn (KT-01..KT-18); scope (NV-01..NV-10). |
| `docs/qc-lead/high-level-files/ACTION_ITEMS_Mobile.md` v1 | BA-provided | Medium | Items chưa thiết kế (Toast/Empty/Error) + UC chờ BA/KH (UC41, UC2 detail, UC55 đăng ký tư vấn). |
| `docs/qc-lead/project-context-master.md` | Project baseline | High | Modules, roles, flows FLOW-001..009, integrations, data objects, NFR. |
| `docs/qc-lead/project-config.md` v2 | Meta-config (placeholder) | Low | Chỉ tham chiếu environment (không ảnh hưởng cấu trúc màn). |
| `docs/qc-lead/qc-dashboard.md` | Workflow tracking | N/A (không dùng làm source truth) | Cross-check feature IDs cho handoff. |
| `docs/BA/<UC-ID>/` spec + wireframe | SRS / spec / wireframe | **Missing** | Không có để derive screen detail. |
| `docs/BA/Common rule/CMR_Mobile.md` | Common rule | **Missing** | Không có. |
| Approved official site map doc | Official | **None** | Không có document riêng "site map approved". |
| Release notes / change logs | Reference | **None** | Không có. |

## Source mix conclusion

- **Best evidence** = sidebar navigation trong `UC_LIST_Mobile.md` + project-context-master.
- Status overall: **Derived / Mixed (medium confidence)**.
- Cannot reach `Official` quality cho site map cho đến khi BA cấp lại wireframe + spec.

## Effect on screen status defaults

| Loại screen | Default status |
|---|---|
| Menu items có trong Sidebar | `Derived` (medium-high) |
| Sub-screen / tab / modal trong UC | `Need confirm` (no wireframe evidence) |
| Auth flow screens (Login / Register / Forgot MK) | `Derived` (medium — FLOW-001..002, FLOW-008..009) |
| UC73 "Thủ tục hành chính" | `Conflict` (sidebar có, dashboard `Need confirm`, project-context có UC70 Removed → confusion) |
| UC41 "Cho thuê đất" | `Need confirm` (chờ BA) |
| UC55 đăng ký tư vấn (sub-flow) | `Need confirm` (chờ KH) |
| Toast / Empty / Error overlay | `Need confirm` (chưa thiết kế) |

## Next phase

Phase 4 — Screen inventory with stable SCR-IDs.
