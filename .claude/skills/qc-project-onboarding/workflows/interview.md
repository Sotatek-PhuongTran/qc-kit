# qc-project-onboarding — Interview Workflow

> Full interview script for both onboarding steps. Routed from `../SKILL.md` § Workflow routing. Purpose, trigger, input/output contract, mode detection summary, and boundaries live in `../SKILL.md` — this file carries the phase-by-phase script (greetings, display blocks, selection flows, refusal messages, pre-flight + auto-trigger details).

## Phase 0 — Silent Audit (NO user-facing output)

Run silently — do NOT print any audit table or analysis.

1. Read both meta-config files. Treat as missing-content if a section uses placeholder tokens (`[Insert ...]`, `[Cung cấp ...]`, template URLs `https://[company]....`, `docs/???`, a scope table with NO box checked `[x]`, etc.).
2. Determine `mode`:
   - **First-time mode** — BOTH files entirely empty/placeholder.
   - **Update mode** — at least one file has real content.
3. Proceed directly to Phase 1.

## Phase 1 — Greeting + Step 1: project-config.md

Output exactly ONE of the two greeting blocks below (verbatim, hard-coded — do NOT paraphrase), then immediately show the current content of `project-config.md` and ask for input.

### Greeting A — First-time mode

```
👋 Chào bạn! Tôi là skill `qc-project-onboarding` — bước đầu tiên khi áp dụng QC Kit cho một dự án mới.

Tôi nhận thấy đây là **lần đầu** bạn chạy onboarding cho dự án này (`project-config.md` và `path-registry.md` chưa có dữ liệu thực).

Quy trình gồm **2 bước cấu hình** + tự động tổng hợp tri thức dự án:

1. **Bước 1 — `project-config.md`:** thông tin tổng quan dự án (7 mục; mục 1 và 6 bắt buộc (mục 2 khuyến nghị); mục 7 bắt buộc nếu Phạm vi test có API).
2. **Bước 2 — `path-registry.md`:** đường dẫn thật cho các tài liệu ĐẦU VÀO của dự án (nhóm A).
3. **Tự động:** sau khi xong Bước 2, nếu common files đã sẵn sàng, tôi sẽ tự gọi `qc-context-master` để tạo `project-context-master.md` và `qc-dashboard.md`.

Bắt đầu **Bước 1** ngay dưới đây 👇
```

### Greeting B — Update mode

```
👋 Chào bạn! Tôi là skill `qc-project-onboarding`.

Tôi thấy ít nhất 1 trong 2 file cấu hình đã có nội dung — bạn đang muốn **cập nhật**.

Quy trình:

1. **Bước 1 — `project-config.md`:** rà soát + cập nhật.
2. **Bước 2 — `path-registry.md`:** rà soát + cập nhật (chỉ các dòng nhóm A).
3. **Tự động:** sau khi xong Bước 2, nếu common files sẵn sàng, tôi sẽ tự gọi `qc-context-master` để đồng bộ `project-context-master.md`; ở Update mode, `qc-context-master` chỉ ĐỀ XUẤT chạy tiếp chuỗi `qc-site-map` → `qc-dashboard-sync` để đồng bộ `qc-dashboard.md` (không tự chạy).

Bắt đầu **Bước 1** ngay dưới đây 👇

> 💡 Lưu ý: nếu bạn chỉ muốn update `project-context-master.md` hoặc `qc-dashboard.md` mà KHÔNG cần đụng meta-config, hãy gọi trực tiếp `/qc-context-master`.
```

### After greeting — show project-config.md content

Display the current content of `project-config.md` as a single block, broken down by all 7 sections. Format:

```
📄 **Nội dung hiện tại của `project-config.md`:**

**Header**
| Project | <giá trị hiện tại> |
| Created | <giá trị hiện tại> |
| Author  | <giá trị hiện tại> |
| Version | <giá trị hiện tại> |

**Mục 1 — Project Overview** ✅ Bắt buộc
- Description: <giá trị hiện tại hoặc "(chưa có)">
- Domain: <giá trị hiện tại hoặc "(chưa có)">
- Project language: <giá trị hiện tại hoặc "(chưa có)">

**Mục 2 — Associated Links & Resources** ⚠️ Khuyến nghị
<bảng hiện tại hoặc "(chưa có — vẫn dùng template)">

**Mục 3 — Environments** ⚠️ Khuyến nghị (bắt buộc nếu dùng tầng automation)
<bảng hiện tại hoặc "(chưa có — vẫn dùng template)">

**Mục 4 — Accounts & Credentials Structure** ⚠️ Khuyến nghị (bắt buộc nếu dùng tầng automation)
<bảng hiện tại hoặc "(chưa có — vẫn dùng template)">
> Lưu ý: chỉ cung cấp tài khoản TEST. KHÔNG nhập tài khoản production.

**Mục 5 — Third-Party Integrations / APIs** ⚠️ Khuyến nghị
<nội dung hiện tại hoặc "(chưa có)">

**Mục 6 — Phạm vi & Variant kiểm thử** ✅ Bắt buộc
- Phạm vi test: <giá trị hiện tại hoặc "(chưa chọn)">
- Kênh verify database (L4): <giá trị hiện tại hoặc "(chưa chọn)">
- Variant UI: <giá trị hiện tại hoặc "(chưa chọn)">
- Variant API: <giá trị hiện tại hoặc "(chưa chọn)">

**Mục 7 — Auth API** ⚠️ Bắt buộc nếu Phạm vi test có API
<bảng hiện tại hoặc "(chưa có — vẫn dùng template)">
```

