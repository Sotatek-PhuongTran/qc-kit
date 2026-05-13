# BÁO CÁO ĐÁNH GIÁ ĐỘ SẴN SÀNG YÊU CẦU — UC69

**Tiêu đề:** UC69 — Tra cứu văn bản pháp luật trên Mobile  
**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Review Agent  
**Phiên bản:** v1  
**Verdict:** ⚡ **CONDITIONALLY READY** — 84.5 / 100

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity (title, ID, context) | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 5/5 | ✅ |
| 3 | Actors & User Roles | 10 | 9/10 | ⚡ |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ⚡ |
| 5 | UI Object Inventory & Mapping | 15 | 14/15 | ⚡ |
| 6 | Object Attributes & Behavior Definition | 20 | 15/20 | ⚡ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 17/20 | ⚡ |
| 8 | Functional Integration Analysis | 10 | 7/10 | ⚡ |
| 9 | Acceptance Criteria | 10 | 9/10 | ⚡ |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ |
| **Total** | | **110** | **93/110** | **→ 84.5/100** |

**Raw Score:** 93 / 110  
**Final Score:** round((93 / 110) × 100, 1) = **84.5 / 100**

**Verdict:** ⚡ **CONDITIONALLY READY** — QA có thể bắt đầu thiết kế test case cho các phần rõ ràng; các mục flagged cần được giải quyết song song.

---

## Section 0 — Feature Identity (5/5) ✅

| Tiêu chí | Status | Ghi chú |
|---|---|---|
| Tên chức năng | ✅ | "Tra cứu văn bản pháp luật trên Mobile" |
| UC ID | ✅ | UC69 |
| Phân hệ | ✅ | Ứng dụng Di động (Mobile App) |
| Vị trí trong hệ thống | ✅ | Truy cập từ Quick Access hoặc Sidebar |
| Phiên bản & ngày tạo | ✅ | v1, 06/05/2026 |

---

## Section 1 — Objective & Scope (5/5) ✅

| Tiêu chí | Status | Ghi chú |
|---|---|---|
| Mục tiêu chức năng | ✅ | Cho phép tra cứu, xem danh sách và chi tiết văn bản pháp luật liên quan đến đầu tư |
| Phạm vi trong (In-scope) | ✅ | Tìm kiếm, lọc, xem danh sách, xem chi tiết, tải văn bản, xem PDF |
| Phạm vi ngoài (Exclusions) | ✅ | Rõ ràng: không bao gồm chỉnh sửa, chia sẻ, bookmark |

---

## Section 2 — Actors & User Roles (9/10) ⚡

| Tiêu chí | Status | Ghi chú |
|---|---|---|
| Đối tượng thực hiện | ✅ | Cá nhân / Tổ chức |
| Phân quyền | ✅ | Đã đăng nhập, hai nhóm có cùng hành vi |
| Hành vi khác biệt giữa roles | ⚡ | Tài liệu ghi "không có sự phân biệt" nhưng không nêu rõ liệu có role nào bị hạn chế truy cập UC69 hay không (VD: role Admin, role Guest) |

---

## Section 3 — Preconditions & Postconditions (9/10) ⚡

| Tiêu chí | Status | Ghi chú |
|---|---|---|
| Preconditions | ✅ | Đã đăng nhập + có kết nối mạng |
| Postconditions | ✅ | Hiển thị danh sách hoặc chi tiết văn bản |
| Hành vi khi chưa đăng nhập | ⚡ | Ghi "không thể truy cập" nhưng không mô tả cụ thể hành vi (redirect? ẩn menu? hiển thị thông báo?) |

---

## Section 4 — UI Object Inventory & Mapping (14/15) ⚡

