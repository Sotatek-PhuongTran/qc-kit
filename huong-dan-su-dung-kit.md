# Hướng dẫn sử dụng QC Kit v3 — cho người mới

> Tài liệu: Hướng dẫn sử dụng QC Kit v3 | Ngày tạo: 2026-07-03 | Tác giả: Claude (theo yêu cầu của Chris) | Phiên bản: v3
>
> Thay đổi so với v2: bổ sung mục 5 — diễn giải các thư mục output trong `docs/qc-lead/` và `docs/qc/`.

Bộ kit gồm 11 skill giúp QC làm việc theo quy trình: hiểu dự án → thiết kế test → (tùy chọn) chạy tự động. Bạn chỉ cần gõ lệnh `/tên-skill`, skill sẽ tự hỏi thêm khi thiếu thông tin.

---

## 1. Bức tranh tổng thể — 3 tầng

```
TẦNG 1 — CONTEXT (chạy 1 lần khi vào dự án, chạy lại khi tài liệu chung thay đổi)
/qc-project-onboarding → /qc-context-master → /qc-site-map → /qc-dashboard-sync
   (cấu hình dự án)        (tri thức dự án)     (sơ đồ màn hình    (bảng theo dõi
                                                 + dữ liệu)         trạng thái)

TẦNG 2 — TEST DESIGN (chạy lặp lại cho TỪNG UC)
/qc-uc-read <UC-ID> → /qc-func-scenario-design <UC-ID> → /qc-func-tc-design <UC-ID>
  (review yêu cầu,        (thiết kế test scenario)          (thiết kế test case
   chấm điểm sẵn sàng)                                       chi tiết, xuất Excel)

TẦNG 3 — AUTOMATION (tùy chọn — dự án test thủ công có thể bỏ qua hoàn toàn)
/qc-auto-generate <UC-ID> → /qc-auto-run <UC-ID>
  (sinh code test tự động)     (chạy test, báo kết quả)
```

| Tầng | Trả lời câu hỏi | Bắt buộc? |
|---|---|---|
| 1 — Context | "Dự án này là gì, có những màn hình và tính năng nào?" | Có — nền cho tầng 2 |
| 2 — Test design | "UC này test những gì, các bước ra sao?" | Có — sản phẩm chính của QC |
| 3 — Automation | "Cho máy chạy lại các test case này được không?" | Không — bật khi dự án cần |

**Cơ chế đầu vào / đầu ra — nắm 1 lần, dùng cả kit:**

- **Đầu vào:** kit KHÔNG bắt buộc bạn đặt tài liệu ở vị trí cố định nào. Bạn khai báo đường dẫn thực tế của từng loại tài liệu vào bảng đường dẫn (`.claude/config/path-registry.md`) theo tên gọi logic (logical name) — việc này làm một lần ở bước onboarding. Từ đó mọi skill tự tra bảng để tìm file.
- **Đầu ra:** vị trí và tên file output đã được kit quy định sẵn trong cùng bảng đường dẫn — bạn không cần (và không nên) tự đổi.

---

## 2. Tầng 1 — Context: dựng khung hiểu dự án

**Đầu vào chung của cả tầng — chỉ cần chuẩn bị 1 lần:** bộ tài liệu high-level của dự án do BA cung cấp (bản tóm tắt dự án, kiến trúc hệ thống, danh sách tính năng, quy tắc nghiệp vụ chung...). Tài liệu để ở đâu cũng được — bạn khai báo đường dẫn vào bảng đường dẫn tại bước 1 (dòng `High-level-files` và `requirement-common-files`).

Các bước nối đầu vào như dây chuyền: **bước 1 và 2 đọc tài liệu high-level → bước 3 đọc lại output của bước 2 → bước 4 đọc lại output của bước 3.** Bước 2 xong sẽ tự kéo bước 3, 4 chạy theo.

### Bước 1 — Khai báo dự án: `/qc-project-onboarding`

- **Chạy:** gõ `/qc-project-onboarding`. Skill phỏng vấn bạn 2 bước: thông tin dự án, rồi khai báo đường dẫn từng loại tài liệu vào bảng đường dẫn.
- **Nhận được:** file cấu hình dự án (`docs/qc-lead/project-config.md`) và bảng đường dẫn đã điền (`.claude/config/path-registry.md`).
- **Review:** kiểm tra URL môi trường test, tài khoản test trong file cấu hình dự án — tầng 3 sẽ dùng đến; xác nhận không còn ô đường dẫn nào để trống dạng `docs/???`.

