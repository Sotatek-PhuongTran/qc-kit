# Bug Report — <UC-ID> <Tên tính năng>

> File SỐNG — không ngày, không version, cập nhật in-place.
> QC/dev CHỈ cập nhật cột "Trạng thái" (giá trị hợp lệ xem "Vòng đời trạng thái"); mọi cột khác do `qc-bug-report` (phân tích + tạo bug + ghi nhận tái hiện) và `qc-bug-verify` (kết luận sau chạy xác nhận) ghi. Riêng mục "Bug từ TC thủ công" do QC tự viết toàn bộ.
> Mọi bug do skill ghi đều ĐÃ được kiểm chứng: câu hỏi crawl-findings/api-findings liên quan đã `Đã giải quyết` và test đã chạy lại sau đó; root cause phân định bằng đối chứng UI↔API (taxonomy: `.claude/config/api-shared/root-cause-taxonomy.md`).
> File kết quả tương ứng: `docs/qc/testcases/<UC-ID>/<UC-ID>_<feature>_test-results.md`.

## Vòng đời trạng thái

| Trạng thái | Ai đặt | Ý nghĩa |
|---|---|---|
| `Mới` | qc-bug-report | Bug vừa được ghi nhận, chưa ai xử lý |
| `Dev đã fix — chờ verify` | QC/dev | Dev báo đã sửa — chờ chạy xác nhận |
| `Không tái hiện được` | QC/dev | Dev không tái hiện được — cần chạy lại để có bằng chứng mới |
| `Không còn` | QC/dev | Yêu cầu đã thay đổi khiến bug không còn ý nghĩa |
| `Không phải bug` | QC/dev | Hành vi được xác nhận là đúng thiết kế |
| `Đã đóng — verified <ngày> — <env>` | qc-bug-verify | Chạy xác nhận đạt — bug đã được sửa thật |
| `Mở lại` | qc-bug-verify | Chạy xác nhận vẫn trượt — kèm bằng chứng mới trong "Lịch sử" |

## Bảng tổng hợp

| Bug ID | Tiêu đề (tự chứa) | Root cause | Mức độ | TC liên quan | Phát hiện (ngày — env) | Trạng thái | Verify gần nhất |
|---|---|---|---|---|---|---|---|
| BUG-<UC-suffix>-01 | <chủ thể + hành vi sai + điều kiện> | Lỗi BE / Lỗi FE / Lỗi tích hợp | Trung bình | TC_052, TC_API_012 | 2026-07-10 — DEV | Mới | — |

## Chi tiết

### BUG-<UC-suffix>-01 — <tiêu đề tự chứa, trùng bảng tổng hợp>

| Trường | Nội dung |
|---|---|
| Root cause | <Lỗi BE / Lỗi FE / Lỗi tích hợp> — <1 câu giải thích căn cứ phân định> |
| Mức độ nghiêm trọng | Nghiêm trọng / Cao / Trung bình / Thấp |
| Độ ưu tiên | Cao / Trung bình / Thấp |
| Môi trường | <ENV> — <URL portal / API base URL> — phát hiện ngày <YYYY-MM-DD> (Run <N>) |
| TC / tiêu chí liên quan | <danh sách TC cả 2 nhánh kèm tên ngắn> — <tiêu chí chấp nhận kèm mã trong ngoặc> |
| Các bước tái hiện | 1. <bước tự chứa — bước UI hoặc request cụ thể> 2. ... (lấy từ bước của test case + lỗi quan sát được) |
| Kết quả mong đợi | <trích nguyên văn từ audited/api-audited; message trong "..."; status/schema trong backtick> |
| Kết quả thực tế | <trích nguyên văn hành vi/message/status quan sát được> |
| Đối chứng | <TC UI Fail + TC API Pass → lỗi phía FE, ... — hoặc: "kết luận dựa trên 1 phía đối chứng — TC đối chứng chưa chạy/không tồn tại"> |
| Bằng chứng | `runner/test-results/<...>/trace.zip`, `runner/test-results/results.json`, <response/screenshot> |
| Căn cứ đã kiểm chứng | <câu trả lời crawl-findings/api-findings xác nhận tài liệu đúng / tái hiện ổn định ở Run <N>> |
| Trạng thái | Mới |

**Lịch sử:**

| Ngày | Env | Hành động | TC chạy lại | Kết quả | Trạng thái mới |
|---|---|---|---|---|---|
| <YYYY-MM-DD> | DEV | Ghi nhận lần đầu (Run <N>) | — | — | Mới |

---

## Bug từ TC thủ công (QC tự ghi)

> Mục này do QC viết TOÀN BỘ theo đúng format chi tiết bên trên (đánh ID tiếp theo dãy `BUG-<UC-suffix>-<NN>` để không trùng). Các skill không phân tích TC thủ công và không sửa mục này; `qc-bug-verify` chỉ nhắc trong chat khi mục này có bug đang mở — việc verify bug thủ công do QC tự thực hiện và tự cập nhật Trạng thái.
