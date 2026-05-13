# Test Scenarios

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v1.0
**Tài liệu tham chiếu:** UC55_ChuyenTrangDauTu.md, UC55_chuyen-trang-dau-tu_audited_20260508_v1.md, CMR_Mobile.md

---

## UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư

---

### MÀN HÌNH 1: DANH SÁCH CHỌN TỈNH / THÀNH PHỐ

---

### Scenario ID: TS_UC55_001
**Scenario Title:** Hiển thị danh sách tỉnh — Happy path
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-001, BR-01, BR-02, BR-03
**Test Type:** Functional
**Description:** Xác minh khi người dùng đã đăng nhập truy cập Sidebar → "Khu vực đầu tư", hệ thống hiển thị đầy đủ danh sách 63 tỉnh/thành phố, sắp xếp theo thứ tự A–Z, tải toàn bộ trong 1 lần (không lazy load).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_002
**Scenario Title:** Hiển thị skeleton loading khi tải danh sách tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-001, CMR-07
**Test Type:** UI
**Description:** Xác minh hệ thống hiển thị skeleton loading trong khi gọi API danh mục tỉnh/thành phố, sau khi API phản hồi thành công thì skeleton biến mất và danh sách hiển thị.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_003
**Scenario Title:** Kiểm tra header màn hình danh sách tỉnh — CMR-06
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-001, CMR-06
**Test Type:** UI
**Description:** Xác minh header hiển thị đúng: nút Quay lại (←) ở góc trái, tiêu đề "Đầu tư theo khu vực" nằm giữa, màu trắng trên nền đỏ đậm.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_004
**Scenario Title:** Tap nút Quay lại (←) từ danh sách tỉnh — CMR-06
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-002, CMR-06
**Test Type:** Functional
**Description:** Xác minh khi tap nút Quay lại (←) trên header màn hình danh sách tỉnh, hệ thống điều hướng quay về màn hình trước đó (Sidebar hoặc màn hình nguồn).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_005
**Scenario Title:** Hiển thị tiêu đề section và ô tìm kiếm
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-002, UC55-UI-003
**Test Type:** UI
**Description:** Xác minh tiêu đề "Chọn tỉnh / thành phố" hiển thị phía trên ô tìm kiếm (font đậm, căn trái), và ô tìm kiếm hiển thị icon kính lúp bên trái + placeholder "Tìm kiếm tỉnh, thành phố...".
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_006
**Scenario Title:** Kiểm tra cấu trúc mỗi item trong danh sách tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-004
**Test Type:** UI
**Description:** Xác minh mỗi item tỉnh trong danh sách gồm: Tên tỉnh (căn trái) + Icon mũi tên ">" (căn phải). Danh sách cuộn dọc (Vertical Scroll).
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_007
**Scenario Title:** Dữ liệu danh sách tỉnh lấy từ API danh mục, không hard-code
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-001, BR-01
**Test Type:** Functional
**Description:** Xác minh danh sách 63 tỉnh/thành phố được lấy từ API danh mục hệ thống (catalog API), không hard-code. Khi dữ liệu danh mục thay đổi (thêm/sửa/xóa), danh sách cập nhật tương ứng.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_008
**Scenario Title:** Sắp xếp danh sách tỉnh theo thứ tự A–Z
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-001, BR-03
**Test Type:** Functional
**Description:** Xác minh danh sách tỉnh/thành phố được sắp xếp theo alphabet (A–Z), ví dụ: An Giang → Bà Rịa - Vũng Tàu → Bắc Giang → ... → Yên Bái.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_009
**Scenario Title:** Tìm kiếm tỉnh — nhập từ khóa hợp lệ, có kết quả
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập từ khóa hợp lệ (ví dụ: "An"), danh sách lọc real-time hiển thị các tỉnh có chứa từ khóa (ví dụ: "An Giang", "Nghệ An", "Long An"), không cần nhấn Enter.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_010
**Scenario Title:** Tìm kiếm tỉnh — từ khóa không khớp, không có kết quả
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi nhập từ khóa không khớp tỉnh nào (ví dụ: "XYZ123"), hệ thống hiển thị thông báo "Không tìm thấy kết quả." theo CMR-14.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_011
**Scenario Title:** Tìm kiếm tỉnh — xóa hết từ khóa
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi xóa hết từ khóa trong ô tìm kiếm, danh sách tỉnh trở về trạng thái đầy đủ (63 tỉnh, sắp xếp A–Z).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC55_012
**Scenario Title:** Tìm kiếm tỉnh — tìm kiếm gần đúng (chứa từ khóa)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh tìm kiếm là gần đúng (chứa từ khóa), ví dụ: nhập "Bắc" sẽ trả về "Bắc Giang", "Bắc Kạn", "Bắc Ninh", "Ninh Bình" thì không nằm trong kết quả.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_013
**Scenario Title:** Tìm kiếm tỉnh — nhập 1 ký tự duy nhất
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập 1 ký tự (ví dụ: "A"), hệ thống lọc real-time tất cả các tỉnh chứa ký tự "A" trong tên.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_014
**Scenario Title:** Tìm kiếm tỉnh — nhập ký tự đặc biệt
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập ký tự đặc biệt (ví dụ: "@#$%"), hệ thống hiển thị "Không tìm thấy kết quả." và không gây lỗi hệ thống.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_015
**Scenario Title:** Tìm kiếm tỉnh — nhập khoảng trắng
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập chỉ khoảng trắng vào ô tìm kiếm, hệ thống xử lý hợp lý (hiển thị đầy đủ danh sách hoặc thông báo không tìm thấy, không gây lỗi).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_016
**Scenario Title:** Tìm kiếm tỉnh — nhập từ có dấu tiếng Việt
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh tìm kiếm hỗ trợ tiếng Việt có dấu, ví dụ: nhập "Đà" trả về "Đà Nẵng", "Lâm Đồng" (nếu chứa "Đà"); nhập "Hà" trả về "Hà Nội", "Hà Giang", "Hà Nam", "Hà Tĩnh".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_017
**Scenario Title:** Tìm kiếm tỉnh — debounce theo CMR-01 (3 giây)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, CMR-01
**Test Type:** Functional
**Description:** Xác minh cơ chế debounce khi tìm kiếm: kết quả hiển thị trong lúc gõ, sau 3 giây không gõ thêm thì áp dụng tìm kiếm chính thức (theo CMR-01). Lưu ý: UC55 mô tả "real-time ngay lập tức" — cần verify theo quy tắc nào được ưu tiên (Q3 — Open).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_018
**Scenario Title:** Pull to Refresh trên danh sách tỉnh — CMR-13
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-004, CMR-13
**Test Type:** Functional
**Description:** Xác minh kéo xuống từ đầu danh sách tỉnh → hiển thị spinner/animation → gọi lại API danh mục → cập nhật danh sách → ẩn spinner.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC55_019
**Scenario Title:** Pull to Refresh thất bại — CMR-13
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-004, CMR-13, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi Pull to Refresh thất bại (lỗi mạng/API), hệ thống giữ nguyên dữ liệu cũ và hiển thị thông báo lỗi theo CMR-07.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_020
**Scenario Title:** Không trigger duplicate API khi đang Pull to Refresh — CMR-13
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-004, CMR-13
**Test Type:** Functional
**Description:** Xác minh khi đang trong quá trình Pull to Refresh (loading), kéo xuống lần nữa không trigger API call trùng lặp (theo CMR-13 "Không duplicate").
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_021
**Scenario Title:** Tap vào item tỉnh — điều hướng đến chi tiết
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-005
**Test Type:** Functional
**Description:** Xác minh khi tap vào một item tỉnh trong danh sách (ví dụ: "An Giang"), hệ thống điều hướng đến màn hình Chi tiết chuyên trang của tỉnh đó.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_022
**Scenario Title:** Lỗi mạng khi tải danh sách tỉnh — CMR-07
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-001, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi mất kết nối mạng trong lúc tải danh sách tỉnh, hệ thống hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại". Giữ nguyên màn hình.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_023
**Scenario Title:** Lỗi API 500 khi tải danh sách tỉnh — CMR-07
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-002, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi API danh mục trả về HTTP 500, hệ thống hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau." Giữ nguyên màn hình.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_024
**Scenario Title:** Timeout khi tải danh sách tỉnh — CMR-07, CMR-16
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-003, CMR-07, CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API danh mục tỉnh không phản hồi trong 10 giây (theo CMR-07/CMR-16), hệ thống hiển thị thông báo "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại". Lưu ý: UC55 không nêu rõ timeout — áp dụng CMR mặc định (Q5 — Open).
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_025
**Scenario Title:** Nút Thử lại sau lỗi mạng — danh sách tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-001, CMR-07
**Test Type:** Functional
**Description:** Xác minh sau khi hiển thị lỗi mạng + nút "Thử lại", tap nút "Thử lại" → hệ thống gọi lại API danh mục → nếu thành công, hiển thị danh sách tỉnh bình thường.
**Test Focus:** Alternative flow

