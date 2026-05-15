# Project Context Master: SRS Mobile App — Cổng thông tin đầu tư & dịch vụ công cho NĐT (Cục ĐTNN)

**Project ID:** MBFS
**Trạng thái:** Draft (chờ QC Lead review)
**Ngày tạo/cập nhật:** 2026-05-15
**Người chuẩn bị:** QC Context Agent (`qc-context-master-02`)
**Người review:** QC Lead
**Mục đích:** Cung cấp bối cảnh tổng quan cấp project để các QC Agent hiểu đúng hệ thống, phạm vi, rule chung, rủi ro và trạng thái tài liệu trước khi review spec, thiết kế scenario/test case, execute hoặc verify bug.

> **Lưu ý nguyên tắc edit:** File này là loại edit in-place (theo `path-registry.md`). Mỗi lần `qc-context-master-02` chạy lại ở Update mode, nội dung được merge với bản hiện hữu: giữ những quyết định đã được QC Lead duyệt (carry-over Q-resolved, danh sách Out-of-scope đã apply, Project ID), cập nhật phần mới phát hiện hoặc thay đổi, và đánh dấu rõ TBD / Assumption / Conflict.

---

## 1. Cách các QC Agent sử dụng file này

| Nhóm Skill | Cách sử dụng project context | Cần đọc thêm file nào |
|---|---|---|
| Site map / dashboard / high-level review | Hiểu cấu trúc 1 site Mobile + 6 module + 21 row UC group, nắm danh sách Out-of-scope (NV-01..NV-08, UC70) và 11 dòng đang chờ BA/KH | `qc-dashboard.md`, `UC_LIST_Mobile.md`, `ACTION_ITEMS_Mobile.md` |
| Spec review (`qc-uc-read`) | Dùng context tổng quan + Out-of-scope list để loại trừ các UC không thuộc phạm vi mobile (thanh toán, tạo/huỷ lịch, xoá tài liệu, nộp báo cáo mới); đối chiếu assumption đã được BA xác nhận | `requirement-files/<UC-ID>/`, `ASSUMPTION_BACKLOG_Mobile.md` |
| Scenario design (`qc-func-scenario-design`) | Xác định role (Khách / NĐT CN / NĐT DN), dependency (VNeID, FCM/APNs, WebView, Google Maps app, Secure Storage, in-app PDF viewer), critical flow (Đăng nhập VNeID, Quản lý hồ sơ, Đặt lịch, Phản ánh, Nhận thông báo) | `uc-review-report/<UC-ID>/`, spec chi tiết, wireframe PNG |
| Test case design (`qc-func-tc-design`) | Áp common rule mobile: lazy load 20 record (KT-02, KT-15, UX-04); CMND/CCCD 9/12 số; MST DN 10/13 số (BS-09); auto-fill có cho sửa (UX-07); FAQ accordion mở nhiều (UX-11); đổi MK → bắt buộc đăng xuất (BS-07); push/in-app only (KT-18) | `func-test-scenarios/<UC-ID>/`, spec, wireframe |
| Test execute | Hiểu môi trường (DEV/QA-Staging/UAT/PROD), agent **không thực thi test** — execution do QC engineer chạy tay/CI ngoài framework; chú ý dependency thiết bị (iOS APNs / Android FCM) | `project-config.md`, test cases, test data |
| Bug verify | Đối chiếu impact area (Auth-VNeID, Hồ sơ, Đặt lịch, Phản ánh, Thông báo push) và regression area (Sidebar navigation, Trang chủ Quick Access, token sau đổi MK) | Bug report, spec, test case |

**Quy tắc sử dụng:**
Nếu thông tin trong file này mâu thuẫn với spec/wireframe/assumption đã được BA xác nhận trong `ASSUMPTION_BACKLOG_Mobile.md`, Agent phải báo conflict và ưu tiên: (1) tài liệu BA-approved → (2) spec UC chi tiết → (3) file này, trừ khi QC Lead có chỉ định khác.

---

## 2. Tóm tắt dự án

