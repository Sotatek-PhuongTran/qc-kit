---
name: qc-writting-rules
description: Quy tắc viết output QC — gọn, áp dụng cho mọi skill sinh tài liệu cho người đọc (audited report, scenario, test case, site map, context). Nguồn DUY NHẤT về cách viết; các skill chỉ trỏ về đây, không chép lại.
applies_to_skills:
  universal:
    - qc-uc-read
    - qc-func-tc-design
    - qc-func-scenario-design
    - qc-context-master
    - qc-site-map
---

# Quy tắc viết output QC

**Mục tiêu:** output để QC đọc-hiểu và thực thi NGAY — không phải mở lại tài liệu nguồn, không phải dùng công cụ dịch.

**Ngôn ngữ output (luật 2 nhóm — nguồn chuẩn duy nhất, mọi skill trỏ về đây):**

1. **Tài liệu review nội bộ** (user cần đọc-hiểu để review): audited report (`qc-uc-read`), api-audited (`qc-api-read`), question backlog / api-question-backlog (`qc-qna`), triage, run summary, review/verify plan và mọi báo cáo trung gian → **LUÔN tiếng Việt**.
2. **Tài liệu chính thức release theo dự án**: test scenarios, test cases (md + xlsx), test script/spec, bug report, execution report (test-results) → theo **ngôn ngữ dự án** — xác định theo ngôn ngữ document BA cung cấp, đọc từ `project-context-master` §3.0 (field "Project language").
3. Chỉ chấp nhận **tiếng Việt hoặc tiếng Anh**. Document BA bằng ngôn ngữ khác → DỪNG, hỏi user chọn 1 trong 2.
4. KHÔNG trộn ngôn ngữ trong cùng một file.

---

## 1. Năm quy tắc bắt buộc (mọi output)

**R1 — Câu tự chứa.** Mỗi finding / bước / kết quả mong đợi viết đủ: *chủ thể + điều kiện + hành vi hệ thống + kết quả*. Đọc riêng một dòng vẫn hiểu, không cần mở UC/FRD. KHÔNG tham chiếu sang dòng/test case khác (`như TC_033`, `giống mục trên`) — nếu trùng nội dung vẫn viết lại đầy đủ. Message hệ thống luôn **trích đủ nguyên văn**, không mô tả gián tiếp.

**R2 — Mã không bao giờ đứng một mình.** Trong câu cho người đọc, KHÔNG viết mã trần (`SCR-...`, `CRULE-...`, `Q-...`, `EF 6x`, `BR-...`, `AC-...`, `R-5`). Viết **tên người-đọc-hiểu trước**, để mã trong ngoặc làm dẫn chứng.
- ✅ `trang quên mật khẩu (SCR-ORGUSER-002)`
- ❌ `Người dùng nhập email tại SCR-ORGUSER-002`

**R3 — Chỉ giữ tiếng Anh khi là DỮ LIỆU HỆ THỐNG.** Nhãn UI, nội dung message, tên màn hình, mã lỗi, tên API — giữ nguyên verbatim, đặt trong ngoặc kép `"..."`. **Mọi từ kỹ thuật khác PHẢI dịch sang tiếng Việt** theo Bảng quy đổi §3.
- ✅ nút `"Gửi liên kết đặt lại"` chuyển sang trạng thái *đang xử lý*
- ❌ nút Gửi chuyển sang Loading

**R4 — Vùng/trạng thái phải kèm tên thường.** Không viết `Vùng A` một mình; viết `trạng thái mặc định (Vùng A)`. Người đọc không phải cuộn lên tra định nghĩa vùng.

**R5 — Giữ dấu tiếng Việt.** Tuyệt đối không bỏ dấu / ASCII hoá phần tiếng Việt.

---

## 2. Văn phong tiếng Việt

