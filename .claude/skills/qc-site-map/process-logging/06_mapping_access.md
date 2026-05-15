# Phase 6 — Mapping & Access

- run_id: qc-site-map-001
- phase: Phase 6
- mode: Initialization

## 6.1 Screen ↔ Feature mapping

Feature IDs follow the `qc-dashboard.md` Use Case ID column (group-row convention).

| Screen ID | Screen / Page | Feature ID (dashboard) | Feature name | Mapping type | Regression anchor? | Notes |
|---|---|---|---|---|---|---|
| SCR-001 | Splash | (cross — UC256 entry) | Entry | Supporting | Yes | Token check / deep-link entry |
| SCR-002 | Đăng nhập | UC256 | Đăng nhập Mobile | Primary | Yes | High — VNeID dependency |
| SCR-003 | VNeID redirect | UC256 | Đăng nhập Mobile | Supporting | Yes | External — BS-01 |
| SCR-004..006 | Đăng ký (CN/DN) | UC250-254 | Đăng ký / Quên MK / Cập nhật DN | Primary | Yes | BS-09, BS-11, UX-14 auto-login |
| SCR-007..009 | Quên MK + OTP + Reset | UC250-254 | Đăng ký / Quên MK / Cập nhật DN | Primary | No | BS-10 OTP SMS |
| SCR-010 | Cấu hình tài khoản | UC249 | Cấu hình & QL TK | Primary | No | |
| SCR-011 | Đổi mật khẩu | UC249 | Cấu hình & QL TK | Primary | **Yes (high)** | BS-07 token invalidation |
| SCR-012 | Cập nhật DN | UC250-254 | Đăng ký / Cập nhật DN | Primary | No | BS-11 MST read-only |
| SCR-013 | Đổi ngôn ngữ | UC249 / UC250-254 | Cấu hình tài khoản | Supporting | No | UX-13 apply ngay |
| SCR-014 | Xác nhận đăng xuất | UC257 | Đăng xuất | Primary | Yes | BS-05 xoá token cục bộ |
| SCR-020 | Trang chủ Dashboard | UC1 | Trang chủ Dashboard | Primary | **Yes (high)** | Hub điều hướng |
| SCR-021 | Quick Access | UC1 | Trang chủ Dashboard | Supporting | Yes | UX-01 cố định |
| SCR-022 | Sidebar Drawer | UC1 + (cross-module) | Trang chủ / Navigation | Shared | **Yes (high)** | UX-03 toàn menu |
| SCR-023 | Notification badge | UC1 + UC258/259 | Trang chủ + Thông báo | Shared | Yes | UX-02 fetch on focus |
| SCR-030 | Quản lý đặt lịch — DS | UC42-44 | Quản lý đặt lịch | Primary | No | UX-04 lazy 20 |
| SCR-031 | Chi tiết lịch hẹn | UC42-44 | Quản lý đặt lịch | Primary | No | NV-01/02 no tạo/huỷ |
| SCR-032 | Quản lý hồ sơ — DS | UC45-51 | Quản lý hồ sơ | Primary | Yes | UX-05 tìm kiếm + tab |
| SCR-033 | Chi tiết hồ sơ + PDF | UC45-51 | Quản lý hồ sơ | Primary | Yes | KT-06 PDF in-app |
| SCR-034 | Kho tài liệu — DS | UC52 | Kho tài liệu cá nhân | Primary | No | NV-04 read-only |
| SCR-035 | Xem tài liệu | UC52 | Kho tài liệu cá nhân | Supporting | No | KT-07 PDF/image vs Word/Excel |
| SCR-036 | Phản ánh — DS | UC53_63-65 | Phản ánh kiến nghị | Primary | Yes | |
| SCR-037 | Form phản ánh | UC53_63-65 | Phản ánh kiến nghị | Primary | Yes | UX-06 state, UX-07 auto-fill |
| SCR-038 | Chi tiết phản ánh | UC53_63-65 | Phản ánh kiến nghị | Primary | No | |
| SCR-039 | Báo cáo đã nộp | UC54 | Báo cáo đã nộp | Primary | No | NV-05 read-only |
| SCR-040 | KCN — DS | UC2 (gom UC2-UC31) | Tra cứu KCN/KKT/TMTD/PTQ/Mô hình | Primary | Yes | KT-02 lazy 20 |
| SCR-041..045 | KCN sinh thái / TMTD / KKT / Mô hình / PTQ | UC2 (gom UC2-UC31) | Tra cứu KCN/KKT/... | Primary | Yes | All public PQ-01 |
| SCR-046 | Chi tiết Khu (tab chung) | UC2 (gom UC2-UC31) | Tra cứu KCN/KKT/... | Primary | Yes | KT-03 chờ BA |
| SCR-047 | Tab Hạ tầng/Nhà đầu tư | UC2 (AI-UC-02) | Chi tiết KCN | Partial | No | **Need confirm** |
| SCR-048 | Quỹ đất — DS lô | UC40 | Tra cứu quỹ đất KCN | Primary | No | NV-06 trạng thái |
| SCR-049 | Chi tiết lô đất | UC40 | Tra cứu quỹ đất KCN | Primary | No | KT-04 không export |
| SCR-050 | Quản lý cho thuê đất | (UC41 — chưa có row) | Cho thuê đất KCN | Missing in dashboard | No | **Need confirm — AI-UC-01** |
| SCR-060 | Tin tức (hub) | UC55-68 group rows | Tin tức / Chuyên trang | Primary | No | |
| SCR-061 | DS bài viết | UC56-57_66_68, UC60-61 | Tin tức | Primary | No | |
| SCR-062 | Chi tiết bài viết — WebView | UC55-68 group | Tin tức | Primary | Yes | KT-09 WebView risk |
| SCR-063 | Chatbot | UC55-68 group | Tin tức / Chatbot | Supporting | No | UX-09 không lưu lịch sử |
| SCR-064 | Khu vực đầu tư — Hub chuyên trang | UC55 | Tin tức / Chuyên trang đầu tư | Primary | No | KT-08 lọc tỉnh/TP |
| SCR-065 | Chi tiết chuyên trang tỉnh | UC55 | Tin tức / Chuyên trang đầu tư | Primary | No | |
| SCR-066 | Đăng ký tư vấn (UC55) | UC55 (AI-UC55-01) | Tin tức / Chuyên trang | Partial | No | **Need confirm — KH** |
| SCR-067 | VBPL — DS | UC69 | Văn bản pháp luật | Primary | No | |
| SCR-068 | Chi tiết VBPL — WebView | UC69 | Văn bản pháp luật | Primary | Yes | KT-09 WebView |
| SCR-069 | TTHC | UC73 | Tra cứu TTHC | **Conflict** | TBD | **Conflict UC73 vs UC70 — Q-014** |
| SCR-070 | Biểu mẫu TTHC tải xuống | UC73 | Tra cứu TTHC | Partial | No | KT-10 |
| SCR-071 | Lĩnh vực đầu tư (hub) | UC87-95 group (UC90 row) | Xúc tiến đầu tư | Primary | No | |
| SCR-072 | Xúc tiến — DS | UC87-95 group | Xúc tiến đầu tư | Primary | No | KT-15 lazy 20 |
| SCR-073 | Chi tiết Xúc tiến | UC87-95 group | Xúc tiến đầu tư | Primary | No | |
| SCR-074 | UC92 (login required) | UC92 | Xúc tiến đầu tư (UC92 — yêu cầu login) | Primary | Yes | PQ-07 exception |
| SCR-075 | Hướng dẫn / FAQ | UC71-82 | Hướng dẫn & FAQ | Primary | No | UX-11 multi-expand |
| SCR-076 | Giới thiệu | UC83-86 (group → UC86) | Giới thiệu | Primary | No | NV-10 chờ BA tĩnh/CMS |
| SCR-077 | Điều khoản | UC83-86 (UC83) | Điều khoản | Primary | No | |
| SCR-078 | Chính sách | UC83-86 (UC84) | Chính sách | Primary | No | |
| SCR-079 | Liên hệ + Maps external | UC83-86 (UC85) | Liên hệ | Primary | No | KT-12/13 external Maps |
| SCR-080 | Danh sách thông báo | UC258_UC259 | Thông báo hệ thống | Primary | Yes | |
| SCR-081 | Chi tiết thông báo | UC258_UC259 | Thông báo hệ thống | Primary | No | NV-09 chờ BA loại |
| SCR-082 | Push (FCM/APNs) | UC258_UC259 | Thông báo hệ thống | Supporting | **Yes (high)** | KT-16, KT-17 cold start |
| SCR-090..093 | Toast / Empty / Error overlays | (cross — AI-UX-01..04) | Cross-cutting UX | Unknown | Yes | **Need confirm — chưa thiết kế** |

