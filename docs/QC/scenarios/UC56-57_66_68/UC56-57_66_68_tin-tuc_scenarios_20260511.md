# Test Scenarios — UC56-57/66-68: Khai thác tin tức công bố trên Mobile

**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Agent (Claude)  
**Phiên bản:** v1  
**Tài liệu nguồn:** UC56-57_66_68_TinTuc.md (v1.2), UC56-57_66_68_tin-tuc_audited_20260511_v2.md  

---

## UC56 — Xem danh sách Tin tức

### Scenario ID: TS_UC56_001
**Scenario Title:** Mở màn hình Tin tức từ Sidebar  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC1  
**Test Type:** Functional  
**Description:** Xác minh người dùng có thể mở màn hình Tin tức từ menu Sidebar và màn hình hiển thị đúng cấu trúc (Header, Tab Bar, Tin nổi bật, Tin mới nhất).  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_002
**Scenario Title:** Header "Tin tức" không thay đổi khi đổi Tab hoặc áp dụng bộ lọc  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC1  
**Test Type:** UI  
**Description:** Xác minh tiêu đề Header luôn hiển thị "Tin tức" cố định bất kể người dùng đổi tab hay áp dụng bộ lọc.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_003
**Scenario Title:** Tab Bar hiển thị đầy đủ 19 Tab và cuộn ngang  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC1  
**Test Type:** UI  
**Description:** Xác minh Tab Bar hiển thị đủ 19 danh mục, hỗ trợ cuộn ngang mượt mà, tab đang chọn có highlight.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_004
**Scenario Title:** Tab mặc định "Tất cả" khi mở lần đầu  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC1  
**Test Type:** Functional  
**Description:** Xác minh khi mở màn hình Tin tức lần đầu, tab "Tất cả" được chọn mặc định và danh sách hiển thị tất cả bài viết.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_005
**Scenario Title:** Đổi tab tải lại danh sách đúng danh mục  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC1  
**Test Type:** Functional  
**Description:** Xác minh khi chọn một tab khác, danh sách bài viết được tải lại và chỉ hiển thị bài thuộc danh mục tương ứng.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_006
**Scenario Title:** Đổi tab áp dụng CMR-18 Debounce — double-tap chỉ load 1 lần  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-18  
**Test Type:** Functional  
**Description:** Xác minh khi người dùng tap nhanh liên tiếp vào tab, hệ thống chỉ gọi API 1 lần nhờ cơ chế debounce CMR-18.  
**Test Focus:** Error/Exception  

### Scenario ID: TS_UC56_007
**Scenario Title:** Skeleton Loading hiển thị khi tải dữ liệu lần đầu  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC9  
**Test Type:** UI  
**Description:** Xác minh Skeleton Loading hiển thị đúng layout khi màn hình đang tải dữ liệu lần đầu, biến mất khi data sẵn sàng.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_008
**Scenario Title:** Nút Quay lại hiển thị khi đi từ màn khác, ẩn khi ở tab chính  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-06  
**Test Type:** UI  
**Description:** Xác minh nút Quay lại chỉ hiển thị khi người dùng navigate từ màn hình khác đến Tin tức, ẩn khi Tin tức là tab chính trên bottom nav.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_009
**Scenario Title:** Nút Quay lại quay về màn trước  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-06  
**Test Type:** Functional  
**Description:** Xác minh nhấn nút Quay lại sẽ navigate về đúng màn hình trước đó trong navigation stack.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_010
**Scenario Title:** Tin nổi bật carousel ngang khi ≥2 bài, auto-scroll 5s, no dot  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC8  
**Test Type:** UI  
**Description:** Xác minh khi có ≥2 bài tin nổi bật, carousel cuộn ngang tự động mỗi 5 giây, không hiển thị dot indicator.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_011
**Scenario Title:** Tin nổi bật 1 bài = tĩnh, không cuộn  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC8  
**Test Type:** UI  
**Description:** Xác minh khi chỉ có 1 bài tin nổi bật, hiển thị tĩnh dạng card đơn, không có carousel hay auto-scroll.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC56_012
**Scenario Title:** Tin nổi bật 0 bài = ẩn hoàn toàn section  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC8  
**Test Type:** UI  
**Description:** Xác minh khi không có bài tin nổi bật nào, toàn bộ section Tin nổi bật bị ẩn, không chiếm không gian trên màn hình.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC56_013
**Scenario Title:** Card Tin nổi bật hiển thị đầy đủ (Tag đỏ, Title 2 dòng, Trích dẫn 2 dòng, Footer date+author)  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh card Tin nổi bật hiển thị đầy đủ các thành phần: Tag màu đỏ, Tiêu đề tối đa 2 dòng, Trích dẫn tối đa 2 dòng, Footer gồm ngày đăng và tên tác giả.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_014
**Scenario Title:** Tiêu đề >2 dòng truncate với ellipsis  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh khi tiêu đề bài viết vượt quá 2 dòng, nội dung bị cắt và hiển thị dấu "..." (ellipsis) ở cuối dòng thứ 2.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC56_015
**Scenario Title:** Tên người đăng dài truncate khi vượt max-width  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh khi tên người đăng quá dài vượt max-width cho phép, text bị truncate với ellipsis, không làm vỡ layout.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC56_016
**Scenario Title:** Tap Card Tin nổi bật mở Chi tiết  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC7  
**Test Type:** Functional  
**Description:** Xác minh khi tap vào card Tin nổi bật, ứng dụng navigate sang màn hình Chi tiết bài viết tương ứng.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_017
**Scenario Title:** Double-tap Card Tin nổi bật chỉ navigate 1 lần (CMR-18)  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-18  
**Test Type:** Functional  
**Description:** Xác minh khi double-tap nhanh vào card Tin nổi bật, hệ thống chỉ navigate 1 lần nhờ debounce CMR-18, không push 2 màn hình.  
**Test Focus:** Error/Exception  

