---
version: 1
created: 2026-05-05
created-by: qc-member#1 (via get-requirement, mode=first-build)
project: JOY Multivendor eCommerce Platform (Vendor Onboarding scope)
source-files-ingested:
  - docs/ba/common/common-rules.md (2026-04-13, 58 active rules)
  - docs/ba/common/requirement-traceability.md (2026-04-13, 103 BR + 71 RULE)
---

# Project Context — v1

> Đây là bản tổng hợp các quy tắc BA dùng chung **toàn dự án**. Mọi UC analysis sẽ dùng file này làm nguồn tham chiếu cho COMMON-*, BR-*, RULE-* mà không cần mở lại các file gốc trong `docs/ba/common/`. Nếu rule thay đổi → trigger mode `*-rebuild-context` để bump v2.

## 1. Phạm vi dự án

- **Tên dự án**: Multivendor eCommerce Platform (theo SRS gốc Xiteb — `docs/multivendor-ecommerce-requirements.pdf`).
- **Đối tượng chính**: Super Admin, Admin, Vendor (Individual / Business), Vendor Staff, Customer, System (automation).
- **Engagement hiện tại**: Vendor Onboarding (UC-VOB-001 → UC-VOB-004), focus Step 1 + Step 2.

## 2. Common Rules (COMMON-001 → COMMON-058) — 58 rule active, 0 deprecated

### 2.1 Input Constraints (COMMON-001 → COMMON-010)

| ID | Rule | Áp dụng cho UC nào (engagement này) |
|---|---|---|
| COMMON-001 | Text field single-line max 255 chars | Email, Phone, Company Name, Store Name (UC-VOB-001) |
| COMMON-002 | Text area multi-line max 2000 chars | Không dùng (Store Description override = 500 — COMMON-008) |
| COMMON-003 | Required fields marked với asterisk `*` | Mọi field required ở Step 1, mọi upload required ở Step 2 |
| COMMON-004 | Numeric-only fields reject non-numeric on keypress | Phone Number (UC-VOB-001) |
| COMMON-005 | Dropdown placeholder "Select {field_name}" | (Không có dropdown ở Step 1/2 — N/A) |
| COMMON-006 | Search min 2 chars | N/A |
| COMMON-007 | Name fields max 100 chars | First Name, Last Name (UC-VOB-001) |
| COMMON-008 | Description fields max 500 chars | Store Description (UC-VOB-001) |
| COMMON-009 | Input blocked khi đạt max length | Tất cả field text ở Step 1 |
| COMMON-010 | Placeholder format "Input {field_name}" hoặc "Enter {field_name}" | Tất cả field text ở Step 1 |

### 2.2 UI/UX Behaviors (COMMON-011 → COMMON-018)

| ID | Rule | Áp dụng |
|---|---|---|
| COMMON-011 | Modal dismiss qua X; backdrop click KHÔNG dismiss khi có unsaved changes | Liên quan nếu có popup confirm trong wizard (chưa thấy ở Step 1/2) |
| COMMON-012 | Loading spinner cho async > 300ms | "Proceed to Next Step" button khi check duplicate email/store name (UC-VOB-001), khi validate file (UC-VOB-002) |
| COMMON-013 | Toast tự dismiss sau 5 giây cho cả success/error | Có thể áp dụng nếu có toast khi save draft |
| COMMON-014 | Confirmation dialog trước hành động destructive | Có thể áp dụng cho × remove file (UC-VOB-002) — **Note: spec UC-VOB-002 nói "No confirmation dialog for file removal" → override COMMON-014 cho tình huống này** |
| COMMON-015 | Submit button disable sau click đầu để chống double-submit | "Proceed to Next Step" cả 2 step |
| COMMON-016 | Empty state có message + suggested action | Drop zone empty state (UC-VOB-002) |
| COMMON-017 | Success ops show success toast | Áp dụng nếu có (chưa rõ trong Step 1/2) |
| COMMON-018 | Table row hover highlight | N/A cho Step 1/2 |

### 2.3 Data Standards (COMMON-019 → COMMON-024)

| ID | Rule | Áp dụng |
|---|---|---|
| COMMON-019 | Email RFC 5322 | Email Address (UC-VOB-001) |
| COMMON-020 | Phone E.164 với country code | Phone Number (UC-VOB-001) |
| COMMON-021 | Date display DD/MM/YYYY | N/A |
| COMMON-022 | Date-time DD/MM/YYYY HH:mm 24h | N/A |
| COMMON-023 | Currency: symbol + 2 decimals | N/A |
| COMMON-024 | Percentage: value + % | N/A |

