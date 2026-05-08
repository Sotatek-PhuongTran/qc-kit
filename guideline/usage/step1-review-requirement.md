# Step 1 — Review requirement

Step 1 là bước **chạy mỗi khi có UC mới**. Bạn dùng skill `qc-uc-read` để đánh giá UC đã sẵn sàng cho test design hay chưa, và (nếu có gap) dùng `qc-qna` để đặt câu hỏi cho BA.

> 👤 **Ai chạy:** QC Member
> ⏱️ **Thời gian:** ~5-15 phút mỗi UC

## Quy trình tổng quan

```
BA viết requirement → docs/BA/<UC-ID>/
        ↓
QC Member: review uc <UC-ID>
        ↓
qc-uc-read sinh: uc-review-report + (nếu có gap) question-backlog
        ↓ (nếu có gap)
qc-qna format backlog → BA trả lời
        ↓
QC Member: review uc <UC-ID> (re-audit)
        ↓
UC đạt Ready → sang Step 2
```

---

## 1.1 — Chuẩn bị input

Trước khi chạy, đảm bảo:

- [ ] BA đã đặt requirement vào `docs/BA/<UC-ID-Report-name>/`
- [ ] File `docs/BA/Common rules/` có common rules (nếu áp dụng cho UC này)
- [ ] Format file: ưu tiên `.md`, fallback `.docx` / `.pdf`

Ví dụ cấu trúc input cho UC-101:

```
docs/BA/UC-101-user-login/
├── UC-101-spec.md           ← Spec chính
├── wireframes.png           ← Mockup UI
└── api-spec.md              ← Contract API
```

---

## 1.2 — Trigger qc-uc-read

Trong AI tool, gõ:

```
review uc UC-101
```

Hoặc các phrase tương đương:
- `review requirement UC-101`
- `audit requirement UC-101`

### Skill tự nhận diện workflow

`qc-uc-read` có 2 workflow:

| Workflow | Khi nào |
|---|---|
| **First audit** | Lần đầu review UC (chưa có file `uc-review-report` cũ) |
| **Re-audit** | Đã có report cũ + BA đã trả lời question backlog |

Skill kiểm tra folder `docs/QC/uc-read/<UC-ID>/`:
- Không có file → First audit
- Có file + question backlog tất cả `Answered` → Re-audit
- Có file nhưng còn câu chưa trả lời → skill yêu cầu trả lời backlog trước

---

## 1.3 — Hiểu output qc-uc-read

Output sinh tại `docs/QC/uc-read/<UC-ID>/`:

```
docs/QC/uc-read/UC-101/
├── UC-101_user-login_audited_20260508_v1.md         ← UC review report
└── UC-101_user-login_question-backlog_20260508_v1.md ← Backlog (nếu có gap)
```

### UC review report gồm

| Section | Nội dung |
|---|---|
| **Feature Brief** | Tóm tắt UC trong vài câu |
| **Readiness Verdict** | Ready / Not Ready + Score 0-100% |
| **Document Metadata** | UC-ID, version, author, dates |
| **Objective & Scope** | Trong/ngoài phạm vi |
| **Actors & Stakeholders** | Bảng vai trò |
| **Preconditions & Postconditions** | Điều kiện trước/sau |
| **UI Object Inventory** | Bảng UI components |
| **Object Attributes & Behavior** | Chi tiết hành vi từng object |
| **Unified Gap & Question Report** | Bảng gap + câu hỏi cần BA trả lời |
| ... | |

### Readiness verdict

- **Ready (≥ 85%)** — UC đủ chất lượng để chạy Step 2 (test design)
- **Not Ready (< 85%)** — cần BA trả lời gap question trước

### 5 trụ cột audit

Skill đánh giá theo 5 pillar:

1. **Completeness** — đủ requirement chưa
2. **Clarity** — ngôn ngữ rõ ràng chưa
3. **Consistency** — có mâu thuẫn nội bộ không
4. **Testability** — có test được không
5. **Traceability** — trace về business objective được không

---