| Hạng mục | Nội dung |
|---|---|
| Tên dự án / sản phẩm | SRS Mobile App — Cổng thông tin đầu tư & dịch vụ công cho Nhà đầu tư (NĐT) — Cục Đầu tư nước ngoài (Cục ĐTNN). *(Lưu ý: `project-config.md` đang ghi placeholder "test cho MBFS mobile" — xem Q-001)* |
| Project ID | **MBFS** *(QC Lead xác nhận run-009, 2026-05-13)* |
| Domain / nghiệp vụ | Mobile app — Đầu tư công, xúc tiến đầu tư, dịch vụ công cho NĐT (CN + DN) |
| Loại dự án | New build |
| Product Platform Type | `mobile-native` (iOS + Android, FCM/APNs, VNeID deep-link) |
| Mục tiêu chính của dự án/release | v1 — cung cấp kênh mobile-first để NĐT tra cứu KCN/KKT/TMTD/PTQ/quỹ đất, quản lý hồ sơ đầu tư, đặt lịch nộp hồ sơ, gửi phản ánh, theo dõi báo cáo đã nộp và nhận thông báo hệ thống |
| Người dùng chính | NĐT cá nhân (CN), NĐT doanh nghiệp (DN), Khách (Anonymous public) |
| Release / phase hiện tại | v1 (theo `UC_LIST_Mobile.md`) |

**Tóm tắt ngắn:**
Dự án SRS Mobile App là sản phẩm new build cấp 1 site (Mobile), thuộc Cục ĐTNN, phục vụ NĐT trong và ngoài nước truy cập thông tin đầu tư + dịch vụ công qua native mobile (iOS + Android). Release v1 gồm ~95 UC đơn lẻ gom thành 19 file UC trên 6 module: Xác thực & QL tài khoản, Trang chủ & Điều hướng, Quản lý hồ sơ & Dịch vụ, Tra cứu KCN/KKT & Quỹ đất, Tin tức Thông tin & Hỗ trợ, Thông báo. BA/PO: han.luong & huy.lai2. 40 assumption đã được BA xác nhận trong ĐỢT 1 (29/04/2026); 3 item còn chờ BA (NV-09, NV-10, KT-03). 4 design item (Toast / Empty / Error states) và 3 UC (UC41, UC2 chi tiết KCN, UC55 đăng ký tư vấn) chờ BA/KH.

---

## 3. Phạm vi tổng thể và ranh giới kiểm thử

### 3.1 In scope cấp project/release (v1)

| Area / site / module / capability | Mô tả ngắn | Priority | Ghi chú |
|---|---|---|---|
| Xác thực & Quản lý tài khoản | Đăng nhập (UC256), Đăng xuất (UC257), Cấu hình tài khoản (UC249), Đăng ký + Quên MK + Cập nhật DN (UC250-254) — hỗ trợ VNeID + username/password | High | BS-01..BS-11, UX-13, UX-14 |
| Trang chủ & Điều hướng | Dashboard + Quick Access + Sidebar (UC1) | High | UX-01..UX-03, KT-01 |
| Quản lý hồ sơ & Dịch vụ | Đặt lịch (UC42-44), Hồ sơ (UC45-51), Kho tài liệu cá nhân (UC52), Phản ánh (UC53/63-65), Báo cáo đã nộp (UC54) | High | KT-06, UX-04..UX-07 |
| Tra cứu KCN/KKT & Quỹ đất | UC2-UC31 (KCN/KKT/TMTD/PTQ/Mô hình khác), UC40 (Quỹ đất) | Medium | KT-02, NV-06 — public access |
| Tin tức, Thông tin & Hỗ trợ | Chuyên trang (UC55), Tin tức (UC56-57/66/68, UC60-61), VBPL (UC69), Hướng dẫn/FAQ (UC71-82), Điều khoản/Liên hệ/Giới thiệu (UC83-86), Xúc tiến đầu tư (UC90 — đại diện nhóm UC87-95) | Medium | PQ-03..PQ-07, KT-08..KT-15 |
| Thông báo | Push + in-app (UC258/UC259) | High | KT-16, KT-17, KT-18 |

### 3.2 Out of scope / chưa làm trong phase này

