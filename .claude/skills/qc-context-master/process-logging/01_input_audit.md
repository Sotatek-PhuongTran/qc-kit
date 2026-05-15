# Input Audit

- run_id: run-2026-05-15-001
- mode: update
- project-context-master path: docs/qc-lead/project-context-master.md
- qc-dashboard path: docs/qc-lead/qc-dashboard.md
- high-level-files path: docs/qc-lead/high-level-files/
- requirement-common-files path: docs/BA/Common rule/ (KHÔNG tồn tại trên đĩa)
- high-level-files status: OK

## Documents found
| Path | Detected type | Notes |
|---|---|---|
| docs/qc-lead/high-level-files/UC_LIST_Mobile.md | Feature/UC inventory + Sidemap | v1, ~95 UC, 19 file UC, có cấu trúc Sidebar |
| docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md | Common rules + business rules + change log | v1, ĐỢT 1 = 40 items BA confirmed, ĐỢT 2 = 2 chờ BA + KT-03 pending |
| docs/qc-lead/high-level-files/ACTION_ITEMS_Mobile.md | Backlog / known gaps | v1, 4 design items + 3 UC chờ BA/KH |
| docs/qc-lead/project-config.md | Project meta-config | v2, project name placeholder (`test cho MBFS mobile`), environments + accounts là template chưa fill |
| docs/qc-lead/project-context-master.md | Existing project context | Đã có nội dung (Update mode), cấu trúc 10 section nhưng khác template VN mới |
| docs/qc-lead/qc-dashboard.md | Feature/UC dashboard | 21 rows, 1 row Removed (UC70), trạng thái Files/Review/Scenario/TC đang track |

## Missing document groups
| Group | Status | Impact | Suggested owner |
|---|---|---|---|
| Product Brief / High-level BRD/PRD | Missing | Trung — chỉ có UC list + assumption, thiếu business goal & success criteria | PM / BA |
| System Architecture Diagram | Missing | Cao — không có sơ đồ FE/BE/Auth/Integration tổng quan | Tech Lead |
| Tech stack / API overview | Partial — chỉ suy ra từ assumption (FCM/APNs, WebView, VNeID) | Cao — không có spec API tổng quan | Tech Lead |
| NFR / Performance / Security target | Missing | Cao — chỉ có rule lazy load 20 + secure storage rời rạc | PM / Tech Lead |
| Compliance / Legal / Privacy | Missing | Trung — dự án dịch vụ công, có thể cần luật bảo mật thông tin NĐT | Legal / BA |
| Accessibility / Logging policy | Missing | Trung — chưa đề cập trong assumption | PM / Tech Lead |
| Wireframe / Figma URL | Missing trong high-level-files; PNG nằm trong BA folder (chưa tồn tại) | Trung — wireframe được dùng làm nguồn assumption nhưng không có file để QC tra cứu | BA / UI-UX |
| Release plan / phase plan | Missing | Trung — không rõ deadline release v1 | PM |
| Common rule / business rule book | Partial — assumption backlog đóng vai trò common rule; CMR_Mobile.md đề cập trong project-context cũ nhưng không có ở repo | Cao | BA |
| Site map (chính thức) | Partial — UC_LIST có phần "CẤU TRÚC SIDEBAR NAVIGATION" thay site map | Thấp | BA |

## Blockers
| Blocker | Action needed |
|---|---|
| (không có blocker cho Phase 2 trở đi) | High-level-files đủ để build feature inventory + project context core. Tiếp tục với gap markers. |