### Scenario ID: TS_UC56_018
**Scenario Title:** Bài Tin nổi bật không lặp ở Tin mới nhất (exclusion rule)  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC5  
**Test Type:** Functional  
**Description:** Xác minh các bài viết đã hiển thị trong section Tin nổi bật sẽ không xuất hiện lại trong danh sách Tin mới nhất (exclusion rule).  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_019
**Scenario Title:** Tin mới nhất sắp xếp mới nhất lên đầu  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC1  
**Test Type:** Functional  
**Description:** Xác minh danh sách Tin mới nhất được sắp xếp theo thứ tự ngày đăng giảm dần (bài mới nhất hiển thị đầu tiên).  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_020
**Scenario Title:** Card Tin mới nhất hiển thị đầy đủ cấu trúc  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh card Tin mới nhất hiển thị đầy đủ: Thumbnail, Tag danh mục, Tiêu đề (2 dòng max), Ngày đăng, Tên tác giả.  
**Test Focus:** UI State  

### Scenario ID: TS_UC56_021
**Scenario Title:** Thumbnail null → placeholder icon  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh khi bài viết không có thumbnail (null), hệ thống hiển thị placeholder icon thay thế, không để trống hoặc crash.  
**Test Focus:** Error/Exception  

### Scenario ID: TS_UC56_022
**Scenario Title:** Tag Category text dài → wrap không truncate  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh khi tên danh mục (tag) dài, text được wrap xuống dòng thay vì truncate, đảm bảo hiển thị đầy đủ.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC56_023
**Scenario Title:** Tap Card Tin mới nhất mở Chi tiết  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC7  
**Test Type:** Functional  
**Description:** Xác minh khi tap vào card Tin mới nhất, ứng dụng navigate sang màn hình Chi tiết bài viết tương ứng.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_024
**Scenario Title:** Lazy load 20 bài khi cuộn đến cuối  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-04  
**Test Type:** Functional  
**Description:** Xác minh khi cuộn đến cuối danh sách, hệ thống tự động tải thêm 20 bài tiếp theo (lazy load/infinite scroll).  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_025
**Scenario Title:** Lazy load hết data → ẩn loading, không gọi API  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-04  
**Test Type:** Functional  
**Description:** Xác minh khi đã tải hết toàn bộ bài viết, hệ thống ẩn loading indicator và không gọi thêm API khi cuộn tiếp.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC56_026
**Scenario Title:** Lazy load mất mạng → giữ data cũ + lỗi CMR-07  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-07  
**Test Type:** Functional  
**Description:** Xác minh khi mất mạng trong quá trình lazy load, hệ thống giữ nguyên data đã tải và hiển thị thông báo lỗi theo CMR-07.  
**Test Focus:** Error/Exception  

### Scenario ID: TS_UC56_027
**Scenario Title:** Pull to Refresh làm mới toàn bộ  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC10, CMR-13  
**Test Type:** Functional  
**Description:** Xác minh kéo xuống Pull to Refresh sẽ tải lại toàn bộ dữ liệu (Tin nổi bật + Tin mới nhất) từ đầu.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC56_028
**Scenario Title:** Pull to Refresh thất bại → giữ data cũ + lỗi  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** CMR-13  
**Test Type:** Functional  
**Description:** Xác minh khi Pull to Refresh thất bại (mất mạng/lỗi server), hệ thống giữ nguyên data cũ và hiển thị thông báo lỗi.  
**Test Focus:** Error/Exception  

