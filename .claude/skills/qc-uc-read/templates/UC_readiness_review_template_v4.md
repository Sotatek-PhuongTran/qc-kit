# Báo cáo rà soát mức độ sẵn sàng của Use Case

**Template rà soát requirement phục vụ thiết kế test**

---

> ## Cách sử dụng template này
>
> Template này dùng để tạo file `*_audited_*.md` sau khi Agent đọc và rà soát use case, tài liệu liên quan, common rules, wireframe/mockup, API hoặc các artefact hỗ trợ khác.
>
> File audited có 2 mục đích:
>
> 1. **Tổng hợp lại cách Agent hiểu nghiệp vụ của use case** để QC Lead / BA / user có thể review xem Agent đã hiểu đúng chưa.
> 2. **Rà soát độ đầy đủ, rõ ràng, nhất quán và khả năng test được của tài liệu**, bao gồm việc đối chiếu với use case liên quan, common rules, site map, project context và các nguồn khác để phát hiện thiếu sót, mâu thuẫn hoặc điểm cần xác nhận.
>
> Không được để trống section. Nếu không áp dụng, ghi `N/A` và giải thích ngắn gọn lý do.
> Không được chỉnh sửa các đầu mục của template.
> Khi viết file phải xoá bỏ các phần nội dung hướng dẫn.
>
> **Cách viết (BẮT BUỘC):** tuân theo `.claude/rules/qc-writting-rules.md` — không dùng mã trần trong câu cho người đọc (tên thường trước, mã trong ngoặc: `trang quên mật khẩu (SCR-ORGUSER-002)`); thuật ngữ kỹ thuật viết tiếng Việt theo Bảng quy đổi §3; mọi `Vùng X` phải kèm tên thường (`trạng thái mặc định (Vùng A)`). Chạy cổng tự kiểm §5 trước khi lưu.

---

## Feature Brief - Tóm tắt nghiệp vụ

Viết 1-3 đoạn ngắn để mô tả use case theo cách dễ hiểu.

Nội dung cần có:
- use case này dùng để làm gì;
- ai sử dụng;
- điều kiện nào cần có trước khi thực hiện;
- hệ thống xử lý các nghiệp vụ chính nào;
- rule, exception, audit, permission, integration hoặc data/state nào ảnh hưởng đến thiết kế test;
- các use case / module / common rule liên quan nếu có.

Không copy heading hoặc shorthand label từ source làm nội dung giải thích. Nếu heading/mã nguồn quan trọng, hãy giải thích ý nghĩa nghiệp vụ trước, sau đó giữ heading/mã gốc trong phần trích nguồn.

---

## 0. Thông tin tài liệu

| UC ID | Tên feature / use case | Version | Trạng thái tài liệu |
|---|---|---|---|
|  |  |  | Draft / In Review / Finalized / TBD |

| Người viết / BA | Người duyệt | Ngày tạo | Cập nhật lần cuối |
|---|---|---|---|
|  |  |  |  |

| Artefact đã đọc | Version / ngày cập nhật | Vai trò của artefact | Ghi chú |
|---|---|---|---|
|  |  | UC / Wireframe / API / Common rule / Site map / Project context / Other |  |

---

## 1. Mục tiêu và phạm vi

### 1.1 Mục tiêu nghiệp vụ

[Giải thích use case tồn tại để giải quyết vấn đề gì, phục vụ ai, mang lại kết quả nghiệp vụ gì.]

### 1.2 Phạm vi trong use case

| Hạng mục / chức năng | Mô tả | Nguồn |
|---|---|---|
|  |  |  |

### 1.3 Ngoài phạm vi / chưa bao gồm

| Hạng mục | Lý do ngoài phạm vi / chưa rõ | Ảnh hưởng đến test |
|---|---|---|
|  |  |  |

---

## 2. Actor, vai trò và quyền hạn

| Actor / Role | Loại | Vai trò trong use case | Quyền hạn / giới hạn liên quan | Nguồn |
|---|---|---|---|---|
|  | Primary / Secondary / System / External |  |  |  |

**Nhận xét readiness:**  
[Đánh giá actor/role đã đủ rõ để thiết kế test theo role chưa. Nếu chưa, nêu rõ thiếu gì.]

---

## 3. Điều kiện trước và kết quả sau

### 3.1 Điều kiện trước

| # | Điều kiện trước | Bắt buộc? | Nguồn |
|---|---|---|---|
| 1 |  | Yes / No / TBD |  |

### 3.2 Kết quả sau khi hoàn tất

| Thao tác | Trạng thái hệ thống / dữ liệu sau khi hoàn tất | Nguồn |
|---|---|---|
| Thêm bản ghi | Bản ghi mới xuất hện ở hàng đầu tiên của danh sách. Thông báo thành công hiển thị |  |

**Lưu ý:** Nếu điều kiện trước hoặc kết quả sau được tham chiếu từ common rule / common function, phải resolve nội dung gốc và ghi rõ mã trong ngoặc.

---

## 4. Danh sách UI object và mapping
 
