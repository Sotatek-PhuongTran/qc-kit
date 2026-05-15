# QC Site Map: SRS Mobile App — Cổng thông tin đầu tư & dịch vụ công cho NĐT (Cục ĐTNN)

**Trạng thái:** Draft
**Mode:** Initialization
**Ngày tạo/cập nhật:** 2026-05-15
**Người chuẩn bị:** QC Site Map Agent (`qc-site-map`)
**Người review:** QC Lead
**Baseline:** `project-context-master.md`
**Mục đích:** Cung cấp bản đồ site/screen/navigation theo góc nhìn QC để hỗ trợ review spec, thiết kế scenario/test case, đánh giá impact, regression và verify bug.

> File này là screen-first QC site map.
> File này không thay thế `project-context-master.md`, feature list, spec, wireframe, API doc hoặc `qc-dashboard.md`.

---

## 1. Metadata

| Thuộc tính | Giá trị |
|---|---|
| Project / Product | SRS Mobile App — Cổng thông tin NĐT, Cục ĐTNN (Project ID: **MBFS**) |
| Platform | Mobile-native (iOS + Android) |
| Source baseline | `project-context-master.md` |
| Site map readiness | **Partial** |
| Source quality | **Derived / Mixed (medium confidence)** — không có wireframe (folder `docs/BA/` bị clear bởi commit 45c7d81). Sidebar lấy từ `UC_LIST_Mobile.md` (BA-provided từ wireframe). |
| Dashboard relationship | Feature-level handoff only (`qc-dashboard-sync` sở hữu `qc-dashboard.md`) |
| Ghi chú | Tạo lần đầu. Sau khi BA cấp lại wireframe + UC41 + AI-UX-01..04 + giải quyết UC73 vs UC70 → nâng confidence Derived → Confirmed. |

---

## 2. Source baseline và nguồn đã sử dụng

| Source | Loại tài liệu | Dùng để tổng hợp | Độ tin cậy | Ghi chú |
|---|---|---|---|---|
| `project-context-master.md` | Project baseline | Module, role, flow, integration, NFR, scope, Out-of-scope | High | Live, edit in-place |
| `docs/qc-lead/high-level-files/UC_LIST_Mobile.md` v1 | BA-provided (Sidebar "Từ wireframe") | Sidebar navigation (5 nhóm) + mapping menu→UC + danh sách 19 file UC | High (sidebar) / Medium (screen breakdown) | Source chính cho navigation |
| `docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md` v1 | BA-provided (ĐỢT 1 BA-confirmed) | Role/access (PQ-01..07); UI rule (UX-01..14); integration (KT-01..18); scope (NV-01..10) | High | ĐỢT 2 NV-09, NV-10 chờ BA |
| `docs/qc-lead/high-level-files/ACTION_ITEMS_Mobile.md` v1 | BA-provided | AI-UX-01..04 (Toast/Empty/Error) + UC41/UC2 detail/UC55 đăng ký tư vấn chờ BA/KH | Medium | Đánh dấu Need confirm |
| `docs/qc-lead/qc-dashboard.md` | Workflow tracking | Cross-check feature ID cho handoff | N/A (không phải source truth) | |
| `docs/BA/<UC-ID>/` spec + wireframe | SRS/spec/wireframe chi tiết | — | **Missing** | Bị clear bởi commit 45c7d81 (Q-015) |
| Approved official site map doc | — | — | **None** | Không có |
| Release notes / change log | — | — | **None** | Không có |

---

## 3. Site / Portal / App overview

| Site / Portal / App | Mục đích | Nhóm user chính | Module / Area chính | Ghi chú QC |
|---|---|---|---|---|
| Mobile (iOS + Android) | Cổng mobile để NĐT tra cứu KCN/KKT/quỹ đất, quản lý hồ sơ, đặt lịch, gửi phản ánh, theo dõi báo cáo, nhận thông báo | Khách (Anonymous), NĐT Cá nhân (CN), NĐT Doanh nghiệp (DN) | 6 module: (A) Xác thực & QL TK · (B) Trang chủ & Điều hướng · (C) QL hồ sơ & Dịch vụ · (D) Tra cứu KCN/KKT & Quỹ đất · (E) Tin tức / Thông tin / Hỗ trợ · (F) Thông báo | 1 site duy nhất. UX-03: Sidebar chứa toàn bộ menu, không có bottom nav. |

---

## 4. Screen-first site map tree