### Bước 2 — Tổng hợp tri thức: `/qc-context-master`

- **Đầu vào:** tài liệu high-level đã khai báo ở bước 1 (nếu thư mục rỗng skill sẽ dừng và báo).
- **Chạy:** gõ `/qc-context-master` (bước 1 thường tự kích hoạt bước này).
- **Nhận được:** file tri thức dự án (`docs/qc-lead/project-context-master.md`) — bản tóm tắt mức dự án mà mọi skill tầng 2 đọc trước tiên.
- **Review:** đọc lướt toàn file, sửa tay chỗ tóm tắt sai; phần bạn đã sửa sẽ được giữ nguyên ở lần cập nhật sau.

### Bước 3 — Sơ đồ màn hình & dữ liệu: `/qc-site-map`

- **Đầu vào:** file tri thức dự án — output của bước 2 (bắt buộc); có thêm wireframe, ma trận phân quyền càng tốt.
- **Chạy:** lần đầu được bước 2 tự gọi; về sau gõ `/qc-site-map` khi cần cập nhật.
- **Nhận được:** sơ đồ màn hình (`docs/qc-lead/qc-site-map.md`) và sơ đồ dữ liệu (`docs/qc-lead/qc-data-map.md`).
- **Review:** đối chiếu danh sách màn hình với hệ thống thật — thiếu màn hình nào thì báo skill bổ sung; xem mục điều hướng và phân quyền có đúng thực tế không.

### Bước 4 — Bảng theo dõi: `/qc-dashboard-sync`

- **Đầu vào:** danh sách tính năng do bước 3 bàn giao — tự động, bạn không cần chuẩn bị gì.
- **Chạy:** lần đầu được bước 3 tự gọi; về sau gõ `/qc-dashboard-sync` (toàn bộ) hoặc `/qc-dashboard-sync <UC-ID>` (một UC).
- **Nhận được:** bảng trạng thái (`docs/qc-lead/qc-dashboard.md`) — mỗi tính năng một dòng, cho biết UC nào đã review, đã có scenario, đã có test case.
- **Review:** cột phạm vi (`In scope?`) — chỉ bạn được sửa tay giá trị này; skill KHÔNG tự quyết định.
- **Lưu ý:** chỉ skill này được ghi vào bảng trạng thái. Đừng chờ skill khác cập nhật giúp.

---

## 3. Tầng 2 — Test design: làm theo từng UC

Với mỗi UC, chạy lần lượt 3 bước. UC nào cũng đi qua đủ 3 bước trước khi chuyển UC khác (hoặc chạy song song nhiều UC nếu đã quen).

### Bước 1 — Review yêu cầu: `/qc-uc-read <UC-ID>`

- **Đầu vào:** tài liệu UC gốc và file quy tắc chung của BA — đường dẫn đã khai báo trong bảng đường dẫn từ lúc onboarding (dòng `requirement-files` và `requirement-common-files`); nếu dự án đổi cấu trúc thư mục, cập nhật lại bảng này trước.
- **Chạy:** gõ `/qc-uc-read UC-101` (thay mã UC của bạn).
- **Nhận được:**
  - Báo cáo độ sẵn sàng (file có đuôi `_audited_..._v1.md`): kết luận Ready / Conditionally Ready / Not Ready, điểm 0–100, danh sách lỗ hổng yêu cầu. Mục §4 của báo cáo là bảng kiểm kê phần tử giao diện — nguồn từ vựng cho cả 2 bước sau và tầng 3.
  - Sổ câu hỏi cho BA (file `_question-backlog.md`, do skill `qc-qna` tự tạo): các câu hỏi mở cần BA trả lời.
- **Review:** đọc phần kết luận + danh sách câu hỏi; gửi sổ câu hỏi cho BA. Nếu kết quả Not Ready — dừng, chờ BA bổ sung, đừng thiết kế test vội.

### Bước 2 — Thiết kế scenario: `/qc-func-scenario-design <UC-ID>`

