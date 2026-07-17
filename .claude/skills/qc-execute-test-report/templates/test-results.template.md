# Kết quả thực thi test — <UC-ID> <Tên tính năng>

> File SỐNG — không ngày, không version, cập nhật in-place qua các lần chạy.
> Nguồn khung test case: `<tên file testcases md>` (v<N>) + `<tên file api-testcases md>` (v<M>, nếu có nhánh API). Cập nhật lần cuối: <YYYY-MM-DD> bởi `<qc-execute-test-report | qc-bug-report | qc-bug-verify>`.
> Ô kết quả của TC thủ công do QC điền tay; mã bug trong ô do `qc-bug-report` stamp; mọi ô khác do `qc-execute-test-report` / `qc-bug-verify` ghi — không sửa chéo.
> File bug tương ứng: `docs/qc/automation/bugs/<UC-ID>_<feature>_bug-report.md`.

## Giải nghĩa ô kết quả

| Giá trị | Ý nghĩa |
|---|---|
| `Pass` | Test case chạy đạt ở lần chạy đó |
| `Fail` | Trượt, CHƯA phân loại — `qc-bug-report` sẽ phân tích và stamp thành một trong hai giá trị dưới |
| `Fail — BUG-<...>` | Trượt, đã kiểm chứng là bug thật (root cause trong file bug report) |
| `Chưa chốt — <lý do>` | Trượt nhưng KHÔNG phải bug: lỗi script / lỗi môi trường / lỗi data test / chờ cập nhật UC-TC theo yêu cầu đã thay đổi / baseline chưa confirm |
| `Blocked — thiếu <key>` | Không chạy được vì thiếu điều kiện tiên quyết `<key>` — cách tạo xem file test data của nhánh tương ứng |
| `Chưa chạy` | Test case thủ công chưa được thực thi — QC điền kết quả tay sau khi chạy |
| `—` | Test case nằm ngoài phạm vi của lần chạy đó |

## Kết quả theo test case

<!-- Loại: GUI / FUNC (nhánh UI) · API / MIX (nhánh API — nhận theo tiền tố TC_API_ / TC_MIX_) -->

| TC ID | Tiêu đề | Ưu tiên | Loại | Cách chạy | Run 1 — <DD/MM> — <ENV> — <Trình duyệt|API> |
|---|---|---|---|---|---|
| TC_001 | <tiêu đề tự chứa từ file test case> | Critical | GUI | Tự động | Pass |
| TC_002 | <tiêu đề> | High | FUNC | Tự động | Fail — BUG-<UC-suffix>-01 |
| TC_003 | <tiêu đề> | Medium | FUNC | Thủ công | Chưa chạy |
| TC_API_001 | <tiêu đề> | Critical | API | Tự động | Pass |
| TC_MIX_001 | <tiêu đề> | High | MIX | Tự động | Chưa chốt — lỗi script |