```text
SRS Mobile App (1 site — iOS + Android)
└── Mobile
    ├── A. Xác thực & Quản lý tài khoản
    │   ├── SCR-001 Splash / App launch                                    [Need confirm]
    │   ├── SCR-002 Đăng nhập (UC256)
    │   │   ├── → SCR-003 VNeID redirect (external / in-app browser)       [BS-01]
    │   │   └── → SCR-004 Đăng ký (entry)
    │   │       ├── SCR-005 Form NĐT Cá nhân                                [BS-09]
    │   │       └── SCR-006 Form NĐT Doanh nghiệp                           [BS-09, BS-11]
    │   ├── SCR-007 Quên MK — nhập SĐT/Email
    │   │   ├── SCR-008 Nhập OTP SMS                                        [BS-10]
    │   │   └── SCR-009 Đặt lại mật khẩu
    │   ├── SCR-010 Cấu hình tài khoản (Sidebar — UC249)
    │   │   ├── SCR-011 Đổi mật khẩu                                        [BS-07 → bắt buộc logout]
    │   │   ├── SCR-012 Cập nhật thông tin DN
    │   │   └── SCR-013 Thay đổi ngôn ngữ                                   [UX-13]
    │   └── SCR-014 Xác nhận đăng xuất (UC257)                              [BS-05]
    │
    ├── B. Trang chủ & Điều hướng (UC1)
    │   ├── SCR-020 Trang chủ Dashboard
    │   │   ├── SCR-021 Quick Access (cố định)                              [UX-01]
    │   │   └── SCR-023 Notification badge (fetch on focus)                 [UX-02, KT-01]
    │   └── SCR-022 Sidebar Drawer (toàn bộ menu)                           [UX-03]   [Confirmed]
    │       ├── Nhóm GIỚI THIỆU
    │       ├── Nhóm DỊCH VỤ
    │       ├── Nhóm KHU CÔNG NGHIỆP / KKT
    │       ├── Nhóm TIN TỨC & TRA CỨU
    │       └── Nhóm CÀI ĐẶT
    │
    ├── C. Quản lý hồ sơ & Dịch vụ (Sidebar group: DỊCH VỤ)
    │   ├── SCR-030 Quản lý đặt lịch — Danh sách (UC42-44)                  [UX-04 lazy 20]
    │   │   └── SCR-031 Chi tiết lịch hẹn                                   [Need confirm]
    │   ├── SCR-032 Quản lý hồ sơ — Danh sách (UC45-51)                     [UX-05 tìm kiếm + tab]
    │   │   └── SCR-033 Chi tiết hồ sơ + PDF in-app viewer                  [KT-06]
    │   ├── SCR-034 Kho tài liệu cá nhân — Danh sách (UC52)                 [NV-04 read-only]
    │   │   └── SCR-035 Xem tài liệu (PDF/image browser; Word/Excel tải xuống) [KT-07]
    │   ├── SCR-036 Phản ánh kiến nghị — Danh sách (UC53/63-65)
    │   │   ├── SCR-037 Form phản ánh (Nháp/Gửi/Hủy)                        [UX-06, UX-07 auto-fill]
    │   │   └── SCR-038 Chi tiết phản ánh                                   [Need confirm]
    │   └── SCR-039 Báo cáo đã nộp (UC54)                                   [NV-05 read-only]
    │
    ├── D. Tra cứu KCN/KKT & Quỹ đất (Sidebar group: KHU CÔNG NGHIỆP / KKT)
    │   ├── SCR-040 KCN — Danh sách (UC2-6)                                  [KT-02 lazy 20, PQ-01 public]
    │   ├── SCR-041 KCN sinh thái — Danh sách (UC7-11)
    │   ├── SCR-042 TMTD — Danh sách (UC17-21)
    │   ├── SCR-043 KKT — Danh sách (UC12-16)
    │   ├── SCR-044 Mô hình khu khác — Danh sách (UC27-31)
    │   ├── SCR-045 PTQ — Danh sách (UC22-26)
    │   │   └── SCR-046 Chi tiết Khu (tab chung)                            [KT-03 chờ BA] [Need confirm]
    │   │       └── SCR-047 Tab "Hạ tầng / Nhà đầu tư"                       [AI-UC-02] [Need confirm]
    │   ├── SCR-048 Thông tin quỹ đất — Danh sách lô (UC40)                 [NV-06 trạng thái]
    │   │   └── SCR-049 Chi tiết lô đất + file đính kèm                     [KT-04 không export]
    │   └── SCR-050 Quản lý cho thuê đất (UC41)                              [AI-UC-01] [Need confirm]
    │
    ├── E. Tin tức, Thông tin & Hỗ trợ
    │   ├── (Sidebar group: GIỚI THIỆU)
    │   │   ├── SCR-076 Giới thiệu (UC86)                                    [NV-10 chờ BA]
    │   │   ├── SCR-071 Lĩnh vực đầu tư — hub Xúc tiến (UC87-95)
    │   │   │   ├── SCR-072 Xúc tiến — Danh sách                            [KT-15 lazy 20]
    │   │   │   ├── SCR-073 Chi tiết Xúc tiến
    │   │   │   └── SCR-074 UC92 (yêu cầu đăng nhập)                        [PQ-07 ngoại lệ]
    │   │   ├── SCR-064 Khu vực đầu tư — Hub chuyên trang tỉnh (UC55)
    │   │   │   ├── SCR-065 Chi tiết chuyên trang tỉnh                       [KT-08 lọc tỉnh/TP]
    │   │   │   └── SCR-066 Form "Đăng ký tư vấn đầu tư"                     [AI-UC55-01] [Need confirm]
    │   │   └── SCR-079 Liên hệ (UC85) — mở Google Maps app                  [KT-12, KT-13 external]
    │   ├── (Sidebar group: DỊCH VỤ)
    │   │   └── SCR-069 Thủ tục hành chính (UC73)                            [Conflict UC73↔UC70 Removed]
    │   │       └── SCR-070 Biểu mẫu TTHC tải xuống                          [KT-10] [Need confirm]
    │   ├── (Sidebar group: TIN TỨC & TRA CỨU)
    │   │   ├── SCR-060 Tin tức (hub UC55-68)
    │   │   │   ├── SCR-061 Danh sách bài viết
    │   │   │   ├── SCR-062 Chi tiết bài viết — WebView                      [KT-09, UX-08]
    │   │   │   └── SCR-063 Chatbot                                          [UX-09, UX-10]
    │   │   └── SCR-067 VBPL — Danh sách (UC69)
    │   │       └── SCR-068 Chi tiết VBPL — WebView                          [KT-09]
    │   └── (cross — entry từ nhiều chỗ)
    │       ├── SCR-075 Hướng dẫn / FAQ — accordion (UC71-82)                [UX-11 multi-expand]
    │       ├── SCR-077 Điều khoản (UC83)
    │       └── SCR-078 Chính sách (UC84)
    │
    ├── F. Thông báo (UC258/259)
    │   ├── SCR-080 Danh sách thông báo in-app
    │   ├── SCR-081 Chi tiết thông báo                                       [Need confirm; NV-09 chờ BA loại]
    │   └── SCR-082 Push (FCM/APNs) — system tray + deep link                [KT-16, KT-17; KT-18 không Email]
    │
    └── G. Cross-cutting overlays (CHƯA THIẾT KẾ)
        ├── SCR-090 Toast (success/warning/error)                           [AI-UX-01] [Need confirm]
        ├── SCR-091 Empty — Search NULL                                      [AI-UX-02] [Need confirm]
        ├── SCR-092 Empty — List rỗng                                        [AI-UX-03] [Need confirm]
        └── SCR-093 Error — Network/500/404/Timeout                          [AI-UX-04] [Need confirm]
```

---

## 5. Screen / Page inventory

64 màn. Status: `Confirmed` (1) · `Derived` (47) · `Need confirm` (15) · `Conflict` (1).

