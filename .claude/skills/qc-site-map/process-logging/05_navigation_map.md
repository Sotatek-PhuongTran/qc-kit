# Phase 5 — Navigation Map

- run_id: qc-site-map-001
- phase: Phase 5
- mode: Initialization

## Screen-first tree (draft)

```text
SRS Mobile App (1 site — iOS + Android)
└── Mobile
    ├── A. Xác thực & Quản lý tài khoản
    │   ├── SCR-001 Splash / App launch
    │   ├── SCR-002 Đăng nhập (UC256)
    │   │   ├── → SCR-003 VNeID redirect (external / in-app browser) — BS-01
    │   │   └── → SCR-004 Đăng ký (entry)
    │   │       ├── SCR-005 Form NĐT Cá nhân
    │   │       └── SCR-006 Form NĐT Doanh nghiệp
    │   ├── SCR-007 Quên MK — nhập SĐT/Email
    │   │   ├── SCR-008 Nhập OTP SMS (BS-10)
    │   │   └── SCR-009 Đặt lại MK
    │   ├── SCR-010 Cấu hình tài khoản (Sidebar)
    │   │   ├── SCR-011 Đổi MK → (BS-07) → bắt buộc đăng xuất
    │   │   ├── SCR-012 Cập nhật thông tin DN
    │   │   └── SCR-013 Thay đổi ngôn ngữ (UX-13)
    │   └── SCR-014 Xác nhận đăng xuất (UC257)
    │
    ├── B. Trang chủ & Điều hướng
    │   ├── SCR-020 Trang chủ Dashboard (UC1)
    │   │   ├── SCR-021 Quick Access (cố định — UX-01)
    │   │   ├── SCR-023 Notification badge (fetch on focus — UX-02, KT-01)
    │   │   └── (entry vào mọi module qua Quick Access)
    │   └── SCR-022 Sidebar Drawer (UX-03 — toàn bộ menu, không bottom nav)
    │       ├── (nhóm GIỚI THIỆU)
    │       ├── (nhóm DỊCH VỤ)
    │       ├── (nhóm KCN/KKT)
    │       ├── (nhóm TIN TỨC & TRA CỨU)
    │       └── (nhóm CÀI ĐẶT)
    │
    ├── C. Quản lý hồ sơ & Dịch vụ  (Sidebar group: DỊCH VỤ)
    │   ├── SCR-030 Quản lý đặt lịch — Danh sách (UC42-44, UX-04)
    │   │   └── SCR-031 Chi tiết lịch hẹn  [Need confirm]
    │   ├── SCR-032 Quản lý hồ sơ — Danh sách (UC45-51, UX-05)
    │   │   └── SCR-033 Chi tiết hồ sơ + PDF in-app (KT-06)
    │   ├── SCR-034 Kho tài liệu cá nhân — Danh sách (UC52, NV-04)
    │   │   └── SCR-035 Xem tài liệu (PDF/image browser; Word/Excel tải xuống — KT-07)
    │   ├── SCR-036 Phản ánh kiến nghị — Danh sách (UC53/63-65)
    │   │   ├── SCR-037 Form phản ánh (Nháp/Gửi/Hủy — UX-06; auto-fill UX-07)
    │   │   └── SCR-038 Chi tiết phản ánh  [Need confirm]
    │   └── SCR-039 Báo cáo đã nộp (UC54, NV-05 read-only)
    │
    ├── D. Tra cứu KCN/KKT & Quỹ đất  (Sidebar group: KHU CÔNG NGHIỆP / KKT)
    │   ├── SCR-040 KCN — Danh sách (UC2-6, KT-02)
    │   ├── SCR-041 KCN sinh thái — Danh sách (UC7-11)
    │   ├── SCR-042 TMTD — Danh sách (UC17-21)
    │   ├── SCR-043 KKT — Danh sách (UC12-16)
    │   ├── SCR-044 Mô hình khu khác — Danh sách (UC27-31)
    │   ├── SCR-045 PTQ — Danh sách (UC22-26)
    │   │   └── SCR-046 Chi tiết Khu (tab chung — KT-03 chờ BA)  [Need confirm]
    │   │       └── SCR-047 Tab "Hạ tầng / Nhà đầu tư" (AI-UC-02)  [Need confirm]
    │   ├── SCR-048 Thông tin quỹ đất — Danh sách lô (UC40, NV-06)
    │   │   └── SCR-049 Chi tiết lô đất + file đính kèm (KT-04 không export)
    │   └── SCR-050 Quản lý cho thuê đất (UC41 — AI-UC-01)  [Need confirm]
    │
    ├── E. Tin tức, Thông tin & Hỗ trợ
    │   ├── (Sidebar group: GIỚI THIỆU)
    │   │   ├── SCR-076 Giới thiệu (UC86)
    │   │   ├── SCR-071 Lĩnh vực đầu tư — hub Xúc tiến (UC87-95)
    │   │   │   ├── SCR-072 Xúc tiến — Danh sách (KT-15)
    │   │   │   ├── SCR-073 Chi tiết Xúc tiến
    │   │   │   └── SCR-074 UC92 (yêu cầu đăng nhập — PQ-07 ngoại lệ)  [Need confirm]
    │   │   ├── SCR-064 Khu vực đầu tư — Hub chuyên trang (UC55)
    │   │   │   ├── SCR-065 Chi tiết chuyên trang tỉnh (KT-08)
    │   │   │   └── SCR-066 Form đăng ký tư vấn (AI-UC55-01)  [Need confirm]
    │   │   └── SCR-079 Liên hệ (UC85 — KT-12/13 mở Google Maps app)
    │   ├── (Sidebar group: DỊCH VỤ)
    │   │   └── SCR-069 Thủ tục hành chính (UC73 — TTHC)  [Conflict UC73↔UC70]
    │   │       └── SCR-070 Biểu mẫu TTHC tải xuống (KT-10)  [Need confirm]
    │   ├── (Sidebar group: TIN TỨC & TRA CỨU)
    │   │   ├── SCR-060 Tin tức (hub UC55-68)
    │   │   │   ├── SCR-061 Danh sách bài viết (UC56-57/66/68, UC60-61)
    │   │   │   ├── SCR-062 Chi tiết bài viết — WebView (KT-09, UX-08)
    │   │   │   └── SCR-063 Chatbot (UX-09, UX-10)
    │   │   └── SCR-067 VBPL — Danh sách (UC69)
    │   │       └── SCR-068 Chi tiết VBPL — WebView (KT-09)
    │   └── (cross — không trong sidebar nhóm cố định)
    │       ├── SCR-075 Hướng dẫn / FAQ — accordion (UC71-82, UX-11)
    │       ├── SCR-077 Điều khoản (UC83)
    │       └── SCR-078 Chính sách (UC84)
    │
    ├── F. Thông báo
    │   ├── SCR-080 Danh sách thông báo in-app (UC258/259)
    │   ├── SCR-081 Chi tiết thông báo  [Need confirm]
    │   └── SCR-082 Push (FCM/APNs) — system tray + deep link (KT-16, KT-17)
    │
    └── G. Cross-cutting overlays (chưa thiết kế)
        ├── SCR-090 Toast (AI-UX-01)  [Need confirm]
        ├── SCR-091 Empty — Search NULL (AI-UX-02)  [Need confirm]
        ├── SCR-092 Empty — List rỗng (AI-UX-03)  [Need confirm]
        └── SCR-093 Error — Network/500/404/Timeout (AI-UX-04)  [Need confirm]
```

