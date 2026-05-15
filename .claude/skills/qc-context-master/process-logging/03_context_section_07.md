# Context Section 07 - Common rules, data/state, and integrations

## Draft content
### 7.1 Rule chung áp dụng nhiều function

| Rule | Áp dụng cho | Ảnh hưởng đến review/spec/scenario/test case |
|---|---|---|
| Public access (không yêu cầu đăng nhập) — PQ-01..PQ-07 | UC2-31, UC40, UC55-68, UC69/73, UC71-82, UC83-86, UC87-91, UC93-95 | Scenario chỉ cần Khách + NĐT (không cần token); không cần test session expired cho luồng public |
| CMND/CCCD: 9 hoặc 12 số (BS-09) | UC249, UC250-254 | Validation field |
| MST DN: 10 hoặc 13 số (BS-09); không cho sửa sau đăng ký (BS-11) | UC250-254 | Validation + read-only state |
| Không giới hạn số lần nhập sai mật khẩu (BS-03) | UC256 | Bỏ qua test account lockout |
| Quên mật khẩu qua SĐT hoặc Email, OTP qua SMS (BS-10) | UC250-254 | Phải test cả 2 kênh SĐT + Email |
| Sau đổi MK bắt buộc đăng xuất (BS-07) | UC249 + Auth | Regression: token invalidation |
| Sau đăng ký auto-login về Trang chủ (UX-14) | UC250-254 | Test ngay sau Register |
| Thay đổi ngôn ngữ áp dụng ngay, không restart (UX-13) | UC249, UC250-254 | Test UI ngôn ngữ động |
| Đăng xuất khi API thất bại vẫn xóa token cục bộ (BS-05) | UC257 | Test offline logout |
| Auto-fill họ tên/SĐT/Email + cho sửa (UX-07) | UC53 (Phản ánh) | Test dữ liệu auto-fill + after-edit |
| Lazy load 20 records (KT-02, KT-15, UX-04) | Danh sách KCN/KKT (UC2-31), Xúc tiến (UC87-95), Lịch hẹn (UC42-44) | Test scroll + page loading |
| FAQ Accordion mở nhiều câu cùng lúc (UX-11) | UC71-82 | Test multi-expand |
| Quick Access cố định, không tùy chỉnh (UX-01) | UC1 | Test UI |
| Badge thông báo fetch on focus (UX-02, KT-01) | UC1 | Test refresh khi focus app |
| Sidebar chứa toàn bộ menu (UX-03) | UC1 + Navigation | Không có bottom nav |
| Chỉ push + in-app, không có Email (KT-18) | UC258/259 | Loại trừ kênh Email khi test |
| Cache nội dung tĩnh offline (KT-14) | UC83-86 | Test offline behaviour |

### 7.2 Data object / state quan trọng cấp project

| Object / entity | Mô tả | State / lifecycle chính | Ghi chú QC |
|---|---|---|---|
| Auth token | Token sau đăng nhập, lưu Secure Storage (Keychain/Keystore — BS-04) | Active → Invalidate (logout, đổi MK) | BS-05 logout fail vẫn xóa cục bộ; BS-07 đổi MK invalidate |
| User profile | Họ tên, SĐT, Email, CMND/CCCD, MST DN | Created (Register) → Updated (Cấu hình) | MST DN không sửa (BS-11); auto-fill khi gửi phản ánh (UX-07) |
| Hồ sơ đầu tư | Hồ sơ DN/cá nhân do NĐT theo dõi | Trạng thái do BE quản lý — chỉ xem trên mobile | Không có thanh toán (NV-03), không nộp mới |
| Lịch hẹn | Lịch tạo từ web | Created (web) → Xem trên mobile (NV-01, NV-02 không tạo/huỷ) | Lazy load 20 (UX-04) |
| Phản ánh kiến nghị | Khiếu nại/kiến nghị | Nháp → Gửi → Huỷ bỏ (UX-06) | State workflow trên client + server |
| Báo cáo đã nộp | Báo cáo NĐT đã nộp | Read-only (NV-05 không tạo mới) | |
| Tài liệu trong Kho cá nhân | PDF/Image/Word/Excel | Read-only (NV-04 không xoá) | PDF/image mở browser, Word/Excel tải xuống (KT-07) |
| Lô đất (UC40) | Lô đất KCN | Đang cho thuê / Còn trống / Hết hạn HĐ (NV-06) | Trạng thái filter |
| Thông báo | Push + in-app | Unread → Read; loại còn chờ BA (NV-09) | Badge fetch on focus (KT-01) |

### 7.3 Integration / API / job / notification quan trọng

| Item | Loại | Module liên quan | Ghi chú QC / risk |
|---|---|---|---|
| VNeID | Integration (deep-link / in-app browser) | UC256 | High risk — phụ thuộc OS routing + app VNeID cài/chưa cài |
| FCM (Android) + APNs (iOS) | Notification | UC258/259 | Cold start deep link (KT-17) |
| Google Maps app | Integration (external app) | UC83-86 | Mở external (KT-12, KT-13) — không embed |
| In-app PDF viewer | Integration (client lib) | UC45-51, UC52 | KT-06 PDF in-app; KT-07 PDF/image mở browser, Word/Excel tải xuống |
| WebView | Integration (client) | UC55-68, UC69/73 | KT-08 lọc tỉnh/TP; KT-09 hiển thị VBPL |
| CMS / Backend API | API | UC55-68, UC71-82, UC87-95 | KT-11 nội dung động qua API; KT-15 lazy load |
| Secure Storage (Keychain/Keystore) | Client storage | Auth | BS-04 lưu token |
| OTP SMS | Service | UC250-254 (Quên MK) | BS-10 OTP qua SMS |

## Sources used
| Source | Evidence summary |
|---|---|
| `ASSUMPTION_BACKLOG_Mobile.md` toàn bộ BS/UX/KT/NV (ĐỢT 1) | Common rule + state + integration |
| existing project-context-master.md §7 | Carry-over critical flow + integration |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Common rule book chính thức (`CMR_Mobile.md`) — chưa tồn tại trong repo | Needs BA/Tech Lead source | Trung | BA |
| API spec / endpoint list — chưa có | Needs BA/Tech Lead source | Cao | Tech Lead |
| Trạng thái hồ sơ đầu tư chi tiết — chỉ biết read-only | Needs BA/Tech Lead source | Trung | BA |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Thông báo có badge unread/read | Suy từ UX-02 + KT-01 | Thấp | Yes — BA |
| Phản ánh có 3 state Nháp/Gửi/Huỷ bỏ | UX-06 confirmed | Thấp | No |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
High
