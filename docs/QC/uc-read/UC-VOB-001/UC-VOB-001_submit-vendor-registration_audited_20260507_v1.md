---
title: UC Readiness Review — UC-VOB-001 Submit Vendor Registration
date: 2026-05-07
author: qc-uc-read (chris.le3@basao.com)
version: v1
source-uc: docs/BA/UC-VOB-001/UC-VOB-001.md (revision 2026-04-13)
source-design: docs/BA/UC-VOB-001/image copy.png
common-context: docs/BA/common/project-context_20260505_v1.md
---

# UC Readiness Review
**Functional / Black-box Test Readiness Template**

---

## Feature Brief

**UC-VOB-001 "Submit Vendor Registration"** là Step 1 trong wizard 3 bước đăng ký vendor cho nền tảng Multivendor eCommerce (BP-001 Vendor Onboarding & Verification). Trang `/register/vendor` truy cập **public** (không cần đăng nhập), cho phép Prospective Vendor (Individual hoặc Business) điền thông tin cơ bản: Vendor Type, First Name, Last Name, Email Address, Phone Number, Store Name, Store Description (optional), và Company Name (chỉ khi Vendor Type = Business).

Khi vendor click **"Proceed to Next Step >"**, hệ thống thực hiện inline validation tất cả required field; nếu pass thì lưu draft vào session và chuyển sang Step 2 (UC-VOB-002 Upload Documents). Lựa chọn `Individual` / `Business` ở step này quyết định bộ KYC document bắt buộc downstream. Email verification được hoãn đến UC-VOB-004 (final submit) — đã chốt tại QA-021. Vendor record chính thức được tạo ở trạng thái `Pending` sau khi qua đủ 3 bước (UC-VOB-004).

**Business rules chính (verbatim từ `requirement-traceability.md`):**
- **[BR-023]** "Submit vendor registration form with personal or business details" (§3.1)
- **[RULE-002]** "Vendor must accept the latest vendor agreement before registration is complete" (§3.1) — *enforced ở Step 3, không phải Step 1*
- **[RULE-070]** "Registration wizard session must time out after inactivity; recommended inactivity window is 30–60 minutes; vendor must be notified before/at timeout" — *cross-step, áp dụng trong toàn wizard*
- **[RULE-071]** "Frontend validates registration step-by-step; the final backend submission must validate all steps simultaneously and aggregate all errors across all steps in a single response to prevent multiple round-trips"

**Exception đã biết:**
- Cross-artefact conflict UI rendering: ảnh `image copy.png` thể hiện Vendor Type ở dạng **tab/text-link** (Individual gạch chân) — KHÔNG có icon radio tròn — trong khi spec gọi là "Radio Button Group".
- Logo, Page title, Character counter `0/500` không có row riêng trong Section 2 Element table của UC.
- Không có section AC (Acceptance Criteria) tường minh; không có section NFR.

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `70.0 / 100` | ⚠️ CONDITIONALLY READY |

> QA có thể bắt đầu thiết kế test cho phần lớn các khu vực rõ ràng (Validation Summary, Basic Flow, Vendor Type Switch). Các điểm gap (AC chưa tường minh, UI element thiếu, NFR rỗng, conflict design-spec về Vendor Type) cần BA xử lý song song trước khi test cases bao phủ đầy đủ.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC-VOB-001 | Submit Vendor Registration | v1 (UC source revision 2026-04-13) | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| BA team (Multivendor project) | *(chưa ghi nhận trong source UC)* | 2026-04-13 (UC); 2026-05-07 (audit) | 2026-04-13 |

---

## 1. Objective & Scope

### 1.1 Objective ✅

Cho phép một **prospective vendor** (cá nhân hoặc doanh nghiệp) gửi thông tin định danh cơ bản và lựa chọn loại vendor để khởi tạo quy trình onboarding, làm tiền đề cho việc upload KYC document (UC-VOB-002) và ký kết Vendor Agreement (UC-VOB-003). Đây là điểm vào duy nhất của BP-001 Vendor Onboarding.

> Source: User-story trong Section 1 — *"As a prospective vendor (Individual or Business), I want to fill in my basic registration details and select my vendor type, so that I can begin the onboarding process and proceed to document upload."*

### 1.2 In Scope ✅

- Hiển thị form Step 1 "Basic Details" với 3-step progress wizard (Step 1 active, Steps 2/3 disabled).
- Lựa chọn **Vendor Type** (Individual mặc định / Business).
- Thu thập 7 trường: First Name, Last Name, Company Name (Business only), Email Address, Phone Number, Store Name, Store Description.
- Inline validation client-side cho mọi required field khi click "Proceed to Next Step".
- Server-side duplicate check cho Email Address và Store Name (lỗi: `"{Field Name} already exists"` — COMMON-029).
- Chống double-submit: button disabled sau click đầu (COMMON-015); loading spinner cho async > 300ms (COMMON-012).
- Lưu Step 1 data vào session/draft → tiến sang Step 2 (UC-VOB-002).
- Switch Vendor Type giữ lại First/Last Name; show/hide Company Name; cập nhật bộ document required cho Step 2.

### 1.3 Out of Scope ⚡

> Source UC **không có** mục "Out of Scope" tường minh. Suy luận từ context (cần BA xác nhận):

- Email OTP / link verification (đã chốt hoãn về UC-VOB-004 — QA-021).
- Vendor agreement acceptance (UC-VOB-003).
- Tạo password / account credentials — *PCTX-2 (project-context): không xác định password được set ở đâu trong flow*.
- Document upload (UC-VOB-002).
- Tạo `Vendor` record ở trạng thái `Pending` (UC-VOB-004).
- Backend aggregated validation cuối flow (RULE-071, thuộc UC-VOB-004).

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| **Prospective Vendor (Individual)** | Primary (anonymous, public) | Có thể truy cập trang `/register/vendor` không cần đăng nhập; điền form Step 1; chọn Vendor Type = Individual; submit để tiến Step 2. |
| **Prospective Vendor (Business)** | Primary (anonymous, public) | Tương tự Individual nhưng phải điền thêm trường Company Name (required). Vendor Type Business sẽ kích hoạt bộ KYC document mở rộng ở Step 2 (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). |
| **System** | System actor | Thực hiện client-side validation, server-side duplicate check (Email, Store Name), lưu session/draft Step 1, điều hướng wizard sang Step 2. |
| **Admin** | Downstream (out of scope step này) | Sẽ review/approve/reject vendor sau khi vendor hoàn tất 3 bước (UC-VOB-006, BR-026). |

**Gap:** UC chỉ nói "Vendor" hoặc "Prospective Vendor" — không có phân quyền RBAC tường minh ở step này (logic: anonymous user không có RBAC). Tester nên xác nhận với BA rằng trang `/register/vendor` truy cập được trong trạng thái logged-out (đã đăng nhập với role khác có nên redirect không?).

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions ✅