## Navigation / screen flow table

| Flow ID | Flow name | Role | Start screen | Main path | End screen / outcome | Related feature(s) | Notes |
|---|---|---|---|---|---|---|---|
| FLOW-001 | Đăng nhập VNeID | NĐT CN/DN | SCR-001 → SCR-002 | SCR-002 → SCR-003 (VNeID) → SCR-020 | SCR-020 Trang chủ | UC256 | Token Secure Storage (BS-04). Risk: app VNeID không cài. |
| FLOW-002 | Đăng nhập username/password | NĐT CN/DN | SCR-002 | SCR-002 → SCR-020 | SCR-020 | UC256 | BS-03 không lockout. |
| FLOW-008 | Đăng ký NĐT | NĐT mới | SCR-002 → SCR-004 | SCR-004 → SCR-005/SCR-006 → (UX-14 auto-login) → SCR-020 | SCR-020 | UC250-254 | BS-09 CMND 9/12, MST 10/13; BS-11 MST không sửa. |
| FLOW-009 | Đổi MK + bắt buộc đăng xuất | NĐT CN/DN | SCR-010 → SCR-011 | SCR-011 → (token invalidate) → SCR-002 | SCR-002 | UC249 (BS-07) | High regression — token state. |
| FLOW-Q1 | Quên mật khẩu | NĐT CN/DN | SCR-002 → SCR-007 | SCR-007 → SCR-008 (OTP) → SCR-009 → SCR-002 | SCR-002 | UC251 (BS-10) | OTP qua SMS. |
| FLOW-003 | Quản lý hồ sơ đầu tư | NĐT DN | SCR-020/SCR-022 → SCR-032 | SCR-032 (tìm kiếm + tab — UX-05) → SCR-033 (PDF in-app — KT-06) | SCR-033 | UC45-51 | Read-only (NV-03 không thanh toán). |
| FLOW-004 | Xem/quản lý lịch hẹn | NĐT | SCR-022 → SCR-030 | SCR-030 (lazy 20 — UX-04) → SCR-031 | SCR-031 | UC42-44 | NV-01 không tạo, NV-02 không huỷ. |
| FLOW-005 | Gửi phản ánh | NĐT | SCR-022 → SCR-036 | SCR-036 → SCR-037 (auto-fill — UX-07, Nháp/Gửi/Hủy — UX-06) | SCR-036 / SCR-038 | UC53/63-65 | State workflow. |
| FLOW-006 | Tra cứu KCN/KKT (public) | Khách | App launch → SCR-022 → SCR-040..045 | List (KT-02 lazy 20) → SCR-046 → SCR-047 | SCR-046 / SCR-047 | UC2-31 | PQ-01 public. KT-03 chờ BA. |
| FLOW-007 | Nhận thông báo push | NĐT | (BE event) → SCR-082 | SCR-082 (push) → tap → (cold start — KT-17) → screen liên quan / SCR-080 | SCR-080 / màn liên quan | UC258/259 | NV-09 chờ BA loại thông báo. KT-18 không Email. |
| FLOW-FAQ | FAQ multi-expand | Khách | SCR-022 → SCR-075 | SCR-075 (mở nhiều cùng lúc — UX-11) | SCR-075 | UC71-82 | |
| FLOW-NEWS | Đọc tin tức | Khách | SCR-022 → SCR-060 | SCR-060 → SCR-061 → SCR-062 (WebView — KT-09) | SCR-062 | UC55-68 | UX-08 WebView. |
| FLOW-MAP | Liên hệ — mở bản đồ | Khách | SCR-022 → SCR-079 | SCR-079 → tap address → external Google Maps app | external | UC85 | KT-13 không embed. |
| FLOW-LOGOUT | Đăng xuất | NĐT | SCR-022 → SCR-014 | SCR-014 → (BS-05 xóa token cục bộ ngay cả khi API fail) → SCR-002 | SCR-002 | UC257 | |
| FLOW-DOC | Xem tài liệu kho | NĐT | SCR-022 → SCR-034 | SCR-034 → SCR-035 (PDF/image browser; Word/Excel download — KT-07) | SCR-035 | UC52 | NV-04 không xoá. |
| FLOW-REPORT | Xem báo cáo đã nộp | NĐT | SCR-022 → SCR-039 | SCR-039 (read-only) | SCR-039 | UC54 | NV-05 không nộp mới. |
| FLOW-INV | Khám phá Xúc tiến đầu tư | Khách | SCR-022 → SCR-071 | SCR-071 → SCR-072 (KT-15 lazy) → SCR-073 / SCR-074 (UC92 đăng nhập) | SCR-073/074 | UC87-95 | NV-07 không nhóm vốn. UC92 yêu cầu login. |
| FLOW-LEGAL | Tra VBPL | Khách | SCR-022 → SCR-067 | SCR-067 → SCR-068 (WebView — KT-09) | SCR-068 | UC69 | |
| FLOW-TTHC | Tra TTHC (NEED CONFIRM) | Khách | SCR-022 → SCR-069 | SCR-069 → SCR-070 (Word/PDF/Excel — KT-10) | SCR-070 | UC73 | **Conflict** UC73 vs UC70 Removed. |
| FLOW-CONSULT | Đăng ký tư vấn (UC55) | Khách / NĐT | SCR-065 → SCR-066 | (chờ KH định nghĩa luồng đích) | TBD | UC55 (AI-UC55-01) | **Need confirm**. |
| FLOW-LAND | Quản lý cho thuê đất | TBD | SCR-022 → SCR-050 | (chờ BA) | TBD | UC41 (AI-UC-01) | **Need confirm**. |