### Scenario ID: TS_UC56_029
**Scenario Title:** Danh sách rỗng → "Không có dữ liệu." (CMR-14)  
**UC Reference:** UC56 — Xem danh sách Tin tức  
**Req-ID:** AC11, CMR-14  
**Test Type:** UI  
**Description:** Xác minh khi danh sách bài viết rỗng (không có data), hiển thị thông báo "Không có dữ liệu." theo CMR-14.  
**Test Focus:** Boundary  

---

## UC66 — Tìm kiếm & Lọc bài viết

### Scenario ID: TS_UC66_001
**Scenario Title:** Tap icon kính lúp mở thanh tìm kiếm  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3  
**Test Type:** Functional  
**Description:** Xác minh khi tap vào icon kính lúp, thanh tìm kiếm xuất hiện với placeholder text và keyboard mở sẵn.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_002
**Scenario Title:** Tap lại icon kính lúp đóng thanh + xóa từ khóa  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3  
**Test Type:** Functional  
**Description:** Xác minh khi tap lại icon kính lúp lần nữa, thanh tìm kiếm đóng lại, từ khóa bị xóa và danh sách trở về mặc định.  
**Test Focus:** Alternative flow  

### Scenario ID: TS_UC66_003
**Scenario Title:** Thanh tìm kiếm non-sticky, ẩn khi cuộn  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3  
**Test Type:** UI  
**Description:** Xác minh thanh tìm kiếm không sticky (không cố định), bị ẩn khi người dùng cuộn danh sách xuống.  
**Test Focus:** UI State  

### Scenario ID: TS_UC66_004
**Scenario Title:** Nhập từ khóa → tìm kiếm gần đúng theo tiêu đề trong Tab active  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3, CMR-01  
**Test Type:** Functional  
**Description:** Xác minh khi nhập từ khóa, hệ thống tìm kiếm gần đúng (fuzzy) theo tiêu đề bài viết, chỉ trong phạm vi tab đang active.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_005
**Scenario Title:** Debounce 3 giây — kết quả hiển thị sau 3s không gõ  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** CMR-01  
**Test Type:** Functional  
**Description:** Xác minh hệ thống áp dụng debounce 3 giây — chỉ gọi API tìm kiếm sau khi người dùng ngừng gõ 3 giây.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_006
**Scenario Title:** Giới hạn 500 ký tự — không cho nhập thêm khi đạt 500  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** CMR-01  
**Test Type:** Functional  
**Description:** Xác minh ô tìm kiếm giới hạn tối đa 500 ký tự, không cho phép nhập thêm khi đã đạt giới hạn.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC66_007
**Scenario Title:** Xóa hết từ khóa → danh sách trở về mặc định  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** CMR-01  
**Test Type:** Functional  
**Description:** Xác minh khi xóa hết từ khóa trong ô tìm kiếm, danh sách bài viết trở về trạng thái mặc định (không filter keyword).  
**Test Focus:** Alternative flow  

### Scenario ID: TS_UC66_008
**Scenario Title:** Đổi tab khi đang tìm kiếm → giữ keyword, tải lại theo tab mới  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3  
**Test Type:** Integration  
**Description:** Xác minh khi đổi tab trong lúc đang tìm kiếm, từ khóa được giữ nguyên và kết quả tải lại theo danh mục tab mới.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_009
**Scenario Title:** Tìm kiếm không có kết quả → "Không tìm thấy kết quả." (CMR-14)  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC11, CMR-14  
**Test Type:** UI  
**Description:** Xác minh khi tìm kiếm không trả về kết quả nào, hiển thị thông báo "Không tìm thấy kết quả." theo CMR-14.  
**Test Focus:** Boundary  

### Scenario ID: TS_UC66_010
**Scenario Title:** Không có icon clear X — user phải xóa thủ công hoặc tap lại icon  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3  
**Test Type:** UI  
**Description:** Xác minh thanh tìm kiếm không có icon X để clear, người dùng phải xóa thủ công hoặc tap lại icon kính lúp để đóng.  
**Test Focus:** UI State  

