# Bước 4 — Default permission, dùng `/permissions` thay vì sửa tay

Claude cần permission để được phép đọc/ghi file, chạy lệnh shell, hoặc gọi tool. QC-kit có sẵn một bộ permission mặc định, bạn chỉ thêm khi thực sự cần.

## Permission mặc định

File cấu hình permission của dự án nằm tại:
```
.claude/settings.local.json
```

Ví dụ nội dung mặc định:
```json
{
  "permissions": {
    "allow": [
      "Bash(git mv *)",
      "Edit(/.claude/skills/qc-func-tc-design/**)"
    ]
  }
}
```

Nghĩa là Claude được phép:
- Chạy lệnh `git mv` để đổi tên/di chuyển file
- Edit các file trong skill `qc-func-tc-design` (cần khi sửa template test case)

Mọi action khác (Bash command lạ, Edit file ngoài, gọi MCP mới...) sẽ bị Claude hỏi xin phép từng lần.

## Khi nào cần thêm permission

- Bạn cài thêm MCP server mới (ví dụ Figma, Google Drive)
- Team thường dùng 1 lệnh Bash cụ thể (ví dụ `npm test`, `python script.py`)
- Bạn muốn skill mới được phép sửa folder cụ thể

## Cách thêm permission đúng

### Cách khuyến nghị — dùng `/permissions`

Trong Antigravity, gõ slash command:
```
/permissions
```

Claude sẽ mở UI cho bạn:
- Xem danh sách permission hiện tại
- Add / Remove / Move giữa global ↔ project
- Tự cập nhật `settings.local.json` cho bạn (đảm bảo đúng JSON syntax)

### Cách 2 — Sửa tay file JSON (không khuyến nghị)

Chỉ làm khi bạn rành JSON. Lỗi syntax sẽ làm Claude không load được settings.

```json
{
  "permissions": {
    "allow": [
      "Bash(git mv *)",
      "Bash(npm test)",
      "Edit(/.claude/skills/**)"
    ]
  }
}
```

⚠️ Sau khi sửa tay, nên reload Antigravity (hoặc restart Claude extension) để load lại settings.

## Bảo mật — tránh commit nội dung nhạy cảm

⚠️ **Cảnh báo**: `settings.local.json` thường nằm trong `.gitignore` (vì là local settings). Nhưng nếu team bạn muốn share một bộ permission chung:

- Đưa permission chung vào `.claude/settings.json` (file này commit được)
- Đưa permission cá nhân vào `.claude/settings.local.json` (file này KHÔNG commit)
- KHÔNG bao giờ ghi API key, password, token vào bất kỳ settings file nào

Để chuyển 1 permission từ local sang share, dùng:
```
/permissions
```
→ chọn permission → Move to project settings.

---

**Quay về:** [Khi nào sửa path-registry & project-config](when-edit-config.md) | **Bước tiếp theo:** [Cấu trúc thư mục docs/BA/](docs-ba-structure.md)
