---
source_skill: qc-site-map
handoff_type: site-map-feature-coverage
mode: update
generated_at: 2026-06-04T10:00:00+07:00
prev_handoff_at: 2026-05-27T12:58:00+07:00
delta_summary:
  - "Rerun 2026-06-04: chuẩn hoá screen ID theo FRD canonical (SCR-<module-short>-<NNN>) — thay toàn bộ ID phong cách prototype cũ"
  - "Fix mismapping UC-DEVCMD-003/004/005 và UC-CAREDEVCMD-003/004/005 theo backbone §6.11 + §6.16"
  - "Apply Phase Scope Override 2026-05-27: POR-ADMIN deferred — đặt In scope?=No cho 18 UC POR-ADMIN"
  - "Bổ sung MOD-ORG-DEVICE FRD vào sources (mới sinh 2026-05-27); UC-DEVICE-001..003 chuyển từ Derived sang Confirmed"
  - "Chỉnh tên UC theo backbone (vd. UC-PATIENT-002 → 'Xem danh sách bệnh nhân với filter', UC-DASHBOARD-001 → 'Xem dashboard đa-bệnh-nhân real-time', UC-ORGALARM-* + UC-CAREALARM-* + UC-CAREPATIENT-* khôi phục suffix (org-side)/(caregiver-side))"
  - "SCR-ADMIN-TENANT-003 host UC-TENANT-003/004/005 cùng lúc (Ngưng + Khôi phục là button + confirmation modal trên trang chi tiết — FRD không tách screen riêng)"
---

# Site Map Handoff for Dashboard

> Quy ước screen ID: `SCR-<module-short>-<NNN>` — đồng bộ với `qc-site-map.md` rerun 2026-06-04. POR-ADMIN module-short giữ tiền tố `ADMIN-` (vd `SCR-ADMIN-TENANT-001`); POR-ORG/POR-CARE bỏ tiền tố portal (vd `SCR-PATIENT-001`, `SCR-CAREPATIENT-001`).
>
> Phase Scope Override 2026-05-27: POR-ADMIN deferred sang giai đoạn sau. 18 UC POR-ADMIN ở dưới có `In scope? = No`. POR-ORG + POR-CARE giữ `In scope? = Yes` (trừ UC-CAREUSER-001 `Need confirm` vì Open Q-011 first-time login flow).

## Feature-level site map coverage