- **Không yêu cầu authentication.** Trang `/register/vendor` truy cập public.
- Không có dependency vào UC khác (đây là UC entry-point của BP-001).

### 3.2 Postconditions ✅

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| **Step 1 validation thành công** (click "Proceed to Next Step" với data hợp lệ) | (1) Toàn bộ giá trị 7 field được persist vào session/draft state. (2) Wizard chuyển active step sang Step 2 (UC-VOB-002 Upload Documents). (3) Submit button bị disable sau click đầu để chống double-submit (COMMON-015). |
| **Step 1 validation thất bại** | (1) Inline error message hiển thị bên dưới mỗi field bị lỗi (COMMON-032). (2) Submit button revert về enabled. (3) Vendor có thể sửa lại và submit lại. |
| **Vendor Type switch giữa Individual ↔ Business** | (1) First Name, Last Name giữ nguyên giá trị đã nhập. (2) Company Name hiển thị (Business) hoặc bị ẩn (Individual). (3) Bộ KYC document required cho Step 2 được cập nhật theo Vendor Type. |
| **Wizard timeout (sau 30–60 phút inactivity)** | RULE-070: vendor được notify trước/khi timeout. ⚠️ **Source UC không mô tả notify behavior cụ thể ở Step 1** (toast? modal? URL redirect?). |

---

## 4. UI Object Inventory & Mapping

> **Cách dùng cột Source:** `image copy.png` = ảnh chính của UC; `wireframes-vendor-onboarding.md §2.1` = wireframe text-art; `UC §2 #N` = row số N trong Section 2 element table của UC spec. Khi cả 3 đồng thuận, ghi cả 3.
> **Note:** Section này được **mở rộng từ Section 2 element table của UC spec (12 rows) lên 17 rows** để bao phủ các atomic element bị spec collapse/missing (Logo, Page Title, Character Counter, 2 enum option của Vendor Type tách riêng).

