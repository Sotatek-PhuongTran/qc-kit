# Question Backlog

> Generated: 2026-05-08
> Last Updated: 2026-05-08 (v3 re-audit)
> Source files: UC40_tra-cuu-dat-kcn_audited_20260508_v3.md
> Scope: Mobile Client only (không audit logic API/backend)

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q9 | Medium | Section 5.5 — Debounce Navigation | Nút Back vật lý (Android) khi Bottom Sheet bộ lọc đang mở → Đóng Bottom Sheet hay thoát màn hình? Section 5.5 có đề cập debounce navigation chung nhưng không mô tả cụ thể hành vi Back button khi có Bottom Sheet/overlay đang mở. | Client behavior trên Android cần đúng platform convention, cần mô tả rõ để QA test trên thiết bị Android | Open |
| Q11 | Medium | Section 1 — "Phân quyền: Tất cả cá nhân đã đăng nhập thành công đều được truy cập (không phân biệt vai trò)." | Tất cả người dùng đều thấy cả lô đất "Chưa công bố"? Thông thường, thông tin "Chưa công bố" chỉ dành cho admin/quản trị. Hỏi BA: Xác nhận rằng mọi vai trò đều có quyền xem lô đất "Chưa công bố". | Nếu sai, client hiển thị dữ liệu không nên thấy → lỗ hổng UX/phân quyền nghiêm trọng | Open |

Priority: High = blocks design, Medium = affects scope, Low = nice to know
Status: Open | Answered | Deferred

_(2 câu Medium Open — đều không block happy path. QA có thể tiếp tục test design cho ~95% scope song song chờ BA trả lời.)_

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
| Q1 | High | Section 2.1 — Ô tìm kiếm, Section 5.1, 5.2 | UC tham chiếu sai CMR-16 (API Performance) thay vì CMR-14 (Empty State) cho empty state. | Đã sửa tham chiếu CMR-16 → CMR-14 ở Section 2.1 (ô tìm kiếm — empty search result), Section 5.1 (danh sách rỗng "Không có dữ liệu."), Section 5.2 (không tìm thấy kết quả "Không tìm thấy kết quả."). | BA | 2026-05-08 | Answered |
| Q2 | High | N/A (Missing) — Pull to Refresh | UC40 không đề cập CMR-13 (Pull to Refresh). Client UC40 có hỗ trợ Pull to Refresh không? | Có — Bổ sung Section 5.3 Pull-to-Refresh: Kéo xuống từ đầu danh sách → reload toàn bộ (áp dụng bộ lọc & từ khóa hiện tại); spinner/animation ở đầu list; không trigger duplicate khi đang refresh/lazy load (Xem CMR-13). | BA | 2026-05-08 | Answered |
| Q3 | Medium | N/A (Missing) — Partial Load | Khi một phần dữ liệu load thất bại (VD: danh sách OK nhưng dropdown KCN fail), client hiển thị thế nào? | Bổ sung Section 3.4: **Không block toàn màn.** Phần dữ liệu thành công vẫn hiển thị bình thường; phần lỗi hiển thị trạng thái lỗi cục bộ. Ví dụ: danh sách lô đất load OK + dropdown KCN fail → vẫn hiển thị danh sách; dropdown hiển thị empty option. | BA | 2026-05-08 | Answered |
| Q4 | Medium | Bảng 2.1 — Nút "Áp dụng" | Nút "Áp dụng" trong Bottom Sheet: Khi validation diện tích fail (Đến < Từ), nút bị disabled (grayed out) hay chỉ không phản hồi khi tap? | **Disabled (grayed out)** khi validation Diện tích fail (Đến < Từ); **Enabled** khi tất cả tiêu chí hợp lệ (hoặc để trống). Cập nhật tại Section 2.1 Bảng Bottom Sheet, dòng nút "Áp dụng". | BA | 2026-05-08 | Answered |
| Q5 | Medium | N/A (Missing) — Searchable Dropdown KCN | Dropdown KCN trong bộ lọc có hỗ trợ searchable không? | Có — Dropdown KCN là **Dropdown (Single-selection, Searchable)**. Cho phép người dùng nhập từ khóa để tìm kiếm trong danh sách KCN (tìm kiếm gần đúng, sắp xếp A-Z). Tham chiếu CMR-03. Cập nhật tại Section 2.1 Bảng Bottom Sheet, dòng "Khu công nghiệp". | BA | 2026-05-08 | Answered |
| Q6 | Medium | N/A (Missing) — Max Length Search | Ô tìm kiếm: Max length từ khóa tìm kiếm là bao nhiêu? | **Max length: 500 ký tự** (Xem CMR-01). Khi nhập đủ 500 ký tự, không cho phép nhập thêm. Cập nhật tại Section 2.1 Bảng, dòng "Ô tìm kiếm". | BA | 2026-05-08 | Answered |
| Q8 | Medium | N/A (Missing) — Double-tap Debounce | Trường hợp user tap nhanh liên tục vào cùng một Card lô đất → client có navigate nhiều lần không? | Có debounce. Bổ sung Section 5.5: khi user tap nhanh liên tục (double tap) vào Card lô đất hoặc các nút navigation (Quay lại, Lọc...), hệ thống áp dụng cơ chế debounce để tránh mở trùng lặp màn hình. Tham chiếu CMR-18. | BA | 2026-05-08 | Answered |
| Q10 | Medium | N/A (Missing) — Session expiry | Session hết hạn khi đang xem → client xử lý thế nào? | Cập nhật Section 3.3: HTTP 401 → hệ thống tự động sử dụng **refresh token** để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (**quá 15 ngày**) → **Redirect về màn hình Đăng nhập**, hiển thị **toast** "Phiên đăng nhập hết hạn." (Xem CMR-07). | BA | 2026-05-08 | Answered |
| Q13 | Low | N/A (Missing) | Đơn vị diện tích: UC ghi "m²" trong bộ lọc nhưng trong danh sách Card không ghi đơn vị. Đơn vị diện tích có hiển thị trên Card và màn chi tiết không? | Không cần hiển thị đơn vị diện tích trên Card và màn chi tiết. | BA | 2026-05-08 | Answered |
| Q14 | Low | Section 2.2.2 — "Thời hạn thuê" | Thời hạn thuê hiển thị dạng "2 năm" — Đây là text tự do hay format cố định? Nếu giá trị là null, hiển thị "-", nhưng nếu giá trị là 0 thì hiển thị gì? | **Text tự do** — user input thế nào thì hiển thị thế đó. Null → "-". Nếu user input "0" thì hiển thị đúng "0" (hoặc format user nhập). | BA (qua chat) | 2026-05-08 | Answered |
| Q15 | Low | Section 2.2.6 — File đính kèm | UC không mô tả sắp xếp danh sách file đính kèm trong màn chi tiết. File sắp xếp theo thứ tự nào? | **Sắp xếp theo ngày upload giảm dần** (mới nhất hiển thị trên cùng). Nếu nhiều file được upload cùng thời điểm → sắp xếp theo thứ tự như lúc tạo. Cập nhật tại Section 2.2.6. | BA | 2026-05-08 | Answered |
| Q7 | Medium | Section 2.1 — Bộ lọc Diện tích (Từ/Đến) | Diện tích (Từ/Đến): Min/max value là bao nhiêu? | **Min = 1** (số nguyên dương bắt đầu từ 1, số 0 không phải số nguyên dương). **Max = số có tối đa 500 ký tự** (theo CMR-11 max length mặc định cho trường số) — tức giá trị tối đa là số nguyên dương có 500 chữ số. | BA | 2026-05-08 | Answered |

