# Path Registry

> **Mục đích:** File này lưu các đường dẫn file mà các skills cần tìm để đọc files nhằm giảm thiểu việc phải ghi trong các skills và khó khăn khi cần update lại path.
>
> **Cách dùng:** Khi một skill cần đọc hoặc ghi file, nó tra cứu `logical-name` tương ứng trong bảng dưới để lấy đường dẫn thực tế.
>
> **Cách apply vào dự án mới:** Điền giá trị vào cột `Path` cho từng artifact. Giữ nguyên `docs/` làm gốc.
> Các ô còn để `docs/???` là chưa được cấu hình — agent sẽ hỏi user trước khi tiếp tục.

---

## Artifact Path Table

| Logical Name              | Path                        | File Pattern                                              | Mô tả                                                           |
|---------------------------|-----------------------------|-----------------------------------------------------------|-----------------------------------------------------------------|
| `requirement-common-files`| `docs/BA/Common rules`                  | `*.md`, `*.docx`, `*.pdf`                                 | Các file yêu cầu dùng chung cho toàn dự án (business rules, common rules, use case list...) |
| `project-context-master`|`docs/QC/common/`| `project-context-master_<YYYYMMDD>_v<N>.md`                                 | File tổng hợp context dự án từ `qc-context-master` |
| `requirement-files`       | `docs/BA/<UC-ID-Report name>`         | `*.md`, `*.docx`, `*.pdf`, `*.png`                        | Tài liệu yêu cầu gốc theo từng UC (SRS, wireframe, v.v.)       |
| `uc-review-report`        | `docs/QC/uc-read/<UC-ID>/`         | `<UC-ID>_<feature>_audited_<YYYYMMDD>_v<N>.md`            | Báo cáo kiểm tra độ sẵn sàng UC — output của `qc-uc-read`      |
| `question-backlog`        | `docs/QC/uc-read/<UC-ID>/`         | `<UC-ID>_<feature>_question-backlog_<YYYYMMDD>_v<N>.md`   | Danh sách câu hỏi mở — ghi bởi `qc-qna` |
| `func-test-scenarios`          | `docs/QC/test-scenarios/functional-test/<UC-ID>/`         | `<UC-ID>_<feature>_scenarios_<YYYYMMDD>_v<N>.md`          | Test scenarios — output của `qc-func-scenario-design`           |
| `func-test-cases`              | `docs/QC/test-cases/functional-test/<UC-ID>/`         | `<UC-ID>_<feature>_testcases_<YYYYMMDD>_v<N>.xlsx`        | Test cases — output của `qc-func-tc-design`                     |
| `func-test-cases-draft`        | `docs/QC/test-cases/functional-test/<UC-ID>/`         | `<UC-ID>_<feature>_testcases_draft.md`                    | Bản test cases định dạng md            |
| `func-test-cases-summary`      | `docs/QC/test-cases/functional-test/<UC-ID>/`         | `<UC-ID>_<feature>_testcases_summary_<YYYYMMDD>_v<N>.md`  | Tóm tắt sau khi thiết kế test cases                         |

---

## Skill → Artifact Mapping

Bảng này cho thấy skill nào đọc/ghi artifact nào. Dùng để kiểm tra nhanh khi cần trace nguồn dữ liệu.

| Skill                      | Đọc                                                                 | Ghi                                          |
|----------------------------|----------------------------------------------------------------------|----------------------------------------------|
| `qc-context-master`        | `requirement-common-files`, `requirement-files`                     | `project-context-master`        |
| `qc-uc-read`               | `requirement-common-files`, `requirement-files`, `question-backlog` | `uc-review-report`, `question-backlog`        |
| `qc-func-scenario-design`  | `uc-review-report`                                                   | `func-test-scenarios`                             |
| `qc-func-tc-design`        | `uc-review-report`, `func-test-scenarios`                                 | `func-test-cases`, `func-test-cases-draft`, `test-cases-summary` |
| `qc-qna`                   | `question-backlog`                                                   | `question-backlog`                           |

---

## Quy tắc

- **NEVER hard-code** một đường dẫn cụ thể trong SKILL.md. Luôn tham chiếu `logical-name` từ file này.
- **Luôn đọc version mới nhất** — scan thư mục và chọn file có `v<N>` cao nhất.
- **NEVER overwrite** file đã có. Tạo phiên bản mới `v<N+1>`.
- Nếu path của một artifact là `docs/???`, agent phải **dừng lại và hỏi user** trước khi tiếp tục.
- Nếu không tìm thấy `logical-name` trong bảng này, agent phải **dừng lại và hỏi user** trước khi tiếp tục.
