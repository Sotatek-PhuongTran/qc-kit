# Phase 7 — Gap & Readiness

- run_id: qc-site-map-001
- phase: Phase 7
- mode: Initialization

## Gap / Conflict / Assumption / Unclear inventory

| ID | Issue | Type | Impact to QC | Suggested owner | Priority | Status |
|---|---|---|---|---|---|---|
| GAP-001 | Folder `docs/BA/` (spec + wireframe) đã bị clear (commit 45c7d81) — không có wireframe/PNG để verify cấu trúc tab/modal/empty state | Missing | Toàn bộ screen ở mức **Derived**, không thể nâng lên `Confirmed` | BA + QC Lead | High | Open |
| GAP-002 | Không có sơ đồ kiến trúc + tech stack + API spec | Missing | Khó hoàn thiện screen ↔ integration touchpoint chính xác | Tech Lead | High | Open (Q-004) |
| GAP-003 | UC73 (Sidebar "Thủ tục hành chính") có conflict: dashboard `Need confirm`, project-context có UC70 Removed → có thể nhầm UC73 ↔ UC70 | Conflict | Có thể tạo/bỏ sót SCR-069/070 | QC Lead + BA | High | Open (Q-014) |
| GAP-004 | UC41 "Cho thuê đất KCN" — Sidebar có entry, nhưng chưa có nội dung BA (AI-UC-01) | Missing | SCR-050 không có flow | BA | High | Open |
| GAP-005 | UC55 "Đăng ký tư vấn đầu tư" (SCR-066) — chưa có màn đích / form spec | Missing | Không design được flow FLOW-CONSULT | KH (qua BA) | High | Open (AI-UC55-01) |
| GAP-006 | UC2 chi tiết KCN — tab "Hạ tầng / Nhà đầu tư" (SCR-047) chưa có cấu trúc + KT-03 (bảng/biểu đồ) chưa trả lời | Missing + Assumption | Chi tiết KCN không đủ field để thiết kế scenario | BA | High | Open (AI-UC-02, KT-03) |
| GAP-007 | NV-09 (loại thông báo ngoài hồ sơ) chờ BA — push event taxonomy chưa rõ | Missing | Không có deep-link routing table cho push (KT-17) | BA | Medium | Open |
| GAP-008 | NV-10 (Giới thiệu tĩnh/CMS) chờ BA — ảnh hưởng SCR-076 | Assumption | Test offline vs CMS-driven khác nhau | BA | Low | Open |
| GAP-009 | AI-UX-01..04 Toast / Empty (search & list) / Error states — chưa thiết kế | Missing | SCR-090..093 không có chuẩn → cross-feature UX không đồng nhất | UI/UX team | High | Open |
| GAP-010 | Splash → Login vs Splash → Home (auto-login token) chưa rõ; cold-start deep link mapping chưa có | Unclear | Test entry path không deterministic | Tech Lead + BA | Medium | Open (NG-01, NG-03) |
| GAP-011 | VNeID sandbox/mock chưa rõ — chỉ có production? | Unclear | UC256 không thể test deterministic | Tech Lead | High | Open (Q-017) |
| GAP-012 | UC58, UC59, UC62, UC67 — dashboard `Need confirm`, gom chung hub tin tức nhưng không có evidence màn riêng | Unclear | Có thể thiếu/dư screen | QC Lead + BA | Medium | Open (Q-013) |
| GAP-013 | Nhóm UC87-95 (Xúc tiến): UC87/88/89/91/93/94/95 `Need confirm`, gom chung hub SCR-071/072/073 | Unclear | Coverage chưa rõ | QC Lead + BA | Medium | Open (Q-013) |
| GAP-014 | Sidebar có "Đăng xuất" riêng (UC257) + Cấu hình tài khoản cũng có Đổi MK → đăng xuất — luồng đăng xuất duplicate, cần xác nhận entry point | Unclear | Có thể bỏ sót regression | BA | Low | Open (NG-10) |
| GAP-015 | Role matrix chính thức (Admin / Cán bộ Cục / NĐT NN) chưa có — chỉ có 3 role NĐT CN/DN/Khách | Missing | Có thể thiếu role | BA | Medium | Open (Q-003) |
| GAP-016 | Mobile coverage matrix (OS version, thiết bị, screen size) chưa có | Missing | Site map không thể đánh dấu screen specific cho iOS-only vs Android-only | Tech Lead + QC Lead | Medium | Open (Q-007) |
| GAP-017 | Cấu hình tài khoản (SCR-010) — không liệt kê được sub-items đầy đủ (Đổi MK, Đổi ngôn ngữ, Avatar UX-12 không có, v.v.) | Unclear | Field-level test không cover | BA | Low | Open |
| GAP-018 | Splash + Welcome / Onboarding (lần đầu cài) — chưa có evidence | Missing | First-run UX chưa rõ | BA | Low | Open |
| GAP-019 | KT-03 (thông tin KT/XH/MT trong tab Chi tiết KCN — bảng số liệu vs biểu đồ) chưa có | Unclear | Visualization test chưa scope | BA | Low | Open (Q-010) |
| GAP-020 | UC92 (Xúc tiến yêu cầu đăng nhập) — luồng dẫn từ Khách → Login → quay lại UC92 chưa rõ | Unclear | Regression cho Auth gate | BA | Medium | Open (NG-02) |

## Readiness assessment

| Area | Status | Reason | Required action |
|---|---|---|---|
| Screen inventory | **Partial** | 64 màn được liệt kê nhưng đa số `Derived` do không có wireframe; 1 `Conflict` (UC73), 15 `Need confirm` | BA cung cấp lại wireframe + spec để promote `Derived → Confirmed` |
| Navigation flow | **Partial** | 20+ flow cấp dự án đã có; thiếu cold-start deep link, splash→home/login, UC92 redirect | BA + Tech Lead bổ sung deep-link routing table + entry rule |
| Role / access by screen | **Partial** | PQ-01..PQ-07 áp dụng nhóm public ổn; chi tiết field/action chưa có; role matrix chưa đầy đủ | BA xác nhận role matrix (Q-003) |
| Screen ↔ Feature mapping | **Partial** | 25/33 feature `Mapped`; 7 `Need confirm`; 1 `Conflict` (UC73); 1 `Partial` (UC2 — tab) | Resolve UC73 (Q-014) + Q-013 gom row + AI-UC-02 |
| Data / API / Integration / State touchpoints | **Partial** | Mức cao đã có; thiếu API spec chi tiết | Tech Lead cung cấp API spec (Q-004) |
| Regression / impact anchor usage | **Ready** | 13 anchor được liệt kê, có suggested regression focus | (none) |
| Dashboard feature-level handoff | **Partial** | Có thể handoff cho 33 row; SCR-050 (UC41) không có row dashboard → unmapped | Sau khi BA hoàn tất UC41 → thêm row dashboard |

**Kết luận:** **Tạm đủ (Partial)** để các QC Agent hạ nguồn (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) có baseline cấu trúc màn + navigation + role + anchor regression. Để nâng lên **Ready (Confirmed)**, cần BA cung cấp lại wireframe (Q-015) + giải quyết các Q-004/013/014/017 + AI-UC-01/02/55-01 + AI-UX-01..04.

## Next phase

Phase 8 — Render `qc-site-map.md`.