## Navigation gaps

| ID | Gap | Source |
|---|---|---|
| NG-01 | Splash → Login vs Splash → Home (deep link / auto-login token) chưa rõ. | Derived |
| NG-02 | Khách → mở UC92 → có dẫn về SCR-002 Login không? Chưa rõ. | PQ-07 ngoại lệ |
| NG-03 | Cold start deep link → màn nào (Notification → screen mapping table) chưa có. | KT-17 |
| NG-04 | TTHC menu UC73 vs UC70 Removed — cần BA xác nhận màn đích. | Q-014 |
| NG-05 | "Đăng ký tư vấn" UC55 → màn đích chưa có. | AI-UC55-01 |
| NG-06 | Chi tiết KCN tab structure (Hạ tầng/Nhà đầu tư...) chưa có wireframe. | AI-UC-02 |
| NG-07 | Cho thuê đất UC41 — toàn bộ luồng chưa có. | AI-UC-01 |
| NG-08 | Toast / Empty / Error states — cross-screen overlay rules chưa có. | AI-UX-01..04 |
| NG-09 | Sau đổi MK (FLOW-009), về Login hay về Splash? Mặc định Login. | BS-07 |
| NG-10 | Đăng xuất từ Sidebar trực tiếp vs từ Cấu hình tài khoản — sidebar có "Đăng xuất" riêng. | Sidebar |

## Next phase

Phase 6 — Mapping & access (screen ↔ feature/role/data/regression).