### Scenario ID: TS_UC66_011
**Scenario Title:** Tap icon Filter mở Modal "Bộ lọc tìm kiếm"  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4  
**Test Type:** Functional  
**Description:** Xác minh khi tap icon Filter, modal "Bộ lọc tìm kiếm" hiển thị với date picker (Ngày bắt đầu, Ngày kết thúc) và các nút hành động.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_012
**Scenario Title:** Chọn khoảng ngày đăng + Áp dụng → đóng modal, tải lại danh sách  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4  
**Test Type:** Functional  
**Description:** Xác minh khi chọn cả Ngày bắt đầu và Ngày kết thúc rồi nhấn Áp dụng, modal đóng và danh sách tải lại chỉ hiển thị bài trong khoảng ngày.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_013
**Scenario Title:** Chọn chỉ Ngày bắt đầu + Áp dụng → lọc từ ngày đó đến hiện tại (CMR-15)  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4, CMR-15  
**Test Type:** Functional  
**Description:** Xác minh khi chỉ chọn Ngày bắt đầu và nhấn Áp dụng, hệ thống lọc bài viết từ ngày đó đến ngày hiện tại theo CMR-15.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_014
**Scenario Title:** Chọn chỉ Ngày kết thúc + Áp dụng → lọc từ đầu đến ngày đó (CMR-15)  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4, CMR-15  
**Test Type:** Functional  
**Description:** Xác minh khi chỉ chọn Ngày kết thúc và nhấn Áp dụng, hệ thống lọc bài viết từ đầu đến ngày đó theo CMR-15.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_015
**Scenario Title:** Không chọn ngày nào + Áp dụng → đóng modal, không lỗi, không áp dụng lọc  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4  
**Test Type:** Functional  
**Description:** Xác minh khi không chọn ngày nào và nhấn Áp dụng, modal đóng bình thường, không hiển thị lỗi và không áp dụng bộ lọc.  
**Test Focus:** Alternative flow  

### Scenario ID: TS_UC66_016
**Scenario Title:** Nút "Nhập lại" → reset date về placeholder, giữ popup mở  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4  
**Test Type:** Functional  
**Description:** Xác minh khi nhấn nút "Nhập lại" trong modal filter, các trường ngày reset về placeholder ban đầu và modal vẫn mở.  
**Test Focus:** Alternative flow  

### Scenario ID: TS_UC66_017
**Scenario Title:** Đóng modal bằng X hoặc tap ngoài → không áp dụng filter  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4  
**Test Type:** Functional  
**Description:** Xác minh khi đóng modal bằng nút X hoặc tap bên ngoài, bộ lọc không được áp dụng và danh sách giữ nguyên trạng thái.  
**Test Focus:** Alternative flow  

### Scenario ID: TS_UC66_018
**Scenario Title:** Bộ lọc ngày persist xuyên suốt tất cả Tab (không reset khi đổi tab)  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC4  
**Test Type:** Integration  
**Description:** Xác minh bộ lọc ngày đã áp dụng được giữ nguyên khi đổi tab, kết quả ở mỗi tab đều tuân theo filter ngày đang active.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_019
**Scenario Title:** Kết hợp tìm kiếm + lọc ngày → kết quả thỏa CẢ HAI (CMR-01)  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** AC3, AC4, CMR-01  
**Test Type:** Integration  
**Description:** Xác minh khi áp dụng đồng thời tìm kiếm keyword và lọc ngày, kết quả trả về phải thỏa mãn cả hai điều kiện.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC66_020
**Scenario Title:** Android Back khi modal đang mở → quay lại màn trước  
**UC Reference:** UC66 — Tìm kiếm & Lọc bài viết  
**Req-ID:** CMR-06  
**Test Type:** Functional  
**Description:** Xác minh trên Android, nhấn nút Back vật lý khi modal filter đang mở sẽ quay lại màn hình trước đó (không chỉ đóng modal).  
**Test Focus:** Happy path  

---

## UC57 — Xem chi tiết bài viết

### Scenario ID: TS_UC57_001
**Scenario Title:** Tap card bài viết → mở Chi tiết với Skeleton Loading  
**UC Reference:** UC57 — Xem chi tiết bài viết  
**Req-ID:** AC9  
**Test Type:** Functional  
**Description:** Xác minh khi tap card bài viết, màn hình Chi tiết mở với Skeleton Loading hiển thị trong lúc tải dữ liệu.  
**Test Focus:** Happy path  

### Scenario ID: TS_UC57_002
**Scenario Title:** Chi tiết hiển thị đầy đủ: Tag, Tiêu đề, Ngày đăng, Tác giả, Rich Text  
**UC Reference:** UC57 — Xem chi tiết bài viết  
**Req-ID:** AC6  
**Test Type:** UI  
**Description:** Xác minh màn hình Chi tiết hiển thị đầy đủ các thành phần: Tag danh mục, Tiêu đề, Ngày đăng, Tên tác giả, và nội dung Rich Text.  
**Test Focus:** UI State  

<!-- CHUNK_PLACEHOLDER_8 -->