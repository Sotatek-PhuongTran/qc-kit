# UC56-57/66-68 — Tin tức Mobile — Test Cases Draft v2

**Ngày tạo:** 12/05/2026  
**Tác giả:** QC Agent (Claude)  
**Phiên bản:** v2  
**Nguồn yêu cầu:** UC56-57_66_68_TinTuc.md v1.4  
**Audit Report:** UC56-57_66_68_tin-tuc_audited_20260511_v2.md (92.7/100 — READY)  
**Scenarios:** UC56-57_66_68_tin-tuc_scenarios_20260511.md  

---

## Thay đổi chính so với v1 (UC v1.2 → v1.4)

| # | Thay đổi | Impact |
|---|----------|--------|
| 1 | Search scope: tìm kiếm áp dụng **toàn bộ tab**, kết quả hiển thị trên tab "Tất cả" | TC tìm kiếm cần cập nhật expected result |
| 2 | Chuyển tab → giữ nguyên keyword và bộ lọc hiện tại | TC integration search+tab cần cập nhật |
| 3 | HTTP 401 handling: auto refresh token, >15 ngày → redirect đăng nhập | Thêm TC mới cho 401 |

---

## Section Group 1: Màn hình Danh sách Tin tức (UC56)

### Check UI/UX

#### Giai đoạn 1: Khởi tạo màn hình

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_001 | Kiểm tra UI/UX màn hình Danh sách Tin tức khi có dữ liệu | Đăng nhập thành công. Có dữ liệu bài viết trong hệ thống. | 1. Từ Sidebar, nhấp vào mục "Tin tức"\n2. Kiểm tra hiển thị màn hình [Danh sách Tin tức] | 2.\n- Hiển thị đầy đủ các thành phần: Header đỏ đậm (Tiêu đề "Tin tức", icon Tìm kiếm, icon Lọc), Tab Bar 19 tab cuộn ngang, Section "Tin nổi bật", Section "Tin tức mới nhất"\n- Màu sắc, font chữ, layout giống Design\n(Tham khảo ảnh 1. Màn hình Danh sách Tin tức sheet WFDesign) | |
| TC_002 | Kiểm tra UI/UX màn hình Danh sách Tin tức khi không có dữ liệu | Đăng nhập thành công. Không có bài viết nào trong hệ thống. | 1. Từ Sidebar, nhấp vào mục "Tin tức"\n2. Kiểm tra hiển thị màn hình [Danh sách Tin tức] | 2.\n- Hiển thị Header đỏ đậm, Tab Bar\n- Section "Tin nổi bật" ẩn hoàn toàn\n- Vùng "Tin tức mới nhất" hiển thị "Không có dữ liệu." (CMR-14) | |

| TC_003 | [Header] Kiểm tra tiêu đề "Tin tức" cố định không đổi khi chuyển Tab | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra tiêu đề Header hiện tại\n2. Nhấp vào tab "Kinh tế"\n3. Kiểm tra tiêu đề Header | 1. Tiêu đề Header hiển thị "Tin tức"\n3. Tiêu đề Header vẫn hiển thị "Tin tức" — không thay đổi | |
| TC_004 | [Tab Bar] Kiểm tra hiển thị đầy đủ 19 Tab và cuộn ngang | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị Tab Bar\n2. Vuốt ngang Tab Bar sang phải đến hết | 1. Tab Bar hiển thị bên dưới Header, cuộn ngang\n- Tab "Tất cả" được chọn mặc định (nền đỏ đậm, chữ trắng)\n- Các tab khác: nền xám nhạt, chữ đen/xanh đen\n2. Hiển thị đầy đủ 19 Tab: Tất cả, Chính sách nổi bật, Chính sách đầu tư, Dịch vụ công, Kinh tế, Văn hóa, Giao thông, Y tế, Lao động, Xã hội, Du lịch, Thể thao, Quốc tế, Chính trị, Thời sự, Giáo dục, Tài chính, Câu chuyện thành công, Khác | |
| TC_005 | [Nút Quay lại] Kiểm tra hiển thị nút Quay lại khi đi từ màn khác | Đăng nhập thành công. Đang ở một màn hình khác (VD: Trang chủ). | 1. Điều hướng đến màn hình [Danh sách Tin tức] từ một màn hình khác\n2. Kiểm tra hiển thị Header | 2. Nút Quay lại (←) hiển thị ở bên trái Header | |
| TC_006 | [Nút Quay lại] Kiểm tra ẩn nút Quay lại khi ở tab chính | Đăng nhập thành công. Mục "Tin tức" là tab chính trên bottom navigation. | 1. Nhấp vào tab "Tin tức" trên bottom navigation\n2. Kiểm tra hiển thị Header | 2. Nút Quay lại (←) không hiển thị | |
| TC_007 | [Skeleton Loading] Kiểm tra hiển thị Skeleton Loading khi tải dữ liệu lần đầu | Đăng nhập thành công. | 1. Từ Sidebar, nhấp vào mục "Tin tức"\n2. Kiểm tra hiển thị trong lúc tải dữ liệu | 2. Hiển thị Skeleton Loading cho cả 2 section (Tin nổi bật + Tin tức mới nhất) đúng layout. Skeleton biến mất khi dữ liệu sẵn sàng | |

