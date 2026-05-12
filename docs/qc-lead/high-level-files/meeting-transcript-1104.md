### **Meeting Transcript: System Requirements Finalization **
**Participants:** * **Khanh (Business Analyst - BA):** Guiding the requirements gathering.
* **Sarah (Product Owner - PO):** Providing the business decisions.

**[Recording Starts]**

**Alex (BA):** Hi Sarah, thanks for joining. We have a list of 20 open items across different modules of the marketplace. Let’s knock them out. I’ve grouped them by category to make it easier. Let's start with **Security and Verification**. First `[QA-001]`, which specific actions require a One-Time Password (OTP) from the user? 
**Sarah (PO):** Let's require OTPs for three things: logging in from a new, unrecognized device; resetting a password; and whenever a Vendor tries to update their bank payout details. 

**Alex (BA):** Got it. And for those OTPs `[QA-002]`, are we sending them via email, SMS, or both?
**Sarah (PO):** **Email only.** We will not support SMS OTPs right now to simplify the flow and manage costs.

**Alex (BA):** Understood. While we're on verification `[QA-003]`, when vendors upload their business registration documents (PDFs), what should the file size limit be?
**Sarah (PO):** Let's cap it at **5MB per document**. That’s plenty for a standard scanned PDF and will save us storage costs.

**Alex (BA):** Perfect. Let's move to **Payments and Finances**. `[QA-004]` Which payment gateway provider are we integrating for customer checkouts?
**Sarah (PO):** We will integrate strictly with **Stripe**. No other gateways for this phase.

**Alex (BA):** Noted. And regarding vendor payouts `[QA-012]`, how do we initiate settlements? 
**Sarah (PO):** This needs to be **automated based on admin configurations**. The system should allow Admins to set a settlement schedule—like weekly, bi-weekly, or monthly and the system will automatically trigger the bank transfers via API based on that schedule.

**Alex (BA):** Makes sense. Let's shift to **Vendor and Product Management**. `[QA-005]` When does a product status change to "Archived"? 
**Sarah (PO):** It should be **Vendor-initiated**. If they stop carrying a product, they can archive it to hide it from the storefront. Admins can also force-archive a product if it violates our terms. It shouldn't happen automatically just because stock hits zero.

**Alex (BA):** Okay. And for pricing rules `[QA-018]`, do we set minimum/maximum prices or maximum discount limits globally, or can we configure them per vendor?
**Sarah (PO):** Set those governance rules **globally per product category**. For example, all vendors selling in "Electronics" face the same maximum discount limit to prevent crazy price wars. 

**Alex (BA):** Got it. Regarding the vendor's storefront `[QA-019]`, if they want to change their store name, logo, or bio, do they need Admin approval every single time?
**Sarah (PO):** No, that's too much bottleneck for us. **Full approval is only required on the initial registration**. Once approved, they can update their logo and bio freely. We’ll just have a post-moderation dashboard where Admins can review recent changes.

**Alex (BA):** Moving to **Promotions and Loyalty**. `[QA-006]` & `[QA-007]` How are we handling coupon creation and stacking? 
**Sarah (PO):** We need to clearly separate **Platform Coupons** (created by Admins) and **Vendor Coupons** (created by Vendors). Here is how it should work: If a customer adds products from different vendors into one cart, the checkout system must divide that cart into **sub-orders** per vendor. For *each* sub-order, the customer is allowed to apply exactly one Platform Coupon and one Vendor Coupon.

**Alex (BA):** Excellent, so up to two coupons per sub-order based on the type. For the Loyalty Points program `[QA-014]` regarding redemption restrictions, and `[QA-015]` regarding point expiration, what are the rules?
**Sarah (PO):** Actually, I need to review the entire loyalty program mechanics again with the marketing team. Please mark both of those loyalty questions as **unanswered/pending** for now. I'll get back to you.

**Alex (BA):** Will do. Let's look at the **Order Lifecycle**. `[QA-008]` What are the exact order statuses from start to finish?
**Sarah (PO):** It should follow this flow:
1. **Pending** (System sets this when order is placed).
2. **Processing** (Vendor accepts).
3. **Ready to Ship** (Vendor packs it).
4. **Shipped** (Handed over to logistics).
5. **Delivered** (Dropped off to customer).
6. **Completed** (Automatically set after the return window closes).
7. **Cancelled** (If the user or vendor cancels the order before it ships).
8. **Returned and Refunded** (When an order successfully goes through the return and refund flow).

**Alex (BA):** Perfect clarity there. Regarding delivery options `[QA-010]`, if a customer wants to pick up their item, how do collection points work?
**Sarah (PO):** **We do not allow collection point deliveries.** Customers must provide a specific, direct home or office address for delivery. Remove collection points from the scope.

**Alex (BA):** And for vendors using their own backend software `[QA-013]`, which ERPs are we integrating with, and how?
**Sarah (PO):** For launch, we will support standard **scheduled CSV flat-file syncs via SFTP** for inventory and orders. This covers most legacy ERPs without requiring custom API builds for every vendor.

**Alex (BA):** Let's wrap up with **Customer Experience and Reporting**. `[QA-009]` How are we handling abandoned carts?
**Sarah (PO):** If a cart sits idle for **2 hours**, the system should trigger an **automated email notification** reminding them to check out.

**Alex (BA):** For customer communications `[QA-016]`, which WhatsApp setup are we using for order alerts?
**Sarah (PO):** Similar to the loyalty points, I need to evaluate the pricing on this. Mark the WhatsApp integration as **unanswered/pending** for now.

**Alex (BA):** When a customer wants to return an item `[QA-011]`, do we restrict the evidence images they upload?
**Sarah (PO):** Yes. **JPEG or PNG only, maximum 3 images, and up to 5MB each**.

**Alex (BA):** If the purchase was successful, what is the time limit for them to leave a review `[QA-020]`?
**Sarah (PO):** They have a window of **30 days** after the order status hits "Delivered" to leave a product review. After that, the option is locked.

**Alex (BA):** Last question `[QA-017]`. For the Admin "Total Orders Report," what filter parameters do we need?
**Sarah (PO):** I need to filter by **Date Range, Vendor Name, Order Status, and Payment Status**. 

**Alex (BA):** Excellent. I’ve updated my notes with those rule changes and marked the pending items. I’ll push this to the engineering team. Thanks, Sarah.

**Sarah (PO):** You’re welcome. Talk soon!

**[Recording Ends]**