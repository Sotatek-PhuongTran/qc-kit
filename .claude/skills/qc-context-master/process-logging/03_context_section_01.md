# Context Section 01 - How QC Agents should use this file

## Draft content
| Nhóm Skill | Cách sử dụng project context | Cần đọc thêm file nào |
|---|---|---|
| Site map / dashboard / high-level review | Hiểu cấu trúc 1 site Mobile + 6 module + 21 row UC group, nắm danh sách Out-of-scope (NV-01..NV-08, UC70) và 11 dòng đang chờ BA/KH | `qc-dashboard.md`, `UC_LIST_Mobile.md`, `ACTION_ITEMS_Mobile.md` |
| Spec review (qc-uc-read) | Dùng context tổng quan + Out-of-scope list để loại trừ các UC không thuộc phạm vi mobile (thanh toán, huỷ lịch, xoá tài liệu, nộp báo cáo mới); đối chiếu assumption đã được BA xác nhận trong ASSUMPTION_BACKLOG | `requirement-files/<UC-ID>/`, `ASSUMPTION_BACKLOG_Mobile.md` |
| Scenario design (qc-func-scenario-design) | Xác định role (Khách / NĐT CN / NĐT DN), dependency (VNeID, FCM/APNs, WebView, Google Maps app, Secure Storage, in-app PDF viewer), và critical flow (Đăng nhập VNeID, Quản lý hồ sơ, Đặt lịch, Phản ánh, Nhận thông báo) trước khi thiết kế scenario | `uc-review-report/<UC-ID>/`, spec chi tiết, wireframe PNG (chưa có file Figma) |
| Test case design (qc-func-tc-design) | Áp common rule mobile: lazy load 20 record (KT-02, KT-15, UX-04); CMND/CCCD 9/12 số; MST DN 10/13 số (BS-09); auto-fill có cho sửa (UX-07); FAQ accordion mở nhiều (UX-11); thay đổi MK → đăng xuất (BS-07); push/in-app only (KT-18) | `func-test-scenarios/<UC-ID>/`, spec, wireframe |
| Test execute | Hiểu môi trường (DEV/QA/UAT/PROD), agent **không thực thi test** — execution do QC engineer chạy tay/CI ngoài framework; chú ý dependency thiết bị (iOS APNs / Android FCM) | `project-config.md`, test cases, test data |
| Bug verify | Đối chiếu impact area (Auth-VNeID, Hồ sơ, Đặt lịch, Phản ánh, Thông báo push) và regression area (Sidebar navigation, Trang chủ Quick Access) | Bug report, spec, test case |

**Quy tắc sử dụng:**
Nếu thông tin trong file này mâu thuẫn với spec/wireframe/assumption đã được BA xác nhận, Agent phải báo conflict và ưu tiên `ASSUMPTION_BACKLOG_Mobile.md` (BA-approved) hoặc spec UC chi tiết, trừ khi QC Lead có chỉ định khác.

## Sources used
| Source | Evidence summary |
|---|---|
| `qc-dashboard.md` | 21 row + cấu trúc Files stt + status track |
| `UC_LIST_Mobile.md` | 19 file UC + Sidebar |
| `ASSUMPTION_BACKLOG_Mobile.md` | 40 BA-confirmed assumptions ĐỢT 1 + 3 chờ BA |
| `ACTION_ITEMS_Mobile.md` | 4 design items + 3 UC chờ BA/KH |
| existing project-context-master.md | Chú thích `agent không execute test thực tế` (run-009) |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| (không có gap riêng cho section này) | - | - | - |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Agent không execute test thực tế (carry-over từ project-context cũ) | Đã được QC Lead xác nhận run-009, 2026-05-13 | Nếu sai sẽ ảnh hưởng phạm vi tự động hoá | No (đã confirmed) |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
High
