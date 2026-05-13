# Test Cases Draft — UC53/63-65: Phản ánh kiến nghị trên Mobile

**Ngày tạo:** 2026-05-12  
**Người thiết kế:** QC Agent (Claude)  
**Nguồn:** UC53_63-65_PhanAnhKienNghi_audited_20260512_v2.md + Scenarios

---

## Cấu trúc màn hình

| # | Màn hình | UC |
|---|----------|-----|
| 1 | Danh sách Phản ánh kiến nghị | UC53, UC65 |
| 2 | Bộ lọc tìm kiếm (Bottom Sheet) | UC53 |
| 3 | Chi tiết Phản ánh kiến nghị | UC63 |
| 4 | Tạo mới Phản ánh kiến nghị (Form) | UC64 |

---

## 1. Màn hình Danh sách Phản ánh kiến nghị

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_001 | Kiểm tra UI/UX màn hình Danh sách Phản ánh kiến nghị | Đăng nhập thành công. Có dữ liệu phản ánh kiến nghị. | 1. Truy cập Sidebar → "Phản ánh kiến nghị"\n2. Kiểm tra hiển thị màn hình Danh sách | 2.\n- Header hiển thị tiêu đề "Phản ánh kiến nghị"\n- Thanh tìm kiếm với placeholder "Tìm kiếm theo mã phản ánh..." + icon bộ lọc\n- Thanh Tab trạng thái: Tất cả / Đang xử lý / Đã trả lời / Đã đóng / Nháp\n- Nút FAB "Gửi phản ánh" (+) góc phải dưới\n- Danh sách Card phản ánh hiển thị theo chiều dọc\n- Mỗi Card gồm: Tiêu đề, Ngày gửi (DD/MM/YYYY), Đơn vị xử lý, Badge trạng thái (màu theo CMR-05) |
| TC_002 | Kiểm tra UI/UX màn hình Danh sách khi không có dữ liệu | Đăng nhập thành công. Không có phản ánh kiến nghị nào. | 1. Truy cập Sidebar → "Phản ánh kiến nghị"\n2. Kiểm tra hiển thị | 2.\n- Hiển thị thông báo "Không có dữ liệu." căn giữa vùng nội dung\n- Nút FAB "Gửi phản ánh" vẫn hiển thị\n- Thanh tìm kiếm và Tab trạng thái vẫn hiển thị |
| TC_003 | [Card] Kiểm tra hiển thị wrap text khi Tiêu đề phản ánh dài | Đăng nhập thành công. Có phản ánh với tiêu đề dài (>50 ký tự). | 1. Kiểm tra hiển thị Card có tiêu đề dài | 1. Tiêu đề wrap text đầy đủ, không truncate |
| TC_004 | [Card] Kiểm tra hiển thị wrap text khi Đơn vị xử lý dài | Đăng nhập thành công. Có phản ánh với tên đơn vị xử lý dài. | 1. Kiểm tra hiển thị Card có Đơn vị xử lý dài | 1. Đơn vị xử lý wrap text, không truncate |
| TC_005 | [Card] Kiểm tra hiển thị "-" khi field có giá trị null | Đăng nhập thành công. Có phản ánh với Đơn vị xử lý = null. | 1. Kiểm tra hiển thị Card | 1. Trường Đơn vị xử lý hiển thị "-" (CMR-14) |
| TC_006 | [Badge] Kiểm tra hiển thị màu sắc badge trạng thái | Đăng nhập thành công. Có phản ánh ở nhiều trạng thái khác nhau. | 1. Kiểm tra badge trạng thái trên các Card | 1. Badge hiển thị đúng màu theo CMR-05:\n- Xanh lá = tích cực (Đã trả lời)\n- Vàng = chờ/nháp (Chờ tiếp nhận, Nháp)\n- Đỏ = tiêu cực (Đã từ chối)\n- Xám = trung tính (Đã hủy) |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_007 | [Danh sách] Kiểm tra tải danh sách phản ánh khi truy cập lần đầu | Đăng nhập thành công. Có >20 phản ánh. | 1. Truy cập Sidebar → "Phản ánh kiến nghị" | 1.\n- Hiển thị loading state toàn màn hình (first-load)\n- Tải 20 bản ghi đầu tiên\n- Danh sách sắp xếp theo ngày gửi giảm dần (mới nhất trước) |
| TC_008 | [Danh sách] Kiểm tra lazy load khi cuộn đến cuối danh sách | Đăng nhập thành công. Có >40 phản ánh. Đang ở trang 1 (20 bản ghi). | 1. Cuộn xuống cuối danh sách | 1.\n- Hiển thị loading indicator cục bộ ở cuối danh sách\n- Tải thêm 20 bản ghi tiếp theo\n- Ẩn loading indicator sau khi tải xong |
| TC_009 | [Danh sách] Kiểm tra ẩn loading khi đã tải hết dữ liệu | Đăng nhập thành công. Có 25 phản ánh (trang 1: 20, trang 2: 5). | 1. Cuộn xuống cuối danh sách (tải trang 2)\n2. Cuộn xuống cuối lần nữa | 2. Không hiển thị loading indicator, không gọi API nữa |
| TC_010 | [Card] Kiểm tra tap vào Card điều hướng sang Chi tiết | Đăng nhập thành công. Có phản ánh trong danh sách. | 1. Tap vào bất kỳ Card nào | 1. Điều hướng sang màn hình Chi tiết (UC63) của phản ánh tương ứng |
| TC_011 | [FAB] Kiểm tra tap nút "Gửi phản ánh" mở Form Tạo mới | Đăng nhập thành công. Đang ở màn hình Danh sách. | 1. Tap nút FAB "+" (Gửi phản ánh) | 1. Mở màn hình Form Tạo mới phản ánh kiến nghị (UC64) |
| TC_012 | [Tìm kiếm] Kiểm tra tìm kiếm theo mã phản ánh — có kết quả | Đăng nhập thành công. Có phản ánh mã "PAKN-2024-001198". | 1. Tap vào ô tìm kiếm\n2. Nhập "PAKN-2024"\n3. Chờ 3 giây (debounce) | 3. Danh sách hiển thị các phản ánh có mã chứa "PAKN-2024" |
| TC_013 | [Tìm kiếm] Kiểm tra tìm kiếm — không có kết quả | Đăng nhập thành công. | 1. Nhập "XYZABC999" vào ô tìm kiếm\n2. Chờ 3 giây | 2. Hiển thị "Không tìm thấy kết quả." (CMR-14) |
| TC_014 | [Tìm kiếm] Kiểm tra xóa hết từ khóa trở về trạng thái mặc định | Đăng nhập thành công. Đã nhập từ khóa và có kết quả lọc. | 1. Xóa hết từ khóa trong ô tìm kiếm | 1. Danh sách trở về trạng thái mặc định (hiển thị tất cả) |
| TC_015 | [Tìm kiếm] Kiểm tra auto-trim whitespace | Đăng nhập thành công. Có phản ánh mã "PAKN-2024-001198". | 1. Nhập "  PAKN-2024  " (có space đầu/cuối)\n2. Chờ 3 giây | 2. App trim thành "PAKN-2024" → hiển thị kết quả tìm kiếm đúng |
| TC_016 | [Tìm kiếm] Kiểm tra chỉ nhập space/tab → coi như input rỗng | Đăng nhập thành công. | 1. Nhập "   " (chỉ space) vào ô tìm kiếm\n2. Chờ 3 giây | 2. Không trigger API tìm kiếm, danh sách giữ trạng thái mặc định |
| TC_017 | [Tìm kiếm] Kiểm tra giới hạn 500 ký tự | Đăng nhập thành công. | 1. Nhập 500 ký tự vào ô tìm kiếm\n2. Thử nhập thêm ký tự thứ 501 | 1. Cho phép nhập 500 ký tự\n2. Không cho phép nhập thêm (bị chặn) |
| TC_018 | [Tìm kiếm] Kiểm tra search áp dụng toàn bộ tab | Đăng nhập thành công. Đang ở Tab "Đang xử lý". | 1. Nhập mã phản ánh vào ô tìm kiếm\n2. Chờ 3 giây | 2. Kết quả hiển thị trên tab "Tất cả" (không chỉ tab hiện tại) |
| TC_019 | [Tab] Kiểm tra chuyển Tab trạng thái | Đăng nhập thành công. Có phản ánh ở nhiều trạng thái. | 1. Tap Tab "Đang xử lý"\n2. Tap Tab "Đã trả lời"\n3. Tap Tab "Tất cả" | 1. Danh sách chỉ hiển thị phản ánh "Đang xử lý"\n2. Danh sách chỉ hiển thị phản ánh "Đã trả lời"\n3. Danh sách hiển thị tất cả |
| TC_020 | [Pull-to-refresh] Kiểm tra kéo xuống để refresh | Đăng nhập thành công. Đang ở danh sách. | 1. Kéo xuống từ đầu danh sách | 1.\n- Hiển thị spinner ở đầu danh sách\n- Tải lại toàn bộ danh sách\n- Cập nhật dữ liệu mới nhất\n- Ẩn spinner |
| TC_021 | [State Persistence] Kiểm tra giữ trạng thái search/filter khi quay lại từ Chi tiết | Đăng nhập thành công. Đã tìm kiếm "PAKN" và có kết quả. | 1. Tap vào Card xem chi tiết\n2. Tap nút ← quay lại danh sách | 2. Danh sách giữ nguyên trạng thái tìm kiếm "PAKN" (không reset) |
| TC_022 | [State Reset] Kiểm tra reset search/filter khi chuyển sang màn hình khác | Đăng nhập thành công. Đã tìm kiếm "PAKN". | 1. Tap Sidebar → chuyển sang màn hình khác\n2. Quay lại "Phản ánh kiến nghị" | 2. Search/filter reset về trạng thái mặc định (ô tìm kiếm trống, Tab "Tất cả") |
| TC_023 | [Lazy load error] Kiểm tra retry tự động 3 lần khi tải trang bị lỗi | Đăng nhập thành công. Có >20 phản ánh. Giả lập lỗi mạng khi tải trang 2. | 1. Cuộn xuống cuối danh sách (trigger lazy load trang 2) | 1.\n- App tự động retry 3 lần (mỗi lần cách 2s)\n- Sau 3 lần fail → dừng retry\n- Hiển thị thông báo lỗi cục bộ ở cuối danh sách |
| TC_024 | [Error] Kiểm tra hiển thị lỗi mạng | Đăng nhập thành công. Tắt mạng trước khi truy cập. | 1. Truy cập Sidebar → "Phản ánh kiến nghị" | 1. Hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại". Giữ nguyên màn hình. |
| TC_025 | [Error] Kiểm tra hiển thị lỗi timeout (>10s) | Đăng nhập thành công. Giả lập API phản hồi chậm >10s. | 1. Truy cập Sidebar → "Phản ánh kiến nghị" | 1. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại" |
| TC_026 | [Error] Kiểm tra hiển thị lỗi server (HTTP 500) | Đăng nhập thành công. Giả lập API trả HTTP 500. | 1. Truy cập Sidebar → "Phản ánh kiến nghị" | 1. Hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." |
| TC_027 | [Error] Kiểm tra xử lý session hết hạn — refresh token thành công | Đăng nhập thành công. Access token hết hạn, refresh token còn hạn. | 1. Truy cập Sidebar → "Phản ánh kiến nghị" | 1. App tự động dùng refresh token cấp lại access token → tải danh sách bình thường |
| TC_028 | [Error] Kiểm tra redirect đăng nhập khi refresh token hết hạn (>15 ngày) | Đăng nhập thành công. Refresh token hết hạn (>15 ngày). | 1. Truy cập Sidebar → "Phản ánh kiến nghị" | 1. Hiển thị toast "Phiên đăng nhập hết hạn." → Redirect về màn hình đăng nhập |
| TC_029 | [Debounce] Kiểm tra double-tap nút FAB | Đăng nhập thành công. Đang ở danh sách. | 1. Tap nhanh liên tục (double tap) vào nút FAB "Gửi phản ánh" | 1. Chỉ mở 1 lần Form Tạo mới (debounce, không mở 2 lần) |
| TC_030 | [Filter indicator] Kiểm tra hiển thị indicator khi có bộ lọc active | Đăng nhập thành công. Đã áp dụng bộ lọc (Trạng thái ≠ "Tất cả"). | 1. Kiểm tra icon filter | 1. Icon filter hiển thị indicator màu xanh lá cây ở góc phải trên |
| TC_031 | [Filter indicator] Kiểm tra ẩn indicator khi không có filter active | Đăng nhập thành công. Bộ lọc ở trạng thái mặc định. | 1. Kiểm tra icon filter | 1. Không hiển thị indicator (ẩn) |

