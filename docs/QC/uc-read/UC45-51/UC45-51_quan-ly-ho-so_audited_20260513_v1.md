# UC Readiness Review — UC45-51: Quản lý hồ sơ trên Mobile
**Functional / Black-box Test Readiness Report**

| Thuộc tính | Giá trị |
|---|---|
| **Document title** | UC45-51 Readiness Review |
| **UC source** | `docs/BA/UC45-51_QuanLyHoSo/UC45-51_QuanLyHoSo.md` (v2.4, 29/04/2026 → updated 12/05/2026) |
| **Wireframe sources** | `docs/BA/UC45-51_QuanLyHoSo/UC 45_ Tất cả hồ sơ.png`, `UC 47_ Hồ sơ chờ tiếp nhận.png`, `UC 48-  Hồ sơ yêu cầu bổ sung.png`, `UC 49_ Hồ sơ đã tiếp nhận.png`, `UC 50_ Hồ sơ đã từ chối.png`, `UC 51_ Hồ sơ đã hoàn thành.png`, `UC45-51 filter.png`, `UC45-51Tab List.png`, `UC46_ chi tiết hồ sơ.png` |
| **Common rules** | `docs/BA/Common rule/CMR_Mobile.md` (v1.5) |
| **Project context** | `docs/qc-lead/project-context-master.md` |
| **Date created** | 2026-05-13 |
| **Author / Agent** | qc-uc-read (run-011, first-audit) |
| **Version** | v1 |
| **Output language** | Tiếng Việt (theo input source) |

---

## Feature Brief

UC45-51 là cụm chức năng "Quản lý hồ sơ" trên Mobile của NĐT (Cá nhân/Tổ chức) sau khi đăng nhập, gồm 2 màn chính: (1) **Màn Danh sách hồ sơ** — entry từ Sidebar, có Header (Back + Title + Notification Bell theo wireframe), Khung tìm kiếm (debounce 3s, max 500 char) + Bộ lọc (Trạng thái + Ngày tiếp nhận + Ngày hẹn trả), Thanh Tabs 6 trạng thái (Tất cả / Chờ tiếp nhận / Yêu cầu bổ sung / Đã tiếp nhận / Từ chối / Hoàn thành) cuộn ngang, và List Card hồ sơ lazy load 20 record/lần với pull-to-refresh; (2) **Màn Chi tiết hồ sơ** (UC46) — read-only, header + banner đỏ (Mã hồ sơ + Badge trạng thái + Ngày nộp) + 7 sections nội dung: Thông tin chung (5 trường), Thông tin tiếp nhận & trả kết quả (5), Thông tin văn bản & pháp lý (4), Nội dung chi tiết (4 trường, "Lý do" conditional), Kết quả & tài liệu (file list mở viewer/download theo CMR-08), Tiến độ & thời hạn (4 trường), Tiến trình xử lý (Timeline + Badge). Permission: NĐT chỉ xem hồ sơ của chính mình nộp. State persistence: tab + scroll + search/filter giữ nguyên khi quay lại từ chi tiết (CMR-01). Error handling đầy đủ 5 scenarios (network/500/timeout/401+refresh token/partial data) per CMR-07. Đa ngôn ngữ 5 ngôn ngữ (VI/EN/ZH/JA/KO) chỉ áp dụng text cứng (CMR-17). Known exceptions: 10 cross-artefact conflicts (Notification Bell, "Xem chi tiết" button, Filter button labels, Tab active style, Search scope intersection vs override, Detail header badge, Detail field duplications) + 13 open issues (AC ngắn, NFR thin, permission edge cases, Timeline data structure, Filter enum chưa khai báo).

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `70.8 / 100` | ⚠️ **CONDITIONALLY READY** |

**Lý do:** Spec có chất lượng UI inventory + behavior rule rất tốt (mọi UI element có table với "Quy tắc hiển thị" + "Quy tắc hành động" inline, state persistence đầy đủ, error handling 5 scenarios, lazy load retry, đa ngôn ngữ). Nhưng AC quá ngắn (5 bullets, không Given/When/Then), không có Preconditions/Postconditions formal, không có Integration table, NFR thiếu nhiều mục (response time, security, accessibility, compatibility), và có **10 cross-artefact conflicts** (4 High, 4 Medium, 2 Low) chủ yếu giữa wireframe và spec. QA có thể bắt đầu thiết kế test cho happy paths và lazy load / error handling, nhưng MUST resolve các conflicts High (C1, C2, C3, C6) và bổ sung AC formal trước khi đóng test design.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC45-51 (Phụ lục XIV) | Quản lý hồ sơ trên Mobile | v2.4 | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong & huy.lai2 | *(chưa rõ — BA tự khai)* | 29/04/2026 | 12/05/2026 |

---

## 1. Objective & Scope

### 1.1 Objective ✅ Complete
Cho phép NĐT (Cá nhân/Tổ chức) đã đăng nhập **xem danh sách toàn bộ hồ sơ đã nộp**, **tra cứu theo trạng thái** qua 6 tab trạng thái, và **xem chi tiết hồ sơ** trên thiết bị di động — phục vụ luồng theo dõi tiến độ xử lý hồ sơ đầu tư.

> Trích: §1 "Chức năng cho phép người dùng xem danh sách toàn bộ hồ sơ đã nộp, tra cứu theo trạng thái và xem chi tiết hồ sơ. Hệ thống hiển thị hồ sơ được phân loại theo các tab trạng thái."

### 1.2 In Scope ⚡ Partial
- Hiển thị Danh sách hồ sơ (lazy load 20/lần, sort ngày nộp giảm dần).
- 6 Tab trạng thái: Tất cả / Chờ tiếp nhận / Yêu cầu bổ sung / Đã tiếp nhận / Từ chối / Hoàn thành (single-select).
- Tìm kiếm gần đúng theo mã/tên hồ sơ (debounce 3s).
- Bộ lọc 3 tiêu chí: Trạng thái + Ngày tiếp nhận (range) + Ngày hẹn trả (range).
- Pull-to-refresh + Lazy load retry 3 lần.
- Màn Chi tiết hồ sơ (UC46) với 7 sections nội dung, read-only.
- File viewer / download per CMR-08 (PDF/JPG/PNG/MP4/AVI/MOV xem trực tiếp; DOC/DOCX/XLS/XLSX/ZIP download).
- State persistence (tab + scroll + search/filter) khi quay lại từ chi tiết.
- Đa ngôn ngữ 5 ngôn ngữ (text cứng).
- Error handling: lỗi mạng, HTTP 500, timeout 10s, HTTP 401 (refresh token >15d → relogin), partial data trên detail.

### 1.3 Out of Scope ⚠️ Missing
- *(Spec không liệt kê explicit Out-of-Scope cho UC45-51.)*
- *(inferred từ project-context §3)* **NV-03 — Thanh toán phí hồ sơ trên mobile**: chỉ hiển thị "Phí hồ sơ" read-only, không có chức năng thanh toán.
- *(inferred)* Tạo/Sửa/Xoá hồ sơ trên mobile: UC này chỉ View — không có CRUD.
- *(inferred)* Yêu cầu bổ sung / Phản hồi từ chối: action upload bổ sung không có ở UC này (có thể thuộc UC khác).
- *(inferred)* Khách/Anonymous: UC chỉ cho user đã đăng nhập.

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| NĐT — Cá nhân (CN) | Primary | Đã đăng nhập; xem được danh sách + chi tiết các hồ sơ **do chính mình nộp**; không xem được hồ sơ của user khác. Trên Card hiển thị Badge "Cá nhân". |
| NĐT — Tổ chức (TC) | Primary | Đã đăng nhập DN; xem được danh sách + chi tiết các hồ sơ **do tổ chức/DN của mình nộp**. Trên Card hiển thị Badge "Tổ chức". **⚠️ Spec không nói rõ trong tổ chức có nhiều user thì mỗi user xem được hồ sơ DN hay chỉ user đứng tên trên hồ sơ — xem Q4.** |
| Hệ thống (Backend API) | System | Cung cấp endpoint list hồ sơ (lazy load 20), endpoint chi tiết hồ sơ (multiple endpoints: thông tin chung, file đính kèm, timeline — partial data tolerance theo CMR-07). Refresh token auth. |
| Hệ thống (Push Notification — FCM/APNs) | System | *(inferred từ project-context §5)* cung cấp Notification Bell badge — nhưng UC45-51 spec không khai báo Bell — xem C1. |
| Khách / Anonymous | (out of scope) | Không truy cập được UC45-51 (yêu cầu đăng nhập). |

> Trích: §1 "Phân quyền: Cá nhân/Tổ chức đã đăng nhập chỉ xem được hồ sơ của chính mình nộp."

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions ⚡ Partial
- *(inferred từ §1 "Truy cập chức năng: Sidebar → Quản lý hồ sơ")* Người dùng đã đăng nhập thành công (UC256), session token hợp lệ.
- *(inferred)* User profile (Cá nhân hoặc Tổ chức) đã được xác định, có ít nhất 1 hồ sơ liên kết HOẶC 0 hồ sơ (empty state).
- *(inferred)* App đã được cài đặt và mở; thiết bị có kết nối mạng (UC không khai báo offline behaviour).
- *(inferred)* Backend cung cấp 6 trạng thái hồ sơ + dữ liệu test trên các trạng thái.

> **Gap (B1):** Spec không có section "Preconditions" formal — phải infer từ §1 + §3.1.

### 3.2 Postconditions ⚡ Partial (cho mỗi flow chính)

