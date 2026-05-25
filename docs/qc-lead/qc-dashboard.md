# QC Dashboard

> **Source of truth** cho trạng thái artifact của tất cả features/use cases trong dự án.
>
> **Ownership:**
> - `qc-dashboard-sync` — **owner duy nhất** của file này. Quản lý cột: `Site`, `Use Case ID`, `Folder ID`, `Module`, `Feature/Use case name`, `In scope?`, `Files stt`. Tạo file từ template khi chưa có; tự thêm row khi phát hiện folder UC mới qua bottom-up; KHÔNG tự quyết định `In scope?` (chỉ copy từ site-map handoff hoặc set `Need confirm` cho bottom-up).
> - `qc-uc-read` quản lý cột: `UC review stt`.
> - `qc-func-scenario-design` quản lý cột: `Scenario design stt`.
> - `qc-func-tc-design` quản lý cột: `TC design stt`.
> - `qc-site-map` là nguồn duy nhất quyết định feature list + In scope? (qua handoff `site-map-handoff.md` và Mode 3 reconcile của orphans).
> - `qc-context-master` produce project context (KHÔNG tự ghi vào dashboard).
>
> **Cột optional (skill tự inject khi chạy lần đầu, không có sẵn trong baseline):**
> - `UI extract stt` — owner: `qc-ui-extract`. Khi skill chạy mà không thấy cột → tự insert ngay sau `TC design stt` (hoặc trước `Execute stt` nếu đã có).
> - `Execute stt` — owner: future `qc-execute` skill (chưa có).
> - `qc-dashboard-sync` accept dashboard có 10/11/12 cột; preserve các cột optional verbatim.
>
> **DO NOT delete rows.** Feature/UC ra khỏi scope vẫn giữ row, user có thể edit `In scope?` về `No` thủ công nếu cần.

