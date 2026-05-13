# UC60-61 Chatbot Trợ lý Đầu Tư — Test Cases Draft

**Ngày tạo:** 12/05/2026  
**Tác giả:** QC Agent  
**Source:** UC60-61_Chatbot.md (v1.2), UC60-61_chatbot_audited_20260512_v1.md, UC60-61_chatbot_scenarios_20260512.md

---

## Section Group 1: Màn hình Chatbot — Trạng thái Welcome

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_001 | Kiểm tra UI/UX màn hình Welcome | Đăng nhập thành công. Mở Chatbot từ Sidebar → "Chatbot hỗ trợ" | 1. Kiểm tra hiển thị màn hình Welcome | 1. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design (Tham khảo ảnh UC60. Màn hình Welcome sheet WFDesign):\n- Header: nền đỏ đậm, icon avatar bot (tròn), tiêu đề "Trợ lý Đầu Tư" (bold, trắng), subtitle "Đang hoạt động" (nhỏ, trắng/xám nhạt)\n- Nút Quay lại (←) góc trái header\n- Avatar bot lớn: tròn, nền hồng nhạt, icon robot đỏ đậm, căn giữa\n- Tiêu đề chào mừng: "Chào mừng bạn đến với Trợ lý Đầu Tư." (bold, căn giữa)\n- "Bạn cần hỗ trợ gì?" (căn giữa, đen/xám đen)\n- Mô tả năng lực bot (font nhỏ, xám, căn giữa, full text)\n- Bubble chào: bên trái, nền xám nhạt, bo góc\n- Chip gợi ý: nền trắng, viền đỏ nhạt, chữ đỏ đậm, bo góc\n- Input bar: cố định cuối màn hình, placeholder "Nhập câu hỏi về đầu tư...", nền xám nhạt, bo góc pill |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_002 | [Chip gợi ý] Kiểm tra hiển thị chip từ API | Đăng nhập thành công. Mở Chatbot. API trả về danh sách chip | 1. Kiểm tra hiển thị vùng chip gợi ý | 1. Danh sách chip hiển thị đúng nội dung từ API (dynamic, không hard-code). Số lượng chip linh hoạt theo response |
| TC_003 | [Chip gợi ý] Kiểm tra khi API không trả về chip | Đăng nhập thành công. Mở Chatbot. API trả về danh sách chip rỗng (0 items) | 1. Kiểm tra hiển thị vùng chip gợi ý | 1. Không hiển thị vùng chip gợi ý. Các thành phần Welcome còn lại hiển thị bình thường |
| TC_004 | [Chip gợi ý] Kiểm tra tap chip → gửi câu hỏi ngay lập tức | Đăng nhập thành công. Mở Chatbot. Chip gợi ý hiển thị | 1. Tap vào 1 chip gợi ý | 1. Câu hỏi tương ứng được gửi ngay (không cần bấm nút Gửi)\n- Bubble người dùng hiển thị bên phải với nội dung chip\n- Vùng Welcome ẩn\n- Hội thoại bắt đầu |
| TC_005 | [Chip gợi ý] Kiểm tra debounce khi tap nhanh liên tục | Đăng nhập thành công. Mở Chatbot. Chip gợi ý hiển thị | 1. Tap nhanh liên tục (double/triple tap) vào 1 chip gợi ý | 1. App chỉ nhận action đầu tiên, bỏ qua các tap tiếp theo cho đến khi xử lý hoàn tất. Chỉ gửi 1 câu hỏi duy nhất |
| TC_006 | [Ô nhập liệu] Kiểm tra tap vào ô → bàn phím hiển thị | Đăng nhập thành công. Mở Chatbot | 1. Tap vào ô nhập liệu | 1. Bàn phím hiển thị, con trỏ nhấp nháy trong ô. Placeholder "Nhập câu hỏi về đầu tư..." hiển thị |
| TC_007 | [Ô nhập liệu] Kiểm tra nhập 500 ký tự (BVA - boundary) | Đăng nhập thành công. Mở Chatbot. Tap vào ô nhập liệu | 1. Nhập đúng 500 ký tự vào ô | 1. App chấp nhận toàn bộ 500 ký tự. Không cho phép nhập thêm ký tự mới |
| TC_008 | [Ô nhập liệu] Kiểm tra nhập 499 ký tự (BVA - below boundary) | Đăng nhập thành công. Mở Chatbot. Tap vào ô nhập liệu | 1. Nhập 499 ký tự vào ô | 1. App chấp nhận 499 ký tự. Vẫn cho phép nhập thêm 1 ký tự nữa |
| TC_009 | [Ô nhập liệu] Kiểm tra nhập 501 ký tự (BVA - above boundary) | Đăng nhập thành công. Mở Chatbot. Tap vào ô nhập liệu | 1. Nhập 501 ký tự vào ô | 1. App chỉ chấp nhận 500 ký tự đầu tiên. Ký tự thứ 501 bị block, không nhập được |
| TC_010 | [Ô nhập liệu] Kiểm tra hiển thị tối đa 5 dòng | Đăng nhập thành công. Mở Chatbot. Tap vào ô nhập liệu | 1. Nhập nội dung 5 dòng\n2. Nhập thêm dòng thứ 6 | 1. Ô hiển thị đầy đủ 5 dòng\n2. Ô không mở rộng thêm, nội dung cuộn được bên trong (scroll nội bộ) |
| TC_011 | [Ô nhập liệu] Kiểm tra chấp nhận mọi loại ký tự (EP) | Đăng nhập thành công. Mở Chatbot. Tap vào ô nhập liệu | 1. Nhập chữ Latin: "Hello"\n2. Nhập tiếng Việt có dấu: "Xin chào"\n3. Nhập CJK: "中文日本語한국어"\n4. Nhập emoji: "😀🎉"\n5. Nhập ký tự đặc biệt: "!@#$%^&*"\n6. Nhập số: "12345" | 1-6. Tất cả các loại ký tự đều được chấp nhận và hiển thị đúng trong ô nhập liệu |
| TC_012 | [Ô nhập liệu] Kiểm tra tap ra ngoài (out-tap) → bàn phím đóng | Đăng nhập thành công. Mở Chatbot. Ô nhập liệu đang focus, có nội dung "Test" | 1. Tap ra ngoài ô nhập liệu (vùng trống trên màn hình) | 1. Bàn phím đóng lại. Ô mất focus. Nội dung "Test" đã nhập được giữ nguyên |
| TC_013 | [Ô nhập liệu] Kiểm tra nhập chỉ khoảng trắng | Đăng nhập thành công. Mở Chatbot. Tap vào ô nhập liệu | 1. Nhập chỉ spaces/tabs vào ô\n2. Kiểm tra nút Gửi | 2. Nút Gửi không xuất hiện (sau auto-trim giá trị rỗng → coi như input rỗng) |
| TC_014 | [Nút Gửi] Kiểm tra ẩn khi ô trống, hiện khi có nội dung | Đăng nhập thành công. Mở Chatbot | 1. Kiểm tra nút Gửi khi ô trống\n2. Nhập 1 ký tự vào ô\n3. Xóa hết ký tự | 1. Nút Gửi ẩn\n2. Nút Gửi xuất hiện (icon paper plane, nền tròn đỏ đậm)\n3. Nút Gửi ẩn lại |
| TC_015 | [Nút Quay lại] Kiểm tra tap → quay về màn hình trước | Đăng nhập thành công. Mở Chatbot từ Sidebar. Đang ở trạng thái Welcome | 1. Tap nút Quay lại (←) ở góc trái header | 1. App quay về màn hình trước đó (Sidebar/Trang chủ) |
| TC_016 | [Entry point] Kiểm tra mở Chatbot từ Sidebar | Đăng nhập thành công. Ở Trang chủ | 1. Mở Sidebar\n2. Tap "Chatbot hỗ trợ" | 2. App điều hướng đến màn hình Chatbot, hiển thị trạng thái Welcome |
| TC_017 | [Entry point] Kiểm tra mở Chatbot từ Floating Widget | Đăng nhập thành công. Ở Trang chủ | 1. Tap Floating Widget trên Trang chủ | 1. App điều hướng đến màn hình Chatbot, hiển thị trạng thái Welcome |

