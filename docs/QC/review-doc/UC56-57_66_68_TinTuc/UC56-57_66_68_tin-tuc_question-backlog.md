# UC56-57/66-68 — Tin tức — Question Backlog

**Tiêu đề:** UC56-57/66-68 Question Backlog
**Ngày tạo:** 11/05/2026
**Cập nhật lần cuối:** 11/05/2026 (Re-audit v2)
**Tác giả:** QC Agent (Claude)
**UC:** UC56-57/66-68 — Khai thác tin tức công bố trên Mobile
**BA phụ trách:** huyen.dinh2

---

## Open Questions

| ID  | Priority | Ref                       | Question                                                                                                                                                       | Why It Matters                                                                                 | Status |
| --- | -------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| Q13 | Low      | CMR-02 scope              | CMR-02 (Search Filter) không liệt kê UC56-68 trong scope. UC có filter modal nhưng không đề cập Active filter indicator. CMR-02 có áp dụng không? | Nếu áp dụng → thiếu UI element (indicator xanh lá). Nếu không → OK theo UC hiện tại | Open   |
| Q14 | Low      | §2.3 — Rich Text render | Nội dung Rich Text từ API có được sanitize phía client không?                                                                                          | Security concern (XSS) — thuộc NFR/security review                                           | Open   |

---

## Answered Questions

| ID  | Priority | Ref                   | Question                                        | Answer (from UC v1.2)                                                                               | Answered By | Date       | Status   |
| --- | -------- | --------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------- | ---------- | -------- |
| Q1  | Medium   | §2.1 Row #7, #9      | Tên người đăng bài quá dài → truncate? | Hiển thị đến max-width; vượt quá → truncate `...`                                         | huyen.dinh2 | 11/05/2026 | Resolved |
| Q2  | Medium   | §2.1 Row #9          | Thumbnail null → hiển thị gì?               | Placeholder icon (nền xám, icon ảnh broken)                                                      | huyen.dinh2 | 11/05/2026 | Resolved |
| Q3  | Low      | §2.1 Row #7          | Carousel 1 bài → UX?                          | 1 bài = tĩnh, không cuộn; ≥2 bài = auto-scroll 5s + cuộn ngang; không dot indicator         | huyen.dinh2 | 11/05/2026 | Resolved |
| Q4  | Low      | §2.1 Row #9          | Tag Category dài → truncate hay wrap?         | Wrap (không truncate)                                                                              | huyen.dinh2 | 11/05/2026 | Resolved |
| Q5  | Medium   | §3.4                 | Partial API failure → xử lý?                 | Section thành công hiển thị bình thường; section lỗi báo riêng theo CMR-07                | huyen.dinh2 | 11/05/2026 | Resolved |
| Q6  | Medium   | §3.1                 | Lazy load mất mạng → giữ data?              | Giữ data cũ + hiển thị lỗi mất kết nối theo CMR-07                                          | huyen.dinh2 | 11/05/2026 | Resolved |
| Q7  | Low      | CMR-18                | Debounce cho tap card/đổi tab?                | Áp dụng CMR-18 (Debounce Navigation) cho tap card và đổi tab                                   | huyen.dinh2 | 11/05/2026 | Resolved |
| Q8  | Medium   | §2.2                 | Android Back trên modal?                       | Nhấn Back → Quay lại màn trước                                                                | huyen.dinh2 | 11/05/2026 | Resolved |
| Q11 | Medium   | CMR-17 + §2.1 Row #6 | Tên Tab, labels dịch theo CMR-17?             | Có — tên 19 Tab, label "Tin tức mới nhất", placeholder "Tìm kiếm tin tức..." được dịch | huyen.dinh2 | 11/05/2026 | Resolved |
| Q12 | High     | §2.2 vs CMR-15       | Validation date range: CMR-15 hay UC66?         | Áp dụng CMR-15: cho phép 1 ngày; không chọn ngày nào → đóng modal, không lỗi           | huyen.dinh2 | 11/05/2026 | Resolved |
| Q15 | Medium   | §2.3 Row #7          | Ảnh inline lỗi → hiển thị gì? Zoom?       | Placeholder icon khi lỗi; tap không zoom (ngoài phạm vi UC)                                     | huyen.dinh2 | 11/05/2026 | Resolved |
| Q18 | Medium   | §2.1 Row #3-4        | Không có icon clear X — cố ý?              | Thiết kế cố ý — UC v1.2 giữ nguyên mô tả "(Không có icon clear X)"                       | huyen.dinh2 | 11/05/2026 | Resolved |

---

## Deferred Questions

| ID  | Priority | Ref                  | Question                                    | Reason for Deferral                                                                                             | Status   |
| --- | -------- | -------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| Q9  | Low      | §1 — Portrait      | App lock orientation portrait-only?         | UC ghi "Portrait" → infer portrait-only. Không block test design. Xác nhận khi có thêm thông tin từ dev | Deferred |
| Q10 | Low      | §1 — Preconditions | User chưa đăng nhập truy cập Tin tức? | Behavior chung của app (Sidebar chỉ hiển thị khi đã login). Không thuộc scope UC này                   | Deferred |
| Q16 | Low      | §3.3                | Navigation stack depth giới hạn?          | Edge case hiếm gặp. Không block test design. Ghi nhận cho performance testing                               | Deferred |
| Q17 | Low      | §3.1 step 4         | Skeleton vs Spinner khi đổi tab?          | UC nói "Skeleton Loading" → QA test Skeleton. Nếu khác thực tế → raise clarification                     | Deferred |
