# UC1 — Màn hình Trang chủ (Dashboard) Mobile — Báo cáo Audit

**Tiêu đề:** UC Readiness Review — UC1 Trang chủ Dashboard
**Ngày tạo:** 07/05/2026
**Người review:** QC Agent
**Phiên bản:** v2

---

## 0. Feature Identity

| Thuộc tính | Giá trị | Trạng thái |
| --- | --- | --- |
| UC ID | UC1 | ✅ Clear |
| Tên chức năng | Màn hình Trang chủ (Dashboard) Mobile | ✅ Clear |
| BA phụ trách | han.luong & huy.lai2 | ✅ Clear |
| Phân hệ | Ứng dụng Di động (Mobile App) | ✅ Clear |
| Loại chức năng | Điều hướng & Tổng quan | ✅ Clear |
| Giao diện | Màn hình Mobile (Portrait) | ✅ Clear |
| Ngày tạo | 29/04/2026 | ✅ Clear |
| Phiên bản | v4 (nhất quán giữa header và bảng thuộc tính) | ✅ Clear |

**Đánh giá:** ✅ Clear — Feature identity đầy đủ, rõ ràng. Sự không nhất quán phiên bản từ v1 audit đã được khắc phục.

**Score: 5/5**

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

**Đánh giá:** ✅ Clear — Mục tiêu và phạm vi được mô tả rõ ràng, đầy đủ.

**Score: 5/5**

---

## 2. Actors & User Roles

| Actor | Mô tả | Trạng thái |
| --- | --- | --- |
| Cá nhân (Nhà đầu tư Việt Nam) | Người dùng đã đăng nhập | ✅ Clear |
| Cá nhân (Nhà đầu tư nước ngoài) | Người dùng đã đăng nhập | ✅ Clear |
| Tổ chức/Doanh nghiệp | Người dùng đã đăng nhập | ✅ Clear |

**Lưu ý quan trọng:** UC ghi rõ "Áp dụng cho tất cả users/roles: Nội dung trang chủ (Header, Card thông tin, Quick Access, Tin tức, Footer) luôn giống nhau giữa các users/roles".

**Đánh giá:** ✅ Clear — Actors và roles được định nghĩa rõ ràng. Không có phân biệt nội dung giữa các roles.

**Score: 10/10**

---

## 3. Preconditions & Postconditions

### Preconditions
| # | Điều kiện | Trạng thái |
| --- | --- | --- |
| 1 | Người dùng đã đăng nhập thành công | ✅ Clear |
| 2 | Ứng dụng đã mở và kết nối mạng | ✅ Clear |

### Postconditions
| # | Điều kiện | Trạng thái |
| --- | --- | --- |
| 1 | Session người dùng được duy trì | ✅ Clear |
| 2 | Toàn bộ thông tin hiển thị là dữ liệu mới nhất (up-to-date) | ✅ Clear |
| 3 | Dữ liệu Tin tức được hiển thị theo ngôn ngữ hiện tại | ✅ Clear |

**Đánh giá:** ✅ Clear — Preconditions và postconditions được mô tả đầy đủ.

**Score: 9/10** *(Trừ 1 điểm: chưa mô tả postcondition khi session hết hạn giữa chừng)*

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
| CMR-07 (Xử lý lỗi chung) | ✅ | ✅ — Bảng xử lý lỗi tại mục Xử lý lỗi, timeout 10 giây | ✅ Phù hợp |
| CMR-13 (Pull to Refresh) | ✅ | ✅ — Đã bổ sung Pull to Refresh, tham chiếu CMR-13 | ✅ Phù hợp |
| CMR-14 (Empty State) | ✅ | ✅ — Tin tức rỗng: "Không có dữ liệu." | ✅ Phù hợp |
| CMR-16 (API Performance) | ✅ | ✅ — UC ghi timeout 10 giây, tham chiếu CMR-16 | ✅ Phù hợp |

**Đánh giá:** ✅ Clear — UI inventory đầy đủ, không còn conflict giữa UC và CMR.

