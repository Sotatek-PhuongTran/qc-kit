# Test Cases Draft — UC56-57/66-68: Khai thác tin tức công bố trên Mobile

**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Agent (Claude)  
**Phiên bản:** v1  
**Tài liệu nguồn:** UC56-57_66_68_TinTuc.md (v1.2), UC56-57_66_68_tin-tuc_audited_20260511_v2.md, UC56-57_66_68_tin-tuc_scenarios_20260511.md  

---

## [Section Group] 1. Màn hình Danh sách Tin tức

### [Check type] Check UI/UX

#### Giai đoạn 1: Khởi tạo màn hình (Trạng thái tĩnh)

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_001 | Kiểm tra UI/UX màn hình Danh sách Tin tức khi có dữ liệu | 1. Đăng nhập thành công vào ứng dụng 2. Có dữ liệu bài viết trong hệ thống | 1. Từ Sidebar, nhấp vào mục "Tin tức" 2. Kiểm tra hiển thị màn hình [Danh sách Tin tức] | 2. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design (Tham khảo ảnh Màn hình Danh sách Tin tức sheet WFDesign) | |
| TC_002 | Kiểm tra Header hiển thị tiêu đề "Tin tức" cố định | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị Header màn hình [Danh sách Tin tức] | 1. - Header nền đỏ đậm - Tiêu đề "Tin tức" nằm giữa, màu trắng - Icon kính lúp (tìm kiếm) màu trắng bên phải - Icon filter (slider) màu trắng ngoài cùng bên phải | |
| TC_003 | Kiểm tra Tab Bar hiển thị đầy đủ 19 Tab | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị Tab Bar bên dưới Header | 1. - Hiển thị đầy đủ 19 Tab: Tất cả, Chính sách nổi bật, Chính sách đầu tư, Dịch vụ công, Kinh tế, Văn hóa, Giao thông, Y tế, Lao động, Xã hội, Du lịch, Thể thao, Quốc tế, Chính trị, Thời sự, Giáo dục, Tài chính, Câu chuyện thành công, Khác - Tab "Tất cả" được chọn mặc định (nền đỏ đậm, chữ trắng) - Các tab còn lại: nền xám nhạt, chữ đen/xanh đen - Hỗ trợ cuộn ngang | |
| TC_004 | Kiểm tra section "Tin nổi bật" khi có ≥2 bài | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có ≥2 bài viết được đánh dấu "Tin nổi bật" | 1. Kiểm tra hiển thị section "Tin nổi bật" | 1. - Hiển thị carousel cuộn ngang - Tự động chuyển bài sau mỗi 5 giây - Không có dot indicator - Mỗi card: nền ảnh cover + overlay tối, Tag đỏ "Tin nổi bật" góc trên trái, Tiêu đề trắng đậm (max 2 dòng), Trích dẫn (max 2 dòng), Footer: icon đồng hồ + ngày DD/MM/YYYY + icon user + tên tác giả | |
| TC_005 | Kiểm tra section "Tin nổi bật" khi chỉ có 1 bài | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Chỉ có 1 bài viết được đánh dấu "Tin nổi bật" | 1. Kiểm tra hiển thị section "Tin nổi bật" | 1. - Hiển thị 1 card tĩnh, không cuộn ngang - Không có auto-scroll - Card hiển thị đầy đủ: Tag đỏ, Tiêu đề, Trích dẫn, Footer | |
| TC_006 | Kiểm tra section "Tin nổi bật" khi không có bài nào | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Không có bài viết nào được đánh dấu "Tin nổi bật" | 1. Kiểm tra hiển thị section "Tin nổi bật" | 1. - Section "Tin nổi bật" ẩn hoàn toàn - Không chiếm không gian trên màn hình - Section "Tin tức mới nhất" được kéo lên trên | |
| TC_007 | Kiểm tra section "Tin tức mới nhất" hiển thị đúng cấu trúc | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có dữ liệu bài viết | 1. Kiểm tra hiển thị section "Tin tức mới nhất" | 1. - Label "Tin tức mới nhất" font đậm, màu đen/xanh đen, căn trái - Danh sách cuộn dọc - Mỗi card: Thumbnail bên trái (hình vuông, bo góc), bên phải gồm Tag Category (nền nhạt, chữ đỏ), Tiêu đề đậm đen (max 2 dòng), Trích dẫn xám (max 2 dòng), Footer: icon đồng hồ + ngày + icon user + tên tác giả | |
| TC_008 | Kiểm tra trạng thái rỗng "Không có dữ liệu." | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. API trả về danh sách rỗng | 1. Kiểm tra hiển thị màn hình [Danh sách Tin tức] | 1. Hiển thị thông báo "Không có dữ liệu." (theo CMR-14) | |
| TC_009 | Kiểm tra Skeleton Loading khi tải dữ liệu lần đầu | 1. Đăng nhập thành công | 1. Từ Sidebar, nhấp vào mục "Tin tức" 2. Kiểm tra hiển thị trong lúc tải dữ liệu | 2. - Hiển thị Skeleton Loading cho cả 2 section (Tin nổi bật + Tin tức mới nhất) - Skeleton biến mất khi data sẵn sàng | |
| TC_010 | Kiểm tra nút Quay lại hiển thị khi đi từ màn khác | 1. Đăng nhập thành công 2. Điều hướng đến màn hình [Danh sách Tin tức] từ một màn hình khác (không phải tab chính) | 1. Kiểm tra hiển thị Header | 1. - Nút Quay lại (←) hiển thị ở bên trái Header | |
| TC_011 | Kiểm tra nút Quay lại ẩn khi ở tab chính | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] từ tab chính (bottom nav) | 1. Kiểm tra hiển thị Header | 1. - Nút Quay lại (←) không hiển thị | |

