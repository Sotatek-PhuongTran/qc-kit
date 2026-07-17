# Hướng dẫn nâng version QC Kit

Nâng version = thay folder `.claude` của dự án bằng bản mới từ QC-kit. Toàn bộ tài liệu trong `docs/` giữ nguyên — context đã chạy trước đó (`docs/qc-lead/`) vẫn dùng tiếp, không cần tổng hợp lại.

Bảng đường dẫn vẫn chia 2 nhóm như trước: nhóm **A** (tài liệu đầu vào do BA/dự án tạo: high-level, requirement, API doc...) chép lại từ bản cũ; nhóm **B** (sản phẩm của kit — path cố định) lấy nguyên theo kit mới.

Các bước:

1. Copy cả dự án ra ngoài để back-up (hoặc commit git một mốc sạch).
2. **Move (không phải copy) file `.claude/config/path-registry.md` hiện tại ra NGOÀI folder `.claude`** — đặt tạm ở gốc dự án, đổi tên thành `path-registry-cu.md`.
3. Xóa folder `.claude` cũ, copy folder `.claude` từ QC-kit mới vào. Skill nào đang chạy dở thì hoàn tất trước khi nâng — checkpoint không mang sang được.
4. Nhờ Agent gộp bảng đường dẫn — mở chat và gửi prompt như sau:

   > Đọc file `path-registry-cu.md` ở gốc dự án và file `.claude/config/path-registry.md` (bản mới của kit). Chép giá trị Path của các dòng NHÓM A (Nguồn = BA) từ file cũ vào đúng dòng logical name tương ứng trong file mới; toàn bộ dòng nhóm B giữ nguyên theo bản mới. Xong liệt kê: (1) các dòng nhóm A đã chép, (2) các dòng nhóm A MỚI tôi cần khai path (vd `api-doc-files`). Cuối cùng xóa file `path-registry-cu.md`.

5. Chạy `/qc-project-onboarding` (chế độ update): skill tự rà `project-config.md` và hỏi bổ sung các mục v4 — mục 6 giờ chọn thêm Kênh verify database (L4) + bảng Variant kiểm thử UI/API, mục 1 có field Project language, mục 7 Auth API khi có nhánh API.
6. Chạy `/qc-context-master` (update) để sinh mục **§3.0** trong `project-context-master.md` — BẮT BUỘC: mọi skill tầng 2/3 của v4 đọc Phạm vi test / Variant / Ngôn ngữ dự án từ §3.0; thiếu §3.0 là skill dừng lại hỏi.
7. File test case cũ đặt theo naming cũ (chưa có `<variant>` trong tên, bản md còn chữ "draft"): KHÔNG cần đổi tay — lần `/qc-func-tc-design <UC>` / `/qc-api-tc-design <UC>` update kế tiếp tự ghi `v[N+1]` theo naming mới (md + xlsx cùng base name). Muốn gọn ngay thì tự đổi tên CẢ 2 file theo mẫu `<UC>_<feature>_testcases_<variant>_<YYYYMMDD>_v<N>.(md|xlsx)`.
8. Thang priority: file TC cũ dùng P1–P5 → lần update đầu tiên tự chuyển sang 4 mức (P1→Critical, P2→High, P3→Medium, P4 và P5→Low), không đổi ID, có ghi chú migration trong report — bạn không phải làm gì.

# Hướng dẫn sử dụng QC Kit v4 — cho người mới

> Tài liệu: Hướng dẫn sử dụng QC Kit v4 | Ngày tạo: 2026-07-03 | Cập nhật: 2026-07-17 | Tác giả: Joy | Phiên bản: v6

Bộ kit gồm **19 skill** (18 skill quy trình + skill khởi động `qc-start`) giúp QC làm việc theo quy trình: hiểu dự án → thiết kế test → (tùy chọn) chạy tự động và quản lý bug. Bạn chỉ cần gõ lệnh `/tên-skill`, skill sẽ tự hỏi thêm khi thiếu thông tin.

> 🚀 **Cách bắt đầu nhanh nhất:** gõ **"Hi qc-kit"** (hoặc `/qc-start`). Skill `qc-start` chào theo trạng thái dự án và hỏi bạn cần gì: (1) làm quen với kit — tour 3 tầng, đi sâu từng skill; (2) việc cần làm tiếp theo — tự chạy `/qc-dashboard-sync` nếu dashboard cũ rồi gợi ý lệnh per UC; (3) transfer dự án — tổng quan từ project-context-master + dashboard cho người mới. Có thể hỏi tự do bất kỳ điều gì về kit/dự án, không cần theo kịch bản.