| Sau khi… | System state / Postcondition |
|----------|------------------------------|
| Mở màn Quản lý hồ sơ lần đầu | Tab "Tất cả" được chọn mặc định; gọi API lấy danh sách 20 record (sort ngày nộp giảm dần); hiển thị full-screen loading overlay; chuyển sang list khi data ready. |
| Tap 1 tab khác | Re-call API với param status mới; giữ search/filter; cập nhật underline đỏ trên tab mới. |
| Nhập từ khoá search | Sau 3 giây debounce → gọi API search; kết quả hiển thị; auto-trim whitespace; nếu rỗng sau trim → reset về list mặc định. |
| Xoá hết keyword search | List trở về trạng thái mặc định của tab hiện tại. |
| Áp dụng filter (tap "Tìm"/"Áp dụng") | Bottom Sheet đóng; gọi API với param filter; list reload; icon filter có Active Indicator (chấm xanh lá). |
| Tap "Nhập lại" trong Bottom Sheet | Reset toàn bộ field về default; sheet KHÔNG đóng. |
| Tap "X" / "Đóng" / vùng ngoài / Back vật lý Android | Bottom Sheet đóng; kết quả list KHÔNG thay đổi (Back vật lý quay về màn trước). |
| Pull-to-refresh | Spinner đầu list; reload toàn bộ từ trang 1; spinner ẩn khi xong. |
| Lazy load page N fail | Auto retry 3 lần (mỗi lần ~2s); sau 3 fail → dừng + lỗi cục bộ; user pull-to-refresh. |
| HTTP 401 với refresh token >15d | Toast "Phiên đăng nhập hết hạn." + redirect màn đăng nhập (UC256). |
| Tap card hồ sơ | Chuyển sang màn Chi tiết hồ sơ (UC46); CMR-18 debounce double-tap; tab + scroll + search/filter giữ nguyên trong list state. |
| Tap Back từ Chi tiết | Quay về Danh sách; restore tab + scroll + search/filter (CMR-01 state persistence). |
| Tap file đính kèm trong Section 5 | PDF/JPG/PNG/MP4/AVI/MOV → mở viewer trực tiếp; DOC/DOCX/XLS/XLSX/ZIP → tải xuống (CMR-08). |
| Section trên detail bị lỗi (partial data) | Section đó hiển thị lỗi cục bộ theo CMR-07; sections khác render bình thường. |
| Đổi ngôn ngữ trong app | Text cứng dịch sang ngôn ngữ mới; data API (mã hồ sơ, tên thủ tục, status) giữ nguyên (CMR-17). |

> **Gap (B1):** Spec không có table Postconditions formal — derive từ §3.1 + behavior rules trong §2.

---

## 4. UI Object Inventory & Mapping

> Coverage: mọi atomic UI element = 1 row. 9 design images đều có Delta = 0 (xem checkpoint `01_synthesis.md`).

### A. Màn Danh sách hồ sơ — Header

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 1 | Header list | Nút Quay lại (←) | Button (Icon) | N/A | — | — | N/A | Góc trái header; tap → quay về màn hình trước; CMR-06 + CMR-18 debounce. | 9 ảnh list |
| 2 | Header list | "Quản lý hồ sơ" (title) | Static Label | N/A | "Quản lý hồ sơ" | — | N/A | Chữ trắng nền đỏ đậm, căn giữa; đa ngôn ngữ (CMR-17). | 9 ảnh list |
| 3 | Header list | Notification Bell (🔔 + badge vàng) | Button (Icon) | N/A | — | — | N/A | **⚠️ Có trong wireframe (góc phải header); KHÔNG khai báo trong spec — xem C1.** Badge vàng — threshold/polling/tap behavior chưa rõ. | 9 ảnh list |

### B. Màn Danh sách hồ sơ — Khung Tìm kiếm & Lọc

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 4 | Search/Filter row | Ô tìm kiếm (Icon kính lúp) | Text Input (Search) | No | — | "Tìm kiếm theo mã, tên hồ sơ..." | N/A | Icon kính lúp bên trái; max 500 char (CMR-01); debounce 3s; gần đúng; auto-trim whitespace; state persistence cross-tab+detail; reset khi qua màn khác. | 9 ảnh list |
| 5 | Search/Filter row | Nút Lọc (Icon Filter) | Button (Icon) | N/A | — | — | N/A | Bên phải search; viền bo tròn; tap → mở Bottom Sheet; Active Filter Indicator (chấm xanh lá) khi filter ≠ mặc định (CMR-02 v1.1). | 9 ảnh list |

### C. Màn Danh sách hồ sơ — Bottom Sheet Bộ lọc

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 6 | Filter sheet | "Trạng thái" | Dropdown (Single-select, Searchable) | No | "Tất cả trạng thái" *(spec)* / **wireframe:** placeholder "Chọn trạng thái" — **xem C4** | "Chọn trạng thái" *(per wireframe)* | *(inferred từ tabs)* "Tất cả trạng thái" / "Chờ tiếp nhận" / "Yêu cầu bổ sung" / "Đã tiếp nhận" / "Từ chối" / "Hoàn thành" — **spec chưa khai báo enum, xem B6** | Tap → list; type to search; tap option → close + display; truncate "..."; highlight selected (CMR-03). | UC45-51 filter.png |
| 7 | Filter sheet | "Ngày tiếp nhận (từ - đến)" | Date Range Picker | No | — | "Từ ngày" → "Đến ngày" | N/A | DD/MM/YYYY (CMR-12); validation end ≥ start; chỉ start → end=∞; chỉ end → start=∞; from disable < start; inline error "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" (CMR-15). | UC45-51 filter.png |
| 8 | Filter sheet | "Ngày hẹn trả (từ - đến)" | Date Range Picker | No | — | "Từ ngày" → "Đến ngày" | N/A | Cùng quy tắc như #7 (CMR-15). | UC45-51 filter.png |
| 9 | Filter sheet | Nút "X" đóng góc phải trên | Button (Icon) | N/A | — | — | N/A | **⚠️ Spec yêu cầu; wireframe KHÔNG có — xem C3.** Tap → close sheet, không apply (CMR-02). | Spec only |
| 10 | Filter sheet | "Nhập lại" (icon refresh ↻) | Button (Secondary) | N/A | — | — | N/A | Viền outline đỏ, text đỏ; tap → reset toàn bộ field về default; **KHÔNG đóng sheet** (CMR-02). | UC45-51 filter.png |
| 11 | Filter sheet | "Đóng" (icon X) | Button (Secondary) | N/A | — | — | N/A | **⚠️ Wireframe có nút Đóng độc lập; spec KHÔNG khai báo — xem C3.** Tap → close sheet, không apply. | UC45-51 filter.png |
| 12 | Filter sheet | "Tìm" (icon kính lúp) | Button (Primary CTA) | N/A | — | — | N/A | **⚠️ Wireframe label "Tìm"; spec "Áp dụng" — xem C3.** Nền đỏ filled, text trắng; tap → apply filter, close sheet, gọi API list; không kết quả → "Không tìm thấy kết quả." (CMR-14). | UC45-51 filter.png |
| 13 | Filter sheet | Android Back vật lý (background) | OS event | N/A | — | — | N/A | Khi Bottom Sheet đang mở, press Back → quay về **màn hình trước** (không chỉ đóng sheet). | Spec §2.1 |

### D. Màn Danh sách hồ sơ — Tabs trạng thái (Horizontal Scroll)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 14 | Tabs | "Tất cả" | Tab | N/A | **Selected by default** | — | N/A | Tab mặc định khi mở màn; hiển thị toàn bộ hồ sơ. Active state: **spec=text/màu đỏ + underline đỏ; wireframe=pill nền đỏ filled** — xem C5. | UC45_*.png |
| 15 | Tabs | "Chờ tiếp nhận" | Tab | N/A | — | — | N/A | Hồ sơ mới nộp, chưa được xử lý. | UC47_*.png |
| 16 | Tabs | "Yêu cầu bổ sung" | Tab | N/A | — | — | N/A | Hồ sơ cần bổ sung giấy tờ. | UC48-*.png |
| 17 | Tabs | "Đã tiếp nhận" | Tab | N/A | — | — | N/A | Hồ sơ đang xử lý. | UC49_*.png |
| 18 | Tabs | "Từ chối" | Tab | N/A | — | — | N/A | Hồ sơ bị từ chối tiếp nhận. | UC50_*.png |
| 19 | Tabs | "Hoàn thành" | Tab | N/A | — | — | N/A | Hồ sơ đã xử lý xong. | UC51_*.png |
| 20 | Tabs | Tab horizontal scroll behaviour | Container behaviour | N/A | — | — | N/A | Tabs cuộn ngang (5/6 tab visible mỗi lúc — tab cuối bị crop trong UC45). Auto-scroll-into-view khi tap chưa khai báo. | Tất cả ảnh list |

### E. Màn Danh sách hồ sơ — Card hồ sơ (one row per atomic element)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 21 | Card | Mã hồ sơ (e.g. "HS-2026-001") | Label (Bold, đỏ) | N/A | — | — | N/A | Format `[Mã hồ sơ] • [Mã thủ tục]`; đỏ đậm; 1 dòng, truncate "..." | 9 ảnh list |
| 22 | Card | Mã thủ tục (e.g. "TT-DKD-01") | Label | N/A | — | — | N/A | Sau dot separator; cùng dòng với mã hồ sơ. | 9 ảnh list |
| 23 | Card | Badge Trạng thái | Badge (Read-only) | N/A | — | — | "Chờ tiếp nhận" (vàng) / "Yêu cầu bổ sung" (cam) / "Đã tiếp nhận" (xanh) / "Từ chối" (đỏ) / "Hoàn thành" (xanh lá) | Màu sắc theo UI design + CMR-05; read-only (không tap được). | 9 ảnh list |
| 24 | Card | Tên thủ tục | Label (Bold) | N/A | — | — | N/A | Tên thủ tục đăng ký; max 2 dòng, truncate "..." | 9 ảnh list |
| 25 | Card | "Đơn vị: " + Tên cơ quan | Label (Icon Tòa nhà) | N/A | — | — | N/A | Icon tòa nhà (xám) + prefix "Đơn vị: "; wrap, không truncate. | 9 ảnh list |
| 26 | Card | "Người nộp: " + Tên người nộp | Label (Icon Người) | N/A | — | — | N/A | Icon người (xám) + prefix "Người nộp: "; wrap, không truncate. | 9 ảnh list |
| 27 | Card | Badge "Cá nhân" / "Tổ chức" | Badge | N/A | — | — | "Cá nhân" / "Tổ chức" | Inline sau tên người nộp; **màu sắc chưa định nghĩa trong spec**. | 9 ảnh list |
| 28 | Card | "Ngày nộp: " + DD/MM/YYYY | Label (Icon Lịch) | N/A | — | — | N/A | Icon lịch + prefix; DD/MM/YYYY (CMR-12). | 9 ảnh list |
| 29 | Card | "Lý do: " + lý do | Banner (Read-only, conditional) | N/A | — | — | N/A | **Conditional:** chỉ hiển thị khi status ∈ {Từ chối, Yêu cầu bổ sung}. Banner viền cam + icon ⓘ; max 2 dòng, truncate "..." | UC48-*.png, UC50_*.png |
| 30 | Card | Icon Điều hướng ">" góc phải | Icon | N/A | — | — | N/A | Mũi tên xám; tap → màn Chi tiết. | UC45_*.png |
| 31 | Card | Nút "Xem chi tiết" (icon mắt 👁) | Button (Outline) | N/A | — | — | N/A | **⚠️ Có ở UC47/48/49/50/51 (5/6 ảnh tab khác Tất cả); KHÔNG có ở UC45 "Tất cả"; spec KHÔNG khai báo — xem C2.** Behavior chưa rõ (giống tap card?). | UC47/48/49/50/51 |
| 32 | Card | Card container (tappable area) | Container | N/A | — | — | N/A | Tap bất kỳ vùng nào trên card → chuyển sang Chi tiết; CMR-18 debounce double-tap. | 9 ảnh list |