---

## Section Group 2: Màn hình Chatbot — Trạng thái Hội thoại

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_018 | Kiểm tra UI/UX màn hình Hội thoại | Đăng nhập thành công. Mở Chatbot. Đã gửi 1 câu hỏi và nhận phản hồi | 1. Kiểm tra hiển thị màn hình Hội thoại | 1. Hiển thị đầy đủ layout giống Design (Tham khảo ảnh Các khung chat sheet WFDesign):\n- Vùng Welcome đã ẩn hoàn toàn\n- Bubble người dùng: bên phải, nền xám nhạt, bo góc\n- Bubble bot: bên trái, nền trắng/xám nhạt, bo góc\n- Thanh đánh giá dưới mỗi bubble bot: nhãn "Đánh giá câu trả lời:" (đỏ đậm) + 2 icon 👍 👎 (xám)\n- Input bar cố định cuối màn hình |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_019 | [Gửi câu hỏi] Kiểm tra luồng chính gửi và nhận phản hồi | Đăng nhập thành công. Mở Chatbot. Đang ở trạng thái Welcome | 1. Nhập "Thủ tục đầu tư là gì?" vào ô\n2. Tap nút Gửi | 1. Nút Gửi xuất hiện (paper plane đỏ)\n2.\n- Bubble người dùng hiển thị ngay bên phải: "Thủ tục đầu tư là gì?"\n- Vùng Welcome ẩn\n- Ô nhập liệu xóa trắng\n- Bàn phím giữ nguyên (không đóng)\n- Nút Gửi chuyển Loading (spinner xám)\n- Typing Indicator (3 chấm nhảy) hiển thị bên trái\n- Sau khi nhận phản hồi: Typing Indicator ẩn → Bubble bot hiển thị bên trái → Nút Gửi về bình thường |
| TC_020 | [Nút Gửi] Kiểm tra trạng thái Loading — không gửi thêm được | Đăng nhập thành công. Mở Chatbot. Đã gửi câu hỏi, nút Gửi đang Loading | 1. Tap vào nút Gửi (đang spinner) | 1. Không có phản hồi. Nút không nhận thêm lệnh gửi mới |
| TC_021 | [Ô nhập liệu] Kiểm tra vẫn nhập được khi đang Loading | Đăng nhập thành công. Mở Chatbot. Đã gửi câu hỏi, nút Gửi đang Loading | 1. Nhập nội dung mới vào ô nhập liệu khi đang Loading | 1. Ô nhập liệu vẫn cho phép nhập ký tự bình thường. Nhưng không thể gửi tin nhắn mới |
| TC_022 | [Ô nhập liệu] Kiểm tra nội dung mới giữ nguyên sau khi bot phản hồi | Đăng nhập thành công. Mở Chatbot. Gửi câu hỏi → đang Loading → nhập thêm "câu hỏi tiếp" vào ô | 1. Chờ bot phản hồi xong\n2. Kiểm tra ô nhập liệu | 2. Nội dung "câu hỏi tiếp" vẫn còn trong ô nhập liệu (không bị xóa) |
| TC_023 | [Bàn phím] Kiểm tra giữ nguyên sau khi gửi thành công | Đăng nhập thành công. Mở Chatbot. Bàn phím đang hiển thị | 1. Nhập câu hỏi\n2. Tap Gửi\n3. Kiểm tra bàn phím | 3. Bàn phím vẫn giữ nguyên (không đóng). Ô nhập liệu xóa trắng |
| TC_024 | [Typing Indicator] Kiểm tra hiển thị và ẩn đúng thời điểm | Đăng nhập thành công. Mở Chatbot | 1. Gửi câu hỏi\n2. Kiểm tra Typing Indicator\n3. Chờ bot phản hồi | 2. Typing Indicator (3 chấm nhảy) hiển thị trong bubble trái\n3. Typing Indicator tự động ẩn khi phản hồi được nhận và hiển thị |
| TC_025 | [Bubble người dùng] Kiểm tra hiển thị tin nhắn dài | Đăng nhập thành công. Mở Chatbot | 1. Gửi câu hỏi dài (gần 500 ký tự)\n2. Kiểm tra bubble người dùng | 2. Bubble hiển thị full nội dung, không truncate. Nằm bên phải, nền xám nhạt, bo góc |
| TC_026 | [Bubble bot] Kiểm tra rich text (bold, italic, hyperlink) | Đăng nhập thành công. Mở Chatbot. Bot phản hồi có rich text | 1. Kiểm tra bubble bot có nội dung rich text | 1. Hiển thị đúng: in đậm, in nghiêng, gạch chân, hyperlink gắn vào text. Nằm bên trái, nền trắng/xám nhạt |
| TC_027 | [Bubble] Kiểm tra không hỗ trợ nhấn giữ sao chép | Đăng nhập thành công. Mở Chatbot. Có bubble người dùng và bubble bot | 1. Nhấn giữ bubble người dùng\n2. Nhấn giữ bubble bot | 1. Không hiển thị menu sao chép\n2. Không hiển thị menu sao chép |
| TC_028 | [File đính kèm] Kiểm tra hiển thị file PDF trong bubble bot | Đăng nhập thành công. Mở Chatbot. Bot phản hồi kèm file PDF | 1. Kiểm tra hiển thị file đính kèm\n2. Tap vào file PDF | 1. Hiển thị card: icon file + tên file + nhãn "PDF". Nền trắng, bo góc, viền nhạt\n2. Mở xem trực tiếp trên trình duyệt thiết bị |
| TC_029 | [File đính kèm] Kiểm tra file DOCX → tải xuống | Đăng nhập thành công. Mở Chatbot. Bot phản hồi kèm file DOCX | 1. Tap vào file DOCX trong bubble bot | 1. Tự động tải xuống máy (download) |
| TC_030 | [File đính kèm] Kiểm tra file XLS/XLSX → tải xuống | Đăng nhập thành công. Mở Chatbot. Bot phản hồi kèm file XLSX | 1. Tap vào file XLSX trong bubble bot | 1. Tự động tải xuống máy (download) |
| TC_031 | [File đính kèm] Kiểm tra file lỗi (link hỏng) → Toast | Đăng nhập thành công. Mở Chatbot. Bot phản hồi kèm file có link hỏng | 1. Tap vào file đính kèm bị lỗi | 1. Hiển thị Toast: "Nội dung không tồn tại hoặc đã bị xóa." Không đóng màn hình Chatbot |
| TC_032 | [Auto-scroll] Kiểm tra tự cuộn xuống sau khi bot phản hồi | Đăng nhập thành công. Mở Chatbot. Có nhiều tin nhắn, đang cuộn lên xem lịch sử | 1. Gửi câu hỏi mới\n2. Chờ bot phản hồi xong | 2. Sau khi bubble bot hiển thị xong → màn hình tự cuộn xuống tin nhắn mới nhất (kể cả đang cuộn lên) |
| TC_033 | [Lazy load] Kiểm tra kéo lên đầu tải thêm tin nhắn cũ | Đăng nhập thành công. Mở Chatbot. Có nhiều tin nhắn trong phiên (chưa tải hết) | 1. Kéo lên đầu danh sách tin nhắn | 1. Hiển thị loading indicator ở trên cùng → sau đó tải thêm tin nhắn cũ hiển thị phía trên |
| TC_034 | [Pull-to-Refresh] Kiểm tra kéo xuống refresh khi đã ở trên cùng | Đăng nhập thành công. Mở Chatbot. Đã scroll lên trên cùng, không còn lịch sử cũ hơn | 1. Kéo xuống (pull-to-refresh) | 1. Spinner hiển thị → refresh thành công → cập nhật danh sách tin nhắn |
| TC_035 | [Back] Kiểm tra popup khi có hội thoại | Đăng nhập thành công. Mở Chatbot. Đã gửi ít nhất 1 câu hỏi (có hội thoại) | 1. Nhấn nút Back | 1. Hiển thị popup:\n- Tiêu đề: "Rời khỏi cuộc trò chuyện?"\n- Nội dung: "Đoạn hội thoại không được lưu trữ. Bạn có chắc muốn rời chatbot không?"\n- Nút "Ở lại" (Secondary)\n- Nút "Rời chatbot" (Primary đỏ) |
| TC_036 | [Popup] Kiểm tra tap "Ở lại" → đóng popup | Đăng nhập thành công. Mở Chatbot. Popup "Rời khỏi cuộc trò chuyện?" đang hiển thị | 1. Tap nút "Ở lại" | 1. Popup đóng. Quay lại hội thoại bình thường. Nội dung hội thoại giữ nguyên |
| TC_037 | [Popup] Kiểm tra tap "Rời chatbot" → thoát | Đăng nhập thành công. Mở Chatbot. Popup "Rời khỏi cuộc trò chuyện?" đang hiển thị | 1. Tap nút "Rời chatbot" | 1. App thoát màn hình Chatbot, quay về màn hình trước |
| TC_038 | [Back] Kiểm tra không hiện popup khi ở Welcome | Đăng nhập thành công. Mở Chatbot. Đang ở trạng thái Welcome (chưa gửi câu hỏi nào) | 1. Nhấn nút Back | 1. App thoát trực tiếp, không hiện popup xác nhận |
| TC_039 | [Session] Kiểm tra mở lại Chatbot → Welcome (không lưu lịch sử) | Đăng nhập thành công. Đã mở Chatbot, chat vài tin nhắn, rồi thoát | 1. Mở lại Chatbot | 1. App hiển thị trạng thái Welcome từ đầu. Không có lịch sử phiên trước |
| TC_040 | [Chatbot fallback] Kiểm tra bot không hiểu câu hỏi | Đăng nhập thành công. Mở Chatbot | 1. Gửi câu hỏi mà bot không hiểu (VD: "asdfghjkl") | 1. Bubble bot hiển thị: "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng thử cách khác." Có thanh đánh giá bên dưới |

