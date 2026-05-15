# Gap and Readiness

## Gap classification
| Gap | Type | Impact | Owner | Priority | Status |
|---|---|---|---|---|---|
| Business goal & success criteria/KPI release v1 chưa có | Needs BA/Tech Lead source | Cao | PM / BA | High | Open (carry-over Q-002) |
| Tên dự án chính thức trong `project-config.md` còn placeholder | QC-fillable | Trung | QC Lead / PM | Medium | Open (carry-over Q-001) |
| Role/permission matrix chính thức (có thêm Admin, Cán bộ Cục, NĐT NN?) | Needs BA/Tech Lead source | Trung | BA | Medium | Open (carry-over Q-003) |
| Sơ đồ kiến trúc hệ thống + Tech stack | Needs BA/Tech Lead source | Cao | Tech Lead | High | Open (carry-over Q-004) |
| NFR (Performance / Security / Accessibility / Logging) có target | Needs BA/Tech Lead source | Cao | PM / Tech Lead | High | Open (carry-over Q-005) |
| Mobile platform coverage matrix (OS version, thiết bị, screen size) | Needs BA/Tech Lead source | Trung | Tech Lead / QC Lead | Medium | Open (carry-over Q-007) |
| ĐỢT 2 NV-09, NV-10 + ĐỢT 1 KT-03 chờ BA | Needs BA/Tech Lead source | Trung | BA | Medium | Open (carry-over Q-009, Q-010) |
| 3 AI-UC pending (UC41, UC2 chi tiết, UC55 đăng ký tư vấn) | Needs BA/Tech Lead source | Trung | BA / KH | Medium | Open (carry-over Q-011) |
| 4 AI-UX pending (Toast, Empty, Error states) | Needs BA/Tech Lead source | Cao | UI/UX team | High | Open (carry-over Q-012) |
| Feature inventory gom row chưa khớp 1-1 (UC55-68 gom 3 row/12 UC; UC87-95 gom 1 row/9 UC) | QC-fillable + Derivable from detailed requirement docs | Trung | QC Lead | Medium | Open (Q-013 new) |
| UC73 vs UC70 (TTHC) — mơ hồ | QC-fillable + Needs BA confirmation | Trung | QC Lead + BA | Medium | Open (Q-014 new) |
| Folder `docs/BA/` chưa tồn tại — không thể tra spec chi tiết, common rule book, wireframe | Needs BA/Tech Lead source | Cao | BA | High | Open (Q-015 new) |
| Privacy / Compliance / Legal document | Needs BA/Tech Lead source | Trung | Legal / BA | Medium | Open (Q-016 new) |
| VNeID sandbox / mock cho integration test | Needs BA/Tech Lead source | Cao | Tech Lead | High | Open (Q-017 new) |
| Test levels, entry/exit criteria | (đã resolved run-009) | - | QC Lead | - | Resolved (carry-over Q-006) |
| DEV/QA/UAT/PROD endpoints | (đã resolved run-009: agent không execute test thực tế) | - | DevOps | - | Resolved (carry-over Q-008) |

## Readiness draft for Section 9

| Nhóm context | Trạng thái | Độ tin cậy | Ảnh hưởng nếu thiếu/sai | Cần QC Lead bổ sung gì |
|---|---|---:|---|---|
| Project goal & scope | Partial | Medium | Thiếu KPI → khó đánh giá Pass criteria cho UAT | Xác nhận tên dự án chính thức + KPI release v1 |
| System/site/module overview | Partial | Medium | Thiếu sơ đồ kiến trúc → khó scope integration test | Yêu cầu Tech Lead cung cấp Architecture Diagram + Tech stack |
| Feature/use case inventory | Partial | High | Gom row UC55-68 + UC87-95 chưa khớp 1-1; UC73 mơ hồ | Xác nhận cách gom row dashboard + UC73 in/out scope |
| Users/roles/permission overview | Partial | Medium | Có thể thiếu role Admin / Cán bộ Cục / NĐT NN | Yêu cầu BA cung cấp role matrix chính thức |
| Business flows & module relationship | Ready | High | - | (không) |
| Common rules/data/state/integration | Partial | High | Common rule book + API spec chưa có; 3 assumption chờ BA (NV-09, NV-10, KT-03) | Yêu cầu BA trả lời ĐỢT 2 + cung cấp `CMR_Mobile.md` |
| Platform/environment/device/NFR | Partial | Low | Coverage matrix + NFR target chưa có | Yêu cầu Tech Lead + QC Lead build test matrix; PM định target NFR |
| Document status tracking | Ready | High | (qc-dashboard track tốt) | (không) |

**Kết luận:**
Context cấp project hiện ở mức **Tạm đủ** để các QC Agent triển khai review/scenario/TC cho các UC đã có spec V1 trở lên (UC1, UC2, UC40, UC42-44, UC45-51, UC52, UC53/63-65, UC54, UC55, UC56-57/66/68, UC60-61, UC69, UC71-82, UC83-86, UC90, UC249, UC250-254, UC256, UC257, UC258_UC259). Gap có rủi ro cao nhất: (1) thiếu sơ đồ kiến trúc + tech stack + API spec → ảnh hưởng integration/regression analysis; (2) thiếu NFR target → không thiết kế được performance/security test; (3) folder `docs/BA/` chưa tồn tại → QC Agent chưa thể đọc spec chi tiết cho per-UC workflow; (4) 4 AI-UX (Toast, Empty, Error states) chưa thiết kế → ảnh hưởng test UI cross-feature.

