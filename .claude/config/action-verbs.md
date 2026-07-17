# Canonical Action Verbs (kit-level standard)

> Title: Canonical Action Verbs | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1
>
> Nguồn gốc: kế thừa `atomic_actions.yaml` của kit v2 (đã chạy thực tế) — chuyển thành chuẩn TĨNH cấp kit, không cần skill collector sinh theo dự án.

**Mục đích:** MỌI test case trong kit dùng chung MỘT bộ động từ hành động — QC review nhất quán, `qc-func-auto-generate` map sang code tất định. Bảng này là **single source of truth** cho cả hai phía:

- `qc-func-tc-design` viết bước test bằng cột **Canonical VI/EN** (cột Alias chỉ để NHẬN DIỆN khi đọc tài liệu/TC cũ — KHÔNG BAO GIỜ viết ra).
- `qc-func-auto-generate` map động từ sang cột **Playwright**.

## Bảng động từ

| Canonical VI | Canonical EN | Alias (nhận diện — cấm viết) | Playwright | Ghi chú |
|---|---|---|---|---|
| Nhập | Enter | điền, gõ, nhập liệu, dán / input, type, fill, paste | `fill(value)` | Trường input/textarea |
| Nhấn | Click | bấm, ấn, nhấp / tap, press | `click()` | Nút, link, icon |
| Nhấn đúp | Double-click | click đúp / dblclick | `dblclick()` | |
| Chọn | Select | lựa chọn, chọn từ danh sách / pick, choose | `selectOption(value)` | Dropdown/combobox |
| Tích | Check | đánh dấu, bật / tick, toggle on | `check()` | Checkbox/radio |
| Bỏ tích | Uncheck | tắt / toggle off | `uncheck()` | Checkbox |
| Xóa | Clear | làm trống, xóa trắng, reset trường / empty, reset | `fill('')` | Xóa toàn bộ giá trị một trường |
| Tải lên | Upload | đính kèm, chọn file / attach, import file | `setInputFiles(path)` | Input file |
| Truy cập | Navigate | mở, đi tới, vào trang / go to, open, visit | `goto(route)` | Điều hướng URL (route tương đối) |
| Di chuột | Hover | rê chuột, trỏ chuột lên / mouse over, point at | `hover()` | Hiện tooltip / nội dung ẩn |
| Nhấn phím | Press key | bấm phím, gõ phím / hit key, press shortcut | `press(key)` | Esc, Enter, phím tắt |
| Rời ô | Blur | rời focus, mất focus, tab ra ngoài / lose focus, leave field | `blur()` | Kích hoạt validation onBlur |
| Kéo thả | Drag and drop | kéo, thả / drag | `dragTo(target)` | |
| Kiểm tra hiển thị | Verify visible | hiển thị, xuất hiện, thấy / be visible, is displayed | `expect(...).toBeVisible()` | Assertion — dùng ở Expected Result |
| Kiểm tra nội dung | Verify text | chứa text, hiển thị nội dung / have text, contain text | `expect(...).toHaveText/ toContainText` | Assertion — message trích NGUYÊN VĂN |

## Quy tắc sử dụng

1. **Một khái niệm — một động từ.** Trong mọi file TC, hành động cùng loại luôn dùng đúng động từ canonical; không trộn alias (`nhấn` chứ không khi `bấm` khi `ấn`).
2. **Alias chỉ để đọc-hiểu** tài liệu nguồn và TC cũ; khi VIẾT, luôn quy về canonical.
3. **Thiếu động từ:** nếu một hành động chưa có trong bảng, KHÔNG viết động từ tự do một cách im lặng — chọn động từ tiếng Việt thông dụng, đánh dấu rõ trong báo cáo cuối run là "động từ ngoài bảng", và đề xuất QC Lead bổ sung một dòng vào bảng này (kèm cột Playwright). Bảng là chuẩn cấp kit — chỉ QC Lead duyệt mới được thêm; không đổi/xóa dòng đã phát hành.
4. **Đối tượng đi kèm động từ** = tên phần tử theo bảng kiểm kê §4 của audited report, trong ngoặc kép, nhãn nguyên văn (quy tắc C3 của `qc-func-tc-design/rules/testcase-instruction-rules.md`).
5. Thuật ngữ ngoài phạm vi động từ hành động (trạng thái, vùng, message...) vẫn theo Bảng quy đổi `.claude/rules/qc-writting-rules.md` §3.
