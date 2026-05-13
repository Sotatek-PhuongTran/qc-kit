# Path Registry

> **Mục đích:** File này lưu các đường dẫn file mà các skills cần tìm để đọc files nhằm giảm thiểu việc phải ghi trong các skills và khó khăn khi cần update lại path.
>
> **Cách dùng:** Khi một skill cần đọc hoặc ghi file, nó tra cứu `logical-name` tương ứng trong bảng dưới để lấy đường dẫn thực tế.
>
> **Cách apply vào dự án mới:** Điền giá trị vào cột `Path` cho từng artifact. Giữ nguyên `docs/` làm gốc.
> Các ô còn để `docs/???` là chưa được cấu hình — agent sẽ hỏi user trước khi tiếp tục.

---

## Artifact Path Table

| Nguồn   | Logical Name              | Path                                                | File Pattern                                              | Mô tả    |
|---------|---------------------------|-----------------------------------------------------|-----------------------------------------------------------|----------|
| Agent   | `agent-work-log`          | `docs/qc-lead/`                                     | `agent-work-log.md`                                       | Log các lần chạy skill của agent — append-only |
| BA      | `High-level-files`        | `docs/qc-lead/high-level-files/`                    | `*.md`, `*.docx`, `*.pdf`, `*.xlsx`, `*.png`              | Các file high-level cho QC Lead thiết kế plan (WBS, Product Brief, System Architecture Diagram, Tech Stack...) |
| BA      | `requirement-common-files`| `docs/BA/Common rule`                              | `*.md`, `*.docx`, `*.pdf`                                 | Các file yêu cầu dùng chung cho toàn dự án phía BA (business rules, common rules, use case list...) |
| BA      | `requirement-files`       | `docs/BA/<UC-ID>`                                   | `*.md`, `*.docx`, `*.pdf`, `*.png`                        | Tài liệu yêu cầu gốc theo từng UC (SRS, wireframe, v.v.) |
| QC lead | `project-config`          | `docs/qc-lead/`                    | `project-config.md`                                       | Cấu hình dự án — project overview, links, environments, accounts, third-party APIs (per-project, edit in-place) |
| QC lead | `project-context-master`  | `docs/qc-lead/`                    | `project-context-master.md`                               | File tổng hợp tri thức dự án — output của `qc-context-master` |
| QC lead | `qc-dashboard`            | `docs/qc-lead/`                    | `qc-dashboard.md`                                         | Dashboard markdown — feature/UC list + trạng thái spec/wireframe/test scenarios/test cases|
| QC      | `uc-review-report`        | `docs/QC/uc-read/<UC-ID>/`                          | `<UC-ID>_<feature>_audited_<YYYYMMDD>_v<N>.md`            | Báo cáo kiểm tra độ sẵn sàng UC — output của `qc-uc-read` |
| QC      | `question-backlog`        | `docs/QC/uc-read/<UC-ID>/`                          | `<UC-ID>_<feature>_question-backlog_<YYYYMMDD>_v<N>.md`   | Danh sách câu hỏi mở — ghi bởi `qc-qna` |
| QC      | `func-test-scenarios`     | `docs/QC/scenarios/<UC-ID>/`   | `<UC-ID>_<feature>_scenarios_<YYYYMMDD>_v<N>.md`          | Test scenarios — output của `qc-func-scenario-design` |
| QC      | `func-test-cases-draft`   | `docs/QC/testcases/<UC-ID>/`       | `<UC-ID>_<feature>_testcases_draft.md`                    | Bản test cases định dạng md |
| QC      | `func-test-cases`         | `docs/QC/testcases/<UC-ID>/`       | `<UC-ID>_<feature>_testcases_<YYYYMMDD>_v<N>.xlsx`        | Test cases — output của `qc-func-tc-design` |
| QC      | `func-test-cases-summary` | `docs/QC/testcases/<UC-ID>/`       | `<UC-ID>_<feature>_testcases_summary_<YYYYMMDD>_v<N>.md`  | Tóm tắt sau khi thiết kế test cases |

---

## Skill → Artifact Mapping

Bảng này cho thấy skill nào đọc/ghi artifact nào. Dùng để kiểm tra nhanh khi cần trace nguồn dữ liệu.

| Skill                      | Đọc                                                                 | Ghi                                          |
|----------------------------|----------------------------------------------------------------------|----------------------------------------------|
| `qc-project-onboarding`    | `High-level-files` (chỉ check pre-flight), `project-config`     | `project-config` (+ edit `.claude/config/path-registry.md` in-place) |
| `qc-context-master`        | `High-level-files`, `requirement-common-files`, `project-config`, `project-context-master`, `qc-dashboard` | `project-context-master`, handoff file `.claude/skills/qc-dashboard-sync/inbox/feature-list-handoff.md` (then triggers `qc-dashboard-sync`). **KHÔNG ghi trực tiếp** `qc-dashboard`. |
| `qc-dashboard-sync`        | `qc-dashboard` (or creates from template), `requirement-files`, `uc-review-report`, `func-test-scenarios`, `func-test-cases-draft`, `func-test-cases`, `requirement-common-files` (for exclusion), optional handoff file | `qc-dashboard` (owner; writes cols 1-6: Site, ID, Module, Name, In scope?, Files stt). NEVER writes cols 7-10 (`UC review stt`, `Scenario design stt`, `TC design stt`, `Execute stt`). |
| `qc-uc-read`               | `requirement-common-files`, `requirement-files`, `question-backlog`, `project-context-master`, `qc-dashboard` (precheck) | `uc-review-report`, `question-backlog`, `qc-dashboard` col 7 `UC review stt`. MUST auto-trigger `qc-dashboard-sync` first if UC ID is not in dashboard. |
| `qc-func-scenario-design`  | `uc-review-report`, `project-context-master`, `qc-dashboard` (precheck) | `func-test-scenarios`, `qc-dashboard` col 8 `Scenario design stt`. MUST auto-trigger `qc-dashboard-sync` first if UC ID is not in dashboard. |
| `qc-func-tc-design`        | `uc-review-report`, `func-test-scenarios`, `project-context-master`, `qc-dashboard` (precheck) | `func-test-cases`, `func-test-cases-draft`, `func-test-cases-summary`, `qc-dashboard` col 9 `TC design stt`. MUST auto-trigger `qc-dashboard-sync` first if UC ID is not in dashboard. |
| `qc-qna`                   | `question-backlog`                                                   | `question-backlog`                           |

---

## Quy tắc

- **NEVER hard-code** một đường dẫn cụ thể trong SKILL.md. Luôn tham chiếu `logical-name` từ file này.
- **Luôn đọc version mới nhất** — scan thư mục và chọn file có `v<N>` cao nhất.
- **NEVER overwrite** file đã có. Tạo phiên bản mới `v<N+1>`.
- **Ngoại lệ versioning:** file meta-config (`.claude/config/path-registry.md`) và các file cố định trong `docs/qc-lead/` (`project-config.md`, `project-context-master.md`, `qc-dashboard.md`, `agent-work-log.md`) được edit **in-place** vì có path cố định. Không tạo `v<N+1>`.
- Nếu path của một artifact là `docs/???`, agent phải **dừng lại và hỏi user** trước khi tiếp tục.
- Nếu không tìm thấy `logical-name` trong bảng này, agent phải **dừng lại và hỏi user** trước khi tiếp tục.
