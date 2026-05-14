# QC-Kit

Bộ skill + cấu trúc tài liệu chuẩn hóa cho team QC, chạy trên Claude Code. Mỗi skill là một quy trình nghiệp vụ độc lập (review UC, thiết kế scenario, thiết kế test case, v.v.), tự đọc/ghi đúng file qua [path-registry](.claude/config/path-registry.md) và tự cập nhật trạng thái lên [qc-dashboard](docs/qc-lead/qc-dashboard.md).

> **Đối tượng:** QC Lead (setup + quản trị) và QC Member (chạy skill hằng ngày).
> Người dùng cuối / BA / cấp trên xem bản giới thiệu tổng quan ở [guideline/README.md](guideline/README.md).

---

## Mục lục

1. [Cấu trúc thư mục](#1-cấu-trúc-thư-mục)
2. [Workflow tổng quan](#2-workflow-tổng-quan)
3. [Sơ đồ liên kết skill ↔ artifact](#3-sơ-đồ-liên-kết-skill--artifact)
4. [Hướng dẫn cho QC Lead](#4-hướng-dẫn-cho-qc-lead)
5. [Hướng dẫn cho QC Member](#5-hướng-dẫn-cho-qc-member)
6. [Tham chiếu nhanh](#6-tham-chiếu-nhanh)

---

## 1. Cấu trúc thư mục

```
qc-kit/
├── .claude/
│   ├── config/
│   │   └── path-registry.md          # Bảng logical-name → path (mọi skill đều tra ở đây)
│   ├── rules/
│   │   ├── global-rules.md           # Ngôn ngữ, naming, security, work log…
│   │   └── naming-convention.md      # Quy tắc đặt tên file output
│   └── skills/                       # 7 skill QC + 3 skill phụ trợ (docx/pdf/page-inspection)
│       ├── qc-project-onboarding/
│       ├── qc-context-master/
│       ├── qc-dashboard-sync/
│       ├── qc-uc-read/
│       ├── qc-qna/
│       ├── qc-func-scenario-design/
│       └── qc-func-tc-design/
├── docs/
│   ├── BA/                           # Input từ BA (theo UC + common rules)
│   │   ├── Common rule/              #   → logical-name: requirement-common-files
│   │   └── <UC-ID>/                  #   → logical-name: requirement-files
│   ├── qc-lead/
│   │   ├── project-config.md         # Cấu hình dự án (env, account, API…)
│   │   ├── project-context-master.md # 10-section project knowledge core
│   │   ├── qc-dashboard.md           # Feature/UC list + trạng thái
│   │   ├── agent-work-log.md         # Log mỗi lần chạy skill (append-only)
│   │   └── high-level-files/         # WBS, Product Brief, System Architecture…
│   └── QC/                           # Output của team QC
│       ├── uc-read/<UC-ID>/          #   → audited + question-backlog
│       ├── scenarios/<UC-ID>/        #   → test scenarios (.md)
│       └── testcases/<UC-ID>/        #   → test cases (.md + .xlsx)
└── guideline/                        # Docs site (GitBook) dành cho người ngoài
```

---

## 2. Workflow tổng quan

Project chia thành **2 giai đoạn**:

### Giai đoạn 1 — QC Lead - Khởi tạo/Update project context

![QC Lead - Khởi tạo/Update project context](guideline\assets\qc-lead-phase.png)

### Giai đoạn 2 — Test design - Function level

![Test design - Function level](guideline\assets\test-design-phase.png)

---

## 3. Sơ đồ liên kết skill ↔ artifact

Ai đọc gì, ai ghi gì. Khi nghi ngờ "skill này có quyền sửa file kia không", tra bảng này (chi tiết hơn ở [path-registry.md](.claude/config/path-registry.md)).

| Skill | Đọc | Ghi (sole owner) |
|---|---|---|
| `qc-project-onboarding` | `High-level-files`, `project-config` | `project-config`, `path-registry` |
| `qc-context-master` | `High-level-files`, `requirement-common-files`, `project-config` | `project-context-master`, handoff cho `qc-dashboard-sync` |
| `qc-dashboard-sync` | Tất cả thư mục artifact (scan) | `qc-dashboard` cột 1–6 (Site, ID, Module, Name, In scope?, Files stt) |
| `qc-uc-read` | `requirement-common-files`, `requirement-files`, `project-context-master`, `question-backlog` | `uc-review-report`, `qc-dashboard` cột 7 `UC review stt` |
| `qc-qna` | `uc-review-report` | `question-backlog` (sole writer) |
| `qc-func-scenario-design` | `uc-review-report`, `project-context-master` | `func-test-scenarios`, `qc-dashboard` cột 8 `Scenario design stt` |
| `qc-func-tc-design` | `uc-review-report`, `func-test-scenarios`, `project-context-master` | `func-test-cases` (.md + .xlsx), `qc-dashboard` cột 9 `TC design stt` |

**Nguyên tắc bất biến:**
- Mỗi cột dashboard có **1 và chỉ 1** skill làm chủ. Không được "ghi lén" cột không thuộc mình.
- File output có suffix `_v[N]` là **immutable** — sửa = tạo `v[N+1]`, không overwrite.
- File meta-config cố định path (`project-config.md`, `project-context-master.md`, `qc-dashboard.md`, `agent-work-log.md`, `path-registry.md`) — edit in-place, chỉ bump field `Version` trong header.

---

## 4. Hướng dẫn cho QC Lead

QC Lead chịu trách nhiệm **setup dự án** và **giữ knowledge core đồng bộ**. Sau khi setup xong, QC Lead chỉ chạm vào kit khi có thay đổi cấu trúc (UC mới, đổi tech stack, đổi BA team…).

### 4.1. Setup lần đầu cho dự án mới

**Yêu cầu trước khi bắt đầu:**
- BA đã có WBS / Product Brief / Architecture trong [docs/qc-lead/high-level-files/](docs/qc-lead/high-level-files/).
- BA đã có common rules trong `docs/BA/Common rule/`.

**Thứ tự skill (chạy đúng theo thứ tự):**

| # | Lệnh | Mục đích | Output |
|---|---|---|---|
| 1 | `/qc-project-onboarding` | Phỏng vấn QC Lead, điền `project-config.md` và `path-registry.md` | 2 file meta-config |
| 2 | _(auto)_ `/qc-context-master` | Đọc high-level + common, tổng hợp 10-section knowledge core | `project-context-master.md` |
| 3 | _(auto)_ `/qc-dashboard-sync` | Tạo dashboard, populate feature/UC từ WBS | `qc-dashboard.md` |

> Skill 2 và 3 **tự động chạy** sau skill 1 nếu input đủ. QC Lead chỉ cần gõ 1 lệnh: `/qc-project-onboarding`.

### 4.2. Skill bảo trì (chạy khi cần)

| Tình huống | Lệnh | Ghi chú |
|---|---|---|
| BA thêm/đổi UC trong WBS | `/qc-context-master` | Cập nhật feature list, append-only/soft-delete |
| File trong `docs/QC/` thay đổi (xuất hiện file mới, file cũ biến mất) | `/qc-dashboard-sync` | Đồng bộ cột `Files stt` & phát hiện orphan UC |
| Đổi tech stack / thêm môi trường mới | Sửa trực tiếp `project-config.md`, sau đó chạy `/qc-context-master` | |
| Đổi path lưu trữ | Sửa `.claude/config/path-registry.md`, **không** chạy skill nào (mọi skill tự đọc lại) | |

### 4.3. Trách nhiệm QC Lead

- **Kiểm tra `qc-dashboard.md` đầu mỗi sprint** — đảm bảo `In scope?` và `Files stt` đúng thực tế.
- **Trả lời / forward `question-backlog`** của Member tới BA — đảm bảo BA biết câu hỏi nào còn open.
- **Review `project-context-master.md` định kỳ** — đây là single source of truth, sai sẽ ảnh hưởng mọi UC sau đó.
- **KHÔNG sửa tay output của Member** (uc-review-report, scenarios, test cases). Nếu cần sửa, yêu cầu Member chạy lại skill để tạo version mới.

---

## 5. Hướng dẫn cho QC Member

Member làm việc theo **đơn vị UC**. Mỗi UC đi qua 3 skill chính theo thứ tự cố định.

### 5.1. Quy trình chuẩn cho 1 UC

```
   ┌─────────────────────────────────────────────────────────────┐
   │  Bước 1: REVIEW UC                                          │
   │  Lệnh:  /qc-uc-read                                         │
   │  Input: docs/BA/<UC-ID>/...  (BA chuẩn bị)                  │
   │  Output: uc-review-report_v1.md  +  question-backlog.md     │
   │  Verdict: Ready  →  qua Bước 3                              │
   │           Not Ready  →  qua Bước 2                          │
   └─────────────────────────────────────────────────────────────┘
                            ↓ Not Ready
   ┌─────────────────────────────────────────────────────────────┐
   │  Bước 2: BA TRẢ LỜI QUESTION → RE-AUDIT                     │
   │  - Gửi question-backlog cho BA (qua QC Lead hoặc trực tiếp) │
   │  - BA điền cột "Answer" trong question-backlog              │
   │  - Member chạy lại:  /qc-uc-read                            │
   │  Output: uc-review-report_v2.md  (lặp đến khi Ready)        │
   └─────────────────────────────────────────────────────────────┘
                            ↓ Ready
   ┌─────────────────────────────────────────────────────────────┐
   │  Bước 3: THIẾT KẾ TEST SCENARIO                             │
   │  Lệnh:  /qc-func-scenario-design                            │
   │  Output: func-test-scenarios_v1.md                          │
   └─────────────────────────────────────────────────────────────┘
                            ↓
   ┌─────────────────────────────────────────────────────────────┐
   │  Bước 4: THIẾT KẾ TEST CASE                                 │
   │  Lệnh:  /qc-func-tc-design                                  │
   │  Output: func-test-cases_v1.md  +  func-test-cases_v1.xlsx  │
   └─────────────────────────────────────────────────────────────┘
```

### 5.2. Cheat-sheet lệnh

| Việc cần làm | Gõ lệnh |
|---|---|
| Review UC mới (lần đầu) | `/qc-uc-read` rồi cung cấp `<UC-ID>` khi được hỏi |
| Re-audit UC sau khi BA trả lời câu hỏi | `/qc-uc-read` (skill tự nhận biết là re-audit) |
| Chuyển câu hỏi sang BA thủ công | `/qc-qna <UC-ID>` _(thường tự auto-trigger từ `qc-uc-read`)_ |
| Thiết kế scenario sau khi UC đã Ready | `/qc-func-scenario-design` |
| Thiết kế test case (chạy lần đầu) | `/qc-func-tc-design` → trả lời `generate-test-cases` |
| Cập nhật test case sau khi UC v2+ thay đổi | `/qc-func-tc-design` → trả lời `update-test-cases` |

### 5.3. Quy tắc bắt buộc cho Member

- **Luôn xác nhận `<UC-ID>`** trước khi chạy skill — sai UC-ID = sai folder = mất công.
- **Đọc verdict của `qc-uc-read` trước khi sang Bước 3.** Verdict `Not Ready` mà vẫn chạy `qc-func-scenario-design` → output rác.
- **KHÔNG sửa tay file `.xlsx` test case sau khi skill sinh ra.** Nếu cần sửa, sửa file `.md` rồi chạy lại workflow `update-test-cases`.
- **KHÔNG tạo thư mục `docs/QC/.../<UC-ID>/` thủ công.** Skill tự tạo.
- **Khi gặp lỗi/nghi ngờ:** xem file `agent-work-log.md` để biết skill chạy đến phase nào trước khi báo QC Lead.
- **Tài liệu output đều là tiếng Việt** (theo nguồn input). Không tự dịch sang ngôn ngữ khác.

### 5.4. Khi nào cần hỏi QC Lead

- UC-ID không có trong `qc-dashboard.md` → QC Lead cần chạy `/qc-context-master` để thêm.
- `project-context-master.md` thiếu thông tin (vd: platform type, env URL) → QC Lead bổ sung trong `project-config.md`.
- Path lưu output không khớp với folder thực tế → QC Lead sửa `path-registry.md`.

---

## 6. Tham chiếu nhanh

| Cần xem | File |
|---|---|
| Quy tắc chung (ngôn ngữ, naming, security, work log) | [.claude/rules/global-rules.md](.claude/rules/global-rules.md) |
| Quy tắc đặt tên file output | [.claude/rules/naming-convention.md](.claude/rules/naming-convention.md) |
| Map logical-name → path thật | [.claude/config/path-registry.md](.claude/config/path-registry.md) |
| Cấu hình dự án (env, account, API…) | [docs/qc-lead/project-config.md](docs/qc-lead/project-config.md) |
| Knowledge core 10-section | [docs/qc-lead/project-context-master.md](docs/qc-lead/project-context-master.md) |
| Dashboard feature/UC + trạng thái | [docs/qc-lead/qc-dashboard.md](docs/qc-lead/qc-dashboard.md) |
| Log mỗi lần chạy skill | [docs/qc-lead/agent-work-log.md](docs/qc-lead/agent-work-log.md) |
| Định nghĩa chi tiết từng skill | [.claude/skills/<skill-name>/SKILL.md](.claude/skills/) |
