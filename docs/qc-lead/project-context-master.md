# Project Context

## 1. Project Identity

- Project name: SRS Mobile App — Cổng thông tin đầu tư & dịch vụ công cho Nhà đầu tư (NĐT) (lưu ý: `project-config.md` đang ghi placeholder "test cho MBFS mobile" — cần cập nhật)
- Project ID: **MBFS**
- Product/System name: Ứng dụng di động cho NĐT — tra cứu KCN/KKT, quản lý hồ sơ, dịch vụ công, tin tức
- Release Version: v1 (theo `UC_LIST_Mobile.md`)
- Project type: New build
- Domain: Mobile app — Đầu tư công / Xúc tiến đầu tư / Dịch vụ công
- Product Platform Type: `mobile-native` _(theo §5 System Overview: ứng dụng native mobile iOS + Android, FCM/APNs, VNeID deep-link. Field này điều khiển rubric thiết kế test case — agent sẽ load `references/design-technical/design-technical-mobile-native.md`. Nếu sản phẩm có nhiều platform, liệt kê tất cả ngăn cách bằng dấu phẩy.)_

  | Value            | Khi nào dùng                                                                                                                       |
  |------------------|------------------------------------------------------------------------------------------------------------------------------------|
  | `web-responsive` | Web app có responsive layout (cover desktop + tablet + mobile viewport từ cùng một codebase).                                      |
  | `web-static`     | Web app KHÔNG responsive — desktop-first (back-office, admin panel, ERP).                                                          |
  | `mobile-native`  | Native mobile app (Swift / Kotlin / React Native / Flutter / Xamarin), phân phối qua App Store / Play Store / enterprise.          |
  | `mobile-hybrid`  | Mobile app dạng WebView wrapper trên native shell (Cordova / Capacitor / Ionic / wrapped PWA).                                      |
  | `desktop-native` | Desktop app cài trên Windows / macOS / Linux (Electron / .NET / WPF / WinUI / Qt / native Cocoa).                                   |

## 2. Business Goal

Briefly describe why this project/release exists.

- Business goal: Cung cấp cho Nhà đầu tư (NĐT) một ứng dụng di động để tra cứu thông tin KCN/KKT/TMTD/PTQ, quản lý hồ sơ đầu tư, đặt lịch nộp hồ sơ, gửi phản ánh kiến nghị, theo dõi báo cáo, và nhận thông báo hệ thống từ Cục ĐTNN.
- Problem/pain point: _(chưa có trong common files — suy đoán: NĐT hiện chưa có kênh mobile-first để truy cập thông tin đầu tư và quản lý hồ sơ; phụ thuộc kênh web/giấy tờ)_
- Success criteria: _(chưa có trong common files — cần BA/PO định nghĩa KPI; xem Q-002)_

## 3. Scope Summary
Briefly describe what will be tested (in scope) and what will not be tested (out of scope), including any assumptions or dependencies.

### In Scope

- 21 nhóm Use Case (theo `qc-dashboard.md`):
  - **Xác thực & Quản lý tài khoản (4 nhóm):** UC249 (Cấu hình tài khoản), UC250-254 (Đăng ký/Quên MK/Cập nhật DN), UC256 (Đăng nhập VNeID), UC257 (Đăng xuất).
  - **Trang chủ & Điều hướng (1):** UC1 (Trang chủ Dashboard).
  - **Quản lý hồ sơ & Dịch vụ (5):** UC42-44 (Đặt lịch), UC45-51 (Hồ sơ), UC52 (Kho tài liệu cá nhân), UC53_63-65 (Phản ánh kiến nghị), UC54 (Báo cáo đã nộp).
  - **Tra cứu KCN/KKT & Quỹ đất (2):** UC2 (UC2-31 KCN/KKT/TMTD/PTQ/Mô hình khác), UC40 (Quỹ đất).
  - **Tin tức, Thông tin & Hỗ trợ (7):** UC55 (Chuyên trang đầu tư), UC56-57_66_68 (Tin tức), UC60-61 (Chatbot), UC69 (VBPL), UC71-82 (Hướng dẫn/FAQ), UC83-86 (Điều khoản/Liên hệ/Giới thiệu), UC90 (Xúc tiến đầu tư).
  - **Thông báo (1):** UC258_UC259 (Thông báo hệ thống).

### Out of Scope

