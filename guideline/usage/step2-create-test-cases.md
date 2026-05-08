# Step 2 — Create test cases

Step 2 chạy **sau khi UC đã Ready** ở Step 1. Bạn dùng 2 skill liên tiếp:

1. `qc-func-scenario-design` — sinh test scenarios
2. `qc-func-tc-design` (workflow `generate-test-cases`) — sinh test cases Excel

> 👤 **Ai chạy:** QC Member
> ⏱️ **Thời gian:** ~15-30 phút mỗi UC

## Quy trình tổng quan

```
UC Ready
   ↓
QC Member: design test scenarios cho UC-XXX
   ↓
qc-func-scenario-design sinh: scenarios.md
   ↓
QC Member: generate test cases cho UC-XXX
   ↓
qc-func-tc-design sinh: testcases.xlsx + draft.md + summary.md
```

---

## 2.1 — Sinh test scenarios

### Trigger

```
design test scenarios cho UC-101
```

Hoặc các phrase tương đương:
- `build test scenarios cho UC-101`
- `requirement UC-101 đã ready, generate scenarios`

### Input skill đọc

- `uc-review-report` của UC-101 (highest version) — bắt buộc
- File requirement gốc trong `docs/BA/UC-101/`
- (Tùy chọn) Wireframes, API specs, design docs

### Output

```
docs/QC/test-scenarios/functional-test/UC-101/
└── UC-101_user-login_scenarios_20260508.md
```

### Cấu trúc 1 scenario

```markdown
### Scenario ID: TS_UC-101_001
**Scenario Title:** Login với credentials hợp lệ
**UC Reference:** UC-101 — User Login
**Req-ID:** UC-101-FR-003
**Test Type:** Functional
**Description:** Verify user đăng nhập thành công với username và password đúng
**Test Focus:** Happy path
```

### 🔥 3 kỹ thuật BẮT BUỘC

Skill sẽ tự áp dụng để cover edge case toàn diện:

#### Equivalence Partitioning (EP)

- **Không bundle** valid và invalid input vào 1 scenario
- Tách compound rule thành scenario rời (positive/negative)
- Ví dụ: cho phép `.png`, `.jpg`, `.svg` → 3 scenario valid riêng + scenario riêng cho từng extension invalid

#### Boundary Value Analysis (BVA)

- Mọi field có giới hạn → test 3 điểm: **Limit**, **Limit-1**, **Limit+1**
- Ví dụ: max 255 chars → test 1 char, 255 chars, 256 chars
- Ví dụ: max 1MB → test 1.00MB exact, 1.01MB

#### Decision Tables / Combinatorics

- Form nhiều biến / nhiều filter → matrix-based test
- Không test 1 filter cô lập nếu nhiều filter có thể tương tác
- Ví dụ: `Filter A (Valid) + Filter B (Valid)`, `Filter A (Valid) + Filter C (Invalid)`...

💡 Áp đúng 3 kỹ thuật → 1 feature CRUD đầy đủ thường ra **20-50 scenario**.

### Coverage Areas

Skill cover các area sau (nếu có trong UC):

| Area | Source |
|---|---|
| Happy path (main flow) | Main Flow section |
| Alternative flows | Alternative Flows section |
| Error / exception flows | Exception & Error Flows section |
| Business rules | Business Rules section |
| Boundary value cases | Field có min/max/format |
| Role / permission variations | Actors & User Roles |
| UI state transitions | UI/UX Behaviour section |
| API contract | API / Integration section |
| Acceptance criteria | Acceptance Criteria section |

### Scope

✅ **CÓ trong v1:**
- Functional Testing
- Integration Testing
- UI Testing
- End-to-End (E2E) Testing
- Acceptance Testing

❌ **KHÔNG có trong v1:**
- Performance Testing
- Security Testing (ngoài auth checks cơ bản)
- Load Testing

Nếu phát hiện scenario thuộc NFR, skill sẽ ghi vào section `## ⚠️ Out-of-Scope Flags` ở cuối file thay vì sinh scenario.

---

## 2.2 — Sinh test cases (Excel)

### Trigger

```
generate test cases cho UC-101
```

### Skill hỏi workflow

`qc-func-tc-design` có 2 workflow:

- `generate-test-cases` — tạo từ đầu (Step 2 này)
- `update-test-cases` — sửa file đã có (xem [Step 3](step3-update-test-cases.md))

Nếu bạn không nói rõ, skill sẽ hỏi:

> _"Do you want to **generate-test-cases** or **update-test-cases**?"_

Trả lời `generate-test-cases`.

### Input skill đọc

- `uc-review-report` (highest version) — bắt buộc
- `func-test-scenarios` (highest version) — khuyến nghị
- `requirement-common-files` — bắt buộc

### Output (3 file)

```
docs/QC/test-cases/functional-test/UC-101/
├── UC-101_user-login_testcases_20260510_v1.xlsx           ← File chính cho QA execute
├── UC-101_user-login_testcases_draft.md                   ← Draft markdown để review nhanh
└── UC-101_user-login_testcases_summary_20260510_v1.md     ← Summary sau design
```

