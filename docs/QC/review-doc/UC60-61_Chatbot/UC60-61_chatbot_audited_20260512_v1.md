# UC60-61 — Chatbot Trợ lý Đầu Tư — UC Readiness Review

**Tiêu đề:** UC60-61_chatbot_audited_20260512_v1.md  
**Ngày tạo:** 12/05/2026  
**Tác giả:** QC Agent  
**Phiên bản:** v1 (First audit)

---

## Phase 1 — Feature Understanding

### 1. UI Object Inventory & Mapping

**Màn hình Welcome (Section 2.1):**

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 1 | Nút Quay lại (←) | Button (Icon) | ✅ | ✅ | CMR-06 ref |
| 2 | Icon Avatar Bot (Header) | Image (Circle) | ✅ | ✅ | |
| 3 | Tiêu đề Header "Trợ lý Đầu Tư" | Label | ✅ | ✅ | |
| 4 | Subtitle trạng thái | Label | ✅ | ✅ | 2 states: "Đang hoạt động" / "Chưa hoạt động" |
| 5 | Avatar Bot lớn | Image (Circle) | ✅ | ✅ | |
| 6 | Tiêu đề chào mừng | Label | ✅ | ✅ | |
| 7 | Câu hỏi mời tương tác | Label | ✅ | ✅ | |
| 8 | Mô tả năng lực bot | Label (Multiline) | ✅ | ✅ | |
| 9 | Bubble tin nhắn chào | Chat Bubble (Left) | ✅ | ✅ | |
| 10 | Danh sách chip gợi ý | Chip List | ✅ | ✅ | Dynamic từ API |
| 11 | Ô nhập câu hỏi | Textbox (Chat) | ✅ | ✅ | Max 500 ký tự, 5 dòng |
| 12 | Nút Gửi (Send) | Button (Icon) | ✅ | ✅ | 3 states |

**Màn hình Hội thoại (Section 2.2):**

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 14 | Bubble tin nhắn người dùng | Chat Bubble (Right) | ✅ | ✅ | |
| 15 | Bubble phản hồi Bot | Chat Bubble (Left) | ✅ | ✅ | Rich text support |
| 16 | File đính kèm | Attachment (Embedded) | ✅ | ✅ | CMR-08 ref |
| 17 | Typing Indicator | Animation (3 dots) | ✅ | ✅ | |
| 18 | Nhãn "Đánh giá câu trả lời:" | Label | ✅ | ✅ | |
| 19 | Nút Thumbs Up (👍) | Button (Icon) | ✅ | ✅ | 3 states |
| 20 | Nút Thumbs Down (👎) | Button (Icon) | ✅ | ✅ | 3 states |

**Màn hình Offline (Section 2.3):**

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 22 | Icon trạng thái | Image (Icon) | ✅ | ✅ | Wifi gạch chéo |
| 23 | Tiêu đề lỗi | Label | ✅ | ✅ | |
| 24 | Mô tả hướng dẫn | Label | ✅ | ✅ | |
| 25 | Nút Thử lại | Button | ✅ | ✅ | |

**CMR Cross-Check:**

| CMR | Áp dụng? | UC ref? | Status |
|---|---|---|---|
| CMR-06 (Header) | ✅ | ✅ Field #1 | ✅ |
| CMR-07 (Xử lý lỗi) | ✅ | ✅ Section 3.4 | ✅ |
| CMR-08 (Xem tài liệu) | ✅ | ✅ Field #16 | ✅ |
| CMR-09 (Form nhập liệu) | ⚠️ | Partial — max 500 ký tự có, nhưng không ref CMR-09 trực tiếp | ⚡ |
| CMR-13 (Pull to Refresh) | ✅ | ✅ Section 3.1 step 10 | ✅ |
| CMR-16 (API Performance) | ⚠️ | UC dùng timeout 30s thay vì 10s CMR-16 — có lý do tường minh | ✅ |
| CMR-17 (Đa ngôn ngữ) | ✅ | ✅ Section 3.6 | ✅ |
| CMR-18 (Debounce) | ✅ | ✅ Field #10 | ✅ |
| CMR-14 (Empty State) | ⚠️ | Không ref trực tiếp — chip rỗng = không hiển thị | ⚡ |