---

---

### MÀN HÌNH 2: CHI TIẾT CHUYÊN TRANG ĐẦU TƯ THEO TỈNH

---

### Scenario ID: TS_UC55_026
**Scenario Title:** Hiển thị chi tiết chuyên trang tỉnh — Happy path (full data)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-005, AC1
**Test Type:** Functional
**Description:** Xác minh khi chọn một tỉnh (ví dụ: "An Giang"), hệ thống gọi API chi tiết và hiển thị đầy đủ 8 sections theo thứ tự: Banner ảnh → KPI → Tổng quan đầu tư → Lĩnh vực khuyến khích → Hạ tầng KCN → Vị trí địa lý → Liên hệ đầu tư → CTA. Dữ liệu khớp 100% với API.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_027
**Scenario Title:** Skeleton loading từng section khi tải chi tiết tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-005, CMR-07
**Test Type:** UI
**Description:** Xác minh hệ thống hiển thị skeleton loading cho từng section trong khi gọi API chi tiết chuyên trang theo mã tỉnh. Sau khi API phản hồi, skeleton biến mất và nội dung thực hiển thị.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_028
**Scenario Title:** Header chi tiết tỉnh — hiển thị tên tỉnh đúng
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-005, CMR-06
**Test Type:** UI
**Description:** Xác minh header màn hình chi tiết hiển thị đúng: nút Quay lại (←) ở góc trái, tên tỉnh đã chọn nằm giữa (ví dụ: "An Giang"), màu trắng trên nền đỏ đậm.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_029
**Scenario Title:** Tap Quay lại từ chi tiết tỉnh — trở về danh sách
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-006, CMR-06
**Test Type:** Functional
**Description:** Xác minh tap nút Quay lại (←) trên header chi tiết tỉnh → hệ thống quay về màn hình danh sách tỉnh.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_030
**Scenario Title:** Banner ảnh tỉnh — hiển thị đúng overlay text
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-006
**Test Type:** UI
**Description:** Xác minh banner ảnh hiển thị full width, chiều cao cố định, overlay text gồm: tên tỉnh viết hoa (ví dụ: "AN GIANG") và tagline mô tả ngắn (ví dụ: "Cửa ngõ kinh tế phía Tây Nam"), màu trắng, nằm góc dưới trái.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_031
**Scenario Title:** Banner ảnh tỉnh — fallback khi ảnh không load được
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-006
**Test Type:** UI
**Description:** Xác minh khi ảnh banner không tải được (network error, 404), hệ thống hiển thị hình ảnh trạng thái loading thay thế, overlay text (tên tỉnh + tagline) vẫn hiển thị đè lên hình loading.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_032
**Scenario Title:** Thẻ KPI — Tăng trưởng GRDP hiển thị đúng format (%)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh thẻ "Tăng trưởng GRDP" hiển thị: icon biểu đồ (màu đỏ), nhãn "Tăng trưởng GRDP", giá trị thập phân 1 chữ số (ví dụ: 6.2%). Không rút gọn đơn vị.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_033
**Scenario Title:** Thẻ KPI — Dân số format rút gọn K/M/B
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh thẻ "Dân số" hiển thị: icon người (đỏ), nhãn "Dân số", giá trị rút gọn theo ngưỡng (K/M/B) với tối đa 1 chữ số thập phân nếu không tròn.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_034
**Scenario Title:** BVA — Dân số: Dưới 1.000 người (không rút gọn)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 850 (dưới 1.000), hiển thị số nguyên không rút gọn: "850".
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_035
**Scenario Title:** BVA — Dân số: Đúng 999 (biên dưới của K)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 999, hiển thị "999" (không rút gọn K).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_036
**Scenario Title:** BVA — Dân số: Đúng 1.000 (biên trên bắt đầu K)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 1.000, hiển thị "1K" (bắt đầu rút gọn K).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_037
**Scenario Title:** BVA — Dân số: 1.500 (K với thập phân)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 1.500, hiển thị "1.5K" (1 chữ số thập phân vì không tròn).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_038
**Scenario Title:** BVA — Dân số: 500.000 (K tròn)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 500.000, hiển thị "500K" (số nguyên vì tròn).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_039
**Scenario Title:** BVA — Dân số: 999.999 (biên dưới của M)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 999.999, hiển thị "1000K" hoặc "1M" — cần xác nhận quy tắc làm tròn tại biên 999.999 → 1M.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_040
**Scenario Title:** BVA — Dân số: 1.000.000 (biên bắt đầu M)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 1.000.000, hiển thị "1M".
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_041
**Scenario Title:** BVA — Dân số: 2.200.000 (M với thập phân)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi dân số = 2.200.000, hiển thị "2.2M" (1 chữ số thập phân vì không tròn).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_042
**Scenario Title:** Thẻ KPI — Vốn đầu tư format rút gọn $K/M/B
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh thẻ "Vốn đầu tư" hiển thị: icon dollar (đỏ), nhãn "Vốn đầu tư", ký hiệu $ đứng trước, giá trị rút gọn K/M/B.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_043
**Scenario Title:** BVA — Vốn đầu tư: $850 (dưới 1.000, không rút gọn)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi vốn đầu tư = 850 USD, hiển thị "$850".
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_044
**Scenario Title:** BVA — Vốn đầu tư: $1.500.000.000 (biên B)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh khi vốn đầu tư = 1.500.000.000 USD, hiển thị "$1.5B".
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_045
**Scenario Title:** Thẻ KPI — Diện tích format số nguyên + km²
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3, BR-11
**Test Type:** Functional
**Description:** Xác minh thẻ "Diện tích" hiển thị: icon pin map (đỏ), nhãn "Diện tích", giá trị số nguyên dùng dấu phẩy ngăn hàng nghìn + đơn vị km² (ví dụ: "3,536 km²"). Không rút gọn.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_046
**Scenario Title:** KPI — 4 thẻ cuộn ngang khi vượt chiều rộng màn hình
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-007, BR-12
**Test Type:** UI
**Description:** Xác minh 4 thẻ KPI hỗ trợ cuộn ngang (horizontal scroll) khi tổng chiều rộng vượt quá chiều rộng màn hình. Mỗi thẻ nền trắng, bo góc, có shadow nhẹ. Không tap được.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_047
**Scenario Title:** KPI — thẻ có giá trị NULL hiển thị "--"
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC4, BR-06
**Test Type:** Functional
**Description:** Xác minh khi dữ liệu của một thẻ KPI bị NULL từ API, thẻ đó vẫn hiển thị nhưng giá trị số là "--" (ví dụ: thẻ GRDP null → icon + nhãn "Tăng trưởng GRDP" + giá trị "--").
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_048
**Scenario Title:** KPI — tất cả 4 thẻ đều NULL
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC4, BR-06
**Test Type:** Functional
**Description:** Xác minh khi tất cả 4 thẻ KPI đều có dữ liệu NULL, cả 4 thẻ vẫn hiển thị với giá trị "--", layout cuộn ngang không bị vỡ.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_049
**Scenario Title:** Section Tổng quan đầu tư — hiển thị full text
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-008, AC1
**Test Type:** Functional
**Description:** Xác minh section "Tổng quan đầu tư" hiển thị: tiêu đề font đậm căn trái, nội dung plain text từ API (không bold/link/list), hiển thị toàn bộ full text không giới hạn số dòng.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_050
**Scenario Title:** Section Tổng quan đầu tư — empty state
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-008, AC4, BR-07
**Test Type:** Functional
**Description:** Xác minh khi API trả về null hoặc rỗng cho nội dung tổng quan, section vẫn hiển thị tiêu đề "Tổng quan đầu tư" + chuỗi "Không có dữ liệu".
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_051
**Scenario Title:** Section Lĩnh vực khuyến khích — hiển thị chip list
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-009, AC1
**Test Type:** Functional
**Description:** Xác minh section hiển thị: tiêu đề font đậm, danh sách lĩnh vực dạng chip/tag pill (viền vàng/cam nhạt, text vàng/cam đậm), dữ liệu động theo tỉnh, cuộn ngang nếu vượt chiều rộng. Không tap được.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_052
**Scenario Title:** Section Lĩnh vực khuyến khích — empty state
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-009, AC4, BR-07
**Test Type:** Functional
**Description:** Xác minh khi danh sách lĩnh vực từ API rỗng, section vẫn hiển thị tiêu đề + "Không có dữ liệu". Chip list không hiển thị.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_053
**Scenario Title:** Section Hạ tầng KCN — hiển thị danh sách card
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-010, AC1
**Test Type:** Functional
**Description:** Xác minh section hiển thị: tiêu đề font đậm, danh sách KCN dạng card dọc, mỗi card gồm — icon nhà máy (đỏ, trái), tên KCN (đậm), diện tích (số nguyên + ha), badge trạng thái. Dữ liệu động (API). Card nền trắng, bo góc, viền nhạt. Không tap được.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_054
**Scenario Title:** Badge trạng thái KCN — "Sẵn sàng" (xanh lá)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-010, BR-13, CMR-05
**Test Type:** UI
**Description:** Xác minh KCN có trạng thái "Sẵn sàng" hiển thị badge xanh lá + chấm tròn + text "Sẵn sàng".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_055
**Scenario Title:** Badge trạng thái KCN — "Đang quy hoạch" (vàng)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-010, BR-13, CMR-05
**Test Type:** UI
**Description:** Xác minh KCN có trạng thái "Đang quy hoạch" hiển thị badge vàng + chấm tròn + text "Đang quy hoạch".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_056
**Scenario Title:** Section Hạ tầng KCN — empty state
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-010, AC4, BR-07
**Test Type:** Functional
**Description:** Xác minh khi danh sách KCN từ API rỗng, section vẫn hiển thị tiêu đề "Hạ tầng KCN" + "Không có dữ liệu".
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_057
**Scenario Title:** Section Vị trí địa lý — hiển thị bản đồ + danh sách khoảng cách
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-011, AC1, AC2
**Test Type:** Functional
**Description:** Xác minh section hiển thị: tiêu đề font đậm, ảnh thumbnail bản đồ tỉnh full width chiều cao cố định, bên dưới là danh sách khoảng cách (icon pin xám + mô tả địa danh căn trái + km đỏ đậm căn phải). Khoảng cách = số nguyên + km (làm tròn).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_058
**Scenario Title:** Tap bản đồ tỉnh — mở ứng dụng bản đồ mặc định
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-012, AC2
**Test Type:** Integration
**Description:** Xác minh tap vào ảnh bản đồ → kích hoạt geo URI scheme với tọa độ trung tâm tỉnh → mở ứng dụng bản đồ mặc định trên thiết bị (Google Maps, Apple Maps, v.v.). Hệ thống không chỉ định cứng ứng dụng nào.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_059
**Scenario Title:** Tap bản đồ — test trên iOS (Apple Maps mặc định)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-012, AC2
**Test Type:** Integration
**Description:** Xác minh trên thiết bị iOS, tap bản đồ mở Apple Maps (hoặc ứng dụng bản đồ mặc định đã cấu hình) với đúng tọa độ tỉnh.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_060
**Scenario Title:** Tap bản đồ — test trên Android (Google Maps mặc định)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-012, AC2
**Test Type:** Integration
**Description:** Xác minh trên thiết bị Android, tap bản đồ mở Google Maps (hoặc ứng dụng bản đồ mặc định) với đúng tọa độ tỉnh.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_061
**Scenario Title:** Danh sách khoảng cách — empty state (ẩn danh sách, giữ bản đồ)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-011, BR-08
**Test Type:** Functional
**Description:** Xác minh khi API trả về 0 item khoảng cách, danh sách khoảng cách bị ẩn hoàn toàn, nhưng bản đồ tỉnh vẫn hiển thị bình thường.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_062
**Scenario Title:** Section Liên hệ đầu tư — hiển thị đầy đủ ĐT + Email
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-013, AC1
**Test Type:** Functional
**Description:** Xác minh section hiển thị: tiêu đề font đậm, thẻ nền cam/vàng đậm bo góc, 2 dòng: icon ĐT + "Điện thoại" + số (ví dụ: "(84-296) 3856 606") và icon email + "Email" + địa chỉ. Dữ liệu động theo tỉnh. Không tap được (text tĩnh).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_063
**Scenario Title:** Liên hệ đầu tư — số điện thoại NULL
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-013, AC4, BR-09
**Test Type:** Functional
**Description:** Xác minh khi API không trả về số điện thoại (null), thẻ liên hệ vẫn hiển thị nhãn "Điện thoại" nhưng giá trị là "--".
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_064
**Scenario Title:** Liên hệ đầu tư — email NULL
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-013, AC4, BR-09
**Test Type:** Functional
**Description:** Xác minh khi API không trả về email (null), thẻ liên hệ vẫn hiển thị nhãn "Email" nhưng giá trị là "--".
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_065
**Scenario Title:** Liên hệ đầu tư — cả ĐT và Email đều NULL
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-013, AC4, BR-09
**Test Type:** Functional
**Description:** Xác minh khi cả số điện thoại và email đều null, thẻ liên hệ hiển thị 2 nhãn + 2 giá trị "--". Thẻ vẫn hiển thị, không ẩn.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_066
**Scenario Title:** CTA card — hiển thị đúng tiêu đề động theo tên tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-UI-008
**Test Type:** UI
**Description:** Xác minh card CTA hiển thị: nền đỏ đậm bo góc, tiêu đề "Bạn quan tâm đến [TÊN TỈNH]?" (in hoa, trắng, đậm), mô tả "Nhận tư vấn đầu tư chi tiết từ chuyên gia" (trắng, nhỏ hơn). Ví dụ: "Bạn quan tâm đến AN GIANG?".
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_067
**Scenario Title:** Nút "Cổng thông tin đầu tư" — mở link web ngoài
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-014
**Test Type:** Integration
**Description:** Xác minh tap nút "Cổng thông tin đầu tư" → mở link web ngoài trên trình duyệt mặc định của thiết bị. URL lấy từ API theo mã tỉnh (ví dụ: Bắc Ninh → bacninh.gov.vn/tiem-nang-phat-trien).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_068
**Scenario Title:** Nút "Cổng thông tin đầu tư" — ẩn khi URL null
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-014, BR-10
**Test Type:** Functional
**Description:** Xác minh khi API trả về URL null hoặc trống cho Cổng thông tin đầu tư, nút này bị ẩn hoàn toàn. Chỉ còn nút "Đăng ký tư vấn ngay" trong card CTA.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_069
**Scenario Title:** Nút "Đăng ký tư vấn ngay" — [TBD]
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-015
**Test Type:** Functional
**Description:** Xác minh hành vi nút "Đăng ký tư vấn ngay" khi tap. Lưu ý: Luồng/màn hình đích hiện đang [TBD] — chờ thiết kế giao diện từ khách hàng (Q1 — Open). Scenario này sẽ cần cập nhật khi BA xác nhận.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_070
**Scenario Title:** Pull to Refresh trên chi tiết tỉnh — CMR-13
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-016, CMR-13
**Test Type:** Functional
**Description:** Xác minh kéo xuống trên màn hình chi tiết tỉnh → hiển thị spinner → gọi lại toàn bộ API chi tiết tỉnh → làm mới tất cả section → ẩn spinner.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC55_071
**Scenario Title:** Pull to Refresh chi tiết tỉnh thất bại — CMR-13, CMR-07
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-016, CMR-13, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi Pull to Refresh chi tiết tỉnh thất bại, hệ thống giữ nguyên dữ liệu cũ, hiển thị thông báo lỗi theo CMR-07.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_072
**Scenario Title:** Lỗi mạng khi tải chi tiết tỉnh — CMR-07
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-004, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi mất mạng trong lúc tải chi tiết tỉnh, hệ thống hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại". Giữ nguyên màn hình.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_073
**Scenario Title:** Lỗi API 500 khi tải chi tiết tỉnh — CMR-07
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-005, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi API chi tiết tỉnh trả về HTTP 500, hệ thống hiển thị "Hệ thống đang bận. Vui lòng thử lại sau."
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_074
**Scenario Title:** Lỗi HTTP 404 — tỉnh không tồn tại
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-006, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi API trả về HTTP 404 cho một tỉnh, hệ thống hiển thị "Nội dung không tồn tại hoặc đã bị xóa." → tự động quay lại danh sách tỉnh.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC55_075
**Scenario Title:** Timeout khi tải chi tiết tỉnh — CMR-07, CMR-16
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ERR-007, CMR-07, CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API chi tiết tỉnh không phản hồi trong 10 giây, hệ thống hiển thị thông báo timeout + nút "Thử lại" theo CMR-07/CMR-16.
**Test Focus:** Error/Exception