- **Đầu vào:** báo cáo review ở bước 1 — output có sẵn, skill tự tìm phiên bản mới nhất.
- **Chạy:** gõ `/qc-func-scenario-design UC-101`.
- **Nhận được:** file scenario (đuôi `_scenarios_..._v1.md`) — mỗi scenario là một ý định test, đánh mã `TS_<UC-ID>_NNN`.
- **Review:** kiểm tra độ phủ — đủ luồng thành công, luồng ngoại lệ, tích hợp chưa; phần nào yêu cầu còn thiếu sẽ nằm ở mục ngoài phạm vi kèm gợi ý hỏi BA — không được bịa scenario cho phần đó.

### Bước 3 — Thiết kế test case: `/qc-func-tc-design <UC-ID>`

- **Đầu vào:** báo cáo review (bắt buộc) + file scenario (nên có) — đều là output có sẵn của 2 bước trước.
- **Chạy:** gõ `/qc-func-tc-design UC-101`. Skill chạy 2 pha: viết bản md → tự chuyển thành Excel.
- **Nhận được:** test case ở 2 định dạng cùng nội dung — bản md (cho máy đọc, tầng 3 dùng) và bản Excel (để bàn giao, review).
- **Review:** mở file Excel, soát theo: mỗi test case tự chạy độc lập được không, message lỗi có trích nguyên văn không, đã đủ giá trị biên và phân vùng tương đương chưa.

> **Khi BA trả lời câu hỏi:** đưa câu trả lời vào chat cho Agent (không cần tự viết vào sổ câu hỏi) rồi chạy lại `/qc-uc-read <UC-ID>` — skill tự nhận diện chế độ review lại (re-audit), cập nhật báo cáo và đồng bộ trạng thái câu hỏi. Sau đó chạy lại bước 2, 3 nếu nội dung thay đổi.

---

## 4. Tầng 3 — Automation: module độc lập, bật khi cần

Tầng này KHÔNG đọc tài liệu context — chỉ cần 3 thứ: báo cáo review UC, file test case định dạng md (bản chính thức, cùng nội dung với file Excel — dùng md vì máy đọc được), và file cấu hình dự án (URL môi trường test + tài khoản test). Tuyệt đối không chạy trên môi trường vận hành thật (production) — skill sẽ tự từ chối.

### Bước 1 — Sinh code test: `/qc-auto-generate <UC-ID>`

- **Đầu vào:** UC đã xong tầng 2; file cấu hình dự án đã điền URL môi trường test và tài khoản test theo vai trò; hệ thống đang chạy để skill dò tìm phần tử giao diện thật.
- **Chạy:** gõ `/qc-auto-generate UC-101`.
- **Nhận được:** project Playwright + TypeScript tại `docs/qc/automation/`.
- **Review:** file dữ liệu test (`data/<UC-ID>_testdata_..._v1.md`) — chỉnh giá trị theo môi trường của bạn; file này KHÔNG bao giờ chứa mật khẩu (mật khẩu chỉ nằm trong file cấu hình dự án, đọc lúc chạy test). File report (`triage/<UC-ID>_triage_..._v1.md`) - review các mâu thuẫn giữa doc/design và hệ thống đã quét, trả lời, xử lý mẫu thuẫn và run lại để quét đầy đủ các đối tượng từ hệ thống.

**Project được dựng chuyên nghiệp như thế nào?** Skill xây theo mô hình đối tượng trang (Page Object Model) với lớp dùng chung, sinh tăng dần:

1. **Khung project — dựng 1 lần duy nhất** ở lần chạy đầu: cấu hình Playwright, `package.json`, lớp helper nền (trang cơ sở, dữ liệu test, email động).
2. **Lớp dùng chung theo portal — tái sử dụng giữa các UC:** page object (gom locator + thao tác của một màn hình) và flow helper (chuỗi bước lặp lại như đăng nhập, tạo bản ghi). Chỉ sinh phần còn thiếu hoặc đã lỗi thời — UC chạy sau dùng lại của UC trước, nên càng về sau càng nhanh.
3. **Locator lấy từ hệ thống thật:** skill dò trực tiếp giao diện đang chạy (live crawl) thay vì đoán, và đóng dấu phiên bản báo cáo review + ngày dò lên từng page object để biết khi nào cần dò lại.
4. **Phần riêng mỗi UC rất mỏng:** chỉ gồm file spec ngắn theo màn hình (mỗi test gắn mã test case) + 1 file dữ liệu test cho bạn chỉnh.

