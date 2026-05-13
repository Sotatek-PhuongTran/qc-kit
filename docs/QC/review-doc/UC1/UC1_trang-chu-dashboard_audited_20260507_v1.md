# UC1 — Màn hình Trang chủ (Dashboard) Mobile — Báo cáo Audit

**Tiêu đề:** UC Readiness Review — UC1 Trang chủ Dashboard
**Ngày tạo:** 07/05/2026
**Người review:** QC Agent
**Phiên bản:** v1

---

## 0. Feature Identity

| Thuộc tính | Giá trị | Trạng thái |
| --- | --- | --- |
| UC ID | UC1 | ✅ Complete |
| Tên chức năng | Màn hình Trang chủ (Dashboard) Mobile | ✅ Complete |
| BA phụ trách | han.luong & huy.lai2 | ✅ Complete |
| Phân hệ | Ứng dụng Di động (Mobile App) | ✅ Complete |
| Loại chức năng | Điều hướng & Tổng quan | ✅ Complete |
| Giao diện | Màn hình Mobile (Portrait) | ✅ Complete |
| Ngày tạo | 29/04/2026 | ✅ Complete |
| Phiên bản | v4 (header) / v3 (bảng thuộc tính) | ⚡ Partial — Có sự không nhất quán giữa header (v4) và bảng thuộc tính (v3) |

**Đánh giá:** ✅ Complete — Feature identity được mô tả đầy đủ và rõ ràng. Duy nhất một điểm nhỏ là sự không nhất quán phiên bản giữa header và bảng thuộc tính.

---

## 1. Objective & Scope

**Mục tiêu:** Màn hình chính hiển thị ngay sau khi đăng nhập thành công, cung cấp tổng quan thông tin tài khoản và các lối tắt điều hướng nhanh (Quick Access) đến các chức năng chính.

**Phạm vi:**
- Header điều hướng (Hamburger, Logo, Ngôn ngữ, Thông báo, Người dùng)
- Card thông tin người dùng (Avatar, Tên, Vai trò)
- Quick Access (6 mục cố định)
- Tin tức (tối đa 5 bài)
- Floating Widget (Chatbot)
- Footer (Bottom Navigation — 4 tab)

**Phân quyền:** Toàn bộ người dùng đã đăng nhập. Nội dung giống nhau giữa tất cả roles.

**Đánh giá:** ✅ Complete — Mục tiêu và phạm vi được mô tả rõ ràng, đầy đủ.

---

## 2. Actors & User Roles

| Actor | Mô tả | Trạng thái |
| --- | --- | --- |
| Cá nhân (Nhà đầu tư Việt Nam) | Người dùng đã đăng nhập | ✅ Complete |
| Cá nhân (Nhà đầu tư nước ngoài) | Người dùng đã đăng nhập | ✅ Complete |
| Tổ chức/Doanh nghiệp | Người dùng đã đăng nhập | ✅ Complete |

**Lưu ý quan trọng:** UC ghi rõ "Áp dụng cho tất cả users/roles: Nội dung trang chủ (Header, Card thông tin, Quick Access, Tin tức, Footer) luôn giống nhau giữa các users/roles".

**Đánh giá:** ✅ Complete — Actors và roles được định nghĩa rõ ràng. Đặc biệt ghi rõ không có phân biệt nội dung giữa các roles.

---

## 3. Preconditions & Postconditions

### Preconditions
| # | Điều kiện | Trạng thái |
| --- | --- | --- |
| 1 | Người dùng đã đăng nhập thành công | ✅ Complete |
| 2 | Ứng dụng đã mở và kết nối mạng | ✅ Complete — *(inferred)* |

### Postconditions
| # | Điều kiện | Trạng thái |
| --- | --- | --- |
| 1 | Session người dùng được duy trì | ✅ Complete |
| 2 | Toàn bộ thông tin hiển thị là dữ liệu mới nhất (up-to-date) | ✅ Complete |
| 3 | Dữ liệu Tin tức được hiển thị theo ngôn ngữ hiện tại | ✅ Complete |