- Viết như **tài liệu nghiệp vụ cho QC/Tester**, không dịch word-by-word từ tiếng Anh.
- Dùng từ thường, tránh từ học thuật/cao cấp khi đã có từ tương đương ("tránh dò tìm tài khoản" thay vì "anti-enumeration").
- Câu ngắn, chủ động.
- Tránh cụm máy-dịch / mơ hồ: "hiện thực hoá", "luồng downstream", "gắn ngữ cảnh tổ chức", "4x/5x cases", "system error exception".

---

## 3. Bảng quy đổi thuật ngữ (EN → VI) — dùng ở MỌI output

Khi gặp các từ bên trái trong lúc viết (kể cả khi chúng đến từ tài liệu kỹ thuật tiếng Anh như `design-technical`), viết ra bên phải:

| Thay vì (EN / jargon) | Viết (VI) |
|---|---|
| Loading | đang xử lý |
| focus / blur | tiêu điểm (con trỏ) / rời ô |
| submit | gửi / xác nhận |
| inline error | lỗi tại chỗ (dưới ô) |
| toast | thông báo nổi |
| disabled / enabled | vô hiệu / khả dụng |
| editable / read-only | cho sửa / chỉ đọc |
| placeholder | gợi ý nhập |
| per-keystroke | theo từng ký tự |
| navigate | điều hướng / chuyển sang |
| highlight | làm nổi / đang chọn |
| request | yêu cầu (gọi) |
| browser storage | bộ nhớ trình duyệt |
| audit log | nhật ký kiểm toán |
| anti-enumeration | tránh dò tìm tài khoản |
| empty state / populated state | trạng thái rỗng / trạng thái có dữ liệu |
| loading state / error state | trạng thái đang tải / trạng thái lỗi |
| boundary value (BVA) | giá trị biên |
| equivalence partition (EP) | phân vùng tương đương |
| happy path / exception flow | luồng thành công / luồng ngoại lệ |

Từ không có trong bảng: ưu tiên từ tiếng Việt thông dụng. Nếu buộc phải giữ một thuật ngữ tiếng Anh **chính thức**, giải thích nghĩa ở lần đầu rồi mới dùng tắt.

---

## 4. Báo cáo dùng nhiều mã → thêm "Bảng mã viết tắt"

Với báo cáo dạng prose (audited, scenario, context, site-map) có dùng mã/tiền tố: thêm mục `## Bảng mã viết tắt` ở đầu (cột: Mã / Tiền tố | Ý nghĩa | Định nghĩa tại). Chỉ liệt kê tiền tố thực sự xuất hiện. Thuật ngữ chuyên ngành (WCAG, KDF, PDPL, RFC 5322...) giải thích ngắn ở lần đầu xuất hiện.

> Bảng atomic (test case, RTM row, dashboard row, ui-elements row) KHÔNG bắt buộc glossary — ô đã có vai trò cố định.

---

## 5. Cổng tự kiểm trước khi lưu (BẮT BUỘC ở mỗi bước viết)

Quét lại toàn bộ output và sửa hết TRƯỚC khi ghi file:

- [ ] Còn **mã trần** trong câu cho người đọc? (`SCR-/CRULE-/Q-/EF/BR/AC/R-` hoặc `Vùng X` đứng một mình) → thêm tên thường, đưa mã vào ngoặc.
- [ ] Còn **từ tiếng Anh** không phải nhãn/message hệ thống? → đổi theo Bảng §3.
- [ ] Có câu nào **phải mở tài liệu nguồn mới hiểu**? → viết lại cho tự chứa (R1).
- [ ] Còn câu **tham chiếu chéo** (`như TC_X`, `giống mục trên`) hoặc message **mô tả gián tiếp** thay vì trích nguyên văn? → viết lại đầy đủ (R1).
- [ ] (Tiếng Việt) còn chỗ **mất dấu / trộn ngữ / văn máy-dịch**? → sửa.
- [ ] Nhãn & nội dung hệ thống đã đặt trong **ngoặc kép** và giữ **verbatim**?