| Feature ID | Feature name (backbone) | Site / Portal | Module | Mapped screen(s) | Folder alias(es) | In scope? | Site map status | Notes |
|---|---|---|---|---|---|---|---|---|
| UC-USER-001 | Đăng nhập Admin Portal | POR-ADMIN | MOD-ADMIN-USER | SCR-ADMIN-USER-001 | — | No | Mapped | Deferred — Phase Scope Override 2026-05-27 |
| UC-USER-002 | Đặt lại mật khẩu khi quên | POR-ADMIN | MOD-ADMIN-USER | SCR-ADMIN-USER-002, SCR-ADMIN-USER-003, SCR-ADMIN-USER-006 | — | No | Mapped | Deferred |
| UC-USER-003 | Đổi mật khẩu | POR-ADMIN | MOD-ADMIN-USER | SCR-ADMIN-USER-005 | — | No | Mapped | Deferred |
| UC-USER-004 | Cập nhật profile cá nhân | POR-ADMIN | MOD-ADMIN-USER | SCR-ADMIN-USER-004 | — | No | Mapped | Deferred |
| UC-USER-005 | Đăng xuất Admin Portal | POR-ADMIN | MOD-ADMIN-USER | (usermenu Admin) | — | No | Mapped | Deferred — CR-002 |
| UC-TENANT-001 | Tạo tenant tổ chức | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADMIN-TENANT-001 | — | No | Mapped | Deferred — FRD draft 5 OQ |
| UC-TENANT-002 | Xem danh sách tenant | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADMIN-TENANT-002 | — | No | Mapped | Deferred |
| UC-TENANT-003 | Xem và cập nhật chi tiết tenant | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADMIN-TENANT-003 | — | No | Mapped | Deferred |
| UC-TENANT-004 | Ngưng hoạt động tenant | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADMIN-TENANT-003 (button + confirmation modal) | — | No | Mapped | Deferred — FRD không tách screen riêng |
| UC-TENANT-005 | Khôi phục tenant đã ngưng hoạt động | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADMIN-TENANT-003 (button + confirmation modal) | — | No | Mapped | Deferred — CR-001 |
| UC-ORGADMIN-001 | Cấp tài khoản admin tổ chức | POR-ADMIN | MOD-ADMIN-ORGADMIN | SCR-ADMIN-ORGADMIN-001 | — | No | Mapped | Deferred |
| UC-ORGADMIN-002 | Đặt lại mật khẩu admin tổ chức | POR-ADMIN | MOD-ADMIN-ORGADMIN | SCR-ADMIN-ORGADMIN-002 | — | No | Mapped | Deferred |
| UC-ORGADMIN-003 | Ngưng hoạt động tài khoản admin tổ chức | POR-ADMIN | MOD-ADMIN-ORGADMIN | SCR-ADMIN-ORGADMIN-003 | — | No | Mapped | Deferred |
| UC-DEVICEPOOL-001 | Import thiết bị vào kho | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADMIN-DEVICEPOOL-002 | — | No | Mapped | Deferred |
| UC-DEVICEPOOL-002 | Xem kho thiết bị | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADMIN-DEVICEPOOL-001 | — | No | Mapped | Deferred |
| UC-DEVICEPOOL-003 | Gán thiết bị từ kho cho tổ chức | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADMIN-DEVICEPOOL-003 | — | No | Mapped | Deferred |
| UC-DEVICEPOOL-004 | Thu hồi thiết bị từ tổ chức về kho | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADMIN-DEVICEPOOL-004 | — | No | Mapped | Deferred |
| UC-DEVICEPOOL-005 | Đánh dấu thiết bị lỗi và loại bỏ | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADMIN-DEVICEPOOL-005 | — | No | Mapped | Deferred |
| UC-ORGUSER-001 | Đăng nhập Org Portal | POR-ORG | MOD-ORG-ORGUSER | SCR-ORGUSER-001 | — | Yes | Mapped | Confirmed — đã audit v3 + scenarios v1 + testcases v1 |
| UC-ORGUSER-002 | Đặt lại mật khẩu khi quên | POR-ORG | MOD-ORG-ORGUSER | SCR-ORGUSER-002, SCR-ORGUSER-003, SCR-ORGUSER-006 | — | Yes | Mapped | Confirmed |
| UC-ORGUSER-003 | Đổi mật khẩu | POR-ORG | MOD-ORG-ORGUSER | SCR-ORGUSER-005 | — | Yes | Mapped | Confirmed |
| UC-ORGUSER-004 | Cập nhật profile cá nhân | POR-ORG | MOD-ORG-ORGUSER | SCR-ORGUSER-004 | — | Yes | Mapped | Confirmed |
| UC-ORGUSER-005 | Đăng xuất Org Portal | POR-ORG | MOD-ORG-ORGUSER | (usermenu Org) | — | Yes | Mapped | CR-002 — confirmed (shell.jsx) |
| UC-PATIENT-001 | Tạo hồ sơ bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-PATIENT-002 | — | Yes | Mapped | Confirmed — FRD draft 2 OQ |
| UC-PATIENT-002 | Xem danh sách bệnh nhân với filter | POR-ORG | MOD-ORG-PATIENT | SCR-PATIENT-001 | — | Yes | Mapped | Confirmed |
| UC-PATIENT-003 | Xem chi tiết hồ sơ bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-PATIENT-003 | — | Yes | Mapped | Confirmed |
| UC-PATIENT-004 | Cập nhật hồ sơ bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-PATIENT-004, SCR-PATIENT-007 | — | Yes | Mapped | Confirmed — có smoke v1 (cần điều chỉnh); SOS sync CR-004 |
| UC-PATIENT-005 | Ngưng theo dõi bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-PATIENT-005 | — | Yes | Mapped | Confirmed — có smoke v1 (cần điều chỉnh) |
| UC-PATIENT-006 | Khôi phục bệnh nhân từ archived | POR-ORG | MOD-ORG-PATIENT | SCR-PATIENT-006 | — | Yes | Mapped | CR-003 — confirmed |
| UC-DEVICE-001 | Gán thiết bị cho bệnh nhân | POR-ORG | MOD-ORG-DEVICE | SCR-DEVICE-002 | — | Yes | Mapped | Confirmed — FRD draft 1 OQ; trigger SOS auto-sync (CR-004) |
| UC-DEVICE-002 | Thu hồi thiết bị từ bệnh nhân | POR-ORG | MOD-ORG-DEVICE | SCR-DEVICE-003 | — | Yes | Mapped | Confirmed |
| UC-DEVICE-003 | Xem danh sách thiết bị của tổ chức | POR-ORG | MOD-ORG-DEVICE | SCR-DEVICE-001 | — | Yes | Mapped | Confirmed |
| UC-CAREGIVER-001 | Tạo tài khoản caregiver và gán bệnh nhân | POR-ORG | MOD-ORG-CAREGIVER | SCR-CAREGIVER-002 | — | Yes | Mapped | Derived |
| UC-CAREGIVER-002 | Xem danh sách caregiver của tổ chức | POR-ORG | MOD-ORG-CAREGIVER | SCR-CAREGIVER-001 | — | Yes | Mapped | Derived |
| UC-CAREGIVER-003 | Gỡ caregiver khỏi bệnh nhân | POR-ORG | MOD-ORG-CAREGIVER | SCR-CAREGIVER-003 | — | Yes | Mapped | Derived |
| UC-CAREGIVER-004 | Ngưng hoạt động tài khoản caregiver | POR-ORG | MOD-ORG-CAREGIVER | SCR-CAREGIVER-004 | — | Yes | Mapped | Derived |
| UC-CAREGIVER-005 | Đặt lại mật khẩu caregiver | POR-ORG | MOD-ORG-CAREGIVER | SCR-CAREGIVER-005 | — | Yes | Mapped | Derived |
| UC-DASHBOARD-001 | Xem dashboard đa-bệnh-nhân real-time | POR-ORG | MOD-ORG-DASHBOARD | SCR-DASHBOARD-001 | — | Yes | Mapped | Derived |
| UC-DASHBOARD-002 | Xem chi tiết telemetry bệnh nhân | POR-ORG | MOD-ORG-DASHBOARD | SCR-DASHBOARD-002 | — | Yes | Mapped | Derived |
| UC-DASHBOARD-003 | Filter và search trên dashboard | POR-ORG | MOD-ORG-DASHBOARD | SCR-DASHBOARD-001 (inline panel) | — | Yes | Mapped | Derived — panel filter/search nằm trong cùng dashboard |
| UC-ORGALARM-001 | Nhận thông báo cảnh báo real-time (org-side) | POR-ORG | MOD-ORG-ALARM | SCR-ORGALARM-001 | — | Yes | Mapped | Derived |
| UC-ORGALARM-002 | Xem danh sách cảnh báo đang hoạt động (org-side) | POR-ORG | MOD-ORG-ALARM | SCR-ORGALARM-002 | — | Yes | Mapped | Derived |
| UC-ORGALARM-003 | Acknowledge cảnh báo (org-side) | POR-ORG | MOD-ORG-ALARM | SCR-ORGALARM-003 | — | Yes | Mapped | Derived |
| UC-ORGALARM-004 | Đánh dấu cảnh báo đã xử lý hoàn tất (org-side) | POR-ORG | MOD-ORG-ALARM | SCR-ORGALARM-004 | — | Yes | Mapped | Derived |
| UC-ORGALARM-005 | Xem lịch sử cảnh báo của bệnh nhân (org-side) | POR-ORG | MOD-ORG-ALARM | SCR-ORGALARM-005 | — | Yes | Mapped | Derived |
| UC-DEVCMD-001 | Cấu hình chu kỳ upload, múi giờ, ngôn ngữ thiết bị | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-001 | — | Yes | Mapped | Derived — backbone §6.11 gộp UPLOAD + ZONE + LANG vào 1 UC |
| UC-DEVCMD-003 | Cấu hình hàng rào địa lý | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-002 | — | Yes | Mapped | Derived — FIX mismapping (site map cũ ghi nhầm là ZONE) |
| UC-DEVCMD-004 | Cấu hình độ nhạy té ngã | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-003 | — | Yes | Mapped | Derived — FIX mismapping (site map cũ ghi nhầm là LANG) |
| UC-DEVCMD-005 | Cấu hình ngưỡng nhiệt độ cơ thể bất thường | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-004 | — | Yes | Mapped | Derived — FIX mismapping (site map cũ ghi nhầm là geofence+LS+BTWARNSET) |
| UC-DEVCMD-006 | Yêu cầu định vị tức thời (org-side) | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-005 | — | Yes | Mapped | Derived |
| UC-DEVCMD-007 | Lệnh vận hành thiết bị | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-006 | — | Yes | Mapped | Derived — modal có xác nhận 2 bước (RESET/POWEROFF/FACTORY) |
| UC-DEVCMD-008 | Xem lịch sử lệnh đã gửi | POR-ORG | MOD-ORG-DEVCMD | SCR-DEVCMD-007 | — | Yes | Mapped | Derived |
| UC-CAREUSER-001 | Đăng nhập Caregiver Portal | POR-CARE | MOD-CARE-CAREUSER | SCR-CAREUSER-001 | — | Need confirm | Need confirm | Open Q-011 first-time login flow chi tiết |
| UC-CAREUSER-002 | Đặt lại mật khẩu khi quên | POR-CARE | MOD-CARE-CAREUSER | SCR-CAREUSER-002, SCR-CAREUSER-003, SCR-CAREUSER-006 | — | Yes | Mapped | Derived |
| UC-CAREUSER-003 | Đổi mật khẩu | POR-CARE | MOD-CARE-CAREUSER | SCR-CAREUSER-005 | — | Yes | Mapped | Derived |
| UC-CAREUSER-004 | Cập nhật profile cá nhân | POR-CARE | MOD-CARE-CAREUSER | SCR-CAREUSER-004 | — | Yes | Mapped | Derived |
| UC-CAREUSER-005 | Đăng xuất Caregiver Portal | POR-CARE | MOD-CARE-CAREUSER | (usermenu Care) | — | Yes | Mapped | CR-002 — derived |
| UC-CAREPATIENT-001 | Xem danh sách bệnh nhân được phụ trách | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CAREPATIENT-001 | — | Yes | Mapped | Derived |
| UC-CAREPATIENT-002 | Xem chi tiết telemetry bệnh nhân (caregiver-side) | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CAREPATIENT-002 | — | Yes | Mapped | Derived |
| UC-CAREPATIENT-003 | Yêu cầu định vị tức thời (caregiver-side) | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CAREPATIENT-003 | — | Yes | Mapped | Derived |
| UC-CAREPATIENT-004 | Cập nhật trường phi-PII của bệnh nhân (caregiver-side) | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CAREPATIENT-004 | — | Yes | Mapped | CR-004 — derived |
| UC-COCARE-001 | Mời co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-COCARE-001 | — | Yes | Mapped | Derived |
| UC-COCARE-002 | Xem danh sách co-caregiver hiện có | POR-CARE | MOD-CARE-COCARE | SCR-COCARE-002 | — | Yes | Mapped | Derived |
| UC-COCARE-003 | Đổi mức quyền co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-COCARE-003 | — | Yes | Mapped | Derived |
| UC-COCARE-004 | Gỡ co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-COCARE-004 | — | Yes | Mapped | Derived |
| UC-CAREALARM-001 | Nhận thông báo cảnh báo real-time (caregiver-side) | POR-CARE | MOD-CARE-CAREALARM | SCR-CAREALARM-001 | — | Yes | Mapped | Derived |
| UC-CAREALARM-002 | Xem danh sách cảnh báo (caregiver-side) | POR-CARE | MOD-CARE-CAREALARM | SCR-CAREALARM-002 | — | Yes | Mapped | Derived |
| UC-CAREALARM-003 | Acknowledge cảnh báo (caregiver-side) | POR-CARE | MOD-CARE-CAREALARM | SCR-CAREALARM-003 | — | Yes | Mapped | Derived |
| UC-CAREALARM-004 | Xem lịch sử cảnh báo (caregiver-side) | POR-CARE | MOD-CARE-CAREALARM | SCR-CAREALARM-004 | — | Yes | Mapped | Derived |
| UC-CAREDEVCMD-001 | Cấu hình chu kỳ upload, múi giờ, ngôn ngữ thiết bị (caregiver-side) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CAREDEVCMD-001 | — | Yes | Mapped | Derived — backbone §6.16 gộp UPLOAD + ZONE + LANG vào 1 UC |
| UC-CAREDEVCMD-003 | Cấu hình hàng rào địa lý (caregiver-side) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CAREDEVCMD-002 | — | Yes | Mapped | Derived — FIX mismapping (site map cũ ghi nhầm là ZONE) |
| UC-CAREDEVCMD-004 | Cấu hình độ nhạy té ngã (caregiver-side) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CAREDEVCMD-003 | — | Yes | Mapped | Derived — FIX mismapping (site map cũ ghi nhầm là LANG) |
| UC-CAREDEVCMD-005 | Cấu hình ngưỡng nhiệt độ cơ thể bất thường (caregiver-side) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CAREDEVCMD-004 | — | Yes | Mapped | Derived — FIX mismapping (site map cũ ghi nhầm là geofence+LS+BTWARNSET) |
| UC-CAREDEVCMD-006 | Xem lịch sử lệnh đã gửi (caregiver-side) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CAREDEVCMD-005 | — | Yes | Mapped | Derived |