#### Giai đoạn 2: Tương tác thành phần (Trạng thái thành phần)

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_012 | [Tab Bar] Kiểm tra cuộn ngang Tab Bar | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Vuốt ngang trên Tab Bar từ phải sang trái 2. Vuốt ngang từ trái sang phải | 1. Hiển thị các tab bị ẩn phía bên phải 2. Quay lại hiển thị các tab đầu tiên - Cuộn mượt mà, không giật | |
| TC_013 | [Tab Bar] Kiểm tra đổi tab hiển thị highlight đúng | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Nhấp vào tab "Kinh tế" | 1. - Tab "Kinh tế" chuyển sang trạng thái Active: nền đỏ đậm, chữ trắng - Tab "Tất cả" chuyển sang Inactive: nền xám nhạt, chữ đen/xanh đen | |
| TC_014 | [Carousel] Kiểm tra cuộn ngang thủ công carousel Tin nổi bật | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có ≥2 bài Tin nổi bật | 1. Vuốt ngang trên carousel Tin nổi bật | 1. - Carousel chuyển sang card tiếp theo - Cuộn mượt mà | |
| TC_015 | [Nút Quay lại] Kiểm tra nhấn nút Quay lại | 1. Đăng nhập thành công 2. Điều hướng đến màn hình [Danh sách Tin tức] từ màn hình khác | 1. Nhấp vào nút Quay lại (←) trên Header | 1. Quay về đúng màn hình trước đó trong navigation stack | |

### [Check type] Check Function

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_016 | [Tab Bar] Kiểm tra đổi tab tải lại danh sách đúng danh mục | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] tab "Tất cả" | 1. Nhấp vào tab "Kinh tế" 2. Kiểm tra hiển thị danh sách bài viết | 2. - Danh sách Tin nổi bật và Tin tức mới nhất chỉ hiển thị bài viết thuộc danh mục "Kinh tế" | |
| TC_017 | [Tab Bar] Kiểm tra debounce khi double-tap tab (CMR-18) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Nhấp nhanh liên tiếp 2 lần vào tab "Văn hóa" | 1. - Hệ thống chỉ gọi API 1 lần - Danh sách tải lại 1 lần duy nhất | |
| TC_018 | [Card Tin nổi bật] Kiểm tra tap card mở Chi tiết bài viết | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài Tin nổi bật | 1. Nhấp vào bất kỳ vị trí nào trên card Tin nổi bật | 1. Chuyển tiếp đến màn hình [Chi tiết bài viết] tương ứng | |
| TC_019 | [Card Tin nổi bật] Kiểm tra debounce khi double-tap card (CMR-18) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài Tin nổi bật | 1. Nhấp nhanh liên tiếp 2 lần vào card Tin nổi bật | 1. - Hệ thống chỉ navigate 1 lần - Không push 2 màn hình Chi tiết | |
| TC_020 | [Card Tin mới nhất] Kiểm tra tap card mở Chi tiết bài viết | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài trong danh sách Tin mới nhất | 1. Nhấp vào bất kỳ vị trí nào trên card Tin mới nhất | 1. Chuyển tiếp đến màn hình [Chi tiết bài viết] tương ứng | |
| TC_021 | [Exclusion Rule] Kiểm tra bài Tin nổi bật không lặp ở Tin mới nhất | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài được đánh dấu Tin nổi bật | 1. Kiểm tra danh sách section "Tin nổi bật" 2. Kiểm tra danh sách section "Tin tức mới nhất" | 2. Các bài viết đã hiển thị trong section "Tin nổi bật" KHÔNG xuất hiện lại trong section "Tin tức mới nhất" | |
| TC_022 | [Sắp xếp] Kiểm tra Tin mới nhất sắp xếp theo ngày giảm dần | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có nhiều bài viết với ngày đăng khác nhau | 1. Kiểm tra thứ tự hiển thị danh sách "Tin tức mới nhất" | 1. Bài viết được sắp xếp theo ngày đăng giảm dần (bài mới nhất hiển thị đầu tiên) | |
| TC_023 | [Lazy Load] Kiểm tra tải thêm 20 bài khi cuộn đến cuối | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có >20 bài viết | 1. Cuộn xuống cuối danh sách "Tin tức mới nhất" | 1. - Hệ thống tự động tải thêm 20 bài tiếp theo - Hiển thị loading indicator trong lúc tải | |
| TC_024 | [Lazy Load] Kiểm tra khi đã tải hết data | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Đã cuộn và tải hết toàn bộ bài viết | 1. Cuộn xuống cuối danh sách | 1. - Ẩn loading indicator - Không gọi thêm API khi cuộn tiếp | |
| TC_025 | [Lazy Load] Kiểm tra mất mạng khi đang lazy load | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có >20 bài viết 4. Đã tải trang đầu tiên | 1. Tắt mạng thiết bị 2. Cuộn xuống cuối danh sách để kích hoạt lazy load | 2. - Dữ liệu đã tải trước đó được giữ nguyên - Hiển thị thông báo lỗi mất kết nối theo CMR-07 | |
| TC_026 | [Pull to Refresh] Kiểm tra kéo xuống làm mới toàn bộ | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kéo xuống (Pull to Refresh) tại đầu danh sách | 1. - Tải lại toàn bộ dữ liệu (Tin nổi bật + Tin mới nhất) từ API - Hiển thị dữ liệu mới nhất | |
| TC_027 | [Pull to Refresh] Kiểm tra Pull to Refresh thất bại | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Tắt mạng thiết bị | 1. Kéo xuống (Pull to Refresh) | 1. - Giữ nguyên data cũ - Hiển thị thông báo lỗi mất kết nối | |
| TC_028 | [Truncate] Kiểm tra tiêu đề bài viết >2 dòng hiển thị ellipsis | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài viết có tiêu đề dài >2 dòng | 1. Kiểm tra hiển thị tiêu đề bài viết trên card | 1. - Tiêu đề hiển thị tối đa 2 dòng - Cuối dòng thứ 2 có dấu "..." (ellipsis) | |
| TC_029 | [Truncate] Kiểm tra tên người đăng dài truncate | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài viết có tên tác giả dài vượt max-width | 1. Kiểm tra hiển thị tên người đăng trên card | 1. - Tên hiển thị đến max-width - Vượt quá thì truncate với "..." ở cuối - Không làm vỡ layout | |
| TC_030 | [Tag] Kiểm tra Tag Category text dài wrap | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài viết thuộc danh mục có tên dài | 1. Kiểm tra hiển thị Tag Category trên card Tin mới nhất | 1. - Tag text dài được wrap xuống dòng - Không bị truncate - Hiển thị đầy đủ nội dung | |
| TC_031 | [Thumbnail] Kiểm tra thumbnail null hiển thị placeholder | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài viết không có thumbnail (null) | 1. Kiểm tra hiển thị thumbnail trên card Tin mới nhất | 1. - Hiển thị placeholder icon (nền xám, icon ảnh broken) - Không để trống hoặc crash | |
| TC_032 | [Đa ngôn ngữ] Kiểm tra đổi ngôn ngữ lọc lại bài viết | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Đổi ngôn ngữ hiển thị ứng dụng sang ngôn ngữ khác (VD: English) 2. Kiểm tra hiển thị danh sách bài viết | 2. - Danh sách bài viết chỉ hiển thị bài có sẵn bằng ngôn ngữ đã chọn - Tên 19 Tab được dịch sang ngôn ngữ tương ứng - Label "Tin tức mới nhất" được dịch - Placeholder "Tìm kiếm tin tức..." được dịch | |
| TC_033 | [Đa ngôn ngữ] Kiểm tra khi không có bài viết theo ngôn ngữ đã chọn | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Đổi sang ngôn ngữ không có bài viết nào | 1. Kiểm tra hiển thị danh sách | 1. Hiển thị "Không có dữ liệu." (theo CMR-14) | |

