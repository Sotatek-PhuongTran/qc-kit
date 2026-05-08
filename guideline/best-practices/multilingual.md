# Tip cho input đa ngôn ngữ

QC-kit hỗ trợ multi-language. Nếu dự án có requirement tiếng Việt → output tiếng Việt. Nếu có requirement tiếng Anh / Hàn / Nhật / TQ → output tương ứng. Nhưng cách dùng đúng cần một số quy ước.

## Quy tắc gốc

Trong `global-rules.md`:

> Output language follows source-input language:
> - IF Input Language is Vietnamese THEN Output Language is Vietnamese.
> - IF Input Language is Any other language THEN Output Language is English.

Cụ thể:

| Input | Output |
|---|---|
| Tiếng Việt thuần | Tiếng Việt |
| Tiếng Anh thuần | Tiếng Anh |
| Tiếng Hàn / Nhật / TQ | Tiếng Anh |
| Trộn — vd VN + nhiều EN | Tiếng Việt (vẫn ưu tiên ngôn ngữ chính) hoặc EN tùy AI nhận diện |

---

## Vấn đề thường gặp với requirement đa ngôn ngữ

### Tình huống 1 — UI label tiếng nước ngoài

Dự án outsource cho khách Hàn / Nhật / TQ. Requirement có thể có:

```markdown
## Login Screen

| Field | Label | Placeholder |
|---|---|---|
| Username | 사용자 이름 | 이메일 입력 |
| Password | 비밀번호 | 비밀번호 입력 |
```

✅ **Cách xử lý**: Giữ nguyên label gốc + chú thích tiếng Anh trong ngoặc

```markdown
| Field | Label | Placeholder |
|---|---|---|
| Username | 사용자 이름 (Username) | 이메일 입력 (Enter email) |
| Password | 비밀번호 (Password) | 비밀번호 입력 (Enter password) |
```

→ Tester biết label hiển thị thật trên UI để verify, đồng thời hiểu nghĩa.

⚠️ **KHÔNG dịch label** sang tiếng Việt — sẽ mismatch với UI thật.

### Tình huống 2 — Requirement gốc tiếng Anh, team Việt review

Nếu requirement viết tiếng Anh (vd outsource từ team Mỹ), QC team Việt vẫn dùng tool tiếng Việt được:

- Prompt bằng tiếng Việt
- AI sẽ output tiếng **Anh** (vì input là EN — theo rule)
- Output EN giúp đồng bộ với requirement gốc, dễ communicate với team gốc

### Tình huống 3 — Requirement trộn VN-EN

Phổ biến với dự án outsource: spec viết VN nhưng dùng nhiều thuật ngữ EN.

```markdown
# UC-101 — User Login

User nhập username và password vào login form. System gọi API authenticate
và trả về JWT token nếu credentials hợp lệ.
```

→ AI sẽ nhận diện đây là **VN dominant** → output VN.

⚠️ Nếu output bằng EN dù bạn muốn VN, có thể requirement có quá nhiều EN. Khắc phục:

- Reprompt rõ: "trả lời bằng tiếng Việt"
- Hoặc "translate" thuật ngữ EN sang VN trong requirement (nếu khả thi)

### Tình huống 4 — Output có tiếng Việt sai chính tả / không tự nhiên

Đôi khi AI dịch máy móc — câu văn không tự nhiên:

```
❌ "Hệ thống sẽ thực thi xác minh credentials của user"
✅ "Hệ thống xác minh thông tin đăng nhập của user"
```

Nguyên nhân: input có nhiều thuật ngữ EN → AI dịch literal. Khắc phục:

- Prompt rõ: "trả lời bằng tiếng Việt tự nhiên, không dịch máy"
- QC sửa tay những phần văn không trôi chảy

---

## Quy ước thuật ngữ kỹ thuật

Một số thuật ngữ test design **không nên dịch** sang VN — giữ EN:

