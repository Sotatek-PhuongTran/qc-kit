# Context Section 04 - System structure and related high-level files

## Draft content
**Cấu trúc tổng:** 1 site Mobile (native iOS + Android) giao tiếp Backend API (REST/JSON); một số nội dung (VBPL, Tin tức) hiển thị qua WebView; Push qua FCM (Android) + APNs (iOS); Auth qua VNeID deep-link hoặc username/password.

| Site / portal / app | Mục đích | Nhóm user chính | Module chính | Ghi chú |
|---|---|---|---|---|
| Mobile (iOS + Android) | Cung cấp kênh mobile cho NĐT tra cứu + quản lý hồ sơ + dịch vụ công | Khách (public), NĐT CN, NĐT DN | 6 module: (1) Xác thực & QL TK, (2) Trang chủ & Điều hướng, (3) QL hồ sơ & Dịch vụ, (4) Tra cứu KCN/KKT & Quỹ đất, (5) Tin tức/Thông tin/Hỗ trợ, (6) Thông báo | Detail UC list nằm ở `qc-dashboard.md` |

**Related high-level files (owner, vai trò):**

| File | Vai trò | Trạng thái | Owner |
|---|---|---|---|
| `docs/qc-lead/high-level-files/UC_LIST_Mobile.md` | Master UC inventory (19 file UC, ~95 UC) + Sidebar navigation | v1 | QC Agent (đầu vào BA) |
| `docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md` | Single source of truth assumptions + BA response (append-only theo đợt) | v1 — ĐỢT 1 done, ĐỢT 2 pending | BA (han.luong / huy.lai2) |
| `docs/qc-lead/high-level-files/ACTION_ITEMS_Mobile.md` | Theo dõi design item + UC chờ BA/KH | v1 | BA |
| `docs/qc-lead/qc-dashboard.md` | Feature/UC list + trạng thái files (Specs/WF/Audited/Scenario/TC) + trạng thái review/scenario/TC | Live | `qc-dashboard-sync` |
| `docs/qc-lead/project-config.md` | Project meta-config (links, environments, accounts, third-party API) | v2, partial — links còn placeholder | QC Lead |
| `docs/qc-lead/project-context-master.md` | File này — project context tổng quan | Live | `qc-context-master-02` |
| Spec UC chi tiết (`docs/BA/<UC-ID>/`) | SRS Mobile per UC + wireframe PNG | Chưa tồn tại trên repo hiện tại — chỉ thấy reference path | BA |
| Common rule (`docs/BA/Common rule/CMR_Mobile.md`) | Common Mobile Rules + empty-state design | Chưa tồn tại trên repo hiện tại | BA |

**Lưu ý:** Detail feature/UC list không được liệt kê tại đây — xem `qc-dashboard.md`.

## Sources used
| Source | Evidence summary |
|---|---|
| `UC_LIST_Mobile.md` §B-F | 19 file UC, 1 site Mobile, 6 module |
| `ASSUMPTION_BACKLOG_Mobile.md` BS-01, KT-09, KT-16 | Kiến trúc Auth + WebView + Push |
| `qc-dashboard.md` | 21 row chia 6 module |
| `project-config.md` | 4 environment, project meta-config |
| existing project-context-master.md §5 | Kiến trúc tổng quát |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Sơ đồ kiến trúc hệ thống chính thức (FE / BE / Auth / Integration) chưa có | Needs BA/Tech Lead source | Cao | Tech Lead |
| Folder `docs/BA/` chưa tồn tại — chưa thể tra cứu spec chi tiết và common rule book | Needs BA/Tech Lead source | Cao | BA |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Backend là REST/JSON | Suy từ assumption "API gọi từ FE" + WebView + content CMS | Trung — nếu là GraphQL/SOAP sẽ ảnh hưởng integration test | Yes — Tech Lead |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
Medium
