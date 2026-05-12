# Project Context

> Document title: Project Context Master
> Date created: 2026-05-11
> Last updated: 2026-05-12
> Author/Agent: qc-context-master (update run — accept all)
> Version: v2
> Project: Multi vendor platform (JOY Multivendor eCommerce Platform)

## 1. Project Identity

- **Project name:** Multi vendor platform
- **Project ID:** _<Pending — see Q-001>_
- **Product/System name:** JOY Multivendor eCommerce Platform
- **Release Version:** _<Pending — see Q-001>_
- **Project type:** New build
- **Domain:** E-commerce

## 2. Business Goal

Briefly describe why this project/release exists.

- **Business goal:** Xây dựng nền tảng marketplace multi-vendor cho phép vendor (Individual / Business) đăng ký, niêm yết sản phẩm và customer mua sắm xuyên nhiều vendor trong một đơn hàng duy nhất.
- **Problem/pain point:** _<Pending — see Q-002>_
- **Success criteria:** _<Pending — see Q-002>_

_[AI-proposed | confidence: 30% | evidence: requirement-traceability.md §1; business-processes.md BP-001 → BP-008; project-context_20260505_v1.md §1]_

## 3. Scope Summary

Briefly describe what will be tested (in scope) and what will not be tested (out of scope), including any assumptions or dependencies.

### In Scope

- **Engagement hiện tại:** Vendor Onboarding UC-VOB-001 → UC-VOB-010 (đã sync vào `Feature-scope.xlsx`).
- **Full project (8 modules theo BP-001 → BP-008):** Vendor Onboarding & Verification, Product Listing & Approval, Customer Order & Checkout, Order Fulfillment & Status, Returns & Refunds, Commission & Settlement, Customer Loyalty, ERP Integration.

### Out of Scope

- Collection point delivery (RULE-060 / QA-010).
- SMS OTP — chỉ dùng email (RULE-052 / QA-002).
- Payment gateway ≠ Stripe (RULE-054 / QA-004).
- WhatsApp integration (deferred per QA-016).
- Loyalty redemption restrictions + point expiry chi tiết (deferred per QA-014, QA-015).

### Assumptions

- **PCTX-1:** `project-config.md` vẫn ở dạng TEMPLATE (Domain placeholder, Modules list, Platform coverage chưa fill đầy đủ).
- **PCTX-2:** Password creation step không xuất hiện trong UC-VOB-001 → UC-VOB-004 — không rõ vendor set credentials tại điểm nào (see Q-005).
- **PCTX-3:** Screen asset images cho UC-VOB không có sẵn trong filesystem — phân tích phải dựa hoàn toàn vào textual spec.
- **PCTX-4:** `wireframes-vendor-onboarding.md` referenced trong project-context_20260505_v1.md nhưng không tồn tại (see Q-006).

### Dependencies

- **Stripe** — payment gateway (RULE-054).
- **Email service** — OTP delivery (RULE-052) và notifications.
- **SFTP-based ERP endpoint** — vendor-side ERP integration (RULE-063).

_[AI-proposed | confidence: 50% | evidence: project-context_20260505_v1.md §1 + §8; meeting-transcript-1104.md QA-002/004/010/014/015/016; requirement-traceability.md §2]_

## 4. Users and Roles

| Role / Actor | Description | Key Permissions | Key Workflows |
|---|---|---|---|
| Super Admin | Platform owner/operator; full system-level access | Create/modify/deactivate roles; define granular per-module permissions (View/Create/Edit/Approve/Suspend/Delete); configure global business rules; enable/disable system-wide features (BR-001 → BR-004) | Platform configuration; role/permission setup; system policy governance |
| Admin | Marketplace operations manager (day-to-day) | Approve/reject/suspend/reinstate vendors + products; configure operational limits (pricing, category restrictions, vendor caps); monitor orders/returns/disputes/settlements/reports; override vendor actions cho compliance/dispute (BR-005 → BR-008) | Vendor moderation (BR-026, BR-030, BR-031); Product approval (BR-038); Pricing governance (BR-050 → BR-052); Promotions/Coupons (BR-053 → BR-058); Commission config (BR-082 → BR-088); Return overrides (BR-078); Reports (BR-007, BR-090 → BR-091, BR-102) |
| Vendor (Individual / Business) | Approved seller; manages own store, products, orders | Maintain store profile; manage product listings (subject to approval); view/process vendor-specific orders; track earnings/commissions/settlement history (BR-009 → BR-012) | Vendor onboarding (BR-023 → BR-025); Store profile (BR-027, BR-028); Staff sub-accounts (BR-029); Product CRUD + bulk CSV (BR-035 → BR-037, BR-039); Order fulfillment (BR-072); Returns review (BR-078) |
| Vendor Staff | Sub-account under Vendor (Store Manager / Staff roles) | Limited to vendor-owned data; role-based permissions configurable by Admin (BR-013 → BR-015, RULE-049, RULE-050) | Product / Order / Inventory management on vendor's behalf |
| Customer (Buyer) | End consumer; registered hoặc guest | Register/login/social login/guest checkout (BR-016, BR-019 → BR-021); browse/search/filter/compare/wishlist (BR-017, BR-092); place order/track delivery/request return/manage loyalty points (BR-018) | Browse + cart (BP-003); Checkout (BP-003); Order tracking (BP-004); Returns (BP-005); Loyalty (BP-007); Reviews (BR-093) |
| System | Automated platform logic | Enforce rules, calculate commissions, manage inventory, send notifications (BR-019 → BR-022, BR-040 → BR-046, BR-059 → BR-071, BR-075 → BR-076, BR-079 → BR-081, BR-088, BR-097 → BR-101) | OTP delivery (RULE-051, RULE-052); Cart split (BR-069); Stock validation (BR-064); Commission freeze + calc (RULE-021); Settlement auto-trigger (RULE-062); Abandoned cart email (RULE-059); ERP sync (RULE-063) |

