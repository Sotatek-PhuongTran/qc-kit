---
title: Question Backlog — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-uc-read (chris.le3@basao.com)
version: v1
linked-audit: UC-VOB-001_submit-vendor-registration_audited_20260507_v1.md
status: open
total-questions: 12
priority-breakdown: High=4, Medium=4, Low=4
---

# Question Backlog — UC-VOB-001 Submit Vendor Registration

> **Mục đích:** Danh sách câu hỏi mở từ qc-uc-read audit v1 (2026-05-07) chuyển sang BA để answer/clarify.
> Khi BA trả lời xong → cập nhật cột `Answer` + `Status = Resolved` + `Source` + `Resolved Date`. Sau đó re-trigger qc-uc-read (Re-audit workflow).

---

## Question Index

| ID | Priority | Topic | Status |
|----|----------|-------|--------|
| Q1 | High | Vendor Type render: Radio vs Tab (design-spec conflict) | Open |
| Q2 | High | Company Name retain khi switch Business → Individual | Open |
| Q3 | High | Acceptance Criteria section missing trong UC source | Open |
| Q4 | High | Non-functional Requirements section missing | Open |
| Q5 | Medium | Server-side uniqueness scope (Email/Store Name) | Open |
| Q6 | Medium | Phone Number duplicate check có hay không | Open |
| Q7 | Medium | Wizard session timeout (RULE-070) notify behavior + draft recovery | Open |
| Q8 | Medium | Help/Login link giữa chừng — unsaved changes warning | Open |
| Q9 | Low | Spec UI element table thiếu Logo, Page Title, Char counter | Open |
| Q10 | Low | Step 1 indicator visual state khi đã pass (completed) | Open |
| Q11 | Low | Email format invalid + duplicate: error precedence | Open |
| Q12 | Low | Section "Out of Scope" thiếu tường minh | Open |

---

## Q1 — Vendor Type render: Radio vs Tab (design-spec conflict)

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | UC §2 #2 *"Vendor Type — Type: Radio Button Group — Two options: Individual and Business. Default selection: Individual"*; design `image copy.png` (Vendor Type rendered as text "Individual" with underline + text "Business" without underline — **không có radio circle**). |
| **Question** | Vendor Type sẽ render UI thực tế là **radio button** (như spec mô tả) hay **tab/text-link** (như design hiển thị)? Quyết định ảnh hưởng đến selector pattern, accessibility behavior (role=radio vs role=tab), và keyboard interaction (arrow keys cho radio vs tab). |
| **Why It Matters** | (1) Block AC-02 (Happy Path Business), AC-10 (Business empty Company Name), AC-11 (Vendor Type switch retain) vì assertion về element type khác nhau. (2) Test accessibility (AC-22) khác nhau theo role. (3) Keyboard interaction test khác nhau (radio dùng arrow keys, tab dùng Tab key). |
| **Owner** | BA + Design |
| **Status** | Open |
| **Answer** | radio button |
| **Source** | *(chờ BA)* |
| **Resolved Date** | 2026-05-07 |

---

## Q2 — Company Name retain khi switch Business → Individual

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | UC §1 Alternative Flow `[Vendor Type Switch]`: *"Vendor selects Individual, fills fields, then switches to Business. Previously entered personal fields (First Name, Last Name) are retained; Company Name field appears as a new required field."* — **Spec chỉ nói chiều Individual → Business, không nói chiều ngược lại Business → Individual về Company Name behavior.** |
| **Question** | Khi vendor đã chọn Business, đã nhập Company Name (vd "Tech Hub Ltd"), rồi switch sang Individual: (a) Company Name value bị **clear** ngầm? hay (b) **Giữ ngầm** trong state, để khi user switch lại Business sẽ tự fill lại? Hay (c) clear & user phải nhập lại từ đầu nếu switch lại Business? |
| **Why It Matters** | Trực tiếp block AC-11 (Vendor Type switch retain). Cũng ảnh hưởng test data persistence + session/draft behavior + UX expectations cho Vendor không cố tình mất data. |
| **Owner** | BA |
| **Status** | Open |
| **Answer** | Behavior cho các step đều là nếu trông required fields thì không thể step forward, trong case Company name đã được fill rồi thì không được clear |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q3 — Acceptance Criteria section missing trong UC source

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | N/A — UC source KHÔNG có section "Acceptance Criteria" / "AC". Chỉ có Section 1 (description), Section 2 (element table), Section 3 (validation summary), Section 4 (cross-references), Section 5 (open questions resolved), Changelog. |
| **Question** | (a) BA team có plan bổ sung section Acceptance Criteria tường minh trong UC v2 (Given/When/Then format) hay không? (b) Hoặc BA approve **22 AC** mà qc-uc-read agent đã derive trong audit report (Section 8 của audit) làm baseline cho test case design? |
| **Why It Matters** | Test cases được bám sát AC. Nếu BA chưa approve AC, test case có nguy cơ deviate ý định gốc — vd có thể miss boundary case mà BA cho là không cần test, hoặc thừa case mà BA cho là không in-scope. Cũng ảnh hưởng độ phủ traceability (AC-ID ↔ TC-ID mapping). |
| **Owner** | BA |
| **Status** | Open |
| **Answer** | Approve các AC mà qc-uc-read đã generate.  |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q4 — Non-functional Requirements section missing