## Thay đổi so với kit v3 — 9 nhóm

1. **Nhánh API "req-first thuần"** (kiến trúc 3 tầng GIỮ NGUYÊN; thêm skill khởi động `qc-start` → 19 skill): `qc-api-read` KHÔNG đọc API doc nữa — audit thuần nghiệp vụ, kế thừa audited UC đạt ngưỡng; binding + đối chiếu doc dồn DUY NHẤT về `qc-api-tc-design` (Step 1.4); artifact mới `qc-api-coverage.md` — bản đồ sở hữu operation toàn dự án, `qc-api-read` rebuild mỗi lần chạy; sổ câu hỏi API tách riêng theo PORTAL (`<PORTAL>_api-question-backlog.md`, 2 tầng A/B, dedup nội dung — sổ per-UC chỉ còn nhánh UI); `api-baseline` ghi status/message thực tế ở lần chạy đầu per TC (QC/BE confirm) thay cho việc pin cứng expected ở tầng thiết kế.
2. **Nguồn cấu hình runtime**: nhập ở `project-config` §6 (+ §1 Project language) tại onboarding; `qc-context-master` kế thừa nguyên văn vào `project-context-master` **§3.0** — mọi skill tầng 2/3 đọc Phạm vi test / Variant / Ngôn ngữ từ §3.0, không hỏi lại bạn.
3. **Naming test case mới**: bản md là BẢN CHÍNH THỨC (không còn "draft"), md + xlsx CÙNG BASE NAME `<UC>_<feature>_[api-]testcases_<variant>_<YYYYMMDD>_v<N>.(md|xlsx)`, cả 2 versioned + immutable, update ghi v[N+1] cho cả 2.
4. **Priority 4 mức**: Critical / High / Medium / Low (nhà chính: `testcase-instruction-rules.md` C6); file cũ P1–P5 tự migration khi update.
5. **Luật ngôn ngữ 2 nhóm** (`qc-writting-rules.md`): tài liệu review nội bộ (audited, api-audited, sổ câu hỏi, triage, summary, plan) LUÔN tiếng Việt; deliverable release (scenarios, test cases, spec, bug report, execution report) theo ngôn ngữ dự án (VI/EN, đọc từ §3.0).
6. **Scenario 2 nhánh có UPDATE MODE**: TS ID ổn định, Change log Added/Modified/Removed; RTM trong file TC có cột `TS liên quan` (truy vết TS→TC).
7. **`qc-uc-read`**: file `input-files-format.md` per-project mô tả format tài liệu đầu vào — skill tự đối chiếu + cập nhật, bạn CHỈ sửa dòng cờ thành `Cần check lại` khi BA đổi format; rubric chấm điểm 5 vùng.
8. **Tầng automation**: page object CHỈ sinh từ live crawl (chưa có kênh DOM → skill hướng dẫn cài + chờ, không sinh tạm); API variant hỗ trợ `rest` (variant khác → kit báo cần bổ sung technical reference); scaffold `.env.example`; tự bootstrap worklog (README từ template trong kit); triage → cột `Cách chạy` (`Đã có script`/`Trùng` → `Tự động`, còn lại → `Thủ công`); gate api-findings tính theo giao-UC (`UC-101/TC_API_001`).
9. **Vận hành**: mọi SKILL.md giờ là router gọn (thuật toán ở `workflows/`); cột `API stt` của dashboard hiển thị `<verdict> v<N> · <score>/100 · scen v<M> · TC v<K>`.

---

## 1. Bức tranh tổng thể — 3 tầng, 2 nhánh

