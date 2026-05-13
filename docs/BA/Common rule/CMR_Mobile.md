# COMMON MOBILE RULES (CMR) — SRS Mobile App

**Tiêu đề:** Quy tắc chung cho ứng dụng di động
**Ngày tạo:** 01/05/2026
**Phiên bản:** v1.5
**BA phụ trách:** han.luong & huy.lai2

---

## CMR-01 — Ô tìm kiếm (Search Box)

| Quy tắc              | Mô tả                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tìm kiếm tự động | Người dùng nhập từ khóa → Kết quả hiển thị ngay sau debounce, **không cần nhấn Enter** hay nhấn nút nào. |
| Debounce tìm kiếm  | **3 giây**: hiển thị kết quả tìm kiếm trong lúc gõ, sau 3 giây không gõ thì áp dụng tìm kiếm. |
| Loại tìm kiếm      | Tìm kiếm gần đúng (chứa từ khóa), không yêu cầu nhập chính xác.                                     |
| Kết hợp bộ lọc    | Khi dùng ô tìm kiếm cùng bộ lọc tìm kiếm, kết quả phải thỏa**cả hai** điều kiện.            |
| Xóa từ khóa        | Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định (hiển thị tất cả).                      |
| Không có kết quả  | Hiển thị thông báo: *"Không tìm thấy kết quả."* (Xem CMR-14)                                               |
| Placeholder           | Mỗi ô tìm kiếm phải có gợi ý (VD: "Tìm kiếm tên KCN...").                                              |
| Giới hạn ký tự      | Tối đa **500 ký tự** cho ô tìm kiếm. Khi người dùng nhập đến 500 ký tự, không cho phép nhập thêm.       |
| Xử lý whitespace    | Hệ thống **auto-trim** khoảng trắng ở đầu và cuối từ khóa trước khi tìm kiếm (VD: "`  abc  `" → search với "`abc`"). Nếu sau khi trim, từ khóa còn lại **rỗng** (người dùng chỉ nhập space/tab) → Coi như **input rỗng**: không trigger API tìm kiếm, danh sách trở về trạng thái mặc định (hiển thị tất cả — tương tự hành vi "Xóa từ khóa"). |
| State Persistence     | Sau khi tìm kiếm/lọc, nếu người dùng vào màn chi tiết và quay lại, danh sách phải giữ nguyên trạng thái tìm kiếm/lọc trước đó (không reset về trạng thái mặc định). |
| Phạm vi tìm kiếm (Tab) | Khi màn hình có nhiều Tab trạng thái, ô tìm kiếm áp dụng cho **toàn bộ các tab** (không chỉ tab hiện tại). Kết quả tìm kiếm hiển thị trên tab "Tất cả" bất kể tab nào đang được chọn. |
| Reset khi chuyển màn | Khi người dùng chuyển sang **màn hình khác** (qua Sidebar, Footer tab, hoặc điều hướng chính) → **Reset** search/filter về trạng thái mặc định. Lưu ý: "chuyển màn" ở đây là rời khỏi màn hình hiện tại hoàn toàn (không phải chuyển tab trạng thái nội bộ trong cùng 1 màn hình). |

---

## CMR-02 — Bộ lọc tìm kiếm (Search Filter)

| Quy tắc                | Mô tả                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Mở bộ lọc            | Tap icon filter (≡) → Mở modal/panel bộ lọc.                                                         |
| Áp dụng               | Tap nút "Áp dụng" / "Tìm" → Đóng bộ lọc, tải lại danh sách với tiêu chí đã chọn.        |
| Reset                   | Tap nút "Đặt lại" / "Nhập lại" → Reset tất cả trường về giá trị mặc định.                |
| Đóng không áp dụng | Tap vùng ngoài, nút "Đóng" (X), hoặc nút "X" góc phải → Đóng bộ lọc,**không thay đổi** kết quả hiện tại. |
| Nút X đóng            | Icon "X" nằm ở góc phải trên cùng của Bottom Sheet. Tap → Đóng Bottom Sheet, không thay đổi kết quả. |
| Giá trị mặc định   | Tất cả dropdown/combobox trong bộ lọc mặc định "Tất cả".                                         |
| Active filter indicator | Khi có bộ lọc đang active (giá trị khác mặc định), hiển thị **icon indicator màu xanh lá cây** ở góc phải bên trên của icon filter. Khi không có filter active → ẩn indicator. |

