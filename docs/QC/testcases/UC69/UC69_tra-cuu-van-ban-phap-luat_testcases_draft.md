# TEST CASES DRAFT — UC69: Tra cứu văn bản pháp luật trên Mobile

**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Test Case Design Agent  
**Phiên bản:** v1  
**Source:** UC69_tra-cuu-van-ban-phap-luat_audited_20260511_v2.md (95.5/100 — READY)  
**Scenarios:** UC69_tra-cuu-van-ban-phap-luat_scenarios_20260511.md (87 scenarios)

---

## Cấu trúc màn hình

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Màn hình Danh sách Văn bản pháp luật | Header + Ô tìm kiếm + Radio + Danh sách Card |
| 2 | Bottom Sheet Bộ lọc tìm kiếm | 6 trường lọc + Nút Áp dụng/Nhập lại |
| 3 | Màn hình Chi tiết văn bản | Thông tin chi tiết + Mục lục + Toàn văn + VB liên quan |

---

## [Section Group] 1. Màn hình Danh sách Văn bản pháp luật

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_001 | Kiểm tra UI/UX màn hình Danh sách Văn bản pháp luật | Đăng nhập thành công vào ứng dụng (Cá nhân hoặc Tổ chức). Điều hướng đến màn hình "Văn bản pháp luật" từ Trang chủ hoặc Sidebar. | 1. Kiểm tra hiển thị trên màn hình [Danh sách Văn bản pháp luật] | 1. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design\n(Tham khảo ảnh [1]. Màn hình Danh sách Văn bản pháp luật sheet WFDesign)\n- Header đỏ đậm với tiêu đề "Văn bản pháp luật" màu trắng, nút Quay lại (←) bên trái\n- Ô tìm kiếm nền xám nhạt, viền bo tròn, placeholder "Tìm kiếm văn bản..."\n- Icon filter (3 gạch ngang) bên phải ô tìm kiếm, khung viền trắng\n- 2 radio xếp ngang: "Số hiệu, Trích yếu" (mặc định chọn) và "Toàn văn"\n- Danh sách Card cuộn dọc, sắp xếp theo ngày ban hành mới nhất |
| TC_002 | [Card văn bản] Kiểm tra hiển thị thông tin trên mỗi Card | Đăng nhập thành công. Điều hướng đến màn hình "Văn bản pháp luật". Danh sách có dữ liệu. | 1. Kiểm tra hiển thị thông tin trên 1 Card văn bản | 1.\n- Tag Loại văn bản: góc trái trên, lấy từ API\n- Tag Trạng thái: góc phải trên, lấy từ API\n- Tên văn bản: font đậm, màu đen, tối đa 2 dòng\n- "Ban hành: [DD/MM/YYYY]" dòng 1, màu xám\n- "Hiệu lực: [DD/MM/YYYY]" dòng 2, màu xám\n- Cơ quan ban hành: góc trái dưới, màu xám đậm\n- Nút "Xem chi tiết →": góc phải dưới |
| TC_003 | [Card văn bản] Kiểm tra hiển thị khi Tên văn bản quá dài (> 2 dòng) | Đăng nhập thành công. Có văn bản với tên rất dài (> 2 dòng hiển thị). | 1. Kiểm tra hiển thị Tên văn bản trên Card | 1. Tên văn bản hiển thị tối đa 2 dòng, phần vượt quá hiển thị "..." |
| TC_004 | [Card văn bản] Kiểm tra hiển thị khi các trường dữ liệu null | Đăng nhập thành công. Có văn bản với một số trường dữ liệu null (Tên, Ngày ban hành, Ngày hiệu lực, Cơ quan ban hành). | 1. Kiểm tra hiển thị Card khi dữ liệu null | 1.\n- Tên văn bản null → hiển thị "-"\n- Ngày ban hành null → hiển thị "Ban hành: -"\n- Ngày hiệu lực null → hiển thị "Hiệu lực: -"\n- Cơ quan ban hành null → hiển thị "-" |
| TC_005 | [Tag Trạng thái] Kiểm tra hiển thị badge cho 5 trạng thái | Đăng nhập thành công. Có văn bản với các trạng thái khác nhau. | 1. Kiểm tra hiển thị badge trạng thái trên các Card | 1. Badge hiển thị đúng cho 5 giá trị:\n- "Đang hiệu lực"\n- "Chưa hiệu lực"\n- "Không xác định hiệu lực"\n- "Hết hiệu lực"\n- "Hết hiệu lực một phần"\nBadge luôn read-only, không cho phép tap (CMR-05) |
| TC_006 | [Full-screen loading] Kiểm tra hiển thị loading khi first-load | Đăng nhập thành công. Truy cập lần đầu vào màn hình "Văn bản pháp luật". | 1. Kiểm tra hiển thị trong lúc tải dữ liệu lần đầu | 1. Hiển thị full-screen loading overlay (CMR-07 v1.1) trong lúc chờ API phản hồi |
| TC_007 | [Empty state] Kiểm tra hiển thị khi không có dữ liệu | Đăng nhập thành công. API trả về danh sách rỗng. | 1. Kiểm tra hiển thị màn hình khi không có văn bản nào | 1. Hiển thị empty state "Không tìm thấy kết quả." theo CMR-14. Ẩn danh sách kết quả. |
| TC_008 | [Active Filter Indicator] Kiểm tra hiển thị icon indicator khi có filter active | Đăng nhập thành công. Đã áp dụng bộ lọc có giá trị khác mặc định. | 1. Kiểm tra hiển thị icon filter trên màn hình danh sách | 1. Icon indicator màu xanh lá cây xuất hiện ở góc phải trên icon filter (CMR-02) |
| TC_009 | [Active Filter Indicator] Kiểm tra ẩn icon indicator khi không có filter active | Đăng nhập thành công. Tất cả field bộ lọc ở giá trị mặc định. | 1. Kiểm tra hiển thị icon filter trên màn hình danh sách | 1. Không hiển thị icon indicator. Chỉ hiển thị icon filter bình thường. |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_010 | [Ô tìm kiếm] Kiểm tra tìm kiếm theo tên văn bản với phạm vi "Số hiệu, Trích yếu" (mặc định) | Đăng nhập thành công. Ở màn hình Danh sách. Radio "Số hiệu, Trích yếu" đang được chọn (mặc định). | 1. Nhập từ khóa "Thông tư" vào ô tìm kiếm\n2. Chờ 3 giây (debounce)\n3. Kiểm tra hiển thị danh sách kết quả | 3. Danh sách cập nhật, chỉ hiển thị các văn bản có tên/số hiệu/trích yếu chứa từ khóa "Thông tư" |
| TC_011 | [Ô tìm kiếm] Kiểm tra debounce 3 giây hoạt động đúng | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Nhập "Nghị" vào ô tìm kiếm\n2. Chờ 1 giây, nhập thêm " định"\n3. Chờ 3 giây không gõ thêm\n4. Kiểm tra hiển thị | 4. Hệ thống chỉ gọi API tìm kiếm 1 lần sau 3 giây ngừng gõ, kết quả trả về cho từ khóa "Nghị định" |
| TC_012 | [Ô tìm kiếm] Kiểm tra tìm kiếm gần đúng (fuzzy search) | Đăng nhập thành công. Ở màn hình Danh sách. Có văn bản tên "Thông tư số 20/2026/TT-BNNMT". | 1. Nhập "20/2026" vào ô tìm kiếm\n2. Chờ 3 giây\n3. Kiểm tra kết quả | 3. Kết quả trả về bao gồm văn bản chứa "20/2026" (tìm gần đúng, không yêu cầu khớp chính xác toàn bộ) |
| TC_013 | [Ô tìm kiếm] Kiểm tra giới hạn 500 ký tự — nhập đúng 500 ký tự (BVA) | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Nhập đúng 500 ký tự vào ô tìm kiếm\n2. Chờ 3 giây\n3. Kiểm tra hiển thị | 2. Hệ thống chấp nhận 500 ký tự\n3. Thực hiện tìm kiếm bình thường |
| TC_014 | [Ô tìm kiếm] Kiểm tra giới hạn 500 ký tự — nhập 501 ký tự (BVA) | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Nhập 501 ký tự vào ô tìm kiếm | 1. Hệ thống không cho phép nhập ký tự thứ 501. Ô tìm kiếm chặn tại 500 ký tự. |
| TC_015 | [Ô tìm kiếm] Kiểm tra xóa hết từ khóa → hiển thị danh sách mặc định | Đăng nhập thành công. Đã nhập từ khóa và có kết quả tìm kiếm. | 1. Xóa hết text trong ô tìm kiếm\n2. Chờ 3 giây\n3. Kiểm tra hiển thị | 3. Hiển thị lại danh sách mặc định (sắp xếp theo ngày ban hành mới nhất) |
| TC_016 | [Ô tìm kiếm] Kiểm tra nhập ký tự đặc biệt | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Nhập "@#/-.%" vào ô tìm kiếm\n2. Chờ 3 giây\n3. Kiểm tra hiển thị | 3. Hệ thống xử lý bình thường, không crash. Trả về kết quả phù hợp hoặc empty state "Không tìm thấy kết quả." |
| TC_017 | [Radio] Kiểm tra chuyển từ "Số hiệu, Trích yếu" sang "Toàn văn" | Đăng nhập thành công. Đã nhập keyword "Thông tư". Bộ lọc đã áp dụng (Lĩnh vực = "Đầu tư"). | 1. Tap radio "Toàn văn"\n2. Kiểm tra hiển thị | 2.\n- Danh sách reset về trang đầu\n- Keyword "Thông tư" giữ nguyên trong ô tìm kiếm\n- Bộ lọc "Lĩnh vực = Đầu tư" giữ nguyên\n- Mỗi Card hiển thị thêm khối nội dung toàn văn (nền xám nhạt) |
| TC_018 | [Radio] Kiểm tra chuyển từ "Toàn văn" về "Số hiệu, Trích yếu" | Đăng nhập thành công. Radio "Toàn văn" đang được chọn. Có keyword và bộ lọc. | 1. Tap radio "Số hiệu, Trích yếu"\n2. Kiểm tra hiển thị | 2.\n- Danh sách reset về trang đầu\n- Keyword giữ nguyên\n- Bộ lọc giữ nguyên\n- Khối nội dung toàn văn ẩn đi |
| TC_019 | [Radio "Toàn văn"] Kiểm tra hiển thị khi văn bản không có nội dung toàn văn | Đăng nhập thành công. Radio "Toàn văn" đang chọn. Có văn bản không có nội dung toàn văn. | 1. Kiểm tra hiển thị khối toàn văn trên Card | 1. Khối toàn văn hiển thị "Không có dữ liệu." theo CMR-14 |
| TC_020 | [Lazy load] Kiểm tra tải thêm 20 bản ghi khi cuộn xuống | Đăng nhập thành công. Danh sách có > 20 bản ghi. | 1. Cuộn xuống cuối danh sách\n2. Kiểm tra hiển thị | 1. Hiển thị spinner cục bộ ở cuối danh sách (không full-screen loading)\n2. Tải thêm 20 bản ghi tiếp theo, nối tiếp liền mạch |
| TC_021 | [Lazy load] Kiểm tra khi đã tải hết dữ liệu | Đăng nhập thành công. Đã cuộn và tải hết tất cả bản ghi. | 1. Cuộn xuống cuối danh sách\n2. Kiểm tra hiển thị | 2. Không trigger thêm API call, không hiển thị spinner. Danh sách dừng tại bản ghi cuối cùng. |
| TC_022 | [Pull to Refresh] Kiểm tra kéo xuống để tải lại | Đăng nhập thành công. Ở màn hình Danh sách. Có keyword và bộ lọc đang active. | 1. Kéo xuống (pull to refresh)\n2. Kiểm tra hiển thị | 2. Danh sách tải lại từ đầu, giữ nguyên keyword tìm kiếm và bộ lọc hiện tại |
| TC_023 | [Nút "Xem chi tiết →"] Kiểm tra tap mở chi tiết | Đăng nhập thành công. Danh sách có dữ liệu. | 1. Tap nút "Xem chi tiết →" trên 1 Card\n2. Kiểm tra hiển thị | 2. Chuyển đến màn hình Chi tiết văn bản tương ứng |
| TC_024 | [Card] Kiểm tra tap toàn bộ Card mở chi tiết | Đăng nhập thành công. Danh sách có dữ liệu. | 1. Tap vào vùng bất kỳ trên Card (không phải nút "Xem chi tiết →")\n2. Kiểm tra hiển thị | 2. Chuyển đến màn hình Chi tiết văn bản tương ứng |
| TC_025 | [Debounce rapid tap] Kiểm tra tap nhanh liên tiếp chỉ navigate 1 lần | Đăng nhập thành công. Danh sách có dữ liệu. | 1. Tap nhanh liên tiếp 3 lần vào 1 Card\n2. Kiểm tra hiển thị | 2. Chỉ navigate 1 lần đến màn hình Chi tiết (không mở 2-3 lần). Debounce action đầu tiên (CMR-18). |
| TC_026 | [Nút Quay lại] Kiểm tra quay về màn hình trước | Đăng nhập thành công. Ở màn hình Danh sách. Truy cập từ Trang chủ. | 1. Tap nút Quay lại (←) trên header\n2. Kiểm tra hiển thị | 2. Quay về màn hình trước (Trang chủ) theo CMR-06 |
| TC_027 | [State Persistence] Kiểm tra quay lại danh sách giữ nguyên trạng thái | Đăng nhập thành công. Đã nhập keyword "Nghị định", áp dụng bộ lọc (Trạng thái = "Đang hiệu lực"), cuộn xuống vị trí giữa danh sách. | 1. Tap vào 1 Card để xem chi tiết\n2. Tap nút Quay lại (←) để quay về danh sách\n3. Kiểm tra hiển thị | 3.\n- Keyword "Nghị định" giữ nguyên trong ô tìm kiếm\n- Bộ lọc "Trạng thái = Đang hiệu lực" giữ nguyên\n- Vị trí scroll giữ nguyên\n- Radio đang chọn giữ nguyên (CMR-01) |
| TC_028 | [Tìm kiếm + Bộ lọc] Kiểm tra kết hợp keyword và bộ lọc | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Nhập "Thông tư" vào ô tìm kiếm\n2. Mở bộ lọc, chọn Trạng thái = "Đang hiệu lực", tap "Áp dụng"\n3. Chờ 3 giây\n4. Kiểm tra kết quả | 4. Danh sách chỉ hiển thị văn bản có tên chứa "Thông tư" VÀ trạng thái "Đang hiệu lực" (AND logic) |

### Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_029 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa |
| TC_030 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường |
| TC_031 | Kiểm tra tính nhất quán của các thông báo | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình |
| TC_032 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ |
| TC_033 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. App chỉ hỗ trợ Portrait. Màn hình không xoay theo (khóa Portrait). |
| TC_034 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. App chỉ hỗ trợ Portrait. Giao diện không bị vỡ. |
| TC_035 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | Đăng nhập thành công. Thiết bị cài cỡ chữ lớn nhất. | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ |
| TC_036 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | Đăng nhập thành công. Thiết bị cài cỡ chữ nhỏ nhất. | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ |

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_037 | Xác nhận hiển thị khi người dùng chạm vào nút [Quay lại] trên thiết bị Android | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó |
| TC_038 | Xác nhận hiển thị khi người dùng vuốt từ trái sang phải trên thiết bị iOS | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó |
| TC_039 | Xác nhận hiển thị khi người dùng tắt và mở lại ứng dụng | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng mở lại từ Trang chủ, giữ nguyên session đăng nhập |
| TC_040 | Kiểm tra chế độ đa nhiệm (multitasking) | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng giữ nguyên ở trạng thái hiện tại |
| TC_041 | Xác nhận hiển thị khi người dùng khóa và mở khóa màn hình thiết bị | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị | 4. Giữ nguyên trạng thái hiện tại của ứng dụng |
| TC_042 | Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh) | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Người dùng ở màn hình hiện tại\n2. Kéo xuống để làm mới | 2. Hiển thị dữ liệu mới nhất của màn hình |
| TC_043 | Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more) | Đăng nhập thành công. Danh sách có > 20 bản ghi. | 1. Người dùng cuộn xuống cuối danh sách | 1. Hiển thị thêm dữ liệu mới (20 bản ghi tiếp theo) |
| TC_044 | Kiểm tra phản hồi khi thiết bị nhận được thông báo từ ứng dụng khác | Đăng nhập thành công. Ở màn hình Danh sách. Ứng dụng khác được phép gửi thông báo. | 1. Người dùng mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị | 3. Không có lỗi nào xảy ra |