## 5. System Overview

Nền tảng marketplace multi-vendor với **3 site/portal** phục vụ Customer (buyers), Vendor (sellers + staff), Admin (Super Admin + Admin). Cấu trúc functional gồm **8 modules** (BP-001 → BP-008): Vendor Onboarding & Verification, Product Listing & Approval, Customer Order & Checkout, Order Fulfillment & Status, Returns & Refunds, Commission & Settlement, Customer Loyalty, ERP Integration.

**External integrations:**
- **Stripe** — sole payment gateway cho checkout (RULE-054).
- **Email service** — OTP delivery + transactional notifications (RULE-052).
- **SFTP/CSV ERP sync** — scheduled flat-file exchange với vendor ERPs (RULE-063).

**Tech stack / architecture diagram / infrastructure:** _<Pending — see Q-007>_

### Sites

| Full name | Abbreviation |
|---|---|
| Customer | Cust |
| Vendor | Vend |
| Admin | Admi |

### QC Dashboard

- Path: [qc-dashboard.md](./qc-dashboard.md) — 75 UCs across 8 modules, sync'd 2026-05-12.

_[AI-proposed | confidence: 40% | evidence: business-processes.md BP-001 → BP-008; requirement-traceability.md §2 (RULE-052, RULE-054, RULE-063); site-abbreviations.md; qc-dashboard.md (2026-05-12)]_

## 6. Requirement Sources

| Source | Location | Notes |
|---|---|---|
| PRD/BRD/User stories | `docs/multivendor-ecommerce-requirements.pdf` (Xiteb SRS – Multivendor eCommerce Platform, 19 trang) | Nguồn gốc BR-001 → BR-099; ingested 2026-04-10 |
| Wireframe/Figma | `docs/QC lead/High-level files/wireframes-product-listing-v1.md` (v1, 2026-04-15) | **CHỈ có wireframe cho Product Listing module**; `wireframes-vendor-onboarding.md` referenced nhưng KHÔNG tồn tại (Q-006); Figma URL trong `project-config.md` §2 vẫn placeholder (Q-009) |
| API spec | _<Pending — see Q-008>_ | Swagger / Postman link trong `project-config.md` §2 vẫn placeholder |
| Business rules | `docs/QC lead/High-level files/requirement-traceability.md` (v2026-04-13): **103 BR + 71 RULE**. 58 COMMON-* được summarized trong `project-context_20260505_v1.md` §2 (file gốc `common-rules.md` không có trong `High-level files/` folder) | — |
| Change log | `business-processes.md` Changelog; `requirement-traceability.md` Changelog; `meeting-transcript-1104.md` (QA-001 → QA-020); `Vendor Onboarding QA Answers.csv` (QA-021 → QA-034) | — |

_[AI-proposed | confidence: 60% | evidence: project-context_20260505_v1.md §6 + §8; business-processes.md changelog; requirement-traceability.md changelog]_

## 7. Quality Context

- **Critical business flows:**
  - Vendor registration (UC-VOB-001 → UC-VOB-004) — engagement focus.
  - Multi-vendor checkout với cart split + coupon stacking per sub-order (BP-003, RULE-057).
  - 8-state order fulfillment lifecycle: Pending → Processing → Ready to Ship → Shipped → Delivered → Completed; terminal Cancelled / Returned and Refunded (BP-004, RULE-058).
  - Return & refund với evidence upload (BP-005, RULE-061).
  - Commission calculation + automated settlement (BP-006, RULE-018 → RULE-022, RULE-062).

- **High-risk areas:**
  - **Payment integration:** Stripe sole gateway (RULE-054) — single point of failure.
  - **Commission accuracy:** margin vs markup + discount funding split (RULE-018 → RULE-025); frozen at checkout (RULE-021).
  - **KYC verification:** Admin approval mandatory (RULE-004); document upload validation (RULE-003, RULE-053).
  - **Automated settlement via API** (RULE-062).
  - **Backend aggregated validation** cho registration wizard — toàn bộ errors gộp 1 response (RULE-071).
  - **Cost price visibility:** Admin-only (RULE-022), vendor self-entry vẫn cho phép.