---

---

### LUỒNG END-TO-END

---

### Scenario ID: TS_UC55_076
**Scenario Title:** E2E — Xem danh sách → chọn tỉnh → xem chi tiết → quay lại
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-001 → UC55-FR-014
**Test Type:** End-to-End
**Description:** Xác minh luồng đầy đủ: Đăng nhập → Sidebar → "Khu vực đầu tư" → hiển thị 63 tỉnh A–Z → tap "Bắc Ninh" → skeleton loading → hiển thị chi tiết 8 sections → cuộn xem toàn bộ → tap bản đồ (mở Maps) → quay lại → tap "Cổng thông tin đầu tư" (mở browser) → tap Quay lại → trở về danh sách tỉnh.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_077
**Scenario Title:** E2E — Tìm kiếm tỉnh → chọn kết quả → xem chi tiết
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-003, UC55-FR-005
**Test Type:** End-to-End
**Description:** Xác minh luồng: Vào danh sách → nhập "Hà" vào ô tìm kiếm → danh sách lọc hiển thị "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh" → tap "Hà Nội" → hiển thị chi tiết đúng thông tin Hà Nội → quay lại → danh sách vẫn hiển thị kết quả lọc (nếu áp dụng State Persistence) hoặc đầy đủ 63 tỉnh.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC55_078
**Scenario Title:** E2E — Xem nhiều tỉnh liên tiếp
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-005, UC55-FR-006
**Test Type:** End-to-End
**Description:** Xác minh tester có thể xem chi tiết tỉnh A → quay lại → xem tỉnh B → quay lại → xem tỉnh C liên tiếp mà không gặp lỗi. Dữ liệu mỗi tỉnh hiển thị đúng, không lẫn dữ liệu tỉnh trước.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_079
**Scenario Title:** E2E — Xem tỉnh có đầy đủ data vs tỉnh có nhiều field NULL
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** AC1, AC4
**Test Type:** End-to-End
**Description:** Xác minh so sánh 2 tỉnh: 1 tỉnh có đầy đủ dữ liệu (KPI, KCN, liên hệ, v.v.) và 1 tỉnh có nhiều field NULL. Tỉnh đầy đủ hiển thị toàn bộ data. Tỉnh NULL hiển thị đúng empty state ("--", "Không có dữ liệu", ẩn nút/danh sách) mà không bị crash.
**Test Focus:** Error/Exception

