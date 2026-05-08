# Sơ đồ tổng quan & luồng hoạt động

## Cấu trúc thư mục QC-kit

QC-kit được tổ chức thành 2 phần chính trong dự án:

```
<du-an-cua-ban>/
├── .claude/                    ← QC-kit "lõi" (copy từ repo qc-kit)
│   ├── skills/                 ← Các skill tự động hoá (qc-uc-read, qc-qna...)
│   ├── rules/                  ← Luật chung (global-rules, naming-convention)
│   ├── config/                 ← Cấu hình project-specific
│   │   ├── project-config.md   ← Thông tin dự án (do onboarding fill)
│   │   └── path-registry.md    ← Map tên logic → path thật
│   └── settings.local.json     ← Permission cho AI tool
│
└── docs/                       ← Tài liệu BA + output QC
    ├── BA/                     ← INPUT — BA cung cấp
    │   ├── Common rules/       ← Quy tắc chung dự án
    │   └── <UC-ID>/            ← 1 folder cho mỗi UC
    │
    └── QC/                     ← OUTPUT — QC-kit sinh ra
        ├── uc-read/<UC-ID>/    ← Audit report + question backlog
        ├── test-scenarios/     ← Test scenarios
        └── test-cases/         ← Test cases (Excel)
```

## 3 thành phần lõi của QC-kit

| Thành phần | Vai trò | Trang chi tiết |
|---|---|---|
| **Rules** | Luật chung — AI luôn tuân thủ, không cần invoke | [Rules](rules.md) |
| **Config** | Cấu hình project-specific (info dự án, path) | [Config](config.md) |
| **Skills** | Các quy trình tự động hoá theo task QC | [Skills](skills.md) |

## Luồng hoạt động end-to-end

Sơ đồ tổng quan các bước từ requirement → test cases:

```
┌─────────────────────────────────────────────────────────────────┐
│                     STEP 0 — Onboarding (1 lần)                  │
│                                                                  │
│   QC Lead chạy /qc-project-onboarding                            │
│       ↓                                                          │
│   project-config.md + path-registry.md được fill tự động         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                STEP 1 — Review requirement                       │
│                                                                  │
│   BA viết requirement → docs/BA/<UC-ID>/                         │
│       ↓                                                          │
│   QC Member: review uc <UC-ID>                                   │
│       ↓                                                          │
│   qc-uc-read sinh: uc-review-report + question-backlog           │
│       ↓ (nếu có gap)                                             │
│   qc-qna format backlog → BA trả lời                             │
│       ↓                                                          │
│   QC Member: review uc <UC-ID> (re-audit)                        │
│       ↓                                                          │
│   UC đạt Ready                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                STEP 2 — Create test cases                        │
│                                                                  │
│   QC Member: design test scenarios                               │
│       ↓                                                          │
│   qc-func-scenario-design sinh: scenarios.md                     │
│       ↓                                                          │
│   QC Member: generate test cases                                 │
│       ↓                                                          │
│   qc-func-tc-design sinh: testcases.xlsx + draft + summary       │
│       ↓                                                          │
│   Test cases sẵn sàng cho QA execute                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              STEP 3 — Update test cases (khi cần)                │
│                                                                  │
│   Requirement đổi → BA update docs/BA/<UC-ID>/                   │
│       ↓                                                          │
│   QC Member: update test cases                                   │
│       ↓                                                          │
│   qc-func-tc-design sinh version mới                             │
└─────────────────────────────────────────────────────────────────┘
```

## Quan hệ giữa các skill và artifact

| Skill | Đọc | Ghi |
|---|---|---|
| `qc-project-onboarding` | (interview user) | `project-config.md`, `path-registry.md` |
| `qc-uc-read` | requirement-files, common-files, question-backlog | `uc-review-report`, `question-backlog` |
| `qc-qna` | `uc-review-report` | `question-backlog` |
| `qc-func-scenario-design` | `uc-review-report` | `func-test-scenarios` |
| `qc-func-tc-design` | `uc-review-report`, `func-test-scenarios` | `func-test-cases` (xlsx + draft + summary) |

## Vai trò các bên

| Vai trò | Trách nhiệm |
|---|---|
| **BA** | Viết requirement vào `docs/BA/`, trả lời question backlog |
| **QC Lead** | Setup QC-kit (Step 0), review output, quyết định Ready/Not Ready |
| **QC Member** | Trigger skill (Step 1, 2, 3), gửi câu hỏi BA, finalize test cases |
| **AI Agent** | Thực thi skill — là **drafter**, không phải decider |

## Quy tắc bất di bất dịch

⚠️ Một số quy tắc chỉ cần nhớ:

1. **Không bao giờ overwrite output** — luôn tăng version (`v1` → `v2` → `v3`)
2. **Logical Name trong path-registry** không được đổi (skill reference theo tên này)
3. **Mục 1, 2 của project-config bắt buộc** — không có thì skill không chạy
4. **AI là drafter, không phải decider** — luôn review trước khi handover

---

**Tiếp theo:** [Rules](rules.md)