- **UC70 — Tra cứu TTHC trên mobile** (folder tồn tại nhưng user xác nhận Removed khỏi WBS, 2026-05-13).
- **Thanh toán phí hồ sơ trên mobile** (NV-03 — không có chức năng thanh toán hồ sơ trực tuyến trên mobile).
- **Tạo lịch hẹn mới từ Quản lý đặt lịch** (NV-01 — chỉ xem/quản lý lịch đã đặt từ web).
- **Hủy lịch hẹn trên mobile** (NV-02 — không có chức năng huỷ trên mobile).
- **Xóa tài liệu trong Kho dữ liệu** (NV-04 — chỉ xem).
- **Nộp báo cáo mới** (NV-05 — chỉ tra cứu báo cáo đã nộp).
- **Thay đổi Avatar** (UX-12 — chưa có trong phiên bản này).
- **Thông báo qua Email** (KT-18 — chỉ push/in-app).
- **Kết xuất dữ liệu quỹ đất ra Excel** (KT-04 — chỉ xem file đính kèm).
- **AI-UC-01 — UC41 Cho thuê đất KCN** (tách khỏi UC40, đang chờ BA).
- **AI-UC55-01 — Luồng đăng ký tư vấn đầu tư** (chờ khách hàng xác nhận luồng + form).

### Assumptions

40 assumptions đã được BA/PO xác nhận trong ĐỢT 1 (`ASSUMPTION_BACKLOG_Mobile.md`):

- **A. Phân quyền (PQ-01..07):** UC tra cứu KCN/KKT, tin tức/chuyên trang/chatbot, VBPL/TTHC, hướng dẫn/FAQ, điều khoản/liên hệ, xúc tiến đầu tư (UC87-91, UC93-95) đều **public, không yêu cầu đăng nhập**. UC92 yêu cầu đăng nhập.
- **B. Xác thực & bảo mật (BS-01..11):** không giới hạn số lần nhập sai MK; sau đổi MK phải đăng xuất; CMND/CCCD 9 hoặc 12 số, MST DN 10 hoặc 13 số; quên MK qua SĐT/Email + OTP SMS; MST DN không cho phép chỉnh sửa sau đăng ký.
- **C. UX (UX-01..14):** Quick Access cố định không tùy chỉnh; Badge thông báo fetch on focus; Sidebar chứa toàn bộ menu (không có bottom nav bar); lazy load 20 records cho lịch hẹn; tìm kiếm theo mã/tên hồ sơ + filter tab; phản ánh có lưu nháp + gửi + hủy bỏ; auto-fill họ tên/SĐT/Email nhưng cho phép sửa; FAQ Accordion mở nhiều câu cùng lúc; thay đổi ngôn ngữ áp dụng ngay; auto-login sau đăng ký.
- **D. Kỹ thuật (KT-01..18):** Badge fetch on focus; lazy load 20; PDF in-app viewer, Word/Excel tải xuống; chuyên trang lọc theo tỉnh/TP (không theo miền); WebView cho VBPL/tin tức; biểu mẫu TTHC tải xuống Word/PDF/Excel; CMS content qua API; Google Maps mở external app (không embed); cache nội dung tĩnh offline; FCM/APNs cho push; deep link hoạt động cold start; chỉ push/in-app, không email.
- **E. Nghiệp vụ (NV-01..08):** đã liệt kê trong Out of Scope ở trên.

ĐỢT 2 còn 2 assumption chờ BA xác nhận: NV-09 (loại thông báo ngoài hồ sơ), NV-10 (Giới thiệu tĩnh hay CMS). Pending từ ĐỢT 1: KT-03 (KT/XH/MT bảng số liệu hay biểu đồ).

### Dependencies

- **VNeID** — luồng đăng nhập deep-link hoặc in-app browser (BS-01).
- **FCM (Android) / APNs (iOS)** — push notification (KT-16).
- **Google Maps app** — mở external khi tap địa chỉ (KT-12, KT-13).
- **CMS / Backend API** — content tin tức, FAQ, chuyên trang (KT-11, KT-08).
- **Secure Storage (Keychain/Keystore)** — lưu auth token (BS-04).
- **In-app PDF viewer** — xem hồ sơ + biểu mẫu (KT-06, KT-07).

## 4. Users and Roles

| Role / Actor | Description | Key Permissions | Key Workflows |
|---|---|---|---|
| Khách / Anonymous | Người dùng chưa đăng nhập | Xem tra cứu KCN/KKT (UC2-31), quỹ đất (UC40), tin tức (UC55-68), VBPL/TTHC (UC69/73), hướng dẫn/FAQ (UC71-82), điều khoản/liên hệ/giới thiệu (UC83-86), xúc tiến đầu tư (UC87-91, UC93-95) | Tra cứu thông tin public không yêu cầu đăng nhập |
| NĐT — Nhà đầu tư cá nhân (CN) | NĐT cá nhân Việt Nam đã đăng ký + xác thực qua VNeID hoặc CMND/CCCD | Tất cả của Khách + Quản lý tài khoản cá nhân (UC249-254), Quản lý hồ sơ (UC45-51), Đặt lịch (UC42-44), Kho dữ liệu cá nhân (UC52), Phản ánh kiến nghị (UC53/63-65), Báo cáo đã nộp (UC54), Thông báo cá nhân (UC258-259), UC92 | Đăng nhập (UC256) → Trang chủ (UC1) → các luồng hồ sơ/dịch vụ |
| NĐT — Doanh nghiệp (DN) | NĐT pháp nhân DN đã đăng ký với MST DN | Tất cả của NĐT CN; MST DN không sửa sau đăng ký | Đăng ký DN (UC250-254) với MST 10/13 số; quản lý hồ sơ DN |
| BA / PO | han.luong & huy.lai2 | Cung cấp/xác nhận yêu cầu, trả lời assumption | Owner SRS Mobile |
| QC / QA | Đội QC | Review UC, thiết kế kịch bản & test case | Theo qc-dashboard |

