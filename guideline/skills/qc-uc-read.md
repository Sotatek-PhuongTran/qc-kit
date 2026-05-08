# Skill: `qc-uc-read`

Review tài liệu Use Case (UC) để xác định đã sẵn sàng cho test design hay chưa.

## 🎯 Mục đích

Phân tích nhiều artifact requirement (UC docs, design specs, wireframes, API specs, business process docs, mockup) **cùng lúc** và đánh giá:

- **Verdict**: Ready / Not Ready
- **Score**: 0-100% completeness
- **Gap report**: thiếu gì, không rõ chỗ nào, đề xuất sửa cụ thể

## 🔔 Khi nào dùng

- Mới nhận tài liệu UC từ BA
- Sau khi BA đã trả lời question backlog (re-audit)
- Trước khi bắt đầu thiết kế test scenarios / test cases

## 🗣️ Câu lệnh trigger

- `review uc UC-XXX`
- `review requirement`
- `audit requirement`

Skill tự nhận biết workflow:
- **First audit**: lần đầu review UC này
- **Re-audit**: đã có `uc-review-report` cũ + question-backlog đã được BA trả lời

## 📥 Input cần chuẩn bị

| Loại file | Bắt buộc | Vị trí |
|---|---|---|
| File requirement của UC | ✅ | `docs/BA/<UC-ID>/` |
| Common rules / business rules / usecase list | Khuyến nghị | `docs/BA/Common rules/` |
| Question backlog đã được BA trả lời (re-audit only) | Re-audit | `docs/QC/uc-read/<UC-ID>/` |

Skill đọc **version cao nhất** nếu có nhiều version.

## 📤 Output sinh ra

| File | Vị trí |
|---|---|
| `<UC-ID>_<feature>_audited_<YYYYMMDD>_v<N>.md` | `docs/QC/uc-read/<UC-ID>/` |
| `<UC-ID>_<feature>_question-backlog_<YYYYMMDD>_v<N>.md` (nếu có gap) | `docs/QC/uc-read/<UC-ID>/` |

⚠️ Mỗi lần chạy lại sẽ tạo **version mới**, KHÔNG overwrite version cũ.

## 📝 Khung audit (5 trụ cột)

Skill đánh giá UC theo 5 pillar:

1. **Completeness** — thiếu requirement, behavior chưa định nghĩa, edge case chưa cover, NFR chưa có
2. **Clarity** — ngôn ngữ mơ hồ ("should", "may", "fast", "easy"), term chưa định nghĩa
3. **Consistency** — mâu thuẫn nội bộ, conflict giữa các section
4. **Testability** — mọi requirement phải verify được độc lập; reject acceptance criteria mơ hồ
5. **Traceability** — map mỗi requirement với business objective; flag orphan requirement

## 📝 Ví dụ prompt thực tế

**Lần đầu review UC mới:**
```
review uc UC-101
```

**Re-audit sau khi BA trả lời:**
```
review uc UC-101
```
(Skill tự nhận diện re-audit từ file cũ)

**Review module gồm nhiều UC:**
```
review requirement docs/BA/UC-101-login/ docs/BA/UC-102-logout/
```

## ⚠️ Lưu ý quan trọng

| Quy tắc | Giải thích |
|---|---|
| Skill **CHỈ review**, không edit input | Tài liệu requirement của BA không bị thay đổi |
| Mọi finding **phải cite source** | Verdict không được fabricate — phải chỉ rõ section/page |
| KHÔNG fabricate requirement | Nếu thiếu thông tin → ghi vào gap report, không tự đoán |
| Multi-language | Input VN → output VN; input EN → output EN; giữ nguyên label gốc |
| Re-audit yêu cầu BA đã trả lời backlog | Nếu chưa, skill stop và yêu cầu BA trả lời trước |

## ⚙️ Lỗi thường gặp & cách xử lý

| Triệu chứng | Xử lý |
|---|---|
| Báo "không tìm thấy file UC" | Verify folder `docs/BA/<UC-ID>/` tồn tại; tên folder khớp UC-ID |
| Output bằng tiếng Anh dù requirement bằng tiếng Việt | Input có lẫn EN → đảm bảo input thuần VN |
| Re-audit không tự nhận diện | Verify file `uc-review-report` version cũ có trong folder output |
| Score quá thấp dù tài liệu đầy đủ | Có thể tài liệu format không chuẩn — xem kỹ gap report để biết AI đang miss gì |

## 🔗 Liên quan

- **Sau review chạy gì:**
  - Nếu Not Ready → [qc-qna](qc-qna.md) tự động trigger
  - Nếu Ready → [qc-func-scenario-design](qc-func-scenario-design.md)
- **Đọc thêm chi tiết:** [.claude/skills/qc-uc-read/SKILL.md](../../.claude/skills/qc-uc-read/SKILL.md)
