# Bước 1 — Copy QC-kit vào dự án

Để dùng QC-kit, bạn cần tạo folder dự án và copy folder .claude vào folder đó. Nếu hiện tại bạn đã có sẵn folder .claude/rules, config và skills, hãy chỉ copy các file bên trong các folder trên, đừng tạo thêm vì sẽ khiến agent khó xác định được nguồn đúng.
Có 2 cách để copy .claude

## Cách A — Copy trực tiếp (khuyến nghị)

Đơn giản, dễ làm, phù hợp với team chưa quen Git submodule.

1. Clone hoặc download QC-kit về máy:
   ```bash
   git clone <repo-qc-kit-noi-bo> qc-kit
   ```
2. Copy thư mục `.claude/` từ qc-kit sang root dự án của bạn:
   ```
   <du-an-cua-ban>/
   ├── .claude/          ← copy vào đây
   ├── docs/             ← sẽ tạo ở Bước 5
   └── ...
   ```
3. Commit `.claude/` vào git của dự án:
   ```bash
   git add .claude/
   git commit -m "chore: add QC-kit configuration"
   ```

## Cách B — Git submodule (advanced)

Phù hợp khi bạn muốn tự động pull các update của QC-kit từ repo gốc.

```bash
cd <du-an-cua-ban>
git submodule add <repo-qc-kit-noi-bo> .claude
git submodule update --init
```

⚠️ Lưu ý: cách này phức tạp hơn khi sửa cấu hình project-specific, vì `.claude/config/` cũng nằm trong submodule.

## Verify sau khi copy

Sau khi copy, kiểm tra thư mục `.claude/` có đầy đủ:

- [ ] `.claude/skills/` — chứa các thư mục skill (qc-project-onboarding, qc-uc-read, qc-qna, qc-func-scenario-design, qc-func-tc-design, pdf, docx)
- [ ] `.claude/rules/` — chứa `global-rules.md` và `naming-convention.md`
- [ ] `.claude/config/` — chứa `project-config.md` và `path-registry.md`
- [ ] `.claude/settings.local.json` (có thể rỗng hoặc có sẵn)

✅ Nếu đủ, chuyển sang **Bước 2 — Cách chạy kit theo từng giai đoạn**.

---

**Bước tiếp theo:** [Cách chạy kit theo từng giai đoạn](run-by-stage.md)