| Area / site / module / capability | Lý do loại trừ / deferred | Ảnh hưởng đến QC |
|---|---|---|
| UC70 — Tra cứu TTHC trên mobile | User xác nhận Removed khỏi WBS (2026-05-13) | Đã đánh `Removed` trong dashboard, không thiết kế test |
| UC41 — Cho thuê đất KCN | Tách khỏi UC40, chờ BA hoàn tất (AI-UC-01) | Theo dõi sau khi BA hoàn tất |
| Thanh toán phí hồ sơ trên mobile (NV-03) | Không có trên mobile | Không thiết kế test scenario thanh toán |
| Tạo lịch hẹn mới từ Quản lý đặt lịch (NV-01) | Chỉ xem/quản lý lịch đã đặt từ web | Test chỉ cover xem + quản lý |
| Hủy lịch hẹn trên mobile (NV-02) | Không có chức năng huỷ | Bỏ qua flow huỷ lịch |
| Xóa tài liệu trong Kho dữ liệu (NV-04) | Chỉ xem | Bỏ qua flow xoá |
| Nộp báo cáo mới (NV-05) | Chỉ tra cứu báo cáo đã nộp | Bỏ qua flow nộp mới |
| Thay đổi Avatar (UX-12) | Chưa có v1 | Bỏ qua |
| Thông báo qua Email (KT-18) | Chỉ push/in-app | Không test kênh Email |
| Kết xuất dữ liệu quỹ đất ra Excel (KT-04) | Chỉ xem file đính kèm | Không test export |
| Chi tiết KCN (sub-tab Hạ tầng/Nhà đầu tư…) (AI-UC-02) | Chờ BA bổ sung | Theo dõi sau |
| Luồng đăng ký tư vấn đầu tư (UC55) (AI-UC55-01) | Chờ khách hàng | Theo dõi sau |
| Nhóm quy mô vốn (UC87-95) (NV-07) | Đã xoá khỏi UC | Không test filter quy mô vốn |

### 3.3 Assumption, dependency, constraint quan trọng

| Loại | Nội dung | Ảnh hưởng đến QC Agent | Cần xác nhận? |
|---|---|---|---|
| Assumption | 40 assumption ĐỢT 1 đã được BA xác nhận trong `ASSUMPTION_BACKLOG_Mobile.md` (PQ, BS, UX, KT, NV) | Common rule cho mọi scenario/TC | No (đã confirmed) |
| Assumption | ĐỢT 2: NV-09 (loại thông báo ngoài hồ sơ), NV-10 (Giới thiệu tĩnh/CMS) chờ BA | Có thể mở rộng scope UC258/259, UC86 | Yes — BA |
| Assumption | KT-03 (cách thể hiện KT/XH/MT — bảng số liệu/biểu đồ) chờ BA | Ảnh hưởng UI test UC2 chi tiết KCN | Yes — BA |
| Dependency | VNeID (deep-link / in-app browser) — BS-01 | Có thể chặn flow UC256 nếu app VNeID không cài | Yes — Tech Lead xác nhận fallback |
| Dependency | FCM (Android) + APNs (iOS) — KT-16 | Push notification UC258/259 | No |
| Dependency | Google Maps app — KT-12, KT-13 | Tap địa chỉ mở external | No |
| Dependency | CMS / Backend API — KT-11, KT-08 | Tin tức, FAQ, chuyên trang | Yes — Tech Lead cung cấp API spec |
| Dependency | Secure Storage (Keychain/Keystore) — BS-04 | Lưu auth token | No |
| Dependency | In-app PDF viewer — KT-06 (UC45-51), KT-07 (UC52) | View PDF hồ sơ | No |
| Constraint | Agent không thực thi test thực tế — execution do QC engineer chạy tay/CI ngoài framework | Giới hạn phạm vi tự động hoá QC kit | No (run-009 xác nhận) |
| Constraint | Lazy load 20 records (KT-02, KT-15, UX-04) | Áp cho danh sách KCN/KKT, Xúc tiến, Lịch hẹn | No |

---

## 4. Cấu trúc hệ thống

**Kiến trúc tổng:** 1 site Mobile (native iOS + Android) giao tiếp Backend API (REST/JSON — *assumption*); một số nội dung (VBPL, Tin tức) hiển thị qua WebView; Push qua FCM (Android) + APNs (iOS); Auth qua VNeID deep-link hoặc username/password.

| Site / portal / app | Mục đích | Nhóm user chính | Module chính | Ghi chú |
|---|---|---|---|---|
| Mobile (iOS + Android) | Cung cấp kênh mobile cho NĐT tra cứu + quản lý hồ sơ + dịch vụ công | Khách (public), NĐT CN, NĐT DN | 6 module: (1) Xác thực & QL TK, (2) Trang chủ & Điều hướng, (3) QL hồ sơ & Dịch vụ, (4) Tra cứu KCN/KKT & Quỹ đất, (5) Tin tức/Thông tin/Hỗ trợ, (6) Thông báo | Detail UC list ở `qc-dashboard.md` |

