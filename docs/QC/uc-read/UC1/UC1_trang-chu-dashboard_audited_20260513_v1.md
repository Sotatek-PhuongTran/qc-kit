# UC Readiness Review — UC1: Màn hình Trang chủ (Dashboard) Mobile
**Functional / Black-box Test Readiness Report**

| Thuộc tính | Giá trị |
|---|---|
| **Document title** | UC1 Readiness Review |
| **UC source** | `docs/BA/UC1_TrangChuDashboard/UC1_TrangChuDashboard.md` (v4.1, 29/04/2026) |
| **Wireframe source** | `docs/BA/UC1_TrangChuDashboard/UC1. homepage.png` |
| **Common rules** | `docs/BA/Common rule/CMR_Mobile.md` (v1.5) |
| **Date created** | 2026-05-13 |
| **Author / Agent** | qc-uc-read (run-010, first-audit) |
| **Version** | v1 |
| **Output language** | Tiếng Việt (theo input source) |

---

## Feature Brief

UC1 là Màn hình Trang chủ Mobile — entry point của ứng dụng sau khi NĐT đăng nhập thành công, cung cấp tổng quan tài khoản và 6 lối tắt Quick Access đến các chức năng nghiệp vụ chính. Layout dọc gồm 5 khối: Header điều hướng (Hamburger + Logo + Language + Notification + User), Card thông tin người dùng (avatar + tên + vai trò), Quick Access (6 cards), Tin tức (horizontal scroll, tối đa 5 tin), Footer (Bottom Navigation 4 tab), kèm Floating Chatbot. Toàn bộ người dùng đã đăng nhập (3 vai trò: NĐT VN, NĐT NN, Tổ chức/DN) thấy cùng nội dung. Các business rules quan trọng: polling 30s cho red dot thông báo, lazy load 20 tin tức (mâu thuẫn với "tối đa 5 tin"), pull-to-refresh CMR-13, debounce double-tap CMR-18, xử lý lỗi độc lập từng section CMR-07, đa ngôn ngữ 5 ngôn ngữ lưu server-side CMR-17, timeout API 10s CMR-16, reset chatbot position khi revisit, refresh on focus mỗi tab tap. Known exceptions: lỗi mạng / 500 / timeout / 401 (refresh token >15 ngày), empty state "Không có dữ liệu.".

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `71.5 / 100` | ⚠️ **CONDITIONALLY READY** |

**Lý do:** Spec ở mức chi tiết tốt cho UI inventory, behaviour rules và error handling, nhưng có 5 conflicts (4 wireframe ↔ spec, 1 internal contradiction về Tin tức "5 max vs lazy 20"), thiếu section Acceptance Criteria formal, và NFR chưa có target cụ thể. Tester có thể bắt đầu thiết kế test case cho phần lớn flows nhưng MUST resolve các Conflict + High-priority questions trước khi đóng test design.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC1 | Màn hình Trang chủ (Dashboard) Mobile | v4.1 | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong & huy.lai2 | *(chưa rõ — BA tự khai)* | 29/04/2026 | 12/05/2026 |

---

## 1. Objective & Scope

### 1.1 Objective ✅
Cung cấp màn hình Trang chủ Mobile làm điểm khởi đầu sau đăng nhập, hiển thị tổng quan thông tin tài khoản người dùng + 6 lối tắt Quick Access + dòng Tin tức mới nhất, để NĐT có thể nhanh chóng điều hướng đến các nghiệp vụ chính (Hồ sơ, Đặt lịch, KCN/KKT, FAQ, VBPL, Hướng dẫn).

> Trích: §1 "Cung cấp tổng quan thông tin tài khoản và các lối tắt điều hướng nhanh (Quick Access) đến các chức năng chính của ứng dụng."

### 1.2 In Scope ⚠️ Partial
- Hiển thị Header (5 elements), Card thông tin người dùng (3 elements), Quick Access (6 cards cố định), Tin tức (tối đa 5 tin), Floating Chatbot, Footer (4 tabs).
- Điều hướng đi từ Trang chủ tới UC249, UC258/259, UC75, UC45, UC42, UC2, UC82, UC69, UC60, UC55-68, UC69+UC73.
- Chuyển ngôn ngữ áp dụng toàn hệ thống (5 ngôn ngữ).
- Pull-to-refresh, lazy load, error handling section-độc-lập, polling 30s thông báo, debounce double-tap, reopen-app behaviour.

### 1.3 Out of Scope ⚠️ Missing
- *(Spec không liệt kê explicit Out-of-Scope cho UC1.)*
- *(inferred)* Phiên bản Trang chủ cho Khách/Anonymous chưa nói (project-context-master §4 cho phép Khách xem nhiều UC public mà không cần đăng nhập) — UC1 chỉ phục vụ user đã đăng nhập.
- *(inferred)* Cấu hình ẩn/hiện Quick Access — spec ghi "không được tùy chỉnh" ⇒ tính năng customize không thuộc UC1.

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| NĐT — Nhà đầu tư Việt Nam | Primary | Đã đăng nhập; truy cập đầy đủ UC1; vai trò hiển thị trên Card = "Nhà đầu tư Việt Nam" (theo spec) hoặc "Nhà đầu tư" (theo wireframe) — **xung đột, xem Q1**. |
| NĐT — Nhà đầu tư nước ngoài | Primary | Đã đăng nhập; nội dung Trang chủ giống NĐT VN; vai trò hiển thị = "Nhà đầu tư nước ngoài". |
| NĐT — Tổ chức / Doanh nghiệp | Primary | Đã đăng nhập; nội dung Trang chủ giống; vai trò hiển thị = "Tổ chức/Doanh nghiệp". |
| Hệ thống (Backend API) | System | Trả về user info (Tên, Vai trò, Avatar — mặc định) + 5 tin tức mới nhất + trạng thái notification unread (polling). |
| Hệ thống (Push Notification — FCM/APNs) | System | *(inferred từ project-context §5)* cung cấp cơ chế thông báo nhưng UC1 chỉ render red dot thông qua polling 30s, không qua push thật. |
| Khách / Anonymous | (out of scope) | Không thuộc UC1; *(inferred)* không truy cập được Trang chủ — xem Q2. |

> Trích: §1 "Phân quyền: Toàn bộ người dùng đã đăng nhập. Áp dụng cho tất cả users/roles: Nội dung trang chủ (Header, Card thông tin, Quick Access, Tin tức, Footer) luôn giống nhau giữa các users/roles bao gồm: Nhà đầu tư Việt Nam, Nhà đầu tư nước ngoài, Tổ chức/Doanh nghiệp."

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions ⚠️ Partial
- *(inferred từ §1 "Truy cập chức năng")* Người dùng đã đăng nhập thành công (UC256 hoàn tất, session token hợp lệ).
- *(inferred)* App đã được cài đặt và mở; thiết bị có kết nối mạng (hoặc cache offline cho nội dung tĩnh theo KT-05 trong project-context — nhưng UC1 không khai báo offline behaviour).
- *(inferred)* User profile (Tên, Vai trò) đã tồn tại trên backend.

> **Gap:** Spec không có section "Preconditions" formal — chỉ phát biểu implicit trong câu "Mở ứng dụng → Đăng nhập thành công → Tự động điều hướng về Trang chủ."

### 3.2 Postconditions ✅ (cho main flow)
| Sau khi… | System state / Postcondition |
|----------|------------------------------|
| Hiển thị Trang chủ thành công | Session người dùng được duy trì. |
| Hiển thị Trang chủ thành công | Toàn bộ thông tin hiển thị là dữ liệu mới nhất (up-to-date). |
| Hiển thị Trang chủ thành công | Dữ liệu Tin tức được hiển thị theo ngôn ngữ hiện tại của hệ thống. |
| Tap Quick Access card / Footer tab / Tin tức / Hamburger item | *(inferred)* Điều hướng đến màn hình tương ứng; state UC1 được dispose (theo CMR-01 reset khi chuyển màn) hoặc giữ session theo nav stack — Q3. |
| Pull-to-refresh thành công | Card thông tin + Tin tức được reload; spinner ẩn. |
| Đổi ngôn ngữ thành công | Tin tức tải lại theo ngôn ngữ mới; mã ngôn ngữ trên Header cập nhật; ngôn ngữ lưu server. |
| Tap tab Trang chủ khi đang ở Trang chủ | Toàn bộ dữ liệu refresh (không có quy định reset scroll position — Q4). |