#### Giai đoạn 1: Section Tin nổi bật — UI States

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_008 | [Tin nổi bật] Kiểm tra ẩn section khi không có bài nổi bật (0 bài) | Đăng nhập thành công. API không trả về bài viết nào có flag "Tin nổi bật". | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị section "Tin nổi bật" | 2. Section "Tin nổi bật" ẩn hoàn toàn, không chiếm không gian. Section "Tin tức mới nhất" được kéo lên trên | |
| TC_009 | [Tin nổi bật] Kiểm tra hiển thị tĩnh khi chỉ có 1 bài nổi bật | Đăng nhập thành công. API trả về đúng 1 bài có flag "Tin nổi bật". | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị section "Tin nổi bật" | 2. Hiển thị 1 card tĩnh, không cho phép cuộn ngang, không có auto-scroll | |
| TC_010 | [Tin nổi bật] Kiểm tra carousel cuộn ngang tự động khi ≥2 bài | Đăng nhập thành công. API trả về ≥2 bài có flag "Tin nổi bật". | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị section "Tin nổi bật"\n3. Đợi 5 giây | 2. Hiển thị carousel cuộn ngang, không có dot indicator\n3. Carousel tự động chuyển sang tin tiếp theo sau 5 giây | |
| TC_011 | [Card Tin nổi bật] Kiểm tra cấu trúc card đầy đủ | Đăng nhập thành công. Có bài viết nổi bật. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị card Tin nổi bật | 2. Card hiển thị đầy đủ:\n- Nền ảnh cover + overlay tối\n- Góc trên trái: Tag đỏ "Tin nổi bật"\n- Giữa: Tiêu đề (font đậm, trắng, tối đa 2 dòng)\n- Dưới tiêu đề: Trích dẫn (tối đa 2 dòng)\n- Footer: Icon đồng hồ + Ngày (DD/MM/YYYY) & Icon user + Tên tác giả | |
| TC_012 | [Card Tin nổi bật] Kiểm tra tiêu đề >2 dòng truncate với ellipsis | Đăng nhập thành công. Có bài viết nổi bật với tiêu đề rất dài (>2 dòng). | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị tiêu đề trên card Tin nổi bật | 2. Tiêu đề hiển thị tối đa 2 dòng, cuối dòng thứ 2 có dấu "..." (ellipsis) | |
| TC_013 | [Card Tin nổi bật] Kiểm tra tên người đăng dài truncate | Đăng nhập thành công. Có bài viết nổi bật với tên tác giả rất dài. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị tên người đăng trên card Tin nổi bật | 2. Tên người đăng hiển thị đến max-width; vượt quá thì truncate với "..." ở cuối, không vỡ layout | |

