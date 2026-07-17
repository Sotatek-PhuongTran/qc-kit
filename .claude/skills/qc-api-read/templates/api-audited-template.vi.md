# Báo cáo audit độ sẵn sàng API

**Template audit API phục vụ thiết kế API testing — kế thừa từ audited UC, THUẦN NGHIỆP VỤ (không API doc)**

---

> ## Cách sử dụng template này
>
> Template này dùng để tạo file `*_api-audited_*.md` sau khi Agent đọc audited UC (đã đạt ngưỡng) và suy diễn phần nghiệp vụ mà BE cần phục vụ. **KHÔNG đối chiếu API doc ở giai đoạn này** — binding endpoint + đối chiếu doc thuộc `qc-api-tc-design`.
>
> File api-audited có 2 mục đích: (1) tổng hợp cách Agent hiểu tầng API của use case để QC Lead / BE review; (2) làm nguồn duy nhất cho nhánh API phía sau (`qc-api-scenario-design` chỉ đọc file này; `qc-api-tc-design` đọc file này + digest của API doc).
>
> Không được để trống section. Nếu không áp dụng, ghi `N/A` và giải thích ngắn gọn. Không chỉnh sửa đầu mục. Khi viết file phải xoá các phần hướng dẫn.
>
> **Cách viết (BẮT BUỘC):** tuân theo `.claude/rules/qc-writting-rules.md` — tên người-đọc-hiểu trước, mã trong ngoặc. Chạy cổng tự kiểm §5 trước khi lưu.
>
> **Ba quy tắc chống phình file:**
> 1. **Mỗi thông tin có MỘT nhà** — section nào là "nhà" của thông tin nào đã cố định trong template; không viết lại cùng nội dung dưới dạng section khác (danh mục operation §2 chính là phạm vi; bảng chuyển trạng thái §4 chính là luồng; bảng §8 kiêm luôn Issue Register). Thông tin endpoint/doc KHÔNG có nhà ở đây — nhà của nó là bảng binding trong file TC md.
> 2. **Lặp lại là được phép khi NGƯỜI ĐỌC cần** — một message/quy tắc xuất hiện ở 2 section phục vụ 2 việc đọc khác nhau (vd validation matrix và AC) thì viết ĐỦ LỜI ở cả 2 nơi, kèm mã nguồn trong ngoặc. KHÔNG bao giờ thay nội dung bằng mã trần bắt người đọc đi tra.
> 3. **Không ghi những gì không xảy ra** — auto-cap chỉ ghi cap ĐÃ áp; change log mỗi version tối đa 2 dòng; entity ngoài phạm vi gộp 1 dòng.

---

## Bảng mã viết tắt

| Mã / Tiền tố | Ý nghĩa | Định nghĩa tại |
|---|---|---|
| `OP-*` / `AC-API-*` / `Q-API-*` | Operation / Acceptance Criteria hướng API / Câu hỏi (ID theo sổ API portal; `Q-x (sổ UI)` = tham chiếu sổ nhánh UI) | §2 / §6 / §8 |
| [chỉ liệt kê các tiền tố NGOÀI báo cáo thực sự xuất hiện: CRULE-, BR-, FR-, R-, SCR-...] | | |

---

## Feature Brief — Tóm tắt nghiệp vụ nhìn từ API

[2–3 đoạn NGẮN, đủ để người chưa đọc UC hiểu: BE phải phục vụ nghiệp vụ gì, ai gọi, rule nào chi phối (nêu bằng lời + mã trong ngoặc). KHÔNG viết lại thành mục "Mục tiêu" riêng ở dưới. KHÔNG nói về endpoint/swagger.]

---

## 0. Thông tin tài liệu

| UC ID | Tên feature / use case | Version báo cáo | Phạm vi test dự án (project-context-master §3.0) |
|---|---|---|---|
|  |  | v1 | Black-box + API / API only |

| Nguồn đã đọc | Version / ngày | Vai trò | Ghi chú |
|---|---|---|---|
| `<UC-ID>_..._audited_..._v<M>.md` |  | Nguồn suy diễn chính (BẮT BUỘC đạt ngưỡng) | Verdict nguồn |
| common rules / data-map / sổ API portal + sổ UI per-UC (dedup) |  |  | API doc: KHÔNG đọc — binding ở `qc-api-tc-design` |

---

## 1. Ngoài phạm vi / chưa rõ

> Phạm vi TRONG scope không cần bảng riêng — chính là danh mục operation §2. Mục này chỉ liệt kê những gì KHÔNG thuộc tầng API của UC (và vì sao), để người đọc không đi tìm test case cho chúng.

| Hạng mục | Lý do | Ảnh hưởng đến test |
|---|---|---|
|  |  |  |

---

## 2. Danh mục operation