## 6.2 Feature-level coverage summary (cho dashboard handoff)

| Feature ID | Feature name | Mapped screen(s) | Site map status | Gap / Note |
|---|---|---|---|---|
| UC1 | Trang chủ Dashboard | SCR-020, 021, 022, 023 | **Mapped** | UX-01/02/03 áp dụng |
| UC2 | Tra cứu KCN/KKT/TMTD/PTQ/Mô hình (UC2-UC31) | SCR-040..046, +SCR-047 | **Partial** | SCR-047 (tab Hạ tầng) chờ BA — AI-UC-02 |
| UC40 | Tra cứu quỹ đất KCN | SCR-048, 049 | **Mapped** | NV-06 trạng thái lô; KT-04 không export |
| UC42-44 | Quản lý đặt lịch | SCR-030, 031 | **Mapped** | SCR-031 detail không có wireframe → status Derived |
| UC45-51 | Quản lý hồ sơ | SCR-032, 033 | **Mapped** | KT-06 PDF in-app; UX-05 tìm kiếm + tab |
| UC52 | Kho tài liệu cá nhân | SCR-034, 035 | **Mapped** | KT-07 PDF/image vs Word/Excel |
| UC53_63-65 | Phản ánh kiến nghị | SCR-036, 037, 038 | **Mapped** | UX-06 state; UX-07 auto-fill |
| UC54 | Báo cáo đã nộp | SCR-039 | **Mapped** | NV-05 read-only |
| UC55 | Tin tức / Chuyên trang đầu tư | SCR-064, 065, 066 | **Partial** | SCR-066 chờ KH — AI-UC55-01 |
| UC56-57_66_68 | Tin tức (UC56-57, UC66, UC68) | SCR-060, 061, 062 | **Mapped** | KT-09 WebView |
| UC58 | Tin tức UC58 | SCR-060/061/062 (gom) | **Need confirm** | Dashboard `Need confirm`; gom chung hub Tin tức |
| UC59 | Tin tức UC59 | SCR-060/061/062 (gom) | **Need confirm** | Same |
| UC60-61 | Tin tức UC60-61 | SCR-060, 061, 062 | **Mapped** | |
| UC62 | Tin tức UC62 | SCR-060/061/062 (gom) | **Need confirm** | |
| UC67 | Tin tức UC67 | SCR-060/061/062 (gom) | **Need confirm** | |
| UC69 | Văn bản pháp luật | SCR-067, 068 | **Mapped** | KT-09 WebView |
| UC71-82 | Hướng dẫn & FAQ | SCR-075 | **Mapped** | UX-11 multi-expand |
| UC73 | Tra cứu TTHC | SCR-069, 070 | **Conflict** | UC73 vs UC70 Removed — Q-014 |
| UC83-86 | Điều khoản / Chính sách / Liên hệ / Giới thiệu | SCR-076, 077, 078, 079 | **Mapped** | KT-12/13 Liên hệ external; NV-10 Giới thiệu chờ BA |
| UC87 | Xúc tiến UC87 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC88 | Xúc tiến UC88 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC89 | Xúc tiến UC89 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC90 | Xúc tiến UC90 | SCR-071, 072, 073 | **Mapped** | KT-15 lazy 20 |
| UC91 | Xúc tiến UC91 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC92 | Xúc tiến UC92 (login required) | SCR-074 | **Mapped** | PQ-07 exception — high regression |
| UC93 | Xúc tiến UC93 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC94 | Xúc tiến UC94 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC95 | Xúc tiến UC95 | SCR-071/072/073 (gom) | **Need confirm** | |
| UC249 | Cấu hình & QL TK | SCR-010, 011, 013 | **Mapped** | BS-07 invalidation; UX-12 no Avatar |
| UC250-254 | Đăng ký / Quên MK / Cập nhật DN | SCR-004..009, 012 | **Mapped** | BS-09, BS-10, BS-11, UX-13, UX-14 |
| UC256 | Đăng nhập Mobile | SCR-001, 002, 003 | **Mapped** | BS-01 VNeID; BS-03 không lockout |
| UC257 | Đăng xuất Mobile | SCR-014 | **Mapped** | BS-05 |
| UC258_UC259 | Thông báo hệ thống | SCR-080, 081, 082 | **Mapped** | NV-09 chờ BA loại; KT-16/17/18 |

