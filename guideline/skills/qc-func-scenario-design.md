# Skill: `qc-func-scenario-design`

Thiết kế test scenarios từ tài liệu UC đã review xong (Ready).

## 🎯 Mục đích

Sinh ra **`test_scenarios.md`** — danh sách test scenarios gom theo UC, cover toàn bộ test type cho web/API:

- Functional Testing
- Integration Testing
- UI Testing
- Functional/End-to-End (E2E) Testing
- Acceptance Testing

## 🔔 Khi nào dùng

- UC đã đạt Ready từ qc-uc-read
- BA đã trả lời mọi gap question
- Trước khi sinh test cases (Excel)

## 🗣️ Câu lệnh trigger

- `design test scenarios cho UC-XXX`
- `build test scenarios`
- "Requirement đã ready, generate scenarios giúp tôi"

## 📥 Input cần chuẩn bị

| Loại file | Bắt buộc |
|---|---|
| UC requirement document (`.md` / `.docx` / `.pdf`) | ✅ |
| `uc-review-report` (highest version) | Khuyến nghị |
| Wireframes / API specs / design docs | Khuyến nghị |

## 📤 Output sinh ra

| File | Vị trí |
|---|---|
| `<UC-ID>_<feature>_scenarios_<YYYYMMDD>.md` | `docs/QC/test-scenarios/functional-test/<UC-ID>/` |

## 📝 Cấu trúc 1 scenario

```markdown
### Scenario ID: TS_UC-101_001
**Scenario Title:** Login với credentials hợp lệ
**UC Reference:** UC-101 — User Login
**Req-ID:** UC-101-FR-003
**Test Type:** Functional
**Description:** Verify user đăng nhập thành công với username và password đúng
**Test Focus:** Happy path
```

## 🔥 Test Design Techniques BẮT BUỘC

Skill **bắt buộc** áp dụng 3 kỹ thuật để cover edge case:

### 1. Equivalence Partitioning (EP)
- KHÔNG bundle valid và invalid input vào 1 scenario
- Tách compound rule thành các scenario rời (positive/negative)
- VD: nếu cho phép `.png`, `.jpg`, `.svg` — phải có scenario riêng cho từng extension valid + scenario riêng cho từng extension invalid (`.pdf`, `.txt`)

### 2. Boundary Value Analysis (BVA)
- Mọi field có giới hạn (max 255 chars, max 1MB...) → test 3 điểm: **Limit**, **Limit-1**, **Limit+1**
- VD: limit 255 chars → test 1 char, 255 chars, 256 chars
- VD: limit 1MB → test 1.00MB exact, và 1.01MB

### 3. Decision Tables / Combinatorics
- Form nhiều biến / nhiều filter → matrix-based test
- KHÔNG test 1 filter cô lập nếu nhiều filter có thể tương tác
- VD: `Filter A (Valid) + Filter B (Valid)`, `Filter A (Valid) + Filter C (Invalid)`...

💡 Áp đúng 3 kỹ thuật này thường scale lên **20-50 scenario** cho 1 feature CRUD đầy đủ.

## 🎯 Coverage Rules

Mỗi UC phải có scenario cho các area sau (nếu có):

| Coverage Area | Source trong UC |
|---|---|
| Happy path (main flow) | Main Flow section |
| Alternative flows | Alternative Flows section |
| Error / exception flows | Exception & Error Flows section |
| Business rules / validation | Business Rules section |
| Boundary value cases | Field có min/max/format constraint |
| Role / permission variations | Actors & User Roles |
| UI state transitions | UI/UX Behaviour section |
| API contract | API / Integration Behaviour section |
| Acceptance criteria | Acceptance Criteria section |

## ⚠️ Lưu ý quan trọng

| Quy tắc | Giải thích |
|---|---|
| **CHỈ functional/integration/UI/E2E/acceptance** | KHÔNG cover performance / security / load |
| Mọi scenario phải traceable | Phải có UC Reference + Req-ID |
| Test data phải realistic | Không dùng placeholder trừu tượng |
| Out-of-scope flags | NFR (performance, security, load) → ghi vào section "Out-of-Scope Flags" cuối file |

## ⚙️ Lỗi thường gặp & cách xử lý

| Triệu chứng | Xử lý |
|---|---|
| Số scenario quá ít | Verify đã apply BVA + EP + Decision Table cho mọi field; review gap |
| Scenario bị duplicate | Skill có self-review; nếu vẫn duplicate, có thể UC mô tả trùng → check requirement |
| Output báo "Out-of-Scope" cho nhiều thứ | Đúng — performance/security cần skill chuyên dụng (chưa có trong v1) |
| UC không có UC-ID rõ ràng | Skill sẽ infer từ tên feature và note rõ |

## 🔗 Liên quan

- **Trước skill này:** [qc-uc-read](qc-uc-read.md) — UC phải Ready
- **Sau skill này:** [qc-func-tc-design](qc-func-tc-design.md) — sinh test cases từ scenarios
- **Đọc thêm chi tiết:** [.claude/skills/qc-func-scenario-design/SKILL.md](../../.claude/skills/qc-func-scenario-design/SKILL.md)
