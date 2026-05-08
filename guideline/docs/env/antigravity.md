# Cài Antigravity

Antigravity là một IDE độc lập có Claude extension tích hợp sẵn — **lựa chọn dễ nhất** cho QC member chưa quen CLI.

## Vì sao chọn Antigravity?

- ✅ UI thân thiện, có file explorer trực quan
- ✅ Claude extension built-in — không cần cài thêm
- ✅ Setup nhanh: paste API key → chạy
- ✅ Phù hợp QC member chưa biết terminal command

## Bước 1 — Download và cài Antigravity

1. Vào trang chính thức Antigravity (admin team cung cấp link)
2. Download bản phù hợp OS:
   - Windows: `.exe` installer
   - macOS: `.dmg`
   - Linux: `.AppImage` hoặc `.deb`
3. Cài đặt như app thường

## Bước 2 — Đăng ký tài khoản Anthropic & lấy API key

QC-kit dùng Claude qua extension trong Antigravity → cần Anthropic API key.

1. Vào https://console.anthropic.com
2. Sign up bằng email công ty
3. Setup billing (hỏi admin team nếu công ty có account chung)
4. Vào **API Keys** → **Create Key**
5. Đặt tên (vd `qc-kit-<your-name>`)
6. Copy key — chỉ hiện 1 lần, lưu vào password manager

⚠️ **KHÔNG commit API key vào git, KHÔNG paste vào file plain text**

## Bước 3 — Cấu hình API key trong Antigravity

1. Mở Antigravity
2. Vào **Settings → Extensions → Claude** (hoặc icon Claude ở sidebar)
3. Trong field **API Key**, paste key vừa tạo
4. Save / Apply

> 💡 Antigravity lưu key trong keychain hệ điều hành — không lưu plain text trong file dự án.

## Bước 4 — Mở dự án QC-kit

1. **File → Open Folder**
2. Chọn thư mục qc-kit (hoặc dự án có `.claude/` đã copy)
3. Antigravity tự nhận diện `.claude/` và load skills

## Bước 5 — Verify hoạt động

Mở Claude panel (Ctrl+Shift+L hoặc icon trên sidebar). Gõ thử:

```
Liệt kê các skill có trong .claude/skills/
```

Nếu trả về danh sách → cài thành công.

## Bước 6 — Cấu hình permissions

Khi chạy skill lần đầu, Claude có thể hỏi xin quyền đọc/ghi file. Có 2 cách quản lý:

### Cách 1 — Dùng `/permissions` (khuyến nghị)

Trong Claude panel, gõ:

```
/permissions
```

→ UI mở ra cho bạn:
- Xem danh sách permission hiện tại
- Add / Remove
- Move giữa global ↔ project

### Cách 2 — Sửa tay `.claude/settings.local.json`

Chỉ làm khi rành JSON. File ví dụ:

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

## Tips dùng Antigravity hiệu quả

### Quick prompt

- `Ctrl+L` (Win/Linux) hoặc `Cmd+L` (Mac) — focus vào Claude panel
- Type prompt → Enter → Claude thực thi

### Reference file trong prompt

- Drag-drop file vào Claude panel — tự attach reference
- Gõ `@<filename>` — autocomplete các file trong project

### Slash command

QC-kit hỗ trợ slash command:

- `/qc-project-onboarding` — chạy onboarding
- `/permissions` — quản lý quyền
- `/help` — xem help

## Lưu ý bảo mật

⚠️ **API key:**

- Lưu trong Antigravity keychain — KHÔNG bao giờ commit vào git
- Revoke ngay nếu nghi ngờ lộ → tạo key mới

⚠️ **Workspace:**

- Khi mở folder dự án khác, Antigravity sẽ load `.claude/` của folder đó
- Đảm bảo trust dự án trước khi cấp Claude quyền edit

## Khắc phục lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Claude panel báo "Invalid API key" | Verify key chưa expired, paste lại |
| Skill không trigger | Verify `.claude/skills/` đã có folder skill, restart Antigravity |
| Permission denied khi ghi file | Dùng `/permissions` cấp quyền |
| Lỗi "Network unreachable" | Check whitelist `api.anthropic.com` trong VPN/firewall |

---

**Tiếp theo:** [OpenAI Codex CLI](codex-cli.md) hoặc bắt đầu apply [Phần IV — Cách sử dụng](../usage/getting-started.md)
