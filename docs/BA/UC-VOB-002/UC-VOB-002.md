# UC-VOB-002: Upload Verification Documents

> Source: [usecase-list.md](../../usecase-list.md), [common-rules.md](../../common-rules.md), [requirement-traceability.md](../../requirement-traceability.md), [wireframes-vendor-onboarding.md](../../wireframes-vendor-onboarding.md)
> Screen Assets: `docs/ba/spec/UC-VOB-002/individual.png`, `docs/ba/spec/UC-VOB-002/business.png`, `docs/ba/spec/UC-VOB-002/file-uploaded.png`

---

## 1. Use Case Description

| Field | Description |
|---|---|
| **ID** | UC-VOB-002 |
| **Use Case** | Upload Verification Documents |
| **Description** | As a prospective vendor (Individual or Business), I want to upload my mandatory KYC verification documents, so that the platform can verify my identity and eligibility for onboarding. |
| **Pre-conditions** | - Registration form (Step 1 — Basic Details) has been successfully submitted (→ UC-VOB-001). <br> - Vendor Type (Individual or Business) has been selected in Step 1, determining the required document set. |
| **Trigger** | Vendor proceeds to document upload step (Step 2 of 3) from the registration wizard after completing Step 1. |
| **Post-conditions** | - All mandatory KYC documents are attached to the vendor's draft profile. <br> - System validation of file format (PDF) and file size (≤5MB) passes for each uploaded document. <br> - Wizard advances to Step 3 (Agreement → UC-VOB-003). |
| **Basic Flow** | 1. Wizard displays Step 2 "Upload Documents" as the active step; Step 1 shows a green checkmark (completed). <br> 2. System renders the document upload fields based on the Vendor Type selected in Step 1: <br>   — **Individual:** NIC / Passport *, Bank Proof * <br>   — **Business:** BR Certificate *, Form 1/20 *, TIN / VAT *, Director NIC *, Bank Proof * <br> 3. An optional **Store Logo** upload field is displayed for both vendor types. <br> 4. Vendor clicks on an upload area or **drags and drops** a file onto the upload zone; browser file dialog (when clicking) opens constrained to `.pdf` files [COMMON-040]. <br> 5. Vendor selects a PDF file (≤5MB). <br> 6. System validates and stores the file in browser session state; replaces the upload area with a file card showing: document icon, filename, file size, and a remove (×) button [COMMON-038]. All uploads are frontend-only and held in browser session during the wizard flow (not persisted to server until final submission in UC-VOB-004). <br> 7. If file size is **strictly greater than 1MB** (> 1MB), a progress indicator is displayed during upload [COMMON-037]. Files exactly 1MB do not trigger the progress indicator. <br> 8. Vendor repeats steps 4–7 for each required document. <br> 9. Vendor clicks **"Proceed to Next Step"**. <br> 10. System validates that all mandatory document slots are filled. <br> 11. If validation passes, wizard advances to Step 3 (→ UC-VOB-003). |
| **Alternative Flow** | **[Invalid File Format]** <br> 1. Vendor attempts to upload a non-PDF file (e.g., JPEG, DOCX) for a KYC document slot. <br> 2. Browser file dialog restricts selection to PDF via `accept=".pdf"` [COMMON-040]. <br> 3. If validation is bypassed (e.g., drag-and-drop with wrong format), system rejects the file and displays inline error: `"Only PDF format is accepted"` below the upload field [COMMON-032]. <br><br> **[File Size Exceeds 5MB]** <br> 1. Vendor selects a file larger than 5MB. <br> 2. System rejects the file and displays inline error: `"File size must not exceed 5MB"` below the upload field [COMMON-032, RULE-053]. <br> 3. Upload area remains in empty state; vendor must select a smaller file. <br><br> **[Missing Mandatory Document]** <br> 1. Vendor clicks "Proceed to Next Step" without uploading all mandatory documents. <br> 2. System displays inline error: `"{Document Name} is required"` below each missing upload field [COMMON-025, COMMON-032]. <br> 3. Wizard does not advance; vendor must upload the missing documents. <br><br> **[Remove Uploaded File]** <br> 1. Vendor clicks the × (remove) button on an uploaded file card. <br> 2. System removes the file from browser session and reverts the upload area to its empty state. <br> 3. Vendor may upload a replacement file. <br><br> **[Upload Slot Already Filled — Replace Attempt]** <br> 1. Vendor attempts to upload or drag-and-drop a new file onto an upload slot that already has a file card. <br> 2. The file card replaces the drop zone entirely; no upload interaction is available on a filled slot. <br> 3. The new file is ignored; vendor must first click the × (remove) button to revert to empty state, then upload the replacement file. <br><br> **[Navigate Back to Step 1]** <br> 1. Vendor clicks the "< Back" button. <br> 2. Wizard navigates back to Step 1 (→ UC-VOB-001); previously entered Step 1 data is retained. <br> 3. Uploaded documents in Step 2 are preserved in browser session for when the vendor returns. <br><br> **[Session Timeout]** <br> 1. Wizard session is inactive for 30 minutes [RULE-070]. <br> 2. System notifies vendor before session expiry. <br> 3. After session expires, all uploaded files in browser session are lost (uploads are frontend-only; not persisted to server during wizard flow). <br> 4. Vendor must restart the wizard and re-upload all documents. <br><br> **[Re-verification Flow — returning vendor]** <br> 1. Admin has requested re-verification (→ UC-VOB-009); vendor returns to this step. <br> 2. System displays previously uploaded, currently active documents in the uploaded state (file card with filename, size, × button). <br> 3. Vendor may replace/update individual documents as needed; documents not explicitly rejected remain visible and do not need to be re-uploaded unless replaced — QA-026 resolved. |
| **Business Rules** | **[BR-024]:** Vendor must upload mandatory verification documents based on vendor type (§3.1, §3.2). <br><br> **[RULE-003]:** Document upload format must be PDF; format and size validated by system. <br><br> **[RULE-053]:** Vendor verification document upload size limit is 5MB per document. |

