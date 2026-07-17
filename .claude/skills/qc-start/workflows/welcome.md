# qc-start — Welcome workflows

> Title: qc-start welcome workflows | Created: 2026-07-17 | Author: QC Kit | Version: v1
> Đây KHÔNG phải pipeline. Các Playbook dưới là ĐƯỜNG DẪN MẶC ĐỊNH khi user không hỏi gì cụ thể. Luật cao nhất: mục §0.

## §0. Nguyên tắc hội thoại (cao hơn mọi playbook)

1. **Trả lời đúng câu user hỏi TRƯỚC** — menu/kịch bản chỉ là gợi ý điều hướng.
2. User được **nhảy tự do** giữa các lựa chọn, tầng, skill, tính năng — bất kỳ lúc nào; không ép quay lại trình tự, không hỏi lại những gì user đã trả lời.
3. Khi trả lời câu hỏi tự do: tra **§KNOWLEDGE MAP**, MỞ ĐÚNG NGUỒN và trả lời từ nội dung thật — không trả lời từ trí nhớ về kit.
4. Trả lời ngắn trước, hỏi có muốn chi tiết hơn không — không đổ nguyên file lên chat.
5. Mọi tương tác bằng **tiếng Việt** (chat convention của kit).
6. Skill này READ-ONLY: cần chạy skill khác (onboarding, dashboard-sync, uc-read...) thì INVOKE skill đó — không tự làm thay.

## §KNOWLEDGE MAP — câu hỏi loại nào, mở nguồn nào

| User hỏi về | Mở nguồn |
|---|---|
| Skill X làm gì / chạy thế nào / input-output | `.claude/skills/<X>/SKILL.md` (+ workflow của nó nếu hỏi sâu từng bước) |
| Kit có những gì / kiến trúc / bắt đầu từ đâu | `README.md` gốc kit + `huong-dan-su-dung-kit.md` — **nếu dự án không deploy 2 file này**: tự tóm từ frontmatter của 19 `SKILL.md` + `rules/` |
| Đặt tên file / version | `.claude/rules/naming-convention.md` |
| Viết output / luật ngôn ngữ (VI/EN) | `.claude/rules/qc-writting-rules.md` |
| File nào nằm ở đâu / logical name | `.claude/config/path-registry.md` (Artifact Path Table) |
| Phạm vi test / variant / ngôn ngữ dự án | `project-context-master` §3.0 |
| Checkpoint / resume dở | `.claude/config/checkpoint-protocol.md` + `process-logging/` của skill liên quan |
| Trạng thái UC-X | dòng UC-X trong `qc-dashboard.md` → artifact tương ứng trên đĩa |
| Nội dung nghiệp vụ UC-X | UC doc (`requirement-files`) + audited report mới nhất của UC-X |
| Nhánh API (coverage, sổ câu hỏi, baseline) | `qc-api-coverage.md`, `<PORTAL>_api-question-backlog.md`, `.claude/config/api-shared/*` |
| Bug / kết quả chạy của UC-X | `bug-report` + `test-results` + `reports/summary-latest.md` |
| Quy tắc user được sửa gì | `huong-dan-su-dung-kit.md` § quy tắc sống còn — nếu thiếu: trả lời từ Boundaries của skill liên quan (các ô user-edit đều khai ở đó) |

## §Playbook 1 — Làm quen với kit (tour tương tác)

> Nội dung tour SINH TẠI RUNTIME từ file thật (frontmatter + Purpose của từng SKILL.md, README) — không có mô tả skill nào được chép sẵn trong file này.

1. Giới thiệu **3 tầng, mỗi tầng 2–3 câu** về nhiệm vụ chính (đọc README § từng tầng để tóm; README không có trong repo → tóm từ frontmatter các SKILL.md theo tầng): Tầng 1 Context (hiểu dự án — onboarding → context-master → site-map → dashboard-sync), Tầng 2 Test design per-UC 2 nhánh UI/API (uc-read/api-read → scenario → tc-design, + qc-qna), Tầng 3 Automation & execution (auto-generate ×2 → auto-run → execute-report → bug-report/verify). Nhắc thêm skill khởi động `qc-start` (chính nó) và `qc-get-work-log`.
2. Hỏi: **"Bạn muốn tìm hiểu tầng nào trước?"**
3. Với tầng được chọn: bảng các skill của tầng — mỗi skill 1 dòng (tên · vai trò 1 câu lấy từ frontmatter · lệnh gọi).
4. Hỏi: **"Muốn đi sâu skill nào, hay chuyển sang tầng tiếp theo?"**
   - Đi sâu skill: mở SKILL.md của nó, trình bày: mục đích, khi nào dùng, input/output chính, lệnh, các bước lớn (từ routing table/workflow), điểm hay nhầm lẫn (skill kề trong description). Xong hỏi tiếp: skill khác / tầng khác / đủ rồi.
   - Hết tour: nếu state NEW → chốt bằng "bước đầu tiên thực tế là `/qc-project-onboarding`" (Playbook 2A nếu user muốn làm luôn).
5. State RUNNING: mỗi khi giới thiệu skill, lồng **ví dụ thật của dự án** nếu có (vd nêu tên file audited/testcases thật của một UC đã chạy skill đó).

## §Playbook 2A — Việc tiếp theo, state NEW

1. Env check nhanh (báo kết quả dạng checklist): `node --version`, `python3 --version`, `npx playwright --version` (chỉ cần khi dùng tầng automation), quyền ghi vào folder dự án.
2. Tóm 1 đoạn: bước đầu tiên của kit LUÔN là `/qc-project-onboarding` (điền project-config §1–§7 + path nhóm A của registry; sau đó tự chạy tiếp `qc-context-master`).
3. Hỏi user có muốn chạy `/qc-project-onboarding` ngay không → có thì invoke.

