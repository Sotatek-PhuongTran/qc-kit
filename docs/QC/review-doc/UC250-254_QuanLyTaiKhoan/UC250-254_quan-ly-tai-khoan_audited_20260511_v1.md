# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tieu de:** UC250-254 — Quan ly tai khoan doanh nghiep, Doi mat khau, Dang ky, Quen mat khau & Cau hinh tai khoan tren Mobile
**Ngay tao:** 2026-05-11
**Tac gia:** Claude Agent (Senior QC Analyst)
**Phien ban:** v1

---

## Feature Brief

Nhom chuc nang UC250-254 bao gom 5 use case lien quan den quan ly tai khoan nguoi dung tren ung dung di dong (Mobile App):

- **UC250** — Cap nhat tai khoan doanh nghiep: Cho phep nguoi dung xem va chinh sua thong tin tai khoan doanh nghiep (to chuc). Tab "Thong tin dinh danh" chi xem (read-only), Tab "Thong tin khac" co the chinh sua khi nhan icon But chi.
- **UC251** — Doi mat khau: Cho phep nguoi dung da dang nhap thay doi mat khau hien tai sang mat khau moi.
- **UC252** — Dang ky tai khoan: Cho phep nguoi dung moi dang ky tai khoan (Ca nhan hoac To chuc) qua 2 buoc: Nhap thong tin + Xac thuc OTP.
- **UC253** — Quen mat khau: Cho phep nguoi dung dat lai mat khau qua xac thuc OTP gui den SDT da dang ky.
- **UC254** — Cau hinh tai khoan: Cho phep nguoi dung da dang nhap thay doi cai dat ngon ngu, thong bao, dang nhap sinh trac hoc, quan ly thiet bi.

**Phan quyen:**
- UC252/UC253: Khong yeu cau dang nhap
- UC250/UC251/UC254: Yeu cau dang nhap

**Cac quy tac chung ap dung:** CMR-03 (Dropdown), CMR-06 (Header & Dieu huong), CMR-07 (Xu ly loi chung), CMR-09 (Form nhap lieu), CMR-10 (Thong bao xac nhan), CMR-11 (Dinh dang so), CMR-12 (Dinh dang thoi gian), CMR-16 (API Performance), CMR-17 (Da ngon ngu), CMR-18 (Debounce Navigation).

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `58.2 / 100` | ❌ **NOT READY** |

**Raw Score: 64 / 110 → Final Score = round((64 / 110) x 100, 1) = 58.2 / 100**

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
| -- | ---------------------------------------- | ------- | ----- | -------- |
| 1 | Feature Identity (title, ID, context) | 5 | 4/5 | ⚡ Partial |
| 2 | Objective & Scope | 5 | 3/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 6/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 4/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 9/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 10/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 12/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 4/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 5/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ Partial |
| **Total** | | **110** | **64/110** | **58.2/100** |

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC250-254 | Quan ly tai khoan doanh nghiep, Doi MK, Dang ky, Quen MK, Cau hinh | v2 | Draft |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------| 
| huy.lai2 | N/A | 2026-04-29 | 2026-05-08 |

**Score: 4/5 — ⚡ Partial**

**Nhan xet:**
- ✅ UC-ID, ten chuc nang, phien ban, tac gia, ngay tao/cap nhat deu co.
- ⚠️ Khong co thong tin "Approved By" — tai lieu chua duoc phe duyet.
- ⚠️ Trang thai tai lieu la "Draft" (suy luan) — khong ghi ro trang thai chinh thuc.

---

## 1. Objective & Scope

### 1.1 Objective
Nhom chuc nang bo sung cho quan ly tai khoan nguoi dung: UC250 (cap nhat tai khoan doanh nghiep), UC251 (doi mat khau), UC252 (dang ky tai khoan moi), UC253 (quen mat khau), UC254 (cau hinh tai khoan nguoi dung).

### 1.2 In Scope
- Dang ky tai khoan (Ca nhan / To chuc)
- Xac thuc OTP
- Quen mat khau va dat lai mat khau
- Doi mat khau
- Xem va chinh sua thong tin tai khoan doanh nghiep
- Cau hinh tai khoan (ngon ngu, thong bao, sinh trac hoc, quan ly thiet bi)