---

---

### ACCEPTANCE CRITERIA VERIFICATION

---

### Scenario ID: TS_UC55_080
**Scenario Title:** AC1 — Dữ liệu hiển thị khớp 100% với API cho từng tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** AC1
**Test Type:** Acceptance
**Description:** Xác minh tất cả dữ liệu trên màn hình chi tiết (tổng quan, KPI, lĩnh vực, KCN, khoảng cách, liên hệ) khớp chính xác 100% với response API cho ít nhất 3 tỉnh khác nhau. Nội dung tổng quan hiển thị full text không bị cắt.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_081
**Scenario Title:** AC2 — Bản đồ mở đúng ứng dụng và tọa độ tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** AC2
**Test Type:** Acceptance
**Description:** Xác minh tap bản đồ mở ứng dụng bản đồ mặc định với tọa độ trung tâm đúng tỉnh đang xem, test trên ít nhất 2 tỉnh khác nhau + trên cả iOS và Android.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_082
**Scenario Title:** AC3 — Format số KPI đúng quy tắc
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** AC3
**Test Type:** Acceptance
**Description:** Xác minh format số trên 4 thẻ KPI đúng quy tắc: GRDP (1 thập phân + %), Dân số (rút gọn K/M/B, 1 thập phân), Vốn ($, rút gọn K/M/B, 1 thập phân), Diện tích (nguyên + dấu phẩy + km²). Test với ít nhất 3 tỉnh có giá trị khác nhau.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_083
**Scenario Title:** AC4 — Empty state hiển thị đúng cho tất cả section
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** AC4
**Test Type:** Acceptance
**Description:** Xác minh khi API không trả dữ liệu cho từng section: KPI → "--", Tổng quan → "Không có dữ liệu", Lĩnh vực → "Không có dữ liệu", KCN → "Không có dữ liệu", Khoảng cách → ẩn (bản đồ vẫn hiện), Liên hệ → "--", URL CTA → ẩn nút.
**Test Focus:** Error/Exception

