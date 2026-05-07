# Common Rules

> Generated: 2026-04-13
> Last Updated: 2026-04-13
> Managed by: common-rules skill

---

## Summary

| Category | Active | Deprecated | Total |
|----------|--------|------------|-------|
| Accessibility | 6 | 0 | 6 |
| Data Standards | 6 | 0 | 6 |
| Error Handling | 8 | 0 | 8 |
| File Upload | 8 | 0 | 8 |
| Input Constraints | 10 | 0 | 10 |
| Pagination & Lists | 7 | 0 | 7 |
| Security & Authentication | 5 | 0 | 5 |
| UI/UX Behaviors | 8 | 0 | 8 |
| **Total** | **58** | **0** | **58** |

---

## Rules by Category

### Input Constraints

> Field-level validation rules for user input.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-001 | Text field (single line) maximum length: 255 characters | Prevents excessive input and aligns with common database column defaults | Initialized | Active |
| COMMON-002 | Text area (multi-line) maximum length: 2,000 characters | Balances detail capture with storage and UI constraints | Initialized | Active |
| COMMON-003 | Required fields must be marked with asterisk (*) | Standard UX convention for form clarity | Initialized | Active |
| COMMON-004 | Numeric-only fields must reject non-numeric input on keypress | Prevents invalid data entry at the source | Initialized | Active |
| COMMON-005 | Dropdown selections must have a placeholder: "Select {field_name}" | Guides users and prevents accidental blank submissions | Initialized | Active |
| COMMON-006 | Search fields minimum query length: 2 characters before triggering search | Reduces unnecessary API calls and improves result relevance | Initialized | Active |
| COMMON-007 | Name fields must not exceed 100 characters | Sufficient for real-world names while preventing abuse | Initialized | Active |
| COMMON-008 | Description fields must not exceed 500 characters | Ensures concise descriptions within UI display constraints | Initialized | Active |
| COMMON-009 | Input fields must prevent further input when maximum character length is reached | Proactive constraint enforcement; avoids post-submission validation errors | User-defined | Active |
| COMMON-010 | Text fields and text areas must display placeholder: "Input {field_name}" | Consistent placeholder convention across all text input controls | User-defined | Active |

---

### UI/UX Behaviors

> Interaction patterns and behavioral consistency.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-011 | Modal dialogs dismissible via close button (X); backdrop click must NOT dismiss modals with unsaved changes | Prevents accidental data loss in forms and wizards | Initialized | Active |
| COMMON-012 | Loading spinner must display for async operations exceeding 300ms | Provides visual feedback; avoids perceived unresponsiveness | Initialized | Active |
| COMMON-013 | Toast notifications auto-dismiss after 5 seconds for both success and error types | Consistent dismiss behavior; avoids stale error toasts cluttering UI | Initialized (modified) | Active |
| COMMON-014 | Confirmation dialog required before any destructive or decisive action (delete, archive, suspend, approve, reject) | Prevents accidental irreversible actions including approval decisions | Initialized (modified) | Active |
| COMMON-015 | Form submissions must disable submit button after first click to prevent double submission | Avoids duplicate records and payment transactions | Initialized | Active |
| COMMON-016 | Empty states must display descriptive message and suggest an action | Guides users when no data exists; improves discoverability | Initialized | Active |
| COMMON-017 | Success operations must display a success toast message | Confirms action completion to the user | Initialized | Active |
| COMMON-018 | Table rows must support hover highlight for readability | Improves data scanning in dense tables (products, orders, vendors) | Initialized | Active |

---

### Data Standards

> Format and representation rules for common data types.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-019 | Email format must comply with RFC 5322 standard | Industry standard for email validation | Initialized | Active |
| COMMON-020 | Phone number format: E.164 international format with country code | Enables international vendor and customer support | Initialized | Active |
| COMMON-021 | Date display format: DD/MM/YYYY (configurable per locale) | Consistent date presentation across platform | Initialized | Active |
| COMMON-022 | Date-time display format: DD/MM/YYYY HH:mm (24-hour) | Unambiguous time representation for orders and transactions | Initialized | Active |
| COMMON-023 | Currency display: symbol prefix with 2 decimal places (e.g., LKR 1,500.00) | Consistent monetary display for pricing, commissions, settlements | Initialized | Active |
| COMMON-024 | Percentage display: value followed by % symbol, max 2 decimal places | Standard percentage formatting for discounts and commissions | Initialized | Active |

---

### Error Handling

> Standardized error messaging and validation feedback.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-025 | Required field validation message: "{Field Name} is required" | Consistent, actionable error messaging | Initialized | Active |
| COMMON-026 | Invalid format validation: "Please enter a valid {field type}" | Tells user what format is expected | Initialized | Active |
| COMMON-027 | Min/max length validation: "{Field Name} must be between {min} and {max} characters" | Specific feedback with exact constraints | Initialized | Active |
| COMMON-028 | Numeric range validation: "{Field Name} must be between {min} and {max}" | Clear boundary communication for numeric inputs | Initialized | Active |
| COMMON-029 | Unique constraint violation: "{Field Name} already exists" | Immediate feedback on duplicate entries (SKUs, emails, coupon codes) | Initialized | Active |
| COMMON-030 | Server error fallback: "Something went wrong. Please try again later." | User-friendly fallback; avoids exposing technical details | Initialized | Active |
| COMMON-031 | 404 page must display user-friendly message with navigation back to home | Prevents dead-end user experiences | Initialized | Active |
| COMMON-032 | Form validation must show inline errors below each field, not only summary banner | Reduces cognitive load; users see errors in context | Initialized | Active |

