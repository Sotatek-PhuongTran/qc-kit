# UC-VOB-001: Submit Vendor Registration

> Source: [usecase-list.md](../../usecase-list.md), [common-rules.md](../../common-rules.md), [requirement-traceability.md](../../requirement-traceability.md), [wireframes-vendor-onboarding.md](../../wireframes-vendor-onboarding.md)
> Screen Asset: `docs/ba/spec/UC-VOB-001/image copy.png`

---

## 1. Use Case Description

| Field | Description |
|---|---|
| **ID** | UC-VOB-001 |
| **Use Case** | Submit Vendor Registration |
| **Description** | As a prospective vendor (Individual or Business), I want to fill in my basic registration details and select my vendor type, so that I can begin the onboarding process and proceed to document upload. |
| **Pre-conditions** | - None. The page is publicly accessible without login. |
| **Trigger** | Vendor navigates to the `/register/vendor` registration page and lands on the **Basic Details** step (Step 1 of 3). |
| **Post-conditions** | - Vendor's basic details (type, name, email, phone, store name, store description, and Company Name if Business) are persisted in the session/draft. <br> - Step 1 validation passes; wizard advances to Step 2 (Upload Documents → UC-VOB-002). <br> - A `Vendor` record is created in `Draft` state upon final submission (UC-VOB-004). |
| **Basic Flow** | 1. Vendor opens the registration page; wizard displays Step 1 "Basic Details" as the active step. <br> 2. Vendor selects **Vendor Type**: `Individual` or `Business`. <br> 3. Vendor fills in **First Name**, **Last Name**, **Email Address**, and **Phone Number** (all required). <br> 4. If Vendor Type = `Business`, vendor also fills in **Company Name** (required — primary business identifier). <br> 5. Vendor fills in **Store Name** (required) and optionally **Store Description**. <br> 6. Vendor clicks **"Proceed to Next Step"**. <br> 7. System performs inline validation on all fields. <br> 8. If all fields are valid, wizard advances to Step 2 (→ UC-VOB-002). |
| **Alternative Flow** | **[Validation Failure]** <br> 1. On "Proceed to Next Step", one or more fields fail validation. <br> 2. System displays inline error messages directly below each offending field [COMMON-032]. <br> 3. Submit button reverts to enabled; vendor corrects fields and re-submits. <br><br> **[Vendor Type Switch]** <br> 1. Vendor selects `Individual`, fills fields, then switches to `Business`. <br> 2. Previously entered personal fields (First Name, Last Name) are retained; Company Name field appears as a new required field. The selection updates the required document set for Step 2 (→ UC-VOB-002). |
| **Business Rules** | **[BR-023]:** Vendor must be able to submit a registration form with personal or business details (§3.1). <br><br> **[RULE-002]:** Vendor must accept the latest vendor agreement before registration is complete — acceptance is enforced at Step 3 (→ UC-VOB-003); Step 1 does not finalize registration. |

---

## 2. Screen Description

### Screen SC-01: Basic Details (Step 1 of 3)

> Screen asset: `docs/ba/spec/UC-VOB-001/image copy.png`

#### Layout Overview

