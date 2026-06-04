# QC Site Map Progress

- run_id: 2026-06-04-rerun-audit-object-names
- mode: Update
- data_map_submode: Update (chỉ sync screen ID + bổ sung MOD-ORG-DEVICE FRD vào sources, không rebuild entity)
- last_workflow_done: 3
- next_workflow: (terminal — Done)
- status: Done
- auto-chain-mode-3: false
- siteMapExists: true
- dataMapExists: true
- orphanInboxExists: false
- notes: Rerun theo yêu cầu user "chạy lại và kiểm tra lại tên các đối tượng có đúng theo tài liệu dự án không". Phát hiện và sửa (a) screen ID không khớp FRD canonical (4 module có FRD đã đặt SCR-<module-short>-<NNN>, site map cũ dùng prototype style SCR-ORG-A1/SCR-ORG-P1/SCR-ADM-*); (b) mismapping UC-DEVCMD-003/004/005 (backbone gộp UPLOAD+ZONE+LANG vào UC-DEVCMD-001; UC-DEVCMD-003 = geofence, 004 = LS, 005 = BTWARNSET) — cùng pattern lỗi ở UC-CAREDEVCMD; (c) chưa apply Phase Scope Override 2026-05-27 cho POR-ADMIN; (d) sources thiếu MOD-ORG-DEVICE FRD mới (2026-05-27); (e) drift UC name minor ở ~20 UC. Đã viết lại qc-site-map.md + patch qc-data-map.md + viết lại site-map-handoff.md (mode update, 18 UC POR-ADMIN In scope?=No). Đề xuất user chạy `/qc-dashboard-sync` để cập nhật dashboard theo handoff mới.
