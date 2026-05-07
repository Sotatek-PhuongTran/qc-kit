# UC-VOB-004: Validate Registration Submission

> Source: [usecase-list.md](../../usecase-list.md), [common-rules.md](../../common-rules.md), [requirement-traceability.md](../../requirement-traceability.md), [wireframes-vendor-onboarding.md](../../wireframes-vendor-onboarding.md)
> Screen Assets:
> - `docs/ba/spec/UC-VOB-004/image copy.png` — SC-04a: Step 1 Validation Error State
> - `docs/ba/spec/UC-VOB-004/image copy 2.png` — SC-04b: Email OTP Modal — Initial State
> - `docs/ba/spec/UC-VOB-004/image copy 3.png` — SC-04c: Email OTP Modal — Incomplete Code Error
> - `docs/ba/spec/UC-VOB-004/image copy 4.png` — SC-04d: Email OTP Modal — Resend Code Enabled
> - `docs/ba/spec/UC-VOB-004/image.png` — SC-04e: Registration Success — Landing Page Redirect

---

## 1. Use Case Description

| Field | Description |
|---|---|
| **ID** | UC-VOB-004 |
| **Use Case** | Validate Registration Submission |
| **Description** | As the system, I want to validate all registration data across the 3-step wizard and verify the vendor's email via OTP before creating their account, so that only complete, correctly formatted, and email-verified submissions create a vendor account in Pending state. |
| **Pre-conditions** | - Vendor has completed Step 1: Basic Details (→ UC-VOB-001) — frontend-validated on "Proceed to Next Step". <br> - Vendor has completed Step 2: Upload Verification Documents (→ UC-VOB-002) — frontend-validated on "Proceed to Next Step". <br> - Vendor has completed Step 3: Accept Vendor Agreement (→ UC-VOB-003) — checkbox checked and agreement accepted. <br> - Vendor clicks "Submit Registration" on Step 3. <br> - Registration wizard session has not timed out (active within the 30–60 minute inactivity window [RULE-070]). |
| **Trigger** | System triggers validation and email OTP verification after vendor clicks "Submit Registration" in Step 3 (→ UC-VOB-003). |
| **Post-conditions** | - **On Success:** Email verified; vendor account created in `Pending` state; Admin notified for KYC review (→ UC-VOB-006); success toast displayed; vendor redirected to the **"Become a Vendor" landing page**. <br> - **On Failure:** Vendor remains on OTP modal or registration wizard; no vendor record created. |
| **Basic Flow** | 1. Vendor clicks "Submit Registration" on Step 3 (→ UC-VOB-003). <br> 2. System locks the submit button to prevent double submission [COMMON-015]. <br> 3. System sends a **6-digit OTP verification code** to the email address entered in Step 1. <br> 4. System displays an info toast: `"Verification code sent to {email}"` [COMMON-013]. <br> 5. System opens the **Email Verification modal** (SC-04b) overlaying Step 3 with a dimmed backdrop: <br>   — Mail icon, heading "Email Verification". <br>   — Subtitle: `"We've sent a 6-digit verification code to {email}"`. <br>   — 6 individual digit input fields (auto-focus on first). <br>   — Resend countdown: `"Didn't receive the code? Resend in {N}s"`. <br>   — Buttons: **Cancel** (secondary) and **Verify & Submit** (primary CTA). <br> 6. Vendor enters the 6-digit OTP code received via email. <br> 7. Vendor clicks **"Verify & Submit"**. <br> 8. System validates the OTP code (correct, not expired). <br> 9. System performs **backend full validation** in a single server round-trip, aggregating all cross-step checks [RULE-071]: <br>   — Uniqueness checks: email address not already registered [COMMON-029], store name not already taken [COMMON-029]. <br>   — Agreement version: accepted version matches current published version [RULE-002, RULE-012]. <br>   — Document integrity: uploaded files still valid in server session. <br> 10. All validations pass. <br> 11. System records agreement acceptance (version ID, timestamp). <br> 12. System creates vendor record in `Pending` state. <br> 13. System sends notification to Admin for KYC review (→ UC-VOB-006). <br> 14. Modal closes. System displays success toast: `"Registration Submitted Successfully!"` [COMMON-017]. <br> 15. Vendor is redirected to the **"Become a Vendor" landing page** (SC-04e). |
| **Alternative Flow** | **[OTP Incomplete — Verify & Submit with Partial Code]** <br> 1. Vendor enters fewer than 6 digits and clicks "Verify & Submit". <br> 2. System displays inline error below the digit inputs: `"Please enter the complete 6-digit code"` (SC-04c). <br> 3. All input fields are highlighted with red borders. <br> 4. Button remains enabled; vendor must complete all 6 digits. <br><br> **[OTP Invalid — Wrong Code]** <br> 1. Vendor enters all 6 digits but the code is incorrect. <br> 2. System displays inline error: `"Invalid verification code. Please try again."` <br> 3. Input fields are cleared; focus returns to the first digit. <br> 4. Vendor may retry or request a new code via "Resend Code". <br><br> **[OTP Expired]** <br> 1. Vendor enters a valid 6-digit code but the OTP has expired (server-side TTL exceeded). <br> 2. System displays inline error: `"Verification code has expired. Please request a new code."` <br> 3. "Resend Code" link is enabled for the vendor to request a fresh OTP. <br><br> **[Resend Countdown Active]** <br> 1. After the OTP is sent, a resend cooldown timer starts (initial countdown from ~60 seconds). <br> 2. During countdown: `"Didn't receive the code? Resend in {N}s"` — "Resend" is not clickable (SC-04b). <br> 3. Once countdown reaches 0: text changes to `"Didn't receive the code? Resend Code"` — link becomes active and bold (SC-04d). <br> 4. Vendor clicks "Resend Code"; system sends a new OTP, resets the countdown timer, and clears any previous error. <br><br> **[Cancel OTP Modal]** <br> 1. Vendor clicks "Cancel" on the Email Verification modal. <br> 2. Modal closes; vendor returns to Step 3 (Agreement) with all data retained (checkbox checked, agreement visible). <br> 3. "Submit Registration" button is re-enabled for the vendor to retry. <br> 4. No OTP is consumed; any pending OTP expires naturally. <br><br> **[Duplicate Email Detected — Server-Side]** <br> 1. Backend validation detects the email address was registered by another user between Step 1 and final submission (concurrent registration race condition). <br> 2. OTP modal closes. System displays error toast: `"Email Address already exists. Please use a different email."` [COMMON-029, COMMON-013]. <br> 3. Wizard navigates back to Step 1 with inline error below the Email Address field: `"Email Address already exists"` [COMMON-032]. <br> 4. Vendor corrects the email and must redo the wizard flow from Step 1. <br><br> **[Duplicate Store Name Detected — Server-Side]** <br> 1. Backend validation detects the store name was taken by another user between Step 1 and final submission. <br> 2. OTP modal closes. System displays error toast: `"Store Name already exists. Please choose a different name."` [COMMON-029, COMMON-013]. <br> 3. Wizard navigates back to Step 1 with inline error below the Store Name field: `"Store Name already exists"` [COMMON-032]. <br> 4. Vendor corrects the store name and must redo the wizard flow. <br><br> **[Stale Agreement Version Detected]** <br> 1. Admin published a new agreement version (→ UC-VOB-012) after the vendor loaded Step 3. <br> 2. Backend validation detects the accepted version is outdated. <br> 3. OTP modal closes. System displays error toast: `"The vendor agreement has been updated. Please review and accept the latest version."` [COMMON-013]. <br> 4. Wizard remains on Step 3; agreement text reloaded with the new version; checkbox cleared and disabled until vendor re-scrolls [RULE-068]. <br><br> **[Session Timeout]** <br> 1. Vendor's session has been idle for 30–60 minutes [RULE-070]. <br> 2. System warns the vendor before timeout with a countdown prompt (e.g., "Your session will expire in 5 minutes due to inactivity"). <br> 3. On timeout: session is invalidated; draft data is cleared; OTP modal (if open) is closed. <br> 4. Vendor is redirected to the registration start page with a message: `"Your session has expired. Please restart the registration."` <br><br> **[Server Error During Submission]** <br> 1. An unexpected server error occurs during OTP verification or record creation. <br> 2. System displays fallback error toast: `"Something went wrong. Please try again later."` [COMMON-030]. <br> 3. OTP modal closes; "Submit Registration" button re-enabled for retry. <br> 4. No vendor record is created (transaction rolled back). |
| **Business Rules** | **[BR-023]:** Vendor must submit a registration form with personal or business details (§3.1). <br><br> **[RULE-002]:** Vendor must accept the latest vendor agreement before registration is complete (§3.1). Enforced at Step 3 and re-validated server-side. <br><br> **[RULE-003]:** Document upload format must be PDF; validated at Step 2 frontend. <br><br> **[RULE-053]:** Vendor document upload size limit is 5 MB per document. Validated at Step 2 frontend. <br><br> **[RULE-068]:** Agreement acceptance checkbox must remain disabled until vendor scrolls to bottom. If stale version detected, checkbox re-disabled. <br><br> **[RULE-070]:** Registration wizard session must time out after inactivity (30–60 minutes). <br><br> **[RULE-071]:** Frontend validates step-by-step on each "Next"; backend validates only server-side concerns (uniqueness, agreement version, session integrity) in a single response. |