### 1.3 Out of Scope
- ⚠️ **Khong duoc mo ta ro rang** — tai lieu khong xac dinh ro ranh gioi "Out of Scope".

**Score: 3/5 — ⚡ Partial**

**Nhan xet:**
- ✅ Muc tieu va pham vi co ban duoc mo ta.
- ⚠️ Thieu ranh gioi "Out of Scope" ro rang. Vi du: Viec dang nhap (UC256) co lien quan nhung khong duoc de cap den muc do nao.
- ⚠️ Moi lien he giua 5 UC chua duoc mo ta chi tiet (luong chuyen doi giua cac UC nhu the nao).

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Ca nhan (Nguoi dung ca nhan) | Primary | Dang ky tai khoan ca nhan, doi MK, quen MK, cau hinh tai khoan |
| To chuc (Nguoi dai dien doanh nghiep) | Primary | Dang ky tai khoan to chuc, quan ly thong tin doanh nghiep, doi MK, quen MK, cau hinh |
| He thong (System) | System | Gui OTP, xac thuc, tao tai khoan, cap nhat thong tin |

**Score: 6/10 — ⚡ Partial**

**Nhan xet:**
- ✅ Tai lieu xac dinh 2 loai tai khoan: "Ca nhan" va "To chuc".
- ⚠️ Thieu mo ta chi tiet ve quyen han cua tung vai tro (vi du: vai tro "nguoi dai dien" co quyen gi cu the trong to chuc?).
- ⚠️ Thieu mo ta ve cac vai tro lien quan khac (Admin he thong, Bo phan ho tro — duoc de cap trong Tab 1 "Lien he ho tro" nhung khong duoc dinh nghia).
- ⚠️ Khong phan biet ro hanh vi khac nhau giua "Nha dau tu trong nuoc" vs "Nha dau tu nuoc ngoai" vs "To chuc" (duoc de cap trong CMR nhung khong duoc cu the hoa trong UC nay).

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- UC252/UC253: Nguoi dung chua dang nhap (man hinh dang ky / quen mat khau)
- UC250/UC251/UC254: Nguoi dung da dang nhap thanh cong

### 3.2 Postconditions

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Dang ky thanh cong (UC252) | Tai khoan duoc tao, tu dong dang nhap, chuyen ve Trang chu |
| Quen mat khau thanh cong (UC253) | Mat khau duoc cap nhat, chuyen ve man hinh Dang nhap |
| Doi mat khau thanh cong (UC251) | Mat khau moi duoc cap nhat — *(Khong ro postcondition: co dang xuat khong? Co toast thong bao khong?)* |
| Cap nhat thong tin DN (UC250) | Thong tin duoc luu, hien thi Toast thanh cong |
| Luu cau hinh (UC254) | Cac thay doi duoc luu — *(Khong ro chi tiet postcondition)* |

**Score: 4/10 — ⚡ Partial**

**Nhan xet:**
- ⚠️ Preconditions rat so sai — chi ghi "Yeu cau dang nhap" hoac "Khong yeu cau dang nhap", thieu cac dieu kien cu the (vi du: nguoi dung da co tai khoan hay chua, trang thai tai khoan, ket noi mang...).
- ⚠️ Postconditions khong day du cho UC251 (Doi MK) — khong ro sau khi doi MK thanh cong thi ung dung lam gi (quay lai man hinh nao? Hien thong bao gi?).
- ⚠️ Postconditions cho UC254 (Cau hinh) rat mo ho — "Luu cac thay doi" nhung khong mo ta cu the trang thai he thong sau khi luu.

---

## 4. UI Object Inventory & Mapping

### UC252 — Dang ky tai khoan