#### Giai đoạn 1: Section Tin mới nhất — UI States

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_014 | [Card Tin mới nhất] Kiểm tra cấu trúc card đầy đủ | Đăng nhập thành công. Có bài viết trong danh sách Tin mới nhất. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị card trong section "Tin tức mới nhất" | 2. Mỗi card hiển thị đầy đủ:\n- Bên trái: Ảnh Thumbnail (hình vuông, bo góc)\n- Bên phải: Tag Category (nền nhạt, chữ đỏ), Tiêu đề (font đậm, đen, max 2 dòng), Trích dẫn (xám, max 2 dòng), Icon đồng hồ + Ngày (DD/MM/YYYY) & Icon user + Tên tác giả | |
| TC_015 | [Card Tin mới nhất] Kiểm tra Thumbnail null hiển thị placeholder | Đăng nhập thành công. Có bài viết với thumbnail = null. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị thumbnail của bài viết không có ảnh | 2. Hiển thị placeholder icon (nền xám, icon ảnh broken) thay thế, không để trống hoặc crash | |
| TC_016 | [Card Tin mới nhất] Kiểm tra Tag Category text dài wrap | Đăng nhập thành công. Có bài viết với tên danh mục dài. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị Tag Category trên card | 2. Tag Category text dài được wrap xuống dòng, không truncate, hiển thị đầy đủ nội dung | |

### Check Function

#### Giai đoạn 2: Tương tác thành phần

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_017 | [Nút Quay lại] Kiểm tra nhấn nút Quay lại quay về màn trước | Đăng nhập thành công. Điều hướng từ Trang chủ đến màn hình [Danh sách Tin tức]. | 1. Nhấp vào nút Quay lại (←) trên Header | 1. Quay về màn hình Trang chủ (màn hình trước đó trong navigation stack) | |
| TC_018 | [Tab] Kiểm tra đổi tab tải lại danh sách đúng danh mục | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức], tab "Tất cả" đang active. | 1. Nhấp vào tab "Kinh tế"\n2. Kiểm tra hiển thị danh sách | 1. Tab "Kinh tế" chuyển sang trạng thái active (nền đỏ đậm, chữ trắng)\n- Tab "Tất cả" chuyển sang inactive\n2. Danh sách bài viết tải lại, chỉ hiển thị bài thuộc danh mục "Kinh tế" | |
| TC_019 | [Tab] Kiểm tra debounce khi double-tap tab (CMR-18) | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. | 1. Tap nhanh liên tiếp 2 lần vào tab "Văn hóa" | 1. Hệ thống chỉ gọi API 1 lần, danh sách tải lại 1 lần duy nhất (không load 2 lần) | |

