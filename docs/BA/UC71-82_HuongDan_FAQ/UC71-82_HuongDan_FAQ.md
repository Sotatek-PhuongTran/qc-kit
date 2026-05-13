# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC71-82 — Hướng dẫn sử dụng & Câu hỏi thường gặp trên Mobile  
**Ngày tạo:** 29/04/2026  
**Phiên bản:** v1.1

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Hỗ trợ người dùng |
| Đối tượng thực hiện | Cá nhân / Tổ chức |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Phiên bản | v1.1 |


---

## UC71-82 — Hướng dẫn sử dụng & Câu hỏi thường gặp (FAQ) trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Hướng dẫn sử dụng và Câu hỏi thường gặp (FAQ) trên Mobile  
**Mô tả:** Nhóm chức năng hỗ trợ người dùng tra cứu hướng dẫn sử dụng ứng dụng (UC71-75) và các câu hỏi thường gặp được phân loại theo chủ đề (UC76-82). Giúp người dùng tự giải quyết vướng mắc mà không cần liên hệ hỗ trợ.  
**Phân quyền:** Cá nhân/Tổ chức (không yêu cầu đăng nhập — public access).  
**Truy cập chức năng:** Sidebar → "Hỗ trợ" → "Hướng dẫn sử dụng" / "FAQ".  
**Chức năng đáp ứng usecase số:** UC71, UC72, UC73, UC74, UC75, UC76, UC77, UC78, UC79, UC80, UC81, UC82

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Hub Hướng dẫn sử dụng (UC71) (Tham chiếu: UC71.png)

**Mô tả giao diện:**
Màn hình cung cấp danh mục các tài liệu hướng dẫn chi tiết. Mỗi mục được thiết kế dạng thẻ (Card) bao gồm Icon, tiêu đề và mô tả.

| # | Tên mục | Kiểu trường | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Header | Label | Tiêu đề "Hướng dẫn sử dụng" kèm đoạn mô tả ngắn. Có nút Back (←). |
| 2 | Đăng nhập, đăng ký tài khoản | Card | **Nội dung:** Hướng dẫn đăng nhập, đăng ký tài khoản.<br>**Hành động:** Tap "Xem hướng dẫn >" → Sang màn hình chi tiết (UC71). |
| 3 | Dịch vụ công trực tuyến | Card | **Nội dung:** Hướng dẫn sử dụng dịch vụ công và nộp hồ sơ.<br>**Hành động:** Tap "Xem hướng dẫn >" → Sang màn hình chi tiết (UC72). |
| 4 | Tra cứu Văn bản Pháp luật | Card | **Nội dung:** Hướng dẫn tra cứu văn bản quy phạm pháp luật.<br>**Hành động:** Tap "Xem hướng dẫn >" → Sang màn hình chi tiết (UC73). |
| 5 | Tra cứu Thủ tục Hành chính | Card | **Nội dung:** Hướng dẫn tra cứu thủ tục, biểu mẫu.<br>**Hành động:** Tap "Xem hướng dẫn >" → Sang màn hình chi tiết. |
| 6 | Kết nối đối tác | Card | **Nội dung:** Hướng dẫn sử dụng hệ thống kết nối đối tác thông minh.<br>**Hành động:** Tap "Xem hướng dẫn >" → Sang màn hình chi tiết (UC74). |

---

#### 2.2 Giao diện Chi tiết các bước hướng dẫn (Tham chiếu: UC71_Chitiet.png, UC72.png, UC73.png, UC74.png)

Mỗi màn hình hướng dẫn chi tiết bao gồm các bước thực hiện được đánh số thứ tự từ 1 đến N.

**A. Đăng nhập, đăng ký tài khoản (UC71_Chitiet.png):**
- **Tabs:** "Đăng nhập", "Đăng ký".
- **Nội dung các bước (Đăng nhập):**
    1. **Truy cập ứng dụng:** Truy cập ứng dụng Cổng đầu tư Quốc gia.
    2. **Chọn phương thức đăng nhập:** Tại trang chủ, chọn 'Đăng nhập'.
    3. **Xác thực VNeID:** Quét mã QR bằng ứng dụng VNeID hoặc nhập số định danh cá nhân.
    4. **Xác nhận OTP:** Nhập mã OTP được gửi về số điện thoại đã đăng ký.
    5. **Hoàn tất đăng nhập:** Hệ thống tự động chuyển về trang cá nhân của bạn.
- **Lưu ý (Warning box):** "Để đăng nhập bằng VNeID, bạn cần có tài khoản VNeID đã được xác thực mức độ 2 để sử dụng tính năng này."

**B. Dịch vụ công trực tuyến (UC72.png):**
- **Tabs:** "Nộp hồ sơ", "Tra cứu hồ sơ".
- **Nội dung các bước (Nộp hồ sơ):**
    1. **Chọn dịch vụ công:** Tìm kiếm và chọn thủ tục hành chính cần thực hiện.
    2. **Kiểm tra điều kiện:** Đọc kỹ yêu cầu, thành phần hồ sơ và điều kiện thực hiện.
    3. **Điền thông tin:** Điền đầy đủ thông tin theo mẫu đơn trực tuyến.
    4. **Đính kèm tài liệu:** Upload các tài liệu theo yêu cầu (file PDF, JPG, tối đa 5MB).
    5. **Nộp hồ sơ & thanh toán:** Xem xét lại và nộp hồ sơ. Thanh toán phí (nếu có) qua cổng thanh toán.
    6. **Theo dõi tiến độ:** Kiểm tra trạng thái hồ sơ trong mục 'Hồ sơ của tôi'.

