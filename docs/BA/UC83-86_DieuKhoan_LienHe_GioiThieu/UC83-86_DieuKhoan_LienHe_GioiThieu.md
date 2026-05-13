# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC83-86 — Điều khoản sử dụng, Chính sách bảo mật, Liên hệ & Giới thiệu trên Mobile  
**Ngày tạo:** 29/04/2026  
**Phiên bản:** v1.3

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Thông tin tĩnh |
| Đối tượng thực hiện | Cá nhân / Tổ chức |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Phiên bản | v1.3 |


---

## UC83-86 — Điều khoản, Chính sách, Liên hệ & Giới thiệu trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Xem Điều khoản sử dụng, Chính sách bảo mật, Trang liên hệ và Giới thiệu về Cục Đầu tư nước ngoài trên Mobile  
**Mô tả:** Nhóm chức năng hiển thị các trang thông tin tĩnh của ứng dụng. Người dùng có thể đọc điều khoản (UC83), chính sách bảo mật (UC84), xem thông tin liên hệ (UC85) và trang giới thiệu tổ chức (UC86).  
**Phân quyền:** Toàn bộ người dùng (không yêu cầu đăng nhập).  
**Truy cập chức năng:** Cấu hình tài khoản → Danh sách cài đặt / Sidebar → "Về chúng tôi".  
**Chức năng đáp ứng usecase số:** UC83, UC84, UC85, UC86

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Điều khoản sử dụng (UC83) & Chính sách bảo mật (UC84) (Tham chiếu: UC83.png, UC84.png)

**Mô tả giao diện:**
Màn hình hiển thị nội dung dạng văn bản dài, được trình bày thông qua Rich Text hoặc WebView.

| # | Tên trường | Kiểu trường | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Header | Label | Tiêu đề "Điều khoản sử dụng ứng dụng và dịch vụ" hoặc "Chính sách bảo mật". Kèm nút Back (←). |
| 2 | Nội dung chi tiết | Rich Text / WebView | **Quy tắc hiển thị:**<br>- Hiển thị toàn bộ nội dung văn bản được định dạng (In đậm, danh sách, đoạn văn).<br>- Các mục lớn được đánh số (Ví dụ: 1. Quy định chung, 1.1. Khi tham gia...).<br>- Có hiển thị các box thông tin liên hệ hỗ trợ.<br>- **Read-only:** Nội dung WebView không chứa link clickable (không có deeplink nội bộ hay external URL). Người dùng chỉ có thể đọc.<br>- **Độ dài nội dung:** Không giới hạn số ký tự / dung lượng file — nội dung tự cuộn theo chiều dọc. |

#### 2.2 Màn hình Liên hệ (UC85) (Tham chiếu: UC85.png, UC85(2).png)

**Mô tả giao diện:**
Màn hình cung cấp thông tin liên hệ của Cục Đầu tư nước ngoài. Hỗ trợ điều hướng qua các tab.

**Tabs:** "Địa chỉ" và "Văn phòng đại diện".  
**Tab mặc định khi mở:** "Địa chỉ".

**Nội dung Tab "Địa chỉ":**

| # | Tên trường | Kiểu trường | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Card Cơ quan | Card | Hiển thị Icon, Tên cơ quan "Cục Đầu tư nước ngoài", Đơn vị chủ quản "Bộ Kế hoạch và Đầu tư". |
| 2 | Thông tin liên hệ | List Item | Gồm các trường có icon tương ứng — tất cả **view-only, không clickable**:<br>- **Địa chỉ:** Số 6B Hoàng Diệu...<br>- **Điện thoại:** +84 24 3845 5298 — chỉ hiển thị, không gọi điện.<br>- **Email:** fid@mpi.gov.vn — chỉ hiển thị, không mở Mail app.<br>- **Website:** dautunuocngoai.gov.vn — chỉ hiển thị, không mở Browser. |
| 3 | Bản đồ vị trí | Box | Icon định vị và text "Bản đồ vị trí" kèm địa chỉ. **Tap → mở URL bản đồ trên trình duyệt mặc định** (áp dụng CMR-18 Debounce Navigation). |
| 4 | Giờ làm việc | Box | Box hiển thị lịch làm việc. **Dữ liệu trả về từ API** (hiển thị nguyên bản, không convert múi giờ):<br>- Thứ 2 - Thứ 6: 8:00 - 17:00.<br>- Thứ 7 - Chủ nhật: Nghỉ.<br>- Giờ nghỉ trưa: 12:00 - 13:30. |

**Nội dung Tab "Văn phòng đại diện" (Tham chiếu: UC85(2).png):**

Màn hình liệt kê danh sách các văn phòng đại diện của Cục Đầu tư nước ngoài trên thế giới. Tất cả thông tin là **view-only**, không có link clickable, không có nút "Xem chi tiết".