## 2. Màn hình Bộ lọc tìm kiếm (Bottom Sheet)

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_032 | Kiểm tra UI/UX Bộ lọc (Bottom Sheet) | Đăng nhập thành công. Đang ở danh sách. | 1. Tap icon filter\n2. Kiểm tra hiển thị Bottom Sheet | 2.\n- Bottom Sheet mở từ dưới lên\n- Hiển thị: Dropdown "Trạng thái" (mặc định "Tất cả"), Date Range "Ngày tạo", Date Range "Ngày hẹn trả", Nút "Nhập lại" (Secondary), Nút "Áp dụng" (Primary)\n- Nút X đóng ở góc phải trên |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_033 | [Dropdown Trạng thái] Kiểm tra chọn trạng thái lọc | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Tap dropdown "Trạng thái"\n2. Chọn "Đang xử lý"\n3. Tap "Áp dụng" | 2. Dropdown hiển thị giá trị "Đang xử lý"\n3. Đóng Bottom Sheet, danh sách chỉ hiển thị phản ánh "Đang xử lý" |
| TC_034 | [Date Range Ngày tạo] Kiểm tra chọn khoảng ngày | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Tap "Ngày tạo"\n2. Chọn ngày bắt đầu: 01/05/2026\n3. Chọn ngày kết thúc: 10/05/2026\n4. Tap "Áp dụng" | 4. Đóng Bottom Sheet, danh sách chỉ hiển thị phản ánh có ngày tạo từ 01/05 đến 10/05/2026 |
| TC_035 | [Date Range] Kiểm tra chỉ chọn ngày bắt đầu | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn ngày bắt đầu: 01/05/2026\n2. Không chọn ngày kết thúc\n3. Tap "Áp dụng" | 3. Ngày kết thúc = vô hạn (lọc từ 01/05/2026 đến hiện tại) |
| TC_036 | [Date Range] Kiểm tra chỉ chọn ngày kết thúc | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn ngày kết thúc: 10/05/2026\n2. Không chọn ngày bắt đầu\n3. Tap "Áp dụng" | 3. Ngày bắt đầu = không giới hạn (lọc từ đầu đến 10/05/2026) |
| TC_037 | [Date Range] Kiểm tra disable ngày kết thúc < ngày bắt đầu | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn ngày bắt đầu: 05/05/2026\n2. Mở picker ngày kết thúc | 2. Các ngày trước 05/05/2026 bị disable (không cho phép chọn) |
| TC_038 | [Date Range Ngày hẹn trả] Kiểm tra lọc theo ngày hẹn trả | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn khoảng ngày hẹn trả\n2. Tap "Áp dụng" | 2. Danh sách chỉ hiển thị phản ánh có ngày hẹn trả trong khoảng đã chọn |
| TC_039 | [Kết hợp] Kiểm tra lọc Trạng thái + Ngày tạo + Ngày hẹn trả | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn Trạng thái: "Đang xử lý"\n2. Chọn Ngày tạo: 01/05 - 10/05\n3. Chọn Ngày hẹn trả: 15/05 - 20/05\n4. Tap "Áp dụng" | 4. Danh sách chỉ hiển thị phản ánh thỏa TẤT CẢ tiêu chí |
| TC_040 | [Kết hợp] Kiểm tra tìm kiếm + bộ lọc (AND logic) | Đăng nhập thành công. Đã nhập từ khóa "PAKN" + áp dụng filter Trạng thái "Đang xử lý". | 1. Kiểm tra kết quả | 1. Danh sách chỉ hiển thị phản ánh có mã chứa "PAKN" VÀ trạng thái "Đang xử lý" |
| TC_041 | [Nhập lại] Kiểm tra reset bộ lọc | Đăng nhập thành công. Bottom Sheet đang mở. Đã chọn Trạng thái + Ngày tạo. | 1. Tap "Nhập lại" | 1.\n- Trạng thái reset về "Tất cả"\n- Ngày tạo reset về Null\n- Ngày hẹn trả reset về Null\n- Bottom Sheet KHÔNG đóng |
| TC_042 | [Đóng] Kiểm tra đóng Bottom Sheet không thay đổi kết quả | Đăng nhập thành công. Bottom Sheet đang mở. Đã thay đổi filter nhưng chưa Áp dụng. | 1. Tap vùng ngoài Bottom Sheet (hoặc nút X) | 1. Đóng Bottom Sheet, kết quả danh sách KHÔNG thay đổi (giữ nguyên filter trước đó) |
| TC_043 | [Lọc] Kiểm tra hiển thị "Không tìm thấy kết quả" khi filter không có kết quả | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn Trạng thái + Ngày tạo sao cho không có phản ánh nào thỏa\n2. Tap "Áp dụng" | 2. Hiển thị "Không tìm thấy kết quả." (CMR-14) |