| Field | Value |
|---|---|
| **Priority** | High |
| **Ref (verbatim)** | N/A — UC source KHÔNG có section "Non-functional Requirements". Chỉ có implicit references qua COMMON rules: COMMON-012 (spinner > 300ms), COMMON-046 (color contrast), COMMON-047 (keyboard nav), COMMON-048 (aria label), COMMON-050 (focus indicator), COMMON-051 (aria-describedby). |
| **Question** | Cần BA + PM xác nhận: (a) **Performance target** cụ thể: duplicate check Email/Store Name max acceptable response time là bao nhiêu? (UC chỉ nói spinner > 300ms, không có SLA tối đa.) Step 1 → Step 2 navigation max time? (b) **Browser matrix**: Chrome / Edge / Safari / Firefox phiên bản nào? Mobile Safari iOS / Chrome Android? IE11? (c) **Mobile responsive**: behavior layout responsive (single-column collapse?) ở viewport mobile (≤ 768px)? (d) **Security policy**: rate limit số lần submit Step 1 / IP? CSRF token? Captcha cho public form? |
| **Why It Matters** | NFR test scope (perf, browser compat, mobile, security) không thể plan/execute nếu không có target metric. Risk: post-launch perf issue hoặc browser-specific bug bị bỏ sót. |
| **Owner** | BA + PM |
| **Status** | Open |
| **Answer** | Hãy đề xuất nhé |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q5 — Server-side uniqueness scope (Email/Store Name)

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #6 Email *"On duplicate email (checked at server): 'Email Address already exists' [COMMON-029]"*; UC §2 #8 Store Name *"On duplicate (server-side): 'Store Name already exists' [COMMON-029]"*. **Không nói scope.** |
| **Question** | Server-side uniqueness check áp dụng scope nào? (a) Chỉ vendor active (`Approved`)? (b) Bao gồm cả vendor `Pending` (đang chờ admin approve)? (c) Bao gồm cả vendor `Rejected` (vendor cũ đã bị reject re-register với cùng email/store name)? (d) Bao gồm cả vendor `Suspended` / `Draft session`? |
| **Why It Matters** | (1) Test scenario AC-08 + AC-09 cần data setup phù hợp scope. (2) Use case nghiệp vụ: vendor bị reject lần đầu, re-register với email cũ — nếu BLOCK thì vendor phải dùng email mới (UX bất tiện); nếu ALLOW thì có risk duplicate active. (3) Liên quan flow UC-VOB-008 Reject Vendor (downstream). |
| **Owner** | BA |
| **Status** | Open |
| **Answer** | Check tất cả ngoại trừ vendor đã bị rejected. |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q6 — Phone Number duplicate check có hay không

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #7 Phone Number — KHÔNG đề cập tới duplicate check. UC §2 #6 Email và #8 Store Name có nói rõ duplicate check. |
| **Question** | Phone Number có check uniqueness server-side hay không? (a) Có — cùng pattern với Email/Store Name, error `"Phone Number already exists"` [COMMON-029]. (b) Không — phone không cần unique (do nhiều vendor có thể share contact qua đại lý / staff). |
| **Why It Matters** | Quyết định có thêm AC duplicate Phone hay không. Nếu BA muốn (a) nhưng spec hiện chưa có → dev có thể implement thiếu, tester miss. Nếu (b) → cần document explicit để future test không tạo case sai. |
| **Owner** | BA |
| **Status** | Open |
| **Answer** | không check |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q7 — Wizard session timeout (RULE-070) notify behavior + draft recovery

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | RULE-070 (`requirement-traceability.md` §2): *"Registration wizard session must time out after inactivity; recommended inactivity window is 30–60 minutes; vendor must be notified before/at timeout"*. UC-VOB-001 source KHÔNG mô tả notify behavior cụ thể. |
| **Question** | Khi wizard session timeout ở Step 1: (a) Notify behavior cụ thể ngay trước timeout là gì — toast warning, modal countdown, banner inline? Bao lâu trước expiry (5 phút như COMMON-042 áp dụng cho session đăng nhập, hay khác)? (b) Khi session expire: vendor bị redirect về landing page, hay ở lại với form rỗng, hay show modal "Session expired — start again"? (c) Step 1 draft data đã save vào session: có persist sau timeout không (vd qua localStorage, hay qua link recovery email)? Hay mất hoàn toàn? |
| **Why It Matters** | (1) Cross-step concern (cũng áp dụng UC-VOB-002, UC-VOB-003). (2) Test session timeout edge case yêu cầu định nghĩa rõ ràng. (3) UX impact: nếu draft mất hoàn toàn sau 30 phút → vendor có thể bỏ cuộc, ảnh hưởng conversion rate. |
| **Owner** | BA |
| **Status** | Open |
| **Answer** | Không có behaivior cho việc countdown, vendor sẽ bị redirect về landing page và các draft data sẽ bị xóa. |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q8 — Help/Login link giữa chừng — unsaved changes warning

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Ref (verbatim)** | UC §2 #11 Help Link *"Navigates to platform help/support page in a new tab"*; UC §2 #12 Login Link *"Navigates to the vendor login page. Prompts vendor who already has an account to log in instead of registering again."* — KHÔNG đề cập warn về unsaved changes. |
| **Question** | (a) Click "Help" mở new tab — form draft hiện tại có giữ nguyên ở tab cũ (assumption: yes vì là new tab) — verify confirm assumption? (b) Click "Login" điều hướng tới vendor login page (cùng tab, replace navigation): vendor đã điền vài field — có hiển thị **confirmation dialog** "Bạn sắp rời trang, dữ liệu chưa lưu sẽ bị mất. Continue?" hay không? COMMON-011 chỉ nói modal, không nói cross-page navigation. |
| **Why It Matters** | Liên quan AC-19, AC-20. Trải nghiệm UX: nếu vendor lỡ click Login mất hết data đã điền → frustrated. Nếu hỏi confirm: Login flow tốn thêm 1 click. BA align UX choice. |
| **Owner** | BA + UX |
| **Status** | Open |
| **Answer** | Click Help mở new tab nên draft còn nguyê. Click Login thì sẽ mất. |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q9 — Spec UI element table thiếu Logo, Page Title, Char counter

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | `image copy.png` thể hiện rõ: Logo "MultiVendor Platform" (icon + wordmark) ở top-left header, Page title "Register as a Vendor" (H1), và Character counter "0/500" ở bottom-right Store Description textarea. UC §2 element table (12 rows: từ #1 Step Indicator đến #12 Login Link) **không có row riêng cho 3 element này**. |
| **Question** | BA đồng ý bổ sung 3 row này vào UC §2 element table khi update v2 (full coverage element)? Hay confirm rằng nhập chung với layout overview (#0 prose) là đủ chi tiết cho QA? |
| **Why It Matters** | Test coverage UI element completeness. Nếu Logo + Page Title + Char counter không có row → test cases bám row table sẽ miss element này; tester phải tự nhớ. Char counter đặc biệt quan trọng vì có behavior (real-time update, đổi màu khi gần limit?) cần test riêng. |
| **Owner** | BA |
| **Status** | Open |
| **Answer** |Hiện chưa có design cho phần này |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q10 — Step 1 indicator visual state khi đã pass (completed)

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | UC §2 #1 Step Progress Indicator: *"Step 1 'Basic Details' highlighted with solid black circle; Steps 2 'Upload Documents' and 3 'Agreement' rendered in disabled/grey state."* — Chỉ tả 2 state: **active** (filled black) + **disabled** (grey). KHÔNG tả state **completed** (sau khi vendor pass Step 1, sang Step 2). |
| **Question** | Sau khi vendor pass Step 1 và Wizard chuyển active sang Step 2: Step 1 indicator state là gì? (a) Vẫn filled black nhưng lùi xuống secondary (kèm check mark icon)? (b) Một màu khác (vd green/blue completed)? (c) Trở về grey (như Step 3)? (d) Vẫn highlighted? |
| **Why It Matters** | Test wizard progression visual transitions (AC-01, AC-18). Cũng quan trọng cho UX: vendor nhìn vào step indicator nên hiểu được "Step 1 đã xong, Step 2 đang làm". |
| **Owner** | Design |
| **Status** | Open |
| **Answer** | đã được vẽ ở UC-VOB-002 |
| **Source** | *(chờ Design)* |
| **Resolved Date** | *(chờ Design)* |

---

## Q11 — Email format invalid + duplicate: error precedence

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | UC §2 #6 Email Address — 3 lớp validation: required → format (RFC 5322) → uniqueness (server). UC liệt kê tuần tự nhưng không nói rõ precedence khi vi phạm > 1 lớp. |
| **Question** | Khi vendor click "Proceed" với Email format không hợp lệ (vd `"abc@"`) **đồng thời** giả định format đó cũng đã trùng trong DB: hệ thống hiển thị error nào? (a) Short-circuit: hiển thị duy nhất `"Please enter a valid email"` (format check trước, không gọi server). (b) Cả 2 errors: `"Please enter a valid email"` + `"Email Address already exists"`. (c) Chỉ duplicate (server check ưu tiên). Suy luận thông thường: (a) — format check client-side trước, server không bao giờ thấy email invalid format → confirm? |
| **Why It Matters** | Edge case error precedence — ảnh hưởng AC-05 + AC-08 hợp nhất. Cũng impact UX (vendor không bị overwhelm bởi 2 error cùng lúc). |
| **Owner** | BA + Dev |
| **Status** | Open |
| **Answer** | check FE trước server sau |
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Q12 — Section "Out of Scope" thiếu tường minh

| Field | Value |
|---|---|
| **Priority** | Low |
| **Ref (verbatim)** | UC §1 Use Case Description chỉ có user-story cho **in-scope**. Không có statement nào tách bạch **out-of-scope** (vd: "Step 1 không tạo Vendor record", "Step 1 không gửi email", "Step 1 không tạo password"). |
| **Question** | BA bổ sung section "Out of Scope" tường minh trong UC v2? Recommend đưa vào: (a) Email OTP / link verification (đã chốt hoãn UC-VOB-004 — QA-021). (b) Password creation (PCTX-2: chưa rõ ở đâu trong flow). (c) Vendor record creation (chỉ tạo ở UC-VOB-004 sau khi qua đủ 3 step). (d) Document upload (UC-VOB-002). (e) Vendor agreement (UC-VOB-003). |
| **Why It Matters** | Tránh tester nhầm scope, viết test cho OTP / email-sending / password-set tại Step 1 (đáng ra UC-VOB-004 / chưa rõ). Cũng giúp dev align expectation. |
| **Owner** | BA |
| **Status** | Open |
| **Answer** |skip|
| **Source** | *(chờ BA)* |
| **Resolved Date** | *(chờ BA)* |

---

## Changelog

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-07 | qc-uc-read (chris.le3@basao.com) | Initial backlog từ first audit của UC-VOB-001 (revision 2026-04-13). 12 questions: 4 High + 4 Medium + 4 Low. Tất cả status = Open. |

---

> **Hướng dẫn dùng tiếp theo:**
> 1. BA mở từng question, fill cột `Answer` + `Source` + `Resolved Date`, đổi `Status` thành `Resolved`.
> 2. Khi tất cả questions = Resolved → re-trigger `/qc-uc-read` để chạy **Re-audit workflow** sinh `_audited_v2.md`.
> 3. Question mới phát sinh ở v2 audit → append vào file mới `..._question-backlog_<DATE>_v2.md` (giữ nguyên v1 immutable).