| Category | Component Name | Description & Constraints | In UC? | In Wireframe? | Notes |
|----------|----------------|---------------------------|--------|---------------|-------|
| Control System | Loai tai khoan (Radio/Select) | Chon "Ca nhan" hoac "To chuc", mac dinh "Ca nhan" | ✅ | ✅ | |
| Data Input | Ho va ten / Ten to chuc | Textbox, bat buoc, label thay doi theo loai tai khoan | ✅ | ✅ | ⚠️ Thieu quy tac do dai toi da, ky tu hop le |
| Data Input | Ma dinh danh | Textbox, bat buoc, CMND/CCCD hoac ma dinh danh to chuc | ✅ | ✅ | ⚠️ Thieu format cu the (so ky tu, ky tu hop le) |
| Data Input | Ngay cap | Datepicker, bat buoc, dd/mm/yyyy | ✅ | ✅ | ⚠️ Thieu validation (ngay tuong lai? gioi han?) |
| Data Input | Noi cap | Textbox, bat buoc | ✅ | ✅ | ⚠️ Thieu rang buoc |
| Data Input | Ma so thue | Textbox, bat buoc | ✅ | ✅ | ⚠️ Thieu format (so ky tu, ky tu hop le) |
| Data Input | So dien thoai | Textbox (tel), bat buoc, ma vung +84 | ✅ | ✅ | ⚠️ Thieu validation format SDT cu the |
| Data Input | Email | Textbox, bat buoc, dinh dang email hop le | ✅ | ✅ | ⚠️ Thieu mo ta loi cu the khi sai format |
| Data Input | Mat khau | Password, bat buoc, toi thieu 8 ky tu, chu hoa/thuong/so, icon mat | ✅ | ✅ | |
| Data Input | Nhap lai mat khau | Password, bat buoc, phai trung khop | ✅ | ✅ | ⚠️ Thieu error message cu the khi khong khop |
| Control System | Dong y dieu khoan | Checkbox, bat buoc, unchecked mac dinh | ✅ | ✅ | |
| Navigation & Actions | Nut "Tiep tuc" | Button Primary, validate → gui OTP → Buoc 2 | ✅ | ✅ | |

### UC253 — Quen mat khau

| Category | Component Name | Description & Constraints | In UC? | In Wireframe? | Notes |
|----------|----------------|---------------------------|--------|---------------|-------|
| Data Input | SDT / Email | Textbox, bat buoc, nhap SDT hoac Email da dang ky | ✅ | ✅ | ⚠️ Co chap nhan ca 2 format khong? Validation nhu the nao? |
| Navigation & Actions | Nut "Gui yeu cau" | Button Primary | ✅ | ✅ | |
| Data Input | OTP Input | 6 o input so | ✅ | ✅ | |
| Data Input | Mat khau moi | Password, toi thieu 8 ky tu | ✅ | ✅ | |
| Data Input | Xac nhan mat khau moi | Password, phai khop | ✅ | ✅ | |
| Navigation & Actions | Nut "Dat lai mat khau" | Button Primary | ✅ | ✅ | |

### UC251 — Doi mat khau

| Category | Component Name | Description & Constraints | In UC? | In Wireframe? | Notes |
|----------|----------------|---------------------------|--------|---------------|-------|
| Data Input | Mat khau hien tai | Password, bat buoc, icon mat | ✅ | ✅ | |
| Data Input | Mat khau moi | Password, bat buoc, phai khac MK hien tai | ✅ | ✅ | ⚠️ Thieu error message cu the |
| Data Input | Xac nhan MK moi | Password, bat buoc, phai trung khop | ✅ | ✅ | |
| Navigation & Actions | Nut "Cap nhat mat khau" | Button Primary, Disabled neu chua hop le | ✅ | ✅ | |

### UC250 — Quan ly tai khoan DN

| Category | Component Name | Description & Constraints | In UC? | In Wireframe? | Notes |
|----------|----------------|---------------------------|--------|---------------|-------|
| Navigation | Tab "Thong tin dinh danh" | Tab 1, chi xem (read-only) | ✅ | ✅ | |
| Navigation | Tab "Thong tin khac" | Tab 2, xem va sua | ✅ | ✅ | |
| Data Display | Thong bao "Khong the chinh sua" | Hien thi trong Tab 1 | ✅ | ✅ | |
| Navigation & Actions | Icon But chi (Edit) | Tren Header, bat/tat che do chinh sua | ✅ | ✅ | ⚠️ Vi tri cu the chua ro |
| Navigation & Actions | Nut "Luu thay doi" | Button Primary khi chinh sua | ✅ | ✅ | |
| Navigation & Actions | Nut "Huy" | Hien popup xac nhan theo CMR-10 | ✅ | ✅ | |
| Control System | Dropdown dia chi (Tinh/Huyen/Xa) | Load dynamic theo cap cha | ✅ | ✅ | ⚠️ Thieu mo ta chi tiet hanh vi lazy load |

### UC254 — Cau hinh tai khoan

