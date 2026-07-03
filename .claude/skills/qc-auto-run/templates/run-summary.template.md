# Automation Run Summary

> Title: Automation Run Summary | Run at: <YYYY-MM-DD HH:mm (+07:00)> | Author: qc-auto-run | Environment: <env name — non-prod>
> Scope: <all | UC | screen | grep>

## Per-UC results (read by qc-dashboard-sync — `Execute stt`)

| UC | Pass | Total | Result cell | Failed TCs | Blocked TCs |
|---|---|---|---|---|---|
| <UC-ID> | <p> | <t> | <p>/<t> pass — <YYYY-MM-DD> | <TC_010, TC_014 | —> | <TC_059, TC_060 | —> |

> Blocked = thiếu precondition, KHÔNG chạy và KHÔNG tính Failed. Tính trong Total để độ phủ không bị ảo.

## Failed test detail

| TC ID | Spec | Error (one line) | Trace |
|---|---|---|---|
| <TC_010> | <screen>.spec.ts | <message> | test-results/<...>/trace.zip |

## Blocked — thiếu precondition (không chạy, không tính Failed)

| TC ID | Precondition key | Trạng thái cần có (từ data md) | Cách kiểm đã dùng | Việc cần làm trước lần chạy sau |
|---|---|---|---|---|
| <TC_059> | <suspendedOrgUser> | <một tài khoản Org User đã bị ngưng hoạt động...> | <api check thất bại | chưa có Confirmed | user trả lời chưa tạo> | <tạo trạng thái theo cột bên trái; nếu là dòng manual không có check thì ghi Confirmed vào data md> |

> Raw results: `test-results/results.json` (JSON), `test-results/results.xml` (JUnit) — keyed by test title (TC ID).