The screen is a single-column centered layout. The header bar shows the platform logo ("MultiVendor Platform") on the left and **Help** + **Login** links in the top-right. The page title "Register as a Vendor" is displayed prominently. A **3-step progress wizard** beneath the title shows **Step 1 (Basic Details)** as active (filled black circle), with Steps 2 and 3 greyed out. The form body contains the fields described below, followed by the CTA button aligned to the right.

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Step Progress Indicator** | Wizard / Stepper | **Display Rules:** <br> - Always visible at top of registration flow. <br> - Step 1 "Basic Details" highlighted with solid black circle; Steps 2 "Upload Documents" and 3 "Agreement" rendered in disabled/grey state. <br><br> **Behaviors:** <br> - Steps 2 and 3 are NOT clickable until the current step is successfully validated. <br> - Advancing steps is only possible via the "Proceed to Next Step" button. |
| 2 | **Vendor Type** | Radio Button Group | **Display Rules:** <br> - Always visible. Two options: `Individual` and `Business`. <br> - Default selection: `Individual` (pre-selected on page load). <br><br> **Behaviors:** <br> - Selecting `Business` reveals the **Company Name** field and updates the required document set for Step 2 (→ UC-VOB-002). <br> - Selecting `Individual` hides the Company Name field. <br> - Selection is retained when navigating back from Step 2. <br> - No asterisk (*) as the field always has a default; selection is inherently mandatory. <br> - Enforces [BR-023]: vendor type drives the KYC document requirements downstream. |
| 3 | **First Name** | Text Input (single-line) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Placeholder: `Enter first name` [COMMON-010]. <br><br> **Behaviors:** <br> - Max 100 characters [COMMON-007]; input blocked beyond limit [COMMON-009]. <br> - On "Proceed to Next Step" with empty value: shows inline error `"First Name is required"` below the field [COMMON-025, COMMON-032]. <br> - No numeric-only restriction (names may contain hyphens, apostrophes). <br> - Field associated with label via `aria-labelledby` [COMMON-048]. |
| 4 | **Last Name** | Text Input (single-line) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Placeholder: `Enter last name` [COMMON-010]. <br><br> **Behaviors:** <br> - Max 100 characters [COMMON-007]; input blocked beyond limit [COMMON-009]. <br> - On "Proceed to Next Step" with empty value: shows inline error `"Last Name is required"` [COMMON-025, COMMON-032]. <br> - Displayed in the same row as First Name (two-column layout on desktop). |
| 5 | **Company Name** | Text Input (single-line) | **Display Rules:** <br> - Visible only when Vendor Type = `Business`; hidden for `Individual`. <br> - Required field when visible; marked with red asterisk `*` [COMMON-003]. <br> - Placeholder: `Enter company name` [COMMON-010]. <br> - Full-width field spanning both columns. <br><br> **Behaviors:** <br> - Max 255 characters [COMMON-001]; input blocked beyond limit [COMMON-009]. <br> - On "Proceed to Next Step" with `Business` type and empty value: shows inline error `"Company Name is required"` [COMMON-025, COMMON-032]. <br> - Acts as the primary business identifier alongside First/Last Name for the account holder (QA-022 resolved). |
| 6 | **Email Address** | Text Input (email) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Placeholder: `Enter email address` [COMMON-010]. <br><br> **Behaviors:** <br> - Validates RFC 5322 email format on proceed [COMMON-019]. <br> - Max 255 characters [COMMON-001]; input blocked beyond limit [COMMON-009]. <br> - On empty: `"Email Address is required"` [COMMON-025]. <br> - On invalid format: `"Please enter a valid email"` [COMMON-026]. <br> - On duplicate email (checked at server): `"Email Address already exists"` [COMMON-029]. <br> - Error shown inline below field [COMMON-032]. <br> - **Note:** Email verification (OTP/link) is NOT performed at this step. It will be handled at the final submission step (UC-VOB-004) before the registration is submitted — QA-021 resolved. |
| 7 | **Phone Number** | Text Input (tel) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Placeholder: `Enter phone number` [COMMON-010]. <br><br> **Behaviors:** <br> - Accepts E.164 international format with country code (e.g. `+94771234567`) [COMMON-020]. <br> - Max 255 characters [COMMON-001]; numeric-only characters enforced on keypress [COMMON-004]. Non-numeric characters rejected at input. <br> - On empty: `"Phone Number is required"` [COMMON-025]. <br> - On invalid format: `"Please enter a valid phone number"` [COMMON-026]. <br> - Displayed in same row as Email Address (two-column layout). |
| 8 | **Store Name** | Text Input (single-line) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Placeholder: `Enter store name` [COMMON-010]. <br> - Full-width field spanning both columns. <br><br> **Behaviors:** <br> - Max 255 characters [COMMON-001]; input blocked beyond limit [COMMON-009]. <br> - On empty: `"Store Name is required"` [COMMON-025]. <br> - On duplicate (server-side): `"Store Name already exists"` [COMMON-029]. <br> - Error shown inline below field [COMMON-032]. |
| 9 | **Store Description** | Text Area (multi-line) | **Display Rules:** <br> - Optional field; no asterisk. <br> - Placeholder: `Describe your store (Max 500 chars)` [COMMON-010]. <br> - Full-width field. <br> - Character counter displayed in bottom-right corner of the textarea: `0/500`. <br><br> **Behaviors:** <br> - Max 500 characters enforced for UI display constraints [COMMON-008]; input blocked beyond limit [COMMON-009]. <br> - Character counter updates in real-time as vendor types. <br> - No validation error on empty (optional). <br> - Field associated with label [COMMON-048]. |
| 10 | **"Proceed to Next Step" Button** | Button (Primary CTA) | **Display Rules:** <br> - Always visible; right-aligned at the bottom of the form. <br> - Labelled: `Proceed to Next Step >`. <br><br> **Behaviors:** <br> - On click: triggers client-side validation for all required fields in Step 1. <br> - If validation passes: <br> &nbsp;&nbsp; • Saves Step 1 data to session/draft. <br> &nbsp;&nbsp; • Navigates wizard to Step 2 (Upload Documents → UC-VOB-002). <br> - If validation fails: <br> &nbsp;&nbsp; • Inline error messages appear below each failing field [COMMON-032]. <br> &nbsp;&nbsp; • Button remains enabled for retry. <br> - Button disabled after first successful click to prevent double-submission [COMMON-015]. <br> - If async operation for duplicate checks exceeds 300 ms, a loading spinner is displayed [COMMON-012]. |
| 11 | **Help Link** | Navigation Link | **Display Rules:** <br> - Always visible in top-right header. <br><br> **Behaviors:** <br> - Navigates to platform help/support page in a new tab. |
| 12 | **Login Link** | Navigation Link | **Display Rules:** <br> - Always visible in top-right header. <br><br> **Behaviors:** <br> - Navigates to the vendor login page. Prompts vendor who already has an account to log in instead of registering again. |