**Related high-level files:**

| File | Vai trò | Trạng thái | Owner |
|---|---|---|---|
| `docs/qc-lead/high-level-files/UC_LIST_Mobile.md` | Master UC inventory (19 file UC, ~95 UC) + Sidebar navigation | v1 | QC Agent (BA input) |
| `docs/qc-lead/high-level-files/ASSUMPTION_BACKLOG_Mobile.md` | Single source of truth assumptions + BA response (append-only) | v1 — ĐỢT 1 done, ĐỢT 2 pending | BA (han.luong / huy.lai2) |
| `docs/qc-lead/high-level-files/ACTION_ITEMS_Mobile.md` | Design item + UC chờ BA/KH | v1 | BA |
| `docs/qc-lead/qc-dashboard.md` | Feature/UC list + trạng thái files + status review/scenario/TC | Live | `qc-dashboard-sync` |
| `docs/qc-lead/project-config.md` | Project meta-config (links, environments, accounts, third-party API) | v2 — partial, links placeholder | QC Lead |
| `docs/qc-lead/project-context-master.md` | File này — project context tổng quan | Live | `qc-context-master-02` |
| `docs/BA/<UC-ID>/` (spec chi tiết + wireframe PNG) | SRS Mobile per UC | **Đã bị clear** (commit `45c7d81` — "clear old spec files"); cần BA cung cấp lại — xem Q-015 | BA |
| `docs/BA/Common rule/CMR_Mobile.md` | Common Mobile Rules + empty-state design | **Đã bị clear** (commit `45c7d81`); cần BA cung cấp lại — xem Q-015 | BA |
| `docs/QC/uc-read/<UC-ID>/`, `docs/QC/scenarios/<UC-ID>/`, `docs/QC/testcases/<UC-ID>/` | UC review report, scenario, test case theo từng UC | **Đã bị clear** cùng commit `45c7d81` → `qc-dashboard.md` cột `Files stt` (Specs/WF/Audited/Scenario/TC) hiện đang stale; cần chạy lại `/qc-dashboard-sync` sau khi BA/QC cung cấp lại artifact | QC |

**Lưu ý:** Detail feature/UC list không liệt kê tại đây — xem `qc-dashboard.md`.

---

## 5. Users, roles và permission tổng quan

| Role / actor | Mô tả | Workflow chính | Permission / responsibility tổng quan | Ghi chú QC |
|---|---|---|---|---|
| Khách / Anonymous | Người dùng chưa đăng nhập | Tra cứu thông tin public | UC2-UC31, UC40, UC55-68, UC69/73, UC71-82, UC83-86, UC87-91, UC93-95 (PQ-01..PQ-07) | UC92 yêu cầu đăng nhập — khác phần còn lại của nhóm UC87-95 |
| NĐT — Cá nhân (CN) | NĐT cá nhân đã xác thực qua VNeID hoặc CMND/CCCD (9/12 số) | UC256 → UC1 → luồng hồ sơ/dịch vụ → UC257 | Tất cả của Khách + UC249-254, UC42-44, UC45-51, UC52, UC53/63-65, UC54, UC258-259, UC92 | Auto-fill thông tin cá nhân nhưng cho phép sửa (UX-07) |
| NĐT — Doanh nghiệp (DN) | NĐT pháp nhân với MST DN (10/13 số) | Tương tự CN + đăng ký + cập nhật DN (UC250-254) | Tất cả của NĐT CN; MST DN không sửa sau đăng ký (BS-11) | Validation MST 10/13 số khi đăng ký |
| BA / PO | han.luong & huy.lai2 | Cung cấp + xác nhận yêu cầu, trả lời assumption | Owner SRS Mobile | Liên hệ khi có Open Question |
| QC / QA | Đội QC | Review UC, thiết kế scenario & test case | Theo `qc-dashboard.md` | Sử dụng skill qc-uc-read / qc-func-scenario-design / qc-func-tc-design |

**Lưu ý:**
Permission tổng quan dựa trên PQ-01..PQ-07 đã được BA xác nhận. Chi tiết permission từng màn/từng field nằm trong spec UC cụ thể.

---

## 6. Business flow, module relationship và impact area

### 6.1 Flow chính cấp project

