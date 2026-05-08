# Các AI tools tích hợp

QC-kit chạy trên các AI agentic tool tuân theo chuẩn **skill loading + file system access**. Hiện tại 3 tool sau được team verify chạy được QC-kit:

| Tool | Nhà phát triển | Hình thức | Phù hợp với |
|---|---|---|---|
| **Claude Code** | Anthropic | CLI / Desktop / IDE Extension | QC member quen CLI, hoặc dùng VSCode/JetBrains |
| **Antigravity** | Google | IDE độc lập (có Claude extension) | Newbie / member chưa quen CLI — UI thân thiện |
| **OpenAI Codex CLI** | OpenAI | CLI | Dev/QC quen terminal, muốn tích hợp pipeline |

## Khi nào dùng tool nào?

### Antigravity — khuyến nghị cho team mới bắt đầu

- ✅ UI dễ dùng, không cần CLI
- ✅ Có sẵn Claude extension — paste API key là chạy
- ✅ File explorer trực quan — dễ nhìn `docs/`, `.claude/`, output folder
- ✅ Phù hợp QC member chưa từng dùng terminal

### Claude Code — cho team có kinh nghiệm

- ✅ Sản phẩm chính thức của Anthropic — feature mới ra trước
- ✅ Có nhiều form factor: CLI, Desktop, Web (claude.ai/code), IDE extension (VSCode, JetBrains)
- ✅ Tốc độ và độ ổn định cao
- ⚠️ CLI cần quen terminal command

### OpenAI Codex CLI — cho QC tech-savvy hoặc CI/CD

- ✅ Tích hợp dễ vào pipeline CI/CD
- ✅ Hỗ trợ batch processing nhiều UC cùng lúc
- ⚠️ UI hơi rough hơn 2 tool kia
- ⚠️ Cần OpenAI API key riêng

## So sánh nhanh

| Tiêu chí | Claude Code | Antigravity | Codex CLI |
|---|---|---|---|
| Độ dễ dùng | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Skill support | Native | Qua Claude extension | Native |
| Tích hợp IDE | VSCode, JetBrains | Built-in | Manual setup |
| Phù hợp newbie | OK | Tốt nhất | Khó |
| Phù hợp CI/CD | OK | Khó | Tốt nhất |
| Cần API key | Anthropic | Anthropic (qua extension) | OpenAI |

## Quy ước team

Để team QC nhiều dự án dễ phối hợp, đề xuất:

- **Default tool**: Antigravity (cho hầu hết member)
- **Power user**: Claude Code CLI (cho QC Lead, hoặc khi cần feature mới của Anthropic)
- **CI/CD use case**: Codex CLI (cho automation chạy hàng loạt)

QC-kit hoạt động giống nhau trên cả 3 tool — chỉ khác cách trigger và UI hiển thị.

## Hướng dẫn cài đặt từng tool

Xem chi tiết tại [Phần II — Cài đặt môi trường](../env/prerequisites.md):

- [Claude Code](../env/claude-code.md)
- [Antigravity](../env/antigravity.md)
- [OpenAI Codex CLI](../env/codex-cli.md)

---

**Tiếp theo:** [Lộ trình đọc](reading-paths.md)