### Màn hình Danh sách

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 1 | Nút Quay lại (←) | Button (Icon) | ✅ | ✅ | CMR-06 |
| 2 | Tiêu đề Header "Văn bản pháp luật" | Label | ✅ | ✅ | |
| 3 | Ô tìm kiếm | Textbox (Search) | ✅ | ✅ | CMR-01 |
| 4 | Nút Lọc (Filter icon) | Button (Icon) | ✅ | ✅ | CMR-02 |
| 5 | Radio Group (Số hiệu, Trích yếu / Toàn văn) | Radio Group | ✅ | ✅ | |
| 6 | Danh sách Card văn bản | List Card | ✅ | ✅ | CMR-04 |
| 7 | Tag Loại văn bản | Chip | ✅ | ✅ | |
| 8 | Tag Trạng thái | Chip | ✅ | ✅ | CMR-05 |
| 9 | Tên văn bản | Label (H2) | ✅ | ✅ | |
| 10 | Ngày tháng (Ban hành / Hiệu lực) | Label | ✅ | ✅ | |
| 11 | Cơ quan ban hành | Label | ✅ | ✅ | |
| 12 | Nút "Xem chi tiết →" | Button (Outline) | ✅ | ✅ | |
| 13 | Nội dung toàn văn (khi chọn radio Toàn văn) | Box Text | ✅ | ✅ | |

### Bottom Sheet Bộ lọc

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 1 | Nút Đóng (X) | Button (Icon) | ✅ | ✅ | |
| 2 | Cơ quan ban hành | Textbox (Search) | ✅ | ✅ | |
| 3 | Khoảng ngày ban hành | Date Range Picker | ✅ | ✅ | CMR-15 |
| 4 | Loại văn bản | Dropdown (Single) | ✅ | ✅ | |
| 5 | Lĩnh vực | Dropdown (Single) | ✅ | ✅ | |
| 6 | Đơn vị soạn thảo | Dropdown (Single) | ✅ | ✅ | |
| 7 | Trạng thái | Dropdown (Single) | ✅ | ✅ | |
| 8 | Nút "Nhập lại" | Button (Outline) | ✅ | ✅ | |
| 9 | Nút "Áp dụng" | Button (Primary) | ✅ | ✅ | |

### Màn hình Chi tiết

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 1 | Header "Chi tiết văn bản" | Label + Button | ✅ | ✅ | |
| 2 | Tên văn bản | Label (H1) | ✅ | ✅ | |
| 3 | Danh sách thuộc tính chi tiết | List Attribute | ✅ | ✅ | |
| 4 | Nút "Tải văn bản" | Button (Primary) | ✅ | ✅ | CMR-08 |
| 5 | Nút "Xem PDF" | Button (Outline) | ✅ | ✅ | CMR-08 |
| 6 | Mục lục văn bản | Accordion | ✅ | ✅ | |
| 7 | Nội dung toàn văn | Scrollable Content | ✅ | ✅ | |
| 8 | Khối Văn bản liên quan | List Item | ✅ | ✅ | |

### CMR Cross-Check

| CMR | Áp dụng? | Status | Ghi chú |
|---|---|---|---|
| CMR-01 (Search) | ✅ | ✅ | Debounce 3s, state persistence, tìm gần đúng |
| CMR-02 (Filter) | ✅ | ⚠️ Partial | UC không đề cập **Active filter indicator** (icon xanh lá khi có filter active) — CMR-02 yêu cầu |
| CMR-03 (Dropdown) | ✅ | ⚡ Partial | UC không nêu rõ dropdown trong bộ lọc có searchable hay không |
| CMR-04 (Lazy Load) | ✅ | ✅ | 20 bản ghi/lần, infinite scroll |
| CMR-05 (Badge) | ✅ | ✅ | Badge read-only |
| CMR-06 (Header) | ✅ | ✅ | Nút quay lại, tiêu đề |
| CMR-07 (Error) | ✅ | ✅ | Lỗi mạng, timeout, 404 |
| CMR-08 (File Viewer) | ✅ | ✅ | Xem PDF, tải DOC/DOCX |
| CMR-13 (Pull to Refresh) | ✅ | ✅ | Có đề cập |
| CMR-14 (Empty State) | ✅ | ✅ | Phân biệt no data vs no result |
| CMR-15 (Date Range) | ✅ | ⚡ Partial | UC có Date Range Picker nhưng không mô tả validation rule chi tiết (chỉ chọn 1 ngày?) |
| CMR-17 (Multi-language) | ✅ | ⚡ Partial | UC không đề cập hành vi đa ngôn ngữ |
| CMR-18 (Debounce Nav) | ✅ | ✅ | Debounce rapid tap đã mô tả |

