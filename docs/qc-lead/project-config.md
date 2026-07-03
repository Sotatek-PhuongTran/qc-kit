# Project Configuration

> **Project:** [Insert tên dự án]
> **Created:** [Insert ngày tạo YYYY-MM-DD]
> **Author:** QC Lead
> **Version:** v1

Tệp này đóng vai trò là biểu mẫu cấu hình cho dự án thực tế sử dụng Framework JOYs. Hãy điền các thông tin chi tiết dưới đây để các BA, QA và các AI Agent hiểu được bối cảnh, các liên kết và môi trường của dự án đang được kiểm thử.

> 💡 **Cách điền nhanh nhất:** chạy `/qc-project-onboarding` — skill sẽ phỏng vấn và điền giúp bạn từng mục. Mục 1–2 là bắt buộc; mục 3–4 bắt buộc nếu dự án dùng tầng automation.

---

## 1. Project Overview

> **Project name:** [Insert tên dự án]
> **Description:** [Insert mô tả ngắn 1–3 câu: dự án làm gì, cho ai dùng]
> **Domain:** [Insert lĩnh vực, ví dụ: e-commerce, healthcare, fintech...]
> **Project language:** [Insert ngôn ngữ tài liệu dự án: Vietnamese / English]
---

## 2. Associated Links & Resources

Cung cấp các liên kết liên quan đến dự án, không bao gồm các link môi trường.

| Resource Type    | URL / Link                                      | Note / Access Requirement                |
|------------------|-------------------------------------------------|------------------------------------------|
| **Jira Board**   | `https://[company].atlassian.net/...`           | Sprint tracking, bug reporting           |
| **Confluence**   | `https://[company].atlassian.net/...`           | PRD, Architecture, API Specs             |
| **Figma / UI**   | `https://figma.com/file/...`                    | Design mockups and design system         |
| **Git Repo**     | `https://github.com/... / https://gitlab/...`   | Source code repository                   |
| **CI/CD Pipeline**| `https://jenkins... / https://github.com/...` | Deployment and pipeline tracking         |
| **Others**       | `...`                                           | E.g., API documentation (Swagger, Postman)|

---

## 3. Environments

Cung cấp links đến các môi trường đang được sử dụng. Điều này rất quan trọng cho việc thực thi kiểm thử và ngữ cảnh kiểm thử thủ công.

> ⚠️ CHỈ khai báo môi trường KHÔNG PHẢI production — tầng automation sẽ từ chối chạy trên môi trường vận hành thật. Mỗi portal (Admin, User...) khai 1 dòng.

| Environment  | URL Endpoint                  | Database (Optional)          | Purpose                           |
|-------------|-------------------------------|------------------------------|-----------------------------------|
| [Insert tên môi trường + portal, ví dụ: DEV - Admin portal] | `https://[dev-url]/...` | `[dev-db... — bỏ trống nếu không có]` | [Insert mục đích] |
| [Insert dòng tiếp theo nếu có nhiều portal/môi trường] | `https://[dev-url]/...` | | |

---

## 4. Accounts & Credentials Structure

Không cung cấp các tài khoản có quyền hạn thay đổi dữ liệu trên môi trường thực (production). Chỉ cung cấp các tài khoản kiểm thử.

> ⚠️ Mỗi vai trò (role) mà test case cần đăng nhập khai 1 dòng. Đây là nơi DUY NHẤT chứa mật khẩu test — các file khác của kit không bao giờ ghi lại mật khẩu.

| Account Type      | Username / Email Format       | Role Description                                  | Password |
|-------------------|-------------------------------|---------------------------------------------------|------------------------|
| [Insert vai trò + portal, ví dụ: Admin - Admin portal] | `[Insert email tài khoản test]` | [Insert mô tả quyền hạn] | `[Insert mật khẩu test]` |
| [Insert dòng tiếp theo cho từng vai trò khác] | | | |
---

## 5. Third-Party Integrations / APIs

Liệt kê các dịch vụ hoặc API bên ngoài mà dự án phụ thuộc vào, những hệ thống này có thể cần cấu hình hoặc dữ liệu kiểm thử đặc biệt.

- **Payment Gateway:** [e.g., Stripe Sandbox endpoints]
- **Email Service:** [e.g., Mailgun (Testing keys)]
- **Authentication:** [e.g., Auth0, Firebase Auth]

---