### Bước 2 — Chạy test: `/qc-auto-run <UC-ID>`

- **Đầu vào:** project ở bước 1; máy có Node.js ≥ 18 (thiếu thư viện khác skill tự cài).
- **Chạy:** gõ `/qc-auto-run UC-101` — hoặc yêu cầu chạy một màn hình, một mã test case, một nhóm ưu tiên.
- **Nhận được:** báo cáo kết quả (`docs/qc/automation/reports/summary-latest.md`) — đậu/rớt theo từng mã test case; bảng trạng thái tầng 1 tự hiện thêm 2 cột automation.
- **Khi test rớt:** rớt do giao diện đổi → chạy lại `/qc-auto-generate <UC-ID>` để dò lại phần tử; rớt do dữ liệu → sửa file dữ liệu test rồi chạy lại.

---

## 5. Output nằm ở đâu — diễn giải thư mục `docs/qc-lead/` và `docs/qc/`

Toàn bộ output của kit đổ về 2 thư mục, chia theo tính chất:

- **`docs/qc-lead/`** — góc nhìn TOÀN DỰ ÁN của QC Lead: file cố định, sửa tại chỗ, không đánh version.
- **`docs/qc/`** — output THEO TỪNG UC: mỗi UC một thư mục con, file đánh version `v<N>`, không bao giờ ghi đè.

```
docs/qc-lead/                        ← góc nhìn toàn dự án (tầng 1)
├── project-config.md                  Cấu hình dự án: thông tin chung, URL môi trường,
│                                      tài khoản test — bước 1 tầng 1 tạo, tầng 3 đọc
├── project-context-master.md          Tri thức dự án — output bước 2 tầng 1
├── qc-site-map.md                     Sơ đồ màn hình — output bước 3 tầng 1
├── qc-data-map.md                     Sơ đồ dữ liệu — output bước 3 tầng 1
├── qc-dashboard.md                    Bảng theo dõi trạng thái từng UC — output bước 4 tầng 1
├── agent-work-log.md                  Nhật ký làm việc tổng hợp các máy — output /qc-get-work-log
└── agent-work-log.local/              Nhật ký thô từng máy (file JSONL) — mọi skill tự ghi

docs/qc/                             ← output theo từng UC (tầng 2 + 3)
├── uc-read/<UC-ID>/                   Bước 1 tầng 2:
│   ├── *_audited_*_v<N>.md              báo cáo độ sẵn sàng UC (đánh version)
│   └── *_question-backlog.md            sổ câu hỏi cho BA (1 file sống, KHÔNG version)
├── scenarios/<UC-ID>/                 Bước 2 tầng 2:
│   └── *_scenarios_*_v<N>.md            test scenario theo UC
├── testcases/<UC-ID>/                 Bước 3 tầng 2:
│   ├── *_testcases_draft.md             test case bản md (nguồn cho tầng 3)
│   ├── *_testcases_*_v<N>.xlsx          test case bản Excel (bàn giao, review)
│   └── *_testcases_summary_*_v<N>.md    tóm tắt đợt thiết kế
└── automation/                        Tầng 3 — project Playwright:
    ├── tests/<portal>/<UC-ID>/          file spec theo màn hình, mỗi test gắn mã test case
    ├── portals/<portal>/pages/, flows/  page object + flow helper dùng chung của portal
    ├── data/                            dữ liệu test: bản md (BẠN chỉnh) + bản json
    │                                    (máy tự build — không sửa tay)
    ├── triage/                          bảng report tự động hoá theo từng TC mỗi lần sinh script (verdict, lý do, điều kiện gỡ khoá) — có version
    ├── reports/                         kết quả chạy: summary-latest.md + history/
    └── helpers/, scripts/, *.config.ts  khung project — dựng 1 lần, không cần đụng tới
```

**Cần nhớ:** trong `docs/qc/`, thứ bạn mở thường xuyên nhất là file Excel test case (bàn giao) và sổ câu hỏi BA; trong `docs/qc-lead/`, là bảng theo dõi (`qc-dashboard.md`) — nhìn 1 phát biết dự án đang tới đâu.

---