---

## CMR-03 — Dropdown / Combobox

| Quy tắc                    | Mô tả                                                                                                                                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nguồn dữ liệu            | Danh sách lấy từ API danh mục (catalog API), không hard-code.                                                                                                                                                                                                                        |
| Giá trị mặc định        | "Tất cả" (trong bộ lọc) hoặc "Chọn..." (trong form bắt buộc).                                                                                                                                                                                                                     |
| Hành vi chọn              | Tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.                                                                                                                                                                                                |
| Single select               | Mặc định chỉ chọn 1 giá trị, trừ khi UC ghi rõ "multi-select".                                                                                                                                                                                                                       |
| **Searchable dropdown** | **Cho phép người dùng nhập để tìm kiếm trong dropdown:**                                                                                                                                                                                                                          |
| - Tìm kiếm                 | Người dùng nhập text → Danh sách option hiển thị kết quả lọc theo từ khóa (tìm kiếm gần đúng).                                                                                                                                                                                     |
| - Sắp xếp                  | Danh sách option sắp xếp theo thứ tự A-Z / 0-9.                                                                                                                                                                                                                                      |
| - Hiển thị text dài     | Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối. Người dùng có thể hover (hoặc tap và giữ) để xem toàn bộ tên option.                                                                                                           |
| - Chọn option              | Tap 1 option → Thay thế placeholder bằng option đã chọn → Đóng dropdown list.                                                                                                                                                                                                    |
| - Highlight                 | Option đã chọn được highlight/bold khi mở dropdown list.                                                                                                                                                                                                                             |
| Inline error (bắt buộc) | Khi submit form mà trường bắt buộc để trống hoặc chỉ có khoảng trắng → Hiển thị inline error: *"[tên trường] là bắt buộc."* (VD: *"Tỉnh/Thành phố là bắt buộc."*, *"Lĩnh vực là bắt buộc."*) |

---

## CMR-04 — Phân trang (Lazy Load / Infinite Scroll)

| Quy tắc               | Mô tả                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| Số bản ghi mỗi lần | **20 bản ghi** mỗi lần tải.                                   |
| Trigger tải thêm     | Cuộn đến cuối danh sách → Tự động tải trang tiếp theo.       |
| Hiển thị loading     | Hiện loading indicator ở cuối danh sách khi đang tải.             |
| Hết dữ liệu         | Khi không còn dữ liệu, ẩn loading indicator, không gọi API nữa. |
| Danh sách rỗng       | Hiển thị thông báo trống (empty state): *"Không có dữ liệu."* (Xem CMR-14) |
| Xử lý lỗi lazy load | Khi tải trang N bị lỗi → Hệ thống **tự động retry 3 lần** (mỗi lần cách nhau ~2 giây). Sau 3 lần retry vẫn fail → **Dừng tự động retry**, hiển thị thông báo lỗi cục bộ ở cuối danh sách. Người dùng có thể dùng **pull-to-refresh** để tải lại từ đầu. |

---

## CMR-05 — Badge trạng thái

| Quy tắc   | Mô tả                                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Màu sắc  | Xanh lá = trạng thái tích cực (Đã duyệt, Đã xử lý, Còn hiệu lực). Vàng = chờ/nháp. Đỏ = tiêu cực (Từ chối, Hết hiệu lực). Xám = trung tính (Lưu nháp, Đã hủy). |
| Vị trí   | Hiển thị trên card, vị trí do UI/UX quyết định.                                                                                                                                          |
| Chỉ đọc | Badge trạng thái luôn read-only, không cho phép tap.                                                                                                                                        |

