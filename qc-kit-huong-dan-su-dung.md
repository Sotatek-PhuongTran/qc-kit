# Hướng dẫn sử dụng QC-Kit

**Ngày tạo:** 2026-05-21
**Tác giả:** QC Lead
**Phiên bản:** v5

---

## 1. Giới thiệu

> **Mục này trả lời:** QC-Kit là gì? Dành cho ai? Tương tác với kit như thế nào?

### QC-Kit là gì?

QC-Kit là bộ công cụ hỗ trợ QC (Quality Control) tự động hóa, chạy được trên các AI Agentic tools như: Claude Code, Antigravity, CodeX.

Thay vì bạn phải đọc hàng chục trang tài liệu yêu cầu rồi tự viết test case từ đầu, QC-Kit sẽ làm phần nặng nhọc đó giúp bạn:

| Việc trước đây bạn phải làm thủ công | QC-Kit làm giúp                                           |
| ---------------------------------------------- | ----------------------------------------------------------- |
| Đọc UC, tìm lỗ hổng trong yêu cầu       | Tự phân tích và liệt kê gap, mâu thuẫn              |
| Nghĩ kịch bản test                          | Tự sinh scenario (happy path, negative, edge case)         |
| Viết test case chi tiết vào Excel           | Tự xuất file .xlsx với steps, expected result, test data |
| Theo dõi tiến độ từng UC                  | Dashboard tự cập nhật trạng thái                       |

### Ai nên dùng?

- **QC/Tester** — người trực tiếp review yêu cầu và viết test case
- **QC Lead** — người quản lý tiến độ QC cho cả dự án
- Không cần biết lập trình, không cần hiểu AI hoạt động thế nào

### Cách tương tác

Bạn gọi các skills bằng cách gõ /tên skill, sau đó gõ lệnh bằng **tiếng Việt tự nhiên** vào ô chat của Claude Code. Ví dụ:

- `/qc-uc-read review uc đăng nhập`
- `/qc-func-scenario-design design test scenarios cho UC-101`
- `/qc-func-tc-design generate test cases cho UC-101`

Kit sẽ đọc tài liệu, xử lý, và trả kết quả ngay trong chat + xuất file output.

---

## 2. Cài đặt & Khởi động

> **Mục này trả lời:** Cần chuẩn bị gì trên máy? Mở kit lên như thế nào?

### Yêu cầu hệ thống

| Yêu cầu   | Chi tiết                                        |
| ----------- | ------------------------------------------------ |
| IDE         | VS Code (bản mới nhất)                        |
| Extension   | Claude Code (cài từ VS Code Marketplace)       |
| Source code | Clone repo `qc-kit` về máy                   |
| Tài khoản | Tài khoản Claude Code đã được kích hoạt |

### Các bước mở project

1. Mở **VS Code**
2. Vào **File → Open Folder** → chọn thư mục `qc-kit`
3. Mở panel **Claude Code** (biểu tượng chat bên phải hoặc `Ctrl+Shift+P` → "Claude Code")
4. Gõ lệnh đầu tiên vào ô chat

---

## 3. Cấu trúc thư mục

> **Mục này trả lời:** File dầu vào được đặt ở đâu? Output xuất ra được lưu ở đâu? Thư mục nào kit tự quản lý? Thư mục nào bạn cần cung cấp dữ liệu?

```
qc-kit/
├── docs/
│   ├── BA/                    ← Đặt file yêu cầu (UC) từ BA vào đây
│   │   ├── Common rule/       ← Quy tắc chung (business rules, mã lỗi...)
│   │   └── <UC-ID>/           ← Tài liệu yêu cầu theo từng UC
│   ├── QC/                    ← Output của kit xuất ra đây (tự động)
│   │   ├── uc-read/<UC-ID>/   ← Báo cáo review UC
│   │   ├── scenarios/<UC-ID>/ ← File kịch bản test
│   │   └── testcases/<UC-ID>/ ← File test case (.md + .xlsx)
│   └── qc-lead/               ← Kit tự quản lý (dashboard, config, site-map)
│       └── high-level-files/  ← Đặt tài liệu tổng quan dự án vào đây
```