---

## Section 5 — Object Attributes & Behavior Definition (15/20) ⚡

### Interaction Matrix — Màn hình Danh sách

| Object | Default State | Tap Action | System Response |
|---|---|---|---|
| Nút Quay lại (←) | Enabled | Tap | Quay về màn hình trước (CMR-06) |
| Ô tìm kiếm | Enabled, placeholder | Nhập text | Debounce 3s → gọi API tìm kiếm |
| Nút Lọc | Enabled | Tap | Mở Bottom Sheet bộ lọc |
| Radio "Số hiệu, Trích yếu" | Selected (default) | Tap | Chuyển phạm vi, reset trang đầu |
| Radio "Toàn văn" | Unselected | Tap | Hiển thị thêm block toàn văn trong card |
| Card văn bản | Enabled | Tap card hoặc nút "Xem chi tiết" | Navigate đến Chi tiết (debounce rapid tap) |
| Pull to Refresh | — | Kéo xuống | Reload danh sách (CMR-13) |
| Infinite Scroll | — | Cuộn đến cuối | Tải thêm 20 bản ghi (CMR-04) |

### Interaction Matrix — Bottom Sheet Bộ lọc

| Object | Default State | Tap Action | System Response |
|---|---|---|---|
| Nút Đóng (X) | Enabled | Tap | Đóng Bottom Sheet, không áp dụng |
| Tap ngoài vùng | — | Tap | Đóng Bottom Sheet, không áp dụng |
| Back vật lý (Android) | — | Nhấn | Đóng Bottom Sheet (không thoát màn hình) |
| Cơ quan ban hành | Enabled, placeholder | Nhập text | Tìm kiếm gần đúng khi Áp dụng |
| Khoảng ngày ban hành | Enabled, placeholder | Tap | Mở Date Picker (CMR-15) |
| Dropdown Loại VB / Lĩnh vực / Đơn vị / Trạng thái | "Tất cả..." | Tap | Mở danh sách chọn (single select) |
| Nút "Nhập lại" | Enabled | Tap | Reset tất cả field về mặc định |
| Nút "Áp dụng" | Enabled | Tap | Đóng Bottom Sheet, tải lại danh sách |

### Interaction Matrix — Màn hình Chi tiết

| Object | Default State | Tap Action | System Response |
|---|---|---|---|
| Nút Quay lại | Enabled | Tap | Quay về danh sách (giữ state) |
| Nút "Tải văn bản" | Enabled / Hidden (nếu không có file) | Tap | Tải DOC/DOCX → Toast thành công |
| Nút "Xem PDF" | Enabled / Hidden (nếu không có file) | Tap | Mở PDF trên trình duyệt thiết bị |
| Mục lục (Accordion) | Collapsed | Tap tiêu đề | Expand danh sách mục lục |
| Item mục lục | Enabled | Tap | Scroll đến đoạn tương ứng + collapse mục lục |
| Item Văn bản liên quan | Enabled | Tap | Navigate đến chi tiết VB liên quan |

### Edge Case Checklist

**Group A — Extreme Data States:**

| Edge Case | UC Coverage | Gap? |
|---|---|---|
| Tên văn bản quá dài | ✅ Tối đa 2 dòng + "..." | Không |
| Giá trị null | ✅ Hiển thị "-" | Không |
| Danh sách rỗng (0 items) | ✅ CMR-14 "Không có dữ liệu" / "Không tìm thấy kết quả" | Không |
| Nội dung toàn văn rất dài | ⚡ Scroll trong block, không giới hạn chiều cao — nhưng không nêu performance concern | Gap nhỏ |
| Số hiệu văn bản rất dài | ⚠️ Không đề cập truncate rule cho trường "Số ký hiệu" | Gap |

**Group B — Network & API States:**