#### Giai đoạn 3 (tiếp) — Xử lý lỗi:

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_034 | [Lỗi mạng] Kiểm tra mất kết nối khi mở màn hình Tin tức | 1. Đăng nhập thành công 2. Tắt mạng thiết bị | 1. Từ Sidebar, nhấp vào mục "Tin tức" | 1. Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" | |
| TC_035 | [Lỗi API 500] Kiểm tra lỗi server | 1. Đăng nhập thành công 2. API trả về HTTP 500 | 1. Mở màn hình [Danh sách Tin tức] | 1. Hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau." | |
| TC_036 | [Partial Failure] Kiểm tra API Tin nổi bật OK + API Tin mới nhất lỗi | 1. Đăng nhập thành công 2. API Tin nổi bật trả về thành công 3. API Tin mới nhất trả về lỗi | 1. Mở màn hình [Danh sách Tin tức] 2. Kiểm tra hiển thị | 2. - Section "Tin nổi bật" hiển thị bình thường - Section "Tin tức mới nhất" hiển thị thông báo lỗi riêng theo CMR-07 - Không block toàn bộ màn hình | |
| TC_037 | [Partial Failure] Kiểm tra API Tin nổi bật lỗi + API Tin mới nhất OK | 1. Đăng nhập thành công 2. API Tin nổi bật trả về lỗi 3. API Tin mới nhất trả về thành công | 1. Mở màn hình [Danh sách Tin tức] 2. Kiểm tra hiển thị | 2. - Section "Tin nổi bật" hiển thị thông báo lỗi riêng - Section "Tin tức mới nhất" hiển thị bình thường | |

#### Giai đoạn 4: Tích hợp chức năng

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_038 | [Tích hợp] Kiểm tra đổi tab khi bộ lọc ngày đang active | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Đã áp dụng bộ lọc ngày | 1. Nhấp vào tab "Dịch vụ công" 2. Kiểm tra danh sách bài viết | 2. - Danh sách hiển thị bài viết thuộc danh mục "Dịch vụ công" VÀ trong khoảng ngày đã lọc - Bộ lọc ngày được giữ nguyên | |
| TC_039 | [Tích hợp] Kiểm tra tìm kiếm + đổi tab giữ keyword | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Đã mở thanh tìm kiếm và nhập keyword | 1. Nhấp vào tab "Thể thao" 2. Kiểm tra thanh tìm kiếm và danh sách | 2. - Từ khóa được giữ nguyên trong thanh tìm kiếm - Danh sách tải lại theo tab "Thể thao" với keyword đang có | |

