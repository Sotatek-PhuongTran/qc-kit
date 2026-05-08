# Config

Config gồm 3 file giúp QC-kit "biết" về dự án cụ thể của bạn — domain, môi trường, đường dẫn folder, permission. Đây là điểm bạn customize chính khi apply QC-kit cho dự án mới.

## Vị trí

```
.claude/
├── config/
│   ├── project-config.md      ← Thông tin dự án
│   └── path-registry.md       ← Map tên logic → path thật
└── settings.local.json        ← Permission cho AI tool
```

> 💡 **Khuyến nghị**: KHÔNG sửa tay 2 file `project-config.md` và `path-registry.md`. Dùng skill `/qc-project-onboarding` để skill tự phỏng vấn bạn và fill.

---

## 1. `project-config.md` — Thông tin dự án

### Mục đích

Cung cấp context dự án cho AI hiểu domain, môi trường, link, account... Khi skill khác (qc-uc-read, qc-func-scenario-design...) chạy, chúng đọc file này để hiểu bạn đang test cho dự án gì.

### Cấu trúc 6 mục

| Mục | Nội dung | Bắt buộc? |
|---|---|---|
| **1. Project Overview** | Description, Domain, Target Audience | ✅ **BẮT BUỘC** |
| **2. Project Context** | Mô tả ngắn về context dự án | ✅ **BẮT BUỘC** |
| **3. Associated Links & Resources** | Jira, Confluence, Figma, Git Repo, CI/CD, API docs | Khuyến nghị |
| **4. Environments** | DEV / QA / UAT / PROD URLs + database | Khuyến nghị |
| **5. Accounts & Credentials** | Tài khoản TEST (admin, user, vendor, test cards) | Khuyến nghị |
| **6. Third-Party Integrations** | Payment gateway, Email service, Auth provider | Khuyến nghị |

⚠️ Mục 1 và 2 **bắt buộc** — nếu thiếu, các skill khác sẽ KHÔNG chạy được.

⚠️ Mục 5: chỉ ghi tài khoản **TEST**. KHÔNG ghi password production hoặc credentials có quyền đổi data trên môi trường thực.

### Header

```markdown
| Project | <Tên dự án>     |
| Created | <YYYY-MM-DD>    |
| Author  | <Tên QC Lead>   |
| Version | v<N>            |
```

⚠️ Khi update file, bump field `Version` (v1 → v2 → v3) trong header. KHÔNG tạo file mới.

---

## 2. `path-registry.md` — Map tên logic → path thật

### Mục đích

Skill QC-kit không hardcode đường dẫn folder. Thay vào đó, mỗi loại artifact có một **Logical Name** (vd `uc-review-report`), và skill tra `path-registry.md` để biết Logical Name đó tương ứng với folder thật nào.

Lý do thiết kế như vậy: dự án khác nhau có cấu trúc folder khác nhau. Bạn chỉ cần update path-registry, skill tự follow.

### Cấu trúc Artifact Path Table

```markdown
| Logical Name | Path | File Pattern | Mô tả |
|---|---|---|---|
| requirement-common-files | docs/BA/Common rules | *.md, *.docx, *.pdf | Common rules dự án |
| requirement-files | docs/BA/<UC-ID-Report-name> | *.md, *.docx, *.pdf, *.png | Per-UC requirements |
| uc-review-report | docs/QC/uc-read/<UC-ID>/ | <UC-ID>_<feature>_audited_<YYYYMMDD>_v<N>.md | Output qc-uc-read |
| question-backlog | docs/QC/uc-read/<UC-ID>/ | <UC-ID>_<feature>_question-backlog_<YYYYMMDD>_v<N>.md | Output qc-qna |
| func-test-scenarios | docs/QC/test-scenarios/functional-test/<UC-ID>/ | <UC-ID>_<feature>_scenarios_<YYYYMMDD>_v<N>.md | Output qc-func-scenario-design |
| func-test-cases | docs/QC/test-cases/functional-test/<UC-ID>/ | <UC-ID>_<feature>_testcases_<YYYYMMDD>_v<N>.xlsx | Output qc-func-tc-design |
| func-test-cases-draft | docs/QC/test-cases/functional-test/<UC-ID>/ | <UC-ID>_<feature>_testcases_draft.md | Draft markdown |
| func-test-cases-summary | docs/QC/test-cases/functional-test/<UC-ID>/ | <UC-ID>_<feature>_testcases_summary_<YYYYMMDD>_v<N>.md | Summary |
```

### Quy tắc khi sửa path-registry

✅ ĐƯỢC:
- Sửa cột **Path** (vd đổi `docs/` → `documentation/`)
- Sửa cột **Mô tả**

❌ KHÔNG ĐƯỢC:
- Đổi **Logical Name** (skill khác đang reference theo tên này → đổi sẽ làm hỏng skill)
- Xoá dòng (nếu chưa cần dùng, để placeholder `docs/???`)
- Thay placeholder `<UC-ID>`, `<feature>`, `<YYYYMMDD>`, `<N>` thành giá trị cụ thể (skill cần placeholder để xử lý nhiều UC)

### Skill → Artifact Mapping

`path-registry.md` còn có bảng phụ ghi rõ skill nào đọc/ghi artifact nào:

| Skill | Đọc | Ghi |
|---|---|---|
| qc-uc-read | requirement-common-files, requirement-files, question-backlog | uc-review-report, question-backlog |
| qc-qna | uc-review-report | question-backlog |
| qc-func-scenario-design | uc-review-report | func-test-scenarios |
| qc-func-tc-design | uc-review-report, func-test-scenarios | func-test-cases (xlsx + draft + summary) |

Bảng này giúp bạn debug: nếu skill X báo lỗi path, kiểm tra Logical Name liên quan trong path-registry.

---

## 3. `settings.local.json` — Permission

### Mục đích

Cấu hình quyền cho AI tool: được phép chạy lệnh shell nào, edit file folder nào, gọi tool MCP nào.

### Ví dụ nội dung

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
- AI được phép chạy `git mv ...` (di chuyển/đổi tên file)
- AI được phép sửa file trong `.claude/skills/qc-func-tc-design/` (cần khi sửa template)

Mọi action không có trong allow → AI sẽ hỏi user trước khi thực hiện.

### Khuyến nghị

✅ Dùng slash command `/permissions` để quản lý — AI tự update file đúng JSON syntax.

❌ Tránh sửa tay JSON nếu không quen — lỗi syntax sẽ làm tool không load được settings.

⚠️ Bảo mật:
- KHÔNG ghi API key, password, token vào settings.json
- File `.local.json` thường nằm trong `.gitignore` (không commit)
- Nếu muốn share permission chung cho team → đưa vào `.claude/settings.json` (commit được)

---

## Khi nào sửa config?

| Tình huống | Cách xử lý |
|---|---|
| Setup dự án lần đầu | `/qc-project-onboarding` (First-time mode) |
| Đổi cấu trúc folder giữa chừng (vd `docs/` → `documentation/`) | `/qc-project-onboarding` (Update mode) |
| Update info dự án (link, environment) | `/qc-project-onboarding` (Update mode) |
| Sửa nhỏ typo trong path | Sửa tay → bump version |
| Thêm permission cho Bash command mới | `/permissions` |

Xem chi tiết tại [Step 0 — Thông tin chung](../usage/step0-info.md).

---

**Tiếp theo:** [Skills](skills.md)