| Category | Component Name | Description & Constraints | In UC? | In Wireframe? | Notes |
|----------|----------------|---------------------------|--------|---------------|-------|
| Control System | Ngon ngu hien thi | Combobox, 5 ngon ngu, mac dinh Tieng Viet, ap dung ngay | ✅ | ✅ | ⚠️ Ap dung ngay = khong can nhan Luu? Hay phai nhan Luu? Mau thuan voi nut "Luu cai dat" |
| Control System | Cai dat thong bao | Toggle, mac dinh Bat | ✅ | ✅ | ⚠️ Thieu chi tiet: loai thong bao nao? |
| Control System | Cai dat dang nhap | Toggle, mac dinh Tat, FaceID/Biometric | ✅ | ✅ | ⚠️ Thieu luong kich hoat sinh trac hoc |
| Navigation & Actions | Quan ly thiet bi | Button/List | ✅ | ✅ | ⚠️ Thieu mo ta chi tiet man hinh quan ly thiet bi |
| Navigation & Actions | Nut "Luu cai dat" | Button Primary | ✅ | ✅ | ⚠️ Mau thuan voi "ap dung ngay lap tuc" cua ngon ngu |

**Score: 9/15 — ⚡ Partial**

**Nhan xet:**
- ✅ Cac thanh phan UI co ban duoc liet ke cho tat ca 5 UC.
- ✅ Wireframe duoc cung cap cho hau het cac man hinh.
- ⚠️ Nhieu truong thieu quy tac validation cu the (do dai toi da, ky tu hop le, format).
- ⚠️ Thieu error message cu the cho nhieu truong hop.
- ⚠️ Mau thuan giua "ap dung ngay lap tuc" va "Nut Luu cai dat" trong UC254.

---

## 5. Object Attributes & Behavior Definition

*(Ghi nhan cac van de chinh)*

### Edge Case Checklist

**Group A — Extreme Data States:**
- ⚠️ Thieu quy tac truncate/wrap cho cac truong text (Ho ten, Ten to chuc, Dia chi...).
- ⚠️ Thieu xu ly gia tri null/undefined tu API cho cac truong hien thi.
- ⚠️ Thieu quy tac empty state cho danh sach thiet bi (UC254).

**Group B — Network & API States:**
- ⚠️ Thieu mo ta hanh vi khi API phan hoi cham (skeleton/loading) cho tung man hinh cu the.
- ⚠️ Thieu mo ta xu ly khi nhieu API call dong thoi that bai (vi du: load Tinh + load danh sach thiet bi).
- ✅ Loading state duoc de cap chung qua CMR-07.
- ✅ Timeout 10 giay duoc quy dinh qua CMR-16.

**Group C — Abnormal User Interactions:**
- ⚠️ Thieu mo ta xu ly khi nguoi dung nhan nhanh lien tuc nut "Tiep tuc" / "Gui yeu cau" / "Cap nhat mat khau" (debounce).
- ⚠️ Thieu mo ta xu ly nut Back vat ly (Android) khi dang o man hinh OTP hoac form chinh sua.
- ✅ CMR-18 quy dinh Debounce Navigation chung nhung UC khong tham chieu cu the.

**Group D — Permissions & Session:**
- ⚠️ Thieu mo ta xu ly khi session het han trong luc dang nhap lieu (UC250, UC251, UC254).
- ⚠️ Thieu mo ta xu ly khi mo lai app sau force-close (quay ve man hinh nao?).
- ✅ CMR-07 quy dinh xu ly loi 401 (refresh token) nhung UC khong tham chieu.

**Group E — Internationalization (i18n):**
- ⚠️ UC254 mo ta ngon ngu "ap dung ngay lap tuc" nhung khong ro co can nhan "Luu cai dat" khong.
- ⚠️ Thieu mo ta ngon ngu duoc luu o dau (local storage / server).
- ✅ CMR-17 quy dinh cac quy tac da ngon ngu chung.

**Score: 10/20 — ⚡ Partial**

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 UC252 — Dang ky tai khoan

**A. Workflows**

**MAIN FLOW (Happy Path):**
Buoc 1 → Nguoi dung chon loai tai khoan → Nhap thong tin → Nhan "Tiep tuc" → He thong validate → Gui OTP den SDT → Buoc 2
Buoc 2 → Nguoi dung nhap OTP → Nhan "Xac nhan" → He thong xac thuc OTP → Tao tai khoan → Tu dong dang nhap → Ve Trang chu