| Edge Case | UC Coverage | Gap? |
|---|---|---|
| API chậm (loading) | ✅ Skeleton loading cho chi tiết | Không |
| Partial API failure | ✅ Xử lý độc lập từng block | Không |
| Mất mạng | ✅ CMR-07 + nút Thử lại | Không |
| Timeout | ✅ CMR-16 (10 giây) | Không |
| Loading state cho danh sách (first-load) | ⚠️ UC chỉ đề cập skeleton cho chi tiết, không nêu loading state cho danh sách first-load | Gap |

**Group C — Abnormal User Interactions:**

| Edge Case | UC Coverage | Gap? |
|---|---|---|
| Rapid tap "Xem chi tiết" | ✅ Debounce, chỉ navigate 1 lần | Không |
| Screen rotation | ⚠️ Không đề cập | Gap |
| Back vật lý (Android) khi Bottom Sheet mở | ✅ Đóng Bottom Sheet | Không |
| Back vật lý khi ở Chi tiết VB liên quan | ✅ Quay về chi tiết gốc | Không |

**Group D — Permissions & Session:**

| Edge Case | UC Coverage | Gap? |
|---|---|---|
| Session expire | ✅ Tham chiếu UC1, redirect đăng nhập | Không |
| Force close | ✅ Quay về Trang chủ, giữ session | Không |
| Uninstall/reinstall | ✅ Yêu cầu đăng nhập lại | Không |

**Group E — Internationalization (i18n):**

| Edge Case | UC Coverage | Gap? |
|---|---|---|
| Đa ngôn ngữ | ⚠️ UC không đề cập hành vi khi đổi ngôn ngữ | Gap (CMR-17 áp dụng) |

---

## Section 6 — Functional Logic & Workflow Decomposition (17/20) ⚡

### Function 1: Xem danh sách văn bản pháp luật

**MAIN FLOW (Happy Path):**
1. Người dùng truy cập "Văn bản pháp luật" từ Quick Access hoặc Sidebar
2. Hệ thống hiển thị loading state
3. API trả về danh sách → Hiển thị danh sách card, sắp xếp theo ngày ban hành mới nhất
4. Mặc định radio "Số hiệu, Trích yếu" được chọn
5. Cuộn xuống → Lazy load 20 bản ghi/lần

**ALTERNATIVE FLOWS:**
- [Alt-1] Chọn radio "Toàn văn" → Hiển thị thêm block nội dung toàn văn trong mỗi card, reset trang đầu, giữ keyword + bộ lọc
- [Alt-2] Pull to Refresh → Reload toàn bộ danh sách từ đầu

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Mất mạng → "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại"
- [Err-2] Timeout (>10s) → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại"
- [Err-3] API 500 → "Hệ thống đang bận. Vui lòng thử lại sau."

**BUSINESS RULES:**
- BR-01: Sắp xếp mặc định theo ngày ban hành mới nhất
- BR-02: Lazy load 20 bản ghi/lần (CMR-04)
- BR-03: Tất cả trạng thái hiệu lực đều cho phép xem card bình thường

**UI/UX FEEDBACK:**
- Loading state: Full-screen loading cho first-load (CMR-07 v1.1)
- Loading indicator: Spinner cuối danh sách khi lazy load
- Empty state: "Không có dữ liệu." (CMR-14)

### Function 2: Tìm kiếm văn bản

**MAIN FLOW (Happy Path):**
1. Người dùng nhập từ khóa vào ô tìm kiếm
2. Debounce 3 giây → Hệ thống gọi API tìm kiếm gần đúng theo tên văn bản
3. Kết quả hiển thị, kết hợp phạm vi radio đang chọn

**ALTERNATIVE FLOWS:**
- [Alt-1] Xóa hết từ khóa → Danh sách trở về mặc định
- [Alt-2] Kết hợp bộ lọc → Kết quả thỏa cả hai điều kiện (CMR-01)

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Không tìm thấy → "Không tìm thấy kết quả." (CMR-14)
- [Err-2] Timeout → Thông báo lỗi + nút Thử lại