---

## 2. Screen Description

### Screen SC-04a: Validation Error State (Step 1 — Basic Details)

> Screen asset: `docs/ba/spec/UC-VOB-004/image copy.png`

#### Layout Overview

This screen shows the Step 1 "Basic Details" form in the **frontend validation error state** — this is the error state shown by UC-VOB-001 when the vendor clicks "Proceed to Next Step" with empty/invalid fields. It is included here as a reference for the inline error pattern that UC-VOB-004 uses when server-side validation redirects the vendor back to Step 1 (e.g., duplicate email race condition).

The header bar displays "MultiVendor Platform" logo with **Help** and **Login** links. The **3-step wizard** shows Step 1 as active. All required fields (First Name, Last Name, Email Address, Phone Number, Store Name) display **red inline error messages** below each empty field. The optional Store Description has no error.

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Step Progress Indicator** | Wizard / Stepper | Step 1 active, Steps 2–3 disabled. Same as UC-VOB-001 SC-01. |
| 2 | **First Name Error** | Inline Error Text | Red text: `"First name is required"` below field [COMMON-032]. Visible only on validation failure. Associated via `aria-describedby` [COMMON-051]. |
| 3 | **Last Name Error** | Inline Error Text | Red text: `"Last name is required"` below field [COMMON-032]. |
| 4 | **Email Address Error** | Inline Error Text | Red text below field [COMMON-032]. Possible messages: `"Email is required"` [COMMON-025] / `"Please enter a valid email"` [COMMON-026] / `"Email Address already exists"` [COMMON-029]. |
| 5 | **Phone Number Error** | Inline Error Text | Red text: `"Phone number is required"` below field [COMMON-032]. Also: `"Please enter a valid phone number"` [COMMON-026]. |
| 6 | **Store Name Error** | Inline Error Text | Red text: `"Store name is required"` below field [COMMON-032]. Also: `"Store Name already exists"` [COMMON-029]. |
| 7 | **Store Description** | Text Area (multi-line) | No error (optional). Character counter `0/500` [COMMON-008]. |
| 8 | **"Proceed to Next Step" Button** | Button (Primary CTA) | Triggers client-side validation. Remains enabled after failure for retry. Disabled after success [COMMON-015]. |

