# Question Backlog

> Generated: 11/05/2026
> Source files: UC69_tra-cuu-van-ban-phap-luat_audited_20260511_v1.md

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q9 | L | "Tải văn bản" — Section 2.3, #4 | Khi tap "Tải văn bản", file được lưu ở đâu trên thiết bị? App có yêu cầu quyền storage (Android) không? Trên iOS hành vi tải file như thế nào (Files app? Share sheet?)? | Cần biết vị trí lưu và quyền để test trên cả 2 platform. | Open |

Priority: H = High (blocks design), M = Medium (affects scope), L = Low (nice to know)
Status: Open | Answered | Deferred

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
| Q1 | M | "Nút Lọc" — Section 2.1, #4 | UC không đề cập Active filter indicator theo CMR-02 v1.1. UC69 có áp dụng indicator này không? | Có áp dụng Active filter indicator theo CMR-02. | BA | 11/05/2026 | Answered |
| Q2 | M | "Cơ quan ban hành" — Section 2.2, #2 | Trường "Cơ quan ban hành" trong bộ lọc có giới hạn ký tự tối đa không? | Có áp dụng giới hạn ký tự (theo CMR-01: 500 ký tự). | BA | 11/05/2026 | Answered |
| Q3 | M | "Dropdown" — Section 2.2, #4-6 | Các dropdown trong bộ lọc có hỗ trợ searchable theo CMR-03 không? | Có áp dụng searchable dropdown theo CMR-03. | BA | 11/05/2026 | Answered |
| Q4 | L | "Phân quyền" — Section 1 | Có role nào khác bị hạn chế truy cập UC69 không? | Không có role nào khác. Chỉ cần đăng nhập (Cá nhân/Tổ chức) là đủ. | BA | 11/05/2026 | Answered |
| Q5 | L | "Preconditions" — Section 1 | Khi người dùng chưa đăng nhập cố truy cập UC69, hành vi cụ thể là gì? | Không test nên bỏ qua. | BA | 11/05/2026 | Deferred |
| Q6 | M | "Số ký hiệu" — Section 2.3, #3 | Hành vi khi số ký hiệu rất dài là gì? Wrap hay truncate? | Wrap xuống dòng nếu giá trị quá dài. | BA | 11/05/2026 | Answered |
| Q7 | M | N/A (Missing) | UC69 có áp dụng full-screen loading cho first-load danh sách không? | Có áp dụng full-screen loading theo CMR-07 v1.1. | BA | 11/05/2026 | Answered |
| Q8 | L | N/A (Missing) | Các label cứng trên UC69 có thay đổi theo ngôn ngữ không? | Có đổi ngôn ngữ theo CMR-17. | BA | 11/05/2026 | Answered |
| Q10 | M | "Văn bản liên quan" — Section 2.3 | Có giới hạn depth cho navigation stack VB liên quan không? | Không giới hạn depth. Cho phép đi sâu vô hạn. | BA | 11/05/2026 | Answered |
| Q11 | M | "Khoảng ngày ban hành" — Section 2.2, #3 | UC69 có áp dụng đầy đủ CMR-15 không? Có cho phép chọn ngày tương lai không? | Có follow CMR-15 đầy đủ. Cho phép chọn ngày tương lai (vì có status "Chưa hiệu lực" — chưa tới ngày ban hành). | BA | 11/05/2026 | Answered |
| Q12 | L | N/A (Missing) | App có hỗ trợ landscape mode không? | Không áp dụng landscape. Chỉ hỗ trợ Portrait. | BA | 11/05/2026 | Answered |