| Screen ID | Site / Portal | Area / Module | Screen / Page | Type | Platform | Source | Status |
|---|---|---|---|---|---|---|---|
| SCR-001 | Mobile | A. Xác thực & QL TK | Splash / App launch | Page | Mobile | Derived (entry common mobile) | Need confirm |
| SCR-002 | Mobile | A. Xác thực & QL TK | Đăng nhập | Page | Mobile | UC256 + FLOW-001/002 + UC_LIST | Derived |
| SCR-003 | Mobile | A. Xác thực & QL TK | VNeID redirect | External | Mobile | BS-01 (UC256) | Derived |
| SCR-004 | Mobile | A. Xác thực & QL TK | Đăng ký — entry | Page | Mobile | UC250 + FLOW-008 | Derived |
| SCR-005 | Mobile | A. Xác thực & QL TK | Đăng ký NĐT Cá nhân | Form | Mobile | UC250-254 (BS-09) | Derived |
| SCR-006 | Mobile | A. Xác thực & QL TK | Đăng ký NĐT Doanh nghiệp | Form | Mobile | UC250-254 (BS-09, BS-11) | Derived |
| SCR-007 | Mobile | A. Xác thực & QL TK | Quên MK — nhập SĐT/Email | Form | Mobile | UC251 (BS-10) | Derived |
| SCR-008 | Mobile | A. Xác thực & QL TK | Quên MK — OTP SMS | Form | Mobile | UC251 (BS-10) | Derived |
| SCR-009 | Mobile | A. Xác thực & QL TK | Đặt lại mật khẩu | Form | Mobile | UC251 | Derived |
| SCR-010 | Mobile | A. Xác thực & QL TK | Cấu hình tài khoản | Page | Mobile | UC249 (Sidebar) | Derived |
| SCR-011 | Mobile | A. Xác thực & QL TK | Đổi mật khẩu | Form | Mobile | UC249 (BS-07) | Derived |
| SCR-012 | Mobile | A. Xác thực & QL TK | Cập nhật thông tin DN | Form | Mobile | UC252-254 | Derived |
| SCR-013 | Mobile | A. Xác thực & QL TK | Thay đổi ngôn ngữ | Modal | Mobile | UX-13 | Derived |
| SCR-014 | Mobile | A. Xác thực & QL TK | Xác nhận đăng xuất | Modal | Mobile | UC257 (BS-05) | Derived |
| SCR-020 | Mobile | B. Trang chủ | Trang chủ Dashboard | Page | Mobile | UC1 | Derived |
| SCR-021 | Mobile | B. Trang chủ | Quick Access | Component | Mobile | UC1 (UX-01) | Derived |
| SCR-022 | Mobile | B. Trang chủ | Sidebar Drawer | Drawer | Mobile | UC1 + UC_LIST sidebar (từ wireframe) | **Confirmed** |
| SCR-023 | Mobile | B. Trang chủ | Notification badge | Component | Mobile | UC1 (UX-02, KT-01) | Derived |
| SCR-030 | Mobile | C. Hồ sơ & Dịch vụ | Quản lý đặt lịch — DS | List | Mobile | UC42-44 (Sidebar, UX-04) | Derived |
| SCR-031 | Mobile | C. Hồ sơ & Dịch vụ | Chi tiết lịch hẹn | Detail | Mobile | UC42-44 | Need confirm |
| SCR-032 | Mobile | C. Hồ sơ & Dịch vụ | Quản lý hồ sơ — DS | List | Mobile | UC45-51 (UX-05) | Derived |
| SCR-033 | Mobile | C. Hồ sơ & Dịch vụ | Chi tiết hồ sơ + PDF in-app | Detail | Mobile | UC45-51 (KT-06) | Derived |
| SCR-034 | Mobile | C. Hồ sơ & Dịch vụ | Kho tài liệu cá nhân — DS | List | Mobile | UC52 (NV-04) | Derived |
| SCR-035 | Mobile | C. Hồ sơ & Dịch vụ | Xem tài liệu | Viewer/External | Mobile | UC52 (KT-07) | Derived |
| SCR-036 | Mobile | C. Hồ sơ & Dịch vụ | Phản ánh — DS | List | Mobile | UC53/63-65 | Derived |
| SCR-037 | Mobile | C. Hồ sơ & Dịch vụ | Phản ánh — Form | Form | Mobile | UC53/63-65 (UX-06, UX-07) | Derived |
| SCR-038 | Mobile | C. Hồ sơ & Dịch vụ | Chi tiết phản ánh | Detail | Mobile | UC53/63-65 | Need confirm |
| SCR-039 | Mobile | C. Hồ sơ & Dịch vụ | Báo cáo đã nộp | List/Detail | Mobile | UC54 (NV-05) | Derived |
| SCR-040 | Mobile | D. Tra cứu KCN/KKT | KCN — DS | List | Mobile | UC2-6 (Sidebar, KT-02) | Derived |
| SCR-041 | Mobile | D. Tra cứu KCN/KKT | KCN sinh thái — DS | List | Mobile | UC7-11 (Sidebar) | Derived |
| SCR-042 | Mobile | D. Tra cứu KCN/KKT | TMTD — DS | List | Mobile | UC17-21 (Sidebar) | Derived |
| SCR-043 | Mobile | D. Tra cứu KCN/KKT | KKT — DS | List | Mobile | UC12-16 (Sidebar) | Derived |
| SCR-044 | Mobile | D. Tra cứu KCN/KKT | Mô hình khu khác — DS | List | Mobile | UC27-31 (Sidebar) | Derived |
| SCR-045 | Mobile | D. Tra cứu KCN/KKT | PTQ — DS | List | Mobile | UC22-26 (Sidebar) | Derived |
| SCR-046 | Mobile | D. Tra cứu KCN/KKT | Chi tiết Khu — tab chung | Detail | Mobile | UC2-31 (KT-03 chờ BA) | Need confirm |
| SCR-047 | Mobile | D. Tra cứu KCN/KKT | Tab Hạ tầng / Nhà đầu tư | Tab | Mobile | AI-UC-02 | Need confirm |
| SCR-048 | Mobile | D. Tra cứu KCN/KKT | Quỹ đất — DS lô | List | Mobile | UC40 (NV-06) | Derived |
| SCR-049 | Mobile | D. Tra cứu KCN/KKT | Chi tiết lô đất | Detail | Mobile | UC40 (KT-04) | Derived |
| SCR-050 | Mobile | D. Tra cứu KCN/KKT | Quản lý cho thuê đất (UC41) | Page | Mobile | AI-UC-01 (Sidebar) | Need confirm |
| SCR-060 | Mobile | E. Tin tức / Hỗ trợ | Tin tức (hub) | Page | Mobile | UC55-68 (Sidebar) | Derived |
| SCR-061 | Mobile | E. Tin tức / Hỗ trợ | Tin tức — DS bài viết | List | Mobile | UC56-57/66/68, UC60-61 | Derived |
| SCR-062 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết bài viết — WebView | Detail/WebView | Mobile | UC55-68 (KT-09) | Derived |
| SCR-063 | Mobile | E. Tin tức / Hỗ trợ | Chatbot | Modal/Tab | Mobile | UC55-68 (UX-09, UX-10) | Derived |
| SCR-064 | Mobile | E. Tin tức / Hỗ trợ | Khu vực đầu tư — Hub chuyên trang | Page | Mobile | UC55 (Sidebar) | Derived |
| SCR-065 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết chuyên trang tỉnh | Detail | Mobile | UC55 (KT-08) | Derived |
| SCR-066 | Mobile | E. Tin tức / Hỗ trợ | Form Đăng ký tư vấn đầu tư | Form | Mobile | UC55 — AI-UC55-01 | Need confirm |
| SCR-067 | Mobile | E. Tin tức / Hỗ trợ | VBPL — DS | List | Mobile | UC69 (Sidebar) | Derived |
| SCR-068 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết VBPL — WebView | Detail/WebView | Mobile | UC69 (KT-09) | Derived |
| SCR-069 | Mobile | E. Tin tức / Hỗ trợ | Thủ tục hành chính (TTHC) | Page | Mobile | UC73 (Sidebar) — UC70 Removed | **Conflict** (UC73 vs UC70 — Q-014) |
| SCR-070 | Mobile | E. Tin tức / Hỗ trợ | Biểu mẫu TTHC tải xuống | Action | Mobile | UC73 (KT-10) | Need confirm |
| SCR-071 | Mobile | E. Tin tức / Hỗ trợ | Lĩnh vực đầu tư — hub Xúc tiến | Page | Mobile | UC87-95 (Sidebar) | Derived |
| SCR-072 | Mobile | E. Tin tức / Hỗ trợ | Xúc tiến đầu tư — DS | List | Mobile | UC87-95 (KT-15) | Derived |
| SCR-073 | Mobile | E. Tin tức / Hỗ trợ | Chi tiết Xúc tiến | Detail | Mobile | UC87-95 | Derived |
| SCR-074 | Mobile | E. Tin tức / Hỗ trợ | UC92 (yêu cầu đăng nhập) | Detail/Form | Mobile | UC92 (PQ-07) | Need confirm |
| SCR-075 | Mobile | E. Tin tức / Hỗ trợ | Hướng dẫn / FAQ (accordion) | Page | Mobile | UC71-82 (UX-11) | Derived |
| SCR-076 | Mobile | E. Tin tức / Hỗ trợ | Giới thiệu | Page | Mobile | UC86 (Sidebar) | Derived |
| SCR-077 | Mobile | E. Tin tức / Hỗ trợ | Điều khoản | Page | Mobile | UC83 | Derived |
| SCR-078 | Mobile | E. Tin tức / Hỗ trợ | Chính sách | Page | Mobile | UC84 | Derived |
| SCR-079 | Mobile | E. Tin tức / Hỗ trợ | Liên hệ (Maps external) | Page | Mobile | UC85 (KT-12, KT-13) | Derived |
| SCR-080 | Mobile | F. Thông báo | Danh sách thông báo in-app | List | Mobile | UC258/259 | Derived |
| SCR-081 | Mobile | F. Thông báo | Chi tiết thông báo | Detail | Mobile | UC258/259 | Need confirm |
| SCR-082 | Mobile | F. Thông báo | Push (FCM/APNs) — deep link | External/Overlay | Mobile | UC258/259 (KT-16, KT-17) | Derived |
| SCR-090 | Mobile | (Cross-cutting) | Toast messages | Overlay | Mobile | AI-UX-01 | Need confirm |
| SCR-091 | Mobile | (Cross-cutting) | Empty — Search NULL | Overlay | Mobile | AI-UX-02 | Need confirm |
| SCR-092 | Mobile | (Cross-cutting) | Empty — List rỗng | Overlay | Mobile | AI-UX-03 | Need confirm |
| SCR-093 | Mobile | (Cross-cutting) | Error — Network/500/404/Timeout | Overlay | Mobile | AI-UX-04 | Need confirm |