#### Giai đoạn 5: Kiểm thử phi chức năng mức UI

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_040 | [Loading] Kiểm tra Skeleton Loading khi đổi tab | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Nhấp vào tab khác 2. Kiểm tra hiển thị trong lúc tải | 2. Hiển thị Skeleton Loading cho cả 2 section trong lúc tải dữ liệu mới | |

### [Check type] Check common

#### [Sub-label] Kiểm tra các trường hợp phổ biến UI/UX

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_041 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa | |
| TC_042 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường | |
| TC_043 | Kiểm tra tính nhất quán của các thông báo | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình | |
| TC_044 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc (thiết bị xoay theo chiều đứng) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_045 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang (thiết bị xoay theo chiều ngang) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_046 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_047 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ | |
| TC_048 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ | |

#### [Sub-label] Kiểm tra tương tác cơ bản với thiết bị

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_049 | Xác nhận hiển thị của ứng dụng khi người dùng chạm vào nút [Quay lại] trên thiết bị Android | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_050 | Xác nhận hiển thị của ứng dụng khi người dùng vuốt từ trái sang phải trên thiết bị iOS | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_051 | Xác nhận hiển thị của ứng dụng khi người dùng tắt và mở lại ứng dụng | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng mở lại từ trạng thái ban đầu | |
| TC_052 | Kiểm tra chế độ đa nhiệm (multitasking) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng giữ nguyên ở trạng thái hiện tại | |
| TC_053 | Xác nhận hiển thị của ứng dụng khi người dùng khóa và mở khóa màn hình thiết bị | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị | 4. Giữ nguyên trạng thái hiện tại của ứng dụng | |
| TC_054 | Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] (Màn hình hỗ trợ tính năng kéo để làm mới) | 1. Người dùng ở màn hình hiện tại\n2. Kéo xuống để làm mới | 2. Hiển thị dữ liệu mới nhất của màn hình | |
| TC_055 | Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more) | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] (Màn hình hỗ trợ tính năng cuộn xuống để tải thêm) | 1. Người dùng cuộn xuống cuối danh sách | 1. Hiển thị thêm dữ liệu mới | |
| TC_056 | Kiểm tra phản hồi của ứng dụng khi thiết bị nhận được thông báo từ ứng dụng khác | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Ứng dụng khác được phép gửi thông báo | 1. Người dùng mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị | 3. Không có lỗi nào xảy ra | |

---

## [Section Group] 2. Modal Bộ lọc tìm kiếm & Tìm kiếm (UC66)

### [Check type] Check UI/UX

#### Giai đoạn 1: Khởi tạo màn hình

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_057 | Kiểm tra UI thanh tìm kiếm khi mở | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Nhấp vào icon kính lúp trên Header 2. Kiểm tra hiển thị thanh tìm kiếm | 2. - Thanh textbox tìm kiếm xuất hiện bên dưới Header - Placeholder: "Tìm kiếm tin tức..." - Không có icon clear "X" - Keyboard mở sẵn | |
| TC_058 | Kiểm tra UI Modal "Bộ lọc tìm kiếm" khi mở | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Nhấp vào icon Filter trên Header 2. Kiểm tra hiển thị Modal | 2. - Modal dạng Bottom Sheet/Dialog hiển thị - Tiêu đề "Bộ lọc tìm kiếm" font đậm, căn trái - Nút "X" căn phải - Nhãn "NGÀY ĐĂNG" in hoa, màu xám xanh - Input Date Range: box viền xám nhạt, icon lịch bên phải, placeholder "Ngày bắt đầu - Ngày kết thúc" - Nút "Nhập lại": nền trắng, viền xám, icon refresh - Nút "Áp dụng": nền đỏ đậm, text trắng | |

#### Giai đoạn 2: Tương tác thành phần

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_059 | [Icon Tìm kiếm] Kiểm tra tap lần 1 mở thanh tìm kiếm | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Thanh tìm kiếm đang đóng | 1. Nhấp vào icon kính lúp | 1. Thanh textbox tìm kiếm mở rộng bên dưới Header | |
| TC_060 | [Icon Tìm kiếm] Kiểm tra tap lần 2 đóng thanh + xóa từ khóa | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Thanh tìm kiếm đang mở, có từ khóa | 1. Nhấp vào icon kính lúp lần nữa 2. Kiểm tra hiển thị | 2. - Thanh tìm kiếm đóng lại - Từ khóa bị xóa - Danh sách trở về mặc định | |
| TC_061 | [Thanh tìm kiếm] Kiểm tra non-sticky khi cuộn | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Thanh tìm kiếm đang mở | 1. Cuộn danh sách xuống | 1. Thanh tìm kiếm ẩn đi (không sticky/cố định) | |
| TC_062 | [Không có icon X] Kiểm tra thanh tìm kiếm không có nút clear | 1. Đăng nhập thành công 2. Mở thanh tìm kiếm 3. Nhập từ khóa | 1. Kiểm tra hiển thị thanh tìm kiếm | 1. - Không có icon "X" để clear - Người dùng phải xóa thủ công hoặc tap lại icon kính lúp | |
| TC_063 | [Modal Filter] Kiểm tra đóng modal bằng nút X | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" | 1. Nhấp vào nút "X" trên modal | 1. - Modal đóng lại - Bộ lọc không được áp dụng - Danh sách giữ nguyên trạng thái | |
| TC_064 | [Modal Filter] Kiểm tra đóng modal bằng tap ngoài | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" | 1. Nhấp vào vùng nền bên ngoài modal | 1. - Modal đóng lại - Bộ lọc không được áp dụng | |
| TC_065 | [Modal Filter] Kiểm tra nút "Nhập lại" reset date | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" 3. Đã chọn ngày bắt đầu và ngày kết thúc | 1. Nhấp vào nút "Nhập lại" 2. Kiểm tra hiển thị | 2. - Trường ngày reset về placeholder "Ngày bắt đầu - Ngày kết thúc" - Modal vẫn mở (không đóng) | |

