# Use Case List

> Generated: 2026-04-13
> Source: [business-processes.md](./business-processes.md), [requirement-traceability.md](./requirement-traceability.md)
> QA Backlog: [question-backlog.md](./question-backlog.md)

---

## Summary

| Category | UC Count |
|----------|----------|
| Vendor Onboarding & Verification | 13 |
| Product Listing & Approval | 11 |
| Customer Order & Checkout | 10 |
| Order Fulfillment & Status | 11 |
| Returns & Refunds | 10 |
| Commission & Settlement | 10 |
| Customer Loyalty | 6 |
| ERP Integration | 4 |
| **Total** | **75** |

---

## 1. Vendor Onboarding & Verification

> Source: BP-001 | Actors: Vendor, Admin, System

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-VOB-001 | Submit Vendor Registration | Vendor fills registration form with personal or business details and selects vendor type (Individual/Business). | None | Vendor record created in draft state; documents upload step enabled | Vendor navigates to registration page and submits form | BR-023 | RULE-002 |
| UC-VOB-002 | Upload Verification Documents | Vendor uploads mandatory KYC documents. Individual: NIC/Passport, bank proof, verified email+mobile. Business: BR cert, Form 1/20, TIN/VAT, NIC of director, company bank proof. PDF only, 5MB max each. | Registration form submitted | Documents attached to vendor profile; system validation triggered | Vendor proceeds to document upload step | BR-024 | RULE-003, RULE-053 |
| UC-VOB-003 | Accept Vendor Agreement | Vendor reads and accepts latest published vendor agreement version. Acceptance checkbox is disabled until vendor scrolls to bottom. Acceptance date and version logged. Agreement supports rich formatting (HTML/Markdown). | Registration form submitted | Agreement acceptance recorded with timestamp and version | Vendor clicks "Accept Agreement" | BR-025 | RULE-002, RULE-012, RULE-068, RULE-069 |
| UC-VOB-004 | Validate Registration Submission | System verifies vendor's email via 6-digit OTP modal, then performs backend validation (uniqueness, agreement version, session integrity). Frontend validates step-by-step on each "Next" click; backend only checks server-side concerns in a single aggregated response. Session times out after 30–60 minutes of inactivity. On success, vendor redirected to "Become a Vendor" landing page with toast. | Vendor clicks "Submit Registration" on Step 3 | Vendor account created in Pending state; Admin notified; vendor redirected to "Become a Vendor" landing page with success toast | System triggers OTP + validation after form submission | BR-023 | RULE-002, RULE-003, RULE-053, RULE-068, RULE-070, RULE-071 |
| UC-VOB-005 | View Vendor List | Admin views filterable list of vendor accounts with status, type, and registration date. Actions: search, filter by status, view detail (→ UC-VOB-006). | Admin is logged in | — | Admin navigates to vendor management | BR-030 | RULE-001 |
| UC-VOB-006 | View Vendor Detail | Admin views vendor profile, documents, KYC status, and store info. Actions: Approve (→ UC-VOB-007), Reject (→ UC-VOB-008), Request Re-verification (→ UC-VOB-009), Suspend (→ UC-VOB-010), Reinstate (→ UC-VOB-011). | Vendor exists in system | — | Admin clicks vendor row from list | BR-026 | RULE-004, RULE-005 |
| UC-VOB-007 | Approve Vendor | Admin approves vendor KYC with mandatory remarks. Vendor account moves to Approved; dashboard access granted; product listing enabled. | Vendor in Pending state; bank details provided | Vendor status = Approved; vendor can list products | Admin clicks "Approve" on vendor detail | BR-026 | RULE-004, RULE-007, RULE-009, RULE-010 |
| UC-VOB-008 | Reject Vendor | Admin rejects vendor KYC with mandatory rejection reason. Vendor notified and may resubmit. | Vendor in Pending or Approved state | Vendor status = Rejected; vendor notified | Admin clicks "Reject" on vendor detail | BR-026 | RULE-005, RULE-010 |
| UC-VOB-009 | Request Vendor Re-verification | Admin requests additional documents from vendor. Vendor returns to document upload step. | Vendor in Pending state | Vendor notified to upload additional documents; status remains Pending | Admin clicks "Re-verify" on vendor detail | BR-026 | RULE-005 |
| UC-VOB-010 | Suspend Vendor | Admin suspends an approved vendor. All associated products and order processing are automatically paused. | Vendor in Approved state | Vendor status = Suspended; products paused; order processing halted | Admin clicks "Suspend" on vendor detail | BR-030 | RULE-011 |
| UC-VOB-011 | Reinstate Vendor | Admin reinstates a suspended vendor account. Products and order processing resumed. | Vendor in Suspended state | Vendor status = Approved; products reactivated | Admin clicks "Reinstate" on vendor detail | BR-030 | RULE-011 |
| UC-VOB-012 | Manage Vendor Agreement | Admin uploads and publishes new vendor agreement versions. Vendors with outdated agreements are restricted from product listing. | Admin is logged in | New agreement version published; outdated vendors flagged | Admin navigates to agreement management | BR-031 | RULE-012 |
| UC-VOB-013 | Update Vendor Store Profile | Vendor updates store name, logo, and description. Post-approval updates do not require Admin re-approval; Admin uses post-moderation dashboard to review recent changes. | Vendor in Approved state | Store profile updated; change logged for post-moderation | Vendor edits store profile | BR-027, BR-103 | RULE-065 |