→ 7/9 CMR applicable = ref rõ ràng. 2/9 partial. Tỷ lệ ~78% → **Partial (1đ)** theo quy tắc 5.4.

---

### 2. Object Attributes & Behavior Definition

**System States:**
- Nút Gửi: 3 states (Ẩn / Paper plane / Spinner) — ✅ rõ ràng
- Subtitle: 2 states (Đang hoạt động / Chưa hoạt động) — ✅
- Rating icons: 3 states (Chưa đánh giá / Đang chọn animation / Đã đánh giá) — ✅
- Vùng Welcome: 2 states (Hiển thị / Ẩn sau câu hỏi đầu tiên) — ✅
- Ô nhập liệu khi loading: vẫn nhập được, không gửi được — ✅

**Interaction Matrix:**
- Tap chip → auto-send — ✅
- Tap nút Gửi → send + loading — ✅
- Tap 👍/👎 → animation + API + text thay thế — ✅
- Tap "Đánh giá lại?" → API reset + quay về UI gốc — ✅
- Tap ngoài ô → bàn phím đóng — ✅
- Back khi có hội thoại → popup — ✅
- Tap "Thử lại" (offline) → retry API — ✅

**Edge Case Checklist:**

| Group | Covered? | Evidence |
|---|---|---|
| A — Extreme Data | ⚡ | Max 500 ký tự, 5 dòng có. Nhưng: chip gợi ý text dài → truncate? Bubble bot text rất dài → performance? |
| B — Network | ✅ | Timeout 30s, lỗi mạng, HTTP 500, offline screen, typing indicator |
| C — Abnormal Interaction | ✅ | Debounce chip (CMR-18), back popup, keyboard behavior |
| D — Permissions & Session | ✅ | 401 refresh token, force-close (CMR-18), session không lưu |
| E — i18n | ✅ | Section 3.6, 5 ngôn ngữ, persistence trên server |

→ 4/5 groups covered ≥70% → **Clear (4đ)**.

---

### 3. Functional Logic & Workflow Decomposition

**UC60 — Gửi câu hỏi & nhận phản hồi:**
- MAIN FLOW: 10 bước chi tiết (Section 3.1) — ✅
- ALTERNATIVE: Tap chip thay vì nhập tay — ✅
- EXCEPTION: 7 tình huống lỗi (Section 3.4) — ✅
- BUSINESS RULES: Max 500 ký tự, 5 dòng, auto-scroll, lazy load — ✅
- UI/UX FEEDBACK: Typing indicator, Toast lỗi, Loading spinner — ✅

**UC61 — Đánh giá phản hồi:**
- MAIN FLOW: 4 bước (Section 3.2) — ✅
- ALTERNATIVE: "Đánh giá lại?" → reset — ✅
- EXCEPTION: Gửi đánh giá thất bại → retry ngầm — ✅

**Session rules (Section 3.3):**
- Không lưu lịch sử giữa phiên — ✅
- Back popup khi có hội thoại — ✅
- Back trực tiếp khi Welcome — ✅

---

### 4. Functional Integration Analysis

- **Chip gợi ý → Hội thoại:** Tap chip = auto-send → ẩn Welcome → hiển thị bubble — ✅
- **Rating → API:** Gửi kèm ID phản hồi — ✅
- **Offline → Welcome:** Tap "Thử lại" thành công → chuyển Welcome — ✅
- **Error → Input bar:** Lỗi API → trả tin nhắn về ô nhập liệu — ✅
- **Session 401 → Đăng nhập:** Refresh token hết hạn → redirect — ✅

---

### 5. Acceptance Criteria Synthesis

UC có section AC tường minh (AC1–AC11) do BA viết, phủ:
- **Interface:** AC1, AC4, AC7, AC11
- **Function:** AC2, AC3, AC5, AC6, AC8, AC9
- **Integration/Error:** AC10, AC11