### [Check type] Check Function

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi — Tìm kiếm

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_066 | [Tìm kiếm] Kiểm tra tìm kiếm gần đúng theo tiêu đề trong Tab active | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] tab "Kinh tế" 3. Mở thanh tìm kiếm | 1. Nhập từ khóa "chính sách" 2. Chờ 3 giây 3. Kiểm tra kết quả | 3. - Danh sách hiển thị các bài viết có tiêu đề chứa/gần đúng "chính sách" - Chỉ hiển thị bài thuộc tab "Kinh tế" | |
| TC_067 | [Tìm kiếm] Kiểm tra debounce 3 giây | 1. Đăng nhập thành công 2. Mở thanh tìm kiếm | 1. Nhập từ khóa "đầu tư" 2. Kiểm tra ngay lập tức (trước 3 giây) 3. Chờ 3 giây không gõ thêm 4. Kiểm tra kết quả | 2. Chưa có kết quả tìm kiếm mới\n4. Kết quả tìm kiếm hiển thị sau 3 giây ngừng gõ | |
| TC_068 | [Tìm kiếm] Kiểm tra giới hạn 500 ký tự | 1. Đăng nhập thành công 2. Mở thanh tìm kiếm | 1. Nhập liên tục ký tự cho đến khi đạt 500 ký tự 2. Thử nhập thêm ký tự thứ 501 | 2. - Không cho phép nhập thêm - Ô tìm kiếm giữ nguyên 500 ký tự | |
| TC_069 | [Tìm kiếm] Kiểm tra xóa hết từ khóa trở về mặc định | 1. Đăng nhập thành công 2. Mở thanh tìm kiếm 3. Đã nhập từ khóa và có kết quả | 1. Xóa hết từ khóa trong ô tìm kiếm 2. Chờ 3 giây 3. Kiểm tra danh sách | 3. Danh sách bài viết trở về trạng thái mặc định (không filter keyword) | |
| TC_070 | [Tìm kiếm] Kiểm tra không có kết quả | 1. Đăng nhập thành công 2. Mở thanh tìm kiếm | 1. Nhập từ khóa không tồn tại "xyzabc123" 2. Chờ 3 giây 3. Kiểm tra hiển thị | 3. Hiển thị thông báo "Không tìm thấy kết quả." (theo CMR-14) | |
#### Giai đoạn 3 (tiếp) — Bộ lọc ngày:

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_071 | [Bộ lọc] Kiểm tra chọn khoảng ngày + Áp dụng | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" | 1. Chọn Ngày bắt đầu: 01/05/2026 2. Chọn Ngày kết thúc: 10/05/2026 3. Nhấp nút "Áp dụng" 4. Kiểm tra hiển thị | 3. Modal đóng\n4. Danh sách tải lại chỉ hiển thị bài viết có ngày đăng trong khoảng 01/05/2026 - 10/05/2026 | |
| TC_072 | [Bộ lọc] Kiểm tra chỉ chọn Ngày bắt đầu + Áp dụng (CMR-15) | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" | 1. Chọn Ngày bắt đầu: 01/05/2026 2. Không chọn Ngày kết thúc 3. Nhấp nút "Áp dụng" 4. Kiểm tra hiển thị | 3. Modal đóng\n4. Danh sách hiển thị bài viết từ ngày 01/05/2026 đến ngày hiện tại | |
| TC_073 | [Bộ lọc] Kiểm tra chỉ chọn Ngày kết thúc + Áp dụng (CMR-15) | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" | 1. Không chọn Ngày bắt đầu 2. Chọn Ngày kết thúc: 10/05/2026 3. Nhấp nút "Áp dụng" 4. Kiểm tra hiển thị | 3. Modal đóng\n4. Danh sách hiển thị bài viết từ đầu đến ngày 10/05/2026 | |
| TC_074 | [Bộ lọc] Kiểm tra không chọn ngày nào + Áp dụng | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" 3. Không chọn ngày nào | 1. Nhấp nút "Áp dụng" 2. Kiểm tra hiển thị | 1. Modal đóng bình thường\n2. - Không hiển thị lỗi - Không áp dụng bộ lọc - Danh sách giữ nguyên | |
| TC_075 | [Bộ lọc] Kiểm tra bộ lọc persist xuyên Tab | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Đã áp dụng bộ lọc ngày 01/05 - 10/05 | 1. Nhấp vào tab "Kinh tế" 2. Kiểm tra kết quả 3. Nhấp vào tab "Văn hóa" 4. Kiểm tra kết quả | 2. Bài viết thuộc "Kinh tế" trong khoảng 01/05 - 10/05\n4. Bài viết thuộc "Văn hóa" trong khoảng 01/05 - 10/05 — bộ lọc không bị reset | |
| TC_076 | [Android Back] Kiểm tra nhấn Back vật lý khi modal đang mở | 1. Đăng nhập thành công 2. Mở Modal "Bộ lọc tìm kiếm" trên thiết bị Android | 1. Nhấn nút Back vật lý trên thiết bị Android | 1. Quay lại màn hình trước đó (không chỉ đóng modal) | |

