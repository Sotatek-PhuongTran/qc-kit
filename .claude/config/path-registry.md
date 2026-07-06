# Path Registry

> **Mục đích:** File này lưu các đường dẫn file mà các skills cần tìm để đọc files nhằm giảm thiểu việc phải ghi trong các skills và khó khăn khi cần update lại path.
>
> **Cách dùng:** Khi một skill cần đọc hoặc ghi file, nó tra cứu `logical-name` tương ứng trong bảng dưới để lấy đường dẫn thực tế.
>
> **Cách apply vào dự án mới:** Điền giá trị vào cột `Path` cho từng artifact. Giữ nguyên `docs/` làm gốc.
> Các ô còn để `docs/???` là chưa được cấu hình — agent sẽ hỏi user trước khi tiếp tục.

---

## Artifact Path Table

| Nguồn  | Logical Name                 | Path                                   | File Pattern                                               | Mô tả                                                                                                                         |
| ------- | ---------------------------- | -------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Agent   | `agent-work-log`           | `docs/qc-lead/`                      | `agent-work-log.md`                                      | Aggregated view of skill runs across all devices — owned by `qc-get-work-log`                                                |
| Agent   | `worklog-per-device`       | `docs/qc-lead/agent-work-log.local/` | `worklog_*.jsonl`                                        | Per-device JSONL source files (one per machine). Written by every skill at each phase boundary; consumed by `qc-get-work-log` |
| BA      | `High-level-files`         | `docs/00-intake/`, `docs/01-solution-options/`, `docs/02-backbone/` | `*.md`, `*.docx`, `*.pdf`, `*.xlsx`, `*.png` | Các file high-level cho QC Lead thiết kế plan (intake brief, solution options, backbone/system architecture...)          |
| BA      | `requirement-common-files` | `docs/03-modules/` (file `common-rules.md`), `docs/03-modules/<MOD-ID>/` (file `frd.md` của từng portal) | `common-rules.md`, `frd.md` | Các file yêu cầu dùng chung: business/common rules toàn dự án và FRD theo từng portal/module                            |
| BA      | `requirement-files`        | `docs/03-modules/<MOD-ID>/`          | `UC-<ABC>-XXX.md`                                  | Tài liệu yêu cầu gốc theo từng UC, tổ chức theo folder portal/module (MOD-ID)                                            |
| QC lead | `project-config`           | `docs/qc-lead/`                      | `project-config.md`                                      | Cấu hình dự án — project overview, links, environments, accounts, third-party APIs (per-project, edit in-place)            |
| QC lead | `project-context-master`   | `docs/qc-lead/`                      | `project-context-master.md`                              | File tổng hợp tri thức dự án — output của `qc-context-master`                                                          |
| QC lead | `qc-site-map`              | `docs/qc-lead/`                      | `qc-site-map.md`                                         | File tổng hợp cấu trúc hệ thống/luồng dữ liệu — output của `qc-site-map`                                           |
| QC lead | `qc-dashboard`             | `docs/qc-lead/`                      | `qc-dashboard.md`                                        | Dashboard markdown — feature/UC list + trạng thái spec/wireframe/test scenarios/test cases (+ automation nếu có)          |
| QC      | `uc-review-report`         | `docs/qc/uc-read/<UC-ID>/`           | `<UC-ID>_<feature>_audited_<YYYYMMDD>_v<N>.md`           | Báo cáo kiểm tra độ sẵn sàng UC — output của `qc-uc-read`. §4 của báo cáo là bảng kiểm kê phần tử UI dùng cho cả thiết kế test case lẫn automation |
| QC      | `question-backlog`         | `docs/qc/uc-read/<UC-ID>/`           | `<UC-ID>_<feature>_question-backlog.md`  | Question backlog — file SỐNG, duy nhất 1 file/UC, KHÔNG ngày, KHÔNG version, edit in-place. SOLE writer: `qc-qna`                                                                                 |
| QC      | `func-test-scenarios`      | `docs/qc/scenarios/<UC-ID>/`         | `<UC-ID>_<feature>_scenarios_<YYYYMMDD>_v<N>.md`         | Test scenarios — output của `qc-func-scenario-design`                                                                       |
| QC      | `func-test-cases-draft`    | `docs/qc/testcases/<UC-ID>/`         | `<UC-ID>_<feature>_testcases_draft.md`                   | Bản test cases định dạng md — nguồn máy-đọc-được cho `qc-auto-generate`                                             |
| QC      | `func-test-cases`          | `docs/qc/testcases/<UC-ID>/`         | `<UC-ID>_<feature>_testcases_<YYYYMMDD>_v<N>.xlsx`       | Test cases — output của `qc-func-tc-design`                                                                                 |
| QC      | `func-test-cases-summary`  | `docs/qc/testcases/<UC-ID>/`         | `<UC-ID>_<feature>_testcases_summary_<YYYYMMDD>_v<N>.md` | Tóm tắt sau khi thiết kế test cases                                                                                         |
| QC      | `automation-root`          | `docs/qc/automation/`                | —                                                        | Gốc project automation (Playwright + TS). Sự tồn tại của folder này là tín hiệu để dashboard inject cột automation |
| QC      | `automation-specs`         | `docs/qc/automation/tests/<portal>/<UC-ID>/` | `<screen>.spec.ts`                               | Playwright spec theo màn hình — output của `qc-auto-generate`, mỗi test gắn TC-ID                                        |
| QC      | `page-objects`             | `docs/qc/automation/portals/<portal>/pages/` | `<page>.page.ts`                                  | Page object theo page (locator từ live crawl, stamp audited version + ngày crawl) — lớp common của portal, sinh **incremental**. Owner `qc-auto-generate` |
| QC      | `flows`                    | `docs/qc/automation/portals/<portal>/flows/` | `<area>.flows.ts`                                 | Flow helper cho chuỗi bước lặp lại (đăng nhập, tạo bản ghi...) + setup flow seed precondition qua UI portal khác — lớp common của portal. Owner `qc-auto-generate` |
| QC      | `notification-channels`    | `docs/qc/automation/portals/<portal>/` | `notification-channels.ts` | Bảng kênh thông báo per portal (lỗi tại chỗ / chú thích cảnh báo / thông báo nổi / hộp thoại) cho detector expected — học 1 lần khi crawl, QC sửa tay được; file code edit in-place. Owner `qc-auto-generate` |
| QC      | `test-data`                | `docs/qc/automation/data/` | `<UC-ID>_testdata.md` | Nguồn data test (human-edit): accounts theo vai trò, biến theo TC, bảng Preconditions, config. File SỐNG — 1 file/UC, KHÔNG ngày, KHÔNG version, edit in-place (giá trị QC đã điền không bị ghi đè). KHÔNG chứa mật khẩu |
| QC      | `test-data-json`           | `docs/qc/automation/data/` | `<UC-ID>_testdata.json` | Fixture JSON đã validate — **build output** từ `test-data` md (qua `scripts/build-test-data.mjs`), đã gitignore; `qc-auto-run` tự build lại trước mỗi lần chạy; KHÔNG sửa tay |
| QC      | `automation-triage`        | `docs/qc/automation/triage/` | `<UC-ID>_<feature>_automation-triage_<YYYYMMDD>_v<N>.md` | Bảng triage tự động hoá theo từng TC — verdict, lý do tự chứa, TC đã cover kèm điểm cover, điều kiện gỡ khoá. Output BẮT BUỘC của mỗi lần chạy `qc-auto-generate` |
| QC      | `crawl-findings`           | `docs/qc/automation/crawl-findings/` | `<portal>_<page>_crawl-findings.md` | Phần tử không tìm thấy khi crawl — file SỐNG (KHÔNG ngày, KHÔNG version, edit in-place như `question-backlog`): mô tả trạng thái đã lái, QC/dev trả lời inline, lần chạy sau đọc để crawl lại đúng chỗ. SOLE writer cột hỏi: `qc-auto-generate`; cột "Trả lời" do QC/dev điền |
| QC      | `automation-run-summary`   | `docs/qc/automation/reports/` | `summary-latest.md` | Tổng hợp kết quả chạy gần nhất theo UC/TC-ID — output của `qc-auto-run`, nguồn cột `Execute stt` của dashboard. Lịch sử tại `reports/history/` |

