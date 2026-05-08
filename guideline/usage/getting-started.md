# Bắt đầu

Trang này hướng dẫn bạn lấy QC-kit về máy, tạo folder dự án, và copy lõi QC-kit vào dự án — chuẩn bị sẵn sàng trước khi chạy Step 0.

> ⏱️ Thời gian: ~10-15 phút

## Bước 1 — Clone QC-kit về máy

QC-kit được lưu trong repo nội bộ team. Clone về:

```bash
git clone <repo-qc-kit-noi-bo> qc-kit
cd qc-kit
```

> 💡 Liên hệ team admin để biết link repo nội bộ. Hoặc xem [Phần I — AI tools tích hợp](../intro/ai-tools.md) để biết cách team tổ chức.

Sau khi clone, kiểm tra cấu trúc:

```
qc-kit/
├── .claude/
│   ├── skills/         ← Các skill QC-kit
│   ├── rules/          ← Luật chung
│   ├── config/         ← Template config
│   └── settings.local.json
├── guideline/          ← Tài liệu này (GitBook)
└── ...
```

## Bước 2 — Tạo folder dự án (nếu chưa có)

Nếu dự án QC của bạn đã có repo Git → bỏ qua bước này.

Nếu chưa có:

```bash
cd <thu-muc-cha>
mkdir <ten-du-an>
cd <ten-du-an>
git init
```

## Bước 3 — Copy `.claude/` vào dự án

Đây là bước quan trọng nhất.

> 📌 **Cảnh báo**: Nếu dự án đã có sẵn các folder `.claude/skills`, `.claude/rules`, `.claude/config` (vì có member khác đã setup) — **chỉ copy file bên trong** từng folder, đừng tạo thêm folder lồng. Nếu không, agent sẽ khó xác định nguồn đúng.

### Trường hợp A — Dự án chưa có `.claude/`

Copy nguyên thư mục:

```bash
# Trên Windows (PowerShell)
xcopy /E /I qc-kit\.claude <du-an-cua-ban>\.claude

# Trên Mac/Linux
cp -r qc-kit/.claude <du-an-cua-ban>/.claude
```

### Trường hợp B — Dự án đã có `.claude/` từ trước

Chỉ copy file bên trong từng subfolder:

```bash
# Windows (PowerShell)
copy qc-kit\.claude\skills\* <du-an-cua-ban>\.claude\skills\
copy qc-kit\.claude\rules\* <du-an-cua-ban>\.claude\rules\
copy qc-kit\.claude\config\* <du-an-cua-ban>\.claude\config\
```

```bash
# Mac/Linux
cp qc-kit/.claude/skills/* <du-an-cua-ban>/.claude/skills/
cp qc-kit/.claude/rules/* <du-an-cua-ban>/.claude/rules/
cp qc-kit/.claude/config/* <du-an-cua-ban>/.claude/config/
```

### Verify đã copy đầy đủ

Trong dự án của bạn, kiểm tra:

```
<du-an-cua-ban>/
└── .claude/
    ├── skills/
    │   ├── qc-project-onboarding/
    │   ├── qc-uc-read/
    │   ├── qc-qna/
    │   ├── qc-func-scenario-design/
    │   ├── qc-func-tc-design/
    │   ├── pdf/
    │   └── docx/
    ├── rules/
    │   ├── global-rules.md
    │   └── naming-convention.md
    ├── config/
    │   ├── project-config.md
    │   └── path-registry.md
    └── settings.local.json
```

## Bước 4 — Tạo cấu trúc thư mục `docs/BA/`

QC-kit cần đọc tài liệu requirement từ folder `docs/BA/`. Tạo cấu trúc cơ bản:

```
<du-an-cua-ban>/
└── docs/
    └── BA/
        ├── Common rules/        ← BA sẽ đặt common rules tại đây
        └── (các folder UC sẽ thêm sau)
```

Lệnh PowerShell tạo nhanh:

```powershell
cd <du-an-cua-ban>
New-Item -ItemType Directory -Force -Path "docs\BA\Common rules" | Out-Null
```

> 💡 Nếu team bạn dùng cấu trúc folder khác (vd `documentation/` thay `docs/`) — cứ tạo theo team, sau đó update `path-registry.md` ở Step 0.

## Bước 5 — Coordinate với BA về tài liệu input

Trước khi chạy Step 0, làm rõ với BA:

- ✅ BA sẽ đặt tài liệu requirement vào `docs/BA/<UC-ID-Report-name>/`
- ✅ Common rules đặt vào `docs/BA/Common rules/`
- ✅ Format ưu tiên: `.md` (dễ cho AI đọc); fallback `.docx`, `.pdf`
- ✅ Đặt tên folder UC nhất quán: `UC-<ID>-<feature-name>` (vd `UC-101-user-login`)
- ✅ Mỗi UC 1 folder, không gộp nhiều UC

Xem chi tiết về tài liệu BA tại [Best practices — Chuẩn bị requirement chất lượng](../best-practices/prepare-requirements.md).

## Bước 6 — Mở dự án trong AI tool

Mở dự án bằng tool đã cài ở Phần II:

- **Antigravity**: File → Open Folder → chọn `<du-an-cua-ban>`
- **Claude Code CLI**: `cd <du-an-cua-ban> && claude`
- **Codex CLI**: `cd <du-an-cua-ban> && codex`

Tool sẽ tự nhận diện `.claude/` và load skills.

## Verify trước khi sang Step 0

- [ ] `.claude/` đã copy đầy đủ vào dự án
- [ ] `docs/BA/Common rules/` đã tạo
- [ ] Đã thống nhất với BA về format và quy ước đặt tên folder UC
- [ ] AI tool đã mở folder dự án
- [ ] Có ít nhất 1 UC requirement BA gửi (để chạy thử Step 1 sau khi qua Step 0)

✅ Đủ → tiếp tục sang Step 0.

---

**Tiếp theo:** [Step 0 — Thông tin chung](step0-info.md)
