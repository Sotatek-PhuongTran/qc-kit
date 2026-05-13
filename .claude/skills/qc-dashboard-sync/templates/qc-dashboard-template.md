# QC Dashboard

> **Source of truth** cho trạng thái tất cả features/use cases của dự án.
>
> **Ownership:**
> - `qc-dashboard-sync` — **owner duy nhất** của file này. Quản lý cột: `Site`, `{{ID_LABEL}}`, `Module`, `Feature/Use case name`, `In scope?`, `Files stt`. Tạo file từ template khi chưa có; tự thêm row khi phát hiện folder UC mới; tự đánh `Removed` khi folder biến mất (kèm xác nhận user).
> - `qc-uc-read` quản lý cột: `UC review stt`.
> - `qc-func-scenario-design` quản lý cột: `Scenario design stt`.
> - `qc-func-tc-design` quản lý cột: `TC design stt`.
> - `qc-context-master` produce feature list từ WBS rồi handoff cho `qc-dashboard-sync` (KHÔNG tự ghi vào dashboard).
> - Cột `Execute stt` hiện đang pending (chưa có skill quản lý — để trống).
>
> **DO NOT delete rows.** Feature/UC bị remove khỏi WBS sẽ được đánh `In scope? = Removed` (soft-delete).

| Site | {{ID_LABEL}} | Module | Feature/Use case name | In scope? | Files stt | UC review stt | Scenario design stt | TC design stt | Execute stt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

---

## Ghi chú trạng thái

- **Site:** Portal/site mà feature/UC thuộc về (vd: Admin, Vendor, User, App, Web...).
- **{{ID_LABEL}}:** Định danh duy nhất. Tên cột này adapt theo cách dự án gọi (`Use Case ID`, `Feature ID`, `Story ID`, ...). **Giá trị phải khớp folder name** trong các path artifact (vd: nếu giá trị là `UC-VOB-001` thì có folder `docs/.../UC-VOB-001/`) để `qc-dashboard-sync` quét được.
- **Module:** Module / nhóm chức năng.
- **Feature/Use case name:** Tên human-readable.
- **In scope?:** `Yes` (đang trong scope) / `No` (out of scope hiện tại) / `Removed` (đã từng có nhưng bị remove khỏi WBS — soft-delete) / `Need confirm` (`qc-dashboard-sync` mới phát hiện folder hoặc folder Removed quay lại — đang chờ user xác nhận). Row ở trạng thái `Need confirm` cần user trả lời câu hỏi từ `qc-dashboard-sync` hoặc edit thủ công thành Yes / No / Removed.
- **Files stt:** Trạng thái tồn tại của 6 loại file artifact cho UC. Format trong cell: 6 dòng nối bằng `<br>`, theo thứ tự cố định:
  ```
  Specs: V<N> | Missing
  WF: V<N> | Missing
  Audited: V<N> | Missing
  Scenario: V<N> | Missing
  TC md: V<N> | Missing
  TC xlsx: V<N> | Missing
  ```
  Mỗi item tham chiếu folder qua path-registry logical name:
  - `Specs` ← `requirement-files/<ID>/` (file `.md/.docx/.pdf`, không kể image, không kể `_extracted_`)
  - `WF` ← `requirement-files/<ID>/` (file image: `.png/.jpg/.fig/.svg/...`)
  - `Audited` ← `uc-review-report/<ID>/` (file `*_audited_*.md`)
  - `Scenario` ← `func-test-scenarios/<ID>/` (file có `_scenarios_` trong tên)
  - `TC md` ← `func-test-cases-draft/<ID>/` (file `_testcases_*.md`)
  - `TC xlsx` ← `func-test-cases/<ID>/` (file `_testcases_*_v<N>.xlsx`)
- **UC review stt:** Trạng thái run của `qc-uc-read`. Giá trị:
  - *(trống)* — chưa từng chạy `qc-uc-read`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `<Verdict> v<N> (Score X/100)` — đã review xong (ví dụ: `Conditionally Ready v2 (Score 73.1/100)`, `Ready v1 (Score 92/100)`, `Not Ready v1 (Score 45/100)`).
- **Scenario design stt:** Trạng thái run của `qc-func-scenario-design`. Giá trị:
  - *(trống)* — chưa từng chạy `qc-func-scenario-design`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `v<N> generated` — workflow chạy xong, tạo `V<N>`.
- **TC design stt:** Trạng thái run của `qc-func-tc-design`. Giá trị:
  - *(trống)* — chưa từng chạy `qc-func-tc-design`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `v<N> generated` — workflow `generate-test-cases` chạy xong.
  - `v<N> updated` — workflow `update-test-cases` chạy xong.
- **Execute stt:** Pending (chưa có skill quản lý — placeholder).