## §Playbook 2B — Việc tiếp theo, state RUNNING

0. **State RUNNING-partial (chưa có `qc-dashboard.md`):** BỎ QUA freshness check — việc tiếp theo là hoàn thành chuỗi tầng 1: `/qc-context-master` → `/qc-site-map` → `/qc-dashboard-sync`. Dừng playbook tại đây.

1. **Freshness check (BẮT BUỘC trước khi report):**
   - Lấy mtime của `qc-dashboard.md`.
   - Lấy mtime MỚI NHẤT trong các nguồn mà dashboard quét (danh sách nguồn: ĐÚNG theo bảng `qc-dashboard-sync/references/contracts.md` §1 — không tự thêm bớt).
   - Có artifact mới hơn dashboard → **thông báo đúng 1 dòng** (vd: *"Dashboard cũ hơn N artifact — tôi chạy `/qc-dashboard-sync` trước."*) rồi **tự invoke** `/qc-dashboard-sync`: artifact mới (xét theo UC-ID trong TÊN file) thuộc ĐÚNG 1 UC → bottom-up `/qc-dashboard-sync <UC-ID>`; nhiều UC HOẶC có artifact mới không mang UC-ID (master, common files, run summary...) → top-down. KHÔNG chờ confirm; user chặn thì dừng.
   - Không có gì mới hơn → dùng dashboard hiện tại.
2. **Report việc tiếp theo:** đọc dashboard, tóm tắt tiến độ (X UC in scope; phân bố theo trạng thái) rồi liệt kê **lệnh tiếp theo per UC** theo bảng map:

| Trạng thái dòng UC trên dashboard | Lệnh tiếp theo gợi ý |
|---|---|
| `Review stt` trống | `/qc-uc-read <UC>` |
| Review = Not Ready | Làm việc với BA xử lý gap (sổ câu hỏi) → re-audit `/qc-uc-read <UC>` |
| Review đạt, `Scenario stt` trống | `/qc-func-scenario-design <UC>` |
| Scenario có, `TC stt` trống | `/qc-func-tc-design <UC>` |
| Scope có API: `API stt` chưa có audit | `/qc-api-read <UC>` |
| API audit có, thiếu scen / TC | `/qc-api-scenario-design <UC>` / `/qc-api-tc-design <UC>` |
| TC đủ, `Automation stt` trống (dự án dùng automation) | `/qc-func-auto-generate <UC>` / `/qc-api-auto-generate <UC>` |
| Automation có, `Execute stt` trống/cũ | `/qc-auto-run <UC>` |
| Run có Fail chưa có bug | `/qc-bug-report <UC>` |
| Bug user đã set `Dev đã fix — chờ verify` | `/qc-bug-verify <UC>` |
| Cột nào đang hiển thị nguyên văn `status: ...` (checkpoint) | Skill đó đang chạy dở → resume chính skill đó |

Luật đọc bảng: (a) đi TỪ TRÊN XUỐNG — dòng khớp ĐẦU TIÊN là gợi ý chính, các dòng khớp sau liệt kê thành "việc song song"; (b) `Conditionally Ready` tính là ĐẠT (được đi tiếp, kèm ghi chú gap kế thừa); (c) giá trị parse-fail (`v<N> (chưa đọc được điểm)`) → coi như artifact CÓ, nhắc user kiểm tra file; (d) `TC v<K> (chưa có xlsx)` → TC md đã có, gợi ý chạy tiếp Phase 2 convert của tc-design; (e) `In scope? = No` → bỏ qua khỏi report; `Need confirm` → nhắc user xác nhận scope trước; (f) UC mọi cột đủ + run gần nhất toàn Pass → "hoàn tất — chỉ chạy lại khi có thay đổi"; (g) `Execute stt` coi là CŨ khi TC/spec có version mới hơn lần run.

3. Hỏi user muốn chạy luôn lệnh nào → invoke.

## §Playbook 3 — Transfer dự án (state RUNNING)

> Nguồn tổng hợp CHỈ gồm 2 file: `project-context-master.md` + `qc-dashboard.md`. Nguồn khác chỉ mở khi user hỏi cụ thể (theo §KNOWLEDGE MAP). Trình bày trong CHAT — không ghi file.

0. **State RUNNING-partial (chưa có dashboard):** tổng quan CHỈ từ `project-context-master` (bước 2), bỏ bước 3; kết thúc bằng đề nghị hoàn thành tầng 1 để có bức tranh tiến độ.
1. Chạy trước Freshness check của Playbook 2B bước 1 (dashboard phải mới thì bức tranh tiến độ mới đúng).
2. **Tổng quan dự án** (từ master): dự án là gì + domain (§2), Phạm vi test / Variant / Ngôn ngữ (§3.0), portal & roles (§5), các luồng nghiệp vụ chính (§6), rule chung cần nhớ (§7).
3. **Bức tranh tiến độ** (từ dashboard): tổng số feature/UC in scope, phân bố trạng thái theo cột (đã audit / có TC / đã automation / kết quả run gần nhất), điểm nghẽn nổi bật (Not Ready, fail nhiều).
4. **Confirm:** "Bạn muốn tìm hiểu sâu tính năng nào?" → với tính năng được chọn: bắt đầu từ DÒNG dashboard của nó (trạng thái từng cột) + phần liên quan trong master §6; user hỏi sâu hơn (nội dung UC, TC, bug...) → mở đúng nguồn theo §KNOWLEDGE MAP.
5. Kết thúc: gợi ý bước tiếp ("muốn xem việc cần làm tiếp theo per UC thì tôi chuyển sang report — Playbook 2B").