> Mỗi thao tác nghiệp vụ BE phải phục vụ là MỘT dòng, ID `OP-<UC-ID>-NN` ổn định, TÊN NGHIỆP VỤ (không ghi endpoint/method — binding ở TC design). Suy từ audited UC (§6 luồng, §3.2 kết quả sau, §4 control, §8 AC) + data-map.
>
> **Cột "Khoá claim"** = `resource · action` (resource theo data-map/tên nghiệp vụ; action theo bộ động từ API chuẩn ở `coverage-rules.md §Operation ownership`) — khoá chống trùng cross-UC, KHÔNG cần API doc. **Cột "Vai trò"** — điền ở Phase 2 theo luật claim trong `coverage-rules.md §Operation ownership`. Giá trị đóng: `Owner` / `Reuse → UC-X` / `Reuse → UC-X (dự kiến)` / `Reuse — chưa rõ owner`. Ý nghĩa cho nhánh sau: OP `Owner` thiết kế TRỌN endpoint-level testing (contract, validation từng param, phân quyền, protocol, an toàn); OP `Reuse` CHỈ thiết kế flow-level, endpoint-level tham chiếu test case của UC chủ.

| OP-ID | Tên operation (nghiệp vụ) | Khoá claim (resource · action) | Actor / Role | Mô tả nghiệp vụ | Input (param) | Output / side-effect | Trạng thái liên quan | Vai trò | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| OP-UC-XXX-01 |  |  |  |  |  |  |  | [điền ở Phase 2] |  |

**Rà soát đủ CRUD theo entity:** [chỉ bảng cho entity UC này CHẠM tới; mọi entity hoàn toàn ngoài phạm vi gộp 1 dòng ghi chú "Ngoài phạm vi: <entity> (thuộc UC-X), ..."]

---

## 3. Validation matrix