| Site | Use Case ID | Folder ID | Module | Feature/Use case name | In scope? | Files stt | UC review stt | Scenario design stt | TC design stt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Admi | UC-CLY-005 | UC-CLY-005 | Customer Loyalty | Configure Loyalty Rules | Yes |  |  |  |  |
| Admi | UC-CMS-001 | UC-CMS-001 | Commission & Settlement | Configure Commission Rules | Yes |  |  |  |  |
| Admi | UC-CMS-002 | UC-CMS-002 | Commission & Settlement | Freeze Commission at Checkout | Yes |  |  |  |  |
| Admi | UC-CMS-004 | UC-CMS-004 | Commission & Settlement | Configure Discount Funding | Yes |  |  |  |  |
| Admi | UC-CMS-007 | UC-CMS-007 | Commission & Settlement | Configure Settlement Schedule | Yes |  |  |  |  |
| Admi | UC-CMS-010 | UC-CMS-010 | Commission & Settlement | View Financial Audit Logs | Yes |  |  |  |  |
| Admi | UC-COC-008 | UC-COC-008 | Customer Order & Checkout | Configure Pricing Governance | Yes |  |  |  |  |
| Admi | UC-COC-009 | UC-COC-009 | Customer Order & Checkout | Manage Promotions and Coupons | Yes |  |  |  |  |
| Admi | UC-OFS-009 | UC-OFS-009 | Order Fulfillment & Status | View Order List (Admin) | Yes |  |  |  |  |
| Admi | UC-OFS-010 | UC-OFS-010 | Order Fulfillment & Status | Configure Cancellation Reasons | Yes |  |  |  |  |
| Admi | UC-PLA-004 | UC-PLA-004 | Product Listing & Approval | View Product List | Yes |  |  |  |  |
| Admi | UC-PLA-005 | UC-PLA-005 | Product Listing & Approval | View Product Detail | Yes |  |  |  |  |
| Admi | UC-PLA-006 | UC-PLA-006 | Product Listing & Approval | Approve Product Listing | Yes |  |  |  |  |
| Admi | UC-PLA-007 | UC-PLA-007 | Product Listing & Approval | Reject Product Listing | Yes |  |  |  |  |
| Admi | UC-PLA-011 | UC-PLA-011 | Product Listing & Approval | Manage Product Categories | Yes |  |  |  |  |
| Admi | UC-RRF-006 | UC-RRF-006 | Returns & Refunds | Override Return Decision (Admin) | Yes |  |  |  |  |
| Admi | UC-RRF-010 | UC-RRF-010 | Returns & Refunds | Configure Return Policy | Yes |  |  |  |  |
| Admi | UC-VOB-005 | UC-VOB-005 | Vendor Onboarding & Verification | View Vendor List | Yes |  |  |  |  |
| Admi | UC-VOB-006 | UC-VOB-006 | Vendor Onboarding & Verification | View Vendor Detail | Yes |  |  |  |  |
| Admi | UC-VOB-007 | UC-VOB-007 | Vendor Onboarding & Verification | Approve Vendor | Yes |  |  |  |  |
| Admi | UC-VOB-008 | UC-VOB-008 | Vendor Onboarding & Verification | Reject Vendor | Yes |  |  |  |  |
| Admi | UC-VOB-009 | UC-VOB-009 | Vendor Onboarding & Verification | Request Vendor Re-verification | Yes |  |  |  |  |
| Admi | UC-VOB-010 | UC-VOB-010 | Vendor Onboarding & Verification | Suspend Vendor | Yes |  |  |  |  |
| Admi | UC-VOB-011 | UC-VOB-011 | Vendor Onboarding & Verification | Reinstate Vendor | Yes |  |  |  |  |
| Admi | UC-VOB-012 | UC-VOB-012 | Vendor Onboarding & Verification | Manage Vendor Agreement | Yes |  |  |  |  |
| Cust | UC-CLY-001 | UC-CLY-001 | Customer Loyalty | Earn Loyalty Points | Yes |  |  |  |  |
| Cust | UC-CLY-002 | UC-CLY-002 | Customer Loyalty | View Loyalty Points Balance | Yes |  |  |  |  |
| Cust | UC-CLY-003 | UC-CLY-003 | Customer Loyalty | Redeem Loyalty Points at Checkout | Yes |  |  |  |  |
| Cust | UC-CLY-004 | UC-CLY-004 | Customer Loyalty | Reverse Loyalty Points on Refund | Yes |  |  |  |  |
| Cust | UC-CLY-006 | UC-CLY-006 | Customer Loyalty | Process Points Expiry | Yes |  |  |  |  |
| Cust | UC-COC-001 | UC-COC-001 | Customer Order & Checkout | Browse and Search Products | Yes |  |  |  |  |
| Cust | UC-COC-002 | UC-COC-002 | Customer Order & Checkout | Add Product to Cart | Yes |  |  |  |  |
| Cust | UC-COC-003 | UC-COC-003 | Customer Order & Checkout | View and Manage Cart | Yes |  |  |  |  |
| Cust | UC-COC-004 | UC-COC-004 | Customer Order & Checkout | Proceed to Checkout | Yes |  |  |  |  |
| Cust | UC-COC-005 | UC-COC-005 | Customer Order & Checkout | Apply Coupons | Yes |  |  |  |  |
| Cust | UC-COC-006 | UC-COC-006 | Customer Order & Checkout | Select Payment Method | Yes |  |  |  |  |
| Cust | UC-COC-007 | UC-COC-007 | Customer Order & Checkout | Confirm and Place Order | Yes |  |  |  |  |
| Cust | UC-COC-010 | UC-COC-010 | Customer Order & Checkout | Send Abandoned Cart Notification | Yes |  |  |  |  |
| Cust | UC-OFS-005 | UC-OFS-005 | Order Fulfillment & Status | Confirm Delivery | Yes |  |  |  |  |
| Cust | UC-OFS-006 | UC-OFS-006 | Order Fulfillment & Status | Auto-Complete Order | Yes |  |  |  |  |
| Cust | UC-OFS-007 | UC-OFS-007 | Order Fulfillment & Status | Track Order (Customer) | Yes |  |  |  |  |
| Cust | UC-OFS-008 | UC-OFS-008 | Order Fulfillment & Status | Cancel Order Before Shipment | Yes |  |  |  |  |
| Cust | UC-RRF-001 | UC-RRF-001 | Returns & Refunds | Initiate Return Request | Yes |  |  |  |  |
| Cust | UC-RRF-002 | UC-RRF-002 | Returns & Refunds | Validate Return Eligibility | Yes |  |  |  |  |
| Cust | UC-RRF-008 | UC-RRF-008 | Returns & Refunds | Process Refund | Yes |  |  |  |  |
| Vend | UC-CMS-003 | UC-CMS-003 | Commission & Settlement | Calculate Order Commission | Yes |  |  |  |  |
| Vend | UC-CMS-005 | UC-CMS-005 | Commission & Settlement | Apply Discount Funding to Commission | Yes |  |  |  |  |
| Vend | UC-CMS-006 | UC-CMS-006 | Commission & Settlement | Calculate Settlement | Yes |  |  |  |  |
| Vend | UC-CMS-008 | UC-CMS-008 | Commission & Settlement | Process Automated Settlement | Yes |  |  |  |  |
| Vend | UC-CMS-009 | UC-CMS-009 | Commission & Settlement | View Vendor Earnings Dashboard | Yes |  |  |  |  |
| Vend | UC-ERP-001 | UC-ERP-001 | ERP Integration | Configure ERP Sync Settings | Yes |  |  |  |  |
| Vend | UC-ERP-002 | UC-ERP-002 | ERP Integration | Export Data to Vendor ERP | Yes |  |  |  |  |
| Vend | UC-ERP-003 | UC-ERP-003 | ERP Integration | Import Data from Vendor ERP | Yes |  |  |  |  |
| Vend | UC-ERP-004 | UC-ERP-004 | ERP Integration | View ERP Sync Status | Yes |  |  |  |  |
| Vend | UC-OFS-001 | UC-OFS-001 | Order Fulfillment & Status | View Sub-Order (Vendor) | Yes |  |  |  |  |
| Vend | UC-OFS-002 | UC-OFS-002 | Order Fulfillment & Status | Accept Sub-Order | Yes |  |  |  |  |
| Vend | UC-OFS-003 | UC-OFS-003 | Order Fulfillment & Status | Mark Order Ready to Ship | Yes |  |  |  |  |
| Vend | UC-OFS-004 | UC-OFS-004 | Order Fulfillment & Status | Hand Over to Logistics | Yes |  |  |  |  |
| Vend | UC-OFS-011 | UC-OFS-011 | Order Fulfillment & Status | Send Order Notification | Yes |  |  |  |  |
| Vend | UC-PLA-001 | UC-PLA-001 | Product Listing & Approval | Create Product Listing | Yes |  |  |  |  |
| Vend | UC-PLA-002 | UC-PLA-002 | Product Listing & Approval | Edit Product Listing | Yes |  |  |  |  |
| Vend | UC-PLA-003 | UC-PLA-003 | Product Listing & Approval | Submit Product for Approval | Yes |  |  |  |  |
| Vend | UC-PLA-008 | UC-PLA-008 | Product Listing & Approval | Archive Product | Yes |  |  |  |  |
| Vend | UC-PLA-009 | UC-PLA-009 | Product Listing & Approval | Bulk Import Products via CSV | Yes |  |  |  |  |
| Vend | UC-PLA-010 | UC-PLA-010 | Product Listing & Approval | Export Products to CSV | Yes |  |  |  |  |
| Vend | UC-RRF-003 | UC-RRF-003 | Returns & Refunds | View Return Request (Vendor) | Yes |  |  |  |  |
| Vend | UC-RRF-004 | UC-RRF-004 | Returns & Refunds | Approve Return Request | Yes |  |  |  |  |
| Vend | UC-RRF-005 | UC-RRF-005 | Returns & Refunds | Reject Return Request | Yes |  |  |  |  |
| Vend | UC-RRF-007 | UC-RRF-007 | Returns & Refunds | Verify Returned Item | Yes |  |  |  |  |
| Vend | UC-RRF-009 | UC-RRF-009 | Returns & Refunds | Reverse Vendor Earnings and Loyalty Points | Yes |  |  |  |  |
| Vend | UC-VOB-001 | UC-VOB-001 | Vendor Onboarding & Verification | Submit Vendor Registration | Yes |  |  |  |  |
| Vend | UC-VOB-002 | UC-VOB-002 | Vendor Onboarding & Verification | Upload Verification Documents | Yes |  |  |  |  |
| Vend | UC-VOB-003 | UC-VOB-003 | Vendor Onboarding & Verification | Accept Vendor Agreement | Yes |  |  |  |  |
| Vend | UC-VOB-004 | UC-VOB-004 | Vendor Onboarding & Verification | Validate Registration Submission | Yes |  |  |  |  |
| Vend | UC-VOB-013 | UC-VOB-013 | Vendor Onboarding & Verification | Update Vendor Store Profile | Yes |  |  |  |  |

