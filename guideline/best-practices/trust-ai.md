# Khi nào tin AI, khi nào review tay

Một trong những kỹ năng quan trọng nhất khi dùng QC-kit là **biết khi nào trust AI output, khi nào phải review thủ công**. AI là drafter rất nhanh và đầy đủ, nhưng không thay thế phán đoán domain của QC.

## Nguyên tắc gốc

> **AI là drafter, QC là decider.**

- AI sinh draft scenarios/test cases
- QC review, sửa, chấp nhận hoặc từ chối
- QC chịu trách nhiệm cuối cùng cho chất lượng test

Đừng abdicate trách nhiệm cho AI — đặc biệt với feature business critical (payment, security, healthcare).

---

## Tin AI cho những việc gì?

### ✅ Việc cơ học, có pattern rõ

AI làm tốt và nhanh hơn người:

- **Checklist completeness**: AI scan UC theo 5 trụ cột nhanh hơn manual reviewer
- **Tìm gap rõ ràng**: missing precondition, undefined error code, vague acceptance criteria
- **Sinh boilerplate scenarios**: BVA cho mọi field có giới hạn, EP cho input partition
- **Match test data với business rule**: AI tự tra common-rules để fill data
- **Format output**: chuẩn hoá template, naming convention, version

### ✅ Việc lặp đi lặp lại

- Apply BVA cho 10 field trong 1 UC
- Sinh scenario cho 5 alternative flow tương tự nhau
- Update test cases khi requirement đổi nhỏ
- Đặt tên file đúng convention

### ✅ Việc cần coverage rộng

AI ít miss case hơn người mệt mỏi:

- Cover hết các test type (functional/integration/UI/E2E/acceptance)
- Cover hết các flow (main, alt, error)
- Cover hết các role (admin, user, guest)
- Cover hết các UI state

---

## Phải review tay cho những việc gì?

### ❌ Business logic phức tạp — phải QC quyết

AI có thể miss logic trong context cụ thể của domain:

- **Payment flow**: edge case về refund timing, partial refund, currency conversion
- **Authentication**: race condition giữa token expiry và refresh
- **Multi-tenant**: phân quyền giữa các tenant
- **Compliance** (GDPR, PCI-DSS, HIPAA): yêu cầu đặc thù pháp lý

QC có domain expertise → review từng test case cho phần này.

### ❌ Edge case domain-specific

AI không có context "ngành":

- Crypto: confirm time block, gas fee fluctuation
- Healthcare: FDA validation, HIPAA audit log
- Banking: SWIFT message format, settlement cutoff time
- E-commerce: cart abandonment, inventory race condition

QC member có kinh nghiệm domain phải review/thêm test case cho phần này.

### ❌ Test case priority

AI có thể sinh 50 test case cho 1 feature — đều OK kỹ thuật. Nhưng:

- Test case nào **must-have** cho release?
- Test case nào **nice-to-have**?
- Test case nào **low priority** có thể skip?

→ QC quyết định priority, không phải AI.

### ❌ Test data thực tế

AI có thể sinh test data hợp lý từ business rule, nhưng:

- Account thật để login test
- Test card hợp lệ cho payment gateway
- Account đặc biệt (admin, vendor)

→ Phải lấy từ project-config (do QC Lead fill, không phải AI sinh).

### ❌ Acceptance criteria mềm

Một số AC AI không verify được:

- "User experience phải mượt"
- "Form layout đẹp"
- "Loading time chấp nhận được"

→ QC test thủ công, đôi khi cần stakeholder review.

---

## Anti-pattern — đừng làm

### ❌ Blindly accept output

AI sinh 30 test case → bạn copy thẳng vào file deliverable mà không đọc → tester phát hiện 5 case sai → uy tín QC giảm.

✅ **Luôn skim output trước khi handover** (xem checklist review ở [Step 2](../usage/step2-create-test-cases.md)).

### ❌ Ignore khi AI bảo "không chắc"

AI có rule cite source + state uncertainty. Nếu AI ghi:

> "Uncertain about validation rule for `discount_code` field — not found in requirement. Suggest BA confirm."

→ Đừng skip, đây là gap quan trọng.

✅ Note vào question backlog, hỏi BA.

### ❌ Trust AI về thứ AI không biết

AI không biết:

- Account credentials thật của bạn
- Performance requirement nội bộ team
- Quy ước commit message của dự án
- Sprint deadline / release schedule

→ Đừng prompt "sinh test case theo timeline sprint" — AI không có info đó.

### ❌ Trust AI về số liệu

AI có thể bịa số liệu nếu prompt cho phép:

- "Test case này pass 99% prod traffic" — bịa
- "Average response time 1.2s" — bịa nếu không có data

→ Đừng để AI sinh số liệu mà không có data thật.

---

## Khung quyết định: tin hay review?

Khi nhận output AI, tự hỏi 3 câu:

```
1. Output này có dựa trên requirement viết rõ trong tài liệu không?
   - CÓ → khả năng cao tin được
   - KHÔNG → review tay

2. Output này liên quan đến phần business critical (payment, security, compliance)?
   - CÓ → review tay kỹ
   - KHÔNG → skim qua, có thể accept

3. Output này có cần domain knowledge mà AI không có?
   - CÓ → QC member có kinh nghiệm domain phải review
   - KHÔNG → có thể accept
```

---

## Tip: chiến lược review hiệu quả

### 1. Review summary trước, file chính sau

Nhiều skill sinh `_summary_*.md` ngoài output chính. Đọc summary trước → hiểu nhanh AI làm gì → focus review những phần đáng ngờ.

### 2. Spot-check thay vì review từng dòng

Với 50 test case, không cần đọc từng case:

- Đọc 5 happy path đầu → verify pattern đúng
- Đọc 5 edge case ngẫu nhiên → verify AI có miss gì không
- Đọc 5 test case business critical (payment, security) → review kỹ
- Skim phần còn lại

### 3. Compare với "what would I write"

Trước khi prompt AI, hình dung "tôi sẽ viết X scenario nào". So sánh với output AI:

- AI sinh > expectation → có thể AI cover thêm edge case bạn miss → tốt!
- AI sinh < expectation → AI miss case → reprompt hoặc thêm tay
- AI sinh = expectation → an tâm

### 4. Test thực tế 1 vài case

Sau khi accept output, execute thử 1-2 test case để verify:

- Pre-condition setup được không
- Step rõ ràng đến mức tester khác làm theo được không
- Expected result đúng không

---

## Tip: feedback cho AI khi không ưng ý

Nếu output AI không tốt, đừng accept rồi sửa. Reprompt cụ thể:

❌ Không ưng ý nhưng accept rồi sửa:

```
[AI output 30 test case generic]
QC: thôi, mình sửa tay vậy
```

✅ Reprompt cụ thể:

```
QC: scenarios này quá generic, đặc biệt phần password validation chưa cover BVA cho
độ dài min/max. Hãy sinh lại với focus:
- BVA cho password length (min 8, max 64): test 7, 8, 9, 63, 64, 65 chars
- BVA cho username length (min 3, max 50)
- Decision table cho combo "password complexity": chỉ có chữ thường vs có chữ hoa
  vs có số vs có ký tự đặc biệt (16 combination)
```

→ Output lần 2 thường tốt hơn nhiều.

---

## Lời cuối

QC-kit không phải để **thay thế** QC. Nó là **đòn bẩy** để QC làm nhiều hơn với cùng thời gian:

- Trước: review 1 UC mất 2 tiếng, sinh 20 test case mất 1 ngày
- Sau: AI làm draft trong 10 phút, QC review + thêm domain insight trong 1 tiếng

Thời gian QC tiết kiệm → đầu tư vào:

- Domain expertise
- Test execution chất lượng
- Hỗ trợ training member mới
- Đề xuất cải tiến process

---

**Tiếp theo:** [Communication với BA](ba-communication.md)