---

## Section Group 3: Màn hình Chatbot — Đánh giá phản hồi (UC61)

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_041 | [Đánh giá 👍] Kiểm tra tap → animation + trạng thái đã đánh giá | Đăng nhập thành công. Mở Chatbot. Đã nhận phản hồi từ bot. Thanh đánh giá hiển thị 2 icon xám | 1. Tap icon 👍 | 1.\n- Icon 👍 fill đỏ đậm (animation ngắn)\n- 2 icon ẩn đi\n- Hiển thị text: "Bạn đã đánh giá câu trả lời. Đánh giá lại?" ("Đánh giá lại?" là link đỏ đậm)\n- Gửi API đánh giá |
| TC_042 | [Đánh giá 👎] Kiểm tra tap → animation + trạng thái đã đánh giá | Đăng nhập thành công. Mở Chatbot. Đã nhận phản hồi từ bot. Thanh đánh giá hiển thị 2 icon xám | 1. Tap icon 👎 | 1.\n- Icon 👎 fill đỏ đậm (animation ngắn)\n- 2 icon ẩn đi\n- Hiển thị text: "Bạn đã đánh giá câu trả lời. Đánh giá lại?" ("Đánh giá lại?" là link đỏ đậm)\n- Gửi API đánh giá |
| TC_043 | [Đánh giá lại] Kiểm tra tap "Đánh giá lại?" → quay về UI gốc | Đăng nhập thành công. Mở Chatbot. Đã đánh giá 👍. Hiển thị text "Đánh giá lại?" | 1. Tap link "Đánh giá lại?" | 1. App gọi API reset đánh giá → quay về UI gốc: hiển thị lại 2 icon 👍 👎 màu xám |
| TC_044 | [Đánh giá lại] Kiểm tra chọn khác lần trước (👍 → 👎) | Đăng nhập thành công. Mở Chatbot. Đã đánh giá 👍 → tap "Đánh giá lại?" → 2 icon xám hiển thị | 1. Tap icon 👎 | 1. Icon 👎 fill đỏ đậm (animation) → chuyển sang trạng thái đã đánh giá. API gửi giá trị mới (👎) |
| TC_045 | [Đánh giá lại] Kiểm tra chọn giống lần trước (👍 → 👍) | Đăng nhập thành công. Mở Chatbot. Đã đánh giá 👍 → tap "Đánh giá lại?" → 2 icon xám hiển thị | 1. Tap icon 👍 | 1. Icon 👍 fill đỏ đậm (animation) → chuyển sang trạng thái đã đánh giá. Flow hoạt động bình thường |
| TC_046 | [Đánh giá] Kiểm tra gửi đánh giá thất bại → không thay đổi UI | Đăng nhập thành công. Mở Chatbot. Đã nhận phản hồi. Mất kết nối mạng | 1. Tap icon 👍 | 1. Không thay đổi UI (vẫn giữ trạng thái hiện tại). App thử lại ngầm |
| TC_047 | [Đánh giá] Kiểm tra đánh giá nhiều bubble khác nhau | Đăng nhập thành công. Mở Chatbot. Đã gửi 3 câu hỏi, nhận 3 phản hồi | 1. Tap 👍 dưới bubble bot thứ 1\n2. Tap 👎 dưới bubble bot thứ 2\n3. Kiểm tra bubble bot thứ 3 | 1. Bubble 1: chuyển sang "Đã đánh giá"\n2. Bubble 2: chuyển sang "Đã đánh giá"\n3. Bubble 3: vẫn hiển thị 2 icon 👍 👎 xám (chưa đánh giá) |
| TC_048 | [Đánh giá lại] Kiểm tra tap nhiều lần liên tiếp | Đăng nhập thành công. Mở Chatbot. Đã nhận phản hồi | 1. Tap 👍 → "Đánh giá lại?" → Tap 👎 → "Đánh giá lại?" → Tap 👍 | 1. Flow hoạt động ổn định qua nhiều lần reset. Mỗi lần đều chuyển đúng trạng thái |
| TC_049 | [Đánh giá] Kiểm tra bubble fallback cũng có thanh đánh giá | Đăng nhập thành công. Mở Chatbot. Bot trả lời fallback | 1. Kiểm tra thanh đánh giá dưới bubble fallback | 1. Thanh đánh giá hiển thị bình thường (nhãn + 2 icon). Người dùng có thể đánh giá |