**Score: 14/15** *(Trừ 1 điểm: chưa mô tả rõ behavior nút Back vật lý Android khi Sidebar mở)*

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
- **Chọn ngôn ngữ khác:** Áp dụng ngôn ngữ đó cho **toàn hệ thống**, cập nhật mã header, đóng popup, tải lại Tin tức theo ngôn ngữ mới (không dùng cache ngôn ngữ cũ)
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
| Avatar | Image (Circle) | — | — | — | Icon mặc định hệ thống (không lấy từ profile) |
| Tên đầy đủ | Text | — | — | 1 dòng | Truncate "..." nếu quá dài |
| Vai trò | Text | — | — | — | "Nhà đầu tư Việt Nam" / "Nhà đầu tư nước ngoài" / "Tổ chức/Doanh nghiệp" |

### 5.3 Tin tức

| Field | Data Type | Required? | Min | Max | Format |
| --- | --- | --- | --- | --- | --- |
| Ảnh đại diện | Image | — | — | — | Thumbnail bo góc |
| Nhãn phân loại | Tag | — | — | — | Đỏ: "Chính sách", Xanh: "Tin đầu tư", Cam: "Thành công" |
| Ngày đăng | Date | — | — | — | DD/MM/YYYY |
| Tiêu đề bài viết | Text | — | — | 2 dòng | Truncate nếu dài hơn |

### 5.4 Quy tắc xử lý lỗi độc lập từng section (MỚI — giải quyết Q2 từ v1)

- Mỗi section trên Trang chủ (Card thông tin người dùng, Quick Access, Tin tức) được xử lý **độc lập** với nhau.
- Khi 1 API fails (ví dụ: API user info fails nhưng API tin tức succeeds), **chỉ section tương ứng hiển thị lỗi**, các section còn lại vẫn hiển thị bình thường.
- Thông báo lỗi hiển thị theo CMR-07 cho từng section.
- Không hiển thị lỗi toàn màn hình khi chỉ 1 section gặp sự cố.

### 5.5 Quy tắc debounce navigation (MỚI — giải quyết Q4 từ v1)

- Khi người dùng tap nhanh liên tục (double tap) vào các button navigation (Quick Access cards, Footer tabs, Sidebar items), hệ thống có cơ chế **debounce** để prevent duplicate navigation.

### 5.6 Quy tắc khôi phục trạng thái khi reopen app (MỚI — giải quyết Q12 từ v1)

- **Force close (tắt app không xóa dữ liệu):** Khi mở lại app sau force close → Quay về **Trang chủ**, giữ nguyên session đăng nhập, không yêu cầu đăng nhập lại.
- **Xóa app (uninstall):** Khi xóa app và cài đặt lại → Yêu cầu **đăng nhập lại từ đầu** (không restore session).

### Edge Case Checklist

**Group A — Extreme Data States:**
- ✅ Tên đầy đủ overflow: UC ghi truncate 1 dòng
- ✅ Tiêu đề tin tức overflow: UC ghi tối đa 2 dòng, truncate
- ✅ Danh sách tin rỗng: "Không có dữ liệu." (CMR-14)
- ✅ Null data từ API cho Card thông tin: Xử lý độc lập từng section, hiển thị lỗi theo CMR-07

**Group B — Network & API States:**
- ✅ Loading state: Spinner/skeleton cho Card thông tin và Tin tức
- ✅ Partial API failure: Mỗi section xử lý độc lập, chỉ section lỗi hiển thị thông báo
- ✅ Timeout: 10 giây (phù hợp CMR-07/CMR-16)
- ✅ Pull to Refresh: Kéo xuống → Trigger refresh, spinner, cập nhật dữ liệu (CMR-13)
- ⚠️ Polling failure: Chưa mô tả behavior khi polling thông báo thất bại

**Group C — Abnormal User Interactions:**
- ✅ Double tap nhanh: Có cơ chế debounce navigation
- ✅ Drag & Drop chatbot: Có mô tả, reset khi quay lại
- ⚠️ Nút Back vật lý (Android) khi Sidebar đang mở: Chưa mô tả
- ⚠️ Chatbot drag ra ngoài vùng màn hình: Chưa mô tả boundary