**C. Tra cứu Văn bản Pháp luật (UC73.png):**
- **Nội dung các bước:**
    1. **Truy cập mục Tra cứu:** Từ menu chính, chọn 'Tra cứu' > 'Văn bản Pháp luật'.
    2. **Nhập từ khóa tìm kiếm:** Nhập tên văn bản, số hiệu hoặc từ khóa liên quan.
    3. **Lọc và xem kết quả:** Sử dụng bộ lọc theo loại văn bản, năm ban hành, cơ quan ban hành.

**D. Kết nối đối tác (UC74.png):**
- **Nội dung các bước:**
    1. **Tạo hồ sơ doanh nghiệp:** Cập nhật đầy đủ thông tin doanh nghiệp để tăng độ tin cậy.
    2. **Tìm kiếm đối tác:** Sử dụng bộ lọc ngành nghề, quy mô, địa điểm để tìm đối tác phù hợp.
    3. **Gửi lời mời kết nối:** Nhấn 'Kết nối' và gửi tin nhắn giới thiệu đến đối tác tiềm năng.
    4. **Quản lý kết nối:** Theo dõi và quản lý danh sách đối tác trong mục 'Mạng lưới của tôi'.

---

#### 2.3 Màn hình Câu hỏi thường gặp (FAQ) (UC82) (Tham chiếu: UC82.png)

**Mô tả giao diện:**
Màn hình được thiết kế giúp người dùng lọc nhanh câu hỏi theo chủ đề hoặc tìm kiếm trực tiếp.

**Thành phần giao diện:**
- **Chọn chủ đề (Grid):** Hiển thị các Card chủ đề gồm: Tất cả, Lao động & nhân sự, Địa điểm & hạ tầng, Thuế và tài chính, Thủ tục hành chính, Pháp lý & giấy tờ, Câu hỏi chung. Mỗi Card có icon và số lượng câu hỏi.
- **Ô tìm kiếm:** "Tìm kiếm câu hỏi, từ khóa...". (CMR-01)
- **Danh sách câu hỏi:**
    - Phân đoạn: "Câu hỏi phổ biến nhất" (có icon ngôi sao) và "Tất cả".
    - Mỗi Item hiển thị: Tag trạng thái (Ví dụ: Phổ biến), Tag chủ đề (Ví dụ: Thuế & tài chính), Nội dung câu hỏi và icon ">".

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý xem hướng dẫn
1. Người dùng tap vào nút "Xem hướng dẫn >" tại màn hình Hub.
   - **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào card/item, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất.
2. Hệ thống tải dữ liệu các bước thực hiện từ CMS.
3. Người dùng chuyển đổi giữa các Tab để xem các quy trình khác nhau (ví dụ: Nộp hồ sơ vs Tra cứu hồ sơ).

#### 3.2 Xử lý tra cứu FAQ
1. **Lọc theo chủ đề:** Khi người dùng tap vào một Card chủ đề -> Hệ thống lọc danh sách câu hỏi bên dưới theo chủ đề đó.
2. **Tìm kiếm:** Hệ thống lọc kết quả realtime theo từ khóa người dùng nhập vào ô tìm kiếm.
3. **Xem chi tiết:** Tap vào câu hỏi -> Điều hướng sang màn hình chi tiết câu trả lời (Hỗ trợ định dạng Rich Text).
   - **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục vào item câu hỏi, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất.
4. **Pull to Refresh (CMR-13):** Kéo xuống từ đầu danh sách FAQ để tải lại dữ liệu từ API/CMS.

#### 3.3 Xử lý lỗi (→ Xem CMR-07)

| Tình huống lỗi | Thông báo hiển thị | Hành vi hệ thống |
| --- | --- | --- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại. |
| Lỗi 401 (Session hết hạn) | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Lỗi API (HTTP 500) | *"Hệ thống đang bận. Vui lòng thử lại sau."* | Giữ nguyên màn hình, chỉ hiển thị thông báo. |
| Timeout (API không phản hồi sau 10 giây) | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"** | Hiển thị thông báo, giữ nguyên màn hình. |

#### 3.4 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC71-82 (header, tên mục hướng dẫn, tiêu đề FAQ, label chủ đề, placeholder ô tìm kiếm, thông báo lỗi, empty state message) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung hướng dẫn và câu trả lời FAQ từ CMS/API hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Các bước hướng dẫn phải đảm bảo chính xác, dễ hiểu và khớp với giao diện thực tế của các chức năng liên quan.
- **AC2:** Chức năng tìm kiếm FAQ phải trả về kết quả chính xác dựa trên cả tiêu đề câu hỏi và nội dung câu trả lời.
- **AC3:** Badge chủ đề trên mỗi câu hỏi FAQ phải hiển thị đúng màu sắc và nhãn theo quy định danh mục.
- **AC4:** Hệ thống phải hỗ trợ cập nhật nội dung hướng dẫn và FAQ từ phía Admin (CMS) mà không cần cập nhật lại phiên bản ứng dụng.

---

## 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1 → v1.1 | Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1 → v1.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung CMS/API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1 → v1.1 | Debounce Navigation | (Không có) | Tap nhanh liên tục vào card/item → chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (B3) |
| 2026-05-11 | v1 → v1.1 | Pull-to-Refresh | (Không có) | Bổ sung hỗ trợ kéo xuống từ đầu danh sách FAQ để tải lại dữ liệu | Đồng bộ CMR-13 (B4) |