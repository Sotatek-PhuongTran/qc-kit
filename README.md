# QC Kit v3

> Title: QC Kit v3 README | Created: 2026-07-02 | Updated: 2026-07-07 (tầng automation: +`qc-execute-test-report`, +`qc-bug-verify`, layout `runner/`) | Author: Joy | Version: v2

Bộ skill QC cho quy trình kiểm thử agentic — bản tái cấu trúc v3. Kiến trúc 3 tầng, trong đó tầng automation là **module độc lập, dùng hay không tùy dự án**.

## Kiến trúc 3 tầng (13 skill)

### Tầng 1 — Context (khung hiểu dự án)

Chuỗi top-down, chạy theo thứ tự: `qc-project-onboarding` → `qc-context-master` → `qc-site-map` → `qc-dashboard-sync`.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-project-onboarding` | Khởi tạo cấu hình khi áp kit vào dự án mới | `project-config.md`, `path-registry.md` |
| `qc-context-master` | Tổng hợp tri thức dự án mức cao | `project-context-master.md` |
| `qc-site-map` | Sơ đồ màn hình + sơ đồ dữ liệu | `qc-site-map.md`, `qc-data-map.md` |
| `qc-dashboard-sync` | SOLE writer của bảng trạng thái | `qc-dashboard.md` |

### Tầng 2 — Test design (thiết kế test thủ công)

Per-UC: `qc-uc-read` (+`qc-qna`) → `qc-func-scenario-design` → `qc-func-tc-design`.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-uc-read` | Review độ sẵn sàng UC, chấm điểm, báo cáo gap | `*_audited_*_v<N>.md` |
| `qc-qna` | Chuyển câu hỏi mở cho BA | `*_question-backlog_*.md` |
| `qc-func-scenario-design` | Thiết kế test scenario (mức ý định) | `*_scenarios_*_v<N>.md` |
| `qc-func-tc-design` | Thiết kế test case atomic (md + xlsx) | `*_testcases_*_v<N>.{md,xlsx}` |

Dự án manual-only dừng ở tầng này là đủ.

### Tầng 3 — Automation (module độc lập, opt-in)

Không đọc context/site-map. Input chỉ gồm: audited report + test case md + `project-config` (URL môi trường non-prod, tài khoản test). Vòng khép kín 4 bước: sinh code → chạy → chốt kết quả + report bug → verify bug.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-auto-generate` | Sinh project Playwright + TS (POM, lớp common dùng chung, locator từ live crawl, incremental); phần tử lệch/không tìm thấy khi crawl ghi vào sổ câu hỏi `crawl-findings/` chờ QC/dev trả lời inline | `runner/` (specs, page objects, flows) + `data/`, `triage/`, `crawl-findings/` |
| `qc-auto-run` | Chạy test (pre-flight precondition, xác nhận môi trường — từ chối production), tổng hợp kết quả theo TC-ID | `reports/summary-latest.md` |
| `qc-execute-test-report` | Chốt kết quả chính thức theo từng TC (gồm cả TC thủ công) + report bug ĐÃ kiểm chứng. Gate cứng: mọi dòng `crawl-findings` của các page thuộc UC phải `Đã giải quyết` VÀ đã chạy lại sau đó; TC trượt được phân loại (bug thật / lỗi script / lỗi môi trường / chờ cập nhật UC-TC) trước khi ghi bug | `docs/qc/testcases/<UC-ID>/*_test-results.md` (file sống, mỗi run 1 cột) + `bugs/*_bug-report.md` (file sống, user chỉ update cột "Trạng thái") |
| `qc-bug-verify` | Đọc trạng thái bug user cập nhật → lập plan re-test + regression (LUÔN chờ user duyệt) → gọi `qc-auto-run` → kết luận `Đã đóng — verified` / `Mở lại` | cập nhật `bug-report` + cột run mới trong `test-results` |

Layout `docs/qc/automation/`: cấp 1 chỉ gồm folder cho user (`data/`, `crawl-findings/`, `triage/`, `reports/`, `bugs/`); toàn bộ code + node_modules + kết quả thô nằm trong `runner/` — user không cần mở. Dashboard tự inject 2 cột `Automation stt` / `Execute stt` khi folder automation tồn tại — dự án manual-only không thấy gì thừa.

### Tiện ích

`qc-get-work-log` — gom worklog JSONL các máy vào `agent-work-log.md`.

## Quy ước chung

- Đường dẫn: tra `logical-name` trong `.claude/config/path-registry.md` — không hard-code.
- Checkpoint/resume: MỘT protocol chung tại `.claude/config/checkpoint-protocol.md`; mỗi skill chỉ khai báo delta trong `workflows/checkpoint-protocol.md` của nó.
- Chuẩn viết skill: `.claude/config/skill-authoring-standard.md`.
- Quy tắc viết output QC: `.claude/rules/qc-writting-rules.md`; đặt tên file: `.claude/rules/naming-convention.md`.
- Worklog: `docs/qc-lead/agent-work-log.local/README.md`.