---

## 2. Product Listing & Approval

> Source: BP-002 | Actors: Vendor, Admin, System

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-PLA-001 | Create Product Listing | Vendor fills product details: name, SKU, description, category, brand, pricing, variants, warranty, weight, dimensions, images, SEO metadata. Saves as Draft. | Vendor KYC approved; vendor agreement current | Product created in Draft status | Vendor navigates to "Add Product" | BR-035, BR-036 | RULE-006, RULE-012 |
| UC-PLA-002 | Edit Product Listing | Vendor modifies an existing product in Draft or rejected state. Updates any field including pricing, variants, images. | Product exists in Draft state | Product updated; remains in Draft | Vendor clicks "Edit" on product detail | BR-035 | RULE-006 |
| UC-PLA-003 | Submit Product for Approval | Vendor submits a Draft product for Admin review. Status changes to Pending Approval. | Product in Draft state; all mandatory fields filled | Product status = Pending Approval; Admin notified | Vendor clicks "Submit for Approval" | BR-035 | RULE-014 |
| UC-PLA-004 | View Product List | Admin/Vendor views paginated product list with filters (status, category, vendor). Actions: view detail (→ UC-PLA-005), bulk select. | User is logged in | — | User navigates to product list | BR-038 | RULE-013 |
| UC-PLA-005 | View Product Detail | Admin views product details, images, pricing, variants. Actions: Approve (→ UC-PLA-006), Reject (→ UC-PLA-007), Archive (→ UC-PLA-008). | Product exists | — | User clicks product row from list | BR-038 | RULE-013 |
| UC-PLA-006 | Approve Product Listing | Admin approves product with optional comments. Status changes to Published; product visible to customers. | Product in Pending Approval state | Product status = Published; visible in storefront | Admin clicks "Approve" on product detail | BR-038 | RULE-013, RULE-014 |
| UC-PLA-007 | Reject Product Listing | Admin rejects product with mandatory rejection comments. Vendor notified to correct and resubmit. Status returns to Draft. | Product in Pending Approval state | Product status = Draft; vendor notified with comments | Admin clicks "Reject" on product detail | BR-038, BR-039 | RULE-013 |
| UC-PLA-008 | Archive Product | Vendor archives own product or Admin force-archives for policy violations. Archiving does NOT trigger automatically on zero stock. | Product in Draft or Published state | Product status = Archived; removed from storefront | Vendor/Admin clicks "Archive" | BR-035 | RULE-014, RULE-055 |
| UC-PLA-009 | Bulk Import Products via CSV | Vendor uploads CSV file to create/update multiple products at once. System validates and processes each row. | Vendor KYC approved | Products created/updated per CSV data; errors reported per row | Vendor uploads CSV in product management | BR-037 | RULE-006 |
| UC-PLA-010 | Export Products to CSV | Vendor exports current product listings to CSV file for offline editing or ERP use. | Vendor has ≥1 product | CSV file generated and downloaded | Vendor clicks "Export CSV" | BR-037 | — |
| UC-PLA-011 | Manage Product Categories | Admin creates and manages product categories, sub-categories, and sub-sub-categories. Defines category-level rules and restrictions. | Admin is logged in | Category hierarchy updated | Admin navigates to category management | BR-032, BR-034 | RULE-015, RULE-064 |

