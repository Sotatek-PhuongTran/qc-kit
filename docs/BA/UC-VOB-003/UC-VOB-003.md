# UC-VOB-003: Accept Vendor Agreement

> Source: [usecase-list.md](../../usecase-list.md), [common-rules.md](../../common-rules.md), [requirement-traceability.md](../../requirement-traceability.md), [wireframes-vendor-onboarding.md](../../wireframes-vendor-onboarding.md)
> Screen Asset: `docs/ba/spec/UC-VOB-003/image.png`

---

## 1. Use Case Description

| Field | Description |
|---|---|
| **ID** | UC-VOB-003 |
| **Use Case** | Accept Vendor Agreement |
| **Description** | As a prospective vendor, I want to read and accept the latest published vendor agreement, so that my acceptance is recorded with a timestamp and version number before I submit my registration. |
| **Pre-conditions** | - Registration form (Step 1 — Basic Details) has been successfully submitted (→ UC-VOB-001). <br> - Verification documents (Step 2 — Upload Documents) have been successfully uploaded (→ UC-VOB-002). |
| **Trigger** | Vendor proceeds to the Agreement step (Step 3 of 3) from the registration wizard after completing Step 2. |
| **Post-conditions** | - Vendor has checked the acceptance checkbox and clicked "Submit Registration". <br> - OTP modal is triggered (→ UC-VOB-004 handles OTP verification, agreement recording, backend validation, record creation, and redirect). |
| **Basic Flow** | 1. Wizard displays Step 3 "Agreement" as the active step; Steps 1 and 2 show green checkmarks (completed). <br> 2. System retrieves and displays the latest published vendor agreement version (e.g., "Vendor Agreement (v1.2)"). <br> 3. Agreement text is rendered inside a scrollable read-only container with **rich formatting (HTML/Markdown)** — headings, bold text, and bullet points are rendered [RULE-069]. <br> 4. The acceptance checkbox is initially **disabled** [RULE-068]. <br> 5. Vendor scrolls through the full agreement content to the bottom. <br> 6. Once the vendor reaches the bottom of the agreement container, the checkbox is **enabled** [RULE-068]. <br> 7. Vendor checks the mandatory checkbox: **"I have read and accept the Vendor Agreement"** [RULE-002]. <br> 8. Vendor clicks **"Submit Registration"**. <br> 9. System validates that the acceptance checkbox is checked. <br> 10. System opens the **Email Verification modal** (→ UC-VOB-004 handles OTP sending, verification, agreement recording, backend validation, record creation, and redirect). |
| **Alternative Flow** | **[Checkbox Not Yet Enabled — Vendor Has Not Scrolled]** <br> 1. The acceptance checkbox remains disabled until the vendor scrolls to the bottom of the agreement [RULE-068]. <br> 2. A helper hint is displayed: `"Please scroll to the bottom of the agreement to enable acceptance."` <br> 3. Once the vendor reaches the bottom, the checkbox is enabled and the vendor may check it. <br><br> **[Checkbox Not Checked]** <br> 1. Vendor clicks "Submit Registration" without checking the acceptance checkbox. <br> 2. System displays inline error below the checkbox: `"Vendor Agreement acceptance is required"` [COMMON-025, COMMON-032]. <br> 3. Button remains enabled; vendor must check the checkbox before retrying. <br><br> **[Navigate Back to Step 2]** <br> 1. Vendor clicks the "< Back" button. <br> 2. Wizard navigates back to Step 2 (→ UC-VOB-002); previously uploaded documents are retained. <br> 3. Checkbox state in Step 3 is preserved in session when the vendor returns. <br><br> **[OTP Verification or Backend Validation Failure]** <br> 1. After "Submit Registration", control passes to UC-VOB-004 (Email OTP modal → backend validation). <br> 2. If OTP fails, vendor retries within the modal or cancels to return to Step 3 (→ UC-VOB-004 alt flows). <br> 3. If backend detects duplicate email/store name, vendor is redirected back to Step 1 with inline error. <br> 4. If backend detects stale agreement version, Step 3 reloads with updated agreement; checkbox cleared and disabled until vendor re-scrolls [RULE-068]. <br><br> **[Agreement Version Updated Mid-Session]** <br> 1. Admin publishes a new agreement version (→ UC-VOB-012) while the vendor is on Step 3. <br> 2. On backend validation (inside UC-VOB-004), system detects the accepted version is outdated. <br> 3. OTP modal closes. System **blocks submission** with error toast: `"The vendor agreement has been updated. Please review and accept the latest version."` [COMMON-013]. <br> 4. System automatically reloads Step 3 with the new agreement version and clears the checkbox (vendor must re-scroll to re-enable it) [RULE-068]. <br> 5. Vendor must re-read and accept the updated agreement before submitting. |
| **Business Rules** | **[BR-025]:** Vendor must accept the latest vendor agreement before registration is complete (§3.1). <br><br> **[RULE-002]:** Vendor must accept the latest vendor agreement before registration is complete. Acceptance is enforced at Step 3 via the mandatory checkbox. <br><br> **[RULE-012]:** Vendors with outdated agreements are restricted from product listing. If the agreement version accepted at registration becomes outdated post-approval, the vendor must re-accept the current version before listing products (→ UC-VOB-012). <br><br> **[RULE-068]:** The vendor agreement acceptance checkbox must remain disabled until the vendor has scrolled to the bottom of the agreement container. <br><br> **[RULE-069]:** Vendor agreement text area must support rich formatting (HTML/Markdown) — headings, bold text, and bullet points. |