_(12 answered questions.)_

---

## Deferred Questions

| ID | Priority | Ref | Question | Reason for Deferral | Deferred By | Date | Status |
|----|----------|-----|----------|---------------------|-------------|------|--------|

_(No deferred questions.)_

---

## Change Log

| Date | Version source | Changes |
|------|---------------|---------|
| 2026-05-08 | v1 audit | Khởi tạo 15 câu hỏi (Q1-Q15) |
| 2026-05-08 | v2 audit | **Loại bỏ Q12** (API endpoint — thuộc tầng backend, ngoài phạm vi client test). **Hạ mức Q3** từ High → Medium (reframe câu hỏi cho hành vi client thay vì logic API). Tổng còn **14 câu hỏi** (2 High, 9 Medium, 3 Low). |
| 2026-05-08 | BA response (v2) | **Q13 Answered** — BA xác nhận không cần hiển thị đơn vị diện tích trên Card và màn chi tiết. Còn **13 câu hỏi Open** (2 High, 9 Medium, 2 Low). |
| 2026-05-08 | BA update UC v3 + v3 audit | **BA update UC40 thành v3, giải quyết 10 câu hỏi:** Q1, Q2 (2 High); Q3, Q4, Q5, Q6, Q8, Q10 (6 Medium); Q14 (chat), Q15 (1 Low). Còn **3 câu Medium Open: Q7, Q9, Q11** — đều không block happy path. |
| 2026-05-08 | BA response (chat) | **Q7 Answered** — BA xác nhận: min=1 (số 0 không phải số nguyên dương), max = số có 500 ký tự (theo CMR-11). Còn **2 câu Medium Open: Q9, Q11**. |

---