**Đánh giá:** ✅ Complete — Preconditions và postconditions được mô tả đầy đủ.

---

## 4. UI Object Inventory & Mapping

### Bảng kiểm kê UI Components

| # | Component Name | Type | In UC? | In Wireframe? | Display State | Action Rule | Label Consistent | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Nút Hamburger (☰) | Button (Icon) | ✅ | ✅ | Luôn hiển thị, góc trái header | Tap → Mở Sidebar | ✅ | CMR-06 áp dụng |
| 2 | Tiêu đề trang (Logo + "Cổng Đầu Tư") | Image + Label | ✅ | ✅ | Luôn hiển thị, cạnh Hamburger | Không tap được | ✅ | |
| 3 | Chuyển đổi ngôn ngữ | Button (Icon + Text) | ✅ | ✅ | Luôn hiển thị, text mã ngôn ngữ (VI) | Tap → Popup chọn ngôn ngữ | ✅ | |
| 4 | Icon Thông báo (🔔) | Button (Icon) | ✅ | ✅ | Luôn hiển thị + red dot nếu có thông báo chưa đọc | Tap → UC258/UC259 | ✅ | Polling 30s |
| 5 | Icon Người dùng | Button (Image) | ✅ | ✅ | Luôn hiển thị, góc phải header | Tap → UC249 | ✅ | |
| 6 | Avatar người dùng (Card) | Image (Circle) | ✅ | ✅ | Luôn hiển thị, icon mặc định | Không tap được | ✅ | |
| 7 | Tên đầy đủ (Card) | Label | ✅ | ✅ | Tối đa 1 dòng, truncate | Không tap được | ✅ | |
| 8 | Vai trò (Card) | Label | ✅ | ✅ | Text thuần | Không tap được | ✅ | |
| 9 | Quick Access — Hướng dẫn sử dụng | Card (Icon + Label) | ✅ | ✅ | Cố định | Tap → UC-75 | ✅ | |
| 10 | Quick Access — Quản lý hồ sơ | Card (Icon + Label) | ✅ | ✅ | Cố định | Tap → UC45 | ✅ | |
| 11 | Quick Access — Quản lý đặt lịch | Card (Icon + Label) | ✅ | ✅ | Cố định | Tap → UC42 | ✅ | |
| 12 | Quick Access — Khu công nghiệp / KKT | Card (Icon + Label) | ✅ | ✅ | Cố định | Tap → UC2 | ✅ | |
| 13 | Quick Access — Câu hỏi (FAQ) | Card (Icon + Label) | ✅ | ✅ | Cố định | Tap → UC76 | ✅ | |
| 14 | Quick Access — Văn bản pháp luật | Card (Icon + Label) | ✅ | ✅ | Cố định | Tap → UC69 | ✅ | |
| 15 | Tiêu đề section "Tin tức" | Label | ✅ | ✅ | Cố định, căn trái | Không tap được | ✅ | |
| 16 | Nút "Xem tất cả" | Button (Text) | ✅ | ✅ | Bên phải tiêu đề, chữ đỏ | Tap → UC55-68 | ✅ | |
| 17 | Danh sách tin tức | List Card (Horizontal Scroll) | ✅ | ✅ | Tối đa 5 tin, cuộn ngang | Tap card → UC55-68 | ✅ | |
| 18 | Icon Chatbot | Button (Floating Action) | ✅ | ✅ | Góc dưới phải, nổi | Tap → UC60, Drag & Drop | ✅ | |
| 19 | Tab Trang chủ (Footer) | Button (Tab) | ✅ | ✅ | Active: icon + text đỏ | Tap → Refresh UC1 | ✅ | |
| 20 | Tab Thủ tục (Footer) | Button (Tab) | ✅ | ✅ | Inactive mặc định | Tap → UC69/UC73 | ✅ | |
| 21 | Tab KCN/KKT (Footer) | Button (Tab) | ✅ | ✅ | Inactive mặc định | Tap → UC2 | ✅ | |
| 22 | Tab Cài đặt (Footer) | Button (Tab) | ✅ | ✅ | Inactive mặc định | Tap → UC249 | ✅ | |

