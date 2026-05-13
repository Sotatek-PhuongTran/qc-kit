# Test Cases Draft — UC42-44 Quản lý đặt lịch nộp hồ sơ (Mobile)

**Ngày tạo:** 2026-05-08
**Phiên bản:** v1
**Agent:** qc-tc-design-MOBILE
**Input:**
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44_QuanLyDatLich.md` (v2)
- `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_quan-ly-dat-lich_audited_20260508_v2.md` (85.5/100 — CONDITIONALLY READY)
- `docs/QC-MOBILE/scenarios/UC42-44/UC42-44_quan-ly-dat-lich_scenarios_20260508_v2.md` (131 scenarios)
- `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1.1)

**Phạm vi test:** Mobile Client. KHÔNG test API endpoint / backend logic.

**Cấu trúc:**
- Section 1: Màn hình Danh sách Đặt lịch nộp hồ sơ
  - Check UI/UX → Check Function → Check common (16 TC cố định)
- Section 2: Màn hình Chi tiết Lịch hẹn
  - Check UI/UX → Check Function → Check common (16 TC cố định)

**Assumption (từ audit v2):** Q2 badge color = follow UI design; Q4 Cá nhân/Tổ chức chỉ khác Mã định danh; Q6 Physical Back (Android) đồng nhất icon ←; Q17 push deep-link defer UC258-259; Q18 không auto polling; Q20 không copy-to-clipboard; Q25 Áp dụng luôn enabled; Q30 không offline cache; Q31 UC42-44 có trong Home Quick Access + Sidebar.

---

## SECTION 1 — Màn hình Danh sách Đặt lịch nộp hồ sơ

### 1.1. Check UI/UX

#### TC_001 — Kiểm tra UI/UX Màn hình [Danh sách lịch hẹn] khi có dữ liệu
- **Pre:** Đăng nhập thành công tài khoản Cá nhân/Tổ chức có ≥1 lịch hẹn.
- **Steps:** 1. Vào Trang chủ → nhấp Quick Access "Quản lý đặt lịch". 2. Kiểm tra hiển thị Màn hình [Danh sách lịch hẹn].
- **Expected:** 2.\n- Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design (Tham khảo ảnh "UC 42-44_ Tab List" sheet WFDesign).\n- Header đỏ: nút Back (←) trái, tiêu đề "Quản lý đặt lịch nộp hồ sơ" trắng căn giữa.\n- Khung Tìm kiếm + icon [Filter] bên phải.\n- Tab bar 6 tab theo thứ tự: "Tất cả" (active đỏ + underline), "Chờ xác nhận", "Đã xác nhận", "Đã hủy", "Đã bỏ lượt", "Đã hoàn thành".\n- Danh sách Card lịch hẹn.\n- Bottom Navigation.
- **Note:** Giai đoạn 1

#### TC_002 — Kiểm tra UI/UX Màn hình [Danh sách lịch hẹn] khi rỗng (tài khoản chưa có lịch hẹn)
- **Pre:** Đăng nhập tài khoản chưa có lịch hẹn nào.
- **Steps:** 1. Mở Màn hình [Danh sách lịch hẹn]. 2. Kiểm tra hiển thị vùng danh sách tại Tab "Tất cả".
- **Expected:** 2.\n- Header, Search box, Filter icon, Tab bar: hiển thị bình thường.\n- Vùng danh sách: Empty state — icon + text "Không có dữ liệu." (CMR-14) căn giữa.
- **Note:** Giai đoạn 1 — Empty state

#### TC_003 — Kiểm tra Loading state toàn màn hình khi first-load
- **Pre:** Đăng nhập thành công, đang chờ API trả danh sách (first-load).
- **Steps:** 1. Tap Quick Access "Quản lý đặt lịch". 2. Kiểm tra hiển thị màn hình trong khi chờ API.
- **Expected:** 2.\n- Full-screen loading overlay hiển thị trên toàn vùng nội dung (CMR-07, AC17).\n- Sau khi API trả → ẩn overlay, hiển thị danh sách + tab + search.
- **Note:** Giai đoạn 1 — First-load

#### TC_004 — [Search box] Kiểm tra hiển thị mặc định (icon + placeholder)
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Kiểm tra hiển thị ô [Search].
- **Expected:** 1.\n- Icon kính lúp bên trái trong ô.\n- Placeholder "Tìm kiếm thủ tục...".\n- Ô rỗng mặc định.
- **Note:** Giai đoạn 1

#### TC_005 — [Icon Filter] Kiểm tra hiển thị mặc định (không có indicator)
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn], chưa áp dụng filter.
- **Steps:** 1. Kiểm tra hiển thị icon [Filter] bên phải ô Search.
- **Expected:** 1.\n- Icon filter viền bo tròn.\n- Không có chấm indicator màu xanh lá ở góc phải trên.
- **Note:** Giai đoạn 1

#### TC_006 — [Icon Filter] Kiểm tra hiển thị khi có filter đang active
- **Pre:** Đã áp dụng filter (Lĩnh vực hoặc Dịch vụ công ≠ "Tất cả").
- **Steps:** 1. Kiểm tra hiển thị icon [Filter].
- **Expected:** 1. Hiển thị chấm indicator màu xanh lá cây ở góc phải bên trên của icon filter (CMR-02, AC8).
- **Note:** Giai đoạn 1 — Active filter indicator

#### TC_007 — [Tab bar] Kiểm tra hiển thị đủ 6 tab đúng thứ tự
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Kiểm tra hiển thị Tab bar.
- **Expected:** 1. Hiển thị đúng 6 tab theo thứ tự từ trái sang phải: "Tất cả" → "Chờ xác nhận" → "Đã xác nhận" → "Đã hủy" → "Đã bỏ lượt" → "Đã hoàn thành" (AC1).
- **Note:** Giai đoạn 1

#### TC_008 — [Tab bar] Kiểm tra tab mặc định "Tất cả" active khi mở màn hình
- **Pre:** Lần đầu mở Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Kiểm tra trạng thái tab khi màn hình vừa load xong.
- **Expected:** 1. Tab "Tất cả" ở trạng thái active (text đỏ + underline đỏ); 5 tab còn lại inactive.
- **Note:** Giai đoạn 1

#### TC_009 — [Card] Kiểm tra hiển thị đầy đủ 5 field + icon điều hướng
- **Pre:** Danh sách có ≥1 card có đủ dữ liệu.
- **Steps:** 1. Kiểm tra hiển thị 1 card lịch hẹn.
- **Expected:** 1. Card hiển thị đầy đủ:\n- Tên thủ tục (bold, tối đa 2 dòng).\n- Badge trạng thái.\n- Icon Tòa nhà (xám) + "Lĩnh vực: " + Tên lĩnh vực (1 dòng).\n- Icon Người (xám) + "Thời gian đặt: " + DD/MM/YYYY HH:mm.\n- Icon Lịch (xám) + "Ngày cán bộ hẹn nộp: " + DD/MM/YYYY.\n- Icon mũi tên ">" xám góc phải.
- **Note:** Giai đoạn 1 — AC3

#### TC_010 — [Card] Kiểm tra Tên thủ tục dài → truncate 2 dòng + "..."
- **Pre:** Có lịch hẹn với Tên thủ tục > 2 dòng.
- **Steps:** 1. Kiểm tra hiển thị trường Tên thủ tục trên card.
- **Expected:** 1. Tên thủ tục hiển thị tối đa 2 dòng; phần vượt quá bị cắt và hiển thị "..." ở cuối dòng 2.
- **Note:** BVA — truncate

#### TC_011 — [Card] Kiểm tra Lĩnh vực dài → truncate 1 dòng + "..."
- **Pre:** Có lịch hẹn với Lĩnh vực > 1 dòng.
- **Steps:** 1. Kiểm tra hiển thị trường Lĩnh vực trên card.
- **Expected:** 1. Lĩnh vực hiển thị tối đa 1 dòng; phần vượt quá bị cắt và hiển thị "..." ở cuối.
- **Note:** BVA — truncate

#### TC_012 — [Card] Kiểm tra field null → hiển thị "-"
- **Pre:** Có lịch hẹn với Lĩnh vực = null và Ngày cán bộ hẹn nộp = null.
- **Steps:** 1. Kiểm tra hiển thị các field null trên card.
- **Expected:** 1.\n- Card hiển thị "Lĩnh vực: -".\n- Card hiển thị "Ngày cán bộ hẹn nộp: -".\n(AC3 — Null handling)
- **Note:** Giai đoạn 1

#### TC_013 — [Card] Kiểm tra format "Thời gian đặt" DD/MM/YYYY HH:mm (24h, GMT+7)
- **Pre:** Có lịch hẹn với "Thời gian đặt" = 08/05/2026 14:30 (GMT+7).
- **Steps:** 1. Kiểm tra hiển thị field "Thời gian đặt" trên card.
- **Expected:** 1. Hiển thị chính xác "Thời gian đặt: 08/05/2026 14:30" (CMR-12).
- **Note:** Giai đoạn 1 — Format

