# Kết quả thực thi test — <UC-ID> <Tên tính năng> — <platform-variant>

> File SỐNG — không ngày, không version, cập nhật in-place qua các lần chạy.
> Nguồn khung test case: `<tên file testcases md>` (v<N>). Cập nhật lần cuối: <YYYY-MM-DD> bởi `<qc-execute-test-report | qc-bug-verify>`.
> Ô kết quả của TC thủ công do QC điền tay; mọi ô khác do `qc-execute-test-report` / `qc-bug-verify` ghi — không sửa chéo.
> File bug tương ứng: `docs/qc/automation/bugs/<UC-ID>_<feature>_bug-report.md`.

## Giải nghĩa ô kết quả

| Giá trị | Ý nghĩa |
|---|---|
| `Pass` | Test case chạy đạt ở lần chạy đó |
| `Fail — BUG-<...>` | Test case trượt, nguyên nhân đã được kiểm chứng là bug thật — xem mã bug tương ứng trong file bug report |
| `Blocked — thiếu <key>` | Không chạy được vì thiếu điều kiện tiên quyết `<key>` — cách tạo điều kiện xem file test data (`data/<UC-ID>_testdata.md`) |
| `Chưa chốt — <lý do>` | Trượt nhưng KHÔNG phải bug: lỗi script tự động / lỗi môi trường-dữ liệu / chờ cập nhật lại UC và test case theo yêu cầu đã thay đổi |
| `Chưa chạy` | Test case thủ công chưa được thực thi — QC điền kết quả tay sau khi chạy |
| `—` | Test case nằm ngoài phạm vi của lần chạy đó |

## Kết quả theo test case

| TC ID | Tiêu đề | Ưu tiên | Loại | Cách chạy | Run 1 — <DD/MM> — <ENV> — <Trình duyệt> |
|---|---|---|---|---|---|
| TC_001 | <tiêu đề tự chứa từ file test case> | P1 | GUI | Tự động | Pass |
| TC_002 | <tiêu đề> | P2 | FUNC | Tự động | Fail — BUG-<UC-suffix>-01 |
| TC_003 | <tiêu đề> | P3 | FUNC | Thủ công | Chưa chạy |
