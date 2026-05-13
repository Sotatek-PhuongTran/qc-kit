# UC52 — Question Backlog

**Tiêu đề:** UC52 — Tra cứu kho tài liệu cá nhân trên Mobile — Question Backlog
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v2
**Source:** UC52_kho-du-lieu-dien-tu_audited_20260508_v1.md

---

## Hướng dẫn cho BA

Mỗi câu hỏi bên dưới được trình bày theo định dạng:
- **Mục:** Thành phần / tính năng đang được hỏi
- **Wireframe / Doc / CMR:** Thông tin hiện có trong từng nguồn
- **=>** Nội dung cần BA làm rõ

Vui lòng trả lời trực tiếp dưới mỗi câu hỏi và cập nhật trạng thái ở cuối (`Open` → `Answered` / `Deferred`).

---

## Câu hỏi

### Q1 — Priority: High
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Lazy Load / Phân trang danh sách (Màn 2.1 & 2.2)

- CMR-04: Áp dụng cho TẤT CẢ màn hình danh sách mobile, 20 bản ghi/lần
- Doc: UC52 KHÔNG tham chiếu CMR-04 và không mô tả cơ chế phân trang

=> Làm rõ danh sách thư mục (Màn 2.1) và danh sách tập tin (Màn 2.2) có áp dụng lazy load 20 bản ghi/lần theo CMR-04 hay không; nếu không thì client xử lý thế nào khi số lượng bản ghi lớn (>100).

**Trả lời:**

**Status:** Open

---

### Q2 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Max length ô tìm kiếm (Màn 2.1 & 2.2)

- CMR-11: Trường không quy định max length → mặc định 500 ký tự
- Doc: Không ghi max length cho ô tìm kiếm tên thư mục / tên tập tin

=> Làm rõ max length ô tìm kiếm có phải 500 ký tự theo CMR-11 không, hoặc giới hạn khác cho search input này.

**Trả lời:**

**Status:** Open

---

### Q3 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Truncate tên thư mục (Card Thư mục, Màn 2.1)

- Wireframe: Card Thư mục hiển thị tên thư mục
- Doc: Không có quy tắc truncate cho tên thư mục (chỉ mô tả "Font Bold, màu đen")

=> Làm rõ khi tên thư mục quá dài, hiển thị tối đa bao nhiêu dòng, có dấu "..." ở cuối hay không.

**Trả lời:**

**Status:** Open

---

### Q4 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Truncate tên tập tin (Item Tập tin, Màn 2.2)

- Wireframe: Item Tập tin hiển thị tên file đầy đủ kèm phần mở rộng
- Doc: Chỉ ghi "Truncate nếu tên quá dài" — không cụ thể max ký tự / dòng / có "..." hay không

=> Làm rõ boundary cụ thể: max bao nhiêu ký tự hoặc bao nhiêu dòng, có dấu "..." cuối hay không.

**Trả lời:**

**Status:** Open

---

### Q5 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Empty state — phạm vi áp dụng

- CMR-14: No data → "Không có dữ liệu."; No result → "Không tìm thấy kết quả."
- Doc (Section 3.5): Ghi "Nếu không có hồ sơ" — thuật ngữ "hồ sơ" chung chung, không rõ là thư mục hay tập tin

=> Làm rõ empty state "Không có dữ liệu." áp dụng cho CẢ danh sách thư mục (Màn 2.1) lẫn danh sách tập tin (Màn 2.2), hay chỉ một trong hai.

**Trả lời:**

**Status:** Open

---

### Q6 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Partial failure — số lượng tài liệu trên Card Thư mục

- Wireframe: Card Thư mục hiển thị "X tài liệu" bên dưới tên thư mục
- Doc: Không mô tả hành vi client khi API đếm file fail (nhưng API danh mục thư mục thành công)

=> Làm rõ khi không lấy được số lượng file trong thư mục, Card hiển thị thế nào: ẩn dòng số lượng, hiển thị "—", hay fallback về "0 tài liệu".

**Trả lời:**

**Status:** Open

---

### Q7 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Vị trí ô tìm kiếm khi tap icon Tìm kiếm

- Wireframe: Chưa thể hiện rõ trạng thái khi search box được kích hoạt
- Doc (Section 2.1, 3.1): Ghi "đè lên Header hoặc ngay bên dưới" — 2 phương án song song, không chọn rõ

=> Làm rõ thiết kế thực tế: ô tìm kiếm đè lên Header (thay thế) hay hiển thị bên dưới Header (thêm mới).

**Trả lời:**

**Status:** Open

---

### Q8 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Debounce navigation — Card Thư mục

- Wireframe: Card Thư mục tap được để navigate
- Doc: Không mô tả hành vi khi double-tap / rapid tap