### CMR Cross-Check

| CMR | Áp dụng | UC đề cập | Trạng thái |
| --- | --- | --- | --- |
| CMR-06 (Header & Điều hướng) | ✅ | ✅ — Header có Hamburger, Tiêu đề, Icon Thông báo | ✅ Phù hợp |
| CMR-07 (Xử lý lỗi chung) | ✅ | ✅ — Bảng xử lý lỗi tại mục 3.1 | ⚠️ Partial — UC ghi timeout 30 giây, CMR-07/CMR-16 ghi timeout 10 giây |
| CMR-13 (Pull to Refresh) | ✅ | ⚠️ — Không đề cập Pull to Refresh cho trang chủ | ⚠️ Partial — CMR-13 áp dụng cho tất cả, nhưng UC không nói rõ |
| CMR-14 (Empty State) | ✅ | ✅ — Tin tức rỗng: "Không có dữ liệu." | ✅ Phù hợp |
| CMR-16 (API Performance) | ✅ | ⚠️ — UC ghi timeout 30 giây, CMR-16 ghi 10 giây | 🔴 Conflict |

**Đánh giá:** ⚡ Partial — UI inventory khá đầy đủ nhưng có conflict giữa UC và CMR về timeout.

---

## 5. Object Attributes & Behavior Definition

### 5.1 Header Components

#### Nút Hamburger (☰)
- **Default State:** Enabled, luôn hiển thị
- **Tap:** Mở Sidebar Navigation từ bên trái
- **Sidebar:** Chứa menu: Trang chủ, Giới thiệu, Lĩnh vực đầu tư, Khu vực đầu tư, Liên hệ, Thủ tục hành chính, Quản lý hồ sơ, Quản lý đặt lịch, Phản ánh kiến nghị, Cấu hình tài khoản
- **Đóng Sidebar:** Tap vào vùng mờ bên ngoài
- **Multi-language:** Hỗ trợ đa ngôn ngữ

#### Chuyển đổi ngôn ngữ
- **Default State:** Enabled, hiển thị mã ngôn ngữ hiện tại (VI)
- **Tap:** Mở popup chọn ngôn ngữ (VI, EN, ZH, JA, KO)
- **Chọn ngôn ngữ khác:** Áp dụng ngôn ngữ mới, cập nhật header, đóng popup, tải lại Tin tức
- **Chọn ngôn ngữ hiện tại:** Đóng popup, không thay đổi
- **Lưu trữ:** Ngôn ngữ lưu vào server/user profile, không reset khi đóng app

#### Icon Thông báo (🔔)
- **Default State:** Enabled
- **Red dot:** Hiển thị nếu có thông báo chưa đọc (chấm đỏ, không kèm số)
- **Cơ chế cập nhật:** Polling 30 giây/lần
- **Tap:** Điều hướng → UC258/UC259

#### Icon Người dùng
- **Default State:** Enabled
- **Tap:** Điều hướng → UC249

### 5.2 Card Thông tin người dùng

| Field | Data Type | Required? | Min | Max | Format |
| --- | --- | --- | --- | --- | --- |
| Avatar | Image (Circle) | — | — | — | Icon mặc định hệ thống |
| Tên đầy đủ | Text | — | — | 1 dòng | Truncate nếu quá dài |
| Vai trò | Text | — | — | — | "Nhà đầu tư Việt Nam" / "Nhà đầu tư nước ngoài" / "Tổ chức/Doanh nghiệp" |

### 5.3 Tin tức

| Field | Data Type | Required? | Min | Max | Format |
| --- | --- | --- | --- | --- | --- |
| Ảnh đại diện | Image | — | — | — | Thumbnail bo góc |
| Nhãn phân loại | Tag | — | — | — | Đỏ: "Chính sách", Xanh: "Tin đầu tư", Cam: "Thành công" |
| Ngày đăng | Date | — | — | — | DD/MM/YYYY |
| Tiêu đề bài viết | Text | — | — | 2 dòng | Truncate nếu dài hơn |

