# QC Kit — hướng dẫn cho Agent

Repo này dùng **QC Kit v4** (bộ skill QC agentic, nằm tại `.claude/`).

- Khi user chào kiểu **"Hi qc-kit"**, hỏi cách bắt đầu, hỏi việc cần làm tiếp theo, hoặc cần **transfer/bàn giao dự án** → invoke skill **`qc-start`** (KHÔNG tự trả lời từ trí nhớ).
- Mọi quy tắc bắt buộc nằm ở `.claude/rules/` (global-rules, naming-convention, qc-writting-rules); mọi đường dẫn artifact resolve qua `.claude/config/path-registry.md`.
- KHÔNG sửa phần lõi kit (`SKILL.md`, `workflows/`, `references/`, `rules/`, `config/`) trừ khi user là kit owner và yêu cầu rõ.
