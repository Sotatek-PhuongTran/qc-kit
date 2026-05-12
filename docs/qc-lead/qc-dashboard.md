# QC Dashboard

> **Source of truth** cho trạng thái tất cả features/use cases của dự án.
>
> **Ownership:**
> - `qc-context-master` quản lý cột: `Site`, `Use Case ID`, `Module`, `Feature/Use case name`, `In scope?`
> - `qc-dashboard-sync` quản lý cột: `Specs stt`, `WF stt`, `Test scenario stt`, `Test cases stt`
> - Cột `Execute stt` hiện đang pending (chưa có skill quản lý — để trống).
>
> **DO NOT delete rows.** Feature/UC bị remove khỏi WBS sẽ được đánh `In scope? = Removed` (soft-delete).

| Site | Use Case ID | Module | Feature/Use case name | In scope? | Specs stt | WF stt | Test scenario stt | Test cases stt | Execute stt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Admi | UC-CLY-005 | Customer Loyalty | Configure Loyalty Rules | Yes |  |  |  |  |  |
| Admi | UC-CMS-001 | Commission & Settlement | Configure Commission Rules | Yes |  |  |  |  |  |
| Admi | UC-CMS-002 | Commission & Settlement | Freeze Commission at Checkout | Yes |  |  |  |  |  |
| Admi | UC-CMS-004 | Commission & Settlement | Configure Discount Funding | Yes |  |  |  |  |  |
| Admi | UC-CMS-007 | Commission & Settlement | Configure Settlement Schedule | Yes |  |  |  |  |  |
| Admi | UC-CMS-010 | Commission & Settlement | View Financial Audit Logs | Yes |  |  |  |  |  |
| Admi | UC-COC-008 | Customer Order & Checkout | Configure Pricing Governance | Yes |  |  |  |  |  |
| Admi | UC-COC-009 | Customer Order & Checkout | Manage Promotions and Coupons | Yes |  |  |  |  |  |
| Admi | UC-OFS-009 | Order Fulfillment & Status | View Order List (Admin) | Yes |  |  |  |  |  |
| Admi | UC-OFS-010 | Order Fulfillment & Status | Configure Cancellation Reasons | Yes |  |  |  |  |  |
| Admi | UC-PLA-004 | Product Listing & Approval | View Product List | Yes |  |  |  |  |  |
| Admi | UC-PLA-005 | Product Listing & Approval | View Product Detail | Yes |  |  |  |  |  |
| Admi | UC-PLA-006 | Product Listing & Approval | Approve Product Listing | Yes |  |  |  |  |  |
| Admi | UC-PLA-007 | Product Listing & Approval | Reject Product Listing | Yes |  |  |  |  |  |
| Admi | UC-PLA-011 | Product Listing & Approval | Manage Product Categories | Yes |  |  |  |  |  |
| Admi | UC-RRF-006 | Returns & Refunds | Override Return Decision (Admin) | Yes |  |  |  |  |  |
| Admi | UC-RRF-010 | Returns & Refunds | Configure Return Policy | Yes |  |  |  |  |  |
| Admi | UC-VOB-005 | Vendor Onboarding & Verification | View Vendor List | Yes |  |  |  |  |  |
| Admi | UC-VOB-006 | Vendor Onboarding & Verification | View Vendor Detail | Yes |  |  |  |  |  |
| Admi | UC-VOB-007 | Vendor Onboarding & Verification | Approve Vendor | Yes |  |  |  |  |  |
| Admi | UC-VOB-008 | Vendor Onboarding & Verification | Reject Vendor | Yes |  |  |  |  |  |
| Admi | UC-VOB-009 | Vendor Onboarding & Verification | Request Vendor Re-verification | Yes |  |  |  |  |  |
| Admi | UC-VOB-010 | Vendor Onboarding & Verification | Suspend Vendor | Yes |  |  |  |  |  |
| Admi | UC-VOB-011 | Vendor Onboarding & Verification | Reinstate Vendor | Yes |  |  |  |  |  |
| Admi | UC-VOB-012 | Vendor Onboarding & Verification | Manage Vendor Agreement | Yes |  |  |  |  |  |
| Cust | UC-CLY-001 | Customer Loyalty | Earn Loyalty Points | Yes |  |  |  |  |  |
| Cust | UC-CLY-002 | Customer Loyalty | View Loyalty Points Balance | Yes |  |  |  |  |  |
| Cust | UC-CLY-003 | Customer Loyalty | Redeem Loyalty Points at Checkout | Yes |  |  |  |  |  |
| Cust | UC-CLY-004 | Customer Loyalty | Reverse Loyalty Points on Refund | Yes |  |  |  |  |  |
| Cust | UC-CLY-006 | Customer Loyalty | Process Points Expiry | Yes |  |  |  |  |  |
| Cust | UC-COC-001 | Customer Order & Checkout | Browse and Search Products | Yes |  |  |  |  |  |
| Cust | UC-COC-002 | Customer Order & Checkout | Add Product to Cart | Yes |  |  |  |  |  |
| Cust | UC-COC-003 | Customer Order & Checkout | View and Manage Cart | Yes |  |  |  |  |  |
| Cust | UC-COC-004 | Customer Order & Checkout | Proceed to Checkout | Yes |  |  |  |  |  |
| Cust | UC-COC-005 | Customer Order & Checkout | Apply Coupons | Yes |  |  |  |  |  |
| Cust | UC-COC-006 | Customer Order & Checkout | Select Payment Method | Yes |  |  |  |  |  |
| Cust | UC-COC-007 | Customer Order & Checkout | Confirm and Place Order | Yes |  |  |  |  |  |
| Cust | UC-COC-010 | Customer Order & Checkout | Send Abandoned Cart Notification | Yes |  |  |  |  |  |
| Cust | UC-OFS-005 | Order Fulfillment & Status | Confirm Delivery | Yes |  |  |  |  |  |
| Cust | UC-OFS-006 | Order Fulfillment & Status | Auto-Complete Order | Yes |  |  |  |  |  |
| Cust | UC-OFS-007 | Order Fulfillment & Status | Track Order (Customer) | Yes |  |  |  |  |  |
| Cust | UC-OFS-008 | Order Fulfillment & Status | Cancel Order Before Shipment | Yes |  |  |  |  |  |
| Cust | UC-RRF-001 | Returns & Refunds | Initiate Return Request | Yes |  |  |  |  |  |
| Cust | UC-RRF-002 | Returns & Refunds | Validate Return Eligibility | Yes |  |  |  |  |  |
| Cust | UC-RRF-008 | Returns & Refunds | Process Refund | Yes |  |  |  |  |  |
| Vend | UC-CMS-003 | Commission & Settlement | Calculate Order Commission | Yes |  |  |  |  |  |
| Vend | UC-CMS-005 | Commission & Settlement | Apply Discount Funding to Commission | Yes |  |  |  |  |  |
| Vend | UC-CMS-006 | Commission & Settlement | Calculate Settlement | Yes |  |  |  |  |  |
| Vend | UC-CMS-008 | Commission & Settlement | Process Automated Settlement | Yes |  |  |  |  |  |
| Vend | UC-CMS-009 | Commission & Settlement | View Vendor Earnings Dashboard | Yes |  |  |  |  |  |
| Vend | UC-ERP-001 | ERP Integration | Configure ERP Sync Settings | Yes |  |  |  |  |  |
| Vend | UC-ERP-002 | ERP Integration | Export Data to Vendor ERP | Yes |  |  |  |  |  |
| Vend | UC-ERP-003 | ERP Integration | Import Data from Vendor ERP | Yes |  |  |  |  |  |
| Vend | UC-ERP-004 | ERP Integration | View ERP Sync Status | Yes |  |  |  |  |  |
| Vend | UC-OFS-001 | Order Fulfillment & Status | View Sub-Order (Vendor) | Yes |  |  |  |  |  |
| Vend | UC-OFS-002 | Order Fulfillment & Status | Accept Sub-Order | Yes |  |  |  |  |  |
| Vend | UC-OFS-003 | Order Fulfillment & Status | Mark Order Ready to Ship | Yes |  |  |  |  |  |
| Vend | UC-OFS-004 | Order Fulfillment & Status | Hand Over to Logistics | Yes |  |  |  |  |  |
| Vend | UC-OFS-011 | Order Fulfillment & Status | Send Order Notification | Yes |  |  |  |  |  |
| Vend | UC-PLA-001 | Product Listing & Approval | Create Product Listing | Yes |  |  |  |  |  |
| Vend | UC-PLA-002 | Product Listing & Approval | Edit Product Listing | Yes |  |  |  |  |  |
| Vend | UC-PLA-003 | Product Listing & Approval | Submit Product for Approval | Yes |  |  |  |  |  |
| Vend | UC-PLA-008 | Product Listing & Approval | Archive Product | Yes |  |  |  |  |  |
| Vend | UC-PLA-009 | Product Listing & Approval | Bulk Import Products via CSV | Yes |  |  |  |  |  |
| Vend | UC-PLA-010 | Product Listing & Approval | Export Products to CSV | Yes |  |  |  |  |  |
| Vend | UC-RRF-003 | Returns & Refunds | View Return Request (Vendor) | Yes |  |  |  |  |  |
| Vend | UC-RRF-004 | Returns & Refunds | Approve Return Request | Yes |  |  |  |  |  |
| Vend | UC-RRF-005 | Returns & Refunds | Reject Return Request | Yes |  |  |  |  |  |
| Vend | UC-RRF-007 | Returns & Refunds | Verify Returned Item | Yes |  |  |  |  |  |
| Vend | UC-RRF-009 | Returns & Refunds | Reverse Vendor Earnings and Loyalty Points | Yes |  |  |  |  |  |
| Vend | UC-VOB-001 | Vendor Onboarding & Verification | Submit Vendor Registration | Yes |  |  |  |  |  |
| Vend | UC-VOB-002 | Vendor Onboarding & Verification | Upload Verification Documents | Yes |  |  |  |  |  |
| Vend | UC-VOB-003 | Vendor Onboarding & Verification | Accept Vendor Agreement | Yes |  |  |  |  |  |
| Vend | UC-VOB-004 | Vendor Onboarding & Verification | Validate Registration Submission | Yes |  |  |  |  |  |
| Vend | UC-VOB-013 | Vendor Onboarding & Verification | Update Vendor Store Profile | Yes |  |  |  |  |  |

