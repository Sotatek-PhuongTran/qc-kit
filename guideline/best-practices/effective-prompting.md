# Viết prompt hiệu quả

Prompt là cách bạn "ra lệnh" cho AI. Prompt tốt → output chính xác. Prompt mơ hồ → AI đoán → output sai hoặc miss.

## 4 nguyên tắc viết prompt tốt

### 1. Cụ thể — chỉ rõ skill + đối tượng

❌ **Mơ hồ:**
> "review hộ tôi cái này"

❌ **Vẫn mơ hồ:**
> "review UC giúp tôi"

✅ **Cụ thể:**
> "review uc UC-101"

✅ **Cực kỳ cụ thể:**
> "review uc UC-101 trong docs/BA/UC-101-user-login/, đặc biệt focus vào business rule ở section 8"

### 2. Reference file rõ ràng

Nếu AI cần đọc file cụ thể, link rõ:

✅ Tốt:
> "design test scenarios cho UC-101, dựa vào uc-review-report v3 mới nhất ở docs/QC/uc-read/UC-101/"

✅ Tốt hơn (drag-drop file vào panel):
> "design test scenarios cho UC-101 — file requirement đính kèm"

### 3. Dùng trigger phrase chuẩn

Mỗi skill có trigger phrase chuẩn — dùng đúng để AI nhận diện skill ngay:

| Skill | Trigger chuẩn |
|---|---|
| qc-project-onboarding | `/qc-project-onboarding` (slash command) |
| qc-uc-read | `review uc UC-XXX` / `review requirement` |
| qc-func-scenario-design | `design test scenarios` / `build test scenarios` |
| qc-func-tc-design | `generate test cases` / `update test cases` |

❌ Tránh:
- "audit cái UC này"
- "viết scenarios cho UC-101"
- "tạo Excel test"

✅ Dùng:
- "review uc UC-101"
- "design test scenarios cho UC-101"
- "generate test cases cho UC-101"

### 4. Khi không chắc — hỏi AI trước khi trigger

Nếu bạn chưa biết skill nào phù hợp:

```
Tôi có UC-101 và scenarios đã có. Skill nào phù hợp để sinh test cases Excel?
```

AI trả lời → bạn trigger skill đúng. Không tốn token chạy nhầm skill.

---

## Pattern prompt theo task

### Pattern 1 — Trigger skill đơn giản

```
<trigger phrase> <object>
```

Ví dụ:
- `review uc UC-101`
- `design test scenarios cho UC-201`
- `generate test cases cho UC-101`

### Pattern 2 — Trigger với context bổ sung

```
<trigger phrase> <object>
Context: <thông tin bổ sung>
```

Ví dụ:
```
review uc UC-101
Context: BA mới update version 3, đặc biệt phần payment flow ở section 5
```

### Pattern 3 — Trigger với constraint

```
<trigger phrase> <object>
Yêu cầu: <constraint>
```

Ví dụ:
```
generate test cases cho UC-101
Yêu cầu: tối thiểu 30 test case, cover đủ BVA cho field password (max 64 chars)
```

### Pattern 4 — Trigger với file cụ thể

```
<trigger phrase> dựa vào <file>
```

Ví dụ:
```
design test scenarios dựa vào uc-review-report mới nhất ở docs/QC/uc-read/UC-101/
```

---

## Prompt cho re-audit / update

### Re-audit sau khi BA trả lời backlog

```
review uc UC-101
```

Skill tự nhận diện re-audit (vì có file cũ + backlog `Answered`). Bạn không cần nói "re-audit".

Nếu skill nhầm sang first-audit:

```
review uc UC-101 — đây là re-audit sau khi BA đã trả lời backlog
```

### Update test cases

```
update test cases cho UC-101
```

Hoặc cụ thể hơn:

```
update test cases cho UC-101 sau khi requirement đổi version 3
File test cases hiện có: docs/QC/test-cases/functional-test/UC-101/UC-101_user-login_testcases_20260510_v1.xlsx
```

---

## Prompt cho task không phải skill

Đôi khi bạn cần làm task không thuộc skill nào — vẫn có thể prompt AI. Ví dụ:

### Tóm tắt UC

```
Đọc UC-101 spec và tóm tắt main flow + 3 business rule quan trọng nhất trong 5 dòng
```

### So sánh 2 UC

```
So sánh UC-101 và UC-102 — chỉ ra điểm khác biệt về flow đăng nhập
```

### Kiểm tra naming convention

```
List các file trong docs/QC/ và kiểm tra có tuân theo naming convention
ở .claude/rules/naming-convention.md không
```

### Sync template

```
Tôi đã update test cases template, hãy check template hiện tại và đề xuất
các nội dung cần sửa trong skill và script
```

---

## Anti-pattern — đừng làm

### ❌ Prompt quá nhiều task trong 1 lệnh

```
Review UC-101, sinh scenarios, tạo test cases, update path-registry, gửi BA backlog
```

→ AI sẽ confused, làm half-half hoặc skip.

✅ Tách thành nhiều prompt, mỗi prompt 1 task.

### ❌ Prompt thiếu UC-ID

```
Review hộ tôi cái UC mới nhất trong folder
```

→ AI không biết UC nào.

✅ Cung cấp UC-ID rõ ràng.

### ❌ Yêu cầu AI làm việc của QC

```
Decide xem UC này nên Ready hay Not Ready
```

→ AI có thể đưa verdict, nhưng quyết định cuối cùng là của QC. Đừng abdicate trách nhiệm.

✅ "Review UC-101 và đưa verdict đề xuất + lý do, tôi sẽ confirm"

### ❌ Prompt fabricate

```
Generate test cases cho UC-101 — tự fill data ví dụ nếu chưa có trong requirement
```

→ AI sẽ bịa test data, có thể sai business rule.

✅ Đưa test data thật trong common-rules hoặc UC.

---

## Tip: dùng "thinking" mode khi cần

Một số AI tool (Claude Code, Antigravity) hỗ trợ "extended thinking". Khi task phức tạp:

```
think about this carefully:
review uc UC-101 và identify TOP 3 business critical gap, mỗi gap kèm
impact analysis nếu không xử lý
```

→ AI dành nhiều "compute time" hơn trước khi trả lời. Tốt cho task phán đoán phức tạp.

⚠️ Tốn nhiều token hơn — chỉ dùng khi cần.

---

## Tip: prompt theo ngôn ngữ phù hợp

- Prompt bằng **tiếng Việt** nếu output cần tiếng Việt
- Prompt bằng **tiếng Anh** nếu input/output là English
- Tránh trộn 2 ngôn ngữ trong 1 prompt — AI dễ confused

Ví dụ output VN:
```
review uc UC-101 và đưa verdict
```

Ví dụ output EN:
```
review uc UC-201 (English requirement) and provide verdict
```

---

## Tip: lưu lại các prompt hay dùng

Tạo file `docs/QC/prompts.md` (hoặc Confluence page) để lưu các prompt template hay dùng:

```markdown
# QC-kit Prompts thường dùng

## Review UC
review uc UC-XXX

## Re-audit sau khi BA trả lời
review uc UC-XXX

## Sinh scenarios
design test scenarios cho UC-XXX

## Sinh test cases mới
generate test cases cho UC-XXX

## Update test cases
update test cases cho UC-XXX

## Sync test case template
Tôi đã update test cases template, hãy check template hiện tại và đề xuất
các nội dung cần sửa trong skill và script
```

→ Member mới onboard nhanh hơn, prompt nhất quán giữa team.

---

**Tiếp theo:** [Khi nào tin AI, khi nào review tay](trust-ai.md)
