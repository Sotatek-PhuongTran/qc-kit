# Question Backlog — UC45-51: Quản lý hồ sơ trên Mobile

| Thuộc tính | Giá trị |
|---|---|
| **UC ID** | UC45-51 |
| **Source review** | `UC45-51_quan-ly-ho-so_audited_20260513_v1.md` |
| **Date created** | 2026-05-13 |
| **Author / Agent** | qc-uc-read (run-011) |
| **Version** | v1 |
| **Owner BA** | han.luong & huy.lai2 |
| **Total questions** | 30 (High: 6 · Medium: 15 · Low: 9) |

---

## Hướng dẫn cho BA

- Cột **BA Answer** điền câu trả lời cụ thể (verbatim text, enum values, behaviour rule).
- Cột **Status:** `Open` (mặc định) → `Answered` (BA trả lời) → `Closed` (QC verify áp dụng vào v[N+1]).
- Sau khi BA trả lời tối thiểu các câu **High-priority**, trigger lại `/qc-uc-read` để re-audit (skill chuyển sang `re-audit` mode, generate `uc-review-report v2`).

---

## High-Priority Questions (block test design)

| ID | Ref (source excerpt) | Question | Why It Matters | BA Answer | Status |
|----|----------------------|----------|----------------|-----------|--------|
| Q1 | UC45-51 §2.1 "Khung Header" (2 items: Back + Title) vs wireframe 9/9 ảnh list có Notification Bell (🔔 + badge vàng) ở góc phải header | **C1** — Notification Bell có thuộc UC45-51 không hay là global header element (giống UC1)? Nếu thuộc UC45-51, định nghĩa: (a) Tap → màn nào (UC258/UC259)? (b) Threshold/count rule cho badge vàng? (c) Refresh policy (polling interval, refresh on focus)? Hiển thị badge khi nào (unread count > 0)? | Bell visible trong mọi ảnh list nhưng spec không khai báo. Tester không biết test target tap, threshold count, polling behavior. Block ~5 TC navigation + notification. |  | Open |
| Q2 | UC45-51 §2.1 "Card hồ sơ" #8 "Icon Điều hướng (>)" vs wireframe UC47/48/49/50/51 (5/6 ảnh) có thêm Button "Xem chi tiết" (icon mắt 👁) trong mỗi card; UC45 "Tất cả" KHÔNG có button | **C2** — (a) Tại sao UC45 "Tất cả" không có nút "Xem chi tiết"? Design intent? (b) Behavior nút "Xem chi tiết" có khác với tap card / icon ">" không? (c) Nếu identical, có cần button không (UX consideration)? (d) CMR-18 debounce kết hợp như thế nào khi cả card + button đều có thể tap? | Block ~10 TC navigation Detail (different entry points). Tester không xác định được test cho UC45 vs các tab khác. |  | Open |
| Q3 | UC45-51 §2.1 "Modal Bộ lọc tìm kiếm" — Spec: "Nút X đóng" (top-right) + "Nút Nhập lại" (Secondary) + "Nút Áp dụng" (Primary). Wireframe `UC45-51 filter.png`: 3 buttons trong 1 row "Nhập lại / Đóng / Tìm" — KHÔNG có X top-right, primary là "Tìm" thay vì "Áp dụng" | **C3** — Chốt labels & layout: (a) Có nút X góc phải trên cùng không? (b) Primary button = "Tìm" hay "Áp dụng"? (c) Có nút "Đóng" độc lập trong row buttons không (wireframe có, spec không)? (d) Cập nhật doc nào — spec hay wireframe? | Block toàn bộ TC filter (AC-17 → AC-23, ~15-20 TC). Tester không verify được labels chính xác. |  | Open |
| Q4 | UC45-51 §1 "Phân quyền: Cá nhân/Tổ chức đã đăng nhập chỉ xem được hồ sơ của chính mình nộp." | **B4 — Permission edge cases:** (a) DN có nhiều user (multiple employees đăng nhập cùng MST DN) — mỗi user xem hồ sơ DN nói chung hay chỉ hồ sơ user đó đứng tên nộp? (b) Admin / Cán bộ Cục có role nào không (UC này có applicable cho admin/cán bộ với hành vi khác)? (c) Khách/Anonymous bị chặn ở route guard (redirect login) hay ẩn UI (menu Sidebar không hiển thị)? | Block ~8 TC permission/data isolation (cùng DN khác user; admin role; anonymous). Critical cho security testing. |  | Open |
| Q5 | UC45-51 §2.1 v2.4 (line 47): "Khi chuyển tab trạng thái nội bộ trong cùng màn hình → giữ nguyên keyword tìm kiếm và bộ lọc hiện tại (tab bản chất là một dạng filter bổ sung)". CMR_Mobile.md v1.5 CMR-01: "Phạm vi tìm kiếm (Tab) — Search áp dụng cho toàn bộ các tab, kết quả tìm kiếm hiển thị trên tab 'Tất cả' bất kể tab nào đang được chọn." | **C6** — Hai behavior mâu thuẫn hoàn toàn: **Behavior A (UC)** — Search keyword AND Tab filter combined → kết quả hiển thị trên tab hiện tại (intersection). **Behavior B (CMR-01)** — Search override Tab → kết quả luôn hiển thị trên tab "Tất cả" (override). Chốt 1 behavior, cập nhật doc còn lại. | Block AC-10 và mọi TC Search × Tab interaction (~10-15 TC). Ảnh hưởng UX core. |  | Open |
| Q6 | UC45-51 §3.3 "Tiêu chí chấp nhận (Acceptance Criteria)" — 5 bullets ngắn (AC1-AC5) | **B2** — AC quá ít và không G/W/T format: không phủ error handling (network/500/timeout/401), lazy load retry, partial data, state persistence (tab+scroll+search), 401 redirect, empty state phân biệt (no-data vs no-result), đa ngôn ngữ, Android back vật lý, pull-to-refresh, file viewer routing. Bổ sung AC formal Given/When/Then cho mỗi flow (~30-40 ACs). Đã generate 44 ACs trong audited report — cần BA xác nhận hay revise. | Block test design — tester thiếu basis verify pass/fail cho ~80% scenarios. |  | Open |