=> Làm rõ khi user tap nhanh liên tục vào Card thư mục, client navigate 1 lần hay nhiều lần (có debounce navigation hay không).

**Trả lời:**

**Status:** Open

---

### Q9 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Android hardware Back button

- CMR-06: Nút Back trong header điều hướng về màn trước
- Doc: Chỉ mô tả nút Back (←) trong header, không đề cập Android hardware Back button

=> Làm rõ hành vi Android Back button trong 3 tình huống: (a) Màn 2.2 → về Màn 2.1; (b) Màn 2.1 → về Trang chủ hay thoát app; (c) Khi ô tìm kiếm đang mở → đóng ô tìm kiếm hay pop màn hình.

**Trả lời:**

**Status:** Open

---

### Q10 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Session expiration

- CMR: Không có CMR riêng cho session expiry
- Doc: Preconditions ghi "đã đăng nhập" nhưng không mô tả xử lý khi session hết hạn giữa flow

=> Làm rõ khi session hết hạn trong lúc user đang xem danh sách hoặc tập tin, client có redirect về màn hình Đăng nhập không, có hiển thị thông báo trước khi redirect không.

**Trả lời:**

**Status:** Open

---

### Q11 — Priority: Low
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Phân quyền — phạm vi dữ liệu

- Doc (Mô tả chức năng): "Kho tài liệu cá nhân" + "Phân quyền: Cá nhân/Tổ chức đã đăng nhập"
- Doc: Không nêu rõ mỗi user chỉ thấy tài liệu của chính mình hay thấy tất cả

=> Làm rõ mỗi user đăng nhập chỉ thấy thư mục/tập tin riêng của mình (data isolation), không thấy tài liệu của user khác.

**Trả lời:**

**Status:** Open

---

### Q12 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: State Persistence khi quay lại Màn 2.1

- CMR-01: Sau khi tìm kiếm/lọc, vào chi tiết rồi quay lại → giữ nguyên trạng thái tìm kiếm
- Doc: Không mô tả state persistence cho UC52

=> Làm rõ khi user tìm kiếm ở Màn 2.1 → tap thư mục vào Màn 2.2 → quay lại Màn 2.1, từ khóa tìm kiếm và kết quả lọc có giữ nguyên theo CMR-01 hay reset về mặc định.

**Trả lời:**

**Status:** Open

---

### Q13 — Priority: Medium
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: State Persistence khi quay lại từ trình duyệt (CMR-08)

- CMR-08: PDF/Image/Video → mở trên trình duyệt thiết bị
- Doc: Không mô tả hành vi app sau khi user quay về từ trình duyệt

=> Làm rõ sau khi user mở file trên trình duyệt rồi quay lại app, app có giữ nguyên Màn 2.2, scroll position và state tìm kiếm không.

**Trả lời:**

**Status:** Open

---

### Q14 — Priority: High
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Metadata ngày / dung lượng trên Card Thư mục & Item Tập tin

- Wireframe: Card Thư mục chỉ có Icon + Tên + Số lượng + Mũi tên (>); Item Tập tin chỉ có Icon + Tên file. KHÔNG có trường ngày hay dung lượng.
- Doc (AC-01): "Danh sách thư mục và tập tin phải hiển thị đúng icon phân loại và metadata (ngày, dung lượng)"

=> Làm rõ MST ngày tạo và dung lượng có hiển thị trên UI không; bổ sung nếu có (cần cập nhật mô tả UI Section 2), hoặc bỏ phần "metadata (ngày, dung lượng)" khỏi AC-01 nếu không.

**Trả lời:**

**Status:** Open

---

### Q15 — Priority: Low
**UC52 — Tra cứu kho tài liệu cá nhân trên Mobile**
Mục: Sort order — tiếng Việt có dấu

- Wireframe/Doc: Sắp xếp thư mục/tập tin theo tên "1-9/A-Z"
- Doc: Không quy định cách xử lý dấu tiếng Việt (Ví dụ: "Ấn phẩm" và "An toàn" — thứ tự nào đứng trước?)

=> Làm rõ thuật toán sort cho tên tiếng Việt có dấu: dùng Unicode order trực tiếp, hay chuẩn hóa bỏ dấu trước khi so sánh (unaccented comparison).

**Trả lời:**

**Status:** Open

---

## Summary

| Priority | Count |
|----------|-------|
| High | 2 |
| Medium | 10 |
| Low | 3 |
| **Total** | **15** |

---

## Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-08 | QC Review Agent | Khởi tạo — 15 câu hỏi (2H, 10M, 3L) |
| v2 | 2026-05-08 | QC Review Agent | Reformat sang cấu trúc: Mục / Wireframe / Doc / => Câu hỏi làm rõ |

---

*Generated from UC52 Readiness Review v1 — 2026-05-08*
