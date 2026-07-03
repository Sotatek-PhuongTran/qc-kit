# Mẫu chuẩn Test Case (tiếng Việt) — "gold example"

> File này là **chuẩn văn phong** cho test case tiếng Việt. Khi viết/cập nhật TC, căn theo đúng cách viết dưới đây.
> Quy tắc đầy đủ ở `.claude/rules/qc-writting-rules.md` và `rules/testcase-instruction-rules.md` (C1–C6 + cổng tự kiểm). File này chỉ minh hoạ.

## Nguyên tắc rút gọn (đọc trước khi viết)

1. **Tiêu đề** = `Động từ kiểm tra + đối tượng/chức năng/luồng + TRẠNG THÁI + ngữ cảnh (nếu có)`. Phần **trạng thái** gần như luôn bắt buộc.
2. **Pre-condition:** mỗi điều kiện **một dòng riêng** (`<br>`), không gộp bằng `;`.
3. **Tên đối tượng** = tên phần tử theo bảng kiểm kê §4 của audited report (trong ngoặc kép, nhãn nguyên văn). Động từ bước = canonical VI trong bảng chuẩn kit `.claude/config/action-verbs.md`; alias (bấm, gõ, điền) không được viết ra.
4. **Không mã trong nội dung TC** (`CRULE-/AC-/BR-/R-/Q-/EF/SCR-/Vùng X`) — vỡ khi chuyển test script; mã chỉ ở RTM.
5. **Tự chứa:** không "như TC_033"; mỗi message **trích đủ nguyên văn** trong ngoặc kép.
6. **Priority** theo ảnh hưởng nghiệp vụ × tần suất; ca bàn phím/zoom/refresh/UI tĩnh để **P4–P5**.

## Ví dụ (luồng quên mật khẩu)

| TC ID | Title | Pre-conditions | Test Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC_001 | Kiểm tra trạng thái khởi tạo của trang quên mật khẩu khi mở lần đầu | Trang đăng nhập Org Portal đang mở<br>Bộ nhớ trình duyệt chưa lưu ngôn ngữ | 1. Nhấn `"Quên mật khẩu?"` trên trang đăng nhập.<br>2. Kiểm tra hiển thị trang quên mật khẩu ở trạng thái mặc định. | 2. Trang quên mật khẩu hiển thị ở trạng thái mặc định:<br>- `"Trường nhập email"` rỗng, cho sửa, có dấu sao đỏ bắt buộc sau nhãn.<br>- `"Nút chính — Gửi liên kết đặt lại"` hiển thị, đang **vô hiệu**.<br>- Không hiển thị lỗi tại chỗ nào.<br>- `"Bộ chuyển ngôn ngữ — VN/EN"` mặc định chọn `"VN"`. | P1 |
| TC_026 | Kiểm tra báo lỗi khi gửi với trường email để trống | Trang quên mật khẩu đang mở<br>`"Trường nhập email"` đang để trống | 1. Rời ô `"Trường nhập email"` mà không nhập gì.<br>2. Nhấn `"Nút chính — Gửi liên kết đặt lại"`. | 2. Lỗi tại chỗ hiển thị dưới `"Trường nhập email"` với nội dung `"Vui lòng nhập email."`; hệ thống không gửi yêu cầu; người dùng vẫn ở lại trang quên mật khẩu. | P2 |
| TC_036 | Kiểm tra phản hồi trung lập khi dịch vụ email tạm thời lỗi | Trang quên mật khẩu đang mở<br>Email khớp một tài khoản đang hoạt động<br>Dịch vụ email giả lập trả lỗi (timeout / mất kết nối) | 1. Nhập email khớp tài khoản đang hoạt động (vd `user@org.vn`) vào `"Trường nhập email"`.<br>2. Nhấn `"Nút chính — Gửi liên kết đặt lại"`. | 2. Hệ thống điều hướng về trang đăng nhập kèm thông báo nổi `"Hệ thống đã gửi liên kết đặt lại mật khẩu."`; không hiển thị bất kỳ thông báo lỗi nào; giao diện không lộ dấu hiệu dịch vụ email gặp sự cố. | P1 |
| TC_073 | Kiểm tra đặt mật khẩu mới thành công qua liên kết hợp lệ | Người dùng đã mở trang đặt mật khẩu mới từ liên kết còn hiệu lực<br>Mật khẩu mới thoả toàn bộ quy tắc | 1. Nhập mật khẩu hợp lệ vào `"Trường Mật khẩu mới"`.<br>2. Nhập lại đúng giá trị đó vào `"Trường Xác nhận mật khẩu mới"`.<br>3. Nhấn `"Nút chính — Lưu mật khẩu"`. | 3. Hệ thống lưu mật khẩu mới, vô hiệu hoá liên kết vừa dùng, ghi nhật ký kiểm toán, rồi điều hướng về trang đăng nhập kèm thông báo nổi `"Mật khẩu đã được cập nhật."` | P1 |
| TC_090 | Kiểm tra thứ tự tiêu điểm khi nhấn Shift+Tab trên trang quên mật khẩu | Trang quên mật khẩu đang mở<br>Tiêu điểm đang ở `"Nút chính — Gửi liên kết đặt lại"` | 1. Nhấn phím Shift+Tab. | 1. Tiêu điểm lùi về `"Trường nhập email"` theo đúng thứ tự ngược; không thay đổi dữ liệu hay trạng thái nào trên trang. | P5 |

## Đối chiếu đúng/sai nhanh

| ❌ Tránh | ✅ Viết |
|---|---|
| Kiểm tra hiển thị Bộ chuyển ngôn ngữ (thiếu trạng thái) | Kiểm tra trạng thái mặc định của `"Bộ chuyển ngôn ngữ — VN/EN"` khi mở trang |
| Trang SCR-ORGUSER-002 hiển thị ở Vùng A | Trang quên mật khẩu hiển thị ở trạng thái mặc định |
| Pre-condition: `Trang mở; email khớp; service lỗi` (gộp `;`) | Mỗi điều kiện một dòng `<br>` riêng |
| Hệ thống điều hướng về trang đăng nhập với thông báo thành công **như TC_033** | Hệ thống điều hướng về trang đăng nhập kèm thông báo nổi `"Hệ thống đã gửi liên kết đặt lại mật khẩu."` |
| Đối chiếu không phân biệt hoa thường **(CRULE-004)** | Đối chiếu email không phân biệt hoa thường |
| Nút Gửi ở trạng thái Disabled, Loading khi submit | `"Nút chính — Gửi liên kết đặt lại"` đang vô hiệu; chuyển *đang xử lý* khi gửi |
| Kiểm tra Shift+Tab để P2 | Ca bàn phím/zoom/refresh không ảnh hưởng logic → **P5** |
