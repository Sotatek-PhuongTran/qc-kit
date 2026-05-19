# UC Readiness Review — UC047-052: Báo cáo tình hình thực hiện dự án đầu tư năm (Mẫu A.III.2)

**Document type:** UC Readiness Review Report
**Date created:** 2026-05-19
**Author / Agent:** `qc-uc-read` (Run: run-20260519-140000-chrisle3)
**Version:** v1
**Source UC version reviewed:** SRS header v2.0 (2026-04-24) — change log up to v2.1 (2026-05-18)
**Mode:** first-audit
**Input language / Output language:** Vietnamese / Vietnamese

---

## Feature Brief

UC047-052 đặc tả **Báo cáo tình hình thực hiện dự án đầu tư năm (Mẫu A.III.2)** thuộc phân hệ **FDI A.III** — User Site. Báo cáo được lập bởi **Tổ chức kinh tế (TCKT)** phụ trách dự án, gắn với **1 dự án cụ thể**, định kỳ năm (hạn nộp 31/3 năm sau). Mã báo cáo theo pattern `FDI_AIII2_[ID]` (CMR_09).

UC bao gồm **3 chức năng (sub-UC)**:

1. **UC047-052.1 — Xem Danh Sách Báo Cáo:** màn hình danh sách theo Kỳ hạn năm với 4 filter (Năm Yearpicker / Trạng thái kỳ Multi-Dropdown / Dự án Dropdown-Search / Trạng thái báo cáo Multi-Dropdown) + Search Mã. Nút [Lập báo cáo] và [Nhập từ file] chỉ hiện khi kỳ "Trong thời hạn" (CMR_04). Mỗi TCKT chỉ thấy báo cáo của mình; NĐT thành viên chỉ có quyền Xem (CMR_01).
2. **UC047-052.2 — Lập Báo Cáo:** form 3 phần — Phần A (13 trường thông tin chung; sau khi chọn dự án A-001 sẽ trigger API auto-fill 12 trường theo CMR_12), Phần B (eForm Grid 2 cột với 13 mục I–XIII có Block NĐT VN + NĐT NN lấy từ API, một số mục Auto-calc, các mục cho phép số âm/dương theo CMR_05), Phần C (Textarea khó khăn — Optional). Buttons: [Hủy] [Xem] [Lưu nháp] [Nộp báo cáo] (4 buttons, B1–B4).
3. **UC047-052.3 — Các Tác Vụ Bổ Trợ:** 7 button hành động theo trạng thái bản ghi: Nộp / Chỉnh sửa / Xem chi tiết / Xem vòng đời / In / Xuất báo cáo / Xóa (Xóa chỉ khi Lưu nháp + chưa từng nộp — CF_08).

Báo cáo dùng đơn vị **USD** mặc định; nếu dự án cấp GCNĐKĐT bằng VNĐ thì toàn bộ label đơn vị Phần B đổi sang **"Triệu VNĐ"** trừ mục VI (Thu nhập bình quân) cố định "triệu VNĐ" (RULE-01). Đổi dự án sau khi đã nhập Phần B sẽ trigger popup cảnh báo xóa Phần B (RULE-02).

**Ngoại lệ đáng chú ý:** Wireframe (2 PNG) hiện tại lệch nhiều điểm so với SRS v2.1 — chưa cập nhật theo các thay đổi từ v1.5 → v2.1 (đổi tên nút Import → Nhập từ file / Export → Xuất báo cáo / Năm báo cáo từ Yearpicker → Read-only). **CMR_16 và CMR_18 referenced trong UC nhưng KHÔNG tồn tại trong `CMR_common_business_rules.md` v1.8.**

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `66.9 / 100` | ❌ **NOT READY** |