```
TẦNG 1 — CONTEXT (chạy 1 lần khi vào dự án, chạy lại khi tài liệu chung thay đổi)
/qc-project-onboarding → /qc-context-master → /qc-site-map → /qc-dashboard-sync
   (cấu hình §6 + §7)      (tri thức + §3.0)    (sơ đồ màn hình+dữ liệu)  (bảng theo dõi)

TẦNG 2 — TEST DESIGN (chạy lặp lại cho TỪNG UC)
 Nhánh UI :  /qc-uc-read → /qc-func-scenario-design → /qc-func-tc-design
                  │ (audited đạt ngưỡng điểm)
                  ▼
 Nhánh API:  /qc-api-read → /qc-api-scenario-design → /qc-api-tc-design
             (audit nghiệp vụ,  (scenario API)          (test case API — nơi DUY NHẤT
              KHÔNG cần doc)                              đối chiếu API doc)

TẦNG 3 — AUTOMATION (tùy chọn — dự án test thủ công bỏ qua hoàn toàn)
 /qc-func-auto-generate (UI)  ┐
 /qc-api-auto-generate  (API) ┴→ /qc-auto-run ──tự động──→ /qc-execute-test-report
                                                                  │ (có TC fail — tự động)
                                                                  ▼
                                              /qc-bug-verify ←── /qc-bug-report
                                              (bạn duyệt plan)    (bạn gửi dev + cập nhật Trạng thái)
```

**Chuỗi lệnh chạy chuẩn cho dự án mới** (câu hỏi của sổ được BA/BE trả lời xen giữa các bước): `/qc-project-onboarding` → `/qc-context-master` → `/qc-site-map` → `/qc-dashboard-sync` (3 bước sau thường tự nối nhau) → per UC: `/qc-uc-read UC-x` (tự kéo `qc-qna`) → `/qc-func-scenario-design UC-x` → `/qc-func-tc-design UC-x` → [khi có API: `/qc-api-read UC-x` → `/qc-api-scenario-design UC-x` → `/qc-api-tc-design UC-x`] → (automation) `/qc-func-auto-generate UC-x` + `/qc-api-auto-generate UC-x` → `/qc-auto-run UC-x` → tự động `/qc-execute-test-report` → tự động `/qc-bug-report` → `/qc-bug-verify UC-x` sau khi dev fix.

**Phạm vi test** — khai MỘT lần ở onboarding: `Black-box only` / `API only` / `Black-box + API` (Both có thêm test case MIX đối chiếu 2 tầng). Chỉ được đổi MỘT CHIỀU sang `Black-box + API`. BE xong trước FE vẫn là Both — nhánh API cứ chạy trước, vì cả 3 bước thiết kế API đều không cần hệ thống chạy.

**Cơ chế đầu vào / đầu ra — nắm 1 lần, dùng cả kit:** đầu vào bạn khai path vào bảng đường dẫn (`.claude/config/path-registry.md`) — chỉ các dòng **nhóm A**; đầu ra kit quy định sẵn (**nhóm B** — chưa chạy skill thì để nguyên, không xóa trống). Cấu hình runtime (Phạm vi test / Variant / Ngôn ngữ) nhập ở `project-config` §6 rồi mọi skill đọc qua `project-context-master` §3.0 — bạn không phải khai lại lần hai.

---

## 2. Tầng 1 — Context: dựng khung hiểu dự án

Như trước: bước 1 phỏng vấn cấu hình → bước 2 tổng hợp tri thức → bước 3 sơ đồ → bước 4 bảng theo dõi; bước 2 xong tự kéo bước 3, 4.

### Bước 1 — `/qc-project-onboarding` — các mục cần để ý

- **Mục 6 — Phạm vi & Variant kiểm thử (BẮT BUỘC):** chọn phạm vi (3 giá trị trên) + Kênh verify database (L4) + variant từ danh mục chuẩn (UI: `web-responsive` / `web-static` / `mobile-native` / `mobile-hybrid` / `desktop-native`; API: `rest` — variant khác kit sẽ từ chối kèm hướng dẫn bổ sung technical reference) — CHỌN chứ không điền chữ tự do.
- **Mục 1 — Project language:** ngôn ngữ deliverable của dự án (Vietnamese / English) — quyết định ngôn ngữ scenario/test case/bug report theo luật 2 nhóm.
- **Mục 3 — Environments:** dự án có API khai thêm mỗi môi trường 1 dòng `<ENV> - API`. **Mục 7 — Auth API:** endpoint login + vị trí token, HOẶC "user tự cấp token" (khai `API_TOKEN_<ROLE>` vào `.env` — kit scaffold sẵn `.env.example`).
- Bước 2 của onboarding chỉ hỏi dòng nhóm A; dự án có API khai thêm `api-doc-files` (Swagger/OpenAPI/Postman JSON) — cần đến TRƯỚC bước `/qc-api-tc-design`, hai bước API đầu chưa cần.

