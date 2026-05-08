# Rules

Rules là luật chung mà AI **luôn tuân thủ trong mọi cuộc hội thoại** — không cần user invoke. Khác với skill (chỉ load khi prompt phù hợp), rule luôn được áp dụng.

## Vị trí

Rules nằm trong `.claude/rules/`:

```
.claude/rules/
├── global-rules.md         ← Luật chung
└── naming-convention.md    ← Quy ước đặt tên file
```

Cả 2 file đều có trigger `always_on` — load mặc định.

## Tổng quan các nhóm rule

### 1. Common

| Rule | Giải thích |
|---|---|
| Skip external knowledge | AI chỉ dùng kiến thức trong dự án — không lôi info ngoài (Wikipedia, kinh nghiệm cá nhân...) |
| Không guess khi prompt mơ hồ | Phải hỏi user clarification, KHÔNG bịa |

### 2. Language & Communication

| Rule | Giải thích |
|---|---|
| Vietnamese mặc định | Mọi giao tiếp với user tiếng Việt |
| Output theo input | Input VN → output VN; Input EN/Hàn/Nhật → output EN |
| skill.md viết bằng English | Skill files (cho AI đọc) viết English |
| Label gốc giữ nguyên | UI label tiếng Hàn/Nhật/TQ giữ nguyên + chú thích Anh trong ngoặc |

### 3. File & Naming Standards

| Rule | Giải thích |
|---|---|
| Theo naming convention | Chi tiết ở [phần dưới](#quy-ước-đặt-tên-file) |
| Không overwrite | Mỗi version mới là 1 file mới |
| Header chuẩn | Mọi output phải có header: title, date, author, version |

### 4. Output Quality

| Rule | Giải thích |
|---|---|
| Evidence-based | Mọi finding phải cite source — section nào, page nào, requirement nào |
| Không fabricate | Không bịa data, không assume requirement không có |
| State uncertainty | Khi không chắc, ghi rõ "uncertain" và hỏi user |

### 5. Agent Boundaries

| Rule | Giải thích |
|---|---|
| Agent focus on its role | Skill A không làm task của skill B |
| Stop & report errors | Gặp ambiguity → stop, report, không fill gaps |
| Log issues | Mọi issue/conflict/missing info phải log vào output report |

### 6. Security & Privacy

| Rule | Giải thích |
|---|---|
| Không share PII / sensitive data | Không upload data nhạy cảm sang AI public |
| Không lưu credentials | KHÔNG ghi password, API key, token vào output file |

---

## Quy ước đặt tên file

Mọi file output do skill sinh ra **bắt buộc** theo pattern:

```
[UC-ID]_[feature-name]_[type]_[YYYYMMDD]_v[N].[ext]
```

### Components

| Component | Format | Ví dụ |
|---|---|---|
| `UC-ID` | `UC-XXX` | `UC-101` |
| `feature-name` | lowercase-kebab, max 3-4 từ | `user-login` |
| `type` | xem bảng dưới | `audited` |
| `date` | `YYYYMMDD` | `20260508` |
| `version` | `vN` (số nguyên) | `v1`, `v2`, `v3` |

### Output Types

| Type | Suffix | Extension | Skill sinh ra |
|---|---|---|---|
| Audited Requirement | `audited` | `.md` | qc-uc-read |
| Test Scenarios | `scenarios` | `.md` | qc-func-scenario-design |
| Test Cases | `testcases` | `.xlsx` | qc-func-tc-design |
| Test Cases Draft | `testcases_draft` | `.md` | qc-func-tc-design |
| Test Cases Summary | `testcases_summary` | `.md` | qc-func-tc-design |
| Question Backlog | `question-backlog` | `.md` | qc-uc-read / qc-qna |

### Ví dụ đặt tên file

✅ Đúng:

- `UC-101_user-login_audited_20260508_v1.md`
- `UC-201_payment-flow_scenarios_20260508_v2.md`
- `UC-101_user-login_testcases_20260510_v1.xlsx`

❌ Sai:

- `UC101_login_audit.md` (thiếu dash, type sai, không có date/version)
- `User Login Audited.md` (không kebab case, có space)
- `audit-uc-101.md` (sai thứ tự component)

### Quy tắc Versioning

📌 **Quy tắc bất biến**: file đã tạo là **immutable**.

- Không xoá file cũ
- Không overwrite content
- Khi update → tạo file mới với `v[N+1]`
- File `v1` còn → giữ nguyên làm history

Ví dụ:

```
docs/QC/uc-read/UC-101/
├── UC-101_user-login_audited_20260508_v1.md   ← Lần review đầu
├── UC-101_user-login_audited_20260510_v2.md   ← Re-audit sau khi BA trả lời
└── UC-101_user-login_audited_20260515_v3.md   ← Re-audit lần 2
```

### Ngoại lệ — file ở path cố định

`project-config.md` và `path-registry.md` nằm ở path cố định (`.claude/config/`) vì các skill đang reference theo path. Nên:

- KHÔNG đổi tên file
- KHÔNG tạo version mới (`project-config_v2.md` ❌)
- Chỉ bump field `Version` trong header (v1 → v2 → v3 trong cùng 1 file)

Skill `qc-project-onboarding` tự xử lý ngoại lệ này.

---

## Vì sao quy ước nghiêm khắc?

1. **Traceability** — nhìn tên file biết ngay UC nào, type gì, ngày tạo, version mấy
2. **Skill auto-discovery** — skill dùng pattern để tìm file mới nhất
3. **Audit trail** — version cũ vẫn còn → review tiến hoá của UC qua thời gian
4. **Conflict resolution** — không bao giờ overwrite → không mất công của ai

## Test bạn đã hiểu rule chưa?

Quiz nhỏ:

1. ❓ BA gửi requirement update — bạn re-audit. File output v3 tạo ra. File v1 và v2 xử lý thế nào?
   - ✅ Giữ nguyên, không xoá
2. ❓ QC member khác đã chạy `review uc UC-101` lúc 9h, ra file `audited_v1`. Bạn lúc 10h cũng chạy lại — sẽ ra gì?
   - ✅ Skill tạo `audited_v2` (không overwrite v1)
3. ❓ project-config có sai info — bạn sửa thế nào?
   - ✅ Sửa trong file, bump field `Version` trong header (KHÔNG tạo file mới)

---

**Tiếp theo:** [Config](config.md)