**Group D — Permissions & Session:**
- ✅ Reopen app sau force-close: Quay về Trang chủ, giữ session
- ✅ Uninstall và cài lại: Yêu cầu đăng nhập lại
- ⚠️ Session expires khi đang ở Trang chủ: Chưa mô tả behavior

**Group E — Internationalization (i18n):**
- ✅ Ngôn ngữ được lưu vào server/user profile
- ✅ Khi chuyển ngôn ngữ: Áp dụng cho toàn hệ thống, Tin tức tải lại
- ⚠️ Ngôn ngữ dài (Nhật, Hàn): Chưa đề cập layout break
- ⚠️ App có hỗ trợ landscape mode không: Chưa đề cập

**Đánh giá:** ⚠️ Partial — Cải thiện đáng kể so với v1 (đã giải quyết partial API failure, debounce, reopen app). Còn một số edge case chưa được đề cập.

**Score: 17/20**

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
- [Alt-2] Chuyển ngôn ngữ → Áp dụng cho toàn hệ thống, tải lại Tin tức theo ngôn ngữ mới (không dùng cache)
- [Alt-3] Pull to Refresh → Kéo xuống → Spinner → Reload toàn bộ dữ liệu → Ẩn spinner (CMR-13)
- [Alt-4] Tap tab Trang chủ (Footer) → Refresh dữ liệu toàn màn hình

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" → Chỉ section lỗi hiển thị thông báo
- [Err-2] HTTP 500 → "Hệ thống đang bận. Vui lòng thử lại sau." → Chỉ section lỗi hiển thị thông báo
- [Err-3] Timeout (>10 giây) → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại" (CMR-16)
- [Err-4] Partial API failure → Section lỗi hiển thị thông báo theo CMR-07, các section khác vẫn hoạt động bình thường

**BUSINESS RULES:**
- BR-01: Tin tức hiển thị tối đa 5 bài, sắp xếp thời gian đăng giảm dần
- BR-02: Quick Access cố định, không tùy chỉnh
- BR-03: Thông báo red dot cập nhật qua polling 30s/lần
- BR-04: Ngôn ngữ lưu vào server/user profile, áp dụng cho toàn hệ thống
- BR-05: Chatbot reset vị trí khi quay lại trang chủ
- BR-06: Debounce navigation — prevent duplicate khi double tap (MỚI)
- BR-07: Force close → Giữ session, quay về Trang chủ (MỚI)
- BR-08: Uninstall → Yêu cầu đăng nhập lại (MỚI)
- BR-09: Xử lý lỗi độc lập từng section (MỚI)
- BR-10: Pull to Refresh reload toàn bộ dữ liệu (MỚI)

**UI/UX FEEDBACK:**
- Loading state: Skeleton loading cho Card thông tin và Tin tức
- Error message: Hiển thị tại vùng section tương ứng + nút "Thử lại" (cho lỗi mạng/timeout)
- Pull to Refresh: Spinner ở đầu danh sách
- Debounce: Prevent duplicate navigation khi tap nhanh

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
4. Tap ngôn ngữ khác → Áp dụng cho toàn hệ thống, cập nhật mã header, tải lại Tin tức (không dùng cache), đóng popup

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap ngôn ngữ hiện tại → Đóng popup, không thay đổi

**Đánh giá:** ✅ Clear — Flow chính và alternative flows được mô tả rõ ràng. Timeout đã thống nhất 10 giây. Bổ sung Pull to Refresh, debounce, partial error handling.

**Score: 18/20** *(Trừ 2 điểm: chưa mô tả polling failure handling và Android Back button behavior)*

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
| Chuyển ngôn ngữ | Tin tức | Data reload | Chuyển ngôn ngữ → Tải lại tin tức (không cache) | ✅ |
| Polling thông báo | Red dot | Real-time update | Polling 30s → Cập nhật red dot | ⚠️ — Thiếu mô tả fallback khi polling fail |
| Pull to Refresh | Toàn bộ sections | Data reload | Kéo xuống → Reload tất cả dữ liệu | ✅ |
| Debounce | Navigation buttons | UX protection | Prevent duplicate navigation | ✅ |

### Phân tích consistency

