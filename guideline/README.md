# QC-kit Guideline

Bộ tài liệu hướng dẫn sử dụng **QC-kit** — công cụ AI agentic dành cho team manual QC.

QC-kit giúp bạn tăng tốc các công việc QC khó nhằn nhất:

- Review tài liệu requirement và phát hiện gap
- Đặt câu hỏi cho BA để hoàn thiện requirement
- Thiết kế test scenarios theo các kỹ thuật chuẩn (BVA, Equivalence Partitioning, Decision Tables)
- Sinh test cases (Excel) sẵn sàng cho execute
- Cập nhật test cases khi requirement thay đổi

QC-kit chạy trên các AI agentic tool phổ biến (Claude Code, Antigravity, OpenAI Codex CLI). Có thể apply nhanh cho mọi dự án bằng cách copy thư mục cấu hình và chạy onboarding.

---

## Tài liệu này dành cho ai?

- **QC Lead** — người setup QC-kit cho dự án mới và quản lý workflow team
- **QC Member** — người dùng skill hằng ngày để review UC, sinh scenarios/test cases
- **BA** — người cung cấp requirement và trả lời gap question

---

## Lộ trình đọc nhanh

| Bạn là... | Đọc theo thứ tự |
|---|---|
| Newbie chưa biết AI agentic | Phần I → II → III → IV |
| Đã biết AI nhưng chưa biết QC-kit | Phần III → IV |
| QC Lead apply dự án mới | Phần II → IV (Bắt đầu) → IV (Step 0) |
| QC Member dùng hằng ngày | Phần IV (Step 1, 2, 3) → V → VI |

Xem chi tiết tại [Lộ trình đọc](intro/reading-paths.md).

---

## Bắt đầu ngay

- 🚀 **Mới bắt đầu?** Đọc [QC-kit và lợi ích](intro/qc-kit.md)
- ⚙️ **Cài đặt môi trường?** Đến [Phần II](env/prerequisites.md)
- 📦 **Apply cho dự án mới?** Đến [Bắt đầu](usage/getting-started.md)
- ❓ **Gặp vấn đề?** Xem [FAQ & Troubleshooting](faq.md)

---

## Phạm vi hiện tại

QC-kit **v1** hỗ trợ:

- ✅ Functional Testing
- ✅ Integration Testing
- ✅ UI Testing
- ✅ End-to-End (E2E) Testing
- ✅ Acceptance Testing

**Chưa hỗ trợ trong v1** (roadmap tương lai):

- ⏳ Module test
- ⏳ System test
- ⏳ Non-functional test (performance, security, load)
- ⏳ Execute test tự động

---

## Đóng góp & phản hồi

QC-kit là **tool sống** — sẽ được team mở rộng và tinh chỉnh theo thời gian. Mọi phản hồi, đề xuất cải tiến đều được hoan nghênh qua kênh team đã thống nhất.
