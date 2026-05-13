# ASSUMPTION BACKLOG — SRS Mobile App

**Tiêu đề:** Tổng hợp Assumptions — Ứng dụng Di động  
**Ngày tạo:** 29/04/2026  
**Phiên bản:** v1  
**Tác giả:** QC Agent

---

## HƯỚNG DẪN SỬ DỤNG

File này là **nguồn duy nhất (Single Source of Truth)** cho toàn bộ assumptions của SRS Mobile.  
Mỗi đợt assumption mới sẽ được thêm vào cuối file dưới dạng 1 section riêng, có đánh số đợt và ngày.  
**Không tạo file assumption mới** — chỉ append vào file này.

---

## ĐỢT 1 — Khởi tạo SRS (29/04/2026)

> **Bối cảnh:** Đợt đầu tiên — tổng hợp toàn bộ giả định khi viết SRS Mobile từ wireframe. BA/PO đã phản hồi toàn bộ 40 items.

### A. PHÂN QUYỀN TRUY CẬP

| # | File UC | Assumption | BA Response | Hành động |
|---|---|---|---|---|
| PQ-01 | UC2 | Tra cứu KCN/KKT không yêu cầu đăng nhập (public access) | ✅ Đúng | Đã apply |
| PQ-02 | UC40 | Tra cứu quỹ đất không yêu cầu đăng nhập | ✅ Đúng | Đã apply |
| PQ-03 | UC55-68 | Tin tức, chuyên trang, chatbot không yêu cầu đăng nhập | ✅ Đúng | Đã apply |
| PQ-04 | UC69/73 | Văn bản pháp luật & TTHC không yêu cầu đăng nhập | ✅ Đúng | Đã apply |
| PQ-05 | UC71-82 | Hướng dẫn sử dụng & FAQ không yêu cầu đăng nhập | ✅ Đúng | Đã apply |
| PQ-06 | UC83-86 | Điều khoản, Liên hệ, Giới thiệu không yêu cầu đăng nhập | ✅ Đúng | Đã apply |
| PQ-07 | UC87-95 | UC87-91, UC93-95 public. Riêng UC92 yêu cầu đăng nhập | ✅ Đúng | Đã apply |

### B. XÁC THỰC & BẢO MẬT

| # | File UC | Assumption | BA Response | Hành động |
|---|---|---|---|---|
| BS-01 | UC256 | VNeID redirect qua deep-link hoặc in-app browser | Không cần cover | Bỏ qua |
| BS-02 | UC256 | Kiểm tra kết nối mạng phía FE trước khi gọi API | Không cần cover | Bỏ qua |
| BS-03 | UC256 | Không có giới hạn số lần nhập sai mật khẩu | ✅ Đúng | Đã apply |
| BS-04 | UC256 | Token lưu trong Secure Storage (Keychain/Keystore) | Không cần cover | Bỏ qua |
| BS-05 | UC257 | Khi API đăng xuất thất bại, vẫn xóa token cục bộ | ✅ Đồng ý | Đã apply |
| BS-06 | UC249 | Số CMND/CCCD là trường chỉ đọc | ✅ Đồng ý | Đã apply |
| BS-07 | UC249 | Sau đổi mật khẩu, bắt buộc đăng xuất | ✅ Đồng ý | Đã apply |
| BS-08 | UC249 | Face ID/Vân tay sử dụng API OS-level | Không cần cover | Bỏ qua |
| BS-09 | UC250-254 | CMND/CCCD: 9 hoặc 12 số. MST DN: 10 hoặc 13 số | ✅ Đồng ý | Đã apply |
| BS-10 | UC250-254 | Quên mật khẩu hỗ trợ SĐT hoặc Email, gửi OTP qua SMS | ✅ Đồng ý | Đã apply |
| BS-11 | UC250-254 | Mã số thuế DN không cho phép chỉnh sửa sau đăng ký | ✅ Đồng ý | Đã apply |

### C. UX & LUỒNG NGƯỜI DÙNG

| # | File UC | Assumption | BA Response | Hành động |
|---|---|---|---|---|
| UX-01 | UC1 | Quick Access là cố định, không tùy chỉnh | ✅ Đồng ý | Đã apply |
| UX-02 | UC1 | Badge thông báo cập nhật mỗi lần vào trang chủ (fetch on focus) | ✅ Đồng ý | Đã apply |
| UX-03 | UC1 | Sidebar chứa toàn bộ menu (không có bottom nav bar) | ✅ Đồng ý | Đã apply |
| UX-04 | UC42-44 | Danh sách lịch hẹn không hỗ trợ phân trang | ❌ Sai — có lazy load 20 bản ghi | Đã sửa UC |
| UX-05 | UC45-51 | Không hỗ trợ tìm kiếm, chỉ lọc theo tab | ❌ Sai — có tìm kiếm theo mã/tên hồ sơ + kết hợp tab | Đã sửa UC |
| UX-06 | UC53 | Không có chỉnh sửa/thu hồi phản ánh đã gửi | ❌ Sai — có lưu nháp, gửi, hủy bỏ | Đã sửa UC |
| UX-07 | UC53 | Họ tên/SĐT/Email tự động điền nhưng cho phép chỉnh sửa | ✅ Đồng ý | Đã apply |
| UX-08 | UC55-68 | Chi tiết bài viết hiển thị bằng WebView | Không cần quan tâm | Bỏ qua |
| UX-09 | UC55-68 | Chatbot không lưu lịch sử hội thoại giữa các phiên | Giả định không lưu (phụ thuộc AI) | Giữ giả định |
| UX-10 | UC55-68 | Mỗi phản hồi chatbot chỉ đánh giá một lần | ❌ Sai — cho phép phản hồi tiếp, reply | Đã sửa UC |
| UX-11 | UC71-82 | FAQ Accordion chỉ mở 1 câu hỏi (single expand) | ❌ Sai — cho mở nhiều tại 1 thời điểm | Đã sửa UC |
| UX-12 | UC249 | Chức năng thay đổi Avatar chưa có trong phiên bản này | ✅ Đúng | Đã apply |
| UX-13 | UC250-254 | Thay đổi ngôn ngữ áp dụng ngay, không cần restart | ✅ Đúng | Đã apply |
| UX-14 | UC250-254 | Sau đăng ký, hệ thống tự động đăng nhập và về Trang chủ | ✅ Đúng | Đã apply |