---

## CMR-06 — Header & Điều hướng

| Quy tắc            | Mô tả                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Nút Quay lại (←) | Tất cả màn hình con có nút Quay lại ở góc trái header. Tap → Quay về màn hình trước. |
| Tiêu đề trang    | Hiển thị tên chức năng tương ứng ở giữa header.                                            |
| Header Trang chủ   | Trang chủ có: Hamburger (☰), Tiêu đề, Icon Thông báo (🔔 + badge).                           |

---

## CMR-07 — Xử lý lỗi chung

| Quy tắc       | Mô tả                                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lỗi mạng     | Hiển thị thông báo:*"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* Kèm nút "Thử lại".                                        |
| Lỗi API (500) | Hiển thị thông báo:*"Hệ thống đang bận. Vui lòng thử lại sau."*                                                                               |
| Lỗi 404       | Hiển thị:*"Nội dung không tồn tại hoặc đã bị xóa."*                                                                                           |
| Lỗi 401 (Session hết hạn) | Hệ thống sẽ tự động sử dụng **refresh token** để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá **15 ngày**), người dùng sẽ được chuyển về **màn hình đăng nhập** và hiển thị **toast**: *"Phiên đăng nhập hết hạn."* |
| Timeout        | Nếu API không phản hồi trong **10 giây** → Hiển thị thông báo:*"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* Kèm nút "Thử lại". |
| Loading state  | Mọi API call phải có loading indicator trong khi chờ kết quả. Đối với **first-load** màn hình danh sách hoặc chi tiết, sử dụng **loading state toàn màn hình** (full-screen loading overlay). Các lần tải tiếp theo (lazy load, refresh) sử dụng loading indicator cục bộ (spinner). |

---

## CMR-08 — Xem tài liệu đính kèm

| Quy tắc         | Mô tả                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Xem trực tiếp    | PDF, Hình ảnh (JPG, PNG), Video (MP4, AVI, MOV) → Mở xem trực tiếp trên trình duyệt thiết bị. |
| Tải xuống       | Các định dạng khác (DOC, DOCX, XLS, XLSX, ZIP, v.v.) → Tự động tải xuống máy (download). |
| Không hỗ trợ  | Nếu định dạng không hỗ trợ: hiển thị thông báo *"Định dạng không hỗ trợ. Vui lòng tải xuống."* |

---
## CMR-09 — Form nhập liệu

| Quy tắc            | Mô tả                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| Validation realtime | Hiển thị lỗi inline ngay khi người dùng rời khỏi trường (on blur).                    |
| Trường bắt buộc | Đánh dấu (*) bên cạnh label.                                                               |
| Thông báo lỗi    | Hiển thị message lỗi ngay dưới trường, màu đỏ. Format chuẩn: *"[tên trường] là bắt buộc."* (VD: *"Họ và tên là bắt buộc."*, *"Email là bắt buộc."*). |
| Upload file         | Hỗ trợ JPG, PNG, PDF. Tối đa 5MB/file. Hiển thị preview thumbnail sau khi chọn. **(Lưu ý: Dung lượng tối đa có thể khác nhau tùy theo mô tả chi tiết từng trường trong từng UC cụ thể — ưu tiên sử dụng giá trị được ghi trong trường của UC đó.)** |
| Xử lý whitespace    | Hệ thống **auto-trim** khoảng trắng ở đầu và cuối giá trị nhập (leading/trailing spaces) ở các trường text (Textbox, Textarea) trước khi validate và submit. Nếu sau khi trim, giá trị còn lại **rỗng** (người dùng chỉ nhập space/tab) → Coi như **input rỗng**: trường bắt buộc fail validation với inline error *"[tên trường] là bắt buộc."* **Loại trừ: Không áp dụng cho password field** — password giữ nguyên giá trị người dùng nhập (không trim). |
| Nút Submit         | Disabled khi form chưa hợp lệ. Enabled khi tất cả trường bắt buộc hợp lệ.            |

