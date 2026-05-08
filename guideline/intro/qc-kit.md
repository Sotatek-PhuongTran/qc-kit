# QC-kit và lợi ích

## QC-kit là gì?

**QC-kit** là một bộ công cụ AI agentic được thiết kế chuyên biệt cho team **manual QC**. Nó không phải một ứng dụng cài-bấm-là-chạy, mà là một bộ tài sản (skills + rules + config + templates) được "nạp" vào một AI agentic tool (Claude Code, Antigravity, OpenAI Codex CLI...) để tool đó hiểu và thực hiện các tác vụ QC theo đúng quy trình team mong muốn.

```
[Tài liệu BA]            [QC-kit]                       [Output QC]
                            │
   UC specs       →     skills + rules     →     UC review report
   Wireframes     →     templates           →     Question backlog
   API specs      →     config              →     Test scenarios
   Common rules                                     Test cases (Excel)
```

QC-kit hiện hỗ trợ các tác vụ:

- Review tài liệu requirement (UC) và đánh giá Ready/Not Ready
- Tạo backlog câu hỏi gửi BA
- Thiết kế test scenarios theo kỹ thuật chuẩn (BVA, Equivalence Partitioning, Decision Tables)
- Sinh test cases hoàn chỉnh ở dạng Excel
- Update test cases khi requirement thay đổi

## Lợi ích

### 1. Tiết kiệm thời gian review UC

Thay vì đọc từng dòng requirement và mò gap thủ công, QC-kit tự đánh giá theo 5 trụ cột (Completeness, Clarity, Consistency, Testability, Traceability) trong vài phút.

### 2. Không bỏ sót gap

QC-kit phân tích Zero-Trust — coi mọi requirement là chưa đầy đủ — nên hay bắt được lỗi mà reviewer con người có thể bỏ qua: ngôn ngữ mơ hồ ("should", "fast"), term chưa định nghĩa, mâu thuẫn nội bộ, requirement không testable.

### 3. Scenarios và test cases đầy đủ kỹ thuật

Skill bắt buộc áp dụng:

- **Equivalence Partitioning** — không bundle valid/invalid input
- **Boundary Value Analysis** — test boundary, just-below, just-above
- **Decision Tables** — matrix-based cho multi-variable form

Một feature CRUD đầy đủ thường ra 20-50 scenario, gấp 3-5 lần khi viết tay.

### 4. Output chuẩn hóa qua template

Mọi output (UC review, scenarios, test cases) tuân theo template thống nhất → team review nhanh, dễ merge giữa các UC, dễ handover giữa member.

### 5. Version control kỷ luật

Mọi file output đều có version (`v1`, `v2`...). Không bao giờ overwrite. Khi requirement đổi, version mới ra đời, version cũ giữ nguyên làm history.

### 6. Apply nhanh cho dự án mới

Một dự án mới setup QC-kit chỉ tốn ~30 phút:

1. Copy folder `.claude/` vào dự án
2. Chạy `/qc-project-onboarding` — skill phỏng vấn 2 lượt và tự điền config
3. Bắt đầu dùng

### 7. AI hỗ trợ, không thay thế

QC-kit định vị AI là **drafter**, không phải decider:

- AI giúp scan, gợi ý, sinh boilerplate
- QC member là người **quyết định** Ready/Not Ready, ưu tiên test, xử lý edge case domain-specific

Không bao giờ blindly accept output AI — luôn review trước khi handover.

---

**Tiếp theo:** [AI Agentic là gì?](ai-agentic.md)
