# Step 0 — Thông tin chung

Step 0 là bước **chỉ chạy 1 lần khi setup dự án mới**. Nó fill 2 file cấu hình nền tảng (project-config + path-registry) và cấp quyền cho AI tool. Sau Step 0, các Step 1-3 mới chạy được.

> 👤 **Ai chạy:** QC Lead (KHÔNG phải QC Member)
> ⏱️ **Thời gian:** ~15-20 phút

## Quy trình tổng quan

```
1. Chạy /qc-project-onboarding   → fill project-config + path-registry
2. Cấp permission qua /permissions → AI tool có quyền chạy skill
3. Verify cấu hình                → đảm bảo sẵn sàng cho Step 1
```

---

## Phần 1 — Chạy onboarding skill

### Trigger

Trong AI tool (Claude Code / Antigravity / Codex CLI), gõ slash command:

```
/qc-project-onboarding
```

⚠️ **Chỉ slash command** — không nhận natural language như "onboard project". Skill cần được gọi deliberate.

### Quy trình 4 phase của onboarding

```
Phase 0 — Silent Audit
  ↓ Skill đọc 2 file config hiện tại, phân loại Filled / Empty
Phase 1 — Round 1: project-config.md
  ↓ Skill show nội dung 6 mục → bạn trả lời mỗi mục (mới / giữ nguyên / bỏ qua)
Phase 2 — Round 2: path-registry.md
  ↓ Skill show Artifact Path Table → bạn cung cấp path thật cho mỗi dòng
Phase 3 — Write Back
  ↓ Skill ghi 2 file, bump version
Phase 4 — Handover
  ↓ Tóm tắt + hướng dẫn bước tiếp theo
```

### Round 1 — project-config.md

Skill sẽ phỏng vấn 6 mục:

| Mục | Bạn cần trả lời gì | Bắt buộc? |
|---|---|---|
| **1. Project Overview** | Description, Domain (Fintech / E-commerce / Healthcare...), Target Audience | ✅ |
| **2. Project Context** | 1-2 câu mô tả context dự án (vd: "Hệ thống quản lý đơn hàng B2B") | ✅ |
| **3. Associated Links** | Link Jira, Confluence, Figma, Git, CI/CD, API docs | Khuyến nghị |
| **4. Environments** | URL DEV / QA / UAT / PROD + database | Khuyến nghị |
| **5. Accounts & Credentials** | Tài khoản TEST cho admin/user/vendor + test cards | Khuyến nghị |
| **6. Third-Party Integrations** | Payment gateway, Email service, SSO provider... | Khuyến nghị |

Trả lời theo format:

```
- Mục 1: Hệ thống quản lý đơn hàng B2B, domain E-commerce, target small business
- Mục 2: Dự án xây dựng từ scratch, MVP phase, deadline Q3 2026
- Mục 3: Jira https://...; Confluence https://...
- Mục 4: DEV: dev.example.com; QA: qa.example.com
- Mục 5: bỏ qua
- Mục 6: bỏ qua
```

⚠️ **Lưu ý cho Mục 5**:
- ✅ Ghi tài khoản TEST: `qa-admin@example.com / TestPass123`
- ❌ KHÔNG ghi tài khoản production hoặc credentials có quyền đổi data thật

⚠️ **Mục 1 và 2 bắt buộc** — nếu bạn trả lời "bỏ qua", skill sẽ stop. Không có 2 mục này, các skill khác KHÔNG chạy được.

### Round 2 — path-registry.md

Skill show Artifact Path Table và yêu cầu bạn cung cấp path thật cho mỗi Logical Name.

| Logical Name | Path bạn cần cung cấp |
|---|---|
| `requirement-common-files` | Vd: `docs/BA/Common rules` |
| `requirement-files` | Vd: `docs/BA/<UC-ID-Report-name>` |
| `uc-review-report` | Vd: `docs/QC/uc-read/<UC-ID>/` |
| `question-backlog` | Vd: `docs/QC/uc-read/<UC-ID>/` |
| `func-test-scenarios` | Vd: `docs/QC/test-scenarios/functional-test/<UC-ID>/` |
| `func-test-cases` | Vd: `docs/QC/test-cases/functional-test/<UC-ID>/` |
| ... | |

⚠️ **Quy tắc**:
- Giữ nguyên placeholder `<UC-ID>`, `<feature>`, `<YYYYMMDD>`, `<N>` — skill tự thay tại runtime
- Path mặc định dùng `docs/` — nếu dự án bạn dùng folder khác (vd `documentation/`), thay đồng loạt

Nếu để placeholder `docs/???`, skill sẽ cảnh báo. Bạn confirm "yes" để skip dòng đó nhưng skill nào cần artifact này sẽ stop sau.