### Edge Case Checklist

**Group A — Extreme Data States:**
- ✅ Tên đầy đủ overflow: UC ghi truncate 1 dòng
- ✅ Tiêu đề tin tức overflow: UC ghi tối đa 2 dòng, truncate
- ✅ Danh sách tin rỗng: "Không có dữ liệu." (CMR-14)
- ⚠️ Null data từ API cho Card thông tin: Chỉ ghi "dùng thông tin placeholder" khi lỗi, không mô tả khi dữ liệu null từ response hợp lệ

**Group B — Network & API States:**
- ✅ Loading state: Spinner/skeleton cho Card thông tin và Tin tức
- ⚡ Partial API failure: UC ghi "không chặn các tính năng khác" nhưng không rõ UI xử lý khi chỉ 1 trong nhiều API calls bị lỗi (ví dụ: API thông tin user thất bại nhưng API tin tức thành công)
- ⚠️ Duplicate API calls (double tap, back rồi re-enter): Không đề cập CMR-13 debounce/prevent duplicate
- ⚠️ Network loss mid-load: Không mô tả behavior khi mất mạng giữa chừng

**Group C — Abnormal User Interactions:**
- ⚠️ Double tap nhanh trên button Header/Quick Access/Footer: Không có quy tắc debounce navigation
- ✅ Drag & Drop chatbot ra ngoài vùng màn hình: Không mô tả rõ → cần xác nhận
- ⚠️ Nút Back vật lý (Android) khi Sidebar đang mở: Đóng Sidebar hay thoát app?
- ⚠️ Screen rotation: Không đề cập

**Group D — Permissions & Session:**
- ⚠️ Session expires khi đang ở Trang chủ: Không mô tả behavior
- ⚠️ Reopen app sau force-close: Không mô tả quay về screen nào

**Group E — Internationalization (i18n):**
- ✅ Ngôn ngữ được lưu vào server/user profile
- ✅ Khi chuyển ngôn ngữ, Tin tức tải lại theo ngôn ngữ mới
- ⚠️ Ngôn ngữ dài (Nhật, Hàn): Không đề cập layout break
- ⚠️ Toàn bộ text trên màn hình cập nhật ngay sau chuyển ngôn ngữ: Không ghi rõ (chỉ nói Tin tức)

**Đánh giá:** ⚡ Partial — Nhiều edge case chưa được đề cập, đặc biệt là partial API failure, session expiry, double-tap debounce.

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Hiển thị Trang chủ

**MAIN FLOW (Happy Path):**
1. Đăng nhập thành công → Hệ thống gọi API thông tin tài khoản
2. Hiển thị loading indicator (spinner/skeleton) trên Card thông tin
3. Hiển thị Card thông tin (Tên, Vai trò, Avatar)
4. Polling 30s/lần để kiểm tra thông báo chưa đọc → cập nhật red dot
5. Quick Access hiển thị cố định (6 mục)
6. Tải Tin tức từ API (skeleton loading)
7. Hiển thị tối đa 5 tin mới nhất, sắp xếp thời gian giảm dần

**ALTERNATIVE FLOWS:**
- [Alt-1] Tin tức rỗng → Hiển thị "Không có dữ liệu." (CMR-14)
- [Alt-2] Chuyển ngôn ngữ → Tải lại Tin tức theo ngôn ngữ mới

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" → Dùng placeholder
- [Err-2] HTTP 500 → "Hệ thống đang bận. Vui lòng thử lại sau." → Dùng placeholder
- [Err-3] HTTP 404 → "Nội dung không tồn tại hoặc đã bị xóa." → Dùng placeholder
- [Err-4] Timeout (>30s) → Hiển thị thông báo timeout chung → Dùng placeholder