#### Giai đoạn 3: Chức năng cốt lõi

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_020 | [Tab mặc định] Kiểm tra tab "Tất cả" được chọn mặc định khi mở lần đầu | Đăng nhập thành công. | 1. Từ Sidebar, nhấp vào mục "Tin tức"\n2. Kiểm tra trạng thái Tab Bar | 2. Tab "Tất cả" được chọn mặc định (nền đỏ đậm, chữ trắng). Danh sách hiển thị tất cả bài viết | |
| TC_021 | [Card Tin nổi bật] Kiểm tra tap card mở Chi tiết bài viết | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức], có bài nổi bật. | 1. Nhấp vào bất kỳ vị trí nào trên card Tin nổi bật | 1. Chuyển tiếp đến màn hình [Chi tiết bài viết] tương ứng | |
| TC_022 | [Card Tin nổi bật] Kiểm tra double-tap chỉ navigate 1 lần (CMR-18) | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức], có bài nổi bật. | 1. Tap nhanh liên tiếp 2 lần vào card Tin nổi bật | 1. Hệ thống chỉ navigate 1 lần đến màn hình [Chi tiết bài viết], không push 2 màn hình | |
| TC_023 | [Card Tin mới nhất] Kiểm tra tap card mở Chi tiết bài viết | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức], có bài trong Tin mới nhất. | 1. Nhấp vào bất kỳ vị trí nào trên card Tin mới nhất | 1. Chuyển tiếp đến màn hình [Chi tiết bài viết] tương ứng | |
| TC_024 | [Exclusion Rule] Kiểm tra bài Tin nổi bật không lặp ở Tin mới nhất | Đăng nhập thành công. Có bài viết được đánh dấu "Tin nổi bật". | 1. Mở màn hình [Danh sách Tin tức]\n2. Ghi nhận các bài viết trong section "Tin nổi bật"\n3. Cuộn xuống kiểm tra section "Tin tức mới nhất" | 3. Các bài viết đã hiển thị trong "Tin nổi bật" KHÔNG xuất hiện lại trong "Tin tức mới nhất" | |
| TC_025 | [Sắp xếp] Kiểm tra Tin mới nhất sắp xếp mới nhất lên đầu | Đăng nhập thành công. Có nhiều bài viết với ngày đăng khác nhau. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra thứ tự bài viết trong section "Tin tức mới nhất" | 2. Danh sách sắp xếp theo ngày đăng giảm dần (bài mới nhất hiển thị đầu tiên) | |
| TC_026 | [Lazy Load] Kiểm tra tải thêm 20 bài khi cuộn đến cuối | Đăng nhập thành công. Có >20 bài viết trong danh sách. | 1. Mở màn hình [Danh sách Tin tức]\n2. Cuộn xuống cuối danh sách "Tin tức mới nhất" | 2. Hệ thống tự động tải thêm 20 bài tiếp theo, hiển thị loading indicator trong lúc tải | |
| TC_027 | [Lazy Load] Kiểm tra khi đã tải hết data — ẩn loading | Đăng nhập thành công. Đã cuộn và tải hết toàn bộ bài viết. | 1. Cuộn xuống cuối danh sách khi đã tải hết\n2. Kiểm tra hiển thị | 2. Không hiển thị loading indicator, không gọi thêm API khi cuộn tiếp | |
| TC_028 | [Pull to Refresh] Kiểm tra kéo xuống làm mới toàn bộ (CMR-13) | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. | 1. Kéo xuống (Pull to Refresh) tại đầu danh sách | 1. Hiển thị loading indicator\n- Tải lại toàn bộ dữ liệu (Tin nổi bật + Tin mới nhất) từ API\n- Danh sách cập nhật dữ liệu mới nhất | |
| TC_029 | [Đa ngôn ngữ] Kiểm tra đổi ngôn ngữ lọc lại bài viết (CMR-17) | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. Có bài viết bằng nhiều ngôn ngữ. | 1. Đổi ngôn ngữ hiển thị trên ứng dụng sang tiếng Hàn\n2. Kiểm tra hiển thị danh sách | 2. Danh sách bài viết chỉ hiển thị bài có sẵn bằng tiếng Hàn\n- Tên 19 Tab, label "Tin tức mới nhất", placeholder "Tìm kiếm tin tức..." được dịch sang tiếng Hàn | |
| TC_030 | [Đa ngôn ngữ] Kiểm tra khi không có bài viết theo ngôn ngữ đã chọn | Đăng nhập thành công. Đổi sang ngôn ngữ không có bài viết nào. | 1. Đổi ngôn ngữ hiển thị sang ngôn ngữ không có bài viết\n2. Kiểm tra hiển thị | 2. Hiển thị "Không có dữ liệu." (CMR-14) | |