> **Note:** This screen is the UC-VOB-001 inline validation state. UC-VOB-004 only references it for the server-side duplicate detections that redirect back to Step 1.

---

### Screen SC-04b: Email Verification Modal — Initial State

> Screen asset: `docs/ba/spec/UC-VOB-004/image copy 2.png`

#### Layout Overview

This modal overlays Step 3 (Agreement) with a **dimmed backdrop**. The Step 3 content is visible but non-interactive behind the modal. A blue info toast appears in the top-right: `"Verification code sent to {email}"`. The modal itself is a centered white card containing the email verification flow.

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Info Toast** | Toast / Snackbar | **Display Rules:** <br> - Appears in the top-right corner when the modal opens. <br> - Blue/info background with info icon (ℹ). <br> - Message: `"Verification code sent to {email}"` — dynamically shows the email from Step 1. <br><br> **Behaviors:** <br> - Auto-dismisses after 5 seconds [COMMON-013]. <br> - Confirms OTP was sent successfully. |
| 2 | **Mail Icon** | Static Icon | **Display Rules:** <br> - Centered at the top of the modal card. <br> - Large envelope/mail icon inside a light circular backdrop. <br><br> **Behaviors:** <br> - Static; decorative only. |
| 3 | **"Email Verification" Heading** | Static Text / Heading | **Display Rules:** <br> - Centered below the mail icon. <br> - Bold text: `"Email Verification"`. <br><br> **Behaviors:** <br> - Static; no interaction. |
| 4 | **Verification Subtitle** | Static Text | **Display Rules:** <br> - Centered below the heading. <br> - Grey text: `"We've sent a 6-digit verification code to"` followed by the vendor's email address displayed in a distinct/bold style (e.g., `a@a.c`). <br><br> **Behaviors:** <br> - Email is dynamically populated from the Step 1 email field value. <br> - Static; no interaction. |
| 5 | **6-Digit OTP Input** | Individual Digit Input Fields (×6) | **Display Rules:** <br> - 6 separate square input boxes arranged horizontally, centered in the modal. <br> - Each box accepts exactly 1 numeric digit. <br> - Boxes have a light grey border in default state. <br><br> **Behaviors:** <br> - Auto-focus on the first digit box when modal opens. <br> - On entering a digit, focus automatically advances to the next box. <br> - On pressing backspace in an empty box, focus moves to the previous box and clears it. <br> - Only numeric characters (0–9) accepted; non-numeric input rejected on keypress [COMMON-004]. <br> - Paste: vendor may paste a 6-digit string — system distributes digits across all 6 boxes. <br> - On validation error (incomplete or wrong code): all 6 boxes get a red border (SC-04c). |
| 6 | **Resend Countdown / Resend Link** | Timer Text / Action Link | **Display Rules:** <br> - Centered below the digit inputs. <br> - During countdown: `"Didn't receive the code? Resend in {N}s"` — "Resend in {N}s" is grey, non-interactive text (SC-04b). <br> - After countdown expires: `"Didn't receive the code? Resend Code"` — **"Resend Code"** is a bold, clickable link (SC-04d). <br><br> **Behaviors:** <br> - Countdown starts at ~60 seconds when OTP is sent (configurable server-side). <br> - Timer decrements every second. <br> - On countdown reaching 0: "Resend Code" link becomes active. <br> - On click "Resend Code": system sends a new OTP, resets countdown timer, clears any previous error messages, and shows a new info toast. <br> - Max resend attempts may be throttled server-side (implementation detail). |
| 7 | **"Cancel" Button** | Button (Secondary) | **Display Rules:** <br> - Left-aligned in the modal footer. <br> - Outlined/secondary style (light background, dark text). <br><br> **Behaviors:** <br> - On click: closes the modal, returns vendor to Step 3 with all data retained. <br> - "Submit Registration" button re-enabled. <br> - No destructive action — draft data and checkbox state preserved [COMMON-011]. |
| 8 | **"Verify & Submit" Button** | Button (Primary CTA) | **Display Rules:** <br> - Right-aligned in the modal footer. <br> - Styled as primary solid button (dark background, white text). <br><br> **Behaviors:** <br> - On click: validates all 6 digits are entered. <br> - If incomplete (< 6 digits): inline error `"Please enter the complete 6-digit code"` (SC-04c); all digit boxes highlighted red. <br> - If complete: sends OTP to server for verification. <br>   — If OTP valid: proceeds to backend full validation (Basic Flow step 9). <br>   — If OTP invalid: inline error `"Invalid verification code. Please try again."` <br>   — If OTP expired: inline error `"Verification code has expired. Please request a new code."` <br> - Button disabled after click to prevent double submission [COMMON-015]; re-enabled on error. <br> - Loading spinner shown if async exceeds 300ms [COMMON-012]. |

