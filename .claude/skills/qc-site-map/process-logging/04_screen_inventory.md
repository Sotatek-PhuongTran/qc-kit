# Phase 4 — Screen Inventory

- run_id: qc-site-map-001
- phase: Phase 4
- mode: Initialization

Screen IDs are stable temporary IDs (`SCR-xxx`). Type: Page / Modal / Tab / Form / List / Detail / Drawer / Overlay / Splash / External.

## A. Auth & Account (Module A)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-001 | Mobile | A. Xác thực & QL TK | Splash / App launch | Page | Mobile | Derived (FLOW-001..002 entry, common mobile) | Need confirm |
| SCR-002 | Mobile | A. Xác thực & QL TK | Đăng nhập (Login) | Page | Mobile | UC256 (UC_LIST + FLOW-001/002) | Derived |
| SCR-003 | Mobile | A. Xác thực & QL TK | VNeID redirect (external / in-app browser) | External | Mobile | BS-01 (UC256) | Derived |
| SCR-004 | Mobile | A. Xác thực & QL TK | Đăng ký (Register entry) | Page | Mobile | UC250 (FLOW-008) | Derived |
| SCR-005 | Mobile | A. Xác thực & QL TK | Đăng ký — NĐT Cá nhân (form) | Form | Mobile | UC250-254 (BS-09) | Derived |
| SCR-006 | Mobile | A. Xác thực & QL TK | Đăng ký — NĐT Doanh nghiệp (form) | Form | Mobile | UC250-254 (BS-09, BS-11) | Derived |
| SCR-007 | Mobile | A. Xác thực & QL TK | Quên mật khẩu — nhập SĐT/Email | Form | Mobile | UC251 (BS-10) | Derived |
| SCR-008 | Mobile | A. Xác thực & QL TK | Quên mật khẩu — nhập OTP SMS | Form | Mobile | UC251 (BS-10) | Derived |
| SCR-009 | Mobile | A. Xác thực & QL TK | Đặt lại mật khẩu | Form | Mobile | UC251 | Derived |
| SCR-010 | Mobile | A. Xác thực & QL TK | Cấu hình tài khoản | Page | Mobile | UC249 (Sidebar) | Derived |
| SCR-011 | Mobile | A. Xác thực & QL TK | Đổi mật khẩu | Form | Mobile | UC249 (BS-07 → FLOW-009) | Derived |
| SCR-012 | Mobile | A. Xác thực & QL TK | Cập nhật thông tin DN | Form | Mobile | UC252-254 | Derived |
| SCR-013 | Mobile | A. Xác thực & QL TK | Thay đổi ngôn ngữ | Modal | Mobile | UX-13 | Derived |
| SCR-014 | Mobile | A. Xác thực & QL TK | Xác nhận đăng xuất | Modal | Mobile | UC257 (BS-05) | Derived |

## B. Home & Navigation (Module B)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-020 | Mobile | B. Trang chủ & Điều hướng | Trang chủ (Home Dashboard) | Page | Mobile | UC1 (UX-01, UX-02, KT-01) | Derived |
| SCR-021 | Mobile | B. Trang chủ & Điều hướng | Quick Access (block trên Home) | Component | Mobile | UC1 (UX-01) | Derived |
| SCR-022 | Mobile | B. Trang chủ & Điều hướng | Sidebar (Drawer) | Drawer | Mobile | UC1 (UX-03) + UC_LIST sidebar | Confirmed (sidebar có evidence) |
| SCR-023 | Mobile | B. Trang chủ & Điều hướng | Notification badge (Home) | Component | Mobile | UC1 (UX-02, KT-01) | Derived |