---

## Section Group 4: Màn hình Chatbot — Trạng thái Offline

### Check UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_050 | Kiểm tra UI/UX màn hình Offline | Mở Chatbot khi không kết nối được API (offline/lỗi hệ thống) | 1. Kiểm tra hiển thị màn hình Offline | 1. Hiển thị đầy đủ layout giống Design (Tham khảo ảnh Chatbot không hoạt động sheet WFDesign):\n- Header: subtitle đổi thành "Chưa hoạt động"\n- Vùng nội dung: icon wifi gạch chéo (xám, nền tròn xám nhạt, căn giữa)\n- Tiêu đề: "Chatbot tạm thời chưa hoạt động" (bold, căn giữa, đen)\n- Mô tả: "Vui lòng quay lại sau hoặc liên hệ quản trị hệ thống để được hỗ trợ." (nhỏ, xám, căn giữa)\n- Nút "Thử lại" |

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_051 | [Offline] Kiểm tra subtitle "Chưa hoạt động" | Mở Chatbot khi offline | 1. Kiểm tra Header subtitle | 1. Subtitle hiển thị "Chưa hoạt động" thay vì "Đang hoạt động" |
| TC_052 | [Nút Thử lại] Kiểm tra tap → kết nối thành công → Welcome | Mở Chatbot khi offline. Màn hình Offline hiển thị. Kết nối mạng lại | 1. Tap nút "Thử lại" | 1. App gọi lại API kiểm tra kết nối → thành công → chuyển sang trạng thái Welcome bình thường. Subtitle đổi "Đang hoạt động" |
| TC_053 | [Nút Thử lại] Kiểm tra tap → vẫn lỗi → giữ nguyên | Mở Chatbot khi offline. Màn hình Offline hiển thị. Vẫn không có mạng | 1. Tap nút "Thử lại" | 1. Vẫn không kết nối được → App giữ nguyên màn hình Offline |

