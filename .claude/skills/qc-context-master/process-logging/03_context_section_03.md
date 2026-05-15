# Context Section 03 - Overall scope and testing boundaries

## Draft content
### 3.1 In scope cấp project/release (v1)

| Area / site / module / capability | Mô tả ngắn | Priority | Ghi chú |
|---|---|---|---|
| Xác thực & Quản lý tài khoản | Đăng nhập (UC256), Đăng xuất (UC257), Cấu hình tài khoản (UC249), Đăng ký + Quên MK + Cập nhật DN (UC250-254). Hỗ trợ VNeID + username/password | High | BS-01..BS-11, UX-13, UX-14 |
| Trang chủ & Điều hướng | Dashboard + Quick Access + Sidebar (UC1) | High | UX-01..UX-03, KT-01 |
| Quản lý hồ sơ & Dịch vụ | Đặt lịch (UC42-44), Hồ sơ (UC45-51), Kho tài liệu cá nhân (UC52), Phản ánh (UC53/63-65), Báo cáo đã nộp (UC54) | High | KT-06, UX-04..UX-07 |
| Tra cứu KCN/KKT & Quỹ đất | UC2-UC31 (KCN/KKT/TMTD/PTQ/Mô hình khác), UC40 (Quỹ đất) | Medium | KT-02, NV-06 — public access |
| Tin tức, Thông tin & Hỗ trợ | Chuyên trang (UC55), Tin tức (UC56-57/66/68, UC60-61), VBPL (UC69), Hướng dẫn/FAQ (UC71-82), Điều khoản/Liên hệ/Giới thiệu (UC83-86), Xúc tiến đầu tư (UC90, đại diện nhóm UC87-95) | Medium | PQ-03..PQ-07, KT-08..KT-15 |
| Thông báo | Push + in-app (UC258/UC259) | High | KT-16, KT-17, KT-18 |

### 3.2 Out of scope / chưa làm trong phase này

| Area / site / module / capability | Lý do loại trừ / deferred | Ảnh hưởng đến QC |
|---|---|---|
| UC70 — Tra cứu TTHC trên mobile | User xác nhận Removed khỏi WBS (2026-05-13) | Đã đánh `Removed` trong dashboard, không thiết kế test |
| UC41 — Cho thuê đất KCN | Tách khỏi UC40, chờ BA hoàn tất (AI-UC-01) | Theo dõi sau khi BA hoàn tất |
| Thanh toán phí hồ sơ trên mobile | NV-03 — không có trên mobile | Không thiết kế test scenario thanh toán |
| Tạo lịch hẹn mới từ Quản lý đặt lịch | NV-01 — chỉ xem/quản lý lịch đã đặt từ web | Test chỉ cover xem + quản lý |
| Hủy lịch hẹn trên mobile | NV-02 — không có chức năng huỷ | Bỏ qua flow huỷ lịch |
| Xóa tài liệu trong Kho dữ liệu | NV-04 — chỉ xem | Bỏ qua flow xoá |
| Nộp báo cáo mới | NV-05 — chỉ tra cứu báo cáo đã nộp | Bỏ qua flow nộp mới |
| Thay đổi Avatar | UX-12 — chưa có v1 | Bỏ qua |
| Thông báo qua Email | KT-18 — chỉ push/in-app | Không test kênh Email |
| Kết xuất dữ liệu quỹ đất ra Excel | KT-04 — chỉ xem file đính kèm | Không test export |
| Chi tiết KCN (sub-tab Hạ tầng/Nhà đầu tư…) | AI-UC-02 — chờ BA bổ sung | Theo dõi sau |
| Luồng đăng ký tư vấn đầu tư (UC55) | AI-UC55-01 — chờ khách hàng | Theo dõi sau |
| Nhóm quy mô vốn (UC87-95) | NV-07 — đã xoá khỏi UC | Không test filter quy mô vốn |

### 3.3 Assumption, dependency, constraint quan trọng

| Loại | Nội dung | Ảnh hưởng đến QC Agent | Cần xác nhận? |
|---|---|---|---|
| Assumption | 40 assumption ĐỢT 1 đã được BA xác nhận trong `ASSUMPTION_BACKLOG_Mobile.md` (PQ, BS, UX, KT, NV) | Là common rule cho mọi scenario/TC | No (đã confirmed) |
| Assumption | ĐỢT 2: NV-09 (loại thông báo ngoài hồ sơ), NV-10 (Giới thiệu tĩnh/CMS) chờ BA | Có thể mở rộng scope UC258/259, UC86 | Yes — BA |
| Assumption | KT-03 (cách thể hiện KT/XH/MT — bảng số liệu/biểu đồ) chờ BA | Ảnh hưởng UI test UC2 chi tiết KCN | Yes — BA |
| Dependency | VNeID (deep-link / in-app browser) — BS-01 | Có thể chặn flow UC256 nếu app VNeID không cài | Yes — Tech Lead xác nhận flow fallback |
| Dependency | FCM (Android) + APNs (iOS) — KT-16 | Push notification UC258/259 | No (đã accept) |
| Dependency | Google Maps app — KT-12, KT-13 | Tap địa chỉ mở external | No |
| Dependency | CMS / Backend API — KT-11, KT-08 | Tin tức, FAQ, chuyên trang | Yes — Tech Lead cung cấp API spec |
| Dependency | Secure Storage (Keychain/Keystore) — BS-04 | Token lưu trữ | No |
| Dependency | In-app PDF viewer — KT-06 (UC45-51), KT-07 (UC52) | View PDF hồ sơ | No |
| Constraint | Agent không thực thi test thực tế — execution do QC engineer chạy tay/CI ngoài framework | Giới hạn phạm vi tự động hoá QC kit | No (run-009 xác nhận) |
| Constraint | Lazy load 20 records (KT-02, KT-15, UX-04) | Áp cho danh sách KCN/KKT, Xúc tiến, Lịch hẹn | No |

## Sources used
| Source | Evidence summary |
|---|---|
| `qc-dashboard.md` | UC70 Removed |
| `ASSUMPTION_BACKLOG_Mobile.md` | ĐỢT 1 full PQ/BS/UX/KT/NV + ĐỢT 2 pending |
| `ACTION_ITEMS_Mobile.md` | UC41, UC2 chi tiết, UC55 luồng tư vấn — chờ BA/KH |
| existing project-context-master.md | List Out-of-scope chi tiết (NV-01..NV-08) + run-009 carve-out |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| ĐỢT 2 (NV-09, NV-10) + KT-03 chờ BA | Needs BA/Tech Lead source | Trung | BA |
| UC55 luồng đăng ký tư vấn chờ khách hàng | Needs BA/Tech Lead source | Trung | BA / KH |
| API spec tổng quan chưa có | Needs BA/Tech Lead source | Cao | Tech Lead |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| (không có giả định mới ngoài backlog) | - | - | - |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
High
