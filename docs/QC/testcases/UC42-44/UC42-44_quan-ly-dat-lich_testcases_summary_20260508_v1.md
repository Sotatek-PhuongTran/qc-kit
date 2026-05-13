# Test Cases Summary — UC42-44 Quản lý đặt lịch nộp hồ sơ (Mobile)

**Ngày tạo:** 2026-05-08
**Phiên bản:** v1
**Agent:** qc-tc-design-MOBILE

## ✅ Hoàn tất thiết kế kiểm thử

| Sản phẩm | Tệp | Số lượng |
|---|---|---|
| Draft | `UC42-44_quan-ly-dat-lich_testcases_draft.md` | 163 TC |
| Test Cases | `UC42-44_quan-ly-dat-lich_testcases_20260508_v1.xlsx` | 163 TC (116 Section 1 + 47 Section 2) |
| Summary | `UC42-44_quan-ly-dat-lich_testcases_summary_20260508_v1.md` | — |

**Input:**
- UC v2: `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44_QuanLyDatLich.md`
- Audit v2 (85.5/100 — CONDITIONALLY READY): `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_quan-ly-dat-lich_audited_20260508_v2.md`
- Scenarios v2 (131 scenarios): `docs/QC-MOBILE/scenarios/UC42-44/UC42-44_quan-ly-dat-lich_scenarios_20260508_v2.md`
- CMR v1.1: `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md`

---

## Phân bổ Test Case

### Theo Section

| Section | Check UI/UX | Check Function | Check common | Tổng |
|---|---:|---:|---:|---:|
| Section 1 — Màn hình Danh sách lịch hẹn | 16 | 84 | 16 | **116** |
| Section 2 — Màn hình Chi tiết lịch hẹn | 12 | 19 | 16 | **47** |
| **Tổng** | **28** | **103** | **32** | **163** |

### Theo Test Technique áp dụng

| Technique | Số TC | Ví dụ |
|---|---:|---|
| **Happy path** | ~40 | TC_001, TC_017, TC_032, TC_065 |
| **Equivalence Partitioning (EP)** | ~15 | TC_023–TC_027 (6 status partitions), TC_040, TC_043, TC_044, TC_045 |
| **Boundary Value Analysis (BVA)** | ~10 | TC_034 (1 char), TC_035 (500), TC_036 (501), TC_037 (paste), TC_066–TC_068 (20/21/40 records), TC_087 (9.9s), TC_088 (10.1s) |
| **Decision Table** | 4 | TC_051–TC_054 (Filter 2x2 matrix) |
| **Error/Exception** | ~20 | TC_041, TC_071, TC_084–TC_090, TC_141–TC_145 |
| **Permission/Role** | 5 | TC_020–TC_022, TC_131, TC_132 |
| **i18n** | 6 | TC_093–TC_097, TC_146 |
| **Accessibility** | 2 | TC_098, TC_147 |
| **Security (client-side)** | 1 | TC_099 |
| **Device common** | 32 | Check common Section 1 + Section 2 |

---

## Requirement Traceability Matrix (RTM)

Liên kết **22 AC** trong UC42-44 v2 với các Test Case tương ứng.

| AC ID | Tiêu chí chấp nhận (tóm tắt) | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | 6 tab cố định đúng thứ tự, default "Tất cả" | TC_007, TC_008, TC_028, TC_029 | ✅ Covered |
| AC2 | Giữ tab + scroll + search + filter khi quay lại từ chi tiết | TC_078, TC_079, TC_080, TC_081 | ✅ Covered |
| AC3 | Card hiển thị đủ 3 icon + data; null → "-" | TC_009, TC_012 | ✅ Covered |
| AC4 | Sort theo "Thời gian đặt" giảm dần | TC_031 | ✅ Covered |
| AC5 | Chi tiết có 5 section, khớp 100% API; "Thời gian đặt" nhất quán | TC_117, TC_119–TC_123, TC_133–TC_136 | ✅ Covered |
| AC6 | Badge đúng màu follow UI design | TC_015, TC_122, TC_137 | ✅ Covered |
| AC7 | Filter Lĩnh vực + DVC độc lập, Áp dụng đúng | TC_047, TC_051–TC_055, TC_057 | ✅ Covered |
| AC8 | Active filter indicator xanh lá | TC_006, TC_058, TC_059 | ✅ Covered |
| AC9 | Search debounce 3s, fuzzy, max 500 chars, scope toàn tab | TC_032–TC_037, TC_040 | ✅ Covered |
| AC10 | Xóa keyword → reset về mặc định | TC_042 | ✅ Covered |
| AC11 | Pull-to-refresh Danh sách | TC_073, TC_074, TC_075 | ✅ Covered |
| AC12 | Pull-to-refresh Chi tiết | TC_140 | ✅ Covered |
| AC13 | Lazy load 20 records/lần | TC_065–TC_068 | ✅ Covered |
| AC14 | Lazy load fail retry 3 lần + dừng + pull-reload | TC_070, TC_071, TC_072 | ✅ Covered |
| AC15 | Error messages đúng nội dung theo CMR-07 | TC_084, TC_085, TC_086, TC_091, TC_141, TC_142, TC_144 | ✅ Covered |
| AC16 | 401 + refresh expired → redirect login + toast | TC_089, TC_090, TC_145 | ✅ Covered |
| AC17 | First-load full-screen overlay | TC_003, TC_076, TC_118 | ✅ Covered |
| AC18 | Giữ search/filter khi back từ Chi tiết | TC_080, TC_081 | ✅ Covered |
| AC19 | Reset search/filter khi chuyển tab | TC_082 | ✅ Covered |
| AC20 | i18n text cứng đổi, text động giữ nguyên | TC_093–TC_097, TC_146 | ✅ Covered |
| AC21 | Screen reader Header + Card + Sections | TC_098, TC_147 | ✅ Covered |
| AC22 | Contrast / font-size / touch target theo UI design | Verify theo UI design trong TC_001, TC_117 | ✅ Covered |

