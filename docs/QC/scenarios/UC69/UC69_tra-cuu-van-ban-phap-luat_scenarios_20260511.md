# Test Scenarios — UC69: Tra cứu văn bản pháp luật trên Mobile

**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Scenario Design Agent  
**Phiên bản:** v1  
**UC Reference:** UC69 — Tra cứu văn bản pháp luật trên Mobile  
**Source:** UC69_tra-cuu-van-ban-phap-luat_audited_20260511_v2.md (Score: 95.5/100 — READY)

---

## UC69 — Tra cứu văn bản pháp luật

### FUNCTION 1: XEM DANH SÁCH VĂN BẢN PHÁP LUẬT

---

### Scenario ID: TS_UC69_001
**Scenario Title:** Hiển thị danh sách văn bản mặc định khi truy cập lần đầu
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC10, Section 3.1 Step 2
**Test Type:** Functional
**Description:** Xác minh khi người dùng đã đăng nhập truy cập UC69, hệ thống hiển thị full-screen loading (CMR-07 v1.1) rồi hiển thị danh sách văn bản sắp xếp theo ngày ban hành mới nhất, phạm vi mặc định "Số hiệu, Trích yếu".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_002
**Scenario Title:** Full-screen loading hiển thị khi first-load danh sách
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC16 (implicit), CMR-07 v1.1
**Test Type:** UI
**Description:** Xác minh khi lần đầu tải danh sách, hệ thống hiển thị full-screen loading overlay. Các lần tải tiếp theo (lazy load, refresh) chỉ hiển thị spinner cục bộ.
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_003
**Scenario Title:** Hiển thị đúng thông tin trên mỗi Card văn bản
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1, #7-#12
**Test Type:** UI
**Description:** Xác minh mỗi Card hiển thị đầy đủ: Tag Loại văn bản (góc trái trên), Tag Trạng thái (góc phải trên), Tên văn bản (tối đa 2 dòng + "..."), Ngày ban hành (DD/MM/YYYY), Ngày hiệu lực (DD/MM/YYYY), Cơ quan ban hành (góc trái dưới), Nút "Xem chi tiết →" (góc phải dưới).
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_004
**Scenario Title:** Lazy load tải thêm 20 bản ghi khi cuộn xuống
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #6, CMR-04
**Test Type:** Functional
**Description:** Xác minh khi cuộn xuống cuối danh sách, hệ thống tự động tải thêm 20 bản ghi tiếp theo với spinner cục bộ (không full-screen loading). Danh sách nối tiếp liền mạch.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_005
**Scenario Title:** Pull to Refresh tải lại danh sách
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #6, CMR-13
**Test Type:** Functional
**Description:** Xác minh khi kéo xuống (pull to refresh), hệ thống tải lại danh sách từ đầu, giữ nguyên điều kiện tìm kiếm/lọc hiện tại.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_006
**Scenario Title:** Hiển thị "-" khi giá trị trường là null
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #9-#11
**Test Type:** UI
**Description:** Xác minh khi API trả về null cho Tên văn bản, Ngày ban hành, Ngày hiệu lực, hoặc Cơ quan ban hành → hiển thị "-" thay vì để trống hoặc crash.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_007
**Scenario Title:** Tên văn bản quá dài hiển thị tối đa 2 dòng + "..."
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #9
**Test Type:** UI
**Description:** Xác minh khi tên văn bản vượt quá 2 dòng hiển thị, hệ thống truncate và hiển thị "..." ở cuối dòng thứ 2.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_008
**Scenario Title:** Badge trạng thái hiển thị đúng màu và read-only
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #8, CMR-05
**Test Type:** UI
**Description:** Xác minh badge trạng thái hiển thị đúng cho 5 giá trị (Đang hiệu lực, Chưa hiệu lực, Không xác định hiệu lực, Hết hiệu lực, Hết hiệu lực một phần). Badge luôn read-only, không cho phép tap.
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_009
**Scenario Title:** Empty state khi không có dữ liệu văn bản
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #6, CMR-14
**Test Type:** UI
**Description:** Xác minh khi API trả về danh sách rỗng (không có văn bản nào), hệ thống hiển thị empty state "Không tìm thấy kết quả." theo CMR-14, ẩn danh sách kết quả.
**Test Focus:** Error/Exception