**BUSINESS RULES:**
- BR-04: Tìm kiếm gần đúng (chứa từ khóa), không yêu cầu chính xác
- BR-05: Debounce 3 giây (CMR-01)
- BR-06: Giới hạn 500 ký tự (CMR-01 v1.1)
- BR-07: State Persistence — quay lại từ chi tiết giữ nguyên trạng thái

### Function 3: Bộ lọc tìm kiếm

**MAIN FLOW (Happy Path):**
1. Tap icon Lọc → Mở Bottom Sheet
2. Người dùng chọn/nhập các tiêu chí lọc
3. Tap "Áp dụng" → Đóng Bottom Sheet, tải lại danh sách với điều kiện lọc

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap "Nhập lại" → Reset tất cả field về mặc định, giữ Bottom Sheet mở
- [Alt-2] Tap ngoài / Đóng (X) / Back vật lý → Đóng không áp dụng

**BUSINESS RULES:**
- BR-08: Bộ lọc kết hợp với ô tìm kiếm (CMR-01)
- BR-09: Dropdown mặc định "Tất cả [tên trường]"
- BR-10: Trạng thái là list tĩnh, các dropdown khác lấy từ API

| Field | Data Type | Required? | Min | Max | Format |
|---|---|---|---|---|---|
| Cơ quan ban hành | Text | Không | — | ⚠️ Không rõ | Tìm gần đúng |
| Khoảng ngày ban hành | Date Range | Không | — | — | DD/MM/YYYY (CMR-12) |
| Loại văn bản | Dropdown | Không | — | — | Single select, từ API |
| Lĩnh vực | Dropdown | Không | — | — | Single select, từ API |
| Đơn vị soạn thảo | Dropdown | Không | — | — | Single select, từ API |
| Trạng thái | Dropdown | Không | — | — | Single select, list tĩnh |

### Function 4: Xem chi tiết văn bản

**MAIN FLOW (Happy Path):**
1. Tap card hoặc nút "Xem chi tiết" (debounce rapid tap)
2. Hệ thống hiển thị Skeleton loading
3. API trả về → Hiển thị thông tin chi tiết đầy đủ
4. Mục lục mặc định collapsed, nội dung toàn văn scroll trong block

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap mục lục → Expand → Tap item → Scroll đến đoạn tương ứng + collapse mục lục
- [Alt-2] Tap "Văn bản liên quan" → Navigate đến chi tiết VB đó → Back → Quay về chi tiết gốc

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Partial API failure → Block lỗi hiển thị thông báo riêng, block khác bình thường
- [Err-2] File đính kèm bị lỗi/mất → Toast "Nội dung không tồn tại hoặc đã bị xóa."

**BUSINESS RULES:**
- BR-11: Tất cả trường null → hiển thị "-"
- BR-12: Nút "Tải văn bản" / "Xem PDF" ẩn nếu không có file tương ứng
- BR-13: Ngày hiển thị DD/MM/YYYY (CMR-12)
- BR-14: Badge trạng thái read-only (CMR-05)

**UI/UX FEEDBACK:**
- Loading state: Skeleton loading
- Toast thành công: "Tải văn bản thành công."
- Toast lỗi: "Nội dung không tồn tại hoặc đã bị xóa."

---

## Section 7 — Functional Integration Analysis (7/10) ⚡

### Impact Analysis

| Chức năng nguồn | Chức năng đích | Ảnh hưởng | Status |
|---|---|---|---|
| Tìm kiếm + Bộ lọc | Danh sách | Kết quả danh sách thay đổi theo điều kiện | ✅ Rõ ràng |
| Chuyển Radio | Danh sách | Reset trang đầu, giữ keyword + bộ lọc | ✅ Rõ ràng |
| Danh sách → Chi tiết | State Persistence | Quay lại giữ nguyên trạng thái | ✅ Rõ ràng |
| Chi tiết → VB liên quan | Navigation stack | Back quay về chi tiết gốc | ✅ Rõ ràng |
| UC1 (Dashboard) → UC69 | Entry point | Quick Access / Sidebar | ✅ Tham chiếu |
| UC69 → Session (UC1) | Session expire | Redirect đăng nhập | ✅ Tham chiếu |
| Bộ lọc active → Icon filter | Active indicator | ⚠️ UC không đề cập indicator xanh lá (CMR-02) | Gap |
| Tải văn bản → Storage | Lưu file | ⚠️ Không nêu rõ vị trí lưu file, quyền storage | Gap |