### 2.4 Error Handling (COMMON-025 → COMMON-032)

| ID | Rule (verbatim message) | Áp dụng |
|---|---|---|
| COMMON-025 | `"{Field Name} is required"` | Mọi required field/document |
| COMMON-026 | `"Please enter a valid {field type}"` | Email, Phone format invalid |
| COMMON-027 | `"{Field Name} must be between {min} and {max} characters"` | Áp dụng nếu vi phạm length range |
| COMMON-028 | `"{Field Name} must be between {min} and {max}"` | N/A (Step 1/2 không có numeric range) |
| COMMON-029 | `"{Field Name} already exists"` | Email duplicate, Store Name duplicate |
| COMMON-030 | `"Something went wrong. Please try again later."` | Server error fallback |
| COMMON-031 | 404 page user-friendly | N/A trong Step 1/2 |
| COMMON-032 | Inline errors below each field | Mọi error trong Step 1/2 |

### 2.5 File Upload (COMMON-033 → COMMON-040)

| ID | Rule | Áp dụng |
|---|---|---|
| COMMON-033 | Max file size: 5 MB (default) | Mọi upload UC-VOB-002 |
| COMMON-034 | Image formats accepted: JPEG, PNG, WebP — **Note: UC-VOB-002 (QA-024) extends thêm SVG cho Store Logo** | Store Logo (UC-VOB-002) |
| COMMON-035 | Document formats accepted: PDF | KYC documents (UC-VOB-002) |
| COMMON-036 | Image upload show preview thumbnail | Store Logo (UC-VOB-002) |
| COMMON-037 | Upload progress indicator cho files **strictly > 1MB** | Mọi upload > 1MB (UC-VOB-002) |
| COMMON-038 | Filename hiển thị sau upload, có nút remove | File card sau upload (UC-VOB-002) |
| COMMON-039 | Max 5 files per field (default) | Mỗi slot chỉ 1 file (override) |
| COMMON-040 | File input constrain MIME types tại browser dialog | KYC = `.pdf`; Store Logo = image MIME types |

### 2.6 Security & Authentication (COMMON-041 → COMMON-045)

| ID | Rule | Áp dụng |
|---|---|---|
| COMMON-041 | Password 8+ chars, 1 upper / 1 lower / 1 digit / 1 special | N/A trong Step 1/2 (no password field — đăng ký không yêu cầu password ở Step 1; password được tạo sau khi Admin approve?) — **Open question: where is password set?** |
| COMMON-042 | Session timeout 30 phút | Wizard session (RULE-070) |
| COMMON-043 | Max 5 failed login → khóa 15 phút | N/A |
| COMMON-044 | Password reset link 24h | N/A |
| COMMON-045 | Session invalidated on password change | N/A |

### 2.7 Accessibility (COMMON-046 → COMMON-051)

| ID | Rule | Áp dụng |
|---|---|---|
| COMMON-046 | Color contrast WCAG AA (4.5:1) | Toàn UI |
| COMMON-047 | Keyboard navigable (Tab/Shift+Tab) | Mọi interactive |
| COMMON-048 | Form fields có associated label (aria-label) | Mọi input + upload zone Step 1/2 |
| COMMON-049 | Images có alt text | Logo, icon, file thumbnail |
| COMMON-050 | Focus indicator visible | Mọi interactive |
| COMMON-051 | Error message aria-describedby gắn với field | Mọi inline error |

### 2.8 Pagination & Lists (COMMON-052 → COMMON-058)

| ID | Rule | Áp dụng |
|---|---|---|
| COMMON-052–COMMON-058 | Pagination, list, table rules | N/A trong Step 1/2 (không có list/table) — COMMON-057 (filename truncate ellipsis + tooltip) áp dụng cho file card UC-VOB-002 |

## 3. Business Rules (BR-) — phạm vi engagement này

| ID | Rule | UC liên quan |
|---|---|---|
| BR-023 | Vendor submit registration form với personal hoặc business details | UC-VOB-001 |
| BR-024 | Vendor upload mandatory verification documents theo vendor type | UC-VOB-002 |
| BR-025 | Vendor accept latest agreement trước khi registration complete | UC-VOB-003 |
| BR-026 | Admin review/approve/reject/re-verify vendor | UC-VOB-006/007 (out of scope engagement này) |