## 1.4 — Nếu Not Ready: gửi backlog cho BA

Khi UC chưa Ready, skill `qc-qna` tự động trigger để format backlog. Bảng backlog có format:

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | High | UC-101 §3.2 | Validation rule cho password phức tạp ra sao? | Ảnh hưởng test boundary | Open |
| Q2 | Medium | Common §1.5 | Mã lỗi `E_AUTH_001` trả message gì? | Cần verify error flow | Open |

### Cách gửi BA

1. Lấy file `_question-backlog_*.md` mới nhất
2. Gửi BA qua kênh team thống nhất (Slack thread, Confluence comment, email...)
3. Mẫu lời nhắn:

> Hi [BA name], requirement UC-101 mình review xong nhưng còn 5 câu hỏi cần xác nhận. Bạn xem file đính kèm và trả lời trực tiếp trong file giúp mình. Cập nhật cột `Status` thành `Answered` khi xong nhé. Thanks!

### BA trả lời thế nào

BA mở file backlog, edit như sau:

| ID | Priority | Ref | Question | Why It Matters | Status | Answer |
|---|---|---|---|---|---|---|
| Q1 | High | UC-101 §3.2 | Validation rule... | Ảnh hưởng... | **Answered** | Min 8 ký tự, có 1 chữ hoa, 1 số, 1 ký tự đặc biệt |

(BA có thể thêm cột Answer nếu chưa có)

Sau khi BA trả lời xong, BA gửi file lại (hoặc commit Git nếu đã setup).

---

## 1.5 — Re-audit sau khi BA trả lời

Khi nhận file backlog đã `Answered`:

1. Đảm bảo file backlog mới nhất ở `docs/QC/uc-read/<UC-ID>/`
2. Trigger lại:

```
review uc UC-101
```

3. Skill tự nhận diện re-audit (vì backlog đã `Answered`) → sinh report version mới (v2, v3...)

### Có thể lặp nhiều vòng

Nếu re-audit vẫn báo Not Ready (thêm gap mới phát sinh sau khi BA trả lời), lặp lại quy trình:

```
re-audit → có gap mới → backlog v2 → BA trả lời → re-audit v3 → ...
```

Cho đến khi Ready ≥ 85%.

---

## 1.6 — Khi nào dừng và chạy Step 2

Tiếp tục Step 2 khi:

- ✅ Verdict **Ready** (≥ 85%)
- ✅ Mọi gap quan trọng đã được BA confirm
- ✅ Không còn câu hỏi blocker

⚠️ **Nguyên tắc**: AI là drafter, không phải decider. Đôi khi score 80% nhưng business critical đã rõ → bạn (QC Lead) có thể quyết định cho chạy Step 2. Ngược lại, score 90% nhưng có 1 gap về security/payment → chờ BA trả lời.

---

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| "Không tìm thấy file UC" | Verify folder `docs/BA/<UC-ID>/` tồn tại; tên folder khớp UC-ID |
| Output bằng tiếng Anh dù requirement tiếng Việt | Input có lẫn EN nhiều — đảm bảo input thuần VN |
| Re-audit không tự nhận diện | Verify file backlog có cột `Status = Answered` cho mọi câu |
| Score quá thấp dù tài liệu đầy đủ | Format có thể không chuẩn — đọc kỹ gap report để biết AI đang miss gì |
| Skill chạy lâu | File requirement quá lớn — tách nhỏ hoặc convert sang `.md` |

---

## Tham khảo skill

- SKILL.md: [.claude/skills/qc-uc-read/SKILL.md](../../.claude/skills/qc-uc-read/SKILL.md)
- Template UC review: [.claude/skills/qc-uc-read/templates/UC_readiness_review_template_v3.md](../../.claude/skills/qc-uc-read/templates/UC_readiness_review_template_v3.md)
- Template question backlog: [.claude/skills/qc-qna/templates/question-backlog_template.md](../../.claude/skills/qc-qna/templates/question-backlog_template.md)

---

**Tiếp theo:** [Step 2 — Create test cases](step2-create-test-cases.md)