#### TC_014 — [Card] Kiểm tra format "Ngày cán bộ hẹn nộp" DD/MM/YYYY (không có giờ)
- **Pre:** Có lịch hẹn với Ngày cán bộ hẹn nộp = 10/05/2026.
- **Steps:** 1. Kiểm tra hiển thị field "Ngày cán bộ hẹn nộp" trên card.
- **Expected:** 1. Hiển thị "Ngày cán bộ hẹn nộp: 10/05/2026" — không kèm giờ (CMR-12).
- **Note:** Giai đoạn 1 — Format

#### TC_015 — [Card] Kiểm tra Badge trạng thái hiển thị đúng màu follow UI design
- **Pre:** Danh sách có card với các trạng thái khác nhau.
- **Steps:** 1. Kiểm tra hiển thị Badge cho từng trạng thái: "Chờ xác nhận", "Đã xác nhận", "Đã hủy", "Đã bỏ lượt", "Đã hoàn thành".
- **Expected:** 1. Badge hiển thị đúng màu sắc follow theo UI design cho từng trạng thái (AC6, CMR-05).
- **Note:** Follow UI design (Q2)

#### TC_016 — [Bottom Sheet Filter] Kiểm tra UI/UX khi mở Filter
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Nhấp icon [Filter]. 2. Kiểm tra hiển thị Bottom Sheet.
- **Expected:** 2.\n- Bottom Sheet trượt lên từ dưới.\n- Hiển thị đầy đủ: Dropdown "Lĩnh vực" (default "Tất cả lĩnh vực"), Dropdown "Dịch vụ công" (default "Tất cả dịch vụ công"), nút [X] góc phải trên, nút [Nhập lại] outline đỏ, nút [Áp dụng] filled đỏ.\n(Tham khảo ảnh "UC42-filter" sheet WFDesign).
- **Note:** Giai đoạn 1 — Modal

---

### 1.2. Check Function

#### TC_017 — [Entry point] Kiểm tra truy cập từ Quick Access "Quản lý đặt lịch" trên Trang chủ
- **Pre:** Đăng nhập thành công, đang ở Trang chủ.
- **Steps:** 1. Nhấp Quick Access "Quản lý đặt lịch" trên Trang chủ.
- **Expected:** 1. Mở Màn hình [Danh sách lịch hẹn] với Tab "Tất cả" active mặc định.
- **Note:** Giai đoạn 3 — Entry point

#### TC_018 — [Entry point] Kiểm tra truy cập từ Sidebar "Quản lý đặt lịch"
- **Pre:** Đăng nhập thành công, Sidebar đang mở.
- **Steps:** 1. Nhấp item "Quản lý đặt lịch" trên Sidebar.
- **Expected:** 1. Đóng Sidebar. 2. Mở Màn hình [Danh sách lịch hẹn] giống hệt entry từ Quick Access (tab "Tất cả" active).
- **Note:** Giai đoạn 3 — Entry point consistency

#### TC_019 — [Nút Back ←] Kiểm tra tap Back trên Header → quay về màn trước
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn] (đi từ Trang chủ).
- **Steps:** 1. Tap nút [Back ←] trên Header.
- **Expected:** 1. Đóng màn [Danh sách lịch hẹn], quay về Trang chủ (CMR-06).
- **Note:** Giai đoạn 3

#### TC_020 — [Cá nhân] Kiểm tra tài khoản Cá nhân chỉ thấy lịch hẹn của bản thân
- **Pre:** Đăng nhập tài khoản Cá nhân.
- **Steps:** 1. Mở Màn hình [Danh sách lịch hẹn]. 2. Kiểm tra danh sách lịch hẹn.
- **Expected:** 2. Danh sách chỉ chứa lịch hẹn của tài khoản Cá nhân này; không thấy lịch hẹn của tài khoản/tổ chức khác.
- **Note:** Role-based — Data scope

#### TC_021 — [Tổ chức] Kiểm tra tài khoản Tổ chức chỉ thấy lịch hẹn của tổ chức
- **Pre:** Đăng nhập tài khoản Tổ chức.
- **Steps:** 1. Mở Màn hình [Danh sách lịch hẹn]. 2. Kiểm tra danh sách lịch hẹn.
- **Expected:** 2. Danh sách chỉ chứa lịch hẹn của tổ chức này; không thấy lịch hẹn của tổ chức/cá nhân khác.
- **Note:** Role-based — Data scope

#### TC_022 — [Guest] Kiểm tra chưa đăng nhập truy cập UC42-44 → redirect đăng nhập
- **Pre:** Chưa đăng nhập (hoặc đã logout).
- **Steps:** 1. Cố gắng truy cập Màn hình [Danh sách lịch hẹn] (qua deep-link nếu có, hoặc app ẩn Quick Access/Sidebar item).
- **Expected:** 1. App ẩn entry point hoặc redirect về màn [Đăng nhập]; không cho xem danh sách.
- **Note:** Permission

#### TC_023 — [Tab "Chờ xác nhận"] Kiểm tra lọc danh sách theo trạng thái
- **Pre:** Đang ở Tab "Tất cả", có ≥1 lịch hẹn trạng thái "Chờ xác nhận".
- **Steps:** 1. Tap Tab "Chờ xác nhận".
- **Expected:** 1.\n- Tab "Tất cả" unselect (bỏ underline đỏ).\n- Tab "Chờ xác nhận" active (text đỏ + underline đỏ).\n- Danh sách chỉ hiển thị lịch hẹn trạng thái "Chờ xác nhận".
- **Note:** EP — Status partition

#### TC_024 — [Tab "Đã xác nhận"] Kiểm tra lọc danh sách theo trạng thái
- **Pre:** Đang ở Tab "Tất cả", có ≥1 lịch hẹn trạng thái "Đã xác nhận".
- **Steps:** 1. Tap Tab "Đã xác nhận".
- **Expected:** 1. Chỉ hiển thị lịch hẹn trạng thái "Đã xác nhận"; tab này active, các tab khác inactive.
- **Note:** EP — Status partition

#### TC_025 — [Tab "Đã hủy"] Kiểm tra lọc danh sách theo trạng thái
- **Pre:** Có ≥1 lịch hẹn trạng thái "Đã hủy".
- **Steps:** 1. Tap Tab "Đã hủy".
- **Expected:** 1. Chỉ hiển thị lịch hẹn trạng thái "Đã hủy".
- **Note:** EP — Status partition

#### TC_026 — [Tab "Đã bỏ lượt"] Kiểm tra lọc danh sách theo trạng thái
- **Pre:** Có ≥1 lịch hẹn trạng thái "Đã bỏ lượt".
- **Steps:** 1. Tap Tab "Đã bỏ lượt".
- **Expected:** 1. Chỉ hiển thị lịch hẹn trạng thái "Đã bỏ lượt".
- **Note:** EP — Status partition

#### TC_027 — [Tab "Đã hoàn thành"] Kiểm tra lọc danh sách theo trạng thái
- **Pre:** Có ≥1 lịch hẹn trạng thái "Đã hoàn thành".
- **Steps:** 1. Tap Tab "Đã hoàn thành".
- **Expected:** 1. Chỉ hiển thị lịch hẹn trạng thái "Đã hoàn thành".
- **Note:** EP — Status partition

#### TC_028 — [Tab bar] Kiểm tra single selection — chỉ 1 tab active tại 1 thời điểm
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Tap lần lượt các tab "Chờ xác nhận" → "Đã xác nhận" → "Đã hủy". 2. Sau mỗi lần tap, kiểm tra trạng thái tab bar.
- **Expected:** 1 & 2. Tại mọi thời điểm chỉ có đúng 1 tab active (text đỏ + underline); 5 tab còn lại inactive.
- **Note:** Business rule — Single selection

#### TC_029 — [Tab bar] Kiểm tra tab bar swipe ngang khi không hiển thị đủ 6 tab
- **Pre:** Thiết bị màn hình nhỏ không hiển thị đủ 6 tab cùng lúc.
- **Steps:** 1. Vuốt ngang trên Tab bar.
- **Expected:** 1. Tab bar cho phép scroll ngang để xem tab bị che khuất.
- **Note:** Horizontal scroll

#### TC_030 — [Tab] Kiểm tra Empty state "Không có dữ liệu." cho tab không có data
- **Pre:** Tab "Đã hủy" không có lịch hẹn nào.
- **Steps:** 1. Tap Tab "Đã hủy".
- **Expected:** 1. Vùng danh sách hiển thị empty state "Không có dữ liệu." (CMR-14).
- **Note:** Empty state per tab

#### TC_031 — [Sort order] Kiểm tra danh sách sắp xếp theo "Thời gian đặt" giảm dần
- **Pre:** Tab "Tất cả" có nhiều lịch hẹn với "Thời gian đặt" khác nhau.
- **Steps:** 1. Kiểm tra thứ tự các card trong danh sách.
- **Expected:** 1. Các card sắp xếp theo "Thời gian đặt" DESC (bản ghi có thời gian đặt gần nhất ở trên cùng) — AC4.
- **Note:** Business rule — Sort

#### TC_032 — [Search] Kiểm tra happy path — nhập keyword hợp lệ → filter đúng sau 3s
- **Pre:** Đang ở Tab "Tất cả", có lịch hẹn chứa keyword "đầu tư".
- **Steps:** 1. Nhập "đầu tư" vào ô [Search]. 2. Chờ 3 giây. 3. Kiểm tra danh sách.
- **Expected:** 3. Danh sách tự hiển thị kết quả chứa "đầu tư" (fuzzy match) mà không cần nhấn Enter (AC9, CMR-01).
- **Note:** Happy path — Debounce 3s

