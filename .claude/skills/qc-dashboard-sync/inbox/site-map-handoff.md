---
source_skill: qc-site-map
handoff_type: site-map-feature-coverage
mode: initialization
generated_at: 2026-05-27T12:58:00+07:00
---

# Site Map Handoff for Dashboard

## Feature-level site map coverage

| Feature ID | Feature name | Site / Portal | Module | Mapped screen(s) | Folder alias(es) | In scope? | Site map status | Notes |
|---|---|---|---|---|---|---|---|---|
| UC-USER-001 | Đăng nhập Admin Portal | POR-ADMIN | MOD-ADMIN-USER | SCR-ADM-AUTH-001 | — | Yes | Mapped | Derived |
| UC-USER-002 | Đặt lại mật khẩu Admin | POR-ADMIN | MOD-ADMIN-USER | SCR-ADM-AUTH-002, SCR-ADM-AUTH-003 | — | Yes | Mapped | Derived |
| UC-USER-003 | Đổi mật khẩu Admin | POR-ADMIN | MOD-ADMIN-USER | SCR-ADM-USER-CHGPWD | — | Yes | Mapped | Derived |
| UC-USER-004 | Cập nhật profile cá nhân Admin | POR-ADMIN | MOD-ADMIN-USER | SCR-ADM-USER-PROFILE | — | Yes | Mapped | Derived |
| UC-USER-005 | Đăng xuất Admin Portal | POR-ADMIN | MOD-ADMIN-USER | (usermenu) | — | Yes | Mapped | CR-002 — derived |
| UC-TENANT-001 | Tạo tenant tổ chức | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADM-TENANT-CREATE | — | Yes | Mapped | Derived; FRD draft 5 OQ |
| UC-TENANT-002 | Xem danh sách tenant | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADM-TENANT-LIST | — | Yes | Mapped | Derived |
| UC-TENANT-003 | Xem và cập nhật tenant | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADM-TENANT-DETAIL | — | Yes | Mapped | Derived |
| UC-TENANT-004 | Ngưng hoạt động tenant | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADM-TENANT-DEACTIVATE | — | Yes | Mapped | Derived |
| UC-TENANT-005 | Khôi phục tenant đã ngưng | POR-ADMIN | MOD-ADMIN-TENANT | SCR-ADM-TENANT-RESTORE | — | Yes | Mapped | CR-001 — derived |
| UC-ORGADMIN-001 | Cấp tài khoản admin tổ chức | POR-ADMIN | MOD-ADMIN-ORGADMIN | SCR-ADM-ORGADMIN-CREATE | — | Yes | Mapped | Derived |
| UC-ORGADMIN-002 | Đặt lại mật khẩu admin tổ chức | POR-ADMIN | MOD-ADMIN-ORGADMIN | SCR-ADM-ORGADMIN-RESETPWD | — | Yes | Mapped | Derived |
| UC-ORGADMIN-003 | Ngưng hoạt động tài khoản admin tổ chức | POR-ADMIN | MOD-ADMIN-ORGADMIN | SCR-ADM-ORGADMIN-DEACTIVATE | — | Yes | Mapped | Derived |
| UC-DEVICEPOOL-001 | Import thiết bị Wonlex vào kho | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADM-POOL-IMPORT | — | Yes | Mapped | Derived |
| UC-DEVICEPOOL-002 | Xem danh sách thiết bị kho | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADM-POOL-LIST | — | Yes | Mapped | Derived |
| UC-DEVICEPOOL-003 | Gán thiết bị cho tổ chức | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADM-POOL-ASSIGN | — | Yes | Mapped | Derived |
| UC-DEVICEPOOL-004 | Thu hồi thiết bị về kho | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADM-POOL-WITHDRAW | — | Yes | Mapped | Derived |
| UC-DEVICEPOOL-005 | Đánh dấu thiết bị faulty | POR-ADMIN | MOD-ADMIN-DEVICEPOOL | SCR-ADM-POOL-FAULTY | — | Yes | Mapped | Derived |
| UC-ORGUSER-001 | Đăng nhập Org Portal | POR-ORG | MOD-ORG-ORGUSER | SCR-ORG-A1 | — | Yes | Mapped | Confirmed — đã audit v3 + scenarios v1 + testcases v1 |
| UC-ORGUSER-002 | Đặt lại mật khẩu Org | POR-ORG | MOD-ORG-ORGUSER | SCR-ORG-A2, SCR-ORG-A3 | — | Yes | Mapped | Confirmed |
| UC-ORGUSER-003 | Đổi mật khẩu Org | POR-ORG | MOD-ORG-ORGUSER | SCR-ORG-A5 | — | Yes | Mapped | Confirmed |
| UC-ORGUSER-004 | Cập nhật profile Org | POR-ORG | MOD-ORG-ORGUSER | SCR-ORG-A4 | — | Yes | Mapped | Confirmed |
| UC-ORGUSER-005 | Đăng xuất Org Portal | POR-ORG | MOD-ORG-ORGUSER | (usermenu Org) | — | Yes | Mapped | CR-002 — confirmed (shell.jsx) |
| UC-PATIENT-001 | Tạo hồ sơ bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-ORG-P2 | — | Yes | Mapped | Confirmed — FRD in-review |
| UC-PATIENT-002 | Xem danh sách bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-ORG-P1 | — | Yes | Mapped | Confirmed |
| UC-PATIENT-003 | Xem chi tiết bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-ORG-P3 | — | Yes | Mapped | Confirmed |
| UC-PATIENT-004 | Cập nhật bệnh nhân (gồm SOS — CR-004) | POR-ORG | MOD-ORG-PATIENT | SCR-ORG-P4, SCR-ORG-P7 | — | Yes | Mapped | Confirmed — có smoke v1 (cần điều chỉnh) |
| UC-PATIENT-005 | Ngưng theo dõi (archive) bệnh nhân | POR-ORG | MOD-ORG-PATIENT | SCR-ORG-P5 | — | Yes | Mapped | Confirmed — có smoke v1 (cần điều chỉnh) |
| UC-PATIENT-006 | Khôi phục bệnh nhân đã archive | POR-ORG | MOD-ORG-PATIENT | SCR-ORG-P6 | — | Yes | Mapped | CR-003 — confirmed |
| UC-DEVICE-001 | Gán thiết bị Wonlex cho bệnh nhân | POR-ORG | MOD-ORG-DEVICE | SCR-ORG-DEVICE-ASSIGN | — | Yes | Mapped | Derived; trigger SOS auto-sync (CR-004) |
| UC-DEVICE-002 | Thu hồi thiết bị từ bệnh nhân | POR-ORG | MOD-ORG-DEVICE | SCR-ORG-DEVICE-WITHDRAW | — | Yes | Mapped | Derived |
| UC-DEVICE-003 | Xem danh sách thiết bị tổ chức | POR-ORG | MOD-ORG-DEVICE | SCR-ORG-DEVICE-LIST | — | Yes | Mapped | Derived |
| UC-CAREGIVER-001 | Tạo tài khoản caregiver | POR-ORG | MOD-ORG-CAREGIVER | SCR-ORG-CG-CREATE | — | Yes | Mapped | Derived |
| UC-CAREGIVER-002 | Xem danh sách caregiver | POR-ORG | MOD-ORG-CAREGIVER | SCR-ORG-CG-LIST | — | Yes | Mapped | Derived |
| UC-CAREGIVER-003 | Gỡ caregiver khỏi bệnh nhân | POR-ORG | MOD-ORG-CAREGIVER | SCR-ORG-CG-REMOVE | — | Yes | Mapped | Derived |
| UC-CAREGIVER-004 | Ngưng hoạt động tài khoản caregiver | POR-ORG | MOD-ORG-CAREGIVER | SCR-ORG-CG-DEACTIVATE | — | Yes | Mapped | Derived |
| UC-CAREGIVER-005 | Đặt lại mật khẩu caregiver | POR-ORG | MOD-ORG-CAREGIVER | SCR-ORG-CG-RESETPWD | — | Yes | Mapped | Derived |
| UC-DASHBOARD-001 | Dashboard theo dõi đa-bệnh-nhân | POR-ORG | MOD-ORG-DASHBOARD | SCR-ORG-DASH | — | Yes | Mapped | Derived |
| UC-DASHBOARD-002 | Xem chi tiết telemetry bệnh nhân | POR-ORG | MOD-ORG-DASHBOARD | SCR-ORG-DASH-DETAIL | — | Yes | Mapped | Derived |
| UC-DASHBOARD-003 | Filter/search bệnh nhân | POR-ORG | MOD-ORG-DASHBOARD | SCR-ORG-DASH-FILTER | — | Yes | Mapped | Derived |
| UC-ORGALARM-001 | Nhận in-app notification cảnh báo (Org) | POR-ORG | MOD-ORG-ALARM | SCR-ORG-ALARM-LIVE | — | Yes | Mapped | Derived |
| UC-ORGALARM-002 | Xem danh sách cảnh báo đang hoạt động (Org) | POR-ORG | MOD-ORG-ALARM | SCR-ORG-ALARM-LIST | — | Yes | Mapped | Derived |
| UC-ORGALARM-003 | Acknowledge cảnh báo (Org) | POR-ORG | MOD-ORG-ALARM | SCR-ORG-ALARM-ACK | — | Yes | Mapped | Derived |
| UC-ORGALARM-004 | Đánh dấu hoàn tất xử lý cảnh báo (Org) | POR-ORG | MOD-ORG-ALARM | SCR-ORG-ALARM-RESOLVE | — | Yes | Mapped | Derived |
| UC-ORGALARM-005 | Xem lịch sử cảnh báo (Org) | POR-ORG | MOD-ORG-ALARM | SCR-ORG-ALARM-HISTORY | — | Yes | Mapped | Derived |
| UC-DEVCMD-001 | Cấu hình chu kỳ upload | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-CONFIG | — | Yes | Mapped | Derived — shared form |
| UC-DEVCMD-003 | Cấu hình múi giờ ZONE | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-DEVCMD-004 | Cấu hình ngôn ngữ LANG | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-DEVCMD-005 | Cấu hình geofence + LS + BTWARNSET | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-DEVCMD-006 | Yêu cầu định vị tức thời (Org) | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-LOCATE | — | Yes | Mapped | Derived |
| UC-DEVCMD-007 | Gửi lệnh RESET/POWEROFF/FACTORY | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-OPS | — | Yes | Mapped | Derived — Org-side ONLY |
| UC-DEVCMD-008 | Xem lịch sử lệnh thiết bị (Org) | POR-ORG | MOD-ORG-DEVCMD | SCR-ORG-CMD-HISTORY | — | Yes | Mapped | Derived |
| UC-CAREUSER-001 | Đăng nhập Caregiver Portal | POR-CARE | MOD-CARE-CAREUSER | SCR-CARE-AUTH-001 | — | Need confirm | Need confirm | First-time flow chi tiết chưa rõ (Open Q-011 / GAP-003) |
| UC-CAREUSER-002 | Đặt lại mật khẩu Caregiver | POR-CARE | MOD-CARE-CAREUSER | SCR-CARE-AUTH-002, SCR-CARE-AUTH-003 | — | Yes | Mapped | Derived |
| UC-CAREUSER-003 | Đổi mật khẩu Caregiver | POR-CARE | MOD-CARE-CAREUSER | SCR-CARE-CHGPWD | — | Yes | Mapped | Derived |
| UC-CAREUSER-004 | Cập nhật profile Caregiver | POR-CARE | MOD-CARE-CAREUSER | SCR-CARE-PROFILE | — | Yes | Mapped | Derived |
| UC-CAREUSER-005 | Đăng xuất Caregiver Portal | POR-CARE | MOD-CARE-CAREUSER | (usermenu Care) | — | Yes | Mapped | CR-002 — derived |
| UC-CAREPATIENT-001 | Xem danh sách bệnh nhân phụ trách | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CARE-PT-LIST | — | Yes | Mapped | Derived |
| UC-CAREPATIENT-002 | Xem chi tiết telemetry bệnh nhân | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CARE-PT-DETAIL | — | Yes | Mapped | Derived |
| UC-CAREPATIENT-003 | Yêu cầu định vị tức thời (Caregiver) | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CARE-PT-LOCATE | — | Yes | Mapped | Derived — owner + co-care write |
| UC-CAREPATIENT-004 | Cập nhật trường phi-PII bệnh nhân (CR-004) | POR-CARE | MOD-CARE-CAREPATIENT | SCR-CARE-PT-EDIT | — | Yes | Mapped | CR-004 — derived |
| UC-COCARE-001 | Mời co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-CARE-CO-INVITE | — | Yes | Mapped | Derived |
| UC-COCARE-002 | Xem danh sách co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-CARE-CO-LIST | — | Yes | Mapped | Derived |
| UC-COCARE-003 | Đổi mức quyền co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-CARE-CO-CHANGE | — | Yes | Mapped | Derived |
| UC-COCARE-004 | Gỡ co-caregiver | POR-CARE | MOD-CARE-COCARE | SCR-CARE-CO-REMOVE | — | Yes | Mapped | Derived |
| UC-CAREALARM-001 | Nhận in-app notification cảnh báo (Caregiver) | POR-CARE | MOD-CARE-CAREALARM | SCR-CARE-ALARM-LIVE | — | Yes | Mapped | Derived |
| UC-CAREALARM-002 | Xem danh sách cảnh báo (Caregiver) | POR-CARE | MOD-CARE-CAREALARM | SCR-CARE-ALARM-LIST | — | Yes | Mapped | Derived |
| UC-CAREALARM-003 | Acknowledge cảnh báo (Caregiver) | POR-CARE | MOD-CARE-CAREALARM | SCR-CARE-ALARM-ACK | — | Yes | Mapped | Derived — owner + co-care write |
| UC-CAREALARM-004 | Xem lịch sử cảnh báo (Caregiver) | POR-CARE | MOD-CARE-CAREALARM | SCR-CARE-ALARM-HISTORY | — | Yes | Mapped | Derived |
| UC-CAREDEVCMD-001 | Cấu hình chu kỳ upload (Caregiver) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CARE-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-CAREDEVCMD-003 | Cấu hình múi giờ (Caregiver) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CARE-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-CAREDEVCMD-004 | Cấu hình ngôn ngữ (Caregiver) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CARE-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-CAREDEVCMD-005 | Cấu hình geofence + LS + BTWARNSET (Caregiver) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CARE-CMD-CONFIG | — | Yes | Mapped | Derived |
| UC-CAREDEVCMD-006 | Xem lịch sử lệnh thiết bị (Caregiver) | POR-CARE | MOD-CARE-CAREDEVCMD | SCR-CARE-CMD-HISTORY | — | Yes | Mapped | Derived |

