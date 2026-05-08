# Kỷ luật versioning

QC-kit có quy tắc nghiêm khắc về versioning. Tuân thủ đúng → giữ được audit trail rõ ràng, không mất công của ai. Vi phạm → file lẫn lộn, conflict, mất history.

## Quy tắc cốt lõi

> **Mọi file output là immutable. Update = tạo version mới, không overwrite.**

Đây là rule trong **Documentation** tab → "Rules" (xem mục Naming convention). Skill QC-kit tuân thủ tự động — bạn cũng phải tuân thủ khi sửa tay.

---

## 3 nguyên tắc vàng

### 1. Không bao giờ overwrite

❌ Sai:

```
docs/QC/uc-read/UC-101/UC-101_user-login_audited_20260508_v1.md
                                                              ^^
                                              [QC member sửa nội dung file này → overwrite]
```

✅ Đúng:

```
docs/QC/uc-read/UC-101/
├── UC-101_user-login_audited_20260508_v1.md       ← Giữ nguyên
└── UC-101_user-login_audited_20260512_v2.md       ← MỚI, là kết quả update
```

### 2. Bump version khi update

```
v1 → v2 → v3 → ... → v[N]
```

Bump lúc nào:

- Re-audit UC sau khi BA trả lời
- Update test cases khi requirement đổi
- Sửa lỗi nội dung output trước đó

### 3. Skill tự xử lý — bạn chỉ tuân thủ

Skill QC-kit kiểm tra version cũ và tự bump:

- `qc-uc-read`: tìm `UC-XXX_*_audited_*_v[N].md` trong folder, sinh `v[N+1]`
- `qc-func-tc-design`: tương tự với `_testcases_*.xlsx`

Bạn không cần can thiệp logic version — chỉ KHÔNG xoá hay overwrite file cũ.

---

## Ngoại lệ — file ở path cố định

`project-config.md` và `path-registry.md` ở `.claude/config/` là **ngoại lệ**:

- KHÔNG đổi tên file (skill khác reference theo path cố định)
- KHÔNG tạo `project-config_v2.md` ❌
- Update bằng cách bump field `Version` trong header (v1 → v2 → v3 trong cùng 1 file)

Lý do: path cố định cho phép skill tìm file ngay không cần search version. Nếu tạo nhiều version, skill không biết đọc cái nào.

Skill `qc-project-onboarding` tự xử lý ngoại lệ này.

---

## Versioning trong git

QC-kit + Git history = audit trail mạnh:

- File ở filesystem có version `_v1`, `_v2` → dễ navigate trực quan
- Git có commit history → biết ai sửa gì, lúc nào

### Commit message gợi ý

```bash
git add docs/QC/uc-read/UC-101/
git commit -m "qc(UC-101): re-audit v2 after BA answered backlog Q1-Q5"
```

Format đề xuất:

```
qc(<UC-ID>): <action> v<N> [<reason>]
```

Examples:

- `qc(UC-101): first audit v1`
- `qc(UC-101): re-audit v2 after BA answers`
- `qc(UC-201): generate test cases v1`
- `qc(UC-201): update test cases v2 after req changes`

### Branch strategy

Nếu team dùng branch:

- `main` — version đã review
- `qc/<UC-ID>` — branch tạm khi đang work on UC
- Merge qua PR → trigger review

### `.gitignore`

Đảm bảo `.gitignore` có các pattern này:

```
# QC-kit local settings
.claude/settings.local.json

# Temp files
*.tmp
.qc-temp/
```

NHƯNG đảm bảo các file SAU không bị ignore:
- `.claude/skills/`
- `.claude/rules/`
- `.claude/config/`
- `docs/`

---

## Khi version trở nên quá nhiều

Sau vài tháng, folder UC có thể có nhiều version:

```
docs/QC/uc-read/UC-101/
├── UC-101_user-login_audited_20260201_v1.md
├── UC-101_user-login_audited_20260205_v2.md
├── UC-101_user-login_audited_20260208_v3.md
├── UC-101_user-login_audited_20260215_v4.md
├── UC-101_user-login_audited_20260301_v5.md
├── UC-101_user-login_audited_20260315_v6.md
└── UC-101_user-login_audited_20260408_v7.md
```

Trông rối, nhưng đây là **bình thường** — không cần xoá.

### Tip giảm bớt visual clutter

Nếu folder thật sự quá nặng:

- Move các version cũ vào subfolder `_archive/`:
  ```
  docs/QC/uc-read/UC-101/
  ├── UC-101_..._audited_..._v7.md       ← Latest
  ├── UC-101_..._audited_..._v6.md       ← Recent
  └── _archive/
      ├── UC-101_..._audited_..._v1.md
      ├── UC-101_..._audited_..._v2.md
      ├── UC-101_..._audited_..._v3.md
      ├── UC-101_..._audited_..._v4.md
      └── UC-101_..._audited_..._v5.md
  ```
- KHÔNG xoá — chỉ move

⚠️ Sau khi move, verify path-registry vẫn trỏ đúng folder gốc (skill tìm version mới nhất ở folder gốc, không phải `_archive/`).

---

## Anti-pattern — đừng làm

### ❌ Xoá file cũ "cho gọn"

```bash
rm docs/QC/uc-read/UC-101/UC-101_..._audited_..._v1.md
```

→ Mất audit trail. Không biết hồi đó AI review thế nào, BA đã trả lời gì.

✅ Giữ nguyên hoặc move sang `_archive/`.

### ❌ Sửa thẳng file cũ rồi commit

```bash
# Mở file v3, edit nội dung, save
git add docs/QC/uc-read/UC-101/UC-101_..._audited_..._v3.md
git commit -m "fix typo"
```

→ Vi phạm rule immutable. Người khác đã reference v3 cũ → confused.

✅ Re-audit để sinh v4 → fix typo bằng AI re-write.

### ❌ Đổi tên file cũ thành version cao hơn

```bash
mv UC-101_..._audited_..._v1.md UC-101_..._audited_..._v2.md
```

→ Lý do nào cũng vô lý. Đừng làm.

✅ Re-audit để sinh v2 thật.

### ❌ Force push để xoá history

```bash
git push --force
```

→ Mất commit history → mất audit trail. **Không bao giờ force push branch chính.**

✅ Revert bằng commit mới nếu cần undo.

---

## Đối với version cũ — vẫn dùng được không?

Có 2 cách xử lý version cũ:

### Cách A — Coi như history (default)

- Version mới nhất là source of truth
- Version cũ chỉ để lookup khi cần debug
- Không reference từ version mới về version cũ

### Cách B — Track diff giữa version

Đôi khi useful để biết "v3 có gì khác v2":

- Skill `qc-func-tc-design` workflow update tự sinh `_summary_*.md` chứa changelog
- Manual: dùng `git diff` để compare nội dung

```bash
git diff <commit-v2> <commit-v3> -- docs/QC/uc-read/UC-101/
```

---

## Quy ước team đề xuất

Để versioning kỷ luật, team thống nhất:

1. **Không bao giờ xoá file output QC-kit** (chỉ move sang `_archive/` nếu cần)
2. **1 UC chỉ có 1 người drive ở 1 thời điểm** (tránh conflict version)
3. **Mỗi version là 1 commit Git riêng** (không gộp commit)
4. **Code review trước khi merge** version mới quan trọng (vd test cases sắp release)
5. **Quarterly archive** (move version >3 tháng cũ vào `_archive/`)

---

**Tiếp theo:** [Tip cho input đa ngôn ngữ](multilingual.md)