**ALTERNATIVE FLOWS:**
- [Alt-1] Nguoi dung chon "To chuc" thay vi "Ca nhan" → Form hien thi cac truong tuong ung

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Ma dinh danh/Email/SDT da ton tai → Thong bao loi: "Ma dinh danh/Email/So dien thoai da duoc su dung. Vui long kiem tra lai."
- [Err-2] Nhap sai OTP 3 lan → Thong bao: "Ma OTP khong hop le. Vui long gui lai ma moi." va reset input
- [Err-3] OTP het han → Nut "Gui lai OTP" sang len

**BUSINESS RULES:**
- OTP hieu luc 120 giay
- Mat khau toi thieu 8 ky tu, bao gom chu hoa, chu thuong, so
- Kiem tra trung lap Ma dinh danh/Email/SDT khi nhan "Tiep tuc"

**B. Business Rules & Validations**

| Field | Data Type | Required | Min | Max | Format | Error Message |
|-------|-----------|----------|-----|-----|--------|---------------|
| Loai tai khoan | Radio/Select | Yes | — | — | Ca nhan / To chuc | ⚠️ Missing |
| Ho va ten / Ten to chuc | Text | Yes | — | ⚠️ Missing | — | ⚠️ Missing |
| Ma dinh danh | Text | Yes | — | ⚠️ Missing | ⚠️ Missing | "Ma dinh danh da duoc su dung..." |
| Ngay cap | Date | Yes | — | — | dd/mm/yyyy | ⚠️ Missing |
| Noi cap | Text | Yes | — | ⚠️ Missing | — | ⚠️ Missing |
| Ma so thue | Text | Yes | — | ⚠️ Missing | ⚠️ Missing | ⚠️ Missing |
| SDT | Tel | Yes | — | ⚠️ Missing | ⚠️ Missing | ⚠️ Missing |
| Email | Text | Yes | — | — | Email format | ⚠️ Missing |
| Mat khau | Password | Yes | 8 | ⚠️ Missing | Chu hoa + thuong + so | ⚠️ Missing (chi tiet) |
| Nhap lai MK | Password | Yes | — | — | Phai trung khop | ⚠️ Missing |

### 6.2 UC253 — Quen mat khau
*(Luong tuong tu UC252 cho phan OTP)*
- ⚠️ Thieu mo ta chi tiet cach "xac thuc dinh danh nguoi dung" truoc khi gui OTP (muc 3.3 chi de cap chung).
- ⚠️ Thieu mo ta man hinh chuyen tiep giua cac buoc.

### 6.3 UC251 — Doi mat khau
- ⚠️ Thieu postcondition ro rang (sau khi doi MK thanh cong → lam gi?).
- ⚠️ Thieu mo ta error message cu the khi nhap sai MK hien tai.
- ⚠️ Thieu mo ta gioi han so lan nhap sai MK hien tai.

### 6.4 UC250 — Quan ly tai khoan DN
- ✅ Mo ta 2 tab: Thong tin dinh danh (read-only) va Thong tin khac (xem/sua).
- ✅ Dropdown dia chi load dynamic theo cap cha.
- ⚠️ Thieu danh sach day du cac truong trong Tab 2 voi validation cu the.
- ⚠️ Thieu mo ta hanh vi khi thay doi cap cha trong dropdown dia chi (reset gia tri cap con?).

### 6.5 UC254 — Cau hinh tai khoan
- ⚠️ Mau thuan giua "ap dung ngay lap tuc" (ngon ngu) va "Nut Luu cai dat".
- ⚠️ Thieu mo ta chi tiet man hinh "Quan ly thiet bi" (hien thi gi? co xoa thiet bi duoc khong?).
- ⚠️ Thieu luong kich hoat/vo hieu hoa dang nhap sinh trac hoc (can xac thuc truoc khi bat?).
- ⚠️ Thieu mo ta loai thong bao cu the (thong bao he thong vs email nhac han).

