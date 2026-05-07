# Requirement Traceability Matrix

> Generated: 2026-04-10
> Source files: `docs/multivendor-ecommerce-requirements.pdf` (Xiteb SRS – Multivendor eCommerce Platform, 19 pages)
> Business Processes: [business-processes.md](./business-processes.md)
> QA Backlog: [question-backlog.md](./question-backlog.md)

---

## 1. Business Requirements

| ID | Actor | Capability | Source |
|----|-------|-----------|--------|
| BR-001 | Super Admin | Create, modify, and deactivate system roles | §2.1.1 |
| BR-002 | Super Admin | Define granular permissions per module (View, Create, Edit, Approve, Suspend, Delete) | §2.1.1 |
| BR-003 | Super Admin | Configure global business rules (commission logic, pricing constraints, platform policies) | §2.1.1 |
| BR-004 | Super Admin | Enable or disable system-wide features | §2.1.1 |
| BR-005 | Admin | Approve, reject, suspend, or reinstate vendors and products | §2.1.2 |
| BR-006 | Admin | Configure operational limits (min/max pricing, category restrictions, product caps per vendor) | §2.1.2 |
| BR-007 | Admin | Monitor orders, returns, disputes, settlements, and reports | §2.1.2 |
| BR-008 | Admin | Override vendor actions for compliance or dispute resolution | §2.1.2 |
| BR-009 | Vendor | Maintain vendor store profile information | §2.2 |
| BR-010 | Vendor | Create, update, and manage product listings subject to approval | §2.2 |
| BR-011 | Vendor | View and process only vendor-specific orders | §2.2 |
| BR-012 | Vendor | Track earnings, commissions, and settlement history | §2.2 |
| BR-013 | Vendor Staff | Create staff users with predefined roles (Product Manager, Order Manager, Finance) | §2.3 |
| BR-014 | Vendor Staff | Restrict access to vendor-owned data only | §2.3 |
| BR-015 | Vendor Staff | Enable or disable staff accounts at any time | §2.3 |
| BR-016 | Customer | Register, login, or checkout as a guest | §2.4 |
| BR-017 | Customer | Browse, search, filter, compare, and wishlist products | §2.4 |
| BR-018 | Customer | Place orders, track delivery, request returns, and manage loyalty points | §2.4 |
| BR-019 | System | Support email-based registration with verification | §2.5 |
| BR-020 | System | Support social login using Google and Facebook | §2.5 |
| BR-021 | System | Support guest checkout with mandatory contact and delivery details | §2.5 |
| BR-022 | System | Support OTP verification for sensitive actions where applicable | §2.5 |
| BR-023 | Vendor | Submit vendor registration form with personal or business details | §3.1 |
| BR-024 | Vendor | Upload mandatory verification documents based on vendor type | §3.1, §3.2 |
| BR-025 | Vendor | Accept latest vendor agreement before registration | §3.1 |
| BR-026 | Admin | Review, approve, reject, or mark vendor for re-verification | §3.1 |
| BR-027 | Vendor | Update store name, logo, and description (subject to Admin approval) | §3.3 |
| BR-028 | Vendor | Manage contact and banking details (initial setup only) | §3.3 |
| BR-029 | Vendor | Create and manage staff sub-accounts | §3.3 |
| BR-030 | Admin | Search, filter, suspend, or reinstate vendors | §3.4 |
| BR-031 | Admin | Upload and publish vendor agreement versions | §3.5 |
| BR-032 | Admin | Create and manage product categories, sub-categories, and sub-sub-categories | §4.1 |
| BR-033 | Admin | Manage global brand listings | §4.1 |
| BR-034 | Admin | Define category-level rules and restrictions | §4.1 |
| BR-035 | Vendor | Create products with name, SKU, description, category, brand, pricing, variants, warranty, weight, dimensions | §4.2 |
| BR-036 | Vendor | Upload product images and SEO metadata | §4.2 |
| BR-037 | Vendor | Bulk import/export products via CSV | §4.2 |
| BR-038 | Admin | Approve or reject product listings with comments | §4.3 |
| BR-039 | Vendor | Resubmit rejected products after corrections | §4.3 |
| BR-040 | System | Maintain real-time inventory with automatic stock deduction on order placement | §4.4 |
| BR-041 | System | Send low-stock alerts to vendors | §4.4 |
| BR-042 | System | Prevent checkout for out-of-stock items | §4.4 |
| BR-043 | System | Support attribute-based product variations (size, color, etc.) | §4.5 |
| BR-044 | System | Support product comparison within the same category | §4.5 |
| BR-045 | System | Provide quick view from product listing pages | §4.5 |
| BR-046 | System | Support product brochure (PDF) downloads | §4.5 |
| BR-047 | Customer | Submit product-level inquiry forms | §4.6 |
| BR-048 | Admin | View all product inquiries | §4.6 |
| BR-049 | Admin | Configure and display return policy across platform | §4.6 |
| BR-050 | Admin | Define minimum and maximum selling prices per category | §5.1 |
| BR-051 | Admin | Define maximum discount percentage per vendor and category | §5.1 |
| BR-052 | Admin | Restrict promotional overlap where required | §5.1 |
| BR-053 | Admin/Vendor | Configure product-level discounts (flat or percentage) | §5.2 |
| BR-054 | Admin/Vendor | Configure coupon codes with conditions (validity, usage limits, min order value, applicable vendors/categories) | §5.2 |
| BR-055 | Admin | Configure Bank IPG-based promotions applied automatically by payment method | §5.2 |
| BR-056 | Admin/Vendor | Configure bundle offers and BOGO promotions | §5.2 |
| BR-057 | Admin/Vendor | Configure order-value-based discounts | §5.2 |
| BR-058 | Admin/Vendor | Configure free shipping promotions | §5.2 |
| BR-059 | System | Provide unified single shopping cart across multiple vendors | §6.1 |
| BR-060 | System | Recalculate cart prices dynamically | §6.1 |
| BR-061 | System | Persist cart for logged-in users | §6.1 |
| BR-062 | System | Identify abandoned carts | §6.1 |
| BR-063 | System | Provide unified order summary with tax, shipping, and discount breakdown at checkout | §6.2 |
| BR-064 | System | Perform final stock and price validation at checkout | §6.2 |
| BR-065 | System | Support payment via Bank IPG | §6.3 |
| BR-066 | System | Support payment via EMI options | §6.3 |
| BR-067 | System | Support Cash on Delivery (COD) | §6.3 |
| BR-068 | System | Support manual bank transfers | §6.3 |
| BR-069 | System | Automatically split master order into vendor-wise sub-orders | §7.1 |
| BR-070 | System | Generate vendor-level order records per sub-order | §7.1 |
| BR-071 | System | Provide unified customer order tracking | §7.2 |
| BR-072 | Vendor | Update order status from Pending to Ready to Ship | §7.2 |
| BR-073 | Admin/Vendor | Configure cancellation and return reasons | §7.2 |
| BR-074 | ~~System~~ | ~~Support vendor fulfillment to collection points~~ **[REMOVED — see RULE-060]** | §7.3 |
| BR-075 | System | Apply location-based shipping charges | §7.3 |
| BR-076 | System | Validate return requests against return window and product condition rules | §8.1 |
| BR-077 | Customer | Initiate return request from order history with reason and evidence | §8.2 |
| BR-078 | Vendor/Admin | Review and approve or reject return requests with remarks | §8.3 |
| BR-079 | System | Process refunds only after return approval and item verification | §8.4 |
| BR-080 | System | Issue refunds via original payment method where possible | §8.4 |
| BR-081 | System | Handle COD refunds manually via bank transfer | §8.4 |
| BR-082 | Admin | Configure margin-based commission (% of margin between cost and selling price) | §9.1a |
| BR-083 | Admin | Configure markup-based commission (% or fixed amount of selling price) | §9.1b |
| BR-084 | Admin | Set commission priority: category > vendor > platform default | §9.2 |
| BR-085 | System | Calculate commission using highest-priority applicable rule | §9.2 |
| BR-086 | System | Calculate vendor settlement per sub-order after order completion and return window expiry | §9.4 |
| BR-087 | Admin | Manually initiate vendor payouts | §9.4 |
| BR-088 | System | Log all financial transactions immutably | §9.5 |
| BR-089 | Admin | Access role-based management, audit logs, and reporting | §10 |
| BR-090 | Admin | View admin financial dashboard (Total GMV, platform commission, pending payouts) | §10 |
| BR-091 | Admin/Vendor | Access Total Orders Report, Sales & Promotions Report, Settlement Report, Returns & Refunds Report | §10 |
| BR-092 | Customer | Add/remove products to/from wishlist; wishlist persists across sessions for logged-in users | §11.1 |
| BR-093 | Customer | Submit star ratings (1–5) and optional text reviews for verified purchases | §11.2 |
| BR-094 | Admin | Approve reviews before publication; hide/remove policy-violating reviews | §11.2 |
| BR-095 | Customer | Earn loyalty points based on order value, campaigns, or specific actions | §11.3 |
| BR-096 | Customer | Redeem loyalty points as monetary discount at checkout | §11.3 |
| BR-097 | System | Integrate WhatsApp as communication channel with predefined message templates | §11.4 |
| BR-098 | System | Scheduled ERP data synchronization for inventory and products | §12 |
| BR-099 | System | Support ERP as source of truth for inventory and products | §12 |
| BR-100 | System | Send automated abandoned cart email notification after 2-hour idle period | `meeting-transcript-1104.md` [QA-009] |
| BR-101 | System | Automatically initiate vendor settlements via API based on admin-configured schedule | `meeting-transcript-1104.md` [QA-012] |
| BR-102 | Admin | Configure Total Orders Report filters: Date Range, Vendor Name, Order Status, Payment Status | `meeting-transcript-1104.md` [QA-017] |
| BR-103 | Admin | Review recent vendor store profile changes via post-moderation dashboard | `meeting-transcript-1104.md` [QA-019] |