---

## 3. Customer Order & Checkout

> Source: BP-003 | Actors: Customer, System

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-COC-001 | Browse and Search Products | Customer discovers products via browsing, search, filtering, comparison, and quick view. Supports category navigation and product comparison within same category. | Products published in storefront | — | Customer navigates to storefront | BR-017, BR-044, BR-045 | — |
| UC-COC-002 | Add Product to Cart | Customer adds items to unified multi-vendor cart. Cart persists for logged-in users; dynamic price recalculation on each cart update. | Product is Published and in stock | Item added to cart; cart totals recalculated | Customer clicks "Add to Cart" | BR-059, BR-060, BR-061 | — |
| UC-COC-003 | View and Manage Cart | Customer views cart contents, updates quantities, removes items. System recalculates prices dynamically reflecting promotions and price changes. | ≥1 item in cart | Cart updated; totals recalculated | Customer navigates to cart | BR-059, BR-060 | — |
| UC-COC-004 | Proceed to Checkout | Customer initiates checkout. System performs final stock and price validation; blocks out-of-stock items. Cart split into vendor-wise sub-orders. | ≥1 valid item in cart | Sub-orders created; unified order summary displayed | Customer clicks "Checkout" | BR-063, BR-064 | RULE-057 |
| UC-COC-005 | Apply Coupons | Customer applies coupon codes per sub-order. Max 1 Platform Coupon + 1 Vendor Coupon per sub-order. System applies discount priority: Bank IPG → Product/Bundle → Coupon. | Checkout initiated; sub-orders visible | Discounts applied; price breakdown updated | Customer enters coupon code | BR-054 | RULE-016, RULE-017, RULE-056, RULE-057 |
| UC-COC-006 | Select Payment Method | Customer selects payment method: Stripe (primary), EMI, COD, or Manual Bank Transfer. | Checkout initiated; order summary reviewed | Payment method selected; order ready for confirmation | Customer selects payment option | BR-065, BR-066, BR-067, BR-068 | RULE-054 |
| UC-COC-007 | Confirm and Place Order | Customer confirms order. System creates master order and vendor-wise sub-orders. Order confirmation sent to customer and vendors. | Payment method selected; order summary accepted | Master order + sub-orders created; confirmation emails sent | Customer clicks "Place Order" | BR-069 | RULE-021, RULE-057 |
| UC-COC-008 | Configure Pricing Governance | Admin configures min/max selling prices and max discount percentage per product category. System blocks violations automatically. | Admin is logged in | Pricing governance rules saved per category | Admin navigates to pricing config | BR-050, BR-051, BR-052 | RULE-015, RULE-064 |
| UC-COC-009 | Manage Promotions and Coupons | Admin/Vendor creates and configures promotions: product discounts (flat/%), coupon codes, Bank IPG promotions, bundle/BOGO offers, order-value discounts, free shipping. | User is logged in; Admin or approved Vendor | Promotion created and active per conditions | Admin/Vendor navigates to promotions | BR-053, BR-054, BR-055, BR-056, BR-057, BR-058 | RULE-015, RULE-016, RULE-056 |
| UC-COC-010 | Send Abandoned Cart Notification | System detects cart idle for 2 hours and sends automated email notification to customer. | Customer has items in cart; 2-hour idle period elapsed | Email notification sent to customer | System timer triggers after 2-hour idle | BR-062, BR-100 | RULE-059 |

---

## 4. Order Fulfillment & Status