---

## Skill → Artifact Mapping

Bảng này cho thấy skill nào đọc/ghi artifact nào. Dùng để kiểm tra nhanh khi cần trace nguồn dữ liệu.

| Skill                       | Đọc                                                                                                                                                                | Ghi                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `qc-project-onboarding`   | `High-level-files` (chỉ check pre-flight), `project-config`                                                                                                     | `project-config` (+ edit `.claude/config/path-registry.md` in-place)                                                                                           |
| `qc-context-master`       | `High-level-files`, `requirement-common-files`, `project-config`, `project-context-master`                                                                     | `project-context-master`. KHÔNG ghi handoff cho `qc-dashboard-sync`. Init → auto-invoke `qc-site-map`. Update có change → đề xuất chạy `qc-site-map` |
| `qc-site-map`             | `project-context-master` (HARD REQ), `High-level-files`, wireframe folder, role matrix, SRS/spec, `.claude/skills/qc-site-map/inbox/dashboard-orphans.md` (Mode 3) | `qc-site-map`, handoff `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md`. Mode 3 DELETES `dashboard-orphans.md` sau reconcile. Init/Mode 3 → auto-invoke `qc-dashboard-sync` |
| `qc-dashboard-sync`       | Top-down: `project-context-master`, `site-map-handoff.md`, `qc-dashboard`, `requirement-files`, `uc-review-report`, `func-test-scenarios`, `func-test-cases-draft`, `func-test-cases`, `automation-specs` + `automation-run-summary` (nếu có), `requirement-common-files` (exclusion). Bottom-up: same, no handoff | `qc-dashboard` (SOLE writer mọi cột). Ghi `.claude/skills/qc-site-map/inbox/dashboard-orphans.md` (append + dedupe) |
| `qc-uc-read`              | `requirement-common-files`, `requirement-files`, `question-backlog`, `project-context-master`, `qc-site-map` (optional)                                        | `uc-review-report`, `question-backlog` (qua `qc-qna`)                                                                                                          |
| `qc-qna`                  | `question-backlog`                                                                                                                                                | `question-backlog`                                                                                                                                                |
| `qc-func-scenario-design` | `uc-review-report`, `project-context-master`, `qc-site-map` (optional), `requirement-common-files`                                                              | `func-test-scenarios`                                                                                                                                             |
| `qc-func-tc-design`       | `uc-review-report` (§4 = từ vựng phần tử UI), `func-test-scenarios` (optional), `requirement-common-files`, `func-test-cases` (update mode)                    | `func-test-cases-draft`, `func-test-cases`, `func-test-cases-summary`                                                                                            |
| `qc-auto-generate`        | `uc-review-report` (§4/§6), `func-test-cases-draft`, `project-config` (§3 URL non-prod, §4 accounts, §2 API docs nếu có), `crawl-findings` (câu trả lời inline), live crawl hệ thống chạy thật | `automation-specs`, `page-objects`, `flows`, `test-data`, `automation-triage`, `crawl-findings`; scaffold project (config, helpers, scripts). `test-data-json` là build output. KHÔNG ghi mật khẩu |
| `qc-auto-run`             | `automation-specs`, `test-data` (+ build json), `project-config` (§3, §4)                                                                                        | `automation-run-summary` (+ `reports/history/`), `test-results/` (Playwright output). KHÔNG sửa spec/page object/data                                          |
| `qc-get-work-log`         | `worklog-per-device` (all `worklog_*.jsonl`), `agent-work-log` (existing master, for dedup)                                                                      | `agent-work-log` (rewrite per-device tables; Legacy section never touched)                                                                                        |

