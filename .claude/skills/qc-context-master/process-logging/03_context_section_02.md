# Context Section 02 - Project summary

## Draft content
| Hạng mục | Nội dung |
|---|---|
| Tên dự án / sản phẩm | SRS Mobile App — Cổng thông tin đầu tư & dịch vụ công cho Nhà đầu tư (NĐT) — Cục Đầu tư nước ngoài (Cục ĐTNN). *(Lưu ý: `project-config.md` đang ghi placeholder "test cho MBFS mobile" — cần đồng bộ tên chính thức, xem Q-001)* |
| Project ID | MBFS *(QC Lead đã xác nhận run-009)* |
| Domain / nghiệp vụ | Mobile app — Đầu tư công, xúc tiến đầu tư, dịch vụ công cho NĐT (cá nhân + doanh nghiệp) |
| Loại dự án | New build |
| Product Platform Type | `mobile-native` *(theo §5: ứng dụng native iOS + Android, FCM/APNs, VNeID deep-link)* |
| Mục tiêu chính của dự án/release | v1 — cung cấp kênh mobile-first để NĐT tra cứu KCN/KKT/TMTD/PTQ/quỹ đất, quản lý hồ sơ đầu tư, đặt lịch nộp hồ sơ, gửi phản ánh, theo dõi báo cáo đã nộp và nhận thông báo hệ thống |
| Người dùng chính | NĐT cá nhân (CN), NĐT doanh nghiệp (DN), và người dùng public (Khách / Anonymous) |
| Release / phase hiện tại | v1 (theo `UC_LIST_Mobile.md`) |

**Tóm tắt ngắn:**
Dự án SRS Mobile App là sản phẩm new build cấp 1 site (Mobile), thuộc Cục ĐTNN, phục vụ NĐT trong và ngoài nước truy cập thông tin đầu tư + dịch vụ công qua native mobile (iOS + Android). Release v1 gồm ~95 UC đơn lẻ gom thành 19 file UC trên 6 module: Xác thực & QL tài khoản, Trang chủ & Điều hướng, Quản lý hồ sơ & Dịch vụ, Tra cứu KCN/KKT & Quỹ đất, Tin tức Thông tin & Hỗ trợ, Thông báo. BA/PO: han.luong & huy.lai2. Tổng số 40 assumption đã được BA xác nhận trong ĐỢT 1 (29/04/2026); 3 item còn chờ BA (NV-09, NV-10, KT-03). 4 design item (Toast / Empty / Error states) và 3 UC (UC41, UC2 chi tiết KCN, UC55 đăng ký tư vấn) chờ BA/KH.

## Sources used
| Source | Evidence summary |
|---|---|
| `UC_LIST_Mobile.md` | 19 file UC, ~95 UC, version v1 |
| `ASSUMPTION_BACKLOG_Mobile.md` | ĐỢT 1 40 items, ĐỢT 2 chờ BA |
| `ACTION_ITEMS_Mobile.md` | BA owner = han.luong & huy.lai2 |
| existing project-context-master.md | Project ID = MBFS, Project type = New build, Platform = mobile-native |
| `project-config.md` | Project name placeholder ("test cho MBFS mobile") |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Business goal & KPI release v1 chưa có | Needs BA/Tech Lead source | Cao | PM / BA |
| Tên dự án chính thức trong `project-config.md` còn placeholder | QC-fillable | Trung | QC Lead / PM |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Project ID = MBFS | QC Lead xác nhận run-009 | Thấp | No |
| Domain = Cục ĐTNN | Suy từ nội dung UC (KCN, KKT, TMTD, PTQ — đặc thù Cục ĐTNN) | Trung — nếu chủ đầu tư khác sẽ thay đổi compliance | Yes — BA xác nhận |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| `project-config.md` Project name = "test cho MBFS mobile" vs SRS Mobile App cho NĐT | `project-config.md` vs UC_LIST + ASSUMPTION_BACKLOG | Thấp — chỉ ở meta-config | QC Lead / PM |

## Confidence
Medium