#### TC_033 — [Search] Kiểm tra debounce 3s — gõ liên tục không trigger filter giữa chừng
- **Pre:** Đang ở Tab "Tất cả".
- **Steps:** 1. Gõ từng ký tự "đ", "ầ", "u", "t", "ư" liên tục trong < 3s. 2. Kiểm tra danh sách trong khi đang gõ. 3. Sau khi ngừng gõ 3s, kiểm tra lại.
- **Expected:** 2. Trong quá trình gõ, danh sách KHÔNG trigger filter sau mỗi ký tự. 3. Sau 3s kể từ ký tự cuối, danh sách mới filter 1 lần.
- **Note:** Boundary — Debounce timing

#### TC_034 — [Search BVA] Kiểm tra nhập đúng 1 ký tự (min boundary)
- **Pre:** Đang ở Tab "Tất cả".
- **Steps:** 1. Nhập đúng 1 ký tự "a". 2. Chờ 3s.
- **Expected:** 2. Danh sách filter theo keyword 1 ký tự (fuzzy match).
- **Note:** BVA — Min = 1

#### TC_035 — [Search BVA] Kiểm tra nhập đúng 500 ký tự (max boundary)
- **Pre:** Đang ở Tab "Tất cả".
- **Steps:** 1. Nhập chuỗi đúng 500 ký tự (lặp "a" x 500). 2. Chờ 3s. 3. Kiểm tra ô Search + danh sách.
- **Expected:** 3. Ô [Search] chứa đúng 500 ký tự; danh sách trigger filter sau 3s (CMR-01).
- **Note:** BVA — Max = 500

#### TC_036 — [Search BVA] Kiểm tra chặn ký tự thứ 501 (max + 1)
- **Pre:** Ô [Search] đang có 500 ký tự.
- **Steps:** 1. Cố gắng gõ thêm ký tự thứ 501.
- **Expected:** 1. Ô [Search] KHÔNG nhận thêm ký tự; giữ nguyên 500 ký tự (hoặc auto truncate = 500).
- **Note:** BVA — Max + 1

#### TC_037 — [Search] Kiểm tra paste chuỗi > 500 ký tự → cắt còn 500
- **Pre:** Clipboard chứa chuỗi 600 ký tự.
- **Steps:** 1. Focus ô [Search]. 2. Paste.
- **Expected:** 2. Ô [Search] chỉ nhận 500 ký tự đầu tiên; 100 ký tự còn lại bị bỏ.
- **Note:** BVA — Paste overflow

#### TC_038 — [Search] Kiểm tra search theo "Tên thủ tục" — fuzzy match
- **Pre:** Có lịch hẹn với Tên thủ tục chứa "cấp giấy".
- **Steps:** 1. Nhập "cấp giấy" vào ô [Search]. 2. Chờ 3s.
- **Expected:** 2. Kết quả hiển thị tất cả lịch hẹn có Tên thủ tục chứa "cấp giấy".
- **Note:** Happy — by name

#### TC_039 — [Search] Kiểm tra search theo "Mã thủ tục" — fuzzy match
- **Pre:** Có lịch hẹn với Mã thủ tục chứa "2.000412".
- **Steps:** 1. Nhập "2.000412" vào ô [Search]. 2. Chờ 3s.
- **Expected:** 2. Kết quả hiển thị tất cả lịch hẹn có Mã thủ tục chứa "2.000412".
- **Note:** Happy — by code

#### TC_040 — [Search] Kiểm tra scope search áp dụng toàn bộ tab
- **Pre:** Đang ở Tab "Chờ xác nhận", có lịch hẹn ở các tab khác chứa keyword "xyz-chung".
- **Steps:** 1. Nhập "xyz-chung" vào ô [Search]. 2. Chờ 3s. 3. Kiểm tra kết quả + tab active.
- **Expected:** 3.\n- Kết quả trả về bao gồm lịch hẹn từ TẤT CẢ trạng thái (không giới hạn "Chờ xác nhận").\n- Kết quả hiển thị trên Tab "Tất cả" (AC9).
- **Note:** Business rule — Cross-tab scope

#### TC_041 — [Search] Kiểm tra keyword không có match → "Không tìm thấy kết quả."
- **Pre:** Không có lịch hẹn nào match keyword "xyz123notexist".
- **Steps:** 1. Nhập "xyz123notexist" vào ô [Search]. 2. Chờ 3s.
- **Expected:** 2. Hiển thị empty state "Không tìm thấy kết quả." (CMR-14).
- **Note:** Exception — No match

#### TC_042 — [Search] Kiểm tra xóa hết keyword → danh sách reset về mặc định
- **Pre:** Đã nhập keyword và có kết quả filter.
- **Steps:** 1. Xóa toàn bộ ký tự trong ô [Search]. 2. Chờ 3s.
- **Expected:** 2. Danh sách trở về trạng thái mặc định theo Tab đang chọn (hiển thị tất cả) — AC10.
- **Note:** Business rule

#### TC_043 — [Search] Kiểm tra nhập chỉ khoảng trắng → coi như rỗng
- **Pre:** Đang ở Tab "Tất cả".
- **Steps:** 1. Nhập chỉ spaces "   ". 2. Chờ 3s.
- **Expected:** 2. Hệ thống xử lý như rỗng; hiển thị danh sách mặc định (không filter vô nghĩa).
- **Note:** EP — Invalid (whitespace)

#### TC_044 — [Search] Kiểm tra nhập keyword tiếng Việt có dấu (UTF-8)
- **Pre:** Có lịch hẹn với Tên thủ tục chứa "Đầu tư".
- **Steps:** 1. Nhập "Đầu tư" (có dấu). 2. Chờ 3s.
- **Expected:** 2. Search khớp đúng; các ký tự UTF-8 không gây lỗi.
- **Note:** EP — Unicode

#### TC_045 — [Search] Kiểm tra nhập emoji/ký tự đặc biệt → không crash
- **Pre:** Đang ở Tab "Tất cả".
- **Steps:** 1. Nhập "😀" hoặc "<>&'". 2. Chờ 3s.
- **Expected:** 2. App không crash; hiển thị "Không tìm thấy kết quả." nếu không match.
- **Note:** EP — Edge input + Security (input sanitization)

#### TC_046 — [Icon Filter] Kiểm tra tap mở Bottom Sheet
- **Pre:** Đang ở Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Tap icon [Filter].
- **Expected:** 1. Bottom Sheet Filter trượt lên từ dưới, hiển thị đầy đủ các control (CMR-02).
- **Note:** Giai đoạn 2

#### TC_047 — [Bottom Sheet Filter — Dropdown Lĩnh vực] Kiểm tra tap mở dropdown
- **Pre:** Bottom Sheet Filter đang mở.
- **Steps:** 1. Tap Dropdown "Lĩnh vực".
- **Expected:** 1. Mở danh sách option Lĩnh vực từ danh mục hệ thống; option "Tất cả lĩnh vực" ở trên cùng.
- **Note:** Giai đoạn 2

#### TC_048 — [Dropdown Lĩnh vực] Kiểm tra option đã chọn được highlight/bold khi mở lại
- **Pre:** Đã chọn Lĩnh vực X trước đó.
- **Steps:** 1. Mở lại Dropdown "Lĩnh vực". 2. Kiểm tra hiển thị các option.
- **Expected:** 2. Option X được highlight/bold; các option khác hiển thị bình thường (CMR-03).
- **Note:** UI state

#### TC_049 — [Dropdown Lĩnh vực] Kiểm tra tìm kiếm inline trong dropdown
- **Pre:** Dropdown "Lĩnh vực" đang mở.
- **Steps:** 1. Nhập vài ký tự vào ô tìm kiếm trong dropdown.
- **Expected:** 1. Danh sách option tự lọc theo fuzzy match.
- **Note:** Happy — In-dropdown search

#### TC_050 — [Dropdown Lĩnh vực] Kiểm tra option text dài → truncate "..."
- **Pre:** Có option với tên vượt giới hạn ký tự hiển thị.
- **Steps:** 1. Mở Dropdown "Lĩnh vực". 2. Kiểm tra hiển thị option dài.
- **Expected:** 2. Option tự cắt ngắn và thêm "..." ở cuối (CMR-03).
- **Note:** BVA — Truncate

#### TC_051 — [Filter Decision Table] Kiểm tra chỉ chọn Lĩnh vực (Valid) + DVC mặc định
- **Pre:** Bottom Sheet Filter đang mở.
- **Steps:** 1. Chọn Lĩnh vực "Đầu tư". 2. Giữ Dịch vụ công = "Tất cả dịch vụ công". 3. Tap [Áp dụng].
- **Expected:** 3. Bottom Sheet đóng; danh sách filter theo Lĩnh vực "Đầu tư" (mọi dịch vụ công) — AC7.
- **Note:** DT — (L=Valid, DVC=Default)

#### TC_052 — [Filter Decision Table] Kiểm tra chỉ chọn Dịch vụ công (Valid) + Lĩnh vực mặc định
- **Pre:** Bottom Sheet Filter đang mở.
- **Steps:** 1. Giữ Lĩnh vực = "Tất cả lĩnh vực". 2. Chọn Dịch vụ công "Dịch vụ công trực tuyến mức độ 4". 3. Tap [Áp dụng].
- **Expected:** 3. Danh sách filter theo DVC "mức độ 4" (mọi lĩnh vực).
- **Note:** DT — (L=Default, DVC=Valid)

