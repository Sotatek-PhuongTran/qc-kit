# Feature Inventory

## Extraction summary
- source strategy: Use cao nhất `UC_LIST_Mobile.md` (official high-level inventory + Sidebar) + đối chiếu `qc-dashboard.md` hiện hữu. `ASSUMPTION_BACKLOG_Mobile.md` PQ-07 dùng để phân định scope của nhóm UC87-95 (UC92 yêu cầu đăng nhập, còn lại public). `ACTION_ITEMS_Mobile.md` cho biết UC41 đang chờ BA.
- official candidates: 19 file UC trong `UC_LIST_Mobile.md` (~95 UC đơn lẻ, gom theo file).
- derived candidates: UC73 (TTHC), nhóm UC87-95 (UC91-95) — có trong UC_LIST nhưng dashboard hiện chỉ có 1 row đại diện (UC90).
- temporary IDs: không tạo (mọi ID đều official).
- blocked: no

## Feature candidates
| ID | Site | Module | Feature/Use case name | In scope? | Source | Source type | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|
| UC1 | Mobile | Trang chủ & Điều hướng | Trang chủ Dashboard | Yes | UC_LIST §B + dashboard | official high-level + existing dashboard | High | Đã có trong dashboard |
| UC2 | Mobile | Tra cứu KCN/KKT & Quỹ đất | Tra cứu KCN, KCN Sinh thái, KKT, TMTD, PTQ, Mô hình khác (UC2-UC31) | Yes | UC_LIST §D | official high-level + existing dashboard | High | UC_LIST gom UC2-31 |
| UC40 | Mobile | Tra cứu KCN/KKT & Quỹ đất | Tra cứu quỹ đất KCN | Yes | UC_LIST §D | official high-level + existing dashboard | High | |
| UC41 | Mobile | Tra cứu KCN/KKT & Quỹ đất | Cho thuê đất KCN (tách khỏi UC40) | No (Out of scope hiện tại — chờ BA) | ACTION_ITEMS AI-UC-01 + existing project-context | official high-level | Medium | Chưa có file UC, chưa nên thêm vào dashboard; flag chờ BA hoàn tất |
| UC42-44 | Mobile | Quản lý hồ sơ & Dịch vụ | Quản lý đặt lịch nộp hồ sơ | Yes | UC_LIST §C + dashboard | official high-level + existing dashboard | High | |
| UC45-51 | Mobile | Quản lý hồ sơ & Dịch vụ | Quản lý hồ sơ | Yes | UC_LIST §C + dashboard | official high-level + existing dashboard | High | |
| UC52 | Mobile | Quản lý hồ sơ & Dịch vụ | Kho tài liệu cá nhân | Yes | UC_LIST §C + dashboard | official high-level + existing dashboard | High | |
| UC53_63-65 | Mobile | Quản lý hồ sơ & Dịch vụ | Phản ánh kiến nghị (UC53, UC63-65) | Yes | UC_LIST §C + dashboard | official high-level + existing dashboard | High | |
| UC54 | Mobile | Quản lý hồ sơ & Dịch vụ | Báo cáo đã nộp | Yes | UC_LIST §C + dashboard | official high-level + existing dashboard | High | |
| UC55 | Mobile | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang đầu tư theo khu vực | Yes | UC_LIST §E (file UC55-68) + dashboard | official high-level + existing dashboard | High | |
| UC56-57_66_68 | Mobile | Tin tức, Thông tin & Hỗ trợ | Tin tức (UC56-57, UC66, UC68) | Yes | UC_LIST §E + dashboard | official high-level + existing dashboard | High | |
| UC58 | Mobile | Tin tức, Thông tin & Hỗ trợ | (Chưa rõ — thuộc file UC55-68 nhưng không có row trong dashboard) | Need confirm | UC_LIST §E (UC55-62, UC66-68) | derived from high-level | Low | Cần BA/QC Lead xác nhận UC58 có thật, gộp vào row nào |
| UC59 | Mobile | Tin tức, Thông tin & Hỗ trợ | (Chưa rõ — thuộc file UC55-68) | Need confirm | UC_LIST §E (UC55-62, UC66-68) | derived from high-level | Low | Cần xác nhận tương tự UC58 |
| UC60-61 | Mobile | Tin tức, Thông tin & Hỗ trợ | Tin tức / Chuyên trang (UC60-61) | Yes | UC_LIST §E + dashboard | official high-level + existing dashboard | High | |
| UC62 | Mobile | Tin tức, Thông tin & Hỗ trợ | (Chưa rõ — thuộc file UC55-68) | Need confirm | UC_LIST §E (UC55-62, UC66-68) | derived from high-level | Low | Cần xác nhận |
| UC67 | Mobile | Tin tức, Thông tin & Hỗ trợ | (Chưa rõ — không có trong UC_LIST §E range "UC55-62, UC66-68") | Need confirm | UC_LIST §E (gap giữa UC66 và UC68) | derived from high-level | Low | UC67 có thể đã bị gộp/bỏ — cần BA xác nhận |
| UC69 | Mobile | Tin tức, Thông tin & Hỗ trợ | Văn bản pháp luật | Yes | UC_LIST §E + dashboard | official high-level + existing dashboard | High | |
| UC70 | Mobile | Tin tức, Thông tin & Hỗ trợ | (Đã bị Remove khỏi WBS) | Removed | dashboard hiện có row Removed | existing dashboard | High | Giữ nguyên trạng thái Removed (soft-delete) |
| UC71-82 | Mobile | Tin tức, Thông tin & Hỗ trợ | Hướng dẫn sử dụng & FAQ | Yes | UC_LIST §E + dashboard | official high-level + existing dashboard | High | |
| UC73 | Mobile | Tin tức, Thông tin & Hỗ trợ | Tra cứu Thủ tục hành chính (TTHC) | Need confirm | UC_LIST §E (file UC69_73_VanBanPhapLuat_TTHC.md) | derived from high-level | Medium | UC_LIST nói UC73 thuộc file VBPL+TTHC nhưng dashboard không có row UC73. Existing project-context lại ghi "UC70 — Tra cứu TTHC trên mobile" Removed. Có thể UC73 bị nhầm với UC70 — cần BA/QC Lead xác nhận |
| UC83-86 | Mobile | Tin tức, Thông tin & Hỗ trợ | Điều khoản, Chính sách, Liên hệ, Giới thiệu | Yes | UC_LIST §E + dashboard | official high-level + existing dashboard | High | |
| UC90 | Mobile | Tin tức, Thông tin & Hỗ trợ | Xúc tiến đầu tư (UC90, thuộc nhóm UC87-95) | Yes | UC_LIST §E + dashboard | official high-level + existing dashboard | High | Row hiện đại diện cả nhóm UC87-95 |
| UC87, UC88, UC89, UC91, UC92, UC93, UC94, UC95 | Mobile | Tin tức, Thông tin & Hỗ trợ | (UC con trong nhóm Xúc tiến đầu tư) | Need confirm | UC_LIST §E + PQ-07 | derived from high-level | Medium | UC_LIST tách rõ UC87-95; PQ-07 phân biệt UC92 cần đăng nhập, còn lại public. Cần QC Lead quyết định có tách row riêng cho UC92 hay gộp vào UC90 row |
| UC249 | Mobile | Xác thực & Quản lý tài khoản | Cấu hình & Quản lý tài khoản (UC249, UC250, UC251, UC254, UC260) | Yes | UC_LIST §A + dashboard | official high-level + existing dashboard | High | |
| UC250-254 | Mobile | Xác thực & Quản lý tài khoản | Đăng ký, Quên MK, Cập nhật DN | Yes | UC_LIST §A + dashboard | official high-level + existing dashboard | High | |
| UC256 | Mobile | Xác thực & Quản lý tài khoản | Đăng nhập ứng dụng Mobile | Yes | UC_LIST §A + dashboard | official high-level + existing dashboard | High | |
| UC257 | Mobile | Xác thực & Quản lý tài khoản | Đăng xuất ứng dụng Mobile | Yes | UC_LIST §A + dashboard | official high-level + existing dashboard | High | |
| UC258_UC259 | Mobile | Thông báo | Thông báo hệ thống | Yes | UC_LIST §F + dashboard | official high-level + existing dashboard | High | UC_LIST có thêm file "UC258-259 bổ sung" — nội dung gộp chung trong cùng row |
| UC260 | Mobile | Xác thực & Quản lý tài khoản | Đã được gộp vào row UC249 theo UC_LIST §A | Yes (gộp) | UC_LIST §A | official high-level | High | Không cần row riêng |