## Feature-level gaps

| Feature ID | Feature name | Gap | Impact to QC | Owner | Priority |
|---|---|---|---|---|---|
| UC-CAREUSER-001 | Đăng nhập Caregiver Portal | First-time login flow chi tiết chưa rõ — backbone note "xem §9 Open Q" nhưng §9 không có Q tương ứng | Block test UC-CAREUSER-001 + UC-COCARE-001 accept invitation flow | BA | Medium |
| UC-PATIENT-005 | Archive bệnh nhân | Behaviour khi bệnh nhân đang có thiết bị gán: block hay archive cùng? | Edge case test UC-PATIENT-005 | BA | Medium |
| UC-PATIENT-006 | Restore bệnh nhân | Restore có auto-gán lại caregiver/thiết bị đã thu hồi không? | Edge case test UC-PATIENT-006 | BA | Medium |
| UC-PATIENT-004 | Cập nhật bệnh nhân (gồm SOS — CR-004) | SOS auto-sync state machine chưa rõ (pending/failed/in-sync) | Test FLOW-009 thiếu state assertion | BA + Tech Lead | Medium |
| UC-CAREPATIENT-004 | Cập nhật phi-PII bệnh nhân (CR-004) | Như trên (chia sẻ FLOW-009) | Như trên | BA + Tech Lead | Medium |
| UC-DEVICE-001 | Gán thiết bị Wonlex | Khi gán mới thiết bị có SOS đã set sẵn trên hồ sơ: trigger auto-sync ngay khi nào? | Edge case test FLOW-009 | BA + Tech Lead | Medium |
| UC-COCARE-001 | Mời co-caregiver | Lifecycle "lời mời" có thời hạn expire không? | Edge case TC invitation | BA | Low |
| UC-DEVCMD-001..008, UC-CAREDEVCMD-001..006 | Lệnh thiết bị | State timeout (response không về sau X giây) | Edge case TC pipeline command | Tech Lead | Low |
| UC-ORGALARM-001..005, UC-CAREALARM-001..004 | Alarm | Auto-resolve/auto-expire? | State machine alarm | BA | Low |

## Unmapped screens

| Screen ID | Screen / Page | Why unmapped | Suggested action |
|---|---|---|---|
| SCR-ORG-A6 | Email template preview | Không có UC chính thức — chỉ là tool preview trong design prototype | BA + QC Lead xác nhận có phải tool nội bộ hay là feature riêng cần spec |

## Dashboard update recommendation

| Feature ID | Recommended dashboard note/status | Reason |
|---|---|---|
| (Mọi UC trừ UC-CAREUSER-001) | Site map: Mapped | Đã có ít nhất 1 screen mapped + In scope? = Yes |
| UC-CAREUSER-001 | Site map: Need confirm | First-time login flow chi tiết chưa rõ — Open Q-011 |
| (Toàn bộ POR-ADMIN + POR-CARE) | Site map: Mapped (Derived) | Chưa có wireframe — dashboard nên track "Wireframe" cell separately nếu có cột này |
