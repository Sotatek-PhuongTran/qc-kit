# Context Section 08 - Platform, environment, device, and constraints

## Draft content
### 8.1 Platform và environment tổng quan

| Hạng mục | Nội dung | Ghi chú QC |
|---|---|---|
| Platform type | `mobile-native` (iOS + Android) | Điều khiển rubric thiết kế test case mobile-native |
| Browser / OS / device cần quan tâm | OS: iOS (APNs — KT-16) + Android (FCM — KT-16). Phiên bản OS, danh sách thiết bị, screen size chưa định nghĩa | TBD — cần Tech Lead/QC Lead xác nhận test matrix (xem Open Question) |
| Test environment | DEV / QA-Staging / UAT / PROD (từ `project-config.md` §3) | Endpoint hiện đang là placeholder; agent **không thực thi test** — execution do QC engineer chạy ngoài framework |
| Integration mode | VNeID (real / sandbox?), FCM/APNs (real), Google Maps app (real external), WebView (real) | Chưa rõ VNeID có sandbox không — Open Question |
| Test data / account tổng quan | NĐT CN (CMND/CCCD 9/12), NĐT DN (MST 10/13), Khách (không cần account) | `project-config.md` §4 chưa fill account/password thực — placeholder |

### 8.2 NFR, security, compliance, legal, audit

| Loại ràng buộc | Nội dung đã biết | Ảnh hưởng QC |
|---|---|---|
| Performance | Chỉ có rule lazy load 20 records (KT-02, KT-15). Không có target response time / TPS | Chưa thể thiết kế performance test có ngưỡng |
| Security | Token Secure Storage (BS-04); không giới hạn nhập sai MK (BS-03) — có thể bị review NFR-security; sau đổi MK bắt buộc đăng xuất (BS-07) | Cần BA/Tech Lead xác nhận policy lockout có cần không |
| Accessibility | Chưa đề cập trong assumption | Chưa có target a11y |
| Privacy / Compliance / Legal | Dự án dịch vụ công cho NĐT, có thể chịu Luật bảo mật thông tin cá nhân / Luật ĐT — chưa có document chính thức | Cần Legal/BA xác nhận constraint |
| Audit / Logging | Chưa đề cập | Cần Tech Lead định nghĩa log policy |

## Sources used
| Source | Evidence summary |
|---|---|
| existing project-context-master.md §8 + §1 platform | Platform type, environments, run-009 carve-out |
| `project-config.md` §3, §4 | 4 environments + account placeholder |
| `ASSUMPTION_BACKLOG_Mobile.md` BS-03, BS-04, BS-07, KT-02, KT-15, KT-16 | Security + performance rời rạc |

## Gaps found
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
| Mobile platform coverage matrix (OS version, thiết bị, screen size) | Needs BA/Tech Lead source | Trung | Tech Lead / QC Lead |
| NFR Performance / Security / Accessibility / Logging có target | Needs BA/Tech Lead source | Cao | PM / Tech Lead |
| VNeID sandbox / mock — flow test integration | Needs BA/Tech Lead source | Cao | Tech Lead |
| Privacy / Compliance / Legal document | Needs BA/Tech Lead source | Trung | Legal / BA |

## Assumptions
| Assumption | Why made | Impact if wrong | Needs confirmation? |
|---|---|---|---|
| Agent không execute test thực tế → endpoints không cần fill | QC Lead xác nhận run-009 | Thấp | No |

## Conflicts
| Conflict | Sources | QC impact | Suggested owner |
|---|---|---|---|
| (không có) | - | - | - |

## Confidence
Medium