**Score: 12/20 — ⚡ Partial**

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis | Data Consistency Verification |
|---------------------------|-----------------|-------------------------------|
| Dang ky thanh cong (UC252) | Anh huong den UC256 (Dang nhap) — tu dong dang nhap, chuyen ve Trang chu | ⚠️ Chua ro tai khoan moi co duoc dong bo ngay vao he thong khong |
| Doi mat khau (UC251) | Anh huong den session hien tai va cac thiet bi dang dang nhap (UC254) | ⚠️ Chua ro cac thiet bi khac co bi dang xuat khong khi doi MK |
| Quen mat khau (UC253) | Anh huong den UC256 (Dang nhap) — mat khau moi can duoc su dung de dang nhap | ⚠️ Chua ro session cu co bi vo hieu hoa khong |
| Thay doi ngon ngu (UC254) | Anh huong den tat ca man hinh — text cung phai thay doi | ⚠️ Theo CMR-17 nhung UC khong tham chieu cu the |
| Cap nhat thong tin DN (UC250) | Anh huong den thong tin hien thi o cac man hinh khac | ⚠️ Chua ro thong tin cu co duoc cap nhat real-time tren cac man hinh khac khong |
| Bat/Tat sinh trac hoc (UC254) | Anh huong den luong dang nhap (UC256) | ⚠️ Chua ro quy trinh kich hoat sinh trac hoc |

**Score: 4/10 — ⚡ Partial**

**Nhan xet:**
- ⚠️ Tai lieu thieu phan tich tich hop giua cac UC. 5 UC duoc ghep trong 1 tai lieu nhung moi lien he giua chung khong duoc mo ta chi tiet.
- ⚠️ Anh huong cua doi MK len cac thiet bi khac chua duoc lam ro.
- ⚠️ Moi quan he voi UC256 (Dang nhap) chua duoc mo ta du.

---

## 8. Acceptance Criteria

| AC # | Scenario | Given | When | Then | Status |
|------|----------|-------|------|------|--------|
| AC1 | Form nhap MK co icon an/hien | Nguoi dung o man hinh nhap MK | Nhan icon mat | Mat khau duoc an/hien | ⚡ Mo ho — ap dung cho tat ca form MK? |
| AC2 | Thong tin dinh danh DN bi khoa | Nguoi dung o Tab Thong tin dinh danh (UC250) | Xem thong tin | MST, Ma dinh danh la Read-only | ✅ Ro rang |
| AC3 | Luong chon dia chi 4 cap hoat dong | Nguoi dung o Tab Thong tin khac (UC250) | Chon Tinh → Huyen → Xa | Dropdown load dong, khong loi khi thay doi cap cha | ⚡ Thieu chi tiet — "khong xay ra loi" la gi? |
| AC4 | Thong bao loi inline mau do | Nguoi dung submit form | Truong bat buoc trong | Loi inline mau do hien duoi truong (theo CMR-09) | ✅ Ro rang |
| AC5 | Ghi nhan lich su dang nhap thiet bi | Nguoi dung dang nhap thanh cong | Dang nhap | He thong ghi lai lich su | ⚠️ Lien quan den UC256, khong phai UC250-254 |

**Score: 5/10 — ⚡ Partial**

**Nhan xet:**
- ⚠️ Chi co 5 AC cho 5 UC — qua it. Moi UC can it nhat 3-5 AC.
- ⚠️ Nhieu AC khong theo format Given/When/Then cu the.
- ⚠️ Thieu AC cho cac luong chinh: dang ky thanh cong, quen MK thanh cong, doi MK thanh cong, luu cau hinh thanh cong.
- ⚠️ AC5 lien quan den UC256 (Dang nhap) nhieu hon la UC250-254.

---

## 9. Non-functional Requirements

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance | API timeout toi da 10 giay | CMR-16 |
| Security | Mat khau toi thieu 8 ky tu, bao gom chu hoa, thuong, so | UC252/UC251/UC253 |
| Security | Refresh token 15 ngay, session het han → redirect dang nhap | CMR-07 |
| Internationalization | 5 ngon ngu, chi ap dung cho text cung | CMR-17 |
| Loading | First-load: full-screen loading. Lazy load: spinner cuc bo | CMR-07 |
| Debounce | Debounce navigation, force close giu session | CMR-18 |

**Score: 3/5 — ⚡ Partial**