---

## 2. Screen Description

### Screen SC-03: Vendor Agreement & Acceptance (Step 3 of 3)

> Screen asset: `docs/ba/spec/UC-VOB-003/image.png`

#### Layout Overview

The screen retains the same single-column centered layout as Steps 1 and 2. The header bar shows "MultiVendor Platform" logo on the left with **Help** and **Login** links in the top-right. The page title "Register as a Vendor" is displayed prominently. The **3-step progress wizard** shows Step 1 "Basic Details" and Step 2 "Upload Documents" with green checkmarks (completed), and Step 3 "Agreement" as active (filled dark circle with number "3"). Below the wizard, the section title **"Vendor Agreement (v1.2)"** is displayed, followed by a scrollable container containing the agreement text in **rich formatting (HTML/Markdown rendered)**. Beneath the text area, a mandatory acceptance checkbox is presented (initially disabled). The bottom of the form features a "< Back" button (left) and a "Submit Registration" button (right).

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Step Progress Indicator** | Wizard / Stepper | **Display Rules:** <br> - Always visible at top of registration flow. <br> - Step 1 "Basic Details" shows a green checkmark indicating completion. <br> - Step 2 "Upload Documents" shows a green checkmark indicating completion. <br> - Step 3 "Agreement" highlighted with solid dark circle containing "3" (active). <br><br> **Behaviors:** <br> - Steps 1 and 2 are NOT clickable to navigate back (use "Back" button instead). <br> - Steps reflect completion state only; navigation is controlled exclusively via "Back" / "Submit Registration" buttons. |
| 2 | **Agreement Version Title** | Static Text / Heading | **Display Rules:** <br> - Always visible below the stepper. <br> - Displays the currently published agreement version: `"Vendor Agreement (v1.2)"`. <br> - Version number is dynamically populated from the latest published agreement (→ UC-VOB-012). <br><br> **Behaviors:** <br> - Static; no interaction. <br> - If Admin publishes a new version (→ UC-VOB-012), the title updates to reflect the latest version upon page reload or mid-session detection. |
| 3 | **Agreement Text Container** | Read-Only Scrollable Rich-Text Container | **Display Rules:** <br> - Always visible below the version title. <br> - Rendered as a bordered, scrollable container with a light grey background. <br> - Contains the full vendor agreement text rendered as **rich HTML/Markdown** — headings, bold text, bullet points, and numbered sections are all rendered [RULE-069]. <br> - Container has a fixed max-height; content overflows vertically with scroll. <br> - If the agreement content fits entirely within the container (no scrollbar is rendered), the acceptance checkbox (#4) is enabled immediately on page load, as the vendor can see all content without scrolling. <br><br> **Behaviors:** <br> - Read-only; vendor cannot edit the text. <br> - Vendor scrolls through the agreement content using mouse wheel, trackpad, or scrollbar. <br> - The agreement container must be keyboard-focusable and scrollable via keyboard navigation (Tab to focus + Arrow keys to scroll). Keyboard scroll reaching the bottom triggers the same checkbox enablement as mouse/trackpad scroll [COMMON-047]. <br> - Text is selectable for copy but not editable. <br> - The agreement content is fetched from the server based on the latest published version [RULE-002, RULE-012]. <br> - The system tracks the scroll position to detect when the vendor reaches the bottom (enables the acceptance checkbox per [RULE-068]). <br> - If agreement content fails to load, display a fallback message: `"Unable to load the agreement. Please try again later."` [COMMON-030] with the "Submit Registration" button disabled. |
| 4 | **"I have read and accept the Vendor Agreement" Checkbox** | Checkbox (required, initially disabled) | **Display Rules:** <br> - Always visible below the agreement text container. <br> - Label: `"I have read and accept the Vendor Agreement"`. <br> - Marked with red asterisk `*` to indicate mandatory [COMMON-003]. <br> - **Default state: disabled** (greyed out, not interactable) until vendor scrolls to the bottom of the agreement [RULE-068]. Exception: if agreement content fits entirely (no scrollbar), checkbox is enabled immediately on page load. <br><br> **Behaviors:** <br> - Becomes enabled once vendor scrolls to the bottom of the agreement container [RULE-068]. <br> - A helper hint is displayed while disabled: `"Please scroll to the bottom of the agreement to accept."` <br> - On check (when enabled): registers vendor's intent to accept the agreement [RULE-002]. <br> - On uncheck: clears the acceptance intent; "Submit Registration" will trigger a validation error. <br> - On "Submit Registration" with unchecked state: inline error displayed below the checkbox: `"Vendor Agreement acceptance is required"` [COMMON-025, COMMON-032]. <br> - The checkbox state (checked/unchecked) is preserved in session when navigating back to Step 2 and returning. <br> - Field associated with label via `aria-labelledby` [COMMON-048]. <br> - Error message associated with field via `aria-describedby` [COMMON-051]. |
| 5 | **"< Back" Button** | Button (Secondary) | **Display Rules:** <br> - Always visible; left-aligned at the bottom of the form. <br> - Labelled: `< Back`. <br> - Styled as a secondary outlined button (light background, dark text). <br><br> **Behaviors:** <br> - On click: navigates wizard back to Step 2 (→ UC-VOB-002). <br> - Step 2 uploaded documents are retained (pre-filled). <br> - Step 3 checkbox state is preserved in session for when the vendor returns. <br> - No confirmation dialog required (no destructive action) [COMMON-011]. |
| 6 | **"Submit Registration" Button** | Button (Primary CTA) | **Display Rules:** <br> - Always visible; right-aligned at the bottom of the form. <br> - Labelled: `Submit Registration`. <br> - Styled as a primary solid button (dark background, white text). <br><br> **Behaviors:** <br> - On click: validates that the acceptance checkbox (#4) is checked. <br> - If checkbox is NOT checked: <br>   • Inline error displayed below checkbox: `"Vendor Agreement acceptance is required"` [COMMON-025, COMMON-032]. <br>   • Button remains enabled for retry. <br> - If checkbox IS checked: <br>   • Button disabled after first click to prevent double submission [COMMON-015]. <br>   • If async submission exceeds 300ms, a loading spinner is displayed [COMMON-012]. <br>   • System records: agreement version ID, acceptance timestamp (UTC), vendor draft ID. <br>   • System triggers full registration validation (→ UC-VOB-004). <br>   • On success: vendor redirected to the **"Become a Vendor" landing page** with success toast `"Registration submitted successfully"` [COMMON-017]. <br>   • On failure: error toast with appropriate message [COMMON-013]; button re-enabled for retry. |
| 7 | **Help Link** | Navigation Link | **Display Rules:** <br> - Always visible in top-right header. <br><br> **Behaviors:** <br> - Navigates to platform help/support page in a new tab. |
| 8 | **Login Link** | Navigation Link | **Display Rules:** <br> - Always visible in top-right header. <br><br> **Behaviors:** <br> - Navigates to the vendor login page. Prompts vendor who already has an account to log in instead of registering again. |

---

## 3. Validation Summary

| Field | Required | Validation Rule | Error Message |
|---|---|---|---|
| Scroll-to-bottom | System check | Checkbox remains disabled until bottom of agreement is reached [RULE-068] | Checkbox disabled; hint: "Please scroll to the bottom of the agreement to accept." |
| Agreement Acceptance Checkbox | Yes (when enabled) | Must be checked before submission [RULE-002] | "Vendor Agreement acceptance is required" [COMMON-025] |
| Agreement Version | N/A (system) | Must be the latest published version; stale version blocks submission and forces re-acceptance [RULE-012, QA-028] | Error toast + agreement reloaded with latest version; checkbox cleared and disabled until re-scrolled |

---

## 4. Cross-References

| Reference | Type | Notes |
|---|---|---|
| → UC-VOB-001 | Previous Step (Step 1) | Basic Details submitted in Step 1; data retained across wizard navigation. |
| → UC-VOB-002 | Previous Step (Step 2) | Documents uploaded in Step 2; "Back" button returns to Step 2 with uploads retained. |
| → UC-VOB-004 | Downstream | "Submit Registration" triggers full registration validation: all Step 1 fields, Step 2 documents, and Step 3 agreement acceptance are validated. On success, vendor record created in `Pending` state. |
| → UC-VOB-006 | Downstream | After successful submission, Admin is notified and can view the vendor detail for KYC review. |
| → UC-VOB-012 | Related | Admin manages vendor agreement versions. If updated mid-session, submission is blocked and vendor must re-accept. Post-approval outdated agreement restricts product listing [RULE-012]. |
| [BR-025] | Business Requirement | Vendor must accept latest vendor agreement before registration (§3.1). |
| [RULE-002] | Business Rule | Vendor must accept the latest vendor agreement before registration is complete. |
| [RULE-012] | Business Rule | Vendors with outdated agreements are restricted from product listing. |
| [RULE-068] | Business Rule | Checkbox disabled until vendor scrolls to bottom of agreement container. |
| [RULE-069] | Business Rule | Agreement text supports rich formatting (HTML/Markdown). |
| [COMMON-003] | Common Rule | Required fields marked with asterisk (*). |
| [COMMON-011] | Common Rule | Modal/dialog dismiss rules; no confirmation needed for "Back" navigation. |
| [COMMON-012] | Common Rule | Loading spinner for async ops > 300ms. |
| [COMMON-013] | Common Rule | Toast notifications auto-dismiss after 5 seconds. |
| [COMMON-015] | Common Rule | Submit button disabled after first click to prevent double submission. |
| [COMMON-017] | Common Rule | Success operations display a success toast. |
| [COMMON-025] | Common Rule | Required field error: "{Field Name} is required". |
| [COMMON-030] | Common Rule | Server error fallback message. |
| [COMMON-032] | Common Rule | Inline errors shown below each field. |
| [COMMON-042] | Common Rule | Session timeout after 30 minutes of inactivity; 5-minute warning before expiry. On timeout, vendor is redirected to the landing page and all registration data is lost. |
| [COMMON-047] | Common Rule | All interactive elements must be keyboard-navigable. |
| [COMMON-048] | Common Rule | Form fields must have associated labels (aria-label). |
| [COMMON-051] | Common Rule | Error messages associated with fields via aria-describedby. |

---

## 5. Open Questions

| # | Question | Status |
|---|---|---|
| OQ-1 | Should the vendor be required to scroll to the bottom of the agreement text area before the acceptance checkbox becomes enabled? | Resolved: Yes — the acceptance checkbox must remain disabled until the vendor scrolls to the bottom of the agreement container [RULE-068]. Exception: if the agreement content fits entirely (no scrollbar), the checkbox is immediately enabled. — `Vendor Onboarding QA Answers.csv` [QA-027] / BA/PO |
| OQ-2 | If Admin publishes a new agreement version while the vendor is mid-registration (Step 3), should the system block submission immediately or allow submission with the version that was displayed? | Resolved: System blocks submission with an error, automatically loads the latest agreement, and requires re-acceptance. Checkbox is cleared and re-disabled until vendor re-scrolls [RULE-068]. — `Vendor Onboarding QA Answers.csv` [QA-028] |
| OQ-3 | After successful registration submission, where is the vendor redirected? (Thank You page vs Login vs Dashboard) | Resolved: Vendor is redirected to the **"Become a Vendor" landing page** with a success toast message upon successful submission in UC-VOB-004. — `Vendor Onboarding QA Answers.csv` [QA-029] |
| OQ-4 | Does the agreement text area support rich formatting (bold, italic, headings) or is it strictly plain text? | Resolved: Supports rich formatting (HTML/Markdown) — headings, bold text, bullet points are rendered [RULE-069]. — `Vendor Onboarding QA Answers.csv` [QA-030] |
| OQ-5 | What is the exact session timeout behavior for Step 3? | Resolved: Session timeout is 30 minutes with a 5-minute warning. On timeout, the vendor is redirected to the landing page and all registration data is lost [COMMON-042]. |
| OQ-6 | Are the 13 Acceptance Criteria formally approved? | Resolved: Yes, the BA/PO has formally approved the 13 Acceptance Criteria for this use case. |

---

## Changelog

| Date | Source | Changes | QA Resolved |
|------|--------|---------|-------------|
| 2026-04-13 | `Vendor Onboarding QA Answers.csv` | Resolved OQ-1: scroll-to-unlock behavior added (RULE-068). Resolved OQ-2: mid-session agreement blocks + forces re-acceptance. Resolved OQ-3: post-submission redirect is Landing Page with toast. Resolved OQ-4: rich text agreement (RULE-069). | QA-027, QA-028, QA-029, QA-030 |
| 2026-04-13 | Design review | Updated Basic Flow steps 10-12: "Submit Registration" now opens Email OTP modal (→ UC-VOB-004) as intermediary before backend validation. Updated alt flow "Submission Validation Failure" → renamed "OTP Verification or Backend Validation Failure" to reflect OTP modal as entry point. Removed reference to "missing mandatory document" (caught at Step 2 frontend). | — |
| 2026-04-14 | dev-question-resolver / BA/PO | Clarified that agreement acceptance and state transition to `Pending` belong to UC-VOB-004; trimmed Basic Flow and Post-conditions accordingly. Added short-agreement no-scroll behavior. Added keyboard scroll. Clarified helper hint as mandatory. Added session timeout redirection with complete data loss (COMMON-042). Logged explicit AC approval. | Q1, Q2, Q3, Q4, Q5, Q6, Q7 |
