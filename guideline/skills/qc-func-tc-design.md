# Skill: `qc-func-tc-design`

Thiết kế test cases hoàn chỉnh từ UC đã review và scenarios đã design.

## 🎯 Mục đích

Sinh ra bộ test cases (Excel + markdown draft + summary) từ UC requirement và scenarios. Cover web app cho:

- Functional Testing
- UI Testing
- Functional/End-to-End (E2E) Testing

Tester sẽ dùng file Excel để execute test thủ công.

## 🔔 Khi nào dùng

- Sau khi đã có scenarios từ qc-func-scenario-design (khuyến nghị)
- Khi requirement đổi → cần update test cases hiện có

## 🗣️ Câu lệnh trigger

- **Tạo mới**: `generate test cases cho UC-XXX`
- **Update**: `update test cases cho UC-XXX`

Skill có 2 workflow:
- `generate-test-cases` — tạo từ đầu
- `update-test-cases` — sửa file test cases đã có

Nếu bạn không nói rõ, skill sẽ hỏi: _"Do you want to **generate-test-cases** or **update-test-cases**?"_

## 📥 Input cần chuẩn bị

### Cho workflow `generate-test-cases`

| File | Bắt buộc |
|---|---|
| `uc-review-report` (highest version) | ✅ |
| `func-test-scenarios` (highest version) | Khuyến nghị |
| `requirement-common-files` | ✅ |

### Cho workflow `update-test-cases`

| File | Bắt buộc |
|---|---|
| `func-test-cases` (file Excel hiện có) | ✅ |
| `uc-review-report` (highest version) | ✅ |
| `func-test-scenarios` (highest version) | Khuyến nghị |
| `requirement-common-files` | ✅ |

## 📤 Output sinh ra

| File | Vị trí | Mô tả |
|---|---|---|
| `<UC-ID>_<feature>_testcases_<YYYYMMDD>_v<N>.xlsx` | `docs/QC/test-cases/functional-test/<UC-ID>/` | Test cases hoàn chỉnh — file chính cho QA execute |
| `<UC-ID>_<feature>_testcases_draft.md` | (cùng folder) | Bản nháp markdown để review nhanh |
| `<UC-ID>_<feature>_testcases_summary_<YYYYMMDD>_v<N>.md` | (cùng folder) | Tóm tắt sau design |

## 🧠 Mindset của skill

Skill được prompt như một **Senior Tester / Strategic Architect of Quality**:

- **Risk-Based**: đánh giá theo business impact (Blocker / Major / Minor)
- **Shift-Left**: phát hiện gap logic trước khi gợi ý test
- **"What-If" Engine**: hỏi "Nếu user làm X / Y / Z thì sao?"
- **Skeptical**: không assume requirement đầy đủ
- **Domain-Driven**: prioritize theo domain (Crypto: security; Cooking app: UX & data sync)

## 🛠️ Test Design Techniques áp dụng

| Technique | Mô tả ngắn |
|---|---|
| **Equivalence Partitioning** | Chia input space thành valid/invalid partition; test 1 case mỗi partition |
| **Boundary Value Analysis** | Test boundary, just-below, just-above cho mọi numeric/date/length |
| **Decision Table Testing** | Map condition combination → expected outcome cho complex business rule |
| **State Transition Testing** | Map state, event, transition; test mọi valid + invalid transition |
| **Use Case Testing** | Derive scenario từ UC flow (main, alternative, exception) |
| **Error Guessing** | Áp domain experience để dự đoán defect-prone area |

## 🎯 Coverage Categories

| Category | Mô tả |
|---|---|
| **Happy Path** | Flow normal, valid input |
| **Alternative Path** | Flow valid nhưng non-standard |
| **Exception / Edge Cases** | Error handling, boundary, invalid input, null/empty/overflow |
| **GUI Scenarios** | UI layout, responsiveness, visual, field validation, accessibility |
| **Functional Scenarios** | Business logic, data processing, integration, calculation, state transition |

## 📝 Ví dụ prompt thực tế

**Tạo test cases mới:**
```
generate test cases cho UC-101
```

**Update test cases khi requirement đổi:**
```
update test cases cho UC-101
```

**Tạo nhưng chưa có scenarios:**
```
generate test cases cho UC-101 (chưa có scenarios)
```
→ Skill sẽ chỉ dùng uc-review-report, có thể chất lượng thấp hơn — khuyến nghị có scenarios trước.

## ⚠️ Lưu ý quan trọng

| Quy tắc | Giải thích |
|---|---|
| **Out of scope**: performance, load, security | KHÔNG generate test cho NFR — note vào "Out-of-scope items" |
| Mọi test case phải **atomic** | Chạy độc lập, không phụ thuộc kết quả test khác |
| Mọi test case phải **trace** về UC | Có UC reference rõ ràng |
| Test data **realistic** | Không dùng placeholder trừu tượng |
| Sửa Testcase template = phải sync skill | Xem [structure/templates.md](../structure/templates.md) — chạy prompt sync |

## ⚙️ Lỗi thường gặp & cách xử lý

| Triệu chứng | Xử lý |
|---|---|
| Skill hỏi workflow | Trả lời `generate-test-cases` hoặc `update-test-cases` |
| Không tìm thấy test cases để update | Cung cấp đường dẫn tay khi skill hỏi |
| Output Excel format sai sau khi sửa template | Chạy prompt sync template — xem [structure/templates.md](../structure/templates.md) |
| Số test case quá ít | Có thể UC quá ngắn hoặc scenarios chưa đủ — review lại Phase trước |
| Test cases quá generic | Verify đã đủ business rule trong UC; có thể cần re-audit |

## 🔗 Liên quan

- **Trước skill này:** [qc-func-scenario-design](qc-func-scenario-design.md) — sinh scenarios trước
- **Sửa template Excel:** xem [Templates](../structure/templates.md) — quan trọng có prompt sync
- **Đọc thêm chi tiết:** [.claude/skills/qc-func-tc-design/SKILL.md](../../.claude/skills/qc-func-tc-design/SKILL.md)