### Phase 4 — Handover

Sau khi xong 2 round, skill sẽ:

- Ghi 2 file (`project-config.md` và `path-registry.md`) — bump field `Version` trong header
- Show summary thay đổi
- Hướng dẫn bước tiếp theo

---

## Phần 2 — Cấp permission

Sau onboarding, một số skill cần quyền đọc/ghi/run command. Cấu hình permission tại `.claude/settings.local.json`.

### Cách khuyến nghị — dùng `/permissions`

Trong AI tool, gõ:

```
/permissions
```

→ UI mở ra:
- Xem danh sách permission hiện tại
- Add / Remove
- Move giữa global ↔ project

### Default permissions cho QC-kit

Cần tối thiểu các quyền sau:

```json
{
  "permissions": {
    "allow": [
      "Bash(git mv *)",
      "Edit(/.claude/skills/qc-func-tc-design/**)"
    ]
  }
}
```

Ý nghĩa:
- `Bash(git mv *)` — cho AI di chuyển/đổi tên file output
- `Edit(/.claude/skills/qc-func-tc-design/**)` — cho AI sửa skill khi user prompt sync template

### Khi nào thêm permission

- Cài MCP server mới → thêm permission cho MCP tool đó
- Team thường dùng Bash command cụ thể (`npm test`, `pytest`...) → thêm vào allow
- Skill mới ra mắt cần edit folder mới → thêm permission cho folder đó

### Bảo mật

⚠️
- KHÔNG ghi API key, password vào settings.json
- `.claude/settings.local.json` thường nằm trong `.gitignore` — KHÔNG commit
- Permission share team → đưa vào `.claude/settings.json` (commit được)

---

## Phần 3 — Verify cấu hình

Sau khi xong onboarding + permission, dùng checklist này để xác nhận sẵn sàng.

### Cấu hình

- [ ] `.claude/skills/` có đủ 7 thư mục skill (qc-project-onboarding, qc-uc-read, qc-qna, qc-func-scenario-design, qc-func-tc-design, pdf, docx)
- [ ] `.claude/rules/global-rules.md` và `naming-convention.md` tồn tại
- [ ] `.claude/config/project-config.md`:
  - Mục 1 và 2 đã có nội dung thật (không còn `[Insert ...]`)
  - Header có Created, Author, Version
- [ ] `.claude/config/path-registry.md`:
  - Mọi dòng Artifact Path Table có Path thật (không còn `docs/???`)
  - Logical Name không bị đổi
  - Path còn placeholder `<UC-ID>`, `<feature>`, ...

### Input docs

- [ ] `docs/BA/Common rules/` tồn tại (ngay cả khi rỗng cũng OK)
- [ ] Có ít nhất 1 folder UC trong `docs/BA/` (để chạy thử Step 1 sau)

### Permission

- [ ] `.claude/settings.local.json` có ít nhất 2 permission default
- [ ] AI tool đã reload sau khi cài permission (nếu cần)

### Test chạy thử

Chạy 1 lệnh đơn giản để verify tool đã hiểu QC-kit:

```
Liệt kê các skill có trong QC-kit và mô tả ngắn mỗi cái
```

Nếu AI trả về danh sách 7 skill với mô tả → ✅ thành công.

---

## Khi nào quay lại Step 0?

Step 0 là one-time, nhưng có một số tình huống bạn cần chạy lại:

| Tình huống | Cách xử lý |
|---|---|
| Đổi cấu trúc folder dự án (vd `docs/` → `documentation/`) | Chạy lại `/qc-project-onboarding` (Update mode) |
| Thêm/đổi link Jira/Confluence | Chạy lại `/qc-project-onboarding` (Update mode) |
| Thêm môi trường mới (vd UAT) | Chạy lại `/qc-project-onboarding` (Update mode) |
| Skill mới ra cần permission mới | Dùng `/permissions` |
| Sửa lỗi typo nhỏ trong path | Sửa tay → bump field Version trong header |

---

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Skill stop ở Round 1 cảnh báo Mục 1/2 | Cung cấp dữ liệu thật cho 2 mục → chạy lại |
| Báo `path docs/???` khi chạy skill khác | Path-registry còn placeholder — chạy lại onboarding Update mode |
| Skill không tự nhận diện re-audit | Verify file output cũ ở đúng folder theo path-registry |
| Permission denied khi ghi file | Dùng `/permissions` cấp quyền |

---

✅ **Step 0 hoàn tất.** Bạn đã sẵn sàng cho Step 1 — Review requirement.

**Tiếp theo:** [Step 1 — Review requirement](step1-review-requirement.md)
