# Question Backlog

> Generated: 08/05/2026
> Updated: 12/05/2026
> Source files: UC55_chuyen-trang-dau-tu_audited_20260508_v1.md, UC55_chuyen-trang-dau-tu_audited_20260508_v2.md, UC55_chuyen-trang-dau-tu_audited_20260508_v3.md, UC55_chuyen-trang-dau-tu_audited_20260508_v4.md

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q7 | Medium | Section 2.2: nhiều trường text (tên tỉnh, tên KCN, mô tả địa danh, chip text) | UC không định nghĩa **quy tắc truncate/wrap** cho các trường text có khả năng overflow: tên tỉnh trong header/list item, tên KCN, mô tả địa danh, text trong chip lĩnh vực. Xử lý thế nào khi text vượt quá chiều rộng? | Thiếu quy tắc truncate có thể gây vỡ layout trên thiết bị nhỏ | Deferred |
| Q9 | Medium | Section 2.2, #3: "Overlay text gồm: Tên tỉnh + tagline mô tả ngắn" | Khi **tagline mô tả ngắn** của tỉnh là null hoặc rỗng từ API, overlay trên banner xử lý thế nào? Chỉ hiển thị tên tỉnh hay ẩn luôn overlay? | Ảnh hưởng đến test case cho banner empty state | Deferred |

Priority: H = High (blocks design), M = Medium (affects scope), L = Low (nice to know)
Status: Open | Answered | Deferred

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
| Q1 | High | Section 2.2, #21 | Nút "Đăng ký tư vấn ngay" [TBD]. Luồng/màn hình đích? | **Bỏ CTA Đăng ký tư vấn** — Xóa nút #21 và toàn bộ hành vi liên quan khỏi scope UC55. | BA | 08/05/2026 | Answered |
| Q2 | High | Section 2.2, #7 | KPI NULL → hiển thị 4 thẻ đầy đủ hay chỉ thẻ có dữ liệu? | **4 thẻ vẫn hiển thị đủ, không break UI.** Khi 1 hoặc nhiều thẻ KPI bị NULL → hiển thị "--", layout 4 thẻ giữ nguyên. | BA | 08/05/2026 | Answered |
| Q3 | Medium | CMR-01 vs UC55 §2.1 #4 | Debounce 3 giây vs "lọc real-time"? | **Có áp dụng debounce 3 giây** theo CMR-01. "Real-time" trong UC55 nghĩa là không cần nhấn Enter, nhưng vẫn có debounce 3s. | BA | 08/05/2026 | Answered |
| Q4 | Medium | CMR-01 vs UC55 | State Persistence cho ô tìm kiếm tỉnh? | **Có áp dụng State Persistence** theo CMR-01. Sau khi vào chi tiết rồi quay lại, ô tìm kiếm giữ nguyên keyword và danh sách giữ trạng thái lọc. | BA | 08/05/2026 | Answered |
| Q5 | Medium | CMR-07/CMR-16 vs UC55 §3.3 | Timeout handling khi API > 10 giây? | **Giống CMR-07.** Áp dụng timeout 10 giây, hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại". | BA | 08/05/2026 | Answered |
| Q6 | Medium | CMR-04 vs UC55 §2.1 #5 | CMR-04 liệt kê UC55 nhưng UC55 "không lazy load"? | **Ngoại lệ có chủ đích.** UC55 cố ý không áp dụng lazy load (63 tỉnh tải 1 lần). CMR-04 liệt kê UC55 là lỗi trong CMR. | BA | 08/05/2026 | Answered |
| Q13 | Low | N/A (Missing) | Khóa portrait hay cho phép landscape? | **Không áp dụng landscape.** Ứng dụng khóa portrait cho UC55. | BA | 08/05/2026 | Answered |
| Q15 | Low | Section 2.2, #16 | Không có app bản đồ → xử lý thế nào? | **Mở browser.** Nếu thiết bị không có ứng dụng bản đồ nào được cài đặt, hệ thống fallback mở bản đồ trên trình duyệt. | BA | 08/05/2026 | Answered |
| Q16 | Low | Section 2.2: KPI format | UC55 format riêng vs CMR-11? | **Áp dụng theo docs UC55, không follow CMR-11.** UC55 có quy tắc format KPI riêng (K/M/B, 1 thập phân) khác với CMR-11 (dấu phẩy, 3 thập phân). | BA | 08/05/2026 | Answered |
| Q17 | Medium | Wireframe "Container tab" vs UC55 §2.2 | Wireframe gợi ý tab navigation, UC55 mô tả scroll dọc liên tục. Design cuối cùng? | **Container nằm ở giữa màn hình, không liên quan đến scroll.** Wireframe mô tả container chọn tab là UI element cố định giữa màn hình, không phải cơ chế navigation thay thế scroll. Không có conflict. | BA | 08/05/2026 | Answered |
| Q10 | Medium | N/A (Missing) | UC yêu cầu "đã đăng nhập" nhưng không nêu xử lý khi session hết hạn. Hệ thống xử lý thế nào? | **SRS v1.3 bổ sung:** Lỗi 401 → auto refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." (CMR-07) | SRS v1.3 | 12/05/2026 | Answered |
| Q12 | Low | Section 2.1, #4: Ô tìm kiếm | UC không nêu max length cho ô tìm kiếm tỉnh. Có giới hạn ký tự tối đa không? | **SRS v1.3 bổ sung:** Tối đa 500 ký tự (CMR-01). Auto-trim whitespace đầu/cuối. | SRS v1.3 | 12/05/2026 | Answered |

---

## Removed Questions

| ID | Priority | Reason for Removal | Removed By | Date |
|----|----------|-------------------|------------|------|
| Q8 | Medium | BA: "Không test API nên xoá" — Partial API failure không nằm trong scope testing | BA | 08/05/2026 |
| Q11 | Medium | BA: "Không test nên xoá" — Double-tap chặn không nằm trong scope testing | BA | 08/05/2026 |
| Q14 | Low | BA: "Không test nên xoá" — Deep link không nằm trong scope testing | BA | 08/05/2026 |
