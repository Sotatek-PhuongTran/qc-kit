# Skill: `qc-project-onboarding`

⭐ **Entry point của QC-kit** — bắt buộc chạy đầu tiên khi apply cho dự án mới.

## 🎯 Mục đích

Validate và populate 2 file cấu hình nền tảng:
- `.claude/config/project-config.md`
- `.claude/config/path-registry.md`

Để các skill khác (qc-uc-read, qc-qna, qc-func-scenario-design, qc-func-tc-design) có đủ context và đường dẫn để chạy.

## 🔔 Khi nào dùng

- **First-time mode**: lần đầu apply QC-kit cho dự án mới
- **Update mode**: khi cần cập nhật thông tin dự án (đổi cấu trúc folder, thêm môi trường, đổi link Jira...)

## 🗣️ Cách trigger

**Chỉ qua slash command** — không tự trigger:
```
/qc-project-onboarding
```

⚠️ Skill này CHỈ chạy khi gọi tay. Không nói "onboard project" hay tương tự — slash command là cách duy nhất.

## 👤 Ai chạy

**Chỉ QC Lead** — không phải QC Member, không phải BA.

## 📥 Input cần chuẩn bị

Bạn cần có sẵn các thông tin sau trước khi chạy:

**Bắt buộc:**
- Project Overview: tên dự án, domain, target audience
- Project Context: mô tả ngắn về context dự án

**Khuyến nghị (có thì điền, không thì bỏ qua):**
- Link Jira / Confluence / Figma / Git repo / CI-CD
- Danh sách môi trường (DEV, QA, UAT, PROD) + URL
- Tài khoản test (KHÔNG nhập tài khoản production)
- Third-party integration (payment, email, auth...)
- Cấu trúc thư mục `docs/` mong muốn

## 📤 Output sinh ra

- `.claude/config/project-config.md` được điền (Section 1, 2 bắt buộc; 3-6 tùy chọn) + bump version
- `.claude/config/path-registry.md` — Artifact Path Table có đủ Path thật cho mọi dòng
- **Handover message**: tóm tắt thay đổi + bước tiếp theo gợi ý

## 📝 Quy trình (4 phase)

```
Phase 0 — Silent Audit
  ↓ skill tự đọc 2 file config, phân loại Filled / Empty
Phase 1 — Round 1: project-config.md
  ↓ skill show nội dung hiện tại 6 mục → bạn trả lời mỗi mục (mới / giữ nguyên / bỏ qua)
Phase 2 — Round 2: path-registry.md
  ↓ skill show Artifact Path Table → bạn cung cấp path thật cho mỗi dòng
Phase 3 — Write Back
  ↓ skill ghi 2 file, bump version
Phase 4 — Handover
  ↓ tóm tắt + hướng dẫn bước tiếp theo
```

## ⚠️ Lưu ý quan trọng

| Quy tắc | Giải thích |
|---|---|
| Mục 1 và 2 của project-config **bắt buộc** | Nếu bỏ qua, skill stop và các skill khác không chạy được |
| **KHÔNG nhập credentials production** | Section 5 chỉ chấp nhận tài khoản TEST |
| File ở **path cố định** | KHÔNG đổi tên file `project-config.md` / `path-registry.md`; chỉ bump field `Version` trong header |
| Path giữ nguyên placeholder | `<UC-ID>`, `<feature>`, `<YYYYMMDD>`, `<N>` — KHÔNG thay bằng giá trị cụ thể |
| Skill KHÔNG tự gọi skill khác | Onboarding kết thúc bằng handover, bạn tự quyết định chạy gì tiếp theo |

## ⚙️ Lỗi thường gặp & cách xử lý

| Triệu chứng | Xử lý |
|---|---|
| Skill stop ở Round 1 với cảnh báo về Mục 1/2 | Cung cấp dữ liệu thật cho Mục 1, 2 rồi chạy lại |
| Path còn `docs/???` sau khi xong | Skill cảnh báo trước → bạn xác nhận `yes` → chạy lại sau khi có path |
| Không nhớ ngày tạo / tên author | Skill sẽ hỏi; có thể lấy từ context userEmail |
| Đã chạy nhưng muốn sửa lại | Chạy lại lệnh — skill vào Update mode tự động |

## 🔗 Liên quan

- **Sau onboarding chạy gì:** [qc-uc-read](qc-uc-read.md) — review UC đầu tiên
- **Đọc thêm chi tiết:** [.claude/skills/qc-project-onboarding/SKILL.md](../../.claude/skills/qc-project-onboarding/SKILL.md)
- **File config liên quan:** [Config — project-config & path-registry](../structure/config.md)