## 6.3 Unmapped screens

| Screen ID | Screen | Why unmapped | Suggested action |
|---|---|---|---|
| SCR-050 | Quản lý cho thuê đất | UC41 chưa có row dashboard (AI-UC-01 chờ BA) | Sau khi BA hoàn tất UC41 → bổ sung row dashboard + map |
| SCR-090..093 | Toast / Empty / Error overlays | Cross-cutting, chưa có UC riêng (AI-UX-01..04) | Khi UI/UX team thiết kế → review tích hợp vào regression set |

## 6.4 Role / access by screen

| Role | Site/Module truy cập | Screen accessible (tóm tắt) | Restriction / Rule | Status |
|---|---|---|---|---|
| Khách | Mobile / Trang chủ + Tra cứu + Tin tức + Hỗ trợ + Giới thiệu | SCR-001, 002, 004..009, 020-023, 040..049, 060-063, 064-066, 067-068, 069-070, 071-073, 075-079 | PQ-01..PQ-07; không token; UC92 + nhóm DỊCH VỤ (UC42-54) yêu cầu đăng nhập | Derived (BA-confirmed PQ) |
| NĐT — Cá nhân | + nhóm DỊCH VỤ + Cấu hình + Thông báo | + SCR-010..014, 030..039, 074, 080..082 | Tất cả của Khách + đăng nhập | Derived |
| NĐT — Doanh nghiệp | Như NĐT CN + đăng ký DN + cập nhật DN | + SCR-006, 012 đặc thù DN | BS-11 MST không sửa | Derived |