---

### Preliminary Gaps Found

| # | Gap | Severity |
|---|---|---|
| G1 | Timeout 30s khác CMR-16 (10s) — có lý do nhưng không ghi "override CMR-16" tường minh | Low |
| G2 | Lazy load page size do API AI quyết định — QA không test boundary được | Low |
| G3 | Chip gợi ý text dài → truncate hay wrap? Không mô tả | Medium |
| G4 | Khi tap chip mà ô nhập liệu đang có nội dung → xử lý thế nào? | Medium |
| G5 | Nút Gửi "Không nhận thêm input mới" (Field #12) mâu thuẫn với "Ô nhập liệu vẫn cho phép nhập ký tự" (Field #11) — cần làm rõ "input" ở đây là gì | Low |
| G6 | NFR thiếu: Accessibility, Compatibility, giới hạn tin nhắn/phiên | Low |
| G7 | Auto-scroll behavior: "kể cả khi người dùng đang cuộn lên" — UX concern nhưng đã mô tả rõ | Info |

---

## Phase 2 — Audit Scoring

### KA #1 — Feature Identity (4đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 1.1 UC-ID + Tên tính năng | 1 | 1 | ✅ | UC §Header: "UC60-61 — Chatbot Trợ lý Đầu Tư trên Mobile" nhất quán |
| 1.2 Phiên bản UC + Ngày tạo | 1 | 1 | ✅ | v1.2, 06/05/2026 — rõ ràng |
| 1.3 Phân hệ + Loại chức năng | 1 | 1 | ✅ | "Ứng dụng Di động" + "Tương tác AI — Hỗ trợ tra cứu" |
| 1.4 BA phụ trách + Context | 1 | 1 | ✅ | huyen.dinh2, UC60-61 Phụ lục XIV |

**Subtotal KA #1: 4/4 — ✅ Clear**
**Evaluation:** Đầy đủ thông tin định danh, nhất quán giữa header và nội dung.

---

### KA #2 — Objective & Scope (4đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 2.1 Mục tiêu (WHY) | 2 | 2 | ✅ | UC §1: "cho phép cá nhân, tổ chức tương tác với Chatbot AI để tra cứu thông tin đầu tư" — rõ vấn đề + đối tượng |
| 2.2 In-Scope list | 1 | 1 | ✅ | UC §1: Welcome + gửi/nhận tin nhắn + đánh giá phản hồi |
| 2.3 Out-of-Scope list | 1 | 1 | ✅ | UC §1 Exclusions: quản lý model, lịch sử giữa phiên, tải xuống, gọi điện/video |

**Subtotal KA #2: 4/4 — ✅ Clear**
**Evaluation:** Mục tiêu, phạm vi trong/ngoài đều tường minh.

---

### KA #3 — Actors & User Roles (9đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 3.1 Danh sách Primary Actors | 3 | 3 | ✅ | UC §1: Cá nhân / Tổ chức (đã đăng nhập) |
| 3.2 Phân quyền / Role | 3 | 3 | ✅ | UC §1: "Hai nhóm đối tượng có cùng hành vi — không có sự phân biệt" — tường minh |
| 3.3 Permission rules | 2 | 2 | ✅ | Cả 2 role đều truy cập đầy đủ chức năng chatbot, không phân biệt |
| 3.4 Fallback khi role ngoài enum | 1 | 0 | ❌ | Không đề cập: user chưa đăng nhập tap vào Chatbot → xử lý thế nào? (Precondition nói "đã đăng nhập" nhưng không nêu fallback) |

**Subtotal KA #3: 8/9 — ⚡ Partial**
**Evaluation:** Actor và role rõ ràng, nhưng thiếu fallback cho trường hợp ngoài enum (chưa đăng nhập).

---

### KA #4 — Preconditions & Postconditions (9đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 4.1 Preconditions — Entry point | 3 | 3 | ✅ | UC §1: Sidebar → "Chatbot hỗ trợ" hoặc Floating Widget ở Trang chủ |
| 4.2 Preconditions — System state | 2 | 2 | ✅ | UC §1: "Thiết bị có kết nối mạng ổn định, người dùng đã đăng nhập" |
| 4.3 Postconditions — Success state | 3 | 3 | ✅ | UC §1: "Người dùng nhận được phản hồi từ Chatbot (lỗi: thấy thông báo lỗi)" |
| 4.4 Postconditions — Data changes | 1 | 1 | ✅ | UC §3.3: "Không lưu lịch sử giữa các phiên" + đánh giá gửi API |

**Subtotal KA #4: 9/9 — ✅ Clear**
**Evaluation:** Preconditions và Postconditions đầy đủ, rõ ràng.

---

### KA #5 — UI Object Inventory & Mapping (14đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 5.1 Liệt kê đầy đủ component | 5 | 5 | ✅ | 20+ components liệt kê chi tiết qua 3 sections (2.1, 2.2, 2.3) — khớp wireframe |
| 5.2 Nhất quán UC ↔ Wireframe | 3 | 3 | ✅ | Label, vị trí, loại component khớp giữa UC và 6 wireframes |
| 5.3 State / Action / Label per component | 3 | 3 | ✅ | Mỗi field có "Quy tắc hiển thị" + "Quy tắc hành động" chi tiết |
| 5.4 CMR Cross-Check | 3 | 1 | ⚡ | 7/9 CMR applicable ref rõ (~78%). CMR-09, CMR-14 không ref trực tiếp |

**Subtotal KA #5: 12/14 — ⚡ Partial**
**Evaluation:** Inventory rất chi tiết, nhưng CMR cross-ref chưa đạt 85%.

---

### KA #6 — Object Attributes & Behavior Definition (18đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 6.1 System States | 5 | 5 | ✅ | Nút Gửi 3 states, Subtitle 2 states, Rating 3 states, Welcome show/hide — đầy đủ |
| 6.2 Interaction Matrix | 5 | 5 | ✅ | Tap chip, tap Gửi, tap 👍/👎, tap "Đánh giá lại?", tap ngoài, Back — đầy đủ |
| 6.3 Object Behavior (reactive rules) | 4 | 4 | ✅ | Ô nhập → nút Gửi hiện/ẩn; Loading → block gửi; Offline → subtitle đổi; Error → trả tin nhắn về ô |
| 6.4 Edge Case Coverage | 4 | 4 | ✅ | 4/5 groups covered ≥70%: Network, Interaction, Session, i18n rõ ràng |

**Subtotal KA #6: 18/18 — ✅ Clear**
**Evaluation:** Behavior definition xuất sắc, edge cases phủ tốt.

---

### KA #7 — Functional Logic & Workflow Decomposition (18đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 7.1 Main Flow (Happy Path) | 5 | 5 | ✅ | UC §3.1: 10 bước chi tiết cho UC60; §3.2: 4 bước cho UC61 |
| 7.2 Alternative Flows | 4 | 3 | ⚡ | Tap chip = alternative. Nhưng: tap chip khi ô có nội dung → không mô tả |
| 7.3 Exception & Error Flows | 3 | 3 | ✅ | UC §3.4: 7 tình huống lỗi với thông báo + hành vi cụ thể |
| 7.4 Business Rules & Validation | 3 | 3 | ✅ | Max 500 ký tự, 5 dòng, timeout 30s (có lý do), session rules |
| 7.5 UI/UX Feedback | 3 | 3 | ✅ | Typing indicator, Toast lỗi, Loading spinner, auto-scroll — đầy đủ |

**Subtotal KA #7: 17/18 — ⚡ Partial**
**Evaluation:** Workflow rất chi tiết, chỉ thiếu 1 alternative flow nhỏ (chip + ô có nội dung).

---

### KA #8 — Functional Integration Analysis (9đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 8.1 Impact Analysis | 3 | 3 | ✅ | Chip → ẩn Welcome; Error → trả tin về ô; 401 → redirect đăng nhập |
| 8.2 Data Consistency | 3 | 2 | ⚡ | Rating gửi API kèm ID phản hồi — rõ. Nhưng: "Đánh giá lại?" gọi API reset → nếu fail thì UI đã quay về gốc chưa? Không rõ |
| 8.3 Section-level error isolation | 3 | 3 | ✅ | Offline = toàn màn hình; Lỗi gửi tin = chỉ ảnh hưởng tin đó; File lỗi = Toast không đóng màn hình |

**Subtotal KA #8: 8/9 — ⚡ Partial**
**Evaluation:** Integration tốt, chỉ thiếu xử lý khi API reset đánh giá fail.

---

### KA #9 — Acceptance Criteria (10đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 9.1 AC tường minh trong UC | 4 | 4 | ✅ | UC §3.5: AC1–AC11 do BA viết tường minh |
| 9.2 AC đo lường được (pass/fail) | 3 | 3 | ✅ | Mỗi AC có hành vi cụ thể, kiểm chứng được (không dùng "should"/"may") |
| 9.3 AC phủ UI/Functional/Integration | 3 | 3 | ✅ | UI (AC1,4,7,11), Function (AC2,3,5,6,8,9), Error/Integration (AC10,11) |

**Subtotal KA #9: 10/10 — ✅ Clear**
**Evaluation:** AC đầy đủ, đo lường được, phủ cả happy path và error path.

---

### KA #10 — Non-functional Requirements (5đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 10.1 Performance | 1 | 1 | ✅ | Timeout 30s (có lý do), typing indicator khi chờ |
| 10.2 Security | 1 | 1 | ✅ | Session 401 + refresh token + redirect đăng nhập (CMR-07) |
| 10.3 Accessibility | 1 | 0 | ❌ | Không đề cập WCAG, touch target size, contrast |
| 10.4 Compatibility | 1 | 0 | ❌ | Không đề cập OS versions, screen orientations |
| 10.5 Reliability | 1 | 1 | ✅ | Error isolation, retry ngầm đánh giá, offline fallback |

**Subtotal KA #10: 3/5 — ⚡ Partial**
**Evaluation:** Performance, Security, Reliability có. Thiếu Accessibility và Compatibility.

---

## Phase 3 — Report

### 📊 Audit Summary

**Artefacts reviewed:** UC60-61_Chatbot.md (v1.2) + 6 Wireframes (Welcome, Chat frames, Rating, Re-rate, Popup, Offline)

| # | Knowledge Area | Max | Score | Status |
|---|---|:---:|:---:|---|
| 1 | Feature Identity | 4 | 4/4 | ✅ Complete |
| 2 | Objective & Scope | 4 | 4/4 | ✅ Complete |
| 3 | Actors & User Roles | 9 | 8/9 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 9 | 9/9 | ✅ Complete |
| 5 | UI Object Inventory & Mapping | 14 | 12/14 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 18 | 18/18 | ✅ Complete |
| 7 | Functional Logic & Workflow Decomposition | 18 | 17/18 | ⚡ Partial |
| 8 | Functional Integration Analysis | 9 | 8/9 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 10/10 | ✅ Complete |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ Partial |
| **Total** | | **100** | **93/100** | |

> **Final Score: 93/100**  
> **Verdict: ✅ READY** — QA có thể bắt đầu thiết kế test case.

---

### 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | ⚠️ Medium | UC §2.1 Field #10 | Chip gợi ý text dài → App truncate hay wrap? Có tooltip/long-press xem full không? | QA cần biết expected behavior khi chip text overflow | Open |
| Q2 | ⚠️ Medium | UC §3.1 step 2 | Khi tap chip mà ô nhập liệu đang có nội dung → App xử lý thế nào? Ghi đè? Nối? Bỏ qua nội dung cũ? | QA cần test case cho edge case này | Open |
| Q3 | 🟡 Low | UC §3.2 step 4 | Tap "Đánh giá lại?" → gọi API reset. Nếu API reset fail → App giữ UI "Đã đánh giá" hay quay về 2 icon? | Đảm bảo data consistency giữa UI và server | Open |
| Q4 | 🟡 Low | UC §3.4 | Timeout 30s khác CMR-16 (10s). UC có lý do nhưng không ghi tường minh "override CMR-16". Đề xuất bổ sung 1 dòng. | Tránh nhầm lẫn khi QA cross-check CMR | Open |
| Q5 | 🟡 Low | UC §3.1 step 9 | Lazy load page size do API AI quyết định — QA không test boundary page size được. | Ghi nhận dependency, QA chỉ test behavior (loading indicator) | Accepted |
| Q6 | 🟡 Low | UC §3.3 | Fallback khi user chưa đăng nhập tap vào entry point Chatbot (Sidebar/Widget) → App xử lý thế nào? | Precondition nói "đã đăng nhập" nhưng không nêu guard/redirect | Open |
| Q7 | 🟡 Low | N/A (Missing) | NFR thiếu: Accessibility (WCAG), Compatibility (OS versions, orientations) | Non-critical nhưng cần cho test coverage đầy đủ | Open |

---

### 🟢 What's Good

- **Workflow chi tiết:** Main flow 10 bước, 7 error scenarios, session rules — QA có đủ info thiết kế test.
- **UI States rõ ràng:** Nút Gửi 3 states, Rating 3 states, Subtitle 2 states — mỗi state có điều kiện chuyển đổi.
- **Error handling chuẩn CMR-07:** Toast + trả tin nhắn về ô + typing indicator ẩn — consistent.
- **AC1–AC11 đo lường được:** Phủ happy path, error path, offline state.
- **Offline screen đầy đủ:** Fields #22–#25 khớp wireframe, nút "Thử lại" có behavior rõ.
- **Đa ngôn ngữ tường minh:** 5 ngôn ngữ, phân biệt text cứng vs nội dung API.
- **Debounce chip (CMR-18):** Chỉ nhận action đầu tiên khi tap nhanh.

---

### 🧪 Testability Outlook

**CÓ THỂ test ngay:**
- Luồng Welcome → chip → auto-send → hội thoại
- Input bar: max 500 ký tự, max 5 dòng, keyboard behavior, out-tap
- Send button: 3 trạng thái (ẩn / paper plane / spinner)
- Input khi loading: vẫn nhập được nhưng không gửi được
- Rating: 3 states + "Đánh giá lại?" + API call
- Back popup: có/không hội thoại → popup/không popup
- File attachment: PDF mở trình duyệt / DOCX tải xuống / file lỗi Toast
- Error flow: lỗi mạng, HTTP 500, timeout 30s, 401 → Toast + trả tin về ô
- Offline screen: subtitle + icon + text + "Thử lại"
- Auto-scroll sau khi bot phản hồi
- Lazy load: loading indicator khi kéo lên đầu
- Pull-to-refresh khi đã scroll lên trên cùng
- Debounce chip: tap nhanh liên tục chỉ gửi 1 lần

**CHƯA THỂ test (cần clarify):**
- Chip text overflow behavior (Q1)
- Tap chip khi ô có nội dung (Q2)
- API reset rating fail → UI state (Q3)

**Accepted dependencies (không test):**
- Page size lazy load (Q5 — do AI API quyết định)
- Accessibility / Compatibility (Q7 — NFR chưa có target)

---

### 📌 Summary & Recommendation

UC60-61 đạt **93/100 — ✅ READY**. Tài liệu đủ chi tiết để QA bắt đầu thiết kế test case cho phần lớn chức năng. Có 4 câu hỏi Open (Q1–Q4, Q6) ở mức Medium/Low — không blocking test design nhưng nên clarify song song. Đề xuất: (a) QA bắt đầu thiết kế test case ngay cho các luồng chính, (b) BA trả lời Q1–Q4, Q6 để QA bổ sung edge case tests, (c) NFR (Q7) ghi nhận cho phase sau.