---

## 4. UI Object Inventory & Mapping

> **Nguồn:** Wireframe `UC1. homepage.png` + spec §2.1. Mỗi atomic UI element 1 dòng. Total **38 rows** (bao gồm transient elements).

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|------------------|------------------|------|----------|---------|-------------|-------------|--------------------------|--------|
| 1 | Header | (☰ Hamburger) | Button (Icon) | N/A | — | — | — | Tap → Mở Sidebar Navigation từ trái màn hình. Sidebar có 10 menu items: Trang chủ, Giới thiệu, Lĩnh vực đầu tư, Khu vực đầu tư, Liên hệ, Thủ tục hành chính, Quản lý hồ sơ, Quản lý đặt lịch, Phản ánh kiến nghị, Cấu hình tài khoản. Đa ngôn ngữ. | spec §2.1 Header #1 + wireframe |
| 2 | Header | Logo + "Cổng Đầu Tư" | Image + Label | N/A | "Cổng Đầu Tư" | — | — | App Logo icon vuông đỏ + dòng chữ. Sát phải nút Hamburger. Không tap được. | spec §2.1 Header #2 + wireframe |
| 3 | Header | Language selector "VI" | Button (Icon + Text) | N/A | "VI" | — | "VI" / "EN" / "ZH" / "JA" / "KO" | Globe icon + mã ngôn ngữ hiện tại. Tap → Bottom Sheet/Dropdown "Chọn ngôn ngữ". | spec §2.1 Header #3 + wireframe |
| 4 | Header | Notification (🔔) | Button (Icon) + Red dot | N/A | — | — | — | Red dot (không kèm số) khi có thông báo chưa đọc. Polling 30s. Tap → UC258/259. | spec §2.1 Header #4 + wireframe |
| 5 | Header | User icon (avatar mini) | Button (Image) | N/A | — | — | — | Icon user / avatar thu nhỏ ngoài cùng phải. Tap → UC249. | spec §2.1 Header #5 + wireframe |
| 6 | Card thông tin người dùng | Avatar (Circle) | Image | N/A | Icon mặc định hệ thống | — | — | LUÔN icon mặc định, không lấy ảnh profile. Không tap được. | spec §2.1 Card #1 + wireframe |
| 7 | Card thông tin người dùng | "Xin chào," | Label (Static) | N/A | "Xin chào," | — | — | **(inferred — có trong wireframe nhưng KHÔNG có trong spec table)** Greeting label cố định trên dòng tên. Q5. | wireframe only |
| 8 | Card thông tin người dùng | Tên đầy đủ | Label | N/A | — | — | — | VD: "Nguyễn Văn A". Truncate "…" nếu quá 1 dòng. Không tap. | spec §2.1 Card #2 + wireframe |
| 9 | Card thông tin người dùng | Vai trò | Label | N/A | — | — | "Nhà đầu tư Việt Nam" / "Nhà đầu tư nước ngoài" / "Tổ chức/Doanh nghiệp" | Plain text. Không tap. **Wireframe hiển thị "Nhà đầu tư" không thuộc enum — Q1.** | spec §2.1 Card #3 + wireframe |
| 10 | Quick Access | Section title "Truy cập nhanh" | Static text | N/A | "Truy cập nhanh" | — | — | Tiêu đề section. Không tap. | wireframe + implicit spec |
| 11 | Quick Access | Card "Hướng dẫn sử dụng" | Card (Icon + Label) | N/A | — | — | — | Fixed order, không tùy chỉnh. Tap → UC75. | spec §2.1 QA #1 + wireframe |
| 12 | Quick Access | Card "Quản lý hồ sơ" | Card (Icon + Label) | N/A | — | — | — | Tap → UC45. | spec §2.1 QA #2 + wireframe |
| 13 | Quick Access | Card "Quản lý đặt lịch" | Card (Icon + Label) | N/A | — | — | — | Tap → UC42. **Spec liệt kê thứ tự #3 nhưng wireframe đặt ở hàng 2 cột 1 (Q6).** | spec §2.1 QA #3 + wireframe |
| 14 | Quick Access | Card "Khu công nghiệp / KKT" | Card (Icon + Label) | N/A | — | — | — | Tap → UC2. **Spec liệt kê #4 nhưng wireframe đặt ở hàng 1 cột 3 (Q6).** | spec §2.1 QA #4 + wireframe |
| 15 | Quick Access | Card "Câu hỏi (FAQ)" | Card (Icon + Label) | N/A | — | — | — | Tap → UC82. | spec §2.1 QA #5 + wireframe |
| 16 | Quick Access | Card "Văn bản pháp luật" | Card (Icon + Label) | N/A | — | — | — | Tap → UC69. | spec §2.1 QA #6 + wireframe |
| 17 | Tin tức | Section title "Tin tức" | Static text | N/A | "Tin tức" | — | — | Cố định đầu khung, căn trái. Không tap. | spec §2.1 News #1 + wireframe |
| 18 | Tin tức | Button "Xem tất cả" | Button (Text) | N/A | "Xem tất cả" | — | — | Chữ đỏ, phải tiêu đề. Tap → danh sách Tin tức đầy đủ (UC55-68). | spec §2.1 News #2 + wireframe |
| 19 | Tin tức > Card | Thumbnail bo góc | Image | N/A | — | — | — | Ảnh đại diện tin. *(inferred)* không quy định kích thước/aspect ratio. Q7. | spec §2.1 News #3 + wireframe |
| 20 | Tin tức > Card | Category tag | Badge (text + color) | N/A | — | — | "Chính sách" (Đỏ) / "Tin đầu tư" (Xanh) / "Thành công" (Cam) | Màu sắc theo loại. *(inferred)* các loại khác không có trong spec → Q8. | spec §2.1 News #3 + wireframe |
| 21 | Tin tức > Card | Ngày đăng | Label (Date) | N/A | — | — | — | Format DD/MM/YYYY. Wireframe: "12/04/2026". | spec §2.1 News #3 + wireframe |
| 22 | Tin tức > Card | Tiêu đề bài viết | Label | N/A | — | — | — | Tối đa 2 dòng, truncate nếu dài. Tap card → chi tiết bài viết (UC55-68). | spec §2.1 News #3 + wireframe |
| 23 | Tin tức | Danh sách (Horizontal Scroll) | List Card | N/A | — | — | — | Tối đa 5 tin mới nhất, sort published_date DESC. Vuốt ngang để xem thêm. **Conflict: cùng spec ghi "lazy load 20" — Q9.** | spec §2.1 News #3 |
| 24 | Tin tức (empty) | "Không có dữ liệu." | Static text (Empty State) | N/A | "Không có dữ liệu." | — | — | Khi không có tin → empty state center. Theo CMR-14. | spec §2.1 + CMR-14 |
| 25 | Floating Widget | Icon Chatbot | Button (Floating Action) | N/A | Vị trí mặc định: góc dưới phải, trên Footer | — | — | Tap → UC60. Drag & drop di chuyển. Reset position khi revisit. Không lưu vị trí server. *(inferred)* không có drag boundary spec — Q10. | spec §2.1 Floating + wireframe |
| 26 | Footer | Tab "Trang chủ" + Icon Ngôi nhà | Button (Tab) | N/A | Active | — | — | Active state: icon + text màu đỏ. Tap → refresh Trang chủ. | spec §2.1 Footer #1 + wireframe |
| 27 | Footer | Tab "Thủ tục" + Icon Văn bản | Button (Tab) | N/A | — | — | — | Tap → UC69, UC73; refresh data on tap. | spec §2.1 Footer #2 + wireframe |
| 28 | Footer | Tab "KCN/KKT" + Icon Bản đồ | Button (Tab) | N/A | — | — | — | Tap → UC2; refresh data on tap. | spec §2.1 Footer #3 + wireframe |
| 29 | Footer | Tab "Cài đặt" + Icon Bánh răng | Button (Tab) | N/A | — | — | — | Tap → UC249; refresh data on tap. Ngoài cùng phải. | spec §2.1 Footer #4 + wireframe |
| 30 | Loading (Card thông tin) | Loading skeleton/spinner | Loader | N/A | — | — | — | Hiện trong khi chờ API user info. | spec §3.1 step 2 |
| 31 | Loading (Tin tức) | Skeleton loading | Loader | N/A | — | — | — | Hiện trong khi chờ API tin tức. | spec §3.1 step 6 |
| 32 | Pull-to-refresh | Spinner (top) | Loader | N/A | — | — | — | Hiện khi kéo xuống đầu danh sách. CMR-13. | spec §2.1 + CMR-13 |
| 33 | Error (network) | Toast/banner "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" | Toast / Error UI | N/A | — | — | — | CMR-07 lỗi mạng. *(inferred)* visual UI cụ thể không spec — Q11. | spec §2.1 Xử lý lỗi + CMR-07 |
| 34 | Error (HTTP 500) | Toast/banner "Hệ thống đang bận. Vui lòng thử lại sau." | Toast / Error UI | N/A | — | — | — | CMR-07 lỗi 500. | spec §2.1 + CMR-07 |
| 35 | Error (Timeout) | Toast/banner "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại" | Toast / Error UI | N/A | — | — | — | CMR-16 timeout 10s. | spec §2.1 + CMR-16 |
| 36 | Error (Session expired 401) | Toast "Phiên đăng nhập hết hạn." | Toast | N/A | — | — | — | CMR-07 v1.5: tự refresh token; nếu refresh token >15 ngày → redirect login + toast này. | CMR-07 |
| 37 | Language Bottom Sheet | Popup "Chọn ngôn ngữ" (Bottom Sheet / Dropdown) | Modal / Bottom Sheet | N/A | — | — | "Tiếng Việt" / "English" / "中文" / "日本語" / "한국어" | Mở khi tap language icon. Ngôn ngữ hiện tại check màu đỏ. Tap khác → áp dụng + đóng. Tap hiện tại → đóng không đổi. *(inferred)* không có inventory cho popup này trong UC1 (reference "UC CMR về Sidebar Navigation" cũng không tồn tại) — Q12. | spec §2.1 Header #3 |
| 38 | Sidebar Navigation | Drawer chứa 10 menu items | Modal Drawer | N/A | — | — | "Trang chủ" / "Giới thiệu" / "Lĩnh vực đầu tư" / "Khu vực đầu tư" / "Liên hệ" / "Thủ tục hành chính" / "Quản lý hồ sơ" / "Quản lý đặt lịch" / "Phản ánh kiến nghị" / "Cấu hình tài khoản" | Mở từ Hamburger. Tap item → đóng + điều hướng. Tap vùng mờ → đóng không điều hướng. *(inferred)* không có inventory chi tiết cho Sidebar trong UC1 — Q13. | spec §2.1 Header #1 |