#### TC_053 — [Filter Decision Table] Kiểm tra chọn cả Lĩnh vực + Dịch vụ công
- **Pre:** Bottom Sheet Filter đang mở.
- **Steps:** 1. Chọn Lĩnh vực "Đầu tư". 2. Chọn Dịch vụ công "Mức độ 4". 3. Tap [Áp dụng].
- **Expected:** 3. Danh sách filter đồng thời theo CẢ 2 tiêu chí (AND logic) — AC7.
- **Note:** DT — (L=Valid, DVC=Valid)

#### TC_054 — [Filter Decision Table] Kiểm tra combo không có data matching
- **Pre:** Bottom Sheet Filter đang mở; không có lịch hẹn nào match combo sau đây.
- **Steps:** 1. Chọn Lĩnh vực X. 2. Chọn Dịch vụ công Y (combo không có data). 3. Tap [Áp dụng].
- **Expected:** 3. Bottom Sheet đóng; hiển thị "Không tìm thấy kết quả." (CMR-14).
- **Note:** DT — (Valid+Valid, no match)

#### TC_055 — [Filter] Kiểm tra filter độc lập — chọn Lĩnh vực KHÔNG ảnh hưởng danh sách Dịch vụ công
- **Pre:** Bottom Sheet Filter đang mở.
- **Steps:** 1. Mở Dropdown "Dịch vụ công", ghi nhận số lượng option. 2. Đóng dropdown, chọn 1 Lĩnh vực X. 3. Mở lại Dropdown "Dịch vụ công".
- **Expected:** 3. Số lượng option Dịch vụ công KHÔNG bị cắt/thu hẹp theo Lĩnh vực X; vẫn đầy đủ như bước 1 (AC7).
- **Note:** Business rule — No cascade

#### TC_056 — [Nút Nhập lại] Kiểm tra reset filter, không đóng Bottom Sheet, không gọi API
- **Pre:** Đã chọn Lĩnh vực X + Dịch vụ công Y, Bottom Sheet đang mở.
- **Steps:** 1. Tap nút [Nhập lại].
- **Expected:** 1.\n- Dropdown Lĩnh vực reset về "Tất cả lĩnh vực".\n- Dropdown Dịch vụ công reset về "Tất cả dịch vụ công".\n- Bottom Sheet VẪN MỞ.\n- Danh sách phía sau KHÔNG thay đổi (không gọi API).
- **Note:** Business rule — Reset

#### TC_057 — [Nút Áp dụng] Kiểm tra đóng Bottom Sheet, gọi API, cập nhật danh sách
- **Pre:** Đã chọn filter, Bottom Sheet đang mở.
- **Steps:** 1. Tap nút [Áp dụng].
- **Expected:** 1.\n- Bottom Sheet đóng.\n- App gọi API với tham số filter đã chọn.\n- Danh sách cập nhật theo filter.
- **Note:** Happy — Apply

#### TC_058 — [Active Filter Indicator] Kiểm tra indicator xanh lá khi filter ≠ mặc định
- **Pre:** Vừa Áp dụng filter có tiêu chí ≠ "Tất cả".
- **Steps:** 1. Kiểm tra hiển thị icon [Filter].
- **Expected:** 1. Icon [Filter] có chấm indicator màu xanh lá cây ở góc phải trên (AC8, CMR-02).
- **Note:** UI state

#### TC_059 — [Active Filter Indicator] Kiểm tra indicator ẩn khi reset về mặc định
- **Pre:** Đang có indicator xanh lá (filter active).
- **Steps:** 1. Mở Filter. 2. Tap [Nhập lại]. 3. Tap [Áp dụng]. 4. Kiểm tra icon [Filter].
- **Expected:** 4. Indicator xanh lá ẩn đi; icon [Filter] về trạng thái mặc định.
- **Note:** UI state

#### TC_060 — [Nút X Bottom Sheet] Kiểm tra đóng Bottom Sheet, không áp dụng
- **Pre:** Bottom Sheet Filter đang mở, đã chọn tiêu chí mới.
- **Steps:** 1. Tap nút [X] góc phải trên.
- **Expected:** 1. Bottom Sheet đóng; danh sách phía sau giữ nguyên theo filter cũ; tiêu chí vừa chọn bị hủy (không lưu).
- **Note:** Business rule — Cancel

#### TC_061 — [Bottom Sheet] Kiểm tra tap vùng ngoài Bottom Sheet → đóng
- **Pre:** Bottom Sheet Filter đang mở.
- **Steps:** 1. Tap vào vùng mờ ngoài Bottom Sheet.
- **Expected:** 1. Bottom Sheet đóng, không thay đổi kết quả hiện tại.
- **Note:** Business rule

#### TC_062 — [Card] Kiểm tra tap card → navigate sang Chi tiết lịch hẹn
- **Pre:** Đang ở Danh sách, có ≥1 card.
- **Steps:** 1. Tap vào bất kỳ vùng nào của 1 card (hoặc icon ">").
- **Expected:** 1. Navigate sang Màn hình [Chi tiết lịch hẹn] với đúng mã lịch hẹn của card đó.
- **Note:** Happy — Navigate

#### TC_063 — [Card] Kiểm tra Badge read-only — không có action riêng khi tap
- **Pre:** Đang ở Danh sách.
- **Steps:** 1. Tap chính xác lên vùng Badge trạng thái của 1 card.
- **Expected:** 1. Badge không có phản hồi riêng (không mở menu, không toast); app vẫn navigate sang [Chi tiết] vì tap toàn card.
- **Note:** Business rule — Badge read-only

#### TC_064 — [Card] Kiểm tra debounce double-tap — chỉ navigate 1 lần
- **Pre:** Đang ở Danh sách.
- **Steps:** 1. Double-tap nhanh liên tục vào 1 card.
- **Expected:** 1. App chỉ navigate 1 lần sang [Chi tiết]; không mở 2 instance (CMR-18).
- **Note:** Business rule — Debounce

#### TC_065 — [Lazy load] Kiểm tra first page load — 20 records đầu tiên
- **Pre:** Tài khoản có > 20 lịch hẹn, tab "Tất cả" active.
- **Steps:** 1. Mở Màn hình [Danh sách lịch hẹn]. 2. Kiểm tra số lượng card hiển thị.
- **Expected:** 2. Danh sách hiển thị tối đa 20 card (page 1) — AC13, CMR-04.
- **Note:** Happy — First page

#### TC_066 — [Lazy load BVA] Kiểm tra tổng 20 records → không trigger lazy load
- **Pre:** Tài khoản có đúng 20 lịch hẹn.
- **Steps:** 1. Mở Danh sách. 2. Cuộn xuống cuối danh sách.
- **Expected:** 2.\n- Hiển thị đủ 20 card.\n- Không trigger thêm page; không hiển thị spinner lazy ở cuối.
- **Note:** BVA — Exact page size

#### TC_067 — [Lazy load BVA] Kiểm tra tổng 21 records → cuộn cuối trigger page 2 (1 record)
- **Pre:** Tài khoản có đúng 21 lịch hẹn.
- **Steps:** 1. Mở Danh sách (load page 1 = 20). 2. Cuộn đến cuối.
- **Expected:** 2. Auto trigger load page 2 thêm 1 record; tổng hiển thị 21.
- **Note:** BVA — Size + 1

#### TC_068 — [Lazy load BVA] Kiểm tra tổng 40 records → 2 page đầy
- **Pre:** Tài khoản có đúng 40 lịch hẹn.
- **Steps:** 1. Mở Danh sách. 2. Cuộn đến cuối page 1. 3. Cuộn đến cuối page 2.
- **Expected:** 2. Trigger load page 2 (20 thêm). 3. Không trigger thêm page; tổng 40.
- **Note:** BVA — Exact 2 pages

#### TC_069 — [Lazy load] Kiểm tra spinner cục bộ khi load page tiếp theo
- **Pre:** Đã load page 1, tổng > 20 records.
- **Steps:** 1. Cuộn đến cuối page 1. 2. Kiểm tra hiển thị trong khi đang load page 2.
- **Expected:** 2. Hiển thị spinner cục bộ ở cuối danh sách; spinner ẩn sau khi load xong (CMR-07).
- **Note:** UI state — Lazy spinner

#### TC_070 — [Lazy load] Kiểm tra retry tự động 3 lần khi page N fail
- **Pre:** Simulate API lazy load page 2 trả lỗi.
- **Steps:** 1. Cuộn cuối trigger lazy load page 2. 2. Kiểm tra hệ thống retry.
- **Expected:** 2. App tự retry 3 lần (mỗi lần ~2s). Nếu 1 trong 3 lần thành công → append records; nếu tất cả fail → dừng (xem TC_071).
- **Note:** Business rule — Retry

#### TC_071 — [Lazy load] Kiểm tra sau 3 lần retry vẫn fail → hiển thị lỗi cục bộ
- **Pre:** Simulate API lazy load luôn fail.
- **Steps:** 1. Cuộn cuối trigger lazy load. 2. Chờ đủ 3 lần retry.
- **Expected:** 2. Sau 3 lần fail: dừng auto retry; hiển thị message lỗi cục bộ ở cuối danh sách (AC14).
- **Note:** Exception