> Source: BP-004 | Actors: Vendor, Admin, Customer, System

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-OFS-001 | View Sub-Order (Vendor) | Vendor views sub-order details assigned to them including items, quantities, customer delivery info. Actions: Accept (→ UC-OFS-002), Cancel (→ UC-OFS-008). | Sub-order created for vendor | — | Vendor receives order notification and clicks to view | BR-070 | RULE-048 |
| UC-OFS-002 | Accept Sub-Order | Vendor accepts sub-order. Status transitions from Pending → Processing. Vendor begins preparing the order. | Sub-order in Pending state | Sub-order status = Processing | Vendor clicks "Accept Order" | BR-072 | RULE-058 |
| UC-OFS-003 | Mark Order Ready to Ship | Vendor marks sub-order as packed. Status transitions from Processing → Ready to Ship. | Sub-order in Processing state | Sub-order status = Ready to Ship | Vendor clicks "Mark Ready to Ship" | BR-072 | RULE-058 |
| UC-OFS-004 | Hand Over to Logistics | Vendor hands sub-order to logistics provider. Status transitions from Ready to Ship → Shipped. | Sub-order in Ready to Ship state | Sub-order status = Shipped; tracking available | Vendor confirms logistics handoff | BR-072 | RULE-058 |
| UC-OFS-005 | Confirm Delivery | System/Logistics confirms delivery to customer's direct address. Status transitions from Shipped → Delivered. No collection points. | Sub-order in Shipped state | Sub-order status = Delivered; return window begins | Logistics confirms delivery | BR-071 | RULE-058, RULE-060 |
| UC-OFS-006 | Auto-Complete Order | System automatically transitions sub-order from Delivered → Completed after return window expires. | Sub-order in Delivered state; return window expired | Sub-order status = Completed; settlement eligible | System timer triggers after return window | BR-069 | RULE-058 |
| UC-OFS-007 | Track Order (Customer) | Customer views unified tracking across all vendors for a master order. Shows each sub-order status and delivery progress. | Order placed; ≥1 sub-order exists | — | Customer navigates to order tracking | BR-071 | — |
| UC-OFS-008 | Cancel Order Before Shipment | Customer or Vendor cancels sub-order. Allowed only when status is Pending or Processing (before shipment). | Sub-order in Pending or Processing state | Sub-order status = Cancelled | Customer/Vendor clicks "Cancel Order" | BR-069 | RULE-058 |
| UC-OFS-009 | View Order List (Admin) | Admin views all orders with filters: Date Range, Vendor Name, Order Status, Payment Status. Actions: view detail, export report. | Admin is logged in | — | Admin navigates to order management | BR-007, BR-102 | RULE-067 |
| UC-OFS-010 | Configure Cancellation Reasons | Admin/Vendor manages configurable list of cancellation and return reasons. | Admin/Vendor is logged in | Reason list updated | Admin/Vendor navigates to reason config | BR-073 | — |
| UC-OFS-011 | Send Order Notification | System sends real-time email notification to vendor for new orders and order status changes. | Order status changes | Vendor receives email notification | System triggers on order events | — | COMMON-004 |

---

## 5. Returns & Refunds

> Source: BP-005 | Actors: Customer, Vendor, Admin, System

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-RRF-001 | Initiate Return Request | Customer selects order item from order history, chooses return reason from predefined list, and uploads evidence (JPEG/PNG only, max 3 images, 5MB each). | Order in Delivered state; return window active; product is returnable | Return request created in Pending Review status | Customer clicks "Request Return" from order history | BR-077 | RULE-031, RULE-061 |
| UC-RRF-002 | Validate Return Eligibility | System validates return request against return window per category/product and product condition rules. Blocks non-returnable products. | Return request submitted | Return marked as Eligible or Blocked | System triggers after return submission | BR-076 | RULE-031, RULE-032, RULE-033 |
| UC-RRF-003 | View Return Request (Vendor) | Vendor views return request details: reason, evidence images, eligibility status. Actions: Approve (→ UC-RRF-004), Reject (→ UC-RRF-005). | Return validated as eligible | — | Vendor receives return notification | BR-078 | RULE-034 |
| UC-RRF-004 | Approve Return Request | Vendor/Admin approves return. System triggers pickup or drop-off instructions to customer. | Return in Pending Review state; eligible | Return status = Approved; pickup/drop-off instructions sent | Vendor clicks "Approve Return" | BR-078 | RULE-034, RULE-035 |
| UC-RRF-005 | Reject Return Request | Vendor rejects return with mandatory rejection reason. Customer may dispute (→ UC-RRF-006). | Return in Pending Review state | Return status = Rejected; customer notified with reason | Vendor clicks "Reject Return" | BR-078 | RULE-034 |
| UC-RRF-006 | Override Return Decision (Admin) | Admin overrides vendor's return rejection in dispute scenario. Return re-enters review flow. | Return rejected by vendor; customer disputes | Return re-opened for review | Admin clicks "Override" on disputed return | BR-078 | — |
| UC-RRF-007 | Verify Returned Item | Item received and verified for condition. System confirms item receipt and initiates refund processing. | Return approved; item received at warehouse/vendor | Item verified; refund processing triggered | Warehouse/Vendor confirms item receipt | BR-079 | RULE-036 |
| UC-RRF-008 | Process Refund | System processes refund via original payment method. COD refunds handled manually via bank transfer. | Item verified; return approved | Refund issued to customer; customer notified via email/SMS | System triggers after item verification | BR-079, BR-080, BR-081 | RULE-036, RULE-037 |
| UC-RRF-009 | Reverse Vendor Earnings and Loyalty Points | System reverses vendor earnings, redeemed/earned loyalty points, and adjusts settlement. Platform-funded discounts not reclaimed from vendor. | Refund processed | Vendor earnings reversed; loyalty points reversed; settlement adjusted | System triggers after refund completion | — | RULE-038, RULE-039, RULE-040, RULE-041 |
| UC-RRF-010 | Configure Return Policy | Admin configures return window per category/product, marks products as non-returnable, and displays return policy across platform. | Admin is logged in | Return policy rules saved and published | Admin navigates to return policy config | BR-049 | RULE-031, RULE-032 |

