# FAQ & Troubleshooting

Trang này tổng hợp các vấn đề thường gặp khi dùng QC-kit. Mỗi câu hỏi có dạng: **Triệu chứng → Nguyên nhân → Cách xử lý**.

## 🔧 Setup & Cấu hình

### Q1. AI báo lỗi `path docs/???` không xác định

**Nguyên nhân:** `path-registry.md` chưa cấu hình hoặc còn placeholder `docs/???`.

**Cách xử lý:**
1. Chạy `/qc-project-onboarding` ở Update mode → skill sẽ phỏng vấn lại các path còn thiếu
2. Hoặc sửa tay `.claude/config/path-registry.md` (xem [Step 0](usage/step0-info.md))

---

### Q2. Onboarding bị stop ở Mục 1 hoặc Mục 2

**Nguyên nhân:** Mục 1 (Project Overview) và Mục 2 (Project Context) là **bắt buộc** — bạn trả lời "bỏ qua".

**Cách xử lý:** Cung cấp dữ liệu thật cho 2 mục này → các skill khác mới chạy được. Nếu chưa có thông tin, hỏi PM/QC Lead.

---

### Q3. AI không trigger đúng skill (gọi A nhưng chạy B)

**Nguyên nhân:** Trigger phrase không rõ ràng, AI đoán nhầm intent.

**Cách xử lý:** Dùng trigger phrase chuẩn:
- Review UC → `review uc UC-XXX`
- Test scenarios → `design test scenarios cho UC-XXX`
- Test cases → `generate test cases cho UC-XXX`
- Onboarding → `/qc-project-onboarding` (slash command)

Xem chi tiết tại [Phần IV — Cách sử dụng](usage/getting-started.md).

---

### Q4. Permission bị từ chối khi AI muốn đọc/ghi file

**Nguyên nhân:** `.claude/settings.local.json` chưa allow action đó.

**Cách xử lý:** Dùng slash command `/permissions` → cấp quyền cần thiết. Tránh sửa tay JSON.

---

### Q5. Tool báo "Invalid API key"

**Nguyên nhân:** API key sai, hết hạn, hoặc bị revoke.

**Cách xử lý:**
1. Verify key trong console (Anthropic / OpenAI)
2. Tạo key mới nếu cần
3. Update key trong tool (Antigravity Settings, Claude Code config, hoặc env variable)

---

### Q6. Tool báo "Network unreachable" hoặc timeout

**Nguyên nhân:** Firewall / VPN công ty chặn API endpoint.

**Cách xử lý:** Whitelist:
- `api.anthropic.com` (Claude Code, Antigravity)
- `api.openai.com` (Codex CLI)

Hỏi IT team support nếu không tự whitelist được.

---

## 📝 Output & Template

### Q7. Output không theo template chuẩn

**Nguyên nhân khả dĩ:**
- Template trong `.claude/skills/<skill>/templates/` đã bị sửa
- Skill đang ở version cũ
- AI hiểu nhầm cấu trúc

**Cách xử lý:**
- Verify template chưa bị sửa
- Nếu sửa Testcase template → **bắt buộc** chạy prompt sync:
  ```
  Tôi đã update test cases template, hãy check template hiện tại và đề xuất
  các nội dung cần sửa trong skill và script
  ```
- Restart AI tool nếu cần

---

### Q8. AI fabricate (bịa) nội dung không có trong requirement

**Nguyên nhân:** Prompt thiếu context "evidence-based"; AI cố "fill gap" cho đẹp output.

**Cách xử lý:**
- Nhắc rõ trong prompt: "chỉ dựa vào tài liệu, đừng đoán"
- Verify cite source — qc-uc-read **bắt buộc** cite section/page cho mọi finding
- Nếu vẫn fabricate → re-prompt + chỉ cụ thể nguồn nào không tìm thấy

⚠️ **Quy tắc**: thiếu thông tin thì ghi vào gap report, KHÔNG đoán.

---

### Q9. Output bằng tiếng Anh dù requirement bằng tiếng Việt

**Nguyên nhân:** Input có lẫn nhiều tiếng Anh; AI nhận diện ngôn ngữ chính sai.

**Cách xử lý:**
- Đảm bảo file requirement input thuần tiếng Việt
- Label UI giữ nguyên ngôn ngữ gốc (Anh/Hàn/Nhật) — đó là quy ước, không phải lỗi
- Nếu cần force VN: re-prompt "trả lời bằng tiếng Việt"