#### Giai đoạn 3: Xử lý lỗi

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_031 | [Lỗi mạng] Kiểm tra mất kết nối khi mở màn hình Tin tức | Đăng nhập thành công. Thiết bị mất kết nối mạng. | 1. Từ Sidebar, nhấp vào mục "Tin tức"\n2. Kiểm tra hiển thị | 2. Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại". Giữ nguyên màn hình | |
| TC_032 | [Lỗi API 500] Kiểm tra lỗi server khi tải danh sách | Đăng nhập thành công. API trả về HTTP 500. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị | 2. Hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau." Giữ nguyên màn hình | |
| TC_033 | [Lỗi 401] Kiểm tra session hết hạn — auto refresh token | Đăng nhập thành công. Access token hết hạn, refresh token còn hợp lệ (<15 ngày). | 1. Mở màn hình [Danh sách Tin tức] khi access token hết hạn\n2. Kiểm tra hiển thị | 2. Hệ thống tự động refresh token và tải lại dữ liệu bình thường, người dùng không bị gián đoạn | |
| TC_034 | [Lỗi 401] Kiểm tra refresh token hết hạn (>15 ngày) → redirect đăng nhập | Đăng nhập thành công. Refresh token đã hết hạn (>15 ngày). | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị | 2. Hiển thị toast "Phiên đăng nhập hết hạn." và chuyển về màn hình [Đăng nhập] | |
| TC_035 | [Partial Failure] Kiểm tra API Tin nổi bật OK + API Tin mới nhất lỗi | Đăng nhập thành công. API "Tin nổi bật" thành công, API "Tin mới nhất" lỗi. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị | 2. Section "Tin nổi bật" hiển thị bình thường. Section "Tin tức mới nhất" hiển thị thông báo lỗi riêng theo CMR-07 — không block toàn bộ màn hình | |
| TC_036 | [Partial Failure] Kiểm tra API Tin nổi bật lỗi + API Tin mới nhất OK | Đăng nhập thành công. API "Tin nổi bật" lỗi, API "Tin mới nhất" thành công. | 1. Mở màn hình [Danh sách Tin tức]\n2. Kiểm tra hiển thị | 2. Section "Tin nổi bật" hiển thị thông báo lỗi riêng. Section "Tin tức mới nhất" hiển thị bình thường | |
| TC_037 | [Lazy Load mất mạng] Kiểm tra mất mạng khi đang lazy load | Đăng nhập thành công. Đang cuộn danh sách, mất kết nối mạng giữa chừng. | 1. Cuộn xuống cuối danh sách để kích hoạt lazy load\n2. Tắt mạng trước khi API phản hồi\n3. Kiểm tra hiển thị | 3. Dữ liệu đã tải trước đó được giữ nguyên. Hiển thị thông báo lỗi mất kết nối theo CMR-07 | |
| TC_038 | [Pull to Refresh thất bại] Kiểm tra Pull to Refresh khi mất mạng | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức] có dữ liệu. Mất mạng. | 1. Tắt mạng\n2. Kéo xuống Pull to Refresh\n3. Kiểm tra hiển thị | 3. Giữ nguyên dữ liệu cũ. Hiển thị thông báo lỗi mất kết nối | |

### Check common — Màn hình Danh sách Tin tức

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_039 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa | |
| TC_040 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | Đang ở màn hình [Danh sách Tin tức]. | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường | |
| TC_041 | Kiểm tra tính nhất quán của các thông báo | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình | |
| TC_042 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc (thiết bị xoay theo chiều đứng) | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_043 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang (thiết bị xoay theo chiều ngang) | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_044 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_045 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ | |
| TC_046 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | Đang ở màn hình [Danh sách Tin tức]. | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ | |

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_047 | Xác nhận hiển thị của ứng dụng khi người dùng chạm vào nút [Quay lại] trên thiết bị Android | Đang ở màn hình [Danh sách Tin tức]. | 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_048 | Xác nhận hiển thị của ứng dụng khi người dùng vuốt từ trái sang phải trên thiết bị iOS | Đang ở màn hình [Danh sách Tin tức]. | 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_049 | Xác nhận hiển thị của ứng dụng khi người dùng tắt và mở lại ứng dụng | Đang ở màn hình [Danh sách Tin tức]. | 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng mở lại từ trạng thái ban đầu | |
| TC_050 | Kiểm tra chế độ đa nhiệm (multitasking) | Đang ở màn hình [Danh sách Tin tức]. | 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng giữ nguyên ở trạng thái hiện tại | |
| TC_051 | Xác nhận hiển thị của ứng dụng khi người dùng khóa và mở khóa màn hình thiết bị | Đang ở màn hình [Danh sách Tin tức]. | 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị | 4. Giữ nguyên trạng thái hiện tại của ứng dụng | |
| TC_052 | Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh) | Tiền điều kiện: Màn hình hỗ trợ tính năng kéo để làm mới. Đang ở màn hình [Danh sách Tin tức]. | 1. Người dùng ở màn hình hiện tại\n2. Kéo xuống để làm mới | 2. Hiển thị dữ liệu mới nhất của màn hình | |
| TC_053 | Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more) | Tiền điều kiện: Màn hình hỗ trợ tính năng cuộn xuống để tải thêm. Đang ở màn hình [Danh sách Tin tức]. | 1. Người dùng cuộn xuống cuối danh sách | 1. Hiển thị thêm dữ liệu mới | |
| TC_054 | Kiểm tra phản hồi của ứng dụng khi thiết bị nhận được thông báo từ ứng dụng khác | Tiền điều kiện: Ứng dụng khác được phép gửi thông báo. Đang ở màn hình [Danh sách Tin tức]. | 1. Người dùng mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị | 3. Không có lỗi nào xảy ra | |