### Data Consistency

| Scenario | Mô tả | Status |
|---|---|---|
| Sau khi Pull to Refresh | Danh sách cập nhật mới nhất | ✅ |
| Sau khi áp dụng bộ lọc | Danh sách phản ánh đúng tiêu chí | ✅ |
| Quay lại từ chi tiết | Giữ nguyên state (search, filter, scroll) | ✅ |
| Deep navigation (VB liên quan → VB liên quan) | ⚠️ Không nêu rõ giới hạn depth | Gap |

---

## Section 8 — Acceptance Criteria (9/10) ⚡

| AC | Mô tả | Testable? | Ghi chú |
|---|---|---|---|
| AC1 | Tìm kiếm realtime + phạm vi | ✅ | Rõ ràng, đo được |
| AC2 | Bottom Sheet bộ lọc 6 trường | ✅ | Rõ ràng |
| AC3 | Chi tiết format đúng | ✅ | DD/MM/YYYY, wrap, null → "-" |
| AC4 | Tải văn bản + Xem PDF | ✅ | Ẩn nút nếu không có file |
| AC5 | Văn bản liên quan | ✅ | Luôn hiển thị, rỗng → "Không có dữ liệu" |
| AC6 | Nội dung toàn văn scroll | ✅ | |
| AC7 | Mục lục collapse/expand/scroll | ✅ | |
| AC8 | Debounce 3 giây | ✅ | |
| AC9 | State Persistence | ✅ | |
| AC10 | Sắp xếp mặc định | ✅ | |
| AC11 | Chuyển radio reset trang | ✅ | |
| AC12 | Partial API failure | ✅ | |
| AC13 | Rapid tap debounce | ✅ | |

**Nhận xét:** AC đầy đủ và testable. Thiếu AC cho: Active filter indicator (CMR-02), loading state first-load danh sách, giới hạn 500 ký tự search (CMR-01 v1.1).

---

## Section 9 — Non-functional Requirements (3/5) ⚡

