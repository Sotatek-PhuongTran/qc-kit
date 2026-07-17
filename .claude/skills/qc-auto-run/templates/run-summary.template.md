# Automation Run Summary

> Title: Automation Run Summary | Run at: <YYYY-MM-DD HH:mm (+07:00)> | Author: qc-auto-run | Environment: <env name — non-prod>
> Scope: <all | UC | screen | resource | grep> | Branches: <UI + API + MIX | UI | API>

## Per-UC results (read by qc-dashboard-sync — `Execute stt`)

<!-- CỘT GIỮ NGUYÊN — parser contract. Pass/Total gộp MỌI nhánh; Blocked tính trong Total, không tính Pass/Failed. -->

| UC | Pass | Total | Result cell | Failed TCs | Blocked TCs |
|---|---|---|---|---|---|
| <UC-ID> | <p> | <t> | <p>/<t> pass — <YYYY-MM-DD> | <TC_010, TC_API_014 | —> | <TC_059, TC_API_060 | —> |

> Blocked = thiếu precondition, KHÔNG chạy và KHÔNG tính Failed. Tính trong Total để độ phủ không bị ảo.

## Per-branch breakdown

<!-- Nhánh xác định theo tiền tố TC-ID: TC_API_* = API, TC_MIX_* = MIX, còn lại = UI. UC không có nhánh nào thì bỏ dòng nhánh đó. -->

| UC | Nhánh | Pass | Fail | Blocked | Total |
|---|---|---|---|---|---|
| <UC-ID> | UI | <p> | <f> | <b> | <t> |
| <UC-ID> | API | <p> | <f> | <b> | <t> |
| <UC-ID> | MIX | <p> | <f> | <b> | <t> |

## Failed test detail

| TC ID | Spec | Error (one line) | Trace |
|---|---|---|---|
| <TC_010> | <screen>.spec.ts | <message> | runner/test-results/<...>/trace.zip |
| <TC_API_014> | tests/api/<UC-ID>/<resource>.spec.ts | <message — status/assert> | runner/test-results/<...>/trace.zip |

## Baseline mới ghi / lệch chưa confirm (api-baseline — expected-and-verify-policy §4)

<!-- Nguồn: dòng console `[api-baseline] RECORDED <TC>: <status> "<message>"` (loại "recorded") + assertion fail
     có chữ "lệch baseline" với ghi chú "(chưa confirm ...)" (loại "mismatch chưa confirm"). Chỉ chạy nhánh API/MIX.
     Không có dòng nào → ghi "Không có". Mismatch với entry ĐÃ confirm KHÔNG vào đây — đó là ứng viên bug (Failed detail). -->

| TC | UC | Loại | Status/message ghi nhận | Hành động chờ |
|---|---|---|---|---|
| <TC_API_002> | <UC-ID> | recorded — ghi lần đầu | <400 — "Email is required"> | QC/BE review và set `confirmed=true` trong `api-baselines/<UC-ID>_api-baseline.json` (hoặc sửa giá trị theo BE) |
| <TC_API_014> | <UC-ID> | mismatch — lệch baseline chưa confirm | <quan sát 422 ≠ baseline 400 (chưa confirm)> | KHÔNG phải bug — QC/BE confirm giá trị đúng, hoặc xoá entry để re-record ở lần chạy sau |

## Blocked — thiếu precondition (không chạy, không tính Failed)

| TC ID | Precondition key | Trạng thái cần có (từ data md) | Cách kiểm đã dùng | Việc cần làm trước lần chạy sau |
|---|---|---|---|---|
| <TC_059> | <suspendedOrgUser> | <một tài khoản Org User đã bị ngưng hoạt động...> | <api check thất bại | chưa có Confirmed | user trả lời chưa tạo> | <tạo trạng thái theo cột bên trái; nếu là dòng manual không có check thì ghi Confirmed vào data md> |

## Gate check (crawl-findings + api-findings) — điều kiện auto-trigger chốt kết quả

| UC | Gate | Chi tiết |
|---|---|---|
| <UC-ID> | <Sạch — đã auto-trigger /qc-execute-test-report | Còn N dòng chưa giải quyết> | <— | file#dòng: trạng thái> |

> Raw results: `runner/test-results/results.json` (JSON), `runner/test-results/results.xml` (JUnit) — keyed by test title (TC ID).