---

## Quy tắc

- **NEVER hard-code** một đường dẫn cụ thể trong SKILL.md. Luôn tham chiếu `logical-name` từ file này.
- **Luôn đọc version mới nhất** — scan thư mục và chọn file có `v<N>` cao nhất.
- **NEVER overwrite** file đã có. Tạo phiên bản mới `v<N+1>`.
- **Ngoại lệ versioning:**
  - `question-backlog` — 1 file cố định/UC (`<UC-ID>_<feature>_question-backlog.md`), edit **in-place** bởi `qc-qna`; KHÔNG ngày, KHÔNG version, lịch sử nằm trong khối `Update history` của file;
  - `crawl-findings` — 1 file cố định/page (`<portal>_<page>_crawl-findings.md`), edit **in-place**; KHÔNG ngày, KHÔNG version; cột hỏi do `qc-auto-generate` ghi, cột "Trả lời của QC/dev" do người dùng điền;
  - `test-data` — 1 file cố định/UC (`<UC-ID>_testdata.md`), edit **in-place**; KHÔNG ngày, KHÔNG version; giá trị QC đã điền không bao giờ bị ghi đè; lịch sử = git;
  - file meta-config (`.claude/config/path-registry.md`) và các file cố định trong `docs/qc-lead/` (`project-config.md`, `project-context-master.md`, `qc-dashboard.md`, `agent-work-log.md`, `agent-work-log.local/worklog_*.jsonl`) được edit **in-place**;
  - file code trong project automation (`*.ts`, `*.json` build output, `playwright.config.ts`, `package.json`) là file code git-tracked, edit in-place kèm stamp nguồn;
  - `reports/summary-latest.md` overwrite in-place, lịch sử chép vào `reports/history/` trước khi ghi đè.
- Nếu path của một artifact là `docs/???`, agent phải **dừng lại và hỏi user** trước khi tiếp tục.
- Nếu không tìm thấy `logical-name` trong bảng này, agent phải **dừng lại và hỏi user** trước khi tiếp tục.
