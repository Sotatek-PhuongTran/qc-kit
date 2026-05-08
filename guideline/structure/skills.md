# Skills

Skills là các quy trình tự động hoá theo task QC. Mỗi skill là một thư mục trong `.claude/skills/` chứa SKILL.md + workflows + templates + references.

QC-kit hiện có **7 skill** (số lượng sẽ tăng theo lộ trình mở rộng).

## Phân loại

### Skill chính (qc-*)

| Skill | Mục đích | Trigger |
|---|---|---|
| `qc-project-onboarding` | Setup dự án mới — fill project-config + path-registry | `/qc-project-onboarding` |
| `qc-uc-read` | Review UC, đánh giá Ready/Not Ready | `review uc UC-XXX` |
| `qc-qna` | Tách câu hỏi gap thành Question Backlog cho BA | Auto sau qc-uc-read |
| `qc-func-scenario-design` | Thiết kế test scenarios (BVA, EP, Decision Table) | `design test scenarios` |
| `qc-func-tc-design` | Sinh test cases hoàn chỉnh (Excel) | `generate test cases` / `update test cases` |

### Skill bổ trợ

| Skill | Mục đích | Khi nào dùng |
|---|---|---|
| `pdf` | Đọc/extract content từ file `.pdf` | Khi BA gửi requirement dạng PDF |
| `docx` | Đọc/edit file Word `.docx` | Khi BA gửi requirement dạng Word |

Skill bổ trợ chạy "sau hậu trường" — tự động được gọi khi skill chính cần đọc PDF/DOCX.

---

## Mỗi skill có gì?

Cấu trúc thư mục một skill (ví dụ qc-uc-read):

```
.claude/skills/qc-uc-read/
├── SKILL.md                    ← Định nghĩa skill (purpose, workflow, input/output)
├── workflows/
│   ├── first-audit-workflow.md
│   └── re-audit-workflow.md
├── templates/
│   └── UC_readiness_review_template_v3.md
├── references/
│   └── input-files-format.md
└── rules/
    └── (skill-specific rules)
```

| Phần | Vai trò |
|---|---|
| **SKILL.md** | Manifest — AI đọc đầu tiên để hiểu skill |
| **workflows/** | Các nhánh quy trình (vd first-audit vs re-audit) |
| **templates/** | Mẫu output cố định |
| **references/** | Tài liệu tham khảo (format input, business rule...) |
| **rules/** | Rule chỉ áp cho skill này |

---

## Templates — quy tắc sửa

### 3 template chính trong QC-kit

| Template | Skill dùng | Output |
|---|---|---|
| `UC_readiness_review_template_v3.md` | qc-uc-read | UC review report |
| `question-backlog_template.md` | qc-qna | Question backlog |
| `Testcase_template.xlsx` | qc-func-tc-design | Test cases Excel |

### ⚠️ Quy tắc vàng

> **Template = hợp đồng giữa skill và output.**
> **Sửa template = sửa hợp đồng → phải đồng bộ skill, nếu không output sẽ sai.**

#### KHÔNG được sửa

- ❌ `UC_readiness_review_template_v3.md`
- ❌ `question-backlog_template.md`

Hai template này đã được thiết kế theo chuẩn audit framework — sửa sẽ làm hỏng quy trình review của qc-uc-read và qc-qna.

#### CÓ THỂ sửa, nhưng cần đồng bộ

- ✅ `Testcase_template.xlsx`

Template Excel này có thể adapt cho dự án (thêm cột, đổi format header) nếu team có quy ước khác. Nhưng:

🔥 **BẮT BUỘC** sau khi sửa Testcase template, chạy prompt sau cho agent:

```
Tôi đã update test cases template, hãy check template hiện tại và đề xuất
các nội dung cần sửa trong skill và script
```

Lý do: skill `qc-func-tc-design` có code mapping cột Excel → field trong skill. Sửa template mà không sync skill → output ra Excel sai format.

---

## Cách AI nhận diện skill nào để chạy

### 1. Trigger phrase

Mỗi skill có `description` trong SKILL.md liệt kê các phrase trigger. Ví dụ qc-uc-read:

> Use this skill whenever a user say `review uc`, `review requirement`.

Khi user gõ phrase trùng/gần giống → AI load skill đó.

### 2. Slash command

Một số skill **CHỈ** trigger qua slash command (không nhận natural language):

- `/qc-project-onboarding` — chỉ slash, không trigger qua "onboard project"

Lý do: skill này thay đổi config quan trọng — phải gọi tay deliberate.

### 3. Auto-trigger

Một số skill tự động chạy sau skill khác:

- `qc-qna` auto-trigger sau khi qc-uc-read tìm thấy gap

---

## Khi nào dùng skill nào — Decision tree

```
Tôi vừa apply QC-kit cho dự án mới chưa?
  → Có   → /qc-project-onboarding
  → Không ↓

Tôi có requirement BA mới chưa review?
  → Có   → review uc <UC-ID>
  → Không ↓

UC đã có review report, BA đã trả lời backlog?
  → Có   → review uc <UC-ID> (re-audit)
  → Không, BA chưa trả lời → đợi BA, hoặc gửi backlog cho BA

UC đã Ready?
  → Có   → design test scenarios cho <UC-ID>
  → Không ↓

Có scenarios rồi?
  → Có   → generate test cases cho <UC-ID>
  → Đã có test cases nhưng requirement đổi → update test cases cho <UC-ID>
```

Chi tiết workflow tại [Phần IV — Cách sử dụng](../usage/getting-started.md).

---

## Mở rộng QC-kit (cho người maintain)

Để thêm skill mới vào QC-kit:

1. Tạo thư mục `.claude/skills/<skill-name>/`
2. Viết `SKILL.md` theo format chuẩn (xem skill có sẵn làm reference)
3. Định nghĩa trigger phrase trong `description` field
4. Đặt template/workflow/reference vào subfolder tương ứng
5. Cập nhật `path-registry.md` nếu skill có artifact mới
6. Test trên dự án mẫu trước khi rollout team

📌 **Lộ trình mở rộng QC-kit:**

- ⏳ Module test
- ⏳ System test
- ⏳ Non-functional test (performance, security, load)
- ⏳ Execute test tự động

---

**Tiếp theo:** [Phần IV — Cách sử dụng → Bắt đầu](../usage/getting-started.md)