---

---

### CMR COMPLIANCE

---

### Scenario ID: TS_UC55_084
**Scenario Title:** CMR-01 — Ô tìm kiếm có placeholder đúng
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** CMR-01
**Test Type:** UI
**Description:** Xác minh ô tìm kiếm hiển thị placeholder "Tìm kiếm tỉnh, thành phố..." theo CMR-01.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_085
**Scenario Title:** CMR-01 — Tìm kiếm không cần nhấn Enter
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** CMR-01
**Test Type:** Functional
**Description:** Xác minh người dùng nhập từ khóa vào ô tìm kiếm → kết quả hiển thị tự động (không cần nhấn Enter hay nút nào). Theo CMR-01: kết quả hiển thị trong lúc gõ, sau 3 giây không gõ thì áp dụng tìm kiếm.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC55_086
**Scenario Title:** CMR-05 — Badge KCN chỉ đọc, không tap được
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** CMR-05
**Test Type:** UI
**Description:** Xác minh badge trạng thái KCN ("Sẵn sàng", "Đang quy hoạch") là read-only, không cho phép tap theo CMR-05.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_087
**Scenario Title:** CMR-06 — Nút Quay lại có mặt trên cả 2 màn hình
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** CMR-06
**Test Type:** UI
**Description:** Xác minh cả màn hình danh sách tỉnh và chi tiết tỉnh đều có nút Quay lại (←) ở góc trái header, tiêu đề trang nằm giữa header.
**Test Focus:** UI State