#### TC_072 — [Lazy load] Kiểm tra pull-to-refresh để tải lại sau lazy fail
- **Pre:** Đã hiển thị lỗi lazy load cục bộ ở cuối danh sách.
- **Steps:** 1. Kéo xuống pull-to-refresh.
- **Expected:** 1. App gọi lại API từ page 1; reset toàn bộ danh sách; ẩn message lỗi cục bộ.
- **Note:** Recovery

#### TC_073 — [Pull to refresh] Kiểm tra trên Danh sách → refresh từ page 1
- **Pre:** Đang ở Danh sách có data.
- **Steps:** 1. Kéo xuống từ đầu danh sách. 2. Quan sát hiển thị.
- **Expected:** 2.\n- Spinner hiển thị ở đầu danh sách.\n- App gọi API page 1.\n- Cập nhật danh sách.\n- Ẩn spinner (AC11, CMR-13).
- **Note:** Happy — Pull refresh

#### TC_074 — [Pull to refresh] Kiểm tra giữ nguyên tab + search + filter hiện tại
- **Pre:** Đang Tab "Chờ xác nhận" + search keyword "abc" + filter active.
- **Steps:** 1. Pull-to-refresh.
- **Expected:** 1. Refresh nhưng vẫn giữ tab "Chờ xác nhận", keyword "abc", filter active.
- **Note:** Business rule — Preserve state on refresh

#### TC_075 — [Pull to refresh] Kiểm tra khi đang ở page N → reset về page 1
- **Pre:** Đã load đến page 3 (>40 records hiển thị), scroll đang ở giữa.
- **Steps:** 1. Pull-to-refresh.
- **Expected:** 1. Danh sách load lại từ page 1 (tối đa 20 records); scroll về đầu; lazy state reset.
- **Note:** Business rule — Reset pagination

#### TC_076 — [Loading state] Kiểm tra first-load → full-screen overlay
- **Pre:** Lần đầu vào Màn hình [Danh sách lịch hẹn].
- **Steps:** 1. Tap Quick Access. 2. Kiểm tra hiển thị trong khi chờ API.
- **Expected:** 2. Full-screen loading overlay hiển thị trên toàn màn hình; sau khi API trả → ẩn overlay, hiển thị danh sách (AC17).
- **Note:** Giai đoạn 5 — First-load

#### TC_077 — [Loading state] Kiểm tra đổi tab → chỉ spinner cục bộ (không full-screen)
- **Pre:** Đã first-load xong, đang Tab "Tất cả".
- **Steps:** 1. Tap Tab "Chờ xác nhận". 2. Kiểm tra hiển thị trong khi chờ API.
- **Expected:** 2. Chỉ hiển thị spinner cục bộ trong vùng danh sách; KHÔNG full-screen overlay.
- **Note:** Giai đoạn 5 — Subsequent load

#### TC_078 — [State persistence] Kiểm tra giữ nguyên tab khi quay lại từ Chi tiết
- **Pre:** Đang Tab "Chờ xác nhận" trên Danh sách.
- **Steps:** 1. Tap 1 card. 2. Vào Chi tiết. 3. Tap Back (←).
- **Expected:** 3. Quay về Danh sách với Tab "Chờ xác nhận" vẫn active (không reset về "Tất cả") — AC2.
- **Note:** Business rule — Tab persistence

#### TC_079 — [State persistence] Kiểm tra giữ scroll position khi quay lại từ Chi tiết
- **Pre:** Cuộn đến card thứ 15 trên Danh sách.
- **Steps:** 1. Tap card 15. 2. Vào Chi tiết. 3. Tap Back (←).
- **Expected:** 3. Quay về Danh sách với scroll vẫn ở vị trí card 15 (AC2).
- **Note:** Business rule

#### TC_080 — [State persistence] Kiểm tra giữ search keyword khi quay lại từ Chi tiết
- **Pre:** Đã search keyword "đầu tư" trên Danh sách.
- **Steps:** 1. Tap 1 card trong kết quả. 2. Vào Chi tiết. 3. Tap Back (←).
- **Expected:** 3. Ô [Search] vẫn giữ "đầu tư"; danh sách vẫn hiển thị kết quả search (AC18, CMR-01).
- **Note:** Business rule

#### TC_081 — [State persistence] Kiểm tra giữ filter khi quay lại từ Chi tiết
- **Pre:** Đã áp dụng filter Lĩnh vực = X.
- **Steps:** 1. Tap 1 card trong kết quả. 2. Vào Chi tiết. 3. Tap Back (←).
- **Expected:** 3. Indicator xanh lá trên icon [Filter] vẫn hiển thị; danh sách vẫn filter theo Lĩnh vực X (AC18).
- **Note:** Business rule

#### TC_082 — [State persistence] Kiểm tra reset search + filter khi chuyển tab khác
- **Pre:** Tab "Tất cả" có search "đầu tư" + filter Lĩnh vực X active.
- **Steps:** 1. Tap Tab "Đã xác nhận".
- **Expected:** 1.\n- Ô [Search] rỗng (reset).\n- Filter indicator ẩn (reset về mặc định) — AC19.
- **Note:** Business rule — Reset on tab switch

#### TC_083 — [Physical Back Android] Kiểm tra Physical Back đóng Bottom Sheet khi đang mở
- **Pre:** Android, Bottom Sheet Filter đang mở.
- **Steps:** 1. Nhấn Physical Back button trên thiết bị Android.
- **Expected:** 1. Bottom Sheet đóng; không thoát màn [Danh sách]; danh sách không đổi (assumption Q6).
- **Note:** Platform-specific

#### TC_084 — [Error — Network] Kiểm tra mất mạng (Danh sách) → message + nút Thử lại
- **Pre:** Đã đăng nhập, tắt mạng trước khi mở màn.
- **Steps:** 1. Mở Màn hình [Danh sách lịch hẹn].
- **Expected:** 1. Hiển thị message "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại" (AC15, CMR-07).
- **Note:** Giai đoạn 3 — Error

#### TC_085 — [Error — HTTP 500] Kiểm tra lỗi 500 → message không có Thử lại
- **Pre:** Simulate API trả HTTP 500.
- **Steps:** 1. Mở Danh sách.
- **Expected:** 1. Hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." — KHÔNG có nút Thử lại (AC15, CMR-07).
- **Note:** Error

#### TC_086 — [Error — Timeout] Kiểm tra timeout > 10s → message + Thử lại
- **Pre:** Simulate API mất > 10s chưa phản hồi.
- **Steps:** 1. Mở Danh sách. 2. Chờ 10s.
- **Expected:** 2. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại" (CMR-16).
- **Note:** Error

#### TC_087 — [Error BVA] Kiểm tra API response 9.9s (dưới 10s) → load thành công
- **Pre:** Simulate API response ~9.9s.
- **Steps:** 1. Mở Danh sách. 2. Chờ đến khi response trả về.
- **Expected:** 2. Danh sách hiển thị thành công; KHÔNG trigger timeout.
- **Note:** BVA — Below threshold

#### TC_088 — [Error BVA] Kiểm tra API response 10.1s (trên 10s) → trigger timeout
- **Pre:** Simulate API response ~10.1s.
- **Steps:** 1. Mở Danh sách. 2. Chờ qua 10s.
- **Expected:** 2. Trigger timeout; hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại".
- **Note:** BVA — Above threshold

#### TC_089 — [Error — 401 Silent refresh] Kiểm tra 401 + refresh token hợp lệ → silent retry thành công
- **Pre:** API trả 401 nhưng refresh token còn hiệu lực (< 15 ngày).
- **Steps:** 1. Mở Danh sách. 2. Kiểm tra hành vi phía client.
- **Expected:** 2. App tự động refresh token và retry API gốc; user không bị gián đoạn; danh sách hiển thị thành công.
- **Note:** Happy — Silent refresh

#### TC_090 — [Error — 401 Expired] Kiểm tra 401 + refresh token hết hạn (>15 ngày) → toast + redirect login
- **Pre:** API trả 401, refresh token cũng đã hết hạn.
- **Steps:** 1. Mở Danh sách.
- **Expected:** 1. Hiển thị toast "Phiên đăng nhập hết hạn."; redirect về màn [Đăng nhập] (AC16, CMR-07).
- **Note:** Error — Session expired

#### TC_091 — [Error Retry] Kiểm tra tap "Thử lại" sau lỗi mạng + mạng phục hồi → load thành công
- **Pre:** Đang hiển thị lỗi mạng với nút "Thử lại".
- **Steps:** 1. Bật mạng lại. 2. Tap "Thử lại".
- **Expected:** 2. App gọi lại API thành công; ẩn lỗi; hiển thị danh sách.
- **Note:** Recovery

#### TC_092 — [Offline] Kiểm tra offline khi đang xem danh sách → pull-to-refresh báo lỗi
- **Pre:** Đang xem danh sách có data.
- **Steps:** 1. Tắt mạng. 2. Pull-to-refresh.
- **Expected:** 2. Hiển thị lỗi mạng (không cache theo assumption Q30).
- **Note:** Assumption — No offline cache

