# Workflow — Verify bugs (re-test + regression)

> Title: qc-bug-verify Verify Workflow | Created: 2026-07-07 | Author: Claude | Version: v1
> Single phase. §2 approval is MANDATORY — never run §3 without an explicit OK on the presented plan.

## §0 — Setup + select bugs

1. Scope = the UC named in the command. Resolve paths via `path-registry.md`; worklog `Running (Phase 1)`.
2. Read the UC's `bug-report`. Partition by user-set Trạng thái:
   - **Cần chạy xác nhận:** `Dev đã fix — chờ verify`, `Không tái hiện được`.
   - **Đóng không cần chạy:** `Không phải bug` → conclude `Đã đóng — <ngày> — không phải bug` + history row; `Không còn` → conclude `Đã đóng — <ngày> — yêu cầu đã thay đổi` + history row + WARNING in chat: các TC gắn bug này có thể đã lỗi thời — đề xuất soát lại bằng `qc-func-tc-design` (update).
   - Nothing in either group → report "không có bug nào chờ verify" (Vietnamese), worklog `Done`, STOP.

## §1 — Build the plan

For each bug in "Cần chạy xác nhận":

- **Re-test** = the bug's linked TCs (from its "TC / tiêu chí liên quan" row).
- **Regression** = (a) all automated TCs in the same spec file(s) as the re-test TCs (same screen — a fix can shift neighbors), + (b) automated TCs sharing an acceptance criterion with the bug (RTM table in the test-cases md). Deduplicate; exclude TCs already in re-test.
- Manual TCs (triage verdict `Thủ công`) in either set → list in the plan as "QC chạy tay + tự điền kết quả", not in the automated run.
- Data/accounts: from the `test-data` md (never print passwords); environment default = the data md `Environment`; browser per Playwright project.

## §2 — Present the plan, WAIT for approval

Print (Vietnamese) one table per bug: mã bug + tiêu đề | TC re-test | TC regression (kèm lý do chọn: cùng màn hình / chung tiêu chí nào) | loại chạy (tự động / QC chạy tay) | data & account key sẽ dùng | môi trường + trình duyệt. Then ask for approval; the user may add/remove TCs or drop a bug from this round. Re-print if edited. NEVER proceed without an explicit OK.

## §3 — Run

Invoke `qc-auto-run` scoped to the approved automated TC list (`--grep "TC_x|TC_y|..."`). `qc-auto-run` keeps its own env confirmation + precondition pre-flight; Blocked TCs stay Blocked in this run too.

## §4 — Conclude + write back

1. **Execution report:** append one run column (format identical to `qc-execute-test-report/workflows/report.md` §4); approved-but-manual TCs get `Chưa chạy` for the QC to fill; TCs outside the plan get `—`.
2. **Per bug:**
   - All its re-test TCs Pass → Trạng thái `Đã đóng — verified <YYYY-MM-DD> — <env>`; history row with the run info.
   - Any re-test TC still failing → `Mở lại`; history row citing the failing TC(s) + fresh evidence (`runner/test-results/<...>` trace/screenshot). For `Không tái hiện được` bugs this fresh evidence is the whole point — cite it explicitly.
   - Any re-test TC Blocked → do NOT conclude; history row `chưa verify được — thiếu <precondition key>` and tell the user what to create.
3. **Regression failures** not explained by an existing bug → classify per `qc-execute-test-report/workflows/report.md` §3; real defects become NEW bug rows (next sequential ID); non-bugs become `Chưa chốt — <lý do>` cells + follow-ups.
4. Update the "Verify gần nhất" column in the bug summary table for every bug touched.

## §5 — Chat report (Vietnamese) + worklog

Per bug: kết luận (đóng / mở lại / chưa verify được) + 1 dòng căn cứ; bug mới phát sinh từ regression (nếu có); TC thủ công đang chờ QC điền tay; nhắc vòng tiếp theo nếu còn bug `Mở lại`. Worklog terminal `Done` / `Stopped (<reason>)`.

## Self-check before saving (qc-writting-rules §5)

- [ ] Plan table + conclusions readable standalone (no bare codes; names before codes).
- [ ] Verbatim messages in `"..."`; no English jargon outside verbatim labels.
- [ ] No passwords anywhere in the plan or the reports.
- [ ] Vietnamese diacritics intact.