Xem [Tip cho input đa ngôn ngữ](best-practices/multilingual.md).

---

### Q10. Số test case quá ít / Output quá generic

**Nguyên nhân khả dĩ:**
- UC quá ngắn, thiếu business rule
- Scenarios chưa đủ chi tiết (skip Step 2.1)
- Project-config thiếu Domain rõ

**Cách xử lý:**
- Re-audit UC để xem AI báo gap nào
- Chạy `design test scenarios` trước khi generate test cases
- Cập nhật project-config với Domain cụ thể (Fintech / E-commerce / Healthcare...)

---

## 📂 File & Versioning

### Q11. File version cũ bị mất / bị overwrite

**Nguyên nhân:** Có người overwrite file thay vì tạo version mới (vi phạm naming convention).

**Cách xử lý:**
- Khôi phục từ Git history: `git log <file>` → `git checkout <commit> -- <file>`
- Nhắc team tuân thủ rule: **không bao giờ overwrite, luôn tăng v[N]**
- Xem [Kỷ luật versioning](best-practices/versioning-discipline.md)

---

### Q12. Xung đột khi nhiều người cùng chạy skill trên 1 UC

**Nguyên nhân:** 2 người chạy `review uc UC-XXX` cùng lúc → mỗi người sinh 1 version, conflict file.

**Cách xử lý:**
- **Quy ước team**: 1 UC chỉ có 1 người drive ở 1 thời điểm
- Nếu lỡ tạo nhiều version → giữ version cao nhất, archive (đổi tên / move sang `_archive/`) version cũ
- Coordinate qua Slack/Jira ticket trước khi chạy skill

---

### Q13. Folder UC có quá nhiều version, trông rối

**Nguyên nhân:** Bình thường — sau vài tháng update sẽ có nhiều version.

**Cách xử lý:**
- Move version cũ vào subfolder `_archive/` (đừng xoá)
- Sau khi move, verify path-registry vẫn trỏ đúng folder gốc

---

## ⚡ Performance

### Q14. Skill chạy quá lâu / treo

**Nguyên nhân:** File requirement quá lớn (PDF nặng, .docx nhiều image).

**Cách xử lý:**
- Tách file lớn thành nhiều file nhỏ
- Convert PDF/DOCX sang `.md` (skill `pdf` hoặc `docx` có thể support)
- Loại bỏ các phần không cần thiết khỏi tài liệu
- Verify AI tool có đủ token quota

---

### Q15. Tốn quá nhiều token / chi phí

**Nguyên nhân:**
- File requirement có nhiều noise (image lớn, PDF nặng)
- Prompt không tối ưu, gọi skill lặp lại
- Chạy skill cho cả batch UC mà không cache

**Cách xử lý:**
- Convert PDF/DOCX sang .md trước khi review
- Tận dụng prompt caching (Claude Code và Antigravity hỗ trợ)
- Setup billing alert trên Anthropic/OpenAI Console
- Re-audit incremental thay vì redo từ đầu

---

## 🔐 Bảo mật

### Q16. API key bị lộ (commit nhầm vào git)

**Nguyên nhân:** Paste API key vào file rồi commit.

