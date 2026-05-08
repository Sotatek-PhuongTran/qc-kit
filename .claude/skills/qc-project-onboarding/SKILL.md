---
name: qc-project-onboarding
description: Project onboarding skill for the QC Lead. This MUST be the very first skill executed when applying the QC Kit to a new project. It validates and populates the two foundational config files — project-config.md and path-registry.md — so that all downstream skills (qc-uc-read, qc-qna, qc-func-scenario-design, qc-func-tc-design, etc.) have the context and paths they need to run. Trigger ONLY when the user explicitly invokes this skill (e.g., /qc-project-onboarding).
---

# QC Project Onboarding Skill

## Purpose

This skill is the **entry point** of the QC Kit. Before any downstream skill (UC review, scenario design, test case design, Q&A) can run safely, two config files MUST be filled in:

1. `.claude/config/project-config.md` — project overview, context, links, environments, accounts, integrations.
2. `.claude/config/path-registry.md` — `## Artifact Path Table` mapping logical artifact names to real folder paths.

This skill performs a **gap audit** of those two files, **interviews the user** to collect missing info, **writes** the answers back into the files (bumping their `Version` field for tracking), and finally **hands the user a usage guideline** for the rest of the kit.

If the user refuses or is unable to provide mandatory information, the skill MUST stop and warn the user that downstream skills cannot run.

---

## Trigger Conditions

- Run this skill ONLY when the user explicitly invokes it (e.g., `/qc-project-onboarding`).
- Do NOT auto-trigger on natural-language phrases — onboarding is a deliberate action by the QC Lead.

---

## Input Contract

- `.claude/config/project-config.md` — read full content, parse sections 1–6 and the header version table.
- `.claude/config/path-registry.md` — read full content, parse the `## Artifact Path Table`.

---

## Output Contract

- Updated `.claude/config/project-config.md`:
  - Sections 1 & 2 MUST be filled.
  - Sections 3–6 filled if user provides info.
  - Header table MUST be updated: `Created` (today's date), `Author` (user's name), `Version` bumped to `v[N+1]`.
- Updated `.claude/config/path-registry.md`:
  - Every row of `## Artifact Path Table` MUST have a real `Path` value (no `docs/???` placeholder remaining) and a clear `Mô tả`.
  - If the file has a version field, bump it to `v[N+1]`.
- A short **handover message** to the user containing the QC Kit usage guideline (TBD — placeholder section below).

> Versioning note: Both config files live at a **fixed path** (`.claude/config/...`) because every downstream skill references them. Therefore the file **path and filename do NOT change**; only the `Version` field inside the header is bumped (`v1` → `v2` → `v3`...). This is an exception to the standard naming-convention rule that creates a new file per version.

---

## Workflow

### Phase 0 — Silent Audit (NO user-facing output)

This phase runs **silently** — do NOT show any audit table, summary, or analysis to the user.

1. Read `.claude/config/project-config.md` and `.claude/config/path-registry.md`.
2. Determine the state of `project-config.md` (internal, do not print):
   - For each of sections 1–6, classify as **Filled** (real content) or **Empty/Placeholder** (template tokens like `[Insert ...]`, `[Cung cấp ...]`, `[E-commerce / Finance / ...]`, or unchanged template URLs `https://[company]....`).
3. Determine the state of `path-registry.md` (internal):
   - For each row in `## Artifact Path Table`, classify as **Configured** (concrete `Path`, no `???`) or **Unconfigured** (`docs/???`, empty, or placeholder).
4. Compute the **mode** for the greeting:
   - **First-time mode** — BOTH files have all rows/sections in Empty/Unconfigured state.
   - **Update mode** — at least one section or row is already Filled/Configured.
5. Proceed directly to Phase 1 — do NOT ask the user to confirm; the greeting itself is the entry point.

### Phase 1 — Greeting + Round 1: project-config.md

Output exactly ONE of the two greeting blocks below (verbatim, hard-coded — do NOT paraphrase), then immediately show the current full content of `project-config.md` and ask for input.

#### Greeting A — First-time mode (use when BOTH files are empty)

```
👋 Chào bạn! Tôi là skill `qc-project-onboarding` — bước đầu tiên khi áp dụng QC Kit cho một dự án mới.

Tôi nhận thấy đây là **lần đầu** bạn chạy onboarding cho dự án này (2 file cấu hình `project-config.md` và `path-registry.md` chưa có dữ liệu thực).

Để các skill khác (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`, `qc-qna`) chạy được, tôi cần bạn cùng điền 2 file cấu hình. Quy trình gồm **2 lượt**:

1. **Lượt 1 — `project-config.md`:** thông tin tổng quan dự án (6 mục, trong đó **mục 1 và 2 là bắt buộc**).
2. **Lượt 2 — `path-registry.md`:** đường dẫn thật cho từng loại tài liệu (artifact).

Bắt đầu **Lượt 1** ngay dưới đây 👇
```

#### Greeting B — Update mode (use when at least one file already has content)

```
👋 Chào bạn! Tôi là skill `qc-project-onboarding`.

Tôi thấy 2 file cấu hình đã có nội dung — bạn đang muốn **cập nhật** thông tin cấu hình dự án.

Quy trình vẫn gồm **2 lượt**:

1. **Lượt 1 — `project-config.md`:** rà soát và cập nhật thông tin tổng quan dự án.
2. **Lượt 2 — `path-registry.md`:** rà soát và cập nhật đường dẫn artifact.

Tôi sẽ show lại nội dung hiện tại của từng file để bạn quyết định mục nào cần update. Bắt đầu **Lượt 1** ngay dưới đây 👇
```

#### After greeting, immediately show project-config.md content

Display the current content of `project-config.md` to the user as a single block, broken down by all 6 sections. Format:

```
📄 **Nội dung hiện tại của `project-config.md`:** 

**Mục 1 — Project Overview** ✅ Bắt buộc
- Description: <giá trị hiện tại hoặc "(chờ bạn cung cấp)">
- Domain: <giá trị hiện tại hoặc "(chờ bạn cung cấp)">
- Target Audience: <giá trị hiện tại hoặc "(chờ bạn cung cấp)">

**Mục 2 — Project Context** ✅ Bắt buộc
<nội dung hiện tại hoặc "(chờ bạn cung cấp)">

**Mục 3 — Associated Links & Resources** ⚠️ Khuyến nghị
<bảng hiện tại — nếu vẫn là placeholder mẫu thì ghi "(chờ bạn cung cấp — vẫn dùng template)">

**Mục 4 — Environments** ⚠️ Khuyến nghị
<bảng hiện tại hoặc "(chờ bạn cung cấp — vẫn dùng template)">

**Mục 5 — Accounts & Credentials Structure** ⚠️ Khuyến nghị
<bảng hiện tại hoặc "(chờ bạn cung cấp — vẫn dùng template)">
> Lưu ý: chỉ cung cấp tài khoản TEST. KHÔNG nhập tài khoản production.

**Mục 6 — Third-Party Integrations / APIs** ⚠️ Khuyến nghị
<nội dung hiện tại hoặc "(chờ bạn cung cấp)">
```

Then ask the user (verbatim — hard-coded):

```

👉 Bạn muốn **cập nhật** mục nào? Vui lòng trả lời cho TẤT CẢ 6 mục theo định dạng:
- Mục 1:
   - Project name: [Cung cấp  thông tin tên dự án]
   - Description: [Cung cấp mô tả  ngắn gọn về dự án]
   - Domain: [E-commerce / Finance / Healthcare / etc]
- Mục 2: <nội dung mới> / đường dẫn file context / hoặc "giữ nguyên"
- Mục 3: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 4: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 5: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"
- Mục 6: <nội dung mới> hoặc "giữ nguyên" hoặc "bỏ qua"

⚠️ Mục 1 và 2 là **bắt buộc** — không được "bỏ qua". Nếu chưa có dữ liệu cho 2 mục này, các skill khác sẽ KHÔNG chạy được.
```

**Refusal handling for Round 1:** If after this prompt the user still leaves Section 1 or 2 unfilled (replies "bỏ qua" or refuses), stop the skill and output:
> "⚠️ Mục 1 và 2 của `project-config.md` là bắt buộc. Khi nào có thông tin, vui lòng chạy lại `qc-project-onboarding`. Tôi sẽ KHÔNG ghi gì vào file lần này."

### Phase 2 — Round 2: path-registry.md

After the user finishes answering Round 1, immediately proceed to Round 2. Show the current `## Artifact Path Table` content (full table, not just unconfigured rows — per user requirement, do NOT skip any row).

Output exactly:

```
✅ Đã ghi nhận thông tin Lượt 1.

📄 **Lượt 2 — Nội dung hiện tại của `path-registry.md` (`## Artifact Path Table`):**

| Logical Name | Path hiện tại | Mô tả hiện tại | Trạng thái |
|---|---|---|---|
| <row 1>      | <path>        | <mô tả>        | ✅ Configured / ⚠️ Unconfigured |
| <row 2>      | ...           | ...            | ... |
| ...          |               |                | |

📌 **Hướng dẫn cung cấp path:**
- Mỗi `Path` là **đường dẫn folder thật** trên dự án này (ví dụ: `docs/QC/uc-read/<UC-ID>/`).
- Path có thể chứa placeholder `<UC-ID>`, `<feature>`, `<YYYYMMDD>`, `<N>` — KHÔNG thay bằng giá trị cụ thể; skill khác sẽ tự thay tại runtime.
- Giữ nguyên gốc `docs/` để đảm bảo tương thích với các skill khác.
- Path được lưu hiện tại là tối ưu nhất cho QC-kit, hãy thay đổi nếu bạn cần phân cấp thêm.
- Vui lòng chỉ update path, đừng đổi logical name vì nó đã được mention ở các skills.

```

**Refusal handling for Round 2:** If the user leaves a row at `docs/???` (Unconfigured) and chooses "giữ nguyên", warn once:
> "⚠️ Artifact `<logical-name>` vẫn chưa có path thật. Skill nào cần đọc/ghi artifact này sẽ dừng lại và hỏi bạn sau. Bạn có chắc muốn để vậy? (yes/no)"

If user confirms `yes`, proceed but record this in the Phase 4 handover summary as "không cấu hình".

### Phase 3 — Write Back

1. Edit `project-config.md` in place using the user's Round 1 answers. Preserve the existing markdown structure and table formatting. For each section the user said "giữ nguyên", do NOT touch.
2. Edit `path-registry.md` in place using Round 2 answers: update only the `Path` and `Mô tả` cells of `## Artifact Path Table`. Do NOT touch the `## Skill → Artifact Mapping` table or the `## Quy tắc` section.
3. **Bump the `Version` field** in the header of each file that was actually modified:
   - `project-config.md` header: `v1` → `v2` → `v3` ... (parse current version, increment).
   - On first-time onboarding (i.e., when header still shows placeholder `[Insert Date]`/`[Insert Author Name]`), also fill `Created` (today's date, format `YYYY-MM-DD`) and `Author` (user's name from `userEmail` context if known, else ask).
   - `path-registry.md`: if a version field exists in its header, bump it the same way. (Currently this file has no header version table; if so, skip — do not invent one.)
4. If a file had NO actual changes (all "giữ nguyên"), do NOT bump its version.

### Phase 4 — Handover

After writing, output to the user:

```
✅ **Onboarding hoàn tất.**

**Tóm tắt thay đổi:**
- `project-config.md`: <new version> — đã cập nhật mục: <list> | giữ nguyên: <list> | bỏ qua: <list>
- `path-registry.md`: đã cập nhật: <list logical-names> | giữ nguyên: <list> | chưa cấu hình: <list (nếu có, kèm cảnh báo)>

📘 **Hướng dẫn sử dụng QC Kit:**
<dán nội dung từ section "Usage Guideline" bên dưới — hiện đang là placeholder TBD>

➡️ **Bước tiếp theo gợi ý:** chạy `qc-uc-read` để review use case đầu tiên.
```

---

## Usage Guideline (TBD)

> _Placeholder — kit owner will provide the full guideline content. When available, paste it here or link to an external file._

---

## Boundaries

- This skill ONLY edits `project-config.md` and `path-registry.md`. It MUST NOT create, edit, or delete any other file in the project.
- It MUST NOT invent project information. If the user does not provide a value, leave the placeholder untouched (or skip the row).
- For Section 5 (test account credentials), the skill MAY collect passwords because these are test-only credentials. The skill MUST refuse to record any credential the user identifies as production, and MUST remind the user of the existing in-file warning ("Không cung cấp các tài khoản có quyền hạn thay đổi dữ liệu trên môi trường thực").
- It MUST NOT run any downstream skill automatically. Onboarding ends with a handover message; the user decides what to run next.
- All user-facing communication MUST be in Vietnamese (per `global-rules.md` — Vietnamese input ⇒ Vietnamese output).