| NFR | Status | Ghi chú |
|---|---|---|
| Performance (timeout) | ✅ | CMR-16: 10 giây |
| Loading states | ⚡ | Skeleton cho chi tiết, nhưng không nêu rõ first-load danh sách |
| Security (session) | ✅ | Tham chiếu UC1, CMR-07 (401) |
| Accessibility | ⚠️ | Không đề cập |
| Compatibility (OS versions) | ⚠️ | Không đề cập iOS/Android minimum version |
| Offline behavior | ⚡ | Chỉ nêu lỗi mạng, không nêu cache offline |

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | Medium | "Nút Lọc" — Section 2.1, #4 | UC không đề cập **Active filter indicator** (icon xanh lá cây ở góc phải trên icon filter khi có filter active) theo CMR-02 v1.1. UC69 có áp dụng indicator này không? Nếu có, hành vi hiển thị/ẩn indicator như thế nào? | Ảnh hưởng đến test case kiểm tra trạng thái visual của icon filter. Nếu thiếu, tester không biết khi nào indicator xuất hiện/biến mất. | Open |
| Q2 | Medium | "Cơ quan ban hành" — Section 2.2, #2 | Trường "Cơ quan ban hành" trong bộ lọc có giới hạn ký tự tối đa không? (CMR-01 quy định 500 ký tự cho ô tìm kiếm, nhưng trường này là textbox trong bộ lọc, không phải ô search chính) | Cần xác định max length để thiết kế test case boundary. | Open |
| Q3 | Medium | "Dropdown" — Section 2.2, #4-6 | Các dropdown trong bộ lọc (Loại văn bản, Lĩnh vực, Đơn vị soạn thảo) có hỗ trợ **searchable** (nhập text để tìm trong dropdown) theo CMR-03 không? | Nếu có searchable, cần test thêm luồng nhập text trong dropdown. Nếu không, chỉ test tap chọn. | Open |
| Q4 | Low | "Phân quyền" — Section 1 | UC ghi "Cá nhân/Tổ chức có cùng hành vi". Có role nào khác (VD: Admin, Guest chưa xác thực) bị hạn chế truy cập UC69 không? Hay chỉ cần đăng nhập là đủ? | Cần xác định rõ để thiết kế test case phân quyền (positive + negative). | Open |
| Q5 | Low | "Preconditions" — Section 1 | Khi người dùng chưa đăng nhập cố truy cập UC69 (VD: deep link), hành vi cụ thể là gì? Redirect đến màn đăng nhập? Hiển thị thông báo? Hay ẩn hoàn toàn entry point? | Cần mô tả hành vi cụ thể để test negative case. | Open |
| Q6 | Medium | "Số ký hiệu" — Section 2.3, #3 | Trường "Số ký hiệu" trong chi tiết hiển thị font đậm, nhưng không nêu rule truncate/wrap khi giá trị quá dài. Hành vi khi số ký hiệu rất dài (VD: 50+ ký tự) là gì? Wrap xuống dòng hay truncate? | Ảnh hưởng đến layout chi tiết, cần test boundary cho trường này. | Open |
| Q7 | Medium | N/A (Missing) | UC không đề cập **loading state cho first-load màn hình danh sách**. CMR-07 v1.1 yêu cầu "first-load sử dụng loading state toàn màn hình". UC69 có áp dụng full-screen loading cho lần đầu vào danh sách không? | Cần xác nhận để test loading behavior đúng theo CMR-07 v1.1. | Open |
| Q8 | Low | N/A (Missing) | UC không đề cập hành vi khi người dùng **đổi ngôn ngữ** (CMR-17). Các label cứng trên UC69 (header, placeholder, button text, empty state message) có thay đổi theo ngôn ngữ không? | CMR-17 áp dụng cho tất cả UC. Cần xác nhận để test i18n. | Open |
| Q9 | Low | "Tải văn bản" — Section 2.3, #4 | Khi tap "Tải văn bản", file được lưu ở đâu trên thiết bị? App có yêu cầu quyền storage (Android) không? Trên iOS hành vi tải file như thế nào (Files app? Share sheet?)? | Cần biết vị trí lưu và quyền để test trên cả 2 platform. | Open |
| Q10 | Medium | "Văn bản liên quan" — Section 2.3, Khung VB liên quan | Khi tap vào văn bản liên quan → mở chi tiết VB đó → VB đó cũng có "Văn bản liên quan" → tap tiếp → ... Có giới hạn **depth** cho navigation stack không? Hay cho phép đi sâu vô hạn? | Ảnh hưởng đến memory/performance và test case navigation. Nếu vô hạn, cần test deep navigation. | Open |
| Q11 | Medium | "Khoảng ngày ban hành" — Section 2.2, #3 | CMR-15 quy định validation rule cho Date Range (chỉ chọn ngày bắt đầu → kết thúc = vô hạn; chỉ chọn kết thúc → bắt đầu = không giới hạn). UC69 có áp dụng đầy đủ CMR-15 không? Có cho phép chọn ngày tương lai không? | Cần xác nhận validation rule cụ thể để thiết kế test case boundary cho date range. | Open |
| Q12 | Low | N/A (Missing) | UC không đề cập hành vi khi **screen rotation** (xoay ngang). App có hỗ trợ landscape mode không? Nếu có, layout có thay đổi gì? | Cần biết để quyết định có test landscape hay không. | Open |

---

## 🟢 What's Good