---

### Screen SC-04c: Email Verification Modal — Incomplete Code Error

> Screen asset: `docs/ba/spec/UC-VOB-004/image copy 3.png`

#### Layout Overview

Same modal layout as SC-04b but in the **validation error state**. The vendor has entered only 5 of 6 digits and clicked "Verify & Submit". All 6 digit input boxes now display **red borders**. A red inline error message `"Please enter the complete 6-digit code"` is shown below the digit inputs. The resend countdown is still active (e.g., "Resend in 36s").

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Red-Bordered OTP Inputs** | Individual Digit Input Fields (×6) | **Display Rules:** <br> - All 6 boxes have red/pink borders to indicate the error state. <br> - Entered digits remain visible in their respective boxes. <br> - The empty box (6th) is clearly identifiable. <br><br> **Behaviors:** <br> - Red borders clear once the vendor enters all 6 digits. <br> - Focus may be on the empty box for the vendor to complete input. |
| 2 | **Inline Error Message** | Error Text | **Display Rules:** <br> - Red text centered below the digit inputs: `"Please enter the complete 6-digit code"`. <br> - Visible only when vendor clicks "Verify & Submit" with fewer than 6 digits entered. <br><br> **Behaviors:** <br> - Clears once all 6 digits are entered. <br> - Associated with the input group via `aria-describedby` [COMMON-051]. |