---

## 6. Navigation & screen flow

| Flow ID | Flow name | Role | Start screen | Main path | End screen / outcome | Related feature(s) | Notes |
|---|---|---|---|---|---|---|---|
| FLOW-001 | Đăng nhập VNeID | NĐT CN/DN | SCR-001 → SCR-002 | SCR-002 → SCR-003 (VNeID external) → SCR-020 | SCR-020 Trang chủ | UC256 | BS-01; token Secure Storage (BS-04). High regression. |
| FLOW-002 | Đăng nhập username/password | NĐT CN/DN | SCR-002 | SCR-002 → SCR-020 | SCR-020 | UC256 | BS-03 không lockout |
| FLOW-008 | Đăng ký NĐT | NĐT mới | SCR-002 → SCR-004 | SCR-004 → SCR-005/006 → auto-login → SCR-020 | SCR-020 | UC250-254 | BS-09, BS-11, UX-14 |
| FLOW-Q1 | Quên mật khẩu | NĐT CN/DN | SCR-002 → SCR-007 | SCR-007 → SCR-008 (OTP) → SCR-009 → SCR-002 | SCR-002 | UC251 (BS-10) | OTP SMS |
| FLOW-009 | Đổi MK + bắt buộc đăng xuất | NĐT | SCR-010 → SCR-011 | SCR-011 → token invalidate → SCR-002 | SCR-002 | UC249 (BS-07) | **High regression** |
| FLOW-LOGOUT | Đăng xuất | NĐT | SCR-022 → SCR-014 | SCR-014 → BS-05 xóa token cục bộ → SCR-002 | SCR-002 | UC257 | API fail vẫn xoá token |
| FLOW-003 | Quản lý hồ sơ đầu tư | NĐT DN | SCR-020/022 → SCR-032 | SCR-032 (UX-05) → SCR-033 (KT-06) | SCR-033 | UC45-51 | NV-03 không thanh toán |
| FLOW-004 | Xem/quản lý lịch hẹn | NĐT | SCR-022 → SCR-030 | SCR-030 (UX-04) → SCR-031 | SCR-031 | UC42-44 | NV-01/02 |
| FLOW-005 | Gửi phản ánh | NĐT | SCR-022 → SCR-036 | SCR-036 → SCR-037 (UX-06, UX-07) | SCR-036 / SCR-038 | UC53/63-65 | State workflow |
| FLOW-DOC | Xem tài liệu kho | NĐT | SCR-022 → SCR-034 | SCR-034 → SCR-035 (KT-07) | SCR-035 | UC52 | NV-04 read-only |
| FLOW-REPORT | Xem báo cáo đã nộp | NĐT | SCR-022 → SCR-039 | SCR-039 | SCR-039 | UC54 | NV-05 |
| FLOW-006 | Tra cứu KCN/KKT (public) | Khách | App → SCR-022 → SCR-040..045 | List (KT-02) → SCR-046 → SCR-047 | SCR-046 / SCR-047 | UC2-31 | PQ-01; KT-03 chờ BA |
| FLOW-LAND | Quỹ đất | Khách | SCR-022 → SCR-048 | SCR-048 → SCR-049 | SCR-049 | UC40 | NV-06 |
| FLOW-NEWS | Đọc tin tức | Khách | SCR-022 → SCR-060 | SCR-060 → SCR-061 → SCR-062 (WebView) | SCR-062 | UC55-68 | KT-09 |
| FLOW-INV | Khám phá Xúc tiến | Khách | SCR-022 → SCR-071 | SCR-071 → SCR-072 (KT-15) → SCR-073 / SCR-074 | SCR-073/074 | UC87-95 | UC92 yêu cầu login |
| FLOW-LEGAL | Tra VBPL | Khách | SCR-022 → SCR-067 | SCR-067 → SCR-068 | SCR-068 | UC69 | KT-09 WebView |
| FLOW-FAQ | FAQ multi-expand | Khách | SCR-022 → SCR-075 | SCR-075 (UX-11) | SCR-075 | UC71-82 | |
| FLOW-MAP | Liên hệ — mở Maps | Khách | SCR-022 → SCR-079 | SCR-079 → external Google Maps app | External | UC85 | KT-12, KT-13 |
| FLOW-007 | Nhận thông báo push | NĐT | (BE event) → SCR-082 | SCR-082 → tap → cold start (KT-17) → màn liên quan / SCR-080 | SCR-080 / màn liên quan | UC258/259 | NV-09 chờ BA loại; KT-18 không Email |
| FLOW-CONSULT | Đăng ký tư vấn (UC55) | Khách / NĐT | SCR-065 → SCR-066 | (chờ KH định nghĩa luồng đích) | TBD | UC55 — AI-UC55-01 | **Need confirm** |
| FLOW-TTHC | Tra TTHC | Khách | SCR-022 → SCR-069 | SCR-069 → SCR-070 (KT-10) | SCR-070 | UC73 | **Conflict UC73 vs UC70 (Q-014)** |
| FLOW-CHO | Cho thuê đất | TBD | SCR-022 → SCR-050 | (chờ BA) | TBD | UC41 — AI-UC-01 | **Need confirm** |