### Bước 2–4 — như trước

`/qc-context-master` → `project-context-master.md` (mục **§3.0** kế thừa nguyên văn §6 + Project language — nguồn đọc chuẩn của mọi skill phía sau); `/qc-site-map` → sơ đồ màn hình + dữ liệu; `/qc-dashboard-sync` → bảng theo dõi. Dashboard: khi có nhánh API, cột **`API stt`** hiển thị `<verdict> v<N> · <score>/100 · scen v<M> · TC v<K>` — nhìn 1 ô biết audit API đạt bao nhiêu điểm.

---

## 3. Tầng 2 — Test design: làm theo từng UC

### Nhánh UI — 3 bước, có thêm 2 điểm mới

`/qc-uc-read UC-101` (review yêu cầu, chấm điểm theo rubric 5 vùng — §4 báo cáo là bảng kiểm kê phần tử UI) → `/qc-func-scenario-design UC-101` → `/qc-func-tc-design UC-101`. BA trả lời câu hỏi → đưa vào chat → `/qc-uc-read` tự re-audit.

- **Format tài liệu đầu vào tự kiểm:** kit giữ file `input-files-format.md` (trong `.claude/skills/qc-uc-read/references/`) mô tả cấu trúc tài liệu BA của dự án. Skill tự đối chiếu và tự cập nhật; việc DUY NHẤT của bạn: khi BA đổi format tài liệu, sửa dòng cờ `> **Trạng thái khớp thực tế:**` thành `Cần check lại` — lần audit sau skill tự rà lại.
- **Chạy lại scenario khi audited đổi:** `/qc-func-scenario-design` giờ có update mode — giữ nguyên TS ID cũ, thêm Change log Added/Modified/Removed ở đầu file; scenario bị bỏ vẫn giữ block, đánh dấu `[Removed]`. Test case md có bảng RTM với cột `TS liên quan` — soi được TS nào chưa có TC.
- **Test case:** bản md là BẢN CHÍNH THỨC (máy đọc cho automation), md + xlsx cùng base name `<UC>_<feature>_testcases_<variant>_<YYYYMMDD>_v<N>`, update ghi v[N+1] cho CẢ 2. Priority 4 mức Critical/High/Medium/Low — Critical = bộ smoke của UC.

### Nhánh API — 3 bước (chỉ khi Phạm vi test có API)

Nguyên tắc v4: **req-first thuần** — 2 bước đầu đi hoàn toàn từ requirement, KHÔNG đụng API doc; doc chỉ cần ở bước 3.

#### Bước 1 — Audit API: `/qc-api-read UC-101`

- **Đầu vào:** audited UC đã ĐẠT NGƯỠNG (Ready / Conditionally Ready — skill tự kiểm tra). KHÔNG cần API doc — có cũng không đọc.
- **Nhận được:** `*_api-audited_*_v<N>.md` — suy diễn "BE cần làm gì": danh mục operation (khoá `resource · action` + vai trò `Owner`/`Reuse` để 2 UC không thiết kế trùng một endpoint), validation matrix từng param, luồng + chuyển trạng thái, ma trận phân quyền, AC hướng API (mức hành vi — không pin status/message), điểm readiness /100. Cuối MỖI lần chạy skill rebuild `qc-api-coverage.md` (`docs/qc-lead/`) — bản đồ sở hữu operation toàn dự án, KHÔNG sửa tay.
- **Câu hỏi API** đi vào sổ theo PORTAL: `<PORTAL>_api-question-backlog.md` (2 tầng: mục A câu hỏi chung + mục B theo UC; đã dedup với sổ UI per-UC — không hỏi BA/BE trùng). Các câu dạng "status code/message chính xác là gì" bị chặn từ gốc — hệ thống chạy sẽ tự trả lời qua baseline.

#### Bước 2 — Scenario API: `/qc-api-scenario-design UC-101`

- **Nhận được:** `*_api-scenarios_*_v<N>.md` — mỗi scenario 1 ý định test (`TS_API_*`), phủ **9 vùng**: contract, validation, luồng nghiệp vụ, chuyển trạng thái, phân quyền, toàn vẹn dữ liệu, hành vi giao thức, MIX (chỉ khi Both), và vùng 9 MỚI — an toàn & chống lạm dụng (input hiểm, spam/double-submit, lộ dữ liệu nhạy cảm). Vùng endpoint-level chỉ thiết kế cho operation UC này là `Owner`; operation `Reuse` tham chiếu sang UC chủ. Có update mode như nhánh UI.

