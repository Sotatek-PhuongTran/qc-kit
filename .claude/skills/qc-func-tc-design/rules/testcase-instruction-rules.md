# Testcase Instruction Rules

> **Cách viết (văn phong, chống mã trần, bảng quy đổi thuật ngữ EN→VI, cổng tự kiểm trước khi lưu):** `.claude/rules/qc-writting-rules.md` — đọc BẮT BUỘC trước khi draft.
> **Mẫu chuẩn ("gold example"):** `references/Testcase-refer-vi.md` (VI) / `references/Testcase-refer-en.md` (EN).
> File này quy định: chọn ngôn ngữ output, encoding xlsx, layout sheet, và **format từng trường test case** (C1–C6).

## 0. Output Language Selection (READ FIRST)

Test case là **tài liệu chính thức release theo dự án** (nhóm 2 của luật ngôn ngữ 2 nhóm trong `.claude/rules/qc-writting-rules.md`) → viết theo **ngôn ngữ dự án**, đọc từ `project-context-master` §3.0 field **"Project language"** TRƯỚC khi áp dụng bất kỳ rule nào:

- `Vietnamese` → output **Vietnamese**, dùng `references/Testcase-refer-vi.md` làm mẫu.
- `English` → output **English**, dùng `references/Testcase-refer-en.md` làm mẫu.

Chỉ chấp nhận **Vietnamese hoặc English**; field thiếu/giá trị khác → DỪNG, hỏi user chọn 1 trong 2. KHÔNG trộn ngôn ngữ trong cùng file.

---

## Part A — Encoding (MANDATORY)

> Scope: VI output áp dụng A1+A2+A3; EN output áp dụng A2+A3.

**A1 — Forbidden transformations.** KHÔNG dùng trên chuỗi tiếng Việt trước khi ghi xlsx:
- `unicodedata.normalize('NFD', s).encode('ascii', 'ignore')` — mất dấu
- `unidecode(s)` / `text_unidecode(s)` — mất dấu
- Bảng thay thế tay (`'à' → 'a'`, `'Đ' → 'D'`)
- `.encode('latin-1'/'cp1252', 'ignore')` — hỏng ký tự
- Bất kỳ thư viện transliterate nào

**A2 — Dùng converter chung; KHÔNG viết script mới.** xlsx sinh bằng `scripts/md_to_xlsx.py`, gọi từ `workflows/convert-md-to-xlsx.md`. Script là UTF-8, đọc/ghi Unicode, tự verify. Nếu phải mở rộng script, giữ các thuộc tính này — không thêm `# -*- coding: cp1252 -*-`, không normalize/transliterate.

**A3 — Self-verify trước khi giao.** Sau khi sinh xlsx, mở và spot-check ≥3 dòng có ký tự non-ASCII. Nếu thấy: tiếng Việt mất dấu (VI), ô `?`, mojibake (`Ä\x90`, `Ã©`), hay ký tự lệch nguồn → STOP, sửa script, sinh lại.

---

## Part B — Sheet Layout & Section Headers (MANDATORY)

**Cột** (khớp template `Test cases` sheet, pin theo chữ cái cột):
`A=ID_TC | B=Test Title/Summary | C=Pre-conditions | D=Step | E=Expected Result | F=Priority`

**Trong section GUI, sắp theo 4 nhóm:**
1. **Khởi tạo màn hình** — render ban đầu, trạng thái mặc định, rỗng/có dữ liệu của mọi đối tượng.
2. **Tương tác từng đối tượng** — mọi đối tượng UI: click được, trạng thái mặc định, list giá trị, khả dụng/vô hiệu, gợi ý nhập.
3. **Ca UI chung** — trình duyệt/bàn phím: F5/Refresh, Back/Next, Tab/Shift+Tab, Enter, Backspace, zoom, nhất quán message.
4. **Đối chiếu UI vs thiết kế** — vị trí, màu (HEX), spacing, cỡ chữ, responsive.

**Trong section FUNC, sắp theo luồng logic:** luồng thành công trước → kiểm tra hợp lệ → ca lỗi/ngoại lệ.