**BUSINESS RULES:**
- BR-01: Tin tức hiển thị tối đa 5 bài, sắp xếp thời gian đăng giảm dần
- BR-02: Quick Access cố định, không tùy chỉnh
- BR-03: Thông báo red dot cập nhật qua polling 30s/lần
- BR-04: Ngôn ngữ lưu vào server/user profile
- BR-05: Chatbot reset vị trí khi quay lại trang chủ

**UI/UX FEEDBACK:**
- Loading state: Skeleton loading cho Card thông tin và Tin tức
- Error message: Hiển thị tại vùng tương ứng + nút "Thử lại" (cho lỗi mạng)
- Placeholder: Tên "Người dùng" (giá trị cố định) khi lỗi

### 6.2 Sidebar Navigation

**MAIN FLOW:**
1. Tap Hamburger (☰) → Mở Sidebar từ bên trái
2. Sidebar hiển thị menu: 10 mục
3. Tap item → Đóng Sidebar + điều hướng đến màn hình tương ứng

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap vùng mờ bên ngoài → Đóng Sidebar, không điều hướng

### 6.3 Chuyển đổi ngôn ngữ

**MAIN FLOW:**
1. Tap icon ngôn ngữ → Mở popup "Chọn ngôn ngữ"
2. Hiển thị danh sách 5 ngôn ngữ: VI, EN, ZH, JA, KO
3. Ngôn ngữ đang chọn: đánh dấu check đỏ
4. Tap ngôn ngữ khác → Áp dụng, cập nhật mã header, tải lại Tin tức, đóng popup

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap ngôn ngữ hiện tại → Đóng popup, không thay đổi

**Đánh giá:** ⚡ Partial — Flow chính được mô tả khá rõ, nhưng thiếu chi tiết cho một số alternative flow. Conflict timeout 30s vs CMR-07/CMR-16 (10s).

---

## 7. Functional Integration Analysis

### Liên kết giữa các chức năng

| Chức năng A | Chức năng B | Loại liên kết | Mô tả | Trạng thái |
| --- | --- | --- | --- | --- |
| Card thông tin | Đăng nhập | Data dependency | Dữ liệu từ API user info sau đăng nhập | ✅ |
| Icon Thông báo | UC258/UC259 | Navigation | Tap → Điều hướng | ✅ |
| Icon Người dùng | UC249 | Navigation | Tap → Điều hướng | ✅ |
| Quick Access | UC45, UC42, UC2, UC-75, UC76, UC69 | Navigation | Tap → Điều hướng | ✅ |
| Tin tức | UC55-68 | Navigation + Data | Tap card → Chi tiết; Xem tất cả → Danh sách | ✅ |
| Chatbot | UC60 | Navigation | Tap → Mở chatbot | ✅ |
| Footer tabs | UC1, UC69/73, UC2, UC249 | Navigation + Refresh | Tap → Điều hướng + refresh | ✅ |
| Chuyển ngôn ngữ | Tin tức | Data reload | Chuyển ngôn ngữ → Tải lại tin tức | ✅ |
| Polling thông báo | Red dot | Real-time update | Polling 30s → Cập nhật red dot | ⚡ — Thiếu mô tả fallback khi polling fail |

### Phân tích consistency

- ⚡ **Tab Footer "Cài đặt" vs Icon Người dùng:** Cả hai đều điều hướng đến UC249. UC cần xác nhận liệu đây là cùng một màn hình hay hai entry point khác nhau vào UC249.
- ✅ **Refresh behavior:** Mỗi tab footer đều refresh dữ liệu khi tap — nhất quán.

**Đánh giá:** ⚡ Partial — Các liên kết navigation được mô tả tốt, nhưng thiếu phân tích chi tiết khi polling fail, và cần xác nhận duplicate entry point đến UC249.

---

## 8. Acceptance Criteria Synthesis

### UI Acceptance Criteria