---

### Scenario ID: TS_UC55_088
**Scenario Title:** CMR-14 — Phân biệt "Không có dữ liệu" vs "Không tìm thấy kết quả"
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** CMR-14
**Test Type:** Functional
**Description:** Xác minh: (1) Khi section từ API rỗng → hiển thị "Không có dữ liệu" (no data). (2) Khi tìm kiếm tỉnh không khớp → hiển thị "Không tìm thấy kết quả." (no result). Hai thông báo khác nhau theo đúng CMR-14.
**Test Focus:** Alternative flow

---

---

### EDGE CASES & BOUNDARY

---

### Scenario ID: TS_UC55_089
**Scenario Title:** KPI GRDP — giá trị = 0%
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, BR-11
**Test Type:** Functional
**Description:** Xác minh khi GRDP = 0, thẻ hiển thị "0.0%" (1 chữ số thập phân) hay "0%" hay "--". Lưu ý: UC chỉ nêu null → "--", giá trị 0 chưa được quy định rõ (Q2 liên quan).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_090
**Scenario Title:** KPI GRDP — giá trị âm (ví dụ: -2.5%)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, BR-11
**Test Type:** Functional
**Description:** Xác minh khi GRDP = -2.5 (tăng trưởng âm), thẻ hiển thị "-2.5%" hay xử lý khác. UC không quy định xử lý giá trị âm.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_091
**Scenario Title:** Diện tích KCN — giá trị rất lớn (ví dụ: 99.999 ha)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-010
**Test Type:** Functional
**Description:** Xác minh thẻ KCN hiển thị diện tích lớn đúng format số nguyên + ha (ví dụ: "Diện tích: 99999 ha"). Kiểm tra layout card không bị vỡ.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_092
**Scenario Title:** Danh sách KCN — nhiều item (ví dụ: 20+ KCN)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-010
**Test Type:** UI
**Description:** Xác minh khi tỉnh có nhiều KCN (20+), danh sách card cuộn dọc hiển thị tất cả, layout không bị vỡ, người dùng có thể cuộn để xem hết.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_093
**Scenario Title:** Diện tích tỉnh — giá trị nhỏ (ví dụ: 29 km²)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3
**Test Type:** Functional
**Description:** Xác minh khi diện tích = 29, hiển thị "29 km²" (số nguyên, không có dấu phẩy ngăn nghìn vì dưới 1.000).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_094
**Scenario Title:** Diện tích tỉnh — giá trị lớn (ví dụ: 16,013 km²)
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-007, AC3
**Test Type:** Functional
**Description:** Xác minh khi diện tích = 16013, hiển thị "16,013 km²" (dấu phẩy ngăn cách hàng nghìn).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_095
**Scenario Title:** Nội dung tổng quan rất dài — hiển thị full text
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-008
**Test Type:** UI
**Description:** Xác minh khi nội dung tổng quan rất dài (ví dụ: 2000+ ký tự), hệ thống hiển thị toàn bộ full text không cắt, không "Xem thêm", người dùng cuộn để đọc hết.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_096
**Scenario Title:** Nhiều chip lĩnh vực — cuộn ngang
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-009
**Test Type:** UI
**Description:** Xác minh khi tỉnh có nhiều lĩnh vực khuyến khích (ví dụ: 10+ chip), các chip hiển thị trên 1 hàng, cuộn ngang khi vượt chiều rộng màn hình.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_097
**Scenario Title:** Chỉ 1 lĩnh vực khuyến khích — 1 chip duy nhất
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-009
**Test Type:** UI
**Description:** Xác minh khi tỉnh chỉ có 1 lĩnh vực khuyến khích, hiển thị đúng 1 chip. Layout không bị vỡ, không có khoảng trống thừa.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_098
**Scenario Title:** Danh sách khoảng cách — nhiều item
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-011
**Test Type:** UI
**Description:** Xác minh khi API trả về nhiều item khoảng cách (ví dụ: 10+), tất cả hiển thị đầy đủ bằng cuộn dọc. Không có giới hạn hiển thị.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC55_099
**Scenario Title:** Khoảng cách làm tròn đến km gần nhất
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-011
**Test Type:** Functional
**Description:** Xác minh khoảng cách hiển thị dưới dạng số nguyên + km (ví dụ: "100 km", "60 km"), không có chữ số thập phân. API trả về 99.7 → hiển thị "100 km".
**Test Focus:** Boundary