#### TC_093 — [i18n] Kiểm tra đổi ngôn ngữ sang English → text cứng đổi, text động giữ nguyên
- **Pre:** Ngôn ngữ hiện tại VI. Có ≥1 lịch hẹn.
- **Steps:** 1. Đổi ngôn ngữ app sang English. 2. Mở Màn hình [Danh sách lịch hẹn]. 3. Kiểm tra text.
- **Expected:** 3.\n- Text cứng đổi sang EN: Header, tên tab, label, placeholder, nút, message.\n- Text động giữ nguyên: Tên thủ tục, Tên lĩnh vực, Tên dịch vụ công (từ API) — AC20, CMR-17.
- **Note:** i18n — EN

#### TC_094 — [i18n] Kiểm tra đổi ngôn ngữ sang Tiếng Trung → text cứng đổi
- **Pre:** Ngôn ngữ hiện tại VI.
- **Steps:** 1. Đổi ngôn ngữ app sang 中文. 2. Mở Danh sách. 3. Kiểm tra text.
- **Expected:** 3. Text cứng (Header, tab, label, button, message) đổi sang Tiếng Trung; text động giữ nguyên.
- **Note:** i18n — ZH

#### TC_095 — [i18n] Kiểm tra đổi ngôn ngữ sang Tiếng Nhật → text cứng đổi
- **Pre:** Ngôn ngữ hiện tại VI.
- **Steps:** 1. Đổi ngôn ngữ app sang 日本語. 2. Mở Danh sách. 3. Kiểm tra text.
- **Expected:** 3. Text cứng đổi sang Tiếng Nhật; text động giữ nguyên.
- **Note:** i18n — JA

#### TC_096 — [i18n] Kiểm tra đổi ngôn ngữ sang Tiếng Hàn → text cứng đổi
- **Pre:** Ngôn ngữ hiện tại VI.
- **Steps:** 1. Đổi ngôn ngữ app sang 한국어. 2. Mở Danh sách.
- **Expected:** Text cứng đổi sang Tiếng Hàn; text động giữ nguyên.
- **Note:** i18n — KO

#### TC_097 — [i18n] Kiểm tra format ngày giờ giữ nguyên DD/MM/YYYY HH:mm GMT+7 trên mọi locale
- **Pre:** Đã đổi ngôn ngữ lần lượt VI → EN → JA → KO.
- **Steps:** 1. Tại mỗi ngôn ngữ, quan sát format "Thời gian đặt" trên card.
- **Expected:** Format vẫn là DD/MM/YYYY HH:mm (24h GMT+7) — KHÔNG đổi sang MM/DD/YYYY hay 12h AM/PM (CMR-12).
- **Note:** Business rule

#### TC_098 — [A11y Screen reader] Kiểm tra VoiceOver/TalkBack đọc được Header, Tab, Card, Button
- **Pre:** Bật VoiceOver (iOS) hoặc TalkBack (Android).
- **Steps:** 1. Điều hướng qua Header, Tab bar, Card, icon Filter, nút Back.
- **Expected:** 1. Mỗi thành phần được đọc rõ ràng theo nội dung (AC21).
- **Note:** Accessibility

#### TC_099 — [Security — Input sanitization] Kiểm tra search box không bị XSS/SQL injection qua UI
- **Pre:** Đang ở Danh sách.
- **Steps:** 1. Nhập `<script>alert(1)</script>` vào ô [Search]. 2. Chờ 3s.
- **Expected:** 2. App không thực thi script; hiển thị "Không tìm thấy kết quả." hoặc coi như keyword bình thường; không crash.
- **Note:** Giai đoạn 5 — Security client-side

#### TC_100 — [UX Loading] Kiểm tra không có overlay khi chỉ switch tab
- **Pre:** First-load đã hoàn tất.
- **Steps:** 1. Tap Tab bất kỳ khác.
- **Expected:** 1. Không có full-screen overlay; chỉ có spinner cục bộ trong vùng danh sách.
- **Note:** Giai đoạn 5 — UX

---

### 1.3. Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

#### TC_101 — Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- **Steps:** 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- **Expected:** 1. Hiển thị đúng độ dài tối đa

#### TC_102 — Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng
- **Steps:** 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng
- **Expected:** 1. Không xảy ra lỗi bất thường

#### TC_103 — Kiểm tra tính nhất quán của các thông báo
- **Steps:** 1. Kiểm tra tính nhất quán của các thông báo
- **Expected:** 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình

#### TC_104 — Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- **Expected:** 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_105 — Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- **Expected:** 1. Không có lỗi gì xảy ra, giao diện không bị vỡ (Lưu ý: app chỉ hỗ trợ portrait theo project-context.md, vẫn test để đảm bảo không vỡ khi xoay).

#### TC_106 — Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang
- **Steps:** 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc
- **Expected:** 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_107 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- **Expected:** 1. Giao diện không bị vỡ

#### TC_108 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- **Expected:** 1. Giao diện không bị vỡ

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

#### TC_109 — Xác nhận hiển thị khi người dùng chạm vào nút [Quay lại] trên thiết bị Android
- **Steps:** 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị
- **Expected:** 3. Quay lại màn hình trước đó

#### TC_110 — Xác nhận hiển thị khi người dùng vuốt từ trái sang phải trên thiết bị iOS
- **Steps:** 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị
- **Expected:** 3. Quay lại màn hình trước đó

#### TC_111 — Xác nhận hiển thị khi người dùng tắt và mở lại ứng dụng
- **Steps:** 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị
- **Expected:** 4. Ứng dụng mở lại từ trạng thái ban đầu

#### TC_112 — Kiểm tra chế độ đa nhiệm (multitasking)
- **Steps:** 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị
- **Expected:** 4. Ứng dụng giữ nguyên ở trạng thái hiện tại

#### TC_113 — Xác nhận hiển thị khi khóa và mở khóa màn hình thiết bị
- **Steps:** 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị
- **Expected:** 4. Giữ nguyên trạng thái hiện tại của ứng dụng

#### TC_114 — Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh)
- **Steps:** Tiền điều kiện: Màn hình hỗ trợ tính năng kéo để làm mới\n1. Người dùng ở màn hình hiện tại\n2. Kéo xuống để làm mới
- **Expected:** 2. Hiển thị dữ liệu mới nhất của màn hình

#### TC_115 — Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more)
- **Steps:** Tiền điều kiện: Màn hình hỗ trợ tính năng cuộn xuống để tải thêm\n1. Người dùng cuộn xuống cuối danh sách
- **Expected:** 2. Hiển thị thêm dữ liệu mới

#### TC_116 — Kiểm tra phản hồi khi thiết bị nhận thông báo từ ứng dụng khác
- **Steps:** Tiền điều kiện: Ứng dụng khác được phép gửi thông báo\n1. Người dùng mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị
- **Expected:** 3. Không có lỗi nào xảy ra

---

## SECTION 2 — Màn hình Chi tiết Lịch hẹn

### 2.1. Check UI/UX

#### TC_117 — Kiểm tra UI/UX Màn hình [Chi tiết lịch hẹn] khi có đủ dữ liệu
- **Pre:** Đăng nhập, có ≥1 lịch hẹn có đầy đủ 5 section dữ liệu.
- **Steps:** 1. Tap 1 card bất kỳ trên Danh sách. 2. Kiểm tra hiển thị Màn hình [Chi tiết lịch hẹn].
- **Expected:** 2.\n- Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design (Tham khảo ảnh "UC42-44. Chi tiết lịch hẹn" sheet WFDesign).\n- Header đỏ: nút Back (←) trái, tiêu đề "Chi tiết lịch hẹn" trắng căn giữa.\n- 5 Section theo thứ tự: (1) Thông tin thủ tục, (2) Thông tin người nộp, (3) Thông tin lịch hẹn, (4) Trạng thái, (5) Ghi chú.\n- Toàn bộ read-only, không có CTA.
- **Note:** Giai đoạn 1

#### TC_118 — Kiểm tra Loading state toàn màn hình khi first-load Chi tiết
- **Pre:** Tap 1 card đang trong quá trình chờ API chi tiết.
- **Steps:** 1. Tap card. 2. Kiểm tra hiển thị trong khi chờ API trả dữ liệu chi tiết.
- **Expected:** 2. Full-screen loading overlay hiển thị trên toàn vùng nội dung (AC17, CMR-07); sau khi API trả → ẩn overlay.
- **Note:** Giai đoạn 1 — First-load

#### TC_119 — [Section 1] Kiểm tra hiển thị đủ 6 field "Thông tin thủ tục"
- **Pre:** Mở Chi tiết của lịch hẹn có đầy đủ dữ liệu.
- **Steps:** 1. Kiểm tra hiển thị Section 1.
- **Expected:** 1. Section 1 hiển thị đúng 6 field:\n- Mã thủ tục\n- Tên thủ tục\n- Lĩnh vực\n- Dịch vụ công\n- Cơ quan thực hiện\n- Đơn vị tiếp nhận\nTất cả read-only.
- **Note:** Giai đoạn 1 — Layout

#### TC_120 — [Section 2] Kiểm tra hiển thị đủ 2 field "Thông tin người nộp"
- **Pre:** Mở Chi tiết.
- **Steps:** 1. Kiểm tra hiển thị Section 2.
- **Expected:** 1. Section 2 hiển thị đúng 2 field: "Mã định danh" + "Tên người nộp"; đều read-only.
- **Note:** Giai đoạn 1

