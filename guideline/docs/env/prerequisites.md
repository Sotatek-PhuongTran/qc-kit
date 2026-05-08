# Yêu cầu môi trường

Trang này liệt kê các thành phần tối thiểu bạn cần có trước khi cài QC-kit.

## Hệ điều hành

QC-kit chạy trên cả 3 OS:

- ✅ Windows 10 / 11
- ✅ macOS 12 trở lên
- ✅ Linux (Ubuntu 20.04+ hoặc tương đương)

## Phần mềm cần cài

| Thành phần | Phiên bản | Mục đích | Cách kiểm tra |
|---|---|---|---|
| **Git** | ≥ 2.30 | Clone QC-kit, version control output | `git --version` |
| **Node.js** | ≥ 18 LTS | Cần cho Claude Code CLI và một số script | `node --version` |
| **Python** | ≥ 3.10 | Cần cho skill bổ trợ `pdf` và `docx` | `python --version` |
| **AI tool** | — | 1 trong 3: Claude Code / Antigravity / Codex CLI | Xem trang riêng từng tool |

> 💡 Nếu dự án của bạn không có file `.pdf` hay `.docx`, có thể skip cài Python.

## Tài khoản cần có

| Tài khoản | Dùng cho | Đăng ký tại |
|---|---|---|
| **Anthropic** | Claude Code, Antigravity (Claude extension) | https://console.anthropic.com |
| **OpenAI** | OpenAI Codex CLI | https://platform.openai.com |
| **Git remote** | Clone QC-kit nội bộ + push output | Repo nội bộ team |

⚠️ Bạn không cần tất cả — chỉ cần tool team chọn:

- Dùng **Claude Code** hoặc **Antigravity** → cần Anthropic account
- Dùng **OpenAI Codex CLI** → cần OpenAI account

## Quota & billing

Cả 3 tool đều **tính phí theo lượng token**. Khi review 1 UC trung bình:

- Tiêu thụ ~30-100k token (tùy độ dài requirement)
- Chi phí ~$0.10 - $0.50 / lần review

Khuyến nghị:

- Setup billing alert trên console (Anthropic/OpenAI) để tránh cháy budget
- Team-level account thay vì cá nhân — tiện quản lý quota
- Cache prompt khi có thể (Claude Code và Antigravity đều support)

## Disk space

QC-kit chiếm rất ít:

- `.claude/` folder: ~5-10 MB
- Output `docs/QC/` mỗi UC: ~50-200 KB
- Chiếm chính là cache của AI tool: 100-500 MB

Tổng cộng ~1 GB free disk là dư.

## RAM & CPU

AI tool chạy chính trên cloud, máy local chỉ làm IDE / CLI client:

- RAM: 4 GB là đủ (khuyến nghị 8 GB)
- CPU: bất kỳ x86_64 / ARM hiện đại

## Network

QC-kit gọi API của Anthropic / OpenAI nên cần Internet ổn định:

- Tốc độ: ≥ 10 Mbps là OK
- Một số công ty chặn API endpoint — cần whitelist:
  - `api.anthropic.com`
  - `api.openai.com`
- Nếu dùng VPN công ty, đôi khi cần exception cho 2 domain trên

## Verify môi trường

Trước khi sang trang cài tool, verify nhanh:

```bash
git --version       # Phải trả về 2.30+
node --version      # Phải trả về v18+ (nếu dùng Claude Code/Codex)
python --version    # Phải trả về 3.10+ (nếu cần skill pdf/docx)
```

Nếu thiếu, cài đặt theo hướng dẫn chính thức:

- Git: https://git-scm.com/downloads
- Node.js: https://nodejs.org/en/download
- Python: https://www.python.org/downloads

---

**Tiếp theo:** chọn tool bạn dùng:

- [Claude Code](claude-code.md)
- [Antigravity](antigravity.md)
- [OpenAI Codex CLI](codex-cli.md)