---

### FUNCTION 2: TÌM KIẾM VĂN BẢN

---

### Scenario ID: TS_UC69_010
**Scenario Title:** Tìm kiếm theo tên văn bản với phạm vi "Số hiệu, Trích yếu" (mặc định)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, Section 3.1 Step 3
**Test Type:** Functional
**Description:** Xác minh khi nhập từ khóa vào ô tìm kiếm với radio "Số hiệu, Trích yếu" đang chọn, sau debounce 3 giây hệ thống trả về kết quả lọc theo tên văn bản kết hợp phạm vi số hiệu và trích yếu.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_011
**Scenario Title:** Tìm kiếm theo phạm vi "Toàn văn"
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, AC11, Section 3.1 Step 4
**Test Type:** Functional
**Description:** Xác minh khi chọn radio "Toàn văn" và nhập từ khóa, hệ thống tìm kiếm trong nội dung toàn văn và hiển thị thêm khối nội dung toàn văn bên trong mỗi Card kết quả.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_012
**Scenario Title:** Debounce tìm kiếm 3 giây hoạt động đúng
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC8, CMR-01
**Test Type:** Functional
**Description:** Xác minh hệ thống chỉ gọi API tìm kiếm sau 3 giây người dùng ngừng gõ. Nếu người dùng tiếp tục gõ trong khoảng 3 giây, timer reset lại.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_013
**Scenario Title:** Tìm kiếm gần đúng (fuzzy search)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, CMR-01
**Test Type:** Functional
**Description:** Xác minh hệ thống hỗ trợ tìm kiếm gần đúng — kết quả chứa từ khóa (không yêu cầu khớp chính xác toàn bộ).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_014
**Scenario Title:** Giới hạn 500 ký tự cho ô tìm kiếm (BVA — tại giới hạn)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-CMR-01, Section 2.1 #3
**Test Type:** Functional
**Description:** Xác minh khi nhập đúng 500 ký tự vào ô tìm kiếm, hệ thống chấp nhận và thực hiện tìm kiếm bình thường.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_015
**Scenario Title:** Giới hạn 500 ký tự cho ô tìm kiếm (BVA — vượt giới hạn)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-CMR-01, Section 2.1 #3
**Test Type:** Functional
**Description:** Xác minh khi nhập 501 ký tự vào ô tìm kiếm, hệ thống không cho phép nhập thêm (chặn tại 500 ký tự).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_016
**Scenario Title:** Xóa hết từ khóa tìm kiếm → hiển thị danh sách mặc định
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #3
**Test Type:** Functional
**Description:** Xác minh khi xóa hết text trong ô tìm kiếm, hệ thống hiển thị lại danh sách mặc định (sắp xếp theo ngày ban hành mới nhất).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_017
**Scenario Title:** Chuyển radio từ "Số hiệu, Trích yếu" sang "Toàn văn"
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC11, Section 2.1 #5
**Test Type:** Functional
**Description:** Xác minh khi chuyển radio: danh sách reset về trang đầu, keyword tìm kiếm giữ nguyên, bộ lọc giữ nguyên. Hiển thị thêm khối nội dung toàn văn trong Card.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_018
**Scenario Title:** Chuyển radio từ "Toàn văn" về "Số hiệu, Trích yếu"
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC11, Section 2.1 #5
**Test Type:** Functional
**Description:** Xác minh khi chuyển radio ngược lại: danh sách reset về trang đầu, keyword giữ nguyên, bộ lọc giữ nguyên. Khối nội dung toàn văn ẩn đi.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_019
**Scenario Title:** Không tìm thấy kết quả tìm kiếm
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.4, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi từ khóa tìm kiếm không khớp bất kỳ văn bản nào, hệ thống hiển thị "Không tìm thấy kết quả." theo CMR-14.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_020
**Scenario Title:** Tìm kiếm kết hợp bộ lọc
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, AC2, Section 3.1 Step 6
**Test Type:** Functional
**Description:** Xác minh khi có cả từ khóa tìm kiếm và bộ lọc active, hệ thống kết hợp cả 2 điều kiện để trả về kết quả (AND logic).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_021
**Scenario Title:** Toàn văn hiển thị "Không có dữ liệu." khi văn bản không có nội dung toàn văn
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #13, CMR-14
**Test Type:** UI
**Description:** Xác minh khi chọn radio "Toàn văn" nhưng văn bản không có nội dung toàn văn, khối toàn văn trong Card hiển thị "Không có dữ liệu." theo CMR-14.
**Test Focus:** Error/Exception