---

### File Upload

> File upload behavior and constraints.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-033 | Maximum file size per upload: 5 MB (unless specified otherwise per feature) | Balances quality with bandwidth and storage constraints | Initialized | Active |
| COMMON-034 | Image formats accepted: JPEG, PNG, WebP | Covers common image use cases with web-optimized formats | Initialized | Active |
| COMMON-035 | Document formats accepted: PDF | Standard document format for KYC, agreements, brochures | Initialized | Active |
| COMMON-036 | Image upload must show preview thumbnail before submission | Allows users to verify correct image before committing | Initialized | Active |
| COMMON-037 | Upload progress indicator for files exceeding 1 MB | Visual feedback for larger uploads; reduces abandonment | Initialized | Active |
| COMMON-038 | File name must be displayed after upload with option to remove | Confirmation of successful upload with ability to correct mistakes | Initialized | Active |
| COMMON-039 | Multiple file upload: maximum 5 files per upload field (unless specified otherwise) | Prevents excessive uploads while allowing batch operations | Initialized | Active |
| COMMON-040 | File input must constrain selectable file types in browser file dialog to accepted formats only | Prevents human error by filtering file types at the OS dialog level | User-defined | Active |

---

### Security & Authentication

> Business-level security and authentication behavior.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-041 | Password minimum: 8 characters with at least 1 uppercase, 1 lowercase, 1 digit, 1 special character | Industry-standard password complexity requirement | Initialized | Active |
| COMMON-042 | Session timeout after 30 minutes of inactivity; display warning 5 minutes before expiry | Balances security with user convenience; prevents unauthorized access | Initialized | Active |
| COMMON-043 | Maximum login attempts: 5 failures before temporary account lockout (15 minutes) | Mitigates brute-force attacks while avoiding permanent lockouts | Initialized | Active |
| COMMON-044 | Password reset link validity: 24 hours | Reasonable window for password recovery without indefinite exposure | Initialized | Active |
| COMMON-045 | User sessions must be invalidated on password change | Ensures compromised sessions are terminated immediately | Initialized | Active |

---

### Accessibility

> Rules ensuring usability for all users including those with disabilities.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-046 | Color contrast ratio must meet WCAG AA standard (minimum 4.5:1 for normal text) | Legal and ethical accessibility compliance | Initialized | Active |
| COMMON-047 | All interactive elements must be keyboard-navigable (Tab/Shift+Tab) | Essential for users who cannot use a mouse | Initialized | Active |
| COMMON-048 | Form fields must have associated labels (visible or aria-label) | Required for screen reader compatibility | Initialized | Active |
| COMMON-049 | Images must have descriptive alt text | Accessibility requirement for visually impaired users | Initialized | Active |
| COMMON-050 | Focus indicators must be visible on all interactive elements | Keyboard users must see which element is focused | Initialized | Active |
| COMMON-051 | Error messages must be associated with their form fields via aria-describedby | Screen readers can announce errors in context | Initialized | Active |

---

### Pagination & Lists

> Rules for collections, tables, and paginated data.

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-052 | Default page size: 20 items per page | Balances data density with page load performance | Initialized | Active |
| COMMON-053 | Available page sizes: 10, 20, 50, 100 | Gives users control over data density | Initialized | Active |
| COMMON-054 | Default sort order: newest first (created date descending) | Most relevant items appear first for operational workflows | Initialized | Active |
| COMMON-055 | Pagination must display: current page, total pages, total items count | Full navigation context for large datasets | Initialized | Active |
| COMMON-056 | Empty list state must display descriptive message with suggested action | Guides users when no data exists; improves discoverability | Initialized | Active |
| COMMON-057 | Table columns with long text must truncate with ellipsis and tooltip on hover | Maintains table layout while preserving access to full content | Initialized | Active |
| COMMON-058 | Search/filter results must preserve pagination state | Avoids losing user's place when refining results | Initialized | Active |

---

## Changelog

| Date | Action | IDs Affected | Description | Source |
|------|--------|-------------|-------------|--------|
| 2026-04-13 | Initialized | COMMON-001 to COMMON-058 | Initial rule set created for multivendor ecommerce platform. 58 rules across 8 categories. Custom rules added: COMMON-009, COMMON-010, COMMON-040. Modified rules: COMMON-013 (error toast auto-dismiss), COMMON-014 (approve/reject in confirmation). Excluded categories: Notifications (feature-specific), Approval & Workflow (covered by business rules). Excluded suggested rules: Data Standards #7 (boolean display — design-dependent), Data Standards #8 (name title case — design-dependent), Security #5 (OTP — covered by RULE-051). | `common-rules init` |