---

### Screen SC-04d: Email Verification Modal — Resend Code Enabled

> Screen asset: `docs/ba/spec/UC-VOB-004/image copy 4.png`

#### Layout Overview

Same modal layout as SC-04b but with the **resend countdown expired**. The countdown text has changed to `"Didn't receive the code? Resend Code"` where **"Resend Code"** is now a bold, clickable link. The OTP input still shows 5 of 6 digits entered (no error state displayed in this screen — the vendor hasn't clicked "Verify & Submit" yet).

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **"Resend Code" Active Link** | Action Link | **Display Rules:** <br> - Replaces the countdown timer text once the period expires. <br> - **"Resend Code"** displayed in bold, indicating it is clickable. <br><br> **Behaviors:** <br> - On click: triggers a new OTP to be sent to the vendor's email. <br> - Countdown timer resets and begins counting down again. <br> - Previously entered digits in the OTP input are cleared. <br> - A new info toast `"Verification code sent to {email}"` is shown. <br> - Any previous error messages are cleared. |

---

### Screen SC-04e: Registration Submitted — Landing Page Redirect

> Screen asset: `docs/ba/spec/UC-VOB-004/image.png`

#### Layout Overview

This screen shows the **"Become a Vendor" landing page** displayed after successful registration submission. The header bar shows "MultiVendor Platform" logo. A **green success toast** appears in the top-right: `"Registration Submitted Successfully!"` with a green checkmark. The page body contains marketing content: heading "Become a Vendor", subtitle describing the platform, a "Register as a Vendor" CTA button, and three feature cards ("Easy Registration", "Quick Verification", "Manage Your Store").

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Success Toast** | Toast / Snackbar | **Display Rules:** <br> - Appears in the top-right corner upon successful submission. <br> - Green background with checkmark icon (✓). <br> - Message: `"Registration Submitted Successfully!"` [COMMON-017]. <br><br> **Behaviors:** <br> - Auto-dismisses after 5 seconds [COMMON-013]. <br> - Confirms vendor record created in `Pending` state and Admin notified. |
| 2 | **"Become a Vendor" Heading** | Static Text / Heading | **Display Rules:** <br> - Large centered heading: `"Become a Vendor"`. <br><br> **Behaviors:** <br> - Static; this is the standard landing page heading. |
| 3 | **Platform Description** | Static Text | **Display Rules:** <br> - Centered grey text below heading: `"Join our marketplace and reach thousands of customers. Register your store, upload your documents, and start selling in minutes."` <br><br> **Behaviors:** <br> - Static; no interaction. |
| 4 | **"Register as a Vendor" Button** | Button (Primary CTA) | **Display Rules:** <br> - Centered below description. People icon + text: `"Register as a Vendor"`. <br><br> **Behaviors:** <br> - On click: navigates to the registration wizard Step 1 (→ UC-VOB-001). <br> - For a vendor who just registered, this is informational — their account is already in Pending state. |
| 5 | **Feature Cards** | Info Cards (×3) | **Display Rules:** <br> - Three cards in a horizontal row: <br>   — "Easy Registration" — "Simple 3-step process to get your store set up and running." <br>   — "Quick Verification" — "Upload KYC documents for fast admin review and approval." <br>   — "Manage Your Store" — "Full dashboard to manage products, orders, and earnings." <br><br> **Behaviors:** <br> - Static; informational only. |

---

## 3. Validation Summary

### 3a. Email OTP Verification (Modal)

| Check | Rule | Error Messages |
|---|---|---|
| All 6 digits entered | Client-side | "Please enter the complete 6-digit code" |
| OTP code matches server-issued code | Server-side | "Invalid verification code. Please try again." |
| OTP code not expired | Server-side TTL | "Verification code has expired. Please request a new code." |

### 3b. Backend Full Validation (Post-OTP, Single Round-Trip) [RULE-071]

These are **server-side-only checks** that cannot be fully validated on the frontend. Frontend validation on each "Next" step prevents most field-level errors, so these are edge-case/race-condition guards.

| Check | Rule | Error Message | When This Can Occur |
|---|---|---|---|
| Email uniqueness | [COMMON-029] | "Email Address already exists" | Another user registered the same email between Step 1 and final submission |
| Store Name uniqueness | [COMMON-029] | "Store Name already exists" | Another user took the same store name concurrently |
| Agreement version is current | [RULE-002, RULE-012] | Toast: "The vendor agreement has been updated…" | Admin published a new version while vendor was mid-registration |
| Uploaded documents still in session | Session integrity | Toast: "Something went wrong. Please try again later." | Session partially expired or corrupted |

### 3c. Session Timeout

| Check | Rule | Error Message |
|---|---|---|
| Session active (within inactivity window) | [RULE-070] | Warning: "Your session will expire in 5 minutes"; on expiry: "Your session has expired. Please restart the registration." |

> **Design Note — Why No Step 1/2/3 Field Validation at Final Submission:**
> The frontend validates all required fields, format rules, file formats, and file sizes inline when the vendor clicks "Proceed to Next Step" on each step (UC-VOB-001, UC-VOB-002, UC-VOB-003). It is not possible for a vendor to reach the "Submit Registration" button with invalid Step 1/2/3 data through normal UI interaction. The backend validation at final submission is therefore scoped to **server-side-only concerns** (uniqueness race conditions, agreement version freshness, session integrity) rather than re-validating field-level rules already enforced by the frontend.

---

## 4. Cross-References

| Reference | Type | Notes |
|---|---|---|
| → UC-VOB-001 | Upstream (Step 1) | Basic Details filled and frontend-validated via "Proceed to Next Step". SC-04a shows the inline error pattern reused when server-side duplicate detection redirects back to Step 1. |
| → UC-VOB-002 | Upstream (Step 2) | Documents uploaded and frontend-validated via "Proceed to Next Step". |
| → UC-VOB-003 | Upstream (Step 3) | Agreement accepted, checkbox checked. "Submit Registration" triggers this use case. |
| → UC-VOB-006 | Downstream | On success, Admin is notified to review vendor KYC details. |
| → UC-VOB-012 | Related | Agreement version management. Stale version detected at backend validation; forces re-acceptance with re-scroll [RULE-068]. |
| [BR-023] | Business Requirement | Vendor must submit registration form with personal or business details (§3.1). |
| [RULE-002] | Business Rule | Vendor must accept the latest vendor agreement before registration is complete. |
| [RULE-003] | Business Rule | Document upload format must be PDF. Enforced at Step 2 frontend. |
| [RULE-012] | Business Rule | Vendors with outdated agreements restricted from product listing. |
| [RULE-053] | Business Rule | Vendor document upload size limit 5 MB per document. Enforced at Step 2 frontend. |
| [RULE-068] | Business Rule | Checkbox disabled until vendor scrolls to bottom of agreement. |
| [RULE-070] | Business Rule | Wizard session timeout after 30–60 minutes of inactivity. |
| [RULE-071] | Business Rule | Frontend validates step-by-step; backend validates server-side-only concerns in a single aggregated response. |
| [COMMON-004] | Common Rule | Numeric-only input for OTP digit fields. |
| [COMMON-011] | Common Rule | Cancel button dismisses modal without destructive action. |
| [COMMON-012] | Common Rule | Loading spinner for async ops > 300ms. |
| [COMMON-013] | Common Rule | Toast notifications auto-dismiss after 5 seconds. |
| [COMMON-015] | Common Rule | Submit button disabled after first click. |
| [COMMON-017] | Common Rule | Success operations display a success toast. |
| [COMMON-025] | Common Rule | Required field error: "{Field Name} is required". |
| [COMMON-026] | Common Rule | Invalid format error: "Please enter a valid {field type}". |
| [COMMON-029] | Common Rule | Unique constraint error: "{Field Name} already exists". |
| [COMMON-030] | Common Rule | Server error fallback message. |
| [COMMON-032] | Common Rule | Inline errors shown below each field. |
| [COMMON-051] | Common Rule | Error messages associated with fields via aria-describedby. |

---

## 5. Open Questions

| # | Question | Status |
|---|---|---|
| OQ-1 | Should the system perform all validations (Steps 1–3) in a single server round-trip, or validate sequentially and stop at first failure? | Resolved: Frontend validates step-by-step on each "Next" click. Backend only validates server-side concerns (uniqueness, agreement version) in one response [RULE-071]. Full Step 1/2/3 field re-validation at submission is unnecessary — the wizard prevents reaching submission with invalid data. — `Vendor Onboarding QA Answers.csv` [QA-031] |
| OQ-2 | After successful submission, should the vendor be redirected to the "Become a Vendor" landing page or a dedicated confirmation page with KYC review timeline? | Resolved: Vendor redirected to the **"Become a Vendor" landing page** with success toast (confirmed by updated design, SC-04e). — `Vendor Onboarding QA Answers.csv` [QA-032] |
| OQ-3 | Should the success page display a summary of the submitted registration or remain generic? | Resolved: No summary — the landing page remains generic (no registration details displayed). — `Vendor Onboarding QA Answers.csv` [QA-033] |
| OQ-4 | Is there a maximum time window for wizard completion or can session/draft persist indefinitely? | Resolved: Session timeout after 30–60 min inactivity [RULE-070]. — `Vendor Onboarding QA Answers.csv` [QA-034] |

---

## Changelog

| Date | Source | Changes | QA Resolved |
|------|--------|---------|-------------|
| 2026-04-13 | `Vendor Onboarding QA Answers.csv` | Initial creation. Resolved OQ-1..4 from stakeholder feedback. | QA-031, QA-032, QA-033, QA-034 |
| 2026-04-13 | Design review + stakeholder feedback | **Major revision:** (1) Added Email OTP Verification modal flow as the primary gate between "Submit Registration" and backend submission — new screens SC-04b (initial), SC-04c (error), SC-04d (resend enabled) documented. (2) Removed unreachable alternative flows (Step 1/2/3 field-level validation failures at final submission) — frontend validates on each "Next" click, so field-level errors cannot reach the submit stage. (3) Backend validation scoped to server-side-only concerns: uniqueness race conditions, stale agreement version, session integrity. (4) SC-04e confirmed as "Become a Vendor" landing page (not a dedicated confirmation page) per updated design. (5) Updated Basic Flow, all Alternative Flows, Validation Summary, Cross-References. | — |