---

## 3. Màn hình Chi tiết Phản ánh kiến nghị (UC63)

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_044 | Kiểm tra UI/UX màn hình Chi tiết phản ánh | Đăng nhập thành công. Tap vào Card phản ánh từ danh sách. | 1. Kiểm tra hiển thị màn hình Chi tiết | 1.\n- Header: Nút ← (góc trái), Mã phản ánh (giữa), Icon thông báo (góc phải)\n- Block "Thông tin chung": Mã, Trạng thái (badge), Ngày gửi, Chủ đề, Đơn vị xử lý\n- Block "Người gửi": Loại đối tượng (badge), Họ tên, SĐT, Email\n- Block "Nội dung phản ánh": Tiêu đề (bold), Loại nội dung (badge), Nội dung chi tiết\n- Block "Tài liệu đính kèm": Danh sách file\n- Block "Kết quả xử lý": Trạng thái, Ngày phản hồi, Nội dung\n- Block "Lịch sử xử lý": Timeline dọc\n- Nút "Hủy bỏ" sticky cuối màn hình\n- Toàn bộ read-only |
| TC_045 | [Null handling] Kiểm tra hiển thị "-" cho field null | Đăng nhập thành công. Phản ánh có field Đơn vị xử lý = null. | 1. Kiểm tra hiển thị field null | 1. Hiển thị "-" thay thế (CMR-14) |
| TC_046 | [Wrap text] Kiểm tra wrap text cho mã phản ánh dài trên Header | Đăng nhập thành công. Phản ánh có mã dài. | 1. Kiểm tra Header | 1. Mã phản ánh wrap text, không truncate. Nếu null → hiển thị "-" |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_047 | [Header] Kiểm tra nút quay lại | Đăng nhập thành công. Đang ở màn Chi tiết. | 1. Tap nút ← (góc trái header) | 1. Quay về màn hình Danh sách phản ánh kiến nghị |
| TC_048 | [Thông tin chung] Kiểm tra hiển thị đầy đủ block | Đăng nhập thành công. Đang ở màn Chi tiết. | 1. Kiểm tra Block "Thông tin chung" | 1. Hiển thị: Mã phản ánh, Trạng thái (badge đúng màu), Ngày gửi (DD/MM/YYYY), Chủ đề (wrap text), Đơn vị xử lý (wrap text) |
| TC_049 | [Người gửi] Kiểm tra hiển thị block Người gửi | Đăng nhập thành công. Đang ở màn Chi tiết. | 1. Kiểm tra Block "Người gửi" | 1. Hiển thị: Loại đối tượng (badge "Cá nhân" hoặc "Tổ chức/DN"), Họ tên, SĐT, Email. Wrap text nếu dài. |
| TC_050 | [Nội dung] Kiểm tra hiển thị block Nội dung phản ánh | Đăng nhập thành công. Phản ánh có nội dung dài. | 1. Kiểm tra Block "Nội dung phản ánh" | 1. Hiển thị: Tiêu đề (bold, wrap), Loại nội dung (badge), Nội dung chi tiết (multiline, scroll nếu dài, không truncate) |
| TC_051 | [File đính kèm] Kiểm tra hiển thị danh sách file | Đăng nhập thành công. Phản ánh có file đính kèm. | 1. Kiểm tra Block "Tài liệu đính kèm" | 1. Hiển thị danh sách file: icon file, tên file (truncate "..." nếu dài), dung lượng, nút tải |
| TC_052 | [File đính kèm] Kiểm tra xem trực tiếp file PDF | Đăng nhập thành công. Phản ánh có file PDF đính kèm. | 1. Tap file PDF | 1. Mở xem trực tiếp trên trình duyệt thiết bị |
| TC_053 | [File đính kèm] Kiểm tra xem trực tiếp file JPG/PNG | Đăng nhập thành công. Phản ánh có file JPG đính kèm. | 1. Tap file JPG | 1. Mở xem trực tiếp trên trình duyệt thiết bị |
| TC_054 | [File đính kèm] Kiểm tra tải xuống file DOC/DOCX | Đăng nhập thành công. Phản ánh có file DOCX đính kèm. | 1. Tap file DOCX | 1. Tự động tải xuống máy |
| TC_055 | [File đính kèm] Kiểm tra thông báo định dạng không hỗ trợ | Đăng nhập thành công. Phản ánh có file định dạng không hỗ trợ. | 1. Tap file | 1. Hiển thị "Định dạng không hỗ trợ. Vui lòng tải xuống." |
| TC_056 | [File đính kèm] Kiểm tra empty state khi không có file | Đăng nhập thành công. Phản ánh không có file đính kèm. | 1. Kiểm tra Block "Tài liệu đính kèm" | 1. Hiển thị "Không có dữ liệu." |
| TC_057 | [Kết quả xử lý] Kiểm tra hiển thị block có dữ liệu | Đăng nhập thành công. Phản ánh đã có kết quả xử lý. | 1. Kiểm tra Block "Kết quả xử lý" | 1. Hiển thị: Trạng thái xử lý (badge), Ngày phản hồi (DD/MM/YYYY), Nội dung phản hồi (wrap text) |
| TC_058 | [Kết quả xử lý] Kiểm tra empty state khi chưa có phản hồi | Đăng nhập thành công. Phản ánh chưa có kết quả xử lý. | 1. Kiểm tra Block "Kết quả xử lý" | 1. Hiển thị "Không có dữ liệu." |
| TC_059 | [Lịch sử xử lý] Kiểm tra hiển thị timeline | Đăng nhập thành công. Phản ánh có lịch sử xử lý. | 1. Kiểm tra Block "Lịch sử xử lý" | 1. Timeline dọc, sắp xếp giảm dần (mới nhất trước). Mỗi item: icon, nội dung trạng thái, ngày (DD/MM/YYYY) |
| TC_060 | [Lịch sử xử lý] Kiểm tra empty state | Đăng nhập thành công. Phản ánh không có lịch sử. | 1. Kiểm tra Block "Lịch sử xử lý" | 1. Hiển thị "Không có dữ liệu." |
| TC_061 | [Hủy bỏ] Kiểm tra nút Enabled khi trạng thái "Chờ tiếp nhận" | Đăng nhập thành công. Phản ánh trạng thái "Chờ tiếp nhận". | 1. Kiểm tra nút "Hủy bỏ" | 1. Nút ở trạng thái Enabled (có thể tap) |
| TC_062 | [Hủy bỏ] Kiểm tra nút Enabled khi trạng thái "Chờ bổ sung" | Đăng nhập thành công. Phản ánh trạng thái "Chờ bổ sung". | 1. Kiểm tra nút "Hủy bỏ" | 1. Nút ở trạng thái Enabled |
| TC_063 | [Hủy bỏ] Kiểm tra nút Disabled khi trạng thái "Đang xử lý" | Đăng nhập thành công. Phản ánh trạng thái "Đang xử lý". | 1. Kiểm tra nút "Hủy bỏ"\n2. Tap nút | 1. Nút ở trạng thái Disabled\n2. Không có hành động |
| TC_064 | [Hủy bỏ] Kiểm tra nút Disabled khi trạng thái "Đã trả lời" | Đăng nhập thành công. Phản ánh trạng thái "Đã trả lời". | 1. Tap nút "Hủy bỏ" | 1. Không có hành động (Disabled) |
| TC_065 | [Hủy bỏ] Kiểm tra hiển thị Dialog xác nhận | Đăng nhập thành công. Phản ánh trạng thái "Chờ tiếp nhận". | 1. Tap nút "Hủy bỏ" | 1. Hiển thị Dialog: "Bạn có chắc chắn muốn hủy bỏ phản ánh này?" + nút "Xác nhận" (Primary) + nút "Hủy" (Secondary) |
| TC_066 | [Hủy bỏ] Kiểm tra hủy thành công khi xác nhận | Đăng nhập thành công. Phản ánh trạng thái "Chờ tiếp nhận". Dialog đang hiển thị. | 1. Tap "Xác nhận" | 1.\n- Đóng Dialog\n- Gọi API hủy\n- Trạng thái chuyển thành "Đã hủy"\n- Tự động refresh danh sách\n- Quay về danh sách |
| TC_067 | [Hủy bỏ] Kiểm tra không thay đổi khi tap "Hủy" trên Dialog | Đăng nhập thành công. Dialog xác nhận đang hiển thị. | 1. Tap "Hủy" | 1. Đóng Dialog, không thay đổi trạng thái, ở lại màn Chi tiết |
| TC_068 | [Hủy bỏ] Kiểm tra lỗi mạng khi hủy | Đăng nhập thành công. Tắt mạng. Dialog đang hiển thị. | 1. Tap "Xác nhận" | 1. Hiển thị thông báo lỗi mạng + nút "Thử lại" |