#### Bước 3 — Test case API: `/qc-api-tc-design UC-101`

- **Đầu vào BẮT BUỘC:** API doc (khai ở `api-doc-files`). Thiếu → skill DỪNG chờ. Đây là nơi DUY NHẤT của kit đối chiếu doc: **Step 1.4 binding** operation nghiệp vụ ↔ endpoint thật (đọc bảng digest qua script `parse-api-doc.mjs` — agent không đọc raw doc). Lệch phát hiện tại đây thành finding qua `qc-qna`: thiếu endpoint (`UNDOCUMENTED_OPERATION`), doc mâu thuẫn requirement (`DOC_REQ_MISMATCH`), endpoint thừa không ai nhận (`ORPHAN_ENDPOINT`).
- **Nhận được:** test case md + xlsx cùng base name (`TC_API_NNN`, `TC_MIX_NNN` khi Both); prelude có bảng "Binding OP ↔ endpoint" + bảng link "TC UI liên quan" (dùng phân định lỗi FE/BE về sau). Expected viết mức HÀNH VI (thành công + side-effect / bị từ chối + không ghi dữ liệu); status/message chính xác KHÔNG bịa, không hỏi BE — để `api-baseline` ghi ở lần chạy đầu.
- **Review:** mở Excel soát như TC UI; để ý nhóm phân quyền (đúng role / sai role / không token / token hỏng) và nhóm verify side-effect (tạo xong GET lại kiểm tra).

> **Lưu ý phủ 2 tầng:** validation test Ở CẢ 2 NHÁNH có chủ đích (UI kiểm tra message chặn ở FE; API kiểm tra BE từ chối + không ghi dữ liệu). Logic nghiệp vụ sâu dồn về nhánh API; nhánh UI giữ luồng người dùng đại diện + hiển thị/tương tác.

---

## 4. Tầng 3 — Automation: chuỗi 6 skill, 2 điểm tự động

Không đọc tài liệu context (trừ §3.0). Cần: TC md của nhánh tương ứng, `project-config` (URL + tài khoản + Auth API), hệ thống non-prod đang chạy. Tuyệt đối không chạy production — mọi skill tự từ chối.

### Sinh test script — mỗi nhánh một skill

- **`/qc-func-auto-generate UC-101`** (nhánh UI — tên cũ `qc-auto-generate`, gõ lệnh cũ vẫn được): POM, live crawl locator, sổ `crawl-findings/`. Điểm v4: page object CHỈ sinh từ live crawl — chưa kết nối được kênh DOM thì skill hướng dẫn bạn cài và CHỜ, không sinh locator tạm.
- **`/qc-api-auto-generate UC-101`** (nhánh API): spec gọi HTTP trực tiếp — service theo resource, token theo role, assert status + schema + side-effect; MIX spec dùng cả page object lẫn service; scaffold `.env.example` cho token. Probe endpoint tùy chọn; lệch → sổ **`api-findings/`** (bạn/BE trả lời inline → chạy lại skill). Lần chạy đầu mỗi TC, helper ghi status/message thực tế vào **`api-baselines/<UC>_api-baseline.json`** — bạn/BE duyệt thì đặt `confirmed: true`; từ đó về sau lệch baseline = tín hiệu regression.
- **Review sau khi chạy:** file data test (`data/<UC>_testdata.md` / `<UC>_api_testdata.md`), bảng triage per-TC (verdict `Đã có script` / `Sẽ bổ sung` / `Cần điều kiện` / `Trùng` / `Thủ công`), 2 sổ findings.

### Chạy test: `/qc-auto-run UC-101`

- **Phase 0 tự kiểm tra:** phạm vi test → UC có TC API chưa → script đủ 2 nhánh chưa (thiếu 1 → HỎI bạn) → đã từng chạy chưa (→ HỎI rerun scope). Bạn chỉ định rõ trong lệnh ("chạy API của UC-101") thì khỏi hỏi.
- Chạy chung 1 lệnh cả UI + API + MIX; xác nhận môi trường trước khi chạy; precondition thiếu → TC bị Blocked chứ không Fail; summary nhóm UI/API/MIX + mục baseline mới ghi cần bạn duyệt.
- **Điểm tự động 1:** mọi câu hỏi crawl-findings + api-findings liên quan UC đã `Đã giải quyết` → tự chạy tiếp `/qc-execute-test-report`. (Gate api-findings tính theo giao-UC: chỉ dòng có `TC bị ảnh hưởng` dạng `UC-101/TC_API_001` chạm UC này mới chặn.)