---

## Section Group 2: Modal Bộ lọc tìm kiếm & Tìm kiếm (UC66)

### Check UI/UX

#### Giai đoạn 1: Khởi tạo — Thanh tìm kiếm

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_055 | [Thanh tìm kiếm] Kiểm tra UI khi mở thanh tìm kiếm | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. | 1. Nhấp vào icon kính lúp trên Header\n2. Kiểm tra hiển thị thanh tìm kiếm | 2. Thanh tìm kiếm xuất hiện bên dưới Header\n- Placeholder: "Tìm kiếm tin tức..."\n- Không có icon clear "X"\n- Keyboard mở sẵn | |
| TC_056 | [Thanh tìm kiếm] Kiểm tra thanh tìm kiếm non-sticky khi cuộn | Đăng nhập thành công. Thanh tìm kiếm đang mở. | 1. Cuộn danh sách xuống\n2. Kiểm tra hiển thị thanh tìm kiếm | 2. Thanh tìm kiếm không sticky (không cố định), bị ẩn khi cuộn xuống | |
| TC_057 | [Thanh tìm kiếm] Kiểm tra không có icon clear X | Đăng nhập thành công. Thanh tìm kiếm đang mở, đã nhập từ khóa. | 1. Kiểm tra hiển thị thanh tìm kiếm khi có text | 1. Không có icon "X" để clear. Người dùng phải xóa thủ công hoặc tap lại icon kính lúp | Thiết kế cố ý |

#### Giai đoạn 1: Khởi tạo — Modal Filter

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_058 | [Modal Filter] Kiểm tra UI modal "Bộ lọc tìm kiếm" | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. | 1. Nhấp vào icon Filter trên Header\n2. Kiểm tra hiển thị modal | 2. Modal "Bộ lọc tìm kiếm" hiển thị:\n- Tiêu đề "Bộ lọc tìm kiếm" (font đậm, căn trái) + Nút "X" (căn phải)\n- Nhãn "NGÀY ĐĂNG" (in hoa, xám xanh)\n- Input Date Range: box viền xám nhạt, icon lịch bên phải, placeholder "Ngày bắt đầu - Ngày kết thúc"\n- Nút "Nhập lại" (nền trắng, viền xám, icon refresh)\n- Nút "Áp dụng" (nền đỏ đậm, text trắng)\n(Tham khảo ảnh Filter theo ngày đăng UC66 sheet WFDesign) | |

### Check Function

#### Giai đoạn 2: Tương tác — Tìm kiếm

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_059 | [Icon Tìm kiếm] Kiểm tra tap icon kính lúp mở thanh tìm kiếm | Đăng nhập thành công. Đang ở màn hình [Danh sách Tin tức]. Thanh tìm kiếm đang đóng. | 1. Nhấp vào icon kính lúp trên Header | 1. Thanh tìm kiếm mở rộng bên dưới Header, keyboard hiển thị | |
| TC_060 | [Icon Tìm kiếm] Kiểm tra tap lại icon kính lúp đóng thanh + xóa từ khóa | Đăng nhập thành công. Thanh tìm kiếm đang mở, đã nhập từ khóa "kinh tế". | 1. Nhấp lại vào icon kính lúp | 1. Thanh tìm kiếm đóng lại, từ khóa bị xóa, danh sách trở về mặc định (hiển thị tất cả bài viết) | |

