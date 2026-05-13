# DANH SÁCH USE CASE — SRS Mobile App

**Tiêu đề:** Danh mục tổng hợp Use Case ứng dụng di động  
**Ngày tạo:** 01/05/2026  
**Phiên bản:** v1  
**Tác giả:** QC Agent

---

## TỔNG QUAN

| Metric | Giá trị |
|---|---|
| Tổng số file UC | 15 |
| Tổng số UC đơn lẻ | ~95 UC |
| Phiên bản hiện tại | v1 |
| Trạng thái Assumption | ✅ Đã xử lý toàn bộ (1 file duy nhất) |

---

## DANH SÁCH UC THEO NHÓM CHỨC NĂNG

### A. XÁC THỰC & QUẢN LÝ TÀI KHOẢN

| # | File UC | UC IDs | Tên chức năng | Yêu cầu ĐN | Version |
|---|---|---|---|---|---|
| 1 | UC256_DangNhapMobile.md | UC256 | Đăng nhập ứng dụng Mobile | Không | v2 |
| 2 | UC257_DangXuatMobile.md | UC257 | Đăng xuất ứng dụng Mobile | Có | v2 |
| 3 | UC249_CauHinhTaiKhoan.md | UC249, UC250, UC251, UC254, UC260 | Cấu hình & Quản lý tài khoản | Có | v2 |
| 4 | UC250-254_QuanLyTaiKhoan.md | UC250, UC251, UC252, UC253, UC254 | Đăng ký, Quên MK, Cập nhật DN, Cấu hình | Hỗn hợp | v2 |

### B. TRANG CHỦ & ĐIỀU HƯỚNG

| # | File UC | UC IDs | Tên chức năng | Yêu cầu ĐN | Version |
|---|---|---|---|---|---|
| 5 | UC1_TrangChuDashboard.md | UC1 | Trang chủ Dashboard | Có | v2 |

### C. QUẢN LÝ HỒ SƠ & DỊCH VỤ

| # | File UC | UC IDs | Tên chức năng | Yêu cầu ĐN | Version |
|---|---|---|---|---|---|
| 6 | UC42-44_QuanLyDatLich.md | UC42, UC43, UC44 | Quản lý đặt lịch nộp hồ sơ | Có | v2 |
| 7 | UC45-51_QuanLyHoSo.md | UC45-UC51 | Quản lý hồ sơ | Có | v2 |
| 8 | UC52_KhoDuLieuDienTu.md | UC52 | Kho tài liệu cá nhân | Có | v2 |
| 9 | UC53_63-65_PhanAnhKienNghi.md | UC53, UC63, UC64, UC65 | Phản ánh kiến nghị | Có | v2 |
| 10 | UC54_BaoCaoDaNop.md | UC54 | Báo cáo đã nộp | Có | v2 |

### D. TRA CỨU KCN/KKT & QUỸ ĐẤT

| # | File UC | UC IDs | Tên chức năng | Yêu cầu ĐN | Version |
|---|---|---|---|---|---|
| 11 | UC2_TraCuuKCN_KKT.md | UC2-UC31 | Tra cứu KCN, KCN Sinh thái, KKT, TMTD, PTQ, Mô hình khác | Không | v2 |
| 12 | UC40_TraCuuDatKCN.md | UC40 | Tra cứu quỹ đất KCN | Không | v1 |

### E. TIN TỨC, THÔNG TIN & HỖ TRỢ

| # | File UC | UC IDs | Tên chức năng | Yêu cầu ĐN | Version |
|---|---|---|---|---|---|
| 13 | UC55-68_TinTucChatbot.md | UC55-UC62, UC66-UC68 | Tin tức, Chuyên trang, Chatbot | Không | v2 |
| 14 | UC69_73_VanBanPhapLuat_TTHC.md | UC69, UC73 | Văn bản pháp luật & TTHC | Không | v2 |
| 15 | UC71-82_HuongDan_FAQ.md | UC71-UC82 | Hướng dẫn sử dụng & FAQ | Không | v2 |
| 16 | UC83-86_DieuKhoan_LienHe_GioiThieu.md | UC83-UC86 | Điều khoản, Chính sách, Liên hệ, Giới thiệu | Không | v2 |
| 17 | UC87-95_XucTienDauTu.md | UC87-UC95 | Xúc tiến đầu tư | Hỗn hợp | v2 |

### F. THÔNG BÁO

| # | File UC | UC IDs | Tên chức năng | Yêu cầu ĐN | Version |
|---|---|---|---|---|---|
| 18 | UC258_UC259_ThongBaoHeThong.md | UC258, UC259 | Thông báo hệ thống (chính) | Có | v2 |
| 19 | UC258-259_ThongBao_BoSung.md | UC258, UC259 | Thông báo hệ thống (bổ sung) | Có | v2 |

---

## CẤU TRÚC SIDEBAR NAVIGATION (Từ wireframe)

Sidebar được chia thành các nhóm sau:

### GIỚI THIỆU
| Menu Item | UC tương ứng | Ghi chú |
|---|---|---|
| Giới thiệu | UC86 | Trang giới thiệu Cục ĐTNN |
| Lĩnh vực đầu tư | UC87-95 | Hub xúc tiến đầu tư |
| Khu vực đầu tư | UC55 | Chuyên trang đầu tư theo khu vực |
| Liên hệ | UC85 | Trang liên hệ |

### DỊCH VỤ
| Menu Item | UC tương ứng | Ghi chú |
|---|---|---|
| Thủ tục hành chính | UC73 | Tra cứu TTHC |
| Quản lý hồ sơ | UC45-51 | Quản lý hồ sơ |
| Quản lý đặt lịch | UC42-44 | Đặt lịch nộp hồ sơ |
| Phản ánh kiến nghị | UC53/63-65 | Gửi & tra cứu phản ánh |

### KHU CÔNG NGHIỆP / KKT
| Menu Item | UC tương ứng | Ghi chú |
|---|---|---|
| Khu công nghiệp | UC2-6 | Danh sách KCN |
| KCN sinh thái | UC7-11 | Danh sách KCN sinh thái |
| Khu thương mại tự do | UC17-21 | Danh sách khu TMTD |
| Khu kinh tế | UC12-16 | Danh sách KKT |
| Mô hình khu khác | UC27-31 | Danh sách mô hình khu khác |
| Khu phi thuế quan | UC22-26 | Danh sách khu PTQ |
| Thông tin quỹ đất | UC40 | Tra cứu quỹ đất |
| Quản lý cho thuê đất | UC41 | Cho thuê đất trong KCN |

### TIN TỨC & TRA CỨU
| Menu Item | UC tương ứng | Ghi chú |
|---|---|---|
| Tin tức | UC55-68 | Hub tin tức & chatbot |
| Văn bản pháp luật | UC69 | Tra cứu văn bản pháp luật |

### CÀI ĐẶT
| Menu Item | UC tương ứng | Ghi chú |
|---|---|---|
| Cấu hình tài khoản | UC249 | Cài đặt tài khoản |
| Đăng xuất | UC257 | Đăng xuất |

---

## FILE HỖ TRỢ

| File | Mô tả | Version |
|---|---|---|
| ASSUMPTION_BACKLOG_Mobile.md | Tổng hợp toàn bộ assumptions + câu trả lời BA (1 file duy nhất) | v1 |
| UC_LIST_Mobile.md | File này — Danh sách UC tổng hợp | v1 |