---

### FUNCTION 3: BỘ LỌC TÌM KIẾM (BOTTOM SHEET)

---

### Scenario ID: TS_UC69_022
**Scenario Title:** Mở Bottom Sheet bộ lọc
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.1 #4
**Test Type:** Functional
**Description:** Xác minh tap icon filter → mở Bottom Sheet bộ lọc với 6 trường (Cơ quan ban hành, Khoảng ngày ban hành, Loại văn bản, Lĩnh vực, Đơn vị soạn thảo, Trạng thái) ở giá trị mặc định.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_023
**Scenario Title:** Áp dụng bộ lọc với 1 trường Dropdown
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2 #4-7
**Test Type:** Functional
**Description:** Xác minh khi chọn 1 giá trị trong dropdown (VD: Loại văn bản = "Thông tư") và tap "Áp dụng", Bottom Sheet đóng lại và danh sách cập nhật theo điều kiện lọc.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_024
**Scenario Title:** Áp dụng bộ lọc với nhiều trường kết hợp (Decision Table)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2
**Test Type:** Functional
**Description:** Xác minh khi chọn nhiều trường lọc đồng thời (VD: Loại văn bản + Lĩnh vực + Trạng thái) và tap "Áp dụng", hệ thống kết hợp tất cả điều kiện (AND logic) để trả về kết quả.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_025
**Scenario Title:** Searchable Dropdown — tìm kiếm option trong dropdown
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC15 (implicit), CMR-03
**Test Type:** Functional
**Description:** Xác minh khi tap dropdown (Loại VB, Lĩnh vực, Đơn vị soạn thảo) → mở danh sách + ô search. Nhập text → lọc option theo từ khóa (gần đúng). Sắp xếp A-Z / 0-9.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_026
**Scenario Title:** Searchable Dropdown — chọn option và highlight
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC15 (implicit), CMR-03
**Test Type:** UI
**Description:** Xác minh khi tap 1 option → đóng dropdown, hiển thị giá trị đã chọn. Khi mở lại dropdown, option đã chọn được highlight/bold.
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_027
**Scenario Title:** Searchable Dropdown — text option dài truncate + tap giữ xem toàn bộ
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC15 (implicit), CMR-03
**Test Type:** UI
**Description:** Xác minh khi text option quá dài → truncate + "...". Tap giữ (long press) để xem toàn bộ nội dung option.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_028
**Scenario Title:** Trường "Cơ quan ban hành" — nhập text tìm kiếm gần đúng
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2 #2, CMR-01
**Test Type:** Functional
**Description:** Xác minh trường Cơ quan ban hành (Textbox) cho phép nhập text, khi "Áp dụng" hệ thống tìm kiếm gần đúng theo giá trị đã nhập.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_029
**Scenario Title:** Trường "Cơ quan ban hành" — giới hạn 500 ký tự (BVA — tại giới hạn)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.2 #2, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập đúng 500 ký tự vào trường "Cơ quan ban hành", hệ thống chấp nhận bình thường.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_030
**Scenario Title:** Trường "Cơ quan ban hành" — vượt 500 ký tự (BVA — vượt giới hạn)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.2 #2, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập 501 ký tự vào trường "Cơ quan ban hành", hệ thống không cho phép nhập thêm (chặn tại 500 ký tự).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_031
**Scenario Title:** Date Range — chọn cả ngày bắt đầu và ngày kết thúc
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC17 (implicit), CMR-15
**Test Type:** Functional
**Description:** Xác minh khi chọn cả ngày bắt đầu và ngày kết thúc, hệ thống lọc văn bản có ngày ban hành nằm trong khoảng đã chọn.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_032
**Scenario Title:** Date Range — chỉ chọn ngày bắt đầu (kết thúc = vô hạn)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC17 (implicit), CMR-15
**Test Type:** Functional
**Description:** Xác minh khi chỉ chọn ngày bắt đầu mà không chọn ngày kết thúc, hệ thống lọc từ ngày bắt đầu đến hiện tại (kết thúc = vô hạn).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_033
**Scenario Title:** Date Range — chỉ chọn ngày kết thúc (bắt đầu = không giới hạn)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC17 (implicit), CMR-15
**Test Type:** Functional
**Description:** Xác minh khi chỉ chọn ngày kết thúc mà không chọn ngày bắt đầu, hệ thống lọc từ đầu đến ngày kết thúc (bắt đầu = không giới hạn).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_034
**Scenario Title:** Date Range — ngày kết thúc chỉ cho phép từ ngày bắt đầu trở về sau
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC17 (implicit), CMR-15
**Test Type:** Functional
**Description:** Xác minh khi đã chọn ngày bắt đầu, Date Picker ngày kết thúc chỉ cho phép chọn từ ngày bắt đầu trở về sau (các ngày trước bị disable).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_035
**Scenario Title:** Date Range — cho phép chọn ngày tương lai
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC17 (implicit), CMR-15, Q11
**Test Type:** Functional
**Description:** Xác minh Date Picker cho phép chọn ngày tương lai (vì có status "Chưa hiệu lực" — văn bản chưa tới ngày ban hành). Không giới hạn ngày tối đa.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_036
**Scenario Title:** Active Filter Indicator — hiển thị khi có filter active
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC14 (implicit), CMR-02
**Test Type:** UI
**Description:** Xác minh khi có ít nhất 1 field trong bộ lọc có giá trị khác mặc định và đã "Áp dụng", icon indicator màu xanh lá cây xuất hiện ở góc phải trên icon filter.
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_037
**Scenario Title:** Active Filter Indicator — ẩn khi reset bộ lọc
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC14 (implicit), CMR-02
**Test Type:** UI
**Description:** Xác minh khi tap "Nhập lại" (reset) hoặc xóa thủ công tất cả field về mặc định rồi "Áp dụng", icon indicator biến mất.
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_038
**Scenario Title:** Nút "Nhập lại" reset tất cả field về mặc định
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2 #8
**Test Type:** Functional
**Description:** Xác minh tap "Nhập lại" → tất cả field reset về giá trị mặc định ("Tất cả [tên trường]", trống), Bottom Sheet giữ nguyên mở.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_039
**Scenario Title:** Đóng Bottom Sheet không áp dụng bộ lọc — tap ngoài
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2 #1
**Test Type:** Functional
**Description:** Xác minh tap ra ngoài vùng Bottom Sheet → đóng Bottom Sheet, không áp dụng bộ lọc, danh sách giữ nguyên trạng thái trước đó.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_040
**Scenario Title:** Đóng Bottom Sheet không áp dụng bộ lọc — tap nút Đóng (X)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2 #1
**Test Type:** Functional
**Description:** Xác minh tap nút Đóng (X) → đóng Bottom Sheet, không áp dụng bộ lọc.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_041
**Scenario Title:** Đóng Bottom Sheet không áp dụng bộ lọc — nút Back vật lý Android
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2 #1
**Test Type:** Functional
**Description:** Xác minh nhấn nút Back vật lý (Android) khi Bottom Sheet đang mở → đóng Bottom Sheet (không thoát màn hình danh sách), không áp dụng bộ lọc.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_042
**Scenario Title:** Dropdown Trạng thái — list tĩnh 5 giá trị (EP)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.2 #7
**Test Type:** Functional
**Description:** Xác minh dropdown Trạng thái hiển thị list tĩnh gồm 5 giá trị: Đang hiệu lực, Chưa hiệu lực, Không xác định hiệu lực, Hết hiệu lực, Hết hiệu lực một phần. Lọc theo từng trạng thái trả về kết quả đúng.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_043
**Scenario Title:** Bộ lọc kết hợp tìm kiếm + radio "Toàn văn" (Decision Table)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, AC2, AC11
**Test Type:** End-to-End
**Description:** Xác minh khi có keyword tìm kiếm + radio "Toàn văn" + bộ lọc active (VD: Lĩnh vực + Trạng thái), hệ thống kết hợp tất cả điều kiện trả về kết quả chính xác.
**Test Focus:** Happy path