---

## 7. Role / access by screen

| Role / User type | Accessible site/module | Accessible screen (tóm tắt) | Key actions | Restriction / Rule | Source | Status |
|---|---|---|---|---|---|---|
| Khách / Anonymous | Mobile / Trang chủ + Tra cứu KCN/KKT + Quỹ đất + Tin tức + VBPL + TTHC + FAQ + Giới thiệu + Xúc tiến (trừ UC92) | SCR-001, 002, 004..009, 020-023, 040..049, 060-063, 064-066, 067-068, 069-070, 071-073, 075-079 | Browse, tra cứu, đọc | Không token; nhóm DỊCH VỤ (UC42-54) + Cấu hình + Thông báo cá nhân + UC92 yêu cầu đăng nhập | PQ-01..PQ-07 (BA-confirmed) | Derived |
| NĐT — Cá nhân (CN) | Khách + nhóm DỊCH VỤ + Cấu hình + Thông báo | + SCR-010..014, 030..039, 074, 080..082 | + Quản lý hồ sơ/lịch/phản ánh/thông báo | Auth qua VNeID hoặc username/password | UC256, UC249-254, UC42-54, UC258/259 | Derived |
| NĐT — Doanh nghiệp (DN) | Tương tự NĐT CN + cập nhật DN | + SCR-006, 012 đặc thù DN | + Cập nhật DN | BS-11 MST không sửa sau đăng ký | UC250-254 | Derived |
| BA / PO | (ngoài app) | — | Xác nhận yêu cầu | — | — | N/A |
| QC / QA | (ngoài app) | — | Review, design, execute | — | — | N/A |

> Lưu ý: Role matrix chi tiết Admin / Cán bộ Cục / NĐT NN chưa có (Q-003). Field-level permission chưa có do thiếu spec chi tiết (Q-015).

---

## 8. Screen ↔ Feature mapping