---

## Section Group 5: Xử lý lỗi (Error Handling)

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_054 | [Lỗi mạng] Kiểm tra khi gửi câu hỏi mất mạng | Đăng nhập thành công. Mở Chatbot. Tắt mạng | 1. Nhập câu hỏi "Test lỗi mạng"\n2. Tap Gửi | 2.\n- Typing Indicator ẩn\n- Nút Gửi về bình thường\n- Toast hiển thị: "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."\n- Nội dung "Test lỗi mạng" được trả lại vào ô nhập liệu |
| TC_055 | [Lỗi HTTP 500] Kiểm tra API Chatbot thất bại | Đăng nhập thành công. Mở Chatbot. API Chatbot trả về HTTP 500 | 1. Gửi câu hỏi | 1.\n- Typing Indicator ẩn\n- Nút Gửi về bình thường\n- Toast: "Hệ thống đang bận. Vui lòng thử lại sau."\n- Tin nhắn trả về ô nhập liệu |
| TC_056 | [Timeout] Kiểm tra API không phản hồi >30 giây | Đăng nhập thành công. Mở Chatbot. API Chatbot không phản hồi | 1. Gửi câu hỏi\n2. Chờ >30 giây | 2.\n- Typing Indicator ẩn\n- Nút Gửi về bình thường\n- Toast: "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại"\n- Tin nhắn trả về ô nhập liệu |
| TC_057 | [Lỗi 401] Kiểm tra refresh token thành công | Đăng nhập thành công. Mở Chatbot. API trả 401 nhưng refresh token còn hạn | 1. Gửi câu hỏi | 1. App tự động dùng refresh token cấp lại access token → phiên tiếp tục bình thường, người dùng không bị gián đoạn |
| TC_058 | [Lỗi 401] Kiểm tra refresh token hết hạn → redirect đăng nhập | Đăng nhập thành công. Mở Chatbot. API trả 401, refresh token đã hết hạn (>15 ngày) | 1. Gửi câu hỏi | 1. App chuyển về màn hình Đăng nhập + hiển thị Toast: "Phiên đăng nhập hết hạn." |