> Score 66.9 < 70 → NOT READY (không trigger auto-fail vì KA #10 NFR non-critical).
> QA chưa nên bắt đầu test design. Cần BA fix các blocker High priority (CMR_16/18 undefined, wireframe-spec drift, AC explicit, NFR section) trước khi pass điều kiện.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC047-052 | Báo cáo tình hình thực hiện dự án đầu tư năm (Mẫu A.III.2) | v2.0 (header) — change log đến v2.1 | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| quan.trinh | *(không ghi)* | 2026-04-24 | 2026-05-18 |

---

## 1. Objective & Scope

### 1.1 Objective

Cung cấp công cụ cho **Tổ chức kinh tế (TCKT)** thực hiện dự án FDI **lập báo cáo tình hình thực hiện dự án đầu tư năm theo Mẫu A.III.2** (gắn với 1 dự án cụ thể) và gửi định kỳ năm (hạn 31/3 năm sau) tới Cơ quan đăng ký đầu tư + Cơ quan thống kê tại địa phương. Báo cáo tổng hợp thông tin vốn đầu tư thực hiện, doanh thu, lao động, năng lượng, thuế, lợi nhuận, công nghệ của dự án trong năm báo cáo và lũy kế từ khi cấp GCNĐKĐT.

### 1.2 In Scope

- **UC047-052.1** — Xem Danh Sách Báo Cáo (group theo Kỳ hạn năm; filter Năm / Trạng thái kỳ / Dự án / Trạng thái báo cáo + Search Mã; nút [Lập báo cáo] / [Nhập từ file] có điều kiện hiển thị; cột Hành động).
- **UC047-052.2** — Lập Báo Cáo (form Phần A + Phần B eForm Grid + Phần C Textarea + 4 buttons; cross-flow với CF_01).
- **UC047-052.3** — Các Tác Vụ Bổ Trợ (7 button: Nộp/Chỉnh sửa/Xem chi tiết/Xem vòng đời/In/Xuất báo cáo/Xóa, kết nối CF_03/04/05/06/07/08/09).

### 1.3 Out of Scope

⚠️ **Missing** — UC SRS không có section "Out of scope" tường minh. Suy đoán từ context:

- Module Cấu hình (Admin cấp cao) — config flow type 2-bước vs >2-bước cho FDI A.III.2 (thuộc UC khác, Q-012).
- Admin Site Receive flow (Cán bộ Sở/Ban ngành tiếp nhận / duyệt) — referenced qua CMR_03 nhưng UI nằm ngoài UC này.
- Aggregation từ UC047-052 vào báo cáo địa bàn FDI A.IV (UC065-160) — cross-UC dependency chưa được nêu.
- Báo cáo Mẫu khác trong FDI A.III (A.III.3 quý / A.III.4 dầu khí Quý / A.III.5 dầu khí Năm) — UC riêng.

> **Khuyến nghị:** BA bổ sung section "Out of scope" tường minh để tránh test thừa scope.

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| **Tổ chức kinh tế (TCKT) thực hiện dự án** | Primary | Toàn quyền: Xem, Tạo mới, Chỉnh sửa, Nộp, Xóa (chỉ khi Lưu nháp + chưa từng nộp), In, Xuất báo cáo. Áp dụng CMR_01. |
| **Nhà đầu tư thành viên trong dự án** | Secondary (view-only) | Chỉ Xem — không thấy nút Tạo / Chỉnh sửa / Xóa / Nộp. List hiển thị icon ℹ️ + tooltip "Báo cáo được lập bởi [Tên TCKT]". CMR_01 + CS_01 §5. |
| **Hệ thống MBFS (System actor)** | System | Auto-fill từ API (Master Data + IRC NĐT block) khi chọn dự án; auto-calc các cell công thức Phần B realtime; sinh Mã báo cáo `FDI_AIII2_[ID]` Global Unique (CMR_09); ghi Lifecycle Log mọi thao tác (CF_06). |
| **Cán bộ Sở/Ban ngành** (Admin Site — Cơ quan đăng ký đầu tư + Cơ quan thống kê địa phương) | External (referenced) | Tiếp nhận báo cáo sau khi TCKT Nộp (FLOW-003). Permission matrix Admin-side chi tiết: **Need confirm — Q-006**. *(Ngoài scope UC nhưng ảnh hưởng test cross-flow.)* |

---

## 3. Preconditions & Postconditions

> ⚠️ **Partial / Inferred** — UC SRS KHÔNG có section "Preconditions / Postconditions" tường minh. Mục dưới đây *(inferred)* từ context + CMR + CF.

### 3.1 Preconditions

- *(inferred)* User đã đăng nhập thành công vào User Site.
- *(inferred)* User có role **TCKT phụ trách của ít nhất 1 dự án FDI** (để có quyền Tạo/Sửa/Xóa/Nộp; CMR_01). Hoặc role **NĐT thành viên** (chỉ Xem).
- *(inferred)* Có ít nhất 1 dự án FDI thuộc TCKT để chọn trong Dropdown "Tên dự án" (#47).
- Đối với chức năng **Lập báo cáo (UC047-052.2)**: Kỳ hạn năm hiện tại phải ở trạng thái **"Trong thời hạn"** (CMR_04) để nút [Lập báo cáo] visible.
- *(inferred)* API Master Data + API IRC NĐT block phải reachable; nếu fail → fallback Enable nhập tay (CMR_12 v1.4).
- Module Cấu hình đã set flow type cho FDI A.III.2 (2-bước hoặc >2-bước) — quyết định behavior khi Nộp.

### 3.2 Postconditions

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Lưu nháp (Case 1 — đã chọn Dự án) | Bản ghi mới với `Trạng thái = Lưu nháp`, `Mã báo cáo = FDI_AIII2_[ID]` sinh tự động (Global Unique — CMR_09); Lifecycle Log ghi nhận "Lập" (CF_06); Toast T01; quay về Danh sách. Counter Dashboard NĐT +1. |
| Lưu nháp (Case 2 — không có Dự án nguồn) | N/A — UC này luôn cần chọn dự án; Case 2 không áp dụng. |
| Chỉnh sửa + Lưu nháp (từ trạng thái Lưu nháp) | Trạng thái giữ "Lưu nháp"; Lifecycle Log "Sửa"; Toast T03. |
| Chỉnh sửa + Lưu nháp (từ trạng thái Yêu cầu chỉnh sửa) | Trạng thái giữ **"Yêu cầu chỉnh sửa"** (không về Lưu nháp — CF_03); Toast T03. |
| Nộp (flow 2-bước) | Trạng thái → "Đã tiếp nhận" (lock vĩnh viễn); Toast T02; Lifecycle Log "Nộp". |
| Nộp (flow >2-bước) | Trạng thái → "Chờ duyệt"; Toast T02; Admin Site nhận báo cáo (FLOW-003). |
| Xóa | Bản ghi bị xóa khỏi DS; Toast T08; Lifecycle Log "Xóa" (CMR_02 implied). Chỉ áp dụng khi Lưu nháp + chưa từng nộp; sau khi đã từng nộp, [Xóa] ẩn vĩnh viễn (CF_08 Lifecycle Lock). |
| Xuất báo cáo | File `.xlsx` tải về theo naming `FDI-AIII2-[ID]_nam-YYYY_DA-XXX` (suy luận từ CF_04 — naming convention chính xác cần verify); Toast T04. |

> **Khuyến nghị:** BA bổ sung section riêng "Preconditions / Postconditions" để tester không phải suy luận.

---

## 4. UI Object Inventory & Mapping

> **Phương pháp:** Mỗi atomic UI element = 1 row. Hai design image: **G1** = `Group 1-(Compressify.io).png` (UC047-052.1 Danh Sách), **F113** = `Frame 113-(Compressify.io).png` (UC047-052.2 Lập Báo Cáo). Phần A field #2-#10 spec ghi "Label" nhưng F113 vẽ Text input box → giữ type theo spec.

### 4.1 Sidebar / Navigation (G1 vs F113 — **không thống nhất, xem CONF-01**)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | G1 Sidebar header | "Hệ thống Báo cáo Đầu tư Quốc gia" (logo "HQ") | Brand label | N/A | — | — | — | Static brand mark, top-left | G1 |
| 2 | G1 Sidebar nav | "Dashboard" | Nav link | N/A | — | — | — | Navigates to SCR-001 Dashboard NĐT | G1 |
| 3 | G1 Sidebar nav | "Báo cáo đã gửi" | Nav link | N/A | — | — | — | Filtered DS — purpose chưa rõ trong spec UC047-052 | G1 |
| 4 | G1 Sidebar group | "DANH SÁCH BÁO CÁO" | Section header (static) | N/A | — | — | — | Group label cho nav items báo cáo | G1 |
| 5 | G1 Sidebar nav (selected) | "1. Báo cáo tình hình thực hiện dự án đầu tư năm (Mẫu A.III.2)" | Nav link (active) | N/A | — | — | — | Trỏ tới chính UC047-052.1 này | G1 |
| 6 | G1 Sidebar footer | "Đơn vị quản lý / Bộ Kế hoạch và Đầu tư" | Static text block | N/A | — | — | — | Bottom-left fixed | G1 |
| 7 | F113 Sidebar header | "Cổng đầu tư quốc gia / Hệ thống báo cáo" | Brand label | N/A | — | — | — | **Khác cấu trúc G1 — CONF-01** | F113 |
| 8 | F113 Sidebar nav (active) | "Báo cáo dự án" | Nav link (red) | N/A | — | — | — | Active state highlight đỏ | F113 |
| 9 | F113 Sidebar nav | "Quản lý dự án" | Nav link | N/A | — | — | — | Trỏ tới module khác | F113 |
| 10 | F113 Sidebar nav | "Thống kê" | Nav link | N/A | — | — | — | Trỏ tới dashboard hoặc analytics — chưa rõ trong UC | F113 |

### 4.2 UC047-052.1 — Page header + Filter bar (G1)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 11 | Danh sách | "BÁO CÁO TÌNH HÌNH THỰC HIỆN DỰ ÁN ĐẦU TƯ NĂM (MẪU A.III.2)" | Page title | N/A | — | — | — | Static heading at top | G1 + spec UC047-052.1 §1 |
| 12 | Filter bar | "Tìm kiếm theo mã báo cáo" (icon search bên trong) | Search bar | No | Null | "Tim kiem nhanh theo ma bao cao" (spec v2.1 — wireframe G1 hiển thị "Tìm kiếm theo mã báo cáo") | — | Max 200 ký tự; debounce 300–500ms (CS_01 §3); case-insensitive partial match; auto-trim (CMR_06, CMR_09). **Conflict placeholder:** spec change log 2026-05-17 STD-04b ghi "Tim kiem nhanh theo ma bao cao" (no accents) — wireframe hiển thị "Tìm kiếm theo mã báo cáo" (có accent). Cần BA đồng bộ. | G1 + spec |
| 13 | Filter bar | "Năm" | Yearpicker (Dropdown) | No | Năm hiện tại (= 2026) | — | Years 1987 → năm hiện tại (spec change log 2026-05-12). CS_01 §2: chỉ enable năm có data nộp + năm tài chính hiện tại. | Filter ngay khi chọn; CMR_07. Min year validate: ≥ 1987. | G1 + spec |
| 14 | Filter bar | "Trạng thái kỳ" | Multiple-selection Dropdown | No | Null (placeholder "Tất cả") | — | Chưa tới hạn / Trong thời hạn / Qua kỳ báo cáo | CMR_04, CMR_07, CMR_16. **CMR_16 chưa tồn tại trong common rules — CONF-15.** Filter ngay khi chọn. | G1 + spec |
| 15 | Filter bar | "Trạng thái báo cáo" | Multiple-selection Dropdown | No | Null (placeholder "Tất cả") | — | Lưu nháp / Chờ duyệt / Đã tiếp nhận / Yêu cầu chỉnh sửa | CMR_03, CMR_07, CMR_16. Filter ngay. | G1 + spec |
| 16 | Filter bar (spec only) | "Dự án" | Dropdown / Search | No | "Tất cả dự án" | — | DS dự án thuộc TCKT đang đăng nhập (CMR_01) | **Conflict: KHÔNG xuất hiện trên wireframe G1 — CONF-02.** Spec UC047-052.1 §2 #3 quy định nhưng wireframe thiếu. | Spec only |

### 4.3 UC047-052.1 — Period accordion + Table (G1)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 17 | Period accordion #1 | "NĂM 2026" | Accordion header (collapsible) | N/A | Mặc định Collapse (spec UC047-052.1 §3) | — | — | **Conflict: G1 vẽ Expanded — CONF-03.** Click expand/collapse. CMR_08 nhưng CMR_08 chưa định nghĩa — CONF-14. | G1 + spec |
| 18 | Period status chip #1 | "Chưa tới hạn" | Status chip (blue) | N/A | — | — | Chưa tới hạn / Trong thời hạn / Qua kỳ báo cáo | CMR_04. **Missing color code spec.** | G1 |
| 19 | Period empty state #1 | "Kỳ báo cáo này chưa tới hạn / Vui lòng đợi đến thời hạn để lập báo cáo" | Empty-state message | N/A | — | — | — | CS_01 §4 — wording cố định; ẩn bảng và 2 button [Lập báo cáo]/[Nhập từ file]. | G1 + CS_01 |
| 20 | Period accordion #2 | "NĂM 2025" | Accordion header | N/A | Collapse (spec) — G1 Expanded | — | — | Tương tự #17 | G1 + spec |
| 21 | Period status chip #2 | "Trong thời hạn" | Status chip (green) | N/A | — | — | — | CMR_04 | G1 |
| 22 | Period action button #2.1 | "Lập báo cáo" | Button (red filled, primary) | N/A | — | — | — | Chỉ visible khi Trong thời hạn + role = TCKT phụ trách (CMR_04, CMR_01, CF_01). Click → mở form UC047-052.2. | G1 + spec |
| 23 | Period action button #2.2 | "Import" (G1) / **"Nhập từ file"** (spec v2.1) | Button (outlined) | N/A | — | — | — | **Conflict label — CONF-05.** Wireframe hiển thị "Import"; spec change log 2026-05-18 v2.1 yêu cầu "Nhập từ file". Click → popup Import (CF_02). | G1 + spec |
| 24 | Table column header (period #2) | "Mã báo cáo" | Table column | N/A | — | — | — | Pattern `FDI_AIII2_[ID]` (CMR_09). **Missing sort icon trên wireframe — CONF-04.** Spec yêu cầu Number sort. | G1 + spec |
| 25 | Table column header | "Tên dự án" | Table column | N/A | — | — | — | Text type — không có sort icon (đúng spec: "Cột kiểu Text không hiển thị icon Sort"). | G1 + spec |
| 26 | Table column header | "Ngày cập nhật" | Table column | N/A | — | — | — | Format `dd/MM/yyyy HH:mm`. **Missing sort icon — CONF-04.** | G1 + spec |
| 27 | Table column header | "Trạng thái báo cáo" | Table column | N/A | — | — | — | CMR_03; chip color tùy trạng thái. | G1 + spec |
| 28 | Table column header | "Hành động" | Table column | N/A | — | — | — | Button group — chi tiết UC047-052.3 (rows #41-#47 dưới đây). | G1 + spec |
| 29 | Table data sample | "FDI-2026-001" | Data label (Mã) | — | — | — | — | Sample row period 2025 | G1 |
| 30 | Table data sample | "Dự án Đầu tư Nhà máy Điện Mặt trời Ninh Thuận" | Data label (Tên DA) | — | — | — | — | Sample | G1 |
| 31 | Table data sample | "15/09/2026 10:30" | Data label (datetime) | — | — | — | — | Sample | G1 |
| 32 | Table data sample | "Lưu nháp" | Status label | — | — | — | — | Sample | G1 |
| 33 | Period accordion #3 | "NĂM 2024" | Accordion header | N/A | Collapse (spec) — G1 Expanded | — | — | Tương tự #17 | G1 |
| 34 | Period status chip #3 | "Qua kỳ báo cáo" | Status chip (yellow) | N/A | — | — | — | CMR_04 | G1 |
| 35 | Table data sample (period #3) | "FDI-2026-003 / Dự án Đầu tư Cơ sở Hạ tầng Giao thông TP.HCM / 20/06/2026 14:20 / Chờ duyệt" | Sample data row | — | — | — | — | Period Qua kỳ vẫn hiển thị bản ghi đã có (state = Chờ duyệt — không có 2 button [Lập]/[Nhập từ file]). | G1 |
| 36 | Pagination | "Hiển thị 10 / trang" | Page size dropdown | No | 10 | — | 10 / 20 / 50 / 100 | CMR_10 | G1 + CMR_10 |
| 37 | Pagination | "Previous" | Page nav button | N/A | — | — | — | Disabled tại trang 1 (CMR_10) | G1 |
| 38 | Pagination | "1" | Current page indicator | N/A | — | — | — | — | G1 |
| 39 | Pagination | "Next" | Page nav button | N/A | — | — | — | Disabled tại trang cuối (CMR_10) | G1 |
| 40 | Sidebar footer | "Đơn vị quản lý / Bộ Kế hoạch và Đầu tư" | Static text | N/A | — | — | — | (Đã list ở #6) | G1 |

### 4.4 UC047-052.1 — Cột Hành động (G1 + spec UC047-052.3 §2)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 41 | Hành động button | "Nộp" | Button (red filled) | N/A | — | — | — | Visible khi Lưu nháp / Yêu cầu chỉnh sửa + TCKT phụ trách (CMR_03, CMR_01); CF_09 [Listing → Submit] | G1 + spec |
| 42 | Hành động button | "Chỉnh sửa" | Button (red filled) | N/A | — | — | — | Visible khi Lưu nháp / Yêu cầu chỉnh sửa + TCKT phụ trách; CF_03 | G1 + spec |
| 43 | Hành động button | "Xem chi tiết" | Button (outlined) | N/A | — | — | — | Visible Tất cả trạng thái; CF_07 | G1 + spec |
| 44 | Hành động button | "Xem vòng đời" | Button (outlined) | N/A | — | — | — | Visible Tất cả trạng thái; CF_06 (popup Audit Trail) | G1 + spec |
| 45 | Hành động button | "In" | Button (outlined) | N/A | — | — | — | Visible Tất cả trạng thái; CF_05 | G1 + spec |
| 46 | Hành động button | "Export" (G1) / **"Xuất báo cáo"** (spec v2.1) | Button (outlined) | N/A | — | — | — | **Conflict label — CONF-06.** Visible Tất cả trạng thái; CF_04 (Excel `.xlsx` cho UC047-052.3 §3). | G1 + spec |
| 47 | Hành động button (spec only) | "Xóa" | Button (icon) | N/A | — | — | — | **CONF-07: KHÔNG xuất hiện trên G1.** Visible chỉ khi Lưu nháp + chưa từng nộp + TCKT phụ trách; CF_08 + popup P04 + Toast T08. Lifecycle Lock sau khi từng nộp. | Spec UC047-052.3 #7 only |

### 4.5 UC047-052.2 — Header (F113)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 48 | Lập BC | "Lập báo cáo tình hình thực hiện dự án đầu tư năm" | Page title | N/A | — | — | — | Static heading | F113 |
| 49 | PHẦN HEADER | "Năm báo cáo: *" + Yearpicker dropdown | **Conflict CONF-08**: Spec v1.7 quy định Read-only auto-fill từ kỳ hạn chọn từ Danh sách / KHÔNG cho phép sửa; F113 vẽ Yearpicker editable hiển thị "2025" | Yes | Theo Kỳ hạn báo cáo chọn từ DS | — | — | Validate ≥ 1987 và ≥ Năm cấp GCNĐKĐT (Rule 03). | F113 + spec v1.7 |

### 4.6 UC047-052.2 — PHẦN A: Thông tin chung (F113) — spec table 13 fields

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 50 | PHẦN A | Section header "PHẦN A – THÔNG TIN CHUNG" | Section title | N/A | — | — | — | Static | F113 + spec |
| 51 | PHẦN A #1 | "Tên dự án/Tên hợp đồng BCC" | Dropdown (Single, searchable) | Yes | Null | — | DS dự án từ API thuộc TCKT đăng nhập | Click → API call → auto-fill 12 fields còn lại. CMR_01, CMR_07, CMR_12, RULE-02. | F113 + spec |
| 52 | PHẦN A #2 | "Mã số dự án/Số GCNĐKĐT" | Label (read-only, API) | Yes | Từ API (sample "DA-2024-001") | — | — | CMR_12. **Visual conflict CONF-09**: F113 vẽ text input boxed. | F113 + spec |
| 53 | PHẦN A #3 | "Ngày cấp GCNĐKĐT" | Label (read-only, API, format dd/MM/yyyy) | Yes | Từ API (sample "15/01/2024") | — | — | CMR_12 | F113 + spec |
| 54 | PHẦN A #4 | "Cơ quan cấp GCNĐKĐT" | Label (read-only, API) | Yes | Từ API (sample "Sở Kế hoạch và Đầu tư TP. HCM") | — | — | CMR_12 | F113 + spec |
| 55 | PHẦN A #5 | "Địa điểm thực hiện dự án" | Label (read-only, API, full-width) | Yes | Từ API (sample "Khu công nghiệp Tân Thuận, Q.7, TP. HCM") | — | — | CMR_12 | F113 + spec |
| 56 | PHẦN A #6 | "Tổng vốn đầu tư đăng ký (Triệu VND)" (label F113) | Label (read-only, API) | Yes | Từ API (sample "250,000") | — | — | RULE-01: đơn vị USD hoặc Triệu VNĐ tùy loại dự án. CMR_12. | F113 + spec |
| 57 | PHẦN A #7 | "Tên tổ chức kinh tế thực hiện dự án" | Label (read-only, API) | Yes | Từ API (sample "Công ty TNHH Điện tử ABC") | — | — | CMR_12 | F113 + spec |
| 58 | PHẦN A #8 | "Mã số doanh nghiệp/Mã số thuế" | Label (read-only, API) | Yes | Từ API (sample "0123456789") | — | — | CMR_12 | F113 + spec |
| 59 | PHẦN A #9 | "Ngày cấp lần đầu" (F113) / **"Ngày cấp lần đầu ĐKKD"** (spec) | Label (read-only, API, dd/MM/yyyy) | Yes | Từ API (sample "10/03/2020") | — | — | **Conflict label CONF-10**: thiếu hậu tố "ĐKKD" trên F113. CMR_12. | F113 + spec |
| 60 | PHẦN A #10 | "Cơ quan cấp đăng ký kinh doanh" (F113) / **"Cơ quan cấp ĐKKD"** (spec) | Label (read-only, API) | Yes | Từ API (sample "Sở Kế hoạch và Đầu tư TP. HCM") | — | — | **Conflict label CONF-10**: spec viết tắt, wireframe đầy đủ. CMR_12. | F113 + spec |
| 61 | PHẦN A #11 | "Địa chỉ liên hệ" | Text input (Editable, full-width) | Yes | Từ API (prefill) | "Nhập địa chỉ liên hệ" | — | Cho phép sửa; auto-trim; max 500 (CMR_06); RULE-02 cảnh báo khi đổi dự án. | F113 + spec |
| 62 | PHẦN A #12 | "Số điện thoại" | Text input (Editable) | Yes | Từ API | "Nhập số điện thoại" | — | Cho phép sửa; RULE-02; CMR_06. **Missing**: pattern/format validation cho SĐT (chữ số, dấu, độ dài). | F113 + spec |
| 63 | PHẦN A #13 | "Email" | Text input (Editable) | Yes | Từ API | "Nhập email" | — | Cho phép sửa; validate format email (chứa @ và domain); RULE-02; CMR_06. **Missing exact error message wording.** | F113 + spec |

### 4.7 UC047-052.2 — PHẦN B: eForm Grid (F113) — Cấu trúc 2 cột dữ liệu (A) Số liệu năm báo cáo / (B) Số liệu lũy kế

> Đơn vị mặc định **USD**; nếu dự án cấp GCNĐKĐT bằng VNĐ thì toàn bộ "USD" → "Triệu VNĐ" trừ VI (RULE-01).

| # | Screen / Section | Label (verbatim) | Type / Loại cell | Required | Cột (A) | Cột (B) | Đơn vị | Source |
|---|---|---|---|---|---|---|---|---|
| 64 | PHẦN B | Section header "PHẦN B: TÌNH HÌNH THỰC HIỆN DỰ ÁN ĐẦU TƯ" | Section title | N/A | — | — | — | F113 + spec |
| 65 | PHẦN B Cột | "Tên chỉ tiêu" | Column header | N/A | — | — | — | F113 + spec |
| 66 | PHẦN B Cột | "Đơn vị tính" | Column header | N/A | — | — | — | F113 + spec |
| 67 | PHẦN B Cột (A) | "Số liệu thực hiện năm báo cáo" | Column header | N/A | Yes | — | — | F113 + spec |
| 68 | PHẦN B Cột (B) | "Số liệu lũy kế từ khi được cấp GCNĐKĐT đến cuối năm báo cáo" | Column header | N/A | — | Yes | — | F113 + spec |
| 69 | Mục I | "I. Vốn đầu tư thực hiện" (có tooltip ℹ️) | Auto-calc | Yes | Σ(A) mục 1 + 2 + 3 | Auto-calc | USD | F113 + spec; CMR_11 (tooltip) |
| 70 | Mục 1 | "1. Vốn góp" (có tooltip ℹ️) | Auto-calc | Yes | Σ(A) mục 1.1 + 1.2 | Auto-calc | USD | F113 + spec |
| 71 | Mục 1.1 | "1.1. Nhà đầu tư Việt Nam" | Auto-calc | Yes | Σ(A) tất cả block NĐT VN | Auto-calc | USD | F113 + spec |
| 72 | Block NĐT VN Row 1 | "[Tên nhà đầu tư thứ nhất]" | API Label, read-only | Yes | Σ(A) row 4+5+6 | Auto-calc | USD | F113 + spec; API IRC, CMR_12. Multi-block nếu dự án có nhiều NĐT. |
| 73 | Block NĐT VN Row 2 | "Mã số thuế: [giá trị]" (spec) — F113 hiển thị label "Mã số thuế" (không giá trị) | API Label, read-only | Yes | Locked | Locked | — | F113 + spec |
| 74 | Block NĐT VN Row 3 | "Chia ra:" | Group header | N/A | Locked | Locked | — | F113 + spec |
| 75 | Block NĐT VN Row 4 | "- Bằng tiền" | Editable | Yes | Editable | Editable | USD | F113 + spec; CMR_05 (số ≥ 0) |
| 76 | Block NĐT VN Row 5 | "- Máy móc, thiết bị" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 77 | Block NĐT VN Row 6 | "- Tài sản khác" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 78 | Mục 1.2 | "1.2. Nhà đầu tư nước ngoài" | Auto-calc | Yes | Σ(A) tất cả block NĐT NN | Auto-calc | USD | F113 + spec |
| 79 | Block NĐT NN Row 1 | "[Tên nhà đầu tư thứ nhất]" | API Label, read-only | Yes | Σ(A) row 4+5+6 | Auto-calc | USD | F113 + spec |
| 80 | Block NĐT NN Row 2 | "Mã số thuế/số Quyết định thành lập/số hộ chiếu: [giá trị]" (spec) | API Label, read-only | Yes | Locked | Locked | — | F113 + spec |
| 81 | Block NĐT NN Row 3 | "Chia ra:" | Group header | N/A | Locked | Locked | — | F113 + spec |
| 82 | Block NĐT NN Row 4 | "- Bằng tiền" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 83 | Block NĐT NN Row 5 | "- Máy móc, thiết bị" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 84 | Block NĐT NN Row 6 | "- Tài sản khác" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 85 | Mục 2 | "2. Vốn vay" | Auto-calc (cho phép số âm) | Yes | Σ(A) các dòng vay (2.a+2.b+2.c) | Auto-calc | USD | F113 + spec; tooltip công thức đã chuyển sang vùng GHI CHÚ (spec v1.9) |
| 86 | Mục 2.a | "Vay trong nước" | Editable, cho phép số âm | Yes | Editable | Editable | USD | F113 + spec; CMR_05 |
| 87 | Mục 2.b | "Vay từ công ty mẹ ở nước ngoài" | Editable, cho phép số âm | Yes | Editable | Editable | USD | F113 + spec |
| 88 | Mục 2.c | "Vay nước ngoài khác" | Editable, cho phép số âm | Yes | Editable | Editable | USD | F113 + spec |
| 89 | Mục 3 | "3. Lợi nhuận tái đầu tư" | Editable, cho phép số âm | Yes | Editable | Editable | USD | F113 + spec |
| 90 | Mục II | "II. Doanh thu thuần" | Editable | Yes | Editable | Locked | USD | F113 + spec; CMR_05 (≥ 0) |
| 91 | Mục III | "III. Giá trị hàng xuất khẩu" | Editable | Yes | Editable | Locked | USD | F113 + spec |
| 92 | Mục IV | "IV. Giá trị hàng nhập khẩu" | Editable | Yes | Editable | Locked | USD | F113 + spec |
| 93 | Mục V | "V. Số lao động hiện có đến thời điểm báo cáo" (F113 hiển thị bị cắt "V. Số lao động hiện có đến thời điểm báo") | Auto-calc (V = V.1+V.2) | Yes | Σ(A) LĐ VN + LĐ NN | Locked | người | F113 + spec; tooltip; Cột B lock — lũy kế không áp dụng cho chỉ tiêu thời điểm |
| 94 | Mục V.1 | "1. Lao động Việt Nam" | Editable | Yes | Editable | Locked | người | F113 + spec |
| 95 | Mục V.2 | "2. Lao động nước ngoài" | Editable | Yes | Editable | Locked | người | F113 + spec |
| 96 | Mục VI | "VI. Thu nhập bình quân tháng của người lao động" | Editable | Yes | Editable | Locked | Triệu VNĐ (cố định, không đổi theo RULE-01) | F113 + spec |
| 97 | Mục VII | "VII. Tình hình sử dụng năng lượng" | Group header | N/A | Locked | Locked | — | F113 + spec |
| 98 | Mục VII.1 | "1. Điện" | Editable | Yes | Editable | Locked | kWh | F113 + spec |
| 99 | Mục VII.2 | "2. Than" | Editable | Yes | Editable | Locked | tấn | F113 + spec |
| 100 | Mục VII.3 | "3. Dầu" | Editable | Yes | Editable | Locked | lít | F113 + spec |
| 101 | Mục VII.4 | "4. Khí LNG" | Editable | Yes | Editable | Locked | m³ | F113 + spec |
| 102 | Mục VII.5 | "5. Các loại năng lượng khác (nếu có)" + **Textbox tự ghi tên ĐVT** (spec) | Editable + Textbox tự ghi | No | Editable | Locked | Tự ghi | **Conflict CONF-11**: F113 không hiển thị rõ textbox tự ghi cho cột Đơn vị tính. |
| 103 | Mục VIII | "VIII. Thuế và các khoản nộp ngân sách Nhà nước" | Editable | Yes | Editable | Locked | USD | F113 + spec |
| 104 | Mục IX | "IX. Diện tích đất, mặt nước đã sử dụng (nếu có)" | Editable, optional | No | Editable | Locked | m² | F113 + spec |
| 105 | Mục X | "X. Lợi nhuận sau thuế" | Editable | Yes | Editable | Locked | USD | F113 + spec |
| 106 | Mục XI | "XI. Chi phí đầu tư, nghiên cứu và phát triển" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 107 | Mục XII | "XII. Chi phí đầu tư xử lý và bảo vệ môi trường" | Editable | Yes | Editable | Editable | USD | F113 + spec |
| 108 | Mục XIII | "XIII. Nguồn gốc công nghệ sử dụng (quốc gia xuất xứ của máy móc, thiết bị chính được sử dụng)" | Text input (1 dòng, full-width — spec v1.9 đổi từ Textarea) | No | — | — | — | F113 + spec; max 500 (CMR_06) |

### 4.8 UC047-052.2 — PHẦN C + GHI CHÚ + Buttons (F113)

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 109 | PHẦN C | Section header "PHẦN C: CẬP NHẬT KHÓ KHĂN, VƯỚNG MẮC TRONG QUÁ TRÌNH THỰC HIỆN DỰ ÁN (NẾU CÓ)" | Section title | N/A | — | — | — | F113. Spec table không có "(NẾU CÓ)" trong tên section. | F113 + spec |
| 110 | PHẦN C #1 | "Cập nhật khó khăn, vướng mắc và kiến nghị" | Textarea (Editable, optional) | No | Null | "(Nêu cụ thể khó khăn, vướng mắc, kiến nghị và hướng giải quyết)" (F113) / "Nhập Cập nhật khó khăn, vướng mắc và kiến nghị (Nêu cụ thể khó khăn, vướng mắc, kiến nghị và hướng giải quyết)" (spec) | — | **Conflict placeholder CONF-12**: F113 thiếu prefix "Nhập…". Auto-trim, max 2000 (CMR_06), hỗ trợ xuống dòng. | F113 + spec |
| 111 | GHI CHÚ block | "Ghi chú:" + 3 dòng (Vốn vay = ... / Đơn vị Triệu VND cho DA VND / Không báo cáo ô đánh dấu 'X') | Static text block | N/A | — | — | — | F113 + spec |
| 112 | Button B1 | "Hủy" | Button (outlined) | N/A | — | — | — | CF_01 [Hủy] → dirty check → popup P02 nếu dirty; CMR_14 | F113 + spec |
| 113 | Button B2 | "Xem" | Button (outlined) | N/A | — | — | — | Preview PDF (CF_07.1); **Disabled khi chưa Lưu nháp/Nộp lần nào** (CF_01 v2.0); Enabled sau khi bản ghi đã tồn tại. | F113 + spec |
| 114 | Button B3 | "Lưu nháp" | Button (outlined) | N/A | — | — | — | CF_01 [Lưu nháp]: Case 1 → validate tối thiểu (bắt buộc chọn Dự án nguồn); Toast T01 thành công / T07 nếu rỗng / T05 server error | F113 + spec |
| 115 | Button B4 | "Gửi báo cáo" (F113) / **"Nộp báo cáo"** (spec) | Button (red filled, primary) | N/A | — | — | — | **Conflict label CONF-13.** Validate toàn bộ + popup P01 (checkbox bắt buộc) → Toast T02. CMR_03 chuyển trạng thái Chờ duyệt / Đã tiếp nhận. | F113 + spec |

---

## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| Search "Tìm kiếm theo mã báo cáo" (#12) | Enabled mặc định | Click → focus; type → debounce 300–500ms (CS_01 §3); auto-trim; case-insensitive partial match | Live filter table realtime; max 200 ký tự; empty state nếu không có data; CMR_06 + CMR_09 |
| Yearpicker "Năm" filter (#13) | Enabled; chỉ enable năm có data nộp + năm tài chính hiện tại (CS_01 §2) | Click → mở YearPicker; chọn → filter ngay | Default = năm hiện tại (2026); validate ≥ 1987 |
| Multi-Dropdown "Trạng thái kỳ" (#14) | Enabled | Click → mở dropdown; chọn/bỏ tag; "✕" xóa tag; "+N..." counter khi tràn; instant search bên trong | Filter ngay; tag reflow khi xóa; "Tất cả" option (CMR_16 — **chưa định nghĩa**); CMR_07.2 |
| Multi-Dropdown "Trạng thái báo cáo" (#15) | Như #14 | Như #14 | Như #14 |
| Filter "Dự án" (#16 — spec only) | Enabled (chỉ liệt kê dự án thuộc TCKT đăng nhập) | N/A — wireframe thiếu | **Behavior undefined trên wireframe — Conflict CONF-02** |
| Period accordion header (#17/#20/#33) | **Default Collapse** (spec) — **G1 vẽ Expanded — Conflict CONF-03** | Click → toggle expand/collapse | CMR_08 chưa định nghĩa nội dung — Conflict CONF-14 |
| Period status chip (#18/#21/#34) | Read-only label | Hover (tooltip nếu có — undefined) | Color code (blue/green/yellow) — **chưa quy định trong spec** |
| Period empty state (#19) | Hiển thị khi period = Chưa tới hạn | Static | CS_01 §4 wording cố định |
| Button "Lập báo cáo" (#22) | Enabled khi Trong thời hạn + TCKT phụ trách; Hidden khác | Click → mở form UC047-052.2 | CF_01, CMR_04, CMR_01 |
| Button "Nhập từ file"/"Import" (#23) | Như #22 | Click → popup Import CF_02 | CF_02, CMR_04, CMR_17 (upload constraints nếu áp dụng) |
| Table columns (#24-#28) | Read-only headers | Sort icon click 1 → Ascending; click 2 → Descending; click 3 → Reset (single-column, client-side, chỉ Number/Date) | **Sort icon không vẽ trên G1 — Conflict CONF-04** |
| Pagination (#36-#39) | Trang 1 → Previous Disabled; trang cuối → Next Disabled | Click button page nav; chọn page size dropdown | CMR_10 |
| Action button "Nộp" (#41) | Visible khi state ∈ {Lưu nháp, Yêu cầu chỉnh sửa} + TCKT phụ trách | Click → CF_09 [Listing → Submit]: validate toàn bộ → P01 hoặc mở form + scroll lỗi đầu tiên | CF_09, CMR_03, CMR_01 |
| Action button "Chỉnh sửa" (#42) | Như #41 | Click → mở form CF_03 với prefill data | CF_03 |
| Action button "Xem chi tiết" (#43) | Visible Tất cả trạng thái | Click → full-page Disabled (CF_07) | CF_07 |
| Action button "Xem vòng đời" (#44) | Visible Tất cả trạng thái | Click → popup Audit Trail CF_06 | CF_06 — **action types detail Chưa xác định** |
| Action button "In" (#45) | Visible Tất cả trạng thái | Click → Print Preview PDF → browser print dialog | CF_05 |
| Action button "Xuất báo cáo"/"Export" (#46) | Visible Tất cả trạng thái | Click → tạo `.xlsx` (UC047-052.3 §3 quy định Excel) → tải về | CF_04, Toast T04 |
| Action button "Xóa" (#47 — spec only) | Visible chỉ khi Lưu nháp + chưa từng nộp + TCKT phụ trách (CF_08) | Click → popup P04 → confirm → Toast T08 | CF_08 Lifecycle Lock vĩnh viễn sau lần nộp đầu tiên |
| Header Yearpicker "Năm báo cáo" (#49) | **Spec v1.7: Read-only auto-fill / KHÔNG cho phép sửa**. **F113: Editable Yearpicker — Conflict CONF-08** | (Spec) không tương tác; (F113) click → chọn năm | Validate ≥ 1987 (spec v1.5) và ≥ Năm cấp GCNĐKĐT (Rule 03) |
| Dropdown "Tên dự án" (#51) | Enabled mặc định | Click → DS dự án TCKT; chọn → API call → auto-fill #52-#63; instant search bên trong (CMR_07.1) | RULE-02: nếu đổi dự án sau khi nhập Phần B → popup confirm "Thay đổi dự án sẽ xóa toàn bộ dữ liệu đã nhập ở Phần B. Bạn có muốn tiếp tục?". CMR_01 + CMR_07 + CMR_12 |
| Labels/Inputs API-sourced #52-#60 | **CMR_12 v1.4 lifecycle**: trước API → Disabled; API success → Disabled + auto-fill; API null → Enabled (nhập tay); API fail → Toast T05 + Enabled | Hầu hết Read-only (theo spec) | **Visual conflict CONF-09**: F113 vẽ là Text input boxed — không chắc behavior Enabled hay Disabled |
| Text "Địa chỉ liên hệ" (#61) | Enabled luôn (Editable theo spec); prefill từ API | Type → auto-trim; max 500 (CMR_06); placeholder ẩn khi gõ; RULE-02 cảnh báo khi đổi dự án | Nguyên tắc trách nhiệm API-sourced: user chịu trách nhiệm cuối |
| Text "Số điện thoại" (#62) | Enabled; prefill | Type → auto-trim | **Missing format validation**: chữ số / dấu / độ dài. Có cho nhập alphabet không? |
| Text "Email" (#63) | Enabled; prefill | Type → blur/submit → validate format email (chứa @ và domain) | **Missing error wording**: lỗi inline cụ thể khi email sai format chưa quy định |
| Auto-calc cells (I, 1, 1.1, 1.2, 2, V — các mục Σ) | Read-only display | Realtime update khi cell con thay đổi | Hiển thị Σ; tooltip ℹ️ giải thích công thức (CMR_11). Nếu user clear cell con → recalc; behavior khi tất cả cell con rỗng chưa quy định rõ |
| Editable numeric cells Phần B (mục ≥ 0: I subitems, II, III, IV, V.1, V.2, VI, VII.x, VIII, X, XI, XII; mục cho phép âm: 2, 2.a, 2.b, 2.c, 3) | Enabled (Editable theo cột — A/B tùy mục) | Type → validate CMR_05 (chỉ chữ số, `.`, `,`, `-` tùy rule mục); auto-round 5 chữ số thập phân khi blur; max 20 ký tự | V02/V03/V04 inline lỗi theo CMR_05 |
| Block NĐT API Labels (#72-#80) | Read-only theo API IRC | Static | CMR_12; multi-block nếu dự án có nhiều NĐT; không có thêm/xóa thủ công (spec v1.7 đã loại bỏ) |
| Tooltip ℹ️ trên mục I, 1, V | Visible | Hover → tooltip wording: I "(I = 1+2+3)", 1 "(liệt kê theo từng NĐT)", V "(V = V.1+V.2)" | CMR_11. Spec v1.9 đã loại tooltip mục 2 — nhưng table v2.0 vẫn có dấu vết tooltip mục 2 → minor inconsistency |
| Text "Nguồn gốc công nghệ" (XIII — #108) | Enabled, optional | Type → auto-trim; max 500 (CMR_06) | Text 1 dòng (đổi từ Textarea — spec v1.9) |
| Textarea "Khó khăn vướng mắc" (#110) | Enabled, optional | Type → auto-trim; max 2000 (CMR_06); xuống dòng | **Conflict placeholder CONF-12** |
| Button "Hủy" (#112) | Enabled | Click → dirty check (CMR_14): không dirty → quay DS; dirty → popup P02 | CF_01 [Hủy], CMR_14 |
| Button "Xem" (#113) | **Disabled khi chưa từng Lưu nháp/Nộp** (CF_01 v2.0); Enabled sau lần lưu/nộp đầu | Click → popup PDF Preview CF_07.1 với header/footer auto-fill (địa điểm user, ngày báo cáo, tên người lập) | Footer popup có [In] và [Export] tùy biểu mẫu |
| Button "Lưu nháp" (#114) | Enabled | Click → auto-trim → validate tối thiểu (Case 1: bắt buộc chọn Tên dự án nguồn) → Toast T01 success / V01 inline / T07 nếu rỗng / T05 server | CF_01 [Lưu nháp] |
| Button "Nộp báo cáo"/"Gửi báo cáo" (#115) | Enabled | Click → auto-trim + validate tất cả trường bắt buộc + Rule 03 (Năm BC ≥ Năm cấp GCNĐKĐT) → popup P01 với checkbox bắt buộc → confirm → Toast T02 / T05 | CMR_03 chuyển trạng thái Chờ duyệt (flow >2 bước) hoặc Đã tiếp nhận (2 bước) |

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 UC047-052.1 — Xem Danh Sách Báo Cáo

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | TCKT | Đăng nhập, mở menu "Báo cáo tình hình thực hiện DA đầu tư năm (Mẫu A.III.2)" | Load DS theo Kỳ hạn năm (default collapse, sort giảm dần). Filter mặc định: Năm = năm hiện tại, Trạng thái kỳ/báo cáo = Null | NĐT thành viên thấy DS với icon ℹ️ + tooltip "Báo cáo được lập bởi [Tên TCKT]" (CMR_01, CS_01 §5); các nút Tạo/Sửa/Xóa/Nộp ẩn | Server lỗi load DS → **không quy định Error state** ⚠️; Toast T05 (suy luận) |
| 2 | TCKT | Click expand accordion kỳ | Bảng báo cáo của kỳ hiển thị với 5 cột (Mã / Tên DA / Ngày cập nhật / Trạng thái / Hành động) + pagination CMR_10 | Period = Chưa tới hạn → empty state CS_01 §4, ẩn 2 button [Lập báo cáo]/[Nhập từ file] | Period chưa có bản ghi nào (Trong/Qua kỳ) → CS_01 §4 wording: "Chưa có báo cáo nào cho kỳ này..." |
| 3 | TCKT | Apply filter (Năm, Trạng thái kỳ, Dự án, Trạng thái báo cáo) hoặc Search Mã | Filter realtime (debounce 300–500ms cho search) | Filter "Dự án" thiếu trên wireframe (CONF-02) | Không có kết quả → "Không tìm thấy dữ liệu phù hợp" (CS_01 §3) |
| 4 | TCKT (kỳ Trong thời hạn) | Click [Lập báo cáo] | Mở form UC047-052.2 (CF_01) | Click [Nhập từ file]/[Import] → popup Import CF_02 | TCKT không có quyền lập (NĐT thành viên) → button ẩn (CMR_01) |
| 5 | TCKT | Click action button trên row (Nộp / Chỉnh sửa / Xem chi tiết / Xem vòng đời / In / Xuất báo cáo / Xóa) | Trigger function tương ứng (CF_03 → 08, CF_09) | Xóa chỉ visible khi Lưu nháp + chưa từng nộp + TCKT phụ trách (CF_08) | Action button không visible theo CMR_03 + CMR_01 |
| 6 | User | Click sort icon trên cột (Mã báo cáo / Ngày cập nhật) | Single-column sort: Ascending → Descending → Reset (client-side trên data đã load) | Cột Text (Tên dự án, Trạng thái) → không có sort icon | **Sort icon không vẽ trên wireframe — CONF-04** |
| 7 | User | Đổi page size dropdown / Click Previous/Next | Cập nhật pagination | — | Trang 1 → Previous Disabled; trang cuối → Next Disabled |

**B. Business Rules & Validations (UC047-052.1)**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Search Mã báo cáo (#12) | No | Text (placeholder spec: "Tim kiem nhanh theo ma bao cao") | — / 200 ký tự | Empty: "Không tìm thấy dữ liệu phù hợp" (CS_01 §3) |
| Filter Năm (#13) | No | Yearpicker | 1987 / năm hiện tại | — |
| Filter Trạng thái kỳ (#14) | No | Multiple-select Dropdown — phải có option "Tất cả" theo CMR_16 (**chưa tồn tại**) | — | — |
| Filter Trạng thái báo cáo (#15) | No | Multi-select; option "Tất cả" (CMR_16) | — | — |
| Period header (CMR_08) | — | Wording: "Năm YYYY" — **CMR_08 chưa định nghĩa wording chuẩn — CONF-14** | — | — |
| Mã báo cáo (CMR_09) | — | Pattern `FDI_AIII2_[ID]` Global Unique | — | — |
| Pagination (CMR_10) | — | Default 10; options 10/20/50/100 | — | — |
| Button [Lập báo cáo] / [Nhập từ file] | — | Hiển thị/ẩn theo CMR_04 + CMR_01 | — | — |
| Button [Xóa] (CF_08) | — | Lifecycle Lock vĩnh viễn sau lần nộp đầu | — | — |

**C. UI/UX Feedback (UC047-052.1)**

- **Loading State:** ⚠️ **Missing** — spec không quy định skeleton / spinner khi load DS.
- **Toast Messages:**
  - T01 / T02 / T03 / T04 / T08 (success theo từng action) — `Bảng thông báo lỗi` codes.
  - T05 "Lỗi hệ thống / Không thể kết nối đến hệ thống. Vui lòng thử lại sau." (`list-toast-messages.md` T05) — khi server lỗi.
- **Empty States:**
  - Period Chưa tới hạn: "Kỳ báo cáo này chưa tới hạn. Vui lòng đợi đến thời hạn để lập báo cáo" (CS_01 §4).
  - Period Trong/Qua kỳ chưa có BC: "Chưa có báo cáo nào cho kỳ này. Nhấn 'Lập báo cáo' ở trên để tạo báo cáo mới" hoặc "Chưa có báo cáo nào cho kỳ này. Không thể tạo thêm." (CS_01 §4).
  - Search/Filter no result: "Không tìm thấy dữ liệu phù hợp" (CS_01 §3).
- **Icon ℹ️ + Tooltip:** trên DS dành cho NĐT thành viên: "Báo cáo được lập bởi [Tên TCKT]" (CS_01 §5, CMR_01).

---

### 6.2 UC047-052.2 — Lập Báo Cáo

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | TCKT | Click [Lập báo cáo] từ DS | Mở form: Header có "Năm báo cáo" auto-fill từ kỳ hạn được click (spec v1.7 Read-only); Phần A trống (#51 Dropdown enabled, #52-#60 Disabled chờ chọn); Phần B Disabled toàn bộ (chờ chọn dự án để API trả Block NĐT); Phần C trống | — | — |
| 2 | TCKT | Click Dropdown "Tên dự án" (#51) → chọn dự án | Hệ thống call API: auto-fill #52-#60 (12 trường API-sourced theo CMR_12); API trả Block NĐT VN + NĐT NN cho Phần B; nếu dự án cấp bằng VNĐ → đổi label đơn vị "USD" → "Triệu VNĐ" (RULE-01 trừ mục VI cố định) | API null → các trường Enabled cho nhập tay (CMR_12) | API fail → Toast T05 + #52-#60 Enabled (CMR_12 v1.4) |
| 3 | TCKT | (Optional) Sửa #61 Địa chỉ liên hệ / #62 SĐT / #63 Email | Chấp nhận sửa; auto-trim khi blur; validate format email | — | Email sai format → inline lỗi (wording **Missing**); SĐT pattern không quy định ⚠️ |
| 4 | TCKT | Nhập Phần B các cell Editable (mục bằng tiền / vốn vay / doanh thu / lao động / năng lượng / thuế / lợi nhuận / chi phí) | Validate CMR_05 ký tự + format số khi gõ; blur → auto-round 5 chữ số thập phân (spec UC047-052.2 §3); mục >= 0 (I, II-VIII, X-XII, V.x) khác mục cho phép âm (2, 2.x, 3); Auto-calc realtime cho I, 1, 1.1, 1.2, 2, V | — | V02 (ký tự sai), V03 (số âm cho mục ≥0), V04 (format số sai) — CMR_05 |
| 5 | TCKT | (Optional) Nhập Phần C "Khó khăn vướng mắc" (#110) | Chấp nhận xuống dòng, max 2000 | — | — |
| 6 | TCKT | Click [Lưu nháp] (#114) | Auto-trim; validate tối thiểu (Case 1 CF_01: bắt buộc chọn Dự án #51); thành công → Toast T01; quay về DS với trạng thái Lưu nháp; Mã báo cáo sinh `FDI_AIII2_[ID]` | Bản ghi tồn tại (Chỉnh sửa) → toast T03 "Đã chỉnh sửa báo cáo thành công" | Chưa chọn dự án → V01 inline "Trường bắt buộc"; tất cả trống → T07; server fail → T05 |
| 7 | TCKT | Click [Xem] (#113) sau khi đã Lưu nháp | Popup PDF Preview CF_07.1 với header auto-fill địa điểm + ngày + tên người lập; footer 2 nút [In]/[Export] | — | Server fail → T05; [Xem] Disabled nếu chưa Lưu nháp/Nộp lần nào (CF_01) |
| 8 | TCKT | Click [Nộp báo cáo]/[Gửi báo cáo] (#115) | Auto-trim + validate tất cả trường bắt buộc + Rule 03 (Năm BC ≥ Năm cấp GCNĐKĐT) → nếu PASS: popup P01 "Bạn có chắc muốn nộp?" + checkbox bắt buộc "Tôi đã kiểm tra..." → enable [Xác nhận] → click → Toast T02 + trạng thái → Chờ duyệt (flow >2 bước) hoặc Đã tiếp nhận (2 bước) theo Module Cấu hình | Trạng thái flow do Module Cấu hình quyết định (Q-012) | Trường bắt buộc trống → V01 inline; Năm BC < Năm cấp GCNĐKĐT → "Năm báo cáo không hợp lệ (Dự án bắt đầu từ năm {YYYY})"; Năm BC < 1987 → "Năm báo cáo không được nhỏ hơn 1987."; server fail → T05 |
| 9 | TCKT | (Alt) Đổi dự án #51 sau khi đã nhập Phần B | Popup P02-equivalent: "Thay đổi dự án sẽ xóa toàn bộ dữ liệu đã nhập ở Phần B. Bạn có muốn tiếp tục?". [Tiếp tục] → xóa Phần B + re-fill A; [Hủy] → giữ nguyên dự án cũ | — | RULE-02 |
| 10 | TCKT | (Alt) Click [Hủy] (#112) khi form dirty | Popup P02 "Dữ liệu chưa được lưu / Bạn có chắc chắn muốn rời khỏi trang này không?" — [Đồng ý] → quay DS, mất data; [Hủy] → ở lại | Form không dirty → quay DS ngay không popup | CMR_14 |

**B. Business Rules & Validations (UC047-052.2)**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Năm báo cáo header (#49) | Yes | Read-only spec / Yearpicker wireframe — Conflict | 1987 / năm hiện tại | "Năm báo cáo không được nhỏ hơn 1987." / "Năm báo cáo không hợp lệ (Dự án bắt đầu từ năm {YYYY})" (Rule 03) |
| Tên dự án (#51) | Yes | Dropdown single-choice, instant search (CMR_07.1) | — | V01 "Trường bắt buộc" (CMR_07 + list-toast V01) |
| #52-#60 API-sourced | Yes | Read-only (spec) / API-fill behavior CMR_12 | — | — |
| #61 Địa chỉ liên hệ | Yes | Text, auto-trim, case-insensitive | — / 500 | V01 "Trường bắt buộc" (CMR_06) |
| #62 Số điện thoại | Yes | Text, auto-trim — **format chưa quy định** | — / 500 | V01 |
| #63 Email | Yes | Text, format email (chứa @ và domain) | — / 500 | V01; **lỗi format email wording chưa quy định** ⚠️ |
| Phần B mục I, II, III, IV, V, VI, VII.x, VIII, X, XI, XII (số ≥ 0) | Yes (trừ IX, VII.5, XIII optional) | Số ≥ 0 | — / 20 ký tự, 5 chữ số thập phân | V01 "Trường bắt buộc"; V02 "Ký tự không hợp lệ. Chỉ chấp nhận chữ số, dấu chấm, dấu phẩy và dấu trừ"; V03 "Ký tự không hợp lệ. Chỉ chấp nhận chữ số, dấu chấm và dấu phẩy"; V04 "Sai định dạng số." (CMR_05) |
| Phần B mục 2, 2.a, 2.b, 2.c, 3 (cho phép số âm) | Yes | Số có thể âm | — / 20, 5 chữ số thập phân | V01; V02; V04 |
| Phần B mục VII.5 ĐVT tự ghi | No | Textbox tự do cho tên đơn vị | — / 500 | — |
| Phần B mục IX (Diện tích đất) | No | Số ≥ 0 | — / 20 | V02 / V03 / V04 nếu nhập |
| Phần B mục XIII Nguồn gốc CN (#108) | No | Text 1 dòng | — / 500 (CMR_06) | — |
| Phần C khó khăn (#110) | No | Textarea | — / 2000 (CMR_06) | — |

**Cross-field rules:**
- RULE-01: Đơn vị Phần B USD ↔ Triệu VNĐ theo loại dự án (trừ VI cố định).
- RULE-02: Đổi dự án sau khi đã nhập Phần B → popup confirm xóa Phần B.
- Rule 03: Năm báo cáo ≥ Năm cấp GCNĐKĐT của dự án; ≥ 1987.
- Decimal precision: 5 chữ số thập phân, auto-round half-up khi blur.
- Max length defaults: Textbox 500 / Textarea 2000 / Number 20 / Search 200.

**C. UI/UX Feedback (UC047-052.2)**

- **Loading States:**
  - Phần A #52-#60 và Phần B Block NĐT: Disabled khi đang chờ API (CMR_12 v1.4).
  - Button [Lưu nháp] / [Nộp]: spec không quy định spinner trong button khi đang submit ⚠️ Missing.
- **Toast Messages:**
  - T01 "Đã lập báo cáo thành công" (Lưu nháp success) — from `list-toast-messages.md`.
  - T02 "Đã nộp báo cáo thành công" (Nộp success).
  - T03 "Đã chỉnh sửa báo cáo thành công" (Chỉnh sửa + Lưu nháp).
  - T04 "Đã export báo cáo thành công" (Export).
  - T05 "Lỗi hệ thống / Không thể kết nối đến hệ thống. Vui lòng thử lại sau." (server error / API fail).
  - T06 "Báo cáo đã được lập / Báo cáo cho [Phạm vi] đã chọn đã được lập bởi [Tên người lập]" — **nếu áp dụng cho UC này (trùng kỳ + dự án) cần BA xác nhận** ⚠️.
  - T07 "Lưu nháp không thành công / Bạn cần nhập dữ liệu cho trường thông tin trước khi lưu nháp" (Case 2 — UC này không áp dụng vì luôn cần Dự án nguồn).
  - T08 "Xóa báo cáo thành công" (Xóa — CF_08).
- **Inline Validation:**
  - V01 "Trường bắt buộc" (#61, #62, #63, #51, các mục Phần B bắt buộc, Năm BC).
  - V02 / V03 / V04 cho trường số (CMR_05).
  - **Email format error message — Missing exact wording** ⚠️.
- **Popups:**
  - P01 "Bạn có chắc muốn nộp?" + checkbox "Tôi đã kiểm tra toàn bộ thông tin đã nhập và xác nhận rằng các thông tin đó là chính xác." (CF_01).
  - P02 "Dữ liệu chưa được lưu / Bạn có chắc chắn muốn rời khỏi trang này không?" (CMR_14).
  - **P02-equivalent (RULE-02 đổi dự án)** — chưa có Mã riêng trong `list-toast-messages.md` ⚠️.
  - P04 "Bạn có chắc chắn muốn xóa báo cáo này?" (CF_08).

---

### 6.3 UC047-052.3 — Các Tác Vụ Bổ Trợ

**A. Workflows (overview — chi tiết tham chiếu CF_03..09)**

| Step | Actor | Action | System Response | Tham chiếu |
|------|-------|--------|-----------------|------------|
| 1 | TCKT (state Lưu nháp/YC chỉnh sửa) | Click [Nộp] cột Hành động | Validate → P01 → nộp (như Step 8 §6.2 nhưng kích hoạt từ DS) | CF_09 |
| 2 | TCKT (state Lưu nháp/YC chỉnh sửa) | Click [Chỉnh sửa] | Mở form prefill (CF_03); trạng thái sau khi Lưu nháp: giữ nguyên Lưu nháp hoặc YC chỉnh sửa | CF_03 |
| 3 | Mọi role có quyền xem | Click [Xem chi tiết] | Full-page Disabled (CF_07) | CF_07 |
| 4 | Mọi role có quyền xem | Click [Xem vòng đời] | Popup Timeline append-only (CF_06) — **detail action types chưa xác định** ⚠️ | CF_06 |
| 5 | Mọi role có quyền xem | Click [In] | Print Preview PDF → browser print dialog | CF_05 |
| 6 | Mọi role có quyền xem | Click [Xuất báo cáo]/[Export] | Tạo `.xlsx` (UC047-052.3 §3 quy định Excel) → tải về với naming `FDI-AIII2-[ID]_nam-YYYY_DA-XXX` (suy luận CF_04) | CF_04 |
| 7 | TCKT (state Lưu nháp + chưa từng nộp) | Click [Xóa] | Popup P04 → confirm → Toast T08; Lifecycle Log "Xóa" | CF_08, P04, T08 |

**B. Business Rules & Validations (UC047-052.3)**

| Action | Visibility condition | Permission |
|---|---|---|
| Nộp | Lưu nháp hoặc YC chỉnh sửa | Người tạo (TCKT phụ trách) |
| Chỉnh sửa | Lưu nháp hoặc YC chỉnh sửa | Người tạo (TCKT phụ trách) |
| Xem chi tiết | Tất cả trạng thái | Tất cả người có quyền xem |
| Xem vòng đời | Tất cả trạng thái | Tất cả người có quyền xem |
| In | Tất cả trạng thái | Tất cả người có quyền xem |
| Xuất báo cáo | Tất cả trạng thái | Tất cả người có quyền xem |
| Xóa | Lưu nháp **VÀ** chưa từng nộp | Người tạo (TCKT phụ trách); ẩn vĩnh viễn sau lần nộp đầu (CF_08) |

**C. UI/UX Feedback**

- Toast T04 (Xuất báo cáo), T08 (Xóa).
- Popup P04 (Xóa confirm).
- Popup Audit Trail (CF_06 — detail action types chưa quy định).

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis (Cross-function influence) | Data Consistency Verification |
|---------------------------|--------------------------------------------|-------------------------------|
| Lập báo cáo (UC047-052.2) → Lưu nháp | Tạo bản ghi mới với `Mã = FDI_AIII2_[ID]` (CMR_09 Global Unique) hiển thị trong DS (UC047-052.1); counter Dashboard NĐT (FLOW-004) +1 | Mã báo cáo unique toàn hệ thống; verify prefix FDI_ (không phải DTNN_ legacy — `project-context-master.md` Q-flag) |
| Lập báo cáo → Nộp | Chuyển trạng thái Lưu nháp → Chờ duyệt (flow >2 bước) hoặc Đã tiếp nhận (2 bước) theo CMR_03; trigger thông báo Admin Site (FLOW-003) | Trạng thái + Lifecycle Log đồng bộ; Module Cấu hình per-báo-cáo quyết định flow type (Q-012); permission Admin-side cần Q-006 |
| Chọn Dropdown "Tên dự án" (#51) | API call lấy 12 trường + Block NĐT VN/NN từ API IRC; đổi label đơn vị USD ↔ Triệu VNĐ theo RULE-01 | Verify đơn vị chuyển đúng theo loại dự án; Ngày cấp GCNĐKĐT của dự án phải ≤ Năm báo cáo (Rule 03) |
| Đổi dự án sau khi đã nhập Phần B | Popup RULE-02 → xóa toàn bộ Phần B → re-fill A từ API mới | Verify Block NĐT VN/NN re-fill từ API mới; tất cả cell Phần B mất data |
| Chỉnh sửa từ trạng thái YC chỉnh sửa | Lưu nháp giữ trạng thái YC chỉnh sửa (không về Lưu nháp); chỉ chuyển khi Nộp (CF_03) | Cột Trạng thái và filter sync; [Xóa] vĩnh viễn ẩn vì Lifecycle Lock (CF_08) |
| Xóa bản ghi | Bản ghi bị xóa khỏi DS; counter Dashboard NĐT –1 | Verify Lifecycle Log vẫn lưu thao tác Xóa (CMR_02 implied); chỉ áp dụng khi Lưu nháp + chưa từng nộp |
| Xuất báo cáo `.xlsx` | File tải về với naming `FDI-AIII2-[ID]_nam-YYYY_DA-XXX` (suy luận CF_04) | Verify naming chuẩn và format file đúng template biểu mẫu A.III.2 |
| Module Cấu hình thay đổi flow type cho FDI A.III.2 | Ảnh hưởng toàn bộ bản ghi sau đó: trạng thái sau Nộp đổi giữa Chờ duyệt ↔ Đã tiếp nhận | **High regression anchor** (NAV-008 trong site-map §10) |
| API auto-fill dự án thất bại | Phần A #52-#60 Enabled cho nhập tay; user chịu trách nhiệm cuối (CMR_12 v1.4, "Nguyên tắc trách nhiệm API-sourced") | Verify Toast T05 hiển thị; verify fallback Enabled state |
| Aggregate vào báo cáo FDI A.IV địa bàn (UC065-160) | UC047-052 là báo cáo theo từng dự án — có thể bị aggregate; aggregation rule cụ thể chưa nêu | ⚠️ **Missing cross-UC dependency spec** |
| Print/Export integration với CF_04/CF_05 | Trigger từ DS hoặc Preview popup (CF_07.1); naming `FDI-AIII2-[ID]_nam-YYYY_DA-XXX` | Verify file content match form; print PDF page break |
| Lifecycle Log (CF_06) | Append-only mọi thao tác Lập/Sửa/Nộp/Xóa kèm user + thời gian | Bắt buộc cho mọi báo cáo |

---

## 8. Acceptance Criteria

> **Lưu ý:** UC SRS KHÔNG có section AC tường minh. AC dưới đây được **generate từ flows + business rules + UI behaviors** ở Section 6. AC score thấp do source thiếu, nhưng AC vẫn được cung cấp đầy đủ để QA bắt đầu thiết kế test sau khi resolve gap.

### 8.1 UI Acceptance Criteria

| AC # | Scenario | Given | When | Then |
|------|----------|-------|------|------|
| AC-UI-01 | Page title đúng | TCKT đăng nhập User Site | Mở menu Báo cáo tình hình thực hiện DA đầu tư năm | Page title hiển thị "BÁO CÁO TÌNH HÌNH THỰC HIỆN DỰ ÁN ĐẦU TƯ NĂM (MẪU A.III.2)" |
| AC-UI-02 | 5 filter hiển thị đầy đủ | Đang ở Danh sách | — | Filter bar có 5 trường: Search Mã / Năm Yearpicker / Trạng thái kỳ Multi-Dropdown / Dự án Dropdown / Trạng thái báo cáo Multi-Dropdown — **blocked bởi CONF-02 thiếu Dự án trên wireframe** |
| AC-UI-03 | Period accordion default Collapse | Có ≥ 1 kỳ trong DS | Load DS lần đầu | Tất cả kỳ ở trạng thái Collapsed — **blocked bởi CONF-03 (wireframe vẽ Expanded)** |
| AC-UI-04 | Button label đúng v2.1 | Period Trong thời hạn | — | Hiển thị nút "Lập báo cáo" (red filled) và "Nhập từ file" (outlined) — **blocked bởi CONF-05** |
| AC-UI-05 | Action button label đúng v2.1 | Row trên DS | — | Cột Hành động hiển thị "Xuất báo cáo" (không phải "Export") — **blocked bởi CONF-06** |
| AC-UI-06 | Sort icon trên Number/Date cột | Có data trong period | — | Cột Mã báo cáo + Ngày cập nhật có sort icon; cột Text không có — **blocked bởi CONF-04** |
| AC-UI-07 | Form Lập có 4 phần | Click [Lập báo cáo] | — | Form hiển thị Header (Năm BC) + PHẦN A + PHẦN B + PHẦN C + GHI CHÚ + 4 buttons |
| AC-UI-08 | Đơn vị Phần B đổi theo loại dự án | Chọn dự án cấp GCNĐKĐT bằng VNĐ | — | Tất cả label "USD" Phần B đổi sang "Triệu VNĐ" trừ VI cố định (RULE-01) |
| AC-UI-09 | Tooltip ℹ️ trên mục công thức | Mục I, 1, V hiển thị | Hover icon ℹ️ | Tooltip hiển thị công thức Σ tương ứng (CMR_11) |
| AC-UI-10 | Block NĐT lặp theo số NĐT | Dự án có 2 NĐT VN + 1 NĐT NN | Chọn dự án → API trả 3 block | UI hiển thị 3 block NĐT, mỗi block có 6 row (Tên/Mã/Chia ra/Bằng tiền/Máy móc/Tài sản khác) |

### 8.2 Functional Acceptance Criteria

| AC # | Scenario | Given | When | Then |
|------|----------|-------|------|------|
| AC-FUNC-01 | TCKT thấy nút Tạo/Sửa/Xóa/Nộp | TCKT phụ trách đăng nhập, có dự án | Mở DS | Thấy [Lập báo cáo] + 7 button Hành động theo trạng thái |
| AC-FUNC-02 | NĐT thành viên view-only | NĐT thành viên đăng nhập | Mở DS | Không thấy [Lập báo cáo] / [Nhập từ file] / [Nộp] / [Chỉnh sửa] / [Xóa]; row có icon ℹ️ tooltip "Báo cáo được lập bởi [Tên TCKT]" |
| AC-FUNC-03 | Mã báo cáo unique pattern | TCKT Lưu nháp thành công | Hệ thống sinh Mã | Mã = `FDI_AIII2_[ID]` Global Unique |
| AC-FUNC-04 | Lưu nháp chỉ cần Dự án | TCKT đã chọn dự án #51, các cell khác trống | Click [Lưu nháp] | Toast T01 "Đã lập báo cáo thành công"; bản ghi trạng thái Lưu nháp; quay DS |
| AC-FUNC-05 | Lưu nháp thiếu Dự án | TCKT chưa chọn #51 | Click [Lưu nháp] | V01 inline "Trường bắt buộc" dưới #51; không lưu |
| AC-FUNC-06 | Nộp validate đủ + popup confirm | TCKT đã nhập đủ trường bắt buộc | Click [Nộp báo cáo] | Hiện popup P01 với checkbox bắt buộc; [Xác nhận] Disabled cho đến khi tích |
| AC-FUNC-07 | Nộp thành công → trạng thái theo flow | Module Cấu hình set flow >2 bước cho FDI A.III.2; TCKT confirm P01 | Click [Xác nhận] | Toast T02; trạng thái → "Chờ duyệt"; quay DS — **blocked bởi Q-012 chưa xác định flow type** |
| AC-FUNC-08 | Đổi dự án sau khi nhập Phần B | TCKT đã chọn dự án A, nhập Phần B; click Dropdown lại chọn dự án B | — | Popup RULE-02 "Thay đổi dự án sẽ xóa toàn bộ dữ liệu đã nhập ở Phần B. Bạn có muốn tiếp tục?"; [Tiếp tục] → xóa B + re-fill A; [Hủy] → giữ dự án A |
| AC-FUNC-09 | API call dự án thất bại | API down/timeout | Click Dropdown #51 chọn dự án | Toast T05; #52-#60 chuyển Enabled cho nhập tay (CMR_12) |
| AC-FUNC-10 | Auto-calc realtime Σ | TCKT nhập value cho mục 1.1 Bằng tiền | Blur cell | Mục 1 + I auto-update Σ ngay |
| AC-FUNC-11 | Auto-round 5 chữ số thập phân | TCKT nhập "123.123456789" vào mục bằng tiền | Blur cell | Cell hiển thị "123.12346" (round half-up) |
| AC-FUNC-12 | Số âm chỉ ở mục 2 + 3 | TCKT nhập "-100" vào mục II Doanh thu (≥ 0) | Blur cell | V03 inline "Ký tự không hợp lệ. Chỉ chấp nhận chữ số, dấu chấm và dấu phẩy" |
| AC-FUNC-13 | Validate năm BC | TCKT đổi Năm BC = 1986 | — | Inline "Năm báo cáo không được nhỏ hơn 1987." — **blocked bởi CONF-08 nếu Năm BC là Read-only thì không thể đổi** |
| AC-FUNC-14 | Xóa chỉ khi Lưu nháp + chưa từng nộp | Row Lưu nháp + chưa nộp | Click [Xóa] | Popup P04 → confirm → Toast T08 "Xóa báo cáo thành công" |
| AC-FUNC-15 | Lifecycle Lock cho Xóa | Bản ghi từng nộp, sau đó YC chỉnh sửa → Lưu nháp | Mở DS | Nút [Xóa] KHÔNG hiển thị trên row đó (CF_08 vĩnh viễn) |
| AC-FUNC-16 | Filter dropdown có "Tất cả" | Trạng thái kỳ filter | Click Dropdown | Có option "Tất cả" (CMR_16) — **blocked bởi CONF-15 CMR_16 chưa định nghĩa** |
| AC-FUNC-17 | [Xem] Disabled trước khi Lưu nháp/Nộp | Form mới mở, chưa save | — | Button [Xem] Disabled với tooltip "Vui lòng Lưu nháp hoặc Nộp báo cáo trước khi xem preview." (CF_01 v2.0) |
| AC-FUNC-18 | Sort column 3-click cycle | DS có data | Click cột Ngày cập nhật lần 1/2/3 | Ascending → Descending → Reset — **blocked bởi CONF-04** |

### 8.3 Integration Acceptance Criteria

| AC # | Scenario | Given | When | Then |
|------|----------|-------|------|------|
| AC-INT-01 | Dashboard NĐT cập nhật khi Lưu nháp | TCKT Lưu nháp BC mới | Mở SCR-001 Dashboard NĐT | Counter "Báo cáo của tôi" tăng +1 (FLOW-004) |
| AC-INT-02 | Lifecycle Log ghi mọi thao tác | TCKT Lập → Sửa → Nộp 1 báo cáo | Mở [Xem vòng đời] | Timeline có 3 mốc: Lập (user + time), Sửa (user + time), Nộp (user + time) — **blocked bởi CF_06 action types chưa quy định** |
| AC-INT-03 | Module Cấu hình thay đổi flow | Admin đổi flow FDI A.III.2 từ 2-bước → >2-bước; TCKT Nộp BC sau đó | — | Trạng thái sau Nộp = "Chờ duyệt" (thay vì "Đã tiếp nhận") |
| AC-INT-04 | Icon ℹ️ cho NĐT thành viên | NĐT thành viên đăng nhập, có BC do TCKT lập | Mở DS | Row có icon ℹ️ + tooltip "Báo cáo được lập bởi [Tên TCKT]" (CMR_01, CS_01 §5) |
| AC-INT-05 | Xuất `.xlsx` đúng naming | Bản ghi trạng thái bất kỳ | Click [Xuất báo cáo] | File tải về với tên `FDI-AIII2-[ID]_nam-YYYY_DA-XXX.xlsx` (suy luận CF_04); Toast T04 |
| AC-INT-06 | Aggregate vào FDI A.IV địa bàn | UC047-052 BC đã nộp; UC065-160 lập BC địa bàn | — | ⚠️ **Aggregation rule chưa quy định — blocked** |

---

## 9. Non-functional Requirements

> ⚠️ **TẤT CẢ MISSING** — UC SRS không có section NFR. Cần BA / Tech Lead / QC Lead phối hợp bổ sung.

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance | ⚠️ Missing — chưa có target response time cho load DS, filter, save draft, submit, auto-calc | Q-004 (Tech Lead) |
| Security | ⚠️ Missing — chưa có RBAC policy, session timeout, audit log retention, data masking cho data nhạy cảm (MST DN, GCNĐKĐT, dữ liệu tài chính) | Q-005 (BA / Legal) |
| Compatibility | ⚠️ Missing — Browser matrix (Chrome / Edge / Safari latest-2?), min screen resolution, behavior tại breakpoint mobile/tablet/desktop (web-responsive). UC SRS không nêu | Q-010 (QC Lead `project-config` Mục 2) |
| Accessibility | ⚠️ Missing — WCAG AA color contrast (đặc biệt status chip), screen-reader labels cho icon ℹ️ / sort icons / required `*`, keyboard navigation cho eForm Grid Phần B | Standard QC checklist |
| Audit / Logging | Lifecycle Log bắt buộc (CF_06 + CMR_02 implied) — action types detail chưa quy định | CF_06 |
| Privacy | Chứa thông tin doanh nghiệp (MST, dữ liệu tài chính, lao động NĐT) — chưa có policy data retention / masking | Q-005 |
| `Platform-specific NFR (web-responsive)` | ⚠️ Missing — Behavior tại breakpoint desktop / tablet / mobile (eForm Grid 30+ rows sẽ reflow thế nào?); URL deep-link cho từng kỳ + DA; back-forward / refresh state preservation; Print view CSS rules (CF_05 mở Print Preview nhưng page-break, header/footer print chưa quy định) | Q-010 |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions (UC-local — BA UC owner answer)

| # | Question / Issue | Context | Owner | Status |
|---|-----------------|---------|-------|--------|
| Q1 | CMR_08 (Quy tắc hiển thị Kỳ hạn báo cáo) chưa định nghĩa — Period header label format? | UC047-052.1 §2 #6 reference CMR_08; common rules file ghi "Chưa định nghĩa" | BA (quan.trinh) | Open |
| Q2 | CMR_16 (filter dropdown phải có "Tất cả") chưa tồn tại trong common rules — cần thêm vào `CMR_common_business_rules.md` | UC047-052.1 §2 #2, #3, #4 đều reference CMR_16 | BA | Open |
| Q3 | CMR_18 (Tab Navigation) chưa tồn tại trong common rules — cần thêm | UC047-052.1 §3, §UC047-052.2 §3 reference CMR_18 | BA | Open |
| Q4 | Năm báo cáo header — Read-only hay Editable Yearpicker? | Spec v1.7 ghi Read-only, F113 vẽ Editable Yearpicker | BA + UX | Open |
| Q5 | Filter "Dự án" có cần thêm vào wireframe không? | Spec UC047-052.1 §2 #3 có, F113/G1 thiếu | BA + UX | Open |
| Q6 | Sort icon trên cột Mã báo cáo + Ngày cập nhật — UX update wireframe? | Spec UC047-052.1 §3 yêu cầu nhưng wireframe thiếu | UX | Open |
| Q7 | Button label final: "Import" vs "Nhập từ file"; "Export" vs "Xuất báo cáo"; "Gửi báo cáo" vs "Nộp báo cáo" | Spec v2.1 đã đổi; wireframe chưa cập nhật | BA + UX | Open |
| Q8 | Email validation error message exact wording? | Spec không quy định wording cụ thể (chỉ ghi "Validate format email") | BA | Open |
| Q9 | Số điện thoại format/pattern? Pattern Việt Nam (10-11 chữ số leading 0) hay tự do? | Spec không quy định pattern | BA | Open |
| Q10 | Period status chip color code? (blue / green / yellow như G1?) | Spec mô tả 3 trạng thái nhưng không nêu màu chuẩn | UX | Open |
| Q11 | Period accordion default state: Collapse (spec) hay Expanded (wireframe)? | Conflict CONF-03 | BA + UX | Open |
| Q12 | VII.5 textbox tự ghi tên ĐVT — UI cụ thể? Render thế nào trên Phần B Grid? | Spec quy định "Tự ghi" nhưng wireframe không hiển thị rõ | UX | Open |
| Q13 | PHẦN A #2-#10 — Render visually là Label hay Boxed input? Behavior khác nhau không? | Spec ghi "Label" read-only, F113 visually là text input boxed | UX | Open |
| Q14 | PHẦN A #9 label — "Ngày cấp lần đầu" (F113) hay "Ngày cấp lần đầu ĐKKD" (spec)? | Mismatch label | BA | Open |
| Q15 | PHẦN A #10 label — "Cơ quan cấp ĐKKD" (spec) hay "Cơ quan cấp đăng ký kinh doanh" (F113)? | Mismatch label viết tắt vs đầy đủ | BA | Open |
| Q16 | PHẦN C placeholder — có prefix "Nhập…" hay không? Section title có "(NẾU CÓ)" không? | Mismatch placeholder + section header | BA + UX | Open |
| Q17 | Action button "Xóa" có visible khi state Lưu nháp (chưa từng nộp) trên wireframe không? Cần wireframe state mới? | Spec quy định nhưng wireframe G1 không có row trạng thái này | UX | Open |
| Q18 | Loading state cho DS load + Save draft submit — skeleton / spinner / không có? | Không quy định | UX | Open |
| Q19 | Toast T06 "Báo cáo đã được lập" có áp dụng cho UC này khi cùng dự án + cùng năm đã có bản ghi? | T06 trong list-toast-messages.md có nhưng spec UC047-052 không reference | BA | Open |
| Q20 | Aggregation rule giữa UC047-052 và UC065-160 (FDI A.IV địa bàn)? | Cross-UC dependency chưa quy định | BA | Open |
| Q21 | CF_06 timeline action types detail cho UC này? | CF_06 ghi "Chưa xác định, sẽ được cập nhật sau" | BA | Open |
| Q22 | Naming convention chính xác cho file `.xlsx` export — `FDI-AIII2-[ID]_nam-YYYY_DA-XXX` đúng không? | Suy luận từ CF_04, chưa verify cho UC047-052 | BA | Open |
| Q23 | Empty state / Error state khi load DS lỗi server? | Không quy định | BA + UX | Open |

### 10.2 Dependencies

- **CMR common rules:** CMR_01, CMR_03, CMR_04, CMR_05, CMR_06, CMR_07, CMR_09, CMR_10, CMR_11, CMR_12, CMR_14, (CMR_15 nếu có table động), (CMR_17 nếu có upload — UC047-052 không có).
- **CMR pending định nghĩa:** CMR_08 (Period header), **CMR_16 (filter "Tất cả")**, **CMR_18 (Tab Navigation)**.
- **CF common functions:** CF_01, CF_02 (Import), CF_03, CF_04, CF_05, CF_06, CF_07, CF_07.1, CF_08, CF_09.
- **CS common screen logic:** CS_01 (Listing screen), CS_02 (No áp dụng — UC này là Periodic).
- **Toast/Alert/Inline/Popup codes:** T01, T02, T03, T04, T05, T06, T08, V01, V02, V03, V04, P01, P02, P04.
- **External UC dependencies:**
  - Module Cấu hình (UC chưa có spec — Q-012) — quyết định flow type (2-bước vs >2-bước).
  - UC065-160 (FDI A.IV địa bàn) — aggregate consumer của UC047-052 (Q20).
  - SCR-001 Dashboard NĐT — bị ảnh hưởng counter realtime (FLOW-004).
  - Admin Site Receive flow (FLOW-003) — Q-006 permission matrix Admin.
- **External API dependencies:**
  - API Master Data dự án (DS dự án thuộc TCKT) — bắt buộc cho Dropdown #51.
  - API IRC NĐT block (Tên + Mã định danh NĐT) — bắt buộc cho Phần B Block NĐT.
  - API GCNĐKĐT data (12 trường Phần A) — bắt buộc cho auto-fill (CMR_12).

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-19 | `qc-uc-read` (run-20260519-140000-chrisle3) | Initial first-audit. Score 66.9/100 = NOT READY. 18 cross-artefact conflicts identified. 23 open questions transferred to question backlog. |

---

# 📊 Audit Summary

## Audit Summary Table

> Knowledge area numbers map to template sections: #1→§0 · #2→§1 · #3→§2 · #4→§3 · #5→§4 · #6→§5 · #7→§6 · #8→§7 · #9→§8 · #10→§9

| # | Knowledge Area | Max Pts | Score | Status |
| --- | --- | ---: | ---: | --- |
| 1 | Feature Identity | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 9/10 | ✅ Complete |
| 4 | Preconditions & Postconditions | 10 | 6/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 13/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 15/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 20 | 13/20 | ⚡ Partial |
| 9 | Acceptance Criteria | 20 | 8/20 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 0/5 | ⚠️ Missing |
| **Total** | | **130** | **87/130 → 66.9/100** | ❌ **NOT READY** |

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q1 | **High** | `CMR_common_business_rules.md` v1.8 — CMR_08 ghi "*(Chưa định nghĩa — Chờ BA xác nhận)*"; UC047-052.1 §2 #6 reference CMR_08 cho Period header | **CMR_08 (Quy tắc hiển thị Kỳ hạn báo cáo) chưa định nghĩa.** Cần BA quy định tên kỳ, định dạng hiển thị "Năm YYYY", logic nhóm. | Khối test display name kỳ; ảnh hưởng AC-UI và filter behavior toàn DS | Open |
| Q2 | **High** | UC047-052.1 §2 #2 "Trạng thái kỳ ... Tham chiếu: CMR_04, CMR_07., CMR_16"; UC047-052.1 §2 #3, #4 cũng reference CMR_16 | **CMR_16 (filter dropdown phải có option "Tất cả") referenced nhưng KHÔNG TỒN TẠI trong common rules.** Cần BA bổ sung CMR_16 vào `CMR_common_business_rules.md`. | Blocker test filter Multi-Dropdown "Tất cả" behavior; ảnh hưởng AC-FUNC-16 và CMR_07 multi-choice | Open |
| Q3 | **High** | UC047-052.1 §3 "Tham chiếu: CF_01, CMR_18" + UC047-052.2 §3 reference CMR_18 | **CMR_18 (Tab Navigation) referenced nhưng KHÔNG TỒN TẠI trong common rules.** Cần BA bổ sung CMR_18. | Tab navigation behavior trong form Lập báo cáo thiếu rule chuẩn — đặc biệt khi báo cáo gộp (nhưng UC047-052 là báo cáo đơn lẻ, vẫn cần rule rõ ràng) | Open |
| Q4 | **High** | Spec UC047-052.2 §2 PHẦN HEADER (history v1.7 2026-05-15: "Read-only, auto-fill từ kỳ hạn, không cho phép sửa trên form") vs F113 vẽ Yearpicker editable với value "2025" | **Năm báo cáo trên form Lập là Read-only hay Editable?** | Quyết định behavior chính cho form — ảnh hưởng AC-FUNC-13 (validate năm); nếu Read-only thì AC-FUNC-13 vô nghĩa | Open |
| Q5 | **High** | Spec UC047-052.1 §2 #3 "Dự án | Dropdown/Search ... Lọc theo dự án cụ thể" vs wireframe G1 chỉ có 4 filter (Năm/Trạng thái kỳ/Trạng thái báo cáo/Search Mã) | **Filter "Dự án" có cần thêm vào DS không? Wireframe G1 thiếu — cần update UX hay xóa khỏi spec?** | Blocker AC-UI-02; ảnh hưởng test filter coverage | Open |
| Q6 | **Medium** | Spec UC047-052.1 §3 "Tất cả cột có kiểu dữ liệu Ngày... hoặc kiểu dữ liệu Số đều hiển thị icon Sort trên header cột" vs G1 không vẽ sort icon trên cột Mã / Ngày cập nhật | **Sort icon trên cột Mã báo cáo + Ngày cập nhật có cần thêm vào wireframe không?** | Blocker AC-UI-06 / AC-FUNC-18 | Open |
| Q7 | **High** | Spec change log 2026-05-18 v2.1 "Thuật ngữ nút bấm: Export/Import → Xuất báo cáo/Nhập từ file"; F113 vẽ "Gửi báo cáo" + G1 vẽ "Import"/"Export" | **Button label final cho 3 button: Import vs Nhập từ file / Export vs Xuất báo cáo / Gửi báo cáo vs Nộp báo cáo. Wireframe cần update không?** | Blocker AC-UI-04 / AC-UI-05 + test assertion label — high impact với button primary action | Open |
| Q8 | **Medium** | Spec UC047-052.2 §2 PHẦN A #13 Email "Validate format email (phải chứa @ và domain)" — không có wording lỗi cụ thể; `list-toast-messages.md` không có entry cho email | **Email validation error message exact wording?** | Blocker AC-FUNC; test inline lỗi không có expected text | Open |
| Q9 | **Medium** | Spec UC047-052.2 §2 PHẦN A #12 Số điện thoại "Cho phép sửa. RULE-02." — không quy định pattern/format | **Số điện thoại có pattern không? (10-11 chữ số leading 0 cho VN, hay tự do, hay quốc tế?)** | Blocker test SĐT validation; có thể bug khi user nhập tự do | Open |
| Q10 | **Medium** | G1 hiển thị 3 status chip với 3 màu (blue/green/yellow); spec không nêu màu | **Period status chip color code chính thức?** | Blocker test color accessibility (WCAG); cần đồng bộ với hệ thống design tokens | Open |
| Q11 | **Medium** | Spec UC047-052.1 §3 "Hệ thống nhóm danh sách theo Kỳ hạn (năm), mặc định collapse" vs G1 vẽ 3 kỳ đều Expanded | **Period accordion default state: Collapse hay Expanded?** | Blocker AC-UI-03 + test load DS UX | Open |
| Q12 | **Medium** | Spec UC047-052.2 Phần B mục VII.5 ghi "Tự ghi" cho cột Đơn vị tính + ghi chú "Textbox tự do cho tên ĐVT"; F113 không vẽ textbox này | **VII.5 textbox tự ghi tên ĐVT render thế nào trên Grid? Width? Editable luôn hay sau khi nhập số?** | Blocker AC-UI-07 + test mục VII.5 | Open |
| Q13 | **Low** | Spec UC047-052.2 PHẦN A #2-#10 ghi "Label" trong cột Kiểu; F113 vẽ Text input boxed với value | **PHẦN A #2-#10 render visually là Label (text only) hay Boxed text input Disabled? Behavior khác nhau không?** | Test assertion type element; có thể chỉ là styling nhưng cần rõ ràng | Open |
| Q14 | **Low** | Spec PHẦN A #9 "Ngày cấp lần đầu ĐKKD" vs F113 "Ngày cấp lần đầu" | **PHẦN A #9 label final: có "ĐKKD" hay không?** | Test assertion label | Open |
| Q15 | **Low** | Spec PHẦN A #10 "Cơ quan cấp ĐKKD" vs F113 "Cơ quan cấp đăng ký kinh doanh" | **PHẦN A #10 label final: viết tắt "ĐKKD" hay đầy đủ "đăng ký kinh doanh"?** | Test assertion label | Open |
| Q16 | **Low** | Spec PHẦN C placeholder vs F113 placeholder (khác phần prefix "Nhập…"); section header F113 thêm "(NẾU CÓ)" không có trong spec | **PHẦN C placeholder + section header final wording?** | Test assertion placeholder text | Open |
| Q17 | **Medium** | Spec UC047-052.3 §2 #7 "Xóa" visible khi "Lưu nháp **VÀ** chưa từng nộp"; G1 row Lưu nháp không hiển thị [Xóa] (có thể row đã từng nộp); thiếu wireframe state Lưu nháp + chưa nộp | **Wireframe có cần thêm state hiển thị nút [Xóa] không? Visual layout cột Hành động khi có 7 button (vs G1 hiện 6 button)?** | Blocker AC-FUNC-14 / AC-FUNC-15 + test [Xóa] visibility | Open |
| Q18 | **Medium** | Spec UC047-052 không quy định loading state cho load DS hay save draft / submit | **Loading state UI: skeleton (DS), spinner (button submit), progress bar, hay không có?** | Blocker test UX perceived performance | Open |
| Q19 | **Medium** | `list-toast-messages.md` T06 "Báo cáo đã được lập / Báo cáo cho [Phạm vi] đã chọn đã được lập bởi [Tên người lập]" — UC047-052 không reference T06 | **T06 có áp dụng cho UC047-052 không (khi cùng dự án + cùng năm đã có bản ghi)? Hay cho phép TCKT lập nhiều BC trong 1 năm cho 1 dự án?** | Test data setup; ảnh hưởng concurrency/duplicate behavior | Open |
| Q20 | **Medium** | UC047-052 là BC theo dự án; UC065-160 FDI A.IV là BC địa bàn (aggregate) | **Aggregation rule giữa UC047-052 và UC065-160 (FDI A.IV)? Khi nào aggregate? Field nào được consume?** | Cross-UC dependency cho integration test; có thể block test UC065-160 | Open |
| Q21 | **Medium** | `CF_common_functions.md` CF_06 ghi "Chi tiết cấu trúc timeline và các loại hành động: Chưa xác định, sẽ được cập nhật sau." | **CF_06 timeline action types detail cho UC047-052?** | Blocker AC-INT-02 và test Audit Trail | Open |
| Q22 | **Low** | Suy luận từ CF_04 naming convention `[Mã-BC]_[Kỳ]_[Mã-DA]` | **Naming chính xác file `.xlsx` export cho UC047-052: `FDI-AIII2-[ID]_nam-YYYY_DA-XXX` đúng không?** | Test assertion file name | Open |
| Q23 | **Medium** | Spec UC047-052.1 không quy định Empty/Error state khi load DS lỗi server | **Empty/Error state khi load DS lỗi server (vd: Toast T05 + retry button hay full-page error)?** | Test exception flow | Open |
| Q24 | **Low** | `qc-site-map.md` §5.3 + §8.2 ghi UC047-052 Wireframe = "—" nhưng folder thực tế có 2 PNG | **Site-map cần update: UC047-052 Wireframe = ✅ (2 PNG có sẵn).** | Site-map sync; không phải UC content gap nhưng ảnh hưởng `qc-dashboard-sync` | Open |
| Q25 | **Low** | Spec UC047-052.2 §2 PHẦN B mục 2 vẫn ghi "Tooltips: (2 = 2.a+2.b+2.c)" nhưng change log v1.9 (2026-05-15) ghi "Xóa tooltip — nội dung đã nằm trong vùng GHI CHÚ" | **Mục 2 Vốn vay có tooltip hay không? Spec table v2.0 còn dấu vết tooltip — cần làm sạch.** | Test inline UX tooltip behavior; minor inconsistency trong UC | Open |
| Q26 | **High** | NFR section completely missing trong UC | **Bổ sung NFR: Performance (response time targets), Security (RBAC, session, audit retention), Compatibility (browser matrix, breakpoint behavior web-responsive), Accessibility (WCAG AA), Print rules.** | Blocker test NFR; high risk cho hệ thống nhà nước (Q-005) | Open |
| Q27 | **Medium** | `Platform-specific gap (web-responsive)`: UC không nêu behavior tại breakpoint mobile/tablet/desktop; eForm Grid Phần B 30+ rows × 4 cột sẽ render thế nào trên mobile? URL deep-link / back-forward / refresh state preservation chưa nêu; print CSS chưa quy định | **Web-responsive behavior: breakpoint reflow eForm Grid, URL deep-link cho từng kỳ + filter, print view rules.** | Blocker test cross-device; potential UX regression khi user resize browser | Open |
| Q28 | **Medium** | UC SRS không có section Preconditions / Postconditions tường minh | **Bổ sung section Preconditions / Postconditions explicit để tester không phải suy luận từ CMR/CF.** | Tester setup test data; clarity audit | Open |
| Q29 | **Medium** | UC SRS không có section AC tường minh | **Bổ sung Acceptance Criteria (Given/When/Then) cho mỗi flow chính.** | Tester thiết kế TC; AC là nguồn chính cho test design | Open |
| Q30 | **Medium** | UC SRS không có section Out of scope tường minh | **Bổ sung section "Out of scope" để xác định ranh giới rõ ràng (Module Cấu hình, Admin Site Receive flow, các UC FDI A.III khác).** | Tránh test thừa scope | Open |

---

## 🟢 What's Good

UC047-052 là một SRS **trưởng thành**, đã qua **20+ vòng cập nhật** từ v1.0 → v2.1 (change log từ 2026-05-03 → 2026-05-18). Các điểm mạnh:

- **Feature Identity (KA #1, 5/5):** Metadata table đầy đủ — BA phụ trách, phân hệ, mẫu biểu, loại báo cáo, hình thức nộp, cơ quan nhận, đối tượng lập, mã báo cáo prefix `FDI_AIII2_`, phạm vi dữ liệu đầu vào.
- **Actors & Roles (KA #3, 9/10):** Phân quyền TCKT phụ trách vs NĐT thành viên rõ ràng qua CMR_01 + CS_01 §5 (icon ℹ️ tooltip); per-state permission qua CMR_03.
- **PHẦN B eForm Grid chi tiết hóa cao:** Bảng 13 mục I–XIII với cấu trúc phân cấp rõ; mỗi mục có Loại cell, Required, Cột (A)/(B), Đơn vị, công thức Auto-calc. Block NĐT VN/NN cấu trúc 6 row rõ. Phân biệt mục cho phép số âm (2, 3) vs ≥ 0.
- **Common rules tích hợp tốt:** Reference CMR_01/03/04/05/06/07/09/10/11/12/14 đầy đủ; CF_01/03/04/05/06/07/08/09 đầy đủ.
- **Decimal precision + Max length defaults + Nguyên tắc trách nhiệm API-sourced:** Spec UC047-052.2 §3 nêu rõ — chi tiết kỹ thuật thường thiếu đã được cover.
- **RULE-01 (USD ↔ Triệu VNĐ) + RULE-02 (đổi dự án xóa Phần B) + Rule 03 (validate năm):** Cross-field rules nêu rõ.
- **Change log chi tiết hóa cao** giúp QC track lịch sử thay đổi và phát hiện wireframe drift.

---

## 🧪 Testability Outlook

### What CAN be tested now

- **UI Inventory cho Form Lập báo cáo Phần A + Phần B + Phần C:** structure rõ, có thể design skeleton TC cho UI assertions (label, type, required, default).
- **Validation rules số (CMR_05) cho cell Phần B:** 5 chữ số thập phân, auto-round, ký tự hợp lệ, số ≥ 0 vs số âm — đủ thông tin design boundary value tests.
- **Permission tests (CMR_01):** TCKT thấy nút Tạo/Sửa/Xóa/Nộp, NĐT thành viên không thấy.
- **State machine tests (CMR_03):** Action button visibility theo trạng thái.
- **Period state tests (CMR_04):** Hiển thị/ẩn [Lập báo cáo]/[Nhập từ file] theo Chưa tới hạn / Trong thời hạn / Qua kỳ.
- **CF tests:** CF_01 (Lập), CF_03 (Chỉnh sửa), CF_04 (Export), CF_05 (Print), CF_07 (Xem), CF_08 (Xóa với lifecycle lock), CF_09 (Nộp từ listing) — reference rõ.
- **Lưu nháp Case 1 + Nộp validate + Popup P01 confirm:** CF_01 logic rõ.
- **Auto-calc Σ realtime:** mục I, 1, 1.1, 1.2, 2, V — formulas rõ.
- **Dropdown auto-fill API behavior (CMR_12 v1.4):** 4 trạng thái lifecycle rõ.

### What CANNOT be tested yet (blocked by gaps)

- **Filter "Dự án":** chưa rõ có trong UI hay không (CONF-02 / Q5).
- **Sort column behavior:** chưa rõ có triển khai hay không vì wireframe thiếu (CONF-04 / Q6).
- **Period header wording + Color code:** CMR_08 chưa định nghĩa (Q1) + Q10.
- **Filter "Tất cả" option:** CMR_16 chưa tồn tại (Q2).
- **Tab Navigation behavior:** CMR_18 chưa tồn tại (Q3).
- **Năm báo cáo header behavior:** Read-only vs Editable chưa quyết (Q4 / CONF-08).
- **Button label final:** 3 button có conflict label (Q7 / CONF-05/06/13).
- **Email + SĐT validation:** wording/pattern chưa quy định (Q8 / Q9).
- **VII.5 ĐVT tự ghi UI:** chưa rõ (Q12 / CONF-11).
- **[Xóa] visibility test cho state Lưu nháp + chưa nộp:** wireframe thiếu (Q17).
- **Loading/Error state:** chưa quy định (Q18 / Q23).
- **NFR (Performance / Security / Compatibility / Accessibility):** toàn bộ missing (Q26).
- **Web-responsive breakpoint behavior + URL state + Print rules:** missing (Q27).
- **Lifecycle Log action types detail (CF_06):** chưa quy định (Q21).
- **Cross-UC aggregate vào FDI A.IV (UC065-160):** chưa rõ (Q20).
- **Flow type cho FDI A.III.2 (2-bước vs >2-bước):** phụ thuộc Module Cấu hình (Q-012).

### Suggested test focus areas *(once gaps are resolved)*

- **Happy path** (dựa Section 5 Object Attributes):
  - UC047-052.1: Load DS với Năm hiện tại → Expand period Trong thời hạn → Click [Lập báo cáo] → form trống.
  - UC047-052.2: Chọn dự án → API auto-fill → nhập đủ Phần B → Click [Nộp báo cáo] → P01 confirm → trạng thái Chờ duyệt/Đã tiếp nhận.
  - UC047-052.3: Mở [Xem chi tiết] → [In] → [Xuất báo cáo].
- **Alternative scenarios:**
  - Lưu nháp với chỉ chọn dự án (Case 1 CF_01) → bản ghi Lưu nháp.
  - Chỉnh sửa từ trạng thái YC chỉnh sửa → Lưu nháp giữ trạng thái YC.
  - Đổi dự án sau khi đã nhập Phần B → popup RULE-02.
  - Dự án cấp bằng VNĐ → đổi label đơn vị USD → Triệu VNĐ (RULE-01).
  - API auto-fill thất bại → Toast T05 + Enable nhập tay (CMR_12).
- **Boundary & validation tests:**
  - CMR_05 boundary: số thập phân nhập > 5 chữ số → auto-round; ký tự không hợp lệ → V02; số âm cho mục ≥ 0 → V03; format sai → V04.
  - Max length: Text 500, Textarea 2000, Number 20, Search 200.
  - Năm báo cáo: 1986 (lỗi) / 1987 (OK) / Năm BC < Năm cấp GCNĐKĐT (lỗi Rule 03).
- **Error & exception scenarios:**
  - Server fail khi Save/Submit → Toast T05; form data giữ nguyên.
  - Trường bắt buộc trống khi Nộp → V01 inline tại từng trường + scroll/focus vào trường lỗi đầu (CF_09).
  - Lưu nháp khi tất cả trường trống → Toast T07 (Case 2 — không áp dụng UC này) HOẶC V01 #51 (Case 1).
  - Popup confirm P01 — [Xác nhận] Disabled khi checkbox chưa tích.
  - Dirty form guard P02 khi [Hủy] + form dirty (CMR_14).
- **UI-specific checks** (dựa wireframe):
  - Sidebar G1 layout, Filter bar layout, Period accordion expand/collapse, Table column headers (sort icon visibility), Pagination CMR_10.
  - Form Lập F113 layout, 4 buttons primary/secondary distinction, Block NĐT lặp theo số NĐT từ API, eForm Grid 2 cột scroll behavior.
  - Color code status chip (blue/green/yellow — Q10).
  - Tooltip ℹ️ hover trên I, 1, V.

---

## 📌 Summary & Recommendation

**Tổng quan:** UC047-052 SRS hiện ở mức **trưởng thành về nội dung function** nhưng **lệch nhiều điểm so với wireframe** và **thiếu hỗ trợ từ common rules** (CMR_08 chưa định nghĩa, CMR_16/18 không tồn tại). Score chuẩn hóa **66.9/100** — dưới ngưỡng CONDITIONALLY READY 0.1 điểm — verdict **NOT READY**.

**Các blocker High priority cần BA fix trước khi pass:**

1. **Định nghĩa CMR_08, CMR_16, CMR_18** trong `CMR_common_business_rules.md` (Q1-Q3) — 3 rule chung referenced trong UC nhưng thiếu.
2. **Đồng bộ wireframe G1 + F113 với spec v2.1** (Q4-Q7, Q11, Q14-Q16): label nút, filter Dự án, sort icon, Năm BC read-only, accordion default state, PHẦN A label, PHẦN C placeholder.
3. **Bổ sung Out of scope (Q30), Preconditions / Postconditions explicit (Q28), Acceptance Criteria (Q29) sections** vào UC SRS.
4. **Bổ sung NFR section** đầy đủ 5 categories (Q26).
5. **Định nghĩa Email + SĐT validation wording** (Q8, Q9).
6. **Định nghĩa cross-UC aggregation rule** với UC065-160 FDI A.IV (Q20).
7. **Web-responsive behavior + URL state + Print rules** (Q27).
8. **Loading/Error state cho DS load + Save/Submit** (Q18, Q23).
9. **CF_06 timeline action types** (Q21).
10. **Wireframe state Lưu nháp + chưa nộp để verify [Xóa] button visible** (Q17).

**Khuyến nghị:** **Hold UC047-052 đến khi BA hoàn thành các blocker High priority (10 items)** + UX cập nhật 2 wireframe khớp spec v2.1. Trong thời gian chờ, QC có thể chuẩn bị **skeleton TC** cho phần đã rõ (CMR/CF reference, Phần A/B structure, validation số CMR_05, permission CMR_01). Sau khi resolve gap, re-run `qc-uc-read` để generate v2 và verify Score ≥ 70.

---

*Generated by `qc-uc-read` skill · Run: run-20260519-140000-chrisle3 · 2026-05-19*