| Flow ID | Flow name | Actor chính | Module/site liên quan | Trigger | Kết quả chính | Ghi chú impact/regression |
|---|---|---|---|---|---|---|
| FLOW-001 | Đăng nhập VNeID | NĐT CN/DN | Xác thực & QL TK | User mở app, chưa đăng nhập | Token lưu Secure Storage (BS-04), về Trang chủ | Phụ thuộc app VNeID + OS routing (BS-01) — high regression risk |
| FLOW-002 | Đăng nhập username/password | NĐT CN/DN | Xác thực & QL TK | User chọn đăng nhập thường | Token lưu Secure Storage, về Trang chủ | BS-03 không giới hạn số lần nhập sai |
| FLOW-003 | Quản lý hồ sơ đầu tư | NĐT DN | QL hồ sơ & Dịch vụ + Trang chủ | User vào "Quản lý hồ sơ" từ Sidebar/Quick Access | Xem + tìm kiếm + theo dõi hồ sơ | UX-05 tìm kiếm theo mã/tên + filter tab; UC45-51 review v1 Score 70.8 |
| FLOW-004 | Đặt lịch nộp hồ sơ | NĐT DN | QL hồ sơ & Dịch vụ | User vào "Quản lý đặt lịch" | Xem + quản lý lịch đã đặt từ web (không tạo mới — NV-01, không huỷ — NV-02) | Lazy load 20 (UX-04) |
| FLOW-005 | Gửi phản ánh kiến nghị | NĐT CN/DN | QL hồ sơ & Dịch vụ + Auth | User vào "Phản ánh kiến nghị" | Lưu nháp / Gửi / Hủy bỏ (UX-06); auto-fill thông tin (UX-07) | State workflow phức tạp |
| FLOW-006 | Tra cứu KCN/KKT (public) | Khách | Tra cứu KCN/KKT & Quỹ đất | User mở app + vào module Tra cứu (không yêu cầu đăng nhập — PQ-01) | Xem danh sách (lazy load 20 — KT-02) + chi tiết (KT-03 chờ BA) | Public access |
| FLOW-007 | Nhận thông báo push | NĐT CN/DN | Thông báo | Hệ thống emit event | Push qua FCM/APNs (KT-16), deep link cold start (KT-17), in-app | NV-09 chờ BA xác nhận loại thông báo; không có Email (KT-18) |
| FLOW-008 | Đăng ký NĐT (CN hoặc DN) | NĐT mới | Xác thực & QL TK | User chọn "Đăng ký" | Validate CMND/CCCD 9/12 (BS-09), MST DN 10/13 (BS-09, BS-11), auto-login sau đăng ký (UX-14) | MST DN không sửa sau đăng ký (BS-11) |
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

---

## 7. Rule chung, data/state và integration cần nhớ

### 7.1 Rule chung áp dụng nhiều function

| Rule | Áp dụng cho | Ảnh hưởng đến review/spec/scenario/test case |
|---|---|---|
| Public access (không yêu cầu đăng nhập) — PQ-01..PQ-07 | UC2-31, UC40, UC55-68, UC69/73, UC71-82, UC83-86, UC87-91, UC93-95 | Scenario chỉ cần Khách + NĐT (không token cho luồng public); không cần test session expired |
| CMND/CCCD 9 hoặc 12 số (BS-09) | UC249, UC250-254 | Validation field |
| MST DN 10 hoặc 13 số (BS-09); không sửa sau đăng ký (BS-11) | UC250-254 | Validation + read-only state |
| Không giới hạn số lần nhập sai mật khẩu (BS-03) | UC256 | Bỏ qua test account lockout |
| Quên mật khẩu qua SĐT hoặc Email, OTP qua SMS (BS-10) | UC250-254 | Phải test cả 2 kênh SĐT + Email |
| Sau đổi MK bắt buộc đăng xuất (BS-07) | UC249 + Auth | Regression: token invalidation |
| Sau đăng ký auto-login về Trang chủ (UX-14) | UC250-254 | Test ngay sau Register |
| Thay đổi ngôn ngữ áp dụng ngay (UX-13) | UC249, UC250-254 | Test UI ngôn ngữ động |
| Đăng xuất khi API thất bại vẫn xóa token cục bộ (BS-05) | UC257 | Test offline logout |
| Auto-fill họ tên/SĐT/Email + cho sửa (UX-07) | UC53 | Test dữ liệu auto-fill + after-edit |
| Lazy load 20 records (KT-02, KT-15, UX-04) | UC2-31, UC87-95, UC42-44 | Test scroll + page loading |
| FAQ Accordion mở nhiều câu cùng lúc (UX-11) | UC71-82 | Test multi-expand |
| Quick Access cố định (UX-01) | UC1 | Test UI |
| Badge thông báo fetch on focus (UX-02, KT-01) | UC1 | Test refresh khi focus app |
| Sidebar chứa toàn bộ menu (UX-03) | UC1 + Navigation | Không có bottom nav |
| Chỉ push + in-app, không Email (KT-18) | UC258/259 | Loại trừ kênh Email |
| Cache nội dung tĩnh offline (KT-14) | UC83-86 | Test offline behaviour |