---

## 6. Commission & Settlement

> Source: BP-006 | Actors: Admin, System, Vendor

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-CMS-001 | Configure Commission Rules | Admin sets commission type (margin-based or markup-based), rate (% or fixed), and priority hierarchy: category > vendor > platform default. | Admin is logged in | Commission rules saved | Admin navigates to commission config | BR-082, BR-083, BR-084 | RULE-018, RULE-019, RULE-020 |
| UC-CMS-002 | Freeze Commission at Checkout | System freezes applicable commission rules at checkout time. Locked commission used for all subsequent calculations on that order. | Order confirmed at checkout | Commission rules snapshot saved per order | System triggers at checkout confirmation | BR-085 | RULE-021 |
| UC-CMS-003 | Calculate Order Commission | System calculates commission per sub-order using highest-priority rule. Margin-based: (Selling − Cost) × rate%. Markup-based: Selling × rate% or fixed. | Commission frozen; order confirmed | Commission amount calculated and recorded per sub-order | System triggers after order confirmation | BR-085 | RULE-018, RULE-019, RULE-020, RULE-022 |
| UC-CMS-004 | Configure Discount Funding | Admin configures discount funding type per promotion: vendor-funded, platform-funded, or shared. Defines sharing rules for shared type. | Admin is logged in | Discount funding rules saved per promotion | Admin navigates to discount funding config | — | RULE-023, RULE-024, RULE-025 |
| UC-CMS-005 | Apply Discount Funding to Commission | System adjusts commission based on discount funding type. Vendor-funded: commission on discounted price. Platform-funded: commission on original price. Shared: split per rules. | Commission calculated; discount applied | Vendor receivable amount adjusted per funding rules | System triggers during commission calculation | — | RULE-023, RULE-024, RULE-025 |
| UC-CMS-006 | Calculate Settlement | System calculates vendor settlement per sub-order after order completion and return window expiry. Updates vendor wallet ledger (read-only). | Sub-order status = Completed | Settlement amount recorded; vendor wallet ledger updated | System triggers after order completion | BR-086 | RULE-026, RULE-028 |
| UC-CMS-007 | Configure Settlement Schedule | Admin configures settlement cycle: weekly, bi-weekly, or monthly. System auto-triggers payouts per schedule. | Admin is logged in | Settlement schedule saved | Admin navigates to settlement config | BR-101 | RULE-027, RULE-062 |
| UC-CMS-008 | Process Automated Settlement | System auto-initiates bank transfer to vendor via API based on configured settlement schedule. | Settlement calculated; schedule triggers | Payout initiated; transaction logged | System timer triggers per settlement schedule | BR-101 | RULE-062 |
| UC-CMS-009 | View Vendor Earnings Dashboard | Vendor views earnings, commissions, settlement history, and wallet ledger (read-only). | Vendor is logged in and approved | — | Vendor navigates to earnings dashboard | BR-012 | RULE-028, RULE-029 |
| UC-CMS-010 | View Financial Audit Logs | Admin views immutable financial transaction logs. Supports reconciliation with ERP systems. | Admin is logged in | — | Admin navigates to audit logs | BR-088, BR-090 | RULE-029, RULE-030 |

