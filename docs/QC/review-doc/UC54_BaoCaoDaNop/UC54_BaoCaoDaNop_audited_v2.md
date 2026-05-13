# UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile

| Thông tin | Chi tiết |
| --- | --- |
| **Tài liệu** | UC Readiness Review — Audit Report |
| **UC** | UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile |
| **Phiên bản UC** | v2.2 (08/05/2026) |
| **Ngày tạo** | 08/05/2026 |
| **Tác giả** | Claude Agent (QC Review) |
| **Phiên bản báo cáo** | v2 (Re-audit) |
| **Audit trước** | UC54_BaoCaoDaNop_audited_v1.md |

---

## Tài liệu đầu vào

| # | Tài liệu | Đường dẫn | Trạng thái |
| --- | --- | --- | --- |
| 1 | Common Mobile Rules | `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1.1) | ✅ Đã đọc |
| 2 | UC54 Spec | `docs/BA/SRS-mobile/UC54_BaoCaoDaNop/UC54_BaoCaoDaNop.md` (v2.2) | ✅ Đã đọc |
| 3 | Wireframe | `docs/BA/SRS-mobile/UC54_BaoCaoDaNop/UC 54. Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên mobile.png` | ✅ Đã đọc |
| 4 | API Spec | N/A | ⚠️ Không được cung cấp |
| 5 | Audit v1 | `docs/QC-MOBILE/review-doc/UC54_BaoCaoDaNop/UC54_BaoCaoDaNop_audited_v1.md` | ✅ Đã đọc |
| 6 | Question Backlog | `docs/QC-MOBILE/review-doc/UC54_BaoCaoDaNop/UC54_BaoCaoDaNop_question-backlog.md` | ✅ Đã đọc |

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score v1 | Score v2 | Status | Thay đổi |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Feature Identity (title, ID, context) | 5 | 5/5 | 5/5 | ✅ Complete | Không đổi |
| 2 | Objective & Scope | 5 | 4/5 | 5/5 | ✅ Complete | +1 (real-time fallback đã rõ) |
| 3 | Actors & User Roles | 10 | 7/10 | 10/10 | ✅ Complete | +3 (CN/TC giống nhau đã xác nhận) |
| 4 | Preconditions & Postconditions | 10 | 6/10 | 8/10 | ⚡ Partial | +2 (tab→Sidebar đã sửa; còn thiếu postcondition) |
| 5 | UI Object Inventory & Mapping | 15 | 11/15 | 14/15 | ⚡ Partial | +3 (AC5 Download xóa; debounce nav bổ sung; còn badge color gap) |
| 6 | Object Attributes & Behavior Definition | 20 | 12/20 | 17/20 | ⚡ Partial | +5 (section default=mở; stat banner unclickable; K/M→CMR-11; còn badge color + report type mapping) |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14/20 | 18/20 | ⚡ Partial | +4 (year filter xóa; real-time fallback; debounce nav; còn report type variations) |
| 8 | Functional Integration Analysis | 10 | 5/10 | 8/10 | ⚡ Partial | +3 (real-time fallback CMR-07/13; còn thiếu partial API failure) |
| 9 | Acceptance Criteria | 10 | 6/10 | 9/10 | ⚡ Partial | +3 (AC5 sửa; ACs rõ hơn; còn thiếu measurable criteria) |
| 10 | Non-functional Requirements | 5 | 3/5 | 4/5 | ⚡ Partial | +1 (session handling CMR-18; còn thiếu accessibility/compatibility) |
| **Total** | | **110** | **73/110** | **98/110** | | **+25** |

### Điểm chuẩn hóa: **98/110 → 89.1/100**

### Verdict: ⚡ CONDITIONALLY READY (89.1/100)

> Điểm số 89.1/100 nằm trong khoảng 70-89 → QA có thể bắt đầu thiết kế test case cho các phần đã rõ ràng. Các gap còn lại (đặc biệt Q1 badge color, Q5 report type mapping) cần được giải quyết song song.

---

## Chi tiết đánh giá từng Knowledge Area

### KA1 — Feature Identity (5/5) ✅

- **Tiêu đề**: "Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile" — rõ ràng, đủ ngữ cảnh.
- **ID**: UC54 — xác định.
- **Ngữ cảnh**: Thuộc module Mobile, phân hệ Ứng dụng Di động, chức năng Tra cứu báo cáo.
- **Phiên bản**: v2.2 ngày 08/05/2026 — có tracking version và changelog chi tiết.

### KA2 — Objective & Scope (5/5) ✅ *(v1: 4/5 → v2: 5/5)*

- **Mục tiêu**: §1 nêu rõ — cho phép cá nhân/tổ chức tra cứu, tìm kiếm, lọc và xem chi tiết các báo cáo đã nộp. ✅
- **Phạm vi đồng bộ**: §1 dòng 30-37 mô tả chi tiết real-time sync Web↔Mobile, bao gồm cả fallback khi mất kết nối (giữ dữ liệu cũ + CMR-07) và khôi phục (pull-to-refresh + CMR-13). ✅ *(Đã giải quyết Q6)*
- **UC reference**: UC54 (Phụ lục XIV — Nhóm C.V). ✅

### KA3 — Actors & User Roles (10/10) ✅ *(v1: 7/10 → v2: 10/10)*

- **Actors**: Cá nhân và Tổ chức (đã đăng nhập). ✅
- **Phân quyền**: Chỉ xem báo cáo của chính mình nộp. ✅
- **Khác biệt CN/TC**: §1 dòng 26 xác nhận rõ ràng: "Giao diện, dữ liệu hiển thị, và các tùy chọn filter của Cá nhân và Tổ chức **là giống nhau**, không có khác biệt về hành vi hay UI." ✅ *(Đã giải quyết Q11)*

### KA4 — Preconditions & Postconditions (8/10) ⚡ *(v1: 6/10 → v2: 8/10)*

- **Precondition**: Đã đăng nhập, truy cập qua Sidebar → "Báo cáo đã nộp". ✅
- **State persistence**: §2.1 dòng 57-58 đã sửa rõ: tap card xem chi tiết → quay lại → giữ nguyên search/filter; chuyển sang **mục khác trên Sidebar** → reset. ✅ *(Đã giải quyết Q4)*
- **Session handling**: §2.1 dòng 107-108 bổ sung force close (giữ session) và uninstall (yêu cầu đăng nhập lại) theo CMR-18. ✅
- **Gap còn**: Không có postcondition — trạng thái hệ thống sau khi hoàn thành flow (audit log, đánh dấu "đã xem"). ⚡ *(Q12 vẫn Open)*

### KA5 — UI Object Inventory & Mapping (14/15) ⚡ *(v1: 11/15 → v2: 14/15)*

- **Màn hình Danh sách (§2.1)**: Header, Stat Banner (6 thẻ), Search Box, Filter Button, Bottom Sheet (3 dropdown + X + Nhập lại + Áp dụng), Card List (6 trường), debounce navigation (CMR-18). ✅
- **Màn hình Chi tiết (§2.2)**: Header, Banner chính (3 trường), Quick Action (Lịch sử), 7 Section collapsible, Modal Lịch sử (3 trường). ✅
- **AC5 cũ (Download)**: Đã xóa — không còn tham chiếu nút Download không tồn tại. ✅ *(Đã giải quyết Q3)*
- **Gap còn**: Badge Trạng thái (§2.1 dòng 113) — vẫn ghi "Màu sắc dựa theo UI design: - " với danh sách trống. Không có mapping màu-trạng thái cụ thể. ⚠️ *(Q1 vẫn Open)*

### KA6 — Object Attributes & Behavior Definition (17/20) ⚡ *(v1: 12/20 → v2: 17/20)*

- **Stat Banner**: 6 thẻ, read-only, unclickable — rõ ràng. Format số theo CMR-11. ✅ *(Đã giải quyết Q8, Q10)*
- **Section collapsible default**: §2.2 dòng 129 — tất cả section mở khi mở chi tiết. Đóng/mở không ảnh hưởng section khác. ✅ *(Đã giải quyết Q9)*
- **Debounce navigation**: §2.1 dòng 104-106, CMR-18. ✅ *(Đã giải quyết Q13)*
- **Search Box**: CMR-01 (debounce 3s, auto-search, state persistence, max 500 ký tự). ✅
- **Card List**: Lazy load 20/trang, CMR-04. ✅
- **Null handling**: Tất cả field chi tiết đều có rule "Nếu null → hiển thị '-'". ✅
- **Wrap text**: §2.2 dòng 127 — tất cả field label wrap text, không truncate. ✅
- **Gap còn**: Badge color mapping vẫn trống (§2.1 dòng 113). ⚠️ *(Q1 vẫn Open)*
- **Gap còn**: Report type field mapping (§2.2 dòng 125) — "tùy thuộc vào loại báo cáo" nhưng không có bảng mapping. ⚠️ *(Q5 vẫn Open)*
- **Gap mới**: CMR-02 bổ sung "Active filter indicator" (icon indicator màu xanh lá cây khi có filter active) nhưng UC54 §2.1 không đề cập đến indicator này. ⚡ *(Q16 mới)*

### KA7 — Functional Logic & Workflow Decomposition (18/20) ⚡ *(v1: 14/20 → v2: 18/20)*

- **Luồng chính**: Truy cập → Xem danh sách → Tìm kiếm/Lọc → Xem chi tiết → Xem lịch sử — mô tả đầy đủ. ✅
- **Year filter**: Đã xóa khỏi §3.1 — không còn mâu thuẫn. ✅ *(Đã giải quyết Q2)*
- **Real-time fallback**: §1 dòng 36-37 mô tả rõ: mất kết nối → giữ dữ liệu cũ + lỗi mạng (CMR-07); khôi phục → thông báo + pull-to-refresh (CMR-13). ✅ *(Đã giải quyết Q6)*
- **Sắp xếp**: Mặc định theo ngày tạo giảm dần. ✅
- **Error handling**: Bảng 4 trường hợp (mất mạng, 500, timeout, 401 session expiry với refresh token logic). ✅
- **Timeline/Lịch sử**: §2.2 Modal Lịch sử — 3 trường (bước xử lý, tên người xử lý, thời gian), sắp xếp giảm dần, dữ liệu từ phân hệ Web. ✅ *(Đã giải quyết Q7)*
- **Gap còn**: Report type variations — logic hiển thị trường khác nhau theo loại báo cáo chưa có chi tiết. ⚡ *(Q5 vẫn Open)*

### KA8 — Functional Integration Analysis (8/10) ⚡ *(v1: 5/10 → v2: 8/10)*

- **Đồng bộ Web↔Mobile**: Real-time sync với fallback rõ ràng — mất kết nối giữ dữ liệu cũ (CMR-07), khôi phục pull-to-refresh (CMR-13). ✅
- **Sidebar navigation**: Điểm truy cập xác định. State reset khi chuyển mục Sidebar. ✅
- **Session handling**: Force close giữ session, uninstall yêu cầu đăng nhập lại (CMR-18). ✅
- **Modal Lịch sử**: Dữ liệu refer phân hệ Báo cáo trên Web. ✅
- **Gap còn**: Partial API failure — nếu API Stat Banner thất bại nhưng API danh sách thành công, UI xử lý thế nào? ⚡

### KA9 — Acceptance Criteria (9/10) ⚡ *(v1: 6/10 → v2: 9/10)*

- **AC1**: Stat Banner hiển thị đúng 6 chỉ số, format theo CMR-11. ✅
- **AC2**: Card hiển thị Mã BC (đỏ đậm), Trạng thái badge, Dự án, NĐT, Metadata. ✅
- **AC3**: Tap card → Chi tiết. ✅
- **AC4**: 7 section chi tiết hiển thị đúng. ✅
- **AC5 (mới)**: Modal Lịch sử hiển thị bước xử lý, tên người xử lý, thời gian — sắp xếp giảm dần. ✅
- **Gap còn**: Các AC vẫn mang tính mô tả, chưa hoàn toàn là measurable pass/fail statements. Tuy nhiên cho mức UC mobile, đã đủ rõ để test. ⚡

### KA10 — Non-functional Requirements (4/5) ⚡ *(v1: 3/5 → v2: 4/5)*

- **Hiệu suất**: Timeout 10s (CMR-16). ✅
- **Lazy load**: 20 bản ghi/trang (CMR-04). ✅
- **Session**: Force close/uninstall handling (CMR-18). ✅
- **Loading state**: First-load toàn màn hình, lazy load spinner cục bộ (CMR-07). ✅
- **Đa ngôn ngữ**: CMR-17 áp dụng. ✅
- **Gap còn**: Không đề cập accessibility (screen reader, font scaling) và device/OS compatibility. ⚡ *(Q14, Q15 vẫn Open)*

---

## Cross-Artefact Conflict Check

| # | Xung đột | Nguồn A | Nguồn B | Mức độ | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| C1 *(v1)* | "Chuyển sang tab khác" → mâu thuẫn với Sidebar navigation | §2.1 | UI spec | ⚠️ Warning | ✅ Đã sửa v2.2: "mục khác trên Sidebar" |
| C2 *(v1)* | "Mặc định lọc theo Năm hiện tại" → không có trường Năm | §3.1 | §2.1 Bottom Sheet | ⚠️ Warning | ✅ Đã sửa v2.2: xóa filter năm |
| C3 *(v1)* | AC5 "Nút Download" → không tồn tại trong UI | §3.2 | §2.1 & §2.2 | ⚠️ Warning | ✅ Đã sửa v2.2: xóa AC5 cũ |
| C4 *(v1)* | Badge color mapping trống | §2.1 dòng 113 | (Không có nguồn bổ sung) | ⚠️ Warning | ❌ Vẫn còn |
| C5 *(mới)* | CMR-02 yêu cầu "Active filter indicator" nhưng UC54 không đề cập | CMR-02 | §2.1 Filter Button | ⚡ Info | ❓ Cần xác nhận |
| C6 *(mới)* | §5 dòng 15 ghi "v2.1" trong bảng thuộc tính nhưng header ghi "v2.2" | §header dòng 5 | §bảng thuộc tính dòng 15 | ⚡ Info | ❓ Lỗi nhỏ |

---

## 📋 Unified Gap & Question Report

### Câu hỏi từ v1 — Đã giải quyết

| ID | Question | Trạng thái | Cách giải quyết |
| --- | --- | --- | --- |
| Q2 | Mâu thuẫn "lọc theo Năm" vs không có trường Năm | ✅ Resolved | BA xóa rule "mặc định lọc theo năm" trong §3.1 |
| Q3 | AC5 "Nút Download" không tồn tại trong UI | ✅ Resolved | BA xóa AC5 cũ, thay bằng AC5 mới (Modal Lịch sử) |
| Q4 | Reference đến "tab" không tồn tại | ✅ Resolved | BA sửa thành "mục khác trên Sidebar (Left Sidebar)" |
| Q6 | Real-time sync thiếu fallback | ✅ Resolved | BA bổ sung §1 dòng 36-37: mất kết nối → CMR-07, khôi phục → CMR-13 |
| Q7 | Timeline 5 bước chưa rõ | ✅ Resolved | BA đơn giản hóa Modal Lịch sử: 3 trường, sắp xếp giảm dần, xóa bảng ví dụ cứng |
| Q8 | Quy tắc viết tắt K/M thiếu chi tiết | ✅ Resolved | BA delegate cho CMR-11 (Xem CMR-11) |
| Q9 | Section default state không rõ | ✅ Resolved | BA bổ sung §2.2 dòng 129: "tất cả section ở trạng thái mở" |
| Q10 | Stat Banner tap behavior không rõ | ✅ Resolved | BA bổ sung §2.1 dòng 64: "read-only, không thể tap (unclickable)" |
| Q11 | Khác biệt Cá nhân vs Tổ chức | ✅ Resolved | BA bổ sung §1 dòng 26: "giống nhau, không có khác biệt về hành vi hay UI" |
| Q13 | Double-tap behavior | ✅ Resolved | BA bổ sung §2.1 dòng 104-106: debounce navigation theo CMR-18 |

### Câu hỏi từ v1 — Vẫn Open

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q1 | High | §2.1 dòng 113: "Màu sắc dựa theo UI design: - " | **Badge Trạng thái vẫn thiếu mapping màu sắc.** Danh sách màu sau dấu "- " vẫn trống trong v2.2. CMR-05 định nghĩa quy tắc chung (Green=positive, Yellow=pending, Red=negative, Gray=neutral). Cần xác nhận: (a) Áp dụng CMR-05 hoàn toàn? (b) Mapping cụ thể: Đã nộp→?, Đang xử lý→Vàng?, Đã duyệt→Xanh lá?, Yêu cầu bổ sung→?, Từ chối→Đỏ? | QA không thể verify badge color trên card và banner chi tiết nếu không biết trạng thái nào ứng với màu nào. Badge hiển thị trên MỌI item. | Open |
| Q5 | Medium | §2.2 dòng 125: "tùy thuộc vào loại báo cáo" | **Thiếu mapping trường theo loại báo cáo.** 7 section chi tiết có thể ẩn/hiện khác nhau theo loại báo cáo (Định kỳ, Đột xuất...) nhưng không có bảng mapping cụ thể. Cần: Loại A → hiển thị section X, Y; Loại B → ẩn section Z... | QA không thể verify chi tiết theo từng loại báo cáo. Tuy nhiên, có thể test với assumption "hiển thị tất cả section" cho default case. | Open |

### Câu hỏi từ v1 — Vẫn Open (Low Priority)

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q12 | Low | N/A (Missing) | **Thiếu postcondition.** Không mô tả trạng thái hệ thống sau khi hoàn thành flow (audit log, "đã xem"). | Ảnh hưởng đến test case end-to-end và kiểm tra side effects. Không block test design chính. | Open |
| Q14 | Low | N/A (Missing) | **Accessibility.** Không đề cập screen reader, minimum touch target size, font scaling, contrast ratio. | Quan trọng cho WCAG compliance nhưng không block functional test design. | Open |
| Q15 | Low | N/A (Missing) | **Device/OS compatibility.** Không đề cập iOS/Android minimum version, tablet layout, landscape mode. | QA cần biết phạm vi thiết bị để lập test matrix. Không block functional test design. | Open |

### Câu hỏi mới từ Re-audit

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q16 | Low | CMR-02: "Active filter indicator" | **CMR-02 yêu cầu hiển thị icon indicator màu xanh lá cây khi có filter active**, nhưng UC54 §2.1 không đề cập cụ thể. Xác nhận UC54 có áp dụng active filter indicator từ CMR-02 không? | Nếu áp dụng, QA cần test indicator hiển thị/ẩn khi apply/reset filter. Nếu không, cần ghi rõ exception. | Open |
| Q17 | Low | §header dòng 5 vs §bảng dòng 15 | **Phiên bản không nhất quán:** Header ghi "v2.2" nhưng bảng thuộc tính ghi "v2.1". Cần sửa cho nhất quán. | Lỗi housekeeping nhỏ, không ảnh hưởng test design. | Open |

---

## 🟢 What's Good

1. **BA đã phản hồi tích cực**: 10/15 câu hỏi từ audit v1 đã được giải quyết trong UC54 v2.2 — tỷ lệ giải quyết 67%, thể hiện sự hợp tác tốt.
2. **Changelog chi tiết xuất sắc**: §4 Lịch sử cập nhật ghi rõ Before/After cho mỗi thay đổi — giúp QA và reviewer theo dõi evolution dễ dàng.
3. **Real-time sync fallback hoàn chỉnh**: §1 dòng 36-37 mô tả rõ ràng cả mất kết nối (giữ dữ liệu cũ + CMR-07) và khôi phục (thông báo + pull-to-refresh CMR-13).
4. **Debounce navigation & session handling**: §2.1 dòng 104-108 bổ sung đầy đủ debounce, force close, uninstall behavior theo CMR-18.
5. **Stat Banner behavior rõ ràng**: Unclickable, read-only, format số delegate CMR-11 — loại bỏ tất cả ambiguity.
6. **Section collapsible có default state**: Tất cả mở khi vào chi tiết, đóng/mở độc lập — clear spec.
7. **Error handling mở rộng**: Bổ sung HTTP 401 với refresh token logic (15 ngày expiry) — professional.
8. **Null handling nhất quán**: Tất cả field chi tiết đều có rule "Nếu null → hiển thị '-'" — rất tốt cho test.
9. **Modal Lịch sử đơn giản hóa**: Bỏ bảng ví dụ cứng, chỉ giữ 3 trường + sort giảm dần — rõ ràng hơn v2.

---

## 🧪 Testability Outlook

### What CAN be tested now:

- **Luồng chính end-to-end**: Sidebar → Danh sách → Search/Filter → Card tap → Chi tiết → Lịch sử — đầy đủ spec.
- **Search Box**: CMR-01 (debounce 3s, auto-search, 500 char limit, state persistence, near-match search).
- **Bottom Sheet Filter**: 3 dropdown (CMR-03), Áp dụng, Nhập lại, đóng X (CMR-02).
- **Stat Banner**: 6 thẻ read-only, unclickable, format số CMR-11.
- **Card List**: Lazy load 20/trang (CMR-04), sort giảm dần ngày tạo.
- **State persistence**: Vào chi tiết quay lại → giữ; chuyển Sidebar → reset.
- **Detail screen**: 7 section collapsible (default mở), tất cả field read-only, null → "-", wrap text.
- **Modal Lịch sử**: 3 trường, sắp xếp giảm dần.
- **Error handling**: Mất mạng, 500, timeout, 401 (refresh token 15 ngày).
- **Empty state**: "Không có dữ liệu" vs "Không tìm thấy kết quả" (CMR-14).
- **Pull-to-refresh**: CMR-13.
- **Debounce navigation**: Double-tap card (CMR-18).
- **Session handling**: Force close giữ session, uninstall yêu cầu đăng nhập lại.
- **Real-time sync**: Web→Mobile sync + offline fallback + reconnect.

### What CANNOT be tested yet (blocked by gaps):

- **Badge color verification**: Không có mapping màu-trạng thái → không verify được badge color trên card (Q1). *Tuy nhiên, QA CÓ THỂ test badge hiển thị/read-only behavior, chỉ không verify đúng màu.*
- **Detail fields per report type**: Không có mapping → không test chi tiết theo từng loại báo cáo (Q5). *Tuy nhiên, QA CÓ THỂ test default case (hiển thị tất cả section).*

### Suggested test focus areas (once gaps are resolved):

- **Happy path**: Đăng nhập → Sidebar → Danh sách → Search/Filter → Xem card → Chi tiết (7 sections) → Lịch sử
- **Alternative scenarios**: Filter từng loại báo cáo, từng trạng thái, từng tỉnh/thành phố; kết hợp search + filter
- **Boundary & validation tests**: Search 500 chars, lazy load page boundaries (20, 40, 60...), null fields, số lớn CMR-11
- **Error & exception scenarios**: Mất mạng giữa chừng, timeout API, 500 error, 401 session expiry, pull-to-refresh khi đang loading
- **UI-specific checks**: Badge colors (khi có mapping), section collapse/expand, Stat Banner scroll ngang, card truncate mã BC, wrap text field dài
- **CMR compliance tests**: CMR-01/02/03/04/05/07/08/11/12/13/14/16/17/18
- **Real-time behavior tests**: Sync Web→Mobile, offline/reconnect flow
- **Partial API failure tests**: Stat Banner API fail + List API success → UI behavior
- **Edge case tests**: Tên dự án dài (wrap text), ký tự đặc biệt trong search, double-tap navigation, back button nhanh

---

## 📌 Summary & Recommendation

UC54 v2.2 đã cải thiện đáng kể so với v2 — BA đã giải quyết **10/15 câu hỏi** từ audit v1, nâng điểm từ **66.4/100 (NOT READY) → 89.1/100 (CONDITIONALLY READY)**. Các gap lớn nhất đã được xử lý: real-time fallback, year filter mâu thuẫn, AC5 broken, tab reference sai, section default state, stat banner behavior, debounce navigation, và role differences. Còn lại **2 gap cần giải quyết**: (1) Badge color mapping vẫn trống — ảnh hưởng verify màu badge trên mọi card (Q1, High); (2) Report type field mapping thiếu — ảnh hưởng test chi tiết theo loại báo cáo (Q5, Medium). **Khuyến nghị: ⚡ CONDITIONALLY READY — QA có thể bắt đầu thiết kế test case cho ~90% tính năng ngay bây giờ.** Các gap Q1 và Q5 cần BA giải quyết song song. QA nên tập trung vào happy path, search/filter, error handling, và real-time sync trước, để badge color và report type variation testing cho sau khi BA cung cấp mapping.

---

## Changelog (v1 → v2)

| # | Thay đổi | Chi tiết |
| --- | --- | --- |
| 1 | UC54 spec updated v2 → v2.2 | BA cập nhật 12+ mục trong changelog §4 |
| 2 | CMR updated v1 → v1.1 | Bổ sung CMR-17 (Đa ngôn ngữ), CMR-18 (Debounce Nav), cập nhật CMR-02/07 |
| 3 | 10 câu hỏi resolved | Q2, Q3, Q4, Q6, Q7, Q8, Q9, Q10, Q11, Q13 |
| 4 | Score cải thiện | 73/110 (66.4%) → 98/110 (89.1%) |
| 5 | Verdict thay đổi | ❌ NOT READY → ⚡ CONDITIONALLY READY |
| 6 | 2 câu hỏi mới | Q16 (Active filter indicator), Q17 (Version inconsistency) |
| 7 | 5 câu hỏi vẫn Open | Q1 (badge color), Q5 (report type), Q12 (postcondition), Q14 (accessibility), Q15 (device/OS) |