### Mindset của skill

Skill được prompt như **Senior Tester / Strategic Architect of Quality**:

- **Risk-Based**: đánh giá theo business impact (Blocker / Major / Minor)
- **Shift-Left**: phát hiện gap logic trước khi sinh test
- **"What-If" Engine**: hỏi "Nếu user làm X / Y / Z thì sao?"
- **Skeptical**: không assume requirement đầy đủ
- **Domain-Driven**: prioritize theo domain (Crypto: security; Cooking app: UX & data sync)

### Test Design Techniques áp dụng

Skill áp các kỹ thuật **systematically**, không intuitively:

| Technique | Mô tả |
|---|---|
| Equivalence Partitioning | Chia input space; test 1 case mỗi partition |
| Boundary Value Analysis | Test boundary, just-below, just-above |
| Decision Table Testing | Map condition combination → expected outcome |
| State Transition Testing | Test mọi valid + invalid transition |
| Use Case Testing | Derive scenario từ UC flow |
| Error Guessing | Áp domain experience để dự đoán defect-prone area |

### Coverage Categories

| Category | Mô tả |
|---|---|
| Happy Path | Flow normal, valid input |
| Alternative Path | Flow valid nhưng non-standard |
| Exception / Edge Cases | Error handling, boundary, invalid input, null/empty/overflow |
| GUI Scenarios | UI layout, responsiveness, visual, field validation |
| Functional Scenarios | Business logic, data processing, integration, calculation |

---

## 2.3 — Review test cases trước khi handover

⚠️ AI là **drafter**, bạn là **decider**. Trước khi đưa file Excel cho QA execute:

### Checklist review

- [ ] Mọi test case có **UC reference + Req-ID** rõ ràng (traceable)
- [ ] Test data **realistic** (không placeholder trừu tượng kiểu `<value>`, `xxx`)
- [ ] Pre-conditions đủ chi tiết để tester setup độc lập
- [ ] Expected results **observable + verifiable** (không vague kiểu "works correctly")
- [ ] API test có request + response rõ ràng (nếu áp dụng)
- [ ] E2E test trace full journey từ start đến finish
- [ ] Test cases **atomic** — chạy độc lập, không phụ thuộc kết quả test khác
- [ ] Out-of-scope items được note vào summary (nếu có)

### Nếu phát hiện vấn đề

| Vấn đề | Xử lý |
|---|---|
| Số test case quá ít | Verify scenarios có đủ chưa; có thể chạy lại với scenarios chi tiết hơn |
| Test cases generic, thiếu domain context | Verify project-config có Domain rõ; có thể cần re-audit UC |
| Excel format sai sau khi sửa template | Chạy prompt sync template (xem mục dưới) |
| Test cases trùng lặp | Skill có self-review; nếu vẫn trùng → có thể UC mô tả trùng |

---

## 2.4 — Khi nào sửa Testcase template?

Nếu team bạn có quy ước Excel khác (vd thêm cột `Risk Level`, `Sprint`, `Automation Status`):

1. Sửa file `.claude/skills/qc-func-tc-design/templates/Testcase_template.xlsx`
2. **BẮT BUỘC** chạy prompt sync sau:

```
Tôi đã update test cases template, hãy check template hiện tại và đề xuất
các nội dung cần sửa trong skill và script
```

3. Apply các thay đổi skill đề xuất
4. Test bằng cách generate test cases cho 1 UC mẫu, verify output Excel đúng format

⚠️ Không sync skill → output Excel sẽ sai format hoặc thiếu cột.

---

## 2.5 — Sau Step 2

Test cases đã sẵn sàng. Bạn có thể:

- Gửi file `_testcases_*.xlsx` cho QA team execute
- Track progress execute trong Jira / TestRail / công cụ team dùng
- Khi requirement đổi → quay lại [Step 3 — Update test cases](step3-update-test-cases.md)

---

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Skill hỏi chọn workflow | Trả lời `generate-test-cases` |
| Output không có scenarios | Bạn skip 2.1 — chạy 2.1 trước rồi 2.2 |
| Test case quá generic | Verify project-config có Domain rõ; verify scenarios có đủ chi tiết |
| Số test case quá ít | Có thể UC quá ngắn — re-audit UC |
| Excel mở báo lỗi format | Verify Testcase template chưa bị corrupt |

---

## Tham khảo skill

- SKILL.md scenarios: [.claude/skills/qc-func-scenario-design/SKILL.md](../../.claude/skills/qc-func-scenario-design/SKILL.md)
- SKILL.md test cases: [.claude/skills/qc-func-tc-design/SKILL.md](../../.claude/skills/qc-func-tc-design/SKILL.md)
- Template Excel: [.claude/skills/qc-func-tc-design/templates/Testcase_template.xlsx](../../.claude/skills/qc-func-tc-design/templates/Testcase_template.xlsx)

---

**Tiếp theo:** [Step 3 — Update test cases](step3-update-test-cases.md)
