# Bước 3 — Khi nào sửa `path-registry` & `project-config`

Mặc định, 2 file cấu hình này **không sửa tay** — chúng được điền tự động qua `/qc-project-onboarding`. Nhưng có một số tình huống bạn cần can thiệp.

## Khi nào cần sửa

| Tình huống | Cách xử lý |
|---|---|
| Setup dự án lần đầu | Chạy `/qc-project-onboarding` (First-time mode) — KHÔNG sửa tay |
| Đổi cấu trúc thư mục giữa chừng (vd `docs/` → `documentation/`) | Chạy `/qc-project-onboarding` (Update mode) |
| Thông tin dự án thay đổi (thêm môi trường UAT, đổi link Jira) | Chạy `/qc-project-onboarding` (Update mode) |
| Bổ sung 1 artifact mới chưa có trong path-registry | Sửa tay (xem hướng dẫn dưới) |
| Sửa lỗi nhỏ về typo trong path | Sửa tay (xem hướng dẫn dưới) |

## Cách 1 — Chạy lại onboarding (khuyến nghị)

Đơn giản và an toàn nhất. Skill tự xử lý việc bump version và format đúng.

```
/qc-project-onboarding
```

Skill sẽ tự nhận diện 2 file đã có nội dung → vào **Update mode**, hỏi bạn từng mục muốn cập nhật / giữ nguyên.

## Cách 2 — Sửa tay (chỉ khi cần thiết)

Áp dụng cho thay đổi nhỏ hoặc bổ sung artifact mới mà onboarding skill chưa support.

### Quy tắc khi sửa `project-config.md`

1. Mở `.claude/config/project-config.md`
2. Sửa nội dung trong section cần update
3. **Bump field `Version`** trong header (v1 → v2)
4. Cập nhật field `Created` thành ngày sửa nếu cần
5. Save và commit

### Quy tắc khi sửa `path-registry.md`

1. Mở `.claude/config/path-registry.md`
2. Tìm dòng trong `## Artifact Path Table` cần sửa
3. **Chỉ sửa cột `Path` và `Mô tả`** — KHÔNG đổi cột `Logical Name` (skill khác đang reference theo tên này)
4. Giữ nguyên placeholder trong path: `<UC-ID>`, `<feature>`, `<YYYYMMDD>`, `<N>` — skill sẽ tự thay tại runtime
5. Giữ nguyên gốc `docs/` để tương thích các skill khác

### Cảnh báo

⚠️ **KHÔNG sửa Logical Name**: nếu đổi `uc-review-report` thành tên khác, các skill như qc-uc-read, qc-qna, qc-func-tc-design sẽ không tìm được file → lỗi "path docs/???".

⚠️ **KHÔNG xoá dòng** trong Artifact Path Table — nếu chưa cần dùng, để placeholder `docs/???` thì hơn.

⚠️ **KHÔNG đặt giá trị cụ thể vào placeholder**: ví dụ KHÔNG đổi `docs/QC/uc-read/<UC-ID>/` thành `docs/QC/uc-read/UC-101/` — skill cần placeholder để xử lý nhiều UC.

## Sau khi sửa

Verify bằng cách chạy thử 1 skill bất kỳ. Ví dụ:
```
review uc UC-XXX
```
- Nếu skill chạy bình thường → cấu hình OK
- Nếu báo `path docs/???` → quay lại sửa path tương ứng

---

**Quay về:** [Cách chạy kit theo từng giai đoạn](run-by-stage.md) | **Bước tiếp theo:** [Default permission](permissions.md)
