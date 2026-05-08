# Cài OpenAI Codex CLI

OpenAI Codex CLI là tool agentic của OpenAI, phù hợp cho:

- QC tech-savvy quen terminal
- Use case CI/CD (chạy QC-kit batch nhiều UC)
- Team đã có OpenAI account / quota sẵn

## Bước 1 — Đăng ký tài khoản OpenAI

1. Vào https://platform.openai.com
2. Sign up bằng email công ty
3. Verify email và phone
4. Setup billing — OpenAI yêu cầu credit card

## Bước 2 — Tạo API key

1. Trong OpenAI platform, vào **API Keys** → **Create new secret key**
2. Đặt tên (vd `qc-kit-<your-name>`)
3. Chọn project (nếu công ty dùng OpenAI Projects để tổ chức quota)
4. Copy key — **chỉ hiện 1 lần**, lưu vào password manager

⚠️ KHÔNG paste key vào code hoặc commit vào git.

## Bước 3 — Cài Codex CLI

```bash
npm install -g @openai/codex
```

Verify:

```bash
codex --version
```

## Bước 4 — Login

```bash
codex login
```

→ tool sẽ mở browser để authenticate.

Hoặc set environment variable thủ công:

**Windows (PowerShell):**

```powershell
$env:OPENAI_API_KEY = "sk-..."
```

Để persistent, thêm vào PowerShell profile:

```powershell
notepad $PROFILE
```

Thêm dòng `$env:OPENAI_API_KEY = "sk-..."`, save, restart terminal.

**Mac/Linux (bash/zsh):**

```bash
export OPENAI_API_KEY="sk-..."
```

Thêm vào `~/.bashrc` hoặc `~/.zshrc` để persistent.

## Bước 5 — Mở dự án QC-kit

```bash
cd c:/Users/Admin/Desktop/qc-kit
codex
```

Codex sẽ tự load `.claude/` (skill, rules, config) trong dự án.

## Bước 6 — Verify hoạt động

Gõ thử trong Codex CLI:

```
Liệt kê các skill có trong .claude/skills/
```

Nếu trả về danh sách → cài thành công.

## Bước 7 — Cấu hình permissions

Codex có cơ chế permission tương tự Claude Code. Gõ:

```
/permissions
```

→ cấp quyền tối thiểu cần cho QC-kit.

## Use case chính: chạy batch nhiều UC

Codex CLI mạnh ở việc chạy **batch script**. Ví dụ review nhiều UC cùng lúc:

```bash
for uc in UC-101 UC-102 UC-103; do
  codex --prompt "review uc $uc" --non-interactive
done
```

⚠️ Verify output trước khi commit — batch chạy nhanh nhưng dễ miss edge case.

## Tích hợp CI/CD

Có thể chạy QC-kit trong pipeline (GitHub Actions, GitLab CI):

```yaml
# .github/workflows/qc-review.yml
name: QC Review
on:
  pull_request:
    paths:
      - 'docs/BA/**'

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @openai/codex
      - run: codex --prompt "review uc <UC-ID>" --non-interactive
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      - uses: actions/upload-artifact@v3
        with:
          path: docs/QC/uc-read/
```

⚠️ Nâng cao — chỉ làm khi team có DevOps support.

## Lưu ý bảo mật

⚠️ **API key:**

- Dùng env variable, KHÔNG hardcode trong file
- Trong CI/CD, dùng secrets (GitHub Secrets, GitLab Variables)
- Revoke ngay nếu lộ → tạo key mới

⚠️ **Quota:**

- OpenAI tính phí token theo model — verify tool đang dùng model mong muốn (vd `gpt-5` đắt hơn `gpt-5-mini`)
- Setup spending limit trong OpenAI platform để tránh cháy budget

## Khắc phục lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| `OPENAI_API_KEY is not set` | Set env variable hoặc chạy `codex login` |
| `Rate limit exceeded` | Đợi vài phút hoặc upgrade tier OpenAI |
| Skill không trigger | Verify `.claude/skills/` có folder skill, restart Codex |
| Output kém chất lượng so với Claude | Verify đang dùng model đủ mạnh; thử Claude Code thay |

## Tham khảo

- Official docs: https://platform.openai.com/docs
- Codex GitHub: https://github.com/openai/codex
- Pricing: https://openai.com/pricing

---

**Tiếp theo:** Sau khi cài tool xong, tới [Phần III — Giới thiệu cấu trúc](../structure/overview.md) hoặc đi thẳng [Phần IV — Bắt đầu](../usage/getting-started.md)
