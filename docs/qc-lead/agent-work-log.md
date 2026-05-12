# Agent Work Log

> **Document:** Agent Work Log
> **Date created:** 2026-05-12
> **Author:** Agent (auto-generated)
> **Version:** in-place (no versioning)

---

## Cách dùng
 
File này ghi lại mọi lần chạy skill của agent trong dự án. Mỗi lần run được gán **một Run ID duy nhất** (`run-xxx`).
- Nếu trong cùng 1 lần run có nhiều skill được gọi (vd: skill A auto-trigger skill B), các skill sẽ được ghi thành **nhiều row** với cùng Run ID nhưng kèm hậu tố thứ tự `.N` (`run-001.1` — kỹ năng đầu tiên; `run-001.2` — kỹ năng thứ hai; ...theo thứ tự thực thi)
- **Append-only**: row mới luôn được thêm vào cuối bảng. KHÔNG xóa/sửa row cũ.
- **Run ID auto-increment**: trước khi ghi, đọc file để xác định Run ID lớn nhất, sau đó tăng lên 1.
- **Multi-line trong cell**: dùng `<br>` để xuống dòng (Input / Output / Issue có nhiều mục).

## Cấu trúc Output
- **Run ID**: `run-xxx` hoặc `run-xxx.N`
- **Skill**: tên kỹ năng được thực thi
- **Input**: danh sách các file đã đọc, mỗi file một dòng
- **Output**: danh sách các file được tạo/chỉnh sửa, mỗi file một dòng
- **Issue**: các sự cố người dùng có thể xử lý (tên tệp tham chiếu không khớp, cấu trúc không khớp với mô tả, dữ liệu bị thiếu, sự mơ hồ, v.v.). Nếu không có sự cố, hãy viết `-`. Mỗi sự cố trên một dòng (sử dụng `<br>`)
- **Execute date**: ngày chạy, định dạng `YYYY-MM-DD`
- **Duration**: tổng số phút, làm tròn 1 chữ số thập phân
---

## Run Log

| Run ID | Skill | Input | Output | Issue | Execute date | Duration (phút) |
|--------|-------|-------|--------|-------|--------------|-----------------|