| Screen ID | Screen / Page | Feature ID | Feature name | Mapping type | Regression anchor? | Notes |
|---|---|---|---|---|---|---|
| SCR-001..003 | Splash / Login / VNeID | UC256 | Đăng nhập Mobile | Primary | **Yes (high)** | BS-01 dependency |
| SCR-004..009, 012 | Đăng ký + Quên MK + Cập nhật DN | UC250-254 | Đăng ký / Quên MK / Cập nhật DN | Primary | Yes | BS-09, BS-10, BS-11 |
| SCR-010, 011, 013 | Cấu hình / Đổi MK / Ngôn ngữ | UC249 | Cấu hình & QL TK | Primary | **Yes (BS-07)** | Token invalidation |
| SCR-014 | Đăng xuất | UC257 | Đăng xuất Mobile | Primary | Yes | BS-05 |
| SCR-020, 021, 022, 023 | Trang chủ + Quick Access + Sidebar + Badge | UC1 | Trang chủ Dashboard | Primary + Shared | **Yes (high)** | UX-01/02/03; SCR-022 shared |
| SCR-030, 031 | Đặt lịch | UC42-44 | Quản lý đặt lịch | Primary | No | UX-04 |
| SCR-032, 033 | Hồ sơ | UC45-51 | Quản lý hồ sơ | Primary | Yes | UX-05, KT-06 |
| SCR-034, 035 | Kho tài liệu | UC52 | Kho tài liệu cá nhân | Primary | No | NV-04, KT-07 |
| SCR-036, 037, 038 | Phản ánh | UC53_63-65 | Phản ánh kiến nghị | Primary | Yes | UX-06, UX-07 |
| SCR-039 | Báo cáo đã nộp | UC54 | Báo cáo đã nộp | Primary | No | NV-05 |
| SCR-040..046 | KCN/KCN sinh thái/TMTD/KKT/Mô hình/PTQ + Chi tiết | UC2 (gom UC2-UC31) | Tra cứu KCN/KKT/... | Primary | Yes | KT-02, KT-03 chờ BA |
| SCR-047 | Tab Hạ tầng / Nhà đầu tư | UC2 | Chi tiết KCN | Partial | No | **Need confirm — AI-UC-02** |
| SCR-048, 049 | Quỹ đất | UC40 | Tra cứu quỹ đất | Primary | No | NV-06, KT-04 |
| SCR-050 | Cho thuê đất | (UC41 — chưa có row dashboard) | Cho thuê đất KCN | Missing in dashboard | No | **Unmapped — AI-UC-01** |
| SCR-060, 061, 062 | Tin tức + DS + WebView | UC55-68 (UC56-57_66_68, UC60-61, UC58/59/62/67) | Tin tức | Primary | Yes | KT-09 WebView |
| SCR-063 | Chatbot | UC55-68 (group) | Chatbot | Supporting | No | UX-09 |
| SCR-064, 065 | Khu vực đầu tư + Chi tiết tỉnh | UC55 | Chuyên trang đầu tư | Primary | No | KT-08 |
| SCR-066 | Đăng ký tư vấn | UC55 | Chuyên trang đầu tư | Partial | No | **Need confirm — AI-UC55-01** |
| SCR-067, 068 | VBPL | UC69 | Văn bản pháp luật | Primary | Yes | KT-09 |
| SCR-069, 070 | TTHC | UC73 | Tra cứu TTHC | **Conflict** | TBD | **UC73 vs UC70 Removed (Q-014)** |
| SCR-071, 072, 073 | Lĩnh vực đầu tư + Xúc tiến | UC87-95 (UC90 + UC87/88/89/91/93/94/95) | Xúc tiến đầu tư | Primary | No | KT-15; NV-07 không vốn |
| SCR-074 | UC92 yêu cầu login | UC92 | Xúc tiến UC92 | Primary | **Yes** | PQ-07 exception |
| SCR-075 | FAQ | UC71-82 | Hướng dẫn & FAQ | Primary | No | UX-11 |
| SCR-076 | Giới thiệu | UC83-86 (UC86) | Giới thiệu | Primary | No | NV-10 chờ BA |
| SCR-077, 078 | Điều khoản + Chính sách | UC83-86 (UC83, UC84) | Điều khoản / Chính sách | Primary | No | |
| SCR-079 | Liên hệ + Maps | UC83-86 (UC85) | Liên hệ | Primary | No | KT-12, KT-13 |
| SCR-080, 081, 082 | Thông báo + Push | UC258_UC259 | Thông báo hệ thống | Primary + Supporting | **Yes (high)** | KT-16, KT-17, KT-18 |
| SCR-090..093 | Toast / Empty / Error | (cross — AI-UX-01..04) | Cross-cutting UX | Unknown | Yes | **Need confirm — chưa thiết kế** |

### Feature-level coverage summary for dashboard

| Feature ID | Feature name | Mapped screen(s) | Site map status | Gap / Note |
|---|---|---|---|---|
| UC1 | Trang chủ Dashboard | SCR-020, 021, 022, 023 | Mapped | UX-01/02/03 |
| UC2 | Tra cứu KCN/KKT/TMTD/PTQ/Mô hình (UC2-UC31) | SCR-040..047 | Partial | SCR-047 chờ BA (AI-UC-02) |
| UC40 | Tra cứu quỹ đất KCN | SCR-048, 049 | Mapped | KT-04 không export |
| UC42-44 | Quản lý đặt lịch | SCR-030, 031 | Mapped | SCR-031 derived |
| UC45-51 | Quản lý hồ sơ | SCR-032, 033 | Mapped | UX-05; KT-06 |
| UC52 | Kho tài liệu cá nhân | SCR-034, 035 | Mapped | NV-04; KT-07 |
| UC53_63-65 | Phản ánh kiến nghị | SCR-036, 037, 038 | Mapped | UX-06, UX-07 |
| UC54 | Báo cáo đã nộp | SCR-039 | Mapped | NV-05 |
| UC55 | Tin tức / Chuyên trang đầu tư | SCR-064, 065, 066 | Partial | SCR-066 chờ KH (AI-UC55-01) |
| UC56-57_66_68 | Tin tức (UC56-57, UC66, UC68) | SCR-060, 061, 062 | Mapped | KT-09 |
| UC58 | Tin tức UC58 | SCR-060/061/062 (gom) | Need confirm | Q-013 |
| UC59 | Tin tức UC59 | SCR-060/061/062 (gom) | Need confirm | Q-013 |
| UC60-61 | Tin tức UC60-61 | SCR-060, 061, 062 | Mapped | |
| UC62 | Tin tức UC62 | SCR-060/061/062 (gom) | Need confirm | Q-013 |
| UC67 | Tin tức UC67 | SCR-060/061/062 (gom) | Need confirm | Q-013 |
| UC69 | Văn bản pháp luật | SCR-067, 068 | Mapped | KT-09 |
| UC71-82 | Hướng dẫn & FAQ | SCR-075 | Mapped | UX-11 |
| UC73 | Tra cứu TTHC | SCR-069, 070 | **Conflict** | UC73 vs UC70 Removed (Q-014) |
| UC83-86 | Điều khoản / Chính sách / Liên hệ / Giới thiệu | SCR-076, 077, 078, 079 | Mapped | KT-12/13; NV-10 |
| UC87 | Xúc tiến UC87 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC88 | Xúc tiến UC88 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC89 | Xúc tiến UC89 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC90 | Xúc tiến UC90 | SCR-071, 072, 073 | Mapped | KT-15 |
| UC91 | Xúc tiến UC91 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC92 | Xúc tiến UC92 (login required) | SCR-074 | Mapped | PQ-07 exception |
| UC93 | Xúc tiến UC93 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC94 | Xúc tiến UC94 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC95 | Xúc tiến UC95 | SCR-071/072/073 (gom) | Need confirm | Q-013 |
| UC249 | Cấu hình & QL TK | SCR-010, 011, 013 | Mapped | BS-07; UX-12 |
| UC250-254 | Đăng ký / Quên MK / Cập nhật DN | SCR-004..009, 012 | Mapped | BS-09/10/11; UX-13/14 |
| UC256 | Đăng nhập Mobile | SCR-001, 002, 003 | Mapped | BS-01, BS-03, BS-04 |
| UC257 | Đăng xuất Mobile | SCR-014 | Mapped | BS-05 |
| UC258_UC259 | Thông báo hệ thống | SCR-080, 081, 082 | Mapped | NV-09 chờ BA; KT-16/17/18 |
| (UC41 — chưa có row) | Cho thuê đất KCN | SCR-050 | Missing | Cần BA hoàn tất UC41 → thêm row dashboard |