### F. Màn Danh sách hồ sơ — Loading / Empty / Error states

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 33 | State | Full-screen loading overlay | Loading state | N/A | — | — | N/A | First-load màn / đổi tab (CMR-07). | Spec §3.1 |
| 34 | State | Spinner cục bộ (cuối list) | Loading indicator | N/A | — | — | N/A | Lazy load tiếp / refresh (CMR-04, CMR-07). | Spec §3.1 |
| 35 | State | Pull-to-refresh spinner | Loading indicator | N/A | — | — | N/A | Spinner đầu list khi kéo xuống; ẩn khi xong (CMR-13). | Spec §3.1 |
| 36 | State | "Không có dữ liệu." | Empty state | N/A | — | — | N/A | Hiển thị giữa vùng nội dung khi tab không có hồ sơ (CMR-14). | Spec §3.1 |
| 37 | State | "Không tìm thấy kết quả." | Empty state | N/A | — | — | N/A | Hiển thị khi search/filter không match (CMR-14). | Spec §3.1 |
| 38 | State | "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" | Error state | N/A | — | — | N/A | Lỗi mạng / mất kết nối; dữ liệu đã lazy-load giữ nguyên, chỉ lỗi phần chưa load (CMR-07). | Spec §3.1 |
| 39 | State | "Hệ thống đang bận. Vui lòng thử lại sau." | Error toast/message | N/A | — | — | N/A | HTTP 500; giữ màn hình, chỉ hiển thị thông báo (CMR-07). | Spec §3.1 |
| 40 | State | "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại" | Error state | N/A | — | — | N/A | Timeout > 10s (CMR-16); giữ màn, hiển thị nút Thử lại (CMR-07). | Spec §3.1 |
| 41 | State | Toast: "Phiên đăng nhập hết hạn." | Toast | N/A | — | — | N/A | HTTP 401; tự refresh token; nếu refresh token >15d → redirect màn đăng nhập (CMR-07). | Spec §3.1 |
| 42 | State | Inline error filter date range | Inline Error Text | N/A | — | — | N/A | "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" (CMR-15). | Spec §2.1 |