## 4. Business Rules (RULE-) — phạm vi engagement này

| ID | Rule | UC |
|---|---|---|
| RULE-002 | Vendor phải accept latest vendor agreement trước khi registration complete | UC-VOB-003 (downstream) |
| RULE-003 | Document upload format = PDF; format + size validated by system | UC-VOB-002 |
| RULE-004 | Admin approval mandatory trước vendor activation | UC-VOB-006 (downstream) |
| RULE-053 | Vendor verification document upload size limit = 5MB per document | UC-VOB-002 |
| RULE-068 | Vendor agreement acceptance checkbox disabled cho đến khi vendor scroll xuống cuối agreement container | UC-VOB-003 (downstream) |
| RULE-069 | Vendor agreement text area phải support rich formatting (HTML/Markdown) | UC-VOB-003 (downstream) |
| RULE-070 | Registration wizard session timeout sau inactivity (30–60 phút); vendor được notify trước/khi timeout | UC-VOB-001 + UC-VOB-002 (cross-step) |
| RULE-071 | Frontend validate step-by-step; backend final submission validate all steps đồng thời và aggregate all errors trong một response | UC-VOB-001 → UC-VOB-004 |

## 5. Stakeholders & Personas (engagement này)

| Stakeholder | Vai trò trong UC-VOB-001/002 |
|---|---|
| Prospective Vendor (Individual / Business) | Primary actor — fill form Step 1 + upload docs Step 2 |
| Admin | Downstream actor — review/approve sau khi vendor submit (UC-VOB-006) |
| System | Validate input, lưu draft session, tiến wizard |

## 6. Cross-reference codes — quick lookup

- `COMMON-xxx` → Common rule (file: `docs/ba/common/common-rules.md`).
- `BR-xxx` → Business requirement (file: `docs/ba/common/requirement-traceability.md` §1).
- `RULE-xxx` → Business rule (file: `docs/ba/common/requirement-traceability.md` §2).
- `QA-xxx` → Resolved question từ `Vendor Onboarding QA Answers.csv` hoặc `meeting-transcript-1104.md`.
- `UC-VOB-xxx` → Use case Vendor Onboarding (file: `docs/ba/UC-VOB-xxx.md`).

## 7. Ngôn ngữ & quy ước artifact

- Phân tích / narrative: **tiếng Việt**.
- UI label, message system, mã rule: **giữ nguyên ngôn ngữ gốc (English)** vì đây là verbatim text trên UI.
- REQ-ID format: `REQ-VOB-<MODULE_SUFFIX>-<##>` — ví dụ:
  - UC-VOB-001 (vendor-onboarding-basic) → `REQ-VOB-BASIC-01`, `REQ-VOB-BASIC-02`, …
  - UC-VOB-002 (vendor-onboarding-documents) → `REQ-VOB-DOCS-01`, …
- TC-ID format: `TC-VOB-BASIC-<###>`, `TC-VOB-DOCS-<###>`.
- Date format: `YYYY-MM-DD` cho metadata; UI date display dùng COMMON-021 (`DD/MM/YYYY`).

## 8. Open assumptions / project-level gaps

| ID | Item | Owner |
|---|---|---|
| PCTX-1 | Project config (`.claude/config/project.md`) đang ở trạng thái TEMPLATE — Tên dự án, Modules list, Platform & device coverage chưa fill. Cần PM/PO update trước engagement lớn. | qc-lead → user |
| PCTX-2 | Password creation step không xuất hiện trong UC-VOB-001 đến UC-VOB-004 — không rõ tại điểm nào trong flow vendor account credentials được set. | BA |
| PCTX-3 | Screen asset images (`docs/ba/spec/UC-VOB-001/`, `docs/ba/spec/UC-VOB-002/`) không có sẵn trong filesystem — phân tích phải dựa hoàn toàn vào textual spec. | BA |
| PCTX-4 | Wireframe file `docs/ba/wireframes-vendor-onboarding.md` referenced nhưng không tồn tại trong `docs/ba/`. | BA |

## Changelog

| Date | Source | Changes |
|---|---|---|
| 2026-05-05 | First build (mode=first-build) | Initial synthesis của 58 COMMON rules + 103 BR + 71 RULE từ `common-rules.md` v2026-04-13 và `requirement-traceability.md` v2026-04-13. |