**Bạn chỉ cần quan tâm 2 nơi để đặt file:**

1. `docs/BA/` — file yêu cầu từ BA
2. `docs/qc-lead/high-level-files/` — tài liệu tổng quan dự án

Phần còn lại kit tự quản lý, bạn không cần sửa tay.

---

## 4. Quy trình làm việc (Workflow)

> **Mục này trả lời:** Với một project thực tế, kit chạy theo thứ tự nào?

QC-Kit hoạt động theo chuỗi tuần tự. Mỗi bước tạo ra output làm đầu vào cho bước tiếp theo.

```
Step 1: Project Onboarding (chạy 1 lần duy nhất khi bắt đầu dự án)
    ↓
Step 2: Build Project Context (tổng hợp kiến thức dự án)
    ↓
Step 3: Build Site Map (vẽ bản đồ màn hình & luồng nghiệp vụ)
    ↓
Step 4: Sync Dashboard (đồng bộ bảng theo dõi tiến độ)
    ↓
Step 5: Review UC (kiểm tra chất lượng từng Use Case — lặp lại cho mỗi UC)
    ↓
Step 6: Design Test Scenarios (thiết kế kịch bản test)
    ↓
Step 7: Generate Test Cases (sinh test case chi tiết ra Excel)
```

**Nguyên tắc cơ bản:**

- Step 1–4: chạy bởi Leader, chạy **một lần** khi bắt đầu dự án (hoặc khi có thay đổi lớn)
- Step 5–7: chạy **lặp lại** cho từng UC

---

## 5. Chi tiết từng bước trong Workflow

> **Mục này trả lời:** Mỗi lệnh cụ thể làm gì? Cần chuẩn bị gì? Output là gì?

### Step 1 — Project Onboarding

**Lệnh:** `/qc-project-onboarding`

**Mục đích:** Khởi tạo cấu hình dự án lần đầu tiên.

**Bạn cần chuẩn bị:**

- Tên dự án, nền tảng (Web/Mobile/Both)
- Thông tin môi trường (DEV/QA/UAT) và URL
- Thông tin team (BA, Dev, QC)

**Kit sẽ làm:**

1. Hỏi bạn thông tin dự án qua chat
2. Tạo file `project-config.md` — lưu metadata dự án
3. Tạo file `path-registry.md` — cấu hình đường dẫn cho toàn bộ artifact
4. Nếu thư mục `high-level-files/` đã có tài liệu → tự động chạy tiếp Step 2

**Output:** File cấu hình dự án, sẵn sàng cho các bước tiếp theo.

---

### Step 2 — Build Project Context

**Lệnh:** `/qc-context-master`

**Mục đích:** Tổng hợp toàn bộ kiến thức dự án thành 1 file để kit "hiểu" dự án.

**Bạn cần chuẩn bị:**

- Đặt các file tổng quan dự án vào `docs/qc-lead/high-level-files/`:
  - Product Brief / PRD
  - WBS (Work Breakdown Structure)
  - Danh sách UC (UC List)
  - System Architecture (nếu có)
  - Assumptions & Constraints (nếu có)

**Kit sẽ làm:**

1. Đọc tất cả file trong `high-level-files/`
2. Đọc Common Rules (quy tắc chung về mã lỗi, format, validation)
3. Tổng hợp thành 10 mục kiến thức: loại sản phẩm, modules, actors, business rules, tech stack, ràng buộc, rủi ro...
4. Xuất `project-context-master.md`

**Output:** File "bộ não" của dự án — tất cả skill phía sau đều đọc file này.

---

### Step 3 — Build Site Map

**Lệnh:** `/qc-site-map`