Then ask the user (verbatim — hard-coded):

```
👉 Bạn muốn **cập nhật** mục nào? Vui lòng trả lời cho TẤT CẢ 7 mục theo định dạng:
- Mục 1: <nội dung mới> hoặc "giữ nguyên"
- Mục 2: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 3: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 4: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 5: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 6: trả lời khối chọn bên dưới
- Mục 7: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua" (chỉ được "bỏ qua" khi Phạm vi test = Black-box only)

⚠️ Mục 1 và Mục 6 là **bắt buộc** — không được "bỏ qua". Nếu chưa có dữ liệu, `qc-context-master` không thể kế thừa vào `project-context-master` §3.0 và các skill tầng 2/3 sẽ KHÔNG chạy được.
```

### Section 6 — selection block (verbatim; the user CHOOSES, never free-types)

```
👉 Mục 6 — Phạm vi test: chọn ĐÚNG 1 (trả lời bằng số):
1. Black-box only — chỉ test qua UI
2. API only — chỉ test API
3. Black-box + API — cả hai (kể cả khi BE xong trước, FE sau)

👉 Kênh verify database (L4): có / không
👉 Variant UI (chọn 1 hoặc nhiều — chỉ khi Phạm vi có Black-box): web-responsive / web-static / mobile-native / mobile-hybrid / desktop-native
👉 Variant API (chỉ khi Phạm vi có API — kit hiện chỉ hỗ trợ 1 variant): rest
```

**Unsupported API variant rule:** if the user asks for any API variant other than `rest` (graphql / grpc / websocket / other), reply (verbatim, substituting `<X>`):
> "Kit hiện chỉ hỗ trợ `rest`. Variant <X> chưa có technical reference — cần bổ sung vào kit (references/<X>-technical.md) trước khi dùng."
NEVER write an unsupported variant into Section 6 — record only `rest` (or leave the API variant blank until the kit supports the requested one).

> ℹ️ **Mô hình kế thừa:** Mục 6 là NƠI NHẬP duy nhất (chỉ onboarding hỏi & điền). `qc-context-master` kế thừa nguyên văn Mục 6 (+ Project language từ Mục 1) vào `project-context-master` §3.0 — mọi skill tầng 2/3 đọc Phạm vi test / Variant / Project language từ §3.0 đó, KHÔNG đọc lại project-config §6 và KHÔNG hỏi lại user.

**One-way scope rule (update mode):** if the current stored value is `Black-box + API` and the user picks a narrower value → REFUSE with (verbatim):
> "⚠️ Phạm vi test chỉ được MỞ RỘNG sang `Black-box + API`, không thu hẹp. Giữ nguyên giá trị hiện tại."
If the current value is `Black-box only` or `API only` and the user picks `Black-box + API` → valid; continue with the conditional API questions below.

### Conditional API questions — ONLY when Phạm vi test = `API only` or `Black-box + API`

1. **Mục 3:** require one `<ENV> - API` row per environment (API base URL). Ask if missing.
2. **Mục 7 — Auth API:** interview per the template table — cơ chế auth (login endpoint / token qua `.env` / cookie session), login endpoint + vị trí token trong response + cách gắn token + TTL; or, for user-supplied tokens, instruct declaring `API_TOKEN_<ROLEKEY>` in `.env`. Contract: `.claude/config/api-shared/auth-strategy.md`.
3. **Mục 2:** ask for the API doc link/path (Swagger / OpenAPI / Postman collection). The concrete FILE path is declared in Step 2 (`api-doc-files` row).

When Phạm vi test = `Black-box only` → skip all three blocks entirely (do not display, do not ask).

**Refusal handling for Step 1:** If after this prompt the user still leaves Section 1 or Section 6 unfilled, stop the skill and output:
> "⚠️ Mục 1 và Mục 6 của `project-config.md` là bắt buộc. Khi nào có thông tin, vui lòng chạy lại `qc-project-onboarding`. Tôi sẽ KHÔNG ghi gì vào file lần này."

## Phase 2 — Step 2: path-registry.md

After the user finishes Step 1, immediately proceed to Step 2. Show the current `## Artifact Path Table` content (full table, every row — do NOT skip), with the group classification per the rules at the top of `path-registry.md` (group A = `Nguồn: BA`; group B = everything else).

Output exactly:

```
✅ Đã ghi nhận thông tin Bước 1.

📄 **Bước 2 — Nội dung hiện tại của `path-registry.md` (`## Artifact Path Table`):**

| Nhóm | Logical Name | Path hiện tại | Mô tả hiện tại | Trạng thái |
|---|---|---|---|---|
| A/B  | <row 1>      | <path>        | <mô tả>        | ✅ Configured / ⚠️ Unconfigured / 🔒 Kit-defined |
| ...  |              |               |                | |

📌 **Hướng dẫn cung cấp path:**
- CHỈ các dòng **nhóm A** (tài liệu đầu vào do BA/dự án tạo) cần bạn khai path — đường dẫn folder thật trên ổ đĩa, giữ nguyên gốc `docs/`.
- Các dòng **nhóm B** là sản phẩm của kit: path do kit quy định — KHÔNG cần khai. File chưa tồn tại (skill chưa chạy) thì GIỮ NGUYÊN giá trị mặc định, KHÔNG xóa thành trống.
- `Chỉ` update path, không thay đổi logical name vì nó đã được mention ở các skills và workflows.

👉 Bạn muốn **cập nhật** dòng nhóm A nào? Vui lòng trả lời cho TẤT CẢ các dòng nhóm A theo định dạng:
- `<logical-name>`: Path = `<path mới>` | Mô tả = `<mô tả mới>` — hoặc "giữ nguyên"
```

**Required logical names for auto-trigger to succeed:** `High-level-files`, `qc-dashboard`, `project-context-master`, `requirement-common-files`. Onboarding ensures these rows exist in the table; if any is missing, append it during this step — by group:
- **Group-A rows** (`High-level-files`, `requirement-common-files`) → append and ASK the user for the path (only group-A rows are ever asked).
- **Group-B rows** (`qc-dashboard`, `project-context-master`) → restore from the kit's default registry values (`docs/qc-lead/qc-dashboard.md`, `docs/qc-lead/project-context-master.md`) WITHOUT asking the user — group-B paths are kit-defined.

**Required when Phạm vi test has API:** the group-A row `api-doc-files` must exist and be asked. If missing, append it and ask for the path. It MAY remain `docs/???` at onboarding time (the doc may arrive later) — but warn that `qc-api-tc-design` will STOP until it is filled.

**Refusal handling for Step 2:** If a group-A row stays at `docs/???` (Unconfigured) and user picks "giữ nguyên", warn once:
> "⚠️ Artifact `<logical-name>` vẫn chưa có path thật. Skill nào cần đọc/ghi artifact này sẽ dừng lại và hỏi bạn sau. Bạn có chắc muốn để vậy? (yes/no)"

## Phase 3 — Write Back & Version Bumps

1. Apply Step 1 user answers to `project-config.md`. Bump `Version` IF anything actually changed. On first-time mode (header was placeholder), also fill `Created` (today, `YYYY-MM-DD`) and `Author` (from `userEmail` context if known, else ask).
2. Apply Step 2 user answers to `path-registry.md` — group-A rows only. Bump version IF anything changed.

## Phase 4 — Pre-flight Check + Auto-trigger qc-context-master

1. Resolve `High-level-files` logical name from path-registry. Pass conditions:
   - Logical name exists in `## Artifact Path Table`.
   - Path is concrete (no `docs/???`). The row may declare MULTIPLE folders (comma-separated, per the registry note).
   - At least ONE of the declared folders exists on disk AND contains ≥1 file. (Multi-folder rows: the remaining folders may be missing or empty — that is NOT a fail.)

2. **Pre-flight PASS:**
   Output exactly:
   ```
   ✅ Bước 1 & 2 hoàn tất.
   - `project-config.md`: <new version> — đã update: <list> | giữ nguyên: <list>
   - `path-registry.md`: đã update: <list logical-names> | giữ nguyên: <list>

   ➡️ high-level files đã sẵn sàng tại `<High-level-files path>`. Tôi sẽ tự động gọi `qc-context-master` để tạo `project-context-master.md` và cập nhật `qc-dashboard.md`...
   ```
   Then **invoke `qc-context-master` skill via the Skill tool**. Do NOT ask the user — this is the documented kit flow.

3. **Pre-flight FAIL:**
   Output:
   ```
   ✅ Bước 1 & 2 hoàn tất.
   - `project-config.md`: <new version> — đã update: <list> | giữ nguyên: <list>
   - `path-registry.md`: đã update: <list logical-names> | giữ nguyên: <list>

   ⚠️ Tôi CHƯA thể tự động gọi `qc-context-master` vì:
   <reason — e.g., "High-level-files chưa cấu hình", "folder <path> chưa tồn tại", "folder rỗng">

   📋 **Bước tiếp theo:** chuẩn bị các tài liệu sau (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<resolved path>`, sau đó gọi `/qc-context-master` để hoàn tất tổng hợp tri thức dự án.
   ```
   Then STOP. Do NOT invoke qc-context-master.