## C. Hồ sơ & Dịch vụ (Module C)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-030 | Mobile | C. QL hồ sơ & Dịch vụ | Quản lý đặt lịch — Danh sách | List | Mobile | UC42-44 (Sidebar, UX-04 lazy load 20) | Derived |
| SCR-031 | Mobile | C. QL hồ sơ & Dịch vụ | Chi tiết lịch hẹn | Detail | Mobile | UC42-44 | Need confirm (no wireframe) |
| SCR-032 | Mobile | C. QL hồ sơ & Dịch vụ | Quản lý hồ sơ — Danh sách (tab + tìm kiếm) | List | Mobile | UC45-51 (Sidebar, UX-05) | Derived |
| SCR-033 | Mobile | C. QL hồ sơ & Dịch vụ | Chi tiết hồ sơ + tài liệu PDF (in-app viewer) | Detail | Mobile | UC45-51 (KT-06) | Derived |
| SCR-034 | Mobile | C. QL hồ sơ & Dịch vụ | Kho tài liệu cá nhân — Danh sách | List | Mobile | UC52 (NV-04 read-only) | Derived |
| SCR-035 | Mobile | C. QL hồ sơ & Dịch vụ | Xem tài liệu (PDF/image trong browser; Word/Excel tải xuống) | Viewer/External | Mobile | UC52 (KT-07) | Derived |
| SCR-036 | Mobile | C. QL hồ sơ & Dịch vụ | Phản ánh kiến nghị — Danh sách | List | Mobile | UC53/63-65 (Sidebar) | Derived |
| SCR-037 | Mobile | C. QL hồ sơ & Dịch vụ | Phản ánh — Form (Nháp / Gửi / Hủy bỏ) | Form | Mobile | UC53/63-65 (UX-06, UX-07 auto-fill) | Derived |
| SCR-038 | Mobile | C. QL hồ sơ & Dịch vụ | Chi tiết phản ánh | Detail | Mobile | UC53/63-65 | Need confirm |
| SCR-039 | Mobile | C. QL hồ sơ & Dịch vụ | Báo cáo đã nộp — Danh sách / Chi tiết | List/Detail | Mobile | UC54 (NV-05 read-only) | Derived |

## D. Tra cứu KCN/KKT & Quỹ đất (Module D)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-040 | Mobile | D. Tra cứu KCN/KKT | Khu công nghiệp (KCN) — Danh sách | List | Mobile | UC2-6 (Sidebar, KT-02 lazy 20) | Derived |
| SCR-041 | Mobile | D. Tra cứu KCN/KKT | KCN sinh thái — Danh sách | List | Mobile | UC7-11 (Sidebar) | Derived |
| SCR-042 | Mobile | D. Tra cứu KCN/KKT | Khu thương mại tự do (TMTD) — Danh sách | List | Mobile | UC17-21 (Sidebar) | Derived |
| SCR-043 | Mobile | D. Tra cứu KCN/KKT | Khu kinh tế (KKT) — Danh sách | List | Mobile | UC12-16 (Sidebar) | Derived |
| SCR-044 | Mobile | D. Tra cứu KCN/KKT | Mô hình khu khác — Danh sách | List | Mobile | UC27-31 (Sidebar) | Derived |
| SCR-045 | Mobile | D. Tra cứu KCN/KKT | Khu phi thuế quan (PTQ) — Danh sách | List | Mobile | UC22-26 (Sidebar) | Derived |
| SCR-046 | Mobile | D. Tra cứu KCN/KKT | Chi tiết Khu (KCN/KKT/TMTD/PTQ/Mô hình) — Tab chung | Detail | Mobile | UC2-31 (KT-03 chờ BA) | Need confirm (tab structure pending) |
| SCR-047 | Mobile | D. Tra cứu KCN/KKT | Tab "Hạ tầng / Nhà đầu tư" trong Chi tiết KCN | Tab | Mobile | AI-UC-02 (chờ BA) | Need confirm |
| SCR-048 | Mobile | D. Tra cứu KCN/KKT | Thông tin quỹ đất — Danh sách lô đất | List | Mobile | UC40 (Sidebar, NV-06 trạng thái) | Derived |
| SCR-049 | Mobile | D. Tra cứu KCN/KKT | Chi tiết lô đất + file đính kèm | Detail | Mobile | UC40 (KT-04 không export) | Derived |
| SCR-050 | Mobile | D. Tra cứu KCN/KKT | Quản lý cho thuê đất (UC41) | Page | Mobile | AI-UC-01 (Sidebar nhưng chờ BA) | Need confirm |

