# Context Section 05 - Users, roles, and high-level permissions

## Draft content
| Role / actor | Mô tả | Workflow chính | Permission / responsibility tổng quan | Ghi chú QC |
|---|---|---|---|---|
| Khách / Anonymous | Người dùng chưa đăng nhập | Tra cứu thông tin public | Tra cứu KCN/KKT (UC2-UC31), Quỹ đất (UC40), Tin tức (UC55-68), VBPL/TTHC (UC69/73), Hướng dẫn/FAQ (UC71-82), Điều khoản/Liên hệ/Giới thiệu (UC83-86), Xúc tiến đầu tư (UC87-91, UC93-95). PQ-01..PQ-07 confirmed | UC92 yêu cầu đăng nhập — khác phần còn lại của nhóm UC87-95 |
| NĐT — Nhà đầu tư cá nhân (CN) | NĐT cá nhân đã đăng ký + xác thực qua VNeID hoặc CMND/CCCD 9/12 số | Đăng nhập (UC256) → Trang chủ (UC1) → luồng hồ sơ/dịch vụ → Đăng xuất (UC257) | Tất cả của Khách + Quản lý tài khoản (UC249-254), Hồ sơ (UC45-51), Đặt lịch (UC42-44), Kho dữ liệu cá nhân (UC52), Phản ánh (UC53/63-65), Báo cáo đã nộp (UC54), Thông báo cá nhân (UC258-259), UC92 | Auto-fill thông tin cá nhân nhưng cho phép sửa (UX-07) |
| NĐT — Doanh nghiệp (DN) | NĐT pháp nhân DN đã đăng ký với MST DN 10/13 số | Tương tự NĐT CN với đăng ký + cập nhật DN (UC250-254) | Tất cả của NĐT CN; MST DN không sửa sau đăng ký (BS-11) | Validation MST 10/13 số khi đăng ký |
| BA / PO | han.luong & huy.lai2 | Cung cấp + xác nhận yêu cầu, trả lời assumption | Owner SRS Mobile, trả lời backlog | Liên hệ khi có Open Question |
| QC / QA | Đội QC | Review UC, thiết kế kịch bản & test case | Theo `qc-dashboard.md` | Sử dụng các skill qc-uc-read / qc-func-scenario-design / qc-func-tc-design |

**Lưu ý:**
Permission tổng quan ở đây dựa trên PQ-01..PQ-07 đã được BA xác nhận. Chi tiết permission từng màn/từng field nằm trong spec UC cụ thể.

## Sources used
| Source | Evidence summary |
|---|---|
| `ASSUMPTION_BACKLOG_Mobile.md` PQ-01..PQ-07 | Public/private access matrix |
| `ASSUMPTION_BACKLOG_Mobile.md` BS-09, BS-11 | CMND/CCCD 9/12, MST DN 10/13, MST DN không sửa |
| `ASSUMPTION_BACKLOG_Mobile.md` UX-07 | Auto-fill + cho phép sửa |
| `ACTION_ITEMS_Mobile.md` | BA owner = han.luong & huy.lai2 |
| existing project-context-master.md §4 | Role matrix trước đó |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Có thêm role nào không (Admin, Cán bộ Cục, NĐT nước ngoài)? | Needs BA/Tech Lead source | Trung | BA |
| Role-permission matrix chính thức (RBAC table) chưa có | Needs BA/Tech Lead source | Trung | BA / Tech Lead |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Chỉ có 2 role NĐT (CN + DN) + Khách | Suy từ UC256 + UC250-254 + PQ-01..PQ-07 | Cao — nếu có role khác sẽ thiếu test | Yes — BA |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
Medium