### Chốt kết quả: `/qc-execute-test-report UC-101` (thường tự chạy)

- MỘT việc: điền kết quả thô vào `*_test-results.md` (mỗi TC 1 dòng cả 2 nhánh + TC thủ công; mỗi run 1 cột). Cột `Cách chạy` lấy từ triage: `Đã có script`/`Trùng` → `Tự động`; còn lại → `Thủ công`.
- **Điểm tự động 2:** có ô Fail → tự chạy tiếp `/qc-bug-report`. **Việc của bạn:** điền tay ô `Chưa chạy` của TC thủ công.

### Phân tích bug: `/qc-bug-report UC-101` (thường tự chạy)

- Phân loại TC Fail theo **7 nhóm root cause** bằng ĐỐI CHỨNG 2 nhánh (TC UI fail + TC API cùng rule pass → lỗi FE; ngược lại → lỗi BE; cả 2 fail → gộp 1 bug BE): `Lỗi BE` / `Lỗi FE` / `Lỗi tích hợp` → ghi bug; `Lỗi script` / `Lỗi môi trường` / `Lỗi data test` / `Tài liệu lỗi thời` → `Chưa chốt — <lý do>` kèm việc cần làm. Lệch với baseline CHƯA `confirmed` → `Chưa chốt — baseline chưa confirm` (xác nhận baseline hoặc hỏi BE), không thành bug oan.
- **Việc của bạn:** gửi bug cho dev; dev xong thì cập nhật cột "Trạng thái" (`Dev đã fix — chờ verify` / `Không tái hiện được` / `Không còn` / `Không phải bug`) — KHÔNG sửa cột khác. TC thủ công Fail: bạn TỰ viết bug vào mục "Bug từ TC thủ công".

### Verify bug: `/qc-bug-verify UC-101`

- Đọc Trạng thái bạn cập nhật → plan re-test + regression (**scope theo Root cause**) → **LUÔN trình plan chờ bạn duyệt** → gọi `qc-auto-run` → `Đã đóng — verified` / `Mở lại`. Bug mới lộ từ regression → đẩy qua `qc-bug-report`.

---

## 5. Output nằm ở đâu

```
docs/qc-lead/                        ← góc nhìn toàn dự án (tầng 1)
├── project-config.md                  §6 Phạm vi & Variant (NƠI NHẬP), §7 Auth API
├── project-context-master.md          §3.0 = nguồn đọc chuẩn của mọi skill tầng 2/3
└── qc-api-coverage.md                 MỚI: bản đồ sở hữu operation API — máy rebuild, không sửa tay

docs/qc/                             ← output theo từng UC
├── uc-read/<UC-ID>/                   audited UC + api-audited (cùng folder) + sổ câu hỏi UI per-UC
│                                      + digest endpoint; sổ API đặt ở uc-read/: <PORTAL>_api-question-backlog.md
├── scenarios/<UC-ID>/                 scenario UI + scenario API (đều có Change log khi update)
├── testcases/<UC-ID>/                 TC md + xlsx CÙNG BASE NAME (có <variant> trong tên, cả 2 nhánh)
│                                      + *_test-results.md (file sống, cả 2 nhánh)
└── automation/
    ├── data/                          <UC>_testdata.md (UI) + <UC>_api_testdata.md (API) — file sống
    ├── crawl-findings/                sổ hỏi-đáp phần tử UI (gate chốt kết quả)
    ├── api-findings/                  sổ hỏi-đáp endpoint (gate chốt kết quả — theo giao-UC)
    ├── api-baselines/                 MỚI: <UC>_api-baseline.json — bạn/BE chỉ sửa field `confirmed`
    ├── triage/                        bảng triage per-TC (cả 2 nhánh) → cột Cách chạy
    ├── reports/                       summary-latest.md + history/
    ├── bugs/                          bug report per UC — bạn chỉ sửa cột "Trạng thái"
    └── runner/                        code cả 2 nhánh — không cần mở
```