**Mục đích:** Vẽ bản đồ toàn bộ màn hình, luồng nghiệp vụ, và mối liên kết giữa chúng.

**Kit sẽ làm:**

1. Đọc project context để hiểu dự án
2. Phân tích UC List, wireframe, spec → liệt kê toàn bộ màn hình
3. Xác định luồng nghiệp vụ (user flow) giữa các màn hình
4. Map từng UC vào màn hình tương ứng
5. Đánh dấu điểm regression (màn hình ảnh hưởng nhiều UC)

**Output:** `qc-site-map.md` — bản đồ hệ thống phục vụ cho test design.

---

### Step 4 — Sync Dashboard

**Lệnh:** `/qc-dashboard-sync`

**Mục đích:** Tạo/cập nhật bảng tổng hợp tiến độ QC cho toàn bộ dự án.

**Kit sẽ làm:**

1. Đọc danh sách UC từ site-map
2. So sánh với dashboard hiện tại → phát hiện UC mới/bị xóa
3. Quét thư mục output để kiểm tra artifact nào đã tồn tại
4. Cập nhật trạng thái từng UC: đã review chưa, đã có scenario chưa, đã có TC chưa

**Output:** `qc-dashboard.md` — bảng 1 dòng/UC với trạng thái đầy đủ. Đây là nơi bạn nhìn để biết "UC nào cần làm tiếp".

---

### Step 5 — Review UC (Use Case)

**Lệnh:** `/qc-uc-read` hoặc gõ `review uc UC-101`

**Mục đích:** Kiểm tra chất lượng tài liệu yêu cầu trước khi viết test — phát hiện lỗ hổng sớm, tiết kiệm effort.

**Bạn cần chuẩn bị:**

- Đặt file UC từ BA vào thư mục `docs/BA/<UC-ID>/`

**Kit sẽ làm:**

1. Đọc file UC + project context + common rules
2. Kiểm tra cấu trúc: có đủ mục không (precondition, main flow, alt flow, business rules...)
3. Phát hiện mâu thuẫn nội bộ (flow nói A nhưng rule nói B)
4. Phát hiện thiếu sót (không có xử lý lỗi, thiếu edge case)
5. Cross-check với UC khác và common rules
6. Chấm điểm sẵn sàng + liệt kê gap + sinh câu hỏi cho BA
7. Tự chuyển câu hỏi sang question-backlog cho BA trả lời

**Output:**

- Điểm sẵn sàng: 0–100%
- Verdict: **Ready** / **Not Ready** / **Conditionally Ready**
- Danh sách lỗ hổng, mâu thuẫn, câu hỏi cần hỏi BA

---

### Step 6 — Design Test Scenarios

**Lệnh:** `/qc-func-scenario-design` hoặc gõ `design test scenarios cho UC-101`

**Mục đích:** Thiết kế kịch bản test từ UC đã được review.

**Điều kiện:** UC phải đạt Ready hoặc Conditionally Ready ở Step 5.

**Kit sẽ làm:**

1. Đọc UC review report (bản audited)
2. Phân tích từng luồng → tách thành scenario groups
3. Sinh kịch bản theo 3 nhóm:
   - **Happy path** — luồng chính, đúng nghiệp vụ
   - **Negative** — nhập sai, vi phạm rule, dữ liệu không hợp lệ
   - **Edge case** — giới hạn, timeout, concurrent, boundary
4. Đánh priority: Critical / High / Medium / Low

**Output:** File `.md` với bảng scenario có ID, mô tả, precondition, expected result.

---

### Step 7 — Generate Test Cases

**Lệnh:** `/qc-func-tc-design` hoặc gõ `generate test cases cho UC-101`

**Mục đích:** Sinh test case chi tiết từ scenario, xuất ra file Excel.

**Điều kiện:** Đã có file scenario từ Step 6.

**Kit sẽ làm:**