---

## Section Group 6: Đa ngôn ngữ & Tích hợp

### Check Function

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_059 | [Đa ngôn ngữ] Kiểm tra text cứng thay đổi theo ngôn ngữ EN | Đăng nhập thành công. Đổi ngôn ngữ sang English | 1. Mở Chatbot\n2. Kiểm tra tất cả text cứng | 2. Header, subtitle, tiêu đề chào, placeholder, nhãn đánh giá, thông báo lỗi, nút "Thử lại", popup — tất cả hiển thị bằng tiếng Anh |
| TC_060 | [Đa ngôn ngữ] Kiểm tra nội dung AI/chip giữ nguyên bản | Đăng nhập thành công. Đổi ngôn ngữ sang English. Mở Chatbot | 1. Kiểm tra chip gợi ý\n2. Gửi câu hỏi, kiểm tra phản hồi bot | 1-2. Nội dung chip gợi ý và phản hồi AI hiển thị nguyên bản (tiếng Việt), không thay đổi theo ngôn ngữ |
| TC_061 | [Role] Kiểm tra Cá nhân và Tổ chức có cùng hành vi | Đăng nhập với tài khoản Cá nhân | 1. Mở Chatbot → gửi câu hỏi → nhận phản hồi → đánh giá\n2. Đăng xuất. Đăng nhập tài khoản Tổ chức\n3. Lặp lại bước 1 | 1 & 3. Cả 2 role có cùng hành vi, không phân biệt giao diện hay chức năng |

