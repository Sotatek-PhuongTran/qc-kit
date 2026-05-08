# Cài Claude Code

Claude Code là sản phẩm chính thức của Anthropic — phiên bản đầy đủ tính năng nhất để chạy QC-kit.

## Hình thức Claude Code

Claude Code có nhiều form factor:

| Form factor | Phù hợp với | URL chính thức |
|---|---|---|
| **CLI (terminal)** | QC quen command line | https://docs.anthropic.com/claude-code |
| **Desktop app** (Mac/Windows) | QC muốn UI riêng | https://claude.com/download |
| **Web app** | Dùng tạm trên trình duyệt | https://claude.ai/code |
| **VSCode extension** | Đã dùng VSCode | Marketplace VSCode |
| **JetBrains extension** | Dùng IntelliJ / WebStorm | Marketplace JetBrains |

> 💡 Nếu chưa biết chọn gì, dùng **Desktop app** — UI tốt, không phụ thuộc IDE khác.

## Bước 1 — Đăng ký tài khoản Anthropic

1. Vào https://console.anthropic.com
2. Sign up bằng email công ty (khuyến nghị)
3. Verify email
4. Setup billing (Anthropic yêu cầu credit card hoặc invoice — hỏi team admin)

## Bước 2 — Tạo API key

1. Trong console, vào **API Keys** → **Create Key**
2. Đặt tên key (vd `qc-kit-<your-name>`)
3. Copy key — **chỉ hiện 1 lần**, lưu vào password manager
4. ⚠️ **KHÔNG paste key vào code, settings.json, hay file commit vào git**

## Bước 3 — Cài đặt Claude Code

### Cài CLI (khuyến nghị)

```bash
npm install -g @anthropic-ai/claude-code
```

Sau khi cài:

```bash
claude --version    # Verify cài thành công
claude              # Chạy lần đầu để login
```

Khi chạy lần đầu, Claude Code sẽ mở browser để đăng nhập / nhập API key.

### Cài Desktop app

1. Download từ https://claude.com/download
2. Chạy installer
3. Mở app → đăng nhập bằng Anthropic account

### Cài VSCode / JetBrains extension

1. Mở Marketplace của IDE
2. Search "Claude Code"
3. Install
4. Reload IDE
5. Mở extension → paste API key (nếu chưa login)

## Bước 4 — Verify hoạt động

Mở thư mục QC-kit trong Claude Code:

```bash
cd c:/Users/Admin/Desktop/qc-kit
claude
```

Trong cửa sổ Claude, gõ thử:

```
Liệt kê các skill có trong .claude/skills/
```

Nếu trả về danh sách skill → cài thành công.

## Bước 5 — Cấu hình ban đầu (tùy chọn)

### Theme và keybindings

Gõ slash command:

```
/config
```

→ chỉnh theme, model mặc định, keybindings.

### Permissions

QC-kit có sẵn một bộ permission tối thiểu trong `.claude/settings.local.json`. Khi chạy skill lần đầu, Claude có thể hỏi xin quyền — accept để tránh hỏi lại sau:

```
/permissions
```

Xem chi tiết tại [Step 0 — Thông tin chung](../usage/step0-info.md).

## Lưu ý bảo mật

⚠️ **Bảo vệ API key:**

- KHÔNG commit `.claude/settings.local.json` chứa key vào git
- Nếu key lộ → revoke ngay trên console, tạo key mới
- Có thể thiết lập IP whitelist trên Anthropic console

⚠️ **Quyền ghi file:**

- Claude Code mặc định cần xác nhận trước khi ghi/xoá file ngoài project
- Đừng `Allow All` bừa bãi — review từng prompt permission

## Tham khảo

- Official docs: https://docs.anthropic.com/claude-code
- Pricing: https://www.anthropic.com/pricing
- Status page: https://status.anthropic.com

---

**Tiếp theo:** [Antigravity](antigravity.md) hoặc [OpenAI Codex CLI](codex-cli.md)