---

## CMR-10 — Thông báo xác nhận (Confirmation Dialog)

| Quy tắc            | Mô tả                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------- |
| Khi nào hiển thị | Trước khi thực hiện hành động không thể hoàn tác (gửi, hủy, xóa, đăng xuất). |
| Nội dung           | Tiêu đề + mô tả ngắn + 2 nút: "Xác nhận" (Primary) và "Hủy" (Secondary).           |
| Mặc định         | Focus vào nút "Hủy" để tránh thao tác nhầm.                                           |

---

## CMR-11 — Định dạng số

| Quy tắc                            | Mô tả                                                                                                                                                                                                                                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ký tự hợp lệ                    | Chỉ cho phép chữ số (0-9), dấu trừ - (số âm), dấu chấm . (phân tách thập phân) và dấu phẩy , (phân tách hàng nghìn). Nếu người dùng nhập các ký tự khác, block không cho nhập.                                                         |
| Trường số >= 0                   | - Không chấp nhận dấu - ở đầu.<br>- 3 chữ số phần nguyên phân cách nhau bằng dấu phẩy ,.<br>- Ví dụ: 1,235                                                                                                                                                   |
| Độ dài tối đa (Max length)     | Với các trường không quy định max length, mặc định max length là 500 ký tự. |
| Hiển thị Giá trị (Amount value) | - Hiển thị tối đa 3 chữ số phần thập phân; tự động cắt bỏ các số 0 vô nghĩa ở cuối (VD: 123.320 → chỉ hiển thị 123.32).<br>- 3 chữ số phần nguyên phân cách nhau bằng dấu phẩy ,.<br>- Nếu giá trị < 0.001 → Hiển thị "< 0.001" |

---

## CMR-12 — Định dạng thời gian

| Quy tắc                       | Mô tả                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| Định dạng ngày giờ        | dd/MM/yyyy HH:mm theo định dạng 24h (Ví dụ: 05/09/2023 19:00, 19/08/2000 06:30). |
| Trường chỉ hiển thị ngày | Áp dụng quy tắc hiển thị ngày (dd/MM/yyyy).                                     |
| Trường chỉ hiển thị giờ  | Áp dụng quy tắc hiển thị giờ (HH:mm).                                           |
| Trường hiển thị ngày giờ | Áp dụng quy tắc hiển thị ngày và giờ (dd/MM/yyyy HH:mm).                      |
| Múi giờ                      | Thời gian luôn được hiển thị theo múi giờ Việt Nam (GMT+7).                     |

---

## CMR-13 — Pull to Refresh

| Quy tắc          | Mô tả                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| Hành vi          | Kéo xuống từ đầu danh sách → Trigger refresh dữ liệu từ đầu (reload toàn bộ).         |
| Loading indicator | Hiển thị spinner hoặc animation ở đầu danh sách trong khi đang refresh.                     |
| Kết quả         | Sau khi refresh thành công: Cập nhật danh sách, ẩn spinner.                                   |
| Lỗi              | Nếu refresh thất bại: Vẫn giữ nguyên dữ liệu cũ, hiển thị thông báo lỗi (xem CMR-07). |
| Không duplicate  | Khi đang loading (pull to refresh hoặc lazy load), không trigger lại API tương tự.           |

---

## CMR-14 — Empty State (Trạng thái trống)