---

---

### INTEGRATION

---

### Scenario ID: TS_UC55_100
**Scenario Title:** Integration — UC256 (Đăng nhập) là precondition cho UC55
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-PRE-001
**Test Type:** Integration
**Description:** Xác minh người dùng chưa đăng nhập không thể truy cập chức năng "Khu vực đầu tư" qua Sidebar. Cần thực hiện đăng nhập (UC256) trước.
**Test Focus:** Permission/Role

---

### Scenario ID: TS_UC55_101
**Scenario Title:** Cá nhân và Tổ chức có cùng hành vi khi xem chuyên trang
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-ROLE-001
**Test Type:** Functional
**Description:** Xác minh cả 2 loại đối tượng (Cá nhân và Tổ chức) đều truy cập được UC55 và có cùng hành vi — không có sự phân biệt giao diện hay chức năng.
**Test Focus:** Permission/Role

---

### Scenario ID: TS_UC55_102
**Scenario Title:** Nút "Cổng thông tin đầu tư" — URL khác nhau theo từng tỉnh
**UC Reference:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư
**Req-ID:** UC55-FR-014
**Test Type:** Integration
**Description:** Xác minh URL Cổng thông tin đầu tư là động theo mã tỉnh, không hard-code. Test với 2+ tỉnh khác nhau: mỗi tỉnh mở đúng website riêng (ví dụ: Bắc Ninh → bacninh.gov.vn, An Giang → angiang.gov.vn).
**Test Focus:** Happy path