- ✅ **Tab Footer "Cài đặt" vs Icon Người dùng:** Cả hai đều điều hướng đến UC249 — nhất quán (cùng entry point).
- ✅ **Refresh behavior:** Mỗi tab footer đều refresh dữ liệu khi tap — nhất quán.
- ✅ **Error handling:** Xử lý độc lập từng section — nhất quán với CMR-07.
- ✅ **Timeout:** 10 giây — nhất quán với CMR-16.

**Đánh giá:** ⚠️ Partial — Các liên kết navigation và data dependency được mô tả tốt. Duy nhất thiếu mô tả fallback khi polling fail.

**Score: 8/10**

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
| AC-FN-03 | Chuyển ngôn ngữ → Áp dụng toàn hệ thống, Tin tức tải lại (không cache) | ✅ |
| AC-FN-04 | Tap item Sidebar → Đóng Sidebar + điều hướng | ✅ |
| AC-FN-05 | Tap vùng ngoài Sidebar → Đóng, không điều hướng | ✅ |
| AC-FN-06 | Ngôn ngữ lưu server, không reset khi đóng app | ✅ |
| AC-FN-07 | Chatbot reset vị trí mặc định khi quay lại trang chủ | ✅ |
| AC-FN-08 | Lỗi API → Xử lý độc lập từng section, không chặn section khác | ✅ |
| AC-FN-09 | Pull to Refresh → Reload toàn bộ dữ liệu, spinner, cập nhật | ✅ |
| AC-FN-10 | Double tap → Debounce, không duplicate navigation | ✅ |
| AC-FN-11 | Force close → Giữ session, quay về Trang chủ | ✅ |
| AC-FN-12 | Uninstall + cài lại → Yêu cầu đăng nhập lại | ✅ |
| AC-FN-13 | Timeout > 10 giây → Hiển thị thông báo + nút Thử lại | ✅ |

### Integration Acceptance Criteria

| AC-ID | Tiêu chí | Trạng thái |
| --- | --- | --- |
| AC-INT-01 | Mỗi tab Footer tap → Refresh dữ liệu | ✅ |
| AC-INT-02 | Quick Access navigation đến đúng UC tương ứng | ✅ |
| AC-INT-03 | Pull to Refresh không trigger duplicate API (CMR-13) | ✅ |

**Đánh giá:** ✅ Clear — Acceptance criteria đầy đủ và rõ ràng cho phần lớn chức năng. Cải thiện đáng kể so với v1.

**Score: 9/10** *(Trừ 1 điểm: thiếu AC cho polling failure và session expiry)*

---

## 9. Non-functional Requirements

| NFR | Mô tả | Trạng thái |
| --- | --- | --- |
| Performance — Loading | Loading indicator (spinner/skeleton) cho API calls | ✅ Clear |
| Performance — Timeout | 10 giây, phù hợp CMR-07/CMR-16 | ✅ Clear |
| Performance — Lazy Load | 20 bản ghi/lần, cuộn đến cuối → tải thêm (CMR-04) | ✅ Clear |
| Performance — Debounce | Prevent duplicate navigation khi double tap | ✅ Clear |
| Security — Session | Force close giữ session; Uninstall yêu cầu đăng nhập lại | ✅ Clear |
| Security — Session Expiry | Chưa mô tả behavior khi session hết hạn giữa chừng | ⚠️ Partial |
| Accessibility | Screen reader, contrast ratio, font size, touch target — tham chiếu UI design specs | ⚠️ Partial |
| Compatibility | Chỉ nói Portrait mode, chưa đề cập landscape/OS versions | ⚠️ Partial |

**Đánh giá:** ⚠️ Partial — Cải thiện đáng kể so với v1 (timeout resolved, debounce added, session behavior clarified). Còn thiếu session expiry và compatibility details.