#### Giai đoạn 3: Chức năng cốt lõi — Tìm kiếm

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_061 | [Tìm kiếm] Kiểm tra tìm kiếm gần đúng theo tiêu đề — áp dụng toàn bộ tab | Đăng nhập thành công. Thanh tìm kiếm đang mở. Tab "Kinh tế" đang active. | 1. Nhập từ khóa "chính sách"\n2. Đợi 3 giây (debounce)\n3. Kiểm tra kết quả | 3. Kết quả tìm kiếm hiển thị trên tab "Tất cả" (tab tự động chuyển sang "Tất cả"), hiển thị bài viết có tiêu đề chứa/gần đúng "chính sách" từ TẤT CẢ danh mục | Thay đổi v1.4: search áp dụng toàn bộ tab |
| TC_062 | [Tìm kiếm] Kiểm tra debounce 3 giây (CMR-01) | Đăng nhập thành công. Thanh tìm kiếm đang mở. | 1. Nhập từ khóa "đầu tư"\n2. Kiểm tra ngay lập tức (trước 3 giây)\n3. Đợi 3 giây không gõ thêm\n4. Kiểm tra kết quả | 2. Chưa có kết quả tìm kiếm (API chưa được gọi)\n4. Kết quả tìm kiếm hiển thị sau 3 giây ngừng gõ | |
| TC_063 | [Tìm kiếm] Kiểm tra giới hạn 500 ký tự (CMR-01) | Đăng nhập thành công. Thanh tìm kiếm đang mở. | 1. Nhập 500 ký tự vào ô tìm kiếm\n2. Thử nhập thêm ký tự thứ 501 | 1. Ô tìm kiếm chấp nhận 500 ký tự\n2. Không cho phép nhập thêm ký tự khi đã đạt 500 | |
| TC_064 | [Tìm kiếm] Kiểm tra xóa hết từ khóa → danh sách trở về mặc định | Đăng nhập thành công. Đang tìm kiếm với từ khóa "kinh tế", có kết quả. | 1. Xóa hết từ khóa trong ô tìm kiếm\n2. Đợi 3 giây\n3. Kiểm tra hiển thị | 3. Danh sách bài viết trở về trạng thái mặc định (không filter keyword) | |
| TC_065 | [Tìm kiếm] Kiểm tra không có kết quả → "Không tìm thấy kết quả." (CMR-14) | Đăng nhập thành công. Thanh tìm kiếm đang mở. | 1. Nhập từ khóa không khớp bài viết nào (VD: "xyzabc123")\n2. Đợi 3 giây | 2. Hiển thị "Không tìm thấy kết quả." (CMR-14) | |

#### Giai đoạn 4: Tích hợp — Tìm kiếm + Tab

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_066 | [Tìm kiếm + Tab] Kiểm tra chuyển tab khi đang tìm kiếm — giữ keyword | Đăng nhập thành công. Đang tìm kiếm "đầu tư", kết quả hiển thị trên tab "Tất cả". | 1. Nhấp vào tab "Kinh tế"\n2. Kiểm tra hiển thị | 2. Từ khóa "đầu tư" được giữ nguyên trong ô tìm kiếm. Kết quả tải lại theo tab "Kinh tế" kết hợp keyword | Thay đổi v1.4: keyword giữ nguyên khi đổi tab |