---

## Medium-Priority Questions

| ID | Ref (source excerpt) | Question | Why It Matters | BA Answer | Status |
|----|----------------------|----------|----------------|-----------|--------|
| Q7 | UC46 detail wireframe có badge "Chờ tiếp nhận" gần góc phải header. UC45-51 §2.2 "Khung Header" detail chỉ có Back + Title. §2.2.1 Banner có Badge trạng thái. | **C7** — Badge ở header detail có phải là duplicate badge trong Banner không? Nếu khác, định nghĩa khác biệt (header = trạng thái real-time vs banner = trạng thái khi mở)? Behavior cập nhật khi data thay đổi server-side? | TC verify badge consistency — không biết phải verify 1 hay 2 badge. |  | Open |
| Q8 | UC45-51 §2.1 BF1 Trạng thái: "Giá trị mặc định: Tất cả trạng thái". Wireframe filter: placeholder "Chọn trạng thái" (empty). | **C4** — Khi user mở filter lần đầu, dropdown hiển thị "Tất cả trạng thái" (đã chọn, default value) hay "Chọn trạng thái" (placeholder, chưa có giá trị)? Active Filter Indicator có hiển thị khi user chưa chọn gì không (Trạng thái = default)? | TC verify default state filter. |  | Open |
| Q9 | UC45-51 §2.1 Tab "Quy tắc hiển thị": "Text/màu đỏ + underline đỏ khi được chọn". Wireframe Tab List + 6 ảnh list: active tab là pill nền đỏ filled (text trắng, không có underline). | **C5** — Active tab style: underline đỏ (per spec) hay pill filled (per wireframe)? Chốt 1 style, cập nhật doc còn lại. | TC verify UI active state — block visual verification. |  | Open |
| Q10 | UC45-51 §2.2.7 Section 6: "Số ngày kiểm tra hợp lệ: [Giá trị]" và "Số ngày giải quyết: [Giá trị]" | **B8** — Đơn vị "ngày"? Format integer hay decimal? Khi đang trong quy trình (chưa hoàn thành): giá trị = 0, null, hay current day count? Khi đã quá thời hạn: hiển thị âm? | TC verify display + edge cases (0 day, decimal, overdue). |  | Open |
| Q11 | UC45-51 §2.2.8 Section 7: "Hiển thị timeline các bước xử lý (VD: Đã nộp hồ sơ (Ngày giờ), Đang xử lý...). Mỗi bước gồm tên bước + ngày giờ." | **B5** — Data structure cụ thể: (a) Steps = enum cố định hay dynamic theo API? (b) Max steps? (c) Sort order (chronological asc/desc)? (d) Steps đã xảy ra vs upcoming hiển thị khác nhau (e.g., highlight step current)? (e) Empty timeline → "-" thế nào? Có thể empty không? | TC setup test data cho timeline edge cases. |  | Open |
| Q12 | UC45-51 §2.1 BF1: "Danh sách trạng thái lấy từ danh mục hệ thống". Tabs có 6 giá trị (Tất cả + 5 status). | **B6** — Filter Trạng thái dropdown enum chính xác: có 6 (gồm "Tất cả trạng thái") hay 5 giá trị (không gồm "Tất cả")? Order theo gì (alphabetical, workflow chronology)? Searchable behavior cho text dài? | TC verify filter options + UX dropdown. |  | Open |
| Q13 | UC45-51 §2.2.3 Section 2: "Phương thức tiếp nhận" / "Phương thức giao kết quả". UC46 wireframe hiển thị "Trực tuyến". | **B7** — Enum đầy đủ: chỉ có "Trực tuyến" hay còn "Trực tiếp" / "Bưu điện" / "Khác"? Behavior khác nhau theo phương thức (UI hiển thị khác, validation khác)? | TC verify display giá trị + edge cases. |  | Open |
| Q14 | UC45-51 §3.1 pull-to-refresh + lazy load áp dụng cho list. Detail screen không khai báo. | **B9** — Màn Detail có hỗ trợ pull-to-refresh không? Nếu data hồ sơ thay đổi server-side (e.g., chuyển trạng thái từ "Chờ tiếp nhận" → "Đã tiếp nhận") khi user đang ở Detail screen, behavior thế nào (silent reload, toast notify, hay không update)? | TC test data freshness on Detail; deep link scenarios. |  | Open |
| Q15 | UC45-51 §2.2.6 Section 5: "Danh sách file đính kèm". | **B10** — Lazy load nếu > N files? Max N? Sort theo gì (tên file alphabetical, ngày upload chronological, format grouped)? Hiển thị file size không? | TC test hồ sơ với nhiều file (e.g., 50 files); UX scroll. |  | Open |
| Q16 | UC45-51 §2.2.1 Banner DB1 "Mã hồ sơ" + §2.2.2 D1.2 "Mã hồ sơ"; Banner DB3 "Ngày nộp" + §2.2.3 D2.5 "Ngày nộp". | **C8** — "Mã hồ sơ" và "Ngày nộp" hiển thị duplicate 2 lần trên Detail screen. Intentional design (e.g., banner để emphasize, section để chi tiết format) hay redundancy? Khi data từ 2 API endpoints khác nhau, có sync không? | TC verify duplicate display và data consistency. |  | Open |
| Q17 | UC45-51 §2.2.1 DB2 Badge trạng thái + §2.2.8 D7.2 Badge trạng thái timeline. | **C9** — Badge ở Banner và badge ở Timeline có cùng giá trị không? Nếu khác: định nghĩa khác biệt (e.g., badge banner = trạng thái tổng từ API metadata, badge timeline = trạng thái step cuối từ API timeline). | TC verify 2 badges consistency hoặc difference. |  | Open |
| Q18 | UC45-51 §2.2.2 D1.5 "Số bộ hồ sơ" — "Hiển thị số bộ hồ sơ". Wireframe hiển thị "1 bộ hồ sơ". | **C10** — Format chính xác: `{N} bộ hồ sơ` với N integer? Khi N = 0: hiển thị "0 bộ hồ sơ" hay "-"? Khi N = null: "-"? Có max N không? | TC verify display + edge cases. |  | Open |
| Q19 | UC45-51 §1 + §3.1: pre/post implicit. Không có section formal. | **B1** — Bổ sung section formal **Preconditions** + **Postconditions** cho từng flow chính (List load, Tab switch, Search, Filter apply, Detail navigate, File viewer, Pull-to-refresh, Lazy load). | TC setup data + verify state cho từng flow. |  | Open |
| Q20 | UC45-51 NFR thin (chỉ có lazy load 20 + timeout 10s + 5 ngôn ngữ). | **B3** — Bổ sung NFR target: (a) Response time list/detail/search/filter (P95/P99); (b) Concurrent users; (c) Rate limit; (d) Accessibility (a11y screen reader, font scaling, color contrast); (e) iOS / Android version matrix (min OS); (f) Device size coverage (smartphone tablet?); (g) Offline behavior (cache, retry queue); (h) Logging policy (analytics, error reporting). | TC performance, a11y, compatibility — hiện không thể test. |  | Open |
| Q21 | project-context-master §5: FCM/APNs push notification. UC45-51 spec không khai báo deep link. | **B13** — Deep link push notification: tap notification về hồ sơ X → mở Detail UC46 trực tiếp? Behavior Back khi mở từ deep link (về Trang chủ UC1, về Danh sách UC45-51, hay về màn trước app)? Cold start vs hot start có khác không? | TC test deep link flow. |  | Open |