---

## 2. Business Rules

| ID | Domain | Rule | Source |
|----|--------|------|--------|
| RULE-001 | Access Control | System implements strict RBAC; each user accesses only features and data relevant to their role | §2 |
| RULE-002 | Vendor Registration | Vendor must accept the latest vendor agreement before registration is complete | §3.1 |
| RULE-003 | Vendor Registration | Document upload format must be PDF; format and size validated by system | §3.1, §3.2 |
| RULE-004 | Vendor KYC | Admin approval is mandatory before vendor activation | §3.1, §3.3 |
| RULE-005 | Vendor KYC | All verification actions logged for audit purposes | §3.1 |
| RULE-006 | Vendor KYC | Vendors may not list or publish products until KYC verification is approved | §3.3 |
| RULE-007 | Vendor Profile | Vendors may enter bank details during initial setup only | §3.3 |
| RULE-008 | Vendor Profile | Post-activation bank detail changes must be performed by Admin | §3.3 |
| RULE-009 | Vendor Profile | Bank details are mandatory for vendor activation | §3.3 |
| RULE-010 | Vendor Moderation | Vendor approval is a single-step Admin approval process | §3.4 |
| RULE-011 | Vendor Moderation | When a vendor is suspended, all associated products and order processing are automatically paused | §3.4 |
| RULE-012 | Vendor Agreement | Vendors with outdated agreements are restricted from product listing | §3.5 |
| RULE-013 | Product Approval | All vendor product listings require Admin approval before being published | §4.3 |
| RULE-014 | Product Status | Product status flow: Draft → Pending Approval → Published → Archived | §4.2 |
| RULE-015 | Pricing | System shall automatically block any product or promotion that falls outside configured min/max price and discount thresholds | §5.1 |
| RULE-016 | Promotion Priority | Discount priority order: (1) Bank IPG promotions, (2) Product-level or bundle offers, (3) Coupon codes | §5.3 |
| RULE-017 | Promotion Priority | System calculates and logs each discount sequentially and displays complete price breakdown | §5.3 |
| RULE-018 | Commission – Margin | Commission = (Selling Price − Cost Price) × commission_rate%; deducted before settlement | §9.1a |
| RULE-019 | Commission – Markup | Commission = Selling Price × commission_rate% (or fixed amount) | §9.1b |
| RULE-020 | Commission Priority | Category-level commission overrides vendor-level, which overrides platform default | §9.2 |
| RULE-021 | Commission Freeze | Commission rules applied to an order are frozen at checkout | §9.2 |
| RULE-022 | Commission – Margin | Vendor cost price is visible only to Admin; margin calculation is locked post order confirmation | §9.1a |
| RULE-023 | Discount Funding | Vendor-funded discount: deducted from vendor earnings; commission on discounted price | §9.3a |
| RULE-024 | Discount Funding | Platform-funded discount: platform absorbs; vendor receives full price; commission on original price | §9.3b |
| RULE-025 | Discount Funding | Shared discount: split between vendor and platform per configured sharing rules | §9.3c |
| RULE-026 | Settlement | Vendor earnings calculated per sub-order; settlements occur only after order completion and return window expiry | §9.4 |
| RULE-027 | Settlement | Settlement cycles (weekly / bi-weekly / monthly) are configurable | §9.4 |
| RULE-028 | Settlement | Vendor wallet ledger is read-only; payouts initiated manually by Admin | §9.4 |
| RULE-029 | Financial Audit | All financial transactions logged immutably; Admin commission/settlement actions are auditable | §9.5 |
| RULE-030 | Financial Audit | Financial reports shall support reconciliation with ERP systems | §9.5 |
| RULE-031 | Returns | Returns allowed only within a configurable return window per category or product | §8.1 |
| RULE-032 | Returns | Certain products (hygiene items, digital goods) may be marked as non-returnable | §8.1 |
| RULE-033 | Returns | Return eligibility validated against order delivery date and product condition rules | §8.1 |
| RULE-034 | Returns | Rejected returns must include mandatory rejection reason | §8.3 |
| RULE-035 | Returns | Approved returns trigger pickup or drop-off instructions | §8.3 |
| RULE-036 | Refunds | Refunds issued via original payment method where possible | §8.4 |
| RULE-037 | Refunds | COD refunds handled manually via bank transfer | §8.4 |
| RULE-038 | Financial Impact | Refunded orders reverse vendor earnings | §8.5 |
| RULE-039 | Financial Impact | Earned/redeemed loyalty points are automatically reversed on refund | §8.5 |
| RULE-040 | Financial Impact | Platform-funded discounts are not reclaimed from vendors on refund | §8.5 |
| RULE-041 | Financial Impact | Vendor-funded discounts reduce vendor settlement accordingly on refund | §8.5 |
| RULE-042 | Reviews | Only verified purchasers can submit ratings and reviews | §11.2 |
| RULE-043 | Reviews | Reviews visible only after Admin approval | §11.2 |
| RULE-044 | Reviews | Vendors cannot edit or delete reviews | §11.2 |
| RULE-045 | Loyalty | Points credited only after order completion (post return window) | §11.3 |
| RULE-046 | Loyalty | Refunds automatically reverse earned loyalty points | §11.3 |
| RULE-047 | WhatsApp | WhatsApp messages shall not expose vendor personal contact details | §11.4 |
| RULE-048 | Order | Vendor status update permission: Pending → Ready to Ship only | §7.2 |
| RULE-049 | Vendor Staff | Vendors may create multiple sub-accounts under a single vendor profile | §2.3 |
| RULE-050 | Vendor Staff | Role-based permissions for vendor staff are configurable by Admin | §2.3 |
| RULE-051 | OTP | OTP is required for: (1) login from new/unrecognized device, (2) password reset, (3) vendor bank payout detail update | `meeting-transcript-1104.md` [QA-001] |
| RULE-052 | OTP | OTP delivery channel is email only; SMS OTP is not supported | `meeting-transcript-1104.md` [QA-002] |
| RULE-053 | Vendor Verification | Vendor verification document upload size limit is 5MB per document | `meeting-transcript-1104.md` [QA-003] |
| RULE-054 | Payment Gateway | Platform integrates exclusively with Stripe for customer checkout; no other gateways in this phase | `meeting-transcript-1104.md` [QA-004] |
| RULE-055 | Product Archive | Product archiving is vendor-initiated; Admin may force-archive for policy violations; archiving does NOT trigger automatically on zero stock | `meeting-transcript-1104.md` [QA-005] |
| RULE-056 | Coupons | Coupons are separated into Platform Coupons (Admin-created) and Vendor Coupons (Vendor-created) | `meeting-transcript-1104.md` [QA-006] |
| RULE-057 | Coupon Stacking | Per sub-order, a maximum of 1 Platform Coupon and 1 Vendor Coupon may be applied (max 2 coupons per sub-order) | `meeting-transcript-1104.md` [QA-007] |
| RULE-058 | Order Status | Full order status lifecycle: Pending → Processing → Ready to Ship → Shipped → Delivered → Completed (auto after return window). Terminal states: Cancelled (before shipment), Returned and Refunded | `meeting-transcript-1104.md` [QA-008] |
| RULE-059 | Abandoned Cart | Cart idle for 2 hours triggers automated email notification to customer | `meeting-transcript-1104.md` [QA-009] |
| RULE-060 | Delivery | Collection point delivery is removed from scope; customers must provide direct home or office address | `meeting-transcript-1104.md` [QA-010] |
| RULE-061 | Return Evidence | Return evidence images restricted to JPEG or PNG format, maximum 3 images, up to 5MB each | `meeting-transcript-1104.md` [QA-011] |
| RULE-062 | Settlement | Vendor settlement is automated via API based on admin-configured schedule (weekly/bi-weekly/monthly); system auto-triggers bank transfers | `meeting-transcript-1104.md` [QA-012] |
| RULE-063 | ERP Integration | ERP integration uses scheduled CSV flat-file syncs via SFTP for inventory and orders; no custom API builds per vendor | `meeting-transcript-1104.md` [QA-013] |
| RULE-064 | Pricing Governance | Pricing governance rules (min/max price, max discount) are set globally per product category, not per vendor | `meeting-transcript-1104.md` [QA-018] |
| RULE-065 | Vendor Profile | Post-approval vendor store profile updates (logo, bio) do not require Admin approval; Admin uses post-moderation dashboard to review recent changes. Full approval required only at initial registration | `meeting-transcript-1104.md` [QA-019] |
| RULE-066 | Reviews | Customers have a 30-day window after order status reaches "Delivered" to submit a product review; after this, the review option is locked | `meeting-transcript-1104.md` [QA-020] |
| RULE-067 | Orders Report | Total Orders Report must support filters: Date Range, Vendor Name, Order Status, Payment Status | `meeting-transcript-1104.md` [QA-017] |
| RULE-068 | Vendor Registration | The vendor agreement acceptance checkbox must remain disabled until the vendor has scrolled to the bottom of the agreement container | `Vendor Onboarding QA Answers.csv` [QA-027] |
| RULE-069 | Vendor Agreement | Vendor agreement text area must support rich formatting (HTML/Markdown) to allow readable structures such as headings, bold text, and bullet points | `Vendor Onboarding QA Answers.csv` [QA-030] |
| RULE-070 | Vendor Registration | Registration wizard session must time out after inactivity; recommended inactivity window is 30–60 minutes; vendor must be notified before/at timeout | `Vendor Onboarding QA Answers.csv` [QA-034] |
| RULE-071 | Vendor Registration | Frontend validates registration step-by-step; the final backend submission must validate all steps simultaneously and aggregate all errors across all steps in a single response to prevent multiple round-trips | `Vendor Onboarding QA Answers.csv` [QA-031] |