---

## Check common — Màn hình Chatbot

### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_062 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | Đăng nhập thành công. Mở Chatbot | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa |
| TC_063 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | Đăng nhập thành công. Mở Chatbot | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường |
| TC_064 | Kiểm tra tính nhất quán của các thông báo | Đăng nhập thành công. Mở Chatbot | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình\n- Nội dung toast đúng theo CMR-07 |
| TC_065 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc | Đăng nhập thành công. Mở Chatbot. Thiết bị ở chế độ dọc | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ |
| TC_066 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang | Đăng nhập thành công. Mở Chatbot. Thiết bị ở chế độ ngang | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ |
| TC_067 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | Đăng nhập thành công. Mở Chatbot | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ |
| TC_068 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | Đăng nhập thành công. Mở Chatbot. Thiết bị cài cỡ chữ lớn nhất | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ |
| TC_069 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | Đăng nhập thành công. Mở Chatbot. Thiết bị cài cỡ chữ nhỏ nhất | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ |

### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

| TC_ID | Title | Pre-Condition | Step | Expected Result |
|---|---|---|---|---|
| TC_070 | Xác nhận hiển thị khi chạm nút [Quay lại] trên Android | Đăng nhập thành công. Mở Chatbot trên Android. Đang có hội thoại | 1. Chạm nút [Quay lại] trên thiết bị Android\n2. Xác nhận hiển thị | 2. Hiển thị popup "Rời khỏi cuộc trò chuyện?" (vì đang có hội thoại) |
| TC_071 | Xác nhận hiển thị khi vuốt trái sang phải trên iOS | Đăng nhập thành công. Mở Chatbot trên iOS. Đang có hội thoại | 1. Vuốt từ trái sang phải trên thiết bị iOS\n2. Xác nhận hiển thị | 2. Hiển thị popup "Rời khỏi cuộc trò chuyện?" (vì đang có hội thoại) |
| TC_072 | Xác nhận hiển thị khi tắt và mở lại ứng dụng | Đăng nhập thành công. Mở Chatbot. Đang có hội thoại | 1. Tắt ứng dụng (force close)\n2. Mở lại ứng dụng\n3. Mở Chatbot | 3. Chatbot hiển thị trạng thái Welcome (không lưu lịch sử phiên trước) |
| TC_073 | Kiểm tra chế độ đa nhiệm (multitasking) | Đăng nhập thành công. Mở Chatbot. Đang có hội thoại | 1. Trở về màn hình chính (không tắt app)\n2. Mở lại ứng dụng\n3. Xác nhận hiển thị | 3. Chatbot giữ nguyên trạng thái hội thoại hiện tại |
| TC_074 | Xác nhận hiển thị khi khóa và mở khóa màn hình | Đăng nhập thành công. Mở Chatbot. Đang có hội thoại | 1. Khóa thiết bị\n2. Mở khóa thiết bị\n3. Xác nhận hiển thị | 3. Giữ nguyên trạng thái hiện tại của Chatbot |
| TC_075 | Kiểm tra pull-to-refresh | Đăng nhập thành công. Mở Chatbot. Đã scroll lên trên cùng, không còn lịch sử cũ | 1. Kéo xuống để làm mới | 1. Hiển thị spinner → refresh thành công → cập nhật dữ liệu mới nhất |
| TC_076 | Kiểm tra scroll-down-to-load-more (lazy load) | Đăng nhập thành công. Mở Chatbot. Có nhiều tin nhắn chưa tải hết | 1. Cuộn lên đầu danh sách | 1. Loading indicator hiển thị → tải thêm tin nhắn cũ |
| TC_077 | Kiểm tra phản hồi khi nhận thông báo từ ứng dụng khác | Đăng nhập thành công. Mở Chatbot. Đang chat | 1. Ứng dụng khác gửi thông báo\n2. Xác nhận hiển thị | 2. Không có lỗi nào xảy ra. Chatbot giữ nguyên trạng thái |