> NGUỒN GIÁ TRỊ TEST CHUNG cho cả 2 nhánh. Rule + message viết ĐỦ LỜI kèm mã nguồn trong ngoặc (message này được phép xuất hiện lại ở §6 — AC phải tự chứa). Tên param là TÊN NGHIỆP VỤ (tên wire thật do binding/probe ghi nhận sau). **Param có thể biểu diễn nhiều kiểu → liệt kê biến thể thành partition (string/number/object/null; định dạng thay thế) — KHÔNG hỏi "gửi kiểu gì" (policy §7 BANNED #4).**

| Param | Thuộc OP | Rule (đủ lời + mã nguồn) | Bắt buộc? | Kiểu / định dạng | Phân vùng tương đương (EP) | Giá trị biên (BVA) | Nguồn |
|---|---|---|---|---|---|---|---|
|  |  |  | Yes / No / TBD |  |  |  |  |

---

## 4. Luồng xử lý và chuyển trạng thái (góc nhìn API)

> MỘT bảng duy nhất — mỗi dòng là một luồng/chuyển trạng thái. Không tách "chuỗi operation" và "state machine" thành 2 bảng. Kết quả viết ở MỨC HÀNH VI (policy expected §1): status cụ thể chỉ khi NGUỒN REQUIREMENT đã nêu sẵn; mã chính xác của các luồng còn lại do api-baseline ghi nhận ở lần chạy đầu — KHÔNG hỏi BE. Message trích là bản hiển thị UI (nhánh UI assert verbatim); body API chỉ cần có message lỗi.

| Luồng | Trạng thái từ → tới | Operation + điều kiện | Hợp lệ? | Kết quả khi không hợp lệ (status class + message đủ lời) | Nguồn |
|---|---|---|---|---|---|
| [vd: Đăng nhập thành công] | Chưa xác thực → Đã xác thực | OP-01 (điều kiện...) → OP-02 verify | Hợp lệ | — |  |
| [vd: Sai thông tin] | Chưa xác thực (không đổi) | OP-01 với credentials không khớp | KHÔNG | [status class] + message `"..."` (verbatim) + side-effect bắt buộc nếu có |  |

---

## 5. Ma trận phân quyền

> Mỗi ô: `✓` / `✗` (kết quả mong đợi chi tiết nằm ở AC §6) / `?` (chưa rõ → câu hỏi §8). Bộ case tối thiểu per operation: `.claude/config/api-shared/auth-strategy.md`.

| OP-ID | Role A | Role B | ... | Nguồn |
|---|---|---|---|---|
|  |  |  |  |  |

---

## 6. Acceptance Criteria hướng API

> Mỗi AC phải pass/fail được ở tầng API, ĐỌC ĐỘC LẬP ĐƯỢC, và viết ở MỨC HÀNH VI: kết quả nghiệp vụ + side-effect + `body có message báo lỗi` cho case thất bại (policy expected §1). Status cụ thể chỉ khi nguồn requirement đã nêu sẵn; message body API KHÔNG BAO GIỜ trích từ message UI. Phân biệt hành vi (vd 2 case phải trả về giống hệt nhau) là AC hợp lệ. Nội dung response thành công: nêu NHỮNG GÌ PHẢI CÓ suy từ requirement (token, danh tính user, ngữ cảnh tổ chức...); tên field chính xác thuộc tầng script (probe) — không hỏi BE schema. Cột "Nguồn expected": bậc + mã nguồn + cụm cốt lõi.

| AC-API-# | OP | Given (payload / trạng thái dữ liệu) | When (request) | Then (status + response + side-effect) | Cách verify | Nguồn expected (bậc + trích cốt lõi) | Ghi chú |
|---|---|---|---|---|---|---|---|
| AC-API-01 |  |  |  |  | response / GET-after-write / db |  |  |

---

## 7. Đối chiếu API doc — CHUYỂN GIAI ĐOẠN

> Báo cáo này KHÔNG chứa thông tin API doc. Binding operation ↔ endpoint, phát hiện lệch/thừa/thiếu endpoint được thực hiện ở `qc-api-tc-design` Step 1 (nơi API doc là điều kiện bắt buộc); kết quả nằm ở bảng "Binding OP ↔ endpoint" trong prelude của file TC md. Giữ section này nguyên văn — không thêm bảng, không điền gì.

---

## 8. Gap, câu hỏi mở & Issue Register

> Bảng này KIÊM Issue Register của rubric chấm điểm (không có bảng ISS riêng). Mỗi dòng: câu hỏi TỰ CHỨA (người đọc hiểu ngay không cần tra) + mức độ + loại issue. Mọi dòng được đẩy qua `qc-qna` API mode vào sổ API portal (`api-question-backlog`) TRƯỚC khi viết báo cáo (workflow Phase 3); ID trong bảng LUÔN là ID sổ (`Q-API-NNN`) đã được cấp — không để trống, không dùng ID tạm.
>
> **HAI CỔNG BẮT BUỘC (policy `expected-and-verify-policy.md`):** (1) QUESTION GATE §7 — CẤM hỏi mã trạng thái / message body / schema / hình dạng request payload, dù gắn nhãn nào; câu trộn phải TÁCH, chỉ giữ phần hành vi. (2) DEDUP GATE §8 — đối chiếu 2 sổ trước: câu đã trả lời (sổ nào cũng vậy) → dùng answer làm nguồn (không hỏi); câu Open trùng ở sổ UI per-UC → ghi `→ Q-x (sổ UI)` — BA trả lời tại sổ UI, không chép sang; câu Open trùng ở sổ API portal → ghi `→ Q-API-x`; chủ đề dự án/hạ tầng → đánh dấu `[Chung — mục A]`.

| ID | Severity | Loại vấn đề (rubric) | Mức ưu tiên | Tham chiếu | Nội dung câu hỏi (tự chứa, chỉ rõ ảnh hưởng đến test) | Owner đề xuất | Trạng thái |
|---|---|---|---|---|---|---|---|
| [Q-API-NNN / `→ Q-API-x` / `→ Q-x (sổ UI)` / `[Chung — mục A]`] | Blocker / Major / Minor | [issue type] | High / Medium / Low |  |  | BE / BA / QC Lead | Open |

---

## 9. Kết luận readiness

**Auto-cap đã áp dụng:** [chỉ liệt kê cap ĐÃ áp + lý do 1 câu; không có → "Không có". Cap không áp là mặc định, không ghi.]

| # | Khu vực chấm | Max | Điểm | Trạng thái | Ghi chú (1 câu) |
|---|---|---|---|---|---|
| 1 | Danh mục operation (§2) | 20 |  |  |  |
| 2 | Validation matrix (§3) | 25 |  |  |  |
| 3 | Luồng, trạng thái & phân quyền (§4+§5) | 20 |  |  |  |
| 4 | AC hướng API (§6) | 20 |  |  |  |
| 5 | Chất lượng suy diễn & truy vết | 15 |  |  |  |
| | **Tổng điểm** | **100** |  | | |

**Verdict:** Ready / Conditionally Ready / Not Ready — [1–2 câu. Readiness KHÔNG phụ thuộc API doc.]

**Điều kiện gỡ (nếu Conditionally):** [mỗi điều kiện 1 dòng, viết BẰNG LỜI đủ hiểu + mã câu hỏi trong ngoặc. Không ghi mã trần. KHÔNG được là điều kiện về doc/swagger.]

---

## 10. Change log

> Mỗi version TỐI ĐA 2 dòng — nội dung chi tiết đã nằm trong báo cáo, không tóm tắt lại.

| Version | Ngày | Người cập nhật | Nội dung thay đổi |
|---|---|---|---|
| v1 | YYYY-MM-DD | qc-api-read Agent | Tạo lần đầu từ audited UC v<M>; <N> operation, <K> AC, <Q> câu hỏi; <điểm> — <verdict>. |

---

*Template audit API readiness v4 — req-first thuần: §7 chuyển giai đoạn sang qc-api-tc-design; §2 khoá claim `resource · action`; §8 hai cổng câu hỏi, ID theo sổ API portal + tham chiếu sổ UI (v3.1: question gate; v3: endpoint ownership)*