**Coverage Summary:** 22/22 AC → **100% Acceptance Criteria coverage**.

---

## Giả định áp dụng (từ audit v2)

| Q# | Topic | Assumption |
|---|---|---|
| Q2 | Badge color | Design chưa chốt → TC ghi "follow theo UI design" (TC_015, TC_122, TC_137). Không cần bảng mapping cụ thể. |
| Q4 | Cá nhân vs Tổ chức | Chỉ khác format "Mã định danh" (CCCD/CMND vs Mã doanh nghiệp). |
| Q6 | Physical Back Android | Đóng Bottom Sheet nếu đang mở; quay về màn trước nếu ở Chi tiết; đồng nhất icon ←. |
| Q17 | Push deep-link | Defer sang UC258-259 scope. |
| Q18 | Auto polling | Không auto polling, chỉ pull-to-refresh. |
| Q20 | Copy-to-clipboard | Không hỗ trợ (read-only thuần). |
| Q25 | Nút Áp dụng | Luôn enabled (không disable khi filter chưa thay đổi). |
| Q30 | Offline cache | Không cache; offline → hiển thị lỗi mạng. |
| Q31 | Entry point | UC42-44 có trong Quick Access (Home) và Sidebar. |

---

## Out-of-Scope Items

| Area | Reason |
|---|---|
| API endpoint testing (request/response backend) | API thuộc provider bên thứ ba (`project-context.md` mục 4.1) |
| API Performance / Load / Stress | NFR performance — defer backend team |
| Security server-side (auth backend, token signing, SSL cert validation) | NFR security server-side — defer security specialist |
| Push notification deep-link (Q17) | Thuộc UC258-259 |
| Badge color exact mapping (Q2) | Design chưa chốt — TC ghi "follow UI design" |
| Device compatibility matrix min version (Q29) | Project-level spec — cần tham chiếu khi executing |
| Offline cache hit/miss (Q30) | Giả định không cache |
| Tab bar horizontal scroll visual indicator (Q22) | UX minor, phụ thuộc UI design |
| Tab inactive state color/font (Q24) | UX minor, phụ thuộc UI design |
| CMR-03 "tap và giữ" option dài (Q27) | UX gesture minor |

---

## Notes

- TC_162 (Section 2 Check common #15 — scroll-down-to-load-more): ghi N/A vì màn Chi tiết không hỗ trợ lazy load (chỉ Danh sách hỗ trợ).
- Tất cả TC mặc định có "Test Result = Untested" cho Round 1 iOS và Android.
- File .xlsx đã áp dụng:
  - Tên sheet: `Quan ly dat lich`
  - Metadata header đầy đủ (System Name, Function Name, Created By, Date).
  - Section markers (xanh dương nhạt `FFA4C2F4`), Check type markers (vàng nhạt `FFFFF2CC`), Sub-label (xanh lam nhạt `FFE3FAFD`).
  - Column widths: A=14.25, B=39.0, C=37.38, D=50.38, E=48.63, F=16.0.

## Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-08 | qc-tc-design-MOBILE | First generation. 163 TC (116 Section 1 + 47 Section 2). RTM 22/22 AC covered. Áp dụng bắt buộc EP/BVA/Decision Table theo skill requirements. |