**Phân cấp (số La Mã I, II, III… — một cho mỗi màn / sub-UC):**

| Cấp | VI pattern | EN pattern |
|---|---|---|
| Màn hình | `<La Mã>. Màn hình: <tên màn>` | `<Roman>. Screen: <screen name>` |
| Section GUI | `<La Mã>.1. Kiểm tra UI/UX của màn hình: <tên màn>` | `<Roman>.1. UI/UX verification — Screen: <screen name>` |
| Section FUNC | `<La Mã>.2. Kiểm tra FUNC của màn hình: <tên màn>` | `<Roman>.2. Functional verification — Screen: <screen name>` |

- Header text vào cột **B**; các cột khác trên dòng header để trống. Header KHÔNG tính là test case (không tiêu tốn số `TC_XXX`).
- Tên màn trong header PHẢI khớp tên màn ở Section 4 của audited; không paraphrase, không dịch.

---

## Part C — Format từng trường test case

> Mọi nội dung tuân theo `.claude/rules/qc-writting-rules.md` (đặc biệt R2 chống mã trần, R3 thuật ngữ, R4 vùng). Tham chiếu mẫu ở `Testcase-refer-*.md`.

### C1 — Title (tiêu đề)

- Bắt đầu bằng **động từ kiểm tra**: `Kiểm tra` / `Đảm bảo` (VI); `Verify` / `Confirm` / `Check` / `Ensure` (EN).
- **Pattern BẮT BUỘC:** `Động từ kiểm tra + đối tượng/chức năng/luồng + TRẠNG THÁI + ngữ cảnh (nếu có)`.
- ⚠️ **Phần TRẠNG THÁI gần như luôn bắt buộc** — đây là lỗi rớt thường gặp nhất. Checklist trước khi chốt mỗi tiêu đề:
  - [ ] Đã nêu trạng thái/điều kiện? (khởi tạo / mặc định / khi để trống / thành công / thất bại khi <điều kiện>)
  - [ ] Đối tượng gọi bằng **tên người-đọc-hiểu** (Element name), KHÔNG dùng mã màn (`SCR-...`) hay mã vùng (`Vùng A`) trần?
- Ví dụ:
  - ✅ `Kiểm tra trạng thái khởi tạo của trang Tạo tài khoản admin khi mở từ Danh sách admin`
  - ✅ `Kiểm tra tạo admin thất bại khi để trống trường "Email"`
  - ❌ `Kiểm tra hiển thị Bộ chuyển ngôn ngữ` (thiếu trạng thái)
  - ❌ `Kiểm tra màn hình khởi tạo: variant patient-first` (dùng mã/khái niệm kỹ thuật thay tên màn)

### C2 — Pre-conditions

- Thì hiện tại đơn. **MỖI điều kiện một dòng riêng**, phân tách bằng `<br>` trong ô — KHÔNG gộp nhiều điều kiện vào một câu bằng dấu `;`.
- Pattern mỗi dòng: `Hệ thống/Chủ thể + đang + trạng thái + ngữ cảnh (nếu có)`.
- Ví dụ (ô có 3 điều kiện):<br>`Trang quên mật khẩu đang mở`<br>`Email khớp một tài khoản đang hoạt động`<br>`Dịch vụ email giả lập trả lỗi (timeout / mất kết nối)`
- Mỗi dòng là một điều kiện độc lập, kiểm được riêng.

### C3 — Test Steps (từ vựng nhất quán — MANDATORY)

