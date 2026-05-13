# QC Dashboard

> **Source of truth** cho trạng thái tất cả features/use cases của dự án.
>
> **Ownership:**
> - `qc-context-master` quản lý cột: `Site`, `Use Case ID`, `Module`, `Feature/Use case name`, `In scope?`
> - `qc-dashboard-sync` quản lý cột: `Specs stt`, `WF stt`, `Test scenario stt`, `Test cases stt`
> - `qc-uc-read` quản lý cột: `Review stt`
> - Cột `Execute stt` hiện đang pending (chưa có skill quản lý — để trống).
>
> **DO NOT delete rows.** Feature/UC bị remove khỏi WBS sẽ được đánh `In scope? = Removed` (soft-delete).

| Site | Use Case ID | Module | Feature/Use case name | In scope? | Specs stt | WF stt | Review stt | Test scenario stt | Test cases stt | Execute stt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

---

## Ghi chú trạng thái

- **Site:** Portal/site mà feature/UC thuộc về (vd: Admin, Vendor, User, App, Web...).
- **Use Case ID:** Định danh duy nhất. Tên cột này adapt theo cách dự án gọi (`Use Case ID`, `Feature ID`, `Story ID`, ...). **Giá trị phải khớp folder name** trong các path artifact (vd: nếu giá trị là `UC-VOB-001` thì có folder `docs/.../UC-VOB-001/`) để `qc-dashboard-sync` quét status được.
- **Module:** Module / nhóm chức năng.
- **Feature/Use case name:** Tên human-readable.
- **In scope?:** `Yes` (đang trong scope) / `No` (out of scope hiện tại) / `Removed` (đã từng có nhưng bị remove khỏi WBS — soft-delete).
- **Specs stt:** `Missing` / `V<N> existed` (N = phiên bản cao nhất tìm thấy trong folder spec).
- **WF stt:** `Missing` / `V<N> existed` (dựa trên file wireframe/UI trong folder spec).
- **Review stt:** Trạng thái review của UC do `qc-uc-read` quản lý. Giá trị:
  - *(trống)* — chưa từng chạy `qc-uc-read`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `<Verdict> v<N> (Score X/100)` — đã review xong (ví dụ: `Conditionally Ready v2 (Score 73.1/100)`, `Ready v1 (Score 92/100)`, `Not Ready v1 (Score 45/100)`).
- **Test scenario stt:** `Missing` / `V<N> existed`.
- **Test cases stt:**
  - `Missing` — chưa có draft.md cũng chưa có .xlsx.
  - `V<N> missing .xlsx file` — có draft.md cho V<N> nhưng chưa convert sang .xlsx.
  - `V<N> existed` — có cả draft.md và .xlsx cho V<N>.
- **Execute stt:** Pending (chưa có skill quản lý — placeholder).
