# Bước 6 — Checklist verify

Sau khi hoàn thành 5 bước trước, dùng checklist này để xác nhận QC-kit đã sẵn sàng dùng cho dự án.

## Checklist cấu hình

### `.claude/` đã có đầy đủ
- [ ] `.claude/skills/` có ít nhất 5 thư mục skill: `qc-project-onboarding`, `qc-uc-read`, `qc-qna`, `qc-func-scenario-design`, `qc-func-tc-design`
- [ ] `.claude/rules/global-rules.md` tồn tại
- [ ] `.claude/rules/naming-convention.md` tồn tại
- [ ] `.claude/config/project-config.md` tồn tại
- [ ] `.claude/config/path-registry.md` tồn tại

### `project-config.md` đã được điền
- [ ] **Mục 1 — Project Overview** đã có nội dung thật (không còn placeholder `[Insert ...]`)
- [ ] **Mục 2 — Project Context** đã có nội dung thật
- [ ] Header có `Created`, `Author`, `Version` filled
- [ ] (Khuyến nghị) Mục 3-6 đã điền nếu có thông tin

### `path-registry.md` đã được điền
- [ ] Mọi dòng trong `## Artifact Path Table` có giá trị `Path` thật (không còn `docs/???`)
- [ ] Cột `Logical Name` chưa bị đổi
- [ ] Path còn giữ nguyên placeholder `<UC-ID>`, `<feature>`, `<YYYYMMDD>`, `<N>` (không thay bằng giá trị cụ thể)

## Checklist input docs

### Cấu trúc `docs/BA/`
- [ ] Đã tạo folder `docs/BA/Common rules/`
- [ ] Có ít nhất 1 file common rules (common-rules.md hoặc usecase-list.md)
- [ ] Có ít nhất 1 folder per-UC: `docs/BA/<UC-ID-Report-name>/`
- [ ] Mỗi folder UC có ít nhất 1 file requirement (`.md` / `.docx` / `.pdf`)

## Checklist permission

- [ ] `.claude/settings.local.json` có nội dung permission tối thiểu (allow `Bash(git mv *)`, `Edit(/.claude/skills/...)`)
- [ ] Antigravity đã reload sau khi sửa settings (nếu có sửa tay)

## Test chạy thử

Chạy lệnh thật trên 1 UC mẫu:

```
review uc UC-XXX
```

Thay `UC-XXX` bằng UC ID có trong `docs/BA/`.

### Kết quả mong đợi

- ✅ Skill chạy không báo lỗi path
- ✅ Sinh ra file `uc-review-report` đúng folder theo path-registry
- ✅ Có verdict (Ready / Not Ready) + score 0-100% + gap report
- ✅ Output bằng tiếng Việt (nếu input bằng tiếng Việt)

### Kết quả lỗi và cách xử lý

| Triệu chứng | Nguyên nhân khả dĩ | Xử lý |
|---|---|---|
| Báo `path docs/???` | path-registry chưa điền hoặc sai | Quay lại [Bước 3](when-edit-config.md) hoặc chạy lại `/qc-project-onboarding` |
| Báo "không tìm thấy file UC" | Folder `docs/BA/<UC-ID>/` không tồn tại hoặc tên không khớp | Kiểm tra tên folder UC, khớp với UC-ID đã gõ |
| Báo "permission denied" | settings.local.json chưa allow | Dùng `/permissions` để cấp quyền |
| Output bằng tiếng Anh dù input tiếng Việt | Input có lẫn tiếng Anh nhiều | Đảm bảo input thuần tiếng Việt; xem [global-rules](../structure/rules.md) |
| Skill chạy quá lâu / treo | File requirement quá lớn (PDF nặng) | Tách nhỏ file hoặc convert sang `.md` |

## Khi nào coi là DONE

✅ Tất cả checkbox trên đã tick + chạy thử thành công.

Khi đó QC-kit đã sẵn sàng cho dự án. QC Member có thể bắt đầu workflow:
- Review UC mới → [Skill qc-uc-read](../skills/qc-uc-read.md)
- Thiết kế scenarios → [Skill qc-func-scenario-design](../skills/qc-func-scenario-design.md)
- Sinh test cases → [Skill qc-func-tc-design](../skills/qc-func-tc-design.md)

---

**Quay về:** [Cấu trúc docs/BA/](docs-ba-structure.md) | **Tiếp:** [Workflow tổng quan](../workflow/ba-qc-test-flow.md)