#### Giai đoạn 4: Tích hợp chức năng

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_077 | [Tích hợp] Kiểm tra kết hợp tìm kiếm + lọc ngày | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] tab "Tất cả" | 1. Mở thanh tìm kiếm, nhập "đầu tư" 2. Chờ 3 giây 3. Mở Modal Filter, chọn ngày 01/05 - 10/05, nhấp "Áp dụng" 4. Kiểm tra kết quả | 4. Danh sách chỉ hiển thị bài viết có tiêu đề chứa "đầu tư" VÀ ngày đăng trong khoảng 01/05 - 10/05 | |
| TC_078 | [Tích hợp] Kiểm tra đổi tab khi đang tìm kiếm giữ keyword + tải lại | 1. Đăng nhập thành công 2. Mở thanh tìm kiếm, nhập "kinh tế" 3. Đang ở tab "Tất cả" | 1. Nhấp vào tab "Dịch vụ công" 2. Kiểm tra thanh tìm kiếm 3. Kiểm tra danh sách | 2. Từ khóa "kinh tế" được giữ nguyên\n3. Danh sách tải lại theo tab "Dịch vụ công" với keyword "kinh tế" | |

### [Check type] Check common

#### [Sub-label] Kiểm tra các trường hợp phổ biến UI/UX

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_079 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa | |
| TC_080 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường | |
| TC_081 | Kiểm tra tính nhất quán của các thông báo | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình | |
| TC_082 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_083 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_084 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_085 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ | |
| TC_086 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ | |

#### [Sub-label] Kiểm tra tương tác cơ bản với thiết bị

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_087 | Xác nhận hiển thị của ứng dụng khi người dùng chạm vào nút [Quay lại] trên thiết bị Android | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_088 | Xác nhận hiển thị của ứng dụng khi người dùng vuốt từ trái sang phải trên thiết bị iOS | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | N/A nếu modal là bottom sheet |
| TC_089 | Xác nhận hiển thị của ứng dụng khi người dùng tắt và mở lại ứng dụng | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng mở lại từ trạng thái ban đầu | |
| TC_090 | Kiểm tra chế độ đa nhiệm (multitasking) | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng giữ nguyên ở trạng thái hiện tại | |
| TC_091 | Xác nhận hiển thị của ứng dụng khi người dùng khóa và mở khóa màn hình thiết bị | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị | 4. Giữ nguyên trạng thái hiện tại của ứng dụng | |
| TC_092 | Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh) | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Kéo xuống để làm mới | N/A — Modal không hỗ trợ pull-to-refresh | N/A |
| TC_093 | Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more) | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] | 1. Cuộn xuống cuối | N/A — Modal không hỗ trợ scroll-to-load-more | N/A |
| TC_094 | Kiểm tra phản hồi của ứng dụng khi thiết bị nhận được thông báo từ ứng dụng khác | 1. Đăng nhập thành công 2. Mở Modal [Bộ lọc tìm kiếm] 3. Ứng dụng khác được phép gửi thông báo | 1. Người dùng mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị | 3. Không có lỗi nào xảy ra | |

---

## [Section Group] 3. Màn hình Chi tiết bài viết (UC57)

### [Check type] Check UI/UX

#### Giai đoạn 1: Khởi tạo màn hình

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_095 | Kiểm tra UI/UX màn hình Chi tiết bài viết | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] 3. Có bài viết trong danh sách | 1. Nhấp vào card bài viết bất kỳ 2. Kiểm tra hiển thị màn hình [Chi tiết bài viết] | 2. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design (Tham khảo ảnh Màn hình Chi tiết bài viết sheet WFDesign) | |
| TC_096 | Kiểm tra hiển thị đầy đủ thành phần Chi tiết | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị các thành phần trên màn hình | 1. - Header đỏ đậm với nút Quay lại (←) - Ảnh cover full width - Tag phân loại (nền nhạt, chữ đỏ) - Tiêu đề font to, in đậm, màu đen - Thông tin Meta: icon đồng hồ + ngày DD/MM/YYYY + icon user + tên tác giả (màu xám) - Nội dung Rich Text - Section "Tin tức mới nhất" ở cuối | |
| TC_097 | Kiểm tra Skeleton Loading khi tải Chi tiết | 1. Đăng nhập thành công 2. Mở màn hình [Danh sách Tin tức] | 1. Nhấp vào card bài viết 2. Kiểm tra hiển thị trong lúc tải | 2. Hiển thị Skeleton Loading đúng layout trong lúc chờ API phản hồi | |
| TC_098 | Kiểm tra ảnh cover null hiển thị placeholder | 1. Đăng nhập thành công 2. Có bài viết không có ảnh cover (null) | 1. Mở Chi tiết bài viết đó 2. Kiểm tra hiển thị vùng ảnh cover | 2. - Hiển thị placeholder icon (nền xám, icon ảnh broken) - Không ẩn block - Vùng ảnh vẫn chiếm không gian | |
| TC_099 | Kiểm tra tên người đăng dài truncate trên Chi tiết | 1. Đăng nhập thành công 2. Có bài viết có tên tác giả dài | 1. Mở Chi tiết bài viết đó 2. Kiểm tra hiển thị tên tác giả | 2. - Tên hiển thị đến max-width - Vượt quá thì truncate với "..." | |
| TC_100 | Kiểm tra section "Tin tức mới nhất" cuối bài | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] 3. Có bài viết khác trong hệ thống | 1. Cuộn xuống cuối bài viết 2. Kiểm tra hiển thị section "Tin tức mới nhất" | 2. - Label "Tin tức mới nhất" font đậm - Hiển thị tối đa 5 bài tin mới nhất - Loại trừ bài viết đang xem - Mỗi card: Thumbnail trái, Tag + Tiêu đề + Trích dẫn + Ngày + Tác giả bên phải | |
| TC_101 | Kiểm tra section "Tin tức mới nhất" ẩn khi không có tin | 1. Đăng nhập thành công 2. Mở Chi tiết bài viết 3. Không có bài viết khác | 1. Cuộn xuống cuối bài 2. Kiểm tra hiển thị | 2. Section "Tin tức mới nhất" ẩn hoàn toàn | |
#### Giai đoạn 2: Tương tác thành phần

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_102 | [Nút Quay lại] Kiểm tra nhấn Quay lại từ Chi tiết | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] từ danh sách | 1. Nhấp vào nút Quay lại (←) trên Header | 1. Quay về màn hình [Danh sách Tin tức] trước đó | |

