# Project Configuration

> **Project:** [Insert tên dự án]
> **Created:** [Insert ngày tạo YYYY-MM-DD]
> **Author:** QC Lead
> **Version:** v1

Tệp này đóng vai trò là biểu mẫu cấu hình cho dự án thực tế sử dụng Framework JOYs. Hãy điền các thông tin chi tiết dưới đây để các BA, QA và các AI Agent hiểu được bối cảnh, các liên kết và môi trường của dự án đang được kiểm thử.

> 💡 **Cách điền nhanh nhất:** chạy `/qc-project-onboarding` — skill sẽ phỏng vấn và điền giúp bạn từng mục. Mục 1–2 và mục 6 là bắt buộc; mục 3–4 bắt buộc nếu dự án dùng tầng automation; mục 7 bắt buộc nếu Phạm vi test có API.

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
| **API Doc**      | `[Link hoặc path file Swagger/OpenAPI/Postman]` | BẮT BUỘC khi Phạm vi test có API — file JSON khai path vào dòng `api-doc-files` của path-registry |
| **Others**       | `...`                                           | ...                                      |

---

## 3. Environments

Cung cấp links đến các môi trường đang được sử dụng. Điều này rất quan trọng cho việc thực thi kiểm thử và ngữ cảnh kiểm thử thủ công.

> ⚠️ CHỈ khai báo môi trường KHÔNG PHẢI production — tầng automation sẽ từ chối chạy trên môi trường vận hành thật. Mỗi portal (Admin, User...) khai 1 dòng. **Nếu Phạm vi test có API:** khai thêm 1 dòng API base URL cho mỗi môi trường (đặt tên `<ENV> - API`).

| Environment  | URL Endpoint                  | Database (Optional)          | Purpose                           |
|-------------|-------------------------------|------------------------------|-----------------------------------|
| [Insert tên môi trường + portal, ví dụ: DEV - Admin portal] | `https://[dev-url]/...` | `[dev-db... — bỏ trống nếu không có]` | [Insert mục đích] |
| [Ví dụ: DEV - API] | `https://api.[dev-url]/...` | | Base URL cho API testing trên DEV |
| [Insert dòng tiếp theo nếu có nhiều portal/môi trường] | `https://[dev-url]/...` | | |

---

## 4. Accounts & Credentials Structure

Không cung cấp các tài khoản có quyền hạn thay đổi dữ liệu trên môi trường thực (production). Chỉ cung cấp các tài khoản kiểm thử.

> ⚠️ Mỗi vai trò (role) mà test case cần đăng nhập khai 1 dòng. Đây là nơi DUY NHẤT chứa mật khẩu test — các file khác của kit không bao giờ ghi lại mật khẩu. Nhánh API dùng CHUNG bảng này: token manager đăng nhập bằng đúng các tài khoản theo role ở đây.

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

## 6. Phạm vi & Variant kiểm thử

> ⚠️ BẮT BUỘC — khai từ ĐẦU dự án (onboarding hỏi dạng chọn, không điền chữ tự do). Giá trị này là công tắc điều khiển nhánh test nào tồn tại trong toàn bộ kit.

**Phạm vi test** (chọn ĐÚNG 1):

| Giá trị | Đang chọn? |
|---|---|
| `Black-box only` — chỉ test qua UI | [ ] |
| `API only` — chỉ test API | [ ] |
| `Black-box + API` — cả hai (kể cả khi BE xong trước FE) | [ ] |

> 🔒 Luật thay đổi: CHỈ được đổi MỘT CHIỀU từ `Black-box only` hoặc `API only` sang `Black-box + API` (qua `/qc-project-onboarding` chế độ cập nhật). Không thu hẹp phạm vi.

**Kênh verify database (L4):** [ ] Có — dự án cấp DB access (connection khai trong `.env`) | [ ] Không

**Variant kiểm thử** (chọn từ danh mục chuẩn của kit — chọn nhiều nếu đa nền tảng; qc-context-master kế thừa mục này vào project-context-master §3.0 — các skill tầng 2/3 đọc từ đó, KHÔNG hỏi lại):

| Nhánh | Danh mục chuẩn | Đang chọn |
|---|---|---|
| UI | `web-responsive` / `web-static` / `mobile-native` / `mobile-hybrid` / `desktop-native` | [Insert, ví dụ: web-responsive] |
| API | `rest` (các variant khác kit chưa hỗ trợ — cần bổ sung technical reference vào kit trước khi chọn) | [Insert, ví dụ: rest] |

---

## 7. Auth API

> BẮT BUỘC khi Phạm vi test có API. Token manager của nhánh API dùng mục này để tự đăng nhập theo role (điều kiện để test permission). Xem contract: `.claude/config/api-shared/auth-strategy.md`.

| Mục | Giá trị |
|---|---|
| **Cơ chế auth** | [Chọn 1: `API login endpoint` / `Token do user cấp qua .env` / `Cookie session qua API login`] |
| **Login endpoint** | [Ví dụ: `POST /api/v1/auth/login` — body: `{username, password}` — bỏ trống nếu dùng token qua .env] |
| **Vị trí token trong response** | [Ví dụ: `data.accessToken` — bỏ trống nếu dùng .env] |
| **Cách gắn token vào request** | [Ví dụ: header `Authorization: Bearer <token>`] |
| **TTL / lưu ý hết hạn** | [Ví dụ: 30 phút — token manager cache trong 1 lần run] |
| **Ghi chú lấy token thủ công** | [Chỉ khi user tự cấp token: mô tả cách lấy, khai vào `.env` dạng `API_TOKEN_<ROLE>`] |

> 🔒 Token/mật khẩu KHÔNG BAO GIỜ được ghi vào file nào khác của kit. Token user cấp chỉ nằm trong `.env` (gitignored).

---