1. Đọc scenario file + UC review report + common rules
2. Với mỗi scenario → sinh 1 hoặc nhiều test case chi tiết
3. Mỗi test case gồm: ID, tên, precondition, steps (từng bước thao tác), expected result, test data, priority
4. Xuất bản nháp `.md` → tự convert sang `.xlsx`

**Output:** File Excel (.xlsx) chứa test case chi tiết, sẵn sàng để execute.

---

## 6. Tổng quan về các file cần chú trọng trong Kit — Phân loại theo mức độ tùy chỉnh

> **Mục này trả lời:** Bên trong kit có những file gì? File nào dùng ngay, file nào cần chỉnh sửa cho phù hợp dự án?

QC-Kit không chỉ có lệnh để chạy — bên trong còn có nhiều file quy định cách kit hoạt động. Hiểu được file nào "dùng ngay", file nào "cần custom" sẽ giúp bạn kiểm soát chất lượng output tốt hơn.

### Cách đọc bảng dưới đây

| Nhóm                              | Ý nghĩa                                                                              | Bạn cần làm gì?                        |
| ---------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| **A — Dùng ngay**          | File đã hoàn chỉnh, không cần sửa. Đọc để hiểu kit hoạt động thế nào. | Đọc hiểu (chỉnh sửa là optional) |
| **B — Custom theo dự án** | File cần chỉnh sửa để kit ra output đúng chuẩn của team/dự án bạn.         | Đọc hiểu + chỉnh sửa                  |

---

### Nhóm A — Dùng ngay (không cần sửa)

Các file này là "bộ máy" bên trong kit. Bạn không bắt buộc cần sửa, nhưng đọc qua sẽ hiểu kit đang làm gì.

