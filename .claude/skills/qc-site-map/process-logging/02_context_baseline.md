# Phase 2 — Project Context Baseline

- run_id: qc-site-map-001
- phase: Phase 2
- mode: Initialization
- source: `docs/qc-lead/project-context-master.md` (Live)

## Baseline facts extracted

### Project / platform

| Item | Value |
|---|---|
| Project | SRS Mobile App — Cổng thông tin đầu tư & dịch vụ công cho NĐT (Cục ĐTNN) |
| Project ID | MBFS |
| Platform | mobile-native (iOS + Android) |
| Release | v1 |
| Sites / portals / apps | 1 site — Mobile (iOS + Android) |

### Modules / areas (6)

1. Xác thực & Quản lý tài khoản
2. Trang chủ & Điều hướng
3. Quản lý hồ sơ & Dịch vụ
4. Tra cứu KCN/KKT & Quỹ đất
5. Tin tức, Thông tin & Hỗ trợ
6. Thông báo

### Roles / actors

| Role | Đăng nhập? | Phạm vi tổng quan |
|---|---|---|
| Khách / Anonymous | No | UC2-31, UC40, UC55-68, UC69/73, UC71-82, UC83-86, UC87-91/93-95 (public — PQ-01..PQ-07) |
| NĐT — Cá nhân (CN) | Yes (VNeID / username) | + UC249-254, UC42-44, UC45-51, UC52, UC53/63-65, UC54, UC258/259, UC92 |
| NĐT — Doanh nghiệp (DN) | Yes | Tương tự CN + đăng ký DN; MST không sửa sau đăng ký (BS-11) |

### Major business flows (FLOW-001..FLOW-009 từ §6.1)

- FLOW-001 Đăng nhập VNeID; FLOW-002 Đăng nhập username/password.
- FLOW-003 Quản lý hồ sơ đầu tư (NĐT DN).
- FLOW-004 Đặt lịch nộp hồ sơ (xem/quản lý, không tạo/huỷ — NV-01/NV-02).
- FLOW-005 Gửi phản ánh kiến nghị (nháp/gửi/hủy bỏ — UX-06).
- FLOW-006 Tra cứu KCN/KKT (public).
- FLOW-007 Nhận thông báo push (FCM/APNs).
- FLOW-008 Đăng ký NĐT (CN/DN).
- FLOW-009 Đổi mật khẩu → bắt buộc đăng xuất (BS-07).

### Data objects / states (§7.2)

- Auth token (Secure Storage); User profile; Hồ sơ đầu tư (read-only on mobile); Lịch hẹn (web-created); Phản ánh (Nháp→Gửi→Huỷ); Báo cáo đã nộp (read-only); Tài liệu kho cá nhân (read-only); Lô đất (Đang cho thuê/Còn trống/Hết hạn); Thông báo (Unread→Read).

### Integrations / APIs / notifications (§7.3)

- VNeID (deep-link / in-app browser) — UC256.
- FCM (Android) + APNs (iOS) — UC258/259.
- Google Maps app external — UC83-86 (KT-12, KT-13).
- In-app PDF viewer — UC45-51, UC52 (KT-06, KT-07).
- WebView — UC55-68, UC69/73 (KT-08, KT-09).
- CMS / Backend API — Tin tức, FAQ, Xúc tiến (KT-11, KT-15).
- Secure Storage (Keychain/Keystore) — Auth (BS-04).
- OTP SMS — Quên MK (BS-10).

### NFR / security / constraint affecting screens

- Token Secure Storage (BS-04); đổi MK bắt buộc đăng xuất (BS-07); không lockout (BS-03).
- Push + in-app only, no Email (KT-18).
- Lazy load 20 records cho list (KT-02, KT-15, UX-04).
- Auto-fill profile cho Phản ánh nhưng cho sửa (UX-07).
- FAQ accordion mở nhiều (UX-11).
- Quick Access cố định (UX-01); Sidebar chứa toàn bộ menu, không có bottom nav (UX-03); Badge fetch on focus (UX-02, KT-01).
- Cache nội dung tĩnh offline (KT-14).

### Out-of-scope (§3.2) — sẽ KHÔNG xuất hiện như screen confirmed

- UC70 Tra cứu TTHC (Removed bởi user, nhưng cẩn thận với UC73 — xem Q-014).
- Thanh toán phí hồ sơ mobile (NV-03).
- Tạo lịch hẹn mới (NV-01) / Huỷ lịch (NV-02).
- Xoá tài liệu kho (NV-04).
- Nộp báo cáo mới (NV-05).
- Thay đổi Avatar (UX-12).
- Email notification (KT-18).
- Export quỹ đất Excel (KT-04).
- Chi tiết KCN tab Hạ tầng/Nhà đầu tư (AI-UC-02 chờ BA).
- Luồng đăng ký tư vấn UC55 (AI-UC55-01 chờ KH).
- Nhóm quy mô vốn UC87-95 (NV-07).
- UC41 Cho thuê đất KCN (AI-UC-01 chờ BA).

### Existing gaps / open questions relevant to site map

- Q-004 Architecture diagram + Tech stack chưa có (ảnh hưởng integration map).
- Q-007 Mobile coverage matrix (OS/device/screen) chưa có.
- Q-011 AI-UC-01/02, AI-UC55-01 chờ BA/KH (3 màn/luồng pending).
- Q-012 AI-UX-01..04 (Toast / Empty / Error states) chưa thiết kế.
- Q-013 Gom row dashboard UC55-68/UC87-95 chưa khớp 1-1.
- Q-014 UC73 vs UC70 (TTHC) — có thể nhầm.
- Q-015 Folder `docs/BA/` (spec + wireframe) bị clear.
- Q-017 VNeID sandbox/mock — chưa rõ.

## Items marked `Need confirm` cho site map

- UC41 (Cho thuê đất) — màn trong sidebar nhưng chờ BA.
- UC73 (TTHC) — sidebar có "Thủ tục hành chính" nhưng dashboard UC73 `Need confirm`, project-context ghi UC70 Removed → có thể trùng/nhầm.
- UC55 sub-flow "Đăng ký tư vấn" — entry point chưa có màn đích.
- UC2 detail tabs (Hạ tầng/Nhà đầu tư...) — chờ BA.
- Toast / Empty state / Error state — cross-screen, chưa thiết kế.

## Next phase

Phase 3 — Source inventory + confidence classification.