## 4. Màn hình Tạo mới Phản ánh kiến nghị (Form - UC64)

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_069 | Kiểm tra UI/UX Form Tạo mới phản ánh | Đăng nhập thành công. Tap FAB "Gửi phản ánh" từ danh sách. | 1. Kiểm tra hiển thị Form | 1.\n- Radio Card "Cá nhân" được chọn mặc định (border + text primary)\n- Block "Thông tin cá nhân" hiển thị: Họ tên (auto-fill), Tỉnh/TP, Xã/Phường (disabled), Địa chỉ, SĐT (auto-fill, prefix +84), Email (auto-fill)\n- Block "Nội dung phản ánh": Chủ đề (dropdown), Đơn vị tiếp nhận (dropdown), Tiêu đề, Loại nội dung (radio, mặc định chọn đầu tiên), Nội dung (textarea), Ghi chú cảnh báo\n- Block "Tài liệu đính kèm": Nút "Tải tệp lên"\n- Nút "Lưu nháp" (Secondary, sticky) + Nút "Gửi phản ánh" (Primary, sticky, Disabled) |
| TC_070 | [Nút Gửi] Kiểm tra trạng thái Disabled mặc định | Đăng nhập thành công. Vừa mở Form. | 1. Kiểm tra nút "Gửi phản ánh" | 1. Nút ở trạng thái Disabled. Tap → không có hành động. |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|-------|-------|---------------|------|-----------------|
| TC_071 | [Radio Card] Kiểm tra chuyển sang Tổ chức/DN | Đăng nhập thành công. Form đang ở chế độ Cá nhân. | 1. Tap Radio Card "Tổ chức/DN" | 1.\n- Radio "Tổ chức/DN" active (border + text primary)\n- Ẩn block "Thông tin cá nhân"\n- Hiển thị block "Thông tin tổ chức": Tên tổ chức, Người đại diện, Chức vụ, Tỉnh/TP, Xã/Phường, Địa chỉ, SĐT, Email |
| TC_072 | [Data persist] Kiểm tra giữ dữ liệu khi chuyển Cá nhân → Tổ chức → Cá nhân | Đăng nhập thành công. Đã điền form Cá nhân (Họ tên, Tỉnh, Xã, Địa chỉ). | 1. Tap "Tổ chức/DN"\n2. Tap "Cá nhân" | 2. Tất cả dữ liệu Cá nhân đã nhập được restore đầy đủ (Họ tên, Tỉnh, Xã, Địa chỉ) |
| TC_073 | [Data persist] Kiểm tra giữ dữ liệu khi chuyển Tổ chức → Cá nhân → Tổ chức | Đăng nhập thành công. Đã điền form Tổ chức (Tên TC, Người ĐD, Tỉnh, Xã). | 1. Tap "Cá nhân"\n2. Tap "Tổ chức/DN" | 2. Tất cả dữ liệu Tổ chức đã nhập được restore đầy đủ |
| TC_074 | [Họ tên - Cá nhân] Kiểm tra auto-fill từ profile | Đăng nhập thành công. Profile có Họ tên = "Nguyễn Văn A". | 1. Mở Form Tạo mới | 1. Trường Họ tên tự động điền "Nguyễn Văn A". Cho phép chỉnh sửa. |
| TC_075 | [Họ tên - Cá nhân] Kiểm tra validation bắt buộc | Đăng nhập thành công. Form đang mở. | 1. Xóa hết nội dung trường Họ tên\n2. Tap ra ngoài (blur) | 2. Hiển thị inline error: "Họ và tên là bắt buộc." |
| TC_076 | [Họ tên - Cá nhân] Kiểm tra validation chỉ nhập space | Đăng nhập thành công. | 1. Nhập "   " (chỉ space) vào Họ tên\n2. Blur | 2. Hiển thị inline error: "Họ và tên là bắt buộc." (auto-trim → rỗng) |
| TC_077 | [Họ tên - Cá nhân] Kiểm tra max 200 ký tự (BVA) | Đăng nhập thành công. | 1. Nhập 200 ký tự vào Họ tên\n2. Thử nhập ký tự thứ 201 | 1. Cho phép nhập 200 ký tự\n2. Không cho nhập thêm |
| TC_078 | [Tỉnh/TP - Cá nhân] Kiểm tra dropdown searchable | Đăng nhập thành công. | 1. Tap dropdown Tỉnh/TP\n2. Nhập "Hà"\n3. Tap "Hà Nội" | 1. Mở danh sách A-Z\n2. Filter hiển thị các tỉnh chứa "Hà"\n3. Đóng dropdown, hiển thị "Hà Nội" |
| TC_079 | [Tỉnh/TP - Cá nhân] Kiểm tra validation bắt buộc | Đăng nhập thành công. Tỉnh/TP chưa chọn. | 1. Trigger validation (điền đủ các field khác, nút Gửi vẫn disabled vì thiếu Tỉnh) | 1. Nút "Gửi phản ánh" vẫn Disabled |
| TC_080 | [Xã/Phường - Cá nhân] Kiểm tra Disabled khi chưa chọn Tỉnh | Đăng nhập thành công. Tỉnh/TP chưa chọn. | 1. Kiểm tra dropdown Xã/Phường | 1. Dropdown ở trạng thái Disabled (không cho tap) |
| TC_081 | [Xã/Phường - Cá nhân] Kiểm tra Enabled sau khi chọn Tỉnh | Đăng nhập thành công. | 1. Chọn Tỉnh/TP = "Hà Nội"\n2. Kiểm tra dropdown Xã/Phường | 2. Dropdown Enabled, danh sách Xã/Phường thuộc Hà Nội |
| TC_082 | [Cascading] Kiểm tra đổi Tỉnh → auto clear Xã/Phường (Cá nhân) | Đăng nhập thành công. Đã chọn Tỉnh "Hà Nội" + Xã "Ba Đình". | 1. Đổi Tỉnh sang "TP Hồ Chí Minh" | 1. Xã/Phường tự động clear về blank (placeholder "Chọn xã/phường") |
| TC_083 | [Địa chỉ - Cá nhân] Kiểm tra validation bắt buộc + max 500 | Đăng nhập thành công. | 1. Để trống Địa chỉ → blur\n2. Nhập 500 ký tự\n3. Thử nhập ký tự 501 | 1. Inline error: "Địa chỉ là bắt buộc."\n2. Cho phép\n3. Không cho nhập thêm |
| TC_084 | [SĐT - Cá nhân] Kiểm tra prefix +84, đúng 9 chữ số | Đăng nhập thành công. Prefix mặc định +84. | 1. Nhập "987654321" (9 số)\n2. Blur | 1. Cho phép nhập\n2. Không có lỗi (valid) |
| TC_085 | [SĐT - Cá nhân] Kiểm tra nhập 8 số → lỗi | Đăng nhập thành công. Prefix +84. | 1. Nhập "98765432" (8 số)\n2. Blur | 2. Inline error: "Số điện thoại không hợp lệ." |
| TC_086 | [SĐT - Cá nhân] Kiểm tra không cho nhập quá 9 số | Đăng nhập thành công. Prefix +84. | 1. Nhập "987654321" (9 số)\n2. Thử nhập số thứ 10 | 2. Không cho nhập thêm (bị chặn) |
| TC_087 | [SĐT - Cá nhân] Kiểm tra chặn ký tự không phải số | Đăng nhập thành công. | 1. Thử nhập "abc", "!@#", " " vào trường SĐT | 1. Không cho nhập (chỉ chấp nhận 0-9) |
| TC_088 | [SĐT - Cá nhân] Kiểm tra để trống → lỗi bắt buộc | Đăng nhập thành công. | 1. Xóa hết SĐT → blur | 1. Inline error: "Số điện thoại là bắt buộc." |
| TC_089 | [Email - Cá nhân] Kiểm tra validation bắt buộc | Đăng nhập thành công. | 1. Xóa hết Email → blur | 1. Inline error: "Email là bắt buộc." |
| TC_090 | [Email - Cá nhân] Kiểm tra sai format | Đăng nhập thành công. | 1. Nhập "abc" → blur\n2. Nhập "abc@" → blur\n3. Nhập "@gmail.com" → blur | 1-3. Inline error: "Email không hợp lệ." |
| TC_091 | [Email - Cá nhân] Kiểm tra đúng format | Đăng nhập thành công. | 1. Nhập "user@domain.com" → blur | 1. Không có lỗi (valid) |
| TC_092 | [Tên TC - Tổ chức] Kiểm tra validation bắt buộc + max 255 | Đăng nhập thành công. Chọn Tổ chức/DN. | 1. Để trống → blur\n2. Nhập 255 ký tự\n3. Thử nhập ký tự 256 | 1. Inline error: "Tên tổ chức/doanh nghiệp là bắt buộc."\n2. Cho phép\n3. Không cho nhập thêm |
| TC_093 | [Người ĐD - Tổ chức] Kiểm tra validation bắt buộc + max 500 | Đăng nhập thành công. Chọn Tổ chức/DN. | 1. Để trống → blur\n2. Nhập 500 ký tự\n3. Thử nhập ký tự 501 | 1. Inline error: "Tên người đại diện là bắt buộc."\n2. Cho phép\n3. Không cho nhập thêm |
| TC_094 | [Chức vụ - Tổ chức] Kiểm tra validation bắt buộc + max 500 | Đăng nhập thành công. Chọn Tổ chức/DN. | 1. Để trống → blur\n2. Nhập 500 ký tự\n3. Thử nhập ký tự 501 | 1. Inline error: "Chức vụ là bắt buộc."\n2. Cho phép\n3. Không cho nhập thêm |
| TC_095 | [Cascading - Tổ chức] Kiểm tra đổi Tỉnh → auto clear Xã/Phường | Đăng nhập thành công. Chọn Tổ chức/DN. Đã chọn Tỉnh + Xã. | 1. Đổi Tỉnh sang giá trị khác | 1. Xã/Phường tự động clear về blank |
| TC_096 | [Chủ đề] Kiểm tra dropdown bắt buộc | Đăng nhập thành công. | 1. Không chọn Chủ đề phản ánh\n2. Kiểm tra nút Gửi | 2. Nút "Gửi phản ánh" vẫn Disabled |
| TC_097 | [Đơn vị tiếp nhận] Kiểm tra dropdown bắt buộc | Đăng nhập thành công. | 1. Không chọn Đơn vị tiếp nhận\n2. Kiểm tra nút Gửi | 2. Nút "Gửi phản ánh" vẫn Disabled |
| TC_098 | [Tiêu đề] Kiểm tra validation bắt buộc + max 200 | Đăng nhập thành công. | 1. Để trống → blur\n2. Nhập 200 ký tự\n3. Thử nhập ký tự 201 | 1. Inline error: "Tiêu đề phản ánh là bắt buộc."\n2. Cho phép\n3. Không cho nhập thêm |
| TC_099 | [Loại nội dung] Kiểm tra Radio Group mặc định | Đăng nhập thành công. | 1. Kiểm tra Radio Group "Loại nội dung" | 1. Mặc định chọn "Quy định hành chính". Tap → chuyển sang "Hành vi hành chính". |
| TC_100 | [Nội dung] Kiểm tra validation bắt buộc + max 10.000 | Đăng nhập thành công. | 1. Để trống → blur\n2. Nhập 10.000 ký tự\n3. Thử nhập ký tự 10.001 | 1. Inline error: "Nội dung phản ánh là bắt buộc."\n2. Cho phép, textarea scroll\n3. Không cho nhập thêm |
| TC_101 | [Upload] Kiểm tra upload file hợp lệ (PDF) | Đăng nhập thành công. | 1. Tap "Tải tệp lên"\n2. Chọn file PDF (5MB) | 2. Upload thành công, hiển thị file trong danh sách đã chọn |
| TC_102 | [Upload] Kiểm tra upload file hợp lệ (JPG, PNG, DOC, DOCX) | Đăng nhập thành công. | 1. Upload lần lượt: file.jpg, file.png, file.doc, file.docx | 1. Tất cả upload thành công |
| TC_103 | [Upload] Kiểm tra chặn file định dạng không hợp lệ (.exe) | Đăng nhập thành công. | 1. Chọn file .exe | 1. Inline error: "Định dạng file không hỗ trợ." |
| TC_104 | [Upload] Kiểm tra chặn file định dạng không hợp lệ (.zip, .mp4, .txt) | Đăng nhập thành công. | 1. Chọn file .zip\n2. Chọn file .mp4\n3. Chọn file .txt | 1-3. Inline error: "Định dạng file không hỗ trợ." |
| TC_105 | [Upload] Kiểm tra file đúng 10MB (BVA boundary) | Đăng nhập thành công. | 1. Chọn file PDF đúng 10MB | 1. Upload thành công |
| TC_106 | [Upload] Kiểm tra chặn file >10MB (BVA: 10.01MB) | Đăng nhập thành công. | 1. Chọn file PDF 10.01MB | 1. Inline error: "File vượt quá dung lượng cho phép (tối đa 10MB)." |
| TC_107 | [Upload] Kiểm tra ưu tiên lỗi format trước lỗi size | Đăng nhập thành công. | 1. Chọn file .exe 15MB (sai format + vượt size) | 1. Inline error: "Định dạng file không hỗ trợ." (check format trước) |
| TC_108 | [Nút Gửi] Kiểm tra Enabled khi điền đủ field hợp lệ (Cá nhân) | Đăng nhập thành công. Điền đầy đủ: Họ tên, Tỉnh, Xã, Địa chỉ, SĐT, Email, Chủ đề, Đơn vị, Tiêu đề, Nội dung. | 1. Kiểm tra nút "Gửi phản ánh" | 1. Nút chuyển sang Enabled |
| TC_109 | [Nút Gửi] Kiểm tra chuyển lại Disabled khi xóa field bắt buộc | Đăng nhập thành công. Nút đang Enabled. | 1. Xóa hết trường Tiêu đề | 1. Nút "Gửi phản ánh" chuyển lại Disabled ngay lập tức (real-time) |
| TC_110 | [Gửi thành công - Cá nhân] Kiểm tra flow gửi phản ánh happy path | Đăng nhập thành công. Điền đầy đủ form Cá nhân hợp lệ. | 1. Tap "Gửi phản ánh"\n2. Chờ API phản hồi | 2.\n- Hiển thị toast: "Phản ánh kiến nghị của bạn đã được gửi thành công. Mã phản ánh: [MÃ]."\n- Tự động quay về danh sách\n- Danh sách đã refresh, phản ánh mới hiển thị ở đầu |
| TC_111 | [Gửi thành công - Tổ chức] Kiểm tra flow gửi phản ánh Tổ chức/DN | Đăng nhập thành công. Chọn Tổ chức/DN. Điền đầy đủ form hợp lệ. | 1. Tap "Gửi phản ánh" | 1. Toast thành công + mã → quay về danh sách → danh sách refresh |
| TC_112 | [Lưu nháp] Kiểm tra lưu nháp không validate bắt buộc | Đăng nhập thành công. Form chưa điền đầy đủ (chỉ có Họ tên). | 1. Tap "Lưu nháp" | 1. App lưu bản nháp thành công mà không hiển thị lỗi validation |
| TC_113 | [Validation realtime] Kiểm tra inline error on blur | Đăng nhập thành công. | 1. Tap vào trường Email\n2. Nhập "abc"\n3. Tap ra ngoài (blur) | 3. Hiển thị inline error: "Email không hợp lệ." ngay lập tức (không cần tap Submit) |
| TC_114 | [Auto-trim] Kiểm tra trim whitespace trước validate | Đăng nhập thành công. | 1. Nhập "  Nguyễn Văn A  " vào Họ tên\n2. Submit form | 2. App trim thành "Nguyễn Văn A" → validate OK |
| TC_115 | [Error] Kiểm tra lỗi mạng khi gửi phản ánh | Đăng nhập thành công. Điền đầy đủ form. Tắt mạng. | 1. Tap "Gửi phản ánh" | 1. Hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại". Giữ nguyên form. |
| TC_116 | [Error] Kiểm tra timeout khi gửi phản ánh (>10s) | Đăng nhập thành công. Điền đầy đủ form. Giả lập API chậm >10s. | 1. Tap "Gửi phản ánh" | 1. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại" |
| TC_117 | [Dropdown option dài] Kiểm tra truncate "..." + tap giữ xem đầy đủ | Đăng nhập thành công. Danh sách Tỉnh có tên dài. | 1. Mở dropdown Tỉnh/TP\n2. Tap và giữ option có tên dài | 1. Tên dài bị cắt ngắn + "..."\n2. Hiển thị toàn bộ tên option |
| TC_118 | [Dropdown highlight] Kiểm tra highlight option đã chọn | Đăng nhập thành công. Đã chọn Tỉnh = "Hà Nội". | 1. Mở lại dropdown Tỉnh/TP | 1. Option "Hà Nội" được highlight/bold |
| TC_119 | [Data clear] Kiểm tra dữ liệu bị xóa khi rời Form | Đăng nhập thành công. Đã điền một phần form. | 1. Tap nút ← (quay lại)\n2. Mở lại Form Tạo mới | 2. Form trống (dữ liệu đã bị xóa) |
| TC_120 | [Ghi chú] Kiểm tra hiển thị cảnh báo thông tin nhạy cảm | Đăng nhập thành công. | 1. Kiểm tra block Nội dung phản ánh | 1. Hiển thị label: "Vui lòng không ghi thông tin cá nhân nhạy cảm." |