| Quy tắc                   | Mô tả                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| Giá trị null (single field) | Khi một trường dữ liệu có giá trị null/rỗng từ API → Hiển thị ký tự **"-"** (single dash) thay thế. Áp dụng cho tất cả field hiển thị (label, text) trên màn hình chi tiết và card list. |
| Không có dữ liệu (no data) | Khi API trả về danh sách rỗng hoặc không có dữ liệu → Hiển thị: *"Không có dữ liệu."*     |
| Không tìm thấy kết quả (no result found) | Khi search/lọc không có kết quả phù hợp → Hiển thị: *"Không tìm thấy kết quả."* |
| Nguyên tắc phân biệt     | - **No data**: Hệ thống không có dữ liệu → Dùng *"Không có dữ liệu."*<br>- **No result**: Có dữ liệu nhưng không khớp với search/lọc → Dùng *"Không tìm thấy kết quả."* |
| Vị trí hiển thị          | Hiển thị ở giữa vùng nội dung chính, căn giữa.                                                    |
| Không có action           | Không hiển thị nút Thử lại cho trường hợp no data (vì không có lỗi).                                |

---

## CMR-15 — Bộ lọc Date Range (Bộ lọc ngày tháng)

| Quy tắc | Mô tả |
| ------- | ----- |
| Displaying rule | Placeholder: "Ngày bắt đầu - Ngày kết thúc" |
| Behavior rule | Khi người dùng chọn date range → Áp dụng filter cho tất cả các trang.<br>- Nếu đang ở kết quả tìm kiếm → Hiển thị kết quả lọc trên kết quả tìm kiếm.<br>- Kết quả lọc hiển thị sau khi người dùng chọn xong ngày kết thúc.<br>- Chọn 1 ngày trong date picker → Thay thế placeholder bằng ngày tương ứng. |
| Validation rule | - Chỉ chọn ngày bắt đầu, không chọn ngày kết thúc + Ấn Áp dụng → Ngày kết thúc = vô hạn (lọc từ ngày bắt đầu đến hiện tại).<br>- Chỉ chọn ngày kết thúc, không chọn ngày bắt đầu + Ấn Áp dụng → Ngày bắt đầu = không giới hạn (lọc từ đầu đến ngày kết thúc).<br>- Khi chọn ngày bắt đầu → Chỉ cho phép chọn ngày kết thúc từ ngày bắt đầu trở về sau (các ngày trước đó bị disable). |

---

## CMR-16 — API Performance (Thời gian phản hồi tối đa)

| Quy tắc                | Mô tả                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Thời gian phản hồi tối đa | **10 giây** cho tất cả API calls. Quá 10 giây → Coi như timeout và hiển thị lỗi. |
| API load danh sách    | Tối đa 10 giây. Quá 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." |
| API chi tiết          | Tối đa 10 giây. Quá 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." |
| API tìm kiếm realtime | Tối đa 10 giây. Quá 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." |
| Xử lý timeout         | Hiển thị thông báo lỗi kèm nút "Thử lại" (Xem CMR-07).                                              |

---

## CMR-17 — Đa ngôn ngữ (Multi-language)

| Quy tắc                | Mô tả                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Phạm vi áp dụng       | Đa ngôn ngữ (5 ngôn ngữ) chỉ áp dụng cho **text cứng của ứng dụng** — bao gồm: header, tên field/label, tên tab, tên nút, placeholder, thông báo lỗi, empty state message, toast message. |
| Nội dung người dùng   | Nội dung do người dùng nhập hoặc dữ liệu từ API (tên thủ tục, tên lĩnh vực, ghi chú, v.v.) **không thay đổi** theo ngôn ngữ — hiển thị nguyên bản từ hệ thống. |
| Ngôn ngữ mặc định    | Tiếng Việt là ngôn ngữ mặc định khi mở ứng dụng lần đầu.                                          |
| Lưu ngôn ngữ          | Cài đặt ngôn ngữ được **lưu trên server/user profile**, không bị reset khi đóng/mở lại ứng dụng hoặc đổi thiết bị. Khi đăng nhập trên thiết bị mới, ngôn ngữ hiển thị theo cài đặt đã lưu trên server. |

---

## CMR-18 — Debounce Navigation & Khôi phục trạng thái khi mở lại app