#### TC_121 — [Section 3] Kiểm tra hiển thị đủ 4 field "Thông tin lịch hẹn"
- **Pre:** Mở Chi tiết.
- **Steps:** 1. Kiểm tra hiển thị Section 3.
- **Expected:** 1. Section 3 hiển thị đúng 4 field: Ngày hẹn nộp, Khung giờ hẹn nộp, Thời gian đặt, Ngày cán bộ hẹn nộp; đều read-only.
- **Note:** Giai đoạn 1

#### TC_122 — [Section 4] Kiểm tra hiển thị Badge trạng thái
- **Pre:** Mở Chi tiết.
- **Steps:** 1. Kiểm tra hiển thị Section 4.
- **Expected:** 1. Section 4 hiển thị duy nhất 1 field "Trạng thái" dạng Badge; màu sắc follow UI design (CMR-05, AC6).
- **Note:** Giai đoạn 1 — Badge (follow UI design)

#### TC_123 — [Section 5] Kiểm tra hiển thị "Ghi chú"
- **Pre:** Mở Chi tiết của lịch hẹn có nội dung ghi chú.
- **Steps:** 1. Kiểm tra hiển thị Section 5.
- **Expected:** 1. Section 5 hiển thị nội dung ghi chú dạng text; wrap text nếu dài, KHÔNG truncate.
- **Note:** Giai đoạn 1

#### TC_124 — [Null handling] Kiểm tra các field null hiển thị "-"
- **Pre:** Mở Chi tiết của lịch hẹn có các field null (Mã thủ tục, Ngày hẹn nộp, Khung giờ hẹn nộp, Ngày cán bộ hẹn nộp, Ghi chú).
- **Steps:** 1. Kiểm tra các field null trong Chi tiết.
- **Expected:** 1. Các field null hiển thị "-" thay thế.
- **Note:** Business rule — Null handling

#### TC_125 — [Wrap text] Kiểm tra field nội dung dài → wrap, KHÔNG truncate
- **Pre:** Có lịch hẹn với Tên thủ tục / Lĩnh vực / Cơ quan thực hiện / Ghi chú rất dài.
- **Steps:** 1. Kiểm tra hiển thị các field dài trong Chi tiết.
- **Expected:** 1. Text wrap xuống nhiều dòng; KHÔNG có dấu "..." (Section 2.2 — Quy tắc hiển thị chung).
- **Note:** Business rule — Wrap

#### TC_126 — [Format ngày] Kiểm tra "Ngày hẹn nộp" hiển thị DD/MM/YYYY
- **Pre:** Lịch hẹn có Ngày hẹn nộp = 10/05/2026.
- **Steps:** 1. Kiểm tra hiển thị field "Ngày hẹn nộp".
- **Expected:** 1. Hiển thị đúng "10/05/2026" format DD/MM/YYYY (CMR-12).
- **Note:** Format

#### TC_127 — [Format giờ] Kiểm tra "Khung giờ hẹn nộp" format "HH:mm - HH:mm"
- **Pre:** Lịch hẹn có Khung giờ hẹn nộp = "08:00 - 09:00".
- **Steps:** 1. Kiểm tra hiển thị field "Khung giờ hẹn nộp".
- **Expected:** 1. Hiển thị "08:00 - 09:00" (24h, GMT+7, CMR-12); KHÔNG ở dạng "8h-9h" hay "08:00 AM - 09:00 AM".
- **Note:** Format

#### TC_128 — [Format ngày giờ] Kiểm tra "Thời gian đặt" hiển thị DD/MM/YYYY HH:mm
- **Pre:** Lịch hẹn có Thời gian đặt = "08/05/2026 14:30".
- **Steps:** 1. Kiểm tra hiển thị field "Thời gian đặt".
- **Expected:** 1. Hiển thị "08/05/2026 14:30" (24h, GMT+7, CMR-12).
- **Note:** Format

---

### 2.2. Check Function

#### TC_129 — [Nút Back ←] Kiểm tra tap Back → quay về Danh sách
- **Pre:** Đang ở Chi tiết (navigate từ Danh sách).
- **Steps:** 1. Tap nút [Back ←] trên Header Chi tiết.
- **Expected:** 1. Đóng Chi tiết; quay về Màn hình [Danh sách lịch hẹn] (CMR-06).
- **Note:** Giai đoạn 3

#### TC_130 — [Physical Back Android] Kiểm tra Physical Back từ Chi tiết → Danh sách
- **Pre:** Android, đang ở Chi tiết.
- **Steps:** 1. Nhấn Physical Back button.
- **Expected:** 1. Đóng Chi tiết; quay về Danh sách (giả định đồng nhất icon ← — Q6).
- **Note:** Platform — Android

#### TC_131 — [Data — Cá nhân] Kiểm tra "Mã định danh" hiển thị CCCD/CMND
- **Pre:** Đăng nhập tài khoản Cá nhân; mở Chi tiết 1 lịch hẹn của Cá nhân này.
- **Steps:** 1. Kiểm tra Section 2 — field "Mã định danh".
- **Expected:** 1. Hiển thị số CCCD/CMND đúng với dữ liệu API trả về (Section 2.2 Section 2).
- **Note:** Role — Individual

#### TC_132 — [Data — Tổ chức] Kiểm tra "Mã định danh" hiển thị Mã doanh nghiệp
- **Pre:** Đăng nhập tài khoản Tổ chức; mở Chi tiết 1 lịch hẹn của Tổ chức này.
- **Steps:** 1. Kiểm tra Section 2 — field "Mã định danh".
- **Expected:** 1. Hiển thị Mã doanh nghiệp đúng với dữ liệu API trả về.
- **Note:** Role — Organization

#### TC_133 — [Section 1] Kiểm tra dữ liệu Section 1 khớp 100% với API
- **Pre:** Mở Chi tiết 1 lịch hẹn X.
- **Steps:** 1. So sánh 6 field Section 1 với response API chi tiết cho lịch hẹn X.
- **Expected:** 1. Mã thủ tục / Tên thủ tục / Lĩnh vực / Dịch vụ công / Cơ quan thực hiện / Đơn vị tiếp nhận — khớp 100% với API (AC5).
- **Note:** Functional — Data mapping

#### TC_134 — [Section 2] Kiểm tra dữ liệu Section 2 khớp 100% với API
- **Pre:** Mở Chi tiết 1 lịch hẹn X.
- **Steps:** 1. So sánh 2 field Section 2 với API.
- **Expected:** 1. Mã định danh + Tên người nộp khớp 100% với API.
- **Note:** Functional

#### TC_135 — [Section 3] Kiểm tra dữ liệu Section 3 khớp 100% với API
- **Pre:** Mở Chi tiết 1 lịch hẹn X.
- **Steps:** 1. So sánh 4 field Section 3 với API.
- **Expected:** 1. Ngày hẹn nộp + Khung giờ + Thời gian đặt + Ngày cán bộ hẹn nộp khớp 100% với API; đúng format CMR-12.
- **Note:** Functional

#### TC_136 — [Consistency] Kiểm tra "Thời gian đặt" trên Chi tiết khớp 100% với card
- **Pre:** Đang ở Danh sách, ghi nhận "Thời gian đặt" trên card X.
- **Steps:** 1. Tap card X. 2. Kiểm tra field "Thời gian đặt" trên Chi tiết.
- **Expected:** 2. Giá trị "Thời gian đặt" trên Chi tiết KHỚP 100% với trên card (cùng format DD/MM/YYYY HH:mm) — AC5, Q8 resolved.
- **Note:** Integration — Card vs Detail

#### TC_137 — [Badge] Kiểm tra Badge read-only trong Chi tiết (không tap được)
- **Pre:** Đang ở Chi tiết.
- **Steps:** 1. Tap vào vùng Badge Section 4.
- **Expected:** 1. Không có phản hồi (không mở menu, không toast); Badge read-only thuần (AC6).
- **Note:** Business rule — Read-only

#### TC_138 — [Read-only scope] Kiểm tra toàn bộ Chi tiết read-only, không có CTA
- **Pre:** Đang ở Chi tiết.
- **Steps:** 1. Quan sát toàn màn.
- **Expected:** 1. Không có nút "Hủy lịch" / "Chỉnh sửa" / "Tạo mới" / bất kỳ CTA nào; chỉ có nút Back và gesture pull-to-refresh (Section 1 Out of scope + Section 2.2).
- **Note:** Business rule — Out of scope

#### TC_139 — [Copy-to-clipboard] Kiểm tra field read-only không hỗ trợ copy (assumption Q20)
- **Pre:** Đang ở Chi tiết.
- **Steps:** 1. Long-press/tap và giữ vào field bất kỳ (ví dụ Mã thủ tục).
- **Expected:** 1. Không hiện menu copy-to-clipboard (giả định Q20).
- **Note:** Assumption

#### TC_140 — [Pull to refresh] Kiểm tra pull-to-refresh trên Chi tiết → refresh dữ liệu
- **Pre:** Đang ở Chi tiết.
- **Steps:** 1. Kéo xuống từ đầu màn. 2. Quan sát hiển thị.
- **Expected:** 2.\n- Spinner hiển thị ở đầu màn.\n- App gọi API chi tiết.\n- Cập nhật 5 section.\n- Ẩn spinner (AC12, CMR-13).
- **Note:** Happy