---

## Requirement Traceability Matrix (RTM)

| Req-ID | Mô tả | Test Cases | Trạng thái |
|--------|--------|------------|------------|
| UC53-FR-001 | Tải danh sách phản ánh | TC_001, TC_007 | Đã bao phủ |
| UC53-FR-003 | Lazy load 20 bản ghi | TC_008, TC_009 | Đã bao phủ |
| UC53-FR-012 | Tìm kiếm theo mã | TC_012, TC_013, TC_014, TC_015, TC_016, TC_017, TC_018 | Đã bao phủ |
| UC53-FR-019 | Lọc theo trạng thái | TC_033 | Đã bao phủ |
| UC53-FR-020 | Lọc theo ngày tạo | TC_034, TC_035, TC_036, TC_037 | Đã bao phủ |
| UC53-FR-030 | Pull-to-refresh | TC_020 | Đã bao phủ |
| UC63-FR-001 | Hiển thị chi tiết | TC_044, TC_048-TC_060 | Đã bao phủ |
| UC63-FR-007 | Xem file PDF/JPG/PNG | TC_052, TC_053 | Đã bao phủ |
| UC64-FR-003 | Giữ dữ liệu chuyển đối tượng | TC_072, TC_073 | Đã bao phủ |
| UC64-FR-008 | Cascading dropdown | TC_082, TC_095 | Đã bao phủ |
| UC64-FR-012 | SĐT +84 = 9 số | TC_084, TC_085, TC_086, TC_087, TC_088 | Đã bao phủ |
| UC64-FR-026 | Upload file hợp lệ | TC_101, TC_102 | Đã bao phủ |
| UC64-FR-028 | File max 10MB | TC_105, TC_106 | Đã bao phủ |
| UC64-FR-030 | Nút Gửi Disabled/Enabled | TC_070, TC_108, TC_109 | Đã bao phủ |
| UC64-FR-033 | Gửi thành công Cá nhân | TC_110 | Đã bao phủ |
| UC64-FR-034 | Gửi thành công Tổ chức | TC_111 | Đã bao phủ |
| UC65-FR-001 | Nút Hủy Enabled "Chờ tiếp nhận" | TC_061 | Đã bao phủ |
| UC65-FR-003 | Nút Hủy Disabled trạng thái khác | TC_063, TC_064 | Đã bao phủ |
| UC65-FR-005 | Hủy thành công | TC_066 | Đã bao phủ |
| CMR-01 | Search debounce, trim, 500 chars | TC_012-TC_018 | Đã bao phủ |
| CMR-02 | Bộ lọc | TC_032-TC_043 | Đã bao phủ |
| CMR-04 | Lazy load | TC_008, TC_009, TC_023 | Đã bao phủ |
| CMR-05 | Badge trạng thái | TC_006 | Đã bao phủ |
| CMR-07 | Xử lý lỗi | TC_024-TC_028, TC_068, TC_115, TC_116 | Đã bao phủ |
| CMR-09 | Form validation | TC_075-TC_100, TC_113, TC_114 | Đã bao phủ |
| CMR-14 | Empty state / Null | TC_002, TC_005, TC_045, TC_056, TC_058, TC_060 | Đã bao phủ |
| CMR-15 | Date Range | TC_034-TC_038 | Đã bao phủ |
| CMR-18 | Debounce navigation | TC_029 | Đã bao phủ |

---

*Draft hoàn tất — Sẵn sàng cho Bước 4 (tạo .xlsx)*