- **Mô tả giao diện chi tiết:** UC69 mô tả rất đầy đủ 3 màn hình (Danh sách, Bộ lọc, Chi tiết) với bảng field-by-field rõ ràng, bao gồm cả quy tắc hiển thị và quy tắc hành động.
- **Tham chiếu CMR nhất quán:** Hầu hết các hành vi đều tham chiếu đúng CMR tương ứng (CMR-01, CMR-04, CMR-05, CMR-06, CMR-07, CMR-08, CMR-13, CMR-14).
- **Xử lý edge case tốt:** Đã mô tả null handling (hiển thị "-"), empty state, partial API failure, debounce rapid tap, state persistence, back navigation từ VB liên quan.
- **Acceptance Criteria đầy đủ:** 13 AC rõ ràng, testable, bao phủ hầu hết các luồng chính.
- **Session handling:** Mô tả rõ 3 scenario (session expire, force close, uninstall).
- **Exclusions rõ ràng:** Nêu rõ những gì KHÔNG thuộc phạm vi UC69.

---

## 🧪 Testability Outlook

**What CAN be tested now:**

- Luồng xem danh sách: hiển thị, sắp xếp mặc định, lazy load, pull to refresh
- Luồng tìm kiếm: debounce 3s, tìm gần đúng, xóa keyword, kết hợp bộ lọc
- Chuyển đổi radio (Số hiệu, Trích yếu ↔ Toàn văn): reset trang, giữ keyword/filter
- Bottom Sheet bộ lọc: mở/đóng, áp dụng, nhập lại, tap ngoài, back vật lý
- Xem chi tiết: hiển thị thông tin, null → "-", format ngày, badge trạng thái
- Tải văn bản / Xem PDF: ẩn nút khi không có file, toast thành công
- Mục lục: collapse/expand, tap scroll, ẩn khi không có
- Văn bản liên quan: hiển thị, tap navigate, back về gốc, empty state
- State Persistence: quay lại giữ nguyên trạng thái
- Debounce rapid tap: chỉ navigate 1 lần
- Error handling: mất mạng, timeout, file lỗi
- Partial API failure: block lỗi hiển thị riêng

**What CANNOT be tested yet (blocked by gaps):**

- Active filter indicator (Q1) — không biết có áp dụng hay không
- Searchable dropdown trong bộ lọc (Q3) — không biết có hay không
- Loading state first-load danh sách (Q7) — chưa xác nhận
- Deep navigation limit cho VB liên quan (Q10) — không rõ giới hạn
- Date Range validation chi tiết (Q11) — chưa xác nhận CMR-15

**Suggested test focus areas (once gaps are resolved):**

- **Happy path:** Xem danh sách → Tìm kiếm → Lọc → Xem chi tiết → Tải/Xem PDF → Mục lục → VB liên quan
- **Alternative scenarios:** Chuyển radio, reset bộ lọc, xóa keyword, pull to refresh
- **Boundary & validation tests:** 500 ký tự search, date range validation, text dài truncate
- **Error & exception scenarios:** Mất mạng, timeout, partial failure, file lỗi/mất
- **UI-specific checks:** Null → "-", badge colors, empty states, skeleton loading
- **CMR compliance tests:** CMR-01 (search), CMR-02 (filter + indicator), CMR-04 (lazy load), CMR-05 (badge), CMR-13 (pull to refresh), CMR-14 (empty state), CMR-15 (date range)
- **Partial API failure tests:** 1 block lỗi, các block khác bình thường
- **Edge case tests:** Rapid tap, back vật lý, deep navigation VB liên quan, text overflow

---

## 📌 Summary & Recommendation

UC69 là một tài liệu yêu cầu **chất lượng tốt** với mô tả giao diện chi tiết, luồng xử lý rõ ràng, và acceptance criteria đầy đủ. Tuy nhiên, còn một số gap cần làm rõ trước khi QA có thể thiết kế test case hoàn chỉnh — chủ yếu liên quan đến: Active filter indicator (CMR-02), searchable dropdown, loading state first-load, giới hạn depth navigation VB liên quan, và validation rule Date Range.

**Recommendation:** ⚡ **CONDITIONALLY READY** — QA có thể bắt đầu thiết kế test case cho các luồng chính (xem danh sách, tìm kiếm, bộ lọc, xem chi tiết, tải/xem PDF, mục lục, VB liên quan). Các câu hỏi Q1–Q12 cần được BA trả lời song song để bổ sung test case cho các edge case và CMR compliance.
