# ACTION ITEMS — SRS Mobile App

**Tiêu đề:** Danh sách các hạng mục Design & Phát triển  
**Ngày tạo:** 01/05/2026  
**Phiên bản:** v1  
**Tác giả:** QC Agent  
**BA phụ trách:** han.luong & huy.lai2

> File này theo dõi các **hạng mục công việc, luồng UI/UX còn thiếu hoặc chưa thiết kế xong** trong bộ SRS Mobile, để tránh bỏ sót khi thực hiện UI/UX và phát triển.

---

## 1. THIẾT KẾ UI/UX (DESIGN ITEMS)

| # | Mã | Mô tả | Trạng thái |
|---|---|---|---|
| 1 | AI-UX-01 | **Hệ thống Toast Messages:** Thiết kế giao diện cho tất cả thông báo Toast (thành công, cảnh báo, lỗi nhẹ) trên toàn bộ ứng dụng. | ⬜ Chưa làm |
| 2 | AI-UX-02 | **Empty States (Search NULL):** Thiết kế màn hình trạng thái rỗng khi tìm kiếm trả về NULL (không có kết quả). | ⬜ Chưa làm |
| 3 | AI-UX-03 | **Empty States (List rỗng):** Thiết kế màn hình trạng thái rỗng cho các danh sách không có dữ liệu ban đầu (VD: chưa có phản ánh, chưa có thông báo). | ⬜ Chưa làm |
| 4 | AI-UX-04 | **Error States:** Thiết kế giao diện lỗi chung: Lỗi mạng (offline), Lỗi server (500), Lỗi không tìm thấy (404), timeout. | ⬜ Chưa làm |

---

## 2. UC / FILE CẦN TẠO MỚI & BỔ SUNG

| # | Mã | UC liên quan | Mô tả | Ưu tiên | Trạng thái |
|---|---|---|---|---|---|
| 1 | AI-UC-01 | UC41 | **Tạo file UC41_ChoThueDatKCN.md:** Tra cứu thông tin cho thuê đất (đã tách khỏi UC40). Đợi BA hoàn tất yêu cầu nghiệp vụ. | Cao | ⬜ Chờ BA |
| 2 | AI-UC-02 | UC2 | **Chi tiết KCN:** Bổ sung chi tiết màn hình "Chi tiết KCN" (các tab con: Thông tin chung, Hạ tầng, Nhà đầu tư...) khi BA có dữ liệu chuẩn. | Trung bình | ⬜ Chờ BA |
| 3 | AI-UC55-01 | UC55 | **[QnA KH] Luồng Đăng ký tư vấn đầu tư theo tỉnh:** Nút "Đăng ký tư vấn ngay" trong màn hình Chi tiết chuyên trang tỉnh (UC55) chưa có màn hình/luồng đích. Cần xác nhận với khách hàng: (1) Luồng đăng ký sẽ dẫn đến màn hình nào? (2) Form thu thập thông tin gì (tên, SĐT, tỉnh quan tâm, lĩnh vực...)? (3) Sau khi đăng ký, hệ thống phản hồi thế nào? | Cao | ⬜ Chờ KH |