---

---

## ⚠️ Out-of-Scope Flags

| Scenario Area | Reason | Recommended Action |
|--------------|--------|--------------------|
| Thời gian phản hồi API < 2 giây cho danh sách tỉnh và chi tiết | NFR: PERFORMANCE | Defer to performance testing specialist |
| Load test với nhiều người dùng đồng thời truy cập chuyên trang | NFR: LOAD | Defer to load testing specialist |
| Kiểm tra bảo mật API endpoint (SQL injection, XSS, token bypass) | NFR: SECURITY | Defer to security testing specialist |
| Kiểm tra accessibility (screen reader, color contrast, font scaling) | NFR: ACCESSIBILITY | Defer to accessibility testing specialist |

---

## ⚠️ Blocked Scenarios (chờ BA giải quyết)

| Scenario ID | Blocked By | Question Backlog Ref | Notes |
|-------------|------------|----------------------|-------|
| TS_UC55_069 | Nút "Đăng ký tư vấn ngay" [TBD] | Q1 | Chờ xác định luồng/màn hình đích |
| TS_UC55_017 | Debounce 3s vs real-time | Q3 | CMR-01 vs UC55 mâu thuẫn |
| TS_UC55_089 | KPI value = 0 | Q2 | UC không phân biệt 0 vs null |