---

## Ghi chú trạng thái

- **Site:** Portal/site mà feature/UC thuộc về (vd: Admin, Vendor, User, App, Web...).
- **Use Case ID:** Định danh canonical của feature/UC theo site-map. Tên cột adapt theo cách dự án gọi (`Use Case ID`, `Feature ID`, `Story ID`, ...). Sau khi `qc-site-map` Mode 3 reconcile xong, đây là ID chính thức. **Giá trị phải khớp folder name** trong các path artifact (vd: nếu giá trị là `UC-VOB-001` thì có folder `docs/.../UC-VOB-001/`) để `qc-dashboard-sync` quét status được.
- **Folder ID:** ID/tên folder thực tế trên disk (do `qc-dashboard-sync` extract từ tên sub-folder khi scan). Dùng để map disk scan ↔ row.
  - Với row đi qua top-down chuẩn (folder name khớp canonical ID): `Folder ID` = `Use Case ID` (self-reference).
  - Với row alias (folder name khác canonical, đã được Mode 3 reconcile): `Folder ID` giữ tên folder gốc, `Use Case ID` được update về canonical từ site-map.
  - Với row bottom-up chưa reconcile: `Folder ID` = `Use Case ID` = ID extract từ folder (chờ Mode 3 reconcile).
- **Module:** Module / nhóm chức năng.
- **Feature/Use case name:** Tên human-readable (do site-map cung cấp; bottom-up để trống chờ user / Mode 3 cập nhật).
- **In scope?:** `Yes` (in scope) / `No` (out of scope) / `Need confirm` (chưa reconcile bởi site-map Mode 3 — sẽ tự cập nhật sau khi Mode 3 chạy). `qc-dashboard-sync` KHÔNG tự đổi giá trị này; user có thể edit thủ công bất cứ lúc nào.
- **Files stt:** Chỉ liệt kê các loại file artifact đã TÌM THẤY trên disk cho UC. Loại file Missing KHÔNG được ghi vào cell. Format trong cell: mỗi loại tìm thấy là 1 dòng `<Type>: V<N>`, các dòng nối bằng `<br>`, theo thứ tự cố định (skip loại nào không có):
  ```
  Specs: V<N>
  WF: V<N>
  Audited: V<N>
  Scenario: V<N>
  TC md: V<N>
  TC xlsx: V<N>
  ```
  Ví dụ rendered:
  - Có một số file: `Specs: V2<br>WF: V1<br>Scenario: V1<br>TC md: V2`
  - Đã scan nhưng không tìm thấy file nào: literal `No files yet`
  - Chưa từng scan (row mới chưa được sync): cell để trống.

  Mỗi item tham chiếu folder qua path-registry logical name, lookup folder bằng giá trị `Folder ID` của row:
  - `Specs` ← `requirement-files/<Folder ID>/` (file `.md/.docx/.pdf`, không kể image, không kể `_extracted_`)
  - `WF` ← `requirement-files/<Folder ID>/` (file image: `.png/.jpg/.fig/.svg/...`)
  - `Audited` ← `uc-review-report/<Folder ID>/` (file `*_audited_*.md`)
  - `Scenario` ← `func-test-scenarios/<Folder ID>/` (file có `_scenarios_` trong tên)
  - `TC md` ← `func-test-cases-draft/<Folder ID>/` (file `_testcases_*.md`)
  - `TC xlsx` ← `func-test-cases/<Folder ID>/` (file `_testcases_*_v<N>.xlsx`)