---

## 3. Validation Summary

| Field | Required | Format Rule | Max Length | Error Messages |
|---|---|---|---|---|
| Vendor Type | Yes (default set) | Radio selection | — | N/A (always has selection) |
| First Name | Yes | Free text | 100 chars [COMMON-007] | "First Name is required" [COMMON-025] |
| Last Name | Yes | Free text | 100 chars [COMMON-007] | "Last Name is required" [COMMON-025] |
| Company Name | Yes (Business only) | Free text | 255 chars [COMMON-001] | "Company Name is required" [COMMON-025] |
| Email Address | Yes | RFC 5322 [COMMON-019] | 255 chars [COMMON-001] | "Email Address is required" / "Please enter a valid email" / "Email Address already exists" |
| Phone Number | Yes | E.164 [COMMON-020] | 255 chars [COMMON-001] | "Phone Number is required" / "Please enter a valid phone number" |
| Store Name | Yes | Free text | 255 chars [COMMON-001] | "Store Name is required" / "Store Name already exists" |
| Store Description | No | Free text | 500 chars [COMMON-008] | — |

---

## 4. Cross-References

| Reference | Type | Notes |
|---|---|---|
| → UC-VOB-002 | Next Step | On successful Step 1 completion, wizard navigates to Upload Documents. Vendor Type selection determines mandatory KYC document set. |
| → UC-VOB-003 | Downstream | Agreement acceptance (Step 3) enforces [RULE-002]. |
| → UC-VOB-004 | Downstream | Final validation and vendor record creation in `Pending` state. Email verification handled at this final step (QA-021). |
| [BR-023] | Business Requirement | Submit vendor registration form with personal or business details. |
| [RULE-002] | Business Rule | Vendor must accept the latest vendor agreement before registration is complete. |
| [COMMON-001] | Common Rule | Single-line text field max 255 chars. |
| [COMMON-003] | Common Rule | Required fields marked with asterisk (*). |
| [COMMON-004] | Common Rule | Numeric-only fields reject non-numeric input on keypress. |
| [COMMON-007] | Common Rule | Name fields max 100 chars. |
| [COMMON-008] | Common Rule | Description fields max 500 chars. |
| [COMMON-009] | Common Rule | Input blocked when max length reached. |
| [COMMON-010] | Common Rule | Placeholder format: "Input {field_name}" / "Enter {field_name}". |
| [COMMON-012] | Common Rule | Loading spinner for async ops > 300 ms. |
| [COMMON-015] | Common Rule | Submit button disabled after first click. |
| [COMMON-019] | Common Rule | Email must comply with RFC 5322. |
| [COMMON-020] | Common Rule | Phone number in E.164 international format. |
| [COMMON-025] | Common Rule | Required field error: "{Field Name} is required". |
| [COMMON-026] | Common Rule | Invalid format error: "Please enter a valid {field type}". |
| [COMMON-029] | Common Rule | Unique constraint error: "{Field Name} already exists". |
| [COMMON-032] | Common Rule | Inline errors shown below each field. |
| [COMMON-048] | Common Rule | Form fields must have associated labels (aria-label). |

---

## 5. Open Questions

| # | Question | Status |
|---|---|---|
| OQ-1 | Is email verification (OTP or link) performed during Step 1 (before proceeding to Step 2) or post-registration? Wireframe assumes post-registration. | Resolved: Email verification is handled at the final submission step (UC-VOB-004), not during Step 1. — `Vendor Onboarding QA Answers.csv` [QA-021] |
| OQ-2 | Should `Business` vendor type show a `Company Name` field in place of `First Name` / `Last Name`, or retain both? Current screen retains First/Last Name for both types. | Resolved: Retain both. `Company Name` added as required field for Business vendors (primary business identifier). `First Name` and `Last Name` remain required for the account holder / point of contact. — `Vendor Onboarding QA Answers.csv` [QA-022] |

---

## Changelog

| Date | Source | Changes | QA Resolved |
|------|--------|---------|-------------|
| 2026-04-13 | `Vendor Onboarding QA Answers.csv` | Resolved OQ-1: email verification deferred to final submission step. Resolved OQ-2: added Company Name field for Business vendor type; updated Basic Flow, Alternate Flow, Vendor Type element (#2), Email field note (#6), Validation Summary, Cross-References. | QA-021, QA-022 |