| # | Tên trường | Kiểu trường | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Danh sách Card Văn phòng | List Card (Vertical Scroll) | Mỗi Card hiển thị thông tin một văn phòng đại diện theo khu vực địa lý (VD: Bắc Mỹ, Châu Âu, Đông Bắc Á, Đông Nam Á):<br>- **Tên văn phòng:** Font đậm (VD: "Văn phòng Bắc Mỹ").<br>- **Địa điểm:** Icon 📍 + Tên thành phố, quốc gia (VD: New York, Hoa Kỳ).<br>- **Điện thoại:** Icon 📞 + Số điện thoại quốc tế — chỉ hiển thị, không gọi được.<br>- **Email:** Icon ✉️ + Địa chỉ email — chỉ hiển thị, không mở Mail app.<br>- Toàn bộ Card là **read-only**, không có tương tác tap. |
| 2 | Trạng thái rỗng | Empty State | Nếu API không trả về dữ liệu → Hiển thị **"Không có dữ liệu"** (theo CMR-14). |

#### 2.3 Màn hình Giới thiệu (UC86) (Tham chiếu: UC86.png, UC86_2.png)

**Mô tả giao diện:**
Màn hình giới thiệu về nền tảng và cơ quan quản lý, phân chia bằng Tabs.

**Tabs:** "Cổng Một Cửa" và "Cục Đầu tư nước ngoài".  
**Tab mặc định khi mở:** "Cổng Một Cửa".

**Nội dung Tab "Cổng Một Cửa" (UC86.png):**
- **Thông tin chung:** Tên "Cổng Một Cửa Đầu Tư Quốc Gia" và đoạn văn giới thiệu nền tảng.
- **Section "Sứ mệnh":** Text mô tả sứ mệnh của nền tảng. Nếu không có dữ liệu → hiển thị **"Không có dữ liệu"** (CMR-14), giữ nguyên heading.
- **Section "Mục tiêu":** Text mô tả.
- **Section "Chức năng chính":** Danh sách các bullet points (Tiếp nhận giải quyết..., Quản lý theo dõi..., v.v.).
- **Section "Lợi ích khi sử dụng Cổng Một cửa Đầu tư Quốc gia":** Hiển thị dưới dạng **1 Card duy nhất**, bên trong chia làm 2 phần:
    - **Đối với nhà đầu tư:** Danh sách bullet points.
    - **Đối với cơ quan quản lý:** Danh sách bullet points.
    - Nếu không có dữ liệu → hiển thị **"Không có dữ liệu"** (CMR-14) bên trong Card.

**Nội dung Tab "Cục Đầu tư nước ngoài" (UC86_2.png):**
- **Header:** Icon + "Cục Đầu tư nước ngoài" (Bộ Kế hoạch và Đầu tư).
- Các section bên dưới hỗ trợ **Expand / Collapse**: Người dùng tap vào tiêu đề section để mở rộng hoặc thu gọn nội dung. Mặc định tất cả section ở trạng thái Expanded.
- **Section "TỔNG QUAN" (Expand/Collapse):** Text mô tả vị trí, chức năng.
- **Section "CHỨC NĂNG, NHIỆM VỤ" (Expand/Collapse):** Danh sách bullet points.
- **Section "CƠ CẤU TỔ CHỨC" (Expand/Collapse):** Danh sách bullet points.
- **Section "LÃNH ĐẠO CỤC" (Expand/Collapse):**
    - **Cục trưởng:** Thẻ Card nổi bật với màu nền đậm (Ví dụ: Đỗ Văn Sử). **Read-only**, không có tương tác tap.
    - **Phó Cục trưởng:** Danh sách dạng **Grid 2 cột** chứa tên các Phó Cục trưởng (Ví dụ: Vũ Văn Chung, Nguyễn Anh Tuấn...). Khi số lượng là số lẻ, ô cuối hiển thị bình thường theo cột — không stretch/justify đặc biệt. **Read-only**, không có tương tác tap. Nếu danh sách rỗng → hiển thị **"Không có dữ liệu"** (CMR-14).

---

### 3. Mô tả các xử lý của chức năng

Các màn hình UC83-86 phần lớn là màn hình thông tin tĩnh (static content):
1. Mặc định tải nội dung từ file cục bộ (hoặc API cấu hình chung khi khởi động App).
2. Tương tác "Clickable" duy nhất tại màn hình Liên hệ (UC85) là **Bản đồ vị trí**, sẽ mở URL bản đồ trên trình duyệt mặc định của hệ điều hành. Các thông tin Điện thoại, Email, Website đều là **read-only** (view-only).
   - **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào Bản đồ vị trí, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi trình duyệt được mở.
3. Nội dung WebView (UC83, UC84) tự động co giãn theo kích thước màn hình thiết bị.
4. Hỗ trợ Pull to Refresh (CMR-13): Kéo xuống từ đầu nội dung để tải lại dữ liệu từ API/CMS. Lần đầu mở trang có hiển thị **loading full-screen** theo CMR-07.
5. **Xử lý lỗi khi tải (→ Xem CMR-07):**

