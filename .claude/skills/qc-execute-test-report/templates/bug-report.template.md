# Bug Report — <UC-ID> <Tên tính năng>

> File SỐNG — không ngày, không version, cập nhật in-place.
> QC/dev CHỈ cập nhật cột "Trạng thái" (các giá trị hợp lệ xem "Vòng đời trạng thái" bên dưới); mọi cột khác do `qc-execute-test-report` (tạo bug, ghi nhận tái hiện) và `qc-bug-verify` (kết luận sau khi chạy xác nhận) ghi.
> Mọi bug trong file này đều ĐÃ được kiểm chứng: câu hỏi crawl-findings của các trang liên quan đã được trả lời và test đã chạy lại sau đó.
> File kết quả tương ứng: `docs/qc/testcases/<UC-ID>/<UC-ID>_<feature>_test-results.md`.

## Vòng đời trạng thái

| Trạng thái | Ai đặt | Ý nghĩa |
|---|---|---|
| `Mới` | qc-execute-test-report | Bug vừa được ghi nhận, chưa ai xử lý |
| `Dev đã fix — chờ verify` | QC/dev | Dev báo đã sửa — chờ chạy xác nhận |
| `Không tái hiện được` | QC/dev | Dev không tái hiện được — cần chạy lại để có bằng chứng mới |
| `Không còn` | QC/dev | Yêu cầu đã thay đổi khiến bug không còn ý nghĩa |
| `Không phải bug` | QC/dev | Hành vi được xác nhận là đúng thiết kế |
| `Đã đóng — verified <ngày> — <env>` | qc-bug-verify | Chạy xác nhận đạt — bug đã được sửa thật |
| `Mở lại` | qc-bug-verify | Chạy xác nhận vẫn trượt — kèm bằng chứng mới trong "Lịch sử" |

## Bảng tổng hợp

| Bug ID | Tiêu đề (tự chứa) | Mức độ | TC liên quan | Phát hiện (ngày — env) | Trạng thái | Verify gần nhất |
|---|---|---|---|---|---|---|
| BUG-<UC-suffix>-01 | <tiêu đề mô tả đủ: chủ thể + hành vi sai + điều kiện> | Trung bình | TC_052, TC_053 | 2026-07-06 — DEV | Mới | — |

## Chi tiết

### BUG-<UC-suffix>-01 — <tiêu đề tự chứa, trùng với bảng tổng hợp>

| Trường | Nội dung |
|---|---|
| Mức độ nghiêm trọng | Nghiêm trọng / Cao / Trung bình / Thấp |
| Độ ưu tiên | Cao / Trung bình / Thấp |
| Môi trường | <ENV> — <URL portal> — phát hiện ngày <YYYY-MM-DD> (Run <N>) |
| TC / tiêu chí liên quan | <danh sách TC kèm tên ngắn> — <tiêu chí chấp nhận kèm mã trong ngoặc, vd: lỗi tại chỗ khi email sai định dạng (AC-03)> |
| Các bước tái hiện | 1. <bước tự chứa: chủ thể + hành động + giá trị cụ thể> 2. ... (lấy từ bước của test case + lỗi quan sát được) |
| Kết quả mong đợi | <trích nguyên văn từ UC/audited, message đặt trong "..."> |
| Kết quả thực tế | <trích nguyên văn hành vi/message quan sát được> |
| Bằng chứng | `runner/test-results/<...>/trace.zip`, ảnh chụp `test-failed-1.png`, `runner/test-results/results.json` |
| Căn cứ đã kiểm chứng | <câu trả lời crawl-findings xác nhận UC đúng (vd: mục D4 đã trả lời "...") / hoặc: lỗi không liên quan discrepancy nào, tái hiện ổn định ở Run <N>> |
| Trạng thái | Mới |

**Lịch sử:**

| Ngày | Env | Hành động | TC chạy lại | Kết quả | Trạng thái mới |
|---|---|---|---|---|---|
| <YYYY-MM-DD> | DEV | Ghi nhận lần đầu (Run <N>) | — | — | Mới |