---

### FUNCTION 4: XEM CHI TIẾT VĂN BẢN

---

### Scenario ID: TS_UC69_044
**Scenario Title:** Mở chi tiết văn bản từ danh sách — tap nút "Xem chi tiết →"
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #12, Section 3.2 Step 1
**Test Type:** Functional
**Description:** Xác minh tap nút "Xem chi tiết →" trên Card → chuyển đến màn hình Chi tiết văn bản. Hệ thống hiển thị Skeleton loading trong lúc chờ API.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_045
**Scenario Title:** Mở chi tiết văn bản — tap toàn bộ Card
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #12
**Test Type:** Functional
**Description:** Xác minh tap vào bất kỳ vị trí nào trên Card (không chỉ nút) → cũng chuyển đến màn hình Chi tiết văn bản.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_046
**Scenario Title:** Skeleton loading hiển thị khi tải chi tiết
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.2 Step 3
**Test Type:** UI
**Description:** Xác minh trong lúc chờ API chi tiết phản hồi, hệ thống hiển thị Skeleton loading (placeholder animation) cho các block thông tin.
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_047
**Scenario Title:** Hiển thị đầy đủ thông tin chi tiết văn bản
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC3, Section 2.3 #2-#3
**Test Type:** Functional
**Description:** Xác minh màn hình chi tiết hiển thị đầy đủ: Tên văn bản, Số ký hiệu, Loại văn bản, Ngày ban hành (DD/MM/YYYY), Ngày có hiệu lực (DD/MM/YYYY), Tình trạng hiệu lực (badge), Cơ quan ban hành, Người ký, Đơn vị soạn thảo, Lĩnh vực, Hiệu lực không gian.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_048
**Scenario Title:** Chi tiết — tất cả trường null hiển thị "-"
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC3, Section 2.3 #3
**Test Type:** UI
**Description:** Xác minh khi bất kỳ trường nào trong chi tiết có giá trị null, hệ thống hiển thị "-" thay vì để trống.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_049
**Scenario Title:** Số ký hiệu quá dài — wrap xuống dòng
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 5 (Q6)
**Test Type:** UI
**Description:** Xác minh khi giá trị "Số ký hiệu" quá dài, hệ thống wrap xuống dòng (không truncate, không overflow).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_050
**Scenario Title:** Nút "Tải văn bản" — tải DOC/DOCX thành công
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC4, Section 2.3 #4, CMR-08
**Test Type:** Functional
**Description:** Xác minh tap "Tải văn bản" → tải file DOC/DOCX về máy → hiển thị Toast "Tải văn bản thành công."
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_051
**Scenario Title:** Nút "Tải văn bản" — ẩn khi không có file đính kèm
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC4, Section 2.3 #4
**Test Type:** UI
**Description:** Xác minh khi văn bản không có file DOC/DOCX đính kèm, nút "Tải văn bản" ẩn hoàn toàn (không hiển thị).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_052
**Scenario Title:** Nút "Xem PDF" — mở PDF trên trình duyệt thiết bị
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC4, Section 2.3 #5, CMR-08
**Test Type:** Functional
**Description:** Xác minh tap "Xem PDF" → mở file PDF trực tiếp trên trình duyệt thiết bị.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_053
**Scenario Title:** Nút "Xem PDF" — ẩn khi không có file PDF
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC4, Section 2.3 #5
**Test Type:** UI
**Description:** Xác minh khi văn bản không có file PDF đính kèm, nút "Xem PDF" ẩn hoàn toàn.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_054
**Scenario Title:** Tải văn bản — file lỗi/mất trên server
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.4
**Test Type:** Functional
**Description:** Xác minh khi tap "Tải văn bản" hoặc "Xem PDF" mà file trên server không còn/lỗi, hệ thống hiển thị Toast "Nội dung không tồn tại hoặc đã bị xóa."
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_055
**Scenario Title:** Mục lục — mặc định collapse
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC7, Section 2.3 #6
**Test Type:** UI
**Description:** Xác minh khi mở chi tiết, section Mục lục mặc định ở trạng thái Collapse (đóng).
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_056
**Scenario Title:** Mục lục — tap expand và tap mục lục scroll đến đoạn tương ứng
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC7, Section 2.3 #6
**Test Type:** Functional
**Description:** Xác minh tap tiêu đề Mục lục → expand danh sách. Tap 1 mục lục → màn hình auto scroll đến đoạn text tương ứng trong Nội dung toàn văn, đồng thời collapse mục lục lại.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_057
**Scenario Title:** Mục lục — ẩn khi văn bản không có mục lục
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC7, Section 2.3 #6
**Test Type:** UI
**Description:** Xác minh khi văn bản không có mục lục, toàn bộ section Mục lục ẩn hoàn toàn (không hiển thị).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_058
**Scenario Title:** Nội dung toàn văn — scroll trong block không giới hạn chiều cao
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC6, Section 2.3 #7
**Test Type:** UI
**Description:** Xác minh nội dung toàn văn hiển thị trong scrollable block, không giới hạn chiều cao cố định, người dùng có thể scroll xem toàn bộ.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_059
**Scenario Title:** Nội dung toàn văn — ẩn khi không có data và không có mục lục
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC6, Section 2.3 #7, CMR-14
**Test Type:** UI
**Description:** Xác minh khi văn bản không có nội dung toàn văn VÀ không có mục lục → ẩn cả 2 section, hiển thị "Không có dữ liệu." theo CMR-14.
**Test Focus:** Error/Exception

