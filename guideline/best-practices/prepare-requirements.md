# Chuẩn bị requirement chất lượng

Chất lượng output QC-kit phụ thuộc trực tiếp vào chất lượng input. Tài liệu requirement càng chuẩn → AI càng review và sinh test case chính xác.

## Checklist requirement đủ điều kiện review

Trước khi gửi UC cho QC review, tài liệu nên có:

### Bắt buộc

- [ ] **UC-ID** rõ ràng (vd `UC-101`)
- [ ] **Tên feature** ngắn gọn
- [ ] **Actor / Role** liên quan (ai dùng feature này?)
- [ ] **Precondition** — điều kiện trước khi chạy flow
- [ ] **Postcondition** — kết quả mong đợi sau flow
- [ ] **Main Flow** — happy path step-by-step
- [ ] **Acceptance Criteria** — tiêu chí pass/fail rõ ràng

### Khuyến nghị

- [ ] **Alternative Flows** — flow thay thế (vd login bằng Google thay vì email)
- [ ] **Exception / Error Flows** — flow lỗi (vd nhập sai password)
- [ ] **Business Rules** — quy tắc nghiệp vụ (vd password policy)
- [ ] **UI Object Inventory** — bảng các field, button, link trên UI
- [ ] **API Contract** — request/response cho các endpoint (nếu có)
- [ ] **Wireframes / Mockups** — minh hoạ UI

### Cờ đỏ — không nên gửi review nếu

- ❌ UC chưa có UC-ID
- ❌ Chỉ có 1 main flow, không có alternative/error
- ❌ Acceptance criteria mơ hồ ("system works correctly")
- ❌ Tham chiếu mã lỗi/business rule mà không define ở đâu

---

## Format ưu tiên

### Markdown (`.md`) — TỐT NHẤT

✅ AI đọc chính xác và nhanh nhất.

Cấu trúc đề xuất:

```markdown
# UC-101 — User Login

## 1. Mục đích
...

## 2. Actor
- End User
- System (auth service)

## 3. Precondition
- User đã đăng ký account
- User chưa logged in

## 4. Postcondition
- User được redirect về dashboard
- Session được tạo, lưu trong cookie

## 5. Main Flow
1. User mở trang login
2. User nhập username + password
3. User click "Login"
4. System validate credentials
5. System redirect về dashboard

## 6. Alternative Flows
### 6.1. Login bằng Google
...

## 7. Exception Flows
### 7.1. Sai password
1. System hiển thị message E_AUTH_001
2. User được phép retry tối đa 5 lần

## 8. Business Rules
- Password policy: min 8 chars, có 1 chữ hoa, 1 số, 1 ký tự đặc biệt
- Account lock sau 5 lần sai liên tiếp

## 9. UI Object Inventory
| Object | Type | Validation |
|---|---|---|
| Username field | Text input | Email format |
| Password field | Password input | min 8 chars |
| Login button | Button | enabled khi 2 field valid |
| Forgot password link | Link | redirect /forgot-password |

## 10. API Contract
POST /api/auth/login
Request: { email: string, password: string }
Response 200: { token: string, user: { id, email } }
Response 401: { error: "E_AUTH_001" }

## 11. Acceptance Criteria
- AC-1: User login đúng → redirect dashboard trong 2s
- AC-2: User login sai 5 lần → account lock 30 phút
```

### DOCX, PDF — fallback

✅ Vẫn dùng được (qua skill `pdf` / `docx`)
⚠️ AI chậm hơn và đôi khi miss format
⚠️ Khó diff version trong git

### Format không khuyến nghị

❌ **Confluence page xuất** — format không stable, AI khó parse table phức tạp
❌ **Excel** — không phải dạng "đọc tự nhiên" cho AI
❌ **Google Docs** — phải export ra format khác trước

---

## Common rules — quy tắc chung dự án

Đặt vào `docs/BA/Common rules/`:

```
docs/BA/Common rules/
├── common-rules.md          ← Validation rules áp cho cả dự án
├── business-processes.md    ← Quy trình nghiệp vụ tổng thể
├── usecase-list.md          ← Danh sách UC + status
├── error-codes.md           ← Bảng mã lỗi và message
└── glossary.md              ← Từ điển thuật ngữ domain
```

Khi qc-uc-read review 1 UC, nó tự đọc folder này để resolve reference (vd UC nói "trả về `E_AUTH_001`" → AI tra error-codes.md để biết message thật).

---

## Quy ước với BA — cách làm việc

### 1. Standardize template requirement

Đề xuất BA dùng template chuẩn cho mọi UC. Lý do:

- AI quen format → review nhanh
- Member QC khác cũng dễ đọc
- Tránh missing section

Template đề xuất:

```markdown
# UC-XXX — <Tên feature>

## Metadata
- UC-ID: UC-XXX
- Version: v1
- Author: <BA name>
- Date: YYYY-MM-DD
- Status: Draft / Review / Approved

## Mục đích
...

## Actor
...

## Precondition / Postcondition
...

## Main Flow
...

## Alternative Flows
...

## Exception Flows
...

## Business Rules
...

## UI Object Inventory
...

## API Contract
...

## Acceptance Criteria
...

## Notes / References
...
```

### 2. Tránh ngôn ngữ mơ hồ

❌ Không dùng:
- "should be fast"
- "easy to use"
- "may"
- "if necessary"
- "etc."

✅ Dùng cụ thể:
- "response time < 2s in 95% of requests"
- "max 3 click để hoàn thành flow"
- "must"
- "if user has role = ADMIN"
- liệt kê đầy đủ thay vì "etc."

### 3. Trace requirement → business goal

Mỗi requirement nên trace về 1 business objective. Nếu không trace được, có thể là requirement orphan (không cần thiết) hoặc thiếu context.

Ví dụ:
```
FR-003: System lock account sau 5 lần login sai
  → Business goal: Bảo vệ user khỏi brute force attack
```

### 4. Version control documents

BA nên versioning tài liệu:

- v1: draft đầu tiên
- v2: sau review nội bộ BA team
- v3: sau khi QC review và BA trả lời backlog

Đặt tên file rõ ràng: `UC-101-spec_v3.md`.

### 5. Communicate khi requirement đổi

Khi BA update requirement giữa chừng:

- ✅ Báo QC team qua kênh team (Slack, Confluence)
- ✅ Note ra phần nào thay đổi (changelog)
- ✅ Bump version document

→ QC tự động chạy Step 3 update test cases khi cần.

---

## Tip cho QC: đọc requirement trước khi prompt AI

⚠️ Đừng "ném" requirement vào AI mà không đọc.

QC nên đọc qua 1 lần trước khi review để:

- Hiểu context tổng thể
- Phát hiện những thứ rõ ràng AI có thể miss (vd hình ảnh wireframe có chú thích nhỏ)
- Có thể prompt AI cụ thể hơn nếu thấy phần phức tạp

Ví dụ prompt tốt:

```
review uc UC-101 — đặc biệt focus vào phần password policy ở section 8 và
flow account lock ở section 7.2 vì đây là 2 phần phức tạp nhất
```

→ AI sẽ deep-dive vào 2 phần này thay vì review surface-level.

---

**Tiếp theo:** [Viết prompt hiệu quả](effective-prompting.md)