### D. KỸ THUẬT & TÍCH HỢP

| # | File UC | Assumption | BA Response | Hành động |
|---|---|---|---|---|
| KT-01 | UC1 | Badge thông báo: fetch on focus | ✅ Fetch on focus | Đã apply |
| KT-02 | UC2 | Danh sách KCN/KKT sử dụng lazy load 20 bản ghi | ✅ Lazy load | Đã apply |
| KT-03 | UC2 | Thông tin KT/XH/MT trong tab chi tiết dạng bảng số liệu (không biểu đồ) | ⏳ Chưa trả lời | Chờ xác nhận |
| KT-04 | UC40 | Kết xuất dữ liệu hỗ trợ Excel | ❌ Sai — không có kết xuất, chỉ xem file đính kèm | Đã xóa khỏi UC |
| KT-05 | UC40 | Diện tích còn trống tính bằng FE | Không cần care | Bỏ qua |
| KT-06 | UC45-51 | PDF mở bằng in-app PDF viewer | ✅ Ok | Đã apply |
| KT-07 | UC52 | PDF/hình ảnh in-app viewer, khác tải xuống | PDF/hình ảnh mở trên browser; Word/Excel tải xuống | Đã sửa UC |
| KT-08 | UC55-68 | Chuyên trang lọc theo 3 miền | ❌ Sai — lọc theo tỉnh/TP | Đã sửa UC |
| KT-09 | UC69/73 | Nội dung văn bản hiển thị bằng WebView | ✅ Ok | Đã apply |
| KT-10 | UC69/73 | Biểu mẫu TTHC tải xuống Word/PDF/Excel | ✅ Ok | Đã apply |
| KT-11 | UC71-82 | Nội dung từ CMS (dynamic) | Lấy từ API, không cần care | Bỏ qua |
| KT-12 | UC83-86 | Tap địa chỉ mở Google Maps (app mặc định) | ✅ Ok | Đã apply |
| KT-13 | UC83-86 | Bản đồ trang Liên hệ dùng Google Maps embed | ❌ Sai — mở app Google Maps, không embed | Đã sửa UC |
| KT-14 | UC83-86 | App cache nội dung tĩnh để offline | ✅ Ok | Đã apply |
| KT-15 | UC87-95 | Danh sách sử dụng lazy load 20 bản ghi | ✅ Lazy load | Đã apply |
| KT-16 | UC258-259 | Push notification sử dụng FCM/APNs | Không cần care | Bỏ qua |
| KT-17 | UC258-259 | Deep link hoạt động cold start | Không cần care | Bỏ qua |
| KT-18 | UC258-259 | Thông báo qua Email là tùy chọn, mặc định tắt | ❌ Sai — chỉ push/in-app, không có Email | Đã sửa UC |

### E. NGHIỆP VỤ & PHẠM VI

| # | File UC | Assumption | BA Response | Hành động |
|---|---|---|---|---|
| NV-01 | UC42-44 | Không có chức năng tạo mới lịch hẹn từ Quản lý đặt lịch | ✅ Đúng | Đã apply |
| NV-02 | UC42-44 | Sau huỷ lịch, hệ thống không tự tạo lịch hẹn thay thế | Không có chức năng hủy trên mobile | Đã xóa hủy lịch khỏi UC |
| NV-03 | UC45-51 | Không có thanh toán phí hồ sơ trực tuyến trên mobile | ✅ Không có | Đã apply |
| NV-04 | UC52 | Người dùng không thể xóa tài liệu trên mobile (chỉ xem) | ✅ Chỉ xem | Đã apply |
| NV-05 | UC54 | Không có chức năng nộp báo cáo mới trên mobile | ✅ Không có | Đã apply |
| NV-06 | UC40 | Trạng thái lô đất: Đang cho thuê / Còn trống / Hết hạn HĐ | ✅ Ok | Đã apply |
| NV-07 | UC87-95 | Nhóm quy mô vốn: <1tr / 1-10tr / >10tr USD | ❌ Sai — không có nhóm quy mô vốn | Đã xóa |
| NV-08 | UC258-259 | UC258-259 là nhóm UC thông báo hệ thống | ✅ Đúng | Đã xác nhận |

---

<!-- ĐỢT MỚI — Thêm section mới ở đây theo template bên dưới -->

## ĐỢT 2 — Các vấn đề chờ xác nhận bổ sung (01/05/2026)

> **Bối cảnh:** Phát sinh trong quá trình rà soát và chuẩn hóa UC.

### F. NGHIỆP VỤ & NỘI DUNG

| # | File UC | Assumption | BA Response | Hành động |
|---|---|---|---|---|
| NV-09 | UC258-259 | Có các loại thông báo khác ngoài xử lý hồ sơ (đặt lịch, phản ánh, tin tức...) | ⏳ Chưa xác nhận | Chờ BA |
| NV-10 | UC83-86 | Nội dung trang "Giới thiệu" là tĩnh, không lấy động từ CMS | ⏳ Chưa xác nhận | Chờ BA |

<!-- 
## ĐỢT N — [Mô tả ngắn] (DD/MM/YYYY)
...
-->
