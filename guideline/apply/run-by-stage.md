# Bước 2 — Cách chạy kit theo từng giai đoạn

QC-kit hoạt động theo các **giai đoạn liên tiếp**. Bạn không chạy tất cả skill cùng lúc — mỗi giai đoạn cho ra output làm input cho giai đoạn tiếp theo.

## Sơ đồ tổng quan

```
[QC Lead]   /qc-project-onboarding         (khi setup thông tin  chung)
                ↓ project-config + path-registry filled
[BA]         viết requirement → docs/BA/<UC>/
                ↓
[QC Member]  review uc <UC-ID>             → uc-review-report + question-backlog
                ↓ (nếu có gap)
[BA]         trả lời question backlog
                ↓
[QC Member]  review uc <UC-ID>             → re-audit, updated report
                ↓ (Ready)
[QC Member]  design test scenarios         → scenarios.md
                ↓
[QC Member]  generate test cases           → testcases.xlsx + draft + summary
                ↓
[QC Manual]  execute test
```

## Giai đoạn 0 — Onboarding dự án (1 lần duy nhất)

**Ai chạy:** QC Lead

**Chạy lệnh:** `/qc-project-onboarding`

Skill sẽ phỏng vấn bạn qua **2 lượt**:
- **Lượt 1**: thông tin tổng quan dự án (6 mục — mục 1 và 2 **bắt buộc**)
- **Lượt 2**: đường dẫn thật cho từng artifact (path-registry)

Sau khi xong, 2 file cấu hình `project-config.md` và `path-registry.md` sẽ được điền tự động và bạn sẽ nhận một **handover guide** để bắt đầu.

⚠️ Nếu bạn không hoàn tất mục 1 và 2 của project-config, các skill khác sẽ KHÔNG chạy được.

## Giai đoạn 1 — Review UC mới

**Ai chạy:** QC Member

**Trigger:** `review uc UC-XXX` hoặc `review requirement`

**Input cần có:**
- Tài liệu requirement BA đã đặt trong `docs/BA/<UC-ID>/`
- File common rules trong `docs/BA/Common rules/` (nếu có)

**Output:**
- `uc-review-report` — verdict Ready/Not Ready + score 0-100% + gap report
- `question-backlog` — danh sách câu hỏi cần BA trả lời (nếu có gap)

## Giai đoạn 2 — Gửi backlog cho BA

**Ai chạy:** QC Member (gửi tay) + BA (trả lời)

Sau khi qc-uc-read hoàn tất, skill `qc-qna` tự động trigger để format question backlog. Member gửi file backlog cho BA qua kênh thống nhất (Excel/Confluence/Slack thread).

BA trả lời bằng cách edit cột `Status` thành `Answered` và bổ sung answer trong cùng file.

## Giai đoạn 3 — Re-audit sau khi BA trả lời

**Ai chạy:** QC Member

**Trigger:** lại `review uc UC-XXX`

Skill tự nhận biết là re-audit (vì đã có file uc-review-report cũ) và sẽ:
- Đọc các answer mới của BA
- Cập nhật report → version mới
- Đánh giá lại Ready / Not Ready

Lặp lại Giai đoạn 2-3 đến khi UC đạt **Ready**.

## Giai đoạn 4 — Thiết kế test scenarios

**Ai chạy:** QC Member

**Trigger:** `design test scenarios` hoặc `build test scenarios`

**Điều kiện:** UC đã Ready ở Giai đoạn 3.

**Output:** `scenarios.md` — gom theo UC, áp dụng bắt buộc Equivalence Partitioning + BVA + Decision Tables.

⚠️ Skill này CHỈ phụ trách functional / integration / UI / E2E / acceptance — KHÔNG có performance / security / load.

## Giai đoạn 5 — Sinh test cases

**Ai chạy:** QC Member

**Trigger:** `generate test cases`

**Output:**
- `testcases.xlsx` — file Excel test cases hoàn chỉnh
- `testcases_draft.md` — bản nháp markdown
- `testcases_summary.md` — tóm tắt sau design

**Update test cases khi requirement đổi:** dùng trigger `update test cases` (skill sẽ hỏi workflow nếu thiếu).

## Giai đoạn 6 — Execute test (manual)

QC Member dùng file `testcases.xlsx` để execute test thủ công. Bước này nằm ngoài QC-kit hiện tại.

---

**Quay về:** [Copy QC-kit](copy-kit.md) | **Bước tiếp theo:** [Khi nào sửa path-registry & project-config](when-edit-config.md)
