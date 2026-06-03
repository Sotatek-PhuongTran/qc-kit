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

### Quy định VI1 — Viết tiếng Việt tự nhiên

Viết như tài liệu nghiệp vụ cho BA/QC/Tester, không viết như bản dịch từng chữ từ tiếng Anh.

Không nên viết:

> Hệ thống hiện thực hoá trạng thái người dùng trong ngữ cảnh tổ chức.

Nên viết:

> Hệ thống cần xác định rõ trạng thái tài khoản của người dùng trong từng tổ chức để BA và Tester biết khi nào người dùng được phép đăng nhập, bị chặn, hoặc cần xử lý ngoại lệ.

### Quy định VI2 — Hạn chế pha Việt-Anh

Không dùng nửa Việt nửa Anh nếu thuật ngữ tiếng Anh không phải official product term.

Không nên viết:

> UC này trigger downstream flow để resolve org context.

Nên viết:

> UC này kích hoạt luồng xử lý tiếp theo để xác định tổ chức mà người dùng đang thao tác.

Nếu thuật ngữ tiếng Anh là official term, có thể giữ nguyên nhưng phải giải thích ở lần đầu.

### Quy định VI3 — Tránh cụm mơ hồ

Không dùng các cụm mơ hồ hoặc nghe như dịch máy:

- “UC cổng”
- “UC xuôi dòng”
- “hiện thực hoá”
- “gắn ngữ cảnh tổ chức”
- “4x/5x cases”
- “system error exception”
- “luồng downstream”
- “context binding”
- “rule mapping bị hở”

Hãy thay bằng mô tả rõ về điều kiện, hành vi hệ thống, kết quả, và hệ quả kiểm thử.

### Quy định VI4 — Giải thích thuật ngữ kỹ thuật bằng tiếng Việt

Giải thích thuật ngữ kỹ thuật ở lần đầu xuất hiện.

Không nên viết:

> Q10: chưa chốt WCAG 2.1 AA hay AAA.

Nên viết:

> Mức độ tuân thủ tiêu chuẩn tiếp cận web (WCAG — Web Content Accessibility Guidelines) chưa được chốt: tài liệu chưa nói hệ thống cần đạt mức AA, là mức phổ biến cho phần mềm doanh nghiệp, hay mức AAA, là mức cao hơn và thường có nhiều ràng buộc hơn về tương phản, ngôn ngữ, và điều hướng. (Mã tham chiếu: câu hỏi `Q10`.)

### Quy định VI5 — Viết ý nghĩa trước, mã tham chiếu sau

Không mở đầu câu bằng mã nếu đó không phải cột code-only.

Không nên viết:

> `FOQ-ORGUSER-005 (Q1 High)` còn open: bcrypt cost? argon2id? scrypt? KMS provider?

Nên viết:

> Thuật toán băm mật khẩu khi lưu vào cơ sở dữ liệu chưa được chốt: tài liệu chưa nói dùng bcrypt với cost factor bao nhiêu, argon2id, hay scrypt; nhà cung cấp KMS dùng để mã hoá audit log lúc nghỉ cũng chưa được xác định. (Mã tham chiếu: `FOQ-ORGUSER-005` trong `FRD §10`; câu hỏi audit `Q1`, priority High.)

### Quy định VI6 — Citation đứng sau câu hoàn chỉnh

Không dùng citation, mã nguồn, hoặc anchor thay cho phần giải thích.

Không nên viết:

> Theo `FRD §6`, `BR-USER-001`.

Nên viết:

> Quy tắc vô hiệu hoá tài khoản chưa đủ rõ để thiết kế test case vì tài liệu chưa nói người dùng bị chặn đăng nhập ngay lập tức hay chỉ bị chặn sau phiên hiện tại. (Mã tham chiếu: `BR-USER-001` trong `FRD §6`.)

### Quy định VI7 — Ô bảng tiếng Việt phải tự hiểu được

Với ô bảng mô tả vấn đề, câu hỏi, phát hiện, khuyến nghị, hoặc hệ quả, dùng công thức:

`nội dung dễ hiểu + hệ quả nghiệp vụ/kiểm thử ngắn + (Mã tham chiếu: ...)`

Cột `ID`, `Ref`, `Code`, hoặc `Source` có thể chỉ chứa mã. Cột diễn giải phải viết đủ nghĩa.

### Quy định VI8 — Không liệt kê ID trần trong phần tóm tắt

Không nên viết:

> 3 vấn đề High cần fix: `Q1`, `Q2`, `Q13`.

Nên viết:

> 3 vấn đề High cần fix:
>
> - Password hashing chưa chốt (`Q1`)
> - Cross-UC toast handoff contract chưa được document (`Q2`)
> - UC và prototype đang bất đồng về việc xoá mật khẩu sau validation error (`Q13`)

### Quy định VI9 — Rà lại câu tiếng Việt trước khi finalize

Trước khi finalize, sửa các câu:

- nghe như dịch máy
- quá trừu tượng
- quá nhiều mã nhưng thiếu ý nghĩa nghiệp vụ
- pha Việt-Anh không cần thiết
- thiếu chủ thể hoặc điều kiện
- không rõ hệ thống làm gì
- không rõ hệ quả nghiệp vụ hoặc hệ quả kiểm thử