---

## 6. Khi có thay đổi — cập nhật ở đâu, chạy lại gì

| Điều thay đổi | Việc cần làm |
|---|---|
| Tài liệu tổng quan BA có bản mới | `/qc-context-master` → `/qc-site-map` → `/qc-dashboard-sync` |
| Tài liệu UC mới / BA trả lời câu hỏi | `/qc-uc-read <UC>` (re-audit) → scenario/TC chạy update nếu đổi; chạm nhánh API → `/qc-api-read <UC>` |
| BA đổi FORMAT tài liệu (không phải nội dung) | Sửa dòng cờ trong `input-files-format.md` thành `Cần check lại` → lần audit sau tự rà |
| **API doc mới về / đổi endpoint** | `/qc-api-tc-design <UC>` (update — binding lại ở Step 1.4); chỉ re-audit `/qc-api-read <UC>` khi câu trả lời làm ĐỔI NGHIỆP VỤ |
| **BE trả lời sổ `<PORTAL>_api-question-backlog`** | Câu đổi nghiệp vụ → `/qc-api-read <UC>` (re-audit); còn lại → `/qc-api-tc-design <UC>` (update) |
| Trả lời xong sổ api-findings / crawl-findings | `/qc-api-auto-generate <UC>` / `/qc-func-auto-generate <UC>` → `/qc-auto-run <UC>` |
| Giao diện đổi làm test UI rớt | `/qc-func-auto-generate <UC>` rồi `/qc-auto-run <UC>` |
| **Baseline lệch (status/message đổi)** | `confirmed=true` → là bug, để `qc-bug-report` xử; `confirmed=false` → xác nhận baseline hoặc hỏi BE rồi chạy lại |
| Dev báo đã fix bug | Cập nhật cột "Trạng thái" trong bug report → `/qc-bug-verify <UC>` |
| Dự án muốn bật thêm nhánh API | `/qc-project-onboarding` (update) → `Black-box + API` (một chiều) + khai mục 3/7 + `api-doc-files` → `/qc-context-master` (update — §3.0 mới) |
| Đổi URL / tài khoản / token | `project-config.md` (URL, account) hoặc `.env` (`API_TOKEN_<ROLE>`) |
| Bảng theo dõi lệch với đĩa | `/qc-dashboard-sync` (toàn bộ) hoặc `/qc-dashboard-sync <UC>` |

---

## 7. Mười quy tắc sống còn (bản cập nhật)

1. **Luôn đọc phiên bản mới nhất** — file có số `v` cao nhất; bản md của test case là BẢN CHÍNH THỨC ngang xlsx.
2. **Đường dẫn tra một chỗ** — path-registry; bạn chỉ khai nhóm A; ô nhóm B chưa chạy skill thì để nguyên. Phạm vi/Variant/Ngôn ngữ khai một lần ở §6, skill đọc qua §3.0.
3. **Không sửa tay file do skill sở hữu.** Phần của BẠN: dòng cờ `input-files-format.md` (khi BA đổi format), cột "Trạng thái" + mục "Bug từ TC thủ công" (bug report), ô TC thủ công (test-results), cột "Trả lời" (crawl-findings + api-findings), field `confirmed` (api-baseline), giá trị data test, `.env`, `api-conventions.ts`, `notification-channels.ts`, cột phạm vi (dashboard).
4. **Skill dừng giữa chừng cứ chạy lại lệnh cũ** — có checkpoint, skill hỏi tiếp tục hay làm mới.
5. **Muốn cập nhật output theo feedback — nói qua chat, đừng tự sửa file output.**
6. **Không biết sửa ở đâu — hỏi qua chat.**
7. **Không sửa phần lõi skill** (`SKILL.md`, `workflows/`, `rules/`, `config/`); tùy biến dự án ở `references/`, `templates/`, file technical, `api-conventions.ts`.
8. **Agent có thể sai** — mọi output quan trọng cần bạn review trước khi dùng; bug report cũng vậy (nhất là kết luận "dựa trên 1 phía đối chứng" và baseline chưa confirm).
9. **Luôn phải manual test lại hệ thống** — AI giảm tải, không thay thế; TC thủ công và bug từ chúng là phần của BẠN.
10. **Làm mới bản thân** với quy trình có AI — smart, đừng stress; trị được AI.