**Score: 4/5**

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
| --- | --- | --- | --- | --- |
| 1 | Feature Identity | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 5/5 | ✅ |
| 3 | Actors & User Roles | 10 | 10/10 | ✅ |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ✅ |
| 5 | UI Object Inventory & Mapping | 15 | 14/15 | ✅ |
| 6 | Object Attributes & Behavior Definition | 20 | 17/20 | ⚠️ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 18/20 | ✅ |
| 8 | Functional Integration Analysis | 10 | 8/10 | ⚠️ |
| 9 | Acceptance Criteria | 10 | 9/10 | ✅ |
| 10 | Non-functional Requirements | 5 | 4/5 | ⚠️ |
| **Total** | | **110** | **99/110 → 90.0/100** | **✅ READY** |

**Normalization:** round((99 / 110) × 100, 1) = **90.0 / 100**

**Verdict: ✅ READY** — Tài liệu đủ điều kiện để bắt đầu thiết kế test case. Các câu hỏi còn lại (Q5, Q6, Q7) có priority Medium/Low và không block test design cho happy path và majority of scenarios.

---

## 📋 Unified Gap & Question Report

### Câu hỏi đã được giải quyết (từ v1)

| ID | Priority | Question | Cách giải quyết | Status |
| --- | --- | --- | --- | --- |
| Q1 | High | UC ghi timeout 30 giây, CMR-07/CMR-16 ghi 10 giây. Giá trị nào đúng? | UC đã cập nhật thành "Timeout (quá 10 giây)" — phù hợp CMR-07/CMR-16 | ✅ Resolved |
| Q2 | Medium | Partial API failure: UI xử lý từng section độc lập hay toàn màn hình? | UC bổ sung "Quy tắc xử lý lỗi độc lập từng section" — mỗi section xử lý riêng | ✅ Resolved |
| Q3 | Medium | Trang chủ có hỗ trợ Pull to Refresh không? | UC bổ sung section "Pull to refresh" tham chiếu CMR-13 | ✅ Resolved |
| Q4 | Medium | Double tap có cơ chế debounce không? | UC bổ sung "Quy tắc debounce cho navigation" | ✅ Resolved |
| Q8 | Low | Phiên bản v3 hay v4? Không nhất quán. | UC đã thống nhất v4 ở cả header và bảng thuộc tính | ✅ Resolved |
| Q9 | Low | Chuyển ngôn ngữ có cập nhật toàn bộ text UI không? | UC ghi "Áp dụng ngôn ngữ đó cho toàn hệ thống" — đủ rõ | ✅ Resolved |
| Q12 | Low | Reopen app sau force-close: quay về đâu? | UC bổ sung: Force close → Trang chủ + giữ session; Uninstall → đăng nhập lại | ✅ Resolved |

### Câu hỏi còn mở

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q5 | Medium | N/A (Missing) | Khi session hết hạn trong lúc người dùng đang ở Trang chủ, hệ thống xử lý thế nào? Redirect về đăng nhập hay hiển thị thông báo? | Cần biết để test session timeout scenario — critical cho security testing. | Open |
| Q6 | Medium | N/A (Missing) | Khi Sidebar đang mở và người dùng nhấn nút Back vật lý (Android), Sidebar sẽ đóng hay thoát app? | Behavior nút Back vật lý cần rõ ràng để test trên Android. | Open |
| Q7 | Medium | "Polling 30 giây/lần" — Mục 2.1 | Khi polling thông báo thất bại (mất mạng giữa chừng), hệ thống xử lý thế nào? Bỏ qua lần poll này hay hiển thị lỗi? | Cần xác nhận để test edge case polling failure — đặc biệt quan trọng nếu app chạy lâu. | Open |
| Q10 | Low | N/A (Missing) | App có hỗ trợ landscape mode không? Nếu không, có lock portrait không? | Cần biết để xác định phạm vi test UI responsiveness. | Open |
| Q11 | Low | "Kéo thả (Drag & Drop)" — Floating Widget | Khi kéo Chatbot icon ra ngoài vùng màn hình, hệ thống xử lý thế nào? Snap trở lại vị trí hợp lệ gần nhất? | Cần mô tả boundary cho drag & drop để test edge case. | Open |

---

## 🟢 What's Good