---

## 9. Screen ↔ Data / API / Integration / State touchpoints

| Screen / Flow | Data object / API / Integration / State | Rule / lifecycle liên quan | QC impact | Source |
|---|---|---|---|---|
| SCR-002, 003 (FLOW-001) | VNeID (external app / in-app browser) | Redirect → callback → token | High risk: non-deterministic, phụ thuộc app cài | BS-01 |
| SCR-002, 014 + Auth | Auth token (Secure Storage) | Active → Invalidate (logout/đổi MK) | Regression critical | BS-04, BS-05, BS-07 |
| SCR-007/008/009 (FLOW-Q1) | OTP SMS service | One-shot OTP | Test cả SĐT + Email | BS-10 |
| SCR-020, 023 | Notification fetch API | On focus | Refresh khi resume app | UX-02, KT-01 |
| SCR-033 | PDF in-app viewer | Open inline | Render PDF | KT-06 |
| SCR-035 | Browser launcher + file download | PDF/image browser; Word/Excel download | Test handler | KT-07 |
| SCR-040..045, 048, 060..062, 072 | Lazy load 20 records | Scroll trigger | Boundary 20/21/40 | KT-02, KT-15, UX-04 |
| SCR-062, 068 | WebView | Render HTML | Mạng yếu / crash | KT-09 |
| SCR-079 | Google Maps app | External launch | App not installed | KT-12, KT-13 |
| SCR-080, 082, 081 (FLOW-007) | FCM (Android) + APNs (iOS) | Push + cold-start deep link | High regression | KT-16, KT-17 |
| SCR-082 deep link → màn đích | Deep-link routing table | Cold + warm start | Mapping per-event chưa có (NV-09) | KT-17, NV-09 |
| SCR-076..079 | Cache nội dung tĩnh offline | Cached | Test offline | KT-14 |
| SCR-074 (UC92) | Auth gate | PQ-07 ngoại lệ | Test access denied → login flow | PQ-07 |
| SCR-037 | Auto-fill profile API | Auto-fill cho sửa | Test data sau update profile | UX-07 |
| SCR-011 → SCR-002 | Token invalidation | Sau đổi MK → bắt buộc logout | High regression | BS-07 |
| SCR-030 | Lịch hẹn (web-created) | Read-only on mobile | NV-01/02 | UX-04 |
| SCR-006, 012 | MST DN | Read-only sau đăng ký | UI test attempt edit | BS-11 |

---

## 10. Regression / impact anchors

| Anchor | Type | Related feature(s) | Related screen(s) | Vì sao quan trọng | Suggested regression focus |
|---|---|---|---|---|---|
| Auth + Token lifecycle | Permission + Data state | UC256, UC257, UC249 | SCR-002, 003, 010, 011, 014 | Ảnh hưởng toàn bộ module yêu cầu đăng nhập | Đổi MK → logout → re-login; logout offline (BS-05); VNeID redirect fail |
| Sidebar (SCR-022) | Shared component / Navigation | UC1 + mọi module | SCR-022 | UX-03 không bottom nav — entry duy nhất | Smoke test mọi link sau mỗi build |
| Trang chủ Quick Access + Badge | Shared / Notification | UC1, UC258/259 | SCR-020, 021, 023 | Hub entry + badge fetch on focus | Focus refresh + Quick Access shortcuts |
| Push notification + deep link | Integration + Notification | UC258/259 | SCR-080, 082 | Cold start deep link KT-17 — high risk | Test cold/warm cho từng loại event |
| VNeID dependency | Integration external | UC256 | SCR-002, 003 | Phụ thuộc OS routing + app cài | App cài / không cài / cancel / error |
| WebView screens | Integration | UC55-68, UC69 | SCR-062, 068 | Render HTML / network yếu | Offline / slow network |
| Tra cứu KCN — lazy load + chi tiết | Core flow public | UC2-31 | SCR-040..046 | Public flow đông user nhất | Boundary 20/21/40; KT-03 tab load |
| Form phản ánh state | Workflow / Data state | UC53/63-65 | SCR-037 | State machine + UX-07 auto-fill | Transition + offline draft |
| Cập nhật profile → Phản ánh auto-fill | Data dependency cross-screen | UC249 ↔ UC53 | SCR-010 → SCR-037 | Cross-screen data sync | Update profile rồi gửi phản ánh |
| MST DN read-only | Data constraint | UC250-254 | SCR-006, 012 | BS-11 sau đăng ký | Attempt edit |
| FAQ accordion multi-expand | UI rule | UC71-82 | SCR-075 | UX-11 | Mở 2+ câu cùng lúc |
| Liên hệ → external Maps | Integration external | UC85 | SCR-079 | KT-13 không embed | App Maps có / không có |
| UC92 Auth gate (PQ-07 exception) | Permission | UC92 | SCR-074 | Khác PQ-07 (Khách không truy cập) | Khách → tap UC92 → redirect login |
| Cross-cutting Toast/Empty/Error | UI rule (chưa thiết kế) | AI-UX-01..04 | SCR-090..093 | Chuẩn UX cross-feature | Sau khi thiết kế → regression suite riêng |

---

## 11. Gaps / conflicts / assumptions

