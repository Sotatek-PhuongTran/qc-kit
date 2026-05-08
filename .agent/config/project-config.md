# Project Configuration

Tệp này đóng vai trò là biểu mẫu cấu hình cho dự án thực tế sử dụng Framework JOYs. Hãy điền các thông tin chi tiết dưới đây để các BA, QA và các AI Agent hiểu được bối cảnh, các liên kết và môi trường của dự án đang được kiểm thử.

---

## 1. Project Overview

> **Project name:** [Cung cấp  thông tin tên dự án]
> **Description:** [Cung cấp mô tả  ngắn gọn về dự án. Ví dụ: an E-commerce platform, a banking system, or internal tooling.]
> **Domain:** [E-commerce / Finance / Healthcare / etc.]

---

## 2. Project Context
[Nhập thông tin chung về dự án mà QC nắm được, cần transfer cho Agent vào đây hoặc viết 1 file .md và mention ở đây để Agent tìm đọc.]


---

## 3. Associated Links & Resources

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

## 4. Environments

Cung cấp links đến các môi trường đang được sử dụng. Điều này rất quan trọng cho việc thực thi kiểm thử và ngữ cảnh kiểm thử thủ công.

| Environment | URL Endpoint                  | Database (Optional)          | Purpose                           |
|-------------|-------------------------------|------------------------------|-----------------------------------|
| **DEV**     | `https://dev.api.project.com` | `dev-db.project.internal`    | Development & initial testing     |
| **QA / Staging** | `https://qa.api.project.com` | `qa-db.project.internal` | Primary environment for QA and UAT|
| **UAT**     | `https://uat.api.project.com` | `uat-db.project.internal`    | User Acceptance Testing by clients|
| **PROD**    | `https://api.project.com`     | `prod-db.project.internal`   | Live production system            |

---

## 5. Accounts & Credentials Structure

Không cung cấp các tài khoản có quyền hạn thay đổi dữ liệu trên môi trường thực (production). Chỉ cung cấp các tài khoản kiểm thử.

| Account Type      | Username / Email Format       | Role Description                                  | Password |
|-------------------|-------------------------------|---------------------------------------------------|------------------------|
| **Admin**         | `admin_qa@project.com`        | Full access, system configuration, user management|                        |
| **Standard User** | `user_*@project.com`          | Normal consumer/customer role                     |                        |
| **Vendor/Partner**| `vendor_*@project.com`        | Third-party integration or B2B partner access     |                        |
| **Test Card / Payment** | `4242 4242 ...`               | Stripe / Payment Sandbox testing cards            |                        |

---

## 6. Third-Party Integrations / APIs

Liệt kê các dịch vụ hoặc API bên ngoài mà dự án phụ thuộc vào, những hệ thống này có thể cần cấu hình hoặc dữ liệu kiểm thử đặc biệt.

- **Payment Gateway:** [e.g., Stripe Sandbox endpoints]
- **Email Service:** [e.g., Mailgun (Testing keys)]
- **Authentication:** [e.g., Auth0, Firebase Auth]

---