---

### FUNCTION 5: VĂN BẢN LIÊN QUAN & DEEP NAVIGATION

---

### Scenario ID: TS_UC69_060
**Scenario Title:** Văn bản liên quan — hiển thị danh sách
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC5, Section 2.3 Khung VB liên quan
**Test Type:** Functional
**Description:** Xác minh khối "Văn bản liên quan" luôn hiển thị. Mỗi item gồm: Dòng 1 — Số hiệu văn bản (màu xanh dương, có thể tap), Dòng 2 — Mô tả văn bản (màu xám, tối đa 2 dòng).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_061
**Scenario Title:** Văn bản liên quan — danh sách rỗng hiển thị "Không có dữ liệu."
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC5, CMR-14
**Test Type:** UI
**Description:** Xác minh khi danh sách văn bản liên quan rỗng, hiển thị "Không có dữ liệu." theo CMR-14. Khối "Văn bản liên quan" KHÔNG ẩn (vẫn hiển thị tiêu đề).
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_062
**Scenario Title:** Văn bản liên quan — tap navigate đến chi tiết văn bản liên quan
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC5, AC18 (implicit)
**Test Type:** Functional
**Description:** Xác minh tap vào item văn bản liên quan → chuyển đến màn hình Chi tiết của văn bản đó.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_063
**Scenario Title:** Văn bản liên quan — Back quay về chi tiết gốc (không về danh sách)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC5, Section 2.3 Khung VB liên quan #2
**Test Type:** Functional
**Description:** Xác minh từ chi tiết văn bản liên quan nhấn Back → quay về màn Chi tiết văn bản gốc (không quay về danh sách).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_064
**Scenario Title:** Deep navigation — đi sâu vô hạn qua văn bản liên quan
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC18 (implicit), Q10
**Test Type:** End-to-End
**Description:** Xác minh cho phép navigation sâu vô hạn: VB liên quan → Chi tiết → VB liên quan → Chi tiết → ... (ít nhất 3-4 cấp). Không giới hạn depth.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_065
**Scenario Title:** Deep navigation — Back navigation đúng stack
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC18 (implicit), Q10
**Test Type:** End-to-End
**Description:** Xác minh sau khi đi sâu nhiều cấp, nhấn Back liên tục → quay về đúng thứ tự ngược lại trong navigation stack (LIFO).
**Test Focus:** Happy path