> Dùng khi có wireframe, mockup, screen spec hoặc mô tả UI. Nếu use case không có UI, ghi `N/A` và giải thích.
> Section 4 **chỉ liệt kê** đối tượng và thuộc tính tĩnh; hành vi động đặt ở Section 5.
> Cách phân loại đối tượng (4 nhóm), tách đối tượng phức hợp, nesting, vùng loại trừ: xem **§F.1** của skill. Mỗi đối tượng thuộc một trong: **Nhóm 1 — Điều khiển** (Bảng A) · **Nhóm 2 — Hiển thị dữ liệu** · **Nhóm 3 — Thông báo** · **Nhóm 4 — Tĩnh & bổ trợ** (Nhóm 2/3/4 → Bảng B).
 
Quy ước:
- Mỗi màn / popup / email là một khối `### <SCR-ID>`, gồm Bảng A và Bảng B.
- Cột `#` là ID ổn định, không tái sử dụng, giữ nguyên để Section 5 và bước sau tham chiếu.
- Mỗi dòng có cột `Nguồn` trỏ về mục gốc (UC §, FRD §, rule code…).
### <SCR-ID> — <Tên màn hình / popup / email>
 
**Điều kiện trigger màn:** <khi nào màn/popup/email xuất hiện; entry point>
**Vùng điều kiện (nếu có):** <các state/region loại trừ lẫn nhau, vd. form mặc định / banner lỗi / empty state / vùng có dữ liệu>
 
#### Bảng A — Đối tượng tương tác (Nhóm 1)
 
| # | Màn hình | Label gốc trên UI | Loại component | Bắt buộc? | Giá trị mặc định | Placeholder | Enum / giá trị | Trạng thái khởi tạo & điều kiện hiển thị | Mô tả / ràng buộc | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| <ID> | <SCR-ID> | <label> | <loại component> | Yes / No / N/A | <mặc định / Rỗng / Disabled> | <placeholder / —> | <giá trị / —> | <trạng thái khởi tạo + điều kiện hiển thị, vd. "disabled; ẩn khi 6x"> | <ràng buộc tĩnh: định dạng, max length…; "thuộc về <ID>" nếu lồng> | <UC §… / rule code> |
 
#### Bảng B — Đối tượng kiểm chứng & bổ trợ (Nhóm 2/3/4)
 
| # | Màn hình | Label gốc / Nội dung | Nhóm | Loại đối tượng | Điều kiện hiển thị / trigger | Loại trừ với | Mô tả / nội dung mong đợi | Nguồn |
|---|---|---|---|---|---|---|---|---|
| <ID> | <SCR-ID> | <label / nội dung message> | 2 / 3 / 4 | <Chỉ báo / Read-only / Lỗi inline / Toast / Banner / Empty state / Tiêu đề / Logo / Footer / Spinner / Scrollbar / Other> | <Luôn hiện / Theo điều kiện: trigger> | <ID/vùng loại trừ, hoặc —> | <nội dung mong đợi; "chứa <ID>" nếu lồng Nhóm 1> | <UC §… / rule code> |
 
> *(Lặp khối `### <SCR-ID>` cho từng màn / popup / email.)*
> Ràng buộc không phải UI object (vd. nội dung cấm xuất hiện): ghi note riêng dưới khối màn, kèm `Nguồn`.
 
---
 
## 5. Thuộc tính và hành vi của UI object
 
> **Chỉ** đối tượng tương tác (Nhóm 1) từ Section 4. Tham chiếu ID Section 4, không chép lại thuộc tính tĩnh.
> Cách phân tích hành vi, phạm vi, xử lý Nhóm 2 trong cột phản hồi: xem **§F.2** của skill.
 
| # (ref §4) | Object (tên ngắn) | Màn hình | Trạng thái hệ thống liên quan | Tương tác của user | Hành vi / phản hồi của hệ thống | Loại nhánh | Nguồn |
|---|---|---|---|---|---|---|---|
| <ID khớp §4> | <tên ngắn> | <SCR-ID> | Enabled / Disabled / Hidden / Read-only / Loading / Error | Click / Tap / Input / Hover / Submit / Focus / Blur | <phản hồi; trỏ tới đối tượng bị tác động, vd. "→ hiện lỗi <ID>"> | Happy / Alternative / Exception | <UC §… / rule code> |
 
> Một đối tượng có thể có nhiều dòng (mỗi trạng thái / nhánh một dòng). Hành vi suy luận chưa có trong source: ghi `Suy luận cần xác nhận`.

---

## 6. Phân rã nghiệp vụ và luồng xử lý

> Phân tích các chức năng / sub-flow chính trong use case. Có thể nhân bản block 6.x cho từng function như: đăng nhập, tìm kiếm, tạo mới, cập nhật, xoá, export, phê duyệt, gửi thông báo...

### 6.1 Tên chức năng / luồng: [Tên chức năng]

#### A. Luồng xử lý

| Bước | Actor | Hành động / trigger | Phản hồi hệ thống - happy path | Luồng thay thế | Luồng lỗi / exception | Nguồn |
|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |

