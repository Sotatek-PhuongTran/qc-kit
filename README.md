# QC Kit v4

> Title: QC Kit v4 README | Created: 2026-07-02 | Updated: 2026-07-17 (v4: nhánh API redesign "req-first thuần" — `qc-api-read` không đọc API doc, binding dồn về `qc-api-tc-design`; bản đồ coverage `qc-api-coverage.md`; sổ câu hỏi API per portal; `api-baseline`; §3.0 của project-context-master; naming test case mới; priority 4 mức) | Author: Joy | Version: v4

Bộ skill QC cho quy trình kiểm thử agentic. Kiến trúc 3 tầng, **19 skill** (18 skill quy trình từ v3 + skill khởi động `qc-start`); tầng 2 và 3 chia 2 nhánh (UI / API) theo **Phạm vi test** khai ở onboarding: `Black-box only` / `API only` / `Black-box + API` (chỉ được mở rộng MỘT CHIỀU sang Both). Cấu hình runtime NHẬP một nơi — `project-config` §6 (+ Project language ở §1) — rồi được `qc-context-master` kế thừa nguyên văn vào `project-context-master` **§3.0**: mọi skill tầng 2/3 đọc Phạm vi test / Variant / Ngôn ngữ dự án từ §3.0, không đọc lại §6. Mọi SKILL.md giờ là ROUTER gọn — thuật toán chi tiết nằm trong `workflows/` của từng skill. Tầng automation vẫn là **module độc lập, dùng hay không tùy dự án**.

**Bắt đầu nhanh:** gõ **"Hi qc-kit"** (hoặc `/qc-start`) — skill `qc-start` sẽ chào theo trạng thái dự án và hỏi bạn cần gì: làm quen kit (tour tương tác), việc cần làm tiếp theo (tự sync dashboard nếu cũ rồi report), hay transfer dự án (tổng quan từ project-context-master + dashboard). Skill này thuần đọc — không ghi file nào.

## Tầng 1 — Context (khung hiểu dự án)

Chuỗi top-down: `qc-project-onboarding` → `qc-context-master` → `qc-site-map` → `qc-dashboard-sync`.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-project-onboarding` | Khởi tạo cấu hình; §6 Phạm vi test + variant (UI: 5 giá trị chuẩn; API: `rest`) + §7 Auth API; chỉ hỏi path nhóm A của path-registry | `project-config.md`, `path-registry.md` |
| `qc-context-master` | Tổng hợp tri thức dự án; kế thừa §6 + Project language vào **§3.0** — nguồn đọc chuẩn của mọi skill tầng 2/3 | `project-context-master.md` |
| `qc-site-map` | Sơ đồ màn hình + sơ đồ dữ liệu | `qc-site-map.md`, `qc-data-map.md` |
| `qc-dashboard-sync` | SOLE writer của bảng trạng thái; cột `API stt` (tự inject khi có nhánh API) hiển thị `<verdict> v<N> · <score>/100 · scen v<M> · TC v<K>` | `qc-dashboard.md` |

## Tầng 2 — Test design (per UC, 2 nhánh)

**Nhánh UI** (per-UC): `qc-uc-read` (+`qc-qna`) → `qc-func-scenario-design` → `qc-func-tc-design`.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-uc-read` | Review độ sẵn sàng UC — rubric 5 vùng chấm điểm; tự đối chiếu + cập nhật file mô tả format đầu vào `references/input-files-format.md` (user chỉ sửa dòng cờ `Cần check lại` khi BA đổi format) | `*_audited_*_v<N>.md` |
| `qc-qna` | SOLE writer của 2 loại sổ câu hỏi: sổ per-UC (nhánh UI) + sổ per-PORTAL nhánh API (2 tầng: mục A chung / mục B theo UC, dedup nội dung) | `*_question-backlog.md`, `<PORTAL>_api-question-backlog.md` |
| `qc-func-scenario-design` | Scenario UI; có UPDATE MODE — TS ID ổn định + Change log Added/Modified/Removed | `*_scenarios_*_v<N>.md` |
| `qc-func-tc-design` | Test case UI — bản md là BẢN CHÍNH THỨC (không còn "draft"), md + xlsx CÙNG BASE NAME, cả 2 versioned + immutable, update ghi v[N+1] cho cả 2; priority 4 mức Critical/High/Medium/Low (nhà chính: `rules/testcase-instruction-rules.md` C6); RTM có cột `TS liên quan` (traceability TS→TC) | `<UC>_<feature>_testcases_<variant>_<YYYYMMDD>_v<N>.md` + `.xlsx` |