### G. Màn Chi tiết hồ sơ — Header

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 43 | Header detail | Nút Quay lại (←) | Button (Icon) | N/A | — | — | N/A | Tap → quay về Danh sách (restore tab+scroll+search/filter) (CMR-06). | UC46 detail.png |
| 44 | Header detail | "Chi tiết hồ sơ" | Static Label | N/A | "Chi tiết hồ sơ" | — | N/A | Chữ trắng nền đỏ đậm, căn giữa. | UC46 detail.png |
| 45 | Header detail | Badge trạng thái góc phải header *(wireframe)* | Badge | N/A | — | — | (cùng enum status như #23) | **⚠️ Có trong wireframe; spec KHÔNG khai báo — xem C7.** Có thể trùng với DB2 banner badge. | UC46 detail.png |

### H. Màn Chi tiết hồ sơ — Banner chính (Nền đỏ) — Section 2.2.1

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 46 | Banner đỏ | Mã hồ sơ (Size lớn) | Label (Bold) | N/A | — | — | N/A | Wrap text, không truncate; size lớn. | UC46 detail.png |
| 47 | Banner đỏ | Badge Trạng thái | Badge | N/A | — | — | (cùng enum như #23) | Màu sắc theo UI design (CMR-05). | UC46 detail.png |
| 48 | Banner đỏ | "Ngày nộp: DD/MM/YYYY HH:mm" | Label (Icon Lịch) | N/A | — | — | N/A | DD/MM/YYYY HH:mm (CMR-12); null → "-" (CMR-14); wrap. | UC46 detail.png |

### I. Màn Chi tiết hồ sơ — Section 1: Thông tin chung hồ sơ — Section 2.2.2

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 49 | Detail Section 1 | "Tên dịch vụ công" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |
| 50 | Detail Section 1 | "Mã hồ sơ" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-"; **trùng dữ liệu với #46 — xem C8.** | UC46 detail.png |
| 51 | Detail Section 1 | "Đối tượng" | Label (Read-only) | N/A | — | — | "Cá nhân" / "Tổ chức" | Wrap, null → "-"; có thể derive từ user profile login — xem B11. | UC46 detail.png |
| 52 | Detail Section 1 | "Tỉnh/thành" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |
| 53 | Detail Section 1 | "Số bộ hồ sơ" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-"; **format chưa rõ ("1 bộ hồ sơ"?) — xem C10.** | UC46 detail.png |

### J. Màn Chi tiết hồ sơ — Section 2: Thông tin tiếp nhận & trả kết quả — Section 2.2.3

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 54 | Detail Section 2 | "Phương thức tiếp nhận" | Label (Read-only) | N/A | — | — | *(inferred)* "Trực tuyến" / "Trực tiếp" / "Bưu điện" — **enum chưa khai báo, xem B7** | Wrap, null → "-". | UC46 detail.png |
| 55 | Detail Section 2 | "Phương thức giao kết quả" | Label (Read-only) | N/A | — | — | *(cùng B7)* | Wrap, null → "-". | UC46 detail.png |
| 56 | Detail Section 2 | "Đơn vị tiếp nhận" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |
| 57 | Detail Section 2 | "Đơn vị xử lý" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |
| 58 | Detail Section 2 | "Ngày nộp" (Section 2) | Label (Read-only) | N/A | — | — | N/A | DD/MM/YYYY HH:mm; null → "-"; **trùng với #48 banner — xem C8.** | UC46 detail.png |

### K. Màn Chi tiết hồ sơ — Section 3: Thông tin văn bản & pháp lý — Section 2.2.4

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 59 | Detail Section 3 | "Số đến" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-"; **format chưa rõ (ID? text?).** | UC46 detail.png |
| 60 | Detail Section 3 | "Số công văn" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |
| 61 | Detail Section 3 | "Ngày công văn" | Label (Read-only) | N/A | — | — | N/A | DD/MM/YYYY (CMR-12); null → "-". | UC46 detail.png |
| 62 | Detail Section 3 | "Phí hồ sơ" | Label (Read-only) | N/A | — | — | N/A | Format CMR-11 + "VNĐ"; **0 → "0 VNĐ"**; null → "-"; wrap. | UC46 detail.png |

### L. Màn Chi tiết hồ sơ — Section 4: Nội dung chi tiết — Section 2.2.5

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 63 | Detail Section 4 | "Nội dung hồ sơ" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |
| 64 | Detail Section 4 | "Thông tin dự án" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-" (nếu có). | UC46 detail.png |
| 65 | Detail Section 4 | "Lý do" | Label (Read-only, conditional) | N/A | — | — | N/A | **Conditional:** chỉ hiển thị khi status ∈ {Từ chối, Yêu cầu bổ sung}; wrap, null → "-". | UC46 detail.png |
| 66 | Detail Section 4 | "Ghi chú" | Label (Read-only) | N/A | — | — | N/A | Wrap, null → "-". | UC46 detail.png |

### M. Màn Chi tiết hồ sơ — Section 5: Kết quả & tài liệu — Section 2.2.6

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 67 | Detail Section 5 | "File đính kèm" (block label) | Static Label | N/A | — | — | N/A | Title block; đa ngôn ngữ (CMR-17). | UC46 detail.png |
| 68 | Detail Section 5 | File list item (Icon + Tên file + Format) | List item (Tappable) | N/A | — | — | PDF / DOCX / XLSX / JPG / PNG / MP4 / AVI / MOV / DOC / XLS / ZIP / khác | Icon file + tên file; tên dài truncate "..." | UC46 detail.png |
| 69 | Detail Section 5 | Empty state "Không có dữ liệu." | Empty State | N/A | — | — | N/A | Khi không có file (CMR-14). | Spec §2.2.6 |
| 70 | Detail Section 5 | File tap behavior | Behavior rule | N/A | — | — | N/A | PDF/JPG/PNG/MP4/AVI/MOV → mở viewer trực tiếp; DOC/DOCX/XLS/XLSX/ZIP → download; định dạng khác → "Định dạng không hỗ trợ. Vui lòng tải xuống." (CMR-08). | Spec §2.2.6 + CMR-08 |

### N. Màn Chi tiết hồ sơ — Section 6: Tiến độ & thời hạn — Section 2.2.7

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 71 | Detail Section 6 | "Số ngày kiểm tra hợp lệ: [Giá trị]" | Label (Icon đồng hồ, Read-only) | N/A | — | — | N/A | Wrap, null → "-"; **đơn vị/làm tròn chưa rõ — xem B8.** | UC46 detail.png |
| 72 | Detail Section 6 | "Ngày trả lời kiểm tra hợp lệ: DD/MM/YYYY" | Label (Icon đồng hồ, Read-only) | N/A | — | — | N/A | DD/MM/YYYY (CMR-12); null → "-". | UC46 detail.png |
| 73 | Detail Section 6 | "Số ngày giải quyết: [Giá trị]" | Label (Icon đồng hồ, Read-only) | N/A | — | — | N/A | Wrap, null → "-"; **đơn vị chưa rõ.** | UC46 detail.png |
| 74 | Detail Section 6 | "Ngày hẹn trả: DD/MM/YYYY" | Label (Icon đồng hồ, Read-only) | N/A | — | — | N/A | DD/MM/YYYY (CMR-12); null → "-". | UC46 detail.png |

### O. Màn Chi tiết hồ sơ — Section 7: Tiến trình xử lý — Section 2.2.8

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 75 | Detail Section 7 | Timeline các bước xử lý | Timeline (Read-only) | N/A | — | — | N/A | Mỗi bước = (tên bước + DD/MM/YYYY HH:mm); wrap, null → "-"; **data structure / source API / max steps chưa khai báo — xem B5.** | UC46 detail.png |
| 76 | Detail Section 7 | Badge trạng thái timeline | Badge | N/A | — | — | (cùng enum #23) | Badge trạng thái hiện tại (CMR-05); **có thể trùng với #47 banner — xem C9.** | UC46 detail.png |

---

## 5. Object Attributes & Behavior Definition

> 1-to-1 mapping với Section 4 (76 rows → 76 entries). Trivial rows được nhóm lại để gọn.

### Header & Search/Filter (#1-5)

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| #1 Nút Back | Enabled (always) | Tap → pop nav stack; CMR-18 debounce | Quay về màn parent (Sidebar gốc). |
| #2 Title "Quản lý hồ sơ" | Static | N/A | Đa ngôn ngữ (CMR-17). |
| #3 Notification Bell | **⚠️ State/behavior CHƯA khai báo trong spec (C1)** | *(inferred)* Tap → mở UC258/259 Thông báo | *(inferred)* Badge vàng có khi unread > 0; polling/refresh on focus như UC1 — Q1 |
| #4 Ô tìm kiếm | Enabled, empty default | Type → debounce 3s → API search; Clear → reset list | Auto-trim whitespace; max 500 char; nếu empty sau trim → coi như empty (CMR-01 v1.5); state persistence cross-tab+detail. |
| #5 Nút Lọc | Enabled, no indicator default | Tap → mở Bottom Sheet | Active Filter Indicator (chấm xanh lá) khi filter ≠ mặc định (CMR-02 v1.1). |

### Bottom Sheet Bộ lọc (#6-13)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #6 Dropdown Trạng thái | Default "Tất cả trạng thái" *(spec)* / placeholder "Chọn trạng thái" *(wf)* | Tap → list; type to search | Highlight selected; truncate "..." (CMR-03) |
| #7 Date Range "Ngày tiếp nhận" | Empty default | Tap → calendar popup | Validation end ≥ start; chỉ start → end=∞; chỉ end → start=∞; from disable < start (CMR-15) |
| #8 Date Range "Ngày hẹn trả" | Cùng #7 | Cùng #7 | Cùng #7 |
| #9 Nút "X" top-right *(spec only)* | (spec) Enabled | (spec) Tap → close, không apply | **⚠️ Wireframe không có (C3)** |
| #10 Nút "Nhập lại" | Enabled | Tap → reset toàn bộ field về default; KHÔNG đóng sheet | CMR-02 |
| #11 Nút "Đóng" *(wireframe)* | Enabled | Tap → close sheet, không apply | **⚠️ Spec không khai báo (C3)** |
| #12 Nút "Tìm" / "Áp dụng" | Enabled | Tap → apply filter, close sheet, gọi API list; CMR-18 debounce | Nếu không kết quả → "Không tìm thấy kết quả." (CMR-14) |
| #13 Android Back vật lý | (background event) | Press Back khi sheet đang mở | **Quay về màn hình trước** (không chỉ đóng sheet) — UC-local rule §2.1 |

### Tabs trạng thái (#14-20)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #14 Tab "Tất cả" | Default selected | Tap → re-call API status=all; CMR-18 debounce | Giữ search/filter |
| #15-19 5 tab trạng thái khác | Inactive default | Tap → unselect current, select new, re-call API | Single selection |
| #20 Horizontal scroll | Enabled | Swipe ngang | Auto-scroll tab vào view khi tap chưa khai báo |

### Card hồ sơ (#21-32)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #21-28 Mã hồ sơ, Mã thủ tục, Badge trạng thái, Tên thủ tục, Đơn vị, Người nộp, Badge CN/TC, Ngày nộp | Read-only, conditional truncate | N/A | Render từ API list response (sort by ngày nộp giảm dần) |
| #29 Banner "Lý do" | **Conditional:** status ∈ {Từ chối, Yêu cầu bổ sung} → visible; khác → hidden | N/A | Banner viền cam + icon ⓘ; max 2 dòng truncate |
| #30 Icon ">" | Read-only | Tap → Detail; CMR-18 debounce | Cùng behavior #32 |
| #31 Nút "Xem chi tiết" | **⚠️ Conditional (UC47-51) / hidden (UC45); behavior CHƯA khai báo (C2)** | *(inferred)* Tap → Detail | Q2 |
| #32 Card container | Tappable | Tap → Detail; CMR-18 debounce | Toàn vùng card tap-sensitive |

### Loading / Empty / Error states (#33-42)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #33 Full-screen overlay | First-load màn / đổi tab | N/A | Loading spinner toàn màn (CMR-07) |
| #34 Spinner cuối list | Đang lazy load | N/A | Spinner cuối; ẩn khi hết data (CMR-04) |
| #35 Pull-to-refresh spinner | Đang refresh | N/A | Spinner đầu list (CMR-13) |
| #36 "Không có dữ liệu." | Empty list (no data, no filter) | N/A | Giữa vùng nội dung (CMR-14) |
| #37 "Không tìm thấy kết quả." | Search/filter không match | N/A | Giữa vùng nội dung (CMR-14) |
| #38 Lỗi mạng + Thử lại | Network error | Tap Thử lại → re-call | Giữ data đã lazy-load (CMR-07) |
| #39 Lỗi 500 message | HTTP 500 | N/A | Giữ màn (CMR-07) |
| #40 Timeout + Thử lại | > 10s | Tap Thử lại → re-call | CMR-16 + CMR-07 |
| #41 Toast 401 expired | Refresh token > 15d | N/A | Auto redirect UC256 (CMR-07) |
| #42 Inline error date range | end < start | N/A | "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" (CMR-15) |

### Detail Header & Banner (#43-48)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #43 Back detail | Enabled | Tap → quay về Danh sách; CMR-18 debounce | Restore tab+scroll+search/filter (CMR-01) |
| #44 Title "Chi tiết hồ sơ" | Static | N/A | Đa ngôn ngữ |
| #45 Badge top-right header | **⚠️ Spec không khai báo (C7)** | N/A | Q3 — có badge hay không, quan hệ với #47 |
| #46 Mã hồ sơ banner | Read-only | N/A | Size lớn, wrap, không truncate |
| #47 Badge banner | Read-only | N/A | CMR-05 màu theo status |
| #48 Ngày nộp banner | Read-only | N/A | DD/MM/YYYY HH:mm; null → "-" |

### Detail Section 1 — Thông tin chung (#49-53)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #49 Tên dịch vụ công | Read-only | N/A | Wrap, null → "-" |
| #50 Mã hồ sơ (Section 1) | Read-only | N/A | Wrap, null → "-"; **trùng #46 (C8)** |
| #51 Đối tượng | Read-only | N/A | Enum Cá nhân/Tổ chức |
| #52 Tỉnh/thành | Read-only | N/A | Wrap, null → "-" |
| #53 Số bộ hồ sơ | Read-only | N/A | Format chưa rõ (C10) |

### Detail Section 2 — Thông tin tiếp nhận & trả kết quả (#54-58)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #54 Phương thức tiếp nhận | Read-only | N/A | Enum chưa khai báo (B7) |
| #55 Phương thức giao kết quả | Read-only | N/A | Cùng B7 |
| #56 Đơn vị tiếp nhận | Read-only | N/A | Wrap, null → "-" |
| #57 Đơn vị xử lý | Read-only | N/A | Wrap, null → "-" |
| #58 Ngày nộp (Section 2) | Read-only | N/A | **Trùng #48 (C8)** |

### Detail Section 3 — Văn bản & pháp lý (#59-62)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #59 Số đến | Read-only | N/A | Format chưa rõ (ID? text?) |
| #60 Số công văn | Read-only | N/A | Wrap |
| #61 Ngày công văn | Read-only | N/A | DD/MM/YYYY |
| #62 Phí hồ sơ | Read-only | N/A | CMR-11 + "VNĐ"; 0 → "0 VNĐ"; null → "-" |

### Detail Section 4 — Nội dung chi tiết (#63-66)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #63 Nội dung hồ sơ | Read-only | N/A | Wrap, null → "-" |
| #64 Thông tin dự án | Read-only | N/A | Wrap, null → "-" |
| #65 Lý do | **Conditional:** status ∈ {Từ chối, Yêu cầu bổ sung} | N/A | Hiển thị/ẩn theo status |
| #66 Ghi chú | Read-only | N/A | Wrap, null → "-" |

### Detail Section 5 — Kết quả & tài liệu (#67-70)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #67 Label "File đính kèm" | Static | N/A | Đa ngôn ngữ |
| #68 File list items | Tappable | Tap → mở viewer/download | CMR-08 routing theo extension |
| #69 Empty state | Empty list | N/A | "Không có dữ liệu." (CMR-14) |
| #70 File tap behavior | — | PDF/JPG/PNG/MP4/AVI/MOV → mở; DOC/XLS/ZIP → download; khác → thông báo không hỗ trợ | CMR-08 |

### Detail Section 6 — Tiến độ & thời hạn (#71-74)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #71 Số ngày kiểm tra hợp lệ | Read-only | N/A | Icon đồng hồ + label; null → "-"; đơn vị/làm tròn chưa rõ (B8) |
| #72 Ngày trả lời kiểm tra hợp lệ | Read-only | N/A | DD/MM/YYYY; null → "-" |
| #73 Số ngày giải quyết | Read-only | N/A | Cùng B8 |
| #74 Ngày hẹn trả | Read-only | N/A | DD/MM/YYYY; null → "-" |

### Detail Section 7 — Tiến trình xử lý (#75-76)

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| #75 Timeline | Read-only | N/A | Mỗi bước = tên + ngày giờ; null → "-"; **data structure CHƯA khai báo (B5)** |
| #76 Badge timeline | Read-only | N/A | Trạng thái hiện tại (CMR-05); **có thể trùng #47 (C9)** |

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: View List (Tải danh sách hồ sơ)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | NĐT | Sidebar → "Quản lý hồ sơ" | Mở màn; default tab = "Tất cả"; full-screen loading overlay (CMR-07) | N/A | Network: "Không thể kết nối..." + Thử lại (CMR-07) |
| 2 | System | Gọi API list (status=all, page=1, size=20, sort=ngàyNộp desc) | Render 20 cards; ẩn overlay; spinner cuối list sẵn cho lazy load | API 500: "Hệ thống đang bận. Vui lòng thử lại sau." | Timeout 10s: "Yêu cầu đã hết thời gian chờ..." + Thử lại (CMR-16) |
| 3 | NĐT | Cuộn xuống cuối list | Auto-trigger lazy load page 2 (CMR-04) | Hết data → ẩn spinner, không call API nữa | Lazy load fail: auto retry 3× (~2s interval); sau 3 fail → dừng + lỗi cục bộ + user pull-to-refresh (CMR-04) |
| 4 | NĐT | Kéo xuống đầu list (pull-to-refresh) | Spinner đầu list; reload page=1; cập nhật toàn bộ list (CMR-13) | Refresh fail: giữ data cũ + lỗi (CMR-07) | Cùng error flow trên |
| 5 | NĐT | Tap tab khác | Re-call API status=`tab.id`; full-screen loading overlay; reset list về page=1; giữ search/filter | Empty status: "Không có dữ liệu." (CMR-14) | Cùng error flow |
| 6 | NĐT | Tap card hồ sơ | CMR-18 debounce → navigate sang Detail UC46; lưu state list (tab + scroll + search/filter) | Tap nhanh 2 lần → chỉ 1 navigate | Card dữ liệu lỗi → vẫn navigate, Detail xử lý partial data |
| 7 | NĐT | Back từ Detail | Restore list state (tab + scroll + search/filter) | N/A | N/A |
| 8 | NĐT | Tap Hamburger/Footer chuyển sang màn khác | Reset search/filter về default (CMR-01) | N/A | N/A |
| 9 | System | HTTP 401 từ bất kỳ API call | Auto refresh token; nếu OK → retry call; nếu refresh fail (>15d) → toast "Phiên đăng nhập hết hạn." + redirect UC256 (CMR-07) | Refresh thành công → user không thấy gì | Refresh fail → relogin |

**B. Business Rules & Validations**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Ô tìm kiếm (search) | No | Free text, debounce 3s, gần đúng, auto-trim, max 500 char (CMR-01) | 0/500 | N/A (search no-result → "Không tìm thấy kết quả." CMR-14) |
| Tab selection | No | Single-select; default "Tất cả" | 1/1 | N/A (empty tab → "Không có dữ liệu." CMR-14) |
| Pagination | System | Lazy load 20/page; sort ngày nộp desc (CMR-04) | 20/page | N/A (network fail → CMR-07 messages) |

**C. UI/UX Feedback**

- **Loading States:** First-load = full-screen overlay (CMR-07); subsequent (lazy load, refresh) = spinner cục bộ; pull-to-refresh = spinner đầu list (CMR-13).
- **Toast Messages:** *"Phiên đăng nhập hết hạn."* (HTTP 401, refresh token expired >15d, sau đó redirect UC256).
- **Error Messages (verbatim, từ CMR-07):**
  - Lỗi mạng: *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút "Thử lại"
  - HTTP 500: *"Hệ thống đang bận. Vui lòng thử lại sau."*
  - Timeout 10s: *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút "Thử lại"
- **Empty States (verbatim, từ CMR-14):**
  - Tab/list rỗng: *"Không có dữ liệu."*
  - Search/filter no-result: *"Không tìm thấy kết quả."*

---

### 6.2 Function: Search

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | NĐT | Nhập keyword vào ô tìm kiếm | Sau 3s debounce → gọi API search (CMR-01) | Auto-trim whitespace; empty sau trim → reset về list mặc định (CMR-01 v1.3) | Mạng/500/timeout → CMR-07 messages |
| 2 | System | Trả kết quả search | Render list mới; giữ tab + filter hiện tại | Không kết quả → "Không tìm thấy kết quả." (CMR-14) | — |
| 3 | NĐT | Đổi tab khi đang search | Re-call API tab mới + giữ keyword (per UC §2.1) **HOẶC** override tab về "Tất cả" (per CMR-01 v1.5) | **⚠️ Behavior mâu thuẫn — xem C6** | — |
| 4 | NĐT | Tap card → Detail → Back | Giữ keyword search + tab + scroll (CMR-01 state persistence) | — | — |
| 5 | NĐT | Tap Sidebar/Footer chuyển màn khác | Reset search về empty (CMR-01) | — | — |
| 6 | NĐT | Xoá hết keyword | Reset về list mặc định của tab hiện tại | — | — |

**B. Business Rules & Validations**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Search keyword | No | Free text, gần đúng, auto-trim, max 500 char | 0/500 | Không có inline error; no-result → "Không tìm thấy kết quả." |

**C. UI/UX Feedback**

- Debounce 3 giây (CMR-01).
- Khi 500 char nhập → không cho phép nhập thêm (CMR-01).
- Empty state: "Không tìm thấy kết quả." (CMR-14).

---

### 6.3 Function: Filter (Bottom Sheet)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | NĐT | Tap icon filter | Mở Bottom Sheet; default values: Trạng thái=Tất cả, Ngày tiếp nhận=empty, Ngày hẹn trả=empty | N/A | N/A |
| 2 | NĐT | Chọn Trạng thái dropdown | Hiển thị list searchable; tap option → close dropdown | Type to filter dropdown; highlight selected (CMR-03) | N/A |
| 3 | NĐT | Chọn Ngày tiếp nhận / Ngày hẹn trả | Calendar popup; chọn from/to; auto-validate CMR-15 | Chỉ from → end=∞; chỉ to → from=∞ | Date invalid → inline error "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" |
| 4 | NĐT | Tap "Tìm" / "Áp dụng" | Close sheet, gọi API list với filter, reload | Không kết quả → "Không tìm thấy kết quả." (CMR-14) | Network/500/timeout → CMR-07 |
| 5 | NĐT | Tap "Nhập lại" | Reset toàn bộ về default; KHÔNG đóng sheet | N/A | N/A |
| 6 | NĐT | Tap "X" / "Đóng" / vùng ngoài | Close sheet; KHÔNG apply (CMR-02) | — | — |
| 7 | NĐT | Press Android Back | **Quay về màn hình trước** (KHÔNG chỉ đóng sheet) | — | — |
| 8 | System | Filter active (giá trị ≠ default) | Hiển thị Active Filter Indicator (chấm xanh lá) trên icon filter (CMR-02 v1.1) | Khi reset về default → ẩn indicator | — |

**B. Business Rules & Validations**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Trạng thái dropdown | No | Single-select; enum *(chưa khai báo — B6)* | 1/1 | N/A |
| Ngày tiếp nhận (date range) | No | DD/MM/YYYY; end ≥ start (CMR-15) | — | "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" (CMR-15) |
| Ngày hẹn trả (date range) | No | Cùng trên | — | Cùng trên |

**C. UI/UX Feedback**

- Filter Active Indicator chấm xanh lá (CMR-02 v1.1).
- Bottom Sheet đóng/mở smoothly.

---

### 6.4 Function: View Detail (UC46)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | NĐT | Tap card hồ sơ trên list | Navigate to Detail; full-screen loading overlay (CMR-07) | N/A | N/A |
| 2 | System | Gọi multiple endpoints (thông tin chung, file đính kèm, timeline) | Render từng section khi data sẵn; lazy hide overlay | Section nào fail → hiển thị error cục bộ riêng section đó (Partial Data — CMR-07); sections khác render bình thường | Toàn bộ fail → màn chỉ có header + error message (Q5) |
| 3 | NĐT | Đọc nội dung 7 sections | All read-only; wrap text; "Lý do" conditional theo status | "Thông tin dự án" empty → "-" (CMR-14) | — |
| 4 | NĐT | Tap file trong Section 5 | PDF/JPG/PNG/MP4/AVI/MOV → mở viewer trực tiếp; DOC/DOCX/XLS/XLSX/ZIP → download (CMR-08) | Định dạng khác → "Định dạng không hỗ trợ. Vui lòng tải xuống." (CMR-08) | File path 404 / network fail → CMR-07 |
| 5 | NĐT | Tap Back | Quay về list; restore tab + scroll + search/filter | CMR-18 debounce | — |
| 6 | NĐT | Pull-to-refresh trên Detail | **⚠️ Spec không khai báo — Q5/B9** | — | — |

**B. Business Rules & Validations**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Mọi field detail | No (read-only) | null → "-" (CMR-14) | — | N/A |
| Phí hồ sơ | No | Số + ",", 0 → "0 VNĐ", null → "-" (CMR-11+CMR-14) | — | — |
| Ngày *(các fields)* | No | DD/MM/YYYY hoặc DD/MM/YYYY HH:mm (CMR-12) | — | — |
| File extension | System | Routing theo CMR-08 | — | "Định dạng không hỗ trợ. Vui lòng tải xuống." (CMR-08) |

**C. UI/UX Feedback**

- Loading states: full-screen overlay first-load; spinner cục bộ refresh.
- Empty states: null field → "-"; empty file list → "Không có dữ liệu.".
- Partial Data: error cục bộ ở từng section (CMR-07).
- File download: dùng OS download manager.

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis (Cross-function influence) | Data Consistency Verification |
|---------------------------|--------------------------------------------|-------------------------------|
| Tap card hồ sơ → Detail | List state (tab + scroll + search/filter) lưu trên client; Detail gọi multiple API endpoints; partial data tolerance | Khi Back về list, state restore; nếu data list đã thay đổi server-side (e.g., hồ sơ chuyển trạng thái) — chưa khai báo có re-fetch không (Q6) |
| Đổi tab trên list | Re-call API status mới; giữ search/filter | Tab + search/filter combination logic chưa rõ thứ tự ưu tiên (C6) |
| Áp dụng filter | Re-call API list với param mới; Filter Active Indicator on | Khi quay lại từ Detail, filter giữ nguyên → cần re-call API không (Q7)? |
| Tap file đính kèm | OS routing (in-app viewer / external app / download manager) (CMR-08) | Sau khi user xem xong, quay về Detail vẫn nguyên state? |
| HTTP 401 (token expired) | Auto refresh token → nếu OK → retry call; nếu refresh >15d → relogin UC256 (CMR-07) | Sau relogin, có quay về UC45-51 hay reset về Trang chủ (UC1)? — Q8 |
| Notification Bell tap *(inferred)* | Chuyển sang UC258/259 Thông báo | Spec không khai báo (C1) |
| Push notification deep link *(inferred)* | Có thể mở thẳng vào Detail UC46 cho 1 hồ sơ cụ thể | Spec không khai báo (B13) |
| Đổi ngôn ngữ trong app | Text cứng dịch sang ngôn ngữ mới; data API (mã, tên thủ tục, status) giữ nguyên (CMR-17) | Cài đặt lưu server profile (CMR-17) |
| Logout → Login lại | UC ra khỏi nav stack; reset toàn bộ state | Spec không khai báo (B12) — giả sử reset |

---

## 8. Acceptance Criteria

> **Source AC (Spec §3.3, 5 bullets):**
> - AC1: Danh sách hiển thị đúng 6 tab trạng thái và khớp dữ liệu thực tế.
> - AC2: Card hồ sơ hiển thị đầy đủ các icon và Badge (Cá nhân/Tổ chức) đúng màu sắc thiết kế.
> - AC3: Toàn bộ card hồ sơ có thể tap để vào màn hình chi tiết.
> - AC4: Màn hình chi tiết hiển thị đầy đủ 7 section thông tin theo thiết kế.
> - AC5: Các file đính kèm mở được viewer in-app hoặc ứng dụng hỗ trợ.
>
> Source AC quá tổng quát, không theo Given/When/Then. Dưới đây là AC mở rộng được suy luận từ §2 + §3 + CMR + wireframes.

| AC # | Scenario | Given *(precondition)* | When *(user action)* | Then *(expected result)* |
|------|----------|------------------------|----------------------|--------------------------|
| AC-01 | List load lần đầu | NĐT đã đăng nhập, có ≥ 1 hồ sơ | Mở Sidebar → "Quản lý hồ sơ" | Full-screen loading overlay (CMR-07); sau đó tab "Tất cả" được chọn; 20 cards đầu được render, sort ngày nộp desc; spinner cuối list ẩn nếu < 20 records |
| AC-02 | List load — empty | NĐT đã đăng nhập, không có hồ sơ | Mở màn UC45-51 | Hiển thị "Không có dữ liệu." (CMR-14) giữa vùng nội dung |
| AC-03 | List load — network fail | NĐT đã đăng nhập, mất kết nối | Mở màn UC45-51 | Hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" (CMR-07) |
| AC-04 | List load — 401 expired | NĐT có session, refresh token > 15d | Gọi API list | Toast "Phiên đăng nhập hết hạn."; redirect UC256 (CMR-07) |
| AC-05 | Lazy load page 2 | List đang ở page 1, có > 20 records | Cuộn đến cuối list | Spinner cục bộ cuối list; gọi API page 2; append 20 cards (CMR-04) |
| AC-06 | Lazy load — retry success | Page N fail lần 1 | System auto retry | Sau 2s retry lần 1; nếu OK → load page N (CMR-04) |
| AC-07 | Lazy load — retry exhausted | Page N fail 3 lần | System retry hết | Dừng auto retry; lỗi cục bộ cuối list; user pull-to-refresh để retry (CMR-04) |
| AC-08 | Pull-to-refresh | List đang hiển thị | Kéo xuống từ đầu list | Spinner đầu list; reload page=1; spinner ẩn khi xong (CMR-13) |
| AC-09 | Tab switch | List đang ở tab "Tất cả" | Tap tab "Chờ tiếp nhận" | Re-call API status=cho_tiep_nhan; full-screen overlay; render list tab mới; tab "Tất cả" unselected, tab "Chờ tiếp nhận" selected (style theo C5 cần resolve) |
| AC-10 | Tab switch giữ search/filter | Search keyword "HS-2026" đã nhập, tab "Tất cả" | Tap tab "Chờ tiếp nhận" | Behavior 1 (per UC §2.1): API call status=cho_tiep_nhan + keyword=HS-2026; **HOẶC** Behavior 2 (per CMR-01 v1.5): keyword giữ nhưng kết quả hiển thị trên tab "Tất cả" — **xem C6** |
| AC-11 | Tab switch — empty | Tap tab "Từ chối" | Không có hồ sơ trạng thái Từ chối | "Không có dữ liệu." (CMR-14) |
| AC-12 | Search debounce | Ô tìm kiếm empty | Nhập "Đăng ký" | Sau 3s debounce → gọi API search; cards match render (CMR-01) |
| AC-13 | Search no-result | Search "ABCXYZ12345" | Sau debounce | "Không tìm thấy kết quả." (CMR-14) |
| AC-14 | Search whitespace | Nhập " " (chỉ space) | Sau debounce | Auto-trim → empty → reset về list mặc định, không gọi API (CMR-01) |
| AC-15 | Search max 500 char | Đã nhập 500 char | Cố nhập ký tự 501 | Không cho phép nhập thêm (CMR-01) |
| AC-16 | Clear search | Search đang có keyword "HS-2026" | Xoá hết keyword | List reset về mặc định của tab hiện tại |
| AC-17 | Filter — open | List đang hiển thị | Tap icon filter | Bottom Sheet mở; Trạng thái = "Tất cả trạng thái" (per spec) / "Chọn trạng thái" (per wf — C4); date ranges empty |
| AC-18 | Filter — apply | Filter sheet mở | Chọn Trạng thái "Hoàn thành", Ngày tiếp nhận 01/01/2026-31/03/2026, tap "Tìm" / "Áp dụng" | Sheet đóng; API call với 3 params; list reload; Active Filter Indicator (chấm xanh lá) hiển thị trên icon filter (CMR-02) |
| AC-19 | Filter — date invalid | Filter sheet mở, chọn Từ ngày 31/03/2026 | Chọn Đến ngày 01/01/2026 | Inline error "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu"; nút "Tìm" disabled hoặc validation fail khi tap (CMR-15) |
| AC-20 | Filter — date 1 sided | Filter sheet mở, chỉ chọn Từ ngày 01/01/2026 | Tap "Tìm" | Filter từ 01/01/2026 đến hiện tại; sheet đóng; list reload (CMR-15) |
| AC-21 | Filter — reset | Filter đã apply | Mở sheet, tap "Nhập lại" | Reset toàn bộ field về default; Sheet KHÔNG đóng (CMR-02) |
| AC-22 | Filter — close không apply | Filter sheet đã sửa | Tap "X" / "Đóng" / vùng ngoài | Sheet đóng; list KHÔNG thay đổi; filter values bị huỷ (CMR-02) |
| AC-23 | Filter — Android Back | Filter sheet mở | Press Back vật lý | Quay về màn hình trước (KHÔNG chỉ đóng sheet) — per UC §2.1 |
| AC-24 | Filter — no-result | Apply filter | Không có hồ sơ match | "Không tìm thấy kết quả." (CMR-14) |
| AC-25 | Tap card → Detail | List hiển thị card "HS-2026-001" | Tap vào card | Navigate to Detail UC46; full-screen overlay; CMR-18 debounce (double tap chỉ 1 navigate) |
| AC-26 | Card "Lý do" hiển thị có điều kiện | Card status = "Từ chối" hoặc "Yêu cầu bổ sung" | Render card | Banner "Lý do: ..." viền cam hiển thị; max 2 dòng truncate (per spec) |
| AC-27 | Card "Lý do" không hiển thị | Card status = "Chờ tiếp nhận"/"Đã tiếp nhận"/"Hoàn thành" | Render card | Banner "Lý do" không hiển thị |
| AC-28 | Detail render | Navigate to Detail | Data thành công | Banner đỏ (Mã + Badge + Ngày nộp); 7 sections đầy đủ; "Lý do" Section 4 ẩn nếu status ∉ {Từ chối, Yêu cầu bổ sung} |
| AC-29 | Detail Partial Data | Detail mở, 1 section endpoint fail | Render | Section đó hiển thị error cục bộ (CMR-07); sections khác render bình thường (per spec §3.1) |
| AC-30 | Detail file viewer PDF | Detail Section 5 có file `report.pdf` | Tap file | Mở viewer trong device browser (CMR-08) |
| AC-31 | Detail file download DOCX | Detail Section 5 có file `report.docx` | Tap file | Auto download xuống device (CMR-08) |
| AC-32 | Detail file format không hỗ trợ | File extension lạ (e.g., `.xyz`) | Tap file | Thông báo "Định dạng không hỗ trợ. Vui lòng tải xuống." (CMR-08) |
| AC-33 | Detail empty file list | Hồ sơ không có file đính kèm | Render Section 5 | "Không có dữ liệu." (CMR-14) |
| AC-34 | Detail null field display | Hồ sơ field "Thông tin dự án" null | Render Section 4 | Hiển thị "-" (CMR-14) |
| AC-35 | Detail Phí hồ sơ 0 | Hồ sơ phí = 0 | Render Section 3 | Hiển thị "0 VNĐ" (per spec §2.2.4) |
| AC-36 | Detail Phí hồ sơ null | Hồ sơ phí = null | Render Section 3 | Hiển thị "-" (CMR-14) |
| AC-37 | Back từ Detail giữ state | Đang ở Detail; list đã filter+scroll | Tap Back | Quay về list; tab + scroll + search/filter giữ nguyên (CMR-01) |
| AC-38 | Sidebar/Footer chuyển màn reset | Đang ở UC45-51 với search "HS-2026" | Tap Sidebar → UC khác | UC45-51 reset search/filter; sau này quay lại UC45-51 → trở về default state (CMR-01) |
| AC-39 | Đổi ngôn ngữ | App đang VI, đang ở UC45-51 | Đổi sang EN | Text cứng (header, tab, label, button, message) dịch EN; data API (mã, tên thủ tục, status) giữ nguyên (CMR-17) |
| AC-40 | Network restored mid-lazy-load | List ở page 2, mất mạng khi load page 3 | Mạng khôi phục, pull-to-refresh | Reload từ đầu; pages 1+2+3+... reload (CMR-13); dữ liệu đã load trước đó vẫn hiển thị trong khi network mất (per spec §3.1) |
| AC-41 | Timeout API list | API list > 10s | System | "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + Thử lại (CMR-16 + CMR-07) |
| AC-42 | HTTP 500 list | API list trả 500 | System | "Hệ thống đang bận. Vui lòng thử lại sau." (CMR-07) |
| AC-43 | HTTP 401 — refresh OK | List, token expired nhưng refresh token < 15d | Gọi API | Auto refresh token, retry call thành công, user không thấy gì |
| AC-44 | HTTP 401 — refresh fail | Refresh token > 15d | Gọi API | Toast "Phiên đăng nhập hết hạn." + redirect UC256 (CMR-07) |

---

## 9. Non-functional Requirements

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance — Pagination | Lazy load 20 records/lần (CMR-04) | CMR-04 |
| Performance — Timeout | API call tối đa 10s; quá → coi như timeout (CMR-16) | CMR-16 |
| Performance — Retry | Lazy load fail → auto retry 3 lần (interval 2s) (CMR-04) | CMR-04 |
| Performance — Response time target ⚠️ | *(không có target — Q-005 trong project-context)* | Missing |
| Security — Session | Refresh token; > 15 ngày → relogin (CMR-07) | CMR-07 |
| Security — Rate limit ⚠️ | *(không khai báo)* | Missing |
| Security — CSRF / Auth NFR ⚠️ | *(không khai báo)* | Missing |
| Compatibility — OS version ⚠️ | *(không có matrix iOS/Android)* | Missing — Q-007 |
| Compatibility — Device size ⚠️ | *(không khai báo)* | Missing |
| Accessibility (a11y) ⚠️ | *(không đề cập screen reader, font scaling)* | Missing |
| Internationalization | 5 ngôn ngữ (VI/EN/ZH/JA/KO), text cứng (CMR-17) | CMR-17 |
| Logging / Telemetry ⚠️ | *(không đề cập)* | Missing |
| Offline behavior ⚠️ | *(không đề cập)* | Missing |
| Notification — Push platform | FCM (Android) / APNs (iOS) — *(inferred từ project-context KT-16, KT-17)* | project-context §5 |
| File viewer — Constraints | PDF/JPG/PNG/MP4/AVI/MOV xem trực tiếp; DOC/DOCX/XLS/XLSX/ZIP download; khác → thông báo (CMR-08) | CMR-08 |
| Date/Time format | DD/MM/YYYY hoặc DD/MM/YYYY HH:mm (24h); GMT+7 (CMR-12) | CMR-12 |
| Number format | "," cho hàng nghìn; "." cho thập phân (CMR-11) | CMR-11 |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions

Xem [Unified Gap & Question Report] dưới Audit Summary.

### 10.2 Dependencies

- **UC256 — Đăng nhập VNeID/Mobile**: prerequisite (NĐT phải đăng nhập trước).
- **UC258/UC259 — Thông báo hệ thống**: liên quan đến Notification Bell trong header (C1 — chưa khai báo).
- **UC249-254 — Quản lý tài khoản**: user profile xác định "Đối tượng" (Cá nhân/Tổ chức).
- **CMR_Mobile.md (v1.5)**: 14 CMR được tham chiếu (01, 02, 03, 04, 05, 06, 07, 08, 11, 12, 13, 14, 15, 16, 17, 18).
- **Backend API**:
  - GET /ho-so (list with pagination, status filter, search, date range filter)
  - GET /ho-so/{id} (chi tiết)
  - GET /ho-so/{id}/files (file list)
  - GET /ho-so/{id}/timeline (timeline)
  - Auth refresh token endpoint
- **OS routing — CMR-08**: device browser, download manager.
- **VNeID / Auth provider**: phục vụ refresh token expired flow.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-13 | qc-uc-read (run-011) | Initial audit cho UC45-51 v2.4; verdict Conditionally Ready 70.8/100; 10 conflicts + 13 open questions identified. |

---

## Audit Summary

### Audit Summary Table

| # | Knowledge Area | Max Pts | Score | Status |
|---|----------------|---------|-------|--------|
| 1 | Feature Identity | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 13/15 | ✅ Complete |
| 6 | Object Attributes & Behavior Definition | 20 | 16/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 15/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 20 | 14/20 | ⚡ Partial |
| 9 | Acceptance Criteria | 20 | 10/20 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 2/5 | ⚡ Partial |
| **Total** | | **130** | **92/130** | **70.8/100** |

### Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | Wireframe 9/9 ảnh list có Notification Bell (🔔 + badge vàng) ở góc phải header. Spec §2.1 "Khung Header" chỉ có 2 items: Nút Back + Title. | **C1** — Notification Bell có thuộc UC45-51 không hay là global header (như UC1)? Nếu thuộc, định nghĩa: (a) Tap → màn nào (UC258/259)? (b) Threshold badge (count unread)? (c) Refresh policy (polling, on-focus)? | Bell visible trong mọi ảnh list của UC này — tester không biết có cần test hay không, behavior không xác định. | Open |
| Q2 | High | Wireframe UC47/48/49/50/51 (5 ảnh) có Button "Xem chi tiết" (icon mắt 👁) trong mỗi card. UC45 "Tất cả" KHÔNG có button. Spec §2.1 Card chỉ định Icon ">" (item #8). | **C2** — Tại sao UC45 không có button "Xem chi tiết"? Behavior nút có giống tap card / icon ">" không (CMR-18 debounce kết hợp như thế nào)? Nếu chỉ là duplicate action, có cần button không? | Tester không biết flow Detail navigation từ UC45 vs các tab khác có khác nhau không; design intent unclear. | Open |
| Q3 | High | Wireframe Bottom Sheet filter: 3 buttons "Nhập lại" + "Đóng" + "Tìm" trong 1 row. Spec §2.1 Modal Bộ lọc: 3 items khác — "Nút X đóng" (top-right) + "Nút Nhập lại" (secondary) + "Nút Áp dụng" (primary). | **C3** — Wireframe + Spec mâu thuẫn về labels & layout. Chốt: (a) Có nút X góc phải trên cùng không? (b) Tên Primary button = "Tìm" hay "Áp dụng"? (c) Có nút "Đóng" độc lập trong row buttons không? | Tester không biết labels chính xác để verify. | Open |
| Q4 | High | Spec §1: "Cá nhân/Tổ chức đã đăng nhập chỉ xem được hồ sơ của chính mình nộp." | **B4** — Permission edge cases: (a) DN có nhiều user (employee) — mỗi user xem hồ sơ DN nói chung hay chỉ hồ sơ user đó stand-in nộp? (b) Admin/Cán bộ Cục có role nào không (out of scope)? (c) Khách/Anonymous bị chặn ở route guard hay UI? | Tester không biết test isolation data permission như thế nào (cùng DN, khác user; admin role). | Open |
| Q5 | High | UC §2.1 v2.4 (line 271): "Giữ nguyên search/filter khi chuyển tab nội bộ". CMR-01 v1.5: "Search áp dụng toàn bộ tab, kết quả tìm kiếm hiển thị trên tab 'Tất cả' bất kể tab nào đang được chọn." | **C6** — Hai behaviors mâu thuẫn: (Behavior A — UC) Search keyword AND Tab filter combined → kết quả hiển thị trên tab hiện tại. (Behavior B — CMR-01) Search override Tab → kết quả luôn về tab "Tất cả". Chốt 1 behavior, cập nhật doc còn lại. | Tester không biết test scenario nào đúng; ảnh hưởng UX core. | Open |
| Q6 | High | Spec §3.3 AC1-AC5 (5 bullets ngắn). | **B2** — AC quá thiếu: không phủ error handling, lazy load retry, partial data, state persistence, 401 redirect, empty state phân biệt, đa ngôn ngữ, Android back vật lý. Bổ sung AC formal Given/When/Then cho mỗi flow chính (~30-40 ACs). | Tester không có basis verify pass/fail cho ~80% scenarios. Đã generate 44 ACs trong báo cáo này nhưng cần BA xác nhận. | Open |
| Q7 | Medium | Wireframe UC46 detail có badge "Chờ tiếp nhận" gần góc phải header. Spec §2.2 "Khung Header detail" chỉ có Back + Title. Spec §2.2.1 Banner có Badge trạng thái. | **C7** — Badge ở header detail có phải là duplicate của badge trong Banner không? Nếu khác, định nghĩa khác biệt (e.g., header = trạng thái real-time, banner = trạng thái khi mở)? | Tester thấy 2 vị trí có badge và phải xác định behavior từng vị trí. | Open |
| Q8 | Medium | Wireframe filter: Trạng thái dropdown placeholder "Chọn trạng thái". Spec §2.1 BF1: default value "Tất cả trạng thái". | **C4** — Chốt: khi user mở filter lần đầu, dropdown hiển thị "Tất cả trạng thái" (selected) hay "Chọn trạng thái" (placeholder, chưa có giá trị)? | Tester verify default state không biết expected. | Open |
| Q9 | Medium | Spec §2.1 Tab "Quy tắc hiển thị": "Text/màu đỏ + underline đỏ khi được chọn". Wireframe Tab List + 6 ảnh: pill nền đỏ filled (text trắng). | **C5** — Active tab style: underline (per spec) hay pill filled (per wireframe)? Chốt 1 style. | Tester verify UI active state không biết expected style. | Open |
| Q10 | Medium | Spec §2.2.7 Section 6: "Số ngày kiểm tra hợp lệ: [Giá trị]" / "Số ngày giải quyết: [Giá trị]". | **B8** — Đơn vị "ngày"? Làm tròn integer hay decimal? Khi đang trong quy trình: giá trị = 0 hay null hay current day count? | Tester thiếu rule để verify display + edge cases. | Open |
| Q11 | Medium | Spec §2.2.8 Section 7: "Hiển thị timeline các bước xử lý (VD: Đã nộp hồ sơ (Ngày giờ), Đang xử lý...)". | **B5** — Data structure cụ thể: (a) Steps = enum cố định hay dynamic theo API? (b) Max steps? (c) Sort order (chronological asc/desc)? (d) Steps đã xảy ra vs upcoming hiển thị khác nhau? (e) Empty timeline → "-" thế nào? | Tester không biết test data setup cho timeline edge cases. | Open |
| Q12 | Medium | Spec §2.1 Tab list: 6 trạng thái (Tất cả + 5 trạng thái khác). Spec §2.1 Filter BF1: "Danh sách trạng thái lấy từ danh mục hệ thống". | **B6** — Filter dropdown enum chính xác là gì? Có 6 hay 5 giá trị (có "Tất cả trạng thái" trong dropdown không)? Order theo gì (alphabetical, workflow)? | Tester verify filter options không biết enum. | Open |
| Q13 | Medium | Spec §2.2.3 Section 2: "Phương thức tiếp nhận" / "Phương thức giao kết quả". Wireframe hiển thị "Trực tuyến". | **B7** — Enum: chỉ có "Trực tuyến" hay còn "Trực tiếp" / "Bưu điện" / "Khác"? Behavior khác nhau theo phương thức? | Tester thiếu enum để test các case. | Open |
| Q14 | Medium | Spec §3.1: pull-to-refresh, lazy load chỉ áp dụng cho list. | **B9** — Màn Detail có hỗ trợ pull-to-refresh không? Nếu data hồ sơ thay đổi server-side (e.g., chuyển trạng thái Chờ tiếp nhận → Đã tiếp nhận khi user đang ở Detail), behavior thế nào? | Tester thiếu rule test data freshness on Detail. | Open |
| Q15 | Medium | Spec §2.2.6 Section 5: "Danh sách file đính kèm". | **B10** — Lazy load nếu > N files? Max N? Sort theo gì (tên file, ngày upload, format)? | Tester thiếu rule test với nhiều file. | Open |
| Q16 | Medium | Spec §2.1 Card item 1: format `[Mã hồ sơ] • [Mã thủ tục]`. Spec §2.2 Banner DB1: "Mã hồ sơ (Size lớn)". | **C8** — "Ngày nộp" hiển thị 2 lần trên Detail (DB3 banner + D2.5 section 2). "Mã hồ sơ" hiển thị 2 lần (DB1 banner + D1.2 section 1). Có cần duplicate không? Mục đích design? | Tester verify duplicate display không biết intentional hay bug. | Open |
| Q17 | Medium | Spec §2.2.1 Banner DB2: Badge trạng thái. Spec §2.2.8 Section 7 D7.2: Badge trạng thái timeline. | **C9** — Badge ở Banner và badge ở Timeline có cùng giá trị không? Nếu khác — định nghĩa khác biệt (e.g., badge banner = trạng thái tổng, badge timeline = trạng thái bước cuối). | Tester verify 2 badges không biết phải so sánh giá trị nào. | Open |
| Q18 | Medium | Wireframe Detail Section 1 hiển thị "1 bộ hồ sơ". Spec §2.2.2 D1.5: "Hiển thị số bộ hồ sơ". | **C10** — Format chính xác: số nguyên + đơn vị " bộ hồ sơ"? Số float? Khi N=0 → "0 bộ hồ sơ" hay "-"? | Tester thiếu rule display. | Open |
| Q19 | Medium | Spec §1 + §3.1: implicit pre/postconditions. | **B1** — Bổ sung section formal Preconditions + Postconditions cho từng flow chính (List load, Tab switch, Search, Filter apply, Detail navigate, File viewer). | Tester thiếu setup data + verify state cho từng flow. | Open |
| Q20 | Medium | Spec — NFR thin. | **B3** — Bổ sung NFR target: (a) Response time list/detail/search; (b) Concurrent users; (c) Rate limit; (d) Accessibility (a11y screen reader, font scaling); (e) iOS/Android version matrix; (f) Offline behavior; (g) Logging policy. | Tester không thể test performance/a11y/compatibility. | Open |
| Q21 | Medium | Spec §3.1 error handling 5 scenarios; project-context có push notification flow. | **B13** — Deep link push notification: tap notification hồ sơ X → mở Detail UC46 trực tiếp? Behavior Back khi mở từ deep link (về Trang chủ hay Danh sách hồ sơ)? | Tester thiếu rule test deep link flow. | Open |
| Q22 | Low | Spec §3.1 state persistence. | **B12** — Khi user logout rồi login lại, tab + scroll + search/filter có reset về default không? *(giả định reset, cần xác nhận)* | Tester thiếu rule test session boundary. | Open |
| Q23 | Low | Spec §2.2.2 D1.3 "Đối tượng": "Hiển thị đối tượng thực hiện (Cá nhân/Tổ chức)". | **B11** — Field "Đối tượng" suy ra từ user profile login? Có case nào "Đối tượng" hồ sơ khác với user (e.g., admin nộp hộ — out of scope?) | Tester biết phải verify từ đâu (user profile hay hồ sơ data). | Open |
| Q24 | Low | Wireframe các icon (lịch, người, tòa nhà, đồng hồ, mắt, refresh, X, kính lúp, filter). | Style guide / icon library? Spec không tham chiếu — UI consistency. | UI verification có thể bị inconsistent giữa các UC. | Open |
| Q25 | Low | Spec §3.2 Đa ngôn ngữ: "text cứng dịch sang ngôn ngữ tương ứng". | **B14** (mới) — Test data 5 ngôn ngữ: tất cả 42 hard-text strings cần verify dịch (header, tab labels, button labels, placeholders, all CMR-07 / CMR-14 messages). | Tester cần 5 language test data sets. | Open |
| Q26 | Low | Spec §2.1 Card: "Wrap text nếu dài quá, không truncate" cho field Đơn vị + Người nộp; nhưng Mã hồ sơ "1 dòng, truncate". | Wrap vs truncate rule consistency: tại sao Đơn vị wrap nhưng Mã hồ sơ truncate? Có ảnh hưởng card height variable không (UX consistency)? | Tester verify layout edge cases (text dài → card cao bao nhiêu). | Open |
| Q27 | Low | Spec §3.1 Loading State: "First-load full-screen overlay; subsequent spinner cục bộ". | Subsequent load = lazy load + refresh + tab switch + filter apply + search? Tab switch có phải full-screen overlay (theo §3.1 "khi đổi tab dùng loading state toàn màn hình") hay spinner cục bộ (theo "subsequent")? Mâu thuẫn nội bộ §3.1. | Tester verify loading style không biết chính xác. | Open |
| Q28 | Low | Wireframe Tab cuộn ngang: UC45 ảnh hiển thị tab "Đã" bị cắt phải. | Tab horizontal scroll behavior: (a) Auto-scroll-into-view khi tap tab ngoài viewport? (b) Initial scroll position (tab "Tất cả" leftmost)? (c) Swipe ngang giữa tabs có nhảy data không (pinch-to-zoom-style)? | Tester verify UX edge cases. | Open |
| Q29 | Low | Spec §1: "Truy cập chức năng: Sidebar → 'Quản lý hồ sơ'". | Có entry khác không (e.g., Quick Access trên Trang chủ UC1 — UC1 đã thiết kế Quick Access cho UC45)? Hành vi khi vào UC45-51 từ Quick Access có khác Sidebar không (e.g., state reset hay không)? | Tester biết các entry points để test navigation. | Open |
| Q30 | Low | Card #27 Badge "Cá nhân"/"Tổ chức". | Màu sắc badge này (theo CMR-05: Cá nhân/Tổ chức không thuộc Tích cực/Tiêu cực/Chờ — neutral xám?). Có style guide riêng không? | Tester verify color không biết expected. | Open |

### 🟢 What's Good

- **UI Inventory toàn diện:** §2.1 và §2.2 có 11 bảng chi tiết (Header, Search/Filter, Bottom Sheet, Tabs, Card, Banner, 7 sections Detail) với mọi atomic element được mô tả riêng row + Quy tắc hiển thị + Quy tắc hành động. Granularity rule pass.
- **Error handling đầy đủ:** §3.1 có bảng 4-row xử lý lỗi (mạng, 500, timeout, 401 + refresh token) với verbatim message text. Đầy đủ với CMR-07.
- **State Persistence rules rõ ràng:** §3.1 đoạn "State Persistence" mô tả 3 bullet: tab, scroll position, search/filter — chi tiết quay lại từ Detail vs chuyển màn.
- **Lazy load retry behavior:** §3.1 đoạn "Lazy load retry" định nghĩa retry 3 lần, interval 2s, fallback pull-to-refresh.
- **Partial Data trên Detail:** Section bị lỗi chỉ hiển thị lỗi cục bộ, không block toàn màn — UX tốt.
- **Đa ngôn ngữ:** §3.2 phân biệt rõ "text cứng dịch" vs "data API giữ nguyên" — phù hợp CMR-17 v1.4.
- **Android Back vật lý:** §2.1 quy định riêng cho Bottom Sheet open — quay về màn trước (không chỉ đóng sheet). Edge case quan trọng được cover.
- **Changelog kỹ:** §4 (Lịch sử cập nhật) ghi 13 thay đổi từ v2 → v2.4 — traceability tốt.
- **Conditional fields:** Card "Lý do" + Detail Section 4 "Lý do" được định nghĩa rõ điều kiện hiển thị (chỉ status ∈ {Từ chối, Yêu cầu bổ sung}).

### 🧪 Testability Outlook

**What CAN be tested now:**

- **Happy path List load** (List 20 records, sort, full-screen loading).
- **Tab switch** (single-select, default Tất cả, re-call API per tab; nhưng search interaction blocked bởi C6).
- **Pull-to-refresh** (CMR-13).
- **Lazy load + retry behavior** (3 retries, 2s interval, fallback pull-to-refresh).
- **Error handling** (network, 500, timeout 10s, 401 + refresh token expired).
- **Empty state** (no-data vs no-result distinction).
- **Detail screen render** (7 sections, conditional "Lý do", banner, file viewer routing per CMR-08).
- **State persistence** (back từ Detail giữ tab+scroll+search/filter).
- **Date range filter** (CMR-15 validation).
- **Đa ngôn ngữ** (text cứng dịch, data API giữ nguyên).
- **Card "Lý do" banner** (conditional theo status).
- **Detail null field display** (CMR-14 "-").
- **Phí hồ sơ format** (0 → "0 VNĐ", null → "-", number format).

**What CANNOT be tested yet (blocked by gaps):**

- **Notification Bell behavior** (C1 — chưa khai báo): tap target, badge threshold, polling.
- **"Xem chi tiết" button vs Icon ">" navigation** (C2 — behavior chưa khai báo, lý do UC45 không có chưa rõ).
- **Filter Bottom Sheet buttons** (C3 — labels & layout chưa thống nhất; "Tìm" vs "Áp dụng").
- **Search × Tab interaction** (C6 — UC vs CMR-01 mâu thuẫn).
- **DN multi-user permission** (B4 — không khai báo).
- **Timeline data structure** (B5 — steps là gì, max, sort order).
- **Filter Trạng thái enum** (B6 — 5 hay 6 giá trị, order).
- **Phương thức tiếp nhận/trả enum** (B7 — chỉ Trực tuyến hay nhiều).
- **Số ngày kiểm tra/giải quyết unit & rounding** (B8).
- **Detail pull-to-refresh** (B9 — không khai báo).
- **File list lazy load / sort** (B10).
- **NFR target performance / a11y / compatibility** (B3).
- **Deep link push notification** (B13).
- **Logout/Login state reset** (B12).
- **Tab active style** (C5 — underline vs pill mâu thuẫn).
- **Detail header badge top-right vs Banner badge** (C7).
- **Field duplication banner vs section** (C8, C9 — intentional hay redundant).

**Suggested test focus areas** *(once gaps are resolved)*:

- **Happy path:** Open UC → tab "Tất cả" → cards render → tap card → Detail 7 sections → Back → state restored.
- **Alternative scenarios:**
  - Tab switching (giữ filter), filter apply (3 fields combinations), search (debounce, trim, max char), pull-to-refresh.
  - File viewer routing (PDF/IMG/VID inline; DOC/XLS/ZIP download; format khác → toast).
  - Conditional fields hiển thị/ẩn theo status.
- **Boundary & validation:** Search max 500 char, search only whitespace, date range invalid (end < start), date range 1-sided, 0 records, > 100 records (multi-page lazy load), 0 files, > 20 files (lazy load detail?).
- **Error & exception:** Network drop mid-lazy-load, HTTP 500, timeout 10s, HTTP 401 refresh OK, HTTP 401 refresh fail > 15d, partial data Detail (1/3/all endpoint fail).
- **UI-specific checks:**
  - Tab active state (style theo C5 final).
  - Badge color theo status (CMR-05).
  - "Lý do" banner viền cam + truncate 2 dòng.
  - Active Filter Indicator chấm xanh lá (CMR-02).
  - Card height variable khi text wrap (Đơn vị + Người nộp dài).
  - Đa ngôn ngữ text cứng 5 ngôn ngữ.
  - Android Back vật lý khi Bottom Sheet mở.
  - CMR-18 debounce double-tap card + button navigation.

### 📌 Summary & Recommendation

Spec UC45-51 v2.4 là một tài liệu có chất lượng UI inventory + behavior rule cao hơn trung bình — mỗi UI element có "Quy tắc hiển thị" và "Quy tắc hành động" inline, error handling 5 scenarios đầy đủ, state persistence + lazy load retry + partial data + đa ngôn ngữ đã được thiết kế. Tuy nhiên, **AC quá ngắn (5 bullets, không Given/When/Then), không có section Preconditions/Postconditions/Integration formal, NFR thin (chỉ lazy load + timeout), và có 10 cross-artefact conflicts** (4 High: Notification Bell — C1, "Xem chi tiết" button — C2, Filter button labels — C3, Search scope intersection vs override — C6). Verdict ⚠️ **CONDITIONALLY READY** (70.8/100): **đề xuất QC team bắt đầu thiết kế test cases cho các flows CAN-be-tested trên** (happy path list, tab switch, filter, detail render, file viewer, error handling, state persistence) **đồng thời gửi 30 open questions sang BA để resolve trước khi đóng test design phase**. Sau khi BA trả lời các High-priority items (Q1-Q6) và bổ sung AC formal + NFR, UC sẽ chuyển sang ≥ 80/100 (an toàn READY/CONDITIONALLY READY cao).
