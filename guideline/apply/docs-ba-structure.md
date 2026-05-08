# Bước 5 — Cấu trúc thư mục `docs/BA/`

QC-kit cần đọc tài liệu requirement từ BA để chạy. Các tài liệu này phải đặt đúng cấu trúc folder thì skill mới tìm được.

## Cấu trúc mặc định

```
<du-an-cua-ban>/
└── docs/
    └── BA/
        ├── Common rules/                   ← áp dụng cho cả dự án
        │   ├── common-rules.md
        │   ├── business-processes.md
        │   ├── usecase-list.md
        │   └── error-codes.md
        │
        └── <UC-ID>-<feature-name>/         ← 1 folder cho mỗi UC
            ├── UC-XXX-spec.md
            ├── wireframes.png
            ├── api-spec.md
            └── design-doc.docx
```

## Folder `Common rules/`

Chứa các tài liệu **dùng chung cho cả dự án**, không gắn với UC cụ thể nào.

| File mẫu | Nội dung |
|---|---|
| `common-rules.md` | Quy tắc chung: validation, error handling, logging... |
| `business-processes.md` | Quy trình nghiệp vụ tổng thể |
| `usecase-list.md` | Danh sách tất cả UC trong dự án + status |
| `error-codes.md` | Bảng mã lỗi và ý nghĩa |

Khi qc-uc-read review 1 UC, nó sẽ tự đọc folder này để resolve các reference (mã lỗi, business rule ID, function name).

## Folder per-UC

Mỗi UC có 1 folder riêng. Tên folder thường có dạng `UC-XXX-<feature-name>` (ví dụ `UC-101-user-login`).

Trong folder này, BA đặt mọi artifact liên quan đến UC đó:

| Loại file | Format | Mục đích |
|---|---|---|
| UC specification | `.md` (khuyến nghị) hoặc `.docx`, `.pdf` | Mô tả chi tiết flow, business rule, acceptance criteria |
| Wireframes / Mockup | `.png`, `.jpg` | UI design |
| API spec | `.md`, `.json` (OpenAPI), `.yaml` | Contract API |
| Sequence diagram | `.png`, `.md` (mermaid) | Flow giữa các hệ thống |
| Design doc | `.docx`, `.md` | Tài liệu thiết kế bổ sung |

## Format được hỗ trợ

QC-kit có thể đọc các format sau:

| Format | Tốt cho | Skill bổ trợ |
|---|---|---|
| `.md` | Tài liệu text — **dễ đọc nhất cho AI** | Native |
| `.docx` | Tài liệu Word — fallback khi BA quen Word | Skill `docx` |
| `.pdf` | Tài liệu PDF — fallback | Skill `pdf` |
| `.png` / `.jpg` | Wireframe, mockup | AI đọc image trực tiếp |

💡 **Tip**: Khuyến khích BA viết bằng `.md` nếu có thể. AI hiểu chính xác và nhanh hơn so với `.docx`/`.pdf`.

## Quy ước với BA

Để QC-kit chạy ổn định, thống nhất với BA các điểm sau:

1. **Đặt tên folder UC nhất quán**: `UC-<ID>-<feature-name>` (ví dụ `UC-101-user-login`)
2. **Mỗi UC 1 folder**: tránh gộp nhiều UC vào 1 file
3. **File common rules được update khi cần** (không bị "đông cứng")
4. **Wireframe có chú thích**: viết tên field, button rõ ràng trên hình
5. **Version control**: nếu UC update, tạo file mới với `_v2`, `_v3` thay vì overwrite

## Path-registry phải trỏ đúng folder

Sau khi tạo cấu trúc, đảm bảo `path-registry.md` có các dòng sau (đã được điền ở Bước 2):

| Logical Name | Path |
|---|---|
| `requirement-common-files` | `docs/BA/Common rules` |
| `requirement-files` | `docs/BA/<UC-ID-Report-name>` |

---

**Quay về:** [Default permission](permissions.md) | **Bước tiếp theo:** [Checklist verify](verify-checklist.md)