#### Giai đoạn 3: Chức năng cốt lõi — Modal Filter

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_067 | [Filter] Kiểm tra chọn khoảng ngày + Áp dụng | Đăng nhập thành công. Modal "Bộ lọc tìm kiếm" đang mở. | 1. Nhấp vào input Date Range\n2. Chọn Ngày bắt đầu: 01/01/2026\n3. Chọn Ngày kết thúc: 31/03/2026\n4. Nhấp nút "Áp dụng" | 4. Modal đóng. Danh sách tải lại chỉ hiển thị bài viết có ngày đăng trong khoảng 01/01/2026 – 31/03/2026 | |
| TC_068 | [Filter] Kiểm tra chỉ chọn Ngày bắt đầu + Áp dụng (CMR-15) | Đăng nhập thành công. Modal "Bộ lọc tìm kiếm" đang mở. | 1. Chọn Ngày bắt đầu: 01/03/2026\n2. Không chọn Ngày kết thúc\n3. Nhấp nút "Áp dụng" | 3. Modal đóng. Danh sách lọc bài viết từ 01/03/2026 đến ngày hiện tại | |
| TC_069 | [Filter] Kiểm tra chỉ chọn Ngày kết thúc + Áp dụng (CMR-15) | Đăng nhập thành công. Modal "Bộ lọc tìm kiếm" đang mở. | 1. Không chọn Ngày bắt đầu\n2. Chọn Ngày kết thúc: 31/03/2026\n3. Nhấp nút "Áp dụng" | 3. Modal đóng. Danh sách lọc bài viết từ đầu đến 31/03/2026 | |
| TC_070 | [Filter] Kiểm tra không chọn ngày nào + Áp dụng → đóng modal | Đăng nhập thành công. Modal "Bộ lọc tìm kiếm" đang mở. Chưa chọn ngày nào. | 1. Nhấp nút "Áp dụng" khi chưa chọn ngày | 1. Modal đóng bình thường, không hiển thị lỗi, không áp dụng bộ lọc. Danh sách giữ nguyên | |
| TC_071 | [Filter] Kiểm tra nút "Nhập lại" reset date | Đăng nhập thành công. Modal đang mở, đã chọn ngày 01/03/2026 – 31/03/2026. | 1. Nhấp nút "Nhập lại" | 1. Trường ngày reset về placeholder "Ngày bắt đầu - Ngày kết thúc". Modal vẫn mở (không đóng) | |
| TC_072 | [Filter] Kiểm tra đóng modal bằng nút X — không áp dụng filter | Đăng nhập thành công. Modal đang mở, đã chọn ngày. | 1. Nhấp nút "X" trên modal | 1. Modal đóng. Bộ lọc KHÔNG được áp dụng. Danh sách giữ nguyên trạng thái trước khi mở modal | |
| TC_073 | [Filter] Kiểm tra đóng modal bằng tap ngoài — không áp dụng filter | Đăng nhập thành công. Modal đang mở, đã chọn ngày. | 1. Nhấp vào vùng nền bên ngoài modal | 1. Modal đóng. Bộ lọc KHÔNG được áp dụng. Danh sách giữ nguyên | |
| TC_074 | [Filter] Kiểm tra Android Back khi modal đang mở → quay lại màn trước | Đăng nhập thành công. Modal "Bộ lọc tìm kiếm" đang mở. Thiết bị Android. | 1. Nhấn nút Back vật lý trên thiết bị Android | 1. Quay lại màn hình trước đó (không chỉ đóng modal) | |

#### Giai đoạn 4: Tích hợp — Filter + Tab + Search

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_075 | [Filter + Tab] Kiểm tra bộ lọc ngày persist xuyên Tab | Đăng nhập thành công. Đã áp dụng filter ngày 01/01/2026 – 31/03/2026. Đang ở tab "Tất cả". | 1. Nhấp vào tab "Kinh tế"\n2. Kiểm tra kết quả | 2. Bộ lọc ngày vẫn được giữ nguyên. Kết quả chỉ hiển thị bài thuộc "Kinh tế" VÀ trong khoảng ngày đã lọc | |
| TC_076 | [Search + Filter] Kiểm tra kết hợp tìm kiếm + lọc ngày (CMR-01) | Đăng nhập thành công. Đã áp dụng filter ngày. Thanh tìm kiếm đang mở. | 1. Nhập từ khóa "đầu tư"\n2. Đợi 3 giây\n3. Kiểm tra kết quả | 3. Kết quả trả về phải thỏa mãn CẢ HAI điều kiện: tiêu đề chứa/gần đúng "đầu tư" VÀ ngày đăng trong khoảng đã lọc | |

<!-- DRAFT_CHUNK_5 -->