- **UC review stt:** Trạng thái run của `qc-uc-read`. Giá trị:
  - *(trống)* — chưa từng chạy `qc-uc-read`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `<Verdict> v<N> (Score X/100)` — đã review xong (ví dụ: `Conditionally Ready v2 (Score 73.1/100)`, `Ready v1 (Score 92/100)`, `Not Ready v1 (Score 45/100)`).
- **Scenario design stt:** Trạng thái run của `qc-func-scenario-design`. Giá trị:
  - *(trống)* — chưa từng chạy `qc-func-scenario-design`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `v<N> generated` — workflow chạy xong, tạo `V<N>`.
- **TC design stt:** Trạng thái run của `qc-func-tc-design`. Giá trị:
  - *(trống)* — chưa từng chạy `qc-func-tc-design`.
  - `Running — <phase friendly name>` — đang chạy phase đó.
  - `<phase friendly name> done` — vừa hoàn thành phase, chưa sang phase tiếp.
  - `v<N> generated` — workflow `generate-test-cases` chạy xong.
  - `v<N> updated` — workflow `update-test-cases` chạy xong.

### Cột optional (chỉ xuất hiện khi skill tương ứng đã chạy ít nhất 1 lần)

- **UI extract stt** (owner: `qc-ui-extract`): format `v<N> (audited v<M>)`; nếu nhiều page → `v<min> (audited v<M>) [Np]`. Tự được inject khi `qc-ui-extract` chạy lần đầu.
- **Execute stt** (owner: future `qc-execute` skill): placeholder; chưa có skill nào inject.

> **2026-05-25 — Schema migration**: dashboard migrate sang baseline 10-cột (`Site | Use Case ID | Folder ID | Module | Feature/Use case name | In scope? | Files stt | UC review stt | Scenario design stt | TC design stt`). Cột `Execute stt` được drop khỏi baseline — sẽ tự inject lại khi future `qc-execute` skill chạy. Cột `UI extract stt` cũng không có sẵn — `qc-ui-extract` sẽ tự inject khi chạy lần đầu. Tất cả cell `Files stt` hiện đang trống do chưa chạy `/qc-dashboard-sync` lần nào — chạy lệnh này để populate.