## 6.5 Data / API / Integration / State touchpoints

| Screen / Flow | Touchpoint | Rule / lifecycle | QC impact | Source |
|---|---|---|---|---|
| SCR-002, SCR-003, FLOW-001 | VNeID | External app / in-app browser; redirect callback | High risk — non-deterministic | BS-01 |
| SCR-002, FLOW-001/002 | Auth token in Secure Storage | Active → Invalidate (logout / đổi MK) | Regression critical | BS-04, BS-07 |
| SCR-007/008, FLOW-Q1 | OTP SMS | One-shot OTP | Test cả SĐT + Email | BS-10 |
| SCR-020 (badge) | Notification fetch API | On focus | Test refresh khi resume app | UX-02, KT-01 |
| SCR-033 | PDF in-app viewer | Open inline | Test render PDF | KT-06 |
| SCR-035 | Browser launcher + file download | PDF/image browser; Word/Excel download | Test handler | KT-07 |
| SCR-040..045, SCR-072 | Lazy load 20 | Scroll trigger | Test boundary 20/21/40 | KT-02, KT-15 |
| SCR-062, SCR-068 | WebView | Render HTML | Mạng yếu / crash | KT-09, UX-08 |
| SCR-079 | Google Maps app | External launch | App not installed | KT-12, KT-13 |
| SCR-080, SCR-082, FLOW-007 | FCM (Android) + APNs (iOS) | Push + deep link cold start | High regression | KT-16, KT-17 |
| SCR-082 deep link → screen | Deep link routing table | Cold start + warm start | Cần map per-event | KT-17, NV-09 |
| SCR-076, SCR-077, SCR-078, SCR-079 | Cache nội dung tĩnh offline | Cached | Test offline | KT-14 |
| SCR-074 (UC92) | Auth gate | PQ-07 ngoại lệ | Test access denied → login flow | PQ-07 |
| SCR-037 | Auto-fill profile API | Auto-fill nhưng cho sửa | UX-07 | UX-07 |
| SCR-011 → SCR-002 | Token invalidation | Sau đổi MK → bắt buộc logout | High regression | BS-07 |