### [Check type] Check Function

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_103 | [Rich Text] Kiểm tra render nội dung HTML đúng | 1. Đăng nhập thành công 2. Có bài viết có nội dung Rich Text (đậm, nghiêng, link, ảnh) | 1. Mở Chi tiết bài viết 2. Kiểm tra hiển thị nội dung | 2. - Chữ in đậm hiển thị đúng - Chữ in nghiêng hiển thị đúng - Liên kết có thể nhấp - Ảnh chèn inline hiển thị đúng | |
| TC_104 | [Ảnh inline lỗi] Kiểm tra ảnh inline không tải được | 1. Đăng nhập thành công 2. Có bài viết có ảnh inline bị lỗi/không tải được | 1. Mở Chi tiết bài viết 2. Kiểm tra hiển thị vùng ảnh inline | 2. - Hiển thị placeholder icon (nền xám, icon ảnh broken) - Không ẩn vùng ảnh - Tap vào ảnh: không zoom (ngoài phạm vi UC) | |
| TC_105 | [Tin liên quan] Kiểm tra tap card Tin tức mới nhất cuối bài | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] 3. Section "Tin tức mới nhất" có bài | 1. Cuộn xuống cuối bài 2. Nhấp vào card bài viết trong section "Tin tức mới nhất" | 2. Mở màn hình [Chi tiết bài viết] mới (bài viết được chọn) | |
| TC_106 | [Navigation Stack] Kiểm tra Back sau khi mở tin liên quan | 1. Đăng nhập thành công 2. Mở Chi tiết bài A 3. Tap tin liên quan → mở Chi tiết bài B | 1. Nhấp nút Quay lại (←) | 1. Quay về màn hình Chi tiết bài A (trước đó) | |
| TC_107 | [Tin liên quan] Kiểm tra loại trừ bài đang xem | 1. Đăng nhập thành công 2. Mở Chi tiết bài viết X | 1. Cuộn xuống section "Tin tức mới nhất" 2. Kiểm tra danh sách | 2. Bài viết X KHÔNG xuất hiện trong danh sách "Tin tức mới nhất" | |
| TC_108 | [Tin liên quan] Kiểm tra lọc theo ngôn ngữ | 1. Đăng nhập thành công 2. Ứng dụng đang hiển thị ngôn ngữ Tiếng Việt 3. Mở Chi tiết bài viết | 1. Cuộn xuống section "Tin tức mới nhất" 2. Kiểm tra danh sách | 2. Chỉ hiển thị bài viết có sẵn bằng Tiếng Việt - Không scope theo danh mục Tab | |
| TC_109 | [Lỗi 404] Kiểm tra mở bài viết đã bị xóa từ CMS | 1. Đăng nhập thành công 2. Bài viết đã bị xóa từ CMS (API trả 404) | 1. Nhấp vào card bài viết (từ cache/deep link) | 1. - Hiển thị thông báo "Nội dung không tồn tại hoặc đã bị xóa." - Quay lại màn hình danh sách trước đó | |
| TC_110 | [Lỗi mạng] Kiểm tra mất mạng khi mở Chi tiết | 1. Đăng nhập thành công 2. Tắt mạng thiết bị | 1. Nhấp vào card bài viết | 1. Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại" | |

#### Giai đoạn 4: Tích hợp chức năng

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_111 | [Tích hợp] Kiểm tra đổi ngôn ngữ ảnh hưởng section Tin tức mới nhất cuối bài | 1. Đăng nhập thành công 2. Mở Chi tiết bài viết | 1. Đổi ngôn ngữ ứng dụng sang English 2. Quay lại Chi tiết bài viết 3. Kiểm tra section "Tin tức mới nhất" | 3. Section chỉ hiển thị bài viết có sẵn bằng English | |

