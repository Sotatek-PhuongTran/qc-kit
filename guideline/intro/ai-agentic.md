# AI Agentic là gì?

## Phân biệt: Chatbot AI vs AI Agentic

|                | Chatbot AI (vd ChatGPT thuần) | AI Agentic (vd Claude Code, Antigravity, Codex CLI)              |
| -------------- | ----------------------------- | ---------------------------------------------------------------- |
| **Input**      | Text bạn gõ                   | Text + file dự án + tool                                         |
| **Output**     | Text trả lời                  | Text + file đã ghi + lệnh đã chạy                                |
| **Khả năng**   | Trò chuyện, soạn thảo         | Trò chuyện + đọc/ghi file + gọi tool + chạy lệnh shell           |
| **Phạm vi**    | Trong ô chat                  | Trong cả thư mục dự án + môi trường máy                          |
| **Ví dụ task** | "Soạn email"                  | "Đọc 3 file requirement, sinh test scenarios, ghi ra `docs/QC/`" |

Nói ngắn: **chatbot AI = trợ lý nói chuyện; AI agentic = trợ lý hành động trên máy bạn**.

## Vì sao QC-kit cần AI agentic?

QC-kit không thể chạy trên chatbot thuần vì các tác vụ QC đòi hỏi:

* **Đọc nhiều file** từ nhiều folder (`docs/BA/<UC>/`, `docs/BA/Common rules/`...)
* **Ghi nhiều file** đúng template, đúng path, đúng version (`<UC-ID>_<feature>_audited_<date>_v<N>.md`)
* **Gọi tool/skill liên hoàn**: qc-uc-read → qc-qna → qc-func-scenario-design → qc-func-tc-design
* **Tuân thủ quy tắc dự án**: naming convention, path-registry, project-config

Chỉ có agentic AI mới làm được liên hoàn các thao tác này theo prompt.

## Cơ chế "skill" trong AI agentic

Skill = một gói kiến thức + quy trình mà AI **load** khi cần thực hiện 1 nhiệm vụ. Mỗi skill có:

* **SKILL.md** — mô tả purpose, workflow, input/output, boundary
* **Templates** — mẫu output cố định
* **Workflows** — các nhánh quy trình (vd first-audit vs re-audit)
* **References** — tài liệu tham khảo (format input, business rule...)

## Cơ chế "rules" — luật chung không cần invoke

Khác với skill, **rules** luôn được AI tuân thủ trong mọi cuộc hội thoại — không cần user ra lệnh.

Rules đảm bảo AI hành xử nhất quán trên toàn dự án, dù ai prompt.

## Tại sao AI agentic hữu ích cho QC manual?

Manual QC tốn nhiều thời gian cho:

* Đọc nhiều tài liệu BA và check chéo nhau
* Áp dụng đầy đủ kỹ thuật test design (BVA, EP, Decision Table)
* Viết test case Excel theo format chuẩn
* Update test case khi requirement đổi
* Tracking version, naming file đúng quy ước

AI agentic xử lý các tác vụ "lặp đi lặp lại có quy trình rõ ràng" này nhanh hơn người **5-10 lần**, để QC member tập trung vào phần đòi hỏi phán đoán: edge case domain-specific, ưu tiên test, business logic phức tạp.

***

**Tiếp theo:** [Các AI tools tích hợp](ai-tools.md)
