# QC Dashboard

> **Source of truth** cho trạng thái tất cả features/use cases của dự án.
>
> **Ownership:**
> - `qc-dashboard-sync` — **owner duy nhất** của file này. Quản lý cột: `Site`, `Use Case ID`, `Module`, `Feature/Use case name`, `In scope?`, `Files stt`. Tạo file từ template khi chưa có; tự thêm row khi phát hiện folder UC mới; tự đánh `Removed` khi folder biến mất (kèm xác nhận user).
> - `qc-uc-read` quản lý cột: `UC review stt`.
> - `qc-func-scenario-design` quản lý cột: `Scenario design stt`.
> - `qc-func-tc-design` quản lý cột: `TC design stt`.
> - `qc-context-master` produce feature list từ WBS rồi handoff cho `qc-dashboard-sync` (KHÔNG tự ghi vào dashboard).
> - Cột `Execute stt` hiện đang pending (chưa có skill quản lý — để trống).
>
> **DO NOT delete rows.** Feature/UC bị remove khỏi WBS sẽ được đánh `In scope? = Removed` (soft-delete).

| Site | Use Case ID | Module | Feature/Use case name | In scope? | Files stt | UC review stt | Scenario design stt | TC design stt | Execute stt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Mobile | UC1 | Trang chủ & Điều hướng | Trang chủ Dashboard | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC2 | Tra cứu KCN/KKT & Quỹ đất | Tra cứu KCN, KCN Sinh thái, KKT, TMTD, PTQ, Mô hình khác (UC2-UC31) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC40 | Tra cứu KCN/KKT & Quỹ đất | Tra cứu quỹ đất KCN | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC42-44 | Quản lý hồ sơ & Dịch vụ | Quản lý đặt lịch nộp hồ sơ | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC45-51 | Quản lý hồ sơ & Dịch vụ | Quản lý hồ sơ | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC52 | Quản lý hồ sơ & Dịch vụ | Kho tài liệu cá nhân | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC53_63-65 | Quản lý hồ sơ & Dịch vụ | Phản ánh kiến nghị (UC53, UC63-65) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC54 | Quản lý hồ sơ & Dịch vụ | Báo cáo đã nộp | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC55 | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang đầu tư theo khu vực | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC56-57_66_68 | Tin tức, Thông tin & Hỗ trợ | Tin tức (UC56-57, UC66, UC68) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC58 | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang (UC58 — thuộc file UC55-68) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC59 | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang (UC59 — thuộc file UC55-68) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC60-61 | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang (UC60-61) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC62 | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang (UC62 — thuộc file UC55-68) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC67 | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang (UC67) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC69 | Tin tức, Thông tin & Hỗ trợ | Văn bản pháp luật | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC71-82 | Tin tức, Thông tin & Hỗ trợ | Hướng dẫn sử dụng & FAQ | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC73 | Tin tức, Thông tin & Hỗ trợ | Tra cứu Thủ tục hành chính (TTHC) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC83-86 | Tin tức, Thông tin & Hỗ trợ | Điều khoản, Chính sách, Liên hệ, Giới thiệu | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC87 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC87 — thuộc file UC87-95) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC88 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC88) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC89 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC89) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC90 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC90, thuộc nhóm UC87-95) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC91 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC91) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC92 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC92 — yêu cầu đăng nhập, khác PQ-07) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC93 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC93) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC94 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC94) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC95 | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC95) | Need confirm | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC249 | Xác thực & Quản lý tài khoản | Cấu hình & Quản lý tài khoản (UC249, UC250, UC251, UC254, UC260) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC250-254 | Xác thực & Quản lý tài khoản | Đăng ký, Quên MK, Cập nhật DN, Cấu hình (UC250-254) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC256 | Xác thực & Quản lý tài khoản | Đăng nhập ứng dụng Mobile | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC257 | Xác thực & Quản lý tài khoản | Đăng xuất ứng dụng Mobile | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |
| Mobile | UC258_UC259 | Thông báo | Thông báo hệ thống (UC258, UC259) | Yes | Specs: Missing<br>WF: Missing<br>Audited: Missing<br>Scenario: Missing<br>TC md: Missing<br>TC xlsx: Missing |  |  |  |  |

---

## Ghi chú trạng thái

- **Site:** Portal/site mà feature/UC thuộc về (vd: Admin, Vendor, User, App, Web...).
- **Use Case ID:** Định danh duy nhất. Tên cột này adapt theo cách dự án gọi (`Use Case ID`, `Feature ID`, `Story ID`, ...). **Giá trị phải khớp folder name** trong các path artifact (vd: nếu giá trị là `UC-VOB-001` thì có folder `docs/.../UC-VOB-001/`) để `qc-dashboard-sync` quét được.
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