---

### FUNCTION 6: STATE PERSISTENCE & NAVIGATION

---

### Scenario ID: TS_UC69_066
**Scenario Title:** State Persistence — quay lại danh sách giữ nguyên trạng thái
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC9, CMR-01
**Test Type:** Functional
**Description:** Xác minh sau khi vào chi tiết và quay lại, danh sách giữ nguyên: keyword tìm kiếm, bộ lọc đã áp dụng, vị trí scroll, radio đang chọn.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_067
**Scenario Title:** Debounce rapid tap — chỉ navigate 1 lần
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC13, CMR-18
**Test Type:** Functional
**Description:** Xác minh khi tap nhanh liên tiếp vào "Xem chi tiết" hoặc Card, hệ thống chỉ navigate 1 lần (debounce action đầu tiên, chờ thực hiện xong trước khi nhận action tiếp).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_068
**Scenario Title:** Nút Quay lại (←) trên Header — quay về màn hình trước
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 2.1 #1, CMR-06
**Test Type:** Functional
**Description:** Xác minh tap nút Quay lại (←) trên header "Văn bản pháp luật" → quay về màn hình trước (Trang chủ hoặc Sidebar).
**Test Focus:** Happy path

---

### FUNCTION 7: XỬ LÝ LỖI & EXCEPTION

