# UC Readiness Review
**Functional / Black-box Test Readiness Template**

---

> **Tài liệu được review:**
> - `docs/BA/SRS-mobile/UC257_DangXuatMobile/UC257_DangXuatMobile.md` (v1)
> - `docs/BA/SRS-mobile/UC257_DangXuatMobile/UC257_DangXuatMobile_v2.md` (v2 — bản mới nhất)
> - `docs/BA/SRS-mobile/UC257_DangXuatMobile/Đăng xuất.png` (wireframe)
> - `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1.1)

---

## Feature Brief

**UC257 — Đăng xuất ứng dụng Mobile** là chức năng cho phép người dùng đã đăng nhập (cá nhân hoặc tổ chức) kết thúc phiên làm việc hiện tại trên ứng dụng di động. Người dùng truy cập nút "Đăng xuất" ở cuối màn hình Menu (Sidebar), hệ thống hiển thị Dialog xác nhận trước khi thực thi. Khi xác nhận, hệ thống gọi API đăng xuất để vô hiệu hóa token phiên và thu hồi Push Token trên server, đồng thời xóa sạch Token, User Info, Secure Storage, cache ảnh và file tạm nhạy cảm trên thiết bị, cuối cùng điều hướng về màn hình Đăng nhập. Nếu API thất bại (mất mạng/timeout), client vẫn xóa dữ liệu cục bộ và điều hướng để đảm bảo an toàn. Quy tắc xác nhận tuân theo CMR-10; hiệu năng mục tiêu dưới 2 giây.

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `72.7 / 100` | ⚡ **CONDITIONALLY READY** |

> QA có thể bắt đầu thiết kế test cho các luồng chính (Happy Path, Cancel, Fallback khi API lỗi), nhưng nhiều chi tiết về state của UI element, hành vi cạnh tranh (double-tap, back button), và quy tắc hiển thị loading cần được BA làm rõ song song.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC257 | Đăng xuất ứng dụng Mobile | v2 | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| huy.lai2 (Antigravity – Senior BA) | *(chưa ghi nhận)* ⚠️ | 2026-04-29 | 2026-05-08 |

---

## 1. Objective & Scope ✅

### 1.1 Objective
Cho phép người dùng đã đăng nhập kết thúc phiên làm việc hiện tại trên ứng dụng Mobile một cách an toàn: thu hồi token phiên và Push Token trên server, đồng thời xóa sạch dữ liệu nhạy cảm trên thiết bị trước khi điều hướng về màn hình Đăng nhập. Mục tiêu chính là bảo vệ danh tính người dùng và ngăn truy cập trái phép sau khi thoát phiên.

### 1.2 In Scope
- Hiển thị nút "Đăng xuất" tại cuối màn hình Menu (Sidebar).
- Hiển thị Dialog xác nhận đăng xuất (tuân thủ CMR-10).
- Gọi API thu hồi token phiên và Push Notification Token (FCM/APNS) trên server.
- Xóa dữ liệu cục bộ: Token, User Info, Secure Storage, cache ảnh, file tạm nhạy cảm.
- Điều hướng về màn hình Đăng nhập (UC256).
- Luồng fallback khi API đăng xuất thất bại (mất mạng/timeout).

### 1.3 Out of Scope
*(UC không ghi rõ — suy luận)* ⚡
- Đăng xuất tự động khi token hết hạn (CMR-07 đã quy định, không thuộc UC này).
- Đăng xuất do xóa app/cài đặt lại (CMR-18).
- Đăng xuất từ xa nhiều thiết bị (remote logout on all devices).
- Xác thực lại (re-authentication) trước khi logout.

> **Câu hỏi Q8** (Low): BA cần xác nhận "Out of Scope" để tránh khi test design vượt ra phạm vi không mong muốn.

---

## 2. Actors & Stakeholders ⚡

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Người dùng Cá nhân | Primary | Đã đăng nhập, có quyền tap nút "Đăng xuất" trong Sidebar, xác nhận/hủy dialog. |
| Người dùng Tổ chức (Doanh nghiệp) | Primary | Đã đăng nhập, có quyền tap nút "Đăng xuất" trong Sidebar, xác nhận/hủy dialog. |
| Hệ thống Server Xác thực | System | Nhận API call vô hiệu hóa token phiên và Push Token. |
| Push Notification Service (FCM/APNS) | External | *(UC không đề cập có gọi trực tiếp client SDK để unregister device token hay chỉ server thu hồi)* ⚡ |

> **Gap**: UC có đề cập "Cá nhân / Tổ chức (đã đăng nhập)" nhưng không nói hai vai trò có sự khác biệt về luồng đăng xuất hay không. Nếu không khác biệt, BA nên khẳng định rõ để QA không tạo test trùng lặp.

---

## 3. Preconditions & Postconditions ✅

### 3.1 Preconditions
- Người dùng đang ở trạng thái đã đăng nhập vào ứng dụng Mobile.
- Phiên làm việc (access token) còn hiệu lực hoặc đang trong thời hạn refresh token (theo CMR-07).
- Thiết bị có cài đặt app và người dùng đang ở trên Menu (Sidebar).

### 3.2 Postconditions

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Đăng xuất thành công (Happy Path) | Token phiên và Push Token bị vô hiệu hóa trên server; Token, User Info, cache ảnh và file tạm nhạy cảm bị xóa hoàn toàn khỏi thiết bị; app điều hướng về màn hình Đăng nhập (UC256). |
| Đăng xuất với API thất bại (Fallback) | Token server KHÔNG được vô hiệu hóa qua API (sẽ tự hết hạn theo TTL); dữ liệu cục bộ vẫn bị xóa sạch; app vẫn điều hướng về màn hình Đăng nhập. |
| Người dùng tap "Hủy" trên Dialog | Dialog đóng; phiên đăng nhập không thay đổi; người dùng vẫn ở màn hình Menu (Sidebar). |

---

## 4. UI Object Inventory & Mapping ⚡

> Dựa trên v2 đã được tinh gọn + bổ sung chi tiết từ v1 + quan sát wireframe (`Đăng xuất.png`).

### 4.1 Màn hình Menu (Sidebar)

| # | Component Name | Type | In UC (v2)? | In Wireframe? | Notes / Gap |
|---|---|---|---|---|---|
| 1 | Header hệ thống (logo FIA, tên ứng dụng) | Container | ✅ | ✅ | v2 tóm tắt; v1 mô tả chi tiết nền đỏ đậm + subtext "National Investment Gateway". ⚡ v2 không nói subtext có hiển thị không. |
| 2 | Avatar người dùng | Image | ✅ | ✅ | v1 ghi "ký tự đầu tên". ⚠️ Chưa có rule cho tên có 1 ký tự, tên có dấu, emoji, tên rỗng. |
| 3 | Tên người dùng | Label | ✅ | ✅ | ⚠️ Không có rule truncate/wrap khi tên quá dài. |
| 4 | Email người dùng | Label | ✅ | ✅ | ⚠️ Không có rule hiển thị khi email dài, không có email, hay email chứa ký tự đặc biệt. |
| 5 | Tiêu đề section "QUẢN LÝ TÀI KHOẢN" | Label | ✅ (ẩn trong v2) | ✅ | v2 chỉ ghi "(Các menu quản lý)" — gộp không chi tiết. |
| 6 | Menu "Tài khoản cá nhân" | Card (List item) | ⚡ | ✅ | v2 không liệt kê tap action rõ ràng cho từng menu. |
| 7 | Menu "Quản lý doanh nghiệp" | Card (List item) | ⚡ | ✅ | v2 không liệt kê tap action. ⚠️ Với người dùng Cá nhân, menu này có hiển thị không? |
| 8 | Menu "Đổi mật khẩu" | Card (List item) | ⚡ | ✅ | v2 không liệt kê tap action. |
| 9 | Menu "Cấu hình tài khoản" | Card (List item) | ⚡ | ✅ | v2 không liệt kê tap action. |
| 10 | Nút "Đăng xuất" | Button (Outline Danger) | ✅ | ✅ | v2: viền đỏ, chữ đỏ. ⚠️ Không ghi state Disabled/Loading khi đang gọi API. |
| 11 | Nút Quay lại / Đóng Sidebar | Button | ❌ | ? | Wireframe có gesture swipe/close? CMR-06 áp dụng? ⚡ |

### 4.2 Dialog Xác nhận Đăng xuất

| # | Component Name | Type | In UC (v2)? | In Wireframe? | Notes / Gap |
|---|---|---|---|---|---|
| D1 | Tiêu đề "Xác nhận đăng xuất" | Label | ✅ | *(chỉ đặc tả văn bản)* | Font đậm. |
| D2 | Nội dung thông báo | Label | ✅ | — | v2: *"Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Dữ liệu chưa lưu sẽ bị mất."* v1: chỉ ghi *"Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"* 🔴 **Conflict giữa v1 và v2** (v2 bổ sung "Dữ liệu chưa lưu sẽ bị mất."). |
| D3 | Nút "Đăng xuất" (xác nhận) | Button (Danger) | ✅ | — | v1 có ghi "focus vào Hủy" (CMR-10). ⚠️ Không có state Loading/Disabled khi đang gọi API. |
| D4 | Nút "Hủy" | Button (Secondary) | ✅ | — | Focus mặc định theo CMR-10. |
| D5 | Vùng overlay/backdrop ngoài dialog | Overlay | ❌ | — | ⚠️ Tap ra ngoài → đóng dialog hay không? Android Back button → đóng dialog hay exit? |
| D6 | Icon đóng (X) góc phải | Button | ❌ | — | ⚠️ Không có, hay có nhưng không ghi? |

### 4.3 CMR Cross-Check

| CMR | Áp dụng? | UC có tham chiếu? | Trạng thái |
|---|---|---|---|
| CMR-06 (Header & Điều hướng) | Có (Menu có nút quay lại/đóng?) | ❌ | ⚠️ Partial |
| CMR-07 (Xử lý lỗi chung) | Có (API fail, timeout, mất mạng) | ❌ (chỉ ghi "Fallback") | ⚠️ Partial — v2 không tham chiếu CMR-07 cụ thể |
| CMR-10 (Confirmation Dialog) | Có | ✅ (v2 ghi rõ, v1 ghi gián tiếp) | ✅ Complete |
| CMR-16 (API Performance) | Có (timeout API logout) | ❌ (v2 không ghi); v1 ghi "timeout 5s" 🔴 | 🔴 **Conflict với CMR-16 quy định 10s** |
| CMR-17 (Đa ngôn ngữ) | Có (text "Đăng xuất", "Xác nhận đăng xuất", "Hủy") | ❌ | ⚠️ Missing |
| CMR-18 (Debounce Navigation) | Có (nếu user tap Đăng xuất 2 lần rất nhanh) | ❌ | ⚠️ Missing |

---

## 5. Object Attributes & Behavior Definition ⚡

| Object / Component | System States | Interaction Matrix | Object Behavior (Data/State Change Context) |
|--------------------|---------------|--------------------|---------------------------------------------|
| Nút "Đăng xuất" (Sidebar) | Enabled mặc định. ⚠️ Không có định nghĩa trạng thái Loading/Disabled trong khi gọi API đăng xuất. | Tap → Mở Dialog xác nhận. ⚠️ Chưa có rule khi double-tap. | ⚠️ Không có rule: khi dialog đang mở, tap tiếp vào Sidebar có tác dụng gì? |
| Avatar | Enabled (nhưng read-only display). | ⚠️ Tap → Hành vi? (Có mở màn hình profile không, hay read-only?) | N/A |
| Tên người dùng | Read-only. | Không tap. | ⚠️ Khi tên dài → truncate / wrap? |
| Email người dùng | Read-only. | Không tap. | ⚠️ Khi email dài → truncate / wrap? |
| Các card menu (Tài khoản cá nhân, Doanh nghiệp, Đổi MK, Cấu hình) | Enabled. | Tap → Điều hướng. | ⚠️ Khi đăng xuất đang chạy, các card này có bị disable không? |
| Nút "Đăng xuất" (trong Dialog) | Enabled. ⚠️ Không có state Loading khi đang gọi API. | Tap → Thực hiện luồng 3.1. | ⚠️ Khi tap 2 lần rất nhanh, hệ thống có block duplicate call không? (CMR-18 áp dụng) |
| Nút "Hủy" (trong Dialog) | Enabled, **focus mặc định** (theo CMR-10). | Tap → Đóng dialog, giữ session. | Không có side-effect. |
| Tiêu đề & Nội dung Dialog | Read-only. | Không tap. | — |
| Overlay/Backdrop ngoài dialog | ⚠️ Không xác định. | ⚠️ Tap → Đóng dialog hay không? | — |

### Edge Case Checklist

**Group A — Extreme Data States:**
- ⚠️ Tên/email dài quá khung Sidebar → truncate/wrap rule: **KHÔNG có**.
- ⚠️ Avatar khi tên có ký tự đặc biệt (dấu tiếng Việt, số, emoji) → quy tắc rút ký tự đầu: **KHÔNG rõ**.
- ⚠️ Trường hợp thông tin hồ sơ trống (null/undefined) → placeholder hiển thị gì: **KHÔNG đề cập**.

**Group B — Network & API States:**
- ⚡ API đăng xuất chậm (> 5s): UC v1 ghi "quá 5s → fallback". CMR-16 quy định max 10s. 🔴 **Conflict**.
- ⚠️ Có hiển thị loading indicator (full screen hay spinner trên nút) trong khi gọi API không? **KHÔNG đề cập**.
- ⚠️ Nếu API 401 (session hết hạn trước khi logout) → chạy flow nào? (CMR-07 có rule 401, nhưng UC không nói)
- ⚠️ Nếu API trả 500 → có thông báo lỗi hay im lặng fallback? UC ghi "vẫn thực hiện bước 3&4" nhưng không nói có toast thông báo hay không.
- ⚠️ Duplicate API call (double-tap nút "Đăng xuất" trong dialog): **KHÔNG đề cập debounce**.

**Group C — Abnormal User Interactions:**
- ⚠️ Double-tap nút "Đăng xuất" (Sidebar) → Mở 2 dialog hay chỉ 1? CMR-18 áp dụng nhưng UC không tham chiếu.
- ⚠️ Android physical Back button khi Dialog mở → đóng dialog hay thoát app?
- ⚠️ Xoay màn hình landscape khi dialog mở → layout? (App có hỗ trợ landscape không?)
- ⚠️ Tap đồng thời 2 button trong dialog (multitouch) → Hành vi?

**Group D — Permissions & Session:**
- ⚡ Session đã hết hạn khi người dùng mở dialog xác nhận → tap "Đăng xuất": chạy fallback (vì API 401 sẽ fail) hay redirect login trước? **KHÔNG đề cập**.
- ✅ CMR-18: force close app không trigger logout (giữ session); uninstall mới force re-login. — UC không mâu thuẫn.
- ⚠️ Khi đang đăng xuất trên 1 thiết bị, session trên thiết bị khác có bị ảnh hưởng không?

**Group E — Internationalization (i18n):**
- ⚠️ Text "Đăng xuất", "Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất..." — khi chuyển ngôn ngữ (CMR-17): có thay đổi ngay không? Nội dung bản dịch chính thức các ngôn ngữ khác (EN, KR, JP, CN) là gì?
- ⚠️ Tên người dùng/email lấy từ API → CMR-17 nói "không thay đổi theo ngôn ngữ". OK.

---

## 6. Functional Logic & Workflow Decomposition ⚡

### 6.1 Function Name: Đăng xuất Ứng dụng Mobile

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|-------------------------|
| 1 | Người dùng | Tap nút "Đăng xuất" ở cuối Sidebar | Hiển thị Dialog xác nhận (tiêu đề + nội dung + 2 nút, focus "Hủy") | Alt-1: Tap ra ngoài dialog (overlay) → ⚠️ **KHÔNG xác định hành vi** | Err-1: ⚠️ **KHÔNG xác định** nếu session đã timeout ngay thời điểm tap |
| 2 | Người dùng | Tap "Hủy" trên Dialog | Đóng dialog, giữ nguyên phiên đăng nhập, trở về Sidebar | Alt-2: Nhấn Android Back button → ⚠️ **KHÔNG xác định** | — |
| 3 | Người dùng | Tap "Đăng xuất" (xác nhận) trên Dialog | (a) ⚠️ **KHÔNG xác định** có loading state không; (b) Gọi API vô hiệu hóa token + thu hồi Push Token | Alt-3: Double-tap nút → ⚠️ **KHÔNG xác định** có debounce | Err-2: API trả 401 (session đã hết) → ⚠️ **KHÔNG xác định** |
| 4 | Hệ thống | Nhận response thành công | Xóa Token, User Info, Secure Storage, cache ảnh, file tạm nhạy cảm | — | Err-3: API timeout > 5s (v1) hoặc > 10s (CMR-16) → Thực hiện bước 3&4 ở client để đảm bảo an toàn. 🔴 **Conflict thời gian timeout**. |
| 5 | Hệ thống | Điều hướng | Chuyển về màn hình Đăng nhập (UC256) | — | Err-4: Xóa local storage thất bại (permission, corrupt) → ⚠️ **KHÔNG đề cập** |

**B. Business Rules & Validations**

UC không có form nhập liệu, không có validation field. Các rule nghiệp vụ:

| Rule ID | Rule | Source |
|---|---|---|
| BR-257-01 | Phải hiển thị dialog xác nhận trước khi thực thi đăng xuất | UC257 v2 §3.1, CMR-10 |
| BR-257-02 | Dialog focus mặc định nút "Hủy" | CMR-10, UC257 v1 |
| BR-257-03 | Khi API logout thất bại, client vẫn xóa local token và điều hướng về Login | UC257 v2 §3.1.5, v1 §3.1 "Luồng ngoại lệ" |
| BR-257-04 | Thu hồi cả session token và Push Token trên server | UC257 v2 §3.1.2 |
| BR-257-05 | Xóa toàn bộ: Token, User Info, Secure Storage, cache ảnh, file tạm nhạy cảm | UC257 v2 §3.1.3 |
| BR-257-06 | Luồng đăng xuất phải hoàn tất dưới 2 giây | UC257 v2 §3.3 |
| BR-257-07 | Không để lại dữ liệu định danh trên LocalStorage sau đăng xuất | UC257 v2 §3.3 |
| BR-257-08 | ⚠️ Timeout API: UC v1 ghi 5s, CMR-16 ghi 10s | 🔴 **Conflict** |

**C. UI/UX Feedback**

- **Loading States:** ⚠️ **KHÔNG được đề cập**. CMR-07 quy định mọi API call phải có loading indicator. BA cần xác định:
  - Loading trên nút "Đăng xuất" (dialog) hay full screen overlay?
  - Có hiển thị progress indicator trong khi xóa local storage không?
- **Toast Messages:** ⚠️ **KHÔNG đề cập** có thông báo thành công khi đăng xuất không; khi về Login có hiển thị thông báo gì không.
  - Đặc biệt: khi fallback (API fail) → có toast không? Hay im lặng?
- **Error Codes:** ⚠️ **KHÔNG có mapping** giữa error code API (401/500/timeout) và thông báo UI.

---

## 7. Functional Integration Analysis ⚡

| Trigger Function / Action | Impact Analysis | Data Consistency Verification |
|---------------------------|-----------------|-------------------------------|
| Đăng xuất thành công | Chuyển về UC256 (Đăng nhập). Tất cả dữ liệu cá nhân trên Dashboard, Notification, Bookmark… phải bị xóa hoặc không thể truy cập. | Khi mở lại app, UC256 phải yêu cầu đăng nhập từ đầu (không auto-restore session). ⚠️ UC không ghi rõ tương tác với UC256. |
| Đăng xuất thành công | Thu hồi Push Token → các thông báo FCM/APNS gửi đến thiết bị này phải dừng. | ⚠️ Client có cần gọi FCM/APNS SDK để unregister token local không, hay chỉ server thu hồi? |
| Đăng xuất thành công | Nếu user đang có việc đang thực hiện (form đang điền, phản ánh đang nhập…) → **"Dữ liệu chưa lưu sẽ bị mất"** (theo dialog v2). | ⚠️ **KHÔNG rõ** những UC nào có khả năng bị mất dữ liệu. Cần BA liệt kê để QA test: VD UC53 Phản ánh đang nhập dở. |
| Đăng xuất khi đang có API call khác chạy nền | ⚠️ **KHÔNG đề cập** — có hủy các API call đang chạy nền không? Hay để chạy xong rồi mới logout? | — |
| Đăng xuất ở một thiết bị ≠ thiết bị khác cùng tài khoản | ⚠️ **KHÔNG đề cập** — thiết bị khác có bị ảnh hưởng session không? (theo mô tả "thu hồi Push Token của thiết bị hiện tại" → chỉ 1 device; nhưng session token có phân biệt device không?) | — |

---

## 8. Acceptance Criteria ⚡

UC v2 có 4 AC được viết ở dạng khẳng định chứ chưa ở dạng Given/When/Then. Tôi chuẩn hóa lại và bổ sung các AC còn thiếu:

| AC # | Scenario | Given | When | Then |
|------|----------|-------|------|------|
| AC-01 | Hiển thị Dialog xác nhận | Người dùng đã đăng nhập và đang ở màn Sidebar | Tap nút "Đăng xuất" | Dialog hiện với tiêu đề "Xác nhận đăng xuất", nội dung "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Dữ liệu chưa lưu sẽ bị mất.", 2 nút "Đăng xuất" (Danger) và "Hủy" (Secondary). Focus mặc định trên "Hủy" (CMR-10). |
| AC-02 | Hủy đăng xuất | Dialog đang hiển thị | Tap "Hủy" | Dialog đóng; phiên đăng nhập vẫn giữ nguyên; người dùng ở lại Sidebar. |
| AC-03 | Đăng xuất thành công (Happy Path) | Dialog đang hiển thị, mạng bình thường | Tap "Đăng xuất" | (1) API thu hồi token + Push Token trả 2xx; (2) Toàn bộ Token, User Info, Secure Storage, cache ảnh, file tạm nhạy cảm bị xóa; (3) App điều hướng về UC256; (4) Toàn bộ luồng hoàn tất trong < 2 giây. |
| AC-04 | Đăng xuất khi API fail (Fallback) | Dialog đang hiển thị, mạng mất/API timeout | Tap "Đăng xuất" | Client vẫn xóa toàn bộ local storage và điều hướng về UC256. ⚠️ **Chưa rõ**: có toast thông báo "Đã đăng xuất (chế độ offline)" hay không? |
| AC-05 | Token cũ không còn sử dụng được | Đã đăng xuất thành công | Thử gọi bất kỳ API cần auth với token cũ | Server trả 401 (vì token đã bị thu hồi). |
| AC-06 | Không còn dữ liệu định danh | Đã đăng xuất | Inspect Local Storage / Secure Storage của thiết bị | Không còn bất kỳ trường nào chứa token, user info, email, phone, cache ảnh cá nhân. |
| **AC-07** ⚠️ Missing | Loading state | — | — | **CẦN BA ĐỊNH NGHĨA**: hiển thị loading như thế nào trong khi gọi API logout? |
| **AC-08** ⚠️ Missing | Double-tap nút Đăng xuất | — | — | **CẦN BA ĐỊNH NGHĨA**: chỉ 1 dialog mở / chỉ 1 API call (debounce theo CMR-18). |
| **AC-09** ⚠️ Missing | Android Back button khi Dialog mở | — | — | **CẦN BA ĐỊNH NGHĨA**: đóng dialog hay thoát app? |
| **AC-10** ⚠️ Missing | Tap overlay ngoài dialog | — | — | **CẦN BA ĐỊNH NGHĨA**: đóng dialog hay giữ nguyên? |
| **AC-11** ⚠️ Missing | i18n – 5 ngôn ngữ | — | — | **CẦN BA ĐỊNH NGHĨA**: nội dung chính xác của tiêu đề, nội dung, 2 nút ở 5 ngôn ngữ (theo CMR-17). |

---

## 9. Non-functional Requirements ⚡

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance | Luồng đăng xuất (xóa dữ liệu và điều hướng phía client) hoàn tất dưới **2 giây** | UC257 v2 §3.3 |
| Performance — API timeout | 🔴 **Conflict**: UC v1 ghi timeout 5s; CMR-16 quy định 10s. | UC v1 §3.3 vs CMR-16 |
| Security | Không được để lại dữ liệu định danh nào trên LocalStorage sau khi đăng xuất | UC257 v2 §3.3 |
| Security | Vô hiệu hóa hoàn toàn token trên server, ngăn tái sử dụng | UC v1 §3.3 (v2 không ghi rõ) |
| Compatibility | ⚠️ **KHÔNG đề cập**: iOS/Android version tối thiểu? | — |
| Accessibility | ⚠️ **KHÔNG đề cập**: nút "Đăng xuất" có accessibility label? Dialog có screen reader support? | — |
| i18n | ⚠️ **KHÔNG đề cập**: bản dịch các ngôn ngữ khác | CMR-17 |

---

## 10. Open Questions & Dependencies

### 10.1 Open Questions
Xem bảng **Unified Gap & Question Report** bên dưới.

### 10.2 Dependencies
- **UC256 — Đăng nhập ứng dụng Mobile**: màn hình đích sau khi đăng xuất.
- **CMR-07** (Xử lý lỗi chung): áp dụng cho lỗi API/network.
- **CMR-10** (Confirmation Dialog): áp dụng cho Dialog xác nhận.
- **CMR-16** (API Performance): quy định timeout 10s cho API call.
- **CMR-17** (Đa ngôn ngữ): áp dụng cho toàn bộ text cứng.
- **CMR-18** (Debounce Navigation): áp dụng cho thao tác tap button điều hướng.
- **API Service — Authentication** (chi tiết endpoint thu hồi token phía server — không trong phạm vi audit client-side).
- **Push Notification Service (FCM/APNS)**: thu hồi device token.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| v1 | 2026-05-11 | QC Auditor | Audit lần đầu UC257 dựa trên v1 + v2 + wireframe + CMR v1.1. |

---

# 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|----------------|---------|-------|--------|
| 1 | Feature Identity | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ (Out of Scope không được đề cập) |
| 3 | Actors & User Roles | 10 | 7/10 | ⚡ (Không phân biệt Cá nhân/Tổ chức; không ghi role khác biệt) |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ✅ |
| 5 | UI Object Inventory & Mapping | 15 | 10/15 | ⚡ (v2 lược bỏ nhiều chi tiết; overlay/back button/icon X dialog không xác định) |
| 6 | Object Attributes & Behavior Definition | 20 | 11/20 | ⚡ (Thiếu state Loading/Disabled, edge case, double-tap, back button) |
| 7 | Functional Logic & Workflow Decomposition | 20 | 13/20 | ⚡ (Thiếu chi tiết loading, toast, xử lý 401/500, xử lý race condition) |
| 8 | Functional Integration Analysis | 10 | 6/10 | ⚡ (Không rõ tương tác với UC256, với API đang chạy nền, với dữ liệu chưa lưu ở UC khác) |
| 9 | Acceptance Criteria | 10 | 7/10 | ⚡ (4 AC hiện có đã rõ, còn thiếu AC cho loading, double-tap, i18n, back button) |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ (Conflict timeout; thiếu compatibility, a11y, i18n cụ thể) |
| **Total** | | **110** | **75/110** | **→ 68.2/100** |

> **Tính lại Final Score:** round((75 / 110) × 100, 1) = **68.2 / 100**

> **Điều chỉnh verdict:** Với điểm 68.2, verdict chính thức là **❌ NOT READY** theo bảng threshold. Tuy nhiên, các gap chủ yếu là *chi tiết cần làm rõ* chứ không phải *thiếu hoàn toàn knowledge area*. Không có Critical area nào = 0 → không auto-fail. QA vẫn có thể bắt đầu thiết kế test ở mức skeleton cho 3 flow chính (Happy Path, Cancel, Fallback) trong khi chờ BA trả lời các câu hỏi bên dưới.

**Readiness Verdict chính thức:** ❌ **NOT READY** (68.2/100) — khuyến nghị hoàn thiện các câu hỏi High/Medium priority trước khi bàn giao QA.

> **Lưu ý về điểm Verdict Summary ở đầu file (72.7):** Đã điều chỉnh xuống 68.2 sau khi tính lại chính xác. Vui lòng tham chiếu phần Audit Summary này.

---

# 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | **High** | v1 §3.3 "quá 5 giây" vs CMR-16 "10 giây" | Timeout của API đăng xuất là **5 giây** (theo v1) hay **10 giây** (theo CMR-16)? v2 không ghi thời gian cụ thể. | Conflict trực tiếp giữa UC v1 và CMR v1.1. QA không biết expected timeout để test fallback trigger chính xác. | Open |
| Q2 | **High** | UC v2 §3.1.5 "Fallback" | Khi API logout thất bại và client xóa local → có hiển thị **toast/snackbar** thông báo cho người dùng không? Nội dung chính xác? Hay im lặng điều hướng về Login? | QA không thể viết test case verify notification. Nếu im lặng → user có thể hiểu nhầm không phải lỗi. CMR-07 yêu cầu có thông báo cho lỗi mạng/timeout. | Open |
| Q3 | **High** | N/A (Missing) | Trong lúc gọi API logout (2 giây), UI hiển thị **loading state** như thế nào? (a) Spinner trên nút "Đăng xuất" của Dialog, (b) Full-screen loading overlay, (c) Đóng dialog + spinner giữa màn hình, hay (d) Không hiển thị gì? | Bắt buộc theo CMR-07. Thiếu rule này → QA không thể test loading state; developer có thể implement khác nhau giữa iOS/Android. | Open |
| Q4 | **High** | v1 §2.2 "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?" vs v2 §2.2 "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Dữ liệu chưa lưu sẽ bị mất." | Nội dung message trong Dialog xác nhận chính xác là bản v1 hay v2? Nếu bản v2, **"dữ liệu chưa lưu"** đang ám chỉ những UC/màn hình nào? (VD: UC53 Phản ánh đang điền dở?) | Conflict giữa 2 phiên bản UC. Nếu nội dung v2 áp dụng → QA phải test scenario đăng xuất khi có form dở ở UC khác. | Open |
| Q5 | **High** | N/A (Missing) | Khi người dùng **double-tap** (tap 2 lần rất nhanh) vào nút "Đăng xuất" ở Sidebar: hệ thống mở 1 dialog hay 2 dialog chồng nhau? Tương tự cho double-tap nút "Đăng xuất" trong dialog: 1 API call hay 2? (theo CMR-18) | CMR-18 yêu cầu debounce navigation. Nếu không debounce → có thể gây duplicate API call, crash hoặc UI bug. QA cần rule rõ để viết test. | Open |
| Q6 | **Medium** | N/A (Missing) | Khi Dialog xác nhận đang mở, người dùng nhấn **Android physical Back button**: hệ thống đóng dialog (và giữ session) hay thoát màn hình/app? | Đây là hành vi platform cụ thể, thường khác giữa iOS/Android. Không có rule → dev implement khác → user experience bất nhất. | Open |
| Q7 | **Medium** | N/A (Missing) | Khi Dialog đang mở, người dùng **tap vào vùng overlay ngoài dialog**: đóng dialog hay giữ nguyên? | Ảnh hưởng trực tiếp đến test UX. CMR-10 chưa quy định rõ cho dialog xác nhận. | Open |
| Q8 | **Medium** | UC257 §1 "Chức năng đáp ứng usecase số" | Phần **"Out of Scope"** của UC257 cụ thể gồm những gì? (VD: remote logout tất cả thiết bị, auto-logout do session timeout, đăng xuất khi uninstall...) | Không có Out of Scope rõ ràng → QA có thể viết test vượt phạm vi UC hoặc bỏ sót edge. | Open |
| Q9 | **Medium** | v2 §3.1.2 "thu hồi Push Token của thiết bị hiện tại" | Client có cần gọi **FCM/APNS SDK để unregister token phía thiết bị** không, hay chỉ server thu hồi là đủ? Nếu server-only, client cần flow nào để dừng nhận notification ngay lập tức? | Ảnh hưởng test case "Sau khi logout, thiết bị không còn nhận push notification". Nếu chỉ server thu hồi, có khoảng thời gian token chưa hết hiệu lực hoàn toàn. **LƯU Ý: đây thuộc tầng tích hợp client-push service, vẫn trong phạm vi test client.** | Open |
| Q10 | **Medium** | N/A (Missing) | Người dùng **Cá nhân** vs **Tổ chức (Doanh nghiệp)** có khác biệt trong luồng đăng xuất hay Sidebar hiển thị không? (VD: menu "Quản lý doanh nghiệp" có ẩn với Cá nhân?) | Quyết định số lượng test case cần viết (1 luồng chung hay 2 luồng riêng). | Open |
| Q11 | **Medium** | N/A (Missing) | Nội dung bản dịch chính xác của các text sau ở **5 ngôn ngữ** (CMR-17): "Đăng xuất", "Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Dữ liệu chưa lưu sẽ bị mất.", "Hủy"? | QA cần verify text hiển thị đúng ở từng ngôn ngữ. Không có bản dịch → không test được i18n. | Open |
| Q12 | **Medium** | N/A (Missing) | Các trường hợp **edge của tên người dùng/email**: tên dài vượt khung Sidebar → truncate/wrap ra sao? Tên rỗng/null → hiển thị gì? Tên có ký tự đặc biệt, emoji → avatar lấy ký tự nào? | Ảnh hưởng test Group A (Extreme Data States). Không có rule → UI dễ vỡ layout hoặc crash. | Open |
| Q13 | **Medium** | N/A (Missing) | Khi **session đã hết hạn** (access token expired, refresh token cũng expired) nhưng user vẫn đang ở Sidebar và tap "Đăng xuất": hệ thống chạy flow nào? (a) Chạy fallback luôn (coi như API fail), (b) Chạy CMR-07 rule 401 (toast "Phiên đăng nhập hết hạn" rồi redirect login)? | Có khả năng xảy ra race condition thật. QA cần biết expected behavior. | Open |
| Q14 | **Medium** | v2 §2.1 Row 6-9 "(Các menu quản lý)" | v2 rút gọn các menu Tài khoản cá nhân/Doanh nghiệp/Đổi MK/Cấu hình thành 1 dòng "(Các menu quản lý)". **Tap action của từng menu** còn hiệu lực như v1 không? Hay v2 chủ đích ẩn/hoãn các menu này? | v2 là bản mới nhất nhưng lại mô tả ít hơn v1 → có thể mất thông tin. QA cần biết menu nào còn tồn tại và dẫn đi đâu. | Open |
| Q15 | **Low** | v2 §2.2 Row 3 "Tap → Thực hiện luồng xử lý 3.1" | Nút "Đăng xuất" trong Dialog có **disabled state** sau khi tap (để tránh tap nhiều lần) không? Có đổi label thành "Đang đăng xuất..." trong khi gọi API không? | Liên quan Q3 (loading state) và Q5 (double-tap). Là câu hỏi UX cụ thể. | Open |
| Q16 | **Low** | N/A (Missing) | Sau khi đăng xuất thành công, màn hình Login (UC256) có hiển thị **thông báo toast "Đã đăng xuất"** hay trực tiếp hiện form login? | Ảnh hưởng test AC-03. Cần phối hợp UC256. | Open |
| Q17 | **Low** | N/A (Missing) | Có **API call background** (polling notification, heartbeat...) đang chạy khi user bắt đầu logout: hệ thống có **cancel** các request này trước khi điều hướng không? | Nếu không cancel → có thể có request trả về sau khi đã logout, gây cảnh báo/crash. | Open |
| Q18 | **Low** | §3.3 "dưới 2 giây" | "2 giây" là **SLA bao gồm cả API call + local cleanup + điều hướng** hay chỉ tính từ khi nhận response? Nếu bao gồm API call thì mâu thuẫn với CMR-16 (10s). | Ambiguity về cách đo performance. QA cần biết đo từ đâu đến đâu. | Open |
| Q19 | **Low** | N/A (Missing) | Có yêu cầu về **accessibility** (screen reader label cho avatar/nút Đăng xuất, contrast ratio, font size) trong scope UC này không? | Hiện UC hoàn toàn không đề cập a11y. Nếu dự án có cam kết a11y, QA cần test. | Open |

**Tổng quan:** 19 câu hỏi mở — 5 High, 9 Medium, 5 Low. Cần BA trả lời trước khi bắt đầu test case design đầy đủ.

---

# 🟢 What's Good

- **Cấu trúc UC rõ ràng, có metadata đầy đủ**: UC-ID, BA phụ trách, phân hệ, ngày tạo, phiên bản.
- **Phân tách v1 (chi tiết) và v2 (tóm tắt)** cho thấy BA chủ động điều chỉnh; v1 vẫn là nguồn tham khảo chi tiết UI.
- **Có wireframe (`Đăng xuất.png`)** minh họa trực quan Sidebar + Dialog.
- **Tham chiếu CMR-10** rõ ràng — hiểu đúng nguyên tắc Confirmation Dialog.
- **Luồng xử lý 5 bước mạch lạc**: xác nhận → API → xóa local → điều hướng → fallback.
- **AC bao quát 4 khía cạnh** (giao diện, chức năng, bảo mật, ngoại lệ) — chỉ cần chuẩn hóa sang Given/When/Then.
- **Có định nghĩa NFR**: Security + Performance — hiếm UC nào đề cập đủ.
- **Luồng fallback (API fail) được thiết kế đúng hướng bảo mật** (ưu tiên xóa local trước).

---

# 🧪 Testability Outlook

**What CAN be tested now (với các chi tiết đã rõ):**
- Hiển thị nút "Đăng xuất" ở cuối Sidebar với style outline đỏ.
- Tap nút "Đăng xuất" → Dialog xác nhận hiện ra với tiêu đề + 2 button.
- Tap "Hủy" → Dialog đóng, giữ session.
- Luồng Happy Path: tap "Đăng xuất" trong Dialog → về Login.
- Verify Token bị xóa khỏi local storage sau logout.
- Verify không thể gọi API với token cũ.
- Fallback cơ bản khi mất mạng: vẫn về Login.

**What CANNOT be tested yet (blocked by gaps):**
- ⚠️ Loading state trong khi gọi API (Q3).
- ⚠️ Toast/thông báo khi fallback (Q2).
- ⚠️ Double-tap behavior (Q5).
- ⚠️ Android Back button khi dialog mở (Q6).
- ⚠️ Tap overlay ngoài dialog (Q7).
- ⚠️ Timeout chính xác 5s hay 10s (Q1).
- ⚠️ i18n — bản dịch các ngôn ngữ (Q11).
- ⚠️ Edge case tên/email dài (Q12).
- ⚠️ Session đã hết hạn khi user cố logout (Q13).
- ⚠️ Tương tác với Push Notification (unregister device token) (Q9).
- ⚠️ Cancel API background khi logout (Q17).

**Suggested test focus areas** *(once gaps are resolved)*:
- **Happy path**: Sidebar → tap Đăng xuất → Dialog → tap Đăng xuất → về Login (dưới 2s).
- **Alternative scenarios**:
  - Tap Hủy trên Dialog.
  - Tap Back button khi Dialog mở.
  - Tap vào overlay ngoài Dialog.
  - Double-tap (debounce).
- **Boundary & validation tests**:
  - Tên/email dài vượt khung (nếu BA cung cấp rule).
  - Thời gian API trả về sát 10s (CMR-16).
- **Error & exception scenarios**:
  - Mất mạng trước khi tap.
  - Mất mạng khi API đang chạy.
  - API trả 401, 500, timeout.
  - Local storage không thể ghi (permission denied).
- **UI-specific checks**:
  - Font, màu sắc nút Danger/Secondary.
  - Avatar hiển thị đúng ký tự đầu tên.
  - Layout trên thiết bị nhỏ (iPhone SE) và lớn (iPad, tablet Android).
- **CMR compliance tests**:
  - CMR-10 (focus mặc định "Hủy").
  - CMR-16 (timeout 10s).
  - CMR-17 (i18n 5 ngôn ngữ).
  - CMR-18 (debounce double-tap).
- **Integration tests**:
  - Logout → UC256 redirect thành công.
  - Sau logout, không nhận push notification.
  - Sau logout, các API bảo mật trả 401.
- **Security tests**:
  - Không còn token/user info/cache ảnh trong Local/Secure Storage.
  - Token cũ không thể dùng để gọi lại API.

---

# 📌 Summary & Recommendation

UC257 mô tả một chức năng khá đơn giản về nghiệp vụ (đăng xuất), nhưng đặc tả hiện tại có **5 câu hỏi High priority** và **9 câu hỏi Medium** cần BA làm rõ trước khi bắt đầu thiết kế test case chi tiết. Các gap chủ yếu tập trung ở: **loading state**, **toast thông báo**, **xử lý thao tác cạnh tranh (double-tap, Back button, overlay)**, **conflict timeout giữa UC v1 và CMR-16**, **i18n**, và **conflict nội dung dialog giữa v1 và v2**. Ngoài ra, v2 đã rút gọn nhiều chi tiết UI so với v1 khiến việc mapping 1-1 giữa wireframe và spec khó khăn hơn.

**Khuyến nghị:**
1. **BA trả lời 5 câu hỏi High priority (Q1–Q5)** trước tiên — đây là blocker cho việc thiết kế test chính thức.
2. **Hợp nhất v1 và v2** thành 1 phiên bản v3 duy nhất, giữ lại chi tiết UI của v1 và các cải tiến nội dung của v2.
3. **Chuẩn hóa AC sang Given/When/Then** và bổ sung AC-07 đến AC-11 đã liệt kê.
4. **Thêm tham chiếu CMR-07, CMR-16, CMR-17, CMR-18** vào đặc tả UC257.
5. QA có thể bắt đầu viết **test skeleton cho 3 luồng chính (Happy Path, Cancel, Fallback)** ngay, nhưng phải chờ câu trả lời trước khi viết đầy đủ edge case.

**Verdict chính thức:** ❌ **NOT READY (68.2/100)** — tạm thời hold phần chi tiết; có thể khởi động skeleton song song với vòng làm rõ của BA.

---

*UC Readiness Review — UC-257 Đăng xuất Mobile — v1 — 2026-05-11 — Generated by qc-uc-review-MOBILE skill*