- Mỗi bước một hành động. Pattern: `Động từ + mô tả dữ liệu (nếu có) + tên đối tượng UI`.
- **Động từ = canonical VI** trong bảng chuẩn kit `.claude/config/action-verbs.md` (`Nhập`, `Nhấn`, `Chọn`, `Tích`, `Xóa`, `Tải lên`, `Truy cập`, `Kiểm tra hiển thị`, `Di chuột`, `Nhấn phím`, `Rời ô`...). **Alias** (bấm, gõ, điền, ấn) chỉ để nhận diện — KHÔNG được viết ra. Động từ chưa có trong bảng → xử lý theo quy tắc 3 của `action-verbs.md` (đánh dấu + đề xuất bổ sung, không tự do im lặng).
- **Đối tượng UI = tên phần tử theo bảng kiểm kê §4 của audited report** (Bảng A/B của màn hình tương ứng), đặt trong ngoặc kép; nhãn hiển thị trích **nguyên văn**. Không bịa tên, không paraphrase nhãn audited.
  - ✅ `Nhập email hợp lệ vào "Trường nhập email"`
  - ❌ `Bấm vào nút "Gửi"` (động từ lệch chuẩn file + nhãn không có trong audited §4)
- **Thiếu phần tử trong §4:** nếu bước cần một phần tử không có trong audited §4, skill DỪNG và yêu cầu bổ sung audited report (re-audit `/qc-uc-read`). KHÔNG tự bịa phần tử.

### C4 — Expected Result

- **Bắt đầu bằng số bước** (vd `2. ...`) — ứng với bước tạo ra kết quả.
- Mô tả **trạng thái thay đổi quan sát được trên UI**:
  - message hiển thị → trích **đủ nguyên văn** trong ngoặc kép `"..."`;
  - popup / màn mở hoặc đóng;
  - trạng thái trường (khả dụng / vô hiệu / gợi ý nhập / cho sửa);
  - quy tắc hiển thị (thứ tự sắp xếp, màu);
  - phản ứng hệ thống (cho nhập / chặn nhập / điều hướng).
- **Pattern:** `<số bước>. <chủ thể> + <trạng thái mới / kết quả quan sát được> (+ "message nguyên văn" nếu có)`.
- KHÔNG viết chung chung ("hệ thống hoạt động đúng"). KHÔNG viết kết quả từ API hay database — chỉ những gì quan sát được qua giao diện.
- Mọi tham chiếu đối tượng trong Expected Result cũng dùng `Element name` trong ngoặc kép.
- **TỰ CHỨA — KHÔNG tham chiếu test case khác.** Tuyệt đối không viết `như TC_033`, `giống TC_X`, `tương tự`, `cùng ... như TC_...`. Mỗi test case phải đọc-hiểu độc lập (chuyển sang test script mỗi TC chạy riêng).
- **Trích ĐỦ NGUYÊN VĂN message**, không mô tả gián tiếp. Viết hẳn `"Hệ thống đã gửi liên kết đặt lại mật khẩu."` — KHÔNG viết "thông báo thành công" suông, càng KHÔNG viết "thông báo như TC_033".
- Tránh từ mơ hồ/so sánh: `như`, `giống`, `tương tự`, `cùng ... như`. Nếu hai TC có cùng kết quả, vẫn phải viết lại đầy đủ kết quả đó ở mỗi TC.

### C5 — Data handling & UI notation

- KHÔNG hardcode giá trị cụ thể (đường dẫn, tên tài khoản, dữ liệu thật) vào bất kỳ phần nào. Dùng tên/nhãn logic; cần ví dụ thì ghi trong ngoặc đơn ngay sau tên đối tượng.
  - ✅ `Nhập một email hợp lệ (vd `user@org.vn`) vào "Trường nhập email"`
  - ❌ `Nhập "admin123" vào trường Username` · ❌ `Tải file từ "D:\test_data\image.png"`
- **Ngoặc kép `"..."`** cho: nút, menu, tab, icon, nhãn, gợi ý nhập, giá trị nhập, giá trị đã chọn — và mọi `Element name`.
- **TUYỆT ĐỐI không có mã trong 5 trường nội dung** (Title, Pre-condition, Step, Expected Result, và giá trị) — kể cả trong ngoặc: `CRULE-`, `AC-`, `BR-`, `R-`, `Q-`, `EF 6x`, `SCR-`, `Vùng X`. **Lý do:** bước chuyển test case sang test script sẽ **vỡ** khi gặp mã. (Đây là điểm KHÁC báo cáo audited: báo cáo cho người đọc được phép để mã trong ngoặc theo `qc-writting-rules.md` R2; test case thì KHÔNG.)
- Khi audited giải thích hành vi kèm một mã (vd "đối chiếu không phân biệt hoa thường (CRULE-004)"), chỉ viết **hành vi bằng lời** ("đối chiếu email không phân biệt hoa thường"), BỎ mã đi.
- Mã chỉ được xuất hiện ở **RTM (ma trận truy vết)** và cột truy vết — KHÔNG bao giờ trong nội dung TC.
- Đối tượng UI luôn gọi bằng tên (`Element name`) trong ngoặc kép.