| AC-ID | Tiêu chí | Trạng thái |
| --- | --- | --- |
| AC-UI-01 | Header hiển thị đủ 5 components: Hamburger, Logo+Title, Ngôn ngữ, Thông báo, Người dùng | ✅ |
| AC-UI-02 | Card thông tin hiển thị Avatar (mặc định), Tên (truncate 1 dòng), Vai trò | ✅ |
| AC-UI-03 | Quick Access hiển thị đủ 6 mục cố định | ✅ |
| AC-UI-04 | Tin tức hiển thị tối đa 5 bài, cuộn ngang, mỗi card có: thumbnail, tag, ngày, tiêu đề | ✅ |
| AC-UI-05 | Footer hiển thị 4 tab: Trang chủ, Thủ tục, KCN/KKT, Cài đặt | ✅ |
| AC-UI-06 | Chatbot floating ở góc dưới phải, có thể drag & drop | ✅ |

### Functional Acceptance Criteria

| AC-ID | Tiêu chí | Trạng thái |
| --- | --- | --- |
| AC-FN-01 | Đăng nhập thành công → Tự động điều hướng về Trang chủ | ✅ |
| AC-FN-02 | Red dot trên icon 🔔 cập nhật qua polling 30s/lần | ✅ |
| AC-FN-03 | Chuyển ngôn ngữ → Tin tức tải lại theo ngôn ngữ mới | ✅ |
| AC-FN-04 | Tap item Sidebar → Đóng Sidebar + điều hướng | ✅ |
| AC-FN-05 | Tap vùng ngoài Sidebar → Đóng, không điều hướng | ✅ |
| AC-FN-06 | Ngôn ngữ lưu server, không reset khi đóng app | ✅ |
| AC-FN-07 | Chatbot reset vị trí mặc định khi quay lại trang chủ | ✅ |
| AC-FN-08 | Lỗi API → Dùng placeholder, không chặn tính năng khác | ⚡ — Không rõ từng section xử lý độc lập hay không |

### Integration Acceptance Criteria

| AC-ID | Tiêu chí | Trạng thái |
| --- | --- | --- |
| AC-INT-01 | Mỗi tab Footer tap → Refresh dữ liệu | ✅ |
| AC-INT-02 | Quick Access navigation đến đúng UC tương ứng | ✅ |

**Đánh giá:** ⚡ Partial — Phần lớn AC rõ ràng, nhưng thiếu AC cho error handling chi tiết (partial API failure) và edge cases.

---

## 9. Non-functional Requirements

| NFR | Mô tả | Trạng thái |
| --- | --- | --- |
| Performance | Loading indicator cho API calls | ✅ Complete |
| Performance — Timeout | UC ghi 30 giây, CMR-07/CMR-16 ghi 10 giây | 🔴 Conflict |
| Security | Session duy trì | ⚡ Partial — Không mô tả session expiry behavior |
| Accessibility | Screen reader, contrast ratio, font size, touch target | ⚡ Partial — Chỉ đề cập chung, tham chiếu UI design specs |
| Compatibility | Chỉ nói Portrait mode | ⚡ Partial — Không đề cập landscape, OS versions |