**Cách xử lý KHẨN:**
1. **Revoke key ngay** trên Anthropic Console (https://console.anthropic.com) hoặc OpenAI Platform
2. Tạo key mới
3. Update key trong tool (KHÔNG commit vào git)
4. Nếu key đã push lên public repo → cần purge git history (`git filter-branch` hoặc BFG)

⚠️ Phòng tránh:
- KHÔNG bao giờ paste API key vào code, settings.json, hay docs
- Dùng env variable hoặc UI của tool để nhập key
- Verify `.gitignore` có `settings.local.json`

---

### Q17. Tài khoản test bị ghi vào project-config với password thật

**Nguyên nhân:** QC Lead nhập password thật khi onboarding.

**Cách xử lý:**
- Edit `project-config.md` → xoá password
- Bump version Header
- Commit
- Khôi phục git history nếu file đã push lên remote: `git filter-branch --tree-filter ...`

⚠️ **Quy tắc**: chỉ ghi tài khoản TEST với password fake / dev-only. KHÔNG bao giờ password production.

---

## 🤝 Collaboration

### Q18. BA không biết cách trả lời question backlog

**Cách xử lý:**
- Hướng dẫn BA: chỉ cần edit cột `Status` → `Answered` và viết answer trong cùng file
- Có thể thêm cột `Answer` nếu cần
- Gửi BA file mẫu hoặc 1-2 câu hỏi ví dụ đã được trả lời

Xem [Communication với BA](best-practices/ba-communication.md).

---

### Q19. Re-audit không tự nhận diện

**Nguyên nhân:** File `uc-review-report` cũ không nằm đúng folder theo path-registry, hoặc question backlog chưa `Answered`.

**Cách xử lý:**
- Verify file cũ nằm tại `docs/QC/uc-read/<UC-ID>/`
- Verify file question-backlog có cột `Status = Answered` cho mọi câu
- Nếu vẫn lỗi → xoá temp file (nếu có) và chạy lại

---

### Q20. BA chậm trả lời backlog

**Cách xử lý:**
- Phân loại priority rõ trong lời nhắn (highlight blocker)
- Setup weekly sync 15-min với BA để clear backlog đang stuck
- Escalate cho leader BA / PM nếu blocker > 2-3 ngày
- Trong lúc chờ: bắt đầu Step 2 cho phần đã rõ, mark scenario phụ thuộc câu hỏi mở là "PENDING"

⚠️ **KHÔNG** đoán giùm BA — vi phạm rule QC-kit.

---

## ❓ Khác

### Q21. Tôi muốn skip qc-uc-read và đi thẳng đến scenarios

**Trả lời:** Không khuyến nghị. qc-uc-read đảm bảo requirement đủ chất lượng — bỏ qua sẽ dẫn đến scenarios/test cases sai hoặc thiếu. Nếu requirement đã được team khác review thì có thể skip, nhưng vẫn nên chạy qc-uc-read để có baseline gap report.

---

### Q22. Tôi muốn dùng QC-kit cho non-functional test (performance/security)

**Trả lời:** Phiên bản hiện tại chỉ support **functional / integration / UI / E2E / acceptance**. Performance, security, load test cần skill riêng (chưa có trong v1, có thể bổ sung trong roadmap). Nếu skill phát hiện scenario thuộc NFR, sẽ ghi vào section "Out-of-Scope Flags" thay vì sinh test.

---

### Q23. QC-kit có support automated execution test không?

**Trả lời:** Hiện tại chưa. Phiên bản v1 chỉ support **design** (review + scenarios + test cases). Execute là manual step do QA/QC làm tay, dùng file Excel sinh ra. Tự động execute là roadmap tương lai.

---

### Q24. Có thể chạy QC-kit cho mobile app không?

**Trả lời:** Skill hiện tại được thiết kế cho **web application và API** (theo SKILL.md các skill). Mobile app có thể dùng được nhưng output có thể không cover các đặc thù mobile (gesture, sensor, push notification). Nếu cần chuyên cho mobile, đề xuất tạo skill riêng.

---

### Q25. Tôi muốn customize template Testcase để team dùng quy ước riêng

**Trả lời:** Được, nhưng phải đồng bộ với skill. Xem [Step 2 — Khi nào sửa Testcase template](usage/step2-create-test-cases.md). Sau khi sửa template, **bắt buộc** chạy prompt:

```
Tôi đã update test cases template, hãy check template hiện tại và đề xuất
các nội dung cần sửa trong skill và script
```

Nếu không sync, output Excel sẽ sai format hoặc thiếu cột.

---

### Q26. Có thể thêm skill mới vào QC-kit không?

**Trả lời:** Được, nhưng là task advanced. Cần:

1. Tạo thư mục `.claude/skills/<skill-name>/`
2. Viết SKILL.md theo format chuẩn (xem skill có sẵn làm reference)
3. Định nghĩa trigger phrase trong `description` field
4. Đặt template/workflow/reference vào subfolder tương ứng
5. Cập nhật `path-registry.md` nếu skill có artifact mới
6. Test trên dự án mẫu trước khi rollout team

Liên hệ team maintain QC-kit nếu cần guidance.

---

## 📞 Cần thêm hỗ trợ?

Nếu bạn gặp vấn đề ngoài danh sách trên:

1. Xem chi tiết SKILL.md tương ứng (link trong [Phần III — Skills](structure/skills.md))
2. Đọc [Phần V — Best practices](best-practices/prepare-requirements.md)
3. Hỏi QC Lead của dự án
4. Đề xuất cải tiến QC-kit qua kênh team đã thống nhất