### C6 — Priority (Critical / High / Medium / Low)

Thang priority 4 mức chuẩn của kit — **đây là nhà chính**, mọi file khác (kể cả nhánh API) trỏ về mục này. Gán theo **mức ảnh hưởng nghiệp vụ × tần suất thực tế** — KHÔNG dồn mọi case vào Critical/High. Một bộ TC thực tế phải trải đều các mức (giữ kỷ luật phân bổ: nhóm ca hiếm/UI tĩnh chiếm phần đáng kể ở Low).

| Mức | Khi nào | Ví dụ |
|---|---|---|
| **Critical** | Chặn luồng nghiệp vụ chính / mất-hỏng dữ liệu / lỗ hổng bảo mật. Tập các ca Critical = bộ smoke của UC | Gửi liên kết đặt lại thành công; lưu mật khẩu thành công; không công nhận kết quả khi ghi nhật ký kiểm toán lỗi; phản hồi trung lập tránh dò tài khoản; vô hiệu liên kết sau khi dùng |
| **High** | Logic nghiệp vụ chính: validation chặn nghiệp vụ, thông báo lỗi nghiệp vụ, trạng thái nút theo điều kiện | Báo lỗi email trống / sai định dạng; nút Gửi vô hiệu khi email chưa hợp lệ; lỗi xác nhận mật khẩu không trùng |
| **Medium** | Validation phụ / luồng phụ / thông báo — chức năng phụ, hiển thị có ý nghĩa nghiệp vụ | Chuyển ngôn ngữ VN/EN; nội dung email biến thể A |
| **Low** | UI-cosmetic / ca biên hiếm / hành vi người dùng hiếm thực hiện và **KHÔNG ảnh hưởng logic** | Giá trị biên độ dài hiếm gặp; hiển thị tiêu đề thẻ / dòng hướng dẫn / logo / footer tĩnh; thứ tự tiêu điểm Tab / Shift+Tab; phóng to / thu nhỏ (zoom); F5 / refresh; back / next trình duyệt; con trỏ đổi thành pointer khi rê chuột |

- Nhóm GUI "Ca UI chung" (bàn phím/trình duyệt) và "đối chiếu UI tĩnh" mặc định **Low**, trừ khi tác động trực tiếp nghiệp vụ.
- **Migration (file TC cũ dùng thang 5 mức):** P1→Critical, P2→High, P3→Medium, P4 và P5→Low — chỉ áp khi update một file TC cũ; không đổi ID, ghi chú migration trong report.

---

## Cổng tự kiểm test case (BẮT BUỘC trước khi ghi md)

Ngoài cổng chung `.claude/rules/qc-writting-rules.md` §5, quét thêm:

- [ ] **Pre-condition:** mỗi điều kiện một dòng (`<br>`), không gộp bằng `;` (C2).
- [ ] **Không tham chiếu TC khác** (`như/giống/tương tự TC_...`); mỗi message trích **đủ nguyên văn** (C4).
- [ ] **Không có mã** (`CRULE-/AC-/BR-/R-/Q-/EF/SCR-/Vùng X`) trong Title / Pre-condition / Step / Expected Result — chỉ nằm ở RTM (C5).
- [ ] **Tiêu đề có TRẠNG THÁI** (C1).
- [ ] **Priority trải đều** theo thang Critical/High/Medium/Low, các ca bàn phím/zoom/refresh/UI tĩnh để **Low** (C6) — không để tất cả Critical/High.