## 6. Khi có thay đổi — cập nhật ở đâu, chạy lại gì

| Điều thay đổi | Việc cần làm |
|---|---|
| Tài liệu tổng quan của BA có bản mới | `/qc-context-master` → nếu có thay đổi, chạy tiếp `/qc-site-map` → `/qc-dashboard-sync` |
| Thêm màn hình / đổi luồng điều hướng | `/qc-site-map` |
| Tài liệu UC có bản mới, hoặc BA trả lời câu hỏi | `/qc-uc-read <UC-ID>` (tự vào chế độ review lại) → chạy lại scenario, test case nếu nội dung đổi |
| Cần sửa / bổ sung test case | `/qc-func-tc-design <UC-ID>` (tự vào chế độ cập nhật, có bước chờ bạn duyệt) |
| Giao diện hệ thống đổi làm test tự động rớt | `/qc-auto-generate <UC-ID>` rồi `/qc-auto-run <UC-ID>` |
| Đổi URL môi trường / tài khoản test | Sửa file cấu hình dự án `docs/qc-lead/project-config.md` (hoặc chạy `/qc-project-onboarding` chế độ cập nhật) |
| Dự án đổi cấu trúc thư mục tài liệu | Cập nhật đường dẫn trong `.claude/config/path-registry.md` (qua `/qc-project-onboarding` chế độ cập nhật) |
| Bảng theo dõi lệch với file trên đĩa | `/qc-dashboard-sync` (toàn bộ) hoặc `/qc-dashboard-sync <UC-ID>` (một UC) |
| Cần gom nhật ký làm việc các máy | `/qc-get-work-log` (thường chạy sau khi nhận code mới từ đồng đội qua git) |

---

## 7. Mười quy tắc sống còn cho quy trình mới với QC-kit

1. **Luôn đọc phiên bản mới nhất** — khi tự mở file, chọn file có số `v` cao nhất trong thư mục.
2. **Đường dẫn tra ở một chỗ** — `.claude/config/path-registry.md`: đầu vào do bạn khai báo, đầu ra kit đã quy định sẵn. Gặp ô `docs/???` nghĩa là chưa cấu hình, cần chạy lại onboarding.
3. **Không sửa tay bảng theo dõi** (`qc-dashboard.md`) ngoài cột phạm vi — mọi cột khác do skill đồng bộ, sửa tay sẽ bị ghi đè.
4. **Skill dừng giữa chừng thì cứ chạy lại lệnh cũ** — mọi skill dài đều có điểm lưu tiến độ (checkpoint), sẽ hỏi bạn muốn tiếp tục từ chỗ dừng hay làm mới.
5. **Muốn cập nhật output theo feedback — nói qua chat, đừng tự sửa file output.** Ví dụ: BA trả lời câu hỏi (không cần tự viết vào sổ câu hỏi), muốn sửa test case, sửa test script... Hãy đưa vào chat: nội dung cần cập nhật + phạm vi ảnh hưởng. Agent sẽ phân tích lại ảnh hưởng và (với test case) trình kế hoạch cập nhật để bạn duyệt trước khi sửa.
6. **Không biết cần cập nhật template hay nội dung gì ở đâu — cứ hỏi qua chat.** Agent sẽ review lại bộ kit và chỉ đúng chỗ cần sửa.
7. **Không sửa phần lõi của skill.** File `SKILL.md` và thư mục `workflows/` là phần chỉ dẫn cốt lõi — không nên tự sửa. Khi cần tùy biến cho dự án, sửa ở phần `references/`, `templates/` hoặc các file technical.
8. **Agent là AI và có thể sai sót** — mọi output quan trọng (sổ câu hỏi BA, test case, test script, kế hoạch test, test plan, test design, test scenario...) **đều cần bạn tự review (đọc/kiểm tra)** trước khi dùng. Đừng tin tuyệt đối.
9. **Luôn phải manual test lại hệ thống** - AI chỉ hỗ trợ giảm tải công việc, không thể chỉ 1 vài skills có thể đảm bảo chất lượng của 1 dự án, **bắt buộc phả manual test** lại.
10. **Làm mới bản thân** với quy trình công việc có sử dụng AI, đừng stress hãy smart, có nhiều nguồn để bạn có thể học hỏi và phát triển bản thân, và trị được AI.