## 5. System Overview

Briefly describe the system architecture and the number of sites, modules, and screens.
The detailed feature/UC list is maintained in the qc-dashboard file.

- **Kiến trúc tổng quát:** Ứng dụng native mobile (iOS + Android) giao tiếp với Backend API (REST/JSON). Một số nội dung tĩnh + VBPL/Tin tức hiển thị qua WebView (KT-09). Push notification qua FCM (Android) + APNs (iOS). Auth qua VNeID deep-link hoặc đăng nhập username/password (BS-01..10).
- **Số lượng:** 1 site (Mobile), 6 module/nhóm chức năng, ~95 UC đơn lẻ phân bố trong 19 file UC SRS (theo `UC_LIST_Mobile.md`).
- **Module mapping (6 modules):**
  - Xác thực & Quản lý tài khoản
  - Trang chủ & Điều hướng
  - Quản lý hồ sơ & Dịch vụ
  - Tra cứu KCN/KKT & Quỹ đất
  - Tin tức, Thông tin & Hỗ trợ
  - Thông báo

### Sites

| Full name | Abbreviation |
|---|---|
| Mobile | Mobile |

### QC Dashboard

- Path: [qc-dashboard.md](./qc-dashboard.md)

## 6. Requirement Sources

| Source | Location | Notes |
|---|---|---|
| PRD/BRD/User stories | `docs/BA/<UC-ID>/*.md` (21 UC folders) | SRS Mobile theo từng UC — owner: han.luong, huy.lai2 |
| Wireframe/Figma | `docs/BA/<UC-ID>/*.png` (đính kèm trong từng UC folder) | Wireframe dạng PNG, chưa thấy Figma URL trong common files |
| API spec | _(chưa thấy trong `high-level-files/` hoặc BA folders)_ | Cần BA cung cấp |
| Business rules | `docs/BA/Common rule/CMR_Mobile.md` + `Common rule - No data.png`, `Common rule - No result found.png` | Common Mobile Rules + 2 empty-state design references |
| Change log | `docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md` (ĐỢT 1, ĐỢT 2) + `ACTION_ITEMS_Mobile.md` | Append-only assumption log + action items track |
| UC list (master index) | `docs/qc-lead/high-level-files/UC_LIST_Mobile.md` | Danh mục tổng hợp 19 file UC, ~95 UC đơn lẻ |

## 7. Quality Context

- **Critical business flows:**
  - Đăng nhập VNeID (UC256) — entry point cho tất cả luồng xác thực
  - Quản lý hồ sơ (UC45-51) — luồng chính cho NĐT theo dõi hồ sơ DN
  - Đặt lịch nộp hồ sơ (UC42-44) — luồng đặt lịch + theo dõi trạng thái
  - Phản ánh kiến nghị (UC53_63-65) — luồng feedback chính
  - Nhận thông báo hệ thống (UC258-259) — push notification cho mọi event quan trọng
- **High-risk areas:**
  - Tích hợp VNeID deep-link/in-app browser (BS-01) — phụ thuộc app VNeID + OS routing
  - Push notification (FCM/APNs) cold start, deep link (KT-16, KT-17)
  - Auto-fill + sửa thông tin trên form phản ánh (UX-07) — race condition khi user sửa
  - Lưu nháp + gửi + hủy bỏ phản ánh (UX-06) — workflow complex state
  - Đổi MK → bắt buộc đăng xuất (BS-07) — token invalidation logic
- **NFR notes:** _(chưa có trong common files — cần BA/PM bổ sung; xem Q-005)_
  - Performance: chỉ có lazy load 20 records (KT-02, KT-15); không có target response time / TPS
  - Security: token Secure Storage (BS-04), không giới hạn nhập sai MK (BS-03) — đáng review NFR-security
  - Compatibility: chưa có matrix iOS/Android version
  - Accessibility: chưa đề cập
  - Logging: chưa đề cập
