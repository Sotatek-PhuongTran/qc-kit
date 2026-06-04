# Run Control — qc-site-map rerun 2026-06-04

## Resolved paths

- `project-context-master.md` → `docs/qc-lead/project-context-master.md` (exists, content non-empty)
- `project-config.md` → `docs/qc-lead/project-config.md` (exists, v2 draft)
- `qc-site-map.md` → `docs/qc-lead/qc-site-map.md` (exists trước rerun, có content thật)
- `qc-data-map.md` → `docs/qc-lead/qc-data-map.md` (exists trước rerun, có content thật)
- `qc-dashboard.md` → `docs/qc-lead/qc-dashboard.md` (exists — sẽ được `qc-dashboard-sync` ghi)
- High-level BA source → `docs/02-backbone/backbone.md`
- Requirement common → `docs/03-modules/common-rules.md`
- Requirement modules → `docs/03-modules/<MOD-ID>/frd.md` (4/16 module hiện có FRD)
- Wireframe folder → `docs/design-file/`
- CR registry → `docs/04-change-requests/index.md`
- Handoff target → `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md`
- Orphan inbox → `.claude/skills/qc-site-map/inbox/dashboard-orphans.md` (KHÔNG tồn tại — không vào Mode 3)

## Mode

- Mode = Update (siteMapExists = true, orphanInboxExists = false). Data map cũng exists → data_map_submode = Update.
- User triggered rerun với prompt: "chạy lại và kiểm tra lại tên các đối tượng có đúng theo tài liệu dự án không".

## Prerequisite

- `project-context-master.md` exists with real content → PASS.

## Source audit

**Site map source group:**

- Official site map → KHÔNG tồn tại (không có sitemap document chính thức).
- Menu / navigation doc → KHÔNG có file riêng; navigation suy ra từ design-file prototype + module list backbone.
- Feature / UC list → `docs/02-backbone/backbone.md` (no-version) — 74 UC sau CR.
- Wireframe index / screen list → `docs/design-file/src/screens-*.jsx` (POR-ORG prototype only).
- User flow / journey → backbone §6 + project-context-master §6.1.
- Role / permission matrix → backbone §5 + §7 BR-001..007.
- SRS / spec fallback → 4 FRD draft (ADMIN-TENANT, ORG-ORGUSER, ORG-PATIENT, ORG-DEVICE).
- Release notes / change logs → `docs/04-change-requests/index.md` (CR-001..004 applied).

**Data map source group:**

- Backbone / UC inventory → backbone.md.
- FRD per module → 4 FRD draft (ADMIN-TENANT, ORG-ORGUSER, ORG-PATIENT, ORG-DEVICE).
- API spec / DB schema / ERD / data dictionary → KHÔNG có file ground truth.
- Data classification / retention / audit policy → backbone §7 BR-006 + §8.2.
- CR impact-assessment → đã absorb vào backbone + FRD.

## Version preflight (vs run 2026-05-27)

So sánh sources `Sources consolidated` lần trước với on-disk hiện tại:

| File | Previous status | Current status | Change classification |
|---|---|---|---|
| `backbone.md` | no-version | no-version | content-only-unknown (mtime gần đây không khẳng định version) |
| `common-rules.md` | no-version | no-version | content-only-unknown |
| `docs/03-modules/index.md` | no-version | no-version | content-only-changed (FRD index nay liệt kê 4/16 module thay vì 3/16 — MOD-ORG-DEVICE đã có FRD; MOD-ORG-PATIENT status `draft` thay vì `in-review`) |
| `docs/04-change-requests/index.md` | no-version | no-version | same |
| `MOD-ORG-PATIENT/frd.md` | no-version (in-review per context-master) | no-version (draft per index) | status drift |
| `MOD-ORG-ORGUSER/frd.md` | no-version (draft) | no-version (draft) | same |
| `MOD-ADMIN-TENANT/frd.md` | no-version (draft) | no-version (draft) | same |
| `MOD-ORG-DEVICE/frd.md` | **(không có)** | no-version (draft) | **new-file** — mới sinh 2026-05-27 |
| `project-config.md` | v2 | v2 | same |
| `project-context-master.md` | no-version (Phase Scope Override absorbed) | no-version | content-only-unknown |
| Design-file prototype | no-version | no-version | same |

→ Có ít nhất 1 source `new-file` (MOD-ORG-DEVICE FRD) và 1 source status drift (PATIENT FRD) → preflight pass. Đồng thời user yêu cầu rerun toàn diện → không cần ask.

## Stop blockers