## 6.6 Regression / impact anchors

| Anchor | Type | Related feature(s) | Related screen(s) | Vì sao quan trọng | Suggested regression focus |
|---|---|---|---|---|---|
| Auth + Token lifecycle | Permission + Data state | UC256, UC257, UC249 | SCR-002, 003, 010, 011, 014 | Bất kỳ thay đổi auth nào ảnh hưởng toàn module yêu cầu đăng nhập | Đổi MK → logout → re-login; logout offline (BS-05); VNeID redirect failure |
| Sidebar (SCR-022) | Shared component / Navigation | UC1 + (mọi module) | SCR-022 | Truy cập toàn bộ menu; UX-03 không bottom nav | Smoke test mọi link sau mỗi build |
| Trang chủ Quick Access (SCR-021) + Badge (SCR-023) | Shared / Notification | UC1, UC258/259 | SCR-020, 021, 023 | Entry chính + badge fetch on focus | Test focus refresh + Quick Access shortcuts |
| Push notification + deep link | Integration + Notification | UC258/259 | SCR-080, 082 | Cold start deep link KT-17; high risk | Test cold/warm start cho từng loại event |
| VNeID dependency | Integration | UC256 | SCR-002, 003 | Phụ thuộc OS routing + app cài | Test với app cài / không cài / cancel |
| WebView screens | Integration | UC55-68, UC69 | SCR-062, 068 | Render HTML / network yếu | Test offline / slow network |
| Tra cứu KCN — lazy load + chi tiết | Core flow | UC2-31 | SCR-040..046 | Public flow đông user nhất | Boundary 20/21/40; tab content load |
| Form phản ánh state (Nháp/Gửi/Hủy) | Workflow / Data state | UC53/63-65 | SCR-037 | State machine + auto-fill (UX-07) | Test transition + offline draft |
| Cập nhật profile → Phản ánh auto-fill | Data dependency | UC249 ↔ UC53 | SCR-010 → SCR-037 | Cross-screen data | Update profile rồi gửi phản ánh |
| MST DN read-only | Data constraint | UC250-254 | SCR-006, 012 | BS-11 sau đăng ký không sửa | Test attempt edit |
| FAQ accordion multi-expand | UI rule | UC71-82 | SCR-075 | UX-11 | Test mở 2+ câu cùng lúc |
| Liên hệ → external Maps | Integration external | UC85 | SCR-079 | KT-13 không embed | Test với app Maps / không có |
| Cross-cutting Toast/Empty/Error | UI rule (chưa thiết kế) | AI-UX-01..04 | SCR-090..093 | Chuẩn UX cross-feature | Sau khi thiết kế → regression suite riêng |

## Next phase

Phase 7 — Gap & readiness.