- **Known constraints:**
  - **AI-UX-01..04:** Toast, Empty states, List rỗng, Error states (404/500/offline/timeout) — chưa thiết kế UI/UX (xem Q-012)
  - **AI-UC-01..AI-UC55-01:** UC41 chờ BA, UC2 Chi tiết KCN chờ BA, UC55 luồng đăng ký tư vấn chờ KH (xem Q-011)
  - Pending assumption: KT-03 (bảng số liệu KT/XH/MT — xem Q-010), NV-09/NV-10 (xem Q-009)

## 8. Environment Context

- **Platform Coverage** _(chưa có matrix chính thức — suy đoán từ technical assumptions; xem Q-007)_
  - OS: iOS (APNs — KT-16) + Android (FCM — KT-16); chưa có version range
  - Devices: smartphone (mobile-first); chưa có tablet coverage
  - Screen sizes: chưa định nghĩa
- **Test environments** (từ `project-config.md` §3):
  - DEV — Development & initial testing
  - QA / Staging — Primary QA + UAT
  - UAT — User Acceptance Testing by clients
  - PROD — Live production

  > **Lưu ý (run-009, 2026-05-13):** Endpoints + DB connection strings trong `project-config.md` giữ ở format placeholder. Agent **không thực thi test** trên môi trường thực — execution sẽ do QC engineer chạy tay/CI ngoài scope của framework hiện tại. Vì vậy giá trị thực của endpoints không cần điền cho mục đích AI-assist QC.

## 9. QC Process Notes

- **Test levels:** Function test, Integration test, System test, Regression test — toàn bộ thuộc trách nhiệm QC team.
- **Entry criteria:** Khi spec/requirement (UC) đạt trạng thái Ready (từ `qc-uc-read`), QC sẽ chủ động trigger workflow thiết kế kịch bản + test cases tiếp theo.
- **Exit criteria:**
  - 100% test cases Pass
  - Defect Critical = 0
  - Defect Major < 1
  - Test coverage ≥ 95%
- **Defect workflow:** Quản lý ở tool ngoài framework (out of scope cho QC kit; user-managed).
- **Reporting expectations:** Inferred từ defect tool ngoài — không thuộc phạm vi QC kit này.

## 10. Open Questions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| Q-001 | `project-config.md` ghi Project name "test cho MBFS mobile" placeholder, không khớp nội dung common files (SRS Mobile cho NĐT, Cục ĐTNN). | §1 Project Identity (cao) | QC Lead / PM | Resolved (run-009: Project ID = MBFS confirmed by user; project-config.md cần update tên chính thức sau) |
| Q-002 | Business goal & success criteria/KPI chưa được nêu — KPI nào đo lường thành công v1? | §2 Business Goal (cao) | PM / BA | Open |
| Q-003 | Role/permission matrix chính thức chưa có — có thêm role nào (Admin, Cán bộ Cục, NĐT nước ngoài) không? | §4 Users and Roles (trung) | BA | Open |
| Q-004 | System Architecture Diagram + Tech Stack documents không có trong `high-level-files/` — ở đâu khác? | §5 System Overview (cao) | Tech Lead / PM | Open |
| Q-005 | NFR (Performance/Security/Compatibility/Accessibility/Logging) chưa có target/threshold. | §7 Quality Context (cao) | PM / Tech Lead | Open |
| Q-006 | Test levels, entry/exit criteria, defect workflow, reporting expectations. | §9 QC Process Notes (cao) | QC Lead | Resolved (run-009: Function/Integration/System/Regression; entry=spec Ready trigger; exit=100% pass + critical=0 + major<1 + coverage≥95%; defect tool out of scope) |
| Q-007 | Mobile platform coverage matrix (OS version, thiết bị, screen size) chưa định nghĩa. | §8 Environment (trung) | Tech Lead / QC Lead | Open |
| Q-008 | DEV/QA/UAT/PROD endpoints + DB connection strings placeholder. | §8 Environment (trung) | DevOps / PM | Resolved (run-009: agent không execute test thực tế → endpoints không cần fill cho QC kit) |
| Q-009 | ĐỢT 2 ASSUMPTION_BACKLOG còn 2 item chờ BA: NV-09 (loại thông báo ngoài xử lý hồ sơ), NV-10 (Giới thiệu tĩnh hay CMS). | §3 Scope (trung) | BA (han.luong / huy.lai2) | Open |
| Q-010 | KT-03 (cách thể hiện KT/XH/MT trong tab chi tiết KCN — bảng số liệu hay biểu đồ) vẫn "Chưa trả lời" trong ĐỢT 1. | §3 Scope (thấp) | BA | Open |
| Q-011 | AI-UC-01 (UC41 Cho thuê đất), AI-UC-02 (Chi tiết KCN), AI-UC55-01 (luồng đăng ký tư vấn) — khi nào BA/KH có data? | §3 Scope (trung) | BA / KH | Open |
| Q-012 | AI-UX-01..04 (Toast, Empty states, Error states) chưa thiết kế UI/UX. | §7 Quality (cao) | UI/UX team | Open |