- **Timeout conflict đã được giải quyết:** UC thống nhất 10 giây, phù hợp CMR-07/CMR-16.
- **Partial API failure** được mô tả rõ ràng: xử lý độc lập từng section, không block toàn màn hình.
- **Pull to Refresh** đã được bổ sung với tham chiếu CMR-13.
- **Debounce navigation** đã được thêm — prevent duplicate khi double tap.
- **App lifecycle** được mô tả: force close giữ session, uninstall yêu cầu đăng nhập lại.
- **Ngôn ngữ** rõ ràng hơn: "áp dụng cho toàn hệ thống", không dùng cache ngôn ngữ cũ.
- **Phiên bản** nhất quán: v4 ở cả header và bảng thuộc tính.
- **Lazy load** được bổ sung: 20 bản ghi/lần, tham chiếu CMR-04.

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- Happy path: Đăng nhập → Trang chủ hiển thị đầy đủ components
- Navigation: Tất cả quick access items, footer tabs, sidebar items
- Chuyển ngôn ngữ: Flow chọn, reload tin tức, persistence, áp dụng toàn hệ thống
- Error handling: 3 loại lỗi (mạng, 500, timeout 10s) + xử lý độc lập từng section
- Partial API failure: 1 section lỗi, các section khác vẫn hoạt động
- Pull to Refresh: Kéo xuống → Spinner → Reload → Ẩn spinner
- Debounce: Double tap không gây duplicate navigation
- UI display: Truncate tên, tin tức rỗng, cuộn ngang, red dot, category tags
- Chatbot: Tap mở, drag & drop, reset vị trí khi quay lại
- App lifecycle: Force close → giữ session; Uninstall → đăng nhập lại
- Lazy load: Cuộn đến cuối → tải thêm 20 bản ghi

**What CANNOT be tested yet (blocked by gaps):**
- Session expiry behavior khi đang ở Trang chủ (Q5)
- Android Back button khi Sidebar mở (Q6)
- Polling failure handling (Q7)
- Landscape mode support (Q10)
- Chatbot drag boundaries (Q11)

**Recommendation:** Các câu hỏi còn lại (Q5-Q7, Q10-Q11) không block test design cho majority of scenarios. QA có thể bắt đầu thiết kế test case ngay, và bổ sung test case cho các edge case khi BA trả lời.

---

## 📌 Summary & Recommendation

UC1 — Màn hình Trang chủ đã được cải thiện đáng kể so với lần review v1. Tất cả các vấn đề High priority đã được giải quyết (timeout conflict). Phần lớn các vấn đề Medium priority cũng đã được bổ sung (partial API failure, Pull to Refresh, debounce, reopen app). Điểm số tăng từ **78.2/100 (Conditionally Ready)** lên **90.0/100 (Ready)**. QA có thể bắt đầu thiết kế test case cho toàn bộ chức năng. Các câu hỏi còn lại (Q5, Q6, Q7, Q10, Q11) thuộc edge case và có thể bổ sung test case sau khi BA trả lời.

---

## 📝 Changelog (v1 → v2)

| Thay đổi | Mô tả | Câu hỏi liên quan |
| --- | --- | --- |
| Timeout 30s → 10s | UC cập nhật timeout thành 10 giây, phù hợp CMR-07/CMR-16 | Q1 ✅ Resolved |
| Bổ sung xử lý lỗi độc lập từng section | Mỗi section xử lý riêng, không block toàn màn hình | Q2 ✅ Resolved |
| Bổ sung Pull to Refresh | Tham chiếu CMR-13, mô tả spinner + reload | Q3 ✅ Resolved |
| Bổ sung debounce navigation | Prevent duplicate khi double tap | Q4 ✅ Resolved |
| Thống nhất phiên bản v4 | Header và bảng thuộc tính đều ghi v4 | Q8 ✅ Resolved |
| Bổ sung ngôn ngữ "toàn hệ thống" | Rõ ràng hơn về scope áp dụng ngôn ngữ | Q9 ✅ Resolved |
| Bổ sung app lifecycle | Force close giữ session; Uninstall đăng nhập lại | Q12 ✅ Resolved |
| Bổ sung Lazy Load | 20 bản ghi/lần, tham chiếu CMR-04 | Mới |
| Score tăng | 78.2/100 → 90.0/100 | — |
| Verdict thay đổi | Conditionally Ready → Ready | — |