| # | Screen / Section | Label (verbatim) | Type | Required | Default | Placeholder | Enum values | Description / Constraint | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Header / Top bar | *(không có label — chỉ icon + wordmark)* "MultiVendor Platform" | Brand / Logo (icon + wordmark) | N/A | — | — | N/A | Always visible top-left. ⚠️ **Spec UC §2 không liệt kê element này** — bổ sung từ design. | `image copy.png`; *(missing in UC §2)* |
| 2 | Header / Top bar | "Help" | Navigation Link (with `?` icon) | N/A | — | — | N/A | Always visible top-right. Mở help/support page trong **new tab** theo UC §2 #11. | `image copy.png`; UC §2 #11 |
| 3 | Header / Top bar | "Login" | Navigation Link | N/A | — | — | N/A | Always visible top-right. Điều hướng tới vendor login page (UC §2 #12). | `image copy.png`; UC §2 #12 |
| 4 | Body / Page heading | "Register as a Vendor" | Static Text / Heading (H1) | N/A | — | — | N/A | Page title, hiển thị phía trên wizard. ⚠️ **Spec UC §2 không liệt kê element này** — bổ sung từ design. | `image copy.png`; *(missing in UC §2)* |
| 5 | Body / Step indicator | "1 Basic Details" | Wizard / Stepper item (active) | N/A | active | — | N/A | Hiển thị filled black circle với số `1`; label "Basic Details". State **active** (current step). Không clickable trên chính nó. | `image copy.png`; UC §2 #1 (gộp) |
| 6 | Body / Step indicator | "2 Upload Documents" | Wizard / Stepper item (disabled) | N/A | disabled | — | N/A | Empty/grey circle với số `2`; label "Upload Documents". **Không clickable** cho đến khi Step 1 validate thành công. | `image copy.png`; UC §2 #1 (gộp) |
| 7 | Body / Step indicator | "3 Agreement" | Wizard / Stepper item (disabled) | N/A | disabled | — | N/A | Empty/grey circle với số `3`; label "Agreement". **Không clickable** cho đến khi Step 2 validate thành công. | `image copy.png`; UC §2 #1 (gộp) |
| 8 | Body / Form group | "Vendor Type" | Group label (cho radio group) | N/A *(no asterisk)* | — | — | — | Section header cho radio group. UC nói "selection is inherently mandatory" do luôn có default. | `image copy.png`; UC §2 #2 |
| 9 | Body / Form group | "Individual" | Radio option *(spec)* / Tab-style text option *(design — conflict)* | Yes (1 of 2 mandatory) | **selected** (default) | — | — | Default selection on page load. Chọn Individual ẩn Company Name. ⚠️ **Conflict design-spec**: design hiển thị dạng text gạch chân/tab, không có radio circle; spec gọi là "Radio Button Group". | `image copy.png`; UC §2 #2 |
| 10 | Body / Form group | "Business" | Radio option *(spec)* / Tab-style text option *(design — conflict)* | Yes (1 of 2 mandatory) | unselected | — | — | Chọn Business reveals Company Name field; cập nhật KYC document set ở Step 2. ⚠️ Conflict design-spec như #9. | `image copy.png`; UC §2 #2 |
| 11 | Body / Form > Row 1 col 1 | "First Name *" | Text Input (single-line) | Yes | (empty) | `Enter first name` | N/A | Max 100 chars [COMMON-007], input blocked at limit [COMMON-009]. Required: error `"First Name is required"` [COMMON-025]. Cho phép hyphens, apostrophes (no numeric-only restriction). aria-labelledby [COMMON-048]. | `image copy.png`; UC §2 #3 |
| 12 | Body / Form > Row 1 col 2 | "Last Name *" | Text Input (single-line) | Yes | (empty) | `Enter last name` | N/A | Max 100 chars [COMMON-007]. Required: error `"Last Name is required"` [COMMON-025]. Hiển thị cùng row với First Name (two-column desktop layout). | `image copy.png`; UC §2 #4 |
| 13 | Body / Form > Conditional row (Business only) | "Company Name *" | Text Input (single-line) | Yes (when Vendor Type = Business) | (empty) | `Enter company name` | N/A | **Visible only when Vendor Type = Business**, hidden khi Individual. Full-width. Max 255 chars [COMMON-001]. Required: error `"Company Name is required"` [COMMON-025]. Là primary business identifier (QA-022). ⚠️ **Không hiển thị trong ảnh hiện tại** vì default Vendor Type = Individual. | UC §2 #5; *(not visible in image — conditional)* |
| 14 | Body / Form > Row 2 col 1 | "Email Address *" | Text Input (email) | Yes | (empty) | `Enter email address` | N/A | RFC 5322 [COMMON-019], max 255 chars [COMMON-001]. Errors: `"Email Address is required"` [COMMON-025] / `"Please enter a valid email"` [COMMON-026] / `"Email Address already exists"` [COMMON-029, server-side duplicate]. **Email verification (OTP/link) KHÔNG thực hiện ở step này** — hoãn UC-VOB-004 (QA-021). | `image copy.png`; UC §2 #6 |
| 15 | Body / Form > Row 2 col 2 | "Phone Number *" | Text Input (tel) | Yes | (empty) | `Enter phone number` | N/A | E.164 international format với country code [COMMON-020] (vd `+94771234567`). Numeric-only enforced on keypress [COMMON-004]. Max 255 chars [COMMON-001]. Errors: `"Phone Number is required"` [COMMON-025] / `"Please enter a valid phone number"` [COMMON-026]. | `image copy.png`; UC §2 #7 |
| 16 | Body / Form > Row 3 (full-width) | "Store Name *" | Text Input (single-line) | Yes | (empty) | `Enter store name` | N/A | Max 255 chars [COMMON-001]. Errors: `"Store Name is required"` [COMMON-025] / `"Store Name already exists"` [COMMON-029, server-side duplicate]. Full-width spanning both columns. | `image copy.png`; UC §2 #8 |
| 17 | Body / Form > Row 4 (full-width) | "Store Description" | Text Area (multi-line) | **No** *(no asterisk)* | (empty) | `Describe your store (Max 500 chars)` | N/A | Max 500 chars [COMMON-008], input blocked at limit [COMMON-009]. Optional — no required error. aria-label [COMMON-048]. | `image copy.png`; UC §2 #9 |
| 18 | Body / Form > Row 4 corner | "0/500" | Static Text / Character counter | N/A | "0/500" | — | N/A | Hiển thị bottom-right corner của Store Description textarea. Update real-time as vendor types. ⚠️ **Spec UC §2 không liệt kê element này như một row riêng** — chỉ nhắc trong Behaviors của Store Description. | `image copy.png`; *(folded into UC §2 #9)* |
| 19 | Body / Form > CTA | "Proceed to Next Step >" | Button (Primary CTA) | N/A | enabled | — | N/A | Right-aligned bottom of form. On click: client-side validate all required fields; nếu pass → save session & nav Step 2; nếu fail → inline errors + button stays enabled. **Disabled sau first successful click** chống double-submit [COMMON-015]. **Loading spinner** nếu async (duplicate check) > 300ms [COMMON-012]. | `image copy.png`; UC §2 #10 |

> **Coverage check:** 19 row Section 4 vs ~25 visible atomic element (đã đếm cả mỗi step indicator riêng, mỗi radio option riêng, character counter riêng, logo riêng, page title riêng). Còn lại các connector line và icon vendor-type-asterisk-absence là phần style không cần row riêng. **Coverage ≥ 80%, không còn collapse vi phạm granularity rule.**

---

## 5. Object Attributes & Behavior Definition

> **1-to-1 mapping rule:** Mỗi row Section 4 phải có ≥ 1 row tương ứng tại đây. Có 19 row Section 4 → 19 row Section 5.

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| #1 Logo "MultiVendor Platform" | Always Enabled (no special behavior) | Click *(behavior chưa được spec — assumption: navigate to landing page, NEEDS BA CONFIRMATION)* | Static brand identity. Không thay đổi theo state form. |
| #2 "Help" link | Always Enabled | Click → mở help page **trong new tab** | Không reset form draft. |
| #3 "Login" link | Always Enabled | Click → navigate to vendor login page | ⚠️ **Behavior chưa rõ với unsaved changes**: spec UC không nói có warn/confirm về data loss khi click Login giữa chừng. COMMON-011 (modal dismiss với unsaved changes) chỉ áp dụng modal — không nói về navigation link. |
| #4 Page title "Register as a Vendor" | Always Enabled (no special behavior) | N/A (static) | Static heading. |
| #5 Step "1 Basic Details" | **Active** (current step) | Không clickable bản thân (đang là current). | Khi Step 1 validation pass → state chuyển sang **Completed** (visual state spec không mô tả — assumption: filled màu khác hoặc check mark — NEEDS BA CONFIRMATION). |
| #6 Step "2 Upload Documents" | **Disabled / Greyed** (chưa qua Step 1) | **Không clickable** cho đến khi Step 1 success. | Sau khi Step 1 pass → state chuyển sang **Active** và step indicator của Step 1 chuyển sang **Completed**. |
| #7 Step "3 Agreement" | **Disabled / Greyed** | **Không clickable** cho đến khi Step 2 success. | Tương tự #6, downstream của Step 2. |
| #8 "Vendor Type" group label | Always Enabled (static) | N/A | Static label. |
| #9 "Individual" radio option | **Selected** (default on page load) | Click → set Vendor Type = Individual → ẩn Company Name (#13) → cập nhật bộ KYC required ở Step 2. | Selection được retain khi navigate back từ Step 2. ⚠️ Conflict design-spec về kiểu render. |
| #10 "Business" radio option | Unselected (default) | Click → set Vendor Type = Business → **reveal Company Name** (#13) → cập nhật bộ KYC required (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). | First Name, Last Name retain khi switch giữa Individual ↔ Business. |
| #11 First Name input | Enabled, empty default | Type → input nhận; vượt 100 char → input blocked [COMMON-009]. Click "Proceed" với empty → inline error `"First Name is required"`. | Real-time char limit; error chỉ xuất hiện sau click "Proceed", không validate on-blur (spec không mô tả on-blur). |
| #12 Last Name input | Enabled, empty default | Tương tự #11; max 100 char; error `"Last Name is required"`. | Tương tự #11. |
| #13 Company Name input | **Hidden** khi Vendor Type = Individual; **Visible + Enabled + Required** khi Business. | Type → input nhận; max 255 char [COMMON-001]; vượt → blocked. Click "Proceed" với Business+empty → error `"Company Name is required"`. | State visibility phụ thuộc trực tiếp vào lựa chọn #9/#10. Khi switch Business → Individual giữa chừng, giá trị đã nhập **không rõ có persist** hay reset (spec không nói). |
| #14 Email Address input | Enabled, empty default | Type → input nhận; max 255 char; vượt → blocked. Click "Proceed": (1) Required check, (2) RFC 5322 format check, (3) async server-side duplicate check (loading spinner > 300ms). | 3 lớp error: required → format → uniqueness. Spec không rõ: nếu format không hợp lệ thì có gọi server duplicate check không (assumption: short-circuit, không gọi). |
| #15 Phone Number input | Enabled, empty default | Type → numeric-only enforced on keypress [COMMON-004], non-numeric reject. Max 255 chars. Click "Proceed": required + E.164 format check. | ⚠️ Spec không nói có server-side duplicate check cho Phone hay không. |
| #16 Store Name input | Enabled, empty default | Type → input nhận; max 255 char. Click "Proceed": required + async duplicate check. | Tương tự Email field về 3 lớp validation. |
| #17 Store Description textarea | Enabled, empty default | Type → input nhận; max 500 chars; vượt → blocked. Optional — không required error. | Character counter (#18) update real-time đồng bộ. |
| #18 Character counter "0/500" | Enabled, default "0/500" | N/A (read-only) | Real-time update theo độ dài text trong #17. Spec không nói màu sắc thay đổi khi gần limit (vd đỏ ở 480-500). |
| #19 "Proceed to Next Step >" button | Enabled (default) | Hover *(behavior không được spec)*. Click → trigger client-side validation toàn form. | (1) Validation pass → save session, navigate to Step 2, button **disabled** sau click đầu để chống double-submit. (2) Validation fail → button **revert enabled** sau khi inline errors hiển thị. (3) Async duplicate check > 300ms → spinner shown trên/cạnh button [COMMON-012]. |

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Submit Step 1 Basic Details (Happy Path + Validation Failure)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | Vendor | Mở `/register/vendor` | Hiển thị Step 1 wizard active; default Vendor Type = Individual; Step 2/3 disabled. | N/A | N/A |
| 2 | Vendor | (Optional) Click "Business" radio | Reveal Company Name field; update bộ KYC required ở Step 2 (downstream). | Vendor giữ nguyên Individual → flow tiếp tục mà không hiện Company Name. | N/A |
| 3 | Vendor | Điền First Name, Last Name, Email Address, Phone Number, Store Name (và Company Name nếu Business) + Store Description (optional). | Input nhận từng character; max-length blocked at limit [COMMON-009]; numeric-only cho Phone [COMMON-004]; character counter cập nhật real-time cho Store Description. | N/A | Khi user paste/type vượt max → input chặn ngay tại keypress. |
| 4 | Vendor | Click **"Proceed to Next Step >"** | (1) Client-side validate required + format. (2) Async duplicate check Email + Store Name (server-side, spinner nếu > 300ms). (3) Save Step 1 data vào session/draft. (4) Navigate Wizard sang Step 2 (UC-VOB-002). (5) Button disabled sau click đầu (COMMON-015). | N/A | **[Empty required field]** Inline error `"{Field Name} is required"` bên dưới field [COMMON-025, COMMON-032]; button revert enabled. **[Invalid format]** Email: `"Please enter a valid email"`. Phone: `"Please enter a valid phone number"`. **[Duplicate]** `"Email Address already exists"` / `"Store Name already exists"` [COMMON-029]. **[Server error]** Fallback `"Something went wrong. Please try again later."` [COMMON-030] *(không tường minh trong UC nhưng implied COMMON rule)*. |
| 5 | Vendor | (Optional) Switch Vendor Type giữa chừng | First/Last Name retain. Company Name show/hide. KYC required updated. | N/A | **[Data loss khi switch Business → Individual]** ⚠️ Spec không nói rõ giá trị Company Name đã nhập có bị clear hay được giữ ngầm — cần BA xác nhận. |
| 6 | Vendor | (Optional) Inactive 30–60 phút | Wizard session timeout [RULE-070]; vendor được notify trước/khi timeout. | N/A | ⚠️ **Spec UC-VOB-001 KHÔNG mô tả notify behavior cụ thể ở Step 1** (toast? modal? redirect?). Chỉ có RULE-070 ở project-context. Cross-step concern. |

**B. Business Rules & Validations** *(verbatim từ common-rules.md và UC §3 Validation Summary)*

| Field / Object | Required | Format / Constraint | Min / Max | Error Message *(exact text — verbatim verb từ COMMON rule)* |
|----------------|----------|---------------------|-----------|-------------------------------|
| Vendor Type | Yes (default selected) | Radio (1 of 2: Individual / Business) | — | N/A — luôn có selection. |
| First Name | Yes | Free text (cho phép hyphen, apostrophe; no numeric-only restriction) | — / 100 chars (COMMON-007) | `"First Name is required"` (COMMON-025) |
| Last Name | Yes | Free text | — / 100 chars (COMMON-007) | `"Last Name is required"` (COMMON-025) |
| Company Name | Yes (Business only); Hidden khi Individual | Free text | — / 255 chars (COMMON-001) | `"Company Name is required"` (COMMON-025) |
| Email Address | Yes | RFC 5322 (COMMON-019) | — / 255 chars (COMMON-001) | `"Email Address is required"` (COMMON-025) / `"Please enter a valid email"` (COMMON-026) / `"Email Address already exists"` (COMMON-029) |
| Phone Number | Yes | E.164 international với country code (COMMON-020); numeric-only on keypress (COMMON-004) | — / 255 chars (COMMON-001) | `"Phone Number is required"` (COMMON-025) / `"Please enter a valid phone number"` (COMMON-026) |
| Store Name | Yes | Free text | — / 255 chars (COMMON-001) | `"Store Name is required"` (COMMON-025) / `"Store Name already exists"` (COMMON-029) |
| Store Description | **No** | Free text | — / 500 chars (COMMON-008) | — *(no validation error since optional)* |

**Common Reference Resolution applied:** Mọi error code trong UC ([COMMON-025], [COMMON-026], [COMMON-029], [COMMON-030], [COMMON-032]) đã được expand đầy đủ với verbatim text trong `common-rules.md`. Tester dùng cột "Error Message" trực tiếp như Expected Result.

**C. UI/UX Feedback**

- **Loading States:**
  - Async duplicate check (Email Address, Store Name) > 300ms: hiển thị **loading spinner** [COMMON-012]. Spec không nói spinner nằm trên button hay cạnh field — assumption: trên button "Proceed".
  - Button "Proceed" **disabled sau click đầu** chống double-submit [COMMON-015].
- **Toast Messages:**
  - **Spec UC không mô tả toast** ở Step 1 (vì Step 1 chỉ chuyển sang Step 2, chưa hoàn tất registration). Toast registration submitted xuất hiện ở UC-VOB-004.
- **Error Codes / Inline Errors:**
  - Mọi inline error hiển thị **ngay bên dưới field** tương ứng [COMMON-032].
  - `"{Field Name} is required"` (COMMON-025) — required error.
  - `"Please enter a valid {field type}"` (COMMON-026) — format error.
  - `"{Field Name} already exists"` (COMMON-029) — uniqueness error.
  - `"Something went wrong. Please try again later."` (COMMON-030) — server error fallback (assumption từ COMMON-030, không tường minh trong UC).

### 6.2 Function: Vendor Type Switch (Sub-Function)

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | Vendor | Đã nhập một số field, click sang **"Business"** radio (đang Individual) | Reveal Company Name field. First/Last Name retain. Required Company Name flagged [COMMON-003]. KYC required cho Step 2 cập nhật (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). | N/A | N/A |
| 2 | Vendor | Click sang **"Individual"** (đang Business, đã nhập Company Name) | Hide Company Name field. KYC required cho Step 2 quay về (NIC/Passport, Bank Proof). | N/A | ⚠️ **Spec không nói** giá trị Company Name đã nhập có bị clear hay giữ ngầm (đợi user switch lại Business). |

**B. Business Rules & Validations:** Chuyển dịch theo Vendor Type không trigger validation; chỉ thay đổi visibility + required-set.

**C. UI/UX Feedback:** Visibility transition của Company Name spec không mô tả animation/timing.

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis (Cross-function influence) | Data Consistency Verification |
|---------------------------|--------------------------------------------|-------------------------------|
| **Step 1 "Proceed to Next Step" success** | Tiến sang UC-VOB-002 (Upload Documents). Step 1 data persist trong session/draft. | Verify: Toàn bộ 7 (hoặc 8 nếu Business) field nhập ở Step 1 được giữ lại khi navigate **Back từ Step 2**; verify Vendor Type selection giữ lại khi back. |
| **Vendor Type = Business** | Step 2 (UC-VOB-002) yêu cầu KYC document set mở rộng: BR Cert, Form 1/20, TIN/VAT, NIC of Director, Company Bank Proof. Step 1 hiển thị thêm Company Name. | Verify: Switch Vendor Type ở Step 1 cập nhật document slot ở Step 2 ngay khi navigate đến (không cache stale). |
| **Vendor Type = Individual** | Step 2 yêu cầu document set: NIC/Passport, Bank Proof, verified email+mobile. | Verify: Document slot ở Step 2 thu hẹp tương ứng. |
| **Email Address duplicate (server-side)** | Block tiến Step 2; vendor phải đổi email trước khi qua được Step 1. | Verify: Server check áp dụng cả khi vendor là duplicate-attempt (vendor mới đăng ký với email trùng vendor pending hoặc rejected — UC không nói rõ scope check). ⚠️ **Open question:** scope check chỉ active vendors, hay cả pending/rejected? |
| **Store Name duplicate (server-side)** | Tương tự Email — block tiến Step 2. | Verify: Tương tự — scope of uniqueness check chưa rõ. |
| **Wizard session timeout (RULE-070, cross-step)** | Sau 30–60 phút inactivity, session expire — Step 1 draft data **mất** hay **persist** không rõ. | ⚠️ **Spec UC-VOB-001 không mô tả recovery behavior.** Vendor có notify trước/khi timeout (RULE-070), nhưng UC không nói data có save tự động hay phải bắt đầu lại. |
| **Frontend step-by-step validation vs Backend aggregated (RULE-071)** | UC-VOB-001 chỉ chịu trách nhiệm **frontend client-side validate** + server-side duplicate check ở step này; backend aggregated validate (toàn 3 steps) chỉ chạy ở UC-VOB-004 (final submit). | Verify: Lỗi server-side ở Step 1 (duplicate Email/Store Name) được hiển thị inline ngay tại Step 1, KHÔNG aggregate đến cuối. |

---

## 8. Acceptance Criteria

> ⚠️ **Source UC KHÔNG có section AC tường minh.** Các AC dưới đây được **suy luận từ** Basic Flow + Alternative Flow + Validation Summary + Cross-References của UC (Phase 1 Step 2.5 synthesis). BA cần review/approve trước khi test cases bám theo.

| AC # | Scenario | Given *(precondition)* | When *(user action)* | Then *(expected result)* |
|------|----------|------------------------|----------------------|--------------------------|
| **AC-01** | Happy Path Individual | Vendor mở `/register/vendor` lần đầu (không có session draft). | Vendor giữ Vendor Type = Individual (default), điền First Name "John", Last Name "Doe", Email "john@example.com" (chưa tồn tại trong system), Phone "+94771234567", Store Name "Tech Hub" (chưa tồn tại), Store Description rỗng, click "Proceed to Next Step". | Wizard chuyển active sang Step 2 "Upload Documents". Step 1 data ("John", "Doe", "john@example.com", "+94771234567", "Tech Hub", Vendor Type = Individual) persist vào session/draft. Step 1 indicator chuyển sang completed state, Step 2 indicator chuyển sang active. Button "Proceed" disabled trong khi navigate. |
| **AC-02** | Happy Path Business | Như AC-01 nhưng vendor chọn "Business". | Switch Business, Company Name field xuất hiện. Điền Company Name "Tech Hub Ltd" + các field như AC-01. Click "Proceed". | Tương tự AC-01 + Company Name "Tech Hub Ltd" persist. Bộ KYC required ở Step 2 = mở rộng (BR Cert, Form 1/20, TIN/VAT, Director NIC, Bank Proof). |
| **AC-03** | Required field empty — First Name | Vendor mở trang lần đầu. | Vendor để First Name rỗng, điền các field còn lại hợp lệ, click "Proceed". | Inline error `"First Name is required"` hiển thị ngay bên dưới First Name field [COMMON-025, COMMON-032]. Wizard KHÔNG chuyển sang Step 2. Button "Proceed" revert enabled. |
| **AC-04** | Required field empty — multiple fields | Vendor mở trang lần đầu. | Vendor để rỗng cả First Name, Last Name, Email, Phone, Store Name, click "Proceed". | Inline errors hiển thị đồng thời cho tất cả 5 field bị thiếu, mỗi error ngay dưới field tương ứng. Wizard KHÔNG chuyển. Button "Proceed" revert enabled. |
| **AC-05** | Email format invalid | Vendor mở trang lần đầu. | Vendor điền Email = "abc@" (invalid RFC 5322), các field còn lại hợp lệ, click "Proceed". | Inline error `"Please enter a valid email"` [COMMON-026] dưới Email field. Wizard KHÔNG chuyển. |
| **AC-06** | Phone format invalid | Vendor mở trang lần đầu. | Vendor điền Phone = "12345" (không có country code, không E.164), các field còn lại hợp lệ, click "Proceed". | Inline error `"Please enter a valid phone number"` [COMMON-026] dưới Phone field. |
| **AC-07** | Phone numeric-only enforcement | Vendor focus vào Phone Number field. | Vendor gõ ký tự alphabet "abc" hoặc đặc biệt "@#". | Ký tự bị reject **tại keypress** [COMMON-004]; field giữ rỗng hoặc chỉ giữ ký tự numeric / dấu `+`. |
| **AC-08** | Email duplicate (server-side) | Database đã có vendor với Email "existing@example.com" (any state). | Vendor điền Email = "existing@example.com" + các field còn lại hợp lệ, click "Proceed". | Loading spinner hiện trên button "Proceed" nếu check > 300ms [COMMON-012]. Sau đó inline error `"Email Address already exists"` [COMMON-029] dưới Email field. Wizard KHÔNG chuyển. |
| **AC-09** | Store Name duplicate (server-side) | Database đã có vendor với Store Name "Tech Hub". | Vendor điền Store Name = "Tech Hub" + các field còn lại hợp lệ, click "Proceed". | Inline error `"Store Name already exists"` [COMMON-029] dưới Store Name field. |
| **AC-10** | Business Vendor Type — Company Name empty | Vendor chọn Business; First/Last Name, Email, Phone, Store Name hợp lệ; Company Name rỗng. | Click "Proceed". | Inline error `"Company Name is required"` [COMMON-025] dưới Company Name field. |
| **AC-11** | Vendor Type Switch retain | Vendor chọn Business, điền First Name "John", Last Name "Doe", Company Name "Tech Hub Ltd". | Vendor switch sang Individual rồi switch lại Business. | First Name "John" và Last Name "Doe" retain. ⚠️ **Company Name retain hay reset — chờ BA xác nhận** (đưa vào Open Question Q4). |
| **AC-12** | Max-length input blocked — First Name | Vendor focus vào First Name. | Vendor paste 150 ký tự. | Field chỉ nhận đúng 100 ký tự đầu; 50 ký tự còn lại bị reject tại input [COMMON-007, COMMON-009]. |
| **AC-13** | Max-length input blocked — Email | Vendor focus vào Email. | Vendor paste 300 ký tự. | Field chỉ nhận 255 ký tự đầu [COMMON-001, COMMON-009]. |
| **AC-14** | Store Description optional | Vendor để Store Description rỗng + các field required hợp lệ. | Click "Proceed". | Wizard chuyển sang Step 2 bình thường. KHÔNG có error dưới Store Description. |
| **AC-15** | Store Description char counter realtime | Vendor focus vào Store Description. | Vendor gõ 50 ký tự. | Counter hiển thị "50/500" cập nhật ngay. Khi xóa 1 ký tự → "49/500". Khi đạt 500 → "500/500" và input bị blocked [COMMON-008, COMMON-009]. |
| **AC-16** | Double-submit prevention | Vendor đã điền form hợp lệ. | Vendor click "Proceed" 2 lần liên tiếp (rapid clicks) trong khi async duplicate check đang chạy. | Click thứ 2 bị ignore — button đã disabled sau click đầu [COMMON-015]. Chỉ một async request được gửi. |
| **AC-17** | Loading spinner cho async > 300ms | Server duplicate check (Email/Store Name) lag > 300ms (vd network slow). | Vendor click "Proceed" với data hợp lệ. | Loading spinner hiển thị trên/cạnh button "Proceed" trong khi chờ response [COMMON-012]. |
| **AC-18** | Step indicator clickability | Vendor đang ở Step 1, chưa validate pass. | Vendor cố click vào Step 2 hoặc Step 3 indicator. | Click bị ignore — Step 2/3 disabled cho đến khi Step 1 success. |
| **AC-19** | Help link mở new tab | Vendor đang ở Step 1, đã điền một số field. | Vendor click "Help". | Help page mở trong **new tab** mới. ⚠️ Cần verify form draft hiện tại không bị mất. |
| **AC-20** | Login link điều hướng | Vendor click "Login" (đã điền vài field). | Login link điều hướng tới vendor login page. | ⚠️ Cần BA xác nhận có warn về unsaved changes hay không. |
| **AC-21** | Wireframe label compliance | Vendor mở trang lần đầu. | Render kiểm tra. | Tất cả label text **verbatim** match spec: "Register as a Vendor", "Vendor Type", "Individual", "Business", "First Name *", "Last Name *", "Email Address *", "Phone Number *", "Store Name *", "Store Description", "Proceed to Next Step >". Asterisk màu đỏ trên required fields [COMMON-003]. |
| **AC-22** | Accessibility — labels associated | Vendor sử dụng screen reader. | Screen reader đọc qua từng field. | Mỗi input field đọc đúng tên label tương ứng [COMMON-048]. Mỗi inline error gắn với field qua `aria-describedby` [COMMON-051]. |

---

## 9. Non-functional Requirements

> ⚠️ **Source UC KHÔNG có section NFR tường minh.** Các yêu cầu dưới đây **suy luận từ COMMON rules** đã được tham chiếu trong UC. BA cần bổ sung NFR cụ thể (target metrics) cho perf, browser matrix, mobile responsiveness.

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance | Async duplicate check Email/Store Name complete trong < 300ms ở điều kiện normal; nếu vượt → phải show spinner. | [COMMON-012] (inferred) |
| Security | (1) Trang public không yêu cầu auth (UC pre-condition: None). (2) Server-side validation phải xác thực format & uniqueness tránh bypass client. (3) Nhập field không được phép XSS / SQL injection (implicit — chưa tường minh trong UC). | UC §1, [RULE-071] (inferred) |
| Accessibility | (1) Form fields có associated label / aria-label [COMMON-048]. (2) Color contrast WCAG AA ≥ 4.5:1 [COMMON-046]. (3) Tab/Shift+Tab navigation [COMMON-047]. (4) Focus indicator visible [COMMON-050]. (5) Inline error gắn `aria-describedby` với field [COMMON-051]. | [COMMON-046 → 051] |
| Browser Compatibility | ⚠️ **Không tường minh.** Cần BA xác nhận browser matrix (Chrome / Edge / Safari / Firefox latest? IE11?). | *(missing)* |
| Mobile / Responsive | ⚠️ **Không tường minh.** Wireframe text-art chỉ mô tả desktop two-column layout. Behavior responsive chưa rõ (collapse sang single-column?). | *(missing)* |
| Session | Wizard session timeout 30–60 phút inactivity; vendor được notify trước/khi timeout. | [RULE-070] |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions

> *Note:* Câu hỏi mở chi tiết được đưa sang `UC-VOB-001_submit-vendor-registration_question-backlog_20260507_v1.md`. Bảng dưới chỉ tóm tắt.

| # | Question / Issue | Context | Owner | Status |
|---|-----------------|---------|-------|--------|
| Q1 | Cross-artefact conflict: design hiển thị Vendor Type kiểu tab/text-link (Individual gạch chân), spec gọi là "Radio Button Group". | UC §2 #2 vs `image copy.png` | BA + Design | Open |
| Q2 | Wizard session timeout (RULE-070): notify behavior cụ thể ở Step 1 là gì (toast, modal, redirect)? Step 1 draft data có persist sau timeout không? | UC không mô tả; RULE-070 chỉ nói "notify" | BA | Open |
| Q3 | Click "Login" hoặc "Help" giữa chừng (đã điền form): có warn về unsaved changes không? | UC §2 #11, #12 không nói | BA + UX | Open |
| Q4 | Switch Vendor Type Business → Individual: Company Name đã nhập có clear hay giữ ngầm? | UC alt-flow chỉ nói "First/Last Name retain", không nói Company Name | BA | Open |
| Q5 | Phone Number duplicate check: có check uniqueness không? Spec chỉ nói duplicate check Email + Store Name. | UC §2 #7 | BA | Open |
| Q6 | Server-side uniqueness scope: Email/Store Name check chỉ active vendors hay bao gồm cả Pending/Rejected? | UC không nói | BA | Open |
| Q7 | Email format invalid + duplicate: short-circuit hay check song song? | UC không nói | BA + Dev | Open |
| Q8 | Browser matrix + mobile responsive behavior chưa được quy định. | NFR section thiếu | BA + PM | Open |
| Q9 | Step 1 indicator visual state khi đã pass (filled màu khác? check mark?). | UC §2 #1 chỉ tả active/disabled, không tả completed | Design | Open |
| Q10 | Page title "Register as a Vendor" và Logo "MultiVendor Platform" không có row riêng trong Section 2 element table. | UC §2 missing | BA | Open |
| Q11 | Spec không có section NFR (perf target, security, accessibility cụ thể). | UC missing Section | BA + PM | Open |
| Q12 | Spec không có section AC tường minh; tester phải tự derive. | UC missing Section | BA | Open |

### 10.2 Dependencies

- **UC-VOB-002 (Upload Documents)** — bước kế tiếp; Vendor Type ở Step 1 quyết định bộ KYC document required.
- **UC-VOB-003 (Accept Vendor Agreement)** — downstream RULE-002.
- **UC-VOB-004 (Validate Registration Submission)** — downstream; thực hiện email OTP verification (đã chốt QA-021), backend aggregated validation (RULE-071), tạo Vendor record `Pending`.
- **`docs/BA/common/common-rules.md`** — verbatim text cho 14+ COMMON rules được tham chiếu.
- **`docs/BA/common/requirement-traceability.md`** — verbatim text cho BR-023, RULE-002, RULE-070, RULE-071.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-07 | qc-uc-read (chris.le3@basao.com) | Initial first audit của UC-VOB-001 (revision 2026-04-13). Score 70.0/100 → CONDITIONALLY READY. 12 open questions chuyển sang question-backlog v1. |

---

## Audit Summary

| #   | Knowledge Area                           | Max Pts | Score   | Status |
| --- | ---------------------------------------- | ------- | ------- | ------ |
| 1   | Feature Identity                         | 5       | 5/5     | ✅ Complete |
| 2   | Objective & Scope                        | 5       | 4/5     | ⚡ Partial *(no explicit "Out of Scope")* |
| 3   | Actors & User Roles                      | 10      | 8/10    | ⚡ Partial *(no explicit RBAC for anonymous user)* |
| 4   | Preconditions & Postconditions           | 10      | 10/10   | ✅ Complete |
| 5   | UI Object Inventory & Mapping            | 15      | 9/15    | ⚡ Partial *(spec collapses Step Indicator 3→1; missing rows for Logo, Page Title, Char Counter; conflict design-spec về Vendor Type)* |
| 6   | Object Attributes & Behavior Definition  | 20      | 17/20   | ⚡ Partial *(unsaved-changes warn behavior, Vendor-Type-switch data persistence, completed-step visual state chưa rõ)* |
| 7   | Functional Logic & Workflow Decomposition | 20      | 17/20   | ⚡ Partial *(session timeout notify behavior, server error fallback, format-vs-duplicate ordering chưa tường minh)* |
| 8   | Functional Integration Analysis          | 20      | 13/20   | ⚡ Partial *(scope of duplicate check chưa rõ; recovery sau session timeout chưa rõ)* |
| 9   | Acceptance Criteria                      | 20      | 6/20    | ⚡ Partial *(không có section AC trong UC source — agent đã derive 22 AC từ flow + validation summary)* |
| 10  | Non-functional Requirements              | 5       | 2/5     | ⚠️ Missing-mostly *(không có section NFR; chỉ implicit qua COMMON rules)* |
| **Total** |                                    | **130** | **91/130** | **70.0 / 100** |

**Normalization:** `round((91 / 130) × 100, 1) = 70.0`

**Auto-fail check:** Không có Critical area nào (#1–#9) score 0 → không trigger auto-fail.

---

## Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | UC §2 #2 ("Vendor Type" Type = "Radio Button Group") vs `image copy.png` (Individual hiển thị gạch chân, không có radio circle) | Vendor Type render UI thực tế là **radio button** (như spec) hay **tab/text-link** (như design)? Cần BA + Design align trước khi viết test UI assertions. | Tester không thể verify UI element selector & state nếu render kiểu khác — toàn bộ AC liên quan Vendor Type interaction (AC-02, AC-10, AC-11) blocked. | Open |
| Q2 | High | UC alt-flow "[Vendor Type Switch]" — *"Previously entered personal fields (First Name, Last Name) are retained"* | Khi switch **Business → Individual** sau khi đã nhập Company Name: Company Name đã nhập có **clear** hay **giữ ngầm** (đợi user switch lại)? UC chỉ nói First/Last Name retain. | Trực tiếp ảnh hưởng AC-11. Test data persistence cần answer rõ ràng. | Open |
| Q3 | High | UC không có section AC tường minh | UC source thiếu section "Acceptance Criteria"; toàn bộ AC trong audit này được suy luận từ flow + validation table. BA approve AC list được generate? | Test cases sẽ bám AC; nếu BA chưa approve AC, test cases có nguy cơ deviate ý định gốc. | Open |
| Q4 | High | UC không có section NFR | UC source thiếu performance target, browser matrix, mobile responsive, security cụ thể. | NFR test scope (perf, browser compat, mobile) không thể plan nếu không có target. | Open |
| Q5 | Medium | UC §2 #6 Email Address — *"On duplicate email (checked at server)"* | Server-side uniqueness check scope: chỉ active vendors hay cả Pending/Rejected/Suspended? Vendor cũ đã reject re-register với email cũ có bị block không? | Khác biệt scope ảnh hưởng nhiều test scenario duplicate (AC-08, AC-09). | Open |
| Q6 | Medium | UC §2 #7 Phone Number | Phone Number có check uniqueness server-side không? UC chỉ nói uniqueness cho Email + Store Name. | Nếu có check, cần thêm AC; nếu không, cần document explicit để tránh tester tạo test sai. | Open |
| Q7 | Medium | RULE-070 (cross-step) | Wizard session timeout (30–60 phút inactivity): notify cụ thể ở Step 1 là gì (toast, modal, redirect)? Step 1 draft data có persist sau timeout? | Test session timeout & recovery ở Step 1 không thể design nếu không rõ behavior. | Open |
| Q8 | Medium | UC §2 #11 (Help Link) + #12 (Login Link) | Click Help / Login giữa chừng (đã điền form): có warn về unsaved changes không? Mở Help trong new tab có giữ form draft không? | Liên quan AC-19, AC-20. | Open |
| Q9 | Medium | `image copy.png` không có row riêng cho Logo, Page Title "Register as a Vendor", và Character counter "0/500" | Spec UC §2 element table thiếu 3 atomic UI element. BA bổ sung vào element table v2 hay confirm nhập chung với layout overview là đủ? | Test coverage UI element completeness yêu cầu spec rõ ràng từng element. | Open |
| Q10 | Low | UC §2 #1 Step Progress Indicator | Visual state của Step 1 sau khi vendor pass validation và chuyển sang Step 2 (filled màu khác? check mark? hồi quang?). UC chỉ tả active vs disabled. | Test wizard progression visual transitions (AC-01) cần định nghĩa state thứ 3 "completed". | Open |
| Q11 | Low | UC §2 #6 Email — flow validate Email format vs duplicate | Khi Email không hợp lệ format **đồng thời** trùng với DB (Email format invalid → server short-circuit): hiển thị error nào, thứ tự ra sao? | Edge case error precedence — ảnh hưởng AC-05 + AC-08 hợp nhất. | Open |
| Q12 | Low | UC §1 Use Case Description thiếu "Out of Scope" tường minh | Section 1 scope chỉ nêu in-scope qua user-story; không có tách bạch out-of-scope (vd "Step 1 không tạo vendor record", "không gửi email", "không tạo password"). | Tester có thể nhầm scope, viết test cho OTP/email-sending tại Step 1 (đáng ra UC-VOB-004). | Open |

---

## 🟢 What's Good

UC-VOB-001 đã làm tốt nhiều phần đáng credit cho BA:

- **User-story style description** rõ ràng (As a... I want... so that...) — Section 1.
- **Pre-condition / Trigger / Post-condition** cụ thể, tách bạch On Success / On Failure.
- **Basic Flow** 8 bước đánh số rành mạch + 2 sub-flow Alt Flow ("Validation Failure", "Vendor Type Switch") có đánh số riêng.
- **Element table Section 2** gắn cụ thể với từng [COMMON-xxx] / [BR-xxx] / [QA-xxx] cho mọi field — traceability tốt.
- **Validation Summary** bảng riêng (Section 3) tóm tắt mọi field với required / format / max-length / error message — Test Data prep dễ.
- **Cross-References** (Section 4) liệt kê đầy đủ next/previous step UC, BR, RULE, COMMON.
- **2 open question đã RESOLVED** (OQ-1: email verification hoãn UC-VOB-004 — QA-021; OQ-2: Company Name added cho Business — QA-022) với **citation rõ source** (`Vendor Onboarding QA Answers.csv`).
- **Changelog** track date + source + QA resolved.

---

## 🧪 Testability Outlook

**What CAN be tested now:**

- **Field-level validation** (required, format RFC 5322 / E.164, max-length, numeric-only Phone) — Validation Summary đầy đủ.
- **Required field empty errors** — verbatim error message từ COMMON-025.
- **Duplicate Email + Store Name** — verbatim error từ COMMON-029.
- **Vendor Type switch — show/hide Company Name, retain First/Last Name** (chừng nào BA chưa rõ Company Name retain — vẫn test được phần First/Last Name).
- **Happy path Individual + Business** — flow Step 1 sang Step 2 đầy đủ.
- **Anti double-submit** (button disabled sau click đầu) — COMMON-015.
- **Loading spinner cho async > 300ms** — COMMON-012.
- **Character counter Store Description** real-time — UC #9 + COMMON-008/009.
- **Step indicator disabled cho Step 2/3** — UC #1.
- **Max-length input blocked** (First Name 100, others 255, Description 500).

**What CANNOT be tested yet (blocked by gaps):**

- **Vendor Type render type (radio vs tab)** — Q1: cần align design-spec.
- **Company Name retain/clear khi switch Business → Individual** — Q2: AC-11 incomplete.
- **Session timeout behavior + draft recovery** — Q7.
- **Unsaved-changes warning khi click Help/Login** — Q8: AC-19/AC-20 incomplete.
- **Browser matrix + mobile responsive** — Q4 (NFR section thiếu).
- **Performance target số cụ thể** (vd "duplicate check < 300ms" — chỉ tham chiếu COMMON-012 chung; không có SLA cụ thể) — Q4.
- **Step 1 visual state "completed"** — Q10.
- **Edge case: format invalid + duplicate** error precedence — Q11.

**Suggested test focus areas** *(once gaps are resolved)*:

- **Happy path:** AC-01 (Individual), AC-02 (Business), AC-14 (optional Store Description).
- **Alternative scenarios:** AC-11 (Vendor Type switch retain), AC-19/20 (Help/Login navigation giữa chừng), session timeout flows.
- **Boundary & validation tests:** AC-12/13 (max-length 100/255/500), AC-15 (char counter realtime), AC-22 (accessibility / aria).
- **Error & exception scenarios:** AC-03/04 (required empty), AC-05/06 (format invalid Email/Phone), AC-08/09 (duplicate), AC-10 (Business empty Company Name), edge case format+duplicate.
- **UI-specific checks:** AC-21 (label verbatim), AC-18 (step indicator disabled), AC-17 (loading spinner > 300ms), AC-16 (double-submit prevention).
- **Cross-step integration:** Vendor Type Individual/Business → KYC document set ở Step 2 (mock UC-VOB-002 boundary), Back-from-Step-2 retain data.

---

## 📌 Summary & Recommendation

UC-VOB-001 ở trạng thái **CONDITIONALLY READY (70.0 / 100)** — phần lớn flow chính (Happy Path Individual + Business, validation field-level, error message verbatim, duplicate check, anti-double-submit) đã đủ rõ để QA bắt đầu thiết kế test cho ~75-80% scope của step này. Tuy nhiên có **4 high-priority gaps** cần BA giải quyết song song trước khi test cases bao phủ full coverage: (1) **Conflict design-spec** về Vendor Type render (radio vs tab), (2) **Company Name retain/clear** khi switch Business → Individual, (3) **AC section thiếu** trong UC source (audit này đã derive 22 AC nhưng cần BA approve), (4) **NFR section thiếu** (perf target, browser matrix, mobile responsive, security policy). Ngoài ra 8 medium/low gap khác liên quan session timeout behavior, scope duplicate check, unsaved-changes navigation, completed-step visual state cần được clarify để hoàn chỉnh test design.

**Recommendation:** **Proceed với CONDITIONAL** — QA team có thể bắt đầu thiết kế test scenarios + test cases cho các area rõ ràng (validation, happy path, error message verbatim, max-length, char counter, double-submit) ngay từ bây giờ. Đồng thời BA team cần xử lý **12 câu hỏi** trong question-backlog v1 (đặc biệt **Q1, Q2, Q3, Q4 priority High**) để v2 audit có thể đạt READY (≥ 90/100) và mở khóa coverage cho session timeout, NFR, design-spec alignment trước khi vào pha test execution.

---

*UC Readiness Review — qc-uc-read v1.0 audit của UC-VOB-001 revision 2026-04-13. Generated 2026-05-07.*