| Thuật ngữ EN | Lý do giữ EN |
|---|---|
| Equivalence Partitioning | Thuật ngữ chuẩn ISTQB, không có VN equivalent chính xác |
| Boundary Value Analysis | Tương tự |
| Decision Table Testing | Tương tự |
| State Transition Testing | Tương tự |
| Error Guessing | Tương tự |
| Happy Path | Phổ biến trong domain QC |
| Edge Case | Phổ biến |
| Smoke Test / Regression Test | Phổ biến |
| Fuzz Testing | Phổ biến |

→ Document QC-kit này cũng giữ EN cho các thuật ngữ trên.

Một số khác có thể dùng VN:

| EN | VN tự nhiên |
|---|---|
| User | Người dùng / user (đều OK) |
| Test case | Test case (giữ EN phổ biến hơn) |
| Acceptance criteria | Tiêu chí nghiệm thu / acceptance criteria |
| Requirement | Yêu cầu / requirement |
| Bug / Defect | Lỗi / bug |

---

## Quy ước tên folder và file

Folder UC và file output **luôn dùng English / kebab-case**:

✅ Đúng:
- `docs/BA/UC-101-user-login/`
- `UC-101_user-login_audited_20260508_v1.md`

❌ Sai:
- `docs/BA/UC-101-đăng-nhập/` (có dấu)
- `UC-101_dang-nhap_audited.md` (kebab nhưng mơ hồ)
- `UC-101_user_login.md` (snake_case không đúng convention)

Lý do:
- Compatibility với mọi OS (Windows path encoding khác Linux/Mac với dấu)
- Dễ trace giữa các tool khác nhau
- Skill regex match dễ với English

⚠️ Tránh dấu tiếng Việt trong tên file/folder — gây lỗi build, lỗi sync GitBook.

---

## Tip: prompt ngôn ngữ rõ ràng

Để tránh nhầm lẫn ngôn ngữ output:

### Prompt VN cho output VN

```
review uc UC-101 và đưa verdict
```

→ Output VN.

### Prompt EN cho output EN

```
review uc UC-201 (English requirement) and provide verdict
```

→ Output EN.

### Force ngôn ngữ output

Nếu AI tự ý đổi ngôn ngữ khác mong đợi:

```
review uc UC-101
LƯU Ý: trả lời bằng tiếng Việt vì requirement chính bằng tiếng Việt
```

---

## Tip: dự án multi-team với nhiều ngôn ngữ

Nếu dự án có:

- BA Việt + QC Việt + Customer Mỹ
- Requirement gốc EN, common rules VN

→ Khuyến nghị:

1. **Standardize ngôn ngữ chính** — chọn 1 ngôn ngữ làm chuẩn cho cả dự án (vd EN)
2. **Translate common rules** sang ngôn ngữ chính
3. **QC team output cùng ngôn ngữ chính** để đồng bộ
4. Tài liệu nội bộ team Việt có thể VN, nhưng deliverable cuối cùng theo ngôn ngữ chính

→ Tránh chaos do nhiều ngôn ngữ trộn trong cùng dự án.

---

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Output toàn EN dù input VN | Input có thể nhiều EN — reprompt yêu cầu VN |
| Output dịch máy móc, văn không trôi chảy | Reprompt "viết tiếng Việt tự nhiên, không dịch literal" |
| Label tiếng Hàn bị dịch sang VN | Reprompt: "giữ nguyên label gốc + chú thích Anh trong ngoặc" |
| Tên folder UC có dấu → lỗi sync | Đổi sang ASCII / kebab-case |
| Thuật ngữ kỹ thuật bị dịch sang VN ("Phân tích Giá trị Biên") | Reprompt: "giữ nguyên thuật ngữ test design bằng tiếng Anh" |

---

## Lời cuối

Multi-language là feature mạnh của QC-kit nhưng cần kỷ luật. Quy tắc đơn giản:

- **Input quyết định output language** — đừng force
- **Label gốc giữ nguyên** + chú thích Anh — đừng dịch UI label
- **Tên file dùng kebab-case English** — không dùng dấu
- **Thuật ngữ test design giữ EN** — không dịch

→ Output sẽ tự nhiên + dùng được trong mọi context.

---

✅ **Phần V hoàn tất.**

**Tiếp theo:** [Phần VI — FAQ & Troubleshooting](../faq.md)