**Nhan xet:**
- ✅ Cac NFR co ban duoc tham chieu tu CMR.
- ⚠️ Thieu yeu cau ve tuong thich thiet bi/OS (Android/iOS phien ban nao?).
- ⚠️ Thieu yeu cau ve accessibility.
- ⚠️ Thieu yeu cau bao mat cu the cho OTP (ma hoa, so lan gui lai toi da?).

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | Muc 3.1 (UC252) | Thieu quy tac validation cu the cho cac truong: Ho ten, Ma dinh danh, Noi cap, Ma so thue, SDT — min/max length, ky tu hop le, format cu the la gi? | Khong the thiet ke test case cho validation neu khong co rang buoc cu the | Open |
| Q2 | High | Muc 3.1 (UC252) | Thieu error message cu the cho tung truong khi nhap sai dinh dang hoac de trong. Chi tham chieu CMR-09 chung, nhung khong co noi dung thong bao cu the cho tung truong. | Khong the kiem tra thong bao loi chinh xac | Open |
| Q3 | High | Muc 2.3 (UC251) | Sau khi doi mat khau thanh cong, he thong xu ly nhu the nao? Toast thong bao gi? Quay ve man hinh nao? Cac thiet bi khac dang dang nhap co bi dang xuat khong? | Khong the kiem tra postcondition cua doi MK | Open |
| Q4 | High | Muc 2.5 (UC254) | Mau thuan: Ngon ngu "ap dung ngay lap tuc" nhung lai co nut "Luu cai dat". Vay nguoi dung co can nhan "Luu cai dat" de thay doi ngon ngu khong? | Mau thuan trong tai lieu gay nham lan cho test design | Open |
| Q5 | High | Muc 2.5 (UC254) | "Quan ly thiet bi" — man hinh nay hien thi thong tin gi? Nguoi dung co the xoa thiet bi khong? Co gioi han so thiet bi khong? | Thieu hoan toan mo ta chuc nang nay | Open |
| Q6 | High | Muc 2.5 (UC254) | Luong kich hoat dang nhap sinh trac hoc (FaceID/Biometric) — khi bat toggle, co can xac thuc (nhap MK hoac sinh trac hoc) truoc khong? | Thieu luong xu ly cu the | Open |
| Q7 | Medium | Muc 2.2 (UC253) | Truong "So dien thoai / Email" — co chap nhan ca 2 format khong? Validation nhu the nao de phan biet SDT va Email? | Can biet chinh xac logic validation | Open |
| Q8 | Medium | Muc 3.3 | "Xac thuc dinh danh nguoi dung" truoc khi gui OTP (quen MK) — cu the la xac thuc nhu the nao? Chi can nhap SDT/Email hay can thong tin them? | Mo ta qua chung, khong the thiet ke test case | Open |
| Q9 | Medium | Muc 2.4 (UC250) | Tab "Thong tin khac" — danh sach day du cac truong voi validation cu the la gi? Tai lieu chi liet ke ten truong ma khong co bang validation chi tiet. | Can biet chinh xac cac truong va rang buoc de test | Open |
| Q10 | Medium | Muc 2.4 (UC250) | Khi thay doi Tinh trong dropdown dia chi → Huyen va Xa co duoc reset ve mac dinh khong? | Hanh vi dropdown dong chua duoc mo ta ro | Open |
| Q11 | Medium | N/A | Moi lien he giua 5 UC nhu the nao? Luong chuyen doi tu Dang ky → Tu dong dang nhap → Trang chu cu the ra sao? | Can hieu tich hop giua cac UC de test E2E | Open |
| Q12 | Medium | Muc 3.1 (UC252) | Ngay cap trong Datepicker — co kiem tra ngay tuong lai khong? Co gioi han ngay nho nhat khong? | Thieu validation cho truong ngay | Open |
| Q13 | Low | N/A | UC nay khong tham chieu cu the den cac CMR lien quan (CMR-09, CMR-10, CMR-17, CMR-18). Can bo sung "(Xem CMR-xx)" vao tai lieu UC. | Kho doi chieu khi khong co tham chieu | Open |
| Q14 | Low | Muc 2.5 (UC254) | "Cai dat thong bao" — Bat/Tat thong bao he thong va nhac han qua Email — cu the la nhung loai thong bao nao? | Thieu chi tiet de test | Open |
| Q15 | Low | Muc 2.3 (UC251) | Co gioi han so lan nhap sai mat khau hien tai khong? Neu co, xu ly nhu the nao sau khi vuot gioi han? | Thieu quy tac bao mat | Open |

