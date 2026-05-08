# Step 3 — Update test cases

Step 3 chạy khi **requirement thay đổi** sau khi đã có test cases. Bạn dùng `qc-func-tc-design` với workflow `update-test-cases` để sửa file Excel hiện có thay vì tạo mới từ đầu.

> 👤 **Ai chạy:** QC Member
> ⏱️ **Thời gian:** ~10-20 phút mỗi UC

## Khi nào dùng workflow update?

Sử dụng `update-test-cases` thay vì `generate-test-cases` khi:

- ✅ Đã có file `testcases.xlsx` từ Step 2
- ✅ Requirement đã đổi → BA cập nhật `docs/BA/<UC-ID>/`
- ✅ UC đã re-audit và Ready ở version mới
- ✅ Bạn muốn **giữ ID test case cũ** và chỉ sửa/thêm/xoá những gì thay đổi

Nếu requirement đổi nhiều, không thể incremental update → dùng `generate-test-cases` để tạo lại từ đầu.

---

## Quy trình tổng quan

```
Requirement đổi → BA update docs/BA/<UC-ID>/
        ↓
QC Member: review uc <UC-ID> (re-audit, Step 1)
        ↓
UC Ready ở version mới
        ↓
QC Member: design test scenarios (nếu cần — Step 2.1)
        ↓
QC Member: update test cases cho <UC-ID>
        ↓
qc-func-tc-design sinh: testcases.xlsx (version mới) + draft + summary
```

---

## 3.1 — Trigger workflow update

```
update test cases cho UC-101
```

### Skill xác nhận workflow

Skill sẽ check:

- File `func-test-cases` của UC-101 có tồn tại?
  - ✅ Có → load workflow `update-test-cases`
  - ❌ Không → skill yêu cầu bạn cung cấp đường dẫn file test cases hiện có

Nếu bạn nói rõ ngay từ đầu, skill sẽ skip bước hỏi:

```
update test cases cho UC-101 ở docs/QC/test-cases/functional-test/UC-101/UC-101_user-login_testcases_20260510_v1.xlsx
```

---

## 3.2 — Input skill đọc

Cho workflow `update-test-cases`:

| File | Bắt buộc |
|---|---|
| `func-test-cases` (file Excel hiện có) | ✅ |
| `uc-review-report` (highest version, đã re-audit ở Step 1) | ✅ |
| `func-test-scenarios` (highest version, nếu có) | Khuyến nghị |
| `requirement-common-files` | ✅ |

⚠️ **Phải re-audit UC trước**: skill cần `uc-review-report` version mới (sau khi BA update requirement), không phải version cũ.

---

## 3.3 — Skill làm gì khi update?

Skill sẽ:

1. **Diff** giữa requirement cũ và mới
2. Phân loại từng test case hiện có:
   - **Giữ nguyên** — requirement liên quan không đổi
   - **Sửa** — requirement đổi, test case cần update
   - **Xoá / Mark obsolete** — feature bị remove khỏi UC
3. **Sinh test case mới** cho phần requirement bổ sung
4. Ghi file mới ở version tăng (v2 → v3)

⚠️ File version cũ giữ nguyên — KHÔNG bị overwrite.

---

## 3.4 — Output

```
docs/QC/test-cases/functional-test/UC-101/
├── UC-101_user-login_testcases_20260510_v1.xlsx              ← (cũ, giữ nguyên)
├── UC-101_user-login_testcases_summary_20260510_v1.md        ← (cũ)
├── UC-101_user-login_testcases_20260612_v2.xlsx              ← MỚI
├── UC-101_user-login_testcases_draft.md                      ← Updated
└── UC-101_user-login_testcases_summary_20260612_v2.md        ← MỚI
```

### Summary mới có gì?

File `_testcases_summary_*_v2.md` chứa:

- **Changelog** — list test case Added / Modified / Removed
- **Diff với version cũ** — what changed and why
- **New coverage areas** — phần requirement bổ sung được cover thế nào
- **Out-of-scope items** — nếu có