| Quy tắc                | Mô tả                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Debounce navigation    | Khi người dùng tap nhanh liên tục (double tap) vào các button navigation (Quick Access cards, Footer tabs, Sidebar items), hệ thống có cơ chế debounce. |
| Force close (tắt app không xóa dữ liệu) | Khi người dùng mở lại app sau khi force close, hệ thống quay về **Trang chủ** và **giữ nguyên session đăng nhập**, không yêu cầu đăng nhập lại. |
| Xóa app (uninstall)   | Khi người dùng xóa app và cài đặt lại, hệ thống **yêu cầu đăng nhập lại từ đầu** (không restore session). |

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-01 | v1 | Khởi tạo — 10 CMR (CMR-01→CMR-10) | (Không có) | Search, Filter, Dropdown, Lazy Load, Badge, Header, Error, File Viewer, Form, Confirmation | Tạo mới |
| 2026-05-05 | v1 | Bổ sung CMR-11, CMR-12 | (Không có) | CMR-11 (Định dạng số), CMR-12 (Định dạng thời gian) | Mở rộng rules |
| 2026-05-05 | v1 | Bổ sung CMR-13, CMR-14 | (Không có) | CMR-13 (Pull to Refresh), CMR-14 (Empty State) | Mở rộng rules |
| 2026-05-05 | v1 | Cập nhật CMR-01, CMR-04 | Không tham chiếu CMR-14 | Tham chiếu CMR-14 (Empty State) | Liên kết rules |
| 2026-05-06 | v1 | Bổ sung CMR-15 (Date Range Filter) | (Không có) | Quy tắc chọn ngày, validation ngày bắt đầu/kết thúc | Áp dụng UC53 |
| 2026-05-06 | v1 | Cập nhật CMR-03 (Dropdown) | Dropdown cơ bản | Bổ sung searchable dropdown, phân biệt inline error bắt buộc vs format | UX enhancement |
| 2026-05-06 | v1 | Cập nhật CMR-01 (Search) | Không có debounce/persistence | Bổ sung debounce 3 giây và state persistence | UX enhancement |
| 2026-05-06 | v1 | Cập nhật CMR-02 (Filter) | "Bộ lọc nâng cao" | "Bộ lọc tìm kiếm", bổ sung nút X đóng | Rename + UX |
| 2026-05-06 | v1 | Cập nhật CMR-07 (Error) | Timeout 30 giây | Timeout 10 giây | Tăng tốc UX |
| 2026-05-06 | v1 | Bổ sung CMR-16 (API Performance) | (Không có) | Thời gian phản hồi tối đa 10 giây cho tất cả API | NFR rule |
| 2026-05-07 | 1.0 → 1.1 | CMR-01 — Giới hạn ký tự search | (Không có) | Tối đa 500 ký tự cho ô tìm kiếm | Feedback UC42-44 |
| 2026-05-07 | 1.0 → 1.1 | CMR-02 — Active filter indicator | (Không có) | Icon indicator màu xanh lá cây ở góc phải trên icon filter khi có filter đang active | Feedback UC42-44 |
| 2026-05-07 | 1.0 → 1.1 | CMR-07 — Xử lý lỗi 401 | (Không có) | Tự động sử dụng refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" | Feedback UC42-44 |
| 2026-05-07 | 1.0 → 1.1 | CMR-07 — Loading state | "Mọi API call phải có loading indicator (spinner/skeleton)" | First-load sử dụng loading state toàn màn hình, các lần tải tiếp theo dùng spinner cục bộ | Feedback UC42-44 |
| 2026-05-07 | 1.0 → 1.1 | Bổ sung CMR-17 (Đa ngôn ngữ) | (Không có) | Đa ngôn ngữ chỉ áp dụng cho text cứng, nội dung field người dùng không thay đổi | Feedback UC42-44 |
| 2026-05-07 | 1.0 → 1.1 | Bổ sung CMR-18 (Debounce Navigation & Khôi phục trạng thái) | (Không có) | Debounce double-tap navigation, force close giữ session, uninstall yêu cầu đăng nhập lại | Feedback UC42-44 |
| 2026-05-11 | 1.1 → 1.2 | Xóa dòng "Áp dụng cho" dưới 18 CMR (CMR-01 → CMR-18) | Mỗi CMR có dòng `**Áp dụng cho:** ...` liệt kê phạm vi UC áp dụng | (Đã xóa) | Feedback: không cần hiển thị phạm vi áp dụng dưới mỗi CMR |
| 2026-05-11 | 1.2 → 1.3 | CMR-01 — Xử lý whitespace | (Không có) | Auto-trim khoảng trắng đầu/cuối từ khóa trước khi tìm kiếm. Nếu sau trim rỗng → coi như input rỗng, không trigger API, danh sách về trạng thái mặc định | Thống nhất hành vi khi người dùng chỉ nhập space/tab |
| 2026-05-11 | 1.2 → 1.3 | CMR-09 — Xử lý whitespace | (Không có) | Auto-trim khoảng trắng đầu/cuối ở Textbox/Textarea trước khi validate và submit. Nếu sau trim rỗng → coi như input rỗng, trường bắt buộc fail validation với inline error "[tên trường] là bắt buộc." | Thống nhất hành vi khi người dùng chỉ nhập space/tab |
| 2026-05-11 | 1.3 → 1.4 | CMR-14 — Giá trị null (single field) | (Không có) | Khi field có giá trị null/rỗng từ API → hiển thị "-" (single dash). Áp dụng cho tất cả field hiển thị | Thống nhất null display xuyên suốt UC (A1) |
| 2026-05-11 | 1.3 → 1.4 | CMR-09 — Loại trừ password field khỏi whitespace trim | Không loại trừ | Bổ sung: Không áp dụng auto-trim cho password field — giữ nguyên giá trị người dùng nhập | Password có thể chứa spaces hợp lệ (A2) |
| 2026-05-11 | 1.3 → 1.4 | CMR-09 — Thông báo lỗi format | `"Trường này là bắt buộc."` | `"[tên trường] là bắt buộc."` (VD: "Họ và tên là bắt buộc.", "Email là bắt buộc.") | Thống nhất format inline error (A3) |
| 2026-05-11 | 1.3 → 1.4 | CMR-17 — Lưu ngôn ngữ | Lưu trên thiết bị | Lưu trên server/user profile, không bị reset khi đổi thiết bị | Thống nhất với UC1 (A4) |
| 2026-05-11 | 1.3 → 1.4 | CMR-01 — Phạm vi tìm kiếm (Tab) | (Không có) | Search áp dụng toàn bộ tab, kết quả hiển thị trên tab "Tất cả" | Thống nhất search scope (C1) |
| 2026-05-11 | 1.3 → 1.4 | CMR-01 — Reset khi chuyển màn | (Không có) | Chuyển sang màn hình khác (Sidebar, Footer tab) → reset search/filter về mặc định | Thống nhất state persistence (C2) |
| 2026-05-11 | 1.3 → 1.4 | CMR-04 — Xử lý lỗi lazy load | (Không có) | Retry tự động 3 lần (mỗi lần cách 2s). Sau 3 lần fail → dừng, hiển thị lỗi cục bộ, user pull-to-refresh | Thống nhất retry behavior (B6) |
| 2026-05-12 | 1.4 → 1.5 | CMR-03 — Inline error (bắt buộc) | "Vui lòng nhập/chọn [tên trường]." | "[tên trường] là bắt buộc." | Thống nhất format với CMR-09 (A1) |
| 2026-05-12 | 1.4 → 1.5 | CMR-03 — Xóa row "Inline error (format)" | Có row riêng phân biệt lỗi format vs bắt buộc | (Đã xóa — trùng logic với row bắt buộc) | Đơn giản hóa rule |