---

## 🟢 What's Good

- ✅ Tai lieu co cau truc ro rang voi cac muc mo ta chuc nang, giao dien, va xu ly.
- ✅ Wireframes/Mockups duoc cung cap cho tat ca cac man hinh chinh (Dang ky, Quen MK, Doi MK, Quan ly TK DN, Cau hinh TK).
- ✅ Cac quy tac OTP duoc mo ta tuong doi day du (hieu luc 120 giay, sai 3 lan, gui lai).
- ✅ Mat khau co yeu cau do phuc tap co ban (8 ky tu, chu hoa/thuong/so, icon an/hien).
- ✅ Tab Thong tin dinh danh (UC250) duoc xac dinh ro la read-only voi thong bao huong dan.
- ✅ Huy chinh sua (UC250) co popup xac nhan theo CMR-10.
- ✅ Phan quyen Login/Khong Login duoc xac dinh ro.

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- Luong dang ky co ban (Happy path) voi cac buoc chinh
- Luong OTP co ban (nhap dung, nhap sai 3 lan, het han)
- Do phuc tap mat khau (8 ky tu, chu hoa/thuong/so)
- Tab Thong tin dinh danh la read-only
- Popup xac nhan khi Huy chinh sua
- Loading state va timeout (theo CMR chung)

**What CANNOT be tested yet (blocked by gaps):**
- Validation cu the cho tat ca cac truong nhap lieu (thieu min/max, format, error message)
- Postcondition cua Doi mat khau (UC251)
- Luong Quan ly thiet bi (UC254) — thieu mo ta hoan toan
- Luong kich hoat sinh trac hoc (UC254)
- Mau thuan ngon ngu "ap dung ngay" vs "Nut Luu" (UC254)
- Tich hop giua cac UC (Dang ky → Tu dong dang nhap → Trang chu)
- Validation truong dia chi dong (UC250)

**Suggested test focus areas (once gaps are resolved):**
- Happy path: Dang ky thanh cong (Ca nhan & To chuc), Doi MK, Quen MK, Cap nhat thong tin DN, Luu cau hinh
- Alternative scenarios: Chuyen doi loai tai khoan, Thay doi cap cha trong dropdown dia chi
- Boundary & validation tests: Min/max length cac truong, ky tu dac biet, format SDT/Email/MST
- Error & exception scenarios: Trung lap Ma dinh danh/Email/SDT, OTP sai/het han, MK cu sai, session het han
- UI-specific checks: Icon an/hien MK, Datepicker, Toggle, Dropdown dynamic
- CMR compliance tests: CMR-09 (validation realtime), CMR-10 (popup xac nhan), CMR-17 (da ngon ngu), CMR-18 (debounce)
- Edge case tests: Text overflow, null data tu API, double tap, nut Back vat ly

---

## 📌 Summary & Recommendation

Nhom tai lieu UC250-254 cung cap khung co ban cho 5 chuc nang quan ly tai khoan tren Mobile. Tuy nhien, tai lieu con **nhieu lo hong nghiem trong** can duoc bo sung truoc khi QA co the bat dau thiet ke test case day du:

1. **Thieu validation cu the** cho hau het cac truong nhap lieu (do dai, format, error message).
2. **Thieu postcondition ro rang** cho UC251 (Doi MK) va UC254 (Cau hinh).
3. **Mau thuan noi bo** trong UC254 giua "ap dung ngay lap tuc" va "Nut Luu cai dat".
4. **Thieu mo ta hoan toan** cho chuc nang "Quan ly thiet bi" va "Kich hoat sinh trac hoc" trong UC254.
5. **Thieu phan tich tich hop** giua 5 UC va voi UC256 (Dang nhap).
6. **Acceptance Criteria qua it** — chi 5 AC cho 5 UC la khong du.

**Khuyen nghi:** ❌ **NOT READY** — Khong bat dau thiet ke test case. BA can bo sung cac thong tin da duoc neu trong Unified Gap & Question Report truoc khi QA tiep tuc. Uu tien giai quyet cac cau hoi Priority High (Q1-Q6) truoc.

---

## Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-11 | Claude Agent (Senior QC Analyst) | First audit — Full readiness review cho UC250-254 |

---

*UC Readiness Template v3.0 — For QA Test Design*