- Không có. Tất cả prerequisite + path resolution đều thành công.

## Audit findings (objective: kiểm tra tên đối tượng theo yêu cầu user)

1. **Screen ID không khớp FRD canonical** (HIGH — sửa)
   - 4 FRD đã sinh đặt convention `SCR-<module-short>-<NNN>`: `SCR-ORGUSER-001..006` · `SCR-PATIENT-001..007` · `SCR-DEVICE-001..003` · `SCR-ADMIN-TENANT-001..003`.
   - Site map 2026-05-27 dùng ID phong cách prototype: `SCR-ORG-A1..A6` · `SCR-ORG-P1..P7` · `SCR-ORG-DEVICE-LIST/ASSIGN/WITHDRAW` · `SCR-ADM-TENANT-LIST/CREATE/DETAIL/DEACTIVATE/RESTORE`.
   - Site map 2026-05-27 cũng giả định 2 screen modal riêng cho UC-TENANT-004 + UC-TENANT-005 — không tồn tại theo FRD MOD-ADMIN-TENANT §4 (Ngưng/Khôi phục là button + confirmation modal trên SCR-ADMIN-TENANT-003).

2. **Mismapping UC-DEVCMD-003/004/005** (HIGH — sửa)
   - Backbone §6.11: `UC-DEVCMD-001 = Cấu hình chu kỳ upload, múi giờ, ngôn ngữ thiết bị` (gộp UPLOAD + ZONE + LANG); `UC-DEVCMD-003 = Cấu hình hàng rào địa lý`; `UC-DEVCMD-004 = Cấu hình độ nhạy té ngã (LS)`; `UC-DEVCMD-005 = Cấu hình ngưỡng nhiệt độ cơ thể bất thường (BTWARNSET)`.
   - Site map 2026-05-27 §8 mapping ghi: `UC-DEVCMD-003 = "Cấu hình múi giờ ZONE"`, `UC-DEVCMD-004 = "Cấu hình ngôn ngữ LANG"`, `UC-DEVCMD-005 = "Cấu hình geofence + LS + BTWARNSET"` — sai hoàn toàn.
   - Cùng pattern lỗi với UC-CAREDEVCMD-001/003/004/005 (backbone §6.16).

3. **Phase Scope Override 2026-05-27 chưa áp dụng** (MEDIUM — apply)
   - project-context-master §3.1 + §3.2 ghi POR-ADMIN đã được hoãn sang giai đoạn sau.
   - Site map 2026-05-27 vẫn liệt kê 18 UC POR-ADMIN là In scope?=Yes trong handoff.

4. **Sources thiếu MOD-ORG-DEVICE FRD** (MEDIUM — bổ sung)
   - FRD mới sinh 2026-05-27 với SCR-DEVICE-001..003 + EF-UC-DEVICE-001-05 (SOS sync state `failed`).
   - Site map 2026-05-27 sources không list → toàn bộ UC-DEVICE-* + ENT-DEVICE-* hiển thị Derived thay vì Confirmed-from-FRD.

5. **Drift số liệu project-context-master vs FRD index** (LOW — flag)
   - project-context-master ghi "3/16 FRD đã generate" — thực tế 4/16 (thêm MOD-ORG-DEVICE).
   - project-context-master ghi MOD-ORG-PATIENT FRD status = `in-review` — FRD index 2026-05-27 ghi `draft`.

6. **UC name drift minor ở ~20 UC** (LOW — chuẩn hoá)
   - Vd. UC-PATIENT-002 backbone "Xem danh sách bệnh nhân với filter" vs site map "Xem danh sách bệnh nhân".
   - UC-DASHBOARD-001 backbone "Xem dashboard đa-bệnh-nhân real-time" vs site map "Dashboard theo dõi đa-bệnh-nhân".
   - UC-ORGALARM-001..005 và UC-CAREALARM-001..004 và UC-CAREPATIENT-002..004 thiếu suffix `(org-side)` / `(caregiver-side)` so với backbone.
   - UC-COCARE-002 backbone "Xem danh sách co-caregiver hiện có" vs site map "Xem danh sách co-caregiver".
   - UC-COCARE-003 backbone "Đổi mức quyền co-caregiver" vs site map "Đổi quyền co-caregiver".

## Next workflow

- Done. Đã ghi xong qc-site-map.md, qc-data-map.md, site-map-handoff.md.
- Đề xuất user chạy `/qc-dashboard-sync` để cập nhật `qc-dashboard.md` theo handoff mới (18 UC POR-ADMIN chuyển sang In scope?=No, naming convention screen mới).
