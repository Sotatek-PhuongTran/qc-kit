# Context Section 06 - Business flows, module relationships, and impact areas

## Draft content
### 6.1 Flow chính cấp project

| Flow ID | Flow name | Actor chính | Module/site liên quan | Trigger | Kết quả chính | Ghi chú impact/regression |
|---|---|---|---|---|---|---|
| FLOW-001 | Đăng nhập VNeID | NĐT CN/DN | Xác thực & QL TK | User mở app, chưa đăng nhập | Token lưu Secure Storage (BS-04), về Trang chủ | Phụ thuộc app VNeID + OS routing (BS-01) — high regression risk |
| FLOW-002 | Đăng nhập username/password | NĐT CN/DN | Xác thực & QL TK | User mở app, chọn đăng nhập thường | Token lưu Secure Storage, về Trang chủ | BS-03 không giới hạn số lần nhập sai |
| FLOW-003 | Quản lý hồ sơ đầu tư | NĐT DN | QL hồ sơ & Dịch vụ + Trang chủ | User vào "Quản lý hồ sơ" từ Sidebar/Quick Access | Xem + tìm kiếm + theo dõi hồ sơ | UX-05 tìm kiếm theo mã/tên + filter tab; UC45-51 review v1 Score 70.8 |
| FLOW-004 | Đặt lịch nộp hồ sơ | NĐT DN | QL hồ sơ & Dịch vụ | User vào "Quản lý đặt lịch" | Xem + quản lý lịch đã đặt từ web (không tạo mới — NV-01, không huỷ — NV-02) | Lazy load 20 (UX-04) |
| FLOW-005 | Gửi phản ánh kiến nghị | NĐT CN/DN | QL hồ sơ & Dịch vụ + Auth | User vào "Phản ánh kiến nghị" | Lưu nháp / Gửi / Hủy bỏ (UX-06); auto-fill thông tin (UX-07) | Workflow state phức tạp |
| FLOW-006 | Tra cứu KCN/KKT (public) | Khách | Tra cứu KCN/KKT & Quỹ đất | User mở app + vào module Tra cứu (không yêu cầu đăng nhập — PQ-01) | Xem danh sách (lazy load 20 — KT-02) + chi tiết (KT-03 chờ BA) | Public access |
| FLOW-007 | Nhận thông báo push | NĐT CN/DN | Thông báo | Hệ thống emit event (đặt lịch / hồ sơ / tin tức...) | Push qua FCM/APNs (KT-16), deep link cold start (KT-17), in-app | NV-09 chờ BA xác nhận loại thông báo; không có Email (KT-18) |
| FLOW-008 | Đăng ký NĐT (CN hoặc DN) | NĐT mới | Xác thực & QL TK | User mở app, chọn "Đăng ký" | Validate CMND/CCCD 9/12 (BS-09), MST DN 10/13 (BS-09, BS-11), auto-login sau đăng ký (UX-14) | MST DN không sửa sau đăng ký (BS-11) |
| FLOW-009 | Đổi mật khẩu | NĐT CN/DN | Xác thực & QL TK | User vào Cấu hình tài khoản | Sau đổi MK bắt buộc đăng xuất (BS-07) | Regression: invalidate token + redirect đăng nhập |

### 6.2 Quan hệ giữa module / data / integration

| Area A | Liên quan đến Area B | Kiểu liên quan | Ảnh hưởng QC |
|---|---|---|---|
| Xác thực & QL TK | Tất cả module yêu cầu đăng nhập (Hồ sơ, Đặt lịch, Phản ánh, Báo cáo, Thông báo cá nhân) | Permission / Workflow | Mất token → bật chế độ Khách, hạn chế navigation |
| Trang chủ & Điều hướng | Mọi module | Workflow / Navigation | Sidebar chứa toàn bộ menu (UX-03); Quick Access cố định (UX-01); Badge thông báo fetch on focus (UX-02, KT-01) |
| QL hồ sơ & Dịch vụ ↔ Thông báo | Thông báo có thể trigger từ thay đổi trạng thái hồ sơ / lịch hẹn / phản ánh (NV-09 chờ BA) | Notification | Test cross-module: thay đổi trạng thái → kiểm tra push |
| Phản ánh kiến nghị ↔ User profile | Auto-fill họ tên/SĐT/Email (UX-07) | Data dependency | Phải kiểm tra dữ liệu auto-fill sau khi user sửa profile |
| Tra cứu KCN/KKT ↔ Quỹ đất / Cho thuê đất | Cross-module link | Data dependency | UC41 (Cho thuê đất) tách khỏi UC40 (Quỹ đất) — chờ BA |
| Tin tức / VBPL / TTHC | WebView (KT-09) + Google Maps app external (KT-12, KT-13) | Integration | WebView crash / mạng yếu — regression area |
| Đổi MK | Auth/Session | Workflow | Token invalidation logic (BS-07) — high regression risk |

## Sources used
| Source | Evidence summary |
|---|---|
| `ASSUMPTION_BACKLOG_Mobile.md` (ĐỢT 1) | BS, UX, KT, NV — flow + dependency |
| `qc-dashboard.md` UC review stt | UC1 Score 71.5, UC45-51 Score 70.8 (đã review) |
| existing project-context-master.md §7 | Critical flow + high-risk area cũ |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Biểu đồ flow chính thức (BPMN/sequence) chưa có — chỉ suy từ assumption + UC | Needs BA/Tech Lead source | Trung | BA |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Lịch hẹn được tạo từ web, mobile chỉ xem/quản lý | NV-01 confirmed | Thấp | No |
| Phản ánh có 3 state: Nháp / Gửi / Huỷ bỏ | UX-06 confirmed | Trung | No |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
High