## Dashboard delta candidates
- new: (không có row hoàn toàn mới)
- existing unchanged: UC1, UC2, UC40, UC42-44, UC45-51, UC52, UC53_63-65, UC54, UC55, UC56-57_66_68, UC60-61, UC69, UC71-82, UC83-86, UC90, UC249, UC250-254, UC256, UC257, UC258_UC259 (20 rows)
- re-add candidates: (không có)
- not found in current source: UC70 (đã được đánh Removed — giữ nguyên)
- need confirmation: UC58, UC59, UC62, UC67, UC73, UC87, UC88, UC89, UC91, UC92, UC93, UC94, UC95 — đều là UC con đề cập trong UC_LIST nhưng không có row riêng trong dashboard. Cần QC Lead/BA quyết định gộp hay tách row.

## Gaps for project context
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Cách gom row dashboard chưa khớp 1-1 với UC_LIST: UC55-68 (12 UC) đang gom thành 3 row, UC87-95 (9 UC) đang gom thành 1 row UC90 | Derivable from detailed requirement docs | Trung bình — ảnh hưởng coverage tracking khi review/scenario/TC | QC Lead |
| UC41 chờ BA — đã liệt kê Out-of-scope hiện tại | Needs BA/Tech Lead source | Trung bình — có thể trở thành in-scope khi BA hoàn tất | BA |
| UC73 vs UC70 (TTHC) — mơ hồ giữa UC_LIST (UC73) và existing project-context (UC70 Removed) | QC-fillable + Needs BA confirmation | Trung bình | QC Lead + BA |
| Không có file đại diện cho row UC249 (UC260 được gộp) — chỉ ghi chú trong UC_LIST | QC-fillable | Thấp | QC Lead |
