---
name: qc-writting-rules
description: Writing rules for human-read QC outputs that contain code references
applies_to_skills:
  - qc-uc-read
  - qc-uc-smoke
  - qc-func-scenario-design
  - qc-func-tc-design
  - qc-context-master
  - qc-site-map
excluded_skills: all skills that are not mentioned in accplies_to_skills section
applies_to_outputs: all output files of skills that are mentioned in accplies_to_skills section
trigger_condition: "Output is human-read prose containing CRULE/BR/R/FR/FOQ/Q/WCAG code references"
---

# QC Output Writing & Reference Readability Rules

Use these rules when writing quality control (QC) reports for the skills being applied.

Supported output languages:

- **English**
- **Vietnamese**

Intended readers: QC Lead, BA, Tester, and delivery stakeholders.

Goal: make QC outputs easy to understand, easy to trace back to source documents, and reusable for test design.

---

## 1. Language policy

- If the requested output language is **English**, apply the **Common rules** only.
- If the requested output language is **Vietnamese**, apply both **Common rules** and **Vietnamese rules**.
- Keep official IDs, codes, file paths, API names, screen names, message keys, and product terms unchanged unless the source provides an official localized name.
- Write human-readable explanations in the requested output language.
- English examples are illustrative; do not copy them word-for-word into Vietnamese output.
- Vietnamese examples are style guidance only for Vietnamese output.

---

## 2. Common rules

These rules apply to both English and Vietnamese QC outputs.

### Rule C1 — Write for business review, not for source lookup

Write for readers who need to understand the business meaning, review the issue, and reuse the output for test design.

Do not assume the reader remembers what a code, source section, or requirement anchor means.

### Rule C2 — Use complete, self-contained sentences

Important findings, questions, recommendations, and summary bullets must be understandable without reopening the source document.

Prefer this structure:

`subject + condition + system behavior + expected result / business impact`

### Rule C3 — Do not use source labels as explanations

Source labels and anchors are evidence, not explanation.

Examples of source labels:

- `4x`
- `5x`
- `UC §3`
- `FRD §6`
- `prototype note`
- `file.jsx:line`

Convert them into clear business meaning before adding the reference.

### Rule C4 — Preserve official identifiers

Keep official identifiers unchanged when needed for traceability.

Examples:

- `UC-*`
- `FR-*`
- `BR-*`
- `CRULE-*`
- `FOQ-*`
- `Q\d+`
- `MSG_*`
- `ERR_*`
- `WCAG x.x.x`
- API names
- file names
- screen names
- message keys

### Rule C5 — Explain first, put codes in parentheses

When a sentence references codes or anchors, write the meaning first, then put the code at the end as trace evidence.

Bad:

> `FOQ-ORGUSER-005 (Q1 High)` is still open: bcrypt cost? argon2id? KMS provider?

Good:

> The password-storage approach is not finalized: the requirement does not say whether to use bcrypt, argon2id, or scrypt, and it does not identify the KMS provider for encrypting audit logs at rest. (Reference: `FOQ-ORGUSER-005` in `FRD §10`; audit question `Q1`, priority High.)

### Rule C6 — Citations support explanation; they do not replace it

Do not write a finding that is only a list of references.

Bad:

> `FRD §6`, `BR-USER-001`, `Q3`

Good:

> The user deactivation behavior is not test-ready because the expected result after disabling an account is not defined. (Reference: `BR-USER-001` in `FRD §6`; audit question `Q3`.)

### Rule C7 — Make table prose cells readable

For table cells that summarize a finding, question, issue, recommendation, or impact, use this pattern:

`clear issue + short business/test impact + (Reference: ...)`

Code-only columns such as `ID`, `Ref`, `Code`, or `Source` may remain code-only. Prose columns must be self-contained.

### Rule C8 — Include a code glossary in full reports

For full audit, scenario, or test-case reports, include a code glossary near the top if the report uses codes or code prefixes.

Only list prefixes that actually appear in the report.

English heading:

```md
## Reference code glossary
```

Vietnamese heading:

```md
## Bảng mã viết tắt
```

Recommended columns:

| Code / Prefix | Meaning | Defined in |
|---|---|---|
| `CRULE-*` | Common rule | `docs/03-modules/common-rules.md` |
| `BR-*` | Module business rule | module FRD §6 |
| `R-*` | Project constraint or assumption | FRD §7 |
| `FR-*` | Functional requirement | requirement/backbone document |
| `FOQ-*` | Open question needing BA/product decision | FRD §10 |
| `Q\d+` | Audit question created by QC review | current report |
| `WCAG x.x.x` | Web accessibility criterion | WCAG standard |

