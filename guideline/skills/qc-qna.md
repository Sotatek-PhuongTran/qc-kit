# Skill: `qc-qna`

Chuyển các câu hỏi mở từ "Unified Gap & Question Report" của file audited sang Question Backlog cho BA trả lời.

## 🎯 Mục đích

Tách các câu hỏi gap (do qc-uc-read identify) ra một file backlog riêng — để BA dễ track, trả lời, và confirm thông tin còn thiếu.

## 🔔 Khi nào dùng

- **Auto-trigger**: tự động chạy sau khi `qc-uc-read` hoàn tất và phát hiện gap
- **Manual**: gọi tay khi muốn refresh backlog từ uc-review-report cũ

## 🗣️ Cách trigger

Thường tự động sau qc-uc-read. Nếu cần gọi tay:

```
extract questions from UC-XXX
```

hoặc:

```
update question backlog cho UC-XXX
```

## 📥 Input cần có

| File | Vị trí |
|---|---|
| `<UC-ID>_<feature>_audited_<YYYYMMDD>_v<N>.md` (file audited mới nhất) | `docs/QC/uc-read/<UC-ID>/` |
| `<UC-ID>_<feature>_question-backlog_<YYYYMMDD>_v<N>.md` (nếu đã có) | `docs/QC/uc-read/<UC-ID>/` |

Skill đọc **version cao nhất** của cả 2 file.

## 📤 Output sinh ra

`<UC-ID>_<feature>_question-backlog_<YYYYMMDD>_v<N>.md` đặt cùng folder với file audited.

### Cấu trúc bảng Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | High | UC-101 §3.2 | Validation rule cho password phức tạp ra sao? | Ảnh hưởng test boundary | Open |
| Q2 | Medium | Common rules §1.5 | Mã lỗi `E_AUTH_001` có message gì? | Cần để verify error flow | Open |

## 📝 Quy trình

```
Step 1 — Input Resolution
  ↓ Đọc file audited (highest version)
  ↓ Đọc question backlog (highest version, nếu có)
Step 2 — Content Extraction & Transfer
  ↓ Trích bảng dưới heading "📋 Unified Gap & Question Report"
  ↓ Append vào "Open Questions" section
  ↓ Giữ ID gốc (Q1, Q2...) trừ khi conflict
```

## 🤝 BA phối hợp thế nào

Sau khi nhận file question-backlog, BA:

1. Mở file `_question-backlog_*.md`
2. Đọc cột **Question** và **Why It Matters**
3. Trả lời trực tiếp trong file (thêm cột **Answer** nếu cần)
4. Đổi cột **Status** từ `Open` → `Answered`
5. Save và gửi lại cho QC Member

QC Member sau đó chạy lại `review uc <UC-ID>` để re-audit.

## ⚠️ Lưu ý quan trọng

| Quy tắc | Giải thích |
|---|---|
| Append, không overwrite | Nếu backlog đã có, skill append câu hỏi mới (không xoá câu hỏi cũ) |
| Detect conflict | Nếu backlog có câu hỏi đã `Answered` mà file audited mới không có → cảnh báo cần re-audit |
| Giữ ID gốc | Q1, Q2 từ audited sẽ giữ nguyên ID trong backlog |
| Skill này KHÔNG tạo gap mới | Chỉ chuyển gap đã có sẵn từ qc-uc-read sang format dễ dùng |

## ⚙️ Lỗi thường gặp & cách xử lý

| Triệu chứng | Xử lý |
|---|---|
| Cảnh báo "có câu Answered trong backlog mà không có trong audited" | Chạy lại `review uc` để re-audit; có thể câu hỏi đã được resolve |
| Backlog rỗng dù audited có gap | Verify heading trong audited đúng `### 📋 Unified Gap & Question Report` |
| ID conflict khi append | Skill tự đổi ID, không cần can thiệp |

## 🔗 Liên quan

- **Trigger từ:** [qc-uc-read](qc-uc-read.md) (auto sau khi tìm thấy gap)
- **Sau backlog gửi BA:** BA trả lời → QC Member chạy lại [qc-uc-read](qc-uc-read.md) re-audit
- **Đọc thêm chi tiết:** [.claude/skills/qc-qna/SKILL.md](../../.claude/skills/qc-qna/SKILL.md)