## Open questions draft for Section 10

| ID | Question / needed confirmation | Why important | Impact if unclear | Priority | Owner | Status |
|---|---|---|---|---|---|---|
| Q-001 | `project-config.md` ghi Project name "test cho MBFS mobile" placeholder, không khớp nội dung SRS Mobile cho NĐT, Cục ĐTNN. Cần cập nhật tên chính thức. | §2 Project summary | Sai tên dự án trong meta-config | Medium | QC Lead / PM | Open |
| Q-002 | Business goal & success criteria/KPI v1 chưa có. KPI nào đo lường thành công? | §2 + §3 scope | Khó đánh giá Pass tại UAT | High | PM / BA | Open |
| Q-003 | Role/permission matrix chính thức — có thêm role Admin, Cán bộ Cục, NĐT nước ngoài không? | §5 roles | Có thể thiếu test role | Medium | BA | Open |
| Q-004 | System Architecture Diagram + Tech Stack documents ở đâu? Không thấy trong `high-level-files/`. | §4 system structure | Khó scope integration & regression | High | Tech Lead / PM | Open |
| Q-005 | NFR (Performance / Security / Accessibility / Logging) target / threshold? | §8 NFR | Không thiết kế được test có ngưỡng | High | PM / Tech Lead | Open |
| Q-006 | Test levels, entry/exit criteria, defect workflow. | §1 + §3 | - | - | QC Lead | Resolved (Function/Integration/System/Regression; entry=spec Ready trigger; exit=100% pass + critical=0 + major<1 + coverage≥95%; defect tool out of scope — run-009) |
| Q-007 | Mobile platform coverage matrix (OS version, thiết bị, screen size). | §8 platform | Coverage gap | Medium | Tech Lead / QC Lead | Open |
| Q-008 | DEV/QA/UAT/PROD endpoints + DB connection strings placeholder. | §8 | - | - | DevOps / PM | Resolved (agent không execute test thực tế → endpoints không cần fill — run-009) |
| Q-009 | ĐỢT 2 ASSUMPTION_BACKLOG còn 2 item: NV-09 (loại thông báo ngoài hồ sơ), NV-10 (Giới thiệu tĩnh hay CMS). | §3 + §7 | Mở rộng scope UC258/259, UC86 | Medium | BA | Open |
| Q-010 | KT-03 (KT/XH/MT trong tab chi tiết KCN — bảng số liệu hay biểu đồ) vẫn "Chưa trả lời". | §3 + §7 | UI test UC2 | Low | BA | Open |
| Q-011 | AI-UC-01 (UC41 Cho thuê đất), AI-UC-02 (Chi tiết KCN), AI-UC55-01 (luồng đăng ký tư vấn) — khi nào BA/KH có data? | §3 scope | Theo dõi để mở rộng test khi sẵn sàng | Medium | BA / KH | Open |
| Q-012 | AI-UX-01..04 (Toast, Empty states, Error states) chưa thiết kế UI/UX. | §3 + §7 | Test cross-feature UI thiếu chuẩn | High | UI/UX team | Open |
| Q-013 | Cách gom row dashboard chưa khớp 1-1 với UC_LIST: UC55-68 (12 UC) gom 3 row; UC87-95 (9 UC) gom 1 row UC90. UC58, UC59, UC62, UC67 không thấy trong dashboard. | §4 + §3 | Coverage tracking sai số | Medium | QC Lead | Open |
| Q-014 | UC73 (TTHC) trong UC_LIST file VBPL+TTHC nhưng dashboard không có row UC73; existing project-context lại ghi "UC70 — TTHC" Removed. Có nhầm UC73 ↔ UC70 không? | §3 + §4 | Có thể thiếu / dư UC | Medium | QC Lead + BA | Open |
| Q-015 | Folder `docs/BA/` (spec chi tiết, common rule book, wireframe) chưa tồn tại trên repo — sẽ được cung cấp khi nào? | §4 sources | QC Agent không đọc được spec per-UC | High | BA | Open |
| Q-016 | Privacy / Compliance / Legal constraint (Luật bảo mật thông tin cá nhân, Luật ĐT) áp dụng cho dự án dịch vụ công này — có document riêng không? | §8 NFR | Risk legal khi test data thật | Medium | Legal / BA | Open |
| Q-017 | VNeID có sandbox/mock environment để integration test không, hay chỉ có production VNeID? | §8 integration | Khó test UC256 deterministically | High | Tech Lead | Open |

## Resolved carry-over questions
| ID | Resolution | Source |
|---|---|---|
| Q-001 (carry-over) | Project ID = MBFS đã confirmed (run-009) nhưng tên project trong `project-config.md` vẫn placeholder → tách Q-001 thành mục riêng (đặt lại status Open cho phần placeholder) | existing project-context-master.md §1 + Q-001 |
| Q-006 | Function/Integration/System/Regression; entry=spec Ready trigger; exit=100% pass + critical=0 + major<1 + coverage≥95%; defect tool out of scope | run-009 (2026-05-13) |
| Q-008 | Agent không execute test thực tế → endpoints không cần fill | run-009 (2026-05-13) |