---

## [Section Group] 2. Bottom Sheet Bộ lọc tìm kiếm

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_045 | Kiểm tra UI/UX Bottom Sheet Bộ lọc tìm kiếm | Đăng nhập thành công. Ở màn hình Danh sách. | 1. Tap icon filter\n2. Kiểm tra hiển thị Bottom Sheet | 2. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design\n(Tham khảo ảnh [2]. Bottom Sheet Bộ lọc sheet WFDesign)\n- Nút Đóng (X) góc phải trên\n- Trường "Cơ quan ban hành": Textbox, placeholder "Nhập cơ quan ban hành"\n- Trường "Khoảng ngày ban hành": Date Range Picker, icon lịch, placeholder "Ngày bắt đầu - Ngày kết thúc"\n- Dropdown "Loại văn bản": mặc định "Tất cả văn bản"\n- Dropdown "Lĩnh vực": mặc định "Tất cả lĩnh vực"\n- Dropdown "Đơn vị soạn thảo": mặc định "Tất cả đơn vị soạn thảo"\n- Dropdown "Trạng thái": mặc định "Tất cả trạng thái"\n- Nút "Nhập lại": bên trái, text đỏ, icon refresh\n- Nút "Áp dụng": bên phải, nền đỏ đậm |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_046 | [Nút "Áp dụng"] Kiểm tra áp dụng bộ lọc với 1 trường Dropdown | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn Loại văn bản = "Thông tư"\n2. Tap nút "Áp dụng"\n3. Kiểm tra hiển thị | 2. Bottom Sheet đóng lại\n3. Danh sách cập nhật, chỉ hiển thị văn bản có Loại = "Thông tư" |
| TC_047 | [Bộ lọc] Kiểm tra áp dụng nhiều trường kết hợp (Decision Table) | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn Loại văn bản = "Nghị định"\n2. Chọn Lĩnh vực = "Đầu tư"\n3. Chọn Trạng thái = "Đang hiệu lực"\n4. Tap "Áp dụng"\n5. Kiểm tra kết quả | 4. Bottom Sheet đóng\n5. Danh sách chỉ hiển thị văn bản thỏa mãn TẤT CẢ điều kiện (AND logic) |
| TC_048 | [Bộ lọc] Kiểm tra áp dụng tất cả 6 trường cùng lúc | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Nhập "Chính phủ" vào Cơ quan ban hành\n2. Chọn Khoảng ngày: 01/01/2025 - 31/12/2025\n3. Chọn Loại văn bản = "Nghị định"\n4. Chọn Lĩnh vực = "Đầu tư"\n5. Chọn Đơn vị soạn thảo = "Bộ Kế hoạch và Đầu tư"\n6. Chọn Trạng thái = "Đang hiệu lực"\n7. Tap "Áp dụng"\n8. Kiểm tra kết quả | 7. Bottom Sheet đóng\n8. Danh sách chỉ hiển thị văn bản thỏa mãn tất cả 6 điều kiện |
| TC_049 | [Searchable Dropdown] Kiểm tra tìm kiếm option trong dropdown | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Tap dropdown "Loại văn bản"\n2. Nhập "Thông" vào ô search\n3. Kiểm tra hiển thị | 2. Mở danh sách option + ô search\n3. Danh sách option lọc theo từ khóa "Thông" (gần đúng), sắp xếp A-Z |
| TC_050 | [Searchable Dropdown] Kiểm tra chọn option và highlight | Đăng nhập thành công. Bottom Sheet đang mở. Dropdown "Lĩnh vực" đang mở. | 1. Tap chọn option "Đầu tư"\n2. Kiểm tra hiển thị dropdown sau khi chọn\n3. Tap lại dropdown "Lĩnh vực"\n4. Kiểm tra hiển thị | 1. Dropdown đóng, hiển thị giá trị "Đầu tư"\n4. Option "Đầu tư" được highlight/bold |
| TC_051 | [Searchable Dropdown] Kiểm tra text option dài truncate + long press xem toàn bộ | Đăng nhập thành công. Bottom Sheet đang mở. Dropdown có option text rất dài. | 1. Tap dropdown có option text dài\n2. Kiểm tra hiển thị option dài\n3. Tap giữ (long press) option dài | 2. Text dài bị truncate + "..."\n3. Hiển thị toàn bộ nội dung option |
| TC_052 | [Searchable Dropdown] Kiểm tra khi không tìm thấy option phù hợp | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Tap dropdown "Đơn vị soạn thảo"\n2. Nhập "XYZABC" (không khớp option nào)\n3. Kiểm tra hiển thị | 3. Hiển thị empty state trong dropdown (không có option nào) |
| TC_053 | [Cơ quan ban hành] Kiểm tra nhập text tìm kiếm gần đúng | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Nhập "Chính phủ" vào trường "Cơ quan ban hành"\n2. Tap "Áp dụng"\n3. Kiểm tra kết quả | 3. Danh sách hiển thị văn bản có cơ quan ban hành chứa "Chính phủ" (tìm gần đúng) |
| TC_054 | [Cơ quan ban hành] Kiểm tra giới hạn 500 ký tự — nhập đúng 500 (BVA) | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Nhập đúng 500 ký tự vào trường "Cơ quan ban hành"\n2. Kiểm tra hiển thị | 2. Hệ thống chấp nhận 500 ký tự bình thường |
| TC_055 | [Cơ quan ban hành] Kiểm tra giới hạn 500 ký tự — nhập 501 (BVA) | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Nhập 501 ký tự vào trường "Cơ quan ban hành" | 1. Hệ thống không cho phép nhập ký tự thứ 501. Chặn tại 500 ký tự. |
| TC_056 | [Date Range] Kiểm tra chọn cả ngày bắt đầu và ngày kết thúc | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Tap trường "Khoảng ngày ban hành"\n2. Chọn ngày bắt đầu = 01/01/2025\n3. Chọn ngày kết thúc = 31/12/2025\n4. Tap "Áp dụng"\n5. Kiểm tra kết quả | 4. Bottom Sheet đóng\n5. Danh sách chỉ hiển thị văn bản có ngày ban hành từ 01/01/2025 đến 31/12/2025 |
| TC_057 | [Date Range] Kiểm tra chỉ chọn ngày bắt đầu (kết thúc = vô hạn) | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn ngày bắt đầu = 01/06/2025\n2. Không chọn ngày kết thúc\n3. Tap "Áp dụng"\n4. Kiểm tra kết quả | 4. Danh sách hiển thị văn bản có ngày ban hành từ 01/06/2025 đến hiện tại (CMR-15) |
| TC_058 | [Date Range] Kiểm tra chỉ chọn ngày kết thúc (bắt đầu = không giới hạn) | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Không chọn ngày bắt đầu\n2. Chọn ngày kết thúc = 31/12/2024\n3. Tap "Áp dụng"\n4. Kiểm tra kết quả | 4. Danh sách hiển thị văn bản có ngày ban hành từ đầu đến 31/12/2024 (CMR-15) |
| TC_059 | [Date Range] Kiểm tra ngày kết thúc chỉ cho phép từ ngày bắt đầu trở về sau | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn ngày bắt đầu = 15/03/2025\n2. Mở Date Picker ngày kết thúc\n3. Kiểm tra các ngày trước 15/03/2025 | 3. Các ngày trước 15/03/2025 bị disable, không cho phép chọn (CMR-15) |
| TC_060 | [Date Range] Kiểm tra cho phép chọn ngày tương lai | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Mở Date Picker\n2. Chọn ngày tương lai (VD: 01/01/2027)\n3. Kiểm tra hiển thị | 2. Hệ thống cho phép chọn ngày tương lai bình thường\n3. Giá trị ngày tương lai hiển thị đúng |
| TC_061 | [Nút "Nhập lại"] Kiểm tra reset tất cả field về mặc định | Đăng nhập thành công. Bottom Sheet đang mở. Đã chọn/nhập giá trị cho nhiều trường. | 1. Tap nút "Nhập lại"\n2. Kiểm tra hiển thị | 2.\n- Cơ quan ban hành: trống\n- Khoảng ngày: trống\n- Loại văn bản: "Tất cả văn bản"\n- Lĩnh vực: "Tất cả lĩnh vực"\n- Đơn vị soạn thảo: "Tất cả đơn vị soạn thảo"\n- Trạng thái: "Tất cả trạng thái"\n- Bottom Sheet giữ nguyên mở |
| TC_062 | [Đóng Bottom Sheet] Kiểm tra tap ngoài vùng Bottom Sheet | Đăng nhập thành công. Bottom Sheet đang mở. Đã chọn giá trị bộ lọc. | 1. Tap ra ngoài vùng Bottom Sheet\n2. Kiểm tra hiển thị | 1. Bottom Sheet đóng\n2. Bộ lọc KHÔNG được áp dụng. Danh sách giữ nguyên trạng thái trước đó. |
| TC_063 | [Đóng Bottom Sheet] Kiểm tra tap nút Đóng (X) | Đăng nhập thành công. Bottom Sheet đang mở. Đã chọn giá trị bộ lọc. | 1. Tap nút Đóng (X)\n2. Kiểm tra hiển thị | 1. Bottom Sheet đóng\n2. Bộ lọc KHÔNG được áp dụng. |
| TC_064 | [Đóng Bottom Sheet] Kiểm tra nút Back vật lý Android | Đăng nhập thành công. Bottom Sheet đang mở (Android). | 1. Nhấn nút Back vật lý trên thiết bị Android\n2. Kiểm tra hiển thị | 1. Bottom Sheet đóng (KHÔNG thoát màn hình danh sách)\n2. Bộ lọc KHÔNG được áp dụng. |
| TC_065 | [Dropdown Trạng thái] Kiểm tra list tĩnh 5 giá trị (EP) | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Tap dropdown "Trạng thái"\n2. Kiểm tra danh sách option | 2. Hiển thị list tĩnh gồm 5 giá trị:\n- Đang hiệu lực\n- Chưa hiệu lực\n- Không xác định hiệu lực\n- Hết hiệu lực\n- Hết hiệu lực một phần |
| TC_066 | [Bộ lọc] Kiểm tra không có kết quả phù hợp với điều kiện lọc | Đăng nhập thành công. Bottom Sheet đang mở. | 1. Chọn điều kiện lọc không có văn bản nào phù hợp\n2. Tap "Áp dụng"\n3. Kiểm tra hiển thị | 3. Hiển thị "Không tìm thấy kết quả." theo CMR-14 |

### Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

(Áp dụng 8 TC common UI/UX tương tự Section 1 — TC_067 đến TC_074)

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

(Áp dụng 8 TC tương tác thiết bị tương tự Section 1 — TC_075 đến TC_082, trong đó TC pull-to-refresh và scroll-to-load-more ghi N/A vì Bottom Sheet không hỗ trợ)

---

## [Section Group] 3. Màn hình Chi tiết văn bản

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_083 | Kiểm tra UI/UX màn hình Chi tiết văn bản | Đăng nhập thành công. Tap vào 1 Card từ danh sách để mở Chi tiết. | 1. Kiểm tra hiển thị trên màn hình [Chi tiết văn bản] | 1. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design\n(Tham khảo ảnh [3]. Màn hình Chi tiết văn bản sheet WFDesign)\n- Header đỏ đậm "Chi tiết văn bản", nút Quay lại (←)\n- Khối thông tin chi tiết (Card nền trắng viền nhạt)\n- Tên văn bản: font đậm, căn trái\n- Danh sách thuộc tính: Label xám bên trái, Value đen bên phải\n- Nút "Tải văn bản" nền đỏ đậm (nếu có file)\n- Nút "Xem PDF" nền trắng viền xám (nếu có file)\n- Khối "Văn bản liên quan"\n- Khối "Nội dung toàn văn" |
| TC_084 | [Skeleton loading] Kiểm tra hiển thị loading khi tải chi tiết | Đăng nhập thành công. Tap vào 1 Card. | 1. Kiểm tra hiển thị trong lúc chờ API chi tiết phản hồi | 1. Hiển thị Skeleton loading (placeholder animation) cho các block thông tin |
| TC_085 | [Thông tin chi tiết] Kiểm tra hiển thị đầy đủ thuộc tính | Đăng nhập thành công. Ở màn hình Chi tiết. API trả về đầy đủ dữ liệu. | 1. Kiểm tra hiển thị danh sách thuộc tính | 1. Hiển thị đầy đủ:\n- Số ký hiệu: font đậm\n- Loại văn bản\n- Ngày ban hành: DD/MM/YYYY\n- Ngày có hiệu lực: DD/MM/YYYY\n- Tình trạng hiệu lực: badge viền, read-only\n- Cơ quan ban hành\n- Người ký\n- Đơn vị soạn thảo\n- Lĩnh vực\n- Hiệu lực không gian |
| TC_086 | [Thông tin chi tiết] Kiểm tra hiển thị khi tất cả trường null | Đăng nhập thành công. Ở màn hình Chi tiết. API trả về null cho các trường. | 1. Kiểm tra hiển thị khi dữ liệu null | 1. Tất cả trường null hiển thị "-" (không để trống, không crash) |
| TC_087 | [Số ký hiệu] Kiểm tra wrap xuống dòng khi giá trị quá dài | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản có số ký hiệu rất dài. | 1. Kiểm tra hiển thị trường "Số ký hiệu" | 1. Giá trị quá dài wrap xuống dòng (không truncate, không overflow) |
| TC_088 | [Nút "Tải văn bản"] Kiểm tra ẩn khi không có file đính kèm | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản không có file DOC/DOCX. | 1. Kiểm tra hiển thị nút "Tải văn bản" | 1. Nút "Tải văn bản" ẩn hoàn toàn (không hiển thị) |
| TC_089 | [Nút "Xem PDF"] Kiểm tra ẩn khi không có file PDF | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản không có file PDF. | 1. Kiểm tra hiển thị nút "Xem PDF" | 1. Nút "Xem PDF" ẩn hoàn toàn (không hiển thị) |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_090 | [Nút "Tải văn bản"] Kiểm tra tải DOC/DOCX thành công | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản có file DOC/DOCX đính kèm. | 1. Tap nút "Tải văn bản"\n2. Kiểm tra hiển thị | 1. Tải file DOC/DOCX về máy\n2. Hiển thị Toast "Tải văn bản thành công." |
| TC_091 | [Nút "Xem PDF"] Kiểm tra mở PDF trên trình duyệt | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản có file PDF đính kèm. | 1. Tap nút "Xem PDF"\n2. Kiểm tra hiển thị | 2. Mở file PDF trực tiếp trên trình duyệt thiết bị (CMR-08) |
| TC_092 | [Tải văn bản] Kiểm tra khi file lỗi/mất trên server | Đăng nhập thành công. Ở màn hình Chi tiết. File trên server đã bị xóa/lỗi. | 1. Tap nút "Tải văn bản"\n2. Kiểm tra hiển thị | 2. Hiển thị Toast "Nội dung không tồn tại hoặc đã bị xóa." |
| TC_093 | [Xem PDF] Kiểm tra khi file PDF lỗi/mất trên server | Đăng nhập thành công. Ở màn hình Chi tiết. File PDF trên server đã bị xóa/lỗi. | 1. Tap nút "Xem PDF"\n2. Kiểm tra hiển thị | 2. Hiển thị Toast "Nội dung không tồn tại hoặc đã bị xóa." |
| TC_094 | [Mục lục] Kiểm tra mặc định collapse | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản có mục lục. | 1. Kiểm tra trạng thái mặc định của Mục lục | 1. Section Mục lục ở trạng thái Collapse (đóng) |
| TC_095 | [Mục lục] Kiểm tra tap expand danh sách | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản có mục lục. | 1. Tap tiêu đề "Mục lục"\n2. Kiểm tra hiển thị | 2. Expand (mở rộng) danh sách mục lục |
| TC_096 | [Mục lục] Kiểm tra tap mục lục → scroll đến đoạn tương ứng | Đăng nhập thành công. Ở màn hình Chi tiết. Mục lục đang expand. | 1. Tap vào 1 mục lục (VD: "Chương II")\n2. Kiểm tra hiển thị | 2.\n- Màn hình tự động scroll đến đoạn text "Chương II" trong Nội dung toàn văn\n- Mục lục tự động collapse lại |
| TC_097 | [Mục lục] Kiểm tra ẩn khi văn bản không có mục lục | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản không có mục lục. | 1. Kiểm tra hiển thị section Mục lục | 1. Toàn bộ section Mục lục ẩn hoàn toàn (không hiển thị) |
| TC_098 | [Nội dung toàn văn] Kiểm tra scroll trong block | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản có nội dung toàn văn dài. | 1. Scroll trong block Nội dung toàn văn\n2. Kiểm tra hiển thị | 2. Nội dung scroll được trong block, không giới hạn chiều cao cố định |
| TC_099 | [Nội dung toàn văn] Kiểm tra ẩn khi không có data và không có mục lục | Đăng nhập thành công. Ở màn hình Chi tiết. Văn bản không có toàn văn VÀ không có mục lục. | 1. Kiểm tra hiển thị section Mục lục và Toàn văn | 1. Ẩn cả 2 section (Mục lục + Toàn văn). Hiển thị "Không có dữ liệu." theo CMR-14 |
| TC_100 | [Văn bản liên quan] Kiểm tra hiển thị danh sách | Đăng nhập thành công. Ở màn hình Chi tiết. Có văn bản liên quan. | 1. Kiểm tra hiển thị khối "Văn bản liên quan" | 1.\n- Tiêu đề "Văn bản liên quan" font đậm\n- Mỗi item: Dòng 1 = Số hiệu (màu xanh dương, có thể tap), Dòng 2 = Mô tả (màu xám, tối đa 2 dòng) |
| TC_101 | [Văn bản liên quan] Kiểm tra hiển thị "Không có dữ liệu." khi rỗng | Đăng nhập thành công. Ở màn hình Chi tiết. Không có văn bản liên quan. | 1. Kiểm tra hiển thị khối "Văn bản liên quan" | 1. Khối "Văn bản liên quan" VẪN hiển thị tiêu đề. Nội dung hiển thị "Không có dữ liệu." theo CMR-14 (KHÔNG ẩn khối) |
| TC_102 | [Văn bản liên quan] Kiểm tra tap navigate đến chi tiết VB liên quan | Đăng nhập thành công. Ở màn hình Chi tiết. Có văn bản liên quan. | 1. Tap vào 1 item văn bản liên quan\n2. Kiểm tra hiển thị | 2. Chuyển đến màn hình Chi tiết của văn bản liên quan đó |
| TC_103 | [Văn bản liên quan] Kiểm tra Back quay về chi tiết gốc | Đăng nhập thành công. Đang ở Chi tiết văn bản liên quan (navigate từ VB gốc). | 1. Tap nút Quay lại (←)\n2. Kiểm tra hiển thị | 2. Quay về màn hình Chi tiết văn bản gốc (KHÔNG quay về danh sách) |
| TC_104 | [Deep navigation] Kiểm tra đi sâu vô hạn qua VB liên quan | Đăng nhập thành công. Ở màn hình Chi tiết VB A. VB A có VB liên quan B. VB B có VB liên quan C. | 1. Tap VB liên quan B → mở Chi tiết B\n2. Tap VB liên quan C → mở Chi tiết C\n3. Kiểm tra hiển thị | 3. Cho phép navigation sâu vô hạn. Chi tiết C hiển thị đúng. |
| TC_105 | [Deep navigation] Kiểm tra Back navigation đúng stack (LIFO) | Đăng nhập thành công. Đã navigate: Chi tiết A → Chi tiết B → Chi tiết C. | 1. Tap Back từ Chi tiết C\n2. Kiểm tra hiển thị\n3. Tap Back từ Chi tiết B\n4. Kiểm tra hiển thị | 2. Quay về Chi tiết B\n4. Quay về Chi tiết A (đúng thứ tự LIFO) |
| TC_106 | [Partial API failure] Kiểm tra 1 block lỗi, các block khác bình thường | Đăng nhập thành công. API VB liên quan lỗi, API thông tin chi tiết thành công. | 1. Mở Chi tiết văn bản\n2. Kiểm tra hiển thị | 2.\n- Khối thông tin chi tiết hiển thị bình thường\n- Khối VB liên quan hiển thị thông báo lỗi riêng (CMR-07)\n- Các block khác không bị ảnh hưởng |
| TC_107 | [Lỗi mạng] Kiểm tra mất kết nối khi tải chi tiết | Đăng nhập thành công. Tắt mạng trước khi mở chi tiết. | 1. Tap vào 1 Card để mở chi tiết\n2. Kiểm tra hiển thị | 2. Hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." với nút "Thử lại". Giữ nguyên màn hình. |
| TC_108 | [Đa ngôn ngữ] Kiểm tra text cứng thay đổi theo ngôn ngữ | Đăng nhập thành công. Đổi ngôn ngữ app sang English. Mở Chi tiết. | 1. Kiểm tra hiển thị text cứng trên màn hình Chi tiết | 1. Tất cả text cứng (header "Chi tiết văn bản", label "Số ký hiệu", "Ngày ban hành", button "Tải văn bản", "Xem PDF", "Văn bản liên quan", empty state, toast) thay đổi theo ngôn ngữ đã chọn (CMR-17) |
| TC_109 | [Đa ngôn ngữ] Kiểm tra nội dung API giữ nguyên | Đăng nhập thành công. Đổi ngôn ngữ app sang English. Mở Chi tiết. | 1. Kiểm tra hiển thị nội dung từ API | 1. Nội dung từ API (tên văn bản, số hiệu, cơ quan ban hành, nội dung toàn văn...) KHÔNG thay đổi khi đổi ngôn ngữ |
| TC_110 | [Session expire] Kiểm tra redirect khi phiên hết hạn | Đăng nhập thành công. Phiên đăng nhập hết hạn (401). | 1. Thực hiện thao tác bất kỳ trên màn hình Chi tiết\n2. Kiểm tra hiển thị | 2. Hệ thống redirect về màn đăng nhập |

### Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

(Áp dụng 8 TC common UI/UX — TC_111 đến TC_118)

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

(Áp dụng 8 TC tương tác thiết bị — TC_119 đến TC_126, trong đó TC pull-to-refresh ghi N/A, TC scroll-to-load-more ghi N/A)

---

## Requirement Traceability Matrix (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Tìm kiếm realtime theo Tên VB, kết hợp phạm vi | TC_010, TC_011, TC_012, TC_013, TC_017, TC_028 | ✅ Đã bao phủ |
| AC2 | Bottom Sheet bộ lọc 6 trường, kết hợp ô tìm kiếm | TC_045-TC_066 | ✅ Đã bao phủ |
| AC3 | Chi tiết hiển thị đúng format | TC_085, TC_086, TC_087 | ✅ Đã bao phủ |
| AC4 | Tải văn bản + Xem PDF | TC_088-TC_093 | ✅ Đã bao phủ |
| AC5 | Văn bản liên quan | TC_100-TC_105 | ✅ Đã bao phủ |
| AC6 | Nội dung toàn văn scroll | TC_098, TC_099 | ✅ Đã bao phủ |
| AC7 | Mục lục collapse/expand/scroll | TC_094-TC_097 | ✅ Đã bao phủ |
| AC8 | Debounce 3 giây | TC_011 | ✅ Đã bao phủ |
| AC9 | State Persistence | TC_027 | ✅ Đã bao phủ |
| AC10 | Sắp xếp theo ngày ban hành mới nhất | TC_001, TC_015 | ✅ Đã bao phủ |
| AC11 | Chuyển radio reset trang, giữ keyword/filter | TC_017, TC_018 | ✅ Đã bao phủ |
| AC12 | Partial API failure | TC_106 | ✅ Đã bao phủ |
| AC13 | Rapid tap debounce | TC_025 | ✅ Đã bao phủ |
| AC14 (implicit) | Active filter indicator | TC_008, TC_009 | ✅ Đã bao phủ |
| AC15 (implicit) | Searchable dropdown | TC_049-TC_052 | ✅ Đã bao phủ |
| AC16 (implicit) | Full-screen loading first-load | TC_006 | ✅ Đã bao phủ |
| AC17 (implicit) | Date Range CMR-15 + ngày tương lai | TC_056-TC_060 | ✅ Đã bao phủ |
| AC18 (implicit) | Deep navigation VB liên quan | TC_104, TC_105 | ✅ Đã bao phủ |
| AC19 (implicit) | Đa ngôn ngữ | TC_108, TC_109 | ✅ Đã bao phủ |

**Tổng kết RTM:** 19/19 AC đã được bao phủ 100%.