#### TC_141 — [Error — Network] Kiểm tra mất mạng (Chi tiết) → message + Thử lại
- **Pre:** Tắt mạng.
- **Steps:** 1. Tap 1 card. 2. Quan sát hiển thị trên Chi tiết.
- **Expected:** 2. "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại" (CMR-07).
- **Note:** Error

#### TC_142 — [Error — HTTP 500] Kiểm tra lỗi 500 (Chi tiết) → không có Thử lại
- **Pre:** Simulate API chi tiết trả 500.
- **Steps:** 1. Tap 1 card.
- **Expected:** 1. Hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." — KHÔNG có nút Thử lại.
- **Note:** Error

#### TC_143 — [Error — HTTP 404] Kiểm tra lịch hẹn không tồn tại → toast + back về Danh sách
- **Pre:** Simulate API chi tiết trả HTTP 404 (record bị xóa).
- **Steps:** 1. Tap 1 card.
- **Expected:** 1. Hiển thị "Nội dung không tồn tại hoặc đã bị xóa." → app tự quay về Danh sách.
- **Note:** Error — 404

#### TC_144 — [Error — Timeout] Kiểm tra timeout > 10s (Chi tiết) → message + Thử lại
- **Pre:** Simulate API chi tiết mất > 10s.
- **Steps:** 1. Tap 1 card. 2. Chờ qua 10s.
- **Expected:** 2. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại" (CMR-16).
- **Note:** Error

#### TC_145 — [Error — 401 Expired] Kiểm tra 401 + refresh expired trên Chi tiết → redirect login
- **Pre:** Đang ở Chi tiết; simulate token expired.
- **Steps:** 1. Pull-to-refresh trên Chi tiết.
- **Expected:** 1. Toast "Phiên đăng nhập hết hạn."; redirect về màn [Đăng nhập] (AC16).
- **Note:** Error — Session expired

#### TC_146 — [i18n Chi tiết] Kiểm tra text cứng label 5 section đổi theo ngôn ngữ
- **Pre:** Đang ở Chi tiết ngôn ngữ VI.
- **Steps:** 1. Đổi ngôn ngữ sang EN. 2. Quay lại Chi tiết.
- **Expected:** 2.\n- Label các field ("Mã thủ tục", "Tên thủ tục", "Lĩnh vực", ...) đổi sang EN.\n- Text động từ API (giá trị Tên thủ tục, Lĩnh vực, Ghi chú, v.v.) giữ nguyên ngôn ngữ gốc (AC20, CMR-17).
- **Note:** i18n

#### TC_147 — [A11y Screen reader] Kiểm tra VoiceOver/TalkBack đọc được 5 section
- **Pre:** Bật screen reader.
- **Steps:** 1. Mở Chi tiết. 2. Vuốt/điều hướng qua 5 section.
- **Expected:** 2. Mỗi field (label + giá trị) được đọc đầy đủ (AC21).
- **Note:** Accessibility

---

### 2.3. Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

#### TC_148 — Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- **Steps:** 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- **Expected:** 1. Hiển thị đúng độ dài tối đa

#### TC_149 — Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng
- **Steps:** 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng
- **Expected:** 1. Không xảy ra lỗi bất thường

#### TC_150 — Kiểm tra tính nhất quán của các thông báo
- **Steps:** 1. Kiểm tra tính nhất quán của các thông báo
- **Expected:** 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình

#### TC_151 — Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- **Expected:** 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_152 — Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- **Expected:** 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_153 — Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang
- **Steps:** 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc
- **Expected:** 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_154 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- **Expected:** 1. Giao diện không bị vỡ

#### TC_155 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- **Steps:** 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- **Expected:** 1. Giao diện không bị vỡ

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

#### TC_156 — Xác nhận hiển thị khi người dùng chạm vào nút [Quay lại] trên thiết bị Android
- **Steps:** 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị
- **Expected:** 3. Quay lại màn hình trước đó

#### TC_157 — Xác nhận hiển thị khi người dùng vuốt từ trái sang phải trên thiết bị iOS
- **Steps:** 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị
- **Expected:** 3. Quay lại màn hình trước đó

#### TC_158 — Xác nhận hiển thị khi người dùng tắt và mở lại ứng dụng
- **Steps:** 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị
- **Expected:** 4. Ứng dụng mở lại từ trạng thái ban đầu

#### TC_159 — Kiểm tra chế độ đa nhiệm (multitasking)
- **Steps:** 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị
- **Expected:** 4. Ứng dụng giữ nguyên ở trạng thái hiện tại

#### TC_160 — Xác nhận hiển thị khi khóa và mở khóa màn hình thiết bị
- **Steps:** 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị
- **Expected:** 4. Giữ nguyên trạng thái hiện tại của ứng dụng

#### TC_161 — Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh)
- **Steps:** Tiền điều kiện: Màn hình hỗ trợ pull-to-refresh\n1. Người dùng ở màn Chi tiết\n2. Kéo xuống để làm mới
- **Expected:** 2. Hiển thị dữ liệu chi tiết mới nhất

#### TC_162 — Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more)
- **Note:** N/A — Màn Chi tiết không hỗ trợ lazy load (chỉ Danh sách hỗ trợ).

#### TC_163 — Kiểm tra phản hồi khi thiết bị nhận thông báo từ ứng dụng khác
- **Steps:** Tiền điều kiện: Ứng dụng khác được phép gửi thông báo\n1. Mở Chi tiết\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị
- **Expected:** 3. Không có lỗi nào xảy ra













---

## Requirement Traceability Matrix (RTM)

Liên kết **22 AC** trong UC42-44 v2 với các Test Case tương ứng.

| AC ID | Tiêu chí chấp nhận (tóm tắt) | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | 6 tab cố định đúng thứ tự, default "Tất cả" | TC_007, TC_008, TC_028, TC_029 | Covered |
| AC2 | Giữ tab + scroll + search + filter khi quay lại từ chi tiết | TC_078, TC_079, TC_080, TC_081 | Covered |
| AC3 | Card hiển thị đủ 3 icon + data; null → "-" | TC_009, TC_012 | Covered |
| AC4 | Sort theo "Thời gian đặt" giảm dần | TC_031 | Covered |
| AC5 | Chi tiết có 5 section, khớp 100% API; "Thời gian đặt" nhất quán | TC_117, TC_119–TC_123, TC_133–TC_136 | Covered |
| AC6 | Badge đúng màu follow UI design | TC_015, TC_122, TC_137 | Covered |
| AC7 | Filter Lĩnh vực + DVC độc lập, Áp dụng đúng | TC_047, TC_051–TC_055, TC_057 | Covered |
| AC8 | Active filter indicator xanh lá | TC_006, TC_058, TC_059 | Covered |
| AC9 | Search debounce 3s, fuzzy, max 500 chars, scope toàn tab | TC_032–TC_037, TC_040 | Covered |
| AC10 | Xóa keyword → reset về mặc định | TC_042 | Covered |
| AC11 | Pull-to-refresh Danh sách | TC_073, TC_074, TC_075 | Covered |
| AC12 | Pull-to-refresh Chi tiết | TC_140 | Covered |
| AC13 | Lazy load 20 records/lần | TC_065–TC_068 | Covered |
| AC14 | Lazy load fail retry 3 lần + dừng + pull-reload | TC_070, TC_071, TC_072 | Covered |
| AC15 | Error messages đúng nội dung theo CMR-07 | TC_084, TC_085, TC_086, TC_091, TC_141, TC_142, TC_144 | Covered |
| AC16 | 401 + refresh expired → redirect login + toast | TC_089, TC_090, TC_145 | Covered |
| AC17 | First-load full-screen overlay | TC_003, TC_076, TC_118 | Covered |
| AC18 | Giữ search/filter khi back từ Chi tiết | TC_080, TC_081 | Covered |
| AC19 | Reset search/filter khi chuyển tab | TC_082 | Covered |
| AC20 | i18n text cứng đổi, text động giữ nguyên | TC_093–TC_097, TC_146 | Covered |
| AC21 | Screen reader Header + Card + Sections | TC_098, TC_147 | Covered |
| AC22 | Contrast / font-size / touch target theo UI design | Verify theo UI design trong từng TC UI/UX (TC_001, TC_117) | Covered |

**Coverage Summary:** 22/22 AC — **100% AC coverage**.

---

## Out-of-Scope Items

| Area | Reason |
|---|---|
| API endpoint testing (request/response backend) | API thuộc provider bên thứ ba (project-context.md 4.1) |
| API Performance / Load / Stress | Defer backend team |
| Security server-side (auth backend, token signing, SSL cert) | Defer security specialist |
| Push notification deep-link (Q17) | Thuộc UC258-259 |
| Badge color exact mapping (Q2) | Design chưa chốt — ghi "follow UI design" |
| Device compatibility matrix min version (Q29) | Project-level spec |
| Offline cache hit/miss (Q30) | Giả định không cache |

---

## Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| Draft v1 | 2026-05-08 | qc-tc-design-MOBILE | First draft. 163 test cases (TC_001-TC_163): Section 1 Danh sách (116 TC) + Section 2 Chi tiết (47 TC). RTM 22/22 AC covered. |