| Tình huống lỗi | Thông báo hiển thị | Hành vi hệ thống |
| --- | --- | --- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Hiển thị nội dung cache từ lần tải trước (offline fallback). **Đặc biệt:** Nếu user cài app lần đầu và offline (chưa có cache), hiển thị màn hình lỗi mạng kèm nút "Thử lại". |
| Lỗi 401 (Session hết hạn) | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Lỗi API (HTTP 500) | *"Hệ thống đang bận. Vui lòng thử lại sau."* + nút **"Thử lại"** | Hiển thị nội dung cache nếu có, hoặc thông báo lỗi kèm nút Thử lại theo CMR-07. |
| Timeout (API không phản hồi sau **10 giây**) | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"** | Ngưỡng timeout tải nội dung là **10 giây** (theo quy định chung CMR-07/CMR-16). Hiển thị thông báo, giữ nguyên màn hình. |
| Lỗi 404 | *"Nội dung không tồn tại hoặc đã bị xóa."* | Hiển thị thông báo lỗi. |

#### 3.1 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC83-86 (header, tên tab, label thông tin liên hệ, nút, thông báo lỗi) được dịch sang 5 ngôn ngữ (VI, EN, ZH, JA, KO). Nội dung văn bản từ CMS/API (Điều khoản, Chính sách bảo mật, Giới thiệu, Giờ làm việc) **cũng hỗ trợ đa ngôn ngữ** tương ứng (truyền key ngôn ngữ vào API để nhận content thích hợp).

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Nội dung WebView ở màn hình Điều khoản (UC83) và Chính sách (UC84) phải hiển thị đúng format, không bị vỡ font và tự động co giãn theo chiều ngang màn hình.
- **AC2:** Các thông tin liên hệ ở màn hình UC85 (SĐT, Email, Website) chỉ hiển thị read-only. Riêng "Bản đồ vị trí" phải kích hoạt đúng trình duyệt mặc định trên thiết bị (có debounce).
- **AC3:** Trong trường hợp mất mạng (Offline), hệ thống vẫn phải hiển thị được nội dung tĩnh đã được lưu cache từ trước (Offline fallback).
- **AC4:** Layout phần "Lãnh đạo Cục" ở UC86 phải đảm bảo căn chỉnh đều dạng Grid khi số lượng Phó Cục trưởng là số lẻ.

---

## 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1 → v1.1 | Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1 → v1.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung CMS/API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1 → v1.1 | Debounce Navigation | (Không có) | Tap nhanh liên tục vào liên kết/item → chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (B3) |
| 2026-05-11 | v1 → v1.1 | Pull-to-Refresh | (Không có) | Bổ sung hỗ trợ kéo xuống từ đầu nội dung để tải lại dữ liệu | Đồng bộ CMR-13 (B4) |
| 2026-05-11 | v1 → v1.1 | Timeout — Ghi lý do 30 giây | Timeout 30 giây (không ghi lý do) | Bổ sung lý do: nội dung tĩnh Rich Text/WebView dung lượng lớn cần thời gian tải lâu hơn API thông thường | Đồng bộ B5 |
| 2026-05-12 | v1.1 → v1.2 | Section 2.1 — Link & giới hạn WebView | Không đề cập | Bổ sung: read-only, không chứa link clickable; không giới hạn số ký tự/dung lượng | BA Q&A (Q16, Q22) |
| 2026-05-12 | v1.1 → v1.2 | Section 2.2 — Cập nhật read-only & Tab VP đại diện | Clickable Phone, Mail, Browser. Thiếu mô tả Tab 2. | Thông tin liên hệ là read-only (chỉ Bản đồ click được). Bổ sung mô tả Tab VP đại diện view-only. Giờ làm việc hard-code | BA Q&A (Q7, Item 3, Q18) |
| 2026-05-12 | v1.1 → v1.2 | Section 2.3 — Cập nhật layout Cổng 1 cửa & Cục ĐT | Chưa rõ layout, Sứ mệnh, Empty state | Bổ sung: Tab mặc định, Section Sứ mệnh, số lượng Card cố định, Grid Phó Cục trưởng 2 cột. Các thẻ Lãnh đạo read-only. Nút Expand/Collapse | BA Q&A (Q6, Q10, Q11, Q15, QC, Q21) |
| 2026-05-12 | v1.1 → v1.2 | Section 3 — Timeout & Loading/Retry | Timeout 30s. Thiếu loading first-load | Timeout 10s theo CMR-07. Bổ sung loading full-screen (first load) và nút Thử lại khi lỗi mạng/500/offline | BA Q&A (Q1, Q2, Q5) |
| 2026-05-12 | v1.1 → v1.2 | Section 3.1 — Đa ngôn ngữ | Nội dung CMS/API nguyên bản | Nội dung CMS/API có đa ngôn ngữ | BA Q&A (Q12) |
| 2026-05-12 | v1.1 → v1.2 | Tiêu chí chấp nhận (AC-02) | Kích hoạt đúng ứng dụng bên thứ 3 | Sửa thành read-only, riêng Bản đồ kích hoạt trình duyệt | BA Q&A (Q7) |
| 2026-05-12 | v1.2 → v1.3 | Sửa đổi sau Q&A Review | AC, UI, Logic | Cập nhật Giờ làm việc lấy từ API (không convert GMT), gộp thẻ Lợi ích thành 1 Card duy nhất (có 2 phần nhà đầu tư & cơ quan quản lý), note rõ API đa ngôn ngữ. | BA Review Q11, Q12, Q18, QC |
