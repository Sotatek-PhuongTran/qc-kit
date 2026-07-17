# Scenario Design Rules & Templates

> Title: Scenario Design Rules | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Referenced by `workflows/design.md`. Single source for techniques, template, coverage rules, output structure, and quality gates.

## Design principles

- **Risk-based:** core transactions (login, payment, data submit) get extra coverage (alternative + exception flows); trivial UI scenarios stay lean.
- **What-if driven:** for every requirement ask "what if the user does X / Y / Z?" — each meaningful what-if becomes its own scenario (session expiry mid-action, concurrent edit, double-click, network drop mid-submit...).
- **Domain-weighted:** tailor emphasis to the domain declared in `project-context-master.md` §1 (Fintech → security & transaction accuracy; consumer app → UX & data sync).
- The UC is incomplete by default — flag silent branches instead of assuming them away.

## MANDATORY test design techniques (scenario level)

> **NHÀ CHÍNH (canonical home)** của 6 kỹ thuật test design — `qc-func-tc-design` và các file khác trỏ về đây, không chép lại định nghĩa.

Applied at scenario granularity — one technique application typically produces one scenario; `qc-func-tc-design` later expands each into atomic cases (TC tier: every partition, every boundary value, every branch listed under each technique below becomes its own atomic case).

1. **Equivalence Partitioning (EP)** — one scenario per valid/invalid partition. Never bundle (allowed `.png .jpg .svg` → one scenario per valid extension + one per representative invalid; never "all valid extensions" in one).
2. **Boundary Value Analysis (BVA)** — for any numeric/length/size constraint: `Limit`, `Limit − 1`, `Limit + 1` (255-char max → 1, 255, 256; 1MB max → 1.00MB, 1.01MB).
3. **Decision Table / Combinatorics** — multi-filter / multi-condition features get matrix scenarios (`A valid × B invalid`, ...). Never test an interacting filter in isolation.
4. **State Transition** — one scenario per valid transition + at least one invalid-transition attempt.
5. **Use Case Testing** — Happy / Alternative / Exception scenarios directly from the UC's Main / Alt / Exception sections.
6. **Error Guessing** — defect-prone areas not listed in the UC (race conditions, paste with whitespace, hardware back mid-flow...).

> Applying these correctly typically scales a CRUD feature to 20–50 distinct scenarios. Quality over quantity — each scenario must be a meaningfully different test intent.

## Scenario template

```
### Scenario ID: TS_[UC-ID]_[SequenceNo]
**Scenario Title:** [Short, clear description]
**UC Reference:** [UC ID and UC Name]
**Req-ID:** [Requirement ID(s) traced — use the project's REAL reference IDs as cited in the audited report (e.g. EF-xx / BR-xx / AC-xx / CR-xx); do not invent `FR`-style codes]
**Test Type:** [Functional | Integration | UI | End-to-End | Acceptance]
**Description:** [1–2 sentences — what condition or flow is verified]
**Test Focus:** [Happy path | Alternative flow | Error/Exception | Boundary | Permission/Role | UI State | API contract]
```

## Coverage rules

For each UC, cover ALL that apply:

| Coverage Area | Source in UC |
|---|---|
| Happy path (main flow) | Main Flow section |
| Each named alternative flow | Alternative Flows section |
| Each error/exception flow | Exception & Error Flows section |
| Each business rule / validation | Business Rules section |
| Boundary value cases | Any field with min/max/format constraints |
| Role/permission variations | Actors & User Roles section |
| UI state transitions | UI/UX Behaviour section (if applicable) |
| API contract verification | API / Integration Behaviour section (if applicable) |
| Acceptance criteria verification | Acceptance Criteria (audited §8) |

Do not skip a coverage area just because the UC is brief.

> Mapping to the 5 scoring areas: Happy/Alternative/Exception flows + role/permission → scoring area 3 (F.3); business rules/validation + boundary values → area 2 (F.2); UI state transitions → areas 1–2 (F.1/F.2); API contract/integration → area 4 (F.4); acceptance criteria → audited §8 (non-scored).

## Output file structure

```markdown
# Test Scenarios — [UC ID] [Feature Name]

> Source: <uc-review-report v[N] path>
> Generated: <YYYY-MM-DD>
> Platform: <web-responsive | mobile-native | ...>

## [UC ID] — [UC Name]

### Scenario ID: TS_[UC ID]_001
...

---

## ⚠️ Out-of-Scope Flags

| Scenario Area | Reason | Recommended Action |
|---------------|--------|--------------------|
| [Description] | [NFR: PERFORMANCE / SECURITY / LOAD / BLOCKED by audited gap] | Defer to specialist / wait for BA answer |
```

## Quality checks (run before writing the file)

- [ ] Every UC in the audited report has ≥ 1 scenario (or an Out-of-Scope row explaining why not).
- [ ] Every `to-cover` matrix cell has ≥ 1 scenario.
- [ ] Every scenario has a unique `TS_[UC-ID]_NNN` ID and cites a real Req-ID — no orphans.
- [ ] Test Type from the closed list only.
- [ ] Boundary scenarios exist for every numeric/length/size field in the UC.
- [ ] EP partitions split, not bundled; interacting conditions have ≥ 1 combinatoric scenario.
- [ ] Test data uses realistic values (no "valid input" placeholders).
- [ ] Verbatim message text from `requirement-common-files` is inlined wherever error codes / rule IDs are referenced.

## Out-of-scope handling

- **Performance / security beyond functional auth / load:** do NOT generate scenarios; add an Out-of-Scope row with reason + recommended action.
- **Blocked by audited gap:** a matrix cell is `blocked` ONLY when a SPECIFIC open gap/question/issue in the audited report (an open §10.1 row or §10.2 dependency) directly touches the content that cell would cover (the exact flow, rule, field, role, or state). A ⚠️/❌/🚫 status on a related scoring area (markers per `qc-uc-read/references/scoring-rubric.md` §3) is only a signal to check §10.1/§10.2 — it does NOT by itself block the whole coverage area; design the unaffected content normally. For each blocked cell: do NOT fabricate; add row with reason `BLOCKED: <§10.1 question ID / gap> — needs BA answer`, action `Resolve via qc-qna + re-audit before designing`.