**Đánh giá:** ⚡ Partial — Một số NFR được đề cập nhưng còn mơ hồ. Conflict timeout nghiêm trọng.

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
| --- | --- | --- | --- | --- |
| 1 | Feature Identity | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 5/5 | ✅ |
| 3 | Actors & User Roles | 10 | 10/10 | ✅ |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ✅ |
| 5 | UI Object Inventory & Mapping | 15 | 12/15 | ⚡ |
| 6 | Object Attributes & Behavior Definition | 20 | 14/20 | ⚡ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 15/20 | ⚡ |
| 8 | Functional Integration Analysis | 10 | 7/10 | ⚡ |
| 9 | Acceptance Criteria | 10 | 7/10 | ⚡ |
| 10 | Non-functional Requirements | 5 | 2/5 | ⚡ |
| **Total** | | **110** | **86/110 → 78.2/100** | **⚡ CONDITIONALLY READY** |

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q1 | High | "Timeout (API không phản hồi > 30 giây)" — Mục 3.1 Xử lý lỗi | UC ghi timeout 30 giây, trong khi CMR-07 và CMR-16 đã cập nhật timeout xuống 10 giây. Giá trị nào là đúng? | Conflict giữa UC và CMR ảnh hưởng trực tiếp đến test case error handling. Nếu không thống nhất, QA không biết dùng giá trị nào để verify timeout. | Open |
| Q2 | Medium | "Dùng thông tin placeholder (tên \"Người dùng\" - giá trị cố định); không chặn các tính năng khác." — Mục 3.1 | Khi chỉ 1 API fails (ví dụ: API user info fails nhưng API tin tức succeeds), UI xử lý từng section độc lập hay hiển thị lỗi toàn màn hình? Placeholder chính xác cho từng vùng UI là gì? | Cần biết cụ thể để thiết kế test case cho partial API failure — một scenario thường xảy ra trên production. | Open |
| Q3 | Medium | N/A (Missing) | UC không đề cập Pull to Refresh (CMR-13). Trang chủ có hỗ trợ Pull to Refresh không? Nếu có, behavior refresh giống như tap tab Trang chủ trên Footer không? | CMR-13 áp dụng cho tất cả màn hình mobile. Thiếu mô tả sẽ dẫn đến test coverage gap. | Open |
| Q4 | Medium | N/A (Missing) | Khi người dùng tap nhanh liên tục (double tap) vào các button navigation (Quick Access, Footer tabs, Sidebar items), hệ thống có cơ chế debounce/prevent duplicate navigation không? | Thiếu quy tắc double-tap có thể dẫn đến bug duplicate screen push, ảnh hưởng UX. | Open |
| Q5 | Medium | N/A (Missing) | Khi session hết hạn trong lúc người dùng đang ở Trang chủ, hệ thống xử lý thế nào? Redirect về đăng nhập hay hiển thị thông báo? | Cần biết để test session timeout scenario — critical cho security testing. | Open |
| Q6 | Medium | N/A (Missing) | Khi Sidebar đang mở và người dùng nhấn nút Back vật lý (Android), Sidebar sẽ đóng hay thoát app? | Behavior nút Back vật lý cần rõ ràng để test trên Android. | Open |
| Q7 | Medium | "Khi có thông báo mới, red dot hiển thị ngay lập tức" — Mục 2.1 | Khi polling thông báo thất bại (mất mạng giữa chừng), hệ thống xử lý thế nào? Bỏ qua lần poll này hay hiển thị lỗi? Có fallback mechanism không? | Cần xác nhận để test edge case polling failure — đặc biệt quan trọng nếu app chạy lâu. | Open |
| Q8 | Low | "Phiên bản: v4" (header) vs "Phiên bản: v3" (bảng thuộc tính) | Phiên bản đúng của UC này là v3 hay v4? Có sự không nhất quán trong tài liệu. | Ảnh hưởng traceability — cần biết chính xác để reference đúng phiên bản. | Open |
| Q9 | Low | N/A (Missing) | Khi người dùng chuyển ngôn ngữ, ngoài Tin tức, các text UI khác (Header, Quick Access labels, Footer labels) có cập nhật ngay không? | UC chỉ đề cập reload Tin tức khi chuyển ngôn ngữ. Cần rõ toàn bộ screen text behavior. | Open |
| Q10 | Low | N/A (Missing) | App có hỗ trợ landscape mode không? Nếu không, có lock portrait không? | Cần biết để xác định phạm vi test UI responsiveness. | Open |
| Q11 | Low | "Kéo thả (Drag & Drop): Người dùng có thể chạm giữ và di chuyển icon đến vị trí khác" — Mục Floating Widget | Khi kéo Chatbot icon ra ngoài vùng màn hình (hoặc vào vùng không hợp lệ), hệ thống xử lý thế nào? Snap trở lại vị trí hợp lệ gần nhất? | Cần mô tả boundary cho drag & drop để test edge case. | Open |
| Q12 | Low | N/A (Missing) | Khi reopen app sau force-close, người dùng sẽ quay về Trang chủ hay phải đăng nhập lại? Session persistence behavior như thế nào? | Cần xác nhận để test app lifecycle recovery. | Open |

---

## 🟢 What's Good

