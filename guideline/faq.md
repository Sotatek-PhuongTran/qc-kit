# FAQ & Troubleshooting

Trang này tổng hợp các vấn đề thường gặp khi dùng QC-kit. Mỗi câu hỏi có dạng: **Triệu chứng → Nguyên nhân → Cách xử lý**.

## 🔧 Cấu hình & Setup

### Q1. AI báo lỗi `path docs/???` không xác định

**Nguyên nhân:** `path-registry.md` chưa cấu hình hoặc còn placeholder `docs/???`.

**Cách xử lý:**
1. Chạy `/qc-project-onboarding` ở Update mode → skill sẽ phỏng vấn lại các path còn thiếu
2. Hoặc sửa tay `.claude/config/path-registry.md` (xem [Khi nào sửa config](apply/when-edit-config.md))

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

Xem chi tiết tại [Phần VI — Hướng dẫn từng skill](skills/qc-project-onboarding.md).

---

### Q4. Permission bị từ chối khi AI muốn đọc/ghi file

**Nguyên nhân:** `.claude/settings.local.json` chưa allow action đó.

**Cách xử lý:** Dùng slash command `/permissions` → cấp quyền cần thiết. Xem [Permissions](apply/permissions.md). Tránh sửa tay JSON.

---

## 📝 Output & Template

### Q5. Output không theo template chuẩn

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
- Restart Claude extension nếu cần

---

### Q6. AI fabricate (bịa) nội dung không có trong requirement

**Nguyên nhân:** Prompt thiếu context "evidence-based"; AI cố "fill gap" cho đẹp output.

**Cách xử lý:**
- Nhắc rõ trong prompt: "chỉ dựa vào tài liệu, đừng đoán"
- Verify cite source — qc-uc-read **bắt buộc** cite section/page cho mọi finding
- Nếu vẫn fabricate → re-prompt + chỉ cụ thể nguồn nào không tìm thấy

⚠️ **Quy tắc**: thiếu thông tin thì ghi vào gap report, KHÔNG đoán.

---

### Q7. Output bằng tiếng Anh dù requirement bằng tiếng Việt

**Nguyên nhân:** Input có lẫn nhiều tiếng Anh; AI nhận diện ngôn ngữ chính sai.

**Cách xử lý:**
- Đảm bảo file requirement input thuần tiếng Việt
- Label UI giữ nguyên ngôn ngữ gốc (Anh/Hàn/Nhật) — đó là quy ước, không phải lỗi
- Nếu cần force VN: re-prompt "trả lời bằng tiếng Việt"

Xem [Global rules](structure/rules.md) để hiểu logic chọn ngôn ngữ.

---

## 📂 File & Versioning

### Q8. File version cũ bị mất / bị overwrite

**Nguyên nhân:** Có người overwrite file thay vì tạo version mới (vi phạm naming convention).

**Cách xử lý:**
- Khôi phục từ Git history: `git log <file>` → `git checkout <commit> -- <file>`
- Nhắc team tuân thủ rule: **không bao giờ overwrite, luôn tăng v[N]**
- Xem [Naming convention](structure/naming.md)

---

### Q9. Xung đột khi nhiều người cùng chạy skill trên 1 UC

**Nguyên nhân:** 2 người chạy `review uc UC-XXX` cùng lúc → mỗi người sinh 1 version, conflict file.

**Cách xử lý:**
- **Quy ước team**: 1 UC chỉ có 1 người drive ở 1 thời điểm
- Nếu lỡ tạo nhiều version → giữ version cao nhất, archive (đổi tên) version cũ
- Coordinate qua Slack/Jira ticket trước khi chạy skill

---

## ⚡ Performance

### Q10. Skill chạy quá lâu / treo

**Nguyên nhân:** File requirement quá lớn (PDF nặng, .docx nhiều image).

**Cách xử lý:**
- Tách file lớn thành nhiều file nhỏ
- Convert PDF/DOCX sang `.md` (skill `pdf` hoặc `docx` có thể support)
- Loại bỏ các phần không cần thiết khỏi tài liệu
- Verify Antigravity / Claude extension có đủ token quota

---

## 🔐 Bảo mật

### Q11. API key Antigravity bị lộ (commit nhầm vào git)

**Nguyên nhân:** Paste API key vào file rồi commit.

**Cách xử lý KHẨN:**
1. **Revoke key ngay** trên Anthropic Console (https://console.anthropic.com)
2. Tạo key mới
3. Update key trong Antigravity extension (KHÔNG commit vào git)
4. Nếu key đã push lên public repo → cần purge git history

⚠️ Phòng tránh:
- KHÔNG bao giờ paste API key vào code, settings.json, hay docs
- Dùng env variable hoặc UI của extension để nhập key
- Verify `.gitignore` có `settings.local.json` nếu bạn lỡ paste vào đó

---

## 🤝 Collaboration

### Q12. BA không biết cách trả lời question backlog

**Cách xử lý:**
- Hướng dẫn BA: chỉ cần edit cột `Status` → `Answered` và viết answer trong cùng file
- Có thể thêm cột `Answer` nếu cần
- Gửi BA file mẫu hoặc 1-2 câu hỏi ví dụ đã được trả lời

Xem [Communication với BA](best-practices/ba-communication.md).

---

### Q13. Re-audit không tự nhận diện

**Nguyên nhân:** File `uc-review-report` cũ không nằm đúng folder theo path-registry.

**Cách xử lý:**
- Verify file cũ nằm tại `docs/QC/uc-read/<UC-ID>/`
- Verify file question-backlog có cột `Status = Answered` cho mọi câu
- Nếu vẫn lỗi → xoá temp file (nếu có) và chạy lại

---

## ❓ Khác

### Q14. Tôi muốn skip qc-uc-read và đi thẳng đến scenarios

**Trả lời:** Không khuyến nghị. qc-uc-read đảm bảo requirement đủ chất lượng — bỏ qua sẽ dẫn đến scenarios/test cases sai hoặc thiếu. Nếu requirement đã được team khác review thì có thể skip, nhưng vẫn nên chạy qc-uc-read để có baseline gap report.

---

### Q15. Tôi muốn dùng QC-kit cho non-functional test (performance/security)

**Trả lời:** Phiên bản hiện tại chỉ support **functional / integration / UI / E2E / acceptance**. Performance, security, load test cần skill riêng (chưa có trong v1, có thể bổ sung trong roadmap).

---

## 📞 Cần thêm hỗ trợ?

Nếu bạn gặp vấn đề ngoài danh sách trên:

1. Xem chi tiết SKILL.md tương ứng (link trong [Phần VI](skills/qc-project-onboarding.md))
2. Hỏi QC Lead của dự án
3. Đề xuất cải tiến QC-kit qua kênh được team thống nhất