## Aggregated stats

- Total UC trong handoff: **74** (sau khi áp dụng CR-001..004 — đã gỡ UC-DEVCMD-002 + UC-CAREDEVCMD-002 khỏi backbone).
- POR-ADMIN UCs: 18 (5 USER + 5 TENANT + 3 ORGADMIN + 5 DEVICEPOOL) — **all In scope? = No (deferred)**.
- POR-ORG UCs: 33 (5 ORGUSER + 6 PATIENT + 3 DEVICE + 5 CAREGIVER + 3 DASHBOARD + 5 ORGALARM + 7 DEVCMD).
- POR-CARE UCs: 23 (5 CAREUSER + 4 CAREPATIENT + 4 COCARE + 4 CAREALARM + 5 CAREDEVCMD) — 1 row Need confirm (UC-CAREUSER-001).

## Notes for dashboard sync

- Phase Scope Override 2026-05-27 đã được phản ánh trực tiếp vào cột `In scope?`. `qc-dashboard-sync` cần ghi đúng giá trị này vào `qc-dashboard.md` cột "In scope?".
- Naming convention rerun này khác với handoff trước (2026-05-27) — `qc-dashboard-sync` cần overwrite mapped screens cho 74 UC, không additive merge.
- Folder alias hiện chưa map vì `qc-dashboard-sync` chưa scan thư mục artifact downstream. Khi `qc-dashboard-sync` chạy, tự fill cột này từ existing artifact folders.
- Mismapping UC-DEVCMD-003/004/005 và UC-CAREDEVCMD-003/004/005 của lần trước (2026-05-27) có thể đã được kế thừa bởi artifact downstream (uc-review-report, scenarios, testcases) — QC Lead cần kiểm tra artifact đã sinh cho 3 module này (POR-ORG DEVCMD + POR-CARE CAREDEVCMD) trước khi dashboard sync.