#### B. Business rules và validation

| Field / Object / Rule | Điều kiện / constraint | Bắt buộc? | Kết quả khi hợp lệ | Kết quả khi không hợp lệ | Nguồn |
|---|---|---|---|---|---|
|  |  | Yes / No / N/A |  |  |  |

Nếu rule được tham chiếu bằng mã, phải viết rõ nội dung rule:

```text
[Diễn giải rule]. (Nguồn: common rules; mã: <BR/COMMON ID>; nội dung nguồn: "<nội dung rule gốc>")
```

#### C. Thông báo, lỗi và phản hồi UI/UX

| Trường hợp | Loại phản hồi | Nội dung hiển thị / message | Mã / mục gốc | Nguồn |
|---|---|---|---|---|
|  | Banner / Toast / Inline error / Modal / Loading / Empty state / Other |  |  |  |

Nguyên tắc:
- Không ghi chỉ `4x`, `5x`, `error`, `exception`.
- Phải giải thích nguyên nhân lỗi và phản hồi hệ thống.
- Nếu có message code, phải resolve nội dung message gốc.

---

## 7. Phân tích liên kết và ảnh hưởng giữa các chức năng

| Chức năng / hành động kích hoạt | Khu vực / UC / module bị ảnh hưởng | Ảnh hưởng nghiệp vụ | Kiểm tra nhất quán dữ liệu | Nguồn |
|---|---|---|---|---|
|  |  |  |  |  |

Gợi ý phân tích:
- Dữ liệu được tạo/cập nhật ở UC này có xuất hiện ở màn hình hoặc UC khác không?
- Trạng thái thay đổi ở UC này có ảnh hưởng permission, notification, dashboard, report hoặc integration không?
- Có use case nào phụ thuộc vào kết quả của use case này không?

---

## 8. Acceptance Criteria

> Nếu source có AC rõ ràng, tổng hợp lại theo format có thể test được. Nếu source thiếu AC nhưng flow/rule đủ rõ, Agent có thể đề xuất AC từ phần hiểu nghiệp vụ và đánh dấu `Suy luận cần xác nhận`.

| AC # | Scenario | Given - điều kiện | When - hành động | Then - kết quả mong đợi | Nguồn / ghi chú |
|---|---|---|---|---|---|
| AC-01 |  |  |  |  |  |

Nguyên tắc:
- AC phải có thể pass/fail.
- Không viết AC quá chung như “system works correctly”.
- Với AC suy luận, ghi rõ `Suy luận cần xác nhận`.

---

## 9. Yêu cầu phi chức năng

| Nhóm | Requirement | Ảnh hưởng đến test | Nguồn |
|---|---|---|---|
| Performance |  |  |  |
| Security |  |  |  |
| Compatibility |  |  |  |
| Accessibility |  |  |  |
| Audit / Logging |  |  |  |
| Privacy / Compliance |  |  |  |

Nếu không tìm thấy NFR trong source, ghi rõ là thiếu thay vì tự suy đoán.

---

## 10. Gap, mâu thuẫn và câu hỏi mở

### 10.1 Bảng gap và câu hỏi cần xác nhận

| ID | Mức ưu tiên | Loại vấn đề | Tham chiếu nguồn | Nội dung vấn đề / câu hỏi cần xác nhận | Vì sao quan trọng | Owner đề xuất | Trạng thái |
|---|---|---|---|---|---|---|---|
| Q1 | High / Medium / Low | Missing / Unclear / Conflict / Assumption / Suggestion |  |  |  | BA / QC Lead / Tech Lead / PO / TBD | Open |

Nguyên tắc viết câu hỏi:
- Viết bằng tiếng Việt rõ ràng.
- Nêu đúng vấn đề cần BA/QC Lead trả lời.
- Không hỏi chung chung như “Please clarify”.
- Nếu là mâu thuẫn, ghi rõ hai nguồn đang mâu thuẫn như thế nào.
- Nếu là thiếu thông tin, ghi rõ thiếu thông tin nào và ảnh hưởng gì đến test design.

**Ví dụ câu hỏi tốt:**

> UC mô tả trường hợp tài khoản bị tạm ngưng sẽ hiển thị banner lỗi, nhưng chưa nêu nội dung message cụ thể. BA vui lòng xác nhận exact message cần hiển thị cho trường hợp này. Nếu chưa có message, test case không thể kiểm tra đúng expected result của UI.

### 10.2 Dependency cần theo dõi

| Dependency | Loại | Ảnh hưởng | Owner | Trạng thái |
|---|---|---|---|---|
|  | UC / API / Common rule / Data / Integration / Environment / Other |  |  | Open / In Progress / Resolved |

---

## 11. Change log

| Version | Ngày | Người cập nhật | Nội dung thay đổi |
|---|---|---|---|
| v1 | YYYY-MM-DD | QC UC Read Agent | Tạo báo cáo audited lần đầu |

---

*Template audited UC readiness - Vietnamese headings version*