- **NFR notes:**
  - **Accessibility:** WCAG AA contrast 4.5:1 (COMMON-046); keyboard navigable (COMMON-047); aria-label (COMMON-048, COMMON-051); alt text (COMMON-049); focus indicator (COMMON-050).
  - **Performance:** loading spinner cho async > 300ms (COMMON-012); upload progress indicator > 1MB (COMMON-037); toast auto-dismiss 5s (COMMON-013). Performance targets cụ thể (response time, throughput, concurrent users): _<Pending — see Q-010>_.
  - **Security:** session timeout 30 phút global (COMMON-042); wizard timeout 30-60 phút (RULE-070); password policy 8+ chars + 1 upper / 1 lower / 1 digit / 1 special (COMMON-041); OTP cho login new-device / password reset / vendor bank payout update (RULE-051).
  - **Compatibility:** Chrome desktop only (theo §8).
  - **Logging:** immutable financial audit logs (RULE-029, RULE-030); all verification + moderation actions logged (RULE-005, RULE-010).

- **Known constraints:** Stripe = sole gateway; SMS OTP không support; no collection point delivery; cost price Admin-only; doc upload PDF / 5MB max; return evidence JPEG/PNG max 3 images / 5MB each.

- **Compliance regulations:** _<Pending — see Q-011>_

_[AI-proposed | confidence: 55% | evidence: requirement-traceability.md §2 (COMMON / RULE); business-processes.md BP-001 → BP-008; project-context_20260505_v1.md §2]_

## 8. Environment Context

- **Platform Coverage:**
  - **Browser:** Chrome (latest 2 stable versions).
  - **OS:** Windows 10/11.
  - **Device:** Desktop only — **không test mobile / tablet**.
  - **Screen sizes:** Desktop 1280px – 1920px (Full HD primary).

- **Test environments:** Dự án **chưa start** — môi trường (DEV / QA-Staging / UAT / PROD) sẽ được provision khi infrastructure setup. URLs trong `project-config.md` §3 hiện vẫn là placeholder (see Q-012).

_[AI-proposed | confidence: 20% | evidence: project-config.md §3; user input 2026-05-11]_

## 9. QC Process Notes

- **Test levels:** Functional, Integration, End-to-End (E2E), Regression, Performance, Security.

- **Entry criteria** (mỗi bước QC consume output của bước trước làm input):
  - Test cases design: cần output `qc-uc-read` (uc-review-report đạt status `Ready`).
  - Test execution: cần test cases đã được design (output `qc-func-tc-design`).

- **Exit criteria:**
  - 100% Test cases executed.
  - 0 Critical / Blocker defect.
  - ≥ 95% pass rate.
  - No High / Medium test cases failed.

- **Defect workflow:**
  - Tracking tool: **Jira**.
  - Severity levels: **Blocker / Critical / Major / Minor**.

- **Reporting expectations:**
  - Cadence: **Weekly**.
  - Format / audience: human-managed — QC Lead chịu trách nhiệm trực tiếp; không auto-generate.

## 10. Open Questions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| Q-001 | Project ID và Release Version chưa được định nghĩa | §1 — thiếu reference chuẩn để cross-link giữa các tài liệu và ticket | PM / PO | Open |
| Q-002 | Business problem/pain point và success criteria (KPI/metric) chưa được định nghĩa | §2 — thiếu mục tiêu đo lường, khó định nghĩa release sign-off | PM / PO | Open |
| Q-003 | MVP/release scope cho v1.0 — 8 modules nào sẽ include trong release đầu? | §3 — ảnh hưởng test planning + resource allocation | PM / PO | Open |
| Q-004 | Geographic/market scope (single country? multi-currency? — wireframe có LKR) | §3 — ảnh hưởng test data, currency, i18n testing | PM / PO | Open |
| Q-005 | Password creation step không xuất hiện trong UC-VOB-001 → UC-VOB-004 (PCTX-2) — vendor set credentials tại điểm nào? | §3 — gap trong vendor onboarding flow | BA | Open |
| Q-006 | `wireframes-vendor-onboarding.md` referenced nhưng không tồn tại (PCTX-4) | §6 — UC-VOB-001 → UC-VOB-004 không có wireframe để test design | BA | Open |
| Q-007 | Tech stack + architecture diagram chưa available trong common files | §5 — không rõ FE/BE framework, database, hosting, cloud provider | Tech Lead | Open |
| Q-008 | API spec / Swagger / Postman link chưa available | §6 — Integration test sẽ thiếu reference contract | BA / Dev | Open |
| Q-009 | Confluence / Jira / Figma URLs thực — `project-config.md` §2 vẫn placeholder | §6 — không có path truy cập design + ticket tracking | PM / PO | Open |
| Q-010 | Performance targets (response time, throughput, concurrent users) chưa định nghĩa | §7 — không có NFR baseline cho Performance Testing | Tech Lead | Open |
| Q-011 | Compliance regulations áp dụng (GDPR / PCI-DSS for Stripe / KYC)? | §7 — ảnh hưởng Security Testing scope | Legal / PO | Open |
| Q-012 | Test environment URLs (DEV/QA/UAT/PROD) sẽ được provision khi nào và bởi ai? | §8 — chưa có env để execute test (dự án chưa start) | DevOps / PM | Open |