---

## Ghi chú trạng thái

- **Site:** Portal/site mà feature/UC thuộc về (vd: Admin, Vendor, User, App, Web...).
- **Use Case ID:** Định danh duy nhất. Tên cột này adapt theo cách dự án gọi (`Use Case ID`, `Feature ID`, `Story ID`, ...). **Giá trị phải khớp folder name** trong các path artifact (vd: nếu giá trị là `UC-VOB-001` thì có folder `docs/.../UC-VOB-001/`) để `qc-dashboard-sync` quét status được.
- **Module:** Module / nhóm chức năng.
- **Feature/Use case name:** Tên human-readable.
- **In scope?:** `Yes` (đang trong scope) / `No` (out of scope hiện tại) / `Removed` (đã từng có nhưng bị remove khỏi WBS — soft-delete).
- **Specs stt:** `Missing` / `V<N> existed` (N = phiên bản cao nhất tìm thấy trong folder spec).
- **WF stt:** `Missing` / `V<N> existed` (dựa trên file wireframe/UI trong folder spec).
- **Test scenario stt:** `Missing` / `V<N> existed`.
- **Test cases stt:**
  - `Missing` — chưa có draft.md cũng chưa có .xlsx.
  - `V<N> missing .xlsx file` — có draft.md cho V<N>: chưa convert sang .xlsx.
  - `V<N> existed` — có cả draft.md và .xlsx cho V<N>.
- **Execute stt:** Pending (chưa có skill quản lý — placeholder).