### 7.2 Data object / state quan trọng cấp project

| Object / entity | Mô tả | State / lifecycle chính | Ghi chú QC |
|---|---|---|---|
| Auth token | Token sau đăng nhập, lưu Secure Storage (BS-04) | Active → Invalidate (logout, đổi MK) | BS-05 logout fail vẫn xóa cục bộ; BS-07 đổi MK invalidate |
| User profile | Họ tên, SĐT, Email, CMND/CCCD, MST DN | Created (Register) → Updated (Cấu hình) | MST DN không sửa (BS-11); auto-fill phản ánh (UX-07) |
| Hồ sơ đầu tư | Hồ sơ DN/cá nhân do NĐT theo dõi | Trạng thái do BE quản lý — mobile chỉ xem | Không thanh toán (NV-03); không nộp mới |
| Lịch hẹn | Lịch tạo từ web | Created (web) → Xem trên mobile (NV-01, NV-02) | Lazy load 20 (UX-04) |
| Phản ánh kiến nghị | Khiếu nại / kiến nghị | Nháp → Gửi → Huỷ bỏ (UX-06) | State workflow trên client + server |
| Báo cáo đã nộp | Báo cáo NĐT đã nộp | Read-only (NV-05) | |
| Tài liệu Kho cá nhân | PDF / Image / Word / Excel | Read-only (NV-04) | PDF/image mở browser, Word/Excel tải xuống (KT-07) |
| Lô đất (UC40) | Lô đất KCN | Đang cho thuê / Còn trống / Hết hạn HĐ (NV-06) | Trạng thái filter |
| Thông báo | Push + in-app | Unread → Read; loại còn chờ BA (NV-09) | Badge fetch on focus (KT-01) |

### 7.3 Integration / API / job / notification quan trọng

| Item | Loại | Module liên quan | Ghi chú QC / risk |
|---|---|---|---|
| VNeID | Integration (deep-link / in-app browser) | UC256 | High risk — phụ thuộc OS routing + app VNeID |
| FCM (Android) + APNs (iOS) | Notification | UC258/259 | Cold start deep link (KT-17) |
| Google Maps app | Integration (external app) | UC83-86 | Mở external (KT-12, KT-13) — không embed |
| In-app PDF viewer | Integration (client lib) | UC45-51, UC52 | KT-06 PDF in-app; KT-07 PDF/image mở browser, Word/Excel tải xuống |
| WebView | Integration (client) | UC55-68, UC69/73 | KT-08 lọc tỉnh/TP; KT-09 hiển thị VBPL |
| CMS / Backend API | API | UC55-68, UC71-82, UC87-95 | KT-11 nội dung động qua API; KT-15 lazy load |
| Secure Storage (Keychain/Keystore) | Client storage | Auth | BS-04 lưu token |
| OTP SMS | Service | UC250-254 (Quên MK) | BS-10 OTP qua SMS |

---

## 8. Platform, environment, device và NFR/ràng buộc

### 8.1 Platform và environment tổng quan

| Hạng mục | Nội dung | Ghi chú QC |
|---|---|---|
| Platform type | `mobile-native` (iOS + Android) | Điều khiển rubric thiết kế test case mobile-native |
| Browser / OS / device cần quan tâm | OS: iOS (APNs — KT-16) + Android (FCM — KT-16). Phiên bản OS, danh sách thiết bị, screen size: **TBD** | Xem Q-007 — cần Tech Lead/QC Lead build test matrix |
| Test environment | DEV / QA-Staging / UAT / PROD (từ `project-config.md` §3) | Endpoint placeholder; agent **không thực thi test** — execution do QC engineer chạy ngoài framework (run-009) |
| Integration mode | VNeID (real / sandbox? — **TBD**), FCM/APNs (real), Google Maps app (real external), WebView (real) | Xem Q-017 — VNeID sandbox |
| Test data / account tổng quan | NĐT CN (CMND/CCCD 9/12), NĐT DN (MST 10/13), Khách (không cần account) | `project-config.md` §4 chưa fill account thực — placeholder |