## E. Tin tức, Thông tin & Hỗ trợ (Module E)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-060 | Mobile | E. Tin tức / Hỗ trợ | Tin tức (hub) | Page | Mobile | UC55-68 (Sidebar "Tin tức") | Derived |
| SCR-061 | Mobile | E. Tin tức / Hỗ trợ | Tin tức — Danh sách bài viết | List | Mobile | UC56-57/66/68, UC60-61 | Derived |
| SCR-062 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết bài viết (WebView) | Detail/WebView | Mobile | UC55-68 (KT-09, UX-08) | Derived |
| SCR-063 | Mobile | E. Tin tức / Hỗ trợ | Chatbot | Modal/Tab | Mobile | UC55-68 (UX-09, UX-10) | Derived |
| SCR-064 | Mobile | E. Tin tức / Hỗ trợ | Khu vực đầu tư (Hub chuyên trang) | Page | Mobile | UC55 (Sidebar "Khu vực đầu tư") | Derived |
| SCR-065 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết chuyên trang tỉnh | Detail | Mobile | UC55 (KT-08 lọc tỉnh/TP) | Derived |
| SCR-066 | Mobile | E. Tin tức / Hỗ trợ | Form "Đăng ký tư vấn đầu tư" (entry button) | Form | Mobile | UC55 — AI-UC55-01 (chờ KH) | Need confirm |
| SCR-067 | Mobile | E. Tin tức / Hỗ trợ | Văn bản pháp luật (VBPL) — Danh sách | List | Mobile | UC69 (Sidebar) | Derived |
| SCR-068 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết VBPL (WebView) | Detail/WebView | Mobile | UC69 (KT-09) | Derived |
| SCR-069 | Mobile | E. Tin tức / Hỗ trợ | Thủ tục hành chính (TTHC) | Page | Mobile | UC73 — Sidebar có; UC73 in dashboard `Need confirm`; project-context có UC70 Removed | **Conflict** (UC73 vs UC70 — Q-014) |
| SCR-070 | Mobile | E. Tin tức / Hỗ trợ | Biểu mẫu TTHC tải xuống (Word/PDF/Excel) | Action | Mobile | UC73 (KT-10) | Need confirm (depends on UC73) |
| SCR-071 | Mobile | E. Tin tức / Hỗ trợ | Lĩnh vực đầu tư (hub Xúc tiến UC87-95) | Page | Mobile | UC87-95 (Sidebar "Lĩnh vực đầu tư") | Derived |
| SCR-072 | Mobile | E. Tin tức / Hỗ trợ | Xúc tiến đầu tư — Danh sách | List | Mobile | UC87-95 (KT-15 lazy 20) | Derived |
| SCR-073 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết Xúc tiến đầu tư | Detail | Mobile | UC87-95 | Derived |
| SCR-074 | Mobile | E. Tin tức / Hỗ trợ | UC92 — Xúc tiến yêu cầu đăng nhập | Detail/Form | Mobile | UC92 (PQ-07 ngoại lệ) | Need confirm |
| SCR-075 | Mobile | E. Tin tức / Hỗ trợ | Hướng dẫn sử dụng / FAQ (accordion) | Page | Mobile | UC71-82 (UX-11 multi-expand) | Derived |
| SCR-076 | Mobile | E. Tin tức / Hỗ trợ | Giới thiệu Cục ĐTNN | Page | Mobile | UC86 (Sidebar) | Derived |
| SCR-077 | Mobile | E. Tin tức / Hỗ trợ | Điều khoản | Page | Mobile | UC83 | Derived |
| SCR-078 | Mobile | E. Tin tức / Hỗ trợ | Chính sách (privacy / sử dụng) | Page | Mobile | UC84 | Derived |
| SCR-079 | Mobile | E. Tin tức / Hỗ trợ | Liên hệ (có bản đồ → mở Google Maps app) | Page | Mobile | UC85 (KT-12, KT-13 external) | Derived |

## F. Thông báo (Module F)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-080 | Mobile | F. Thông báo | Danh sách thông báo (in-app) | List | Mobile | UC258/259 (KT-18 push + in-app) | Derived |
| SCR-081 | Mobile | F. Thông báo | Chi tiết thông báo | Detail | Mobile | UC258/259 | Need confirm |
| SCR-082 | Mobile | F. Thông báo | Push notification (system tray + deep link) | External/Overlay | Mobile | UC258/259 (KT-16 FCM/APNs, KT-17 cold start deep link) | Derived |

## G. Cross-cutting overlays (chưa thiết kế — AI-UX)

| Screen ID | Site | Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-090 | Mobile | (Cross) | Toast messages (success/warning/error) | Overlay | Mobile | AI-UX-01 (chờ design) | Need confirm |
| SCR-091 | Mobile | (Cross) | Empty state — Search NULL | Overlay | Mobile | AI-UX-02 | Need confirm |
| SCR-092 | Mobile | (Cross) | Empty state — List rỗng | Overlay | Mobile | AI-UX-03 | Need confirm |
| SCR-093 | Mobile | (Cross) | Error state — Network/500/404/Timeout | Overlay | Mobile | AI-UX-04 | Need confirm |

## Counts

- Total screens: **64** (SCR-001..014, 020..023, 030..039, 040..050, 060..079, 080..082, 090..093 — discontinuous numbering).
- Confirmed: 1 (SCR-022 Sidebar).
- Derived: 47.
- Need confirm: 15.
- Conflict: 1 (SCR-069 UC73 vs UC70).

## Next phase

Phase 5 — Build the screen-first tree + navigation flows.