### Rule C9 — Do not use bare ID lists in summaries

Summary, recommendation, conclusion, and testability outlook sections must not use bare ID-only phrasing.

Bad:

> Three High issues must be fixed: `Q1`, `Q2`, `Q13`.

Good:

> Three High issues must be fixed:
>
> - Password hashing is not finalized (`Q1`)
> - Cross-UC toast handoff is not documented (`Q2`)
> - UC and prototype disagree on password clearing after validation error (`Q13`)

### Rule C10 — Explain technical terms on first use

Explain technical or domain terms the first time they appear in a report.

Examples:

- WCAG levels
- KDF algorithms
- regex syntax
- HTML attributes
- authentication methods
- authorization models
- encryption and key-management terms
- audit logging terms

After the first explanation, the shorter term can be used.

### Rule C11 — Final readability pass

Before finalizing, rewrite sentences that are:

- too abstract
- too code-heavy
- too dependent on source context
- missing business or test impact
- using a code/citation instead of explanation
- hard for QC Lead, BA, or Tester to understand

---

## 3. Vietnamese rules

Apply this section only when the requested output language is **Vietnamese**.

### Rule VI0 — Preserve Vietnamese diacritics
All Vietnamese text written in any output file/report/plan... MUST be written in Vietnamese with diacritics. It MUST NOT be removed, standardized, or converted to ASCII.
- ✅ Correct: `"Đăng nhập hệ thống bằng tài khoản NĐT"`, `"Kiểm tra màn hình khởi tạo"`, `"Truy cập menu Báo cáo định kỳ 6 tháng ĐTRNN"`
- ❌ Wrong: `"Dang nhap he thong bang tai khoan NDT"`, `"Kiem tra man hinh khoi tao"`, `"Truy cap menu Bao cao dinh ky 6 thang DTRNN"`

### Rule VI1 — Write in Natural Vietnamese

Write as a business document for BAs/QCs/Testers, not a word-for-word translation from English.

Do not write:

> Hệ thống hiện thực hoá trạng thái người dùng trong ngữ cảnh tổ chức.

Write:

> Hệ thống cần xác định rõ trạng thái tài khoản của người dùng trong từng tổ chức để BA và Tester biết khi nào người dùng được phép đăng nhập, bị chặn, hoặc cần xử lý ngoại lệ.

### Rule VI2 — Restrictions on Mixing Vietnamese and English

Do not use a mix of Vietnamese and English if the English term is not an official product term.

Do not write:

> UC này trigger downstream flow để resolve org context.

Write:

> UC này kích hoạt luồng xử lý tiếp theo để xác định tổ chức mà người dùng đang thao tác.

If the English term is an official term, it can be kept as is, but an explanation must be provided the first time.

### Rule VI3 — Avoid Ambiguous Phrases

Do not use ambiguous phrases or phrases that sound like machine translations:

- “UC cổng”
- “UC xuôi dòng”
- “hiện thực hoá”
- “gắn ngữ cảnh tổ chức”
- “4x/5x cases”
- “system error exception”
- “luồng downstream”
- “context binding”
- “rule mapping bị hở”

Replace them with clear descriptions of the conditions, system behavior, results, and consequences of the test.

### Regulation VI4 — Explanation of Technical Terms in Vietnamese

Explanation of Technical Terms.

Do not write:

> Q10: chưa chốt WCAG 2.1 AA hay AAA.

Write:

> Mức độ tuân thủ tiêu chuẩn tiếp cận web (WCAG — Web Content Accessibility Guidelines) chưa được chốt: tài liệu chưa nói hệ thống cần đạt mức AA, là mức phổ biến cho phần mềm doanh nghiệp, hay mức AAA, là mức cao hơn và thường có nhiều ràng buộc hơn về tương phản, ngôn ngữ, và điều hướng. (Mã tham chiếu: câu hỏi `Q10`.)

### Rule VI5 — Write the meaning first, then the reference code

Do not begin a sentence with a code unless it is a code-only column.
Do not use quotations, source code, or links in place of explanations.

Do not write:

> `FOQ-ORGUSER-005 (Q1 High)` còn open: bcrypt cost? argon2id? scrypt? KMS provider?

Write:

> Thuật toán băm mật khẩu khi lưu vào cơ sở dữ liệu chưa được chốt: tài liệu chưa nói dùng bcrypt với cost factor bao nhiêu, argon2id, hay scrypt; nhà cung cấp KMS dùng để mã hoá audit log lúc nghỉ cũng chưa được xác định. (Mã tham chiếu: `FOQ-ORGUSER-005` trong `FRD §10`; câu hỏi audit `Q1`, priority High.)