### 8.2 NFR, security, compliance, legal, audit

| Loại ràng buộc | Nội dung đã biết | Ảnh hưởng QC |
|---|---|---|
| Performance | Chỉ có rule lazy load 20 records (KT-02, KT-15). Không có target response time / TPS — **TBD** | Chưa thể thiết kế performance test có ngưỡng |
| Security | Token Secure Storage (BS-04); không giới hạn nhập sai MK (BS-03); sau đổi MK bắt buộc đăng xuất (BS-07) | Cần BA/Tech Lead xác nhận policy lockout |
| Accessibility | **TBD** — chưa đề cập | Chưa có target a11y |
| Privacy / Compliance / Legal | **TBD** — chưa có document chính thức (Q-016) | Risk legal khi test data thật |
| Audit / Logging | **TBD** — chưa đề cập | Cần Tech Lead định nghĩa log policy |

---

## 9. Đánh giá mức độ đủ context cấp project

| Nhóm context | Trạng thái | Độ tin cậy | Ảnh hưởng nếu thiếu/sai | Cần QC Lead bổ sung gì |
|---|---|---:|---|---|
| Project goal & scope | Partial | Medium | Thiếu KPI → khó đánh giá Pass tại UAT | Xác nhận tên dự án chính thức + KPI release v1 |
| System/site/module overview | Partial | Medium | Thiếu sơ đồ kiến trúc → khó scope integration test | Yêu cầu Tech Lead cung cấp Architecture Diagram + Tech stack |
| Feature/use case inventory | Partial | High | Gom row UC55-68 + UC87-95 chưa khớp 1-1; UC73 mơ hồ | Xác nhận cách gom row dashboard + UC73 in/out scope |
| Users/roles/permission overview | Partial | Medium | Có thể thiếu role Admin / Cán bộ Cục / NĐT NN | Yêu cầu BA cung cấp role matrix chính thức |
| Business flows & module relationship | Ready | High | - | (không) |
| Common rules/data/state/integration | Partial | High | Common rule book + API spec chưa có; 3 assumption chờ BA (NV-09, NV-10, KT-03) | Yêu cầu BA trả lời ĐỢT 2 + cung cấp `CMR_Mobile.md` |
| Platform/environment/device/NFR | Partial | Low | Coverage matrix + NFR target chưa có | Build test matrix + PM định target NFR |
| Document status tracking | Ready | High | `qc-dashboard` track tốt | (không) |

**Kết luận:**
Context cấp project hiện ở mức **Tạm đủ** để QC Agent triển khai review/scenario/TC cho các UC đã có spec V1 trở lên. Gap có rủi ro cao nhất: (1) thiếu sơ đồ kiến trúc + tech stack + API spec → ảnh hưởng integration/regression analysis; (2) thiếu NFR target → không thiết kế được performance/security test có ngưỡng; (3) folder `docs/BA/` chưa tồn tại trên repo → QC Agent chưa thể đọc spec chi tiết cho per-UC workflow; (4) 4 AI-UX (Toast, Empty, Error states) chưa thiết kế → ảnh hưởng test UI cross-feature.

---

## 10. Open questions và việc cần QC Lead xác nhận