---

## 2. Screen Description

### Screen SC-02A: Upload Documents — Individual Vendor (Step 2 of 3)

> Screen asset: `docs/ba/spec/UC-VOB-002/individual.png`

#### Layout Overview

The screen retains the same single-column centered layout as Step 1. The header bar shows "MultiVendor Platform" logo on the left with **Help** and **Login** links in the top-right. The page title "Register as a Vendor" is displayed prominently. The **3-step progress wizard** shows Step 1 with a green checkmark (completed), Step 2 "Upload Documents" as active (filled black circle), and Step 3 "Agreement" greyed out. Below the wizard, a helper text reads: *"Please upload your KYC Documents. Only PDF format is accepted. Max size per file: 5MB."* The form body displays upload areas for the Individual vendor type, followed by navigation buttons.

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Step Progress Indicator** | Wizard / Stepper | **Display Rules:** <br> - Always visible at top of registration flow. <br> - Step 1 "Basic Details" shows a green checkmark indicating completion. <br> - Step 2 "Upload Documents" highlighted with solid black circle (active). <br> - Step 3 "Agreement" rendered in disabled/grey state. <br><br> **Behaviors:** <br> - Step 1 is NOT clickable to navigate back (use "Back" button instead). <br> - Step 3 is NOT clickable until Step 2 is successfully validated. |
| 2 | **KYC Instructions Text** | Static Text / Helper | **Display Rules:** <br> - Always visible below the stepper. <br> - Text: `"Please upload your KYC Documents. Only PDF format is accepted. Max size per file: 5MB."` <br><br> **Behaviors:** <br> - Static; no interaction. Communicates format [RULE-003] and size [RULE-053] constraints upfront. |
| 3 | **NIC / Passport Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `NIC / Passport`. <br> - Displayed only when Vendor Type = `Individual` (determined by UC-VOB-001). <br> - Two-column layout: left column, first row. <br> - Empty state: dashed border box with upload icon (↑) and text `"Upload PDF"`. <br><br> **Behaviors:** <br> - On click: opens browser file dialog constrained to `.pdf` [COMMON-040]. <br> - **Drag-and-drop is supported** as an alternative to click-to-browse [QA-025 resolved]. <br> - Accepts single file per upload slot; max 1 file [BR-024]. <br> - File format validation: PDF only [RULE-003, COMMON-035]. Non-PDF rejected with inline error: `"Only PDF format is accepted"` [COMMON-032]. <br> - File size validation: ≤5MB [RULE-053, COMMON-033]. Oversized file rejected with inline error: `"File size must not exceed 5MB"` [COMMON-032]. <br> - On successful upload: upload area transforms to file card showing document icon, filename, file size (e.g., `167.6 KB`), and × (remove) button [COMMON-038]. <br> - Upload progress indicator shown for files exceeding 1MB [COMMON-037]. <br> - Field associated with label via `aria-labelledby` [COMMON-048]. |
| 4 | **Bank Proof Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `Bank Proof`. <br> - Displayed for both `Individual` and `Business` vendor types. <br> - Two-column layout: right column, first row. <br> - Empty state: dashed border box with upload icon (↑) and text `"Upload PDF"`. <br><br> **Behaviors:** <br> - Same file format/size validation, click-to-browse, and drag-and-drop upload behavior as NIC / Passport (element #3). <br> - On successful upload: shows file card with filename, size, and × button [COMMON-038]. <br> - Field associated with label via `aria-labelledby` [COMMON-048]. |
| 5 | **Store Logo Upload** | File Upload (drop zone) | **Display Rules:** <br> - Optional field; label reads `Store Logo (Optional)` — no asterisk. <br> - Displayed for both `Individual` and `Business` vendor types. <br> - Full-width field spanning both columns. <br> - Empty state: dashed border box with upload icon (↑) and text **`"Upload Image"`** (not "Upload PDF") — QA-024 resolved. <br><br> **Behaviors:** <br> - On click: opens browser file dialog constrained to image MIME types (`.jpg`, `.jpeg`, `.png`, `.svg`, `.webp`) [COMMON-034, QA-024 resolved]. <br> - **Drag-and-drop is supported** for image files [QA-025 resolved]. <br> - Accepts image formats: JPEG, PNG, SVG, WebP [COMMON-034]. Max 5MB [COMMON-033]. <br> - On successful upload: shows thumbnail preview [COMMON-036] with filename, size, and × button [COMMON-038]. <br> - On invalid format: `"Only image formats (JPEG, PNG, SVG, WebP) are accepted"` [COMMON-032]. <br> - On oversized file: `"File size must not exceed 5MB"` [COMMON-032]. <br> - Not validated as required on "Proceed to Next Step". |
| 6 | **"< Back" Button** | Button (Secondary) | **Display Rules:** <br> - Always visible; left-aligned at the bottom of the form. <br> - Labelled: `< Back`. <br><br> **Behaviors:** <br> - On click: navigates wizard back to Step 1 (→ UC-VOB-001). <br> - Step 1 form data is retained (pre-filled). <br> - Uploaded documents in Step 2 are preserved in session. |
| 7 | **"Proceed to Next Step" Button** | Button (Primary CTA) | **Display Rules:** <br> - Always visible; right-aligned at the bottom of the form. <br> - Labelled: `Proceed to Next Step >`. <br><br> **Behaviors:** <br> - On click: validates that all mandatory document upload slots are filled. <br> - If validation passes: <br>   • Saves uploaded documents to session/draft. <br>   • Navigates wizard to Step 3 (Agreement → UC-VOB-003). <br> - If validation fails: <br>   • Inline error messages appear below each missing mandatory upload field: `"{Document Name} is required"` [COMMON-025, COMMON-032]. <br>   • Button remains enabled for retry. <br> - Button disabled after first successful click to prevent double submission [COMMON-015]. <br> - If async upload/validation exceeds 300ms, a loading spinner is displayed [COMMON-012]. |

---

### Screen SC-02B: Upload Documents — Business Vendor (Step 2 of 3)

> Screen asset: `docs/ba/spec/UC-VOB-002/business.png`

#### Layout Overview

Identical layout to SC-02A but with an expanded set of mandatory upload fields for the Business vendor type. Five required KYC document upload areas are displayed in a two-column grid, followed by the optional Store Logo field.

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Step Progress Indicator** | Wizard / Stepper | Same as SC-02A element #1. |
| 2 | **KYC Instructions Text** | Static Text / Helper | Same as SC-02A element #2. |
| 3 | **BR Certificate Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `BR Certificate`. <br> - Displayed only when Vendor Type = `Business`. <br> - Two-column layout: left column, first row. <br><br> **Behaviors:** <br> - Same file format/size validation, click-to-browse, and drag-and-drop behavior as SC-02A element #3 (PDF only, ≤5MB) [RULE-003, RULE-053, COMMON-035, COMMON-033]. <br> - On successful upload: file card with filename, size, × button [COMMON-038]. <br> - Upload progress indicator for files >1MB [COMMON-037]. |
| 4 | **Form 1/20 Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `Form 1/20`. <br> - Displayed only when Vendor Type = `Business`. <br> - Two-column layout: right column, first row. <br><br> **Behaviors:** <br> - Same validation and upload behavior as element #3. |
| 5 | **TIN / VAT Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `TIN / VAT`. <br> - Displayed only when Vendor Type = `Business`. <br> - Two-column layout: left column, second row. <br><br> **Behaviors:** <br> - Same validation and upload behavior as element #3. |
| 6 | **Director NIC Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `Director NIC`. <br> - Displayed only when Vendor Type = `Business`. <br> - Two-column layout: right column, second row. <br><br> **Behaviors:** <br> - Same validation and upload behavior as element #3. |
| 7 | **Bank Proof Upload** | File Upload (drop zone) | **Display Rules:** <br> - Required field; marked with red asterisk `*` [COMMON-003]. <br> - Label: `Bank Proof`. <br> - Displayed for `Business` vendor type. <br> - Single-column layout: left column, third row. <br><br> **Behaviors:** <br> - Same validation and upload behavior as element #3. |
| 8 | **Store Logo Upload** | File Upload (drop zone) | Same as SC-02A element #5. Full-width, optional. Placeholder text: `"Upload Image"`. Drag-and-drop supported. File dialog constrained to image MIME types. |
| 9 | **"< Back" Button** | Button (Secondary) | Same as SC-02A element #6. |
| 10 | **"Proceed to Next Step" Button** | Button (Primary CTA) | Same as SC-02A element #7. Validates all 5 mandatory Business documents are uploaded before advancing. |

---

### Screen SC-02C: Upload Documents — File Uploaded State

> Screen asset: `docs/ba/spec/UC-VOB-002/file-uploaded.png`

#### Layout Overview

This state shows the Individual vendor view after documents have been successfully uploaded. Each upload area that previously displayed the empty drop zone now shows a **file card** with the uploaded file's details. This state applies identically to Business vendor uploads. In the re-verification flow, previously uploaded active documents are pre-populated in this state, allowing the vendor to replace/update selectively.

---

| # | Name | Type | Description & Behavior |
|---|---|---|---|
| 1 | **Uploaded File Card** | File Display Card | **Display Rules:** <br> - Replaces the empty upload drop zone after a successful upload (or on re-verification with existing documents pre-populated). <br> - Rendered with a solid rounded border (replacing the dashed empty-state border). <br> - Contains: <br>   • Document icon (PDF icon) on the left. <br>   • Filename displayed prominently (e.g., `921-60926003 PVG.pdf`). <br>   • File size displayed below filename in grey text (e.g., `167.6 KB`). <br>   • × (remove) button on the right side of the card. <br><br> **Behaviors:** <br> - Filename is truncated with CSS ellipsis if it exceeds the rendered card width; no hard character limit applies [COMMON-057]. A tooltip showing the full filename is displayed on hover. <br> - File size is formatted in human-readable units (B, KB, MB). <br> - The card is not clickable for preview (PDF documents have no inline preview) [COMMON-038]. <br> - The file card fully replaces the upload drop zone; no upload interaction (click-to-browse, drag-and-drop) is available on a filled slot. Vendor must use the × button to remove the file before uploading a new one. |
| 2 | **× (Remove) Button** | Icon Button | **Display Rules:** <br> - Displayed on the right side of each uploaded file card. <br><br> **Behaviors:** <br> - On click: removes the uploaded file from the browser session. <br> - Upload area reverts to the empty drop zone state (dashed border). <br> - No confirmation dialog for file removal. <br> - If the removed file was for a mandatory field, the required validation will trigger on "Proceed to Next Step". |

---

## 3. Validation Summary

### Individual Vendor — Required Documents

| Document | Required | Format | Max Size | Error Messages |
|---|---|---|---|---|
| NIC / Passport | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "NIC / Passport is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| Bank Proof | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "Bank Proof is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| Store Logo | No | JPEG, PNG, SVG, WebP [COMMON-034, QA-024] | 5MB [COMMON-033] | "Only image formats (JPEG, PNG, SVG, WebP) are accepted" / "File size must not exceed 5MB" |

### Business Vendor — Required Documents

| Document | Required | Format | Max Size | Error Messages |
|---|---|---|---|---|
| BR Certificate | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "BR Certificate is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| Form 1/20 | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "Form 1/20 is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| TIN / VAT | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "TIN / VAT is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| Director NIC | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "Director NIC is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| Bank Proof | Yes | PDF [RULE-003, COMMON-035] | 5MB [RULE-053, COMMON-033] | "Bank Proof is required" [COMMON-025] / "Only PDF format is accepted" / "File size must not exceed 5MB" |
| Store Logo | No | JPEG, PNG, SVG, WebP [COMMON-034, QA-024] | 5MB [COMMON-033] | "Only image formats (JPEG, PNG, SVG, WebP) are accepted" / "File size must not exceed 5MB" |

---

## 4. Cross-References

| Reference | Type | Notes |
|---|---|---|
| → UC-VOB-001 | Previous Step | Vendor Type selected in Step 1 determines which document set is displayed. "Back" button returns to Step 1 with data retained. |
| → UC-VOB-003 | Next Step | On successful Step 2 completion, wizard navigates to Agreement & Acceptance (Step 3). |
| → UC-VOB-004 | Downstream | Final submission validation (Step 3) re-validates all uploaded documents before creating the vendor record. |
| → UC-VOB-009 | Re-verification | Admin may request additional documents post-submission; vendor returns to this upload step with previously uploaded active documents pre-populated (QA-026 resolved). |
| [BR-024] | Business Requirement | Upload mandatory verification documents based on vendor type (§3.1, §3.2). |
| [RULE-003] | Business Rule | Document upload format must be PDF; format and size validated by system. |
| [RULE-053] | Business Rule | Vendor verification document upload size limit is 5MB per document. |
| [COMMON-003] | Common Rule | Required fields marked with asterisk (*). |
| [COMMON-012] | Common Rule | Loading spinner for async ops > 300ms. |
| [COMMON-015] | Common Rule | Submit button disabled after first click to prevent double submission. |
| [COMMON-025] | Common Rule | Required field error: "{Field Name} is required". |
| [COMMON-032] | Common Rule | Inline errors shown below each field. |
| [COMMON-033] | Common Rule | Maximum file size per upload: 5MB. |
| [COMMON-034] | Common Rule | Image formats accepted: JPEG, PNG, SVG, WebP (Store Logo). |
| [COMMON-035] | Common Rule | Document formats accepted: PDF (KYC documents). |
| [COMMON-036] | Common Rule | Image upload shows preview thumbnail (Store Logo). |
| [COMMON-037] | Common Rule | Upload progress indicator for files **strictly exceeding 1MB** (> 1MB); files exactly 1MB do not trigger the indicator. |
| [COMMON-038] | Common Rule | Filename displayed after upload with option to remove. |
| [COMMON-040] | Common Rule | File input constrains selectable file types in browser dialog. |
| [COMMON-048] | Common Rule | Form fields must have associated labels (aria-label). |
| [COMMON-057] | Common Rule | Long text truncated with CSS ellipsis; full text shown via tooltip on hover (applied to filename on file card). |
| [RULE-070] | Business Rule | Registration wizard session timeout: 30 minutes inactivity; vendor notified before expiry; browser-session uploads lost on timeout. |

---

## 5. Open Questions

| # | Question | Status |
|---|---|---|
| OQ-1 | The use case description mentions "verified email + mobile" as part of Individual KYC requirements, but the screen only shows document uploads. Is email/mobile verification handled separately or should status indicators appear on this screen? | Resolved: Handled at the last step before submitting the form (UC-VOB-004). No status indicators required on this screen. — `Vendor Onboarding QA Answers.csv` [QA-023] |
| OQ-2 | The Store Logo upload area displays "Upload PDF" text in the current screen, but per COMMON-034 it should accept images. Should the placeholder text read "Upload Image" instead? | Resolved: Yes — placeholder updated to `"Upload Image"` and file dialog constrained to image MIME types (.jpg, .png, .svg, .webp). — `Vendor Onboarding QA Answers.csv` [QA-024] |
| OQ-3 | Should drag-and-drop upload be supported as an alternative to the click-to-browse interaction? | Resolved: Yes — drag-and-drop is implemented for all document and image upload areas. — `Vendor Onboarding QA Answers.csv` [QA-025] |
| OQ-4 | For the re-verification flow (→ UC-VOB-009), does the vendor return to this exact screen with previously uploaded documents still visible, or is a fresh upload required? | Resolved: Vendor sees previously uploaded, currently active documents in the uploaded state. They may replace/update individual documents. Documents not explicitly rejected do not need to be re-uploaded. — `Vendor Onboarding QA Answers.csv` [QA-026] |
| OQ-5 | What is the maximum filename length displayed on the file card before truncation? Is there a character limit or is it purely CSS-based ellipsis? | Resolved: CSS-based ellipsis when filename exceeds card width; tooltip shows full filename on hover per COMMON-057. No hard character limit. — `dev-question-resolver` [Q2] |
| OQ-6 | Is the upload progress indicator threshold exactly "> 1MB" or "≥ 1MB"? | Resolved: Strictly > 1MB (files exceeding 1MB). A file exactly 1MB does NOT trigger the progress indicator. — `dev-question-resolver` [Q4] |
| OQ-7 | What happens if the vendor tries to upload a second file to an already-filled upload slot without first removing the existing file? | Resolved: The file card replaces the drop zone entirely; no upload interaction is available on a filled slot. Vendor must use the × (remove) button first. — `dev-question-resolver` [Q5] |
| OQ-8 | What is the session timeout duration for Step 2? Are uploaded files preserved on session recovery? | Resolved: Session timeout is 30 minutes [RULE-070]. Uploads are frontend-only (browser session). All uploaded files are lost on session expiry; vendor must re-upload. — `BA/PO feedback` [Q7] |
| OQ-9 | What happens if a network error occurs during file upload? | Not Applicable: Upload is frontend-only (files stored in browser session; not sent to server during wizard flow). Network errors are not relevant to this step. — `BA/PO feedback` [Q1] |
| OQ-10 | Are the 16 synthesized Acceptance Criteria formally approved by BA/PO? | Resolved: Formally approved by BA/PO on 2026-04-14. QA may proceed to build test cases. — `BA/PO feedback` [Q6] |

---

## Changelog

| Date | Source | Changes | QA Resolved |
|------|--------|---------|-------------|
| 2026-04-13 | `Vendor Onboarding QA Answers.csv` | Resolved OQ-1: email/mobile verification at final step only. Resolved OQ-2: Store Logo placeholder changed to "Upload Image"; dialog constrained to image MIME types; SVG added to accepted formats. Resolved OQ-3: drag-and-drop supported for all upload areas. Resolved OQ-4: re-verification shows existing documents pre-populated with replace option. Updated Basic Flow, Alternative Flow, SC-02A/B element descriptions, Store Logo behaviors, Validation Summary, Cross-References. | QA-023, QA-024, QA-025, QA-026 |
| 2026-04-14 | `dev-question-resolver` + `BA/PO feedback` | Resolved OQ-5 (Q2): filename truncation is CSS ellipsis per card width; tooltip on hover per COMMON-057. Resolved OQ-6 (Q4): progress indicator threshold is strictly > 1MB; files exactly 1MB excluded. Resolved OQ-7 (Q5): upload slot replacement blocked by UI — vendor must remove then re-upload; added [Upload Slot Already Filled] Alternative Flow. Resolved OQ-8 (Q7): session timeout 30 min per RULE-070; browser-session uploads lost on expiry; added [Session Timeout] Alternative Flow. Resolved OQ-10 (Q6): 16 ACs formally approved by BA/PO. OQ-9 (Q1) not applicable — upload is FE-only. Updated Basic Flow step 6–7, SC-02C elements, Cross-References (added COMMON-057, RULE-070). Remaining open: OQ-3 (Q3 — rejected doc visual indicator in re-verification). | Q1 (N/A), Q2, Q4, Q5, Q6, Q7 |