Đọc summary này TRƯỚC khi mở file Excel → hiểu nhanh điểm gì đổi.

---

## 3.5 — Review file update

Tương tự Step 2, **AI là drafter, bạn là decider**. Trước khi handover:

### Checklist review riêng cho update

- [ ] **ID consistency** — test case ID cũ giữ nguyên, không bị reset
- [ ] Test case bị mark "obsolete" có lý do rõ trong summary
- [ ] Test case mới có Req-ID trace về phần requirement bổ sung
- [ ] Diff trong summary khớp với requirement đổi (BA xác nhận đúng phạm vi)
- [ ] Format Excel giữ nguyên (không bị broken sau update)

### Nếu phát hiện vấn đề

| Vấn đề | Xử lý |
|---|---|
| ID test case bị đổi | Có thể skill nhầm — verify lại file cũ; nếu lỗi, prompt rõ "giữ nguyên ID cũ" |
| Quá nhiều test case bị mark obsolete | Verify diff trong summary; có thể skill quá aggressive — re-prompt |
| Format Excel broken sau update | Verify Testcase template chưa bị corrupt; có thể cần generate-test-cases lại từ đầu |
| Skill không tìm thấy file cũ | Cung cấp đường dẫn rõ trong prompt |

---

## 3.6 — Khi nào nên `generate` thay vì `update`?

Có những trường hợp nên tạo lại từ đầu thay vì update:

| Tình huống | Khuyến nghị |
|---|---|
| Requirement đổi >50% nội dung | `generate-test-cases` |
| Refactor cấu trúc UC (đổi flow chính) | `generate-test-cases` |
| Feature mới hoàn toàn (UC mới, không phải update UC cũ) | `generate-test-cases` cho UC mới |
| Sửa nhỏ (thêm field, đổi validation rule) | `update-test-cases` |
| Thêm 1 alternative flow | `update-test-cases` |
| Đổi error message text | `update-test-cases` |

Khi không chắc → dùng `update-test-cases` trước (an toàn hơn — file cũ vẫn còn). Nếu output không đẹp, fall back sang `generate-test-cases`.

---

## 3.7 — Lặp Step 3 nhiều lần

Mỗi lần requirement đổi, lặp lại:

```
v1 → update v2 → (req đổi) → update v3 → (req đổi) → update v4 → ...
```

Mỗi version cũ giữ nguyên làm history. Sau 1 thời gian, folder `docs/QC/test-cases/functional-test/UC-101/` sẽ có nhiều version — đó là **bình thường** và đáng giá.

💡 **Tip**: cuối sprint / quarter, có thể archive các version cũ vào subfolder `_archive/` (move thủ công) nếu thấy folder quá nặng. Nhưng đừng xoá — git history cũng có nhưng tham khảo file dễ hơn.

---

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Skill hỏi đường dẫn test cases | Cung cấp full path file `.xlsx` cũ |
| Skill báo "uc-review-report version cũ, vui lòng re-audit" | Quay lại Step 1 chạy `review uc <UC-ID>` |
| Update không phát hiện thay đổi | Verify file requirement BA đã thật sự đổi; có thể BA chưa save |
| Test case mới có ID trùng với cũ | Skill thường tránh trùng — nếu trùng, prompt rõ "tránh ID conflict" |
| Excel mở báo lỗi sau update | Backup file cũ rồi re-run; nếu vẫn lỗi → fall back `generate-test-cases` |

---

## Tham khảo skill

- SKILL.md: [.claude/skills/qc-func-tc-design/SKILL.md](../../.claude/skills/qc-func-tc-design/SKILL.md)
- Workflow update: `.claude/skills/qc-func-tc-design/workflows/update-test-cases.md`

---

✅ **Step 3 hoàn tất.** Đây cũng là step cuối của Phần IV.

**Tiếp theo:** Sang tab **Best Practice** để xem các tips dùng QC-kit hiệu quả, hoặc tab **Q\&A** nếu gặp vấn đề.