**Nhánh API** (per-UC, req-first THUẦN — đi từ requirement, không chờ hệ thống, không chờ API doc): `qc-api-read` → `qc-api-scenario-design` → `qc-api-tc-design`.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-api-read` | Audit THUẦN NGHIỆP VỤ, kế thừa audited UC đạt ngưỡng — **KHÔNG đọc API doc ở bất kỳ mode nào**: danh mục operation (khoá `resource · action`, vai trò Owner/Reuse), validation matrix per param, luồng + phân quyền, AC hướng API, điểm /100; cuối MỖI run rebuild bản đồ sở hữu operation toàn dự án | `*_api-audited_*_v<N>.md`, `qc-api-coverage.md` |
| `qc-api-scenario-design` | Scenario API mức ý định (`TS_API_*`) — 9 vùng phủ (thêm vùng 9 an toàn & chống lạm dụng); vùng endpoint-level chỉ thiết kế cho OP có vai trò `Owner`; có update mode như nhánh UI | `*_api-scenarios_*_v<N>.md` |
| `qc-api-tc-design` | Test case API mức request thật (`TC_API_*`, `TC_MIX_*` khi Both) — nơi DUY NHẤT của kit đối chiếu API doc: binding operation ↔ endpoint ở Step 1.4 (đọc digest qua `parse-api-doc.mjs`, agent không đọc raw doc); lệch → finding `UNDOCUMENTED_OPERATION` / `DOC_REQ_MISMATCH` / `ORPHAN_ENDPOINT` qua `qc-qna`; expected viết mức hành vi — status/message chính xác để `api-baseline` ghi khi chạy | `<UC>_<feature>_api-testcases_<variant>_<YYYYMMDD>_v<N>.md` + `.xlsx` |

Dự án manual-only dừng ở tầng này là đủ (TC API test tay được bằng Postman/curl vì đã chi tiết mức request).

## Tầng 3 — Automation (module độc lập, opt-in)

Vòng khép kín: sinh script (per nhánh) → chạy chung → ghi kết quả → phân tích bug → verify bug.

| Skill | Vai trò | Output |
|---|---|---|
| `qc-func-auto-generate` (tên cũ: `qc-auto-generate`) | Sinh project Playwright nhánh UI — page object CHỈ sinh từ live crawl (chưa có kênh DOM → hướng dẫn cài + chờ, không sinh tạm); sổ `crawl-findings/` hỏi-đáp phần tử lệch | `runner/tests/<portal>/`, page objects, flows |
| `qc-api-auto-generate` | Sinh spec API (`APIRequestContext`): service per resource, token manager theo role, schema assert (ajv), MIX spec; scaffold `.env.example`; probe tùy chọn; sổ `api-findings/`; helper `expect-api.ts` ghi `api-baseline` (status/message thực tế lần chạy đầu per TC — QC/BE chỉ sửa field `confirmed`) | `runner/tests/{api,mix}/`, `services/`, `helpers/api/` |
| `qc-auto-run` | Phase 0 scope check (phạm vi → TC → script → lịch sử, có điểm dừng confirm); chạy chung 2 nhánh 1 lệnh; pre-flight precondition; summary nhóm UI/API/MIX (kèm mục baseline mới ghi); **sạch gate → tự gọi execute-test-report** | `reports/summary-latest.md` |
| `qc-execute-test-report` | CHỈ ghi kết quả chính thức per TC vào file sống; cột `Cách chạy` map từ triage (`Đã có script`/`Trùng` → `Tự động`; còn lại → `Thủ công`); gate cứng: crawl-findings (mọi dòng của page thuộc UC) + api-findings (dòng có `TC bị ảnh hưởng` giao với UC — ghi dạng `UC-101/TC_API_001`); có Fail → tự gọi `qc-bug-report` | `*_test-results.md` |
| `qc-bug-report` | Phân loại TC fail theo taxonomy 7 root cause bằng ĐỐI CHỨNG UI↔API; 3 nhóm đầu thành bug (cột Root cause), nhóm sau thành `Chưa chốt` + follow-up (gồm cả lệch với baseline chưa `confirmed`); stamp mã bug vào ô kết quả. TC thủ công: QC tự viết bug vào mục riêng | `bugs/*_bug-report.md` |
| `qc-bug-verify` | Plan re-test + regression scope theo Root cause (LUÔN chờ duyệt) → gọi `qc-auto-run` → `Đã đóng — verified` / `Mở lại` | cập nhật bug-report + cột run mới |

Layout `docs/qc/automation/`: cấp 1 chỉ gồm folder cho user (`data/`, `crawl-findings/`, `api-findings/`, `api-baselines/`, `triage/`, `reports/`, `bugs/`); toàn bộ code + node_modules + kết quả thô nằm trong `runner/` — user không cần mở.

## Contracts dùng chung nhánh API — `.claude/config/api-shared/`

Cấp KIT (không chứa dữ liệu dự án): `api-findings-contract` (sổ hỏi-đáp + gate theo giao-UC), `auth-strategy` (login API / token `.env`; nhà chính bộ permission case tối thiểu), `expected-and-verify-policy` (thang 4 nguồn expected — bậc 4 là `api-baseline`; QUESTION GATE + DEDUP GATE; GET-after-write), `coverage-rules` (2 tầng test per operation, ownership `resource · action`, thuật toán rebuild coverage map), `root-cause-taxonomy` (7 nhóm + ma trận đối chứng + map regression), `api-testdata-contract`, và script `scripts/parse-api-doc.mjs` (Swagger/OpenAPI/Postman → bảng endpoint rút gọn + JSON Schema — **agent không bao giờ đọc raw API doc**; chỉ `qc-api-tc-design` + `qc-api-auto-generate` dùng).

## Quy ước chung

- Đường dẫn: tra `logical-name` trong `.claude/config/path-registry.md` — không hard-code. Dòng chia 2 nhóm: **A — input dự án** (BA tạo, khai ở onboarding) / **B — sản phẩm kit** (path cố định; chưa chạy skill thì GIỮ mặc định, không xóa trống). Nâng version chỉ cần chép nhóm A.
- Checkpoint/resume: MỘT protocol chung tại `.claude/config/checkpoint-protocol.md`; mỗi skill chỉ khai delta.
- Chuẩn viết skill: `.claude/config/skill-authoring-standard.md`. Quy tắc viết output: `.claude/rules/qc-writting-rules.md` — gồm **luật ngôn ngữ 2 nhóm**: tài liệu review nội bộ (audited, api-audited, sổ câu hỏi, triage, summary, plan) LUÔN tiếng Việt; deliverable release (scenarios, test cases, spec, bug report, execution report) theo ngôn ngữ dự án (VI/EN, đọc từ §3.0).
- Đặt tên file + mã TC/TS: `.claude/rules/naming-convention.md` (`TC_NNN` / `TC_API_NNN` / `TC_MIX_NNN` — phạm vi file per-UC; test case md + xlsx cùng base name, có segment `<variant>`).
- Worklog: `docs/qc-lead/agent-work-log.local/README.md` (thiếu folder/README → skill tự bootstrap từ template trong kit); gom bằng `qc-get-work-log`.