### [Check type] Check common

#### [Sub-label] Kiểm tra các trường hợp phổ biến UI/UX

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_112 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa | |
| TC_113 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường | |
| TC_114 | Kiểm tra tính nhất quán của các thông báo | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình | |
| TC_115 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_116 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_117 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_118 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ | |
| TC_119 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ | |

#### [Sub-label] Kiểm tra tương tác cơ bản với thiết bị

| TC ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_120 | Xác nhận hiển thị của ứng dụng khi người dùng chạm vào nút [Quay lại] trên thiết bị Android | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_121 | Xác nhận hiển thị của ứng dụng khi người dùng vuốt từ trái sang phải trên thiết bị iOS | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_122 | Xác nhận hiển thị của ứng dụng khi người dùng tắt và mở lại ứng dụng | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng mở lại từ trạng thái ban đầu | |
| TC_123 | Kiểm tra chế độ đa nhiệm (multitasking) | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng giữ nguyên ở trạng thái hiện tại | |
| TC_124 | Xác nhận hiển thị của ứng dụng khi người dùng khóa và mở khóa màn hình thiết bị | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị | 4. Giữ nguyên trạng thái hiện tại của ứng dụng | |
| TC_125 | Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh) | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Kéo xuống để làm mới | N/A — Màn hình Chi tiết không hỗ trợ pull-to-refresh | N/A |
| TC_126 | Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more) | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] | 1. Cuộn xuống cuối | N/A — Màn hình Chi tiết không hỗ trợ scroll-to-load-more | N/A |
| TC_127 | Kiểm tra phản hồi của ứng dụng khi thiết bị nhận được thông báo từ ứng dụng khác | 1. Đăng nhập thành công 2. Mở màn hình [Chi tiết bài viết] 3. Ứng dụng khác được phép gửi thông báo | 1. Người dùng mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị | 3. Không có lỗi nào xảy ra | |

---

## Requirement Traceability Matrix (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|-------|---------------------|---------------------|------------|
| AC1 | Mục "Tin tức" mở 1 màn hình, Header cố định "Tin tức", 19 Tab, đổi tab tải lại đúng | TC_001, TC_002, TC_003, TC_004, TC_013, TC_016 | ✅ Đã bao phủ |
| AC2 | Đổi ngôn ngữ → lọc lại bài viết + dịch UI labels | TC_032, TC_033, TC_108, TC_111 | ✅ Đã bao phủ |
| AC3 | Icon search mở/đóng thanh, tìm gần đúng theo Tab active, non-sticky | TC_057, TC_059, TC_060, TC_061, TC_062, TC_066, TC_067, TC_069, TC_078 | ✅ Đã bao phủ |
| AC4 | Bộ lọc ngày persist xuyên Tab, CMR-15 cho 1 ngày, 0 ngày = đóng modal | TC_058, TC_063, TC_064, TC_065, TC_071, TC_072, TC_073, TC_074, TC_075 | ✅ Đã bao phủ |
| AC5 | Bài Tin nổi bật không lặp ở Tin mới nhất | TC_021 | ✅ Đã bao phủ |
| AC6 | Card đầy đủ Tag, Title, Trích dẫn, Date, Tên tác giả, truncate 2 dòng | TC_004, TC_007, TC_013, TC_020, TC_028, TC_029, TC_030, TC_096, TC_100 | ✅ Đã bao phủ |
| AC7 | Card bấm tại bất kỳ vị trí → mở chi tiết | TC_018, TC_020, TC_023, TC_105 | ✅ Đã bao phủ |
| AC8 | Tin nổi bật: ẩn khi 0 bài, tĩnh khi 1 bài, carousel khi ≥2 | TC_004, TC_005, TC_006 | ✅ Đã bao phủ |
| AC9 | Skeleton Loading ở cả danh sách và chi tiết | TC_009, TC_040, TC_097 | ✅ Đã bao phủ |
| AC10 | Pull to Refresh làm mới toàn bộ | TC_026, TC_027 | ✅ Đã bao phủ |
| AC11 | Tìm kiếm không kết quả → "Không tìm thấy kết quả.", API rỗng → "Không có dữ liệu." | TC_008, TC_070 | ✅ Đã bao phủ |
| CMR-01 | Tìm kiếm gần đúng, debounce 3s, 500 chars | TC_066, TC_067, TC_068 | ✅ Đã bao phủ |
| CMR-04 | Lazy load 20 bài/lần | TC_023, TC_024, TC_025 | ✅ Đã bao phủ |
| CMR-06 | Nút Quay lại | TC_010, TC_011, TC_015, TC_102 | ✅ Đã bao phủ |
| CMR-07 | Xử lý lỗi mạng/API | TC_025, TC_034, TC_035, TC_036, TC_037, TC_109, TC_110 | ✅ Đã bao phủ |
| CMR-13 | Pull to Refresh | TC_026, TC_027 | ✅ Đã bao phủ |
| CMR-14 | Empty state / No result | TC_008, TC_033, TC_070 | ✅ Đã bao phủ |
| CMR-15 | Date range validation | TC_071, TC_072, TC_073, TC_074 | ✅ Đã bao phủ |
| CMR-17 | Đa ngôn ngữ UI labels | TC_032, TC_033 | ✅ Đã bao phủ |
| CMR-18 | Debounce Navigation | TC_017, TC_019 | ✅ Đã bao phủ |