---

## 3. Stakeholders & Personas

| Stakeholder | Role | Key Characteristics | Goals |
|-------------|------|-------------------|-------|
| Super Admin | Platform owner/operator | Full system-level access; defines structure, rules, governance | Configure platform, manage roles and permissions, set global business rules |
| Admin | Marketplace operations manager | Day-to-day operations within Super Admin-granted permissions | Approve vendors/products, manage disputes, initiate settlements, monitor KPIs |
| Vendor (Seller) | Approved business or individual seller | Manages own store, products, and orders; subject to Admin oversight | Maximize sales, track earnings, comply with platform rules |
| Vendor Staff (Sub-Account) | Operational staff under a Vendor | Limited to vendor-owned data; role: Store Manager or Staff | Manage products, orders, and inventory on vendor's behalf |
| Customer (Buyer) | End consumer | Browses, compares, purchases, and tracks orders; may be registered or guest | Convenient shopping, reliable delivery, easy returns |
| System | Automated platform logic | Enforces rules, calculates commissions, manages inventory and notifications | Maintain accuracy, enforce governance, ensure seamless UX |

---

## Changelog

| Date | Source | Changes | QA Resolved |
|------|--------|---------|-------------|
| 2026-04-11 | `meeting-transcript-1104.md` | Added BR-100 to BR-103; Added RULE-051 to RULE-067; Added COMMON-007, COMMON-008; Removed BR-074 (collection points); Modified BR-087 note (now automated) | QA-001, QA-002, QA-003, QA-004, QA-005, QA-006, QA-007, QA-008, QA-009, QA-010, QA-011, QA-012, QA-013, QA-017, QA-018, QA-019, QA-020 |
| 2026-04-13 | `Vendor Onboarding QA Answers.csv` | Added RULE-068 (scroll-to-unlock checkbox), RULE-069 (agreement rich text), RULE-070 (wizard session timeout), RULE-071 (backend aggregated validation) | QA-021, QA-022, QA-023, QA-024, QA-025, QA-026, QA-027, QA-028, QA-029, QA-030, QA-031, QA-032, QA-033, QA-034 |