---

### Scenario ID: TS_UC69_069
**Scenario Title:** Lỗi kết nối mạng — hiển thị thông báo và nút "Thử lại"
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.4, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi mất kết nối mạng, hệ thống hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." với nút "Thử lại". Giữ nguyên màn hình hiện tại.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_070
**Scenario Title:** Partial API failure — 1 block lỗi, các block khác bình thường
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC12, Section 3.2 Step 4
**Test Type:** Functional
**Description:** Xác minh khi 1 API call thất bại (VD: API văn bản liên quan lỗi) nhưng API khác thành công → block lỗi hiển thị thông báo lỗi riêng (CMR-07), các block khác hiển thị bình thường.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_071
**Scenario Title:** Timeout API — xử lý theo CMR-16 (10 giây)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API không phản hồi trong 10 giây, hệ thống hiển thị thông báo lỗi timeout theo CMR-07.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_072
**Scenario Title:** Session expire — redirect về màn đăng nhập
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.3, CMR-07 (401)
**Test Type:** Functional
**Description:** Xác minh khi phiên đăng nhập hết hạn (401), hệ thống redirect về màn đăng nhập.
**Test Focus:** Error/Exception

---

### FUNCTION 8: ĐA NGÔN NGỮ (i18n)

---

### Scenario ID: TS_UC69_073
**Scenario Title:** Đa ngôn ngữ — text cứng thay đổi theo ngôn ngữ đã chọn
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC19 (implicit), CMR-17
**Test Type:** Functional
**Description:** Xác minh tất cả text cứng (header, placeholder, button text, empty state message, toast) thay đổi theo ngôn ngữ đã chọn trong app.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_074
**Scenario Title:** Đa ngôn ngữ — nội dung từ API giữ nguyên
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC19 (implicit), CMR-17
**Test Type:** Functional
**Description:** Xác minh nội dung từ API (tên văn bản, số hiệu, cơ quan ban hành, nội dung toàn văn...) KHÔNG thay đổi khi đổi ngôn ngữ.
**Test Focus:** Happy path

---

### FUNCTION 9: SESSION HANDLING

---

### Scenario ID: TS_UC69_075
**Scenario Title:** Force close app — mở lại giữ session, quay về Trang chủ
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.3
**Test Type:** Functional
**Description:** Xác minh khi force close app rồi mở lại, hệ thống quay về Trang chủ, giữ nguyên session đăng nhập (không yêu cầu đăng nhập lại).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC69_076
**Scenario Title:** Xóa app và cài lại — yêu cầu đăng nhập lại
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 3.3
**Test Type:** Functional
**Description:** Xác minh khi xóa app (uninstall) và cài đặt lại, hệ thống yêu cầu đăng nhập lại từ đầu (không restore session).
**Test Focus:** Alternative flow

---

### FUNCTION 10: ORIENTATION & PLATFORM-SPECIFIC

---

### Scenario ID: TS_UC69_077
**Scenario Title:** Portrait only — không hỗ trợ landscape
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Q12, Section 9
**Test Type:** UI
**Description:** Xác minh app chỉ hoạt động ở chế độ Portrait. Khi xoay ngang thiết bị, màn hình không xoay theo (hoặc bị khóa Portrait).
**Test Focus:** UI State

---

### INTEGRATION & END-TO-END SCENARIOS

---