- **Feature Identity** rất rõ ràng: UC ID, tên, BA phụ trách, phân hệ đều được ghi đầy đủ.
- **Actors & Roles** được xác định rõ với lưu ý quan trọng rằng nội dung giống nhau giữa tất cả roles — giúp QA tiết kiệm thời gian test không cần chia role-based scenario cho màn hình này.
- **UI Object Inventory** rất chi tiết: mỗi component đều có quy tắc hiển thị và hành động, bao gồm cả trạng thái mặc định.
- **Quick Access** được mô tả chặt chẽ: cố định, không tùy chỉnh, giống nhau cho tất cả roles.
- **Tin tức** có mô tả tốt: giới hạn 5 bài, sắp xếp giảm dần, horizontal scroll, category tag với color coding.
- **Error handling** được đề cập với bảng lỗi cụ thể cho từng tình huống — rất tốt cho test design.
- **Ngôn ngữ** được mô tả kỹ: lưu server, reload tin tức khi chuyển, danh sách rõ ràng.
- **Chatbot** có quy tắc thú vị: drag & drop nhưng reset khi quay lại — cho thấy thoughtful design.

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- Happy path: Đăng nhập → Trang chủ hiển thị đầy đủ components (Header, Card, Quick Access, Tin tức, Chatbot, Footer)
- Navigation: Tất cả quick access items, footer tabs, sidebar items đều có UC đích rõ ràng
- Chuyển ngôn ngữ: Flow chọn ngôn ngữ, reload tin tức, persistence behavior
- Error handling: 4 loại lỗi (mạng, 500, 404, timeout) — dù cần xác nhận timeout value
- UI display: Truncate tên, tin tức rỗng, tin tức cuộn ngang, red dot thông báo
- Chatbot: Tap mở, drag & drop, reset vị trí khi quay lại

**What CANNOT be tested yet (blocked by gaps):**
- Partial API failure scenarios (Q2)
- Pull to Refresh behavior (Q3)
- Double-tap / rapid navigation debounce (Q4)
- Session expiry behavior (Q5)
- Android Back button with Sidebar (Q6)
- Polling failure handling (Q7)

**Suggested test focus areas** *(once gaps are resolved)*:
- Happy path: Đăng nhập → Hiển thị trang chủ đầy đủ → Navigation đến từng UC đích
- Alternative scenarios: Tin tức rỗng, chuyển ngôn ngữ, sidebar close methods
- Boundary & validation: Tên dài (truncate), tiêu đề tin dài, 5 tin tức đúng/ít hơn 5
- Error & exception: Mỗi loại lỗi API, timeout, mất mạng
- UI-specific: Red dot notification, category tag colors, active/inactive footer tabs
- CMR compliance: Verify Empty State (CMR-14), Error handling (CMR-07), Header (CMR-06)
- Real-time behavior: Polling 30s thông báo, cập nhật red dot realtime
- Partial API failure: 1 API lỗi nhưng các section khác vẫn hoạt động
- Edge case: Chatbot drag boundaries, double-tap navigation, Android Back button

---

## 📌 Summary & Recommendation

UC1 — Màn hình Trang chủ là một tài liệu yêu cầu có chất lượng khá tốt với UI inventory chi tiết, error handling được mô tả rõ ràng, và phân quyền đơn giản (giống nhau cho tất cả roles). Tuy nhiên, có một **conflict nghiêm trọng** giữa UC (timeout 30 giây) và CMR-07/CMR-16 (timeout 10 giây) cần được giải quyết ngay. Ngoài ra, một số edge case quan trọng chưa được đề cập bao gồm: Pull to Refresh, double-tap debounce, session expiry, partial API failure handling, và Android Back button behavior. **Khuyến nghị: QA có thể bắt đầu thiết kế test case cho các vùng đã rõ ràng (happy path, navigation, chuyển ngôn ngữ, UI display). Song song đó, BA cần giải quyết 12 câu hỏi mở, đặc biệt ưu tiên Q1 (conflict timeout) và Q2 (partial API failure).**
