# Communication với BA về gap question

Một trong những giá trị lớn nhất của QC-kit là **đặt câu hỏi đúng cho BA**. Nhưng câu hỏi tốt mà giao tiếp tệ thì vẫn không hiệu quả. Trang này hướng dẫn cách phối hợp với BA.

## Quy trình phối hợp tổng thể

```
QC: review uc → có gap → AI sinh question backlog
   ↓
QC: chuẩn bị file backlog + lời nhắn BA
   ↓
BA: nhận, đọc, trả lời trực tiếp trong file
   ↓
BA: gửi lại file (Status = Answered)
   ↓
QC: re-audit → UC đạt Ready
```

---

## Kênh giao tiếp thống nhất

Trước khi gặp UC đầu tiên, team thống nhất 1 kênh chính cho gap question:

| Kênh | Ưu | Nhược |
|---|---|---|
| **Slack thread** | Nhanh, dễ thảo luận | Khó track lịch sử dài hạn |
| **Confluence comment** | Lưu tốt, search được | Slow notification |
| **Jira ticket** | Tích hợp với sprint | Cần setup workflow |
| **Email** | Formal, lưu tốt | Slow, dễ miss |
| **Git PR** | Có audit trail tự động | Yêu cầu BA biết Git |

💡 Khuyến nghị: **Slack thread cho discussion + Confluence comment để archive**.

---

## Mẫu lời nhắn gửi BA

Khi gửi backlog cho BA, không chỉ "gửi file đây". Kèm context:

### Mẫu A — Lần đầu gửi backlog

> Hi [BA name],
>
> Mình review xong UC-101 (User Login). UC còn 5 câu hỏi cần bạn xác nhận trước khi mình bắt đầu thiết kế test case. File backlog mình đính kèm — bạn xem và trả lời trực tiếp trong file giúp mình.
>
> **Cách trả lời:**
> - Edit cột `Status` thành `Answered`
> - Viết answer ngay sau cột `Why It Matters` (thêm cột `Answer` nếu chưa có)
> - Save và gửi lại file
>
> **Priority cao** (3 câu Q1, Q2, Q4) — cần có để bắt đầu test design. Q3 và Q5 ưu tiên thấp hơn, có thể trả lời sau.
>
> Bạn cần thêm context gì cứ ping mình. Cảm ơn!

### Mẫu B — Re-audit lần thứ N

> Hi [BA name],
>
> Mình re-review UC-101 sau câu trả lời của bạn — phần lớn đã rõ. Còn 2 câu Q6, Q7 phát sinh từ câu trả lời cũ, mình thêm vào backlog v2 đính kèm.
>
> Q6 quan trọng nhất — liên quan đến error code bạn nhắc nhưng common-rules chưa có.
>
> Thanks!

### Mẫu C — Có câu blocker

> Hi [BA name],
>
> UC-101 còn 1 câu Q3 mà mình thấy quan trọng cho release. Đây là **blocker** — không trả lời thì test case sẽ miss case về account lock policy. Mình note rõ ở cột "Why It Matters".
>
> Bạn có thể ưu tiên trả lời câu này trước khi sprint planning thứ 2 không?

---

## Cấu trúc file backlog cho BA dễ trả lời

File auto-sinh có cấu trúc cơ bản:

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | High | UC-101 §3.2 | ... | ... | Open |

QC nên thêm cột **Answer** để BA điền vào:

| ID | Priority | Ref | Question | Why It Matters | Status | Answer |
|---|---|---|---|---|---|---|
| Q1 | High | UC-101 §3.2 | ... | ... | Open | _BA fill here_ |

Có thể thêm cột:
- **BA Comment** — nếu BA muốn note thêm
- **Answered Date** — track timeline
- **Confirmed by** — ai từ stakeholder confirm answer

---

## Quy ước trả lời với BA

Đề xuất với BA:

### 1. Chỉ trả lời, không xoá câu hỏi

❌ BA xoá câu Q3 vì "không quan trọng"
✅ BA giữ Q3, ghi answer "Không áp dụng vì feature này không support guest user", đổi Status = `Not Applicable`

→ QC có audit trail, biết câu nào đã được consider và quyết định.

### 2. Cite source khi trả lời

Nếu answer có sẵn ở document khác, link vào:

> Q1 Answer: Password policy đã định nghĩa ở `docs/BA/Common rules/security-policy.md` section 2.3.

→ QC verify được, đỡ tốn thời gian.

### 3. Chú thích nếu answer là tạm thời

Đôi khi BA chưa có info chính xác:

> Q3 Answer (TENTATIVE — pending PM confirmation): Account lock 30 phút sau 5 lần sai. Sẽ confirm trong sprint review thứ 2.

→ QC biết là answer tạm, không build test case quan trọng dựa vào.

### 4. Update document gốc sau khi trả lời

Backlog là kênh tạm. Sau khi BA trả lời, BA nên update vào document UC chính → lần sau ai đọc UC sẽ có info, không cần xem lại backlog.

---

## Khi BA chậm trả lời

Thực tế: BA bận, có khi 1 tuần chưa trả lời.

### Strategy 1 — Phân loại priority rõ

Trong lời nhắn, **highlight câu blocker** vs câu non-blocker. BA prioritize được.

### Strategy 2 — Daily/weekly sync

Setup recurring 15-min meeting BA-QC weekly:

- Review backlog đang stuck
- BA trả lời nhanh các câu đơn giản tại chỗ
- Câu phức tạp BA note, trả lời async sau

### Strategy 3 — Escalate nếu blocker

Sau 2-3 ngày BA không trả lời câu blocker:

- Ping leader BA team / PM
- Note blocker vào sprint standup
- Đề xuất move UC sang sprint sau nếu không kịp

⚠️ Đừng "đoán giùm BA" — đó chính là fabricate, vi phạm rule QC-kit.

### Strategy 4 — Workaround tạm thời

Trong lúc chờ BA, có thể:

- Bắt đầu Step 2 (sinh scenarios) cho phần đã rõ
- Mark scenario phụ thuộc câu hỏi mở là "PENDING — Q3"
- Khi BA trả lời, update scenarios

→ Không idle thời gian, vẫn truthful về gap.

---

## Anti-pattern — đừng làm

### ❌ Gửi 50 câu cho BA không phân loại

BA nhận 50 câu, không biết cái nào quan trọng → trì hoãn → blocker.

✅ Phân loại priority + highlight blocker.

### ❌ Hỏi câu BA không thể trả lời

```
Q: Performance test này pass với latency bao nhiêu?
```

→ BA không phải người set NFR, đây là câu hỏi cho Architect / DevOps.

✅ Verify câu hỏi đúng đối tượng trước khi gửi.

### ❌ Reuse backlog cũ làm template

Đừng copy-paste backlog từ UC khác → dễ lẫn câu hỏi không liên quan.

✅ Để skill `qc-qna` tự sinh backlog mới cho từng UC.

### ❌ Skip câu hỏi để "đỡ phiền BA"

Nếu UC có gap thật → phải hỏi. Skip → test case sẽ thiếu hoặc sai.

✅ Hỏi đầy đủ. Nếu BA than nhiều — đó là dấu hiệu requirement chưa đạt chất lượng từ đầu, escalate cho process improvement.

---

## Tip: build relationship với BA

QC và BA là partner, không phải khách hàng-vendor.

### 1. Acknowledge khi BA trả lời nhanh

> Cảm ơn bạn trả lời nhanh! Q1, Q2 đã rõ. Mình bắt đầu test design rồi.

→ BA biết effort của họ được appreciated.

### 2. Share insight ngược lại

Khi QC review thấy phần requirement viết tốt, share lại:

> Phần "Account Lock Policy" bạn viết section 7.2 rất rõ — AI review không có gap nào. Format này áp dụng cho UC khác chắc tốt.

→ BA biết cách làm tốt, lặp lại ở UC sau.

### 3. Đề xuất cải tiến template requirement

Nếu thấy UC bị lặp gap (vd luôn miss Acceptance Criteria), suggest BA:

> Mình thấy 5 UC gần đây đều bị gap về Acceptance Criteria. Mình đã viết template AC mẫu ở Confluence, bạn thử áp dụng cho UC tới xem nhanh hơn không?

→ Win-win: UC chất lượng hơn, QC review nhanh hơn.

---

**Tiếp theo:** [Kỷ luật versioning](versioning-discipline.md)