### Scenario ID: TS_UC69_078
**Scenario Title:** E2E — Luồng hoàn chỉnh: Danh sách → Tìm kiếm → Lọc → Chi tiết → Tải → VB liên quan
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1 đến AC13
**Test Type:** End-to-End
**Description:** Xác minh luồng hoàn chỉnh: Truy cập UC69 → Nhập keyword tìm kiếm → Mở bộ lọc (searchable dropdown) → Áp dụng → Xem chi tiết → Tải văn bản → Xem PDF → Tap VB liên quan → Deep navigate → Back về chi tiết gốc → Back về danh sách (state preserved).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_079
**Scenario Title:** Integration — Truy cập UC69 từ Quick Access Trang chủ
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 1 (Truy cập chức năng)
**Test Type:** Integration
**Description:** Xác minh truy cập UC69 từ Trang chủ → Quick Access "Văn bản pháp luật" → hiển thị đúng màn hình danh sách.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_080
**Scenario Title:** Integration — Truy cập UC69 từ Sidebar Navigation
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-Section 1 (Truy cập chức năng)
**Test Type:** Integration
**Description:** Xác minh truy cập UC69 từ Sidebar → "Văn bản pháp luật" → hiển thị đúng màn hình danh sách.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC69_081
**Scenario Title:** Bộ lọc — kết hợp tất cả 6 trường cùng lúc (Decision Table — max combination)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, Section 2.2
**Test Type:** Functional
**Description:** Xác minh khi điền/chọn tất cả 6 trường bộ lọc (Cơ quan ban hành + Khoảng ngày + Loại VB + Lĩnh vực + Đơn vị soạn thảo + Trạng thái) và tap "Áp dụng", hệ thống kết hợp tất cả điều kiện trả về kết quả chính xác.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_082
**Scenario Title:** Bộ lọc — không có kết quả phù hợp với điều kiện lọc
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC2, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi áp dụng bộ lọc mà không có văn bản nào phù hợp, hệ thống hiển thị "Không tìm thấy kết quả." theo CMR-14.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_083
**Scenario Title:** Searchable Dropdown — không tìm thấy option phù hợp
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC15 (implicit), CMR-03
**Test Type:** UI
**Description:** Xác minh khi nhập text tìm kiếm trong dropdown mà không có option nào khớp, hiển thị empty state phù hợp trong dropdown.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC69_084
**Scenario Title:** Tìm kiếm — nhập 1 ký tự (BVA — giá trị tối thiểu)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập chỉ 1 ký tự vào ô tìm kiếm, sau debounce 3 giây hệ thống vẫn thực hiện tìm kiếm bình thường (không yêu cầu số ký tự tối thiểu).
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_085
**Scenario Title:** Tìm kiếm — nhập ký tự đặc biệt
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC1, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi nhập ký tự đặc biệt (VD: @, #, /, -, .) vào ô tìm kiếm, hệ thống xử lý bình thường không crash, trả về kết quả phù hợp hoặc empty state.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC69_086
**Scenario Title:** Lazy load — hiển thị spinner cục bộ (không full-screen)
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-AC16 (implicit), CMR-04
**Test Type:** UI
**Description:** Xác minh khi lazy load tải thêm bản ghi, hệ thống hiển thị spinner cục bộ ở cuối danh sách (KHÔNG hiển thị full-screen loading).
**Test Focus:** UI State

---

### Scenario ID: TS_UC69_087
**Scenario Title:** Lazy load — hết dữ liệu không tải thêm
**UC Reference:** UC69 — Tra cứu văn bản pháp luật
**Req-ID:** UC69-CMR-04
**Test Type:** Functional
**Description:** Xác minh khi đã tải hết tất cả bản ghi, cuộn xuống không trigger thêm API call, không hiển thị spinner.
**Test Focus:** Boundary

---

---

## ⚠️ Out-of-Scope Flags

| Scenario Area | Reason | Recommended Action |
|--------------|--------|--------------------|
| Performance testing (response time < 10s) | NFR: PERFORMANCE | Defer to performance testing specialist |
| Security testing (SQL injection, XSS trong ô tìm kiếm) | NFR: SECURITY | Defer to security testing specialist |
| Load testing (nhiều user đồng thời tìm kiếm) | NFR: LOAD | Defer to load testing specialist |
| Accessibility (screen reader, contrast ratio) | NFR: ACCESSIBILITY | Defer to accessibility testing specialist |
| Q9 — Vị trí lưu file khi tải, quyền storage | Chưa có thông tin từ BA | Bổ sung test case khi BA trả lời Q9 |