---

## Low-Priority Questions

| ID | Ref (source excerpt) | Question | Why It Matters | BA Answer | Status |
|----|----------------------|----------|----------------|-----------|--------|
| Q22 | UC45-51 §3.1 state persistence. Không khai báo logout/login reset. | **B12** — Khi user logout rồi login lại, tab + scroll + search/filter có reset về default không? (Giả định reset, cần xác nhận.) Session id thay đổi → state có lưu trên client hay server profile? | TC test session boundary. |  | Open |
| Q23 | UC45-51 §2.2.2 D1.3 "Đối tượng": "Hiển thị đối tượng thực hiện (Cá nhân/Tổ chức)" | **B11** — Field "Đối tượng" suy ra từ user profile login (mọi hồ sơ user A nộp đều có "Đối tượng" = profile type của A)? Có case nào "Đối tượng" hồ sơ khác với user (e.g., user CN nộp giúp DN — hợp lệ không, ngoài scope?)? | TC verify data source consistency. |  | Open |
| Q24 | UC45-51 các icon trong cards và sections (lịch, người, tòa nhà, đồng hồ, mắt, refresh ↻, X, kính lúp, filter). | Style guide / icon library / size standards cho mobile? Có icon mapping cho dark mode không? Spec không tham chiếu. | UI consistency có thể không đồng nhất giữa UC. |  | Open |
| Q25 | UC45-51 §3.2 Đa ngôn ngữ: "text cứng dịch sang ngôn ngữ tương ứng" cho 5 ngôn ngữ. | Test data 5 ngôn ngữ: cần verify dịch chính xác cho tất cả ~42 hard-text strings (header, tab labels, button labels, placeholders, all CMR-07/CMR-14 messages, empty states, toasts). BA cung cấp translation table không? | TC i18n cần 5 language test data sets. |  | Open |
| Q26 | UC45-51 §2.1 Card: "Wrap text nếu dài quá, không truncate" cho field Đơn vị + Người nộp; nhưng Mã hồ sơ "1 dòng, truncate"; Tên thủ tục "tối đa 2 dòng, truncate". | Wrap vs truncate rule consistency: tại sao mỗi field có rule khác nhau? Có ảnh hưởng card height variable không (UX cards không đồng đều)? | TC verify layout edge cases (text dài → card cao bao nhiêu, có overlap khác card không). |  | Open |
| Q27 | UC45-51 §3.1: "First-load: Khi mở màn hình lần đầu **hoặc đổi tab**, sử dụng loading state toàn màn hình. **Subsequent load**: Các lần tải tiếp theo (lazy load, refresh) sử dụng loading indicator cục bộ (spinner)." | Tab switch có phải full-screen overlay (theo "hoặc đổi tab") hay spinner cục bộ (theo "subsequent")? Cùng tab + filter apply là full-screen hay spinner? Cùng tab + search là full-screen hay spinner? Cùng tab + pull-to-refresh? | Mâu thuẫn nội bộ §3.1. Tester verify loading style không biết chính xác. |  | Open |
| Q28 | UC45-51 §2.1 Tabs horizontal scroll (visible cropping tab "Đã" trong UC45 ảnh). | Tab horizontal scroll behavior: (a) Auto-scroll-into-view khi tap tab ngoài viewport? (b) Initial scroll position (tab "Tất cả" leftmost)? (c) Swipe ngang giữa tabs có chuyển content (paging) không? | TC verify UX tab navigation edge cases. |  | Open |
| Q29 | UC45-51 §1: "Truy cập chức năng: Sidebar → 'Quản lý hồ sơ'". UC1 §2.1 Quick Access có button "Hồ sơ" (giả định trỏ đến UC45-51). | Entry points đến UC45-51: chỉ Sidebar hay còn từ UC1 Quick Access + Push notification deep link + URL deep link? Hành vi khi vào từ Quick Access có khác Sidebar không (e.g., reset state hay restore last state)? | TC navigation entry points coverage. |  | Open |
| Q30 | UC45-51 §2.1 Card #5 "Badge [Cá nhân/Tổ chức]" — màu sắc badge này không khai báo trong spec. CMR-05: "Xanh lá = tích cực, Vàng = chờ, Đỏ = tiêu cực, Xám = trung tính". | Badge "Cá nhân"/"Tổ chức" thuộc loại neutral (xám)? Style guide riêng (e.g., Cá nhân = xanh dương, Tổ chức = tím)? | TC verify color theo design. |  | Open |

---

## Notes

- Sau khi BA trả lời các High-priority (Q1-Q6) và Medium-priority (Q7-Q21), trigger `/qc-uc-read` để re-audit. Skill sẽ chuyển sang `re-audit` mode, tính lại điểm và generate `UC45-51_quan-ly-ho-so_audited_20260513_v2.md`.
- Low-priority (Q22-Q30) có thể defer sang lượt re-audit sau hoặc đóng inline nếu BA confirm tại sao không quan trọng.
- Cross-references trong audited report: C1=Q1, C2=Q2, C3=Q3, C4=Q8, C5=Q9, C6=Q5, C7=Q7, C8=Q16, C9=Q17, C10=Q18; B1=Q19, B2=Q6, B3=Q20, B4=Q4, B5=Q11, B6=Q12, B7=Q13, B8=Q10, B9=Q14, B10=Q15, B11=Q23, B12=Q22, B13=Q21.
