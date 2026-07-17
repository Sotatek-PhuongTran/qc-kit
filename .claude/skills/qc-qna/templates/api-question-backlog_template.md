# Sổ câu hỏi nhánh API — Portal {PORTAL}

> Tạo: {DATE} · SOLE writer: `qc-qna` (API mode) · File SỐNG — không ngày, không version, sửa in-place
> Nguồn: api-audited §8 của mọi UC thuộc portal + finding binding từ `qc-api-tc-design`
> Quy ước: một câu hỏi nghiệp vụ = MỘT dòng (dedup nội dung — policy §8); câu trùng với sổ UI per-UC thì THAM CHIẾU tại báo cáo, không chép vào đây; ID `Q-API-NNN` cấp tuần tự, không đổi, không tái sử dụng
> Priority: H = High (chặn thiết kế) · M = Medium (ảnh hưởng phạm vi) · L = Low (nên biết)
> Trạng thái: Open · Answered · Deferred · Resolved

---

## A. Câu hỏi chung (portal / dự án)

> Chủ đề áp dụng cho NHIỀU UC hoặc mang tính dự án/hạ tầng (chính sách password, kênh verify nhật ký kiểm toán, fault injection, chính sách rollback/nguyên tử, rate-limit...). BA/BE trả lời MỘT lần tại đây — mọi UC trong cột "UC áp dụng" kế thừa.

| ID | Priority | Ref | Câu hỏi | Vì sao quan trọng | UC áp dụng | Nguồn | Trạng thái | Trả lời (nội dung · người · ngày) |
|----|----------|-----|---------|-------------------|------------|-------|-----------|------------------------------------|
| Q-API-001 | H | BR-xxx | [vd: Kênh verify nhật ký kiểm toán ở môi trường test là gì (endpoint / DB / export)?] | [ảnh hưởng tầng test của các AC nhật ký] | UC-..., UC-... | UC-... api-audited §8 | Open | |

---

## B. Câu hỏi theo UC

### UC-{PORTAL}-XXX — {feature-name}

| ID | Priority | Ref | Câu hỏi | Vì sao quan trọng | Nguồn | Trạng thái | Trả lời (nội dung · người · ngày) |
|----|----------|-----|---------|-------------------|-------|-----------|------------------------------------|
| Q-API-002 | M | RULE-xxx | [câu hỏi tự chứa] | [ảnh hưởng test] | UC-... api-audited §8 | Open | |

---

## Update history

| Ngày | Thay đổi |
|------|----------|
| {DATE} | Tạo sổ từ template. |