| Loại file                                                 | Vai trò                                                                                        | Tại sao không cần sửa?                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rules/` (`global-rules.md`, `naming-convention.md`) | Quy tắc vận hành chung: ngôn ngữ output, cách đặt tên file, tiêu chuẩn chất lượng | Là nguyên tắc nền tảng áp dụng cho mọi dự án, không phụ thuộc ngữ cảnh cụ thể                                                                                                                                                                                                        |
| `SKILL.md` (mỗi skill có 1 file)                       | "Bộ não" của từng lệnh — quy định skill đọc gì, xử lý ra sao, xuất gì            | Logic đã được tối ưu và đã được kiểm thử, thay đổi ko rõ ràng có thể làm hỏng flow. Nếu dự án cần chỉnh sửa, vui lòng xem xét kĩ lưỡng, đảm bảo hiểu rõ về nội dung chỉnh sửa và ảnh hưởng nếu chỉnh sửa. |
| `workflows/` (các file phase-*.md)                      | Chia nhỏ logic skill thành từng bước tuần tự (phase 1 → phase 2 → ...)                 | Là chi tiết triển khai nội bộ, không ảnh hưởng đến format output                                                                                                                                                                                                                           |
| `templates/` (các file *-template.md)                   | Khung format cho file output (dashboard, review report, question-backlog...)                    | Format output đã chuẩn hóa theo output thông thường của QC, thay đổi cần hiểu sâu cấu trúc kit và cần người thay đổi có kĩ năng chuyên môn tốt                                                                                                               |
| `scripts/` (`md_to_xlsx.py`)                           | Script chuyển đổi định dạng (markdown → Excel)                                           | Công cụ kỹ thuật thuần túy, không liên quan đến nội dung test                                                                                                                                                                                                                              |
| Utility skills (`pdf`, `docx`, `page-inspection`)    | Công cụ hỗ trợ đọc/tạo file, không thuộc QC flow chính                                | Là tiện ích chung, hoạt động độc lập với dự án                                                                                                                                                                                                                                            |

---

### Nhóm B — Custom theo dự án (cần đọc & chỉnh sửa)

Đây là các file bạn **nên review và điều chỉnh** khi áp dụng kit cho dự án mới. Nếu không custom, kit vẫn chạy được nhưng output có thể chưa đúng chuẩn với mỗi team.

---

#### B1. Path Registry — Quản lý đường dẫn thư mục

|                         |                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **File**          | `.claude/config/path-registry.md`                                                                        |
| **Thuộc**        | Toàn bộ kit (mọi skill đều đọc file này)                                                           |
| **Mục đích**   | Bảng ánh xạ tên logic → đường dẫn thực tế. Kit tra cứu file này mỗi khi cần đọc/ghi file. |
| **Khi nào sửa** | Khi cấu trúc thư mục dự án khác mặc định, hoặc muốn đổi nơi lưu output                     |
| **Cách sửa**    | Mở file, thay giá trị cột `Path` cho artifact tương ứng                                           |

---

#### B2. Input File Format — Mô tả cấu trúc file UC

|                         |                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**          | `.claude/skills/qc-uc-read/references/input-files-format.md`                                                                                             |
| **Thuộc**        | Skill `qc-uc-read` (Review UC)                                                                                                                           |
| **Mục đích**   | Mô tả format file Use Case mà BA gửi: section nào là precondition, main flow, business rules... Kit dựa vào đây để đọc hiểu UC chính xác. |
| **Khi nào sửa** | Khi BA dùng template UC khác mặc định (format công ty, Jira, Confluence...)                                                                          |
| **Mở rộng**     | Có thể bổ sung format cho các loại file khác nếu BA cung cấp nhiều loại tài liệu                                                               |

**Lưu ý:** Nếu format file UC thực tế không khớp với mô tả trong file này → kit có thể đọc sai hoặc bỏ sót thông tin quan trọng.

---

#### B3. Instruction Rule — Quy tắc viết test case

|                         |                                                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**          | `.claude/skills/qc-func-tc-design/rules/testcase-instruction-rules.md`                                                                                  |
| **Thuộc**        | Skill `qc-func-tc-design` (Generate Test Cases)                                                                                                         |
| **Mục đích**   | Quy định cách viết test case: ngôn ngữ, cách viết từng mục (steps, expected result, precondition), các loại case bắt buộc, format naming... |
| **Khi nào sửa** | Khi đổi template TC, đổi cách viết, hoặc có quy chuẩn mới từ khách hàng                                                                      |

**Ví dụ custom:**

- Đổi ngôn ngữ viết TC (Việt → Anh hoặc mix)
- Đổi cách viết steps: từ verb-first ("Click vào nút Submit") sang object-first ("Nút Submit → click")
- Thêm/bớt trường bắt buộc trong mỗi TC
- Đổi quy tắc đặt tên TC ID

---

#### B4. Design Technical — Phương pháp & kỹ thuật thiết kế test

|                               |                                                                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**                | `.claude/skills/qc-func-tc-design/references/design-technical/*.md`                                                                                                                     |
| **Thuộc**              | Skill `qc-func-tc-design` (Generate Test Cases)                                                                                                                                         |
| **Mục đích**         | Hướng dẫn kit dùng phương pháp test nào (Equivalence Partitioning, Boundary Value, Decision Table, State Transition...) cho từng loại nền tảng.                               |
| **Các file hiện có** | `design-technical-web-static.md`, `design-technical-web-responsive.md`, `design-technical-mobile-native.md`, `design-technical-mobile-hybrid.md`, `design-technical-desktop.md` |
| **Khi nào sửa**       | Khi dự án có yêu cầu đặc thù về phương pháp test, hoặc muốn thêm/bớt kỹ thuật                                                                                           |

**Đặc biệt:** Một dự án có thể áp dụng nhiều hơn 1 loại (ví dụ: web-responsive + mobile-native) → kit sẽ sinh nhiều hơn 1 file test cases cho 1 UC.

---

#### B5. Test Case Reference — File mẫu để AI tham khảo

|                               |                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **File**                | `.claude/skills/qc-func-tc-design/references/Testcase-refer-*.md` và `.xlsx`                          |
| **Thuộc**              | Skill `qc-func-tc-design` (Generate Test Cases)                                                          |
| **Mục đích**         | File test case mẫu để kit học theo phong cách viết, mức độ chi tiết, và format.                 |
| **Các file hiện có** | `Testcase-refer-en.md`, `Testcase-refer-en.xlsx`, `Testcase-refer-vi.md`, `Testcase-refer-vi.xlsx` |
| **Khi nào sửa**       | Khi muốn kit viết giống phong cách team, hoặc có TC mẫu đã được approve                        |

**Tip:** Đặt 2–3 file mẫu chất lượng tốt (đã được QC Lead hoặc khách hàng duyệt) vào đây. Kit sẽ tự học theo.

---

#### B6. Scoring Rubric — Thang điểm đánh giá UC

|                         |                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **File**          | `.claude/skills/qc-uc-read/references/scoring-rubric.md`                                                    |
| **Thuộc**        | Skill `qc-uc-read` (Review UC)                                                                              |
| **Mục đích**   | Quy định cách chấm điểm sẵn sàng (0–100%) cho UC: trọng số từng mục, ngưỡng Ready/Not Ready    |
| **Khi nào sửa** | Khi muốn thay đổi tiêu chí đánh giá (ví dụ: dự án đơn giản thì hạ ngưỡng Ready xuống 70%) |

---

### Tổng hợp nhanh — Bảng phân loại toàn bộ

| #  | File / Thư mục                                          | Nhóm           | Sửa khi nào?                     |
| -- | --------------------------------------------------------- | --------------- | ---------------------------------- |
| 1  | `path-registry.md`                                      | B — Custom     | Đổi cấu trúc thư mục dự án |
| 2  | `qc-uc-read/references/input-files-format.md`           | B — Custom     | BA đổi template UC               |
| 3  | `qc-uc-read/references/scoring-rubric.md`               | B — Custom     | Đổi tiêu chí chấm điểm UC   |
| 4  | `qc-func-tc-design/rules/testcase-instruction-rules.md` | B — Custom     | Đổi cách viết / template TC    |
| 5  | `qc-func-tc-design/references/design-technical/*.md`    | B — Custom     | Đổi phương pháp test          |
| 6  | `qc-func-tc-design/references/Testcase-refer-*`         | B — Custom     | Muốn kit viết giống mẫu team   |
| 7  | `rules/global-rules.md`                                 | A — Dùng ngay | Không cần sửa                   |
| 8  | `rules/naming-convention.md`                            | A — Dùng ngay | Không cần sửa                   |
| 9  | Tất cả `SKILL.md`                                     | A — Dùng ngay | Không cần sửa                   |
| 10 | Tất cả `workflows/`                                   | A — Dùng ngay | Không cần sửa                   |
| 11 | Tất cả `templates/`                                   | A — Dùng ngay | Không cần sửa                   |

---

## 7. Lưu ý khi sử dụng

> **Mục này trả lời:** Có gì cần biết thêm khi dùng kit hàng ngày?

| Lưu ý                         | Chi tiết                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| Ngôn ngữ                      | Gõ tiếng Việt tự nhiên, không cần nhớ cú pháp chính xác                     |
| Versioning                      | File không bao giờ bị ghi đè — mỗi lần chạy tạo version mới (v1 → v2 → v3) |
| Khi kit hỏi lại               | Trả lời bình thường — kit cần thêm thông tin để làm chính xác hơn        |
| Khi kết quả chưa đúng      | Nói "sửa lại phần X" hoặc "chạy lại" — kit sẽ điều chỉnh                    |
| Khi không biết làm gì tiếp | Gõ `/qc-dashboard-sync` để xem trạng thái tổng thể                             |

---

## 8. Ví dụ phiên làm việc thực tế

> **Mục này trả lời:** Một phiên làm việc thực tế trông như thế nào từ đầu đến cuối?

```
Bạn:    review uc UC-101
Kit:    [Đọc file, phân tích...]
        → Báo cáo: Điểm 75/100, phát hiện 3 lỗ hổng, 5 câu hỏi cần hỏi BA
        → Verdict: Conditionally Ready

Bạn:    (Gửi câu hỏi cho BA, BA trả lời, chạy lại review)
        review uc UC-101
Kit:    → Điểm 95/100, Verdict: Ready

Bạn:    design test scenarios cho UC-101
Kit:    → Tạo file scenario: 4 happy path, 5 negative, 3 edge case (12 kịch bản)

Bạn:    generate test cases cho UC-101
Kit:    → Xuất file Excel: 45 test cases chi tiết với steps + expected result
```

---

## 9. Khi nào cần chạy lại?

> **Mục này trả lời:** Khi dự án có thay đổi, tôi cần chạy lại lệnh nào?

Không phải lúc nào cũng chạy từ đầu. Dưới đây là hướng dẫn nhanh:

| Có thay đổi gì?                             | Chạy lệnh nào?                                                    |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| File tổng quan dự án thay đổi (WBS, Brief) | `/qc-context-master` → `/qc-site-map` → `/qc-dashboard-sync` |
| UC List thay đổi (thêm/bớt UC)              | `/qc-site-map` → `/qc-dashboard-sync`                           |
| BA gửi/sửa file UC cụ thể                   | `/qc-uc-read <UC-ID>`                                              |
| BA trả lời câu hỏi trong backlog            | `/qc-uc-read <UC-ID>` (re-audit)                                   |
| UC đã Ready, muốn viết test                 | `/qc-func-scenario-design` → `/qc-func-tc-design`               |
| Muốn xem tiến độ tổng thể                 | `/qc-dashboard-sync`                                               |

**Lưu ý:** Một số lệnh tự gọi lệnh tiếp theo (auto-chain). Ví dụ lần đầu chạy `/qc-context-master` sẽ tự gọi `/qc-site-map` → `/qc-dashboard-sync`. Bạn không cần chạy thủ công từng cái.

---

## 10. Xử lý sự cố

> **Mục này trả lời:** Kit báo lỗi hoặc kết quả sai thì làm gì?

| Tình huống                      | Cách xử lý                                                      |
| --------------------------------- | ------------------------------------------------------------------ |
| Kit báo "không tìm thấy file" | Kiểm tra đã đặt file vào đúng thư mục chưa (xem mục 3) |
| Kit báo "UC chưa ready"         | Gửi câu hỏi cho BA sửa UC trước, rồi chạy lại review      |
| Kit bị gián đoạn giữa chừng | Gõ lại lệnh — kit hỗ trợ resume, không mất tiến độ      |
| Muốn xem kit đã làm gì       | Mở file `docs/qc-lead/agent-work-log.md`                        |
| Kết quả không chính xác      | Nói rõ phần nào sai, kit sẽ sửa lại                         |

---

## 11. Tóm tắt

> **Mục này trả lời:** Tóm gọn lại, tôi chỉ cần nhớ gì?

**5 điều cần nhớ:**

1. Đặt tài liệu vào đúng thư mục (`docs/BA/` và `docs/qc-lead/high-level-files/`)
2. Gõ lệnh bằng tiếng Việt tự nhiên nếu ko nhớ câu lệnh
3. Kit làm → bạn review kết quả, nhớ phải review kết quả. Điều gì quan trọng cần nhắc nhiều lần.
4. OK → chuyển bước tiếp. Chưa OK → yêu cầu kit sửa hoặc hỏi đáp, yêu cầu BA bổ sung
5. Xem dashboard để biết tiến độ tổng thể.

**Không cần biết code. Không cần hiểu AI. Chỉ cần biết đặt file ở đâu và gõ lệnh gì.**