---

## Bước 3: Requirement Traceability Matrix (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Mở Chatbot → Welcome. Chip gợi ý từ API | TC_001, TC_002, TC_003 | ✅ Đã bao phủ |
| AC2 | Tap chip → gửi ngay. Welcome ẩn, hội thoại bắt đầu | TC_004, TC_005, TC_007 (Welcome ẩn) | ✅ Đã bao phủ |
| AC3 | Gửi câu hỏi → Bubble hiển thị. Loading. Bàn phím không đóng. Typing Indicator | TC_019, TC_020, TC_023, TC_024 | ✅ Đã bao phủ |
| AC4 | Ô nhập liệu max 500 ký tự. 5 dòng. Tap ngoài → bàn phím đóng | TC_007, TC_008, TC_009, TC_010, TC_012 | ✅ Đã bao phủ |
| AC5 | Tap 👍/👎 → ẩn icon, text "Đánh giá lại?". Tap → quay về | TC_041, TC_042, TC_043, TC_044, TC_045 | ✅ Đã bao phủ |
| AC6 | File: PDF → trình duyệt; DOCX/XLS → tải; lỗi → Toast | TC_028, TC_029, TC_030, TC_031 | ✅ Đã bao phủ |
| AC7 | Auto-scroll sau bubble bot | TC_032 | ✅ Đã bao phủ |
| AC8 | Back + hội thoại → popup. "Ở lại" / "Rời chatbot" | TC_035, TC_036, TC_037, TC_038 | ✅ Đã bao phủ |
| AC9 | Mở lại → Welcome (không lịch sử) | TC_039 | ✅ Đã bao phủ |
| AC10 | Lỗi API → Toast đúng CMR-07. Tin nhắn trả về ô | TC_054, TC_055, TC_056, TC_057, TC_058 | ✅ Đã bao phủ |
| AC11 | Offline → "Chưa hoạt động" + màn hình lỗi + "Thử lại" | TC_050, TC_051, TC_052, TC_053 | ✅ Đã bao phủ |

**Coverage: 11/11 AC = 100%**