| ID | Câu hỏi / thông tin cần xác nhận | Vì sao quan trọng | Ảnh hưởng nếu chưa rõ | Priority | Owner | Status |
|---|---|---|---|---|---|---|
| Q-001 | `project-config.md` ghi Project name "test cho MBFS mobile" placeholder, không khớp nội dung SRS Mobile cho NĐT, Cục ĐTNN. Cần cập nhật tên chính thức | §2 Project summary | Sai tên dự án trong meta-config | Medium | QC Lead / PM | Open |
| Q-002 | Business goal & success criteria/KPI v1 chưa có. KPI nào đo lường thành công? | §2 + §3 scope | Khó đánh giá Pass tại UAT | High | PM / BA | Open |
| Q-003 | Role/permission matrix chính thức — có thêm role Admin, Cán bộ Cục, NĐT nước ngoài không? | §5 roles | Có thể thiếu test role | Medium | BA | Open |
| Q-004 | System Architecture Diagram + Tech Stack documents ở đâu? Không có trong `high-level-files/` | §4 system structure | Khó scope integration & regression | High | Tech Lead / PM | Open |
| Q-005 | NFR (Performance / Security / Accessibility / Logging) target / threshold? | §8 NFR | Không thiết kế được test có ngưỡng | High | PM / Tech Lead | Open |
| Q-006 | Test levels, entry/exit criteria, defect workflow | §1 + §3 | - | - | QC Lead | Resolved (Function/Integration/System/Regression; entry=spec Ready trigger; exit=100% pass + critical=0 + major<1 + coverage≥95%; defect tool out of scope — run-009) |
| Q-007 | Mobile platform coverage matrix (OS version, thiết bị, screen size) | §8 platform | Coverage gap | Medium | Tech Lead / QC Lead | Open |
| Q-008 | DEV/QA/UAT/PROD endpoints + DB connection strings placeholder | §8 | - | - | DevOps / PM | Resolved (agent không execute test thực tế → endpoints không cần fill — run-009) |
| Q-009 | ĐỢT 2 ASSUMPTION_BACKLOG còn 2 item: NV-09 (loại thông báo ngoài hồ sơ), NV-10 (Giới thiệu tĩnh/CMS) | §3 + §7 | Mở rộng scope UC258/259, UC86 | Medium | BA | Open |
| Q-010 | KT-03 (KT/XH/MT trong tab chi tiết KCN — bảng số liệu hay biểu đồ) vẫn "Chưa trả lời" | §3 + §7 | UI test UC2 | Low | BA | Open |
| Q-011 | AI-UC-01 (UC41 Cho thuê đất), AI-UC-02 (Chi tiết KCN), AI-UC55-01 (luồng đăng ký tư vấn) — khi nào BA/KH có data? | §3 scope | Theo dõi mở rộng test khi sẵn sàng | Medium | BA / KH | Open |
| Q-012 | AI-UX-01..04 (Toast, Empty states, Error states) chưa thiết kế UI/UX | §3 + §7 | Test cross-feature UI thiếu chuẩn | High | UI/UX team | Open |
| Q-013 | Cách gom row dashboard chưa khớp 1-1 với UC_LIST: UC55-68 (12 UC) gom 3 row; UC87-95 (9 UC) gom 1 row UC90. UC58, UC59, UC62, UC67 không thấy trong dashboard | §4 + §3 | Coverage tracking sai số | Medium | QC Lead | Open |
| Q-014 | UC73 (TTHC) trong UC_LIST file VBPL+TTHC nhưng dashboard không có row UC73; existing project-context lại ghi "UC70 — TTHC" Removed. Có nhầm UC73 ↔ UC70 không? | §3 + §4 | Có thể thiếu / dư UC | Medium | QC Lead + BA | Open |
| Q-015 | Folder `docs/BA/` (spec chi tiết, common rule book, wireframe) và `docs/QC/` (uc-read, scenarios, testcases) đã bị xoá bởi commit `45c7d81` (2026-05-XX, "clear old spec files"). Khi nào BA/QC cung cấp lại? `qc-dashboard.md` cột `Files stt` hiện đang stale. | §4 sources + §9 | QC Agent không đọc được spec per-UC; dashboard hiển thị file artifact không còn tồn tại trên đĩa | High | BA + QC Lead | Open |
| Q-016 | Privacy / Compliance / Legal constraint áp dụng cho dự án dịch vụ công này — có document riêng không? | §8 NFR | Risk legal khi test data thật | Medium | Legal / BA | Open |
| Q-017 | VNeID có sandbox/mock environment để integration test không, hay chỉ có production VNeID? | §8 integration | Khó test UC256 deterministically | High | Tech Lead | Open |

---

## Phụ lục A. Nguyên tắc giữ file gọn

- Chỉ ghi thông tin cấp project hoặc thông tin dùng chung cho nhiều Agent/skill.
- Không copy toàn bộ nội dung từ spec, wireframe, API document hoặc use case detail.
- Không ghi test case chi tiết trong file này.
- Không lặp lại danh sách feature dài — đã có `UC_LIST_Mobile.md` và `qc-dashboard.md`.
- Nếu thông tin đã có ở file khác, chỉ tóm tắt vai trò và dẫn Agent đọc file đó.
- Nếu một thông tin chỉ ảnh hưởng một function cụ thể, đưa vào function-level context/spec review.