---

## 7. Customer Loyalty

> Source: BP-007 | Actors: Customer, System, Admin

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-CLY-001 | Earn Loyalty Points | System credits loyalty points to customer wallet based on order value, campaigns, or specific actions. Points credited only after order completion (return window expiry). | Order status = Completed | Points credited to customer wallet; transaction logged | System triggers after order completion | BR-095 | RULE-045 |
| UC-CLY-002 | View Loyalty Points Balance | Customer views current points balance, earning history, and redemption history in loyalty wallet. | Customer is logged in | — | Customer navigates to loyalty section | BR-096 | — |
| UC-CLY-003 | Redeem Loyalty Points at Checkout | Customer applies loyalty points as monetary discount during checkout. Redemption limits per order configurable. Points cannot be redeemed on restricted categories or promotions. | Customer has ≥1 point; checkout initiated | Points deducted from wallet; discount applied to order | Customer applies points at checkout | BR-096 | — |
| UC-CLY-004 | Reverse Loyalty Points on Refund | System automatically reverses earned and redeemed loyalty points when a refund is processed. Wallet balance adjusted accordingly. | Refund processed (→ UC-RRF-008) | Earned points reversed; redeemed points reversed; wallet updated | System triggers after refund completion | — | RULE-039, RULE-046 |
| UC-CLY-005 | Configure Loyalty Rules | Admin configures point earning rates, redemption limits, restricted categories, and campaign-specific bonuses. | Admin is logged in | Loyalty rules saved | Admin navigates to loyalty config | BR-095 | RULE-045 |
| UC-CLY-006 | Process Points Expiry | System expires loyalty points based on admin-configured expiry rules. Customer notified before expiry. | Expiry rules configured; points past expiry threshold | Expired points removed from wallet; customer notified | System scheduled job triggers | — | — |

---

## 8. ERP Integration

> Source: BP-008 | Actors: System, Vendor

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| UC-ERP-001 | Configure ERP Sync Settings | Admin/Vendor configures SFTP endpoint, sync interval, and data scope (inventory, orders) for vendor ERP integration. | Vendor approved; ERP system available | Sync configuration saved | Admin/Vendor navigates to ERP config | BR-098 | RULE-063 |
| UC-ERP-002 | Export Data to Vendor ERP | System generates CSV flat files for inventory and order data. Uploads files to vendor's SFTP endpoint per configured schedule. | Sync configuration exists; schedule triggers | CSV files uploaded to vendor SFTP | System scheduled job triggers | BR-098, BR-099 | RULE-063 |
| UC-ERP-003 | Import Data from Vendor ERP | System downloads response CSV from vendor SFTP. Reconciles inventory and order updates. ERP treated as source of truth for inventory. | Vendor ERP has generated response CSV | Inventory and order data reconciled; platform updated | System scheduled job triggers | BR-099 | RULE-063 |
| UC-ERP-004 | View ERP Sync Status | Admin/Vendor views sync history, last sync timestamp, success/failure status, and error logs. | ERP sync configured | — | Admin/Vendor navigates to ERP sync dashboard | BR-098 | — |

---

## Changelog

| Date | Changes |
|------|---------|
| 2026-04-13 | Initial generation from BP-001 through BP-008. 75 use cases across 8 categories. |
| 2026-04-13 | Updated UC-VOB-003: added RULE-068 (scroll-to-unlock), RULE-069 (rich text agreement), updated description. Updated UC-VOB-004: added RULE-068, RULE-070, RULE-071 refs; updated description, post-condition to reflect dedicated confirmation page with KYC timeline and session timeout. Source: `Vendor Onboarding QA Answers.csv` |
| 2026-04-13 | Updated UC-VOB-004: added email OTP verification to description; added RULE-002 ref; post-condition corrected from "dedicated confirmation page" to "Become a Vendor landing page" per updated design; alt flow scope narrowed to server-side-only concerns. Source: design review |
