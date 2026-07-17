# API Findings — <resource>

> File SỐNG — 1 file/resource, KHÔNG ngày, KHÔNG version, sửa tại chỗ. Contract: `.claude/config/api-shared/api-findings-contract.md`.
>
> **Cách dùng:** cột "Trả lời của QC/dev/BE" do BẠN/dev điền inline (vd: "endpoint đúng là `POST /api/v2/users`", "param đổi tên thành `userEmail`", "sẽ deploy sprint 12", "doc lỗi thời — dùng theo hệ thống"). Điền xong, chạy lại `/qc-api-auto-generate <UC-ID>` — skill dò lại theo câu trả lời và đánh dấu `Đã giải quyết`. MỌI dòng phải `Đã giải quyết` (và đã chạy lại sau đó) trước khi `/qc-execute-test-report` chốt kết quả cho UC liên quan.

| # | Ngày phát hiện | Operation / Endpoint | TC bị ảnh hưởng | Phát hiện | Trả lời của QC/dev/BE | Trạng thái | Ngày giải quyết |
|---|---|---|---|---|---|---|---|
| 1 | YYYY-MM-DD | Tạo user (`POST /api/v1/users`) | UC-101/TC_API_001, UC-101/TC_API_002 | Gửi request probe với token Admin hợp lệ, hệ thống trả `404 Not Found` — theo TC/doc phải tồn tại và trả `4xx` validate |  | Chờ trả lời |  |