> **UI coverage delta:** image có 34 atomic elements; section 4 có 38 rows (≥34) bao gồm các transient overlays — đạt **Delta = 0**.

---

## 5. Object Attributes & Behavior Definition

> **1-to-1 mapping rule:** mỗi row trong Section 4 có ít nhất 1 row trong Section 5.

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| **1. Hamburger (☰)** | Enabled (luôn hiển thị). | Tap → mở Sidebar drawer từ trái. | Sidebar render với 10 menu items. Tap vùng mờ ngoài → đóng. |
| **2. Logo + "Cổng Đầu Tư"** | Enabled (read-only). | Không tap. | Static — không thay đổi theo state. |
| **3. Language selector "VI"** | Enabled. Default "VI". | Tap → mở Bottom Sheet "Chọn ngôn ngữ". | Khi chọn ngôn ngữ khác: cập nhật mã hiển thị, reload Tin tức theo ngôn ngữ mới, lưu lên server (CMR-17). Tap hiện tại → đóng không đổi. |
| **4. Notification (🔔)** | Enabled. Red dot hiển thị/ẩn theo unread state. | Tap → điều hướng UC258/259. | Polling 30s/lần kiểm tra unread; cập nhật red dot ngay khi có thông báo mới. Q14: behaviour khi 1 lần polling fail. Q15: behaviour khi app vào background. |
| **5. User icon** | Enabled. | Tap → UC249. | Static icon — không phụ thuộc dữ liệu. |
| **6. Avatar (Card)** | Enabled (read-only). LUÔN icon mặc định. | Không tap. | Không phụ thuộc dữ liệu profile — luôn icon mặc định hệ thống. |
| **7. "Xin chào," label** | Enabled (read-only). | Không tap. | Static — không đổi theo state. *(inferred — không có spec.)* |
| **8. Tên đầy đủ** | Loading skeleton trong khi chờ API; sau khi load: text Enabled. Khi API fail: section thông tin user hiển thị error (Q16). | Không tap. | Truncate 1 dòng + "…". Cập nhật theo API user info. |
| **9. Vai trò** | Loading skeleton; sau load: text Enabled. | Không tap. | Plain text theo enum role. Nếu API trả vai trò không thuộc 3 enum → hiển thị gì? — Q1. |
| **10. Quick Access section title** | Enabled (read-only). | Không tap. | Static. |
| **11–16. Quick Access cards** | Enabled (fixed). | Tap → điều hướng tới UC đích (UC75/UC45/UC42/UC2/UC82/UC69 tương ứng). | Debounce double-tap (CMR-18). Không tùy chỉnh thứ tự hay ẩn/hiện. |
| **17. Tin tức section title** | Enabled (read-only). | Không tap. | Static. |
| **18. "Xem tất cả" button** | Enabled. | Tap → UC55-68 (danh sách Tin tức đầy đủ). | Debounce double-tap. |
| **19. Card thumbnail** | Enabled (image). | Tap (toàn card) → chi tiết bài viết UC55-68. | Lazy load image; nếu API trả ảnh null → *(inferred)* placeholder ảnh mặc định — Q7. |
| **20. Category tag** | Enabled (read-only badge). Màu theo loại. | Không tap (badge read-only theo CMR-05). | Màu mapping: Đỏ "Chính sách", Xanh "Tin đầu tư", Cam "Thành công". Loại khác — Q8. |
| **21. Ngày đăng** | Enabled (read-only). | Không tap. | Format DD/MM/YYYY (lưu ý: KHÁC CMR-12 chung là `dd/MM/yyyy` — nhất quán). |
| **22. Tiêu đề bài viết** | Enabled. | Tap toàn card → chi tiết. | Tối đa 2 dòng, truncate "…". |
| **23. News horizontal list** | Loading skeleton trong khi chờ API; sau load: list Enabled. Khi list rỗng: hiển thị empty state (row #24). Khi API fail: section riêng error theo CMR-07. | Vuốt ngang → cuộn tin tức. | Tối đa 5 tin (theo spec) ; spec cũng ghi "lazy load 20" — **mâu thuẫn Q9**. Sort published_date DESC. |
| **24. "Không có dữ liệu." empty state** | Hidden mặc định. Visible khi list = []. | Không tap. | CMR-14. Không có nút "Thử lại" cho empty state. |
| **25. Floating Chatbot** | Enabled. Vị trí mặc định góc dưới phải, trên Footer. | Tap → UC60. Long-press + drag → di chuyển. Reset position khi rời màn hình và quay lại. | Position không lưu server (luôn reset). Drag boundary không spec — Q10. |
| **26. Footer Tab Trang chủ** | Active state (icon + text đỏ) khi đang ở Trang chủ; Inactive ở các màn khác. | Tap → refresh data Trang chủ. | Refresh: tải lại từ đầu. Scroll position reset? — Q4. |
| **27–29. Footer Tab Thủ tục / KCN/KKT / Cài đặt** | Inactive khi ở Trang chủ. | Tap → điều hướng + refresh data màn đích. | Debounce double-tap. |
| **30. Loading skeleton Card** | Visible trong khi API user info đang load. Hidden sau khi load hoặc error. | Không interactive. | Theo CMR-07 first-load full-section loading; per UC1 chỉ skeleton trên Card. |
| **31. Loading skeleton Tin tức** | Visible trong khi API tin tức đang load (sau render khung). Hidden sau load. | Không interactive. | Section-độc-lập: skeleton chỉ ở Tin tức, không ảnh hưởng Card. |
| **32. Pull-to-refresh spinner** | Visible khi user kéo xuống đầu list. Ẩn sau refresh. | Trigger pull gesture. | CMR-13. Không duplicate khi đang loading. Q17: scope refresh — toàn màn hay 1 section? |
| **33. Error network UI** | Visible khi API fail do mạng. Ẩn sau retry thành công hoặc khi user navigate away. | Tap "Thử lại" → gọi lại API. | CMR-07. Hiển thị section-độc-lập (chỉ section bị fail). Visual cụ thể (toast / inline / banner) chưa spec — Q11. |
| **34. Error 500 UI** | Visible khi API trả 500. | Không có "Thử lại" theo CMR-07 (chỉ thông báo). | *(inferred)* user phải pull-to-refresh để retry — Q18. |
| **35. Error timeout UI** | Visible sau 10s API không phản hồi. | Tap "Thử lại" → gọi lại API. | CMR-16. |
| **36. Toast 401** | Visible khi refresh token hết hạn (>15 ngày). | Auto-dismiss. | CMR-07 v1.5. Redirect login. |
| **37. Language Bottom Sheet** | Hidden mặc định. Visible khi tap language icon. | Tap option → áp dụng + đóng. Tap "Tiếng Việt"/option hiện tại → đóng không đổi. Tap vùng ngoài → đóng. | CMR-17. Ngôn ngữ lưu server. |
| **38. Sidebar Drawer** | Hidden mặc định. Visible khi tap Hamburger. | Tap item → đóng + điều hướng. Tap vùng mờ → đóng không điều hướng. | 10 menu items. Đa ngôn ngữ. Không có inventory chi tiết — Q13. |

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Hiển thị Trang chủ (Display Dashboard)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | NĐT | Đăng nhập thành công (UC256) | Auto-navigate đến Trang chủ. | — | Nếu session expired → CMR-07 401 (refresh token; expired >15 ngày → quay lại login). |
| 2 | System | Gọi API user info | Hiển thị skeleton trên Card thông tin. | — | Timeout 10s → CMR-16 "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút Thử lại. |
| 3 | System | API trả về | Render Card thông tin (Tên, Vai trò, Avatar mặc định). | — | API fail (500/network) → section Card hiển thị error theo CMR-07; các section khác không ảnh hưởng (Q16: visual cụ thể). |
| 4 | System | Polling notification 30s/lần | Cập nhật red dot trên Bell. | App ra background — Q15 behaviour. | Polling fail — Q14 retry hay đợi tick sau. |
| 5 | System | Render Quick Access (fixed config) | 6 cards hiển thị. | — | Không có (config local/hardcoded). |
| 6 | System | Gọi API tin tức | Hiển thị skeleton Tin tức. | Đổi ngôn ngữ ở step 4 → reload tin tức ngôn ngữ mới. | Timeout 10s / 500 / network — CMR-07. Section-độc-lập. |
| 7 | System | API tin tức trả về | Render tối đa 5 tin sort DESC. Horizontal scroll. | Nếu < 5 tin → hiển thị toàn bộ — Q19 hành vi scroll khi đủ tin để scroll hay không. List rỗng → empty state CMR-14 "Không có dữ liệu.". | Mâu thuẫn 5 vs lazy-20 — Q9. |
| 8 | NĐT | Kéo xuống đầu danh sách | Spinner pull-to-refresh xuất hiện; reload data. | Đang loading → không trigger duplicate (CMR-13). | Pull fail → giữ dữ liệu cũ + thông báo lỗi CMR-07. |
| 9 | NĐT | Tap tab "Trang chủ" (đang ở Trang chủ) | Refresh toàn bộ data. | — | Q4: scroll position reset hay giữ? |

**B. Business Rules & Validations**

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Tên đầy đủ | Yes (từ API) | Plain text, hỗ trợ multi-byte | — / *(không spec max — CMR-11 default 500)* | *(không spec error riêng; nếu null → "-" theo CMR-14)* |
| Vai trò | Yes (từ API) | Enum 3 giá trị | — | *(không spec error nếu giá trị ngoài enum — Q1)* |
| Avatar | N/A | Luôn icon mặc định hệ thống | — | — |
| Ngày đăng tin | Yes | DD/MM/YYYY | — | *(không spec — nếu null → "-")* |
| Tiêu đề tin tức | Yes | Plain text; truncate 2 dòng "…" | — | — |
| Category tag | Yes | Enum 3 màu | — | *(không spec category mới)* |
| Language code | Yes | Enum 5 ngôn ngữ | — | — |
| Notification polling | System | Mỗi 30 giây | — | — |
| News API | System | Tối đa 5 tin (spec UI) / 20 records (spec phân trang) — **Q9** | — / — | "Hệ thống đang bận. Vui lòng thử lại sau." (CMR-07 — HTTP 500) |
| API timeout | System | 10 giây | — | "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." (CMR-16 / CMR-07) |
| Refresh token | System | Hết hạn sau 15 ngày | — | "Phiên đăng nhập hết hạn." (CMR-07 v1.5) |
| Lazy load page size | System | 20 records / lần | — | — (CMR-04) |
| Lazy load retry | System | 3 lần × 2 giây giữa các lần | — | — (CMR-04 v1.4) |

**C. UI/UX Feedback**

* **Loading States:**
  - Card thông tin: skeleton / spinner trong khi chờ API user info (step 2).
  - Tin tức: skeleton trong khi chờ API news (step 6).
  - Pull-to-refresh: spinner ở đầu danh sách (CMR-13).
  - First-load Trang chủ: theo CMR-07 v1.1 dùng full-screen loading; nhưng UC1 chỉ nêu skeleton cho từng section — **Q20 thống nhất loading state cho first-load Trang chủ**.

* **Toast / Error Messages (exact text):**
  - Lỗi mạng: *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* (CMR-07) + nút **"Thử lại"**.
  - Lỗi API HTTP 500: *"Hệ thống đang bận. Vui lòng thử lại sau."* (CMR-07).
  - Lỗi 404: *"Nội dung không tồn tại hoặc đã bị xóa."* (CMR-07) — *(inferred áp dụng nếu API tin tức trả 404)*.
  - Session 401: *"Phiên đăng nhập hết hạn."* (CMR-07 v1.5) + redirect login.
  - Timeout 10s: *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* (CMR-16) + nút **"Thử lại"**.
  - Empty news list: *"Không có dữ liệu."* (CMR-14).
  - Empty search/filter (không áp dụng ở UC1 — Trang chủ không có search).

* **Visual placement của error UI:** *(inferred)* spec không quy định cụ thể inline/banner/toast — **Q11**.

* **Polling 30s:**
  - Background behaviour không spec — Q15.
  - Polling fail retry rule không spec — Q14.

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis (Cross-function influence) | Data Consistency Verification |
|---------------------------|--------------------------------------------|-------------------------------|
| Đăng nhập thành công (UC256) | UC1 trở thành màn hình entry. Session token được dùng cho tất cả API trên UC1. | Verify API user info trả đúng profile vừa login. |
| Đổi ngôn ngữ (Header #3) | Toàn hệ thống chuyển sang ngôn ngữ mới (CMR-17). Tin tức tải lại (không dùng cache cũ). Sidebar, Footer, Quick Access label đổi ngôn ngữ. Nội dung field người dùng nhập không đổi. | Verify text cứng đổi ngôn ngữ trên mọi UC; verify Tin tức sau reload đúng locale; verify ngôn ngữ persistent server-side (mở thiết bị khác thấy cùng locale). |
| Tap Notification (Header #4) | Điều hướng tới UC258/259. Khi quay lại UC1: red dot có thể đã ẩn (nếu user đọc xong) hoặc giữ (nếu còn unread). Polling tiếp tục refresh. | Verify red dot sync giữa UC258/259 (mark as read) và UC1 sau khi quay lại (≤ 30s do polling). |
| Tap User icon (Header #5) hoặc Footer Cài đặt | Điều hướng UC249. Trong UC249 có thể đổi ngôn ngữ / đổi MK / đăng xuất → khi quay lại UC1 cần verify Card thông tin (nếu user info đổi), language (nếu đổi locale), session (nếu đổi MK → BS-07 đăng xuất bắt buộc → quay lại login). | Verify khi BS-07 trigger logout, user không thể quay lại UC1 bằng back button. |
| Tap Hamburger → Sidebar item | Điều hướng tới UC tương ứng (10 items). Đóng Sidebar trước khi điều hướng. | Verify Sidebar đóng + state UC1 reset (CMR-01 "Reset khi chuyển màn"). |
| Tap Quick Access card | Điều hướng UC75/UC45/UC42/UC2/UC82/UC69. Debounce double-tap (CMR-18). | Verify mỗi card đi đúng UC; verify debounce ngăn duplicate navigation. |
| Tap Tin tức card | Điều hướng UC55-68 với context bài viết. | Verify chi tiết bài viết mapping đúng từ list ID. |
| Tap Footer tab | Điều hướng UC1/UC69+UC73/UC2/UC249 + refresh data UC đích. | Verify refresh thực sự xảy ra (re-fetch API) mỗi lần tap. |
| Floating Chatbot tap | Mở UC60. Khi quay lại UC1: position reset về mặc định. | Verify position không lưu state. |
| Force-close app + reopen | Quay lại Trang chủ + giữ session (CMR-18). | Verify không cần đăng nhập lại; verify state Trang chủ refresh (do step 1 auto-navigate, hoặc retain stack). Q21 nếu reopen sau force-close mà API user info fail thì hành vi ra sao. |
| Uninstall + reinstall | Yêu cầu đăng nhập lại (CMR-18). | Verify session token bị xóa cùng app data. |
| Polling notification | Không ảnh hưởng các section khác; chỉ update red dot. | Verify không re-render toàn màn hình mỗi 30s; chỉ red dot. |
| Section API độc lập (Card / Tin tức) | Nếu 1 API fail → chỉ section đó error, các section khác render bình thường. | Verify section error không phá vỡ Quick Access (fixed local config) và Footer. |

> **Gap:** Không có Impact Matrix tổng hợp trong spec gốc; các integration mapping được agent suy luận từ inline references "Tap → UC…" trong spec. — Q22 yêu cầu BA xác nhận đầy đủ.

---

## 8. Acceptance Criteria

> Spec gốc KHÔNG có section AC formal. AC dưới đây do agent derive từ Section 5 (Object Attributes & Behaviour) + Section 6 (Workflow) — yêu cầu BA xác nhận trước test design.

| AC # | Scenario | Given *(precondition)* | When *(user action)* | Then *(expected result)* |
|------|----------|------------------------|----------------------|--------------------------|
| AC-01 | Hiển thị Trang chủ sau login — Happy | NĐT đã đăng nhập thành công (UC256); thiết bị có mạng | App auto-navigate Trang chủ | Header + Card thông tin (Tên + Vai trò + Avatar mặc định) + Quick Access 6 cards + Tin tức (skeleton → list ≤5) + Footer hiển thị đúng. |
| AC-02 | Skeleton loading Card | Đang chờ API user info | API chưa trả | Card thông tin hiển thị skeleton/spinner; Quick Access + Footer render bình thường. |
| AC-03 | Skeleton loading Tin tức | Đang chờ API news | API chưa trả | Tin tức hiển thị skeleton; Card + Quick Access render bình thường. |
| AC-04 | Red dot Notification — có unread | API trả unread > 0 | Polling tick (≤30s) | Red dot hiển thị trên Bell icon. |
| AC-05 | Red dot Notification — no unread | API trả unread = 0 | Polling tick | Red dot ẩn. |
| AC-06 | Polling realtime update | Đang ở Trang chủ; có thông báo mới từ backend | Sau 30s tiếp theo | Red dot xuất hiện không cần navigate. |
| AC-07 | Đổi ngôn ngữ | Đang ở Trang chủ, locale VI | Tap language icon → chọn "English" | Bottom Sheet đóng; mã hiển thị "EN"; toàn bộ text cứng đổi sang EN; Tin tức tải lại theo locale EN; locale persist trên server. |
| AC-08 | Chọn ngôn ngữ hiện tại | Đang ở Trang chủ, locale VI; Bottom Sheet mở | Tap "Tiếng Việt" | Bottom Sheet đóng, không thay đổi gì. |
| AC-09 | Tin tức empty | API news trả [] | Render xong | Hiển thị empty state "Không có dữ liệu.". Không có nút Thử lại. |
| AC-10 | Tin tức error 500 | API news trả 500 | Render xong | Hiển thị section error CMR-07 *"Hệ thống đang bận. Vui lòng thử lại sau."*; Card + Quick Access vẫn hiển thị bình thường (section-độc-lập). |
| AC-11 | Tin tức error network | Mất mạng khi load tin tức | Render xong | Hiển thị *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** trong section Tin tức. Card + Quick Access không ảnh hưởng. |
| AC-12 | Tin tức timeout 10s | API news không phản hồi 10s | Sau 10s | Hiển thị *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**. |
| AC-13 | Tap Quick Access "Quản lý hồ sơ" | Đang ở Trang chủ | Tap card | Điều hướng UC45. |
| AC-14 | Tap Tin tức card | Đang ở Trang chủ; có ≥1 tin tức | Tap card #1 | Điều hướng UC55-68 chi tiết bài viết tương ứng. |
| AC-15 | Tap Notification icon | Đang ở Trang chủ | Tap Bell | Điều hướng UC258/259. |
| AC-16 | Tap User icon | Đang ở Trang chủ | Tap User icon | Điều hướng UC249. |
| AC-17 | Tap Hamburger | Đang ở Trang chủ | Tap ☰ | Sidebar drawer mở từ trái với 10 menu items đúng thứ tự. |
| AC-18 | Tap vùng mờ ngoài Sidebar | Sidebar đang mở | Tap vùng ngoài | Sidebar đóng; không điều hướng. |
| AC-19 | Tap tab Trang chủ khi đang ở Trang chủ | Đang ở Trang chủ | Tap tab Trang chủ | Toàn bộ data refresh (API gọi lại). |
| AC-20 | Pull-to-refresh | Đang ở Trang chủ; có dữ liệu | Kéo xuống đầu list | Spinner xuất hiện; API gọi lại; sau thành công spinner ẩn + data cập nhật. |
| AC-21 | Drag Floating Chatbot | Đang ở Trang chủ | Long-press + drag icon Chatbot | Icon di chuyển theo ngón tay; thả ra giữ vị trí mới. |
| AC-22 | Reset Floating Chatbot position | Đã drag chatbot sang vị trí mới; điều hướng sang màn khác | Quay lại Trang chủ | Chatbot trở về vị trí mặc định góc dưới phải. |
| AC-23 | Tap Floating Chatbot | Đang ở Trang chủ | Tap icon Chatbot | Mở UC60 Chatbot. |
| AC-24 | Tên đầy đủ truncate | API trả tên dài > giới hạn 1 dòng | Render Card | Tên hiển thị truncate với "…" ở cuối. |
| AC-25 | Vai trò NĐT Việt Nam | API trả vai trò "NĐT Việt Nam" | Render Card | Hiển thị verbatim "Nhà đầu tư Việt Nam". |
| AC-26 | Session expired 401 (>15 ngày) | Refresh token đã hết hạn | API gọi từ Trang chủ | Toast *"Phiên đăng nhập hết hạn."*; redirect màn đăng nhập. |
| AC-27 | Force-close + reopen | App đã force-close; session còn hợp lệ | Mở lại app | Auto-navigate Trang chủ; không yêu cầu đăng nhập. |
| AC-28 | Uninstall + reinstall | App được xóa + cài lại | Mở app | Bắt buộc đăng nhập lại từ đầu. |
| AC-29 | Debounce double-tap Quick Access | Đang ở Trang chủ | Double-tap nhanh Quick Access card "Hồ sơ" | Chỉ điều hướng 1 lần (không stack 2 màn UC45). |
| AC-30 | Card thông tin error | API user info fail | Render Card | Card hiển thị error UI riêng (visual chi tiết cần BA định — Q11); Quick Access + Tin tức + Footer vẫn render. |

---

## 9. Non-functional Requirements

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| **Performance — API** | Tất cả API call tối đa 10 giây; vượt 10s coi như timeout. | CMR-16 |
| **Performance — Polling** | Polling notification mỗi 30 giây (không quá tải mạng). | UC1 §2.1 Header #4; §3.1 step 4 |
| **Performance — UI** | *(Không có target FPS / render time / memory cho Trang chủ — Q23.)* | — |
| **Reliability — Retry** | Lazy load fail: retry tự động 3 lần × 2s; sau đó user pull-to-refresh. | CMR-04 v1.4 |
| **Reliability — Section độc lập** | Mỗi section UC1 xử lý lỗi độc lập, không phá vỡ toàn màn hình. | UC1 §2.1 "Quy tắc xử lý lỗi độc lập từng section" |
| **Security — Session** | Refresh token hết hạn sau 15 ngày → redirect login. Auth token lưu Secure Storage (Keychain/Keystore). | CMR-07 v1.5 + project-context BS-04 |
| **Security — Force-close vs Uninstall** | Force-close giữ session; uninstall xóa session. | CMR-18 |
| **Compatibility — Platform** | iOS + Android (project-context §8). *(Version matrix chưa có — Q-007 trong project-context.)* | project-context §8 — Q24 |
| **Accessibility** | Screen reader theo tiêu chuẩn iOS/Android accessibility guidelines. *(Contrast ratio / font size / touch target "dựa vào UI design specs" — không có target cụ thể.)* | UC1 §3.1 Accessibility — Q25 |
| **Internationalization** | 5 ngôn ngữ (VI/EN/ZH/JA/KO); chỉ áp dụng cho text cứng; lưu ngôn ngữ trên server. | CMR-17 |
| **Logging / Monitoring** | *(Không có yêu cầu logging trong UC1 hay common.)* | — |
| **Offline behaviour** | *(UC1 không khai báo offline; project-context KT-05 nói "cache nội dung tĩnh offline" nhưng UC1 không cụ thể về Trang chủ — Q26.)* | — |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions
> Đầy đủ trong Audit Summary — "Unified Gap & Question Report" bên dưới.

### 10.2 Dependencies
- **UC256** (Đăng nhập) — UC1 là post-login screen.
- **UC249** (Cấu hình tài khoản) — User icon + Footer Cài đặt.
- **UC258 / UC259** (Thông báo hệ thống) — Bell icon.
- **UC42, UC45, UC2, UC69, UC73, UC75, UC82** — đích Quick Access + Footer + Sidebar.
- **UC55-68** (Tin tức / Chuyên trang) — Tin tức list + "Xem tất cả".
- **UC60** (Chatbot) — Floating widget.
- **Sidebar 10 menu items** → UC tương ứng (UC1 này, UC83-86 Giới thiệu/Liên hệ/Điều khoản, UC55 Chuyên trang, UC69+UC73 TTHC, UC42 Đặt lịch, UC53/63-65 Phản ánh, UC45 Hồ sơ, UC249 Cấu hình).
- **CMR_Mobile.md** v1.5 — CMR-04, CMR-07, CMR-13, CMR-14, CMR-16, CMR-17, CMR-18.
- **Backend API:** API user info, API tin tức (top 5 + filter language), API notification unread count (polling), API refresh token.
- **External:** FCM/APNs (KT-16 — nhưng UC1 dùng polling chứ không dùng push trực tiếp), Secure Storage (BS-04).

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-13 | qc-uc-read (run-010) | Bản audit đầu tiên cho UC1 v4.1 (29/04/2026) + wireframe `UC1. homepage.png` + CMR_Mobile.md v1.5. Phát hiện 5 conflicts (4 wireframe ↔ spec, 1 internal). Verdict CONDITIONALLY READY (71.5/100). |

---

# Audit Summary

## Audit Summary Table

> **Mapping:** #1 → Section 0 · #2 → Section 1 · #3 → Section 2 · #4 → Section 3 · #5 → Section 4 · #6 → Section 5 · #7 → Section 6 · #8 → Section 7 · #9 → Section 8 · #10 → Section 9

| #         | Knowledge Area                          | Max Pts | Score | Status     |
| --------- | --------------------------------------- | ------- | ----- | ---------- |
| 1         | Feature Identity                        | 5       | 5/5   | ✅          |
| 2         | Objective & Scope                       | 5       | 4/5   | ⚡          |
| 3         | Actors & User Roles                     | 10      | 7/10  | ⚡          |
| 4         | Preconditions & Postconditions          | 10      | 7/10  | ⚡          |
| 5         | UI Object Inventory & Mapping           | 15      | 11/15 | ⚡          |
| 6         | Object Attributes & Behavior Definition | 20      | 16/20 | ⚡          |
| 7         | Functional Logic & Workflow Decomposition | 20    | 15/20 | ⚡          |
| 8         | Functional Integration Analysis         | 20      | 15/20 | ⚡          |
| 9         | Acceptance Criteria                     | 20      | 11/20 | ⚡          |
| 10        | Non-functional Requirements             | 5       | 2/5   | ⚡          |
| **Total** |                                         | **130** | **93/130** | **→ 71.5/100** |

**Verdict:** ⚠️ **CONDITIONALLY READY** (71.5 ∈ [70, 89]; không có Critical KA = 0).

---

## Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | **High** | UC1 §2.1 Card thông tin #3 "Hiển thị vai trò ... 'Nhà đầu tư Việt Nam', 'Nhà đầu tư nước ngoài', 'Tổ chức/Doanh nghiệp'" vs wireframe "Nhà đầu tư" | Wireframe `UC1. homepage.png` hiển thị Vai trò là **"Nhà đầu tư"** — không thuộc 3 enum spec. Đây là spec text hay wireframe text đúng? Nếu wireframe đúng, enum chính thức là gì? Nếu spec đúng, wireframe cần cập nhật. Khi API trả vai trò không thuộc enum, hệ thống hiển thị gì (fallback theo CMR-14 "-")? | Tester không xác định được expected text trên Card → không viết được TC AC-25 và TC boundary cho role text. | Open |
| Q2 | High | project-context-master §4 cho phép Khách/Anonymous; UC1 §1 "Phân quyền: Toàn bộ người dùng đã đăng nhập" | UC1 chỉ phục vụ user đã đăng nhập. Khách không đăng nhập thì màn entry là gì? Có Trang chủ phiên bản Khách không? Hay đi thẳng vào UC nào (UC2, UC55…)? Spec không định nghĩa. | Test cases entry-point cho actor "Khách" không thể design vì không biết entry screen. | Open |
| Q3 | Medium | UC1 §2.1 "Quy tắc hành động" Quick Access và CMR-01 "Reset khi chuyển màn" | Khi tap Quick Access (vd: UC45 Hồ sơ) từ Trang chủ rồi quay lại Trang chủ — có refresh data như tap tab Trang chủ không? Hay giữ state? CMR-01 chỉ nói reset search/filter — UC1 không phải màn list nên không rõ. | Tester cần biết hành vi back-nav để viết AC navigation + state retention. | Open |
| Q4 | Medium | UC1 §2.1 Footer #1 "Mỗi khi tap vào tab, dữ liệu refresh" | Khi user đang ở Trang chủ + đã scroll xuống Tin tức → tap tab "Trang chủ" → data refresh. Scroll position có reset về top không? Hay giữ? | Tester cần biết để viết AC-19 chính xác. | Open |
| Q5 | Medium | Wireframe `UC1. homepage.png` Card thông tin có label "Xin chào,"; UC1 §2.1 Card table không có row tương ứng | "Xin chào," là label cố định riêng (chỉ "Xin chào,") hay phần của Tên ("Xin chào, [Tên]")? Có đa ngôn ngữ không (EN: "Hello,")? | Tester cần row inventory rõ + verify đa ngôn ngữ. Hiện cell #7 trong Section 4 đang dùng *(inferred)*. | Open |
| Q6 | Medium | Wireframe Quick Access grid 3×2 [Hướng dẫn, Hồ sơ, KCN/KKT] / [Đặt lịch, FAQ, VBPL] vs UC1 §2.1 spec order #1-6 [Hướng dẫn, Hồ sơ, Đặt lịch, KCN/KKT, FAQ, VBPL] | Thứ tự cứng theo wireframe (row-major 1-2-4-3-5-6) hay theo spec liệt kê (1-2-3-4-5-6)? Có ảnh hưởng đến grid 2 cột vs 3 cột không (mobile size khác nhau)? | Visual test cases position-by-position phụ thuộc câu trả lời này. | Open |
| Q7 | Low | UC1 §2.1 News card "Ảnh đại diện (thumbnail) có bo góc" | Kích thước thumbnail / aspect ratio không spec. Nếu API trả URL ảnh null hoặc 404 → placeholder mặc định nào? | Tester cần biết để viết TC ảnh null + ảnh load fail. | Open |
| Q8 | Low | UC1 §2.1 News card category enum "Chính sách" (Đỏ) / "Tin đầu tư" (Xanh) / "Thành công" (Cam) | Có category nào khác không (vd: "Sự kiện", "Hợp tác")? Nếu API trả category ngoài 3 giá trị → hiển thị màu gì? | Tester cần biết để viết TC unknown category. | Open |
| Q9 | **High** | UC1 §2.1 Tin tức "Hiển thị **tối đa 5 tin tức** mới nhất" AND "**Phân trang:** Hỗ trợ lazy load, tải 20 bản ghi mỗi lần. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo" | Mâu thuẫn nội tại: nếu list chỉ 5 tin thì không có "cuộn đến cuối" để lazy load. Nếu lazy load 20 thì 5 không phải max. Thiết kế thực tế cho Trang chủ là 5-fixed (xem thêm qua "Xem tất cả" → UC55-68) hay list lazy-load? | Toàn bộ AC liên quan tin tức (count, scroll behaviour, lazy retry CMR-04) phụ thuộc câu trả lời. Đây là contradiction nghiêm trọng nhất. | Open |
| Q10 | Medium | UC1 §2.1 Floating "Kéo thả (Drag & Drop): di chuyển icon đến vị trí khác" | Có drag boundary không (vd: không cho phép đè Footer / Header / Card thông tin)? Hay free-drag toàn màn hình? Edge của màn hình có snap không? | Tester cần biết boundary để viết TC drag + visual regression. | Open |
| Q11 | **High** | UC1 §2.1 "Xử lý lỗi" + CMR-07 + "Quy tắc xử lý lỗi độc lập từng section" | Mỗi section khi fail hiển thị error UI loại gì cụ thể (toast trên-cùng / inline trong section / banner / placeholder card)? Nút "Thử lại" nằm ở đâu? Visual mockup không có. | Không có visual spec cho error → tester không verify được UI error đúng/sai. | Open |
| Q12 | Medium | UC1 §2.1 Header #3 "**Multi-language:** Sidebar hỗ trợ ... (chi tiết tại UC CMR về Sidebar Navigation)" | Không tìm thấy "UC CMR về Sidebar Navigation" trong common files hoặc trong path-registry. File nào chứa spec chi tiết Sidebar + Bottom Sheet ngôn ngữ? | Sidebar drawer + language Bottom Sheet là transient overlays không có inventory chi tiết — TC tương ứng không thiết kế được. | Open |
| Q13 | Medium | Sidebar 10 menu items liệt kê trong UC1 §2.1 Header #1 | Cần file spec riêng cho Sidebar (visual layout, icon, sub-items nếu có). Spec UC1 chỉ liệt kê tên 10 item, không có inventory đầy đủ. | Liên quan Q12; cần để verify icons + đa ngôn ngữ + state active của Sidebar items. | Open |
| Q14 | Medium | UC1 §2.1 Header #4 "Polling 30 giây/lần" | Khi 1 lần polling fail (mạng / 500) → retry ngay hay đợi tick 30s tiếp theo? Có hiển thị error gì không (red dot đứng yên không update)? | Polling là background — không thể visible error toast mỗi 30s — cần rule rõ. | Open |
| Q15 | Medium | UC1 §2.1 Header #4 "cập nhật red dot ngay lập tức mà không cần người dùng rời đi và quay lại" | Khi app vào background (user mở app khác) — polling 30s có tiếp tục không? Khi quay lại app, polling tiếp tục với tick mới hay tick cũ? | Foreground / background polling rule ảnh hưởng performance + UX. Tester cần TC background → foreground. | Open |
| Q16 | Medium | UC1 §2.1 "section độc lập khi API fail" | Khi API user info fail → Card thông tin hiển thị thế nào (skeleton vĩnh viễn / error UI riêng / ẩn section)? Cùng câu hỏi cho API news fail. | Liên quan Q11. Tester cần concrete visual để verify. | Open |
| Q17 | Low | CMR-13 Pull-to-refresh + UC1 §2.1 "Pull to refresh" | Pull-to-refresh ở Trang chủ refresh TOÀN bộ section (Card + Notification + Tin tức) hay chỉ section gần con trỏ kéo? | TC scope của pull-to-refresh cần xác định. | Open |
| Q18 | Low | CMR-07 lỗi 500 không có nút "Thử lại" | Sau khi 500 hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." — user retry bằng cách nào? Pull-to-refresh? Tap tab? | Tester cần TC user recovery path khi 500. | Open |
| Q19 | Low | UC1 §2.1 News list "Hiển thị tối đa 5 tin tức ... Vuốt ngang → Xem thêm tin tức trong danh sách" | Khi list chỉ có 1-2 tin (< 5) → horizontal scroll vẫn hoạt động hay disable? Cards căn trái hay center? | TC visual cho list < 5 cards. | Open |
| Q20 | Medium | CMR-07 v1.1 "first-load sử dụng loading state toàn màn hình" vs UC1 §3.1 từng section skeleton riêng | Trang chủ first-load có dùng full-screen loading hay skeleton từng section? Mâu thuẫn giữa CMR-07 và UC1. | Tester cần biết để viết AC-02, AC-03 đúng. | Open |
| Q21 | Low | CMR-18 "Force close: quay về Trang chủ + giữ session" | Sau force-close, mở lại app: nếu API user info fail thì sao? Có quay về login không (do session có thể đã expired silently)? Hay vẫn ở Trang chủ với error UI? | TC reopen-after-crash path. | Open |
| Q22 | Low | UC1 §2.1 inline "Tap → UC..." references | Tất cả integration mapping được agent suy luận từ inline references; chưa có matrix tổng hợp / sequence diagram để verify. | Tester cần BA xác nhận đầy đủ targets — đặc biệt khi UC đích chưa được implement / spec'd. | Open |
| Q23 | Medium | NFR Performance | Không có target FPS / scroll FPS / API response p95 / first-paint time cho Trang chủ. Trang chủ là entry point — performance ảnh hưởng UX nặng. | Tester không có baseline để đo performance. | Open |
| Q24 | Medium | NFR Compatibility — project-context Q-007 vẫn Open | iOS version min/max? Android version min/max? Tablet support? Screen size matrix? | Compatibility test matrix bị block. | Open |
| Q25 | Medium | NFR Accessibility | "Theo tiêu chuẩn iOS/Android" — không có WCAG level / contrast ratio cụ thể / font size dynamic / touch target min. | Accessibility test bị block; chỉ test manual sơ bộ được. | Open |
| Q26 | Low | NFR Offline | UC1 không khai báo offline behaviour. Project-context KT-05 nói có cache nội dung tĩnh offline — áp dụng cho Trang chủ không? | TC offline mode bị block (đặc biệt Tin tức cache offline). | Open |
| Q27 | Low | UC1 §1 "Áp dụng cho tất cả users/roles: Nội dung giống nhau" | Có ngoại lệ nào không (vd: NĐT mới đăng ký lần đầu — onboarding tour overlay)? | TC onboarding-first-time-user. | Open |
| Q28 | Low | UC1 §2.1 "**Multi-language:** Ngôn ngữ được lưu vào server/user profile" | Lần đầu mở app sau cài đặt (chưa có session server) — ngôn ngữ mặc định là VI (theo CMR-17) hay theo locale thiết bị? | TC initial-launch language detection. | Open |
| Q29 | Low | UC1 §2.1 Sidebar Hamburger ↔ CMR-06 Header Trang chủ | CMR-06 mô tả Header chỉ có "Hamburger, Tiêu đề, Icon Thông báo" thiếu Language + User. CMR-06 v1.5 không đồng bộ với UC1. | Mâu thuẫn rules — cần kit owner update CMR-06 hoặc giữ UC1 override (đánh dấu trong common-rules file). | Open |
| Q30 | Low | UC1 §1 "Phụ lục XIV — STT 1 — Màn hình trang chủ" | Spec reference "Phụ lục XIV" — không có file Phụ lục XIV trong common files. Là file nào? | Có thể chứa thêm constraints — cần xác nhận. | Open |

> **Priority count:** High = 3 (Q1, Q2, Q9, Q11) — block test design cho section liên quan. Medium = 12. Low = 14.

---

## 🟢 What's Good

- **Feature Identity (5/5):** Header metadata, UC ID, phiên bản, BA owner đầy đủ.
- **Object Attributes & Behaviour (16/20):** Mỗi UI element trong spec có "Quy tắc hiển thị" + "Quy tắc hành động" rất chi tiết — đặc biệt là polling 30s, debounce double-tap (CMR-18), reset chatbot position, language persistence on server (CMR-17), refresh on focus tab, "section độc lập" khi error. Đây là điểm sáng nhất của spec.
- **Common Rules Integration:** UC1 reference đúng và đầy đủ các CMR (CMR-04, CMR-07, CMR-13, CMR-14, CMR-16, CMR-17, CMR-18) — tester biết tra cứu chi tiết ở đâu.
- **Error Handling Table:** Bảng "Xử lý lỗi" liệt kê 3 case (lỗi mạng, 500, timeout) với exact message text và behaviour — verbatim text giúp test case dễ verify.
- **Section-độc-lập Error Rule:** UC1 §2.1 "Quy tắc xử lý lỗi độc lập từng section" rất rõ ràng — hiếm thấy ở mức spec.
- **Cross-UC References:** Inline `Tap → UC...` references đầy đủ cho 10+ UC đích.
- **History tracking:** Spec có "Lịch sử cập nhật" (v4 → v4.1) → tester biết delta.

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- Happy path navigation từ Header / Card / Quick Access / Footer / Tin tức cards (AC-13 → AC-23).
- Loading skeleton render (AC-02, AC-03).
- Empty state Tin tức (AC-09).
- Error handling text verbatim CMR-07 cho network / 500 / timeout / 401 (AC-10 → AC-12, AC-26).
- Đa ngôn ngữ chuyển đổi + persistence (AC-07, AC-08).
- Polling 30s update red dot (AC-04, AC-05, AC-06).
- Pull-to-refresh (AC-20).
- Drag + reset chatbot (AC-21, AC-22, AC-23).
- Truncate tên dài (AC-24).
- Debounce double-tap (AC-29).
- Force-close / uninstall (AC-27, AC-28).

**What CANNOT be tested yet (blocked by gaps):**
- **TC Vai trò Card** (AC-25) — blocked bởi Q1 (enum spec vs wireframe mismatch).
- **TC Tin tức list count + scroll** — blocked bởi Q9 ("5 max" vs "lazy load 20" contradiction).
- **TC Error UI visual** (toàn bộ section error) — blocked bởi Q11 (không có visual spec cho error UI).
- **TC Card thông tin error** (AC-30) — blocked bởi Q16.
- **TC Sidebar drawer** + **TC Language Bottom Sheet** — blocked bởi Q12, Q13 (không có inventory chi tiết).
- **TC Khách / Anonymous flow** — blocked bởi Q2.
- **TC Compatibility matrix** (OS version, screen size) — blocked bởi Q24.
- **TC Accessibility WCAG** — blocked bởi Q25.
- **TC Offline mode** — blocked bởi Q26.
- **TC Performance NFR** — blocked bởi Q23.
- **TC Polling background/foreground** — blocked bởi Q14, Q15.

**Suggested test focus areas** *(once gaps are resolved)*:
- **Happy path:** Login → Trang chủ render đầy đủ → tap mỗi entry point của Header / Card / Quick Access / Tin tức / Footer / Chatbot điều hướng đúng UC đích.
- **Alternative scenarios:** Đổi ngôn ngữ giữa 5 locale, pull-to-refresh, tap tab Trang chủ refresh, drag chatbot + revisit reset, force-close + reopen.
- **Boundary & validation tests:** Tên đầy đủ truncate (input gần / vượt 1-dòng width), Tin tức 0 tin / 1 tin / 5 tin / (Q9 — nếu confirm lazy: >5 và pagination), notification 0 unread / ≥1 unread, role text mọi giá trị enum + (Q1 — fallback).
- **Error & exception scenarios:** Mỗi section (Card / Tin tức / Notification polling) × 4 loại lỗi (network / 500 / 404 / timeout 10s); session 401 expired >15 ngày; lazy retry CMR-04 (3 lần × 2s).
- **UI-specific checks:** Active state Footer tab "Trang chủ", red dot visibility, category tag color mapping, multi-language switching toàn bộ text cứng, skeleton vs full-screen loading (Q20 phụ thuộc).
- **Integration tests:** UC256 → UC1 → UC249 → đổi MK (BS-07) → logout → quay lại login. UC258/259 (mark as read) → quay UC1 verify red dot sync ≤30s.

---

## 📌 Summary & Recommendation

UC1 SRS v4.1 + wireframe `UC1. homepage.png` đạt **CONDITIONALLY READY (71.5/100)** — chất lượng spec ở mức tốt cho UI inventory, behaviour rules, error-handling text verbatim và cross-UC integration, nhưng có **3 High-priority gaps** chặn test design cho các flow liên quan:

1. **Q1** — Mâu thuẫn giá trị "Vai trò" giữa spec ("Nhà đầu tư Việt Nam") và wireframe ("Nhà đầu tư"). Cần BA xác nhận label chính thức.
2. **Q2** — Khách/Anonymous entry point — UC1 chỉ phục vụ user đã đăng nhập, nhưng project-context cho phép Khách vào nhiều UC public. Cần spec entry screen cho actor Khách.
3. **Q9** — Mâu thuẫn nội tại trong UC1 §2.1 Tin tức: "tối đa 5 tin" vs "lazy load 20 bản ghi". Thiết kế thực tế là gì? Đây là contradiction nghiêm trọng nhất, ảnh hưởng ~30% TC tin tức.
4. **Q11** — Thiếu visual spec cho error UI từng section (toast / inline / banner / placeholder card?). Ảnh hưởng tất cả TC error.

**Khuyến nghị:** Chuyển 4 câu hỏi High-priority + Q20 (loading state contradiction CMR-07 vs UC1) cho BA (han.luong & huy.lai2) trả lời ngay; song song tester có thể bắt đầu thiết kế TC cho 11 nhóm flow đã CAN-be-tested (~24/30 AC). Sau khi BA trả lời, generate v2 với Q1/Q2/Q9/Q11 resolved → kỳ vọng score tăng lên 80-85/100 (READY hoặc cao gần ngưỡng).

**Next step:** Trigger `qc-qna` để chuyển 30 open questions sang Question Backlog cho BA.
