---
name: qc-start
description: "Kit concierge — welcomes QC members and routes them: interactive tour of the 3-tier kit, next-work report per UC from a fresh qc-dashboard (auto-runs qc-dashboard-sync when stale), or project handover from project-context-master + dashboard. READ-ONLY, conversation-first. Trigger: 'Hi qc-kit', /qc-start, 'bắt đầu với kit', 'kit này dùng thế nào', 'transfer dự án', 'tôi là QC mới'."
---
# QC Start — Kit Concierge

## Purpose

Entry point for any QC member sitting down with the kit: introduce the kit interactively, tell them what to do next on a running project, or hand a running project over to a newcomer. This skill EXPLAINS and ROUTES — it never produces artifacts. It is conversation-first: the flows in `workflows/welcome.md` are default paths, NOT a script; answer whatever the user actually asks (per the KNOWLEDGE MAP) and let them jump freely.

## Trigger

- Greetings/openers: "Hi qc-kit", "hello qc-kit", "bắt đầu với kit", "kit này dùng thế nào", "hướng dẫn sử dụng kit".
- `/qc-start`.
- Newcomer/handover phrases: "tôi là QC mới", "transfer dự án", "bàn giao dự án", "dự án này đang tới đâu".

## State detection (automatic — read-only)

| State | Signal on disk |
|---|---|
| `NEW` | `docs/qc-lead/project-config.md` missing/placeholder (§6 has no `[x]`) AND no `qc-dashboard.md` |
| `RUNNING` | `qc-dashboard.md` exists (resolve via `path-registry.md`) |
| `RUNNING-partial` | project-config filled but no dashboard yet (tier-1 chain unfinished) — treat as RUNNING with a note that tier 1 must finish first |

## Opening flow (ALWAYS)

1. Detect state → greet with ONE context line (e.g. *"Dự án đã onboard — dashboard sync lần cuối &lt;date&gt;."* / *"Kit chưa được onboard vào dự án nào."*).
2. ASK the user what they need — exactly these 3 options, plus free-form:

> Bạn cần gì hôm nay?
> 1. **Làm quen với kit** — tour 3 tầng, đi sâu từng skill theo nhu cầu.
> 2. **Việc cần làm tiếp theo** — kiểm tra trạng thái dự án và gợi ý lệnh tiếp theo cho từng UC.
> 3. **Transfer dự án** — tổng quan dự án cho người mới nhận bàn giao.
>
> (Hoặc hỏi thẳng bất kỳ điều gì về kit / dự án — tôi trả lời trực tiếp.)

3. Route theo bảng dưới. Người dùng đổi ý giữa chừng → chuyển nhánh ngay, không ép đi hết kịch bản.

## Routing

| User choice × State | Go to |
|---|---|
| Tour (1) — any state | `workflows/welcome.md` § Playbook 1 (RUNNING: lồng ví dụ thật từ artifact của dự án) |
| Next work (2) — NEW | `workflows/welcome.md` § Playbook 2A (env check + route `/qc-project-onboarding`) |
| Next work (2) — RUNNING | `workflows/welcome.md` § Playbook 2B (dashboard freshness check → auto-sync nếu cũ → report) |
| Transfer (3) — NEW | Explain: chưa có dự án để transfer → gợi ý chọn 1 hoặc chạy onboarding |
| Transfer (3) — RUNNING | `workflows/welcome.md` § Playbook 3 (nguồn: CHỈ `project-context-master` + `qc-dashboard`) |
| Free-form question | `workflows/welcome.md` § KNOWLEDGE MAP — đọc đúng nguồn rồi trả lời; quay lại menu chỉ khi user hết câu hỏi |

## Boundaries

- **READ-ONLY — writes NOTHING**: no artifacts, no checkpoints, and (declared exception in `rules/global-rules.md`) **no worklog**.
- Does NOT replace `qc-project-onboarding` — it only routes there. Never edits `project-config.md` or `path-registry.md`.
- MAY auto-invoke `/qc-dashboard-sync` when the dashboard is stale (Playbook 2B — one-line notice, then run; bottom-up if only one UC has newer artifacts, else top-down). MAY route to / invoke any skill the user asks to run next.
- Tour content is generated at RUNTIME from the real `SKILL.md` files and kit docs — never hardcode skill descriptions into this skill (no drift).
- No checkpoint delta file → per `config/checkpoint-protocol.md` §1 this skill does not use checkpoints.