| ID | Issue | Type | Impact to QC | Suggested owner | Priority | Status |
|---|---|---|---|---|---|---|
| GAP-001 | Folder `docs/BA/` (spec + wireframe) bị clear (commit 45c7d81) — không có wireframe để verify cấu trúc tab/modal/empty state | Missing | Toàn site map ở mức Derived; không thể nâng Confirmed | BA + QC Lead | High | Open |
| GAP-002 | Không có Architecture Diagram + Tech Stack + API spec | Missing | Khó hoàn thiện integration touchpoint chính xác | Tech Lead | High | Open (Q-004) |
| GAP-003 | UC73 (Sidebar "TTHC") conflict: dashboard `Need confirm`, project-context có UC70 Removed | Conflict | Có thể tạo/bỏ sót SCR-069/070 | QC Lead + BA | High | Open (Q-014) |
| GAP-004 | UC41 "Cho thuê đất" — Sidebar có entry, nội dung BA chưa có | Missing | SCR-050 không có flow → unmapped khỏi dashboard | BA | High | Open (AI-UC-01) |
| GAP-005 | UC55 "Đăng ký tư vấn" (SCR-066) — chưa có form spec / màn đích | Missing | FLOW-CONSULT không design được | KH (qua BA) | High | Open (AI-UC55-01) |
| GAP-006 | UC2 chi tiết KCN — tab Hạ tầng/Nhà đầu tư + KT-03 (bảng/biểu đồ) chưa rõ | Missing + Assumption | Chi tiết KCN không đủ field | BA | High | Open (AI-UC-02, KT-03) |
| GAP-007 | NV-09 (loại thông báo ngoài hồ sơ) chờ BA | Missing | Deep-link routing table cho push (KT-17) chưa có | BA | Medium | Open |
| GAP-008 | NV-10 (Giới thiệu tĩnh/CMS) chờ BA | Assumption | Test offline vs CMS-driven khác nhau | BA | Low | Open |
| GAP-009 | AI-UX-01..04 Toast / Empty / Error states — chưa thiết kế | Missing | Cross-feature UX không chuẩn | UI/UX team | High | Open |
| GAP-010 | Splash → Login vs Splash → Home (auto-login); cold-start deep link mapping chưa rõ | Unclear | Test entry path không deterministic | Tech Lead + BA | Medium | Open |
| GAP-011 | VNeID sandbox/mock chưa rõ | Unclear | UC256 không deterministic | Tech Lead | High | Open (Q-017) |
| GAP-012 | UC58/59/62/67 dashboard `Need confirm`, gom chung hub tin tức không có evidence màn riêng | Unclear | Có thể thiếu/dư | QC Lead + BA | Medium | Open (Q-013) |
| GAP-013 | UC87/88/89/91/93/94/95 dashboard `Need confirm`, gom chung hub Xúc tiến | Unclear | Coverage chưa rõ | QC Lead + BA | Medium | Open (Q-013) |
| GAP-014 | Sidebar có "Đăng xuất" + Cấu hình tài khoản có Đổi MK → đăng xuất — duplicate entry | Unclear | Bỏ sót regression | BA | Low | Open |
| GAP-015 | Role matrix chính thức (Admin / Cán bộ Cục / NĐT NN) chưa có | Missing | Có thể thiếu role | BA | Medium | Open (Q-003) |
| GAP-016 | Mobile coverage matrix (OS version, thiết bị, screen size) chưa có | Missing | Không đánh dấu screen iOS-only vs Android-only | Tech Lead + QC Lead | Medium | Open (Q-007) |
| GAP-017 | SCR-010 Cấu hình tài khoản — sub-items không đủ chi tiết | Unclear | Field-level test thiếu | BA | Low | Open |
| GAP-018 | Splash + Welcome / Onboarding lần đầu cài — chưa có evidence | Missing | First-run UX không rõ | BA | Low | Open |
| GAP-019 | KT-03 thông tin KT/XH/MT — bảng số liệu vs biểu đồ | Unclear | Visualization test chưa scope | BA | Low | Open (Q-010) |
| GAP-020 | UC92 redirect từ Khách → Login → quay lại UC92 chưa rõ | Unclear | Regression Auth gate | BA | Medium | Open |

---

## 12. Readiness assessment

| Area | Status | Reason | Required action |
|---|---|---|---|
| Screen inventory | **Partial** | 64 màn được liệt kê; đa số `Derived` do không có wireframe; 1 `Conflict` (UC73); 15 `Need confirm` | BA cung cấp lại wireframe + spec để promote `Derived → Confirmed` (Q-015) |
| Navigation flow | **Partial** | 20+ flow cấp dự án đã có; thiếu cold-start deep-link, splash→home/login, UC92 redirect | BA + Tech Lead bổ sung deep-link routing table + entry rule |
| Role / access by screen | **Partial** | PQ-01..PQ-07 áp dụng nhóm public ổn; chi tiết field/action chưa có; role matrix chưa đầy đủ | BA xác nhận role matrix (Q-003) |
| Screen ↔ Feature mapping | **Partial** | 25/33 feature `Mapped`; 7 `Need confirm`; 1 `Conflict` (UC73); 1 `Partial` (UC2 — tab); 1 unmapped (UC41) | Resolve UC73 (Q-014) + Q-013 gom row + AI-UC-01/02/55-01 |
| Data / API / Integration / State touchpoints | **Partial** | Mức cao đã có; thiếu API spec chi tiết | Tech Lead cung cấp API spec (Q-004) |
| Regression / impact usage | **Ready** | 14 anchor được liệt kê, có suggested regression focus | (none) |
| Dashboard feature-level handoff | **Partial** | 33 row có thể handoff; SCR-050 (UC41) chưa có row dashboard | Sau khi BA hoàn tất UC41 → thêm row dashboard |

**Kết luận:** **Tạm đủ (Partial)** — đủ để các QC Agent hạ nguồn (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) có baseline cấu trúc màn + navigation + role + anchor regression. Để nâng lên **Ready (Confirmed)** cần: BA cung cấp lại wireframe (Q-015); giải quyết Q-004/013/014/017; bổ sung AI-UC-01/02/55-01 + AI-UX-01..04.

**Ghi chú cho QC Lead:** trước khi downstream QC Agents bắt đầu chạy bulk, ưu tiên giải quyết các điểm `High`: GAP-001 (wireframe), GAP-003 (UC73 vs UC70), GAP-004 (UC41), GAP-005 (UC55 đăng ký tư vấn), GAP-006 (UC2 chi tiết tab), GAP-009 (AI-UX cross-cutting), GAP-011 (VNeID sandbox).
